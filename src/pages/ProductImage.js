import { FaShoppingCart } from "react-icons/fa";
import ProcesoHoney from "../Premium.png";

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

const ProductImage = () => {
  return (
    <section
      id="section1"
      className="relative w-full overflow-hidden flex items-center justify-center"
      style={{
        minHeight: '100svh',  /* svh para mobile donde 100vh incluye la barra del browser */
        paddingTop: 'clamp(6rem, 12vw, 8rem)',
        paddingBottom: 'clamp(3rem, 8vw,  5rem)',
        paddingLeft: 'clamp(1rem, 5vw,  2rem)',
        paddingRight: 'clamp(1rem, 5vw,  2rem)',
      }}
      aria-labelledby="hero-heading"
    >

      {/* ── Glows de fondo — calibrados para dark body ────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Glow naranja superior-derecha — más visible sobre oscuro */}
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 'clamp(300px, 40vw, 600px)',
            height: 'clamp(300px, 40vw, 600px)',
            top: '-10%', right: '-10%',
            background: 'radial-gradient(circle, rgba(235,139,58,0.22) 0%, transparent 70%)',
          }}
        />
        {/* Glow borgoña inferior-izquierda — reducido porque #430000 no contrasta */}
        <div
          className="absolute rounded-full blur-3xl"
          style={{
            width: 'clamp(200px, 30vw, 450px)',
            height: 'clamp(200px, 30vw, 450px)',
            bottom: '-8%', left: '-8%',
            background: 'radial-gradient(circle, rgba(235,139,58,0.10) 0%, transparent 70%)',
          }}
        />
        {/* Glow warm central sutil */}
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
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div
          className="grid items-center"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(2.5rem, 6vw, 5rem)',
          }}
        >

          {/* ── IMAGEN ── */}
          <div
            className="flex justify-center items-center animate-fade-in-up"
            style={{ order: 2 }}  /* mobile: imagen abajo; lg: orden visual se invierte via CSS */
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

              {/* Marco de imagen */}
              <div
                className="relative overflow-hidden transition-all duration-500"
                style={{
                  borderRadius: 'clamp(1rem, 3vw, 1.75rem)',
                  border: `1.5px solid ${C.border}`,
                  background: 'rgba(255,248,240,0.04)',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.50), 0 0 0 1px rgba(235,139,58,0.08)',
                }}
              >
                {/*
                  TAMAÑO DE IMAGEN:
                  - Mobile (< 640px):  aspect-ratio 4/5 — más vertical, ocupa bien la pantalla
                  - Tablet (640–1023): aspect-ratio 1/1 — cuadrado equilibrado
                  - Desktop (≥ 1024):  aspect-ratio 4/5 — columna izquierda, sin ser demasiado alto

                  object-contain preserva la imagen completa sin recorte.
                  bg oscura semitransparente para que los bordes del PNG no floten.
                */}
                <div
                  className="overflow-hidden"
                  style={{
                    aspectRatio: '4 / 5',
                    background: 'rgba(19,18,18,0.6)',
                  }}
                >
                  <img
                    src={ProcesoHoney}
                    alt="Café de Altura — Cultivado en Mistrató, Risaralda a 1.950 m s.n.m"
                    decoding="async"
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ transformOrigin: 'center 50%' }}
                  />
                </div>
              </div>

              {/* Badge "100% Natural" — texto oscuro sobre naranja ✅ */}
              <div
                className="absolute font-bold"
                style={{
                  bottom: 'clamp(-12px, -2vw, -16px)',
                  right: 'clamp(-8px,  -1vw, -12px)',
                  padding: 'clamp(0.4rem, 1vw, 0.65rem) clamp(0.9rem, 2vw, 1.4rem)',
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                  background: '#eb8b3a',
                  color: '#2d1810',           /* texto oscuro sobre naranja: 6.63:1 ✅ */
                  borderRadius: '9999px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.40)',
                  border: '1.5px solid rgba(251,205,134,0.30)',
                  whiteSpace: 'nowrap',
                }}
              >
                ✦ 100% Natural
              </div>
            </div>
          </div>

          {/* ── CONTENIDO ── */}
          <div
            className="animate-fade-in-down"
            style={{
              order: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(1rem, 2.5vw, 1.5rem)',
            }}
          >

            {/* Tag origen */}
            <div
              className="inline-flex items-center gap-2 self-start font-semibold"
              style={{
                padding: '0.4rem 1rem',
                borderRadius: '9999px',
                fontSize: 'clamp(0.75rem, 1.4vw, 0.875rem)',
                background: C.badgeBg,
                color: C.textSecondary,         /* #fbcd86 — 12.63:1 ✅ */
                border: `1px solid ${C.border}`,
                letterSpacing: '0.02em',
              }}
            >
              <span>🇨🇴</span>
              <span>Café de Origen Colombiano</span>
            </div>

            {/* Título */}
            <h1
              id="hero-heading"
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                /* Gradiente legible sobre oscuro: fff8f0 → fbcd86 */
                background: 'linear-gradient(135deg, #fff8f0 0%, #fbcd86 60%, #eb8b3a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                margin: 0,
              }}
            >
              Café de Altura
            </h1>

            {/* Subtítulo altitud */}
            <p
              style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.375rem)',
                fontWeight: 700,
                color: C.accent,               /* #eb8b3a — 7.38:1 ✅ */
                margin: 0,
              }}
            >
              Cultivado a{' '}
              <span style={{ color: C.textSecondary }}>  {/* #fbcd86 — 12.63:1 ✅ */}
                1.950 m s.n.m
              </span>
            </p>

            {/* Descripción */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <p
                style={{
                  fontSize: 'clamp(0.9rem, 1.8vw, 1.0625rem)',
                  lineHeight: 1.8,
                  color: 'rgba(255,248,240,0.82)',  /* blanco suavizado — ~14:1 ✅ */
                  margin: 0,
                }}
              >
                Desde las montañas de{' '}
                <strong style={{ color: C.accent, fontWeight: 700 }}>
                  Mistrató, Risaralda
                </strong>
                , nace un café de origen 100% colombiano, creado para quienes valoran la calidad excepcional y la autenticidad.
              </p>
              <p
                style={{
                  fontSize: 'clamp(0.9rem, 1.8vw, 1.0625rem)',
                  lineHeight: 1.8,
                  color: 'rgba(255,248,240,0.82)',
                  margin: 0,
                }}
              >
                Cada grano es{' '}
                <strong style={{ color: C.textSecondary, fontWeight: 700 }}>
                  cuidadosamente seleccionado
                </strong>{' '}
                y cultivado bajo prácticas sostenibles, dando como resultado un café que expresa el amor de nuestro trabajo en cada taza.
              </p>
            </div>

            {/* Beneficios — grid 2x2 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'clamp(0.5rem, 1.5vw, 0.75rem)',
              }}
            >
              {[
                { icon: '🌱', label: '100% Sostenible' },
                { icon: '☕', label: 'Especialidad' },
                { icon: '📍', label: 'Origen Único' },
                { icon: '✨', label: 'Premium' },
              ].map(({ icon, label }) => (
                <div
                  key={label}
                  style={{
                    padding: 'clamp(0.6rem, 1.5vw, 0.875rem) clamp(0.75rem, 2vw, 1rem)',
                    borderRadius: '0.75rem',
                    background: C.cardBg,
                    border: `1px solid ${C.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = C.cardBgHover;
                    e.currentTarget.style.borderColor = 'rgba(235,139,58,0.40)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = C.cardBg;
                    e.currentTarget.style.borderColor = 'rgba(235,139,58,0.18)';
                  }}
                >
                  <span style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}>{icon}</span>
                  <span
                    style={{
                      fontSize: 'clamp(0.78rem, 1.4vw, 0.875rem)',
                      fontWeight: 600,
                      color: C.textSecondary,    /* #fbcd86 — 12.63:1 ✅ */
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

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
                  /* naranja fill + texto oscuro: 6.63:1 ✅ */
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
                  color: C.textTertiary,         /* #d4a96a — 7.20:1 ✅ */
                  margin: 0,
                  letterSpacing: '0.01em',
                }}
              >
                🚚 Envío a toda Colombia &nbsp;·&nbsp; 💬 Consulta sin compromiso
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductImage;