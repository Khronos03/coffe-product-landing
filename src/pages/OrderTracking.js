// /seguimiento/<clave> — el cliente ve su pedido: pagado, preparado y enviado (con transportadora y guía).
// La clave viene en el link que se comparte desde el panel. Datos mínimos: sin dirección ni celular.

import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import { FiCheck, FiCopy, FiExternalLink } from "react-icons/fi";
import "@fontsource-variable/archivo/wdth";
import "@fontsource-variable/big-shoulders-display";
import "../styles/billete.css";
import "../styles/notfound.css";
import { whatsappUrl } from "../data/catalog";
import { CARRIERS } from "../data/carriers";
import { SiteFooter, SiteHeader } from "../components/billete/Chrome";
import { Perforation, WaveField } from "../components/billete/Security";
import { useDocumentMeta } from "../seo";

const STEPS = [
  { key: "isPaid", label: "Pagado" },
  { key: "isReady", label: "Preparado" },
  { key: "isShipped", label: "Enviado" },
];

const dateLabel = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("es-CO", { day: "numeric", month: "long" });
};

function headline(o) {
  if (o.isShipped) return { title: "Tu pedido va en camino", text: "Ya lo entregamos a la transportadora. Con el número de guía puedes ver dónde va.", stamp: "Enviado" };
  if (o.isReady) return { title: "Tu pedido está listo", text: "Ya está empacado y sale en el próximo despacho. Aquí verás la guía cuando lo enviemos.", stamp: "Preparado" };
  if (o.isPaid) return { title: "Recibimos tu pago", text: "Estamos preparando tu café. Vuelve a este link cuando quieras: aquí verás cada avance.", stamp: "Pagado" };
  return { title: "Recibimos tu pedido", text: "Falta confirmar el pago. Si ya pagaste, escríbenos con el número de tu pedido.", stamp: "Pendiente" };
}

export default function OrderTracking() {
  useDocumentMeta({ title: "Seguimiento de tu pedido | Cumbre Café", description: "Estado de tu pedido en Cumbre Café.", noindex: true });
  const { token = "" } = useParams();
  const [state, setState] = useState({ loading: true, order: null, error: null });
  const [copied, setCopied] = useState(false);

  const load = useCallback(async (attempt = 0) => {
    try {
      const res = await fetch(`/api/seguimiento?t=${encodeURIComponent(token)}`);
      const body = await res.json().catch(() => ({}));
      // 504: el servidor estaba dormido; un reintento suele bastar
      if (res.status === 504 && attempt < 2) {
        setTimeout(() => load(attempt + 1), 3000);
        return;
      }
      if (!res.ok) throw Object.assign(new Error(body.error || "No pudimos consultar el pedido."), { status: res.status });
      setState({ loading: false, order: body, error: null });
    } catch (err) {
      setState({ loading: false, order: null, error: err });
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  const copyGuide = async (guide) => {
    try {
      await navigator.clipboard.writeText(guide);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch (e) {
      /* sin portapapeles: la guía queda a la vista para copiarla a mano */
    }
  };

  const o = state.order;
  const head = o ? headline(o) : null;
  const carrier = o && o.carrier ? CARRIERS[o.carrier] || CARRIERS.otra : null;
  const notFound = state.error && state.error.status === 404;
  const wa = whatsappUrl(["¡Hola, Cumbre Café! Quiero preguntar por mi pedido.", o ? `Pedido: ${o.code}` : ""].filter(Boolean));
  // Paso actual: el primero sin completar
  const current = o ? STEPS.findIndex((s) => !o[s.key]) : -1;

  return (
    <div className="bt nf is-status is-tracking" data-ink="violet">
      <SiteHeader onHome={false} skipTo="#seguimiento" skipLabel="Saltar al estado del pedido" />
      <main className="nf-field">
        <WaveField className="field-waves" />
        <article className="nf-ticket" id="seguimiento" aria-labelledby="trk-title" aria-busy={state.loading}>
          <div className="nf-body">
            <div className="billete-issuer">
              <span>Cumbre Café</span>
              <span className="billete-issuer-mid">Seguimiento de pedido</span>
              <span>{o ? o.code : "—"}</span>
            </div>
            <div className="nf-main">
              <h1 className="nf-title" id="trk-title">
                {state.loading ? "Buscando tu pedido…" : o ? head.title : notFound ? "No encontramos este pedido" : "No pudimos consultar tu pedido"}
              </h1>
              {!state.loading && (
                <p className="nf-line" role="status">
                  {o
                    ? `${o.firstName ? `Hola, ${o.firstName}. ` : ""}${head.text}`
                    : notFound
                      ? "Puede que el link esté incompleto. Escríbenos por WhatsApp y te ayudamos."
                      : state.error?.message}
                </p>
              )}

              {o && (
                <>
                  <ol className="trk-steps" aria-label="Estado del pedido">
                    {STEPS.map((s, i) => {
                      const done = Boolean(o[s.key]);
                      return (
                        <li key={s.key} className={`trk-step ${done ? "is-done" : ""} ${i === current ? "is-current" : ""}`}>
                          <span className="trk-dot" aria-hidden="true">
                            {done ? <FiCheck /> : i + 1}
                          </span>
                          <span className="trk-label">
                            {s.label}
                            <span className="sr-only">{done ? ": listo" : i === current ? ": en curso" : ": pendiente"}</span>
                          </span>
                          {s.key === "isShipped" && done && o.shippedAt && <span className="trk-when">{dateLabel(o.shippedAt)}</span>}
                          {s.key === "isPaid" && done && o.date && <span className="trk-when">{dateLabel(o.date)}</span>}
                        </li>
                      );
                    })}
                  </ol>

                  {o.isShipped && o.trackingNumber && (
                    <section className="trk-carrier" aria-labelledby="trk-carrier-title">
                      <h2 className="trk-carrier-title" id="trk-carrier-title">
                        {carrier ? carrier.name : "Transportadora"}
                      </h2>
                      <div className="trk-guide">
                        <span className="trk-guide-label">Guía</span>
                        <strong className="trk-guide-num">{o.trackingNumber}</strong>
                        <button type="button" className="trk-copy" onClick={() => copyGuide(o.trackingNumber)}>
                          {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
                          {copied ? "Copiada" : "Copiar"}
                        </button>
                      </div>
                      {carrier && carrier.url && (
                        <>
                          <a className="trk-track" href={carrier.url} target="_blank" rel="noopener noreferrer">
                            Rastrear en {carrier.name} <FiExternalLink aria-hidden="true" />
                          </a>
                          <p className="trk-hint">Copia la guía y pégala en la página de {carrier.name}.</p>
                        </>
                      )}
                    </section>
                  )}

                  {o.items.length > 0 && (
                    <ul className="status-lines trk-items" aria-label="Productos">
                      {o.items.map((it, i) => (
                        <li key={i}>
                          <span>
                            {it.quantity} × {it.name}
                            {it.grind ? ` · ${it.grind === "grano" ? "en grano" : "molido"}` : ""}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {o.city && <p className="trk-city">Destino: {o.city}</p>}
                </>
              )}
            </div>
            {!state.loading && o && (
              <p className={`stamp nf-void ${o.isShipped || o.isPaid ? "is-paid" : ""}`} aria-hidden="true">
                {head.stamp}
              </p>
            )}
          </div>

          <Perforation vertical className="billete-perf" />

          <nav className="nf-stub" aria-label="Siguientes pasos">
            <h2 className="nf-stub-title">¿Dudas?</h2>
            <a className={o ? "nf-secondary" : "tear-button"} href={wa} target="_blank" rel="noopener noreferrer" data-source="seguimiento">
              <IoLogoWhatsapp aria-hidden="true" /> Escríbenos por WhatsApp
            </a>
            <Link className={o ? "tear-button" : "nf-secondary"} to="/">
              Volver a la tienda
            </Link>
          </nav>
        </article>
      </main>
      <SiteFooter onHome={false} />
    </div>
  );
}
