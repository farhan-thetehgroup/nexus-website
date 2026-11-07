import { motion } from "framer-motion";

const GlowBlob = ({ className = "", blurClass = "blur-3xl", ...rest }) => (
  <motion.div
    className={`absolute rounded-full ${blurClass} ${className}`}
    {...rest}
  />
);

/**
 * GlowField — one pooled ambient-light layer behind a section's content.
 *
 * Every blob intentionally overflows its section: Nexus sections drop
 * their own overflow-hidden (the page <main> keeps the only clip, at the
 * viewport rim), so a blob anchored at a seam (-top-* / -bottom-*) spills
 * across the boundary and the light reads as one continuous field passing
 * through the page instead of per-section wallpaper cut off at every seam.
 * Spilled light paints BEFORE the next section, so it glows through the
 * gaps of that section and stays behind its content.
 *
 * blobs: [{ className:  tailwind position/size/color classes (required),
 *           blurClass:  default "blur-3xl" (e.g. "blur-[120px]"),
 *           + any framer prop (style MotionValues, animate, transition) }]
 * children: custom animated bulbs rendered before the shared blobs.
 */
export const GlowField = ({
  className = "",
  style,
  children,
  blobs = [],
  ...rest
}) => (
  <motion.div
    className={`pointer-events-none absolute inset-0 ${className}`}
    style={style}
    {...rest}
  >
    {children}
    {blobs.map((blob, i) => (
      <GlowBlob key={i} {...blob} />
    ))}
  </motion.div>
);

export { GlowBlob };
export default GlowField;
