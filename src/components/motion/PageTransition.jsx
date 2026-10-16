import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

/**
 * PageTransition — wraps page content with a fade + slide transition
 *
 * Use with AnimatePresence in App.jsx for route transitions
 */
function PageTransition({ children }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={
        prefersReduced
          ? { opacity: 1 }
          : { opacity: 0, y: 16 }
      }
      animate={{ opacity: 1, y: 0 }}
      exit={
        prefersReduced
          ? { opacity: 1 }
          : { opacity: 0, y: -8 }
      }
      transition={{
        duration: prefersReduced ? 0 : 0.24,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;

