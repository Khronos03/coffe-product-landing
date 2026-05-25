import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Honey from "../Honey.webp";
import Lavado from "../Lavado.webp";
import Cuarteron from "../cuarteron.png";
import Satchets2 from "../satchets2.webp";
import SatchetsBox from "../satchesBox.webp";
import ProductCard from "../components/ProductCard";

/* ── Tokens dark ── */
const C = {
  textPrimary:   '#fff8f0',
  textSecondary: '#fbcd86',
  textTertiary:  '#d4a96a',
  accent:        '#eb8b3a',
  accentHover:   '#f5a55a',
  border:        'rgba(235,139,58,0.18)',
  borderHover:   'rgba(235,139,58,0.42)',
  cardBg:        'rgba(255,248,240,0.04)',
  cardBgHover:   'rgba(255,248,240,0.08)',
  badgeBg:       'rgba(235,139,58,0.12)',
};

/* ── Variantes de animación reutilizables ── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.10, delayChildren: 0.05 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Datos de productos ── */
const PRODUCTS = [
  {
    title:    "Proceso Lavado",
    imageSrc: Lavado,
    tag:      "Frutos Rojos",
    variants: [
      { label: "454 gr", price: "$35.000", oldPrice: "$39.000" },
      { label: "350 gr", price: "$28.000", oldPrice: "$32.000" },
      { label: "250 gr", price: "$25.000", oldPrice: "$29.000" },
    ],
    details: {
      perfil:  "Frutos rojos",
      tostion: "Media",
      proceso: "Lavado",
      notas:   "Caña de azúcar, caramelo, moras, arándanos",
    },
  },
  {
    title:    "Proceso Honey",
    imageSrc: Honey,
    tag:      "Miel & Panela",
    variants: [
      { label: "454 gr", price: "$35.000", oldPrice: "$39.000" },
      { label: "350 gr", price: "$28.000", oldPrice: "$32.000" },
      { label: "250 gr", price: "$25.000", oldPrice: "$29.000" },
    ],
    details: {
      perfil:  "Panela, Miel",
      tostion: "Media",
      proceso: "Honey",
      notas:   "Caña de azúcar, apanelado con su dulzura natural.",
    },
  },
  {
    title:    "Cuarterón 5 lb",
    imageSrc: Cuarteron,
    tag:      "Formato Familiar",
    variants: [
      { label: "5 lb · Honey",  price: "$165.000", oldPrice: "$179.900", imageSrc: Cuarteron },
      {
        label: "5 lb · Lavado", price: "$165.000", oldPrice: "$179.900", imageSrc: Cuarteron,
        details: { perfil: "Frutos rojos", tostion: "Media", proceso: "Lavado", notas: "Caña de azúcar, caramelo, moras, arándanos" },
      },
    ],
    details: {
      perfil:  "Panela, Miel",
      tostion: "Media",
      proceso: "Honey",
      notas:   "Caña de azúcar, apanelado con su dulzura natural.",
    },
  },
  {
    title:    "Satchets",
    imageSrc: Satchets2,
    tag:      "Porción Individual",
    variants: [
      { label: "Unidad",   price: "$2.500",  oldPrice: "$3.900",  imageSrc: Satchets2  },
      { label: "Caja x10", price: "$25.000", oldPrice: "$39.900", imageSrc: SatchetsBox },
    ],
    details: {
      notas:   "Pequeñas bolsas individuales, selladas herméticamente, para una sola porción.",
      tostion: "Media",
    },
  },
];

const BADGES = [
  { icon: '🌱', label: 'Procesos Especiales', desc: 'Lavado & Honey' },
  { icon: '⭐', label: 'Grado AA',            desc: 'Premium Quality' },
  { icon: '📍', label: 'Mistrató',            desc: '1.950 m.s.n.m'  },
  { icon: '☕', label: 'Variedades',          desc: 'Tipica & Bourbon' },
];

/* ────────────────────────────────────────
   Badge de calidad con efecto hover
───────────────────────────────────────── */
const QualityBadge = ({ icon, label, desc, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={scaleIn}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        padding: 'clamp(0.75rem, 2vw, 1.1rem)',
        borderRadius: '1rem',
        background: hovered ? C.cardBgHover : C.cardBg,
        border: `1px solid ${hovered ? C.borderHover : C.border}`,
        textAlign: 'center',
        cursor: 'default',
        transition: 'background 0.25s, border-color 0.25s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow interno al hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 0%, rgba(235,139,58,0.12) 0%, transparent 70%)',
        }}
      />
      <motion.p
        animate={{ scale: hovered ? 1.2 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', marginBottom: '0.4rem' }}
      >
        {icon}
      </motion.p>
      <p style={{ fontWeight: 700, fontSize: 'clamp(0.72rem, 1.3vw, 0.8rem)', color: C.textSecondary, marginBottom: '0.2rem' }}>
        {label}
      </p>
      <p style={{ fontSize: 'clamp(0.65rem, 1.1vw, 0.72rem)', color: C.textTertiary }}>
        {desc}
      </p>
    </motion.div>
  );
};

/* ────────────────────────────────────────
   Línea decorativa animada
───────────────────────────────────────── */
const AnimatedRule = () => (
  <motion.div
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    style={{
      height: '1px',
      background: `linear-gradient(90deg, transparent 0%, ${C.accent} 30%, ${C.textSecondary} 50%, ${C.accent} 70%, transparent 100%)`,
      marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
      transformOrigin: 'center',
    }}
  />
);

/* ────────────────────────────────────────
   Wrapper de producto con motion
───────────────────────────────────────── */
const ProductWrapper = ({ children, delay }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        borderRadius: '1.25rem',
        border: `1px solid ${hovered ? C.borderHover : C.border}`,
        background: hovered ? C.cardBgHover : C.cardBg,
        boxShadow: hovered
          ? '0 24px 60px rgba(0,0,0,0.45), 0 0 0 1px rgba(235,139,58,0.12)'
          : '0 8px 32px rgba(0,0,0,0.25)',
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Highlight superior */}
      <div style={{
        position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px',
        background: `linear-gradient(90deg, transparent, rgba(251,205,134,${hovered ? 0.5 : 0.15}), transparent)`,
        transition: 'background 0.3s',
        pointerEvents: 'none',
      }} />
      {children}
    </motion.div>
  );
};

/* ────────────────────────────────────────
   COMPONENTE PRINCIPAL
───────────────────────────────────────── */
const ProductInfo = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      id="section2"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: '100svh',
        paddingTop:    'clamp(5rem, 10vw, 7rem)',
        paddingBottom: 'clamp(4rem, 8vw,  6rem)',
        paddingLeft:   'clamp(1rem, 5vw,  2rem)',
        paddingRight:  'clamp(1rem, 5vw,  2rem)',
      }}
      aria-labelledby="productos-heading"
    >

      {/* ── Fondos parallax ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
        aria-hidden="true"
      >
        <div style={{
          position: 'absolute', top: '-5%', left: '10%',
          width: 'clamp(300px,45vw,640px)', height: 'clamp(300px,45vw,640px)',
          borderRadius: '50%', filter: 'blur(80px)',
          background: 'radial-gradient(circle, rgba(235,139,58,0.16) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', bottom: '5%', right: '5%',
          width: 'clamp(200px,35vw,500px)', height: 'clamp(200px,35vw,500px)',
          borderRadius: '50%', filter: 'blur(80px)',
          background: 'radial-gradient(circle, rgba(251,205,134,0.10) 0%, transparent 70%)',
        }} />
        <div style={{
          position: 'absolute', top: '45%', left: '-5%',
          width: 'clamp(150px,25vw,380px)', height: 'clamp(150px,25vw,380px)',
          borderRadius: '50%', filter: 'blur(80px)',
          background: 'radial-gradient(circle, rgba(235,139,58,0.08) 0%, transparent 70%)',
        }} />
      </motion.div>

      {/* ── Contenedor ── */}
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ── HEADER ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} style={{ marginBottom: '1rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.35rem 1.1rem',
              borderRadius: '9999px',
              background: C.badgeBg,
              border: `1px solid ${C.border}`,
              fontSize: 'clamp(0.72rem, 1.3vw, 0.82rem)',
              fontWeight: 700,
              color: C.textSecondary,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>
              <span>☕</span> Colección de Especialidad
            </span>
          </motion.div>

          {/* Título */}
          <motion.h2
            id="productos-heading"
            variants={fadeUp}
            style={{
              fontSize: 'clamp(2.6rem, 7vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '0 0 0.6rem',
              background: 'linear-gradient(135deg, #fff8f0 0%, #fbcd86 55%, #eb8b3a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Nuestros Cafés
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #eb8b3a 0%, #fbcd86 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              de Especialidad
            </span>
          </motion.h2>

          {/* Bajada */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
              lineHeight: 1.75,
              color: 'rgba(255,248,240,0.72)',
              maxWidth: '38rem',
              margin: '0 auto',
            }}
          >
            Cada café es una experiencia única. Seleccionados con dedicación,
            cultivados con amor en las montañas de Risaralda.
          </motion.p>
        </motion.div>

        {/* ── Línea decorativa ── */}
        <AnimatedRule />

        {/* ── BADGES DE CALIDAD ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
            gap: 'clamp(0.6rem, 1.5vw, 1rem)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            maxWidth: '48rem',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {BADGES.map((b, i) => (
            <QualityBadge key={b.label} {...b} index={i} />
          ))}
        </motion.div>

        {/* ── GRID DE PRODUCTOS ── */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: 'clamp(1rem, 2.5vw, 1.5rem)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
          }}
        >
          {PRODUCTS.map((p) => (
            <ProductWrapper key={p.title}>
              <ProductCard
                title={p.title}
                imageSrc={p.imageSrc}
                variants={p.variants}
                details={p.details}
                compact
              />
            </ProductWrapper>
          ))}
        </motion.div>

        {/* ── CTA FINAL ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            textAlign: 'center',
            padding: 'clamp(1.75rem, 4vw, 3rem) clamp(1.25rem, 4vw, 2.5rem)',
            borderRadius: '1.5rem',
            background: 'linear-gradient(135deg, rgba(235,139,58,0.08) 0%, rgba(251,205,134,0.05) 50%, rgba(235,139,58,0.08) 100%)',
            border: `1px solid ${C.border}`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Highlight superior del CTA */}
          <div style={{
            position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(251,205,134,0.35), transparent)',
            pointerEvents: 'none',
          }} />

          <p style={{
            fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
            color: 'rgba(255,248,240,0.65)',
            marginBottom: '1.25rem',
          }}>
            ¿No encuentras lo que buscas?
          </p>

          <motion.a
            href="https://wa.me/573216363596/?text=¡Hola! Tengo una consulta especial sobre los cafés de Cumbre Café"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 20px 50px rgba(235,139,58,0.40)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3.5vw, 2.25rem)',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, #eb8b3a 0%, #d4700a 100%)',
              color: '#2d1810',
              fontWeight: 700,
              fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
              textDecoration: 'none',
              boxShadow: '0 12px 32px rgba(235,139,58,0.30)',
              border: '1px solid rgba(251,205,134,0.20)',
            }}
            aria-label="Consulta personalizada por WhatsApp"
          >
            <span>💬</span>
            <span>Consulta Personalizada</span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

export default ProductInfo;