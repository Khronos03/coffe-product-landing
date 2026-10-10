import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiList, FiX } from "react-icons/fi";
import "@fontsource-variable/archivo/wdth";
import "@fontsource-variable/big-shoulders-display";
import "../styles/billete.css";
import "../styles/talonario.css";
import { COFFEE_RECIPES } from "../data/coffeeRecipes";
import { SiteFooter, SiteHeader } from "../components/billete/Chrome";
import { Microtext, Perforation, Rosette, WaveField } from "../components/billete/Security";

// La temperatura de servicio decide la tinta de cada hoja del talonario.
const TEMP = {
  caliente: { ink: "honey", label: "Caliente" },
  frio: { ink: "natural", label: "Fría" },
  ambos: { ink: "lavado", label: "Fría o caliente" },
};

const FILTERS = [
  { key: "todas", label: "Todas" },
  { key: "caliente", label: "Calientes" },
  { key: "frio", label: "Frías" },
];

const TOTAL = COFFEE_RECIPES.length;
const SERIAL = Object.fromEntries(COFFEE_RECIPES.map((r, i) => [r.id, String(i + 1).padStart(2, "0")]));

const imageFor = (id) => ({
  src: `/recetario/web/${id}-480.webp`,
  srcSet: `/recetario/web/${id}-480.webp 480w, /recetario/web/${id}-960.webp 960w`,
});

const matches = (recipe, filter) =>
  filter === "todas" || recipe.temperature === filter || recipe.temperature === "ambos";

function readHash() {
  const id = decodeURIComponent(window.location.hash.replace("#", ""));
  return COFFEE_RECIPES.some((r) => r.id === id) ? id : null;
}

function RecipeIndex({ list, currentId, onPick, id }) {
  const navRef = useRef(null);

  // El índice siempre muestra la hoja abierta ("estás aquí").
  useEffect(() => {
    const nav = navRef.current;
    const item = nav && nav.querySelector('[aria-current="true"]');
    const panel = nav && nav.parentElement;
    if (!item || !panel || panel.scrollHeight <= panel.clientHeight) return;
    const top = item.offsetTop - panel.offsetTop;
    if (top < panel.scrollTop || top > panel.scrollTop + panel.clientHeight - item.offsetHeight) {
      panel.scrollTop = top - panel.clientHeight / 2 + item.offsetHeight / 2;
    }
  }, [currentId, list]);

  const groups = ["caliente", "frio", "ambos"]
    .map((t) => ({ t, items: list.filter((r) => r.temperature === t) }))
    .filter((g) => g.items.length);

  return (
    <nav className="tal-index" aria-label="Índice del recetario" id={id} ref={navRef}>
      {groups.map((g) => (
        <div key={g.t} className="tal-index-group" data-ink={TEMP[g.t].ink}>
          <h2 className="tal-index-title">
            {g.t === "caliente" ? "Calientes" : g.t === "frio" ? "Frías" : "Frías o calientes"}
          </h2>
          <ul>
            {g.items.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  className="tal-index-item"
                  aria-current={r.id === currentId ? "true" : undefined}
                  onClick={() => onPick(r.id)}
                >
                  <span className="tal-index-serial">{SERIAL[r.id]}</span>
                  <span>{r.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function Sheet({ recipe, direction }) {
  const reduce = useReducedMotion();
  const temp = TEMP[recipe.temperature];
  const img = imageFor(recipe.id);
  const variants = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, x: 36 * direction, rotate: 0.6 * direction },
        animate: { opacity: 1, x: 0, rotate: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
        exit: { opacity: 0, x: -24 * direction, transition: { duration: 0.18, ease: [0.7, 0, 0.84, 0] } },
      };

  return (
    <motion.article
      className="tal-sheet"
      data-ink={temp.ink}
      key={recipe.id}
      aria-labelledby="tal-sheet-title"
      {...variants}
    >
      <div className="tal-sheet-body">
        <Microtext className="tal-micro" text="RECETARIO CUMBRE CAFÉ MISTRATÓ RISARALDA" />
        <div className="tal-issuer">
          <span>
            Recetario<span className="tal-issuer-long"> Cumbre Café</span>
          </span>
          <span>
            Hoja {SERIAL[recipe.id]} de {TOTAL}
          </span>
        </div>

        <div className="tal-head">
          <div className="tal-serial-wrap" aria-hidden="true">
            <Rosette className="tal-rosette" />
            <p className="tal-serial">{SERIAL[recipe.id]}</p>
          </div>
          <div className="tal-head-copy">
            <h2 className="tal-name" id="tal-sheet-title">
              {recipe.name}
            </h2>
            <p className="stamp tal-temp">{temp.label}</p>
          </div>
        </div>

        <figure className="tal-photo">
          <img
            src={img.src}
            srcSet={img.srcSet}
            sizes="(max-width: 767px) 92vw, (max-width: 1279px) 60vw, 720px"
            alt={`${recipe.name} servido en taza`}
            width="960"
            height="524"
            decoding="async"
          />
        </figure>

        <div className="tal-cols">
          <section aria-labelledby="tal-ing">
            <h3 id="tal-ing" className="tal-col-title">
              Ingredientes
            </h3>
            <ul className="tal-ingredients">
              {recipe.ingredients.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="tal-prep">
            <h3 id="tal-prep" className="tal-col-title">
              Preparación
            </h3>
            <ol className="tal-steps">
              {recipe.preparation.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </section>
        </div>
        <Microtext className="tal-micro" text="CAFÉ DE ESPECIALIDAD DE LA FINCA EN GRANO O MOLIDO A PEDIDO" />
      </div>

      <Perforation className="tal-perf" />

      <div className="tal-stub">
        <p className="tal-stub-copy">
          <strong>¿Te falta café?</strong> Café de nuestra finca, en grano o molido para tu método.
        </p>
        <a className="tear-button is-compact" href="/#serie">
          Ver la serie y pedir
        </a>
      </div>
    </motion.article>
  );
}

const CoffeeRecipes = () => {
  const [filter, setFilter] = useState("todas");
  const [currentId, setCurrentId] = useState(() => readHash() || COFFEE_RECIPES[0].id);
  const [direction, setDirection] = useState(1);
  const [indexOpen, setIndexOpen] = useState(false);
  const sheetRef = useRef(null);

  const list = useMemo(() => COFFEE_RECIPES.filter((r) => matches(r, filter)), [filter]);
  const pos = Math.max(
    0,
    list.findIndex((r) => r.id === currentId)
  );
  const recipe = list[pos] || list[0];

  // Si el filtro deja fuera la receta actual, se abre la primera del filtro.
  useEffect(() => {
    if (!list.some((r) => r.id === currentId)) setCurrentId(list[0].id);
  }, [list, currentId]);

  useEffect(() => {
    document.title = `${recipe.name} · Recetario · Cumbre Café`;
    if (window.location.hash !== `#${recipe.id}`) {
      window.history.replaceState(null, "", `#${recipe.id}`);
    }
  }, [recipe]);

  useEffect(() => {
    const onHash = () => {
      const id = readHash();
      if (id) setCurrentId(id);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const go = useCallback(
    (step) => {
      const next = list[(pos + step + list.length) % list.length];
      setDirection(step);
      setCurrentId(next.id);
    },
    [list, pos]
  );

  const pick = (id) => {
    const target = list.findIndex((r) => r.id === id);
    setDirection(target >= pos ? 1 : -1);
    setCurrentId(id);
    setIndexOpen(false);
    if (sheetRef.current && window.matchMedia("(max-width: 1023px)").matches) {
      sheetRef.current.scrollIntoView({ block: "start" });
    }
  };

  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target.tagName || "").toLowerCase();
      if (["input", "select", "textarea"].includes(tag) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "Escape") setIndexOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const prev = list[(pos - 1 + list.length) % list.length];
  const next = list[(pos + 1) % list.length];

  return (
    <div className="bt tal" data-ink={TEMP[recipe.temperature].ink} id="top">
      <SiteHeader onHome={false} current="recetas" skipTo="#tal-hoja" skipLabel="Saltar a la receta" />

      <main className="tal-main">
        <WaveField className="field-waves" />
        <div className="tal-intro">
          <h1 className="tal-title">Recetario</h1>
          <p className="tal-lede">
            {TOTAL} recetas para preparar en casa. Pasa las hojas del talonario o busca una en el índice.
          </p>
        </div>

        <div className="tal-layout">
          <aside className="tal-aside">
            <div className="tal-filters" role="group" aria-label="Filtrar por temperatura">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className="tal-filter"
                  aria-pressed={filter === f.key}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                  <span className="tal-filter-count">
                    {COFFEE_RECIPES.filter((r) => matches(r, f.key)).length}
                  </span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="tal-index-toggle"
              aria-expanded={indexOpen}
              aria-controls="tal-index-panel"
              onClick={() => setIndexOpen((v) => !v)}
            >
              {indexOpen ? <FiX aria-hidden="true" /> : <FiList aria-hidden="true" />}
              {indexOpen ? "Cerrar índice" : `Índice (${list.length})`}
            </button>

            <div className={`tal-index-panel ${indexOpen ? "is-open" : ""}`}>
              <RecipeIndex list={list} currentId={recipe.id} onPick={pick} id="tal-index-panel" />
            </div>
          </aside>

          <div className="tal-stage" id="tal-hoja" ref={sheetRef} tabIndex={-1}>
            <p className="sr-only" aria-live="polite">
              Hoja {pos + 1} de {list.length}: {recipe.name}
            </p>
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <Sheet recipe={recipe} direction={direction} key={recipe.id} />
            </AnimatePresence>

            <nav className="tal-pager" aria-label="Pasar hojas">
              <button type="button" className="tal-page-btn" onClick={() => go(-1)}>
                <FiArrowLeft aria-hidden="true" />
                <span>
                  <span className="tal-page-label">Hoja anterior</span>
                  <span className="tal-page-name">{prev.name}</span>
                </span>
              </button>
              <p className="tal-page-pos" aria-hidden="true">
                {pos + 1} / {list.length}
              </p>
              <button type="button" className="tal-page-btn is-next" onClick={() => go(1)}>
                <span>
                  <span className="tal-page-label">Siguiente hoja</span>
                  <span className="tal-page-name">{next.name}</span>
                </span>
                <FiArrowRight aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </main>

      <SiteFooter onHome={false} />
    </div>
  );
};

export default CoffeeRecipes;
