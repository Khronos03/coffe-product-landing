// Fechas del panel en hora de Colombia.
// El panel guarda las fechas escogidas a mano como medianoche UTC ("2026-11-01T00:00:00Z"): esas son
// un día del calendario y se leen en UTC; leerlas en hora local las corre al día anterior.
// Las demás (pago en línea, envío, reseña) son instantes reales y se muestran en hora de Bogotá.

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;
const UTC_MIDNIGHT = /T00:00:00(\.0+)?(Z|\+00:00)?$/;

export function formatDate(iso, options) {
  if (!iso) return "";
  const s = String(iso);
  const calendarDay = DATE_ONLY.test(s) || UTC_MIDNIGHT.test(s);
  const d = new Date(DATE_ONLY.test(s) ? `${s}T00:00:00Z` : s);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("es-CO", { ...options, timeZone: calendarDay ? "UTC" : "America/Bogota" });
}
