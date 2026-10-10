// Serie especial: formatos (Cuarterón, drips) y regalos, como billetes pequeños.

import { useId, useState } from "react";
import { GIFTS, GRIND_OPTIONS, SPECIAL_SERIES, formatCOP, imageFor, whatsappUrl } from "../../data/catalog";
import { buildOrderMessage, TearButton } from "./OrderStub";
import { Perforation } from "./Security";

function MiniTicket({ item, code }) {
  const uid = useId();
  const [optId, setOptId] = useState(item.options[0].id);
  const [grind, setGrind] = useState(GRIND_OPTIONS[0].id);
  const opt = item.options.find((o) => o.id === optId);
  const hasGrind = item.grind || (item.pair && item.pair.some((p) => p !== "drips"));
  const grindLabel = hasGrind ? GRIND_OPTIONS.find((g) => g.id === grind).label : null;
  const images = item.image ? [item.image] : item.pair.map(imageFor);
  const href = whatsappUrl(
    buildOrderMessage({
      product: item.name,
      sizeLabel: opt.label,
      grindLabel,
      price: opt.price,
    })
  );

  return (
    <li className="mini">
      <article className="mini-ticket" aria-labelledby={`${uid}-name`}>
        <div className="mini-body">
          <div className={`mini-art ${images.length > 1 ? "is-pair" : ""}`}>
            {images.map((im, i) => (
              <img
                key={i}
                src={im.src}
                srcSet={im.srcSet}
                sizes="(max-width: 767px) 30vw, 140px"
                alt=""
                loading="lazy"
                decoding="async"
                width="440"
                height="600"
              />
            ))}
          </div>
          <p className="mini-code" aria-hidden="true">
            Nº {code}
          </p>
          <div className="mini-copy">
            <h4 className="mini-name" id={`${uid}-name`}>
              {item.name}
            </h4>
            <p className="mini-line">{item.line}</p>
          </div>
        </div>

        <Perforation className="mini-perf" />

        <div className="mini-stub">
          <fieldset className="mini-options">
            <legend className="sr-only">Opción de {item.name}</legend>
            <div className="chips is-compact">
              {item.options.map((o) => (
                <label key={o.id} className={`chip ${o.id === optId ? "is-on" : ""}`}>
                  <input
                    type="radio"
                    name={`${uid}-opt`}
                    value={o.id}
                    checked={o.id === optId}
                    onChange={() => setOptId(o.id)}
                  />
                  <span className="chip-size">{o.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {hasGrind && (
            <label className="stub-field is-compact" htmlFor={`${uid}-grind`}>
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
          )}

          <div className="mini-buy">
            <p className="mini-price" aria-live="polite">
              <span className="stub-amount">{formatCOP(opt.price)}</span>
            </p>
            <TearButton href={href} className="is-compact">
              Pedir
            </TearButton>
          </div>
        </div>
      </article>
    </li>
  );
}

export default function SerieEspecial() {
  return (
    <section className="especial" id="especial" aria-labelledby="especial-title">
      <span id="section-gifts" className="anchor-alias" aria-hidden="true" />
      <div className="especial-inner">
        <h2 id="especial-title" className="especial-title">
          Formatos y regalos
        </h2>
        <p className="especial-lede">El formato familiar de 5 libras, drips de una porción y cajas para regalar.</p>

        <div className="especial-group">
          <h3 className="especial-group-title">Formatos</h3>
          <ul className="mini-grid is-two">
            {SPECIAL_SERIES.map((item, i) => (
              <MiniTicket key={item.id} item={item} code={`E·${i + 1}`} />
            ))}
          </ul>
        </div>

        <div className="especial-group">
          <h3 className="especial-group-title">Para regalar</h3>
          <ul className="mini-grid is-two">
            {GIFTS.map((item, i) => (
              <MiniTicket key={item.id} item={item} code={`R·${i + 1}`} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
