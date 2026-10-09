
import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";

const WHATSAPP_NUMBER = "573216363596";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const imageVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.035,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const badgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  height: "28px",
  minHeight: "28px",
  maxHeight: "28px",
  minWidth: 0,
  maxWidth: "100%",
  padding: "0 12px",
  borderRadius: "9999px",
  background: "rgba(235,139,58,0.12)",
  color: "#8b4a0e",
  border: "1px solid rgba(235,139,58,0.30)",
  fontSize: "11px",
  lineHeight: "26px",
  fontWeight: 600,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const arrowStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  width: "38px",
  height: "38px",
  padding: 0,
  borderRadius: "10px",
  background: "#fef3e2",
  color: "#a75911",
  border: "1px solid rgba(235,139,58,0.30)",
  cursor: "pointer",
};

const ProductCard = ({
  title,
  imageSrc,
  variants = [],
  details = {},
  compact = false,
  badge,
}) => {
  const safeVariants =
    Array.isArray(variants) && variants.length > 0
      ? variants
      : [{ label: "Presentación", price: "" }];

  const [index, setIndex] = useState(0);

  const current = safeVariants[index] ?? safeVariants[0];
  const displayImageSrc = current?.imageSrc || imageSrc;

  const activeDetails = {
    ...(details || {}),
    ...(current?.details || {}),
  };

  const prev = () => {
    setIndex((i) =>
      i === 0 ? safeVariants.length - 1 : i - 1
    );
  };

  const next = () => {
    setIndex((i) =>
      i === safeVariants.length - 1 ? 0 : i + 1
    );
  };

  const hasDetails = Boolean(
    activeDetails.perfil ||
      activeDetails.tostion ||
      activeDetails.proceso ||
      activeDetails.notas
  );

  const messageParts = [
    `¡Hola! 👋☕\nQuiero comprar ${title} en ${current.label || "la presentación seleccionada"}.`,
  ];

  if (activeDetails.perfil)
    messageParts.push(`Perfil de taza: ${activeDetails.perfil}`);

  if (activeDetails.tostion)
    messageParts.push(`Tostión: ${activeDetails.tostion}`);

  if (activeDetails.proceso)
    messageParts.push(`Proceso: ${activeDetails.proceso}`);

  if (activeDetails.notas)
    messageParts.push(`Notas: ${activeDetails.notas}`);

  if (current.price)
    messageParts.push(`Precio actual: ${current.price}`);

  if (current.oldPrice)
    messageParts.push(`Antes: ${current.oldPrice}`);

  messageParts.push("¿Me confirman disponibilidad y precio?");

  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    messageParts.join("\n")
  )}`;

  const showAttributeBadges = Boolean(
    activeDetails.proceso || activeDetails.tostion
  );

  return (
    <motion.article
      className="group relative flex w-full min-w-0 flex-col overflow-hidden rounded-2xl bg-white"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      style={{
        border: "1px solid rgba(167,89,17,0.18)",
        boxShadow: "0 4px 18px rgba(45,24,16,0.07)",
      }}
    >
      {/* IMAGEN GRANDE: SIN FONDO NI MÁRGENES */}
      <div
        className="relative isolate w-full shrink-0 overflow-hidden"
        style={{
          height: "clamp(260px, 35vw, 360px)",
          background: "transparent",
          padding: 0,
          margin: 0,
        }}
      >
        {badge && (
          <span
            className="absolute left-3 top-3 z-10 inline-flex items-center justify-center"
            style={{
              boxSizing: "border-box",
              height: "28px",
              minHeight: "28px",
              maxHeight: "28px",
              padding: "0 12px",
              borderRadius: "9999px",
              background: "var(--color-gift, #e0356f)",
              color: "#fff8f0",
              fontSize: "11px",
              lineHeight: "28px",
              fontWeight: 700,
              whiteSpace: "nowrap",
              maxWidth: "calc(100% - 24px)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              boxShadow: "0 3px 10px rgba(45,24,16,0.12)",
            }}
            title={badge}
          >
            {badge}
          </span>
        )}

        {displayImageSrc ? (
          <motion.img
            key={displayImageSrc}
            src={displayImageSrc}
            alt={title}
            loading="lazy"
            decoding="async"
            variants={imageVariants}
            initial="initial"
            whileHover="hover"
            className="block h-full w-full object-contain"
            style={{
              position: "relative",
              zIndex: 1,
              width: "100%",
              height: "100%",
              maxWidth: "100%",
              maxHeight: "100%",
              padding: 0,
              margin: 0,
              objectFit: "contain",
              objectPosition: "center bottom",
              display: "block",
              transformOrigin: "center center",
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-stone-400">
            Imagen no disponible
          </div>
        )}
      </div>

      {/* CONTENIDO */}
      <div
        className="relative flex flex-1 flex-col px-4 pb-4 pt-2 sm:px-5"
        style={{
          background: "#ffffff",
          minWidth: 0,
        }}
      >
        {/* TÍTULO */}
        <h3
          className="mb-2 text-center text-base font-bold sm:text-lg"
          title={title}
          style={{
            color: "#2d1810",
            marginTop: 0,
            minHeight: "48px",
            maxHeight: "48px",
            lineHeight: "24px",
            overflow: "hidden",
            overflowWrap: "anywhere",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {title}
        </h3>

        {/* BADGES DE ALTURA UNIFORME */}
        <div
          className="flex w-full items-center justify-center gap-2"
          style={{
            minHeight: "32px",
            height: "32px",
            marginBottom: "10px",
            overflow: "hidden",
          }}
        >
          {showAttributeBadges ? (
            <>
              {activeDetails.proceso && (
                <span
                  className="min-w-0 flex-1"
                  style={badgeStyle}
                  title={activeDetails.proceso}
                >
                  {activeDetails.proceso}
                </span>
              )}

              {activeDetails.tostion && (
                <span
                  className="min-w-0 flex-1"
                  style={badgeStyle}
                  title={activeDetails.tostion}
                >
                  {activeDetails.tostion}
                </span>
              )}
            </>
          ) : (
            <span
              aria-hidden="true"
              style={{ height: "28px", minHeight: "28px" }}
            />
          )}
        </div>

        {/* DETALLES */}
        {hasDetails && !compact && (
          <div
            className="mb-3 rounded-xl p-3"
            style={{
              background: "#fef7ed",
              border: "1px solid rgba(235,139,58,0.18)",
              color: "#6f3c0b",
            }}
          >
            {activeDetails.perfil && (
              <div className="mb-2">
                <dt
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: "#a75911" }}
                >
                  Perfil de taza
                </dt>
                <dd className="mt-0.5 text-xs leading-relaxed">
                  {activeDetails.perfil}
                </dd>
              </div>
            )}

            {activeDetails.notas && (
              <div>
                <dt
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: "#a75911" }}
                >
                  Notas
                </dt>
                <dd className="mt-0.5 text-xs leading-relaxed">
                  {activeDetails.notas}
                </dd>
              </div>
            )}
          </div>
        )}

        {/* SELECTOR Y PRECIO */}
        <div
          className="mt-auto flex items-center justify-between gap-2 border-t pt-3"
          style={{ borderColor: "rgba(167,89,17,0.16)" }}
        >
          <button
            type="button"
            onClick={prev}
            aria-label="Variante anterior"
            disabled={safeVariants.length <= 1}
            className="shrink-0 disabled:cursor-not-allowed disabled:opacity-40"
            style={arrowStyle}
          >
            <FiChevronLeft size={20} />
          </button>

          <div
            className="flex min-w-0 flex-1 flex-col items-center justify-center text-center"
            aria-live="polite"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`${index}-${current.label}`}
                className="flex w-full min-w-0 flex-col items-center"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
              >
                <span
                  className="mb-1 w-full truncate text-[10px] font-semibold uppercase tracking-wider sm:text-xs"
                  style={{ color: "#8a6a52" }}
                  title={current.label}
                >
                  {current.label}
                </span>

                <div className="flex min-h-7 flex-wrap items-center justify-center gap-x-2">
                  {current.oldPrice && (
                    <span
                      className="text-xs font-medium line-through"
                      style={{ color: "#a89585" }}
                    >
                      {current.oldPrice}
                    </span>
                  )}

                  {current.price && (
                    <span
                      className="text-lg font-extrabold sm:text-xl"
                      style={{ color: "#d4700a", lineHeight: 1.2 }}
                    >
                      {current.price}
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Siguiente variante"
            disabled={safeVariants.length <= 1}
            className="shrink-0 disabled:cursor-not-allowed disabled:opacity-40"
            style={arrowStyle}
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* COMPRAR */}
        <motion.a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Comprar ${title} por WhatsApp`}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold no-underline sm:text-base"
          style={{
            boxSizing: "border-box",
            background:
              "linear-gradient(135deg, #eb8b3a 0%, #d4700a 100%)",
            color: "#ffffff",
            border: "1px solid rgba(167,89,17,0.15)",
            boxShadow: "0 4px 12px rgba(212,112,10,0.20)",
          }}
        >
          <FaShoppingCart size={16} aria-hidden="true" />
          <span>Comprar ahora</span>
        </motion.a>
      </div>
    </motion.article>
  );
};

export default memo(ProductCard);
