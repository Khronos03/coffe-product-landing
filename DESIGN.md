---
name: Cumbre Café
description: Café de especialidad de una familia caficultora de Mistrató, impreso como billete de serie de seguridad.
colors:
  honey-field: "#8a540c"
  honey-stock: "#f7e7be"
  honey-ink: "#4a2a05"
  honey-ink2: "#2f3b86"
  lavado-field: "#1e6b4b"
  lavado-stock: "#d9ecd9"
  lavado-ink: "#0c3524"
  lavado-ink2: "#7a2252"
  natural-field: "#26478f"
  natural-stock: "#dce4f5"
  natural-ink: "#0f2251"
  natural-ink2: "#8a3a0c"
  pina-field: "#a8292a"
  pina-stock: "#f8d9d2"
  pina-ink: "#5a0f10"
  pina-ink2: "#1f3d6b"
  violet-field: "#4b3f8c"
  violet-stock: "#e6e2f3"
  violet-ink: "#211a4a"
typography:
  display:
    fontFamily: "Big Shoulders Display Variable, Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(4.5rem, 10vw, 7.5rem)"
    fontWeight: 900
    lineHeight: 0.78
    letterSpacing: "-0.02em"
    fontFeature: "tnum"
  headline:
    fontFamily: "Big Shoulders Display Variable, Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(2.6rem, 5.4vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  headline-section:
    fontFamily: "Big Shoulders Display Variable, Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 0.95
  title:
    fontFamily: "Big Shoulders Display Variable, Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1
  numeral-price:
    fontFamily: "Big Shoulders Display Variable, Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "tnum"
  body:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    fontVariation: "'wdth' 100"
  body-lede:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.4vw, 1.1875rem)"
    fontWeight: 500
    lineHeight: 1.4
    fontVariation: "'wdth' 100"
  label:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.16em"
    fontVariation: "'wdth' 125"
  label-nav:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.12em"
    fontVariation: "'wdth' 118"
  button:
    fontFamily: "Archivo Variable, Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 800
    lineHeight: 1.2
    fontVariation: "'wdth' 110"
rounded:
  hairline: "2px"
  stamp: "4px"
  control: "6px"
  mini-ticket: "8px"
  ticket: "10px"
spacing:
  chip-gap: "6px"
  tab-gap: "8px"
  ticket-inset: "8px"
  field-row: "10px"
  stub-gap: "16px"
  gutter: "clamp(16px, 4vw, 48px)"
  section-y: "clamp(64px, 10vw, 120px)"
  container: "1180px"
  container-hero: "1280px"
components:
  ticket:
    backgroundColor: "{colors.pina-stock}"
    textColor: "{colors.pina-ink}"
    rounded: "{rounded.ticket}"
  tear-button:
    backgroundColor: "{colors.pina-ink}"
    textColor: "{colors.pina-stock}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "12px 18px"
    height: "56px"
  tear-button-footer:
    backgroundColor: "{colors.violet-stock}"
    textColor: "{colors.violet-ink}"
    rounded: "{rounded.control}"
    height: "56px"
  chip:
    backgroundColor: "{colors.pina-stock}"
    textColor: "{colors.pina-ink}"
    rounded: "{rounded.control}"
    padding: "8px 10px"
    height: "52px"
  chip-selected:
    backgroundColor: "{colors.pina-ink}"
    textColor: "{colors.pina-stock}"
    rounded: "{rounded.control}"
  serie-tab:
    backgroundColor: "{colors.pina-field}"
    textColor: "{colors.pina-stock}"
    rounded: "{rounded.control}"
    padding: "8px 14px"
    height: "52px"
  serie-tab-active:
    backgroundColor: "{colors.pina-stock}"
    textColor: "{colors.pina-ink}"
    rounded: "{rounded.control}"
  select:
    backgroundColor: "{colors.pina-stock}"
    textColor: "{colors.pina-ink}"
    rounded: "{rounded.control}"
    padding: "0 40px 0 12px"
    height: "48px"
  button-outline:
    backgroundColor: "{colors.pina-stock}"
    textColor: "{colors.pina-ink}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "52px"
  button-outline-hover:
    backgroundColor: "{colors.pina-ink}"
    textColor: "{colors.pina-stock}"
  header-order:
    backgroundColor: "{colors.pina-stock}"
    textColor: "{colors.pina-ink}"
    typography: "{typography.label-nav}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "44px"
  mini-ticket:
    backgroundColor: "{colors.violet-stock}"
    textColor: "{colors.violet-ink}"
    rounded: "{rounded.mini-ticket}"
---

# Design System: Cumbre Café

> **Alcance.** Este sistema rige la home (`/`, `src/pages/Home.js`) y el recetario (`/recetas-cafe`, `src/pages/CoffeeRecipes.js`, estilos propios en `src/styles/talonario.css` sobre `billete.css`). Componentes compartidos en `src/components/billete/`. `src/index.css` sigue cargándose de forma global como herencia del sitio anterior; ninguna superficie nueva debe tomar nada de él. Los tokens viven en el selector `.bt`, no en `:root`: cualquier superficie nueva debe montarse dentro de un contenedor `.bt` con `data-ink`.

## Overview

**Creative North Star: "El billete de serie"**

Cada lote de la finca es un impreso de seguridad numerado, y el pedido es su fracción desprendible. El sistema toma su gramática de la impresión de valores colombiana: rosetas de guilloche, campos de líneas onduladas, bordes de microtexto, numerales condensados enormes, etiquetas en versalitas expandidas, sellos de caucho y perforaciones con agujeros troquelados. Nada de eso es ilustración suelta; todo se dibuja como SVG ligero generado en código, para que el billete se vea completo aunque la red móvil sea lenta.

El color funciona como en una imprenta de dos tintas. Cada proceso (Honey, Lavado, Natural, Piña-Whisky) es una familia de tinta con cuatro valores: el **campo** saturado que inunda la región, el **papel** (stock) teñido donde se imprime el billete, la **tinta** profunda del texto y una **segunda tinta** de contraste para los elementos de seguridad. Al cambiar de serie, la página entera cambia de tinta. El violeta de seguridad es la tinta institucional: formatos, finca y cierre.

La densidad es la de un documento impreso: campos rotulados en rejilla con filetes finos, mucha información compacta dentro del billete, y amplitud generosa fuera de él. El sistema rechaza la página de café oscura con crema y serif, la plantilla de héroe más tarjetas iguales, el vidrio, los orbes, los degradados como lavado de color y los emojis.

**Key Characteristics:**
- Una tinta por región; la serie activa repinta el campo, el encabezado y el reverso.
- El billete es el único objeto elevado; todo lo demás es impresión plana sobre papel.
- Numerales y nombres de lote en Big Shoulders Display, condensada y en mayúsculas.
- Etiquetas en Archivo expandida (`wdth` 125) con tracking amplio.
- La perforación separa información de pedido; el pedido se "desprende" hacia WhatsApp.
- Texturas de seguridad (guilloche, ondas, microtexto) en SVG, siempre `aria-hidden`.

## Colors

Cuatro familias de tinta de proceso más una tinta institucional violeta, cada una con campo, papel y tinta profunda; los roles se intercambian por variables (`--field`, `--stock`, `--ink`, `--ink2`) según `data-ink`.

### Primary
- **Rojo Piña-Whisky** (`pina-field`), con **Papel Rosa Pálido** (`pina-stock`), **Tinta Granate** (`pina-ink`) y **Azul Pizarra** (`pina-ink2`): serie 04, el lote que solo sale de la finca. La página abre por defecto en la serie 01 Honey (el lote mejor explicado y el de precio de entrada), así que su ocre es la primera impresión.

### Secondary
- **Ocre Honey** (`honey-field`) con **Papel Crema** (`honey-stock`), **Tinta Tabaco** (`honey-ink`) y **Azul Índigo** (`honey-ink2`): serie 01.
- **Verde Billete Lavado** (`lavado-field`) con **Papel Menta** (`lavado-stock`), **Tinta Bosque** (`lavado-ink`) y **Ciruela** (`lavado-ink2`): serie 02.
- **Azul Natural** (`natural-field`) con **Papel Celeste** (`natural-stock`), **Tinta Marino** (`natural-ink`) y **Óxido** (`natural-ink2`): serie 03.

### Tertiary
- **Violeta de Seguridad** (`violet-field`), **Papel Lila** (`violet-stock`) y **Tinta Noche** (`violet-ink`): la sección Formatos y regalos, la sección de finca (papel lila con títulos en violeta) y el cierre (fondo en tinta noche). Nunca representa un proceso.

### Neutral
El sistema no tiene grises. Los neutros son siempre el papel y la tinta de la familia activa; filetes y bordes se obtienen mezclando la tinta con transparencia (`color-mix(in srgb, var(--ink) 18–45%, transparent)` sobre papel; `var(--stock) 20–50%` sobre campo o tinta). Las sombras usan negro puro con alfa.

### Named Rules
**La Regla de una tinta por región.** Cada región de la página está impresa con una sola familia. El campo inunda; el papel lleva el tinte de esa misma tinta. Nunca mezcles dos procesos en la misma superficie: las únicas excepciones son las barras de color de las pestañas de serie y los puntos de tinta de la tabla, que anuncian otras tintas a propósito.

**La Regla del contraste de imprenta.** Toda familia nueva debe cumplir lo que cumplen las cinco actuales: papel sobre campo y campo sobre papel ≥ 5:1 (hoy 5,1–6,9:1), tinta sobre papel ≥ 10:1 (hoy 10,5–12,6:1) y segunda tinta sobre papel ≥ 6:1. Si una tinta nueva no lo alcanza, se oscurece el campo, no se aclara el texto.

**La Regla de la segunda tinta.** `ink2` es solo para elementos de seguridad: microtexto, el filete doble bajo la línea del emisor, la curva intermedia de la roseta y los sellos. Nunca para texto de lectura ni para acciones.

## Typography

**Display Font:** Big Shoulders Display Variable (con Big Shoulders Display, Arial Narrow, sans-serif)
**Body Font:** Archivo Variable con eje de ancho `wdth` (con Archivo, system-ui, sans-serif)

**Character:** Una condensada de cartel, alta y apretada, para los números de serie y los nombres de lote, contra una grotesca de oficina cuyo eje de ancho hace todo el trabajo de jerarquía menor: normal para leer, expandida para rotular. Ambas se cargan autoalojadas con `@fontsource-variable` (Archivo con el subconjunto `wdth`).

### Hierarchy
- **Display** (900, `clamp(4.5rem, 10vw, 7.5rem)`, 0.78): el número de serie gigante ("04") en color de campo, cifras tabulares. Uno por billete. En móvil baja a 2.5rem.
- **Headline** (800, `clamp(2.6rem, 5.4vw, 4.75rem)`, 0.92, mayúsculas): el nombre del lote, que es el `h1`. En móvil 1.875rem.
- **Headline de sección** (800, `clamp(2.5rem, 5.5vw, 4.5rem)`, 0.95, mayúsculas): títulos del reverso, finca y serie especial; el recetario y el cierre usan `clamp(2.25rem, 4.5vw, 3.5rem)`.
- **Title** (800, 1.5–1.75rem, 1, mayúsculas): título del desprendible y nombre de cada mini billete.
- **Numeral de precio** (800, 2.5rem, 1, tabular): el valor en el desprendible; 2rem en mini billetes, 1.875rem en móvil. Los numerales de paso del reverso (2.75rem) y de datos de finca (1.75rem) usan la misma voz.
- **Body** (400–500, 1.0625rem, 1.55): textos del reverso, finca y cierre, con medida máxima de 48–56ch. La línea de lote bajo el `h1` usa 500 a `clamp(1rem, 1.4vw, 1.1875rem)`, 1.4, máximo 34ch.
- **Label** (700, 0.6875rem, tracking 0.16em, mayúsculas, `wdth` 125, opacidad 0.8): rótulos de campos impresos (`dt`), leyendas del formulario, encabezados de tabla, pie del billete. La línea del emisor usa la misma voz a 0.75rem.
- **Nav / botón:** navegación a 0.8125rem, 600, tracking 0.12em, `wdth` 118, mayúsculas; botón de desprender a 1rem, 800, `wdth` 110, en caja normal.

### Named Rules
**La Regla del numeral condensado.** Big Shoulders es solo para cifras, nombres de lote, títulos de sección y sellos, siempre en mayúsculas o numerales. Nunca para párrafos, etiquetas ni botones.

**La Regla del ancho como jerarquía.** Lo que en otra marca sería cambio de familia aquí es cambio de ancho: lectura en `wdth` 100, acciones en 110, navegación en 118, rótulos en 125. No introduzcas una tercera familia.

## Layout

El billete vive centrado sobre el campo de tinta, en un contenedor de 1280px; las secciones posteriores usan 1180px. El margen lateral es `clamp(16px, 4vw, 48px)` y las secciones respiran `clamp(64px, 10vw, 120px)` en vertical (el recetario, más corto, `clamp(48px, 7vw, 88px)`).

- **Billete (≥ 1024px):** rejilla de tres columnas: cuerpo flexible, perforación vertical de 16px y desprendible de 300–360px. Dentro del cuerpo, copia y datos a la izquierda (1.25fr) y viñeta con la roseta y el empaque a la derecha (1fr).
- **Campos impresos:** rejilla de cuatro columnas con filetes horizontales al 30 % de tinta y separadores verticales al 18 %; un campo ancho ocupa toda la fila.
- **Tablet (< 1024px):** el desprendible pasa debajo del cuerpo y la perforación se vuelve horizontal; los pasos del reverso pasan a 2 columnas.
- **Móvil (< 768px):** el nombre y el número comparten fila con la viñeta reducida a 132px; los campos se compactan; el título del desprendible y el pie del billete se ocultan para que el botón de desprender quede visible en un teléfono de 390×844. Aparece una barra de pedido fija abajo cuando el desprendible sale de pantalla. Todo lo demás colapsa a una columna y la tabla de series se reorganiza en filas de rejilla.
- **Objetivos táctiles:** 44px mínimo en todo control; chips de 52px (46px en móvil); botón de desprender 56px (52px en móvil).

## Elevation & Depth

Híbrido deliberado: el billete es papel apoyado sobre un campo, y es lo único que se levanta. Dentro del papel todo es impresión plana; la profundidad se expresa con filetes, bordes dobles y el contorno discontinuo del desprendible, no con sombras.

### Shadow Vocabulary
- **Papel sobre campo** (`box-shadow: 0 30px 60px -28px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.18)`): el billete principal.
- **Mini billete** (`box-shadow: 0 20px 36px -24px rgba(0,0,0,0.6)`): billetes de formatos y regalos.
- **Botón de desprender** (`box-shadow: 0 10px 18px -12px rgba(0,0,0,0.6)`, al pasar el cursor `0 14px 22px -12px` y `translateY(-2px)`): la única acción con relieve.
- **Barra de pedido móvil** (`box-shadow: 0 12px 28px -8px rgba(0,0,0,0.45)`).
- **Empaque recortado** (`filter: drop-shadow(0 18px 18px rgba(0,0,0,0.28))`): fotos de producto sin fondo dentro de la roseta.

### Named Rules
**La Regla del único papel.** Solo los billetes (principal y mini), el botón de desprender y la barra de pedido proyectan sombra. Paneles, tablas, pestañas y chips son planos.

## Shapes

Esquinas apenas suavizadas, como papel cortado: 10px para el billete, 8px para mini billetes, 6px para todo control, 4px para sellos y marcos de viñeta, 2px para el foco y las barras de tinta. La forma firma del sistema es la **perforación**: una línea de agujeros de 3.2px de radio cada 12px, dibujada en color de campo, con medios círculos de 22px "troquelados" en los extremos que dejan ver el campo a través del papel. El desprendible lleva borde discontinuo y un rayado diagonal fino (−45°, 1px cada 7px, campo al 9 %). Los marcos de viñeta llevan borde simple más contorno doble interior (`4px double`), como un grabado. Los sellos usan borde `3px double`, giro de −6° a −9° y tipografía display.

**La Regla de la perforación.** Entre la información de un lote y su pedido siempre hay una perforación. Ningún formulario de pedido aparece sin ella, y ninguna perforación aparece donde no hay algo que desprender.

## Components

### Botones
- **Botón de desprender (primario):** tinta sobre papel invertida (fondo `ink`, texto `stock`), radio de control, 56px de alto, icono de WhatsApp a 1.25em. Es la única acción primaria y siempre abre WhatsApp con el pedido completo. Al pulsar, el desprendible gira 7° y cae (y +90px, x +18px, opacidad 0, 0.7s con `cubic-bezier(0.16, 1, 0.3, 1)`) y aparece el sello "Listo en WhatsApp" con el aviso "solo falta enviarlo", el enlace para reabrir y el teléfono; con movimiento reducido no hay rasgado y la confirmación cubre el desprendible con su propio papel. El texto del botón es "Pedir por WhatsApp": el rasgado es la metáfora, no la etiqueta. En el cierre se invierte a papel lila sobre tinta noche.
- **Contorno (secundario):** borde de 2px en tinta, 52px; al pasar el cursor se rellena de tinta. Para enlaces a otras secciones (recetario).
- **Fila:** borde de papel al 50 % sobre fondo oscuro, 44px; se rellena de papel al pasar el cursor. Para elegir una serie desde la tabla.
- **Pedir (encabezado):** bloque de papel con texto en tinta, rótulo de navegación en mayúsculas; sube 1px al pasar el cursor.
- **Foco:** contorno de 2px en `currentColor` con 3px de separación en todo el sistema.

### Chips (tamaño)
- **Estilo:** papel con borde de tinta al 45 %, 52px, tamaño en 750 y precio debajo en cifras tabulares al 85 %. Tres por fila.
- **Estado:** seleccionado se invierte a tinta con texto papel; el foco del radio oculto se dibuja sobre el chip.

### Pestañas de serie
Cuatro pestañas de igual ancho sobre el campo, cada una con su número en display y una barra de 6px pintada con la tinta de su proceso (horizontal de 3px abajo en móvil). La activa se vuelve papel con texto en tinta. Cambiar de serie repinta todo el campo en 0.5s y desliza el contenido del billete como una página de libreta.

### Billete (contenedor firma)
Papel con margen interior de 8px que deja un filete al 22 % de tinta como borde de impresión. Orden fijo: microtexto, línea del emisor (Cumbre Café · descriptor · Serie NN) con filete de 2px en segunda tinta, número de serie, nombre de lote, línea del lote, campos impresos, viñeta con roseta de guilloche y empaque, pie con microtexto. A la derecha (abajo en móvil), perforación y desprendible.

### Inputs / Campos
- **Select:** papel, borde de tinta al 45 %, 48px, chevron dibujado con bordes de 2px en tinta. Sin apariencia nativa.

### Navegación
Encabezado fijo en color de campo con texto papel y filete inferior al 28 %. Enlaces en rótulo de navegación con subrayado al pasar el cursor. En móvil se reduce a logo y botón de menú de 44px con borde al 45 %; el menú se despliega como lista de filas de 48px.

### Mini billete
Para formatos y regalos, siempre en violeta: papel lila, código de serie en display arriba a la derecha, empaque recortado, perforación horizontal y un desprendible compacto con chips, select y botón de desprender compacto (44px).

### Sello
Marca de caucho: borde doble de 3px, display 900 en mayúsculas, giro negativo. Se usa en segunda tinta para certificar origen ("Lote de la finca · Mistrató · 1.950 m") y en campo para confirmar el envío del pedido.

### Talonario (recetario)
Una hoja por receta, con la misma anatomía del billete: microtexto, línea de emisor en segunda tinta («Recetario · Hoja NN de 54»), serial gigante sobre roseta, foto con doble filete, ingredientes y pasos numerados, y un desprendible perforado que enlaza a `/#serie`. La temperatura decide la tinta: caliente = `honey`, fría = `natural`, fría o caliente = `lavado`; la página entera se re-entinta con la hoja. Índice lateral fijo (pestañas del talonario) con filtros por temperatura; en móvil el índice se abre con un botón y el paginador queda fijo al alcance del pulgar. Se pasa de hoja con flechas del teclado y cada hoja tiene su URL (`#id`).

### Texturas de seguridad
Roseta de guilloche (tres hipotrocoides y dos círculos, la curva central en segunda tinta), campo de ondas entrelazadas al 13 % de opacidad sobre el campo, y microtexto en Archivo 600 de 5.6px repetido. Siempre SVG generado, siempre decorativo y oculto a lectores de pantalla.

## Do's and Don'ts

### Do:
- **Do** monta toda superficie nueva dentro de `.bt` con `data-ink` y usa `var(--field)`, `var(--stock)`, `var(--ink)` y `var(--ink2)`, nunca hex sueltos.
- **Do** asigna a cada proceso nuevo una familia completa (campo, papel, tinta, segunda tinta) que cumpla la Regla del contraste de imprenta.
- **Do** usa un solo precio por producto y no muestres precios tachados sin un precio anterior real.
- **Do** separa siempre información y pedido con una perforación, y haz que todo pedido termine en el botón de desprender con producto, proceso, tamaño, molienda y precio. Los controles usan el idioma del cliente (Tamaño, Molienda), no el del billete.
- **Do** rotula los datos de un lote como campos impresos: etiqueta en Archivo `wdth` 125 a 0.6875rem con tracking 0.16em, valor debajo.
- **Do** usa `cubic-bezier(0.16, 1, 0.3, 1)` para toda transición (0.2s en controles, 0.5s en cambios de tinta) y reduce todo a instantáneo con `prefers-reduced-motion`.
- **Do** dibuja las texturas de seguridad en SVG generado; el rayado del desprendible y los agujeros de la perforación con funciones de degradado repetido son textura de imprenta, no decoración.

### Don't:
- **Don't** uses degradados como lavado de color, vidrio, orbes, desenfoques de fondo ni emojis.
- **Don't** pongas sombra a paneles, tablas, chips o pestañas; solo el papel de los billetes y la acción de desprender se elevan.
- **Don't** uses Big Shoulders para párrafos, rótulos o botones, ni añadas una tercera familia tipográfica.
- **Don't** uses la segunda tinta (`ink2`) para texto de lectura o acciones.
- **Don't** uses el violeta para un proceso; es la tinta de formatos, finca y cierre.
- **Don't** mezcles dos tintas de proceso en una misma región, salvo los indicadores de color de pestañas y tabla.
- **Don't** reutilices nada de `src/index.css` (look heredado del sitio anterior) en superficies nuevas.

### Pendiente y fuera del sistema
- **Logo:** el encabezado usa el logo raster heredado (`LogoCumbreCafe.webp`) durante esta fase; no es parte del lenguaje del billete y se reemplazará.
- **Viñetas grabadas de la finca:** son marcadores provisionales hasta recibir fotos reales de cafetales, familia y paisaje; las fotos deben entrar dentro del mismo marco de viñeta.
- **Rótulos en móvil:** todos los rótulos respetan el mínimo de 0.6875rem (11px); en móvil los `dt` de los campos usan ancho normal (wdth 100) para caber en cuatro columnas.
