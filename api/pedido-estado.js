// GET /api/pedido-estado?id=<transacción> — estado del pago para la página de confirmación.
// Devuelve solo estado, monto y productos: nada de datos personales.
const { fetchTransaction, publicStatus, OrderError } = require("./_lib/wompi");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).end();
  }
  try {
    const tx = await fetchTransaction(String(req.query.id || ""));
    return res.status(200).json(publicStatus(tx));
  } catch (err) {
    if (err instanceof OrderError) return res.status(400).json({ error: err.message });
    return res.status(err.status === 404 ? 404 : 502).json({ error: "No pudimos consultar el pago." });
  }
};
