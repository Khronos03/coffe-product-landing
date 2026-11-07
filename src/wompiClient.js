// Abre el pago de Wompi en el navegador. El monto y la firma los prepara el servidor (/api/checkout).

const WIDGET_SRC = "https://checkout.wompi.co/widget.js";
let loading = null;

/** Carga el widget de Wompi una sola vez. */
export function loadWompi() {
  if (window.WidgetCheckout) return Promise.resolve();
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = WIDGET_SRC;
    s.async = true;
    s.onload = () => (window.WidgetCheckout ? resolve() : reject(new Error("widget")));
    s.onerror = () => {
      loading = null;
      reject(new Error("widget"));
    };
    document.head.appendChild(s);
  });
  return loading;
}

export class CheckoutError extends Error {
  constructor(message, field = null, status = 0) {
    super(message);
    this.field = field;
    this.status = status;
  }
}

/** Pide al servidor el pago firmado. */
export async function prepareCheckout(lines, customer) {
  let res;
  try {
    res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: lines.map((l) => ({ sku: l.sku, grind: l.grind || undefined, qty: l.qty })),
        customer,
      }),
    });
  } catch (e) {
    throw new CheckoutError("No hay conexión. Revisa tu internet e intenta de nuevo.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new CheckoutError(data.error || "No pudimos preparar el pago.", data.field || null, res.status);
  return data;
}

/** Abre el widget. `onResult` recibe la transacción cuando el cliente termina en Wompi. */
export async function openWompi(config, onResult) {
  await loadWompi();
  const checkout = new window.WidgetCheckout({
    currency: config.currency,
    amountInCents: config.amountInCents,
    reference: config.reference,
    publicKey: config.publicKey,
    signature: config.signature,
    redirectUrl: config.redirectUrl,
    customerData: config.customerData,
    shippingAddress: config.shippingAddress,
  });
  checkout.open((result) => onResult(result && result.transaction));
}
