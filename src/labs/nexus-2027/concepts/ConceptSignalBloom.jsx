import { AuroraShader } from "../../../components/aurora/AuroraShader";
import { DotWorldMap } from "../../../components/aurora/DotWorldMap";
import { NexusWordmark } from "../../../components/aurora/NexusWordmark";
import { NEXUS_2027 as EVENT } from "../../../constants/nexus2027";

/**
 * 03 — SIGNAL BLOOM
 * The wordmark becomes the transmitter: aurora blooms radially out of the
 * type, rings pulse out, the map answers from the bottom edge, the tagline
 * types itself in. Built for teasers and social motion.
 */
export const ConceptSignalBloom = ({ motion = true }) => (
  <section aria-label="Concept 03, Signal Bloom" className="nx-concept">
    <div className="absolute inset-0">
      <AuroraShader mode="bloom" motion={motion} />
    </div>

    {[0, 3000, 6000].map((delay) => (
      <span
        className="nx-ring"
        key={delay}
        style={{ "--nx-delay": `${delay}ms` }}
      />
    ))}

    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-[4%] -left-[2%] leading-none text-[26vw] text-white/[0.045] select-none"
      style={{ fontFamily: "var(--nx-display)" }}
    >
      24
    </span>
    <span
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[16%] -right-[2%] leading-none text-[19vw] text-white/[0.04] select-none"
      style={{ fontFamily: "var(--nx-display)" }}
    >
      2027
    </span>

    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[24%] overflow-hidden opacity-80">
      <div className="absolute inset-0 flex items-end justify-center">
        <DotWorldMap
          baseAlpha={0.16}
          className="aspect-[200/68] w-full min-w-[1000px] opacity-60"
          focusAlpha={0.68}
          motion={motion}
          waveSpeed={0.62}
        />
      </div>
    </div>

    <div className="nx-vignette pointer-events-none absolute inset-0" />
    <div className="nx-grain pointer-events-none absolute inset-0" />

    <div className="relative z-10 flex min-h-[100svh] flex-col px-6 py-6 sm:px-10 sm:py-8">
      <header
        className="nx-fade flex items-center justify-between"
        style={{ "--nx-delay": "500ms" }}
      >
        <p className="nx-meta nx-meta--bright">SIGNAL — 03</p>
        <p className="nx-meta">
          {EVENT.dateNumeric} / {EVENT.cityShort}
        </p>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <p
          className="nx-fade nx-mono mb-6 flex items-center gap-3 text-[0.6rem] tracking-[0.34em] text-[#8fe8c4] uppercase sm:text-[0.68rem]"
          style={{ "--nx-delay": "320ms" }}
        >
          <span className="nx-blink inline-block h-1.5 w-1.5 rounded-full bg-[#3dffa2]" />
          {EVENT.chapter} — {EVENT.year}
        </p>

        <NexusWordmark
          className="nx-rise text-[clamp(2.9rem,13vw,11rem)]"
          motion={motion}
        />

        <div
          className="nx-rise mt-6 flex items-center gap-4 sm:mt-8"
          style={{ "--nx-delay": "180ms" }}
        >
          <span className="nx-hairline w-10 sm:w-16" />
          <p
            className="text-[clamp(0.8rem,2.4vw,1.9rem)] tracking-[0.42em] text-white/95"
            style={{ fontFamily: "var(--nx-display)", textIndent: "0.42em" }}
          >
            {EVENT.chapter}
          </p>
          <span className="nx-hairline w-10 sm:w-16" />
        </div>

        <p className="nx-mono mt-10 min-h-[1.4em] text-[0.62rem] tracking-[0.28em] text-[#cdeae2] uppercase sm:text-[0.72rem]">
          <span className="nx-type" style={{ "--nx-delay": "900ms" }}>
            {EVENT.tagline}
            <span className="nx-blink text-[#3dffa2]">_</span>
          </span>
        </p>
      </div>

      <footer
        className="nx-fade flex items-center justify-between"
        style={{ "--nx-delay": "620ms" }}
      >
        <p className="nx-meta nx-meta--bright">{EVENT.dateShort}</p>
        <p className="nx-meta nx-meta--bright">{EVENT.city}</p>
      </footer>
    </div>
  </section>
);
