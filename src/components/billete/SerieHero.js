// Primera pantalla: un billete de la serie, a gran escala, con su desprendible.

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ORIGIN, SERIES } from "../../data/catalog";
import { Microtext, Perforation, Rosette, WaveField } from "./Security";
import OrderStub from "./OrderStub";

export default function SerieHero({ active, source = "pointer", onSelect, onOrderChange }) {
  const reduce = useReducedMotion();
  const tabRefs = useRef([]);
  const serie = SERIES.find((s) => s.id === active);
  const index = SERIES.indexOf(serie);

  const onKeyDown = (e) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let next = null;
    if (keys[e.key]) next = (index + keys[e.key] + SERIES.length) % SERIES.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = SERIES.length - 1;
    if (next === null) return;
    e.preventDefault();
    onSelect(SERIES[next].id, "keyboard");
    tabRefs.current[next] && tabRefs.current[next].focus();
  };

  // El lote nuevo entra de inmediato (sin esperar la salida del anterior).
  // Teclado: cambio instantáneo. Movimiento reducido: solo opacidad.
  // Se usa el string `transform` (no el atajo `x`) para que corra en el compositor.
  const entry =
    source === "keyboard"
      ? { initial: false }
      : reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.15, ease: "easeOut" } } }
      : {
          initial: { opacity: 0, transform: "translateX(12px)" },
          animate: {
            opacity: 1,
            transform: "translateX(0px)",
            transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
          },
        };

  return (
    <section className="serie-field" id="serie" aria-label="Serie de lotes">
      <span id="section1" className="anchor-alias" aria-hidden="true" />
      <span id="section2" className="anchor-alias" aria-hidden="true" />
      <WaveField className="field-waves" />

      <div className="serie-inner">
        <div className="serie-tabs" role="tablist" aria-label="Elige el proceso" onKeyDown={onKeyDown}>
          {SERIES.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              id={`tab-${s.id}`}
              aria-selected={s.id === active}
              aria-controls="billete-panel"
              tabIndex={s.id === active ? 0 : -1}
              className="serie-tab"
              data-ink={s.ink}
              onClick={(e) => onSelect(s.id, e.detail === 0 ? "keyboard" : "pointer")}
            >
              <span className="serie-tab-num">{s.serial}</span>
              <span className="serie-tab-name">{s.name}</span>
            </button>
          ))}
        </div>

        <article className="billete" id="billete-panel" role="tabpanel" aria-labelledby={`tab-${serie.id}`}>
          <div className="billete-body">
            <Microtext className="billete-micro" text="CUMBRE CAFÉ MISTRATÓ RISARALDA 1950 MSNM CASTILLO" />
            <div className="billete-issuer">
              <span>Cumbre Café</span>
              <span className="billete-issuer-mid">Café de especialidad de la finca</span>
              <span>Serie {serie.serial}</span>
            </div>

            <motion.div className="billete-main" key={serie.id} {...entry}>
                <div className="billete-copy">
                  <p className="billete-serial" aria-hidden="true">
                    {serie.serial}
                  </p>
                  <h1 className="billete-name">
                    <span className="sr-only">Cumbre Café, café de especialidad de Mistrató. Lote </span>
                    {serie.lot}
                  </h1>
                  <p className="billete-line">{serie.line}</p>

                </div>

                <div className="billete-vignette">
                  <Rosette className="billete-rosette" />
                  <span className="stamp stamp-mini" aria-hidden="true">
                    Lote de la finca
                  </span>
                  <img
                    className="billete-pack"
                    src={serie.image.src}
                    srcSet={serie.image.srcSet}
                    sizes="(max-width: 767px) 34vw, 260px"
                    alt={serie.imageAlt}
                    width="440"
                    height="800"
                    fetchpriority="high"
                    decoding="async"
                  />
                </div>
                <div className="billete-specs">
                    <dl className="billete-fields">
                      <div>
                        <dt>Perfil</dt>
                        <dd>{serie.perfil}</dd>
                      </div>
                      <div>
                        <dt>Variedad</dt>
                        <dd>{ORIGIN.variedad}</dd>
                      </div>
                      <div>
                        <dt>Altitud</dt>
                        <dd>{ORIGIN.altitud}</dd>
                      </div>
                      <div>
                        <dt>Tostión</dt>
                        <dd>Media</dd>
                      </div>
                      <div className="is-wide">
                        <dt>Notas</dt>
                        <dd>{serie.notas}</dd>
                      </div>
                    </dl>
                    <a className="billete-more" href="#proceso">
                      Cómo se hace este café
                    </a>
                </div>
            </motion.div>

            <div className="billete-foot">
              <span>{ORIGIN.finca}</span>
              <span>Venta directa del productor</span>
            </div>
            <Microtext className="billete-micro" text="CAFÉ DE ORIGEN COLOMBIANO PEDIDOS POR WHATSAPP ENVÍO A TODA COLOMBIA" />
          </div>

          <Perforation vertical className="billete-perf" />

          <OrderStub serie={serie} idPrefix="serie" onOrderChange={onOrderChange} />
        </article>
      </div>
    </section>
  );
}
