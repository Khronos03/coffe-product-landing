// SEO por ruta en una SPA: título, descripción, canonical, Open Graph y datos estructurados.
// Google ejecuta JavaScript, así que estos valores sí llegan al índice; index.html trae
// los de la portada para buscadores y redes que no ejecutan JS (vista previa de WhatsApp).

import { useEffect } from "react";

export const SITE_URL = "https://www.cumbrecafe.shop";
export const SITE_NAME = "Cumbre Café";

export const HOME_META = {
  title: "Café de especialidad de Mistrató, Risaralda | Cumbre Café",
  description:
    "Café de especialidad de una familia caficultora de Mistrató, Risaralda. Honey, Lavado, Natural y Piña-Whisky, tostado cada semana. Envíos a toda Colombia.",
  path: "/",
};

function upsert(selector, create) {
  let el = document.head.querySelector(selector);
  const existed = Boolean(el);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return { el, existed };
}

function setMeta(attr, key, value) {
  const { el, existed } = upsert(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement("meta");
    m.setAttribute(attr, key);
    return m;
  });
  const prev = el.getAttribute("content");
  el.setAttribute("content", value);
  return () => (existed ? el.setAttribute("content", prev) : el.remove());
}

function removeCanonical() {
  const el = document.head.querySelector('link[rel="canonical"]');
  if (!el) return () => {};
  const parent = el.parentNode;
  const next = el.nextSibling;
  el.remove();
  return () => parent.insertBefore(el, next);
}

function setCanonical(href) {
  const { el, existed } = upsert('link[rel="canonical"]', () => {
    const l = document.createElement("link");
    l.rel = "canonical";
    return l;
  });
  const prev = el.getAttribute("href");
  el.setAttribute("href", href);
  return () => (existed ? el.setAttribute("href", prev) : el.remove());
}

/**
 * Aplica los metadatos de la ruta mientras está montada y restaura los anteriores al salir.
 * `noindex` saca la página del índice (404).
 */
export function useDocumentMeta({ title, description, path, noindex = false }) {
  useEffect(() => {
    const url = SITE_URL + (path || "/");
    const prevTitle = document.title;
    document.title = title;
    const undo = [
      setMeta("name", "description", description),
      setMeta("property", "og:title", title),
      setMeta("property", "og:description", description),
      setMeta("name", "twitter:title", title),
      setMeta("name", "twitter:description", description),
    ];
    if (noindex) {
      // Una página fuera del índice no declara canonical (sería una señal contradictoria).
      undo.push(setMeta("name", "robots", "noindex"));
      undo.push(removeCanonical());
    }
    else {
      undo.push(setCanonical(url));
      undo.push(setMeta("property", "og:url", url));
    }
    return () => {
      document.title = prevTitle;
      undo.forEach((fn) => fn());
    };
  }, [title, description, path, noindex]);
}

/** Inserta un bloque JSON-LD mientras la ruta está montada. */
export function useJsonLd(id, data) {
  const json = JSON.stringify(data);
  useEffect(() => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = id;
    s.textContent = json;
    document.head.appendChild(s);
    return () => s.remove();
  }, [id, json]);
}
