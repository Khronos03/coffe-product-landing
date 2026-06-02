import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    { label: 'Inicio', href: '#section1' },
    { label: 'Comprar', href: '#section2' },
    { label: 'Nosotros', href: '#section3' },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'var(--color-dark)',
          color: 'var(--color-text-inverse)',
          boxShadow: 'var(--shadow-md)',
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
                background: 'rgba(25, 18, 16, 0.98)',
                borderColor: 'rgba(235, 139, 58, 0.2)',
                borderBottom: '1px solid',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
              }
            : {
                background: 'transparent',
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
              const isActive = activeLink === link.href.substring(1);
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="relative font-medium text-xs lg:text-sm transition-colors duration-300 focus-ring whitespace-nowrap"
                  style={{
                    color: isScrolled
                      ? isActive
                        ? '#f5a55a'  /* Naranja claro para estado activo - 9.10:1 ✅ */
                        : '#e8e1d7'  /* Texto claro para estado inactivo - 12.5:1 ✅ */
                      : '#fff8f0',    /* Blanco crema en hero - 17.75:1 ✅ */
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
                        background: isScrolled 
                          ? '#f5a55a'
                          : '#fbcd86'
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
                      border: '1.5px solid rgba(251, 205, 134, 0.3)',
                    }
                  : {
                      background: 'rgba(255, 248, 240, 0.18)',
                      color: '#fff8f0',
                      border: '1.5px solid rgba(255, 248, 240, 0.4)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
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
              color: isScrolled 
                ? '#e8e1d7'
                : '#fff8f0',
              background: isScrolled 
                ? 'rgba(235, 139, 58, 0.1)'
                : 'rgba(255, 248, 240, 0.1)',
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
                background: 'rgba(25, 18, 16, 0.95)',
                borderColor: 'rgba(235, 139, 58, 0.2)',
                boxShadow: 'inset 0 4px 12px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div className="max-w-7xl mx-auto px-3 py-4 space-y-2">
                {navLinks.map((link, i) => {
                  const isActive = activeLink === link.href.substring(1);
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
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
                              color: '#e8e1d7',
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
