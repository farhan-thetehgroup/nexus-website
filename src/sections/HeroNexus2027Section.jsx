import { AuroraShader } from "../components/aurora/AuroraShader";
import { DotWorldMap } from "../components/aurora/DotWorldMap";
import dotMapDense from "../components/aurora/dotMapDense.json";
import { NexusWordmark } from "../components/aurora/NexusWordmark";
import { Typewriter } from "../components/common/ui/Typewriter";
import { NEXUS_2027 as EVENT, NEXUS_2027_AURORA } from "../constants/nexus2027";

/**
 * NEXUS 2027 — production hero.
 * APAC-wide brand hero: Polar Drift aurora (blue drifting into green) over
 * the full-bleed halftone map, with a pointer-driven water wave and the
 * typewriter headline from the home hero.
 */
export const HeroNexus2027Section = ({ motion = true }) => (
  <section
    className="nx-aurora-theme relative isolate min-h-[100svh] overflow-hidden"
    id="hero"
  >
    <div className="absolute inset-0">
      <AuroraShader
        mode="drift"
        motion={motion}
        palette={NEXUS_2027_AURORA}
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
        NEXUS Asia-Pacific 2027 — {EVENT.headline}
      </h1>

      <div
        aria-hidden="true"
        className="flex flex-1 flex-col items-center justify-center py-10 text-center"
      >
        <p
          className="nx-meta nx-rise mb-5 sm:mb-7"
          style={{ "--nx-delay": "0ms" }}
        >
          {EVENT.scope} — {EVENT.year}
        </p>

        <NexusWordmark
          className="nx-rise text-[clamp(2.9rem,12.5vw,10.5rem)]"
          motion={motion}
          streak={false}
        />

        <div
          className="nx-rise mt-5 min-h-[3.2rem] sm:mt-7 sm:min-h-[3.4rem]"
          style={{ "--nx-delay": "220ms" }}
        >
          <Typewriter
            className="text-[clamp(1.05rem,2.6vw,1.85rem)] font-light tracking-[0.03em] text-[#eafaf4]"
            text={EVENT.headline}
          />
        </div>
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
      </div>
    </div>
  </section>
);
