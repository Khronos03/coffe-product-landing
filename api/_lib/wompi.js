// Núcleo del pago con Wompi (servidor). Lo usan las funciones de Vercel en /api.
//
// El pedido no necesita base de datos: viaja codificado en la referencia del pago, que queda
// protegida por la firma de integridad (Wompi rechaza cualquier pago cuya referencia o monto
// no coincidan con la firma). Al confirmar, la referencia se decodifica y se recalcula el total.
//
// Variables de entorno (Vercel → Settings → Environment Variables):
//   WOMPI_ENV               "sandbox" (pruebas) o "production"
//   WOMPI_PUBLIC_KEY        pub_test_… / pub_prod_…
//   WOMPI_INTEGRITY_SECRET  secreto de integridad (nunca en el navegador)
//   WOMPI_EVENTS_SECRET     secreto de eventos, para verificar los avisos
//   ADMIN_API_URL           opcional: URL del API privado que registra la venta
//   WEB_ORDERS_KEY          opcional: llave compartida con el API privado

const crypto = require("crypto");
const PRICES = require("../../src/data/prices.json");

const SITE_URL = "https://www.cumbrecafe.shop";
const MAX_LINES = 8;
const MAX_QTY = 20;

const BY_CODE = Object.fromEntries(Object.entries(PRICES.items).map(([sku, it]) => [it.code, { sku, ...it }]));
const GRIND_BY_CODE = Object.fromEntries(Object.entries(PRICES.grinds).map(([id, g]) => [g.code, { id, ...g }]));

const sha256 = (text) => crypto.createHash("sha256").update(text, "utf8").digest("hex");

function apiBase(env = process.env.WOMPI_ENV) {
  return env === "production" ? "https://production.wompi.co/v1" : "https://sandbox.wompi.co/v1";
}

class OrderError extends Error {
  constructor(message, field) {
    super(message);
    this.field = field;
  }
}

/** Valida las líneas del pedido contra prices.json y devuelve líneas con precio del servidor. */
function priceLines(items) {
  if (!Array.isArray(items) || items.length === 0) throw new OrderError("El pedido está vacío.", "items");
  if (items.length > MAX_LINES) throw new OrderError(`Máximo ${MAX_LINES} productos distintos por pago.`, "items");
  const seen = new Set();
  return items.map((raw) => {
    const it = PRICES.items[raw && raw.sku];
    if (!it) throw new OrderError("Hay un producto que ya no está disponible.", "items");
    const qty = Number(raw.qty);
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) throw new OrderError(`Cantidad inválida (1 a ${MAX_QTY}).`, "items");
    let grind = null;
    if (it.grind) {
      grind = PRICES.grinds[raw.grind];
      if (!grind) throw new OrderError(`Falta la molienda de ${it.product} ${it.option}.`, "items");
    }
    const key = `${raw.sku}|${raw.grind || ""}`;
    if (seen.has(key)) throw new OrderError("Hay productos repetidos en el pedido.", "items");
    seen.add(key);
    return {
      sku: raw.sku,
      code: it.code,
      product: it.product,
      serial: it.serial || null,
      option: it.option,
      grindId: grind ? raw.grind : null,
      grindCode: grind ? grind.code : "",
      grind: grind ? grind.label : null,
      qty,
      unitPrice: it.price,
      total: it.price * qty,
    };
  });
}

/** Referencia única y legible: CC-<tiempo><azar>-<líneas>. Ej.: CC-MH3K2A9Q7F-HO250Fx2.DR10x1 */
function buildReference(lines, now = Date.now(), rand = crypto.randomBytes(3).toString("hex").toUpperCase()) {
  const token = lines.map((l) => `${l.code}${l.grindCode}x${l.qty}`).join(".");
  return `CC-${now.toString(36).toUpperCase()}${rand}-${token}`;
}

/** Decodifica una referencia a líneas con precio. Lanza OrderError si no es válida. */
function parseReference(reference) {
  const m = /^CC-[0-9A-Z]+-([0-9A-Za-z.]+)$/.exec(reference || "");
  if (!m) throw new OrderError("Referencia con formato desconocido.");
  const items = m[1].split(".").map((tok) => {
    const t = /^([A-Z0-9]+?)([GFPME]?)x(\d+)$/.exec(tok);
    if (!t) throw new OrderError("Línea de referencia inválida.");
    // El código de producto puede terminar en letra igual a una molienda (no ocurre hoy); se prueba primero con molienda.
    let item = BY_CODE[t[1]];
    let grindCode = t[2];
    if (!item && t[2]) {
      item = BY_CODE[t[1] + t[2]];
      grindCode = "";
    }
    if (!item) throw new OrderError("Producto desconocido en la referencia.");
    const grind = grindCode ? GRIND_BY_CODE[grindCode] : null;
    return { sku: item.sku, grind: grind ? grind.id : undefined, qty: Number(t[3]) };
  });
  return priceLines(items);
}

const totalOf = (lines) => lines.reduce((sum, l) => sum + l.total, 0);

/** Firma de integridad de Wompi: SHA256(referencia + monto en centavos + moneda + secreto). */
function integritySignature(reference, amountInCents, currency, secret) {
  return sha256(`${reference}${amountInCents}${currency}${secret}`);
}

/** Datos del comprador, validados. */
function cleanCustomer(c = {}) {
  const s = (v) => (typeof v === "string" ? v.trim().replace(/\s+/g, " ") : "");
  const name = s(c.name);
  const email = s(c.email).toLowerCase();
  const phone = s(c.phone).replace(/[^\d]/g, "").replace(/^57(?=3\d{9}$)/, "");
  const city = s(c.city);
  const region = s(c.region);
  const address = s(c.address);
  if (name.length < 3 || name.length > 80) throw new OrderError("Escribe tu nombre completo.", "name");
  if (!/^3\d{9}$/.test(phone)) throw new OrderError("Escribe un celular colombiano de 10 dígitos.", "phone");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 120) throw new OrderError("Escribe un correo válido.", "email");
  if (region.length < 3 || region.length > 60) throw new OrderError("Escribe el departamento.", "region");
  if (city.length < 2 || city.length > 60) throw new OrderError("Escribe la ciudad o municipio.", "city");
  if (address.length < 6 || address.length > 160) throw new OrderError("Escribe la dirección de entrega.", "address");
  return { name, email, phone, city, region, address, notes: s(c.notes).slice(0, 200) };
}

/** Prepara todo lo que necesita el widget de Wompi para abrir el pago. */
// A dónde vuelve el cliente tras pagar por PSE o Bancolombia. En un preview de Vercel, al mismo preview
// (VERCEL_BRANCH_URL la pone Vercel) para no mezclar las pruebas con el sitio real.
function siteUrl(env) {
  if (env.PUBLIC_SITE_URL) return env.PUBLIC_SITE_URL.replace(/\/+$/, "");
  if (env.VERCEL_ENV === "preview" && env.VERCEL_BRANCH_URL) return `https://${env.VERCEL_BRANCH_URL}`;
  return SITE_URL;
}

function createCheckout(body, env = process.env) {
  if (!env.WOMPI_PUBLIC_KEY || !env.WOMPI_INTEGRITY_SECRET) {
    const err = new Error("Los pagos en línea aún no están configurados.");
    err.status = 503;
    throw err;
  }
  const lines = priceLines(body && body.items);
  const min = PRICES.minOnline || 0;
  if (totalOf(lines) < min) throw new OrderError(`El pago en línea es para pedidos desde ${min.toLocaleString("es-CO")} COP. Agrega otro café o envíalo por WhatsApp.`, "items");
  const customer = cleanCustomer(body && body.customer);
  const amountInCents = totalOf(lines) * 100;
  const reference = buildReference(lines);
  const currency = "COP";
  return {
    publicKey: env.WOMPI_PUBLIC_KEY,
    currency,
    amountInCents,
    reference,
    signature: { integrity: integritySignature(reference, amountInCents, currency, env.WOMPI_INTEGRITY_SECRET) },
    redirectUrl: `${siteUrl(env)}/pedido/estado`,
    customerData: {
      email: customer.email,
      fullName: customer.name,
      phoneNumber: customer.phone,
      phoneNumberPrefix: "+57",
    },
    shippingAddress: {
      addressLine1: customer.address,
      city: customer.city,
      region: customer.region,
      country: "CO",
      phoneNumber: customer.phone,
    },
    lines: lines.map(({ product, option, grind, qty, total }) => ({ product, option, grind, qty, total })),
  };
}

/** Lee un valor por ruta "transaction.id" dentro de data. */
const pick = (obj, path) => path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);

/**
 * Verifica un evento de Wompi: SHA256( valores de signature.properties (en orden) + timestamp + secreto de eventos )
 * debe ser igual a signature.checksum.
 */
function verifyEvent(event, secret) {
  if (!event || !event.signature || !Array.isArray(event.signature.properties) || !secret) return false;
  const values = event.signature.properties.map((p) => {
    const v = pick(event.data, p);
    return v == null ? "" : String(v);
  });
  const expected = sha256(`${values.join("")}${event.timestamp}${secret}`);
  const given = String(event.signature.checksum || "").toLowerCase();
  return given.length === expected.length && crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected));
}

/** Consulta la transacción directamente a Wompi (no se confía solo en el aviso ni en el navegador). */
async function fetchTransaction(id, env = process.env, fetchImpl = fetch) {
  if (!/^[\w-]{6,64}$/.test(id || "")) throw new OrderError("Transacción inválida.");
  const res = await fetchImpl(`${apiBase(env.WOMPI_ENV)}/transactions/${encodeURIComponent(id)}`);
  if (!res.ok) {
    const err = new Error(`Wompi respondió ${res.status}`);
    err.status = res.status === 404 ? 404 : 502;
    throw err;
  }
  const json = await res.json();
  return json.data;
}

/** Convierte una transacción aprobada en la venta que registra el panel privado. */
// La consulta a Wompi (GET /transactions/:id) no devuelve la dirección de envío; el aviso de eventos sí.
// El aviso llega firmado con el secreto de eventos, así que se toma de ahí, solo si es de esta transacción.
function toWebOrder(tx, eventTx) {
  const lines = parseReference(tx.reference);
  const total = totalOf(lines);
  if (total * 100 !== tx.amount_in_cents) throw new OrderError("El monto pagado no coincide con el pedido.");
  const ship =
    tx.shipping_address || (eventTx && eventTx.id === tx.id && eventTx.shipping_address) || {};
  const cust = tx.customer_data || {};
  return {
    reference: tx.reference,
    transactionId: tx.id,
    status: tx.status,
    paymentMethod: tx.payment_method_type || null,
    paidAt: tx.finalized_at || tx.created_at || null,
    amount: total,
    shippingPaidOnDelivery: true,
    customer: {
      name: cust.full_name || ship.name || null,
      email: tx.customer_email || null,
      phone: (cust.phone_number || ship.phone_number || "").replace(/^\+?57/, "") || null,
      address: ship.address_line_1 || null,
      city: ship.city || null,
      region: ship.region || null,
    },
    items: lines.map(({ sku, product, option, grind, grindId, qty, unitPrice, total: t }) => ({
      sku,
      product,
      option,
      grind,
      grindId,
      qty,
      unitPrice,
      total: t,
    })),
  };
}

/** Lo que la página de estado puede mostrar (sin datos personales). */
function publicStatus(tx) {
  let lines = [];
  try {
    lines = parseReference(tx.reference);
  } catch (e) {
    lines = [];
  }
  return {
    status: tx.status,
    reference: tx.reference,
    amount: Math.round(tx.amount_in_cents / 100),
    paymentMethod: tx.payment_method_type || null,
    // sku y grindId permiten rehacer el pedido si el pago falló y el cliente volvió en otro navegador
    lines: lines.map(({ sku, grindId, product, option, grind, qty, total }) => ({ sku, grindId: grindId || null, product, option, grind, qty, total })),
  };
}

/** Registra la venta en el panel privado. Idempotente por referencia (el panel ignora duplicados). */
async function forwardToAdmin(order, env = process.env, fetchImpl = fetch) {
  if (!env.ADMIN_API_URL || !env.WEB_ORDERS_KEY) return { skipped: true };
  const res = await fetchImpl(`${env.ADMIN_API_URL.replace(/\/$/, "")}/api/web-orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Web-Orders-Key": env.WEB_ORDERS_KEY },
    body: JSON.stringify(order),
  });
  // El panel responde 200 también cuando el pago ya estaba registrado (aviso repetido).
  if (!res.ok) {
    let detail = "";
    try {
      detail = (await res.json()).message || "";
    } catch (e) {
      /* sin cuerpo */
    }
    throw new Error(`El panel respondió ${res.status}${detail ? `: ${detail}` : ""}`);
  }
  const body = await res.json().catch(() => ({}));
  return { ok: true, status: res.status, saleId: body.saleId, newClient: body.newClient, duplicate: body.duplicate };
}

module.exports = {
  OrderError,
  priceLines,
  buildReference,
  parseReference,
  totalOf,
  integritySignature,
  cleanCustomer,
  createCheckout,
  verifyEvent,
  fetchTransaction,
  toWebOrder,
  publicStatus,
  forwardToAdmin,
  apiBase,
  sha256,
};
