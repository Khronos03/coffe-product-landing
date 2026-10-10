// La finca: origen y familia, con viñetas grabadas provisionales.

import { ORIGIN } from "../../data/catalog";
import { Engraving } from "./Engraving";

// Ilustración grabada de Mistrató mientras llegan las fotos reales de la finca
// y la familia. Al tenerlas, reemplazar esta viñeta por la foto.
const VIGNETTES = [{ kind: "montana", caption: "Mistrató, Risaralda, a 1.950 m s.n.m." }];

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
              <dt>Finca</dt>
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
                    <Engraving kind={v.kind} className="vignette-art" />
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
