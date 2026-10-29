// Google Analytics 4 (gratis). Mide visitas y, sobre todo, los pedidos que se abren en WhatsApp.
//
// Solo se carga si el visitante acepta las cookies de analítica (consent.js) y solo en el
// dominio real: las pruebas locales no ensucian los datos. Sin aceptación no se instala ninguna cookie.
import { CONSENT_EVENT, readConsent } from "./consent";

export const GA_MEASUREMENT_ID = "G-E6BFFQHSXL";

const PROD_HOST = /(^|\.)cumbrecafe\.shop$/;
// Duración de las cookies de Google Analytics: 13 meses (por defecto serían 2 años).
const COOKIE_SECONDS = 60 * 60 * 24 * 395;

let enabled = false;
let loaded = false;

function gtag() {
  window.dataLayer.push(arguments); // eslint-disable-line prefer-rest-params
}

/** Envía un evento a GA4. No hace nada sin consentimiento. */
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

function enable() {
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
  enabled = true;
  if (loaded) return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = gtag;
  gtag("js", new Date());
  // Solo analítica: sin señales de Google ni personalización de anuncios.
  gtag("config", GA_MEASUREMENT_ID, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: COOKIE_SECONDS,
  });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(s);
  document.addEventListener("click", onWhatsappClick, true);
}

// Al retirar el consentimiento: se detiene el envío y se borran las cookies de Analytics.
function disable() {
  enabled = false;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  const host = window.location.hostname;
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => /^_ga/.test(name))
    .forEach((name) =>
      domains.forEach((d) => {
        document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
      })
    );
}

export function initAnalytics() {
  if (!GA_MEASUREMENT_ID || !PROD_HOST.test(window.location.hostname)) return;
  const c = readConsent();
  if (c && c.analytics) enable();
  window.addEventListener(CONSENT_EVENT, (e) => (e.detail.analytics ? enable() : disable()));
}
