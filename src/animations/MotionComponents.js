import { motion } from 'framer-motion';

/**
 * ANIMACIONES REUTILIZABLES - Cumbre Café
 * Componentes de Framer Motion para efectos fluidos y premium
 */

// ============================================================================
// FADE ANIMATIONS
// ============================================================================

export const FadeIn = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay, duration, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInUp = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInDown = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInLeft = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInRight = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// SCALE ANIMATIONS
// ============================================================================

export const ScaleIn = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
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
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const StaggerContainer = ({ children, className = "" }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem = ({ children, className = "" }) => {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

// ============================================================================
// HOVER ANIMATIONS (Motion Div con efectos de hover)
// ============================================================================

export const HoverLift = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const HoverScale = ({ children, scale = 1.05, className = "" }) => {
  return (
    <motion.div
      whileHover={{ scale, transition: { duration: 0.3 } }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const HoverGlow = ({ children, className = "" }) => {
  return (
    <motion.div
      whileHover={{
        boxShadow: '0 20px 40px rgba(235, 139, 58, 0.3)',
        transition: { duration: 0.3 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// BUTTON ANIMATIONS
// ============================================================================

export const MotionButton = ({ children, onClick, className = "", ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// ============================================================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================================================

export const ScrollReveal = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      viewport={{ once: true, amount: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// ROTATING ANIMATIONS (Para elementos decorativos)
// ============================================================================

export const RotatingElement = ({ children, duration = 20, className = "" }) => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// PULSE ANIMATIONS
// ============================================================================

export const PulseElement = ({ children, duration = 2, className = "" }) => {
  return (
    <motion.div
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// FLOATING ANIMATIONS (Para elementos flotantes)
// ============================================================================

export const FloatingElement = ({ children, duration = 3, offset = 20, className = "" }) => {
  return (
    <motion.div
      animate={{ y: [0, -offset, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ============================================================================
// SHIMMER ANIMATION (Para loading/skeleton)
// ============================================================================

export const ShimmerLoader = ({ className = "" }) => {
  return (
    <motion.div
      className={`bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 ${className}`}
      animate={{
        backgroundPosition: ['0% 0%', '100% 0%'],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        backgroundSize: '200% 100%',
      }}
    />
  );
};

// ============================================================================
// SLIDE ANIMATIONS
// ============================================================================

export const SlideInFromLeft = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const SlideInFromRight = ({ children, delay = 0, duration = 0.6, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-100px' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
