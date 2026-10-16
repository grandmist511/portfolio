/**
 * TechTag — JetBrains Mono pill badge for stack tags
 *
 * @param {string} label - e.g. "React", "Express.js", "Spring Boot"
 */
function TechTag({ label }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 12px",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--font-mono-sm)",
        fontWeight: 500,
        color: "var(--color-accent-deep)",
        backgroundColor: "var(--color-accent-tint-10)",
        borderRadius: "var(--radius-sm)",
        lineHeight: 1.4,
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </span>
  );
}

export default TechTag;
