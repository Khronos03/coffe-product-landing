import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import loopVideo from "../loop-envios.mp4";
import { useState, useEffect, useRef } from 'react';


/*
  TOKENS DARK BACKGROUND (#131212)
  ─────────────────────────────────────────────────────────────
  Sobre #131212, los roles de color se invierten completamente:

  TEXTO PRINCIPAL    → #fff8f0  (17.75:1) ✅
  TEXTO SECUNDARIO   → #fbcd86  (12.63:1) ✅  warm — antes era solo decorativo
  TEXTO TERCIARIO    → #d4a96a  ( 7.20:1) ✅  warm oscurecido
  ACENTO / LINKS     → #eb8b3a  ( 7.38:1) ✅  naranja fill — ahora SÍ pasa como texto
  ACENTO HOVER       → #f5a55a  ( 9.10:1) ✅

  Fondos de cards    → rgba(255,248,240, 0.05–0.08)  — blanco muy translúcido
  Bordes             → rgba(235,139,58, 0.15–0.25)   — naranja sutil
  Bordes hover       → rgba(235,139,58, 0.40)

  NUNCA sobre #131212:
  ✗ #430000  (1.10:1)
  ✗ #2d1810  (1.11:1)
  ✗ #5a3a2a  (1.85:1)
  ✗ #a11d00  (2.40:1)
  ✗ #a75911  (3.63:1 — solo UI mínimo, no texto corrido)
*/

/* ── Constantes de color para dark mode ── */
const C = {
    textPrimary: '#fff8f0',           /* headings, texto principal */
    textSecondary: '#fbcd86',           /* subtítulos, labels warm */
    textTertiary: '#d4a96a',           /* hints, meta, pequeño */
    accent: '#eb8b3a',           /* CTAs, links, highlights */
    accentHover: '#f5a55a',
    border: 'rgba(235,139,58,0.18)',
    borderHover: 'rgba(235,139,58,0.40)',
    cardBg: 'rgba(255,248,240,0.04)',
    cardBgHover: 'rgba(255,248,240,0.07)',
    badgeBg: 'rgba(235,139,58,0.12)',
};

// Componente para animar números
const AnimatedNumber = ({ value, prefix = '', suffix = '', duration = 2.5 }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    setIsVisible(true);
                }
            },
            { threshold: 0.5 }
        );

        const currentRef = ref.current;
        if (currentRef) observer.observe(currentRef);

        return () => {
            if (currentRef) observer.unobserve(currentRef);
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime = null;
        const durationMs = duration * 1000;

        const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const animate = (timestamp) => {
            if (startTime === null) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            const easedProgress = easeInOutQuad(progress);

            setDisplayValue(Math.floor(value * easedProgress));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }, [isVisible, value, duration]);

    return (
        <span 
            ref={ref}
            style={{
                fontFamily: 'Courier, monospace',
                display: 'inline-block',
                minWidth: value > 99 ? '3.5ch' : '2.5ch',
                textAlign: 'right',
                willChange: 'contents',
            }}
        >
            {prefix}
            {displayValue}
            {suffix}
        </span>
    );
};

const HookUser = () => {
    return (
        <section
            id="section1"
            className="relative w-full overflow-hidden flex items-center justify-center"
            style={{
                minHeight: '100svh',
                paddingTop: 'clamp(6rem, 12vw, 8rem)',
                paddingBottom: 'clamp(3rem, 8vw,  5rem)',
                paddingLeft: 'clamp(1rem, 5vw,  2rem)',
                paddingRight: 'clamp(1rem, 5vw,  2rem)',
            }}
            aria-labelledby="hero-heading"
        >

            {/* ── Glows de fondo ────────────────── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div
                    className="absolute rounded-full blur-3xl"
                    style={{
                        width: 'clamp(300px, 40vw, 600px)',
                        height: 'clamp(300px, 40vw, 600px)',
                        top: '-10%', right: '-10%',
                        background: 'radial-gradient(circle, rgba(235,139,58,0.22) 0%, transparent 70%)',
                    }}
                />
                <div
                    className="absolute rounded-full blur-3xl"
                    style={{
                        width: 'clamp(200px, 30vw, 450px)',
                        height: 'clamp(200px, 30vw, 450px)',
                        bottom: '-8%', left: '-8%',
                        background: 'radial-gradient(circle, rgba(235,139,58,0.10) 0%, transparent 70%)',
                    }}
                />
                <div
                    className="absolute rounded-full blur-3xl"
                    style={{
                        width: '50vw', height: '50vw',
                        top: '30%', left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'radial-gradient(circle, rgba(251,205,134,0.05) 0%, transparent 70%)',
                    }}
                />
            </div>

            {/* ── Contenedor Principal ─────────────────────────────────────────── */}
            <motion.div
                className="relative z-10 w-full max-w-7xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div
                    className="grid items-center"
                    style={{
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
                        gap: 'clamp(2.5rem, 6vw, 5rem)',
                    }}
                >

                    {/* ── IMAGEN ── */}
                    <motion.div
                        className="flex justify-center items-center"
                        style={{ order: 2 }}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    >
                        <div
                            className="relative w-full group"
                            style={{ maxWidth: 'clamp(260px, 45vw, 480px)' }}
                        >
                            {/* Glow detrás de la imagen */}
                            <div
                                className="absolute rounded-3xl blur-2xl transition-opacity duration-500"
                                style={{
                                    inset: '-12px',
                                    background: 'radial-gradient(circle, rgba(235,139,58,0.30) 0%, transparent 70%)',
                                    opacity: 0.6,
                                }}
                                aria-hidden="true"
                            />

                            {/* Marco de video */}
                            <div
                                className="relative overflow-hidden transition-all duration-500"
                                style={{
                                    borderRadius: 'clamp(1rem, 3vw, 1.75rem)',
                                    border: `1.5px solid ${C.border}`,
                                    background: 'rgba(255,248,240,0.04)',
                                    boxShadow: '0 24px 80px rgba(0,0,0,0.50), 0 0 0 1px rgba(235,139,58,0.08)',
                                }}
                            >
                                <video
                                    className="overflow-hidden w-full h-full"
                                    style={{
                                        aspectRatio: '4 / 5',
                                        background: 'rgba(19,18,18,0.6)',
                                        objectFit: 'cover',
                                        display: 'block',
                                    }}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                >
                                    <source src={loopVideo} type="video/mp4" />
                                    Tu navegador no soporta videos.
                                </video>
                            </div>

                            {/* Badge "100% Natural" */}
                            <div
                                className="absolute font-bold"
                                style={{
                                    bottom: 'clamp(-12px, -2vw, -16px)',
                                    right: 'clamp(-8px,  -1vw, -12px)',
                                    padding: 'clamp(0.4rem, 1vw, 0.65rem) clamp(0.9rem, 2vw, 1.4rem)',
                                    fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                                    background: '#eb8b3a',
                                    color: '#2d1810',
                                    borderRadius: '9999px',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.40)',
                                    border: '1.5px solid rgba(251,205,134,0.30)',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                🚚 Envío a toda Colombia
                            </div>
                        </div>
                    </motion.div>

                    {/* ── CONTENIDO ── */}
                    <motion.div
                        style={{
                            order: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'clamp(1rem, 2.5vw, 1.5rem)',
                        }}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                        viewport={{ once: true }}
                    >

                        {/* Título */}
                        <h1
                            id="hero-heading"
                            style={{
                                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                                fontWeight: 900,
                                lineHeight: 1.1,
                                letterSpacing: '-0.03em',
                                background: 'linear-gradient(135deg, #fff8f0 0%, #fbcd86 60%, #eb8b3a 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                margin: 0,
                            }}
                        >
                            Cultivado durante más de 45 años
                        </h1>

                        {/* Beneficios — grid 2x2 */}
                        <motion.div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
                            }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, staggerChildren: 0.1 }}
                            viewport={{ once: true }}
                        >
                            {[
                                { value: 98, suffix: '%', label: 'de clientes recomiendan nuestro café' },
                                { value: 45, prefix: '+', label: 'años cultivando café' },
                                { value: 100, suffix: '%', label: 'Colombiano' },
                                { value: 150, prefix: '+', label: 'municipios con entregas' },
                            ].map(({ value, prefix = '', suffix = '', label }) => (
                                <motion.div
                                    key={label}
                                    style={{
                                        padding: 'clamp(0.6rem, 1.5vw, 0.875rem) clamp(0.75rem, 2vw, 1rem)',
                                        borderRadius: '0.75rem',
                                        background: C.cardBg,
                                        border: `1px solid ${C.border}`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.75rem',
                                        transition: 'background 0.2s, border-color 0.2s',
                                    }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                    viewport={{ once: true }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = C.cardBgHover;
                                        e.currentTarget.style.borderColor = 'rgba(235,139,58,0.40)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = C.cardBg;
                                        e.currentTarget.style.borderColor = 'rgba(235,139,58,0.18)';
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: 'clamp(1.25rem, 3vw, 1.8rem)',
                                            fontWeight: 800,
                                            color: C.accent,
                                            lineHeight: 1,
                                            minWidth: 'fit-content',
                                            willChange: 'contents',
                                        }}
                                    >
                                        <AnimatedNumber 
                                            value={value} 
                                            prefix={prefix}
                                            suffix={suffix}
                                            duration={2.5}
                                        />
                                    </div>

                                    <span
                                        style={{
                                            fontSize: 'clamp(0.78rem, 1.4vw, 0.875rem)',
                                            fontWeight: 600,
                                            color: C.textSecondary,
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {label}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA Principal */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                            <a
                                href="https://wa.me/573216363596/?text=Hola! 👋☕ Estoy interesado(a) en conocer y comprar café de especialidad Cumbre Café. ¿Podrían brindarme información sobre variedades, procesos y precios disponibles?"
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center justify-center gap-3 focus-ring hover-lift"
                                style={{
                                    padding: 'clamp(0.85rem, 2vw, 1.1rem) clamp(1.5rem, 4vw, 2.25rem)',
                                    borderRadius: '1rem',
                                    fontWeight: 700,
                                    fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
                                    background: 'linear-gradient(135deg, #eb8b3a 0%, #d4700a 100%)',
                                    color: '#2d1810',
                                    boxShadow: '0 12px 32px rgba(235,139,58,0.35), 0 4px 12px rgba(0,0,0,0.30)',
                                    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                                    alignSelf: 'flex-start',
                                    border: '1px solid rgba(251,205,134,0.20)',
                                    textDecoration: 'none',
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
                                <FaShoppingCart size={20} aria-hidden="true" />
                                <span>Comprar Ahora</span>
                            </a>

                            {/* Meta info */}
                            <p
                                style={{
                                    fontSize: 'clamp(0.78rem, 1.4vw, 0.875rem)',
                                    color: C.textTertiary,
                                    margin: 0,
                                    letterSpacing: '0.01em',
                                }}
                            >
                                🚚 Envío a toda Colombia &nbsp;·&nbsp; 💬 Consulta sin compromiso
                            </p>
                        </div>

                    </motion.div>
                    {/* ── FIN CONTENIDO ── */}

                </div>
                {/* ── FIN GRID ── */}

            </motion.div>
            {/* ── FIN CONTENEDOR PRINCIPAL ── */}

        </section>
    );
};

export default HookUser;