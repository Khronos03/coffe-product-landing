import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";

const whatsappNumber = "573216363596";

const ProductCard = ({ title, imageSrc, variants, details, compact = false }) => {
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

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <motion.div 
      className="group w-full max-w-md"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Contenedor con Glass Effect */}
      <motion.div 
        className="relative rounded-2xl overflow-hidden shadow-premium-lg h-full"
        whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(235, 139, 58, 0.15)' }}
        transition={{ duration: 0.3 }}
      >
        
        {/* Fondo Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-br from-light via-surface to-warm/10 opacity-60"></div>
        
        {/* Borde Gradiente */}
        <motion.div 
          className="absolute inset-0 rounded-2xl border border-primary/20 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />

        {/* Contenido */}
        <div className="relative backdrop-blur-sm rounded-2xl border border-light/40 h-full flex flex-col overflow-hidden">
          
          {/* Imagen Section */}
          <motion.div 
            className="relative w-full aspect-[4/3] overflow-hidden flex items-center justify-center bg-gradient-to-br from-surface to-warm/20"
            onHoverStart={() => setIsImageHovered(true)}
            onHoverEnd={() => setIsImageHovered(false)}
          >
            {/* Overlay decorativo */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-dark/5 to-transparent"
              animate={{ opacity: isImageHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            <motion.img
              src={displayImageSrc}
              alt={title}
              loading="lazy"
              decoding="async"
              className="relative z-10 max-h-full max-w-full object-contain"
              variants={imageVariants}
              initial="initial"
              whileHover="hover"
            />

            {/* Badge - Descuento */}
            {current?.oldPrice && (
              <motion.div 
                className="absolute top-3 right-3 px-3 py-1 bg-gradient-primary text-light text-xs font-bold rounded-full shadow-premium-lg"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Oferta
              </motion.div>
            )}
          </motion.div>

          {/* Contenido */}
          <div className={`flex-1 flex flex-col gap-3 ${compact ? "px-3 py-4" : "px-5 py-6"}`}>
            
            {/* Título */}
            <motion.h3 
              className={`font-bold text-center text-gradient ${compact ? "text-base" : "text-xl"}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {title}
            </motion.h3>

            {/* Badges */}
            {(activeDetails?.proceso || activeDetails?.tostion) && (
              <motion.div 
                className="flex items-center justify-center gap-2 flex-wrap"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
              >
                {activeDetails?.proceso && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/15 text-primary border border-primary/30">
                    {activeDetails.proceso}
                  </span>
                )}
                {activeDetails?.tostion && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent/15 text-accent border border-accent/30">
                    Tostión: {activeDetails.tostion}
                  </span>
                )}
              </motion.div>
            )}

            {/* Detalles */}
            {hasDetails && !compact && (
              <motion.div 
                className="space-y-2 text-sm text-textLight bg-light/30 rounded-lg p-3 backdrop-blur-sm"
                initial={{ opacity: 0, height: 0 }}
                whileInView={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.2 }}
              >
                {activeDetails.perfil && (
                  <div>
                    <dt className="font-semibold text-primary">Perfil</dt>
                    <dd className="text-text">{activeDetails.perfil}</dd>
                  </div>
                )}
                {activeDetails.notas && (
                  <div>
                    <dt className="font-semibold text-primary">Notas</dt>
                    <dd className="text-text">{activeDetails.notas}</dd>
                  </div>
                )}
              </motion.div>
            )}

            {/* Selector de Variantes */}
            <div className="flex items-center justify-between gap-3 mt-auto pt-2 border-t border-primary/10">
              <motion.button 
                onClick={prev}
                aria-label="Variante anterior"
                className="p-2 rounded-lg bg-light/50 hover:bg-primary/20 text-primary transition-all duration-300 focus-ring"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiChevronLeft size={18} />
              </motion.button>

              <motion.div 
                className="text-center flex-1"
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs font-bold text-textLight uppercase tracking-wide">
                  {current.label}
                </div>
                <div className="flex justify-center gap-2 items-center mt-1">
                  {current.oldPrice && (
                    <span className="text-xs line-through text-textLight/50">
                      {current.oldPrice}
                    </span>
                  )}
                  {current.price && (
                    <motion.span 
                      className="text-lg font-black text-primary"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, type: 'spring' }}
                    >
                      {current.price}
                    </motion.span>
                  )}
                </div>
              </motion.div>

              <motion.button 
                onClick={next}
                aria-label="Siguiente variante"
                className="p-2 rounded-lg bg-light/50 hover:bg-primary/20 text-primary transition-all duration-300 focus-ring"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiChevronRight size={18} />
              </motion.button>
            </div>

            {/* CTA Comprar */}
            <motion.a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="w-full mt-4 inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl gradient-primary text-light font-bold shadow-premium focus-ring"
              whileHover={{ scale: 1.05, boxShadow: '0 16px 48px rgba(167, 89, 17, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Comprar ${title}`}
            >
              <FaShoppingCart size={18} />
              <span>Comprar</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
