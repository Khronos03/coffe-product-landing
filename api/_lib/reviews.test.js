const test = require("node:test");
const assert = require("node:assert/strict");
const { fetchForm, submitReview, fetchPublic, ReviewError } = require("./reviews");

const ENV = { ADMIN_API_URL: "https://panel.test/" };
const TOKEN = "AbCdEfGhIjKlMnOpQrStUv";

test("reseña: abre el formulario con la clave del pedido", async () => {
  const r = await fetchForm(TOKEN, ENV, async (url) => {
    assert.equal(url, `https://panel.test/api/reviews/form/${TOKEN}`);
    return { ok: true, status: 200, json: async () => ({ code: "CC-1", firstName: "Ana", displayName: "Ana G.", products: ["Honey 454 g"], notYet: false, alreadyReviewed: false, phone: "300" }) };
  });
  assert.equal(r.displayName, "Ana G.");
  assert.equal(r.phone, undefined);
});

test("reseña: valida antes de llamar al panel", async () => {
  const never = async () => assert.fail("no debe llamar");
  await assert.rejects(submitReview(TOKEN, { rating: 0, comment: "muy bueno el café" }, ENV, never), (e) => e.status === 400);
  await assert.rejects(submitReview(TOKEN, { rating: 5, comment: "rico" }, ENV, never), (e) => e.status === 400);
  await assert.rejects(submitReview(TOKEN, { rating: 5, comment: "x".repeat(601) }, ENV, never), (e) => e.status === 400);
  await assert.rejects(submitReview("malo", { rating: 5, comment: "muy bueno el café" }, ENV, never), (e) => e instanceof ReviewError && e.status === 404);
});

test("reseña: envía solo calificación, texto y permiso; propaga el mensaje del panel", async () => {
  let sent;
  const ok = await submitReview(TOKEN, { rating: 5, comment: "  Muy buen café, llegó rápido ", allowPublish: true, displayName: "hack" }, ENV, async (url, init) => {
    sent = JSON.parse(init.body);
    return { ok: true, status: 200, json: async () => ({ ok: true }) };
  });
  assert.deepEqual(sent, { rating: 5, comment: "Muy buen café, llegó rápido", allowPublish: true });
  assert.equal(ok.ok, true);
  await assert.rejects(
    submitReview(TOKEN, { rating: 4, comment: "Muy buen café" }, ENV, async () => ({ ok: false, status: 400, json: async () => ({ message: "Ya recibimos tu reseña de este pedido. ¡Gracias!" }) })),
    (e) => e.status === 400 && /Ya recibimos/.test(e.message));
});

test("reseñas públicas: limpia y calcula el promedio", async () => {
  const r = await fetchPublic(ENV, async () => ({ ok: true, status: 200, json: async () => ({ reviews: [
    { rating: 5, comment: "Excelente", displayName: "Ana G.", city: "Pereira", source: "web", idClient: "x" },
    { rating: 4, comment: "Muy rico", displayName: "Luis P.", source: "manual" },
    { rating: 5, comment: "", displayName: "Vacío" },
  ] }) }));
  assert.equal(r.count, 2);
  assert.equal(r.average, 4.5);
  assert.equal(r.reviews[0].idClient, undefined);
  assert.equal(r.reviews[1].source, "manual");
});
