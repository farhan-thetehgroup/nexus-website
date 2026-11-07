import { useId } from "react";

/**
 * NEXUS wordmark drawn with the exact letterform paths of the brand logo
 * (public/images/brand-logo/nexus-green.svg), so the hero renders the real
 * vector letters instead of a font approximation.
 * `variant`: "solid" (luminous) or "outline" (editorial stroke treatment).
 * `beam`: horizontal light ray locked to the second bar of the E — it
 * stretches out from that bar once on entrance (when `motion` is on) and
 * then keeps glowing.
 */

// Second bar of the E in the 822x131 viewBox: y 58.7168 -> 70.2046,
// x 182.116 -> 291.601. The beam is centered on that bar's center line.
const E_BAR_CENTER_Y = 64.4607;
const E_BAR_CENTER_X = 236.8585;
const BEAM_WIDTH = 822;

export const NexusWordmarkSvg = ({
  className = "",
  variant = "solid",
  beam = true,
  motion = true,
}) => {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const beamGradId = `nx-beam-grad-${uid}`;
  const beamHotId = `nx-beam-hot-${uid}`;

  return (
    <span
      className={`nx-wordmark-svg nx-wordmark-svg--${variant} ${className}`}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        fill="none"
        viewBox="0 0 822 131"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="nx-wordmark-svg__letters">
          {/* N */}
          <path d="M101.561 105.084L19.9214 7.69238C17.1703 4.41159 13.1074 2.51634 8.8259 2.51634C4.01591 2.51634 0.116699 6.4143 0.116699 11.2243V129.233H13.1949V18.864L101.561 124.278V105.084Z" />
          <path d="M108.101 2.51634V52.1004V112.885V129.233H121.179V2.51634H108.101Z" />
          {/* E — three detached bars, second one carries the light beam */}
          <path d="M195.194 58.7168H182.116V70.2046H195.194H220.374H291.601V58.7168H220.374H195.194Z" />
          <path d="M195.194 14.0034H220.374H291.601V2.51567H182.116V14.0034H195.194Z" />
          <path d="M220.374 117.745H195.194H182.116V129.233H292.484V117.745H220.374Z" />
          {/* X */}
          <path d="M411.124 72.4136L360.315 129.233H343.701L403.083 63.0472L348.914 2.51635H365.528L411.124 53.7683L456.72 2.51635H473.334L419.165 63.0472L478.548 129.233H461.934L411.124 72.4136Z" />
          {/* U */}
          <path d="M636.687 73.2969V2.51636H649.765V73.2969C649.765 109.438 628.822 130.999 589.323 130.999C549.735 130.999 528.792 109.438 528.792 73.2969V2.51636H541.87V73.2969C541.87 102.723 556.098 119.513 589.323 119.513C622.194 119.513 636.687 102.723 636.687 73.2969Z" />
          {/* S */}
          <path d="M808.435 21.868C804.812 20.1002 800.659 18.5098 795.975 17.0967C787.934 14.7105 776.623 12.2355 762.573 12.2355C735.444 12.2355 722.012 18.5985 722.012 34.0629C722.012 47.1411 732.882 52.7081 765.401 57.2145C801.72 62.1632 821.248 72.2367 821.248 95.3884C821.248 118.717 803.397 131 765.931 131C744.193 131 729.083 127.288 719.363 123.754C713.618 121.633 709.023 119.158 705.4 116.42L712.557 106.787C716.269 109.174 720.776 111.294 726.078 113.15C735.003 116.331 748.346 119.512 765.931 119.512C796.947 119.512 807.993 109.527 807.993 95.3884C807.993 80.8959 795.71 74.2694 763.191 69.7617C723.515 64.3721 708.758 53.2379 708.758 34.0629C708.758 14.8866 722.279 0.749029 762.573 0.749029C780.599 0.749029 793.678 3.66501 802.514 6.49228C807.639 8.1714 811.969 10.1154 815.592 12.2355L808.435 21.868Z" />
        </g>

        {beam && (
          <g
            className={`nx-wordmark-svg__beam${
              motion ? " nx-wordmark-svg__beam--motion" : ""
            }`}
          >
            <g
              className={`nx-wordmark-svg__beam-pulse${
                motion ? " nx-wordmark-svg__beam-pulse--motion" : ""
              }`}
            >
              <defs>
                <linearGradient
                  gradientUnits="userSpaceOnUse"
                  id={beamGradId}
                  x1="0"
                  x2={BEAM_WIDTH}
                  y1="0"
                  y2="0"
                >
                  <stop offset="0" stopColor="#d6ffec" stopOpacity="0" />
                  <stop offset="0.14" stopColor="#d6ffec" stopOpacity="0.3" />
                  <stop
                    offset={E_BAR_CENTER_X / BEAM_WIDTH}
                    stopColor="#f4fffb"
                    stopOpacity="0.95"
                  />
                  <stop offset="0.52" stopColor="#d6ffec" stopOpacity="0.4" />
                  <stop offset="0.85" stopColor="#d6ffec" stopOpacity="0.14" />
                  <stop offset="1" stopColor="#d6ffec" stopOpacity="0" />
                </linearGradient>
                <radialGradient
                  cx={E_BAR_CENTER_X}
                  cy={E_BAR_CENTER_Y}
                  gradientUnits="userSpaceOnUse"
                  id={beamHotId}
                  r="60"
                >
                  <stop offset="0" stopColor="#f4fffb" stopOpacity="0.9" />
                  <stop offset="0.5" stopColor="#d6ffec" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#d6ffec" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* soft outer glow, hot core, then the emanation point on the bar */}
              <rect
                fill={`url(#${beamGradId})`}
                height="20"
                opacity="0.4"
                width={BEAM_WIDTH}
                x="0"
                y={E_BAR_CENTER_Y - 10}
              />
              <rect
                fill={`url(#${beamGradId})`}
                height="10"
                opacity="0.7"
                width={BEAM_WIDTH}
                x="0"
                y={E_BAR_CENTER_Y - 5}
              />
              <rect
                fill={`url(#${beamGradId})`}
                height="1.6"
                width={BEAM_WIDTH}
                x="0"
                y={E_BAR_CENTER_Y - 0.8}
              />
              <ellipse
                cx={E_BAR_CENTER_X}
                cy={E_BAR_CENTER_Y}
                fill={`url(#${beamHotId})`}
                rx="60"
                ry="14"
              />
            </g>
          </g>
        )}
      </svg>
    </span>
  );
};
