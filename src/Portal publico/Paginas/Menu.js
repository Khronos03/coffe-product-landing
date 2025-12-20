import React, { useEffect, useState } from 'react';
import { IoLogoWhatsapp } from "react-icons/io";

const Menu = () => {
  const [activeLink, setActiveLink] = useState('');

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
    <nav className="fixed top-0 left-0 w-full bg-primary text-accent p-4 flex justify-center shadow-md z-50">
      <a href="#section1" className={`mx-4 rounded px-2 py-1 hover:bg-secondary hover:text-primary ${activeLink === 'section1' ? 'bg-secondary' : ''}`}>Comprar</a>
      <a href="#section2" className={`mx-4 rounded px-2 py-1 hover:bg-secondary hover:text-primary ${activeLink === 'section2' ? 'bg-secondary' : ''}`}>Perfiles</a>
      <a href="#section3" className={`mx-4 rounded px-2 py-1 hover:bg-secondary hover:text-primary ${activeLink === 'section3' ? 'bg-secondary' : ''}`}>Nosotros</a>
      <a href="" className={`mx-4 text-accent rounded px-2 py-1 hover:bg-secondary hover:text-primary`}>Ingresar al portal</a>
    </nav>
    <div className="fixed-bubble">
  <a href="https://wa.me/573216363596/?text=¡Hola! Me gustaría comprar café de especialidad." title='Chatea con nosotros'>
    <IoLogoWhatsapp size={38} color="green" />
  </a>
</div>
    </>
  );
};

export default Menu;