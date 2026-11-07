// El viaje del café: de la siembra a la taza, en siete paradas, igual que en la etiqueta impresa
// (reverso de la bolsa): medallones de papel con viñetas a color, número de parada y un camino punteado.
// El detalle de cada proceso vive en "Cómo se hace"; aquí solo el recorrido. Hechos confirmados por el
// productor (ver PRODUCT.md). El beneficio va genérico porque cambia por lote (el Natural no se despulpa).

import { useEffect, useRef, useState } from "react";
import { viajeIcon } from "./viajeIcons";

const steps = () => [
  { key: "siembra", title: "Siembra", text: "Nace la chapola en el germinador de la finca." },
  { key: "cultivo", title: "Cultivo", text: "Cosechado a mano, solo la cereza madura." },
  { key: "despulpado", title: "Beneficio", text: "Cada lote, su proceso: Honey, Lavado, Natural o Piña-Whisky." },
  { key: "secado", title: "Secado", text: "Al sol, volteado a diario." },
  { key: "tostion", title: "Tostión", text: "Tostión media, cada semana." },
  { key: "molienda", title: "Molienda", text: "En grano o molido para tu método." },
  { key: "taza", title: "Taza", text: "Lo preparas a tu manera, con ideas del recetario." },
];

// El SVG de cada viñeta es constante: se arma una vez.
const ART = Object.fromEntries(
  ["siembra", "cultivo", "despulpado", "secado", "tostion", "molienda", "taza"].map((k) => [k, { __html: viajeIcon(k) }])
);

export default function Viaje() {
  const ref = useRef(null);
  // Las paradas entran escalonadas una sola vez, solo si la sección aún no está a la vista al cargar.
  const [phase, setPhase] = useState("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight) return undefined;
    setPhase("ready");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("in");
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`viaje ${phase === "ready" ? "is-ready" : ""} ${phase === "in" ? "is-ready is-in" : ""}`}
      id="viaje"
      aria-labelledby="viaje-title"
    >
      <div className="viaje-inner">
        <div className="viaje-head">
          <h2 className="viaje-title" id="viaje-title">
            El viaje del café
          </h2>
          <p className="viaje-lede">
            De la semilla a tu taza: lo sembramos, lo cultivamos y lo procesamos nosotros, en nuestra finca de Mistrató.
          </p>
        </div>

        {/* role="list": Safari deja de anunciar como lista un <ol> sin viñetas */}
        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
        <ol className="viaje-route" role="list">
          {steps().map(({ key, title, text }, i) => (
            <li key={key} className="viaje-step" style={{ "--i": i }}>
              <span className="viaje-medal" aria-hidden="true">
                <svg className="viaje-art" viewBox="0 0 40 40" focusable="false" dangerouslySetInnerHTML={ART[key]} />
                <span className="viaje-badge">{i + 1}</span>
              </span>
              <p className="viaje-step-title">{title}</p>
              <p className="viaje-step-text">{text}</p>
            </li>
          ))}
        </ol>

        <div className="viaje-actions">
          <a className="viaje-cta" href="#serie">
            Elegir mi café
          </a>
          <a className="viaje-link" href="#proceso">
            Ver cómo se hace cada proceso
          </a>
        </div>
      </div>
    </section>
  );
}
