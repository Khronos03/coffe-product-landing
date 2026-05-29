import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import '../styles/ImageModal.css';

function ImageModal({ isOpen, onClose }) {
  const WHATSAPP_NUMBER = "573216363596";
  
  const handleImageClick = () => {
    const message = "Hola, me interesa el producto Cuarteron 5 lbs";
    const waLink = `https://wa.me/${WHATSAPP_NUMBER}/?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const contentVariants = {
    hidden: { scale: 0.8, opacity: 0, y: -50 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: 'easeOut'
      }
    },
    exit: { 
      scale: 0.8, 
      opacity: 0, 
      y: -50,
      transition: { duration: 0.2 }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { delay: 0.2, duration: 0.3 }
    },
    hover: { scale: 1.1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Content */}
          <motion.div
            className="modal-overlay"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              className="modal-content"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Badge */}
              <motion.button
                className="close-badge"
                onClick={onClose}
                variants={badgeVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                aria-label="Cerrar modal"
              >
                ✕
              </motion.button>

              {/* Modal Image */}
              <div className="modal-image-container">
                <img 
                  src={require('../ImageModal.png')} 
                  alt="Oferta especial de café Cuarteron 5 lbs - Haz clic para solicitar"
                  className="modal-image"
                  onClick={handleImageClick}
                  role="button"
                  tabIndex="0"
                  onKeyPress={(e) => e.key === 'Enter' && handleImageClick()}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ImageModal;
