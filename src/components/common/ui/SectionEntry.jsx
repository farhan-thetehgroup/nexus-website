import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Shared section-entry vocabulary — one easing, one timing family for every
 * section (eyebrow, title, copy, content). Replaces the old per-section
 * pop/rotate/spring animations.
 *
 *   const entry = useSectionEntry();
 *   <motion.div {...entry.fade(0)} />       eyebrow: short fade-up
 *   <MaskedLine delay={0.1}>Title</MaskedLine>   title: masked line-rise
 *   <motion.p {...entry.fade(0.2, 16)} />   copy: smaller rise, later
 *
 * Stagger ladder: eyebrow 0ms -> title 100ms -> copy 220ms -> content 340ms.
 */

const EASE = [0.16, 1, 0.3, 1];
const VIEWPORT = { once: true, amount: 0.3 };

export const useSectionEntry = () => {
  /**
   * @param {number} delay seconds
   * @param {number} distance px of the initial offset
   */
  const fade = (delay = 0, distance = 20, duration = 0.8) => ({
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration, ease: EASE, delay },
  });

  /** Accent rule that draws itself next to the eyebrow. */
  const draw = (delay = 0) => ({
    initial: { scaleX: 0 },
    whileInView: { scaleX: 1 },
    viewport: VIEWPORT,
    transition: { duration: 0.7, ease: EASE, delay },
  });

  /** Cards/grids: fade-up with a small per-index stagger. */
  const rise = (delay = 0, distance = 26) => ({
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: 0.85, ease: EASE, delay },
  });

  return { fade, draw, rise, EASE, VIEWPORT };
};

/** Title line that rises out of a clipping mask (editorial reveal). */
export const MaskedLine = ({ children, delay = 0.1, className = "" }) => {
  // The observer sits on the OUTER wrapper: the inner span is translated
  // 115% out of the clip box, and IntersectionObserver treats a fully
  // clipped element as never-in-view (whileInView on it never fires).
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.span ref={ref} className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: "115%" }}
        animate={inView ? { y: "0%" } : undefined}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
};

/** Slide used by card grids (x-offset variants collapse to y). */
export const gridSlide = (index = 0, base = 0.1) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.85, ease: EASE, delay: base + index * 0.08 },
});
