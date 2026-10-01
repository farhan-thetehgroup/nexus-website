/* eslint-disable no-undef */
import { useEffect, useState } from "react";

import { ConceptPolarDrift } from "./concepts/ConceptPolarDrift";
import { ConceptSignalBloom } from "./concepts/ConceptSignalBloom";
import { ConceptVectorHorizon } from "./concepts/ConceptVectorHorizon";
import "./lab.css";

const CONCEPTS = [
  {
    id: "polar-drift",
    tab: "01 / Polar Drift",
    name: "Polar Drift",
    Component: ConceptPolarDrift,
    position:
      "The poster, breathing. Aurora curtains drift behind the halftone map and the wordmark keeps its light streak.",
    rationale:
      "Shipped as the production hero on the 2027 page — open /2027 to see it in place, or use the capture kit below for stills.",
    use: "Hero / event site",
  },
  {
    id: "vector-horizon",
    tab: "02 / Vector Horizon",
    name: "Vector Horizon",
    Component: ConceptVectorHorizon,
    position:
      "Aurora as infrastructure. An arc of light rises behind hard editorial type, a data plate, and the map reduced to a skyline.",
    rationale:
      "Shipped as the sponsor layer on the 2027 page (#why) — the same horizon, plate, and hairline grid, ready to carry the 2027 prospectus.",
    use: "Sponsor / enterprise",
  },
  {
    id: "signal-bloom",
    tab: "03 / Signal Bloom",
    name: "Signal Bloom",
    Component: ConceptSignalBloom,
    position:
      "The wordmark becomes the transmitter: aurora blooms out of the type, rings pulse, the tagline types itself in.",
    rationale:
      "Built for motion, and staged for it: the capture kit below opens this direction alone at 9:16, 1:1, or 16:9 for screen recording.",
    use: "Social / on-site",
  },
];

const readInitial = () => {
  const hash = window.location.hash.replace("#", "");
  return CONCEPTS.some((concept) => concept.id === hash)
    ? hash
    : CONCEPTS[0].id;
};

const FORMATS = [
  { label: "Story — 1080 × 1920", width: 1080, height: 1920 },
  { label: "Square — 1080 × 1080", width: 1080, height: 1080 },
  { label: "Wide — 1920 × 1080", width: 1920, height: 1080 },
];

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const DesignLab = () => {
  const [activeId, setActiveId] = useState(readInitial);
  const [motion, setMotion] = useState(() => !prefersReducedMotion());
  const active =
    CONCEPTS.find((concept) => concept.id === activeId) ?? CONCEPTS[0];
  const ActiveConcept = active.Component;

  const openStage = (id, width, height) => {
    const url = `${window.location.origin}/lab/nexus-2027?stage=${id}`;
    window.open(url, `nexus-2027-${id}`, `width=${width},height=${height}`);
  };

  useEffect(() => {
    window.history.replaceState(null, "", `#${activeId}`);
  }, [activeId]);

  useEffect(() => {
    const onKeyDown = (event) => {
      const index = CONCEPTS.findIndex((concept) => concept.id === activeId);
      if (event.key === "ArrowRight") {
        setActiveId(CONCEPTS[(index + 1) % CONCEPTS.length].id);
      } else if (event.key === "ArrowLeft") {
        setActiveId(
          CONCEPTS[(index - 1 + CONCEPTS.length) % CONCEPTS.length].id,
        );
      } else if (["1", "2", "3"].includes(event.key)) {
        setActiveId(CONCEPTS[Number(event.key) - 1].id);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeId]);

  const stageId = new URLSearchParams(window.location.search).get("stage");
  const staged = stageId
    ? CONCEPTS.find((concept) => concept.id === stageId)
    : null;

  // Clean capture stage: one direction, no chrome — used by the capture kit.
  if (staged) {
    const Stage = staged.Component;
    return (
      <div
        className="nx-lab nx-aurora-theme"
        data-motion={motion ? "on" : "off"}
      >
        <Stage key={staged.id} motion={motion} />
      </div>
    );
  }

  return (
    <div className="nx-lab nx-aurora-theme" data-motion={motion ? "on" : "off"}>
      <ActiveConcept key={active.id} motion={motion} />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center p-4">
        <nav className="nx-panel pointer-events-auto flex flex-wrap items-center gap-1 rounded-sm p-1">
          {CONCEPTS.map((concept) => (
            <button
              className="nx-tab"
              data-active={concept.id === activeId}
              key={concept.id}
              onClick={() => setActiveId(concept.id)}
              type="button"
            >
              {concept.tab}
            </button>
          ))}
          <span className="mx-2 hidden h-4 w-px bg-white/15 sm:block" />
          <button
            className="nx-tab"
            data-active={!motion}
            onClick={() => setMotion((value) => !value)}
            title="Toggle animation"
            type="button"
          >
            {motion ? "Motion: on" : "Motion: off"}
          </button>
        </nav>
      </div>

      <section className="border-t border-white/10 bg-[#03101a] px-6 py-14 sm:px-10">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="nx-meta nx-meta--bright">
              Aurora study — direction {active.tab.slice(0, 2)}
            </p>
            <h2
              className="mt-3 text-3xl text-[#ecfffa] sm:text-4xl"
              style={{ fontFamily: "var(--nx-display)" }}
            >
              {active.name}
            </h2>
            <p className="nx-meta mt-4">Suggested use — {active.use}</p>
          </div>
          <div className="space-y-5">
            <p className="text-sm leading-relaxed text-[#cfe5e2] sm:text-base">
              {active.position}
            </p>
            <p className="text-sm leading-relaxed text-[#9fc4d4] sm:text-base">
              {active.rationale}
            </p>
            <p className="nx-meta">
              Keys 1 / 2 / 3 or ← → to switch · URL: /lab/nexus-2027
            </p>

            <div className="border-t border-white/10 pt-5">
              <p className="nx-meta nx-meta--bright">
                Capture kit — {active.name}
              </p>
              <p className="nx-meta mt-2">
                Opens the direction alone in a clean window at the exact pixel
                format, ready for screen recording.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {FORMATS.map((format) => (
                  <button
                    className="nx-tab border-white/15 hover:border-[#3dffa2]/40"
                    key={format.label}
                    onClick={() =>
                      openStage(active.id, format.width, format.height)
                    }
                    type="button"
                  >
                    {format.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
