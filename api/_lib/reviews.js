// Reseñas: la tienda habla con el API del panel en nombre del navegador.
//   GET  /api/resena?t=<clave>   formulario de la reseña del pedido
//   POST /api/resena?t=<clave>   guarda la reseña (queda pendiente de aprobación)
//   GET  /api/resenas            reseñas aprobadas para la portada (cacheadas)
// La clave es la misma del link de seguimiento: solo quien compró la tiene.

const TOKEN = /^[A-Za-z0-9_-]{16,64}$/;
const TIMEOUT_MS = 8000;
const MAX_COMMENT = 600;
const MIN_COMMENT = 10;

class ReviewError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

function base(env) {
  if (!env.ADMIN_API_URL) throw new ReviewError("Las reseñas no están disponibles en este momento.", 503);
  return env.ADMIN_API_URL.replace(/\/$/, "");
}

async function call(url, init, fetchImpl) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    return await fetchImpl(url, { ...init, signal: ctrl.signal });
  } catch (err) {
    throw new ReviewError("El servidor está despertando. Intenta de nuevo en unos segundos.", 504);
  } finally {
    clearTimeout(timer);
  }
}

function checkToken(token) {
  if (!TOKEN.test(String(token || ""))) throw new ReviewError("El link de reseña no es válido.", 404);
}

async function fetchForm(token, env = process.env, fetchImpl = fetch) {
  checkToken(token);
  const res = await call(`${base(env)}/api/reviews/form/${encodeURIComponent(token)}`, { headers: { Accept: "application/json" } }, fetchImpl);
  if (res.status === 404) throw new ReviewError("No encontramos este pedido. Revisa que el link esté completo.", 404);
  if (!res.ok) throw new ReviewError("No pudimos abrir el formulario.", 502);
  const o = await res.json();
  return {
    code: String(o.code || ""),
    firstName: String(o.firstName || ""),
    displayName: String(o.displayName || ""),
    city: o.city || null,
    products: (Array.isArray(o.products) ? o.products : []).map(String).slice(0, 6),
    notYet: Boolean(o.notYet),
    alreadyReviewed: Boolean(o.alreadyReviewed),
  };
}

/** Valida aquí lo mismo que el panel para responder rápido y no despertar el servidor por nada. */
function validateReview(body = {}) {
  const rating = Number(body.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) throw new ReviewError("Elige de 1 a 5 estrellas.", 400);
  const comment = String(body.comment || "").trim();
  if (comment.length < MIN_COMMENT) throw new ReviewError(`Cuéntanos un poco más (mínimo ${MIN_COMMENT} caracteres).`, 400);
  if (comment.length > MAX_COMMENT) throw new ReviewError(`La reseña puede tener hasta ${MAX_COMMENT} caracteres.`, 400);
  return { rating, comment, allowPublish: body.allowPublish === true };
}

async function submitReview(token, body, env = process.env, fetchImpl = fetch) {
  checkToken(token);
  const review = validateReview(body);
  const res = await call(`${base(env)}/api/reviews/form/${encodeURIComponent(token)}`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(review),
  }, fetchImpl);
  if (res.status === 404) throw new ReviewError("No encontramos este pedido.", 404);
  if (res.status === 400) {
    const data = await res.json().catch(() => ({}));
    throw new ReviewError(String(data.message || data.error || "Revisa la reseña."), 400);
  }
  if (!res.ok) throw new ReviewError("No pudimos guardar tu reseña. Intenta de nuevo.", 502);
  return { ok: true };
}

async function fetchPublic(env = process.env, fetchImpl = fetch) {
  const res = await call(`${base(env)}/api/reviews/public`, { headers: { Accept: "application/json" } }, fetchImpl);
  if (!res.ok) throw new ReviewError("No pudimos cargar las reseñas.", 502);
  return toPublicList(await res.json());
}

// Solo lo que la portada muestra.
function toPublicList(o = {}) {
  const reviews = (Array.isArray(o.reviews) ? o.reviews : [])
    .map((r) => ({
      rating: Math.min(5, Math.max(1, Math.round(Number(r.rating) || 0))),
      comment: String(r.comment || "").slice(0, MAX_COMMENT),
      displayName: String(r.displayName || "").slice(0, 40),
      city: r.city ? String(r.city) : null,
      product: r.product ? String(r.product) : null,
      date: r.date || null,
      source: r.source === "manual" ? "manual" : "web",
    }))
    .filter((r) => r.comment && r.displayName);
  const count = reviews.length;
  const average = count ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10 : 0;
  return { count, average, reviews };
}

module.exports = { fetchForm, submitReview, fetchPublic, validateReview, toPublicList, ReviewError, MAX_COMMENT, MIN_COMMENT };
