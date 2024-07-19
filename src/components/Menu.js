import React, { useEffect, useState } from 'react';

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
    <nav className="fixed top-0 left-0 w-full bg-primary text-white p-4 flex justify-center shadow-md z-50">
      <a href="#section1" className={`mx-4 text-accent rounded px-2 py-1 hover:bg-secondary ${activeLink === 'section1' ? 'bg-secondary' : ''}`}>Calidad</a>
      <a href="#section2" className={`mx-4 text-accent rounded px-2 py-1 hover:bg-secondary ${activeLink === 'section2' ? 'bg-secondary' : ''}`}>Características</a>
      <a href="#section3" className={`mx-4 text-accent rounded px-2 py-1 hover:bg-secondary ${activeLink === 'section3' ? 'bg-secondary' : ''}`}>Comprar</a>
    </nav>
  );
};

export default Menu;
