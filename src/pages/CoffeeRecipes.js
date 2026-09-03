import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import RecipeCard from "../components/RecipeCard";
import { COFFEE_RECIPES } from "../data/coffeeRecipes";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const TEMPERATURE_FILTERS = [
  { key: "todas", label: "Todas", icon: "☕" },
  { key: "caliente", label: "Calientes", icon: "🔥" },
  { key: "frio", label: "Frías", icon: "🧊" },
];

const CoffeeRecipes = () => {
  const [activeFilter, setActiveFilter] = useState("todas");

  const filteredRecipes = useMemo(() => {
    if (activeFilter === "todas") return COFFEE_RECIPES;
    return COFFEE_RECIPES.filter(
      (recipe) => recipe.temperature === activeFilter || recipe.temperature === "ambos"
    );
  }, [activeFilter]);

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{ background: "linear-gradient(180deg, #fff8f0 0%, #fef3e2 45%, #fdf0d9 100%)" }}
    >
      <Menu />

      <main id="main-content" role="main" className="flex-1">
        <section
          className="relative w-full overflow-hidden"
          style={{
            paddingTop: "clamp(7rem, 13vw, 9rem)",
            paddingBottom: "clamp(3rem, 8vw, 5rem)",
            paddingLeft: "clamp(1rem, 5vw, 2rem)",
            paddingRight: "clamp(1rem, 5vw, 2rem)",
          }}
          aria-labelledby="recipes-heading"
        >
          <div className="relative z-10 max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 3rem)" }}
            >
              <motion.span
                variants={fadeUp}
                className="inline-flex items-center gap-2 font-semibold"
                style={{
                  padding: "0.4rem 1.1rem",
                  borderRadius: "9999px",
                  fontSize: "clamp(0.75rem, 1.4vw, 0.875rem)",
                  background: "rgba(235,139,58,0.14)",
                  color: "#a75911",
                  border: "1px solid rgba(167,89,17,0.20)",
                  letterSpacing: "0.02em",
                  marginBottom: "1rem",
                }}
              >
                ☕ Recetario
              </motion.span>

              <motion.h1
                id="recipes-heading"
                variants={fadeUp}
                style={{
                  fontSize: "clamp(2.2rem, 6vw, 4rem)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  margin: "0 0 0.75rem",
                  background: "linear-gradient(135deg, #6f3c0b 0%, #d4700a 60%, #eb8b3a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Recetas de Café
              </motion.h1>

              <motion.p
                variants={fadeUp}
                style={{
                  fontSize: "clamp(0.95rem, 2vw, 1.125rem)",
                  lineHeight: 1.75,
                  color: "rgba(45,24,16,0.72)",
                  maxWidth: "34rem",
                  margin: "0 auto",
                }}
              >
                Más de 50 preparaciones para disfrutar tu café de especialidad Cumbre
                Café en casa. Toca cada tarjeta para ver ingredientes y pasos.
              </motion.p>

              <motion.div
                variants={fadeUp}
                role="group"
                aria-label="Filtrar recetas por temperatura"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "0.6rem",
                  marginTop: "1.5rem",
                }}
              >
                {TEMPERATURE_FILTERS.map((filter) => {
                  const isActive = activeFilter === filter.key;
                  return (
                    <button
                      key={filter.key}
                      type="button"
                      onClick={() => setActiveFilter(filter.key)}
                      aria-pressed={isActive}
                      className="focus-ring"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        padding: "0.55rem 1.15rem",
                        borderRadius: "9999px",
                        fontWeight: 700,
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        border: isActive ? "1px solid rgba(212,112,10,0.35)" : "1px solid rgba(167,89,17,0.20)",
                        background: isActive
                          ? "linear-gradient(135deg, #eb8b3a 0%, #d4700a 100%)"
                          : "rgba(235,139,58,0.10)",
                        color: isActive ? "#2d1810" : "#a75911",
                        boxShadow: isActive ? "0 8px 20px rgba(235,139,58,0.30)" : "none",
                        transition: "background 0.25s, box-shadow 0.25s, border-color 0.25s",
                      }}
                    >
                      <span aria-hidden="true">{filter.icon}</span>
                      <span>{filter.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            </motion.div>

            <motion.div
              key={activeFilter}
              initial="hidden"
              animate="show"
              variants={staggerContainer}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
                gap: "clamp(1rem, 2.5vw, 1.5rem)",
              }}
            >
              {filteredRecipes.map((recipe, i) => (
                <RecipeCard key={recipe.id} recipe={recipe} index={i} />
              ))}
            </motion.div>

            {filteredRecipes.length === 0 && (
              <p
                style={{
                  textAlign: "center",
                  color: "rgba(45,24,16,0.6)",
                  marginTop: "2rem",
                }}
              >
                No hay recetas disponibles para este filtro.
              </p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CoffeeRecipes;
