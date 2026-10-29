// Página 404: un billete anulado. La ruta no existe en la serie; el desprendible
// ofrece volver a los cafés, abrir el recetario o escribir por WhatsApp.

import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoLogoWhatsapp } from "react-icons/io";
import "@fontsource-variable/archivo/wdth";
import "@fontsource-variable/big-shoulders-display";
import "../styles/billete.css";
import "../styles/notfound.css";
import { whatsappUrl } from "../data/catalog";
import { SiteFooter, SiteHeader } from "../components/billete/Chrome";
import { Microtext, Perforation, WaveField } from "../components/billete/Security";

const MAX_PATH = 64;

export default function NotFound() {
  const { pathname } = useLocation();
  const shownPath = pathname.length > MAX_PATH ? `${pathname.slice(0, MAX_PATH - 1)}…` : pathname;

  // Título propio y fuera del índice de buscadores: la app responde 200 a cualquier ruta.
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Página no encontrada · Cumbre Café";
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.appendChild(robots);
    return () => {
      document.title = prevTitle;
      robots.remove();
    };
  }, []);

  const help = whatsappUrl([
    `¡Hola, Cumbre Café! Llegué a una página de la web que no existe (${shownPath}). ¿Me ayudan a encontrar lo que buscaba?`,
  ]);

  return (
    <div className="bt nf" data-ink="violet">
      <SiteHeader onHome={false} skipTo="#nf-salidas" skipLabel="Saltar a las opciones" />
      <main className="nf-field">
        <WaveField className="field-waves" />

        <article className="nf-ticket" aria-labelledby="nf-title">
          <div className="nf-body">
            <Microtext className="billete-micro" text="CUMBRE CAFÉ MISTRATÓ RISARALDA BILLETE NO VÁLIDO SERIE 404" />
            <div className="billete-issuer">
              <span>Cumbre Café</span>
              <span className="billete-issuer-mid">Billete no válido</span>
              <span>Serie 404</span>
            </div>

            <div className="nf-main">
              <p className="nf-serial" aria-hidden="true">
                404
              </p>
              <h1 className="nf-title" id="nf-title">
                Este billete no está en nuestra serie
              </h1>
              <p className="nf-line">
                La página que buscas no existe o cambió de lugar. Revisa el enlace o vuelve a elegir tu café desde la
                serie.
              </p>

              <dl className="nf-fields">
                <div className="is-wide">
                  <dt>Buscaste</dt>
                  <dd className="nf-path">{shownPath}</dd>
                </div>
                <div>
                  <dt>Estado</dt>
                  <dd>Sin emitir</dd>
                </div>
              </dl>
            </div>

            <p className="stamp nf-void" aria-hidden="true">
              Anulado
            </p>
            <Microtext className="billete-micro" text="CAFÉ DE ORIGEN COLOMBIANO PEDIDOS POR WHATSAPP ENVÍO A TODA COLOMBIA" />
          </div>

          <Perforation vertical className="billete-perf" />

          <nav className="nf-stub" id="nf-salidas" aria-labelledby="nf-stub-title">
            <h2 className="nf-stub-title" id="nf-stub-title">
              Sigue por aquí
            </h2>
            <Link className="tear-button" to="/">
              Ver los cafés de la serie
            </Link>
            <Link className="nf-secondary" to="/recetas-cafe">
              Abrir el recetario
            </Link>
            <p className="nf-help">
              ¿Buscabas un café o un pedido en particular?{" "}
              <a className="inline-target" href={help} target="_blank" rel="noopener noreferrer">
                <IoLogoWhatsapp aria-hidden="true" className="nf-help-icon" /> Escríbenos por WhatsApp
              </a>
            </p>
          </nav>
        </article>
      </main>
      <SiteFooter onHome={false} />
    </div>
  );
}
