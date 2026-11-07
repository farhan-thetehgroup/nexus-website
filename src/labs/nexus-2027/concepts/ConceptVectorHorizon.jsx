import { Fragment } from "react";

import { AuroraShader } from "../../../components/aurora/AuroraShader";
import { DotWorldMap } from "../../../components/aurora/DotWorldMap";
import { NEXUS_2027 as EVENT } from "../../../constants/nexus2027";

const PLATE = [
  ["Event", "NEXUS INDONESIA 2027"],
  ["Date", "24 MARCH 2027"],
  ["City", "JAKARTA, INDONESIA"],
  ["Theme", "THE MODERN ENTERPRISE"],
  ["Track", "ZERO-TRUST / AI / CLOUD"],
  ["Status", "PROGRAMME IN DEVELOPMENT"],
];

/**
 * 02 — VECTOR HORIZON
 * Aurora as infrastructure: measured, arc-lit, editorial. Hard type, data
 * plate, hairline grid, the map reduced to a skyline above the horizon.
 * The most "enterprise / zero-trust" of the three.
 */
export const ConceptVectorHorizon = ({ motion = true }) => (
  <section aria-label="Concept 02, Vector Horizon" className="nx-concept">
    <div className="absolute inset-0">
      <AuroraShader mode="horizon" motion={motion} />
    </div>

    <div className="pointer-events-none absolute inset-x-0 bottom-[8%] h-[40%] overflow-hidden">
      <div className="absolute inset-0 flex items-end justify-center">
        <DotWorldMap
          baseAlpha={0.17}
          className="aspect-[200/68] w-full min-w-[1100px] opacity-70"
          focusAlpha={0.6}
          motion={motion}
        />
      </div>
      <div className="nx-scan" />
    </div>

    <div className="nx-grid-overlay pointer-events-none absolute inset-0" />
    <div className="nx-grain pointer-events-none absolute inset-0" />

    <div className="relative z-10 flex min-h-[100svh] flex-col px-6 py-6 sm:px-10 sm:py-8">
      <header
        className="nx-fade flex items-center justify-between gap-4 border-b border-white/10 pb-4"
        style={{ "--nx-delay": "480ms" }}
      >
        <span className="nx-meta nx-meta--bright">
          NEXUS — {EVENT.chapter} {EVENT.year}
        </span>
        <span className="nx-meta hidden md:block">{EVENT.coordinates}</span>
        <span className="nx-meta">TEH GROUP</span>
      </header>

      <div className="flex flex-1 flex-col justify-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="max-w-4xl">
          <p className="nx-meta nx-rise" style={{ "--nx-delay": "60ms" }}>
            EVENT — 24 MARCH 2027
          </p>

          <h1
            className="nx-rise mt-5 leading-[0.84] font-extrabold tracking-[-0.045em] text-[#ecfffa] drop-shadow-[0_0_60px_rgba(61,255,162,0.22)]"
            style={{
              fontFamily: "var(--nx-body)",
              fontSize: "clamp(4.2rem, 16vw, 13.5rem)",
              "--nx-delay": "140ms",
            }}
          >
            NEXUS
          </h1>

          <p
            className="nx-outline-text nx-rise -mt-[0.08em] leading-[0.9] font-extrabold tracking-[-0.03em]"
            style={{
              fontFamily: "var(--nx-body)",
              fontSize: "clamp(2.1rem, 8.4vw, 7rem)",
              "--nx-delay": "240ms",
            }}
          >
            {EVENT.chapter}
          </p>

          <div
            className="nx-hairline nx-rise mt-8 max-w-xl"
            style={{ "--nx-delay": "320ms" }}
          />
        </div>

        <aside
          className="nx-panel nx-rise w-full max-w-sm shrink-0 p-6"
          style={{ "--nx-delay": "460ms" }}
        >
          <p className="nx-meta nx-meta--bright mb-5">{EVENT.tagline}</p>
          <dl className="grid grid-cols-[5.5rem_1fr] gap-y-3">
            {PLATE.map(([label, value]) => (
              <Fragment key={label}>
                <dt className="nx-meta">{label}</dt>
                <dd className="nx-mono text-[0.7rem] tracking-[0.14em] text-[#e9f7f2] uppercase">
                  {value}
                  {label === "Status" && (
                    <span className="nx-blink ml-2 inline-block h-1.5 w-1.5 rounded-full bg-[#3dffa2] align-middle" />
                  )}
                </dd>
              </Fragment>
            ))}
          </dl>
        </aside>
      </div>

      <footer
        className="nx-fade flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between"
        style={{ "--nx-delay": "560ms" }}
      >
        <p className="nx-meta nx-meta--bright">
          {EVENT.themeLine1} {EVENT.themeLine2}
        </p>
        <p className="nx-meta">
          {EVENT.dateNumeric} — {EVENT.cityShort} · STUDY 02 / VECTOR HORIZON
        </p>
      </footer>
    </div>
  </section>
);
