import { Fragment } from "react";

import { AuroraShader } from "../components/aurora/AuroraShader";
import { DotWorldMap } from "../components/aurora/DotWorldMap";
import { NEXUS_2027 as EVENT } from "../constants/nexus2027";

const REASONS = [
  {
    index: "01",
    title: "Targeted Audience",
    desc: "Gain direct access to 200 Chief, Director, Head, and Lead-level prospects.",
  },
  {
    index: "02",
    title: "Maximized ROI",
    desc: "Move beyond brand awareness to generate qualified leads, close deals, and build relationships in a high-intensity environment.",
  },
  {
    index: "03",
    title: "Regional Dominance",
    desc: "Build your brand presence across key APAC markets in a single, coordinated campaign.",
  },
  {
    index: "04",
    title: "Quality Over Quantity",
    desc: "Our curated matchmaking ensures your time is spent with the right people who have real budget and authority.",
  },
];

const PLATE = [
  ["Event", "NEXUS INDONESIA 2027"],
  ["Date", EVENT.dateShort],
  ["City", EVENT.city],
  ["Theme", "THE MODERN ENTERPRISE"],
  ["Track", EVENT.focus],
  ["Status", "PROGRAMME IN DEVELOPMENT"],
];

/**
 * Sponsor / enterprise layer — Vector Horizon.
 * Aurora as infrastructure: a rising light arc, hairline grid, editorial
 * type and a data plate. Sits between the hero and the audience section.
 */
export const SponsorHorizon2027Section = ({ motion = true }) => (
  <section
    className="nx-aurora-theme relative isolate overflow-hidden bg-[#031019] px-6 py-24 sm:px-10 sm:py-32"
    id="why"
  >
    <div className="absolute inset-0">
      <AuroraShader mode="horizon" motion={motion} />
    </div>

    <div className="pointer-events-none absolute inset-x-0 bottom-[6%] h-[38%] overflow-hidden">
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

    <div className="relative z-10 mx-auto max-w-7xl">
      <div className="nx-fade flex items-center justify-between gap-4 border-b border-white/10 pb-4">
        <span className="nx-meta nx-meta--bright">
          SPONSORSHIP — {EVENT.name} {EVENT.chapter} {EVENT.year}
        </span>
        <span className="nx-meta hidden md:block">{EVENT.coordinates}</span>
      </div>

      <div className="mt-16 grid gap-16 lg:mt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <p className="nx-meta nx-rise" style={{ "--nx-delay": "60ms" }}>
            PARTNER WITH {EVENT.name}
          </p>

          <h2
            className="nx-rise mt-5 leading-[0.92] font-extrabold tracking-[-0.035em] text-[#ecfffa] drop-shadow-[0_0_60px_rgba(61,255,162,0.2)]"
            style={{
              fontFamily: "var(--nx-body)",
              fontSize: "clamp(2.4rem, 6.4vw, 4.6rem)",
              "--nx-delay": "120ms",
            }}
          >
            Why sponsor {EVENT.name}?
          </h2>

          <p
            className="nx-rise mt-6 max-w-xl text-base leading-relaxed text-[#cfe5e2] sm:text-lg"
            style={{ "--nx-delay": "200ms" }}
          >
            Unlock unprecedented opportunities and maximize your brand&rsquo;s
            impact across the Asia-Pacific.
          </p>

          <div className="mt-12">
            {REASONS.map((reason) => (
              <div
                className="nx-rise grid gap-3 border-t border-white/10 py-6 sm:grid-cols-[3.5rem_12rem_1fr] sm:gap-6"
                key={reason.index}
                style={{ "--nx-delay": "260ms" }}
              >
                <span className="nx-mono text-xs tracking-[0.28em] text-[#8fe8c4]">
                  {reason.index}
                </span>
                <h3 className="text-lg font-semibold text-white">
                  {reason.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#9fc4d4] sm:text-base">
                  {reason.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <aside className="nx-fade self-start lg:sticky lg:top-28">
          <div className="nx-panel p-8">
            <p className="nx-meta nx-meta--bright mb-6">{EVENT.tagline}</p>
            <dl className="grid grid-cols-[5.5rem_1fr] gap-y-4">
              {PLATE.map(([label, value]) => (
                <Fragment key={label}>
                  <dt className="nx-meta">{label}</dt>
                  <dd className="nx-mono text-[0.72rem] tracking-[0.14em] text-[#e9f7f2] uppercase">
                    {value}
                    {label === "Status" && (
                      <span className="nx-blink ml-2 inline-block h-1.5 w-1.5 rounded-full bg-[#3dffa2] align-middle" />
                    )}
                  </dd>
                </Fragment>
              ))}
            </dl>

            <div className="nx-hairline my-7" />

            <a
              className="group inline-flex items-center gap-3 rounded-full border border-[#3dffa2]/40 bg-[#3dffa2]/10 px-6 py-3 transition-colors duration-300 hover:border-[#3dffa2]/80 hover:bg-[#3dffa2]/20"
              href={EVENT.mailto}
            >
              <span className="nx-meta nx-meta--bright">
                Request the 2027 prospectus
              </span>
              <span
                aria-hidden="true"
                className="text-[#3dffa2] transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </aside>
      </div>

      <div className="nx-fade mt-20 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between sm:pr-24">
        <p className="nx-meta">{EVENT.themeLine}</p>
        <p className="nx-meta nx-meta--bright">
          {EVENT.dateNumeric} — {EVENT.cityShort}
        </p>
      </div>
    </div>
  </section>
);
