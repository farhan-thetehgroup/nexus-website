/* eslint-disable prettier/prettier */
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Calendar, Globe, Navigation, Plane, Users } from "lucide-react";

import { TOUR_CITIES } from "../constants";
import { CityCard } from "../components/tour/CityCard";
import { GalleryModal } from "../components/GalleryModal";
import { DotWorldMap, latLonToGrid } from "../components/aurora/DotWorldMap";
import dotMapDense from "../components/aurora/dotMapDense.json";
import { useMotionPreference } from "../components/aurora/useMotionPreference";
import { GlassButton } from "../components/common/ui/GlassButton";
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
    chip: "Our Journey",
    Icon: Globe,
    headline: "The Road So Far",
    subline: "APAC Tech Tour 2026",
    body: "A look back at the roadshow across 6 major APAC cities connecting innovators and decision-makers",
    statLabel: "C-Level Attendees Connected Across the Tour",
  },
  upcoming: {
    chip: "Upcoming Events",
    Icon: Calendar,
    headline: "Join Us in Shaping the Future",
    subline: "APAC Tech Tour 2027",
    body: "A roadshow across 6 major APAC cities connecting innovators and decision-makers",
    statLabel: "Event Stops Announced Across the Region",
    attendeeLabel: "Total Expected C-Level Attendees",
  },
};

// Flight geometry between two stage markers (px coords from the sticky
// stage box): a quadratic arc bowing upward from the straight line plus
// sampled keyframes for framer (position + heading from the tangent).
// lucide's Plane glyph points up-right (~-45° from +x), so the rendered
// core gets a +45° counter-rotation and `rotate` carries the path heading.
const FLIGHT_SAMPLES = 22;

// Horizontal offset (px) each passed stop folds to the left, one step per
// stop behind it. Small enough that the pile stays a fan of slivers instead
// of a spread hand, big enough that every past stop stays readable.
const STACK_STEP = 26;

// C-level tally across the tour (5 x 400 stops + 200 in Hong Kong). One
// source of truth so the home stat and the retrospective can never drift.
const C_LEVEL_ATTENDEES = "2200+";

const flightGeometry = (a, b) => {
  const dist = Math.hypot(b.x - a.x, b.y - a.y);
  const c = {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2 - Math.min(96, Math.max(26, dist * 0.3)),
  };
  const at = (t) => ({
    x: (1 - t) ** 2 * a.x + 2 * (1 - t) * t * c.x + t * t * b.x,
    y: (1 - t) ** 2 * a.y + 2 * (1 - t) * t * c.y + t * t * b.y,
  });
  const pts = [];
  for (let i = 0; i <= FLIGHT_SAMPLES; i++) pts.push(at(i / FLIGHT_SAMPLES));
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const rs = pts.map((p, i) => {
    const q = pts[Math.min(i + 1, FLIGHT_SAMPLES)];
    const o = pts[Math.max(i - 1, 0)];
    const [h, ref] = i < FLIGHT_SAMPLES ? [q, p] : [p, o];
    return (Math.atan2(h.y - ref.y, h.x - ref.x) * 180) / Math.PI;
  });
  const times = pts.map((_, i) => i / FLIGHT_SAMPLES);
  return {
    id: `${a.x.toFixed(0)}-${a.y.toFixed(0)}-${b.x.toFixed(0)}-${b.y.toFixed(0)}`,
    path: `M ${a.x} ${a.y} Q ${c.x} ${c.y} ${b.x} ${b.y}`,
    x1: a.x,
    y1: a.y,
    x2: b.x,
    y2: b.y,
    xs,
    ys,
    rs,
    times,
    duration: 0.7 + Math.min(0.9, dist / 1600),
  };
};

export const TourSection = ({
  cities = TOUR_CITIES,
  mode = "full",
  id = "tours",
  // Optional closing action under the grid — { label, href }. The 2027 home
  // uses it to hand off to the retrospective page.
  cta = null,
}) => {
  const [activeCity, setActiveCity] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [stage, setStage] = useState(0);
  const [storyDone, setStoryDone] = useState(false);
  const [pointsPx, setPointsPx] = useState([]);
  const [stageWidth, setStageWidth] = useState(0);
  const [flight, setFlight] = useState(null);
  const prevStageRef = useRef(null);
  const entry = useSectionEntry();
  const motionOk = useMotionPreference();
  const containerRef = useRef(null);
  const storyRef = useRef(null);
  const stageRef = useRef(null);
  const copy = SECTION_COPY[mode];
  const isStoryMode = mode !== "upcoming";

  // The pile has to stay inside the stage: at full width a passed-stop fan
  // of (n-1) * STACK_STEP runs past the left edge on phones and its deepest
  // slivers vanish off-screen. Cap the fan at a share of the stage width so
  // narrow viewports compress the stack instead of losing it.
  const maxFan = Math.min(
    (cities.length - 1) * STACK_STEP,
    Math.max(48, stageWidth * 0.12),
  );

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
      setStageWidth(rect.width);
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

  // Flight choreography — each time the venue (story stage) changes, the
  // plane arcs from the previous stop's marker to the new one. Geometry
  // uses the same marker px coords (pointsPx), so the flight starts/ends
  // exactly on the dotted map's city dots. Reduced-motion users just get
  // the marker swaps, no plane.
  useEffect(() => {
    if (mode !== "history" || !motionOk) return;
    const from = prevStageRef.current;
    prevStageRef.current = stage;
    if (from === null || from === stage) return;
    const a = pointsPx[from];
    const b = pointsPx[stage];
    if (!a || !b) return;
    setFlight(flightGeometry(a, b));
  }, [stage, pointsPx, mode, motionOk]);

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

              {/* Flight — the venue plane. Lives inside the content stacking
                  context at -z-10: above the pinned map, below the frosted
                  card, so the arc reads as map-level travel while the card
                  swap stays the story's focus. Fades with the story and
                  is replaced per leg (AnimatePresence); reduced-motion
                  skips it. */}
              {mode === "history" && (
                <motion.div
                  animate={{ opacity: storyDone ? 0 : 1 }}
                  className="pointer-events-none absolute inset-0 -z-10"
                  style={{ transition: "opacity 0.45s ease" }}
                >
                  <AnimatePresence>
                    {flight && (
                      <motion.div
                        className="absolute inset-0"
                        exit={{ opacity: 0, transition: { duration: 0.35 } }}
                        key={flight.id}
                      >
                        <svg className="block h-full w-full overflow-visible">
                          <defs>
                            <linearGradient
                              gradientUnits="userSpaceOnUse"
                              id={`nx-flight-grad-${flight.id}`}
                              x1={flight.x1}
                              y1={flight.y1}
                              x2={flight.x2}
                              y2={flight.y2}
                            >
                              <stop
                                offset="0%"
                                stopColor="#6ee7b7"
                                stopOpacity="0.9"
                              />
                              <stop
                                offset="100%"
                                stopColor="#67e8f9"
                                stopOpacity="0.9"
                              />
                            </linearGradient>
                          </defs>
                          <motion.path
                            animate={{
                              pathLength: 1,
                              opacity: [0, 0.5, 0.5, 0],
                            }}
                            d={flight.path}
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            stroke={`url(#nx-flight-grad-${flight.id})`}
                            strokeLinecap="round"
                            strokeWidth={1.5}
                            transition={{
                              opacity: {
                                duration: flight.duration,
                                times: [0, 0.15, 0.75, 1],
                              },
                              pathLength: {
                                duration: flight.duration,
                                ease: "easeInOut",
                              },
                            }}
                          />
                        </svg>
                        <motion.div
                          animate={{
                            x: flight.xs,
                            y: flight.ys,
                            rotate: flight.rs,
                            opacity: [0, 1, 1, 1],
                          }}
                          className="absolute left-0 top-0"
                          initial={{
                            x: flight.xs[0],
                            y: flight.ys[0],
                            rotate: flight.rs[0],
                            opacity: 0,
                          }}
                          transition={{
                            duration: flight.duration,
                            ease: "easeInOut",
                            times: flight.times,
                            opacity: {
                              duration: flight.duration,
                              times: [0, 0.08, 0.9, 1],
                            },
                            rotate: {
                              duration: flight.duration,
                              ease: "linear",
                              times: flight.times,
                            },
                          }}
                        >
                          <Plane
                            className="h-5 w-5 text-emerald-300"
                            style={{
                              filter:
                                "drop-shadow(0 0 7px rgba(110,231,183,0.9))",
                              transform: "rotate(45deg)",
                            }}
                          />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              <div className="w-full max-w-[440px]">
                {/* Stacked deck: every stop stays mounted for the whole
                    story. Passed stops fold to the left one STACK_STEP per
                    stop and sit behind the newer cards (newest on top), so
                    scrolling reads as a pile growing under the card instead
                    of cards vanishing; the incoming card slides in from the
                    right over the pile. Only the current card takes pointer
                    events. */}
                <motion.div
                  animate={{ opacity: storyDone ? 0 : 1 }}
                  className={storyDone ? "pointer-events-none" : undefined}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <div className="grid">
                    {cities.map((city, i) => {
                      const depth = stage - i;
                      const isCurrent = depth === 0;
                      const isPassed = depth > 0;
                      return (
                        <motion.div
                          animate={{
                            x: isPassed
                              ? -Math.min(depth * STACK_STEP, maxFan)
                              : isCurrent
                                ? 0
                                : 440,
                            opacity: isPassed || isCurrent ? 1 : 0,
                            scale: isPassed || isCurrent ? 1 : 0.94,
                          }}
                          className="relative col-start-1 row-start-1"
                          inert={!isCurrent}
                          initial={false}
                          key={city.city}
                          style={{
                            pointerEvents: isCurrent ? "auto" : "none",
                            zIndex: isCurrent ? 30 : isPassed ? 30 - depth : 0,
                          }}
                          transition={{
                            duration: 0.7,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          <div className="relative">
                            <CityCard
                              city={city}
                              img={city.img}
                              index={i}
                              isActive={isCurrent}
                              onClick={setActiveCity}
                              pattern={city.pattern}
                              story
                            />
                            {/* Depth tint: each stop behind the front card
                                sinks a little darker, so the fan reads as a
                                stack instead of one wide card. */}
                            <div
                              className="pointer-events-none absolute inset-0 z-40 rounded-3xl bg-[#020a16]"
                              style={{
                                opacity: isPassed
                                  ? Math.min(0.45, 0.14 * depth)
                                  : 0,
                              }}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* One tagline for the whole deck, in flow beneath the
                      stack: the card block stays vertically centred with it
                      and the text can never collide with the stop counter
                      the way an absolutely-positioned per-card caption did. */}
                  <div className="mt-5 min-h-[3.25rem] px-1 text-center text-sm leading-relaxed text-white/70 md:text-base">
                    <AnimatePresence mode="wait">
                      <motion.p
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        initial={{ opacity: 0, y: 8 }}
                        key={stage}
                        transition={{ duration: 0.35 }}
                      >
                        {cities[stage].tagline}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </motion.div>
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
                      {C_LEVEL_ATTENDEES}
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
                  {C_LEVEL_ATTENDEES}
                </p>
              </div>
            </div>
          </motion.div>
        )}
        {mode === "upcoming" && (
          <motion.div
            className={`mx-auto max-w-7xl px-4 text-center mt-16 ${
              cta ? "pb-8" : "pb-32"
            }`}
            {...entry.fade(0.36, 24)}
          >
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="nx-glass-pane inline-flex items-center gap-6 px-10 py-6">
                <Navigation className="w-10 h-10 text-emerald-400" />
                <div className="text-left">
                  <p className="text-gray-400 text-sm mb-1">{copy.statLabel}</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    {cities.length}
                  </p>
                </div>
              </div>
              {/* C-Level payoff — same panel language as the retrospective
                  page, so the numbers read as one pair, not a stray stat. */}
              <div className="nx-glass-pane inline-flex items-center gap-6 px-10 py-6">
                <Users className="w-10 h-10 text-emerald-400" />
                <div className="text-left">
                  <p className="text-gray-400 text-sm mb-1">
                    {copy.attendeeLabel}
                  </p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    {C_LEVEL_ATTENDEES}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Hand-off to the retrospective page (the 2026 tour story now
            lives on its own route instead of in this section). */}
        {cta && (
          <motion.div
            className="mx-auto max-w-7xl px-4 pb-32 text-center"
            {...entry.fade(0.48, 24)}
          >
            <GlassButton
              as="a"
              className="justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white"
              href={cta.href}
              tone="emerald"
            >
              <span>{cta.label}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </GlassButton>
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
