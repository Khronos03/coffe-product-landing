// Panel del pedido: varios cafés, un solo pago con Wompi o un solo mensaje de WhatsApp.
// Es un <dialog> nativo: atrapa el foco, cierra con Esc y devuelve el foco al botón que lo abrió.

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMinus, FiPlus, FiX, FiLock } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";
import { formatCOP, whatsappUrl } from "../../data/catalog";
import { CART_OPEN_EVENT, ONLINE_PAYMENTS, useCart } from "../../cart";
import { CheckoutError, openWompi, prepareCheckout } from "../../wompiClient";
import { track } from "../../analytics";
import PRICES from "../../data/prices.json";

// Bajo este valor la comisión fija de Wompi pesa demasiado: el pedido va por WhatsApp.
const MIN_ONLINE = PRICES.minOnline || 0;

const FIELDS = [
  { id: "name", label: "Nombre completo", autoComplete: "name", type: "text" },
  { id: "phone", label: "Celular (WhatsApp)", autoComplete: "tel-national", type: "tel", inputMode: "numeric", placeholder: "3XX XXX XXXX" },
  { id: "email", label: "Correo, para el comprobante", autoComplete: "email", type: "email" },
  { id: "region", label: "Departamento", autoComplete: "address-level1", type: "text" },
  { id: "city", label: "Ciudad o municipio", autoComplete: "address-level2", type: "text" },
  { id: "address", label: "Dirección de entrega", autoComplete: "street-address", type: "text", placeholder: "Calle, número, apto o barrio" },
];
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
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const show = () => {
    setStep("list");
    setError(null);
    const d = ref.current;
    if (d && !d.open) d.showModal();
  };
  const close = () => ref.current && ref.current.open && ref.current.close();

  useEffect(() => {
    window.addEventListener(CART_OPEN_EVENT, show);
    return () => window.removeEventListener(CART_OPEN_EVENT, show);
  }, []);

  // Al vaciarse el pedido dentro del panel, vuelve a la lista.
  useEffect(() => {
    if (!cart.lines.length || cart.total < MIN_ONLINE) setStep("list");
  }, [cart.lines.length, cart.total]);

  const toForm = () => {
    setError(null);
    setStep("form");
    track("begin_checkout", { currency: "COP", value: cart.total });
    requestAnimationFrame(() => {
      const first = ref.current && ref.current.querySelector(".cart-form input");
      first && first.focus();
    });
  };

  const onPay = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
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
      const msg =
        err instanceof CheckoutError
          ? err.status === 503
            ? "Los pagos en línea no están disponibles en este momento. Envía tu pedido por WhatsApp y lo pagas por Bancolombia, Llave, Nequi o contra entrega."
            : err.message
          : "No pudimos abrir el pago de Wompi. Intenta de nuevo o envía tu pedido por WhatsApp.";
      setError({ message: msg, field: err.field || null });
      if (!ref.current.open) ref.current.showModal();
      if (err.field) {
        const input = ref.current.querySelector(`#cart-${err.field}`);
        input && input.focus();
      }
    } finally {
      setBusy(false);
    }
  };

  const waHref = whatsappUrl(cartMessage(cart.lines, cart.total));
  const canPayOnline = ONLINE_PAYMENTS && cart.total >= MIN_ONLINE;

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
            <p>Elige un café en la serie y pulsa «Agregar al pedido».</p>
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
                  <p className="cart-line-total">{formatCOP(l.total)}</p>
                </li>
              ))}
            </ul>

            <div className="cart-sum">
              <p className="cart-total">
                <span>Total café</span>
                <strong>{formatCOP(cart.total)}</strong>
              </p>
              <p className="cart-ship">El envío lo pagas al recibir, directamente a la transportadora. Llega en 3 a 5 días hábiles.</p>
            </div>

            <div className="cart-actions">
              {canPayOnline && (
                <button type="button" className="cart-primary" onClick={toForm}>
                  <FiLock aria-hidden="true" /> Pagar en línea
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
              <p className="cart-note">
                {canPayOnline
                  ? "En línea con Wompi: tarjeta, PSE, Nequi, Daviplata o Bancolombia. Por WhatsApp: Bancolombia, Llave, Nequi o contra entrega."
                  : ONLINE_PAYMENTS
                    ? `El pago en línea es para pedidos desde ${formatCOP(MIN_ONLINE)}. Por WhatsApp pagas por Bancolombia, Llave, Nequi o contra entrega.`
                    : "Por WhatsApp pagas por Bancolombia, Llave, Nequi o contra entrega."}
              </p>
            </div>
          </>
        ) : (
          <form className="cart-form" onSubmit={onPay} noValidate>
            {FIELDS.map((f) => (
              <div key={f.id} className={`cart-field ${error && error.field === f.id ? "has-error" : ""}`}>
                <label htmlFor={`cart-${f.id}`}>{f.label}</label>
                <input
                  id={`cart-${f.id}`}
                  name={f.id}
                  type={f.type}
                  inputMode={f.inputMode}
                  autoComplete={f.autoComplete}
                  placeholder={f.placeholder}
                  value={customer[f.id] || ""}
                  onChange={(e) => setCustomer((c) => ({ ...c, [f.id]: e.target.value }))}
                  aria-invalid={error && error.field === f.id ? true : undefined}
                  aria-describedby={error && error.field === f.id ? "cart-error" : undefined}
                  required
                />
              </div>
            ))}
            {error && (
              <p className="field-error cart-error" id="cart-error" role="alert">
                {error.message}
              </p>
            )}
            {error && !error.field && (
              <a className="cart-secondary" href={waHref} target="_blank" rel="noopener noreferrer" data-source="pedido">
                <IoLogoWhatsapp aria-hidden="true" /> Enviar pedido por WhatsApp
              </a>
            )}
            <p className="cart-ship">
              Pagas {formatCOP(cart.total)} del café ahora. El envío lo pagas al recibir, a la transportadora.
            </p>
            <button type="submit" className="cart-primary" disabled={busy}>
              <FiLock aria-hidden="true" /> {busy ? "Abriendo el pago…" : `Pagar ${formatCOP(cart.total)} con Wompi`}
            </button>
            <button type="button" className="cart-back" onClick={() => setStep("list")}>
              Volver al pedido
            </button>
            <p className="cart-note">
              El pago lo procesa Wompi (Bancolombia). Nosotros no vemos ni guardamos los datos de tu tarjeta. Tus datos de
              envío los usamos solo para entregar tu pedido.
            </p>
          </form>
        )}
      </div>
    </dialog>
  );
}
