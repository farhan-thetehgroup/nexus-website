import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Calendar, MapPin, Users } from "lucide-react";

import { GlassButton } from "../common/ui/GlassButton";
import { CursorSpotlight } from "../common/ui/CursorSpotlight";

/**
 * Tour event card, shared by the scrollytelling stage (story) and the
 * section grids. `country` and `attendees` are optional: confirmed events
 * carry them, placeholder 2027 events may omit them. Date strings the
 * machine cannot parse (e.g. "TBA") simply fall through `isPastEvent` to
 * the non-past branch of the button label.
 */
export const CityCard = ({
  city,
  index,
  isActive,
  onClick,
  pattern,
  img,
  story,
}) => {
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
  // Story mode renders statically: the scrollytelling wrapper owns the
  // whole entrance (single fade+slide). Layering this card's own entry
  // (x/rotateY + per-index delay) AND the scroll-linked y/opacity/scale on
  // top of it is what made the stage card stutter.
  const flow = story
    ? {}
    : {
        animate: isInView
          ? { opacity: 1, x: 0, rotateY: 0 }
          : { opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: 20 },
        initial: { opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: 20 },
        style: { y, opacity, scale },
        transition: {
          duration: 0.8,
          delay: index * 0.15,
          ease: [0.21, 0.47, 0.32, 0.98],
        },
      };
  // In story mode the micro-details follow a small fixed offset instead
  // of index*0.15 (up to 0.9s of "appears, pauses, then moves").
  const detailDelay = story ? 0.25 : index * 0.15 + 0.3;

  return (
    <motion.div
      {...flow}
      className="relative group cursor-pointer"
      onClick={() => onClick(index)}
      ref={cardRef}
    >
      <motion.div
        animate={isActive ? { opacity: 0.4, scale: 1.1 } : {}}
        className={`absolute inset-0 bg-gradient-to-br ${city.gradient} rounded-3xl blur-2xl opacity-20 z-10 pointer-events-none`}
      />

      <motion.div
        className={`nx-glass-pane relative overflow-hidden bg-[#0a1a28]/70 ${
          isActive ? "border-white/35" : "hover:border-white/30"
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

            {city.country && (
              <motion.div
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                }
                className="nx-glass-chip px-4 py-1.5 text-white text-xs font-bold"
                initial={{ opacity: 0, y: 10 }}
                transition={{ delay: detailDelay, duration: 0.5 }}
              >
                {city.country}
              </motion.div>
            )}
          </div>

          <motion.div
            animate={isInView ? { width: "80px" } : { width: 0 }}
            className={`h-1.5 bg-gradient-to-r ${city.gradient} mb-4 rounded-full`}
            initial={{ width: 0 }}
            transition={{ duration: 0.6, delay: detailDelay }}
          />

          <h3
            className={`text-3xl font-bold mb-3 bg-gradient-to-r ${city.gradient} bg-clip-text text-transparent [text-shadow:0_1px_14px_rgba(2,10,22,0.65)]`}
          >
            {city.city}
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-white/85">
              <Calendar className={`w-5 h-5 text-emerald-400`} />
              <span className="font-medium">{city.date}</span>
            </div>
            {city.attendees && (
              <div className="flex items-center gap-3 text-white/85">
                <Users className={`w-5 h-5 text-emerald-400`} />
                <span className="font-medium">{city.attendees} Attendees</span>
              </div>
            )}
          </div>

          <GlassButton
            className="w-full justify-center gap-2 py-3 text-sm font-bold text-white"
            onClick={() => {
              if (city.url && city.url.trim() !== "") {
                window.open(city.url, "_blank", "noopener,noreferrer");
              }
            }}
            tone="emerald"
          >
            <span>
              {isPastEvent
                ? "Revisit Experience"
                : city.url && city.url.trim() !== ""
                  ? "Register Now"
                  : "Coming Soon"}
            </span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </GlassButton>
        </div>
        <CursorSpotlight above />
      </motion.div>
    </motion.div>
  );
};
