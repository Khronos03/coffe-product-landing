// Google Analytics 4 (gratis). Mide visitas y, sobre todo, los pedidos que se abren en WhatsApp.
//
// Para activarlo, pega aquí el ID de medición de GA4 (empieza por "G-"). Mientras esté vacío,
// no se carga nada. Solo mide en el dominio real: las pruebas locales no ensucian los datos.
export const GA_MEASUREMENT_ID = "G-E6BFFQHSXL";

const PROD_HOST = /(^|\.)cumbrecafe\.shop$/;

let enabled = false;

function gtag() {
  window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
}

/** Envía un evento a GA4. No hace nada si la analítica está desactivada. */
export function track(name, params = {}) {
  if (!enabled) return;
  gtag("event", name, params);
}

// Cada enlace a WhatsApp cuenta como pedido o consulta abierta. Los botones de pedido llevan
// data-product, data-size, data-grind, data-price y data-source; el resto usa la sección donde está.
function onWhatsappClick(e) {
  const a = e.target.closest && e.target.closest('a[href^="https://wa.me/"]');
  if (!a) return;
  const d = a.dataset;
  const section = a.closest("[id]");
  const params = {
    origen: d.source || (section ? section.id : "pagina"),
    producto: d.product || "consulta general",
  };
  if (d.size) params.tamano = d.size;
  if (d.grind) params.molienda = d.grind;
  if (d.price) {
    params.value = Number(d.price);
    params.currency = "COP";
  }
  track("whatsapp_click", params);
}

export function initAnalytics() {
  if (!GA_MEASUREMENT_ID || !PROD_HOST.test(window.location.hostname)) return;
  enabled = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = gtag;
  gtag("js", new Date());
  // Solo analítica: sin señales de Google ni personalización de anuncios.
  gtag("config", GA_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
  document.addEventListener("click", onWhatsappClick, true);
}
