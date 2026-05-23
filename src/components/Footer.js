import { FaFacebook, FaTiktok, FaInstagram, FaMailBulk } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FiArrowUp } from "react-icons/fi";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      color: "#eb8b3a",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-dark via-dark/95 to-dark/90 text-light py-16 md:py-20 overflow-hidden">
      {/* Elemento Decorativo de Fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-warm rounded-full blur-3xl opacity-10"></div>
      </div>

      {/* Contenido Principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Sección 1: Marca */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-black text-gradient mb-3">Cumbre Café</h3>
            <p className="text-light/70 text-sm leading-relaxed">
              Café de especialidad 100% colombiano. Cultivado en las montañas de Mistrató, Risaralda con prácticas sostenibles.
            </p>
          </div>

          {/* Sección 2: Links Rápidos */}
          <div className="text-center">
            <h4 className="text-lg font-bold text-primary mb-4">Navegación</h4>
            <nav className="space-y-2 flex flex-col items-center">
              <a 
                href="#section1" 
                className="text-light/70 hover:text-primary transition-colors duration-300 text-sm"
              >
                Inicio
              </a>
              <a 
                href="#section2" 
                className="text-light/70 hover:text-primary transition-colors duration-300 text-sm"
              >
                Productos
              </a>
              <a 
                href="#section3" 
                className="text-light/70 hover:text-primary transition-colors duration-300 text-sm"
              >
                Nosotros
              </a>
            </nav>
          </div>

          {/* Sección 3: Contacto */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-bold text-primary mb-4">Contacto</h4>
            <div className="space-y-2 text-sm">
              <p className="text-light/70">
                📧 <a 
                  href="mailto:cafesaboracampo@gmail.com"
                  className="hover:text-primary transition-colors duration-300"
                >
                  cafesaboracampo@gmail.com
                </a>
              </p>
              <p className="text-light/70">
                📱 <a 
                  href="https://wa.me/573216363596"
                  className="hover:text-primary transition-colors duration-300"
                  target="_blank"
                  rel="noreferrer"
                >
                  +57 (321) 636-3596
                </a>
              </p>
              <p className="text-light/70">
                📍 Mistrató, Risaralda - Colombia
              </p>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8"></div>

        {/* Sección de Redes Sociales */}
        <div className="text-center mb-8">
          <p className="text-light/80 font-semibold mb-5 text-sm uppercase tracking-wide">
            Síguenos en nuestras redes
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Seguir en ${link.label}`}
                  title={link.label}
                  className="group p-3 rounded-full bg-light/10 border border-primary/20 hover:bg-gradient-primary hover:border-primary transition-all duration-300 hover-lift focus-ring"
                >
                  <Icon 
                    size={20} 
                    className="group-hover:text-light transition-colors duration-300" 
                    color="currentColor"
                  />
                </a>
              );
            })}
          </div>
        </div>

        {/* Divisor */}
        <div className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mb-8"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm text-light/60">
          <p>
            © {new Date().getFullYear()} <strong className="text-primary">Cumbre Café</strong>. Todos los derechos reservados.
          </p>
          <p>
            Desarrollado con <span className="text-primary">❤️</span> por <strong className="text-primary">Alexander Suaza M.</strong>
          </p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 hover:bg-primary/40 transition-all duration-300 focus-ring text-light"
            aria-label="Ir al inicio"
          >
            <span>Volver arriba</span>
            <FiArrowUp size={16} />
          </button>
        </div>
      </div>

      {/* Patrón decorativo de fondo */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </footer>
  );
};

export default Footer;
