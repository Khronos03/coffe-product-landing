import { motion } from "framer-motion";

/* ── Paleta de colores tema claro (igual a ProductInfo & About) ── */
const C = {
  textPrimary:   '#2d1810',           /* headings, texto principal */
  textSecondary: '#6f3c0b',           /* subtítulos, labels */
  textTertiary:  '#8a6a52',           /* hints, meta, pequeño */
  accent:        '#eb8b3a',           /* CTAs, links, highlights */
  accentHover:   '#d4700a',
  border:        'rgba(167,89,17,0.18)',
  borderHover:   'rgba(167,89,17,0.40)',
  cardBg:        'rgba(255,255,255,0.65)',
  cardBgHover:   'rgba(255,255,255,0.90)',
  badgeBg:       'rgba(235,139,58,0.14)',
};

/* ── Colores distintivos para procesos (variantes oscuras para texto legible sobre claro) ── */
const HONEY_COLOR = {
  primary:    '#c0435a',      /* Vino tinto/rosado — usado en glows */
  light:      '#a53a4d',      /* Variante oscura para texto (contraste AA) */
  accent:     '#8f2f40',      /* Acento vino oscuro para subtítulos */
  fill:       '#d4576b',      /* Para glows y decorativos */
  textInverted: '#fff8f0',    /* Texto sobre fondos sólidos de este color */
};

const WASH_COLOR = {
  primary:    '#2f7d61',      /* Verde agua/menta — usado en glows */
  light:      '#27684f',      /* Variante oscura para texto (contraste AA) */
  accent:     '#1f5340',      /* Acento verde oscuro para subtítulos */
  fill:       '#4a9f7f',      /* Para glows y decorativos */
  textInverted: '#fff8f0',    /* Texto sobre fondos sólidos de este color */
};

const ProcessComparison = () => {
  /* ── Variantes de animación ── */
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.08, duration: 0.6, ease: "easeOut" },
    }),
  };

  /* ── Datos de procesos ── */
  const processes = [
    {
      id: "honey",
      name: "Proceso Honey",
      subtitle: "Fermentación Natural",
      color: HONEY_COLOR,
      emoji: "🍯",
      description:
        "El proceso honey mantiene la pulpa del fruto durante la fermentación, permitiendo que los azúcares naturales se integren profundamente en el grano.",
      steps: [
        {
          num: "01",
          title: "Recolección",
          desc: "Frutos completamente maduros seleccionados en su punto óptimo",
        },
        {
          num: "02",
          title: "Despulpado Parcial",
          desc: "Se retira solo la cáscara externa, dejando la pulpa mucilaginosa",
        },
        {
          num: "03",
          title: "Fermentación",
          desc: "La pulpa fermenta lentamente, infundiendo dulzura natural",
        },
        {
          num: "04",
          title: "Secado",
          desc: "Proceso cuidadoso al sol para preservar los azúcares",
        },
      ],
      characteristics: [
        "Dulzura natural intensa",
        "Notas de panela y miel",
        "Cuerpo más completo",
        "Acidez equilibrada",
        "Sabor frutal suave",
      ],
      imageAlt: "Proceso Honey",
    },
    {
      id: "wash",
      name: "Proceso Lavado",
      subtitle: "Limpieza y Claridad",
      color: WASH_COLOR,
      emoji: "💧",
      description:
        "El proceso lavado elimina toda la pulpa del fruto, permitiendo que el grano se desarrolle con perfiles más limpios y definidos.",
      steps: [
        {
          num: "01",
          title: "Recolección",
          desc: "Frutos maduros seleccionados cuidadosamente",
        },
        {
          num: "02",
          title: "Despulpado",
          desc: "Se retira completamente la cáscara y la pulpa",
        },
        {
          num: "03",
          title: "Lavado",
          desc: "Agua limpia lava los granos para eliminar residuos",
        },
        {
          num: "04",
          title: "Secado",
          desc: "Secado uniforme para obtener consistencia perfecta",
        },
      ],
      characteristics: [
        "Perfiles limpios y claros",
        "Notas de frutos rojos",
        "Acidez más pronunciada",
        "Sabor más delicado",
        "Complejidad aromática",
      ],
      imageAlt: "Proceso Lavado",
    },
  ];

  return (
    <section
      id="section-processes"
      className="relative w-full overflow-hidden"
      aria-labelledby="process-heading"
      style={{
        minHeight: "100svh",
        paddingTop: "clamp(6rem, 12vw, 8rem)",
        paddingBottom: "clamp(3rem, 8vw, 5rem)",
        paddingLeft: "clamp(1rem, 5vw, 2rem)",
        paddingRight: "clamp(1rem, 5vw, 2rem)",
      }}
    >
      {/* ── Glows de fondo decorativos ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Glow Honey (rosado/vino) */}
        <motion.div
          style={{
            position: "absolute",
            width: "clamp(300px, 40vw, 600px)",
            height: "clamp(300px, 40vw, 600px)",
            top: "10%",
            left: "-5%",
            background: `radial-gradient(circle, rgba(212,87,107,0.15) 0%, transparent 70%)`,
            borderRadius: "50%",
            filter: "blur(100px)",
            zIndex: 0,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 30, 0],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Glow Wash (verde/agua) */}
        <motion.div
          style={{
            position: "absolute",
            width: "clamp(300px, 40vw, 600px)",
            height: "clamp(300px, 40vw, 600px)",
            bottom: "5%",
            right: "-5%",
            background: `radial-gradient(circle, rgba(74,159,127,0.15) 0%, transparent 70%)`,
            borderRadius: "50%",
            filter: "blur(100px)",
            zIndex: 0,
          }}
          animate={{
            y: [0, 50, 0],
            x: [0, -30, 0],
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* ── Contenido Principal ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          style={{
            textAlign: "center",
            marginBottom: "clamp(3rem, 8vw, 5rem)",
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            custom={0}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "clamp(0.4rem, 1vw, 0.6rem) clamp(1rem, 2vw, 1.4rem)",
              borderRadius: "9999px",
              fontSize: "clamp(0.75rem, 1.4vw, 0.875rem)",
              background: C.badgeBg,
              color: C.textSecondary,
              border: `1.5px solid ${C.border}`,
              letterSpacing: "0.03em",
              fontWeight: 600,
              marginBottom: "clamp(1.5rem, 3vw, 2rem)",
            }}
          >
            <span>⚗️</span>
            <span>Nuestros Procesos</span>
          </motion.div>

          {/* Título */}
          <motion.h2
            id="process-heading"
            variants={itemVariants}
            custom={1}
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              margin: 0,
              marginBottom: "clamp(1rem, 2vw, 1.5rem)",
              background: `linear-gradient(135deg, ${C.textPrimary} 0%, ${C.textSecondary} 60%, ${C.accent} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Honey vs Lavado
          </motion.h2>

          {/* Subtítulo */}
          <motion.p
            variants={itemVariants}
            custom={2}
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
              fontWeight: 600,
              color: C.textSecondary,
              margin: 0,
              lineHeight: 1.6,
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Dos métodos tradicionales que generan perfiles de sabor únicos y distintivos
          </motion.p>
        </motion.div>

        {/* Comparativa de Procesos */}
        <motion.div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
            gap: "clamp(2rem, 5vw, 3.5rem)",
            alignItems: "stretch",
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {processes.map((process) => (
            <motion.div
              key={process.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              style={{
                position: "relative",
                borderRadius: "clamp(1.25rem, 3vw, 1.75rem)",
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 400ms cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {/* Fondo con gradiente */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.30) 100%)`,
                  border: `2px solid ${process.color.primary}30`,
                  zIndex: 0,
                  transition: "all 400ms ease",
                }}
              />

              {/* Contenido */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  padding: "clamp(2rem, 5vw, 3rem)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(1.5rem, 3vw, 2.5rem)",
                  height: "100%",
                }}
              >
                {/* Header */}
                <div>
                  {/* Título */}
                  <h3
                    style={{
                      fontSize: "clamp(1.5rem, 3vw, 1.875rem)",
                      fontWeight: 800,
                      color: process.color.light,
                      margin: "0 0 0.5rem 0",
                      lineHeight: 1.2,
                    }}
                  >
                    {process.emoji} {process.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: process.color.accent,
                      margin: 0,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    {process.subtitle}
                  </p>
                </div>

                {/* Descripción */}
                <motion.p
                  variants={itemVariants}
                  custom={0}
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.7,
                    color: C.textSecondary,
                    margin: 0,
                    fontWeight: 500,
                  }}
                >
                  {process.description}
                </motion.p>

                {/* Pasos del proceso */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <h4
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      color: process.color.light,
                      margin: 0,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Etapas del Proceso
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {process.steps.map((step, idx) => (
                      <motion.div
                        key={idx}
                        variants={itemVariants}
                        custom={idx + 1}
                        style={{
                          display: "flex",
                          gap: "1rem",
                          padding: "0.75rem",
                          borderRadius: "0.75rem",
                          background: `${process.color.primary}10`,
                          border: `1px solid ${process.color.primary}20`,
                          transition: "all 300ms ease",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: "0.875rem",
                            color: process.color.light,
                            minWidth: "35px",
                          }}
                        >
                          {step.num}
                        </span>
                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              fontSize: "0.85rem",
                              fontWeight: 600,
                              color: process.color.light,
                              margin: "0 0 0.25rem 0",
                            }}
                          >
                            {step.title}
                          </p>
                          <p
                            style={{
                              fontSize: "0.8rem",
                              color: C.textTertiary,
                              margin: 0,
                              lineHeight: 1.5,
                            }}
                          >
                            {step.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Características */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "auto" }}>
                  <h4
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 700,
                      color: process.color.light,
                      margin: 0,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Características
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {process.characteristics.map((char, idx) => (
                      <motion.div
                        key={idx}
                        variants={itemVariants}
                        custom={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          fontSize: "0.9rem",
                          color: C.textSecondary,
                        }}
                      >
                        <span
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: process.color.light,
                            flexShrink: 0,
                          }}
                        />
                        {char}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessComparison;
