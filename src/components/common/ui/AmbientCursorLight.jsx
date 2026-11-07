import { useEffect, useRef } from "react";

/**
 * AmbientCursorLight — one page-wide pool of light that drifts after the
 * pointer across every section, so the shared glow field visibly
 * interacts with glass panes, chips and headings everywhere instead of
 * stopping at a section boundary (mix-blend-screen lifts whatever sits
 * under it — background, frost, text rim — like a soft torch in fog).
 * Pointer-fine + motion-safe only; renders nothing otherwise.
 * Pure CSS vars + rAF lerp: no re-renders. The pool starts far
 * off-screen and fades to full strength after the first pointer move.
 */
export const AmbientCursorLight = ({ className = "" }) => {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let targetX = -1200;
    let targetY = -1200;
    let x = targetX;
    let y = targetY;
    let raf = 0;
    let entered = false;

    const move = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!entered) {
        // First contact: start the drawn position at the pointer so the
        // pool drifts in from where the cursor is, not from off-screen.
        x = targetX;
        y = targetY;
        layer.classList.add("nx-ambient-light--on");
        entered = true;
      }
    };

    const tick = () => {
      x += (targetX - x) * 0.075;
      y += (targetY - y) * 0.075;
      layer.style.setProperty("--nx-light-x", `${x.toFixed(1)}px`);
      layer.style.setProperty("--nx-light-y", `${y.toFixed(1)}px`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden
      className={`nx-ambient-light pointer-events-none fixed inset-0 z-30 ${className}`}
    >
      <div className="nx-ambient-light__pool absolute left-0 top-0 h-[920px] w-[920px] rounded-full" />
      <style>{`
        .nx-ambient-light {
          --nx-light-x: -60rem;
          --nx-light-y: -60rem;
        }
        .nx-ambient-light__pool {
          transform: translate3d(var(--nx-light-x), var(--nx-light-y), 0)
            translate(-50%, -50%);
          background: radial-gradient(
            circle at center,
            rgba(47, 233, 141, 0.075) 0%,
            rgba(34, 211, 238, 0.045) 34%,
            transparent 68%
          );
          mix-blend-mode: screen;
          will-change: transform;
        }
        .nx-ambient-light--on {
          animation: nx-ambient-fade 1.2s ease-out both;
        }
        @keyframes nx-ambient-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .nx-ambient-light {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AmbientCursorLight;
