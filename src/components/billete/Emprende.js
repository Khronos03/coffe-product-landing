// Emprende con nosotros: café de la finca en bolsa sin marca para que otros vendan con su propia
// marca. Precio por volumen. Todo se conversa por WhatsApp: aquí no se publican precios ni mínimos.

import { IoLogoWhatsapp } from "react-icons/io";
import { whatsappUrl } from "../../data/catalog";
import { Perforation, WaveField } from "./Security";

const STEPS = [
  { title: "Escríbenos", text: "Cuéntanos tu idea y cuántas bolsas piensas vender." },
  { title: "Elige tu café", text: "Lote, presentación y molienda, con nuestra asesoría." },
  { title: "Ponle tu marca", text: "Te llegan las bolsas sin marca: tú las etiquetas y las vendes." },
];

const WA = whatsappUrl([
  "¡Hola, Cumbre Café! Quiero emprender con mi propia marca de café.",
  "¿Me cuentan cómo funciona y los precios por cantidad?",
]);

/** Bolsa de pie sin marca, con la etiqueta en blanco esperando la del cliente. Decorativa. */
function BlankBag() {
  return (
    <svg className="emp-bag" viewBox="0 0 160 200" aria-hidden="true" focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        {/* cuerpo con fuelle abajo */}
        <path d="M30 26 h100 l6 150 q-56 14 -112 0 z" />
        {/* cierre y pestaña de rasgado */}
        <path d="M30 26 v-10 h100 v10" />
        <path d="M34 40 h92" strokeDasharray="2 5" />
        {/* fuelle */}
        <path d="M24 176 q56 -10 112 0" opacity="0.55" />
      </g>
      {/* etiqueta en blanco */}
      <rect x="46" y="74" width="68" height="62" rx="3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="5 4" />
      <text x="80" y="101" textAnchor="middle" className="emp-bag-label">TU</text>
      <text x="80" y="121" textAnchor="middle" className="emp-bag-label">MARCA</text>
    </svg>
  );
}

/** `page`: en /emprende el título es el h1 de la página. */
export default function Emprende({ page = false }) {
  const Title = page ? "h1" : "h2";
  return (
    <section className={`emprende ${page ? "is-page" : ""}`} id="marca-propia" aria-labelledby="emprende-title" data-ink="violet">
      <WaveField className="field-waves" />
      <article className="emp-ticket">
        <div className="emp-body">
          <div className="billete-issuer">
            <span>Cumbre Café</span>
            <span className="billete-issuer-mid">Emprende con nosotros</span>
            <span>Marca propia</span>
          </div>

          <Title className="emp-title" id="emprende-title">
            Tu marca, nuestro café
          </Title>
          <p className="emp-lede">
            ¿Quieres vender café con tu propio nombre? Te enviamos el café de nuestra finca, tostado por nosotros, en
            bolsas sin marca. Tú le pones tu etiqueta y lo vendes como tuyo. Ya hay emprendedores haciéndolo con
            nosotros.
          </p>

          <ol className="emp-steps">
            {STEPS.map((s, i) => (
              <li key={s.title} className="emp-step">
                <span className="emp-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p>
                  <strong>{s.title}.</strong> {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <Perforation vertical className="billete-perf" />

        <div className="emp-stub">
          <BlankBag />
          <p className="emp-price">
            <strong>Entre más unidades, mejor precio.</strong> Te contamos los valores por cantidad.
          </p>
          <a className="tear-button" href={WA} target="_blank" rel="noopener noreferrer" data-source="emprende" data-product="marca propia">
            <IoLogoWhatsapp aria-hidden="true" className="tear-button-icon" />
            <span>Quiero mi marca</span>
          </a>
        </div>
      </article>
    </section>
  );
}
