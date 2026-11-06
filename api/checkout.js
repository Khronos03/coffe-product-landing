// POST /api/checkout — valida el pedido, calcula el total con los precios del servidor y firma el pago.
const { createCheckout, OrderError } = require("./_lib/wompi");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido." });
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    return res.status(200).json(createCheckout(body));
  } catch (err) {
    if (err instanceof OrderError) return res.status(400).json({ error: err.message, field: err.field || null });
    if (err.status === 503) return res.status(503).json({ error: err.message });
    console.error("checkout", err);
    return res.status(500).json({ error: "No pudimos preparar el pago. Intenta de nuevo o pide por WhatsApp." });
  }
};
