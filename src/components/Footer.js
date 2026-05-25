import { FaFacebook, FaTiktok, FaInstagram, FaMailBulk } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FiArrowUp } from "react-icons/fi";
import { motion } from "framer-motion";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Color palette
  const colors = {
    primary: '#fff8f0',
    secondary: '#fbcd86',
    accent: '#eb8b3a',
    dark: '#131212',
    border: 'rgba(235,139,58,0.18)',
    cardBg: 'rgba(255,248,240,0.04)',
    hoverBg: 'rgba(235,139,58,0.12)',
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const linkHoverVariants = {
    rest: { color: colors.secondary, x: 0 },
    hover: { 
      color: colors.accent,
      x: 4,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
  };

  const socialLinks = [
    {
      icon: IoLogoWhatsapp,
      href: "https://wa.me/573216363596/?text=¡Hola! Me gustaría comprar café de especialidad.",
      label: "WhatsApp",
      color: "#25D366",
    },
    {
      icon: FaFacebook,
      href: "https://www.facebook.com/share/EbvUVP2UEw1mPXbG/?mibextid=qi2Omg",
      label: "Facebook",
      color: "#1877F2",
    },
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/cumbre.cafe",
      label: "Instagram",
      color: "#E4405F",
    },
    {
      icon: FaTiktok,
      href: "https://www.tiktok.com/@cumbre.caf?_t=8ovh16QRai6&_r=1",
      label: "TikTok",
      color: "#000000",
    },
    {
      icon: FaMailBulk,
      href: "mailto:cafesaboracampo@gmail.com",
      label: "Email",
      color: colors.accent,
    },
  ];

  return (
    <footer 
      className="relative bg-dark text-light py-12 md:py-20 overflow-hidden"
      style={{ background: colors.dark }}
    >
      {/* Elemento Decorativo de Fondo Animado */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.05 }}
        transition={{ duration: 1 }}
      >
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: colors.accent }}
        ></div>
        <div 
          className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl"
          style={{ background: colors.accent }}
        ></div>
      </motion.div>

      {/* Contenido Principal */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 md:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {/* Grid Principal */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          
          {/* Sección 1: Marca */}
          <motion.div 
            className="text-center md:text-left"
            variants={itemVariants}
          >
            <motion.h3 
              className="text-3xl md:text-4xl font-black mb-4"
              style={{ color: colors.accent }}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              Cumbre Café
            </motion.h3>
            <motion.p 
              className="text-sm md:text-base leading-relaxed"
              style={{ color: colors.secondary }}
              variants={itemVariants}
            >
              Café de especialidad 100% colombiano. Cultivado en las montañas de Mistrató, Risaralda con prácticas sostenibles.
            </motion.p>
          </motion.div>

          {/* Sección 2: Links Rápidos */}
          <motion.div 
            className="text-center"
            variants={itemVariants}
          >
            <motion.h4 
              className="text-lg md:text-xl font-bold mb-6"
              style={{ color: colors.accent }}
              variants={itemVariants}
            >
              Navegación
            </motion.h4>
            <nav className="space-y-4 flex flex-col items-center">
              {['Inicio', 'Productos', 'Nosotros'].map((item, idx) => (
                <div key={item} className="relative">
                  <motion.a
                    href={`#section${idx + 1}`}
                    className="text-sm md:text-base font-semibold py-2 relative block"
                    style={{ color: colors.primary }}
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    custom={idx}
                  >
                    {item}
                  </motion.a>
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{ background: colors.accent }}
                    initial={{ scaleX: 0, transformOrigin: 'left' }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  ></motion.div>
                </div>
              ))}
            </nav>
          </motion.div>

          {/* Sección 3: Contacto */}
          <motion.div 
            className="text-center md:text-right"
            variants={itemVariants}
          >
            <motion.h4 
              className="text-lg md:text-xl font-bold mb-6"
              style={{ color: colors.accent }}
              variants={itemVariants}
            >
              Contacto
            </motion.h4>
            <motion.div 
              className="space-y-3 text-sm md:text-base"
              variants={containerVariants}
            >
              {[
                { icon: '📧', text: 'cafesaboracampo@gmail.com', href: 'mailto:cafesaboracampo@gmail.com' },
                { icon: '📱', text: '+57 (321) 636-3596', href: 'https://wa.me/573216363596' },
                { icon: '📍', text: 'Mistrató, Risaralda - Colombia', href: null },
              ].map((item, idx) => (
                <motion.p 
                  key={idx}
                  style={{ color: colors.secondary }}
                  variants={itemVariants}
                  className="text-sm md:text-base"
                >
                  {item.icon} {' '}
                  {item.href ? (
                    <motion.a
                      href={item.href}
                      target={item.href?.startsWith('http') ? '_blank' : '_self'}
                      rel={item.href?.startsWith('http') ? 'noreferrer' : ''}
                      className="hover:opacity-80 transition-opacity duration-300"
                      style={{ color: colors.secondary }}
                      whileHover={{ color: colors.accent }}
                    >
                      {item.text}
                    </motion.a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Divisor Animado */}
        <motion.div 
          className="h-px mb-8 md:mb-12"
          style={{
            background: `linear-gradient(to right, transparent, ${colors.border}, transparent)`
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8 }}
        ></motion.div>

        {/* Sección de Redes Sociales */}
        <motion.div 
          className="text-center mb-8 md:mb-12"
          variants={itemVariants}
        >
          <motion.p 
            className="font-bold mb-6 uppercase tracking-widest text-xs md:text-sm"
            style={{ color: colors.secondary }}
            variants={itemVariants}
          >
            Síguenos en nuestras redes
          </motion.p>
          <motion.div 
            className="flex items-center justify-center gap-3 md:gap-4 flex-wrap"
            variants={containerVariants}
          >
            {socialLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Seguir en ${link.label}`}
                  title={link.label}
                  className="rounded-full transition-all duration-300"
                  style={{
                    padding: '0.875rem',
                    background: colors.cardBg,
                    border: `1.5px solid ${colors.border}`,
                    color: colors.secondary,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  variants={itemVariants}
                  whileHover={{
                    y: -6,
                    background: colors.hoverBg,
                    borderColor: colors.accent,
                    color: colors.accent,
                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={22} />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Divisor Animado */}
        <motion.div 
          className="h-px mb-8 md:mb-12"
          style={{
            background: `linear-gradient(to right, transparent, ${colors.border}, transparent)`
          }}
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        ></motion.div>

        {/* Footer Bottom */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 text-xs md:text-sm"
          style={{ color: colors.secondary }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.p variants={itemVariants}>
            © {new Date().getFullYear()} <span style={{ color: colors.accent }} className="font-bold">Cumbre Café</span>. Todos los derechos reservados.
          </motion.p>
          <motion.p variants={itemVariants}>
            Desarrollado con <span style={{ color: colors.accent }}>❤️</span> por <span style={{ color: colors.accent }} className="font-bold">Alexander Suaza M.</span>
          </motion.p>
          <motion.button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-bold transition-all duration-300"
            style={{
              background: colors.cardBg,
              color: colors.secondary,
              border: `1.5px solid ${colors.border}`,
            }}
            variants={itemVariants}
            whileHover={{
              background: colors.hoverBg,
              borderColor: colors.accent,
              color: colors.accent,
              y: -4,
              transition: { type: 'spring', stiffness: 300, damping: 20 }
            }}
            whileTap={{ scale: 0.95 }}
            aria-label="Ir al inicio"
          >
            <span className="text-xs md:text-sm">Volver arriba</span>
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FiArrowUp size={16} />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Patrón decorativo de fondo */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${colors.border}, transparent)`
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      ></motion.div>
    </footer>
  );
};

export default Footer;
