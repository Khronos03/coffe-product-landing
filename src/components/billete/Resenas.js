// Reseñas de clientes con compra verificada (o enviadas por WhatsApp con permiso), aprobadas en el panel.
// La sección no existe hasta que haya al menos 3: mejor nada que una sección vacía o inventada.

import { useEffect, useState } from "react";
import { StarRow } from "./Stars";

export const MIN_TO_SHOW = 3;
const FIRST = 6;

const monthLabel = (iso) => {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("es-CO", { month: "long", year: "numeric" });
};

export default function Resenas() {
  const [data, setData] = useState(null);
  const [all, setAll] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch("/api/resenas")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => alive && setData(d))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (!data || data.count < MIN_TO_SHOW) return null;

  const shown = all ? data.reviews : data.reviews.slice(0, FIRST);
  const avg = data.average.toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

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

        <ul className="resenas-list">
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
