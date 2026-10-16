import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

/**
 * RevealOnScroll — wraps children with a fade-in-up animation triggered on scroll
 *
 * @param {object}   [props]
 * @param {number}   [props.delay] - stagger delay in seconds
 * @param {'up'|'down'|'left'|'right'|'none'} [props.direction]
 * @param {number}   [props.distance] - pixel distance (default 24)
 */
function RevealOnScroll({
  children,
  delay = 0,
  direction = "up",
  distance = 24,
  style,
  className,
  as = "div",
}) {
  const prefersReduced = useReducedMotion();

  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const hidden = prefersReduced
    ? { opacity: 1 }
    : { opacity: 0, ...directionMap[direction] };

  const visible = { opacity: 1, x: 0, y: 0 };

  const MotionTag = motion[as];

  return (
    <MotionTag
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: prefersReduced ? 0 : 0.4,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      style={style}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

export default RevealOnScroll;

