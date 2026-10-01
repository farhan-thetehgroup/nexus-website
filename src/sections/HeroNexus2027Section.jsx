import { AuroraShader } from "../components/aurora/AuroraShader";
import { DotWorldMap } from "../components/aurora/DotWorldMap";
import dotMapDense from "../components/aurora/dotMapDense.json";
import { NexusWordmark } from "../components/aurora/NexusWordmark";
import { NEXUS_2027 as EVENT } from "../constants/nexus2027";

// The aurora keeps a low profile on the hero; the pointer stirs it like water.
const AURORA_INTENSITY = 0.6;

/**
 * NEXUS INDONESIA 2027 — production hero.
 * Polar Drift: aurora curtains drift behind the full-bleed halftone map,
 * with a pointer-driven water distortion across the aurora.
 */
export const HeroNexus2027Section = ({ motion = true }) => (
  <section
    className="nx-aurora-theme relative isolate min-h-[100svh] overflow-hidden"
    id="hero"
  >
    <div className="absolute inset-0">
      <AuroraShader
        intensity={AURORA_INTENSITY}
        mode="drift"
        motion={motion}
        water={1}
      />
    </div>

    <div className="pointer-events-none absolute inset-0">
      <DotWorldMap
        anchorX={1}
        baseAlpha={0.3}
        className="block h-full w-full opacity-70"
        dotMapData={dotMapDense}
        fit="cover"
        focusAlpha={0.72}
        motion={motion}
      />
    </div>

    <div className="nx-vignette pointer-events-none absolute inset-0" />
    <div className="nx-grain pointer-events-none absolute inset-0" />

    <div className="relative z-10 flex min-h-[100svh] flex-col px-6 pt-28 pb-8 sm:px-10 sm:pt-32">
      <h1 className="sr-only">
        NEXUS Indonesia 2027 — {EVENT.dateShort}, {EVENT.city}.{" "}
        {EVENT.themeLine}
      </h1>

      <div
        aria-hidden="true"
        className="flex flex-1 flex-col items-center justify-center py-10 text-center"
      >
        <p
          className="nx-meta nx-rise mb-5 sm:mb-7"
          style={{ "--nx-delay": "0ms" }}
        >
          {EVENT.chapter} — {EVENT.year}
        </p>

        <NexusWordmark
          className="nx-rise text-[clamp(2.9rem,12.5vw,10.5rem)]"
          motion={motion}
          streak={false}
        />

        <p
          className="nx-rise mt-4 text-[clamp(0.95rem,3vw,2.4rem)] tracking-[0.42em] text-white/95 sm:mt-6"
          style={{
            fontFamily: "var(--nx-display)",
            textIndent: "0.42em",
            "--nx-delay": "140ms",
          }}
        >
          {EVENT.chapter}
        </p>

        <p
          className="nx-rise nx-mono mt-6 text-[0.58rem] tracking-[0.32em] text-[#9fc4d4] uppercase sm:mt-8 sm:text-xs"
          style={{ "--nx-delay": "270ms" }}
        >
          {EVENT.themeLine1}
          <br />
          {EVENT.themeLine2}
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        <a
          className="nx-rise group inline-flex items-center gap-3 rounded-full border border-[#3dffa2]/40 bg-[#3dffa2]/10 px-8 py-4 shadow-[0_0_45px_rgba(61,255,162,0.16)] transition-colors duration-300 hover:border-[#3dffa2]/80 hover:bg-[#3dffa2]/20"
          href={EVENT.mailto}
          style={{ "--nx-delay": "380ms" }}
        >
          <span className="nx-meta nx-meta--bright">Be Our Sponsor</span>
          <span
            aria-hidden="true"
            className="text-[#3dffa2] transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </a>

        <p
          className="nx-rise nx-mono text-center text-[0.58rem] tracking-[0.3em] text-[#cdeae2] uppercase sm:text-[0.7rem]"
          style={{ "--nx-delay": "460ms" }}
        >
          {EVENT.tagline}
        </p>

        <div className="nx-hairline w-full" />

        <div className="nx-meta nx-meta--bright flex w-full items-end justify-between sm:pr-24">
          <p>{EVENT.dateShort}</p>
          <p>{EVENT.city}</p>
        </div>
      </div>
    </div>
  </section>
);
