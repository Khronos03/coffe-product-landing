// El desprendible del billete: el formulario de pedido. Al "desprenderlo"
// se abre WhatsApp con el pedido completo (producto, tamaño, molienda, precio).

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { GRIND_OPTIONS, ORDER_TERMS, formatCOP, whatsappUrl } from "../../data/catalog";
import { readDraft, readPending, writeDraft, writePending } from "./orderMemory";
import { track } from "../../analytics";

export function buildOrderMessage({ product, serial, details, sizeLabel, grindLabel, price }) {
  const lines = ["¡Hola, Cumbre Café! Quiero hacer este pedido:", `• ${product}${serial ? ` (lote ${serial})` : ""}`];
  if (details) lines.push(`• ${details}`);
  if (sizeLabel) lines.push(`• Tamaño: ${sizeLabel}`);
  if (grindLabel) lines.push(`• Molienda: ${grindLabel}`);
  lines.push(`• Precio: ${formatCOP(price)}`);
  lines.push("", "¿Me confirman disponibilidad y el costo de envío a mi ciudad?");
  return lines;
}

/**
 * Botón-desprendible: abre WhatsApp con el enlace nativo, sin retrasos.
 * Mientras el pedido no está completo (falta la molienda), `href` apunta al campo pendiente
 * y no abre otra pestaña; `onTorn` decide qué hacer con el clic.
 */
export function TearButton({ href, children, className = "", onTorn, trackData }) {
  const external = /^https?:/.test(href);
  return (
    <a
      className={`tear-button ${className}`}
      href={href}
      {...trackAttrs(trackData)}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onTorn}
    >
      <IoLogoWhatsapp aria-hidden="true" className="tear-button-icon" />
      <span>{children}</span>
    </a>
  );
}

/** Atributos data-* que la analítica lee al hacer clic en un enlace de WhatsApp. */
export function trackAttrs(t) {
  if (!t) return {};
  return {
    "data-source": t.source,
    "data-product": t.product,
    "data-size": t.size || undefined,
    "data-grind": t.grind || undefined,
    "data-price": t.price || undefined,
  };
}

/** Molienda sin valor por defecto: el cliente elige según su método. Compartido con los mini-billetes. */
export function GrindField({ id, value, onChange, error, compact = false }) {
  return (
    <div className={`stub-field ${compact ? "is-compact" : ""} ${error ? "has-error" : ""}`}>
      <label className="stub-label" htmlFor={id}>
        Molienda
      </label>
      <span className="select-wrap">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error || undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          required
        >
          <option value="" disabled>
            ¿Cómo lo preparas?
          </option>
          {GRIND_OPTIONS.map((g) => (
            <option key={g.id} value={g.id}>
              {g.label}
            </option>
          ))}
        </select>
      </span>
      {error && (
        <p className="field-error" id={`${id}-error`}>
          Elige la molienda para tu método y te lo enviamos listo.
        </p>
      )}
    </div>
  );
}

export const grindLabelOf = (grind) => (GRIND_OPTIONS.find((g) => g.id === grind) || {}).label || null;

/** Lleva el foco al selector de molienda sin saltos bruscos. */
export function focusField(el) {
  if (!el) return;
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ block: "center", behavior: reduce ? "auto" : "smooth" });
  el.focus({ preventScroll: true });
}

export default function OrderStub({ serie, idPrefix = "stub", onOrderChange }) {
  const uid = useId();
  const grindId = `${uid}-grind`;
  const [draft] = useState(readDraft);
  const [sizeId, setSizeId] = useState(() =>
    draft && draft.serieId === serie.id && serie.sizes.some((s) => s.id === draft.sizeId) ? draft.sizeId : serie.sizes[0].id
  );
  const [grind, setGrind] = useState(() => (draft && grindLabelOf(draft.grind) ? draft.grind : ""));
  const [grindError, setGrindError] = useState(false);
  // Pedido abierto en WhatsApp. No significa que se haya enviado.
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
  const grindLabel = grindLabelOf(grind);
  const ready = Boolean(grindLabel);
  const href = ready
    ? whatsappUrl(
        buildOrderMessage({
          product: `Café ${serie.name}`,
          serial: serie.serial,
          details: `Proceso ${serie.name} · Castillo · Tostión media`,
          sizeLabel: size.label,
          grindLabel,
          price: size.price,
        })
      )
    : `#${grindId}`;

  // La selección sobrevive a una recarga de la pestaña.
  useEffect(() => {
    writeDraft({ serieId: serie.id, sizeId: size.id, grind });
  }, [serie.id, size.id, grind]);

  const requestGrind = useCallback((source = "desprendible") => {
    track("molienda_faltante", { origen: source, producto: serie.name });
    setGrindError(true);
    focusField(document.getElementById(grindId));
  }, [grindId, serie.name]);

  // Se registra al pulsar; el enlace nativo abre WhatsApp en el mismo instante, sin esperas.
  const markOpened = useCallback(() => {
    const p = {
      href,
      label: `${serie.name} · ${size.label} · ${grindLabel}`,
      at: Date.now(),
    };
    writePending(p);
    setPending({ ...p, returned: false });
  }, [href, serie.name, size.label, grindLabel]);

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

  // "opened"/"returned" describen el pedido en pantalla; "elsewhere", uno abierto con otra selección.
  const status = !pending ? null : pending.href === href ? (pending.returned ? "returned" : "opened") : "elsewhere";

  // La barra de pedido móvil refleja exactamente lo elegido aquí.
  useEffect(() => {
    onOrderChange &&
      onOrderChange({
        size,
        grindLabel,
        href,
        ready,
        opened: status === "opened" || status === "returned",
        markOpened,
        requestGrind,
        track: { product: `Café ${serie.name}`, size: size.label, grind: grindLabel, price: size.price },
      });
  }, [size, grindLabel, href, ready, status, onOrderChange, markOpened, requestGrind, serie.name]);

  const clearPending = () => {
    writePending(null);
    setPending(null);
  };

  const changeOrder = () => {
    clearPending();
    const first = formRef.current && formRef.current.querySelector('input[type="radio"]:checked');
    first && first.focus();
  };

  const onSizeChange = (id) => {
    setSizeId(id);
    // Señal de precio solo cuando se elige con puntero; con teclado el cambio es inmediato.
    if (viaPointer.current) setPriceTick((t) => t + 1);
  };

  const onGrindChange = (value) => {
    setGrind(value);
    setGrindError(false);
  };

  const onTear = (e) => {
    if (!ready) {
      e.preventDefault();
      requestGrind();
      return;
    }
    setTearing(true);
    markOpened();
  };

  return (
    <div className="stub-wrap" id={`${idPrefix}-pedido`}>
      <form
        ref={formRef}
        className={`stub ${tearing ? "is-tearing" : ""}`}
        aria-labelledby={`${uid}-title`}
        onSubmit={(e) => e.preventDefault()}
        onAnimationEnd={(e) => e.target === e.currentTarget && setTearing(false)}
        noValidate
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

        <GrindField id={grindId} value={grind} onChange={onGrindChange} error={grindError} />

        <p className="stub-price" aria-live="polite">
          <span className="stub-label">Valor</span>
          <span key={priceTick} className={`stub-amount ${priceTick ? "is-fresh" : ""}`}>
            {formatCOP(size.price)}
          </span>
        </p>

        <TearButton
          href={href}
          onTorn={onTear}
          trackData={{ source: "desprendible", product: `Café ${serie.name}`, size: size.label, grind: grindLabel, price: size.price }}
        >
          Pedir por WhatsApp
        </TearButton>

        <dl className="stub-terms">
          <div>
            <dt>Pago</dt>
            <dd>{ORDER_TERMS.pago}</dd>
          </div>
          <div>
            <dt>Entrega</dt>
            <dd>{ORDER_TERMS.entrega}</dd>
          </div>
          <div>
            <dt>Tostión</dt>
            <dd>{ORDER_TERMS.tostion}</dd>
          </div>
        </dl>

        <div className="stub-status" role="status" aria-live="polite">
          {status === "opened" && (
            <div className="stub-sent" key="opened">
              <span className="stamp">Listo en WhatsApp</span>
              <p>
                Tu pedido ya está escrito en WhatsApp: solo falta enviarlo.{" "}
                <a className="inline-target" href={href} target="_blank" rel="noopener noreferrer">
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
                <a
                  className="stub-sent-action"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...trackAttrs({ source: "reabrir", product: `Café ${serie.name}`, size: size.label, grind: grindLabel, price: size.price })}
                >
                  <IoLogoWhatsapp aria-hidden="true" /> Abrir WhatsApp de nuevo
                </a>
                <button type="button" className="stub-sent-action is-quiet" onClick={changeOrder}>
                  Cambiar mi pedido
                </button>
              </div>
            </div>
          )}
          {status === "elsewhere" && (
            <div className="stub-sent is-elsewhere" key="elsewhere">
              <p>
                Tienes abierto en WhatsApp otro pedido: <strong>{pending.label}</strong>. Si este es aparte,
                pídelo también.
              </p>
              <div className="stub-sent-actions">
                <a className="stub-sent-action" href={pending.href} target="_blank" rel="noopener noreferrer">
                  <IoLogoWhatsapp aria-hidden="true" /> Abrir ese pedido
                </a>
                <button type="button" className="stub-sent-action is-quiet" onClick={clearPending}>
                  Quitar aviso
                </button>
              </div>
            </div>
          )}
        </div>
        {!status && (
          <p className="stub-note">
            Te confirmamos disponibilidad y costo de envío por WhatsApp. ¿Sin WhatsApp aquí? Escríbenos al{" "}
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
