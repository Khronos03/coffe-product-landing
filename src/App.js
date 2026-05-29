import { motion } from 'framer-motion';
import Menu from "./components/Menu";
import ProductImage from "./pages/ProductImage";
import ProductInfo from "./pages/ProductInfo";
import ProcessComparison from "./pages/ProcessComparison";
import About from "./pages/About";
import ImageModal from "./components/ImageModal";
import { useState, useEffect } from 'react';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Abrir el modal automáticamente cuando la página carga
  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <div className="App relative min-h-screen">
      {/* Modal de Imagen */}
      <ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Background Premium - Capa Fija */}
      <div className="app-background" aria-hidden="true">
        {/* Gradiente Base y Luces Ambientales */}
        <div className="ambient-light"></div>
        
        {/* Orbes Flotantes Animadas - Optimizadas para móvil */}
        {!isMobile && (
          <>
            <motion.div 
              className="orb-1"
              animate={{ 
                y: [0, -30, 0],
                x: [0, 20, 0],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
            />
            <motion.div 
              className="orb-2"
              animate={{ 
                y: [0, 40, 0],
                x: [0, -30, 0],
                opacity: [0.25, 0.4, 0.25]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
            />
            <motion.div 
              className="orb-3"
              animate={{ 
                y: [0, -20, 0],
                x: [0, 25, 0],
                opacity: [0.2, 0.35, 0.2]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
            />
            <motion.div 
              className="orb-4"
              animate={{ 
                y: [0, 35, 0],
                x: [0, -20, 0],
                opacity: [0.15, 0.3, 0.15]
              }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
              style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
            />
            <motion.div 
              className="orb-5"
              animate={{ 
                y: [0, -25, 0],
                x: [0, 30, 0],
                opacity: [0.1, 0.25, 0.1]
              }}
              transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
              style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
            />
          </>
        )}

        {/* Orbes simplificadas en móvil - solo opacity animation */}
        {isMobile && (
          <>
            <motion.div 
              className="orb-1"
              animate={{ opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transform: 'translateZ(0)', willChange: 'opacity' }}
            />
            <motion.div 
              className="orb-2"
              animate={{ opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{ transform: 'translateZ(0)', willChange: 'opacity' }}
            />
          </>
        )}
        
        {/* Grid Pattern Sutil */}
        <div className="grid-pattern"></div>
        
        {/* Noise Texture */}
        <div className="noise-overlay"></div>
        
        {/* Gradientes Decorativos Adicionales */}
        <div className="absolute inset-0 bg-gradient-to-b from-warm/5 via-transparent to-dark/5 opacity-40"></div>
      </div>

      {/* Contenido Principal - Sobre el Background */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navegación */}
        <Menu />
        
        {/* Contenido Principal */}
        <main id="main-content" role="main" className="flex-1">
          {/* Secciones */}
          <ProductImage />
          <ProductInfo />
          <ProcessComparison />
          <About />
        </main>
      </div>
    </div>
  );
}

export default App;
