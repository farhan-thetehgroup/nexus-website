import { useEffect, useRef } from "react";

/**
 * Soft light that follows the pointer while it is inside the host card.
 * Self-contained: the component owns its CSS as inline styles and listens
 * on the parent element, so no global stylesheet or host class is needed.
 *
 * The card itself carries NO glow of its own — the light appears only
 * under the cursor and fades out when the pointer leaves.
 */
export const CursorSpotlight = ({
  color = "rgba(255, 255, 255, 0.12)",
  fadeColor = "rgba(255, 255, 255, 0.05)",
  size = 260,
  above = false,
}) => {
  const spotRef = useRef(null);

  useEffect(() => {
    const el = spotRef.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    const handleMove = (e) => {
      const rect = host.getBoundingClientRect();
      el.style.setProperty("--nx-spot-x", `${e.clientX - rect.left}px`);
      el.style.setProperty("--nx-spot-y", `${e.clientY - rect.top}px`);
    };
    const handleEnter = () => {
      el.style.opacity = "1";
    };
    const handleLeave = () => {
      el.style.opacity = "0";
    };

    host.addEventListener("mousemove", handleMove);
    host.addEventListener("mouseenter", handleEnter);
    host.addEventListener("mouseleave", handleLeave);
    return () => {
      host.removeEventListener("mousemove", handleMove);
      host.removeEventListener("mouseenter", handleEnter);
      host.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <span
      ref={spotRef}
      aria-hidden="true"
      className={`nx-card-spot pointer-events-none absolute inset-0 ${
        above ? "z-10 mix-blend-screen" : ""
      }`}
      style={{
        background: `radial-gradient(${size}px circle at var(--nx-spot-x, 50%) var(--nx-spot-y, 50%), ${color}, ${fadeColor} 42%, transparent 72%)`,
        opacity: 0,
        transition: "opacity 0.3s ease",
      }}
    />
  );
};
