# Pagos en línea con Wompi

Cómo funciona el pago en cumbrecafe.shop, cómo activarlo y qué falta para que la venta llegue sola al panel.

## Cómo funciona

1. El cliente arma su **pedido** con varios cafés (botón «Agregar al pedido») y abre el panel desde «Pedido» en el encabezado.
2. Elige **Pagar en línea**, escribe sus datos de envío y pulsa «Pagar con Wompi».
3. La función `api/checkout.js` **recalcula el total con `src/data/prices.json`** (nunca con lo que mande el navegador), crea una referencia y la **firma** con el secreto de integridad.
4. Se abre el widget de Wompi: tarjeta, PSE, Nequi o botón Bancolombia.
5. Al terminar, el cliente vuelve a `/pedido/estado`, que consulta el estado real a Wompi por medio de `api/pedido-estado.js`.
6. Wompi avisa a `api/wompi-eventos.js`. La función verifica la firma del aviso, **vuelve a consultar la transacción a Wompi** y, si está aprobada, comprueba que el monto coincide con el pedido y lo envía al panel privado.

El **envío se paga al recibir**, directamente a la transportadora. En línea solo se paga el café.

No hay base de datos nueva: el pedido viaja dentro de la referencia firmada, por ejemplo `CC-MW4588Y32615F7-HO250Fx2.NA454Ex1` (2 × Honey 250 g filtro y 1 × Natural 454 g espresso). Los datos de envío viajan en el pago de Wompi.

Enviar el pedido por **WhatsApp** sigue funcionando igual, ahora con todos los productos en un solo mensaje.

## Variables de entorno en Vercel

Ruta: Project → Settings → Environment Variables.

| Variable | Valor | Dónde |
|---|---|---|
| `REACT_APP_WOMPI_ENABLED` | `true` | Muestra el botón «Pagar en línea». Sin ella, la tienda funciona solo con WhatsApp. |
| `WOMPI_ENV` | `sandbox` o `production` | Servidor |
| `WOMPI_PUBLIC_KEY` | `pub_test_…` o `pub_prod_…` | Servidor (se entrega al widget) |
| `WOMPI_INTEGRITY_SECRET` | Secreto de integridad | Servidor. **Nunca en el navegador.** |
| `WOMPI_EVENTS_SECRET` | Secreto de eventos | Servidor |
| `ADMIN_API_URL` | URL de la API del panel (`coffe-private-service`), sin `/` al final | Servidor. Sin ella el pago funciona pero la venta no llega al panel |
| `WEB_ORDERS_KEY` | La misma llave que `WebOrders__Key` en la API | Servidor |

**Recomendado:** pon primero las llaves de **prueba** solo en el entorno *Preview*. Prueba en una URL de preview y, cuando todo funcione, pon las de producción en *Production*. Las variables `REACT_APP_*` quedan dentro de la build: cada cambio requiere redesplegar.

## Pasos en Wompi

1. Crea la cuenta de comercio en comercios.wompi.co. Se puede como persona natural con cuenta Bancolombia.
2. En el panel de Wompi, entra a **Desarrolladores** y copia:
   - la llave pública,
   - el secreto de integridad,
   - el secreto de eventos.

   Hay un juego para pruebas (sandbox) y otro para producción.
3. Configura la **URL de eventos**: `https://www.cumbrecafe.shop/api/wompi-eventos`. Para pruebas, usa la URL de tu preview de Vercel.
4. Prueba en sandbox con los datos de prueba que publica Wompi: una tarjeta aprobada y otra rechazada, además de Nequi y PSE de prueba. Revisa en su documentación los números vigentes.

## Pruebas automáticas

```
npm run test:api
```

Son 15 pruebas que cubren:
- la firma de integridad con la fórmula de Wompi,
- el total calculado en el servidor,
- las 75 combinaciones de producto y molienda dentro de la referencia,
- el rechazo de avisos alterados y de montos que no coinciden,
- que la página de estado no expone datos personales,
- el pedido mínimo y los errores del panel.

Corre estas pruebas cada vez que cambies `prices.json`.

## La venta aparece sola en el panel

`api/wompi-eventos.js` envía cada pago aprobado a `POST {ADMIN_API_URL}/api/web-orders` (proyecto `coffe-private-service`),
con el encabezado `X-Web-Orders-Key: {WEB_ORDERS_KEY}`. La API del panel:

- Busca al cliente por **celular** (ignora espacios, guiones y +57). Si existe, le agrega la venta y solo completa
  la dirección o la ciudad si las tenía vacías. Si no existe, lo crea con origen «Tienda web», dirección y ciudad.
- Crea la venta **pagada**, método «Wompi (tienda web)», envío $0 (lo paga el cliente al recibir) y en observaciones:
  referencia, transacción, medio de pago, dirección de entrega, correo y la molienda exacta.
- Traduce los productos al catálogo del panel: bolsas por lote y peso, cuarterón = bolsa de 2.300 g, drips = sachet
  o caja x 10, kit = sus dos bolsas, caja de drips + taza = 2 cajas.
- Es **idempotente por referencia** (índice único en Mongo): un aviso repetido responde 200 sin duplicar.

Si el panel responde con error (por ejemplo, falta un producto en su catálogo), la función responde 500 y Wompi
reintenta el aviso más tarde. El detalle queda en los logs de Vercel. La configuración de la API está en
`coffe-private-service/DESPLIEGUE.md`, paso 5.

Cuerpo que recibe:

```json
{
  "reference": "CC-MW45E5AVA08115-KT250Gx1.CD20x1",
  "transactionId": "1234-1790000000-11111",
  "status": "APPROVED",
  "paymentMethod": "PSE",
  "paidAt": "2026-11-05T22:10:00.000Z",
  "amount": 96000,
  "shippingPaidOnDelivery": true,
  "customer": { "name": "Luis Gómez", "email": "c@d.co", "phone": "3001112233", "address": "Cl 10 # 5-20", "city": "Pereira", "region": "Risaralda" },
  "items": [
    { "sku": "kit:2x250", "product": "Kit Honey & Lavado", "option": "2 × 250 g", "grind": "Grano entero", "grindId": "grano", "qty": 1, "unitPrice": 48000, "total": 48000 }
  ]
}
```

## Pedido mínimo en línea

`minOnline` en `src/data/prices.json` (hoy $20.000). Por debajo, la comisión fija de Wompi ($700 + IVA) se come el
margen: el pedido muestra solo WhatsApp y el servidor rechaza el pago. Cámbialo ahí y aplica a tienda y servidor.

## Antes de cobrar en producción

- **Términos y condiciones**, con la política de cambios y devoluciones, el **derecho de retracto** y la **reversión del pago** para ventas a distancia (Estatuto del Consumidor, Ley 1480 de 2011). Wompi suele pedir estas páginas al revisar el comercio. No es asesoría legal: confírmalo con un abogado.
- Revisa la comisión vigente de tu plan en Wompi.
