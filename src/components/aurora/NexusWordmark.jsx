/**
 * NEXUS wordmark with the light streak from the 2027 key visual.
 * `variant`: "solid" (luminous) or "outline" (editorial stroke treatment).
 */
export const NexusWordmark = ({
  className = "",
  variant = "solid",
  streak = true,
  motion = true,
}) => (
  <span className={`nx-wordmark nx-wordmark--${variant} ${className}`}>
    <span className="nx-wordmark__text">NEXUS</span>
    {streak && motion && (
      <span aria-hidden="true" className="nx-wordmark__streak" />
    )}
  </span>
);
