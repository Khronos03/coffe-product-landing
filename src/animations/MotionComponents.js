import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * ANIMACIONES REUTILIZABLES - Cumbre Café
 * Componentes de Framer Motion para efectos fluidos y premium
 * OPTIMIZADOS PARA MÓVILES CON DETECCIÓN DE PANTALLA
 */

// ============================================================================
// UTILITY: Detección de pantalla y optimización
// ============================================================================

const getOptimizedDuration = (desktopDuration) => {
  if (typeof window === 'undefined') return desktopDuration;
  return window.innerWidth < 768 ? desktopDuration * 0.6 : desktopDuration;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// ============================================================================
// FADE ANIMATIONS
// ============================================================================

export const FadeIn = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  const isMobile = useIsMobile();
  const optimizedDuration = isMobile ? duration * 0.6 : duration;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay, duration: optimizedDuration, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
};

export const FadeInUp = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  const isMobile = useIsMobile();
  const optimizedDuration = isMobile ? duration * 0.6 : duration;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: optimizedDuration, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
      style={{ transform: 'translateZ(0)', willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
};

export const FadeInDown = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  const isMobile = useIsMobile();
  const optimizedDuration = isMobile ? duration * 0.6 : duration;

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: optimizedDuration, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
};

export const FadeInLeft = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  const isMobile = useIsMobile();
  const optimizedDuration = isMobile ? duration * 0.6 : duration;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: optimizedDuration, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
};

export const FadeInRight = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  const isMobile = useIsMobile();
  const optimizedDuration = isMobile ? duration * 0.6 : duration;

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: optimizedDuration, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// SCALE ANIMATIONS
// ============================================================================

export const ScaleIn = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  const isMobile = useIsMobile();
  const optimizedDuration = isMobile ? duration * 0.6 : duration;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: optimizedDuration, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// STAGGER ANIMATIONS (para listas)
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export const StaggerContainer = ({ children, className = "" }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={className}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "" }) => {
  return (
    <motion.div 
      variants={itemVariants} 
      className={className}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// HOVER ANIMATIONS (Motion Div con efectos de hover)
// ============================================================================

export const HoverLift = ({ children, className = "" }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      whileHover={!isMobile ? { y: -10, transition: { duration: 0.3 } } : {}}
      className={className}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
};

export const HoverScale = ({ children, scale = 1.05, className = "" }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      whileHover={!isMobile ? { scale, transition: { duration: 0.3 } } : {}}
      className={className}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
};

export const HoverGlow = ({ children, className = "" }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      whileHover={!isMobile ? {
        boxShadow: '0 20px 40px rgba(235, 139, 58, 0.3)',
        transition: { duration: 0.3 },
      } : {}}
      className={className}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// BUTTON ANIMATIONS
// ============================================================================

export const MotionButton = ({ children, onClick, className = "", ...props }) => {
  const isMobile = useIsMobile();

  return (
    <motion.button
      whileHover={!isMobile ? { scale: 1.05 } : {}}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={className}
      {...props}
      style={{ transform: 'translateZ(0)', ...props.style }}
    >
      {children}
    </motion.button>
  );
};

// ============================================================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================================================

export const ScrollReveal = ({ children, delay = 0, className = "" }) => {
  const isMobile = useIsMobile();
  const optimizedDuration = isMobile ? 0.42 : 0.7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: optimizedDuration, ease: [0.21, 0.47, 0.32, 0.98] }}
      viewport={{ once: true, amount: 0.3 }}
      className={className}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// ROTATING ANIMATIONS (Para elementos decorativos)
// ============================================================================

export const RotatingElement = ({ children, duration = 20, className = "" }) => {
  const isMobile = useIsMobile();
  const optimizedDuration = isMobile ? duration * 1.5 : duration; // Más lento en móvil

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration: optimizedDuration,
        repeat: Infinity,
        ease: 'linear',
      }}
      className={className}
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// PULSE ANIMATIONS
// ============================================================================

export const PulseElement = ({ children, duration = 2, className = "" }) => {
  const isMobile = useIsMobile();
  const optimizedDuration = isMobile ? duration * 1.3 : duration;

  return (
    <motion.div
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{
        duration: optimizedDuration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// FLOATING ANIMATIONS (Para elementos flotantes - optimizado para móvil)
// ============================================================================

export const FloatingElement = ({ children, duration = 3, offset = 20, className = "" }) => {
  const isMobile = useIsMobile();
  const optimizedDuration = isMobile ? duration * 1.5 : duration;
  const optimizedOffset = isMobile ? offset * 0.6 : offset; // Menos movimiento en móvil

  return (
    <motion.div
      animate={{ y: [0, -optimizedOffset, 0] }}
      transition={{
        duration: optimizedDuration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// SHIMMER ANIMATION (Para loading/skeleton)
// ============================================================================

export const ShimmerLoader = ({ className = "" }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 ${className}`}
      animate={{
        backgroundPosition: ['0% 0%', '100% 0%'],
      }}
      transition={{
        duration: isMobile ? 1.5 : 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        backgroundSize: '200% 100%',
        transform: 'translateZ(0)',
      }}
    />
  );
};

// ============================================================================
// SLIDE ANIMATIONS
// ============================================================================

export const SlideInFromLeft = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  const isMobile = useIsMobile();
  const optimizedDuration = isMobile ? duration * 0.6 : duration;

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: optimizedDuration, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
};

export const SlideInFromRight = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  const isMobile = useIsMobile();
  const optimizedDuration = isMobile ? duration * 0.6 : duration;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: optimizedDuration, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
};
