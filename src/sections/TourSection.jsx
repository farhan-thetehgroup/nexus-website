/* eslint-disable prettier/prettier */
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Calendar, Globe, Navigation } from "lucide-react";

import { TOUR_CITIES } from "../constants";
import { CityCard } from "../components/tour/CityCard";
import { GalleryModal } from "../components/GalleryModal";
import { DotWorldMap, latLonToGrid } from "../components/aurora/DotWorldMap";
import dotMapDense from "../components/aurora/dotMapDense.json";
import { useMotionPreference } from "../components/aurora/useMotionPreference";
import { GlowField } from "../components/common/ui/GlowField";
import {
  MaskedLine,
  useSectionEntry,
} from "../components/common/ui/SectionEntry";

// Per-mode section copy. `full` is the legacy 2026 home section (story +
// its own grid) and MUST keep its original strings; `history` is the same
// scrollytelling opened on the 2027 page as a historical preview of the
// tour; `upcoming` is grid-only, showing future events (NEXUS 2027).
const SECTION_COPY = {
  full: {
    chip: "Multi-City Tour",
    Icon: Globe,
    headline: "Join Us in Shaping the Future",
    subline: "APAC Tech Tour 2026",
    body: "A roadshow across 6 major APAC cities connecting innovators and decision-makers",
    statLabel: "Total Expected C-Level Attendees",
  },
  history: {
    chip: "Historical Preview",
    Icon: Globe,
    headline: "The Road So Far",
    subline: "APAC Tech Tour 2026",
    body: "A look back at the roadshow across 6 major APAC cities connecting innovators and decision-makers",
    statLabel: "C-Level Attendees Connected Across the Tour",
  },
  upcoming: {
    chip: "Upcoming Events",
    Icon: Calendar,
    headline: "Where We Head Next",
    subline: "NEXUS 2027",
    body: "Seven stops across the Asia-Pacific — confirmed dates below, with the remaining stops to be announced",
    statLabel: "Event Stops Announced Across the Region",
  },
};

export const TourSection = ({
  cities = TOUR_CITIES,
  mode = "full",
  id = "tours",
}) => {
  const [activeCity, setActiveCity] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [stage, setStage] = useState(0);
  const [storyDone, setStoryDone] = useState(false);
  const [pointsPx, setPointsPx] = useState([]);
  const entry = useSectionEntry();
  const motionOk = useMotionPreference();
  const containerRef = useRef(null);
  const storyRef = useRef(null);
  const stageRef = useRef(null);
  const copy = SECTION_COPY[mode];
  const isStoryMode = mode !== "upcoming";

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // City pulse points for the dotted map background — real coordinates
  // projected onto the dense map's grid (see DotWorldMap.latLonToGrid).
  const pulsePoints = useMemo(
    () =>
      cities
        .filter((c) => c.coords)
        .map((c) => ({
          city: c.city,
          ...latLonToGrid(c.coords.lat, c.coords.lon, dotMapDense),
        })),
    [cities],
  );

  // Story phases: N x 100vh, one tour stop per screen of scroll. Stage is
  // computed straight from geometry on every scroll event — framer's
  // scrollY pipeline lagged the swap by >1s here, which read as the card
  // freezing and then bursting to its next position.
  const syncStory = useCallback(() => {
    const el = storyRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const travel = rect.height - window.innerHeight;
    if (travel <= 0) return;
    const v = Math.min(1, Math.max(0, -rect.top / travel));
    setStage(Math.min(cities.length - 1, Math.floor(v * cities.length)));
    setStoryDone(v >= 0.995);
  }, [cities.length]);
  useEffect(() => {
    syncStory();
    window.addEventListener("scroll", syncStory, { passive: true });
    window.addEventListener("resize", syncStory);
    return () => {
      window.removeEventListener("scroll", syncStory);
      window.removeEventListener("resize", syncStory);
    };
  }, [syncStory]);

  // City anchors on the canvas (px), recomputed on resize. Markers render
  // as DOM on top of everything so a marker never half-hides behind the
  // frosted card; mirrors DotWorldMap's cover-fit math (fit="cover",
  // anchorX=1) with the same dense grid.
  useEffect(() => {
    const update = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const { cols = 400, rows = 136 } = dotMapDense;
      const step = Math.max(rect.width / cols, rect.height / rows);
      setPointsPx(
        pulsePoints.map((g) => ({
          city: g.city,
          x: (g.x + 0.5) * step + (rect.width - cols * step),
          y: (g.y + 0.5) * step,
        })),
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [pulsePoints]);

  return (
    <section className="relative" id={id} ref={containerRef}>
      {/* Pinned dotted map — sticks through the header + story (and the
          grid, whose phasing rides over it). The 2027 "upcoming" mode gets
          its own map pinned behind its grid so the dotted field stays a
          continuous language with the history section above it.
          -mb-[100vh] cancels its flow height: the header overlays the map
          from the section's very top instead of arriving a full screen
          later (the "map-only blank" the client flagged). */}
      <div
        className="pointer-events-none sticky top-0 z-0 -mb-[100vh] h-screen opacity-55"
        style={{
          maskImage:
            "radial-gradient(ellipse 78% 72% at 50% 50%, black 40%, rgba(0,0,0,0.5) 75%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 78% 72% at 50% 50%, black 40%, rgba(0,0,0,0.5) 75%, transparent 100%)",
        }}
      >
        <DotWorldMap
          anchorX={1}
          className="block h-full w-full"
          dotMapData={dotMapDense}
          fit="cover"
          motion={motionOk}
        />
      </div>

      {/* Ambient light — parallax layer over the pinned map, free to
          spill across the section seams */}
      <GlowField
        className="opacity-20 z-10"
        style={{ y: backgroundY }}
        blobs={[
          { className: "top-32 right-20 w-96 h-96 bg-emerald-500/30" },
          { className: "bottom-32 left-20 w-80 h-80 bg-cyan-500/30" },
          {
            className: "top-1/2 left-1/3 w-[600px] h-[600px] bg-teal-500/20",
          },
          {
            // Straddles the bottom seam into the next section.
            className:
              "-bottom-56 left-[30%] w-[480px] h-[480px] bg-teal-500/25",
          },
          {
            // Receives the light arriving from the section above.
            className: "-top-36 right-[25%] w-[380px] h-[380px] bg-cyan-500/20",
          },
        ]}
      />

      <div className="relative z-10">
        {/* Header rides in over the pinned map */}
        <div className="mx-auto max-w-7xl px-4 pb-6 pt-16 text-center">
          <div className="text-center mb-16">
            <motion.div
              className="nx-glass-chip inline-flex items-center gap-2 px-5 py-2 mb-6"
              {...entry.fade(0, 14, 0.6)}
            >
              <copy.Icon className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">
                {copy.chip}
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-4">
              <MaskedLine delay={0.1}>
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  {copy.headline}
                </span>
              </MaskedLine>
            </h2>

            <motion.p
              className="text-3xl font-bold text-white mb-4"
              {...entry.fade(0.24, 16)}
            >
              {copy.subline}
            </motion.p>

            <motion.p
              className="text-xl text-gray-400 max-w-3xl mx-auto"
              {...entry.fade(0.36, 24)}
            >
              {copy.body}
            </motion.p>
          </div>
        </div>

        {/* Story: every screen of scroll reveals one card and lifts its
            city on the map; the last screen hands over to the grid (full
            mode) or to the next section (history mode). */}
        {isStoryMode && (
          <div
            className="relative"
            ref={storyRef}
            style={{ height: `${cities.length * 100}vh` }}
          >
            <div
              className="sticky top-0 flex h-screen items-center justify-center px-6 md:px-16"
              ref={stageRef}
            >
              {/* City markers — DOM dots over everything so a marker never
                  half-hides behind the frosted card: at viewports where the
                  cover-crop puts the APAC band mid-screen, a canvas dot
                  behind the glass read as a stray blurred blob in the
                  card's corner. The active dot grows and pings; the label
                  chip anchors to this exact point. */}
              <motion.div
                animate={{ opacity: storyDone ? 0 : 1 }}
                className="pointer-events-none absolute inset-0"
                style={{ transition: "opacity 0.45s ease" }}
              >
                {pointsPx.map((p, i) => (
                  <div
                    className="absolute"
                    key={p.city}
                    style={{
                      left: p.x,
                      top: p.y,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {i === stage && !storyDone ? (
                      <>
                        <motion.span
                          animate={
                            motionOk
                              ? { scale: [1, 3], opacity: [0.5, 0] }
                              : { opacity: 0.2 }
                          }
                          className="absolute -inset-1.5 rounded-full border border-emerald-300"
                          transition={{
                            duration: 1.8,
                            ease: "easeOut",
                            repeat: Infinity,
                          }}
                        />
                        <motion.span
                          animate={
                            motionOk
                              ? { scale: [1, 3], opacity: [0.5, 0] }
                              : { opacity: 0.15 }
                          }
                          className="absolute -inset-1.5 rounded-full border border-emerald-300"
                          transition={{
                            delay: 0.9,
                            duration: 1.8,
                            ease: "easeOut",
                            repeat: Infinity,
                          }}
                        />
                        <span className="block h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.7)]" />
                        <div
                          className="absolute left-1/2"
                          style={{
                            bottom: "calc(100% + 0.5rem)",
                            transform: "translateX(-50%)",
                          }}
                        >
                          <div className="nx-glass-chip whitespace-nowrap px-3 py-1 text-xs font-semibold text-emerald-300">
                            {p.city}
                          </div>
                        </div>
                      </>
                    ) : (
                      <span className="block h-2 w-2 rounded-full bg-emerald-300/60" />
                    )}
                  </div>
                ))}
              </motion.div>

              <div className="w-full max-w-[440px]">
                {/* mode="wait": the outgoing card fades out, THEN the next
                    one rises. Crossfade (sync mode) left the old card at full
                    opacity stacked behind the incoming one here. The card
                    renders statically in story mode, so there is no double
                    entry choreography — this stays a clean single flight. */}
                <AnimatePresence mode="wait">
                  {!storyDone && (
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18, scale: 0.97 }}
                      initial={{ opacity: 0, y: 26 }}
                      key={stage}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <CityCard
                        city={cities[stage]}
                        img={cities[stage].img}
                        index={stage}
                        isActive
                        onClick={setActiveCity}
                        pattern={cities[stage].pattern}
                        story
                      />
                      <p className="mt-5 max-w-md px-1 text-center text-sm leading-relaxed text-white/70 md:text-base">
                        {cities[stage].tagline}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!storyDone && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                  <div className="nx-glass-chip flex items-center gap-3 px-4 py-2">
                    {cities.map((c, i) => (
                      <span
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === stage
                            ? "w-7 bg-emerald-400"
                            : i < stage
                              ? "w-1.5 bg-emerald-400/50"
                              : "w-1.5 bg-white/25"
                        }`}
                        key={c.city}
                      />
                    ))}
                    <span className="text-xs font-semibold text-white/80">
                      Stop {stage + 1}/{cities.length}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* All stops — the full grid (legacy home phase and the standalone
            2027 upcoming section; history mode ends at the last stop) */}
        {mode !== "history" && (
          <div
            className={`mx-auto max-w-7xl px-4 ${
              mode === "full" ? "pb-32" : "pb-16"
            }`}
          >
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {cities.map((city, idx) => (
                <div
                  className={
                    cities.length % 3 === 1 && idx === cities.length - 1
                      ? "lg:col-start-2"
                      : ""
                  }
                  key={`${city.city}-${idx}`}
                >
                  <CityCard
                    city={city}
                    img={city.img}
                    index={idx}
                    isActive={activeCity === idx}
                    onClick={setActiveCity}
                    pattern={city.pattern}
                  />
                </div>
              ))}
            </div>

            {mode === "full" && (
              <motion.div
                className="text-center mt-16"
                {...entry.fade(0.36, 24)}
              >
                <div className="nx-glass-pane inline-flex items-center gap-6 px-10 py-6">
                  <Navigation className="w-10 h-10 text-emerald-400" />
                  <div className="text-left">
                    <p className="text-gray-400 text-sm mb-1">
                      {copy.statLabel}
                    </p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                      2200+
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Full/home mode keeps its stat inside the grid phase above;
            history and upcoming get their own closing stat so the split
            sections still land on a concrete payoff. */}
        {mode === "history" && (
          <motion.div
            className="mx-auto max-w-7xl px-4 pb-32 text-center mt-16"
            {...entry.fade(0.36, 24)}
          >
            <div className="nx-glass-pane inline-flex items-center gap-6 px-10 py-6">
              <Navigation className="w-10 h-10 text-emerald-400" />
              <div className="text-left">
                <p className="text-gray-400 text-sm mb-1">{copy.statLabel}</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  2200+
                </p>
              </div>
            </div>
          </motion.div>
        )}
        {mode === "upcoming" && (
          <motion.div
            className="mx-auto max-w-7xl px-4 pb-32 text-center mt-16"
            {...entry.fade(0.36, 24)}
          >
            <div className="nx-glass-pane inline-flex items-center gap-6 px-10 py-6">
              <Navigation className="w-10 h-10 text-emerald-400" />
              <div className="text-left">
                <p className="text-gray-400 text-sm mb-1">{copy.statLabel}</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  {cities.length}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {showGallery && (
          <GalleryModal
            backdropGradient={showGallery.gradient}
            images={showGallery.images}
            onClose={() => setShowGallery(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
