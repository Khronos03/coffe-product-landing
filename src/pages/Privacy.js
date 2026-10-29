// Política de privacidad y cookies (Ley 1581 de 2012 y Decreto 1377 de 2013).
// Describe solo lo que el sitio hace de verdad. Si se añaden herramientas o cookies, actualizar
// esta página, la fecha y CONSENT_VERSION en consent.js.

import "@fontsource-variable/archivo/wdth";
import "@fontsource-variable/big-shoulders-display";
import "../styles/billete.css";
import "../styles/privacidad.css";
import { SiteFooter, SiteHeader } from "../components/billete/Chrome";
import { WaveField } from "../components/billete/Security";
import { GA_MEASUREMENT_ID } from "../analytics";
import { openConsent } from "../consent";
import { useDocumentMeta } from "../seo";

// Datos del responsable del tratamiento. Completar con el nombre legal, documento y dirección.
const RESPONSABLE = {
  nombre: "Cumbre Café",
  domicilio: "Mistrató, Risaralda, Colombia",
  correo: "cafesaboracampo@gmail.com",
  telefono: "+57 321 636 3596",
};
const UPDATED = "29 de octubre de 2026";

const STORAGE = [
  {
    name: "_ga",
    kind: "Cookie de Google Analytics",
    purpose: "Distinguir visitantes para contar visitas sin identificarte por nombre.",
    lasts: "13 meses",
    when: "Solo si aceptas",
  },
  {
    name: `_ga_${GA_MEASUREMENT_ID.replace(/^G-/, "")}`,
    kind: "Cookie de Google Analytics",
    purpose: "Mantener el estado de la visita (sesión) para Analytics.",
    lasts: "13 meses",
    when: "Solo si aceptas",
  },
  {
    name: "cumbre:consentimiento",
    kind: "Almacenamiento local del navegador",
    purpose: "Recordar si aceptaste o rechazaste las cookies, con su fecha.",
    lasts: "Hasta que borres los datos del navegador",
    when: "Siempre (es necesaria)",
  },
  {
    name: "cumbre:seleccion · cumbre:pedido-abierto",
    kind: "Almacenamiento de la pestaña",
    purpose: "No perder el lote, tamaño, molienda y pedido abierto si la página se recarga. Nunca sale de tu dispositivo.",
    lasts: "Se borra al cerrar la pestaña",
    when: "Siempre (es necesaria)",
  },
];

export default function Privacy() {
  useDocumentMeta({
    title: "Política de privacidad y cookies | Cumbre Café",
    description:
      "Qué datos trata Cumbre Café, para qué usa Google Analytics, qué cookies instala solo si aceptas y cómo ejercer tus derechos según la Ley 1581 de 2012.",
    path: "/privacidad",
  });

  return (
    <div className="bt pv" data-ink="violet" id="top">
      <SiteHeader onHome={false} skipTo="#pv-texto" skipLabel="Saltar al contenido" />
      <main className="pv-field">
        <WaveField className="field-waves" />
        <article className="pv-sheet" id="pv-texto" aria-labelledby="pv-title">
          <h1 className="pv-title" id="pv-title">
            Privacidad y cookies
          </h1>
          <p className="pv-updated">Última actualización: {UPDATED}</p>

          <p className="pv-lede">
            Esta tienda no tiene registro, carrito ni pagos en línea: tu pedido se arma aquí y lo envías tú por WhatsApp.
            Por eso tratamos muy pocos datos, y aquí te contamos cuáles.
          </p>

          <h2>Quién es responsable</h2>
          <dl className="pv-facts">
            <div>
              <dt>Responsable</dt>
              <dd>{RESPONSABLE.nombre}</dd>
            </div>
            <div>
              <dt>Domicilio</dt>
              <dd>{RESPONSABLE.domicilio}</dd>
            </div>
            <div>
              <dt>Correo</dt>
              <dd>
                <a href={`mailto:${RESPONSABLE.correo}`}>{RESPONSABLE.correo}</a>
              </dd>
            </div>
            <div>
              <dt>WhatsApp</dt>
              <dd>
                <a href="https://wa.me/573216363596" target="_blank" rel="noopener noreferrer">
                  {RESPONSABLE.telefono}
                </a>
              </dd>
            </div>
          </dl>

          <h2>Qué datos tratamos y para qué</h2>
          <h3>Tu pedido por WhatsApp</h3>
          <p>
            El sitio no guarda tus datos: prepara un mensaje con el café, el tamaño, la molienda y el precio, y tú decides
            si lo envías. Lo que nos compartas en WhatsApp (nombre, dirección, teléfono) lo usamos solo para confirmar
            disponibilidad, coordinar el pago y hacer el envío. WhatsApp es un servicio de Meta con su propia política de
            privacidad.
          </p>
          <h3>Analítica, solo si aceptas</h3>
          <p>
            Con tu autorización usamos Google Analytics 4 para entender cómo se usa la tienda: páginas vistas, qué cafés
            miras, cuándo pulsas «Pedir» (producto, tamaño, molienda y valor), tipo de dispositivo, ciudad aproximada y de
            dónde llegaste (por ejemplo, Instagram o Google). No lo usamos para publicidad y desactivamos las señales de
            Google y la personalización de anuncios. Google trata estos datos como encargado y puede almacenarlos en
            servidores fuera de Colombia. Si rechazas, no se carga Google Analytics ni se instala ninguna de sus cookies.
          </p>

          <h2>Cookies y almacenamiento</h2>
          <div className="pv-table-wrap">
            <table className="pv-table">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Para qué</th>
                  <th scope="col">Duración</th>
                  <th scope="col">Cuándo</th>
                </tr>
              </thead>
              <tbody>
                {STORAGE.map((s) => (
                  <tr key={s.name}>
                    <th scope="row">
                      <code>{s.name}</code>
                      <span>{s.kind}</span>
                    </th>
                    <td>{s.purpose}</td>
                    <td>{s.lasts}</td>
                    <td>{s.when}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pv-change">
            <p>Puedes cambiar tu decisión en cualquier momento. Si retiras la autorización, borramos las cookies de Analytics de este navegador.</p>
            <button type="button" className="pv-btn" onClick={openConsent}>
              Configurar cookies
            </button>
          </div>

          <h2>Tus derechos</h2>
          <p>Según la Ley 1581 de 2012, puedes:</p>
          <ul>
            <li>Conocer, actualizar y rectificar tus datos.</li>
            <li>Pedir prueba de la autorización que nos diste.</li>
            <li>Saber cómo hemos usado tus datos.</li>
            <li>Revocar la autorización o pedir que eliminemos tus datos.</li>
            <li>Presentar quejas ante la Superintendencia de Industria y Comercio (SIC).</li>
            <li>Acceder gratis a tus datos.</li>
          </ul>
          <p>
            Para ejercerlos, escríbenos a <a href={`mailto:${RESPONSABLE.correo}`}>{RESPONSABLE.correo}</a> o por
            WhatsApp. Respondemos las consultas en un máximo de 10 días hábiles y los reclamos en un máximo de 15 días
            hábiles, como establece la ley.
          </p>

          <h2>Cambios</h2>
          <p>
            Si cambiamos lo que hacemos con tus datos, actualizaremos esta página y su fecha, y si añadimos cookies nuevas
            te volveremos a pedir autorización.
          </p>
        </article>
      </main>
      <SiteFooter onHome={false} />
    </div>
  );
}
