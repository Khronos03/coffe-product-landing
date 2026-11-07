// GET /api/seguimiento?t=<clave> — estado público del pedido para /seguimiento/<clave>.
// Sin dirección, celular ni correo: el link se puede reenviar.
const { fetchTracking, TrackingError } = require("./_lib/tracking");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Robots-Tag", "noindex");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end();
  }
  try {
    return res.status(200).json(await fetchTracking(String(req.query.t || "")));
  } catch (err) {
    const status = err instanceof TrackingError ? err.status : 500;
    if (status >= 500) console.error("seguimiento:", err.message);
    return res.status(status).json({ error: err instanceof TrackingError ? err.message : "No pudimos consultar el pedido." });
  }
};
