import { motion } from "framer-motion";

/**
 * SectionHeading — displays a mono eyebrow label + display heading
 *
 * @param {string}  eyebrow  - The mono label above the heading (e.g. "// 02. Projects")
 * @param {string}  title    - The main display heading
 * @param {string}  [align]  - "left" (default) | "center"
 * @param {boolean} [reducedMotion] - skip animations if true
 */
function SectionHeading({ eyebrow, title, align = "left", id }) {
  return (
    <div
      style={{
        marginBottom: "var(--space-7)",
        textAlign: align,
      }}
      id={id}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--font-mono-sm)",
            fontWeight: 500,
            color: "var(--color-accent)",
            marginBottom: "var(--space-3)",
            letterSpacing: "0.02em",
          }}
        >
          {eyebrow}
        </motion.span>
      )}

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          fontSize: "var(--font-display-lg)",
          fontWeight: 600,
          color: "var(--color-text-primary)",
          maxWidth: align === "center" ? "640px" : undefined,
          marginInline: align === "center" ? "auto" : undefined,
        }}
      >
        {title}
      </motion.h2>
    </div>
  );
}

export default SectionHeading;
