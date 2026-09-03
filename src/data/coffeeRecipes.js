/** @typedef {import('../models/coffeeRecipe').CoffeeRecipe} CoffeeRecipe */

const BUY_SECTION_HREF = "/#section2";

const CTA_TEXT = "🛒 Comprar café para preparar esta receta";

/** @type {CoffeeRecipe[]} */
export const COFFEE_RECIPES = [
  {
    id: "capuchino-clasico",
    name: "Capuchino Clásico",
    icon: "☕",
    image: "/recetario/Capuchino Clásico.jpg",
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
    image: "/recetario/Affogato.jpg",
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
    image: "/recetario/Café Latte con Vainilla.jpg",
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
    image: "/recetario/Espresso Tonic.jpg",
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

  // 5
  {
    id: "cafe-mocha",
    name: "Café Moka",
    icon: "🍫",
    image: "/recetario/Café Moka.jpg",
    ingredients: [
      "1 espresso",
      "150 ml de leche",
      "1 cucharada de chocolate en polvo",
      "Espuma de leche",
    ],
    preparation: [
      "Prepara un espresso recién hecho.",
      "Mezcla el chocolate en polvo con el espresso hasta integrarlo.",
      "Calienta y espuma la leche.",
      "Vierte la leche sobre la mezcla de café y chocolate.",
      "Termina con una capa de espuma de leche.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 6
  {
    id: "caramel-macchiato",
    name: "Caramel Macchiato",
    icon: "🍮",
    image: "/recetario/Caramel Macchiato.jpg",
    ingredients: [
      "1 espresso",
      "150 ml de leche",
      "1 cucharada de salsa de caramelo",
      "Espuma de leche",
    ],
    preparation: [
      "Calienta y espuma la leche.",
      "Añade parte del caramelo al fondo del vaso.",
      "Vierte la leche caliente y la espuma.",
      "Prepara un espresso y añádelo lentamente.",
      "Decora con un hilo de salsa de caramelo.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 7
  {
    id: "cafe-bombon",
    name: "Café Bombón",
    icon: "🥛",
    image: "/recetario/Café Bombón.jpg",
    ingredients: [
      "1 espresso",
      "30 ml de leche condensada",
    ],
    preparation: [
      "Vierte la leche condensada en el fondo de un vaso pequeño.",
      "Prepara un espresso recién hecho.",
      "Vierte lentamente el espresso sobre la leche condensada.",
      "Sirve inmediatamente para conservar el contraste de capas.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 8
  {
    id: "irish-coffee",
    name: "Irish Coffee",
    icon: "🥃",
    image: "/recetario/Irish Coffee.jpg",
    ingredients: [
      "1 taza de café caliente",
      "30 ml de whisky",
      "1 cucharadita de azúcar",
      "Crema batida",
    ],
    preparation: [
      "Prepara una taza de café caliente.",
      "Añade el azúcar y mezcla hasta disolver.",
      "Incorpora el whisky.",
      "Cubre suavemente con crema batida.",
      "Sirve inmediatamente.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 9
  {
    id: "cafe-vietnamita",
    name: "Café Vietnamita",
    icon: "🇻🇳",
    image: "/recetario/Café Vietnamita.jpg",
    ingredients: [
      "2 cucharadas de café molido",
      "2 cucharadas de leche condensada",
      "120 ml de agua caliente",
      "Hielo opcional",
    ],
    preparation: [
      "Coloca la leche condensada en el fondo del vaso.",
      "Añade el café molido en un filtro vietnamita.",
      "Vierte el agua caliente y deja que el café se filtre lentamente.",
      "Mezcla el café con la leche condensada.",
      "Sirve caliente o añade hielo para una versión fría.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 10
  {
    id: "cafe-frances",
    name: "Café Francés",
    icon: "🥐",
    image: "/recetario/Café Francés.jpg",
    ingredients: [
      "1 taza de café filtrado",
      "50 ml de leche caliente",
      "Azúcar al gusto",
    ],
    preparation: [
      "Prepara un café filtrado de intensidad media.",
      "Calienta la leche sin dejar que llegue a hervir.",
      "Vierte la leche sobre el café.",
      "Añade azúcar al gusto.",
      "Sirve caliente acompañado de un croissant o pan dulce.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 11
  {
    id: "iced-latte",
    name: "Iced Latte",
    icon: "🧋",
    image: "/recetario/Iced Latte.jpg",
    ingredients: [
      "1 espresso doble",
      "150 ml de leche fría",
      "Hielo",
    ],
    preparation: [
      "Llena un vaso con abundante hielo.",
      "Prepara un espresso doble.",
      "Vierte la leche fría sobre el hielo.",
      "Añade lentamente el espresso.",
      "Mezcla ligeramente antes de disfrutar.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 12
  {
    id: "iced-mocha",
    name: "Iced Mocha",
    icon: "🍫",
    image: "/recetario/Iced Mocha.jpg",
    ingredients: [
      "1 espresso doble",
      "150 ml de leche fría",
      "1 cucharada de chocolate",
      "Hielo",
    ],
    preparation: [
      "Mezcla el chocolate con el espresso caliente.",
      "Deja enfriar ligeramente la mezcla.",
      "Llena un vaso con hielo.",
      "Añade la leche fría.",
      "Vierte el café con chocolate sobre la leche y mezcla.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 13
  {
    id: "cold-brew",
    name: "Cold Brew",
    icon: "🧊",
    image: "/recetario/Cold Brew.jpg",
    ingredients: [
      "100 g de café molido grueso",
      "800 ml de agua fría",
      "Hielo",
    ],
    preparation: [
      "Mezcla el café molido con el agua fría.",
      "Deja reposar la mezcla entre 12 y 16 horas en refrigeración.",
      "Filtra cuidadosamente para retirar los residuos de café.",
      "Sirve el concentrado sobre hielo.",
      "Puedes diluir con agua o leche al gusto.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 14
  {
    id: "cafe-cold-foam",
    name: "Cold Foam Coffee",
    icon: "☁️",
    image: "/recetario/Cold Foam Coffee.jpg",
    ingredients: [
      "1 taza de café frío",
      "100 ml de leche fría",
      "Hielo",
      "Azúcar o endulzante al gusto",
    ],
    preparation: [
      "Prepara el café y déjalo enfriar.",
      "Llena un vaso con hielo.",
      "Vierte el café frío.",
      "Bate la leche fría hasta obtener una espuma ligera.",
      "Coloca la espuma sobre el café y sirve.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 15
  {
    id: "cafe-canela",
    name: "Café con Canela",
    icon: "🌰",
    image: "/recetario/Café con Canela.jpg",
    ingredients: [
      "1 taza de café filtrado",
      "½ cucharadita de canela en polvo",
      "Azúcar al gusto",
      "Leche opcional",
    ],
    preparation: [
      "Prepara una taza de café filtrado.",
      "Añade la canela mientras el café está caliente.",
      "Mezcla hasta integrar completamente.",
      "Endulza al gusto.",
      "Añade un poco de leche si deseas una bebida más suave.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 16
  {
    id: "cafe-coco",
    name: "Latte de Coco",
    icon: "🥥",
    image: "/recetario/Latte de Coco.jpg",
    ingredients: [
      "1 espresso",
      "150 ml de leche de coco",
      "½ cucharadita de azúcar o miel",
      "Hielo opcional",
    ],
    preparation: [
      "Prepara un espresso.",
      "Calienta o enfría la leche de coco según la versión deseada.",
      "Endulza la leche al gusto.",
      "Vierte la leche de coco sobre el espresso.",
      "Sirve caliente o sobre hielo.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 17
  {
    id: "latte-caramelo",
    name: "Latte de Caramelo",
    icon: "🍯",
    image: "/recetario/Latte de Caramelo.jpg",
    ingredients: [
      "1 espresso",
      "180 ml de leche",
      "1 cucharada de salsa de caramelo",
      "Espuma de leche",
    ],
    preparation: [
      "Añade la salsa de caramelo al fondo de la taza.",
      "Prepara un espresso y viértelo sobre el caramelo.",
      "Calienta y espuma la leche.",
      "Añade la leche lentamente.",
      "Finaliza con espuma y un poco de caramelo.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 18
  {
    id: "cafe-miel",
    name: "Café con Miel",
    icon: "🍯",
    image: "/recetario/Café con Miel.jpg",
    ingredients: [
      "1 taza de café filtrado",
      "1 cucharada de miel",
      "30 ml de leche",
      "Canela opcional",
    ],
    preparation: [
      "Prepara una taza de café caliente.",
      "Añade la miel mientras el café está caliente.",
      "Mezcla hasta que la miel se disuelva.",
      "Incorpora la leche caliente.",
      "Añade una pizca de canela si deseas un toque especiado.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 19
  {
    id: "espresso-con-panna",
    name: "Espresso Con Panna",
    icon: "☕",
    image: "/recetario/Espresso Con Panna.jpg",
    ingredients: [
      "1 espresso",
      "Crema batida",
      "Chocolate rallado opcional",
    ],
    preparation: [
      "Prepara un espresso intenso.",
      "Sirve el espresso en una taza pequeña.",
      "Añade una porción generosa de crema batida.",
      "Decora con un poco de chocolate rallado.",
      "Sirve inmediatamente.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 20
  {
    id: "cafe-dalgona",
    name: "Café Dalgona",
    icon: "☁️",
    image: "/recetario/Café Dalgona.jpg",
    ingredients: [
      "2 cucharadas de café instantáneo",
      "2 cucharadas de azúcar",
      "2 cucharadas de agua caliente",
      "150 ml de leche",
      "Hielo opcional",
    ],
    preparation: [
      "Mezcla el café instantáneo, el azúcar y el agua caliente.",
      "Bate enérgicamente hasta obtener una crema espesa y aireada.",
      "Llena un vaso con leche fría o caliente.",
      "Coloca la crema de café sobre la leche.",
      "Mezcla antes de beber para integrar las dos capas.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 21
  {
    id: "cafe-orange",
    name: "Espresso Orange",
    icon: "🍊",
    image: "/recetario/Espresso Orange.jpg",
    ingredients: [
      "1 espresso doble",
      "100 ml de jugo de naranja",
      "Hielo",
      "Rodaja de naranja",
    ],
    preparation: [
      "Llena un vaso con hielo.",
      "Vierte el jugo de naranja frío.",
      "Prepara un espresso doble.",
      "Añade lentamente el espresso sobre el jugo.",
      "Decora con una rodaja de naranja y sirve inmediatamente.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 22
  {
    id: "cafe-avellana",
    name: "Latte de Avellana",
    icon: "🌰",
    image: "/recetario/Latte de Avellana.jpg",
    ingredients: [
      "1 espresso",
      "180 ml de leche",
      "1 cucharada de sirope de avellana",
      "Espuma de leche",
    ],
    preparation: [
      "Añade el sirope de avellana al fondo de la taza.",
      "Prepara un espresso y mézclalo con el sirope.",
      "Calienta y espuma la leche.",
      "Vierte la leche sobre el espresso.",
      "Termina con espuma de leche y sirve.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 23
  {
    id: "cafe-moca-blanco",
    name: "Moka Blanco",
    icon: "🤍",
    image: "/recetario/Moka Blanco.jpg",
    ingredients: [
      "1 espresso",
      "150 ml de leche",
      "30 g de chocolate blanco",
      "Espuma de leche",
    ],
    preparation: [
      "Derrite el chocolate blanco con un poco de leche caliente.",
      "Prepara un espresso.",
      "Mezcla el espresso con el chocolate blanco.",
      "Añade la leche caliente.",
      "Finaliza con espuma de leche y sirve.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 24
  {
    id: "cafe-especiado",
    name: "Café Especiado",
    icon: "✨",
    image: "/recetario/Café Especiado.jpg",
    ingredients: [
      "1 taza de café filtrado",
      "¼ cucharadita de canela",
      "Una pizca de cardamomo",
      "Una pizca de nuez moscada",
      "Azúcar o miel al gusto",
    ],
    preparation: [
      "Prepara una taza de café filtrado.",
      "Añade la canela, el cardamomo y la nuez moscada.",
      "Mezcla cuidadosamente para distribuir las especias.",
      "Endulza con azúcar o miel al gusto.",
      "Sirve caliente y disfruta de su aroma especiado.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

    // 25
  {
    id: "americano",
    name: "Café Americano",
    icon: "☕",
    image: "/recetario/Café Americano.jpg",
    ingredients: [
      "1 espresso doble",
      "120 ml de agua caliente",
    ],
    preparation: [
      "Prepara un espresso doble.",
      "Calienta el agua sin dejar que hierva.",
      "Vierte el agua caliente en una taza.",
      "Añade lentamente el espresso.",
      "Sirve inmediatamente.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 26
  {
    id: "flat-white",
    name: "Flat White",
    icon: "🥛",
    image: "/recetario/Flat White.jpg",
    ingredients: [
      "2 espressos",
      "120 ml de leche",
      "Microespuma de leche",
    ],
    preparation: [
      "Prepara dos shots de espresso.",
      "Calienta la leche hasta obtener una textura sedosa.",
      "Crea una fina capa de microespuma.",
      "Vierte la leche lentamente sobre el espresso.",
      "Sirve procurando mantener una textura cremosa y uniforme.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 27
  {
    id: "cortado",
    name: "Café Cortado",
    icon: "☕",
    image: "/recetario/Café Cortado.jpg",
    ingredients: [
      "1 espresso doble",
      "60 ml de leche caliente",
    ],
    preparation: [
      "Prepara un espresso doble.",
      "Calienta la leche sin llevarla a ebullición.",
      "Añade la leche caliente al espresso.",
      "Mezcla suavemente.",
      "Sirve en un vaso o taza pequeña.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 28
  {
    id: "breve",
    name: "Café Breve",
    icon: "🥛",
    image: "/recetario/Café Breve.jpg",
    ingredients: [
      "1 espresso doble",
      "100 ml de crema de leche",
      "Espuma de leche",
    ],
    preparation: [
      "Prepara un espresso doble.",
      "Calienta la crema de leche.",
      "Espuma ligeramente hasta obtener una textura cremosa.",
      "Vierte la crema sobre el espresso.",
      "Finaliza con una pequeña capa de espuma.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 29
  {
    id: "cafe-con-leche",
    name: "Café con Leche",
    icon: "🥛",
    image: "/recetario/Café con Leche.jpg",
    ingredients: [
      "1 taza de café fuerte",
      "100 ml de leche",
      "Azúcar al gusto",
    ],
    preparation: [
      "Prepara una taza de café fuerte.",
      "Calienta la leche.",
      "Vierte la leche caliente sobre el café.",
      "Endulza al gusto.",
      "Sirve caliente.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 30
  {
    id: "cafe-colado",
    name: "Café Colado Tradicional",
    icon: "☕",
    image: "/recetario/Café Colado Tradicional.jpg",
    ingredients: [
      "20 g de café molido",
      "300 ml de agua caliente",
    ],
    preparation: [
      "Calienta el agua hasta alcanzar una temperatura cercana al punto de hervor.",
      "Coloca el café molido en el filtro.",
      "Humedece ligeramente el café.",
      "Vierte el resto del agua de forma gradual.",
      "Deja que el café termine de filtrarse y sirve.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 31
  {
    id: "cafe-prensa-francesa",
    name: "Café en Prensa Francesa",
    icon: "🫖",
    image: "/recetario/Café en Prensa Francesa.jpg",
    ingredients: [
      "30 g de café molido grueso",
      "450 ml de agua caliente",
    ],
    preparation: [
      "Calienta el agua sin dejar que hierva.",
      "Coloca el café molido en la prensa francesa.",
      "Vierte el agua y mezcla suavemente.",
      "Deja infusionar durante unos 4 minutos.",
      "Presiona lentamente el émbolo y sirve.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 32
  {
    id: "cafe-moka-pot",
    name: "Café en Cafetera Moka",
    icon: "🫖",
    image: "/recetario/Café en Cafetera Moka.jpg",
    ingredients: [
      "20 g de café molido medio-fino",
      "200 ml de agua",
    ],
    preparation: [
      "Llena la base de la cafetera con agua.",
      "Coloca el café molido en el filtro.",
      "Ensambla la cafetera y colócala a fuego medio.",
      "Espera a que el café suba hacia la cámara superior.",
      "Retira del fuego y sirve inmediatamente.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 33
  {
    id: "espresso-doble",
    name: "Espresso Doble",
    icon: "☕",
    image: "/recetario/Espresso Doble.jpg",
    ingredients: [
      "18 g de café molido",
      "36 ml de agua",
    ],
    preparation: [
      "Muele el café con una textura adecuada para espresso.",
      "Distribuye y compacta el café en el portafiltro.",
      "Realiza la extracción.",
      "Obtén aproximadamente 36 ml de espresso.",
      "Sirve inmediatamente.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 34
  {
    id: "espresso-lungo",
    name: "Espresso Lungo",
    icon: "☕",
    image: "/recetario/Espresso Lungo.jpg",
    ingredients: [
      "18 g de café molido",
      "50-60 ml de agua",
    ],
    preparation: [
      "Prepara el portafiltro con café molido.",
      "Realiza una extracción más larga que la de un espresso tradicional.",
      "Detén la extracción cuando obtengas aproximadamente 50-60 ml.",
      "Sirve inmediatamente.",
      "Disfruta su sabor más prolongado e intenso.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 35
  {
    id: "ristretto",
    name: "Ristretto",
    icon: "☕",
    image: "/recetario/Ristretto.jpg",
    ingredients: [
      "18 g de café molido",
      "20-25 ml de agua",
    ],
    preparation: [
      "Muele el café finamente.",
      "Coloca y compacta el café en el portafiltro.",
      "Realiza una extracción corta.",
      "Obtén aproximadamente 20-25 ml de café concentrado.",
      "Sirve inmediatamente.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 36
  {
    id: "cafe-tiramisu",
    name: "Café Tiramisú",
    icon: "🍰",
    image: "/recetario/Café Tiramisú.jpg",
    ingredients: [
      "1 espresso",
      "100 ml de leche",
      "1 cucharadita de cacao",
      "Crema batida",
      "½ cucharadita de vainilla",
    ],
    preparation: [
      "Prepara un espresso.",
      "Mezcla la leche caliente con la vainilla.",
      "Vierte la leche sobre el espresso.",
      "Añade una capa de crema batida.",
      "Espolvorea cacao sobre la superficie.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 37
  {
    id: "cafe-chocolate-avellana",
    name: "Café de Chocolate y Avellana",
    icon: "🍫",
    image: "/recetario/Café de Chocolate y Avellana.jpg",
    ingredients: [
      "1 espresso",
      "150 ml de leche",
      "1 cucharada de crema de chocolate y avellanas",
      "Espuma de leche",
    ],
    preparation: [
      "Prepara un espresso.",
      "Mezcla la crema de chocolate y avellanas con el espresso.",
      "Calienta y espuma la leche.",
      "Vierte la leche sobre el café.",
      "Finaliza con espuma de leche.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 38
  {
    id: "latte-canela",
    name: "Latte de Canela",
    icon: "🌿",
    image: "/recetario/Latte de Canela.jpg",
    ingredients: [
      "1 espresso",
      "180 ml de leche",
      "½ cucharadita de canela",
      "Azúcar al gusto",
    ],
    preparation: [
      "Prepara un espresso.",
      "Añade la canela a la leche.",
      "Calienta y espuma la leche.",
      "Vierte la leche sobre el espresso.",
      "Espolvorea un poco de canela y sirve.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 39
  {
    id: "latte-pistacho",
    name: "Latte de Pistacho",
    icon: "💚",
    image: "/recetario/Latte de Pistacho.jpg",
    ingredients: [
      "1 espresso",
      "180 ml de leche",
      "1 cucharada de crema de pistacho",
      "Espuma de leche",
    ],
    preparation: [
      "Prepara un espresso.",
      "Mezcla la crema de pistacho con un poco de leche caliente.",
      "Añade el espresso.",
      "Espuma el resto de la leche.",
      "Vierte la leche y termina con espuma.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 40
  {
    id: "latte-coco-vainilla",
    name: "Latte de Coco y Vainilla",
    icon: "🥥",
    image: "/recetario/Latte de Coco y Vainilla.jpg",
    ingredients: [
      "1 espresso",
      "150 ml de leche de coco",
      "½ cucharadita de esencia de vainilla",
      "Hielo opcional",
    ],
    preparation: [
      "Mezcla la leche de coco con la vainilla.",
      "Calienta la mezcla si deseas una bebida caliente.",
      "Prepara un espresso.",
      "Vierte la leche de coco sobre el café.",
      "Sirve caliente o sobre hielo.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 41
  {
    id: "latte-miel-canela",
    name: "Latte de Miel y Canela",
    icon: "🍯",
    image: "/recetario/Latte de Miel y Canela.jpg",
    ingredients: [
      "1 espresso",
      "180 ml de leche",
      "1 cucharada de miel",
      "¼ cucharadita de canela",
    ],
    preparation: [
      "Calienta la leche con la canela.",
      "Añade la miel y mezcla hasta disolver.",
      "Prepara un espresso.",
      "Vierte la leche sobre el café.",
      "Espolvorea una pequeña cantidad de canela para decorar.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 42
  {
    id: "latte-chai",
    name: "Chai Latte con Café",
    icon: "🫖",
    image: "/recetario/Chai Latte con Café.jpg",
    ingredients: [
      "1 espresso",
      "100 ml de leche",
      "80 ml de concentrado de chai",
      "Canela al gusto",
    ],
    preparation: [
      "Calienta el concentrado de chai.",
      "Añade la leche y mezcla.",
      "Prepara un espresso.",
      "Vierte la mezcla de chai sobre el espresso.",
      "Decora con una pizca de canela.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 43
  {
    id: "dirty-chai",
    name: "Dirty Chai",
    icon: "🌶️",
    image: "/recetario/Dirty Chai.jpg",
    ingredients: [
      "1 espresso",
      "150 ml de leche",
      "80 ml de concentrado de chai",
      "Canela",
    ],
    preparation: [
      "Calienta el concentrado de chai.",
      "Añade la leche caliente.",
      "Prepara un espresso.",
      "Vierte el espresso sobre el chai latte.",
      "Finaliza con una pizca de canela.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 44
  {
    id: "cafe-cardamomo",
    name: "Café con Cardamomo",
    icon: "🌿",
    image: "/recetario/Café con Cardamomo.jpg",
    ingredients: [
      "1 taza de café filtrado",
      "2 vainas de cardamomo",
      "Azúcar al gusto",
    ],
    preparation: [
      "Tritura ligeramente las vainas de cardamomo.",
      "Prepara el café junto con el cardamomo.",
      "Deja infusionar brevemente.",
      "Retira las vainas.",
      "Endulza al gusto y sirve caliente.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 45
  {
    id: "cafe-jengibre",
    name: "Café con Jengibre",
    icon: "🫚",
    image: "/recetario/Café con Jengibre.jpg",
    ingredients: [
      "1 taza de café filtrado",
      "½ cucharadita de jengibre fresco rallado",
      "1 cucharadita de miel",
      "Canela opcional",
    ],
    preparation: [
      "Prepara una taza de café caliente.",
      "Añade el jengibre rallado.",
      "Deja infusionar durante un minuto.",
      "Añade la miel y mezcla.",
      "Agrega canela si deseas un perfil más especiado.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 46
  {
    id: "cafe-vainilla-frio",
    name: "Café Frío con Vainilla",
    icon: "🧊",
    image: "/recetario/Café Frío con Vainilla.jpg",
    ingredients: [
      "1 taza de café frío",
      "100 ml de leche",
      "1 cucharadita de esencia de vainilla",
      "Hielo",
    ],
    preparation: [
      "Prepara el café y déjalo enfriar.",
      "Llena un vaso con hielo.",
      "Mezcla la leche con la vainilla.",
      "Añade la leche al vaso.",
      "Vierte el café frío y mezcla suavemente.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 47
  {
    id: "cold-brew-vainilla",
    name: "Cold Brew de Vainilla",
    icon: "🌿",
    image: "/recetario/Cold Brew de Vainilla.jpg",
    ingredients: [
      "150 ml de cold brew",
      "50 ml de leche",
      "1 cucharadita de sirope de vainilla",
      "Hielo",
    ],
    preparation: [
      "Llena un vaso con hielo.",
      "Añade el sirope de vainilla.",
      "Vierte el cold brew.",
      "Añade la leche fría.",
      "Mezcla suavemente y sirve.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 48
  {
    id: "cold-brew-caramelo",
    name: "Cold Brew de Caramelo",
    icon: "🍮",
    image: "/recetario/Cold Brew de Caramelo.jpg",
    ingredients: [
      "150 ml de cold brew",
      "50 ml de leche",
      "1 cucharada de salsa de caramelo",
      "Hielo",
    ],
    preparation: [
      "Añade caramelo al fondo del vaso.",
      "Llena el vaso con hielo.",
      "Vierte el cold brew.",
      "Añade la leche fría.",
      "Decora con un poco más de caramelo.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 49
  {
    id: "espresso-limon",
    name: "Espresso con Limón",
    icon: "🍋",
    image: "/recetario/Espresso con Limón.jpg",
    ingredients: [
      "1 espresso doble",
      "Hielo",
      "1 rodaja de limón",
      "Agua fría opcional",
    ],
    preparation: [
      "Prepara un espresso doble.",
      "Llena un vaso con hielo.",
      "Añade el espresso.",
      "Incorpora unas gotas de limón.",
      "Decora con una rodaja de limón y sirve.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 50
  {
    id: "espresso-limonada",
    name: "Espresso Limonada",
    icon: "🍋",
    image: "/recetario/Espresso Limonada.jpg",
    ingredients: [
      "1 espresso doble",
      "120 ml de limonada",
      "Hielo",
      "Rodaja de limón",
    ],
    preparation: [
      "Llena un vaso alto con hielo.",
      "Vierte la limonada fría.",
      "Prepara un espresso doble.",
      "Añade lentamente el espresso sobre la limonada.",
      "Decora con una rodaja de limón.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 51
  {
    id: "espresso-frutos-rojos",
    name: "Espresso con Frutos Rojos",
    icon: "🍓",
    image: "/recetario/Espresso con Frutos Rojos.jpg",
    ingredients: [
      "1 espresso doble",
      "80 ml de jugo de frutos rojos",
      "Hielo",
      "Frutos rojos para decorar",
    ],
    preparation: [
      "Llena un vaso con hielo.",
      "Vierte el jugo de frutos rojos.",
      "Prepara un espresso doble.",
      "Añade lentamente el espresso.",
      "Decora con frutos rojos y sirve frío.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 52
  {
    id: "espresso-coco-frio",
    name: "Espresso con Coco Frío",
    icon: "🥥",
    image: "/recetario/Espresso con Coco Frío.jpg",
    ingredients: [
      "1 espresso doble",
      "120 ml de agua de coco",
      "Hielo",
      "Coco rallado opcional",
    ],
    preparation: [
      "Llena un vaso con hielo.",
      "Vierte el agua de coco fría.",
      "Prepara un espresso doble.",
      "Añade lentamente el espresso sobre el agua de coco.",
      "Decora con coco rallado si lo deseas.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 53
  {
    id: "cafe-con-azucar-moscabado",
    name: "Café con Azúcar Moscabado",
    icon: "🤎",
    image: "/recetario/Café con Azúcar Moscabado.jpg",
    ingredients: [
      "1 taza de café filtrado",
      "1 cucharadita de azúcar moscabado",
      "30 ml de leche",
    ],
    preparation: [
      "Prepara una taza de café filtrado.",
      "Añade el azúcar moscabado mientras el café está caliente.",
      "Mezcla hasta disolver completamente.",
      "Añade la leche caliente.",
      "Sirve inmediatamente.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },

  // 54
  {
    id: "cafe-chocolate-menta",
    name: "Moka de Chocolate y Menta",
    icon: "🌿",
    image: "/recetario/Moka de Chocolate y Menta.jpg",
    ingredients: [
      "1 espresso",
      "150 ml de leche",
      "1 cucharada de chocolate en polvo",
      "2 gotas de esencia de menta",
      "Espuma de leche",
    ],
    preparation: [
      "Prepara un espresso.",
      "Mezcla el chocolate con el espresso.",
      "Añade la esencia de menta.",
      "Calienta y espuma la leche.",
      "Vierte la leche sobre el café y termina con espuma.",
    ],
    ctaText: CTA_TEXT,
    ctaHref: BUY_SECTION_HREF,
  },
];