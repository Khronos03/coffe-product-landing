// Consentimiento de cookies (Ley 1581 de 2012, Colombia): la analítica solo se activa con un
// "Aceptar" expreso. La decisión se guarda en este navegador con fecha y versión del aviso,
// como constancia, y se puede cambiar en cualquier momento desde el pie de página.

const KEY = "cumbre:consentimiento";
// Si cambia lo que se pide (p. ej. se añaden cookies de publicidad), sube la versión para volver a preguntar.
export const CONSENT_VERSION = 1;
export const CONSENT_EVENT = "cumbre:consentimiento";
export const CONSENT_OPEN_EVENT = "cumbre:consentimiento-abrir";

/** { analytics: boolean, at: ISO string, version } o null si aún no ha decidido. */
export function readConsent() {
  try {
    const c = JSON.parse(window.localStorage.getItem(KEY));
    return c && c.version === CONSENT_VERSION ? c : null;
  } catch (e) {
    return null;
  }
}

export function saveConsent(analytics) {
  const c = { analytics: Boolean(analytics), at: new Date().toISOString(), version: CONSENT_VERSION };
  try {
    window.localStorage.setItem(KEY, JSON.stringify(c));
  } catch (e) {
    /* sin almacenamiento: la decisión vale solo para esta visita */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: c }));
  return c;
}

/** Vuelve a mostrar el aviso (enlace "Configurar cookies" del pie de página). */
export function openConsent() {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}
