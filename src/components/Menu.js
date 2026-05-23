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
      {/* ── Barra superior ─────────────────────────────────────────────────
          ANTES: bg-gradient-primary text-light
            → blanco (#fff8f0) sobre naranja (#eb8b3a) = 2.53:1 ❌
          AHORA: fondo dark (#430000) + texto blanco
            → blanco sobre dark = 16.95:1 ✅
      ──────────────────────────────────────────────────────────────────── */}
      <div
        className="fixed top-0 left-0 w-full text-xs font-semibold tracking-widest uppercase py-2 text-center z-[60] animate-fade-in-down"
        style={{
          background: 'var(--color-dark)',           /* #430000 */
          color: 'var(--color-text-inverse)',   /* #fff8f0 — 16.95:1 ✅ */
          boxShadow: 'var(--shadow-md)',
        }}
        role="status"
        aria-live="polite"
      >
        ✨ Bienvenido a Cumbre Café — Café de Especialidad Colombiano
      </div>

      {/* ── Navegación Principal ──────────────────────────────────────────── */}
      <nav
        className={`fixed top-8 left-0 w-full z-50 transition-all duration-300 ${isScrolled
            ? 'backdrop-blur-md border-b'
            : 'bg-transparent'
          }`}
        style={isScrolled ? {
          background: '#1c1b1b',  /* elevado, más opaco = mejor contraste */
          borderColor: 'var(--color-border-default)',
          boxShadow: 'var(--shadow-md)',
        } : {}}
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
            </a>
          </div>

          {/* Links Desktop */}
          <div className="hidden md:flex items-center justify-center gap-8 flex-1 mx-8">
            {navLinks.map((link) => {
              const isActive = activeLink === link.href.substring(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative font-medium text-sm transition-colors duration-300 focus-ring"
                  style={{
                    /* ANTES scrolled: hover:text-primary = naranja crudo #eb8b3a sobre blanco = 2.4:1 ❌
                       AHORA: --color-primary = #a75911 = 5.15:1 ✅
                       ANTES no-scroll: text-light ✅ (sobre hero oscuro)
                       Estado activo: antes text-primary (naranja crudo), ahora token accesible */
                    color: isScrolled
                      ? (isActive ? 'var(--color-primary)'      /* #a75911 — 5.15:1 ✅ */
                        : 'var(--color-text-secondary)' /* #5a3a2a — 8.94:1 ✅ */)
                      : 'var(--color-text-inverse)',              /* blanco sobre hero */
                    fontWeight: isActive ? 700 : 500,
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {/* Indicador de sección activa — usa fill naranja (decorativo, no texto) */}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: 'var(--color-primary-fill)' }}
                      aria-hidden="true"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={waLinkGeneric}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 focus-ring"
              style={isScrolled ? {
                /* ANTES: bg-gradient-primary text-light → naranja + blanco = 2.53:1 ❌
                   AHORA: naranja fill + texto oscuro = 6.63:1 ✅ */
                background: 'var(--color-primary-fill)',  /* #eb8b3a decorativo */
                color: 'var(--color-text-on-brand)', /* #2d1810 — 6.63:1 ✅ */
                boxShadow: 'var(--shadow-brand)',
              } : {
                background: 'rgba(255, 248, 240, 0.15)',
                color: 'var(--color-text-inverse)',
                border: '1.5px solid rgba(255, 248, 240, 0.35)',
              }}
              onMouseEnter={e => {
                if (isScrolled) {
                  e.currentTarget.style.background = 'var(--color-primary-fill-lt)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-brand-lg)';
                  e.currentTarget.style.transform = 'scale(1.04)';
                } else {
                  e.currentTarget.style.background = 'rgba(255, 248, 240, 0.28)';
                }
              }}
              onMouseLeave={e => {
                if (isScrolled) {
                  e.currentTarget.style.background = 'var(--color-primary-fill)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-brand)';
                  e.currentTarget.style.transform = 'scale(1)';
                } else {
                  e.currentTarget.style.background = 'rgba(255, 248, 240, 0.15)';
                }
              }}
              aria-label="Abrir chat de WhatsApp"
            >
              Chatea con nosotros
            </a>
          </div>
          <button
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg transition-all duration-300 focus-ring"
            style={{
              color: isScrolled ? 'var(--color-text-primary)' : 'var(--color-text-inverse)',
            }}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden backdrop-blur-md border-b animate-fade-in-down"
            style={{
              background: 'rgba(255, 255, 255, 0.97)',
              borderColor: 'var(--color-border-default)',
              boxShadow: 'var(--shadow-xl)',
            }}
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-3">
              {navLinks.map((link) => {
                const isActive = activeLink === link.href.substring(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 rounded-lg font-medium transition-all duration-300 hover-lift focus-ring"
                    style={isActive ? {
                      background: 'var(--color-primary-fill)',  /* naranja fill — decorativo */
                      color: 'var(--color-text-on-brand)', /* oscuro sobre naranja 6.63:1 ✅ */
                      boxShadow: 'var(--shadow-brand)',
                      fontWeight: 700,
                    } : {
                      background: 'var(--color-bg-surface)',
                      color: 'var(--color-text-primary)',   /* #2d1810 — 15.95:1 ✅ */
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                );
              })}

              {/* CTA mobile */}
              <a
                href={waLinkGeneric}
                target="_blank"
                rel="noreferrer"
                className="block w-full px-4 py-3 rounded-lg font-semibold text-center hover-lift focus-ring transition-all duration-300"
                style={{
                  background: 'var(--color-primary-fill)',  /* naranja decorativo */
                  color: 'var(--color-text-on-brand)', /* texto oscuro 6.63:1 ✅ */
                  boxShadow: 'var(--shadow-brand)',
                }}
                onClick={() => setIsOpen(false)}
                aria-label="Abrir chat de WhatsApp"
              >
                💬 Chatea con nosotros
              </a>
            </div>
          </div>
        )}
      </nav>
      <a
        href={waLinkGeneric}
        target="_blank"
        rel="noreferrer"
        title="Chatea con nosotros por WhatsApp"
        aria-label="Chatea con nosotros por WhatsApp"
        className="fixed-bubble animate-float"
      >
        <IoLogoWhatsapp size={28} color="#ffffff" />
      </a>
    </>
  );
};

export default Menu;