import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";

const whatsappNumber = "573216363596";

const ProductCard = ({ title, imageSrc, variants, details, compact = false, badge }) => {
  const [index, setIndex] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);

  const prev = () => setIndex(i => (i === 0 ? variants.length - 1 : i - 1));
  const next = () => setIndex(i => (i === variants.length - 1 ? 0 : i + 1));

  const current = variants[index];
  const displayImageSrc = current?.imageSrc || imageSrc;
  const activeDetails = { ...(details || {}), ...(current?.details || {}) };

  const baseMessage = `¡Hola! 👋☕\nQuiero comprar ${title} en ${current.label}.`;
  const parts = [];
  if (activeDetails?.perfil) parts.push(`Perfil de taza: ${activeDetails.perfil}`);
  if (activeDetails?.tostion) parts.push(`Tostión: ${activeDetails.tostion}`);
  if (activeDetails?.proceso) parts.push(`Proceso: ${activeDetails.proceso}`);
  if (activeDetails?.notas) parts.push(`Notas: ${activeDetails.notas}`);
  if (current?.price) parts.push(`Precio actual: ${current.price}`);
  if (current?.oldPrice) parts.push(`Antes: ${current.oldPrice}`);

  const message = `${baseMessage}${parts.length ? "\n" + parts.join("\n") : ""}\n¿Me confirman disponibilidad y precio?`;
  const waLink = `https://wa.me/${whatsappNumber}/?text=${encodeURIComponent(message)}`;

  const hasDetails =
    activeDetails &&
    (activeDetails.perfil || activeDetails.tostion || activeDetails.proceso || activeDetails.notas);

  // Variantes de animación mejoradas
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.7, 
        ease: [0.23, 1, 0.320, 1] // Custom cubic-bezier para mejor easing
      }
    }
  };

  const imageVariants = {
    initial: { scale: 1.3 },
    hover: { 
      scale: 1.45, 
      transition: { duration: 0.5, ease: 'easeOut' } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (delay) => ({
      opacity: 1,
      y: 0,
      transition: { delay: delay * 0.1, duration: 0.4, ease: 'easeOut' }
    })
  };

  return (
    <motion.div 
      className="group w-full max-w-md"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Contenedor Principal — Card Clara */}
      <motion.div 
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: '#ffffff',
          border: '1.5px solid rgba(167,89,17,0.16)',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          height: 'clamp(400px, 55vh, 550px)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 4px 20px rgba(45,24,16,0.08)',
        }}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        {/* Glow Background Animado */}
        <motion.div 
          className="absolute -inset-12 blur-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(235,139,58,0.20) 0%, transparent 70%)',
          }}
        />

        {/* Sombra Dinámica en Hover */}
        <motion.div 
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: '0 24px 60px rgba(167,89,17,0.20), 0 8px 16px rgba(45,24,16,0.10)'
          }}
        />

        {/* Contenido Principal */}
        <div className="relative h-full flex flex-col overflow-hidden">
          
          {/* Badge Nuevo/Destacado */}
          {badge && (
            <motion.div
              className="absolute top-3 left-3 z-20 font-bold"
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                fontSize: '0.7rem',
                letterSpacing: '0.03em',
                background: 'var(--color-gift, #e0356f)',
                color: '#fff8f0',
                boxShadow: '0 6px 16px rgba(224,53,111,0.40)',
                border: '1.5px solid rgba(255,255,255,0.35)',
              }}
              initial={{ opacity: 0, scale: 0.7, y: -8 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.15 }}
            >
              {badge}
            </motion.div>
          )}

          {/* Sección de Imagen Premium */}
          <motion.div 
            className="relative w-full flex-1 overflow-hidden flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #fef3e2 0%, #fdf0d9 100%)',
            }}
            onHoverStart={() => setIsImageHovered(true)}
            onHoverEnd={() => setIsImageHovered(false)}
          >
            {/* Overlay Sutil Animado */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent"
              animate={{ opacity: isImageHovered ? 0.5 : 0.2 }}
              transition={{ duration: 0.4 }}
            />

            {/* Imagen Principal */}
            <motion.img
              src={displayImageSrc}
              alt={title}
              loading="lazy"
              decoding="async"
              className="relative z-10 h-full w-full object-contain"
              variants={imageVariants}
              initial="initial"
              whileHover="hover"
            />

          </motion.div>

          {/* Contenido Bajo la Imagen */}
          <div className="flex-shrink-0 flex flex-col gap-2 px-5 py-3 overflow-y-auto">
            
            {/* Título Premium */}
            <motion.h3 
              className="font-bold text-center text-base"
              style={{
                color: '#2d1810',
                margin: 0,
              }}
              custom={0}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
            >
              {title}
            </motion.h3>

            {/* Badges Sutiles */}
            {(activeDetails?.proceso || activeDetails?.tostion) && (
              <motion.div 
                className="flex items-center justify-center gap-2 flex-wrap"
                custom={1}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
              >
                {activeDetails?.proceso && (
                  <motion.span 
                    className="px-3 py-1 text-xs font-semibold rounded-full border"
                    style={{
                      background: 'rgba(235,139,58,0.12)',
                      color: '#8b4a0e',
                      borderColor: 'rgba(235,139,58,0.35)',
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {activeDetails.proceso}
                  </motion.span>
                )}
                {activeDetails?.tostion && (
                  <motion.span 
                    className="px-3 py-1 text-xs font-semibold rounded-full border"
                    style={{
                      background: 'rgba(235,139,58,0.12)',
                      color: '#8b4a0e',
                      borderColor: 'rgba(235,139,58,0.35)',
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {activeDetails.tostion}
                  </motion.span>
                )}
              </motion.div>
            )}

            {/* Detalles Compactos */}
            {hasDetails && !compact && (
              <motion.div 
                className="space-y-2 text-xs rounded-lg p-3"
                style={{
                  background: '#fef3e2',
                  border: '1px solid rgba(235,139,58,0.20)',
                  color: '#6f3c0b',
                }}
                custom={2}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
              >
                {activeDetails.perfil && (
                  <div>
                    <dt className="font-bold text-xs uppercase" style={{ color: '#a75911' }}>Perfil</dt>
                    <dd className="text-xs" style={{ color: '#6f3c0b' }}>{activeDetails.perfil}</dd>
                  </div>
                )}
                {activeDetails.notas && (
                  <div>
                    <dt className="font-bold text-xs uppercase" style={{ color: '#a75911' }}>Notas</dt>
                    <dd className="text-xs" style={{ color: '#6f3c0b' }}>{activeDetails.notas}</dd>
                  </div>
                )}
              </motion.div>
            )}

            {/* Selector de Variantes Premium */}
            <motion.div 
              className="flex items-center justify-between gap-2 mt-auto pt-2"
              style={{
                borderTop: '1px solid rgba(167,89,17,0.18)',
              }}
              custom={3}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
            >
              <motion.button 
                onClick={prev}
                aria-label="Variante anterior"
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  background: '#fef3e2',
                  color: '#a75911',
                  fontWeight: 700,
                  border: '1px solid rgba(235,139,58,0.30)',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(235,139,58,0.20)';
                  e.currentTarget.style.borderColor = 'rgba(235,139,58,0.50)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#fef3e2';
                  e.currentTarget.style.borderColor = 'rgba(235,139,58,0.30)';
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiChevronLeft size={18} />
              </motion.button>

              {/* Información de Variante */}
              <motion.div 
                className="text-center flex-1"
                key={`${index}-content`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="text-xs font-semibold uppercase tracking-wide mb-1"
                  style={{ color: '#8a6a52' }}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  {current.label}
                </motion.div>
                <motion.div 
                  className="flex justify-center gap-2 items-center"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, type: 'spring', stiffness: 120 }}
                >
                  {current.oldPrice && (
                    <motion.span 
                      className="text-xs font-semibold line-through"
                      style={{ color: 'rgba(138,106,82,0.6)' }}
                    >
                      {current.oldPrice}
                    </motion.span>
                  )}
                  {current.price && (
                    <motion.span 
                      className="text-lg font-black"
                      style={{ color: '#d4700a' }}
                      key={current.price}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, type: 'spring', stiffness: 100 }}
                    >
                      {current.price}
                    </motion.span>
                  )}
                </motion.div>
              </motion.div>

              <motion.button 
                onClick={next}
                aria-label="Siguiente variante"
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  background: '#fef3e2',
                  color: '#a75911',
                  fontWeight: 700,
                  border: '1px solid rgba(235,139,58,0.30)',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(235,139,58,0.20)';
                  e.currentTarget.style.borderColor = 'rgba(235,139,58,0.50)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#fef3e2';
                  e.currentTarget.style.borderColor = 'rgba(235,139,58,0.30)';
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiChevronRight size={18} />
              </motion.button>
            </motion.div>

            {/* CTA Comprar Premium */}
            <motion.a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                width: '100%',
                marginTop: '0.75rem',
                padding: 'clamp(0.75rem, 2vw, 0.95rem) clamp(1.5rem, 4vw, 2.25rem)',
                borderRadius: '1rem',
                fontWeight: 700,
                fontSize: 'clamp(0.90rem, 2vw, 1rem)',
                background: 'linear-gradient(135deg, #eb8b3a 0%, #d4700a 100%)',
                color: '#2d1810',
                boxShadow: '0 12px 32px rgba(235,139,58,0.35), 0 4px 12px rgba(45,24,16,0.20)',
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                border: '1px solid rgba(251,205,134,0.35)',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #f5a55a 0%, #eb8b3a 100%)';
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(235,139,58,0.45), 0 4px 16px rgba(45,24,16,0.25)';
                e.currentTarget.style.color = '#1a0e08';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #eb8b3a 0%, #d4700a 100%)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(235,139,58,0.35), 0 4px 12px rgba(45,24,16,0.20)';
                e.currentTarget.style.color = '#2d1810';
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Comprar ${title}`}
            >
              <FaShoppingCart size={18} />
              <span>Comprar Ahora</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
