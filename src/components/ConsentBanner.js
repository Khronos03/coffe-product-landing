// Aviso de cookies: no bloquea la tienda, ofrece Aceptar y Rechazar con el mismo peso
// y enlaza la política. Reaparece desde "Configurar cookies" en el pie de página.

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CONSENT_OPEN_EVENT, readConsent, saveConsent } from "../consent";
import "../styles/consent.css";

export default function ConsentBanner() {
  const [open, setOpen] = useState(() => readConsent() === null);
  const [reopened, setReopened] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onOpen = () => {
      setReopened(true);
      setOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  // La barra de pedido móvil se apoya encima del aviso mientras esté abierto.
  useEffect(() => {
    const root = document.documentElement;
    if (!open || !ref.current) {
      root.style.removeProperty("--consent-h");
      return undefined;
    }
    const el = ref.current;
    const sync = () => root.style.setProperty("--consent-h", `${Math.ceil(el.getBoundingClientRect().height) + 10}px`);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    if (reopened) el.querySelector("button").focus();
    return () => {
      ro.disconnect();
      root.style.removeProperty("--consent-h");
    };
  }, [open, reopened]);

  if (!open) return null;

  const decide = (analytics) => {
    saveConsent(analytics);
    setOpen(false);
  };

  const current = readConsent();

  return (
    <section ref={ref} className="consent" aria-labelledby="consent-title">
      <h2 className="consent-title" id="consent-title">
        Este sitio web utiliza cookies
      </h2>
      <p className="consent-text">
        Utilizamos cookies de análisis de terceros (Google Analytics) para conocer cómo se usa el sitio y mejorar tu
        experiencia. Puedes aceptarlas o rechazarlas, y cambiar tu elección en cualquier momento. Más información en
        nuestra{" "}
        <Link to="/privacidad" className="consent-link">
          Política de privacidad y cookies
        </Link>
        .
      </p>
      {current && (
        <p className="consent-current">
          Tu elección actual: <strong>{current.analytics ? "cookies aceptadas" : "cookies rechazadas"}</strong>.
        </p>
      )}
      <div className="consent-actions">
        <button type="button" className="consent-btn is-accept" onClick={() => decide(true)}>
          Aceptar cookies
        </button>
        <button type="button" className="consent-btn" onClick={() => decide(false)}>
          Rechazar cookies
        </button>
      </div>
    </section>
  );
}
