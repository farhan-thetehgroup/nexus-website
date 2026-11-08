/* eslint-disable no-undef */
import { Archive, ArrowDown } from "lucide-react";

import { DotWorldMap } from "../components/aurora/DotWorldMap";
import dotMapDense from "../components/aurora/dotMapDense.json";
import { NexusWordmarkSvg } from "../components/aurora/NexusWordmarkSvg";
import { Typewriter } from "../components/common/ui/Typewriter";
import { TOUR_CITIES } from "../constants";
import { NEXUS_2026_JOURNEY as JOURNEY } from "../constants/nexus2026";

const monthShort = (date) =>
  new Date(date).toLocaleString("en-US", { month: "short" }).toUpperCase();

/**
 * Journey hero — the 2026 retrospective. Same full-bleed halftone canvas
 * and brand wordmark as the 2027 hero, but the copy is explicitly archival:
 * the year, the finished season, and the six stops that make up the story.
 * There is no primary CTA here — the page's single floating action sends
 * visitors forward to the 2027 event.
 */
export const JourneyHeroSection = ({ motion = true }) => {
  const scrollToNext = (event) => {
    event.preventDefault();
    document.getElementById("sponsors")?.scrollIntoView({
      behavior: motion ? "smooth" : "auto",
    });
  };

  return (
    <section
      className="nx-aurora-theme relative isolate min-h-[100svh] overflow-hidden"
      id="hero"
    >
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

      <div className="relative z-10 flex min-h-[100svh] flex-col px-6 pt-8 pb-6 sm:px-10 sm:pt-10">
        <div className="flex items-center justify-between gap-6">
          <p className="nx-meta">
            NEXUS <span className="text-white/35">/</span> ARCHIVE —{" "}
            {JOURNEY.year}
          </p>
          <p className="nx-meta hidden sm:block">{JOURNEY.season}</p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
          <div
            className="nx-glass-chip nx-rise mb-6 inline-flex items-center gap-2 px-4 py-2"
            style={{ "--nx-delay": "0ms" }}
          >
            <Archive className="h-4 w-4 text-emerald-300" />
            <span className="nx-mono text-[0.6rem] font-medium tracking-[0.22em] text-[#d8fff0] uppercase">
              {JOURNEY.eyebrow}
            </span>
          </div>

          <h1 className="sr-only">
            NEXUS {JOURNEY.scope} {JOURNEY.year} — {JOURNEY.headline}
          </h1>

          <NexusWordmarkSvg className="nx-rise" motion={motion} />

          <div
            className="nx-rise mt-5 min-h-[3.2rem] sm:mt-7 sm:min-h-[3.4rem]"
            style={{ "--nx-delay": "220ms" }}
          >
            <Typewriter
              className="text-[clamp(1.05rem,2.6vw,1.85rem)] font-light tracking-[0.03em] text-[#eafaf4]"
              text={JOURNEY.headline}
            />
          </div>

          <p
            className="nx-rise mt-5 max-w-2xl text-sm font-light leading-relaxed text-white/65 sm:text-base"
            style={{ "--nx-delay": "340ms" }}
          >
            {JOURNEY.supporting}
          </p>
        </div>

        <div className="nx-rise space-y-4" style={{ "--nx-delay": "460ms" }}>
          <div className="nx-hairline" />

          {/* The scroll cue hugs the city rail (left of the floating 2027
              action) instead of sitting at the far right, where the FAB
              would cover it. It points at the NEXT section (Past Sponsors),
              not straight into the tour. */}
          <div className="flex flex-wrap items-center justify-start gap-x-10 gap-y-3">
            <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-start">
              {TOUR_CITIES.map((city) => (
                <li className="flex items-baseline gap-1.5" key={city.city}>
                  <span className="nx-mono text-[0.72rem] tracking-[0.14em] text-emerald-300/80">
                    {monthShort(city.date)}
                  </span>
                  <span className="nx-mono text-[0.72rem] tracking-[0.14em] text-white/65 uppercase">
                    {city.city}
                  </span>
                </li>
              ))}
            </ul>

            <a
              className="group inline-flex items-center gap-3"
              href="#sponsors"
              onClick={scrollToNext}
            >
              <span className="nx-mono hidden text-[0.7rem] tracking-[0.18em] text-white/60 uppercase transition-colors duration-300 group-hover:text-white/90 sm:inline">
                {JOURNEY.scrollCue}
              </span>
              <span className="nx-glass-icon flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 group-hover:border-white/30">
                <ArrowDown className="h-[18px] w-[18px] text-emerald-300" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
