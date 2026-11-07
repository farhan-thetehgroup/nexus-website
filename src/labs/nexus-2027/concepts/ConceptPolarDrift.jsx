import { AuroraShader } from "../../../components/aurora/AuroraShader";
import { DotWorldMap } from "../../../components/aurora/DotWorldMap";
import { NexusWordmark } from "../../../components/aurora/NexusWordmark";
import { NEXUS_2027 as EVENT } from "../../../constants/nexus2027";

/**
 * 01 — POLAR DRIFT
 * The key visual, alive. Aurora curtains drift behind the halftone world map,
 * the wordmark keeps its light streak, the map breathes in a slow sweep.
 * Closest to the poster; safest to ship.
 */
export const ConceptPolarDrift = ({ motion = true }) => (
  <section aria-label="Concept 01, Polar Drift" className="nx-concept">
    <div className="absolute inset-0">
      <AuroraShader mode="drift" motion={motion} />
    </div>

    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div
        className="w-[min(1400px,96vw)]"
        style={{
          maskImage:
            "radial-gradient(78% 78% at 50% 46%, black 32%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(78% 78% at 50% 46%, black 32%, transparent 78%)",
        }}
      >
        <DotWorldMap
          baseAlpha={0.3}
          className="aspect-[200/68] w-full min-w-[900px] -translate-y-[7%] opacity-70"
          focusAlpha={0.72}
          motion={motion}
        />
      </div>
    </div>

    <div className="nx-vignette pointer-events-none absolute inset-0" />
    <div className="nx-grain pointer-events-none absolute inset-0" />

    <div className="relative z-10 flex min-h-[100svh] flex-col px-6 py-6 sm:px-10 sm:py-8">
      <header
        className="nx-fade flex items-start justify-between"
        style={{ "--nx-delay": "520ms" }}
      >
        <img
          alt="TEH Group"
          className="h-5 w-auto opacity-90 sm:h-6"
          src="/images/brand-logo/teh-white.svg"
        />
        <p className="nx-meta text-right">
          KEY VISUAL
          <br />
          STUDY — 01
        </p>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <NexusWordmark
          className="nx-rise text-[clamp(2.9rem,12.5vw,10.5rem)]"
          motion={motion}
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

      <footer className="flex flex-col items-center gap-4">
        <p
          className="nx-rise nx-mono text-[0.58rem] tracking-[0.3em] text-[#cdeae2] uppercase sm:text-[0.7rem]"
          style={{ "--nx-delay": "430ms" }}
        >
          {EVENT.tagline}
        </p>
        <div className="nx-hairline w-full" />
        <div className="nx-meta nx-meta--bright flex w-full items-end justify-between">
          <p>{EVENT.dateShort}</p>
          <p>{EVENT.city}</p>
        </div>
      </footer>
    </div>
  </section>
);
