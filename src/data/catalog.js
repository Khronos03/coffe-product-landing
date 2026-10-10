// Catálogo de Cumbre Café. Fuente única de productos, precios y procesos
// para la home. Los precios vienen del catálogo vigente del productor.

import honey440 from "../assets/packs/honey-440.webp";
import honey880 from "../assets/packs/honey-880.webp";
import lavado440 from "../assets/packs/lavado-440.webp";
import lavado880 from "../assets/packs/lavado-880.webp";
import natural440 from "../assets/packs/natural-440.webp";
import natural880 from "../assets/packs/natural-880.webp";
import pina440 from "../assets/packs/pina-whisky-440.webp";
import pina880 from "../assets/packs/pina-whisky-880.webp";
import cuarteron440 from "../assets/packs/cuarteron-440.webp";
import cuarteron880 from "../assets/packs/cuarteron-880.webp";
import drips440 from "../assets/packs/drips-440.webp";
import drips880 from "../assets/packs/drips-880.webp";

export const WHATSAPP_NUMBER = "573216363596";

export const ORIGIN = {
  finca: "Mistrató, Risaralda",
  altitud: "1.950 m s.n.m.",
  variedad: "Castillo",
  tostion: "Tostión media",
  anos: "+45 años",
};

export const GRIND_OPTIONS = [
  { id: "grano", label: "Grano entero" },
  { id: "filtro", label: "Molido para filtro (V60, Chemex, goteo)" },
  { id: "prensa", label: "Molido para prensa francesa" },
  { id: "moka", label: "Molido para moka" },
  { id: "espresso", label: "Molido para espresso" },
];

const img = (w440, w880) => ({
  src: w440,
  srcSet: `${w440} 440w, ${w880} 880w`,
});

/**
 * Cada proceso es un "billete" de la serie. `ink` define la tinta que
 * pinta su región de la página (ver styles/billete.css).
 */
export const SERIES = [
  {
    id: "honey",
    serial: "01",
    ink: "honey",
    name: "Honey",
    lot: "Honey",
    line: "El grano se seca con su propio mucílago.",
    perfil: "Panela y miel",
    notas: "Caña de azúcar, apanelado, dulzor natural",
    image: img(honey440, honey880),
    imageAlt: "Bolsa kraft de Cumbre Café, proceso Honey, con colibrí ilustrado",
    sizes: [
      { id: "250", label: "250 g", price: 25000 },
      { id: "350", label: "350 g", price: 28000 },
      { id: "454", label: "454 g", price: 35000 },
    ],
    protocol: {
      summary:
        "Despulpamos la cereza y dejamos el mucílago pegado al grano durante el secado. Esa capa de azúcares del fruto es la que lleva a la taza el dulzor de panela.",
      steps: [
        ["Recolección", "Solo cerezas maduras, seleccionadas a mano."],
        ["Despulpado", "Se retira la cáscara y se conserva el mucílago sobre el grano."],
        ["Secado", "El grano se seca al sol con su mucílago, volteándolo a diario."],
        ["Reposo y trilla", "Reposa en pergamino y se trilla antes de tostar."],
      ],
    },
  },
  {
    id: "lavado",
    serial: "02",
    ink: "lavado",
    name: "Lavado",
    lot: "Lavado",
    line: "Limpio, claro y frutal.",
    perfil: "Frutos rojos",
    notas: "Caña de azúcar, caramelo, moras, arándanos",
    image: img(lavado440, lavado880),
    imageAlt: "Bolsa kraft de Cumbre Café, proceso Lavado",
    sizes: [
      { id: "250", label: "250 g", price: 25000 },
      { id: "350", label: "350 g", price: 28000 },
      { id: "454", label: "454 g", price: 35000 },
    ],
    protocol: {
      summary:
        "Retiramos toda la pulpa y el mucílago con agua limpia antes de secar. Sin restos del fruto, la taza queda definida: acidez brillante y frutos rojos.",
      steps: [
        ["Recolección", "Cerezas maduras seleccionadas a mano."],
        ["Despulpado", "Se retiran la cáscara y la pulpa."],
        ["Fermentación y lavado", "El mucílago se fermenta y se lava con agua limpia."],
        ["Secado", "Secado solar uniforme hasta la humedad justa."],
      ],
    },
  },
  {
    id: "natural",
    serial: "03",
    ink: "natural",
    name: "Natural",
    lot: "Natural",
    line: "Secado en cereza: dulzor profundo, cuerpo denso.",
    perfil: "Frutos rojos y vino",
    notas: "Frutos rojos, vino, dulzor profundo",
    image: img(natural440, natural880),
    imageAlt: "Bolsa blanca de Cumbre Café, proceso Natural, con flores moradas y colibrí",
    sizes: [
      { id: "250", label: "250 g", price: 35000 },
      { id: "350", label: "350 g", price: 40000 },
      { id: "454", label: "454 g", price: 50000 },
    ],
    protocol: {
      summary:
        "La cereza se seca entera, con toda su pulpa, durante semanas al sol. El grano absorbe el fruto: por eso aparecen notas a vino y frutos rojos.",
      steps: [
        ["Recolección", "Solo cerezas en su punto justo de dulzura."],
        ["Secado en cereza", "El fruto entero se seca al sol sin retirar la pulpa."],
        ["Volteo constante", "Se voltea varias veces al día para secar parejo."],
        ["Trilla", "Se retira la cáscara seca y queda el grano."],
      ],
    },
  },
  {
    id: "pina-whisky",
    serial: "04",
    ink: "pina",
    name: "Piña-Whisky",
    lot: "Piña-Whisky",
    line: "Fermentación diseñada en nuestra finca.",
    perfil: "Piña y whisky",
    notas: "Piña y whisky; perfil audaz y complejo",
    image: img(pina440, pina880),
    imageAlt: "Bolsa blanca de Cumbre Café Piña Whiskey con piña y barril ilustrados",
    sizes: [
      { id: "250", label: "250 g", price: 40000 },
      { id: "350", label: "350 g", price: 50000 },
      { id: "454", label: "454 g", price: 60000 },
    ],
    protocol: {
      summary:
        "Un protocolo propio de la finca: fermentación con notas a piña y whisky, terminada de forma artesanal. Es el lote que solo puede salir de nuestro beneficio.",
      steps: null,
      ownProtocol: true,
    },
  },
];

export const SPECIAL_SERIES = [
  {
    id: "cuarteron",
    name: "Cuarterón 5 lb",
    line: "Formato familiar, en Honey o Lavado.",
    image: img(cuarteron440, cuarteron880),
    imageAlt: "Bolsa grande de 5 libras de Cumbre Café",
    options: [
      { id: "honey", label: "5 lb · Honey", price: 175000 },
      { id: "lavado", label: "5 lb · Lavado", price: 175000 },
    ],
    grind: true,
  },
  {
    id: "drips",
    name: "Drips",
    line: "Sachets de una porción, sellados herméticamente. Café Lavado.",
    image: img(drips440, drips880),
    imageAlt: "Bolsa con sachets drip de café, con el logo de Cumbre Café",
    options: [
      { id: "unidad", label: "Unidad", price: 2500 },
      { id: "caja10", label: "Caja x10", price: 20000 },
    ],
  },
];

export const GIFTS = [
  {
    id: "kit",
    name: "Kit Honey & Lavado",
    line: "Los dos procesos en caja lista para regalar.",
    pair: ["honey", "lavado"],
    options: [
      { id: "2x250", label: "2 × 250 g", price: 48000 },
      { id: "2x454", label: "2 × 454 g", price: 65000 },
    ],
  },
  {
    id: "caja-drips",
    name: "Caja de drips + taza",
    line: "20 porciones individuales y una taza, para regalar o compartir.",
    pair: ["drips"],
    options: [{ id: "x20", label: "Caja x20 + taza", price: 48000 }],
  },
];

export const formatCOP = (n) => "$" + n.toLocaleString("es-CO").replace(/,/g, ".");

export const whatsappUrl = (lines) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;

export const imageFor = (id) =>
  (SERIES.find((s) => s.id === id) || SPECIAL_SERIES.find((s) => s.id === id)).image;
