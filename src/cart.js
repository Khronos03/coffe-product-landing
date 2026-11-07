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
/** Bajo este valor la comisión fija de Wompi pesa demasiado: ese pedido va por WhatsApp. */
export const MIN_ONLINE = PRICES.minOnline || 0;

const read = () => {
  try {
    const raw = JSON.parse(window.localStorage.getItem(KEY));
    return Array.isArray(raw) ? raw.filter((l) => PRICES.items[l.sku] && l.qty > 0) : [];
  } catch (e) {
    return [];
  }
};

/** Tinta del billete de cada producto: la del lote; regalos y drips, el violeta de seguridad. */
const LOT_INK = { honey: "honey", lavado: "lavado", natural: "natural", "pina-whisky": "pina" };
export function inkOf(sku) {
  const [group, option] = sku.split(":");
  if (LOT_INK[group]) return LOT_INK[group];
  if (group === "cuarteron") return LOT_INK[option] || "violet";
  return "violet";
}

/** Línea con nombre, opción, molienda y precio vigentes (desde prices.json). */
export function describe(line) {
  const it = PRICES.items[line.sku];
  const grind = line.grind ? PRICES.grinds[line.grind] : null;
  return {
    ...line,
    product: it.product,
    serial: it.serial || null,
    code: it.code,
    // Etiqueta del billete: la serie del lote, o la sección donde está el producto
    tag: it.serial ? `Serie ${it.serial}` : /^(kit|caja-drips):/.test(line.sku) ? "Regalo" : "Formato",
    ink: inkOf(line.sku),
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

  /**
   * Pedir y pagar: agrega y abre el pedido. Si ese producto con esa molienda ya está,
   * solo abre el pedido (no suma en silencio); la cantidad se cambia ahí.
   */
  const buy = useCallback(
    (sku, grind) => {
      const exists = linesRef.current.some((l) => l.sku === sku && (l.grind || null) === (grind || null));
      const ok = exists || add(sku, grind, 1);
      if (ok) window.dispatchEvent(new Event(CART_OPEN_EVENT));
      return ok;
    },
    [add]
  );

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
      buy,
      setQty,
      remove,
      clear,
      open,
    };
  }, [lines, add, buy, setQty, remove, clear, open]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
