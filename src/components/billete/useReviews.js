// Reseñas aprobadas: una sola consulta por visita, compartida por el billete y la sección.
import { useEffect, useState } from "react";

export const MIN_TO_SHOW = 3;
let request = null;

function load() {
  if (!request) {
    request = fetch("/api/resenas")
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);
  }
  return request;
}

/** null mientras carga o si no hay suficientes reseñas para mostrar. */
export function useReviews() {
  const [data, setData] = useState(null);
  useEffect(() => {
    let alive = true;
    load().then((d) => alive && setData(d && d.count >= MIN_TO_SHOW ? d : null));
    return () => {
      alive = false;
    };
  }, []);
  return data;
}

export const formatAverage = (n) => n.toLocaleString("es-CO", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
