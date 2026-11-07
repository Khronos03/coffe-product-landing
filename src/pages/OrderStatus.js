// /pedido/estado?id=<transacción> — a donde vuelve el cliente después de pagar en Wompi.
// El estado se consulta al servidor (que pregunta a Wompi); nunca se da por pagado desde el navegador.

import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import "@fontsource-variable/archivo/wdth";
import "@fontsource-variable/big-shoulders-display";
import "../styles/billete.css";
import "../styles/notfound.css";
import { formatCOP, whatsappUrl } from "../data/catalog";
import { SiteFooter, SiteHeader } from "../components/billete/Chrome";
import { Perforation, WaveField } from "../components/billete/Security";
import { useCart } from "../cart";
import { track } from "../analytics";
import { useDocumentMeta } from "../seo";

const POLL_MS = 4000;
const POLL_MAX = 15; // ~1 minuto

const METHOD = {
  CARD: "Tarjeta",
  PSE: "PSE",
  NEQUI: "Nequi",
  DAVIPLATA: "Daviplata",
  BANCOLOMBIA_TRANSFER: "Botón Bancolombia",
  BANCOLOMBIA_QR: "QR Bancolombia",
};

const COPY = {
  APPROVED: {
    stamp: "Pagado",
    title: "Pago recibido",
    text: "Tu pedido quedó pagado. Te escribimos por WhatsApp para coordinar el envío; el flete lo pagas al recibir, directamente a la transportadora.",
  },
  PENDING: {
    stamp: "En proceso",
    title: "Tu pago está en proceso",
    text: "Wompi todavía está confirmando el pago. Esta página se actualiza sola; no cierres ni vuelvas a pagar.",
  },
  DECLINED: {
    stamp: "Sin pagar",
    title: "El pago no se completó",
    text: "El banco o el medio de pago rechazó la transacción. No se hizo ningún cobro. Puedes intentarlo de nuevo o enviarnos el pedido por WhatsApp.",
  },
  VOIDED: {
    stamp: "Anulado",
    title: "El pago fue anulado",
    text: "La transacción se anuló y no quedó ningún cobro. Puedes intentarlo de nuevo o enviarnos el pedido por WhatsApp.",
  },
  ERROR: {
    stamp: "Sin pagar",
    title: "Hubo un error con el pago",
    text: "No se completó la transacción. Puedes intentarlo de nuevo o enviarnos el pedido por WhatsApp.",
  },
  NOT_FOUND: {
    stamp: "Sin datos",
    title: "No encontramos este pago",
    text: "Puede que el enlace esté incompleto. Si pagaste, escríbenos por WhatsApp con la referencia de tu comprobante de Wompi.",
  },
};

export default function OrderStatus() {
  useDocumentMeta({ title: "Estado de tu pago | Cumbre Café", description: "Estado de tu pago en Cumbre Café.", noindex: true });
  const [params] = useSearchParams();
  const id = params.get("id") || "";
  const cart = useCart();
  const [state, setState] = useState({ loading: true, data: null, status: null });
  const polls = useRef(0);
  const counted = useRef(false);

  useEffect(() => {
    let timer;
    let alive = true;
    const load = async () => {
      if (!id) {
        setState({ loading: false, data: null, status: "NOT_FOUND" });
        return;
      }
      try {
        const res = await fetch(`/api/pedido-estado?id=${encodeURIComponent(id)}`);
        const data = res.ok ? await res.json() : null;
        if (!alive) return;
        const status = data ? data.status : res.status === 404 || res.status === 400 ? "NOT_FOUND" : "PENDING";
        setState({ loading: false, data, status });
        if (status === "PENDING" && polls.current < POLL_MAX) {
          polls.current += 1;
          timer = setTimeout(load, POLL_MS);
        }
      } catch (e) {
        if (!alive) return;
        setState((s) => ({ ...s, loading: false, status: s.status || "PENDING" }));
        if (polls.current < POLL_MAX) {
          polls.current += 1;
          timer = setTimeout(load, POLL_MS);
        }
      }
    };
    load();
    return () => {
      alive = false;
      clearTimeout(timer);
    };
  }, [id]);

  // Pago aprobado: se vacía el pedido y se cuenta la compra una sola vez.
  useEffect(() => {
    if (state.status !== "APPROVED" || counted.current || !state.data) return;
    counted.current = true;
    cart.clear();
    const key = `cumbre:compra:${state.data.reference}`;
    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, "1");
    } catch (e) {
      /* sin almacenamiento */
    }
    track("purchase", { transaction_id: state.data.reference, value: state.data.amount, currency: "COP" });
  }, [state, cart]);

  // Reintentar: si el pedido no está en este navegador (el banco o la app volvieron a otro), se rehace
  // con las líneas del pago antes de abrirlo.
  const retry = () => {
    if (cart.count === 0 && state.data && Array.isArray(state.data.lines)) {
      state.data.lines.forEach((l) => l.sku && cart.add(l.sku, l.grindId || null, l.qty || 1));
    }
    cart.open();
  };

  const copy = COPY[state.status] || COPY.PENDING;
  const data = state.data;
  const ok = state.status === "APPROVED";
  const failed = ["DECLINED", "VOIDED", "ERROR"].includes(state.status);
  const notFound = state.status === "NOT_FOUND";
  const pending = !ok && !failed && !notFound;
  const wa = whatsappUrl([
    ok ? "¡Hola, Cumbre Café! Acabo de pagar mi pedido en la web." : "¡Hola, Cumbre Café! Tuve un problema pagando mi pedido en la web.",
    data ? `Referencia: ${data.reference}` : id ? `Transacción: ${id}` : "",
  ].filter(Boolean));

  return (
    <div className="bt nf is-status" data-ink="violet">
      <SiteHeader onHome={false} skipTo="#estado" skipLabel="Saltar al estado del pago" />
      <main className="nf-field">
        <WaveField className="field-waves" />
        <article className="nf-ticket" id="estado" aria-labelledby="estado-title" aria-busy={state.loading}>
          <div className="nf-body">
            <div className="billete-issuer">
              <span>Cumbre Café</span>
              <span className="billete-issuer-mid">Comprobante de pago</span>
              <span>Wompi</span>
            </div>
            <div className="nf-main">
              <h1 className="nf-title" id="estado-title">
                {state.loading ? "Consultando tu pago…" : copy.title}
              </h1>
              {!state.loading && (
                <p className="nf-line" role="status">
                  {copy.text}
                </p>
              )}
              {data && (
                <>
                  <ul className="status-lines">
                    {data.lines.map((l, i) => (
                      <li key={i}>
                        <span>
                          {l.qty} × {l.product} · {l.option}
                          {l.grind ? ` · ${l.grind}` : ""}
                        </span>
                        <span className="num">{formatCOP(l.total)}</span>
                      </li>
                    ))}
                  </ul>
                  <dl className="nf-fields">
                    <div className="is-wide">
                      <dt>Referencia</dt>
                      <dd className="nf-path">{data.reference}</dd>
                    </div>
                    <div>
                      <dt>{ok ? "Pagado" : "Valor"}</dt>
                      <dd>
                        {formatCOP(data.amount)}
                        {data.paymentMethod && METHOD[data.paymentMethod] ? ` · ${METHOD[data.paymentMethod]}` : ""}
                      </dd>
                    </div>
                  </dl>
                </>
              )}
            </div>
            {!state.loading && (
              <p className={`stamp nf-void ${ok ? "is-paid" : ""}`} aria-hidden="true">
                {copy.stamp}
              </p>
            )}
          </div>

          <Perforation vertical className="billete-perf" />

          <nav className="nf-stub" aria-label="Siguientes pasos">
            <h2 className="nf-stub-title">{ok ? "¿Y ahora?" : "Sigue por aquí"}</h2>
            {/* Pagado o en proceso: nosotros escribimos; WhatsApp queda para dudas.
                Sin pagar: reintentar primero. Sin datos: WhatsApp es la ayuda. */}
            {failed && (
              <button type="button" className="tear-button" onClick={retry}>
                Intentar de nuevo
              </button>
            )}
            {(ok || pending) && (
              <Link className="tear-button" to="/">
                Volver a la tienda
              </Link>
            )}
            <a
              className={notFound ? "tear-button" : "nf-secondary"}
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              data-source="estado-pago"
            >
              <IoLogoWhatsapp aria-hidden="true" /> {notFound ? "Escribir por WhatsApp" : "¿Dudas? Escríbenos"}
            </a>
            {(failed || notFound) && (
              <Link className="nf-secondary" to="/">
                Volver a la tienda
              </Link>
            )}
          </nav>
        </article>
      </main>
      <SiteFooter onHome={false} sell={false} />
    </div>
  );
}
