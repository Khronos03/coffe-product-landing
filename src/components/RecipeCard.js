import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";

/** @typedef {import('../models/coffeeRecipe').CoffeeRecipe} CoffeeRecipe */

/**
 * Tarjeta expandible para una receta de café.
 * @param {{ recipe: CoffeeRecipe, index?: number }} props
 */
const RecipeCard = ({ recipe, index = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = `recipe-content-${recipe.id}`;

  return (
    <motion.article
      className="group"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      style={{
        background: "#ffffff",
        border: "1.5px solid rgba(167,89,17,0.16)",
        borderRadius: "1.25rem",
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(45,24,16,0.08)",
        transition: "box-shadow 0.3s, border-color 0.3s",
      }}
    >
      {/* Imagen / placeholder — reemplazar `recipe.image` por una imagen real cuando esté disponible */}
      <div
        aria-hidden={!!recipe.image}
        role={recipe.image ? undefined : "img"}
        aria-label={recipe.image ? undefined : recipe.name}
        style={{
          aspectRatio: "4 / 3",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #fef3e2 0%, #fdf0d9 100%)",
        }}
      >
        {recipe.image ? (
          <img
            src={recipe.image}
            alt={recipe.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        ) : (
          <span style={{ fontSize: "3.75rem" }}>{recipe.icon}</span>
        )}
      </div>

      <div style={{ padding: "1.25rem clamp(1rem, 3vw, 1.5rem) 1.5rem" }}>
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#2d1810",
            margin: "0 0 0.75rem",
          }}
        >
          {recipe.icon} {recipe.name}
        </h3>

        <button
          type="button"
          onClick={() => setIsExpanded((v) => !v)}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          className="focus-ring"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.4rem",
            width: "100%",
            justifyContent: "space-between",
            padding: "0.6rem 0.9rem",
            borderRadius: "0.75rem",
            background: "rgba(235,139,58,0.10)",
            border: "1px solid rgba(167,89,17,0.20)",
            color: "#a75911",
            fontWeight: 700,
            fontSize: "0.875rem",
            cursor: "pointer",
          }}
        >
          <span>{isExpanded ? "Ocultar receta" : "Ver receta completa"}</span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: "inline-flex" }}
            aria-hidden="true"
          >
            <FiChevronDown size={18} />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              id={contentId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ paddingTop: "1rem" }}>
                <h4
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "#6f3c0b",
                    margin: "0 0 0.5rem",
                  }}
                >
                  🧾 Ingredientes
                </h4>
                <ul style={{ margin: "0 0 1.25rem", paddingLeft: "1.1rem", color: "rgba(45,24,16,0.78)" }}>
                  {recipe.ingredients.map((ingredient) => (
                    <li key={ingredient} style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
                      {ingredient}
                    </li>
                  ))}
                </ul>

                <h4
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "#6f3c0b",
                    margin: "0 0 0.5rem",
                  }}
                >
                  👨‍🍳 Preparación
                </h4>
                <ol style={{ margin: "0 0 1.25rem", paddingLeft: "1.1rem", color: "rgba(45,24,16,0.78)" }}>
                  {recipe.preparation.map((step, i) => (
                    <li key={i} style={{ fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "0.35rem" }}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.a
          href={recipe.ctaHref}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="focus-ring"
          style={{
            marginTop: "0.75rem",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.6rem",
            width: "100%",
            padding: "0.75rem 1.25rem",
            borderRadius: "0.875rem",
            fontWeight: 700,
            fontSize: "0.9rem",
            background: "linear-gradient(135deg, #eb8b3a 0%, #d4700a 100%)",
            color: "#2d1810",
            boxShadow: "0 10px 28px rgba(235,139,58,0.30)",
            border: "1px solid rgba(212,112,10,0.25)",
            textDecoration: "none",
          }}
          aria-label={`${recipe.ctaText} — ${recipe.name}`}
        >
          <FaShoppingCart size={16} aria-hidden="true" />
          <span>{recipe.ctaText}</span>
        </motion.a>
      </div>
    </motion.article>
  );
};

export default RecipeCard;
