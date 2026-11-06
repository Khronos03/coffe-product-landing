// Panel del pedido: varios cafés, un solo pago con Wompi o un solo mensaje de WhatsApp.
// Es un <dialog> nativo: atrapa el foco, cierra con Esc y devuelve el foco al botón que lo abrió.

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiAlertCircle, FiArrowRight, FiLock, FiMinus, FiPlus, FiX } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";
import { formatCOP, whatsappUrl } from "../../data/catalog";
import { CART_OPEN_EVENT, MIN_ONLINE, ONLINE_PAYMENTS, useCart } from "../../cart";
import { CheckoutError, openWompi, prepareCheckout } from "../../wompiClient";
import { track } from "../../analytics";
import { Perforation } from "./Security";
import { ONLINE_METHODS } from "./OrderStub";

// Dos grupos cortos en vez de seis campos seguidos: quién eres y a dónde va.
const GROUPS = [
  {
    legend: "Contacto",
    fields: [
      { id: "name", label: "Nombre completo", autoComplete: "name", type: "text" },
      { id: "phone", label: "Celular (WhatsApp)", autoComplete: "tel-national", type: "tel", inputMode: "numeric", placeholder: "3XX XXX XXXX" },
      { id: "email", label: "Correo, para el comprobante", autoComplete: "email", type: "email", inputMode: "email" },
    ],
  },
  {
    legend: "Entrega",
    fields: [
      { id: "region", label: "Departamento", autoComplete: "address-level1", type: "text" },
      { id: "city", label: "Ciudad o municipio", autoComplete: "address-level2", type: "text" },
      { id: "address", label: "Dirección de entrega", autoComplete: "street-address", type: "text", placeholder: "Calle, número, apto o barrio" },
    ],
  },
];
const FIELD_ORDER = GROUPS.flatMap((g) => g.fields.map((f) => f.id));

/**
 * Las mismas reglas que el servidor (api/_lib/wompi.js, cleanCustomer), aquí para avisar
 * de todos los errores a la vez y sin esperar la respuesta. El servidor vuelve a validar.
 */
export function validateCustomer(c = {}) {
  const s = (v) => (typeof v === "string" ? v.trim().replace(/\s+/g, " ") : "");
  const phone = s(c.phone).replace(/[^\d]/g, "").replace(/^57(?=3\d{9}$)/, "");
  const email = s(c.email);
  const errors = {};
  const name = s(c.name);
  if (name.length < 3) errors.name = "Escribe tu nombre completo.";
  if (!phone) errors.phone = "Escribe tu celular.";
  else if (!/^3\d{9}$/.test(phone)) errors.phone = "Debe tener 10 dígitos y empezar por 3, por ejemplo 300 123 4567.";
  if (!email) errors.email = "Escribe tu correo: ahí te llega el comprobante.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = "Revisa el correo, parece incompleto (ejemplo: nombre@gmail.com).";
  if (s(c.region).length < 3) errors.region = "Escribe el departamento.";
  if (s(c.city).length < 2) errors.city = "Escribe la ciudad o municipio.";
  const address = s(c.address);
  if (!address) errors.address = "Escribe la dirección de entrega.";
  else if (address.length < 6) errors.address = "Completa la dirección: calle, número y barrio o apto.";
  return errors;
}
const CUSTOMER_KEY = "cumbre:datos-envio";

const readCustomer = () => {
  try {
    return JSON.parse(window.localStorage.getItem(CUSTOMER_KEY)) || {};
  } catch (e) {
    return {};
  }
};

/** Mensaje de WhatsApp con todo el pedido. */
export function cartMessage(lines, total) {
  return [
    "¡Hola, Cumbre Café! Quiero hacer este pedido:",
    ...lines.map(
      (l) =>
        `• ${l.qty} × ${l.product}${l.serial ? ` (lote ${l.serial})` : ""} · ${l.option}${l.grindLabel ? ` · ${l.grindLabel}` : ""}: ${formatCOP(l.total)}`
    ),
    `• Total café: ${formatCOP(total)}`,
    "",
    "¿Me confirman disponibilidad y el costo de envío a mi ciudad?",
  ];
}

export default function CartPanel() {
  const cart = useCart();
  const navigate = useNavigate();
  const ref = useRef(null);
  const [step, setStep] = useState("list");
  const [customer, setCustomer] = useState(readCustomer);
  // Errores por campo y un error general (pago no disponible, red).
  const [errors, setErrors] = useState({});
  const [general, setGeneral] = useState(null);
  const [busy, setBusy] = useState(false);

  const show = () => {
    setStep("list");
    setErrors({});
    setGeneral(null);
    const d = ref.current;
    if (d && !d.open) d.showModal();
  };
  const close = () => ref.current && ref.current.open && ref.current.close();

  useEffect(() => {
    window.addEventListener(CART_OPEN_EVENT, show);
    return () => window.removeEventListener(CART_OPEN_EVENT, show);
  }, []);

  // Al vaciarse el pedido (o bajar del mínimo) dentro del panel, vuelve a la lista.
  useEffect(() => {
    if (!cart.lines.length || cart.total < MIN_ONLINE) setStep("list");
  }, [cart.lines.length, cart.total]);

  const toForm = () => {
    setErrors({});
    setGeneral(null);
    setStep("form");
    track("begin_checkout", { currency: "COP", value: cart.total });
    requestAnimationFrame(() => {
      const first = ref.current && ref.current.querySelector(".cart-form input");
      first && first.focus();
    });
  };

  const focusFirstError = (errs) => {
    const id = FIELD_ORDER.find((f) => errs[f]);
    const input = id && ref.current && ref.current.querySelector(`#cart-${id}`);
    if (!input) return;
    input.focus({ preventScroll: true });
    input.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  const onChange = (id, value) => {
    setCustomer((c) => ({ ...c, [id]: value }));
    // El error de un campo se va en cuanto el cliente lo corrige.
    if (errors[id]) setErrors((e) => ({ ...e, [id]: undefined }));
  };

  const onPay = async (e) => {
    e.preventDefault();
    const found = validateCustomer(customer);
    setGeneral(null);
    if (Object.keys(found).length) {
      setErrors(found);
      requestAnimationFrame(() => focusFirstError(found));
      return;
    }
    setErrors({});
    setBusy(true);
    try {
      window.localStorage.setItem(CUSTOMER_KEY, JSON.stringify(customer));
    } catch (err) {
      /* sin almacenamiento */
    }
    try {
      const config = await prepareCheckout(cart.lines, customer);
      close();
      await openWompi(config, (tx) => {
        if (tx && tx.id) navigate(`/pedido/estado?id=${encodeURIComponent(tx.id)}`);
      });
    } catch (err) {
      if (!ref.current.open) ref.current.showModal();
      if (err instanceof CheckoutError && err.field && FIELD_ORDER.includes(err.field)) {
        const errs = { [err.field]: err.message };
        setErrors(errs);
        requestAnimationFrame(() => focusFirstError(errs));
      } else {
        setGeneral(
          err instanceof CheckoutError && err.status === 503
            ? "Los pagos en línea no están disponibles en este momento. Envía tu pedido por WhatsApp y lo pagas por Bancolombia, Llave, Nequi o contra entrega."
            : err instanceof CheckoutError && err.status === 400
              ? err.message
              : "No pudimos abrir el pago de Wompi. Revisa tu conexión e intenta de nuevo, o envía tu pedido por WhatsApp."
        );
      }
    } finally {
      setBusy(false);
    }
  };

  const waHref = whatsappUrl(cartMessage(cart.lines, cart.total));
  const canPayOnline = ONLINE_PAYMENTS && cart.total >= MIN_ONLINE;
  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <dialog ref={ref} className="cart" aria-labelledby="cart-title" onClick={(e) => e.target === ref.current && close()}>
      <div className="cart-sheet">
        <div className="cart-head">
          <h2 className="cart-title" id="cart-title">
            {step === "form" ? "Datos de envío" : "Tu pedido"}
          </h2>
          <button type="button" className="cart-close" onClick={close}>
            <FiX aria-hidden="true" />
            <span className="sr-only">Cerrar</span>
          </button>
        </div>

        {cart.lines.length === 0 ? (
          <div className="cart-empty">
            <p>Tu pedido está vacío.</p>
            <p>Elige un café en la serie y pulsa «{ONLINE_PAYMENTS ? "Pedir y pagar" : "Agregar al pedido"}».</p>
            <a className="cart-secondary" href="/#serie" onClick={close}>
              Ver los cafés
            </a>
          </div>
        ) : step === "list" ? (
          <>
            <ul className="cart-lines">
              {cart.lines.map((l, i) => (
                <li key={`${l.sku}-${l.grind}`} className="cart-line">
                  <div className="cart-line-text">
                    <p className="cart-line-name">
                      <span className="cart-serial" data-ink={l.ink}>
                        {l.tag}
                      </span>
                      {l.product} <span>{l.option}</span>
                    </p>
                    {l.grindLabel && <p className="cart-line-grind">{l.grindLabel}</p>}
                  </div>
                  <div className="cart-qty" role="group" aria-label={`Cantidad de ${l.product} ${l.option}`}>
                    <button type="button" onClick={() => (l.qty > 1 ? cart.setQty(i, l.qty - 1) : cart.remove(i))}>
                      <FiMinus aria-hidden="true" />
                      <span className="sr-only">{l.qty > 1 ? "Quitar una" : "Quitar del pedido"}</span>
                    </button>
                    <output aria-live="polite">{l.qty}</output>
                    <button type="button" onClick={() => cart.setQty(i, l.qty + 1)} disabled={l.qty >= 20}>
                      <FiPlus aria-hidden="true" />
                      <span className="sr-only">Agregar una</span>
                    </button>
                  </div>
                  <button type="button" className="cart-remove" onClick={() => cart.remove(i)}>
                    Quitar<span className="sr-only"> {l.product} {l.option}</span>
                  </button>
                  <p className="cart-line-total">{formatCOP(l.total)}</p>
                </li>
              ))}
            </ul>

            <Perforation className="cart-perf" />

            <div className="cart-sum">
              <p className="cart-total">
                <span>Total café</span>
                <strong>{formatCOP(cart.total)}</strong>
              </p>
              <p className="cart-ship">+ envío, que pagas al recibir a la transportadora. Llega en 3 a 5 días hábiles.</p>
            </div>

            <div className="cart-actions">
              {canPayOnline && (
                <button type="button" className="cart-primary" onClick={toForm}>
                  Continuar con el envío <FiArrowRight aria-hidden="true" />
                </button>
              )}
              <a
                className={canPayOnline ? "cart-secondary" : "cart-primary"}
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                data-source="pedido"
                data-product={`Pedido (${cart.lines.length} productos)`}
                data-price={cart.total}
              >
                <IoLogoWhatsapp aria-hidden="true" /> Enviar pedido por WhatsApp
              </a>
              <button type="button" className="cart-back" onClick={close}>
                Seguir eligiendo
              </button>
              <dl className="cart-methods">
                {canPayOnline && (
                  <div>
                    <dt>En línea</dt>
                    <dd>{ONLINE_METHODS}</dd>
                  </div>
                )}
                <div>
                  <dt>WhatsApp</dt>
                  <dd>Bancolombia, Llave, Nequi o contra entrega</dd>
                </div>
              </dl>
              {ONLINE_PAYMENTS && !canPayOnline && (
                <p className="cart-note">El pago en línea es para pedidos desde {formatCOP(MIN_ONLINE)}.</p>
              )}
            </div>
          </>
        ) : (
          <form className="cart-form" onSubmit={onPay} noValidate>
            {GROUPS.map((g) => (
              <fieldset key={g.legend} className="cart-group">
                <legend>{g.legend}</legend>
                {g.fields.map((f) => (
                  <div key={f.id} className={`cart-field ${errors[f.id] ? "has-error" : ""}`}>
                    <label htmlFor={`cart-${f.id}`}>{f.label}</label>
                    <input
                      id={`cart-${f.id}`}
                      name={f.id}
                      type={f.type}
                      inputMode={f.inputMode}
                      autoComplete={f.autoComplete}
                      placeholder={f.placeholder}
                      value={customer[f.id] || ""}
                      onChange={(e) => onChange(f.id, e.target.value)}
                      aria-invalid={errors[f.id] ? true : undefined}
                      aria-describedby={errors[f.id] ? `cart-${f.id}-error` : undefined}
                      required
                    />
                    {errors[f.id] && (
                      <p className="field-error" id={`cart-${f.id}-error`}>
                        <FiAlertCircle aria-hidden="true" className="field-error-icon" />
                        <span>{errors[f.id]}</span>
                      </p>
                    )}
                  </div>
                ))}
              </fieldset>
            ))}

            <div className="cart-pay">
              <p className="sr-only" role="status" aria-live="polite">
                {errorCount ? `Revisa ${errorCount === 1 ? "un campo" : `${errorCount} campos`} antes de pagar.` : ""}
              </p>
              {general && (
                <div className="cart-general" role="alert">
                  <p className="field-error">
                    <FiAlertCircle aria-hidden="true" className="field-error-icon" />
                    <span>{general}</span>
                  </p>
                  <a className="cart-secondary" href={waHref} target="_blank" rel="noopener noreferrer" data-source="pedido">
                    <IoLogoWhatsapp aria-hidden="true" /> Enviar pedido por WhatsApp
                  </a>
                </div>
              )}
              <p className="cart-ship">
                Pagas <strong>{formatCOP(cart.total)}</strong> del café ahora con {ONLINE_METHODS}. El envío, al recibir.
              </p>
              <button type="submit" className="cart-primary" disabled={busy}>
                <FiLock aria-hidden="true" /> {busy ? "Abriendo el pago…" : `Pagar ${formatCOP(cart.total)} con Wompi`}
              </button>
              <p className="cart-note">
                Lo procesa Wompi, de Bancolombia: no vemos ni guardamos los datos de tu tarjeta o cuenta.
              </p>
              <button type="button" className="cart-back" onClick={() => setStep("list")}>
                Volver al pedido
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
