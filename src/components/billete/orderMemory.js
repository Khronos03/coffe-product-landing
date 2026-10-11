// Memoria de la sesión para el pedido: la selección en curso y el pedido abierto en WhatsApp.
// Los navegadores móviles suelen recargar la pestaña al volver de WhatsApp; esto evita perderlo.
// Todo vive en sessionStorage (se borra al cerrar la pestaña) y falla en silencio si no hay acceso.

const DRAFT_KEY = "cumbre:seleccion";
const PENDING_KEY = "cumbre:pedido-abierto";
const PENDING_TTL = 30 * 60 * 1000;

function read(key) {
  try {
    const raw = window.sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
function write(key, value) {
  try {
    if (value) window.sessionStorage.setItem(key, JSON.stringify(value));
    else window.sessionStorage.removeItem(key);
  } catch (e) {
    /* sin almacenamiento: la selección vive solo en memoria */
  }
}

/** Selección en curso: { serieId, sizeId, grind }. */
export const readDraft = () => read(DRAFT_KEY);
export const writeDraft = (draft) => write(DRAFT_KEY, draft);

/** Pedido abierto en WhatsApp: { href, label, serieId, sizeId, grind, at }. No implica que se haya enviado. */
export function readPending() {
  const p = read(PENDING_KEY);
  return p && Date.now() - p.at < PENDING_TTL ? p : null;
}
export const writePending = (pending) => write(PENDING_KEY, pending);
