/* eslint-disable prettier/prettier */
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  MapPin,
  Calendar,
  Globe,
  Navigation,
  Plane,
  Users,
  ArrowRight,
} from "lucide-react";

import { TOUR_CITIES } from "../constants";
import { GalleryModal } from "../components/GalleryModal";
import { DotWorldMap, latLonToGrid } from "../components/aurora/DotWorldMap";
import dotMapDense from "../components/aurora/dotMapDense.json";
import { useMotionPreference } from "../components/aurora/useMotionPreference";
import { GlowField } from "../components/common/ui/GlowField";
import {
  MaskedLine,
  useSectionEntry,
} from "../components/common/ui/SectionEntry";
import { CursorSpotlight } from "../components/common/ui/CursorSpotlight";

// City pulse points for the dotted map background — real coordinates
// projected onto the dense map's grid (see DotWorldMap.latLonToGrid).
const cityPulsePoints = TOUR_CITIES.filter((c) => c.coords).map((c) =>
  latLonToGrid(c.coords.lat, c.coords.lon, dotMapDense),
);

const CityCard = ({ city, index, isActive, onClick, pattern, img }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8],
  );

  const isPastEvent =
    new Date(city.date) < new Date(new Date().setHours(0, 0, 0, 0));

  return (
    <motion.div
      animate={
        isInView
          ? { opacity: 1, x: 0, rotateY: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: 20 }
      }
      className="relative group cursor-pointer"
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: 20 }}
      onClick={() => onClick(index)}
      ref={cardRef}
      style={{ y, opacity, scale }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <motion.div
        animate={isActive ? { opacity: 0.4, scale: 1.1 } : {}}
        className={`absolute inset-0 bg-gradient-to-br ${city.gradient} rounded-3xl blur-2xl opacity-20 z-10 pointer-events-none`}
      />

      <motion.div
        className={`nx-glass-pane relative overflow-hidden ${
          isActive ? "border-emerald-400/70" : "hover:border-white/30"
        } transition-colors duration-300`}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -10 }}
      >
        {/* Optional image overlay if provided */}
        {img && (
          <img
            alt="city-bg"
            className="absolute inset-0 z-0 w-full h-full object-cover opacity-15 pointer-events-none"
            src={img}
          />
        )}
        {/* Pattern background if provided */}
        {pattern && (
          <div className="absolute inset-0 z-10 pointer-events-none">
            {typeof pattern === "string" && pattern.startsWith("<svg") ? (
              <div
                className="w-full h-full opacity-30 mix-blend-overlay"
                dangerouslySetInnerHTML={{ __html: pattern }}
              />
            ) : (
              <img
                alt="pattern"
                className="w-full h-full object-cover opacity-30 mix-blend-overlay"
                src={pattern}
              />
            )}
          </div>
        )}
        <div
          className={`absolute inset-0 z-20 bg-gradient-to-br ${city.gradient} opacity-0 pointer-events-none`}
        />

        <div
          className={`absolute top-0 right-0 z-20 w-32 h-32 bg-gradient-to-br ${city.gradient} rounded-bl-full opacity-20`}
        />

        {isActive && (
          <motion.div
            animate={{ scale: 1 }}
            className="absolute -top-3 -right-3 z-40"
            initial={{ scale: 0 }}
          >
            <div className="w-6 h-6 rounded-full bg-tech-green-500 shadow-[0_0_0_4px_rgba(16,185,129,0.25)]" />
          </motion.div>
        )}

        <div className="relative z-30 p-8">
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className={`nx-glass-icon relative w-16 h-16 p-3 overflow-hidden`}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.08 }}
            >
              {/* Faint tint of the card's gradient keeps identity */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${city.gradient} opacity-25`}
              />
              <MapPin className="relative w-full h-full text-white" />
            </motion.div>

            <motion.div
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              className="nx-glass-chip px-4 py-1.5 text-white text-xs font-bold"
              initial={{ opacity: 0, y: 10 }}
              transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
            >
              {city.country}
            </motion.div>
          </div>

          <motion.div
            animate={isInView ? { width: "80px" } : { width: 0 }}
            className={`h-1.5 bg-gradient-to-r ${city.gradient} mb-4 rounded-full`}
            initial={{ width: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 + 0.3 }}
          />

          <h3
            className={`text-3xl font-bold mb-3 bg-gradient-to-r ${city.gradient} bg-clip-text text-transparent`}
          >
            {city.city}
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-gray-300">
              <Calendar className={`w-5 h-5 text-emerald-400`} />
              <span className="font-medium">{city.date}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Users className={`w-5 h-5 text-emerald-400`} />
              <span className="font-medium">{city.attendees} Attendees</span>
            </div>
          </div>

          <motion.button
            className={`w-full py-3 rounded-xl bg-gradient-to-r ${city.gradient} text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group/btn`}
            onClick={() => {
              if (city.url && city.url.trim() !== "") {
                window.open(city.url, "_blank", "noopener,noreferrer");
              }
            }}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>
              {isPastEvent
                ? "Revisit Experience"
                : city.url && city.url.trim() !== ""
                  ? "Register Now"
                  : "Coming Soon"}
            </span>
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
        <CursorSpotlight above />
      </motion.div>
    </motion.div>
  );
};

export const TourSection = () => {
  const [activeCity, setActiveCity] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [stage, setStage] = useState(0);
  const [storyDone, setStoryDone] = useState(false);
  const [labelPos, setLabelPos] = useState(null);
  const entry = useSectionEntry();
  const motionOk = useMotionPreference();
  const containerRef = useRef(null);
  const storyRef = useRef(null);
  const stageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Story phases: N x 100vh, one tour stop per screen of scroll.
  const { scrollYProgress: storyP } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });

  const syncStory = useCallback((v) => {
    setStage(
      Math.min(TOUR_CITIES.length - 1, Math.floor(v * TOUR_CITIES.length)),
    );
    setStoryDone(v >= 0.995);
  }, []);
  useMotionValueEvent(storyP, "change", syncStory);
  // Deep links can land past the story — sync the stage once mounted.
  useEffect(() => {
    syncStory(storyP.get());
  }, [storyP, syncStory]);

  // Anchors the "you are here" chip to the active city's dot on the
  // canvas. Mirrors DotWorldMap's cover-fit math (fit="cover",
  // anchorX=1) so the chip and the canvas pulse never disagree.
  useEffect(() => {
    const update = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const { cols = 400, rows = 136 } = dotMapDense;
      const step = Math.max(rect.width / cols, rect.height / rows);
      const g = cityPulsePoints[stage];
      if (!g) return;
      setLabelPos({
        x: (g.x + 0.5) * step + (rect.width - cols * step),
        y: (g.y + 0.5) * step,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [stage]);

  const pulsePoints = cityPulsePoints.map((p, i) => ({
    ...p,
    // During the story one city leads; once the grid takes over the
    // whole tour breathes together.
    active: storyDone || i === stage,
  }));

  return (
    <section className="relative" id="tours" ref={containerRef}>
      {/* Pinned dotted map — sticks through BOTH the story and the grid,
          so the map background never truncates between the two phases.
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
          pulsePoints={pulsePoints}
        />
      </div>

      {/* Ambient light — parallax layer over the pinned map, free to
          spill across both section seams */}
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
            // Straddles the bottom seam into the why-sponsor section.
            className:
              "-bottom-56 left-[30%] w-[480px] h-[480px] bg-teal-500/25",
          },
          {
            // Receives the light arriving from the video section above.
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
              <Globe className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">
                Multi-City Tour
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-7xl font-bold mb-4">
              <MaskedLine delay={0.1}>
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  Join Us in Shaping the Future
                </span>
              </MaskedLine>
            </h2>

            <motion.p
              className="text-3xl font-bold text-white mb-4"
              {...entry.fade(0.24, 16)}
            >
              APAC Tech Tour 2026
            </motion.p>

            <motion.p
              className="text-xl text-gray-400 max-w-3xl mx-auto"
              {...entry.fade(0.36, 24)}
            >
              A roadshow across 6 major APAC cities connecting innovators and
              decision-makers
            </motion.p>
          </div>
        </div>

        {/* Story: every screen of scroll reveals one card and lifts its
            city on the map; the last screen hands over to the grid */}
        <div
          className="relative"
          ref={storyRef}
          style={{ height: `${TOUR_CITIES.length * 100}vh` }}
        >
          <div
            className="sticky top-0 flex h-screen items-center justify-center px-6 md:px-16"
            ref={stageRef}
          >
            {!storyDone && labelPos && (
              <div
                className="pointer-events-none absolute z-20"
                style={{
                  left: labelPos.x,
                  top: labelPos.y,
                  transform: "translate(-50%, -150%)",
                }}
              >
                <div className="nx-glass-chip px-3 py-1 text-xs font-semibold whitespace-nowrap text-emerald-300">
                  {TOUR_CITIES[stage].city}
                </div>
              </div>
            )}

            <div className="w-full max-w-[440px]">
              <AnimatePresence mode="wait">
                {!storyDone && (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -18 }}
                    initial={{ opacity: 0, y: 24 }}
                    key={stage}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <CityCard
                      city={TOUR_CITIES[stage]}
                      img={TOUR_CITIES[stage].img}
                      index={stage}
                      isActive
                      onClick={setActiveCity}
                      pattern={TOUR_CITIES[stage].pattern}
                      setShowGallery={setShowGallery}
                    />
                    <p className="mt-5 max-w-md px-1 text-center text-sm leading-relaxed text-white/70 md:text-base">
                      {TOUR_CITIES[stage].tagline}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {!storyDone && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <div className="nx-glass-chip flex items-center gap-3 px-4 py-2">
                  {TOUR_CITIES.map((c, i) => (
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
                    Stop {stage + 1}/{TOUR_CITIES.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* All stops — the full grid, as before */}
        <div className="mx-auto max-w-7xl px-4 pb-32">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {TOUR_CITIES.map((city, idx) => (
              <div
                className={
                  TOUR_CITIES.length % 3 === 1 && idx === TOUR_CITIES.length - 1
                    ? "lg:col-start-2"
                    : ""
                }
                key={idx}
              >
                <CityCard
                  city={city}
                  img={city.img}
                  index={idx}
                  isActive={activeCity === idx}
                  onClick={setActiveCity}
                  pattern={city.pattern}
                  setShowGallery={setShowGallery}
                />
              </div>
            ))}
          </div>

          <motion.div className="text-center mt-16" {...entry.fade(0.36, 24)}>
            <div className="nx-glass-pane inline-flex items-center gap-6 px-10 py-6">
              <Navigation className="w-10 h-10 text-emerald-400" />
              <div className="text-left">
                <p className="text-gray-400 text-sm mb-1">
                  Total Expected C-Level Attendees
                </p>
                <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  2200+
                </p>
              </div>
            </div>
          </motion.div>
        </div>
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
