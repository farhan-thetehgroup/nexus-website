import { useEffect, useState } from "react";

/**
 * Types `text` out once, character by character, then leaves a blinking
 * caret — the Nexus hero typewriter (50ms/char), extracted as a reusable
 * block. Screen readers get the full text once; the animation is decorative.
 */
export const Typewriter = ({
  text,
  speed = 50,
  className = "",
  caretClassName = "",
}) => {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      index += 1;
      setTyped(text.slice(0, index));
      if (index >= text.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {typed}
        <span className={`tw-caret ml-0.5 ${caretClassName}`}>|</span>
      </span>
      <style>{`
        @keyframes tw-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .tw-caret {
          animation: tw-blink 1s step-end infinite;
        }
      `}</style>
    </span>
  );
};
