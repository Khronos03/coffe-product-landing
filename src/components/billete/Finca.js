// La finca: origen y familia, con la foto real de la cosecha en el marco de viñeta.

import { ORIGIN } from "../../data/catalog";
import cosecha640 from "../../assets/finca/cosecha-640.webp";
import cosecha960 from "../../assets/finca/cosecha-960.webp";
import cosecha1280 from "../../assets/finca/cosecha-1280.webp";

const VIGNETTES = [
  {
    kind: "cosecha",
    src: cosecha640,
    srcSet: `${cosecha640} 640w, ${cosecha960} 960w, ${cosecha1280} 1280w`,
    width: 640,
    height: 416,
    alt: "Manos recogiendo cerezas de café maduras de una rama, entre granos aún verdes.",
    caption: "Cosecha a mano en la finca, Mistrató, Risaralda",
  },
];

export default function Finca() {
  return (
    <section className="finca" id="finca" aria-labelledby="finca-title">
      <div className="finca-inner">
        <div className="finca-copy">
          <div className="finca-text">
          <h2 id="finca-title" className="finca-title">
            Una familia caficultora en Mistrató
          </h2>
          <p>
            Cultivamos café hace más de 45 años en las montañas de Mistrató, Risaralda, a 1.950 metros sobre el nivel del
            mar. Sembramos Castillo, procesamos cada lote en nuestro propio beneficio y lo tostamos nosotros.
          </p>
          <p>
            Por eso te vendemos directo, sin intermediarios: el precio de un café de especialidad sin los recargos de la
            cadena.
          </p>
          </div>
          <div className="finca-aside">
          <dl className="finca-facts">
            <div>
              <dt>Origen</dt>
              <dd>{ORIGIN.finca}</dd>
            </div>
            <div>
              <dt>Altitud</dt>
              <dd>{ORIGIN.altitud}</dd>
            </div>
            <div>
              <dt>Variedad</dt>
              <dd>{ORIGIN.variedad}</dd>
            </div>
            <div>
              <dt>En el oficio</dt>
              <dd>{ORIGIN.anos}</dd>
            </div>
          </dl>
          <ul className="vignettes">
            {VIGNETTES.map((v) => (
              <li key={v.kind} className="vignette">
                <figure>
                  <div className="vignette-frame">
                    <img
                      className="vignette-photo"
                      src={v.src}
                      srcSet={v.srcSet}
                      sizes="(min-width: 768px) 40vw, 92vw"
                      width={v.width}
                      height={v.height}
                      alt={v.alt}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption>
                    <span className="vignette-caption">{v.caption}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          </div>
        </div>

      </div>
    </section>
  );
}
