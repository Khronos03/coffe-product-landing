// Serie especial: formatos (Cuarterón, drips) y regalos, como billetes pequeños.

import { useId, useState } from "react";
import { GIFTS, SPECIAL_SERIES, formatCOP, imageFor, whatsappUrl } from "../../data/catalog";
import { BuyButton, buildOrderMessage, focusField, grindLabelOf, GrindField, TearButton } from "./OrderStub";
import { track } from "../../analytics";
import { MIN_ONLINE, ONLINE_PAYMENTS, useCart } from "../../cart";
import { FiCheck } from "react-icons/fi";
import { Perforation } from "./Security";

function MiniTicket({ item }) {
  const uid = useId();
  const [optId, setOptId] = useState(item.defaultOption || item.options[0].id);
  const [grind, setGrind] = useState("");
  const [grindError, setGrindError] = useState(false);
  const cart = useCart();
  const [added, setAdded] = useState(false);
  const opt = item.options.find((o) => o.id === optId);
  const hasGrind = item.grind || (item.pair && item.pair.some((p) => p !== "drips"));
  const grindLabel = hasGrind ? grindLabelOf(grind) : null;
  const ready = !hasGrind || Boolean(grindLabel);
  const images = item.image ? [item.image] : item.pair.map(imageFor);
  const href = ready
    ? whatsappUrl(
        buildOrderMessage({
          product: item.name,
          sizeLabel: opt.label,
          grindLabel,
          price: opt.price,
        })
      )
    : `#${uid}-grind`;
  const onAdd = () => {
    if (!ready) {
      track("molienda_faltante", { origen: "agregar_formatos", producto: item.name });
      setGrindError(true);
      focusField(document.getElementById(`${uid}-grind`));
      return;
    }
    setAdded(cart.add(`${item.id}:${optId}`, hasGrind ? grind : null, 1));
  };

  const onBuy = () => {
    if (!ready) {
      track("molienda_faltante", { origen: "comprar_formatos", producto: item.name });
      setGrindError(true);
      focusField(document.getElementById(`${uid}-grind`));
      return;
    }
    cart.buy(`${item.id}:${optId}`, hasGrind ? grind : null);
  };
  // Bajo el mínimo de pago en línea (un drip suelto), el camino principal es WhatsApp.
  const online = ONLINE_PAYMENTS && opt.price >= MIN_ONLINE;

  const onTear = (e) => {
    if (ready) return;
    e.preventDefault();
    track("molienda_faltante", { origen: "formatos", producto: item.name });
    setGrindError(true);
    focusField(document.getElementById(`${uid}-grind`));
  };

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
          <div className="mini-copy">
            <h4 className="mini-name" id={`${uid}-name`}>
              {item.name}
            </h4>
            <p className="mini-line">{item.line}</p>
          </div>
        </div>

        <Perforation className="mini-perf" />

        <div className="mini-stub">
          {item.options.length > 1 ? (
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
                      onChange={() => {
                        setOptId(o.id);
                        setAdded(false);
                      }}
                    />
                    <span className="chip-size">{o.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ) : (
            <p className="mini-single">{opt.label}</p>
          )}

          {hasGrind && (
            <GrindField
              id={`${uid}-grind`}
              value={grind}
              onChange={(v) => {
                setGrind(v);
                setGrindError(false);
              }}
              error={grindError}
              compact
            />
          )}

          <div className="mini-buy">
            <p className="mini-price" aria-live="polite">
              <span className="stub-amount">{formatCOP(opt.price)}</span>
            </p>
            {online ? (
              <BuyButton className="is-compact" onBuy={onBuy}>
                Pedir y pagar<span className="sr-only">: {item.name}</span>
              </BuyButton>
            ) : (
              <TearButton
                href={href}
                className="is-compact"
                onTorn={onTear}
                trackData={{ source: "formatos", product: item.name, size: opt.label, grind: grindLabel, price: opt.price }}
              >
                Pedir<span className="sr-only"> {item.name} por WhatsApp</span>
              </TearButton>
            )}
          </div>
          <div className="mini-add-row">
            {online ? (
              <TearButton
                secondary
                href={href}
                onTorn={onTear}
                trackData={{ source: "formatos", product: item.name, size: opt.label, grind: grindLabel, price: opt.price }}
              >
                Pedir por WhatsApp<span className="sr-only">: {item.name}</span>
              </TearButton>
            ) : (
              <button type="button" className="stub-add is-compact" onClick={onAdd}>
                Agregar al pedido<span className="sr-only">: {item.name}</span>
              </button>
            )}
            {added && (
              <button type="button" className="stub-added-link" onClick={cart.open}>
                <FiCheck aria-hidden="true" /> Agregado. Ver pedido ({cart.count})
              </button>
            )}
          </div>
          {ONLINE_PAYMENTS && !online && (
            <p className="mini-note">Pago en línea desde {formatCOP(MIN_ONLINE)}: agrégalo a otro café o pídelo por WhatsApp.</p>
          )}
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
            {SPECIAL_SERIES.map((item) => (
              <MiniTicket key={item.id} item={item} />
            ))}
          </ul>
        </div>

        <div className="especial-group">
          <h3 className="especial-group-title">Para regalar</h3>
          <ul className="mini-grid is-two">
            {GIFTS.map((item) => (
              <MiniTicket key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
