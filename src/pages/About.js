import { motion } from "framer-motion";
import Footer from "../components/Footer";

/* ── Paleta de colores Dark Mode (igual a ProductImage) ── */
const C = {
  textPrimary:   '#fff8f0',           /* headings, texto principal */
  textSecondary: '#fbcd86',           /* subtítulos, labels warm */
  textTertiary:  '#d4a96a',           /* hints, meta, pequeño */
  accent:        '#eb8b3a',           /* CTAs, links, highlights */
  accentHover:   '#f5a55a',
  border:        'rgba(235,139,58,0.18)',
  borderHover:   'rgba(235,139,58,0.40)',
  cardBg:        'rgba(255,248,240,0.04)',
  cardBgHover:   'rgba(255,248,240,0.07)',
  badgeBg:       'rgba(235,139,58,0.12)',
};

const About = () => {
  // Variantes de animación
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.320, 1] },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 100 },
    },
  };

  const valorVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: { delay: custom * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  const estadisticasVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (custom) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: custom * 0.15, duration: 0.6, type: "spring", stiffness: 80 },
    }),
  };

  return (
    <section 
      id="section3" 
      className="relative w-full overflow-hidden"
      aria-labelledby="about-heading"
      style={{
        minHeight: '100svh',
        paddingTop:    'clamp(6rem, 12vw, 8rem)',
        paddingBottom: 'clamp(3rem, 8vw,  5rem)',
        paddingLeft:   'clamp(1rem, 5vw,  2rem)',
        paddingRight:  'clamp(1rem, 5vw,  2rem)',
      }}
    >
      {/* ── Glows de fondo ────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          style={{
            position: 'absolute',
            width: 'clamp(300px, 40vw, 600px)',
            height: 'clamp(300px, 40vw, 600px)',
            top: '-10%', left: '-10%',
            background: 'radial-gradient(circle, rgba(235,139,58,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
          animate={{ 
            y: [0, -40, 0],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          style={{
            position: 'absolute',
            width: 'clamp(250px, 35vw, 500px)',
            height: 'clamp(250px, 35vw, 500px)',
            bottom: '-10%', right: '-10%',
            background: 'radial-gradient(circle, rgba(235,139,58,0.10) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(80px)',
          }}
          animate={{ 
            y: [0, 40, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Contenedor Principal */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(2.5rem, 6vw, 5rem)',
            alignItems: 'center',
          }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* Contenido - Izquierda */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
            {/* Badge */}
            <motion.div variants={badgeVariants}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: 'clamp(0.4rem, 1vw, 0.6rem) clamp(1rem, 2vw, 1.4rem)',
                  borderRadius: '9999px',
                  fontSize: 'clamp(0.75rem, 1.4vw, 0.875rem)',
                  background: C.badgeBg,
                  color: C.textSecondary,
                  border: `1px solid ${C.border}`,
                  letterSpacing: '0.02em',
                  fontWeight: 600,
                  marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                }}
              >
                <span>✨</span>
                <span>Nuestra Historia</span>
              </div>
            </motion.div>

            {/* Título Principal */}
            <motion.div variants={itemVariants}>
              <h2 
                id="about-heading"
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
                Café con <br /> Compromiso
              </h2>
            </motion.div>

            {/* Subtítulo */}
            <motion.p 
              variants={itemVariants}
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.375rem)',
                fontWeight: 700,
                color: C.accent,
                margin: 0,
              }}
            >
              Una familia dedicada a la <span style={{ color: C.textSecondary }}>excelencia</span>
            </motion.p>

            {/* Descripción Principal */}
            <motion.div 
              variants={itemVariants}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            >
              <p
                style={{
                  fontSize: 'clamp(0.9rem, 1.8vw, 1.0625rem)',
                  lineHeight: 1.8,
                  color: 'rgba(255,248,240,0.82)',
                  margin: 0,
                }}
              >
                Somos una <strong style={{ color: C.accent, fontWeight: 700 }}>familia de caficultores</strong> comprometida con la producción de café de especialidad de alta calidad. Cada grano que cultivamos representa nuestro amor por el café y respeto por la tierra.
              </p>
              <p
                style={{
                  fontSize: 'clamp(0.9rem, 1.8vw, 1.0625rem)',
                  lineHeight: 1.8,
                  color: 'rgba(255,248,240,0.82)',
                  margin: 0,
                }}
              >
                Nuestras prácticas son <strong style={{ color: C.textSecondary, fontWeight: 700 }}>100% sostenibles</strong>. Preservamos el medio ambiente, apoyamos a nuestras comunidades y entregamos un café responsable como delicioso.
              </p>
            </motion.div>

            {/* Valores */}
            <motion.div 
              variants={itemVariants}
              style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'clamp(0.75rem, 2vw, 1rem)',
                paddingTop: 'clamp(1rem, 2vw, 1.5rem)',
              }}
            >
              {[
                { icon: '🌱', title: 'Sostenibilidad', desc: 'Prácticas que respetan la tierra' },
                { icon: '☕', title: 'Especialidad', desc: 'Café grado AA premium' },
                { icon: '👥', title: 'Comunidad', desc: 'Apoyo a productores locales' },
                { icon: '✨', title: 'Calidad', desc: 'Excelencia en cada taza' },
              ].map((valor, idx) => (
                <motion.div 
                  key={idx}
                  custom={idx}
                  variants={valorVariants}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: 'clamp(1rem, 1.8vw, 1.25rem) clamp(1rem, 2vw, 1.25rem)',
                    borderRadius: '1rem',
                    background: C.cardBg,
                    border: `1.5px solid ${C.border}`,
                    transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: 'blur(10px)',
                  }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = C.cardBgHover;
                    e.currentTarget.style.borderColor = C.borderHover;
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(235,139,58,0.2)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = C.cardBg;
                    e.currentTarget.style.borderColor = C.border;
                  }}
                >
                  <motion.span 
                    style={{ 
                      fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
                      flexShrink: 0,
                    }}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                  >
                    {valor.icon}
                  </motion.span>
                  <div>
                    <h3 style={{
                      fontWeight: 700,
                      fontSize: 'clamp(0.78rem, 1.4vw, 0.875rem)',
                      color: C.textSecondary,
                      margin: 0,
                      textTransform: 'uppercase',
                      letterSpacing: '0.02em',
                    }}>
                      {valor.title}
                    </h3>
                    <p style={{
                      fontSize: 'clamp(0.75rem, 1.2vw, 0.8125rem)',
                      color: C.textTertiary,
                      margin: '0.25rem 0 0 0',
                    }}>
                      {valor.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={itemVariants} style={{ paddingTop: 'clamp(1rem, 2vw, 1.5rem)' }}>
              <a
                href="https://wa.me/573216363596/?text=¡Hola! Me gustaría conocer más sobre la historia y prácticas sostenibles de Cumbre Café"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  padding: 'clamp(0.85rem, 2vw, 1.1rem) clamp(1.5rem, 4vw, 2.25rem)',
                  borderRadius: '1rem',
                  fontWeight: 700,
                  fontSize: 'clamp(0.95rem, 2vw, 1.125rem)',
                  background: 'linear-gradient(135deg, #eb8b3a 0%, #d4700a 100%)',
                  color: '#2d1810',
                  boxShadow: '0 12px 32px rgba(235,139,58,0.35), 0 4px 12px rgba(0,0,0,0.30)',
                  transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                  border: '1px solid rgba(251,205,134,0.20)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #f5a55a 0%, #eb8b3a 100%)';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(235,139,58,0.45), 0 4px 16px rgba(0,0,0,0.30)';
                  e.currentTarget.style.color = '#1a0e08';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #eb8b3a 0%, #d4700a 100%)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(235,139,58,0.35), 0 4px 12px rgba(0,0,0,0.30)';
                  e.currentTarget.style.color = '#2d1810';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                aria-label="Conectar vía WhatsApp"
              >
                <span>📬</span>
                <span>Conectemos</span>
              </a>
            </motion.div>
          </div>

          {/* Tarjeta Derecha */}
          <motion.div 
            style={{
              display: 'none',
            }}
            className="lg:block"
            variants={itemVariants}
          >
            {/* Glow Background Animado */}
            <motion.div 
              style={{
                position: 'absolute',
                inset: 'clamp(-1.5rem, -4vw, -2rem)',
                background: 'radial-gradient(circle at 30% 30%, rgba(235,139,58,0.15) 0%, transparent 70%)',
                borderRadius: '2rem',
                filter: 'blur(40px)',
              }}
              animate={{ 
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            
            {/* Card Principal */}
            <motion.div 
              style={{
                position: 'relative',
                padding: 'clamp(1.5rem, 4vw, 2rem)',
                borderRadius: '1.5rem',
                background: C.cardBg,
                border: `1.5px solid ${C.border}`,
                boxShadow: '0 24px 80px rgba(0,0,0,0.50), 0 0 0 1px rgba(235,139,58,0.08)',
              }}
              whileHover={{ y: -8 }}
            >
              
              {/* Estadísticas */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'clamp(1rem, 2vw, 1.5rem)',
                marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
              }}>
                {[
                  { value: '1.950', label: 'Metros s.n.m', icon: '📏' },
                  { value: '100%', label: 'Especialidad', icon: '☕' }
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    custom={idx}
                    variants={estadisticasVariants}
                    style={{
                      textAlign: 'center',
                      padding: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                      borderRadius: '1rem',
                      background: C.cardBgHover,
                      border: `1.5px solid ${C.border}`,
                      transition: 'all 300ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                    whileHover={{ y: -4, scale: 1.04 }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(235,139,58,0.15)';
                      e.currentTarget.style.borderColor = C.borderHover;
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(235,139,58,0.25)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = C.cardBgHover;
                      e.currentTarget.style.borderColor = C.border;
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <p style={{ fontSize: 'clamp(1.2rem, 2vw, 1.75rem)', margin: '0 0 0.75rem 0' }}>{stat.icon}</p>
                    <p style={{
                      fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #fff8f0 0%, #fbcd86 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      margin: 0,
                    }}>
                      {stat.value}
                    </p>
                    <p style={{
                      fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)',
                      color: C.textTertiary,
                      margin: '0.5rem 0 0 0',
                    }}>
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Ubicación */}
              <motion.div 
                style={{
                  marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
                  padding: 'clamp(1rem, 1.5vw, 1.25rem)',
                  borderRadius: '0.75rem',
                  background: 'rgba(235,139,58,0.08)',
                  border: `1px solid ${C.border}`,
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.borderHover;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.border;
                }}
              >
                <p style={{
                  fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)',
                  fontWeight: 700,
                  color: C.accent,
                  margin: '0 0 0.5rem 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                }}>
                  📍 Ubicación
                </p>
                <p style={{
                  fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
                  fontWeight: 900,
                  color: C.textPrimary,
                  margin: 0,
                }}>
                  Mistrató, Risaralda
                </p>
                <p style={{
                  fontSize: 'clamp(0.8rem, 1.4vw, 0.9375rem)',
                  fontWeight: 600,
                  color: C.textSecondary,
                  margin: '0.25rem 0 0 0',
                }}>
                  Colombia
                </p>
              </motion.div>

              {/* Procesos */}
              <motion.div 
                style={{
                  padding: 'clamp(1rem, 1.5vw, 1.25rem)',
                  borderRadius: '0.75rem',
                  background: C.cardBg,
                  border: `1px solid ${C.border}`,
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = C.borderHover;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = C.border;
                }}
              >
                <p style={{
                  fontSize: 'clamp(0.75rem, 1.2vw, 0.875rem)',
                  fontWeight: 700,
                  color: C.accent,
                  margin: '0 0 0.75rem 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em',
                }}>
                  ☕ Procesos de Fermentación
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    { name: 'Proceso Lavado', color: '#eb8b3a' },
                    { name: 'Proceso Honey', color: '#fbcd86' }
                  ].map((proceso, idx) => (
                    <motion.div 
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                      }}
                      whileHover={{ x: 4 }}
                    >
                      <motion.div 
                        style={{
                          width: '0.5rem',
                          height: '0.5rem',
                          borderRadius: '50%',
                          flexShrink: 0,
                        }}
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                      />
                      <span style={{
                        fontSize: 'clamp(0.8rem, 1.4vw, 0.9375rem)',
                        fontWeight: 600,
                        color: C.textSecondary,
                      }}>
                        {proceso.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 w-full mt-20">
        <Footer />
      </div>
    </section>
  );
};

export default About;
