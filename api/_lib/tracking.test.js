const test = require("node:test");
const assert = require("node:assert/strict");
const { fetchTracking, TrackingError } = require("./tracking");

const ENV = { ADMIN_API_URL: "https://panel.test/" };
const TOKEN = "AbCdEfGhIjKlMnOpQrStUv";

test("seguimiento: consulta al panel con la clave y devuelve solo lo público", async () => {
  const fake = async (url) => {
    assert.equal(url, `https://panel.test/api/tracking/${TOKEN}`);
    return { ok: true, status: 200, json: async () => ({ code: "CC-83BE2B", firstName: "Alexander", city: "Pereira", items: [{ name: "Lavado 350 g", quantity: 1, grind: "molido" }], isPaid: true, isReady: true, isShipped: true, carrier: "servientrega", trackingNumber: "123456789", address: "Cl 10 # 5-20", phone: "3001112233" }) };
  };
  const r = await fetchTracking(TOKEN, ENV, fake);
  assert.equal(r.code, "CC-83BE2B");
  assert.equal(r.carrier, "servientrega");
  assert.equal(r.items[0].grind, "molido");
  assert.equal(r.address, undefined);
  assert.equal(r.phone, undefined);
});

test("seguimiento: clave inválida, pedido inexistente, panel caído", async () => {
  await assert.rejects(fetchTracking("../../etc", ENV, async () => assert.fail("no debe llamar")), (e) => e instanceof TrackingError && e.status === 404);
  await assert.rejects(fetchTracking(TOKEN, ENV, async () => ({ ok: false, status: 404 })), (e) => e.status === 404);
  await assert.rejects(fetchTracking(TOKEN, ENV, async () => { throw new Error("timeout"); }), (e) => e.status === 504);
  await assert.rejects(fetchTracking(TOKEN, {}, async () => assert.fail()), (e) => e.status === 503);
});
