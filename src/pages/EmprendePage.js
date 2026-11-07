// /emprende — la oferta de marca propia en su propia página: se puede compartir directo con
// interesados o usar en pauta, sin mezclarla con la portada de quien compra para su casa.

import "@fontsource-variable/archivo/wdth";
import "@fontsource-variable/big-shoulders-display";
import "../styles/billete.css";
import { SiteFooter, SiteHeader } from "../components/billete/Chrome";
import Emprende from "../components/billete/Emprende";
import { useDocumentMeta } from "../seo";

export default function EmprendePage() {
  useDocumentMeta({
    title: "Emprende con tu marca de café | Cumbre Café",
    description:
      "Vende café de especialidad con tu propia marca. Te enviamos el café de nuestra finca en Mistrató, tostado por nosotros, en bolsas sin marca y con mejor precio por volumen.",
    path: "/emprende",
  });
  return (
    <div className="bt" data-ink="violet">
      <SiteHeader onHome={false} current="emprende" skipTo="#marca-propia" skipLabel="Saltar a la oferta" />
      <main>
        <Emprende page />
      </main>
      <SiteFooter onHome={false} sell={false} />
    </div>
  );
}
