// Pruebas del núcleo de pago. Ejecutar: npm run test:api
const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("crypto");
const W = require("./wompi");

const ENV = { WOMPI_PUBLIC_KEY: "pub_test_X", WOMPI_INTEGRITY_SECRET: "test_integrity_S3CR3T", WOMPI_ENV: "sandbox" };
const CUSTOMER = {
  name: "Ana María Ríos",
  phone: "+57 321 555 1234",
  email: "Ana@Example.com",
  region: "Antioquia",
  city: "Medellín",
  address: "Cra 43A # 1-50, apto 301",
};
const ITEMS = [
  { sku: "honey:250", grind: "filtro", qty: 2 },
  { sku: "drips:caja10", qty: 1 },
];

test("el total sale de los precios del servidor, no del navegador", () => {
  const c = W.createCheckout({ items: [{ ...ITEMS[0], price: 1 }, ITEMS[1]], customer: CUSTOMER }, ENV);
  assert.equal(c.amountInCents, (2 * 25000 + 20000) * 100);
  assert.equal(c.currency, "COP");
  assert.equal(c.publicKey, "pub_test_X");
});

test("la firma de integridad sigue la fórmula de Wompi", () => {
  const c = W.createCheckout({ items: ITEMS, customer: CUSTOMER }, ENV);
  const expected = crypto
    .createHash("sha256")
    .update(`${c.reference}${c.amountInCents}COP${ENV.WOMPI_INTEGRITY_SECRET}`)
    .digest("hex");
  assert.equal(c.signature.integrity, expected);
  assert.match(c.signature.integrity, /^[0-9a-f]{64}$/);
});

test("la referencia guarda el pedido y se decodifica igual", () => {
  const lines = W.priceLines(ITEMS);
  const ref = W.buildReference(lines, 1790000000000, "A1B2C3");
  assert.equal(ref, "CC-MUBBS7I8A1B2C3-HO250Fx2.DR10x1");
  const back = W.parseReference(ref);
  assert.deepEqual(
    back.map((l) => [l.sku, l.grindId, l.qty, l.total]),
    [
      ["honey:250", "filtro", 2, 50000],
      ["drips:caja10", null, 1, 20000],
    ]
  );
});

test("todas las combinaciones de producto y molienda sobreviven a la referencia", () => {
  const P = require("../../src/data/prices.json");
  for (const [sku, it] of Object.entries(P.items)) {
    const grinds = it.grind ? Object.keys(P.grinds) : [undefined];
    for (const grind of grinds) {
      const ref = W.buildReference(W.priceLines([{ sku, grind, qty: 3 }]));
      const [l] = W.parseReference(ref);
      assert.equal(l.sku, sku);
      assert.equal(l.grindId, grind || null);
      assert.equal(l.total, it.price * 3);
      assert.ok(ref.length <= 64, ref);
    }
  }
});

test("rechaza pedidos inválidos", () => {
  assert.throws(() => W.priceLines([]), /vacío/);
  assert.throws(() => W.priceLines([{ sku: "honey:999", grind: "grano", qty: 1 }]), /no está disponible/);
  assert.throws(() => W.priceLines([{ sku: "honey:250", qty: 1 }]), /molienda/);
  assert.throws(() => W.priceLines([{ sku: "honey:250", grind: "grano", qty: 0 }]), /Cantidad/);
  assert.throws(() => W.priceLines([{ sku: "honey:250", grind: "grano", qty: 2.5 }]), /Cantidad/);
  assert.throws(
    () =>
      W.priceLines([
        { sku: "honey:250", grind: "grano", qty: 1 },
        { sku: "honey:250", grind: "grano", qty: 1 },
      ]),
    /repetidos/
  );
  assert.throws(() => W.parseReference("CC-X-ZZ999x1"), /desconocido/);
});

test("valida y limpia los datos del comprador", () => {
  const c = W.cleanCustomer(CUSTOMER);
  assert.equal(c.phone, "3215551234");
  assert.equal(c.email, "ana@example.com");
  assert.throws(() => W.cleanCustomer({ ...CUSTOMER, phone: "12345" }), /celular/);
  assert.throws(() => W.cleanCustomer({ ...CUSTOMER, email: "ana@" }), /correo/);
  assert.throws(() => W.cleanCustomer({ ...CUSTOMER, address: "x" }), /dirección/);
});

test("sin llaves configuradas responde 503, no falla en silencio", () => {
  assert.throws(() => W.createCheckout({ items: ITEMS, customer: CUSTOMER }, {}), (e) => e.status === 503);
});

// Evento con la estructura que documenta Wompi
const EVENTS_SECRET = "test_events_S3CR3T";
const makeEvent = (tx, secret = EVENTS_SECRET) => {
  const timestamp = 1790000000;
  const properties = ["transaction.id", "transaction.status", "transaction.amount_in_cents"];
  const checksum = crypto
    .createHash("sha256")
    .update(`${tx.id}${tx.status}${tx.amount_in_cents}${timestamp}${secret}`)
    .digest("hex")
    .toUpperCase();
  return { event: "transaction.updated", data: { transaction: tx }, signature: { properties, checksum }, timestamp };
};

test("verifica la firma de los eventos y rechaza los alterados", () => {
  const tx = { id: "1234-1790000000-11111", status: "APPROVED", amount_in_cents: 7000000 };
  const ev = makeEvent(tx);
  assert.equal(W.verifyEvent(ev, EVENTS_SECRET), true);
  assert.equal(W.verifyEvent(ev, "otro"), false);
  assert.equal(W.verifyEvent({ ...ev, data: { transaction: { ...tx, amount_in_cents: 100 } } }, EVENTS_SECRET), false);
  assert.equal(W.verifyEvent({ ...ev, signature: undefined }, EVENTS_SECRET), false);
});

const approvedTx = (overrides = {}) => {
  const lines = W.priceLines(ITEMS);
  return {
    id: "1234-1790000000-11111",
    status: "APPROVED",
    reference: W.buildReference(lines),
    amount_in_cents: W.totalOf(lines) * 100,
    payment_method_type: "NEQUI",
    customer_email: "ana@example.com",
    customer_data: { full_name: "Ana María Ríos", phone_number: "+573215551234" },
    shipping_address: { address_line_1: "Cra 43A # 1-50", city: "Medellín", region: "Antioquia", phone_number: "3215551234" },
    ...overrides,
  };
};

test("convierte el pago aprobado en la venta del panel", () => {
  const o = W.toWebOrder(approvedTx());
  assert.equal(o.amount, 70000);
  assert.equal(o.customer.phone, "3215551234");
  assert.equal(o.customer.city, "Medellín");
  assert.equal(o.items.length, 2);
  assert.equal(o.items[0].grind, "Filtro (V60, Chemex)");
  assert.equal(o.shippingPaidOnDelivery, true);
});

test("rechaza un pago cuyo monto no coincide con el pedido", () => {
  assert.throws(() => W.toWebOrder(approvedTx({ amount_in_cents: 100 })), /no coincide/);
});

test("el estado público no expone datos personales", () => {
  const s = W.publicStatus(approvedTx());
  const json = JSON.stringify(s);
  assert.equal(s.status, "APPROVED");
  assert.equal(s.amount, 70000);
  assert.ok(!/ana@|Ríos|3215551234|Cra 43A/.test(json), json);
});

// Funciones de Vercel con req/res simulados
const mockRes = () => {
  const r = { code: 200, headers: {}, body: undefined };
  r.status = (c) => ((r.code = c), r);
  r.json = (b) => ((r.body = b), r);
  r.end = () => r;
  r.setHeader = (k, v) => (r.headers[k] = v);
  return r;
};

test("POST /api/checkout responde con todo lo que necesita el widget", async () => {
  Object.assign(process.env, ENV);
  const handler = require("../checkout");
  const res = mockRes();
  await handler({ method: "POST", body: { items: ITEMS, customer: CUSTOMER } }, res);
  assert.equal(res.code, 200);
  assert.ok(res.body.signature.integrity && res.body.reference && res.body.shippingAddress.city === "Medellín");
  const bad = mockRes();
  await handler({ method: "POST", body: { items: [{ sku: "honey:250", qty: 1 }], customer: CUSTOMER } }, bad);
  assert.equal(bad.code, 400);
  assert.match(bad.body.error, /molienda/);
  const get = mockRes();
  await handler({ method: "GET" }, get);
  assert.equal(get.code, 405);
});

test("POST /api/wompi-eventos confirma con Wompi y registra en el panel", async () => {
  Object.assign(process.env, { WOMPI_EVENTS_SECRET: EVENTS_SECRET, ADMIN_API_URL: "https://admin.test", WEB_ORDERS_KEY: "k" });
  const tx = approvedTx();
  const calls = [];
  const realFetch = global.fetch;
  global.fetch = async (url, opts = {}) => {
    calls.push({ url, opts });
    if (url.startsWith("https://sandbox.wompi.co/v1/transactions/")) return { ok: true, status: 200, json: async () => ({ data: tx }) };
    if (url === "https://admin.test/api/web-orders") return { ok: true, status: 201, json: async () => ({}) };
    throw new Error("URL inesperada " + url);
  };
  try {
    const handler = require("../wompi-eventos");
    const res = mockRes();
    await handler({ method: "POST", body: makeEvent(tx) }, res);
    assert.equal(res.code, 200);
    const admin = calls.find((c) => c.url === "https://admin.test/api/web-orders");
    assert.ok(admin, "debe llamar al panel");
    assert.equal(admin.opts.headers["X-Web-Orders-Key"], "k");
    assert.equal(JSON.parse(admin.opts.body).reference, tx.reference);

    const forged = mockRes();
    await handler({ method: "POST", body: makeEvent(tx, "falso") }, forged);
    assert.equal(forged.code, 401);

    // Aviso con estado distinto a aprobado: no registra venta
    calls.length = 0;
    const declined = { ...tx, status: "DECLINED" };
    global.fetch = async (url) => ({ ok: true, status: 200, json: async () => ({ data: declined }) });
    const d = mockRes();
    await handler({ method: "POST", body: makeEvent(declined) }, d);
    assert.equal(d.code, 200);
    assert.equal(d.body.status, "DECLINED");
  } finally {
    global.fetch = realFetch;
  }
});

test("forwardToAdmin: un error del panel se reporta con su mensaje (y no se da por registrado)", async () => {
  const { forwardToAdmin } = require("./wompi");
  const env = { ADMIN_API_URL: "https://admin.test/", WEB_ORDERS_KEY: "k" };
  const failing = async () => ({ ok: false, status: 400, json: async () => ({ message: "No encontré en el panel el producto" }) });
  await assert.rejects(forwardToAdmin({ reference: "x" }, env, failing), /400: No encontré en el panel/);
  const conflict = async () => ({ ok: false, status: 409, json: async () => ({ message: "Ya existe" }) });
  await assert.rejects(forwardToAdmin({ reference: "x" }, env, conflict), /409/);
  const ok = async (url) => {
    assert.equal(url, "https://admin.test/api/web-orders");
    return { ok: true, status: 200, json: async () => ({ saleId: "s1", duplicate: true }) };
  };
  const r = await forwardToAdmin({ reference: "x" }, env, ok);
  assert.equal(r.saleId, "s1");
  assert.equal(r.duplicate, true);
  assert.deepEqual(await forwardToAdmin({}, {}, ok), { skipped: true });
});

test("createCheckout: el pago en línea exige el pedido mínimo", () => {
  const P = require("../../src/data/prices.json");
  assert.ok(P.minOnline > 0);
  assert.throws(
    () => W.createCheckout({ items: [{ sku: "drips:unidad", qty: 1 }], customer: CUSTOMER }, ENV),
    (e) => e instanceof W.OrderError && e.field === "items" && /desde/.test(e.message)
  );
  // Exactamente el mínimo sí pasa
  const ok = W.createCheckout({ items: [{ sku: "drips:caja10", qty: 1 }], customer: CUSTOMER }, ENV);
  assert.equal(ok.amountInCents, P.minOnline * 100);
});

test("createCheckout: en un preview vuelve al preview; en producción, al dominio", () => {
  const items = [{ sku: "drips:caja10", qty: 1 }];
  const prod = W.createCheckout({ items, customer: CUSTOMER }, ENV);
  assert.equal(prod.redirectUrl, "https://www.cumbrecafe.shop/pedido/estado");
  const prev = W.createCheckout({ items, customer: CUSTOMER }, { ...ENV, VERCEL_ENV: "preview", VERCEL_BRANCH_URL: "tienda-git-wompi-alex.vercel.app" });
  assert.equal(prev.redirectUrl, "https://tienda-git-wompi-alex.vercel.app/pedido/estado");
});
