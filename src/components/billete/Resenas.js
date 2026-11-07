// Reseñas de clientes con compra verificada (o enviadas por WhatsApp con permiso), aprobadas en el panel.
// La sección no existe hasta que haya al menos 3: mejor nada que una sección vacía o inventada.

import { useState } from "react";
import { StarRow } from "./Stars";
import { formatAverage, useReviews } from "./useReviews";
import { formatDate } from "../../dates";

const FIRST = 6;

const monthLabel = (iso) => formatDate(iso, { month: "long", year: "numeric" });

export default function Resenas() {
  const data = useReviews();
  const [all, setAll] = useState(false);

  if (!data) return null;

  const shown = all ? data.reviews : data.reviews.slice(0, FIRST);
  const avg = formatAverage(data.average);

  return (
    <section className="resenas" id="resenas" aria-labelledby="resenas-title" data-ink="violet">
      <div className="resenas-inner">
        <header className="resenas-head">
          <h2 className="resenas-title" id="resenas-title">Lo dicen en su taza</h2>
          <p className="resenas-score">
            <strong>{avg}</strong>
            <StarRow value={Math.round(data.average)} size={20} />
            <span>
              {data.count} {data.count === 1 ? "reseña" : "reseñas"} de clientes
            </span>
          </p>
        </header>

        <ul className={`resenas-list ${shown.length === 4 ? "is-two" : ""}`}>
          {shown.map((r, i) => (
            <li key={`${r.displayName}-${r.date}-${i}`} className="resena">
              <StarRow value={r.rating} />
              <blockquote className="resena-text">
                <p>{r.comment}</p>
              </blockquote>
              <footer className="resena-by">
                <span className="resena-name">{[r.displayName, r.city].filter(Boolean).join(", ")}</span>
                <span className="resena-meta">
                  {[r.product, monthLabel(r.date)].filter(Boolean).join(" · ")}
                </span>
                <span className="resena-tag">{r.source === "manual" ? "Recibida por WhatsApp" : "Compra verificada"}</span>
              </footer>
            </li>
          ))}
        </ul>

        {!all && data.reviews.length > FIRST && (
          <button type="button" className="resenas-more" onClick={() => setAll(true)}>
            Ver las {data.reviews.length} reseñas
          </button>
        )}
      </div>
    </section>
  );
}
