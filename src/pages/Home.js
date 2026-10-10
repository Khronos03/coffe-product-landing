import { useCallback, useState } from "react";
import "@fontsource-variable/archivo/wdth";
import "@fontsource-variable/big-shoulders-display";
import "../styles/billete.css";
import { SERIES } from "../data/catalog";
import { COFFEE_RECIPES } from "../data/coffeeRecipes";
import SerieHero from "../components/billete/SerieHero";
import Reverso from "../components/billete/Reverso";
import Finca from "../components/billete/Finca";
import SerieEspecial from "../components/billete/SerieEspecial";
import { MobileOrderBar, RecetarioBand, SiteFooter, SiteHeader } from "../components/billete/Chrome";

// Abre con el lote 01 (Honey): el mejor explicado y el de precio de entrada.
const DEFAULT_SERIE = "honey";

function Home() {
  // `source` distingue teclado de puntero: con teclado el cambio de lote no se anima.
  const [selection, setSelection] = useState({ id: DEFAULT_SERIE, source: "pointer" });
  const active = selection.id;
  const setActive = useCallback((id, source = "pointer") => setSelection({ id, source }), []);
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
