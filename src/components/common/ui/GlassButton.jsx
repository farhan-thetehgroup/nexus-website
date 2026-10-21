/**
 * Frosted-glass action pill shared by navbar and hero CTAs.
 * `tone`: "neutral" (white frost) or "emerald" (accent-tinted frost).
 * Sizes/labels come from children + className; the material lives here so
 * every button reads as the same glass.
 */
export const GlassButton = ({
  as: Tag = "button",
  type = "button",
  href,
  onClick,
  target,
  className = "",
  tone = "neutral",
  style,
  children,
  disabled,
  // Everything else ("aria-label", "name", data-*, ...) falls through to
  // the rendered tag so call sites never lose attribute forwarding.
  ...rest
}) => {
  const tones = {
    neutral:
      "border-white/15 bg-white/[0.08] hover:border-white/30 hover:bg-white/[0.15]",
    emerald:
      "border-[#3dffa2]/30 bg-[#3dffa2]/[0.10] hover:border-[#3dffa2]/60 hover:bg-[#3dffa2]/[0.18]",
  };

  return (
    <Tag
      className={`group inline-flex items-center rounded-full backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_10px_36px_rgba(2,8,20,0.35)] transition-colors duration-300 ${
        tones[tone]
      } ${className}`}
      {...(Tag === "a"
        ? { href, target, rel: target ? "noopener,noreferrer" : undefined }
        : { type, disabled })}
      onClick={onClick}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
};
