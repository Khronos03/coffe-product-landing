// POST /api/wompi-eventos — URL de eventos configurada en el panel de Wompi.
// Verifica la firma del aviso, confirma la transacción con Wompi y, si está aprobada,
// registra la venta en el panel privado. Responde 200 para que Wompi no reintente sin necesidad.
const { verifyEvent, fetchTransaction, toWebOrder, forwardToAdmin } = require("./_lib/wompi");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }
  const event = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  if (!verifyEvent(event, process.env.WOMPI_EVENTS_SECRET)) {
    console.warn("wompi-eventos: firma inválida");
    return res.status(401).json({ error: "Firma inválida." });
  }
  if (event.event !== "transaction.updated") return res.status(200).json({ ignored: event.event });

  const id = event.data && event.data.transaction && event.data.transaction.id;
  try {
    // Fuente de verdad: la transacción consultada a Wompi, no el contenido del aviso.
    const tx = await fetchTransaction(id);
    if (tx.status !== "APPROVED") return res.status(200).json({ status: tx.status });
    const order = toWebOrder(tx, event.data.transaction);
    const result = await forwardToAdmin(order);
    console.log(
      "wompi-eventos: pago aprobado",
      order.reference,
      result.skipped
        ? "(panel sin configurar)"
        : `→ panel${result.saleId ? `: venta ${result.saleId}` : ""}${result.duplicate ? " (ya registrada)" : result.newClient ? ", cliente nuevo" : ""}`
    );
    return res.status(200).json({ ok: true, reference: order.reference });
  } catch (err) {
    // Si el panel falla, 500 hace que Wompi reintente el aviso más tarde.
    console.error("wompi-eventos", id, err.message);
    return res.status(500).json({ error: "No se pudo procesar el evento." });
  }
};
