import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { IoLogoWhatsapp } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";

const WHATSAPP_NUMBER = "573216363596";
const genericMessage = "¡Hola! 👋☕\nEstoy interesado(a) en conocer y comprar café de especialidad Cumbre Café.\n¿Podrían brindarme información sobre variedades, procesos y precios disponibles?";
const waLinkGeneric = `https://wa.me/${WHATSAPP_NUMBER}/?text=${encodeURIComponent(genericMessage)}`;

const Menu = () => {
  const [activeLink, setActiveLink] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

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
    { label: 'Inicio', href: '#section1', type: 'anchor' },
    { label: 'Comprar', href: '#section2', type: 'anchor' },
    { label: '🎁 Regalos', href: '#section-gifts', type: 'anchor' },
    { label: '☕ Recetas de Café', href: '/recetas-cafe', type: 'route' },
    { label: 'Nosotros', href: '#section3', type: 'anchor' },
  ];

  // En rutas distintas a "/", las anclas navegan primero a home conservando el hash
  const getHref = (link) => (link.type === 'route' || isHome ? link.href : `/${link.href}`);
  const getIsActive = (link) => (link.type === 'route' ? location.pathname === link.href : activeLink === link.href.substring(1));

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'linear-gradient(90deg, #eb8b3a 0%, #fbcd86 100%)',
          color: '#2d1810',
          boxShadow: 'var(--shadow-sm)',
        }}
        className="fixed top-0 left-0 w-full text-xs font-semibold tracking-widest uppercase py-2 text-center z-[60]"
        role="status"
        aria-live="polite"
      >
        ✨ Bienvenido a Cumbre Café — Café de Especialidad
      </motion.div>

      <motion.nav
        className={`fixed top-8 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-lg' : ''
        }`}
        style={
          isScrolled
            ? {
                background: 'rgba(255,248,240, 0.96)',
                borderColor: 'rgba(167,89,17,0.18)',
                borderBottom: '1px solid',
                boxShadow: '0 4px 20px rgba(45,24,16,0.10)',
              }
            : {
                background: 'rgba(255,248,240,0.55)',
                backdropFilter: 'blur(6px)',
              }
        }
        aria-label="Navegación principal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2.5 md:py-3 flex items-center justify-between">
          <motion.div 
            className="flex-shrink-0" 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="/" 
              className="inline-flex items-center gap-2 md:gap-3 group focus-ring"
            >
              <img
                src="/cumbreCafeHeader.webp"
                alt="Logo Cumbre Café"
                className="h-8 md:h-11 lg:h-12 w-auto object-contain transition-transform duration-300"
              />
            </a>
          </motion.div>

          <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8 flex-1 mx-6 lg:mx-8">
            {navLinks.map((link, i) => {
              const isActive = getIsActive(link);
              return (
                <motion.a
                  key={link.href}
                  href={getHref(link)}
                  className="relative font-medium text-xs lg:text-sm transition-colors duration-300 focus-ring whitespace-nowrap"
                  style={{
                    color: isScrolled
                      ? isActive
                        ? '#d4700a'  /* Naranja oscuro para estado activo sobre claro */
                        : '#4a3221'  /* Texto oscuro para estado inactivo */
                      : '#2d1810',    /* Texto oscuro sobre hero claro */
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: '0.5px',
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                      style={{ 
                        background: '#eb8b3a'
                      }}
                      aria-hidden="true"
                      layoutId="activeIndicator"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          <motion.div
            className="hidden md:flex items-center gap-3 lg:gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.a
              href={waLinkGeneric}
              target="_blank"
              rel="noreferrer"
              className="px-4 lg:px-5 py-2 rounded-full font-semibold text-xs lg:text-sm transition-all duration-300 focus-ring"
              style={
                isScrolled
                  ? {
                      background: '#eb8b3a',
                      color: '#2d1810',
                      boxShadow: '0 8px 20px rgba(235, 139, 58, 0.3)',
                      border: '1.5px solid rgba(212,112,10,0.3)',
                    }
                  : {
                      background: '#eb8b3a',
                      color: '#2d1810',
                      border: '1.5px solid rgba(212,112,10,0.3)',
                      boxShadow: '0 4px 12px rgba(45,24,16,0.12)',
                    }
              }
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Abrir chat de WhatsApp"
            >
              💬 Conecta
            </motion.a>
          </motion.div>

          <motion.button
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg transition-all duration-300 focus-ring"
            style={{
              color: '#2d1810',
              background: isScrolled 
                ? 'rgba(235, 139, 58, 0.12)'
                : 'rgba(235, 139, 58, 0.18)',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                >
                  <FiX size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                >
                  <FiMenu size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden backdrop-blur-md border-t"
              style={{
                background: 'rgba(255,248,240,0.98)',
                borderColor: 'rgba(167,89,17,0.18)',
                boxShadow: 'inset 0 4px 12px rgba(45,24,16,0.08)',
              }}
            >
              <div className="max-w-7xl mx-auto px-3 py-4 space-y-2">
                {navLinks.map((link, i) => {
                  const isActive = getIsActive(link);
                  return (
                    <motion.a
                      key={link.href}
                      href={getHref(link)}
                      className="block px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-300 focus-ring"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: i * 0.05 }}
                      style={
                        isActive
                          ? {
                              background: '#eb8b3a',
                              color: '#2d1810',
                              boxShadow: '0 4px 12px rgba(235, 139, 58, 0.25)',
                              fontWeight: 700,
                            }
                          : {
                              background: 'transparent',
                              color: '#4a3221',
                              borderLeft: '2px solid transparent',
                            }
                      }
                      aria-current={isActive ? 'page' : undefined}
                      onClick={() => setIsOpen(false)}
                      whileHover={{ x: 4, backgroundColor: isActive ? '#eb8b3a' : 'rgba(235, 139, 58, 0.1)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}

                <div className="my-2 h-px bg-gradient-to-r from-transparent via-amber-700/30 to-transparent" />

                <motion.a
                  href={waLinkGeneric}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full px-4 py-3 rounded-lg font-semibold text-center text-sm focus-ring transition-all duration-300"
                  style={{
                    background: '#eb8b3a',
                    color: '#2d1810',
                    boxShadow: '0 4px 12px rgba(235, 139, 58, 0.3)',
                  }}
                  onClick={() => setIsOpen(false)}
                  aria-label="Abrir chat de WhatsApp"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                >
                  💬 Conecta
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <motion.a
        href={waLinkGeneric}
        target="_blank"
        rel="noreferrer"
        title="Chatea con nosotros por WhatsApp"
        aria-label="Chatea con nosotros por WhatsApp"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-40 focus-ring"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <IoLogoWhatsapp size={28} color="#ffffff" />
      </motion.a>
    </>
  );
};

export default Menu;
