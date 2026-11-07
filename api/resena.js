// GET/POST /api/resena?t=<clave> — formulario de reseña del pedido (/resena/<clave>).
const { fetchForm, submitReview, ReviewError } = require("./_lib/reviews");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex");
  const token = String(req.query.t || "");
  try {
    if (req.method === "GET") return res.status(200).json(await fetchForm(token));
    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
      return res.status(200).json(await submitReview(token, body));
    }
    res.setHeader("Allow", "GET, POST");
    return res.status(405).end();
  } catch (err) {
    const known = err instanceof ReviewError;
    const status = known ? err.status : err instanceof SyntaxError ? 400 : 500;
    if (status >= 500) console.error("resena:", err.message);
    return res.status(status).json({ error: known ? err.message : "No pudimos procesar la reseña." });
  }
};
