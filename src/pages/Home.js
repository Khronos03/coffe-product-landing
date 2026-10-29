import { useCallback, useState } from "react";
import "@fontsource-variable/archivo/wdth";
import "@fontsource-variable/big-shoulders-display";
import "../styles/billete.css";
import { SERIES } from "../data/catalog";
import { COFFEE_RECIPES } from "../data/coffeeRecipes";
import SerieHero from "../components/billete/SerieHero";
import { readDraft } from "../components/billete/orderMemory";
import { track } from "../analytics";
import { HOME_META, SITE_NAME, SITE_URL, useDocumentMeta, useJsonLd } from "../seo";
import Reverso from "../components/billete/Reverso";
import Finca from "../components/billete/Finca";
import SerieEspecial from "../components/billete/SerieEspecial";
import { MobileOrderBar, RecetarioBand, SiteFooter, SiteHeader } from "../components/billete/Chrome";

// Abre con el lote 01 (Honey): el más pedido y el de precio de entrada.
// Si la pestaña se recargó (p. ej. al volver de WhatsApp), vuelve al lote que se estaba eligiendo.
const DEFAULT_SERIE = "honey";
const initialSerie = () => {
  const d = readDraft();
  return d && SERIES.some((s) => s.id === d.serieId) ? d.serieId : DEFAULT_SERIE;
};

// Cada proceso como producto con su rango de precios real (del catálogo), para resultados enriquecidos.
const PRODUCTS_LD = {
  "@context": "https://schema.org",
  "@graph": SERIES.map((s) => ({
    "@type": "Product",
    "@id": `${SITE_URL}/#cafe-${s.id}`,
    name: `Café ${s.name} · ${SITE_NAME}`,
    description: `${s.line} Café de especialidad variedad Castillo, tostión media, de Mistrató, Risaralda. Perfil: ${s.perfil}. Notas: ${s.notas}.`,
    image: SITE_URL + s.image.src,
    brand: { "@type": "Brand", name: SITE_NAME },
    category: "Café de especialidad",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "COP",
      lowPrice: Math.min(...s.sizes.map((z) => z.price)),
      highPrice: Math.max(...s.sizes.map((z) => z.price)),
      offerCount: s.sizes.length,
      url: `${SITE_URL}/#serie`,
      seller: { "@id": `${SITE_URL}/#organizacion` },
    },
  })),
};

function Home() {
  useDocumentMeta(HOME_META);
  useJsonLd("ld-productos", PRODUCTS_LD);
  // `source` distingue teclado de puntero: con teclado el cambio de lote no se anima.
  const [selection, setSelection] = useState(() => ({ id: initialSerie(), source: "pointer" }));
  const active = selection.id;
  const setActive = useCallback((id, source = "pointer") => {
    setSelection({ id, source });
    track("select_lote", { lote: id, metodo: source === "keyboard" ? "teclado" : "puntero" });
  }, []);
  const [order, setOrder] = useState(null);
  const serie = SERIES.find((s) => s.id === active);
  const onOrderChange = useCallback((o) => setOrder(o), []);

  return (
    <div className="bt" data-ink={serie.ink}>
      <SiteHeader />
      <main>
        <SerieHero active={active} source={selection.source} onSelect={setActive} onOrderChange={onOrderChange} />
        <Reverso active={active} onSelect={setActive} />
        <Finca />
        <SerieEspecial />
        <RecetarioBand count={COFFEE_RECIPES.length} />
      </main>
      <SiteFooter />
      <MobileOrderBar serie={serie} order={order} />
    </div>
  );
}

export default Home;
