// El pedido: varios cafés en un solo pago o un solo mensaje de WhatsApp.
// Se guarda en este navegador (localStorage) para no perderlo; nunca sale del dispositivo
// hasta que el cliente paga o envía el mensaje.

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import PRICES from "./data/prices.json";
import { track } from "./analytics";

const KEY = "cumbre:pedido";
export const MAX_LINES = 8;
export const MAX_QTY = 20;
export const CART_OPEN_EVENT = "cumbre:pedido-abrir";

// Pagos en línea: se activan con REACT_APP_WOMPI_ENABLED=true en Vercel (primero en Preview, con llaves de prueba).
export const ONLINE_PAYMENTS = process.env.REACT_APP_WOMPI_ENABLED === "true";

const read = () => {
  try {
    const raw = JSON.parse(window.localStorage.getItem(KEY));
    return Array.isArray(raw) ? raw.filter((l) => PRICES.items[l.sku] && l.qty > 0) : [];
  } catch (e) {
    return [];
  }
};

/** Línea con nombre, opción, molienda y precio vigentes (desde prices.json). */
export function describe(line) {
  const it = PRICES.items[line.sku];
  const grind = line.grind ? PRICES.grinds[line.grind] : null;
  return {
    ...line,
    product: it.product,
    serial: it.serial || null,
    option: it.option,
    grindLabel: grind ? grind.label : null,
    unitPrice: it.price,
    total: it.price * line.qty,
  };
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [lines, setLines] = useState(read);
  const linesRef = useRef(lines);
  linesRef.current = lines;

  useEffect(() => {
    try {
      if (lines.length) window.localStorage.setItem(KEY, JSON.stringify(lines));
      else window.localStorage.removeItem(KEY);
    } catch (e) {
      /* sin almacenamiento: el pedido vive solo en esta visita */
    }
  }, [lines]);

  /** Agrega o suma a una línea existente (mismo producto y molienda). Devuelve false si no cabe. */
  const add = useCallback((sku, grind, qty = 1) => {
    const prev = linesRef.current;
    const i = prev.findIndex((l) => l.sku === sku && (l.grind || null) === (grind || null));
    let next;
    if (i >= 0) {
      next = [...prev];
      next[i] = { ...next[i], qty: Math.min(MAX_QTY, next[i].qty + qty) };
    } else if (prev.length >= MAX_LINES) {
      return false;
    } else {
      next = [...prev, { sku, grind: grind || null, qty }];
    }
    linesRef.current = next;
    setLines(next);
    const d = describe({ sku, grind, qty });
    track("add_to_cart", {
      currency: "COP",
      value: d.total,
      items: [{ item_id: sku, item_name: `${d.product} ${d.option}`, quantity: qty, price: d.unitPrice }],
    });
    return true;
  }, []);

  const setQty = useCallback((index, qty) => {
    setLines((prev) => prev.map((l, i) => (i === index ? { ...l, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : l)));
  }, []);

  const remove = useCallback((index) => setLines((prev) => prev.filter((_, i) => i !== index)), []);
  const clear = useCallback(() => setLines([]), []);
  const open = useCallback(() => window.dispatchEvent(new Event(CART_OPEN_EVENT)), []);

  const value = useMemo(() => {
    const detailed = lines.map(describe);
    return {
      lines: detailed,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: detailed.reduce((n, l) => n + l.total, 0),
      add,
      setQty,
      remove,
      clear,
      open,
    };
  }, [lines, add, setQty, remove, clear, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
