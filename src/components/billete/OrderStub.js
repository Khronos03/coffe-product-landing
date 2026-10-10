// El desprendible del billete: el formulario de pedido. Al "desprenderlo"
// se abre WhatsApp con el pedido completo (producto, tamaño, molienda, precio).

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { GRIND_OPTIONS, formatCOP, whatsappUrl } from "../../data/catalog";

export function buildOrderMessage({ product, serial, details, sizeLabel, grindLabel, price }) {
  const lines = ["¡Hola, Cumbre Café! Quiero hacer este pedido:", `• ${product}${serial ? ` (lote ${serial})` : ""}`];
  if (details) lines.push(`• ${details}`);
  if (sizeLabel) lines.push(`• Tamaño: ${sizeLabel}`);
  if (grindLabel) lines.push(`• Molienda: ${grindLabel}`);
  lines.push(`• Precio: ${formatCOP(price)}`);
  lines.push("", "¿Me confirman disponibilidad y el costo de envío a mi ciudad?");
  return lines;
}

/** Botón-desprendible: abre WhatsApp con el enlace nativo, sin retrasos. */
export function TearButton({ href, children, className = "", onTorn }) {
  return (
    <a
      className={`tear-button ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onTorn}
    >
      <IoLogoWhatsapp aria-hidden="true" className="tear-button-icon" />
      <span>{children}</span>
    </a>
  );
}

// Pedido abierto en WhatsApp, guardado por si el navegador recarga la pestaña al volver.
const PENDING_KEY = "cumbre:pedido-abierto";
const PENDING_TTL = 30 * 60 * 1000;
function readPending() {
  try {
    const raw = window.sessionStorage.getItem(PENDING_KEY);
    const p = raw && JSON.parse(raw);
    return p && Date.now() - p.at < PENDING_TTL ? p : null;
  } catch (e) {
    return null;
  }
}
function writePending(p) {
  try {
    if (p) window.sessionStorage.setItem(PENDING_KEY, JSON.stringify(p));
    else window.sessionStorage.removeItem(PENDING_KEY);
  } catch (e) {
    /* sin almacenamiento: la confirmación vive solo en memoria */
  }
}

export default function OrderStub({ serie, idPrefix = "stub", onOrderChange }) {
  const uid = useId();
  const [sizeId, setSizeId] = useState(serie.sizes[0].id);
  const [grind, setGrind] = useState(GRIND_OPTIONS[0].id);
  // Pedido abierto en WhatsApp: { href, at, returned }. No significa que se haya enviado.
  const [pending, setPending] = useState(() => {
    const p = readPending();
    return p ? { ...p, returned: true } : null;
  });
  const [tearing, setTearing] = useState(false);
  const [priceTick, setPriceTick] = useState(0);
  const viaPointer = useRef(false);
  const formRef = useRef(null);

  // Al cambiar de serie se conserva el tamaño elegido si existe.
  useEffect(() => {
    if (!serie.sizes.some((s) => s.id === sizeId)) setSizeId(serie.sizes[0].id);
  }, [serie, sizeId]);

  const size = serie.sizes.find((s) => s.id === sizeId) || serie.sizes[0];
  const grindLabel = GRIND_OPTIONS.find((g) => g.id === grind).label;
  const href = whatsappUrl(
    buildOrderMessage({
      product: `Café ${serie.name}`,
      serial: serie.serial,
      details: `Proceso ${serie.name} · Castillo · Tostión media`,
      sizeLabel: size.label,
      grindLabel,
      price: size.price,
    })
  );

  // Se registra al pulsar; el enlace nativo abre WhatsApp en el mismo instante, sin esperas.
  const markOpened = useCallback((openedHref) => {
    const p = { href: openedHref, at: Date.now() };
    writePending(p);
    setPending({ ...p, returned: false });
  }, []);

  // La barra de pedido móvil refleja exactamente lo elegido aquí.
  useEffect(() => {
    onOrderChange && onOrderChange({ size, grindLabel, href, markOpened: () => markOpened(href) });
  }, [size, grindLabel, href, onOrderChange, markOpened]);

  // Al volver a la pestaña después de irse a WhatsApp, se ofrece reabrirlo o cambiar el pedido.
  const isPending = pending !== null;
  useEffect(() => {
    if (!isPending) return undefined;
    const onVisibility = () => {
      if (document.visibilityState === "hidden") setPending((p) => p && { ...p, away: true });
      else setPending((p) => (p && p.away ? { ...p, returned: true } : p));
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [isPending]);

  // La confirmación solo describe el pedido que se abrió; si cambia, desaparece.
  const status = pending && pending.href === href ? (pending.returned ? "returned" : "opened") : null;

  const changeOrder = () => {
    writePending(null);
    setPending(null);
    const first = formRef.current && formRef.current.querySelector('input[type="radio"]:checked');
    first && first.focus();
  };

  const onSizeChange = (id) => {
    setSizeId(id);
    // Señal de precio solo cuando se elige con puntero; con teclado el cambio es inmediato.
    if (viaPointer.current) setPriceTick((t) => t + 1);
  };

  return (
    <div className="stub-wrap" id={`${idPrefix}-pedido`}>
      <form
        ref={formRef}
        className={`stub ${tearing ? "is-tearing" : ""}`}
        aria-labelledby={`${uid}-title`}
        onSubmit={(e) => e.preventDefault()}
        onAnimationEnd={(e) => e.target === e.currentTarget && setTearing(false)}
      >
        <h2 className="stub-title" id={`${uid}-title`}>
          Tu pedido
        </h2>

        <fieldset
          className="stub-sizes"
          onPointerDown={() => (viaPointer.current = true)}
          onKeyDown={() => (viaPointer.current = false)}
        >
          <legend>Tamaño</legend>
          <div className="chips">
            {serie.sizes.map((s) => (
              <label key={s.id} className={`chip ${s.id === size.id ? "is-on" : ""}`}>
                <input
                  type="radio"
                  name={`${uid}-size`}
                  value={s.id}
                  checked={s.id === size.id}
                  onChange={() => onSizeChange(s.id)}
                />
                <span className="chip-size">{s.label}</span>
                <span className="chip-price">{formatCOP(s.price)}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="stub-field" htmlFor={`${uid}-grind`}>
          <span className="stub-label">Molienda</span>
          <span className="select-wrap">
            <select id={`${uid}-grind`} value={grind} onChange={(e) => setGrind(e.target.value)}>
              {GRIND_OPTIONS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
          </span>
        </label>

        <p className="stub-price" aria-live="polite">
          <span className="stub-label">Valor</span>
          <span key={priceTick} className={`stub-amount ${priceTick ? "is-fresh" : ""}`}>
            {formatCOP(size.price)}
          </span>
        </p>

        <TearButton
          href={href}
          onTorn={() => {
            setTearing(true);
            markOpened(href);
          }}
        >
          Pedir por WhatsApp
        </TearButton>

        <div className="stub-status" role="status" aria-live="polite">
          {status === "opened" && (
            <div className="stub-sent" key="opened">
              <span className="stamp">Listo en WhatsApp</span>
              <p>
                Tu pedido ya está escrito en WhatsApp: solo falta enviarlo.{" "}
                <a href={href} target="_blank" rel="noopener noreferrer">
                  ¿No se abrió? Ábrelo aquí
                </a>{" "}
                o escríbenos al <span className="nowrap">+57 321 636 3596</span>.
              </p>
            </div>
          )}
          {status === "returned" && (
            <div className="stub-sent" key="returned">
              <p>
                Si ya lo enviaste, te respondemos por WhatsApp con el costo de envío. Si no, puedes abrirlo
                de nuevo o cambiar el pedido.
              </p>
              <div className="stub-sent-actions">
                <a className="stub-sent-action" href={href} target="_blank" rel="noopener noreferrer">
                  <IoLogoWhatsapp aria-hidden="true" /> Abrir WhatsApp de nuevo
                </a>
                <button type="button" className="stub-sent-action is-quiet" onClick={changeOrder}>
                  Cambiar mi pedido
                </button>
              </div>
            </div>
          )}
        </div>
        {!status && (
          <p className="stub-note">
            Te respondemos con el costo de envío a toda Colombia. ¿Sin WhatsApp aquí? Escríbenos al{" "}
            <span className="nowrap">+57 321 636 3596</span>.
          </p>
        )}
        <p className="stamp stamp-rest" aria-hidden="true">
          Lote de la finca
          <span>Mistrató · 1.950 m</span>
        </p>
      </form>
    </div>
  );
}
