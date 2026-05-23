import React, { useEffect, useState } from 'react';
import { IoLogoWhatsapp } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";

const WHATSAPP_NUMBER = "573216363596";
const genericMessage = "¡Hola! 👋☕\nEstoy interesado(a) en conocer y comprar café de especialidad Cumbre Café.\n¿Podrían brindarme información sobre variedades, procesos y precios disponibles?";
const waLinkGeneric = `https://wa.me/${WHATSAPP_NUMBER}/?text=${encodeURIComponent(genericMessage)}`;

const Menu = () => {
  const [activeLink, setActiveLink] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = '';
      setIsScrolled(window.scrollY > 10);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          currentSection = section.getAttribute('id');
        }
      });

      setActiveLink(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Comprar', href: '#section1' },
    { label: 'Perfiles', href: '#section2' },
    { label: 'Nosotros', href: '#section3' },
  ];

  return (
    <>
      {/* Barra superior - Bienvenida */}
      <div
        className="fixed top-0 left-0 w-full bg-gradient-primary text-light text-xs font-semibold tracking-widest uppercase py-2 text-center shadow-premium z-[60] animate-fade-in-down"
        role="status"
        aria-live="polite"
      >
        ✨ Bienvenido a Cumbre Café - Café de Especialidad Colombiano
      </div>

      {/* Navegación Principal */}
      <nav 
        className={`fixed top-8 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 shadow-premium backdrop-blur-md border-b border-warm/20' 
            : 'bg-transparent'
        }`}
        aria-label="Navegación principal"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="/" 
              className="inline-flex items-center gap-3 group focus-ring"
            >
              <img 
                src="/cumbreCafeHeader.webp" 
                alt="Logo Cumbre Café" 
                className="h-10 md:h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-300" 
              />
              <span className={`hidden sm:inline font-bold text-lg transition-colors duration-300 ${
                isScrolled ? 'text-dark' : 'text-light'
              }`}>
                Cumbre
              </span>
            </a>
          </div>

          {/* Links Desktop */}
          <div className="hidden md:flex items-center justify-center gap-8 flex-1 mx-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative font-medium text-sm transition-colors duration-300 focus-ring ${
                  isScrolled 
                    ? 'text-dark hover:text-primary' 
                    : 'text-light hover:text-warm'
                } ${activeLink === link.href.substring(1) ? 'text-primary font-bold' : ''}`}
                aria-current={activeLink === link.href.substring(1) ? 'page' : undefined}
              >
                {link.label}
                {activeLink === link.href.substring(1) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-primary rounded-full"></span>
                )}
              </a>
            ))}
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={waLinkGeneric}
              target="_blank"
              rel="noreferrer"
              className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 focus-ring ${
                isScrolled
                  ? 'bg-gradient-primary text-light hover:shadow-premium hover:scale-105'
                  : 'bg-light/20 text-light border border-light/30 hover:bg-light/30'
              }`}
              aria-label="Abrir chat de WhatsApp"
            >
              Chatea con nosotros
            </a>
          </div>

          {/* Hamburguesa Mobile */}
          <button
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-300 focus-ring ${
              isScrolled 
                ? 'hover:bg-primary/10 text-dark' 
                : 'hover:bg-light/10 text-light'
            }`}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Menú Mobile */}
        {isOpen && (
          <div 
            id="mobile-menu" 
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-warm/20 shadow-premium-lg animate-fade-in-down"
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 hover-lift focus-ring ${
                    activeLink === link.href.substring(1)
                      ? 'bg-gradient-primary text-light shadow-premium'
                      : 'bg-surface text-dark hover:bg-warm/20'
                  }`}
                  aria-current={activeLink === link.href.substring(1) ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={waLinkGeneric}
                target="_blank"
                rel="noreferrer"
                className="block w-full px-4 py-3 rounded-lg font-semibold bg-gradient-primary text-light text-center hover-lift focus-ring transition-all duration-300"
                onClick={() => setIsOpen(false)}
                aria-label="Abrir chat de WhatsApp"
              >
                💬 Chatea con nosotros
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Botón Flotante WhatsApp */}
      <a
        href={waLinkGeneric}
        target="_blank"
        rel="noreferrer"
        title="Chatea con nosotros por WhatsApp"
        aria-label="Chatea con nosotros por WhatsApp"
        className="fixed-bubble hover-glow animate-float"
      >
        <IoLogoWhatsapp size={28} color="white" />
      </a>
    </>
  );
};

export default Menu;