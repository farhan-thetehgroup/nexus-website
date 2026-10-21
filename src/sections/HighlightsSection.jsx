/* eslint-disable prettier/prettier */
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Camera, MapPin } from "lucide-react";

import {
  MaskedLine,
  useSectionEntry,
} from "../components/common/ui/SectionEntry";
import { CursorSpotlight } from "../components/common/ui/CursorSpotlight";
import { GALLERY } from "../constants";

/**
 * Highlights — moments from the past tour editions, right after sponsors.
 * Glass style: photo cards carry the pooled color; the pane supplies the
 * frost. Hover = border tint only, captions stay in a glass bar.
 */
export const HighlightsSection = () => {
  const containerRef = useRef(null);
  const entry = useSectionEntry();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-32 px-4 overflow-hidden"
      id="highlights"
      ref={containerRef}
    >
      {/* Pooled color fields the glass needs behind the grid */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-1/4 left-[15%] w-80 h-80 bg-emerald-500/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-[10%] w-96 h-96 bg-cyan-500/25 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-72 bg-blue-500/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-16">
          <motion.div
            className="nx-glass-chip inline-flex items-center gap-2 px-5 py-2 mb-6"
            {...entry.fade(0, 14, 0.6)}
          >
            <Camera className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-300 font-semibold">
              From Past Editions
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <MaskedLine delay={0.1}>
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Event Highlights
              </span>
            </MaskedLine>
          </h2>

          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            {...entry.fade(0.24, 16)}
          >
            Moments from previous NEXUS editions across the Asia-Pacific
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((photo, idx) => (
            <motion.article
              className="nx-glass-pane group relative overflow-hidden cursor-pointer transition-colors duration-300 hover:border-white/30"
              {...entry.fade(idx * 0.08, 24, 0.85)}
              key={photo.src}
            >
              <img
                alt={photo.alt}
                className="h-56 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                src={photo.src}
              />

              {/* Glass caption bar */}
              <div className="nx-glass-chip absolute bottom-4 left-4 right-4 rounded-2xl px-4 py-2.5 flex items-center gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 text-emerald-300" />
                <span className="text-sm font-medium text-white truncate">
                  {photo.alt}
                </span>
              </div>

              <CursorSpotlight above />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
