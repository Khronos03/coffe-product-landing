# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Principal: el aficionado al café de especialidad en Colombia.** Conoce o quiere conocer la diferencia entre procesos (honey, lavado, natural, fermentaciones especiales), prepara en casa con métodos como filtrado, prensa o moka, y elige un café por su perfil de taza, su proceso y su origen, no solo por el precio. Llega desde redes (Instagram, TikTok, Facebook) o por recomendación, revisa la tienda en el celular y cierra la compra conversando por WhatsApp.

Audiencias secundarias que la tienda ya atiende (confirmadas por el catálogo, no priorizadas):
- Quien compra para regalar: kits, cajas de sachets, combos.
- Compra por volumen: Cuarterón de 5 lb.

## Product Purpose

Cumbre Café es la tienda en línea de una familia caficultora de Mistrató, Risaralda, que vende su propio café de especialidad tostado y molido directamente al consumidor. El sitio existe para que el visitante entienda qué hace distinto a cada proceso, elija un producto y una presentación, y abra un pedido por WhatsApp con el producto ya especificado.

Éxito: más conversaciones de WhatsApp iniciadas desde una ficha de producto concreta (no desde el botón genérico) y una marca que se perciba como productor de especialidad serio, no como café genérico.

## Positioning

Cumbre Café controla toda la cadena: cultiva, procesa en su propio beneficio y tuesta. Eso le permite:
- **Procesos propios.** Diseña y experimenta protocolos de fermentación en la finca (por ejemplo Piña-Whisky), además de honey, lavado y natural.
- **Productor directo.** De la finca a la taza, sin intermediarios.
- **Familia y origen.** Familia caficultora con más de 45 años cultivando café en Mistrató, Risaralda, a 1.950 m s.n.m.
- **Precio directo.** Café de especialidad a un precio accesible porque no hay intermediarios.

Una marca revendedora o tostadora urbana no puede reclamar con verdad los procesos diseñados en la propia finca ni la cadena completa bajo control familiar.

## Operating Context

- Compra 100 % por WhatsApp (+57 321 636 3596). No hay carrito, checkout ni pasarela de pago. Cada ficha genera un mensaje prellenado con producto, presentación, perfil, tostión, proceso, notas y precio.
- Envíos a toda Colombia.
- Tráfico principalmente móvil, que llega desde Instagram (@cumbre.cafe), TikTok y Facebook.
- El sitio incluye un recetario (`/recetas-cafe`) con 54 recetas fotografiadas, como contenido de valor para quien prepara en casa.
- Correo de contacto: cafesaboracampo@gmail.com.

## Capabilities and Constraints

- **Stack:** React 18 (Create React App, `react-scripts` 5), Tailwind CSS 3, framer-motion, react-router-dom 6, react-icons. Rutas: `/` (landing de una sola página con anclas) y `/recetas-cafe`.
- **Catálogo actual** (`src/pages/ProductInfo.js`), en presentaciones de 250, 350 y 454 g, todos con tostión media y vendidos molidos:
  - Proceso Honey: perfil panela y miel.
  - Proceso Lavado: perfil frutos rojos.
  - Proceso Natural: perfil frutos rojos y vino.
  - Piña-Whisky: fermentación especial.
  - Cuarterón 5 lb (Honey o Lavado).
  - Drips en sachet (unidad $2.500 / caja x10 $20.000).
  - Regalos: Kit Honey & Lavado (2×250 g $48.000 / 2×454 g $65.000) y Caja de drips x20 + taza ($48.000). Kit y Combo se unificaron (decisión del productor); un solo precio por producto y sin precios tachados.
- Los precios están escritos a mano en el código. No hay CMS ni inventario. Cualquier cambio de catálogo es un cambio de código.
- La home ya no abre ningún modal al cargar; abre en el lote 01 Honey (decisión del productor), salvo que el visitante vuelva a la pestaña con otro lote ya elegido.
- La molienda no tiene valor por defecto: el cliente la elige antes de abrir WhatsApp (decisión del productor tras la crítica de octubre de 2026).
- **Variedad:** Castillo (confirmado).
- **Formato:** se vende en grano entero o molido, con molienda a pedido según el método del cliente (filtro, prensa, moka, espresso).
- **Drips / sachets:** las bolsas drip son de la marca de empaque "CoffeeTime"; el café es Cumbre. La identidad de Cumbre debe ir por delante en cualquier imagen de ese producto.

## Brand Commitments

- Nombre: **Cumbre Café**. Dominio: cumbrecafe.shop. Firma del sitio: Alexander Suaza M.
- Branding abierto: el productor confirmó que logo, empaques y colores pueden cambiar si el rediseño lo pide.
- Idioma: español de Colombia. Trato cercano y familiar.
- Activos existentes: logo (`LogoCumbreCafe.webp`), cabecera (`public/cumbreCafeHeader.svg/.webp`), renders de empaque por producto (`public/*Molido.svg`), fotos de producto en `src/` y el video `src/loop-envios.mp4`.
- Terminología del oficio que se debe respetar: *tostión*, *proceso*, *perfil de taza*, *notas*, *m s.n.m*, *cuarterón*, *sachets*.

## Evidence on Hand

Confirmadas por el productor:
- Más de 45 años cultivando café.
- Altitud: 1.950 m s.n.m.
- 98 % de clientes recomiendan el café (dato del productor).
- Ubicación: Mistrató, Risaralda, Colombia.
- Formas de pago: Bancolombia, Llave, Nequi o pago contra entrega.
- Drips: sachets sellados herméticamente, con café Lavado.
- Natural: se seca al sol durante semanas y se voltea varias veces al día (se seca en cereza, sin despulpar).
- Cuarterón 5 lb: $175.000.
- Entrega: de 3 a 5 días hábiles, a toda Colombia.
- Tostión: cada semana.
- Honey (Red Honey) es el lote más pedido. Se muestra como "El más pedido".
- Piña-Whisky se fermenta con piña de verdad en el beneficio de la finca; no es una infusión. (La bolsa actual dice "infusionado artesanalmente": hay que corregir el empaque. Los pasos del protocolo siguen pendientes.)

**No respaldada:** "+150 municipios con entregas" (hoy en `HookUser.js`). No se debe reutilizar ni ampliar hasta que haya registros. "Envío a toda Colombia" se mantiene como política de envío.

**Ausentes (no inventar):** testimonios con nombre, reseñas citables, puntajes SCA o de catación, premios, certificaciones de sostenibilidad. El sitio usa hoy "100 % Sostenible" y "Premium" sin respaldo documentado. Tratarlos como afirmaciones a verificar, no como evidencia.

Material real disponible: fotografías del recetario (`public/recetario/`), renders de empaques, fotos de producto y video de envíos. El productor tiene o puede conseguir fotos reales de la finca y los cafetales, y de la familia (pendientes de entregar). No hay fotos del proceso (despulpado, fermentación, secado).

## Product Principles

1. **El proceso es el producto.** El aficionado compra por proceso y perfil. Cada producto debe explicar qué lo hace distinto antes de mostrar el precio.
2. **Toda decisión termina en WhatsApp con contexto.** El pedido llega con producto, presentación y precio ya definidos. Reducir fricción entre elegir y escribir.
3. **Verdad de origen, sin adornos.** Solo afirmaciones que el productor puede respaldar: finca, familia, altitud, años y procesos. Sin sellos ni cifras decorativas.
4. **Precio directo sin abaratar la marca.** Precio accesible, percepción de especialidad.
5. **Móvil primero.** La visita típica viene de redes en el celular.
