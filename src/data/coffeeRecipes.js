/** @typedef {import('../models/coffeeRecipe').CoffeeRecipe} CoffeeRecipe */

const BUY_SECTION_HREF = "/#section2";
const CTA_TEXT = "🛒 Comprar café para preparar esta receta";

/** @type {CoffeeRecipe[]} */
export const COFFEE_RECIPES = [
  {
    id: "capuchino-clasico",
    name: "Capuchino Clásico",
    icon: "☕",
    image: null,
    ingredients: [
      "1 espresso",
      "120 ml de leche",
      "Espuma de leche",
    ],
    preparation: [
      "Prepara un café espresso fuerte.",
      "Calienta la leche.",
      "Bate la leche hasta crear una capa de espuma espesa.",
      "Vierte la leche caliente sobre el espresso.",
      "Añade la espuma al final.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },
  {
    id: "affogato",
    name: "Affogato",
    icon: "🍨",
    image: null,
    ingredients: [
      "1 bola de helado de vainilla",
      "1 espresso caliente",
    ],
    preparation: [
      "Coloca la bola de helado en una taza o vaso pequeño.",
      "Prepara un espresso recién hecho.",
      "Vierte el espresso caliente sobre el helado justo antes de servir.",
      "Permite que el helado se derrita ligeramente con el calor del café.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },
  {
    id: "latte-vainilla",
    name: "Café Latte con Vainilla",
    icon: "🌿",
    image: null,
    ingredients: [
      "1 espresso",
      "Leche",
      "Unas gotas de esencia de vainilla",
    ],
    preparation: [
      "Añade la esencia de vainilla a la leche.",
      "Calienta o espuma la mezcla.",
      "Prepara un espresso.",
      "Vierte la leche con vainilla sobre el café.",
      "Sirve y disfruta una bebida suave y aromática.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },
  {
    id: "espresso-tonic",
    name: "Espresso Tonic",
    icon: "🧊",
    image: null,
    ingredients: [
      "1 espresso",
      "Hielo",
      "Agua tónica",
    ],
    preparation: [
      "Llena un vaso alto con cubitos de hielo.",
      "Vierte agua tónica hasta aproximadamente tres cuartos del vaso.",
      "Prepara un espresso recién hecho.",
      "Añade lentamente el espresso sobre el agua tónica.",
      "Mantén el efecto visual de capas para una presentación refrescante y burbujeante.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },
];
