# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Principal: el aficionado al café de especialidad en Colombia.** Conoce o quiere conocer la diferencia entre procesos (honey, lavado, natural, fermentaciones especiales), prepara en casa con métodos como filtrado, prensa o moka, y elige un café por su perfil de taza, su proceso y su origen, no solo por el precio. Llega desde redes (Instagram, TikTok, Facebook) o por recomendación, revisa la tienda en el celular y paga en línea o cierra la compra conversando por WhatsApp.

Audiencias secundarias que la tienda ya atiende (confirmadas por el catálogo, no priorizadas):
- Quien compra para regalar: kits, cajas de sachets, combos.
- Compra por volumen: Cuarterón de 5 lb.

## Product Purpose

Cumbre Café es la tienda en línea de una familia caficultora de Mistrató, Risaralda, que vende su propio café de especialidad tostado y molido directamente al consumidor. El sitio existe para que el visitante entienda qué hace distinto a cada proceso, elija un producto, una presentación y una molienda, y lo pague en línea (o lo pida por WhatsApp) con el pedido ya especificado.

Éxito: más pedidos pagados en línea desde una ficha de producto concreta, sin perder a quien prefiere WhatsApp, y una marca que se perciba como productor de especialidad serio, no como café genérico.

## Positioning

Cumbre Café controla toda la cadena: cultiva, procesa en su propio beneficio y tuesta. Eso le permite:
- **Procesos propios.** Diseña y experimenta protocolos de fermentación en la finca (por ejemplo Piña-Whisky), además de honey, lavado y natural.
- **Productor directo.** De la finca a la taza, sin intermediarios.
- **Familia y origen.** Familia caficultora con más de 45 años cultivando café en Mistrató, Risaralda, a 1.950 m s.n.m.
- **Precio directo.** Café de especialidad a un precio accesible porque no hay intermediarios.

Una marca revendedora o tostadora urbana no puede reclamar con verdad los procesos diseñados en la propia finca ni la cadena completa bajo control familiar.

## Operating Context

- **Pago en línea con Wompi (Bancolombia), acción principal** (decisión del productor, noviembre de 2026). El botón «Pedir y pagar» agrega el producto a un pedido de varios productos y lo abre; el cliente llena contacto y entrega y paga el café con Nequi, PSE, Daviplata, tarjeta o Bancolombia. El envío lo paga al recibir, a la transportadora. Pago en línea solo desde $20.000 (`minOnline` en `src/data/prices.json`): por debajo, la comisión fija de Wompi se come el margen y ese pedido va por WhatsApp.
- La venta pagada llega sola al panel privado (`coffe-private-landing` / `coffe-private-service`): el cliente se busca por celular y, si no existe, se crea con origen «Tienda web».
- **WhatsApp sigue como alternativa secundaria** (+57 321 636 3596): el pedido completo se envía en un solo mensaje prellenado y se paga por Bancolombia, Llave, Nequi o contra entrega.
- El pago en línea se activa con `REACT_APP_WOMPI_ENABLED=true`; sin esa variable la tienda vuelve a WhatsApp como acción principal. Precios: una sola fuente en `src/data/prices.json`, que también usa el servidor para cobrar. Guía técnica: `docs/PAGOS-WOMPI.md`.
- Envíos a toda Colombia.
- Tráfico principalmente móvil, que llega desde Instagram (@cumbre.cafe), TikTok y Facebook.
- El sitio incluye un recetario (`/recetas-cafe`) con 54 recetas fotografiadas, como contenido de valor para quien prepara en casa.
- Correo de contacto: cafesaboracampo@gmail.com.

## Capabilities and Constraints

- **Stack:** React 18 (Create React App, `react-scripts` 5), Tailwind CSS 3, framer-motion, react-router-dom 6, react-icons. Rutas: `/` (landing de una sola página con anclas), `/recetas-cafe`, `/privacidad`, `/pedido/estado` (comprobante de pago), `/seguimiento/<clave>` (estado del pedido) y `/resena/<clave>` (reseña del pedido, con la misma clave) y `/emprende` (marca propia: café en bolsa sin marca con precio por volumen; en la portada solo una franja de entrada). Funciones de Vercel en `/api` para el pago (checkout, eventos de Wompi y estado), el seguimiento y las reseñas.
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
- La molienda no tiene valor por defecto: el cliente la elige antes de pagar o abrir WhatsApp (decisión del productor tras la crítica de octubre de 2026).
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
- Formas de pago: en línea con Wompi (Nequi, PSE, Daviplata, tarjeta o Bancolombia); por WhatsApp, Bancolombia, Llave, Nequi o pago contra entrega. El envío se paga al recibir.
- Drips: sachets sellados herméticamente, con café Lavado.
- Natural: se seca al sol durante semanas y se voltea varias veces al día (se seca en cereza, sin despulpar).
- Cuarterón 5 lb: $175.000.
- Entrega: de 3 a 5 días hábiles, a toda Colombia.
- Tostión: cada semana.
- Honey (Red Honey) es el lote más pedido. Se muestra como "El más pedido".
- Piña-Whisky se fermenta con piña de verdad en el beneficio de la finca; no es una infusión. (La bolsa actual dice "infusionado artesanalmente": hay que corregir el empaque. Los pasos del protocolo siguen pendientes.)

**No respaldada:** "+150 municipios con entregas" (hoy en `HookUser.js`). No se debe reutilizar ni ampliar hasta que haya registros. "Envío a toda Colombia" se mantiene como política de envío.

**Reseñas:** solo reales. Las deja el cliente desde el link de su pedido (compra verificada) o las carga el productor desde un mensaje de WhatsApp con permiso del cliente (marcadas así). Se publican solo aprobadas en el panel y autorizadas por el cliente; la sección de la portada aparece desde 3. Nunca se publican reseñas de ejemplo ni inventadas (engañoso para el cliente y contrario a las normas de publicidad de la SIC).

**Ausentes (no inventar):** testimonios con nombre fuera del sistema de reseñas, puntajes SCA o de catación, premios, certificaciones de sostenibilidad. El sitio usa hoy "100 % Sostenible" y "Premium" sin respaldo documentado. Tratarlos como afirmaciones a verificar, no como evidencia.

Material real disponible: fotografías del recetario (`public/recetario/`), renders de empaques, fotos de producto y video de envíos. El productor tiene o puede conseguir fotos reales de la finca y los cafetales, y de la familia (pendientes de entregar). No hay fotos del proceso (despulpado, fermentación, secado).

## Product Principles

1. **El proceso es el producto.** El aficionado compra por proceso y perfil. Cada producto debe explicar qué lo hace distinto antes de mostrar el precio.
2. **Toda decisión termina en un pedido completo.** Producto, presentación, molienda y precio quedan definidos antes de pagar en línea o escribir por WhatsApp. Reducir fricción entre elegir y pagar; el candado y el monto aparecen solo en el botón que cobra.
3. **Verdad de origen, sin adornos.** Solo afirmaciones que el productor puede respaldar: finca, familia, altitud, años y procesos. Sin sellos ni cifras decorativas.
4. **Precio directo sin abaratar la marca.** Precio accesible, percepción de especialidad.
5. **Móvil primero.** La visita típica viene de redes en el celular.
