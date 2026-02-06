import React, { useEffect, useState } from 'react';
import { IoLogoWhatsapp } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";

const WHATSAPP_NUMBER = "573216363596";
const genericMessage = "¡Hola! 👋☕\nEstoy interesado(a) en conocer y comprar café de especialidad Cumbre Café.\n¿Podrían brindarme información sobre variedades, procesos y precios disponibles?";
const waLinkGeneric = `https://wa.me/${WHATSAPP_NUMBER}/?text=${encodeURIComponent(genericMessage)}`;

const Menu = () => {
  const [activeLink, setActiveLink] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = '';

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 60) {
          currentSection = section.getAttribute('id');
        }
      });

      setActiveLink(currentSection);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-primary text-accent shadow-md z-50" aria-label="Navegación principal">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center">
          <div className="flex-shrink-0">
            <a href="/">
              <img src="/cumbreCafeHeader.webp" alt="Logo Cumbre Café" className="h-12 md:h-14 w-auto object-contain" />
            </a>
          </div>

          <div className="hidden md:block flex-1 text-center font-semibold tracking-wide">
            BIENVENIDOS
          </div>

          <div className="hidden md:flex items-center justify-end">
            <a href="#section1" aria-current={activeLink === 'section1' ? 'page' : undefined} className={`mx-2 rounded px-3 py-1 hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${activeLink === 'section1' ? 'bg-secondary text-primary' : ''}`}>Comprar</a>
            <a href="#section2" aria-current={activeLink === 'section2' ? 'page' : undefined} className={`mx-2 rounded px-3 py-1 hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${activeLink === 'section2' ? 'bg-secondary text-primary' : ''}`}>Perfiles</a>
            <a href="#section3" aria-current={activeLink === 'section3' ? 'page' : undefined} className={`mx-2 rounded px-3 py-1 hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${activeLink === 'section3' ? 'bg-secondary text-primary' : ''}`}>Nosotros</a>
            <a href={waLinkGeneric} className={`mx-2 text-accent rounded px-3 py-1 hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary`} target="_blank" rel="noreferrer" aria-label="Abrir chat de WhatsApp">Escríbenos</a>
          </div>

          <div className="md:hidden ml-auto">
            <button
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded bg-secondary/20 hover:bg-secondary/30 text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-secondary/30 bg-primary/95">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col items-center gap-2">
              <a href="#section1" aria-current={activeLink === 'section1' ? 'page' : undefined} onClick={() => setIsOpen(false)} className={`w-full text-center rounded px-3 py-2 hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${activeLink === 'section1' ? 'bg-secondary text-primary' : ''}`}>Comprar</a>
              <a href="#section2" aria-current={activeLink === 'section2' ? 'page' : undefined} onClick={() => setIsOpen(false)} className={`w-full text-center rounded px-3 py-2 hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${activeLink === 'section2' ? 'bg-secondary text-primary' : ''}`}>Perfiles</a>
              <a href="#section3" aria-current={activeLink === 'section3' ? 'page' : undefined} onClick={() => setIsOpen(false)} className={`w-full text-center rounded px-3 py-2 hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary ${activeLink === 'section3' ? 'bg-secondary text-primary' : ''}`}>Nosotros</a>
              <a href={waLinkGeneric} onClick={() => setIsOpen(false)} className={`w-full text-center rounded px-3 py-2 hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary`} target="_blank" rel="noreferrer" aria-label="Abrir chat de WhatsApp">Escríbenos</a>
            </div>
          </div>
        )}
      </nav>

      <div className="fixed-bubble">
        <a href={waLinkGeneric} title='Chatea con nosotros' target="_blank" rel="noreferrer" aria-label="Chatea con nosotros por WhatsApp">
          <IoLogoWhatsapp size={38} color="green" />
        </a>
      </div>
    </>
  );
};

export default Menu;