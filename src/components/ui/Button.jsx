import { motion } from "framer-motion";
import { Link } from "react-router";

const MotionLink = motion.create(Link);

/**
 * Button — Primary (gradient) and Secondary variants
 *
 * @param {'primary'|'secondary'} variant
 * @param {string}  size - "sm" | "md" | "lg"
 * @param {boolean} [asLink] - render as an in-app link
 * @param {string}  [href] - route for link variant
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  asLink,
  href,
  onClick,
  type = "button",
  className,
  style: extraStyle,
  ...rest
}) {
  const sizes = {
    sm: { padding: "8px 16px", fontSize: "var(--font-body-sm)" },
    md: { padding: "12px 24px", fontSize: "var(--font-body-md)" },
    lg: { padding: "16px 32px", fontSize: "var(--font-body-lg)" },
  };

  const baseStyle = {
    ...sizes[size],
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    border: "none",
    textDecoration: "none",
    transition: "all var(--duration-fast) var(--ease-out-soft)",
    whiteSpace: "nowrap",
  };

  const variants = {
    primary: {
      background: "var(--gradient-accent)",
      color: "#FFFFFF",
      boxShadow: "var(--glow-accent)",
    },
    secondary: {
      background: "transparent",
      color: "var(--color-text-primary)",
      border: "1px solid var(--color-border)",
    },
  };

  const style = { ...baseStyle, ...variants[variant], ...extraStyle };

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring", stiffness: 300, damping: 20 },
    style,
  };

  if (asLink && href) {
    return (
      <MotionLink
        to={href}
        className={className}
        {...motionProps}
        {...rest}
      >
        {children}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={className}
      {...motionProps}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

export default Button;
