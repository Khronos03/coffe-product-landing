// El reverso del billete: cómo se hace el lote activo y la tabla de la serie.

import { IoLogoWhatsapp } from "react-icons/io";
import { SERIES, formatCOP, whatsappUrl } from "../../data/catalog";
import { Rosette } from "./Security";

export default function Reverso({ active, onSelect }) {
  const serie = SERIES.find((s) => s.id === active);
  const { protocol } = serie;

  const goToTicket = (id, source) => {
    onSelect(id, source);
    const el = document.getElementById("serie");
    if (el) el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <section className="reverso" id="proceso" aria-labelledby="reverso-title">
      <span id="section3" className="anchor-alias" aria-hidden="true" />
      <div className="reverso-inner">
        <div className="reverso-head">
          <h2 id="reverso-title" className="reverso-title">
            Cómo se hace el {serie.name}
          </h2>
          <p className="reverso-summary">{protocol.summary}</p>
        </div>

        {protocol.steps ? (
          <ol className="reverso-steps">
            {protocol.steps.map(([title, text]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        ) : (
          <div className="reverso-own">
            <div className="reverso-seal">
              <Rosette className="reverso-seal-rosette" />
              <p className="stamp stamp-lg">
                Protocolo
                <br />
                de la finca
              </p>
            </div>
            <div className="reverso-own-copy">
              <p>
                No es un proceso de manual: lo diseñamos y lo ejecutamos en nuestro propio beneficio, en Mistrató.
                Escríbenos y te contamos cómo se hace el lote disponible.
              </p>
              <a
                className="text-link"
                href={whatsappUrl([
                  "¡Hola, Cumbre Café! Quiero saber más del lote Piña-Whisky: cómo lo fermentan y qué disponibilidad tienen.",
                ])}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoWhatsapp aria-hidden="true" /> Pregúntanos por este lote
              </a>
            </div>
          </div>
        )}

        <div className="serie-table-wrap">
          <h3 className="serie-table-title" id="tabla-serie">
            Tabla de la serie
          </h3>
          <table className="serie-table" aria-labelledby="tabla-serie">
            <thead>
              <tr>
                <th scope="col">Serie</th>
                <th scope="col">Proceso</th>
                <th scope="col">Perfil</th>
                <th scope="col" className="num">
                  Desde
                </th>
                <th scope="col">
                  <span className="sr-only">Acción</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {SERIES.map((s) => (
                <tr key={s.id} data-ink={s.ink} className={s.id === active ? "is-active" : ""}>
                  <td className="num serial-cell">
                    <span className="ink-dot" aria-hidden="true" />
                    {s.serial}
                  </td>
                  <th scope="row">{s.name}</th>
                  <td>{s.perfil}</td>
                  <td className="num">{formatCOP(s.sizes[0].price)}</td>
                  <td className="action">
                    <button type="button" className="row-button" onClick={(e) => goToTicket(s.id, e.detail === 0 ? "keyboard" : "pointer")}>
                      {s.id === active ? "Seleccionado" : "Ver este lote"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fine">Precios por 250 g. Todos en variedad Castillo, tostión media, en grano o molidos a pedido.</p>
        </div>
      </div>
    </section>
  );
}
