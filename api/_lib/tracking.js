// Seguimiento público del pedido: la tienda pregunta al API del panel con la clave del link.
// Así el navegador no conoce la URL del panel, no hace falta CORS y la respuesta nunca se cachea.
//   ADMIN_API_URL   URL del API del panel (la misma que usa el pago con Wompi)

const TOKEN = /^[A-Za-z0-9_-]{16,64}$/;
const TIMEOUT_MS = 8000;

class TrackingError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function fetchTracking(token, env = process.env, fetchImpl = fetch) {
  if (!TOKEN.test(String(token || ""))) throw new TrackingError("El link de seguimiento no es válido.", 404);
  if (!env.ADMIN_API_URL) throw new TrackingError("El seguimiento no está disponible en este momento.", 503);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  let res;
  try {
    res = await fetchImpl(`${env.ADMIN_API_URL.replace(/\/$/, "")}/api/tracking/${encodeURIComponent(token)}`, {
      headers: { Accept: "application/json" },
      signal: ctrl.signal,
    });
  } catch (err) {
    // El panel en Render puede estar despertando: la página reintenta
    throw new TrackingError("El servidor está despertando. Intenta de nuevo en unos segundos.", 504);
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 404) throw new TrackingError("No encontramos este pedido. Revisa que el link esté completo.", 404);
  if (!res.ok) throw new TrackingError("No pudimos consultar el pedido.", 502);
  return toPublic(await res.json());
}

// Solo lo que la página muestra, aunque el panel enviara algo de más.
function toPublic(o = {}) {
  return {
    code: String(o.code || ""),
    date: o.date || null,
    firstName: String(o.firstName || ""),
    city: o.city || null,
    items: (Array.isArray(o.items) ? o.items : []).map((i) => ({
      name: String(i.name || "Café"),
      quantity: Number(i.quantity) || 1,
      grind: i.grind === "grano" || i.grind === "molido" ? i.grind : null,
    })),
    isPaid: Boolean(o.isPaid),
    isReady: Boolean(o.isReady),
    isShipped: Boolean(o.isShipped),
    carrier: o.carrier || null,
    trackingNumber: o.trackingNumber || null,
    shippedAt: o.shippedAt || null,
  };
}

module.exports = { fetchTracking, toPublic, TrackingError };
