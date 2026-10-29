// El viaje del café: de la siembra a la taza, en seis paradas.
// El detalle de cada proceso vive en "Cómo se hace" (reverso); aquí solo el recorrido completo.
// Cada paso usa hechos confirmados por el productor (ver PRODUCT.md).

import { useEffect, useRef, useState } from "react";
import { LuCoffee, LuDroplets, LuFlame, LuPackage, LuSprout, LuTruck } from "react-icons/lu";
import { ORDER_TERMS } from "../../data/catalog";

const days = ORDER_TERMS.entrega.split(",")[0]; // "3 a 5 días hábiles"

const steps = (recipes) => [
  {
    icon: LuSprout,
    title: "Finca",
    text: "Castillo sembrado a 1.950 m en Mistrató, cosechado a mano en cereza madura.",
  },
  {
    icon: LuDroplets,
    title: "Beneficio",
    text: "En nuestro beneficio, cada lote sigue su proceso: Honey, Lavado, Natural o Piña-Whisky.",
    link: { href: "#proceso", label: "Ver cómo se hace" },
  },
  {
    icon: LuFlame,
    title: "Tostión",
    text: "La hacemos nosotros, en tostión media, cada semana.",
  },
  {
    icon: LuPackage,
    title: "Molienda",
    text: "En grano o molido para tu método: filtro, prensa, moka o espresso.",
  },
  {
    icon: LuTruck,
    title: "Envío",
    text: `A toda Colombia, en ${days}.`,
  },
  {
    icon: LuCoffee,
    title: "Tu taza",
    text: `Lo preparas a tu manera. Ideas en el recetario: ${recipes} recetas.`,
    last: true,
  },
];

export default function Viaje({ recipes }) {
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
            De la semilla a tu taza: lo sembramos, lo procesamos y lo tostamos nosotros, en la misma finca de Mistrató.
          </p>
        </div>

        <ol className="viaje-route">
          {steps(recipes).map(({ icon: Icon, title, text, link, last }, i) => (
            <li key={title} className={`viaje-step ${last ? "is-last" : ""}`} style={{ "--i": i }}>
              <span className="viaje-stamp" aria-hidden="true">
                <Icon className="viaje-icon" />
              </span>
              <span className="viaje-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="viaje-step-title">{title}</h3>
              <p className="viaje-step-text">{text}</p>
              {link && (
                <a className="viaje-link" href={link.href}>
                  {link.label}
                </a>
              )}
              {last && (
                <a className="viaje-cta" href="#serie">
                  Elegir mi café
                </a>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
