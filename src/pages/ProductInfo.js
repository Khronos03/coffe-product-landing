import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Lavado from "../ELavado.jpg";
import Cuarteron from "../cuarteron.png";
import Satchets2 from "../satchets2.webp";
import SatchetsBox from "../satchesBox.webp";
import Premium from "../Premium.png";
import ProductCard from "../components/ProductCard";
import { FaShoppingCart, FaGift, FaCoffee } from "react-icons/fa";

// Servido desde /public para evitar que el loader SVGR de CRA intente
// compilar el SVG como componente React (falla por tags de namespace xlink).
const Honey = `${process.env.PUBLIC_URL}/RedHoneyMolido.svg`;

/* ── Tokens claros ── */
const C = {
  textPrimary: '#2d1810',
  textSecondary: '#6f3c0b',
  textTertiary: '#8a6a52',
  accent: '#eb8b3a',
  accentHover: '#d4700a',
  border: 'rgba(167,89,17,0.18)',
  borderHover: 'rgba(167,89,17,0.40)',
  cardBg: 'rgba(255,255,255,0.70)',
  cardBgHover: 'rgba(255,255,255,0.92)',
  badgeBg: 'rgba(235,139,58,0.14)',
};

/* ── Variantes de animación reutilizables ── */
const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.10, delayChildren: 0.05 } },
};

/* ── Datos de productos ── */
const PRODUCTS = [
  {
    title: "Proceso Honey",
    imageSrc: Honey,
    tag: "Miel & Panela",
    variants: [
      { label: "454 gr", price: "$35.000", oldPrice: "$39.000" },
      { label: "350 gr", price: "$28.000", oldPrice: "$32.000" },
      { label: "250 gr", price: "$25.000", oldPrice: "$29.000" },
    ],
    details: {
      perfil: "Panela, Miel",
      tostion: "Media",
      proceso: "Honey",
      notas: "Caña de azúcar, apanelado con su dulzura natural.",
    },
  },
  {
    title: "Proceso Lavado",
    imageSrc: Lavado,
    tag: "Frutos Rojos",
    variants: [
      { label: "454 gr", price: "$35.000", oldPrice: "$39.000" },
      { label: "350 gr", price: "$28.000", oldPrice: "$32.000" },
      { label: "250 gr", price: "$25.000", oldPrice: "$29.000" },
    ],
    details: {
      perfil: "Frutos rojos",
      tostion: "Media",
      proceso: "Lavado",
      notas: "Caña de azúcar, caramelo, moras, arándanos",
    },
  },
  {
    title: "Cuarterón 5 lb",
    imageSrc: Cuarteron,
    tag: "Formato Familiar",
    variants: [
      { label: "5 lb · Honey", price: "$165.000", oldPrice: "$179.900", imageSrc: Cuarteron },
      {
        label: "5 lb · Lavado", price: "$165.000", oldPrice: "$179.900", imageSrc: Cuarteron,
        details: { perfil: "Frutos rojos", tostion: "Media", proceso: "Lavado", notas: "Caña de azúcar, caramelo, moras, arándanos" },
      },
    ],
    details: {
      perfil: "Panela, Miel",
      tostion: "Media",
      proceso: "Honey",
      notas: "Caña de azúcar, apanelado con su dulzura natural.",
    },
  },
  {
    title: "Satchets",
    imageSrc: Satchets2,
    tag: "Porción Individual",
    variants: [
      { label: "Unidad", price: "$2.500", oldPrice: "$3.900", imageSrc: Satchets2 },
      { label: "Caja x10", price: "$25.000", oldPrice: "$39.900", imageSrc: SatchetsBox },
    ],
    details: {
      notas: "Pequeñas bolsas individuales, selladas herméticamente, para una sola porción.",
      tostion: "Media",
    },
  },
];

/* ── Productos pensados para regalar (tab "Regalos") ── */
const GIFTS = [
  {
    title: "Kit Regalo Cumbre",
    imageSrc: Cuarteron,
    tag: "Kit de Regalo",
    badge: "🆕 Nuevo",
    variants: [
      { label: "2×250 gr · Honey + Lavado", price: "$48.000", oldPrice: "$58.000" },
      { label: "2×454 gr · Honey + Lavado", price: "$65.000", oldPrice: "$78.000" },
    ],
    details: {
      perfil: "Panela, Miel y Frutos Rojos",
      tostion: "Media",
      proceso: "Honey + Lavado",
      notas: "Dos procesos en un solo kit, presentado en caja lista para regalar.",
    },
  },
  {
    title: "Caja Sorpresa Satchets",
    imageSrc: SatchetsBox,
    tag: "Combo Especial",
    badge: "✨ Recién llegado",
    variants: [
      { label: "Caja x10 porciones", price: "$25.000", oldPrice: "$32.000" },
      { label: "Caja x20 + Taza de regalo", price: "$48.000", oldPrice: "$60.000" },
    ],
    details: {
      notas: "Porciones individuales selladas herméticamente, ideales para compartir u obsequiar.",
      tostion: "Media",
    },
  },
  {
    title: "Combo Honey & Lavado",
    imageSrc: Premium,
    tag: "Café Especial",
    badge: "🎁 Ideal para regalar",
    variants: [
      { label: "2×250 gr", price: "$50.000", oldPrice: "$58.000" },
      { label: "2×454 gr", price: "$68.000", oldPrice: "$78.000" },
    ],
    details: {
      perfil: "Panela, Miel, Frutos Rojos",
      tostion: "Media",
      proceso: "Honey + Lavado",
      notas: "Los dos perfiles más queridos de Cumbre Café, juntos en un solo combo.",
    },
  },
];

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
  const [activeTab, setActiveTab] = useState('comprar');

  // Sincroniza la pestaña activa con el enlace "🎁 Regalos" del menú (#section-gifts)
  useEffect(() => {
    const syncTabWithHash = () => {
      if (window.location.hash === '#section-gifts') {
        setActiveTab('regalos');
      }
    };
    syncTabWithHash();
    window.addEventListener('hashchange', syncTabWithHash);
    return () => window.removeEventListener('hashchange', syncTabWithHash);
  }, []);

  return (
    <section
      id="section2"
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        minHeight: '100svh',
        paddingTop: 'clamp(5rem, 10vw, 7rem)',
        paddingBottom: 'clamp(4rem, 8vw,  6rem)',
        paddingLeft: 'clamp(1rem, 5vw,  2rem)',
        paddingRight: 'clamp(1rem, 5vw,  2rem)',
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

          {/* Título */}
          <motion.h2
            id="productos-heading"
            variants={fadeUp}
            style={{
              fontSize: 'clamp(2.6rem, 7vw, 5rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: 'clamp(1rem, 3vw, 2rem) 0 0.6rem',
              background: 'linear-gradient(135deg, #6f3c0b 0%, #d4700a 55%, #eb8b3a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Tú Café de Especialidad
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #eb8b3a 0%, #d4700a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              favorito a un clic
            </span>
          </motion.h2>

          {/* Bajada */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
              lineHeight: 1.75,
              color: 'rgba(45,24,16,0.72)',
              maxWidth: '38rem',
              margin: '0 auto',
            }}
          >
            Cada café es una experiencia única. Desliza para conocer más.
          </motion.p>
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(2rem, 4vw, 3rem)' }}>
          <a
            href="https://wa.me/573216363596/?text=Hola! 👋☕ Estoy interesado(a) en conocer y comprar café de especialidad Cumbre Café. ¿Podrían brindarme información sobre variedades, procesos y precios disponibles?"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 focus-ring hover-lift"
            style={{
              padding: 'clamp(1rem, 2.5vw, 1.3rem) clamp(1.75rem, 4.5vw, 2.75rem)',
              borderRadius: '1rem',
              fontWeight: 700,
              fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
              background: 'linear-gradient(135deg, #eb8b3a 0%, #d4700a 100%)',
              color: '#2d1810',
              boxShadow: '0 12px 32px rgba(235,139,58,0.35), 0 4px 12px rgba(0,0,0,0.30)',
              transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
              display: 'inline-flex',
              border: '1px solid rgba(251,205,134,0.20)',
              textDecoration: 'none',
              flexWrap: 'nowrap',
              whiteSpace: 'nowrap',
              gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #f5a55a 0%, #eb8b3a 100%)';
              e.currentTarget.style.boxShadow = '0 16px 48px rgba(235,139,58,0.45), 0 4px 16px rgba(0,0,0,0.30)';
              e.currentTarget.style.color = '#1a0e08';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #eb8b3a 0%, #d4700a 100%)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(235,139,58,0.35), 0 4px 12px rgba(0,0,0,0.30)';
              e.currentTarget.style.color = '#2d1810';
            }}
            aria-label="Comprar café de especialidad por WhatsApp"
          >
            <FaShoppingCart size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
            <span style={{ whiteSpace: 'nowrap' }}>Comprar Ahora</span>
          </a>
        </div>

        {/* ── Tabs: Comprar / Regalos ── */}
        <div
          id="section-gifts"
          role="tablist"
          aria-label="Explorar Comprar o Regalos"
          style={{
            scrollMarginTop: '100px',
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            marginBottom: 'clamp(2rem, 4vw, 3rem)',
            flexWrap: 'wrap',
          }}
        >
          {[
            { id: 'comprar', label: 'Comprar', icon: <FaCoffee aria-hidden="true" /> },
            { id: 'regalos', label: 'Regalos', icon: <FaGift aria-hidden="true" /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className="focus-ring"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.5rem',
                  borderRadius: '9999px',
                  fontWeight: 700,
                  fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  background: isActive
                    ? 'linear-gradient(135deg, #eb8b3a 0%, #d4700a 100%)'
                    : 'rgba(255,255,255,0.70)',
                  color: isActive ? '#2d1810' : C.textSecondary,
                  border: isActive ? '1px solid rgba(212,112,10,0.30)' : `1px solid ${C.border}`,
                  boxShadow: isActive ? '0 10px 28px rgba(235,139,58,0.35)' : 'none',
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ── Línea decorativa ── */}
        <AnimatedRule />

        {/* ── GRID DE PRODUCTOS / REGALOS ── */}
        <AnimatePresence mode="wait">
          {activeTab === 'comprar' ? (
            <motion.div
              key="comprar"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
          ) : (
            <motion.div
              key="regalos"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                gap: 'clamp(1rem, 2.5vw, 1.5rem)',
                marginBottom: 'clamp(3rem, 6vw, 5rem)',
              }}
            >
              {GIFTS.map((g) => (
                <ProductWrapper key={g.title}>
                  <div style={{ padding: '0.75rem 0.75rem 0' }}>
                    <span
                      className="inline-block font-semibold"
                      style={{
                        fontSize: '0.7rem',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: C.textSecondary,
                      }}
                    >
                      {g.tag}
                    </span>
                  </div>
                  <ProductCard
                    title={g.title}
                    imageSrc={g.imageSrc}
                    variants={g.variants}
                    details={g.details}
                    badge={g.badge}
                    compact
                  />
                </ProductWrapper>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

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
            color: 'rgba(45,24,16,0.65)',
            marginBottom: '1.25rem',
          }}>
            {activeTab === 'regalos' ? '¿Necesitas ayuda para elegir el regalo ideal?' : '¿No encuentras lo que buscas?'}
          </p>

          <motion.a
            href={
              activeTab === 'regalos'
                ? "https://wa.me/573216363596/?text=¡Hola! 🎁 Quiero un consejo para elegir un regalo de café de especialidad de Cumbre Café"
                : "https://wa.me/573216363596/?text=¡Hola! Tengo una consulta especial sobre los cafés de Cumbre Café"
            }
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