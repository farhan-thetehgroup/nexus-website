/* eslint-disable prettier/prettier */
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
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

const CityCard = ({ city, index, isActive, onClick, pattern, img }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.5 });
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  return (
    <motion.div
      animate={
        isInView ?
          { opacity: 1, x: 0, rotateY: 0 }
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
      }}>
      <motion.div
        animate={isActive ? { opacity: 0.4, scale: 1.1 } : {}}
        className={`absolute inset-0 bg-gradient-to-br ${city.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-500 z-10 pointer-events-none`}
      />

      <motion.div
        className={`relative overflow-hidden bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-3xl border-2 ${
          isActive ? "border-emerald-400/80" : "border-emerald-500/30"
        } hover:border-emerald-400/70 overflow-hidden`}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        whileHover={{ y: -15, scale: 1.05 }}>
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
            {typeof pattern === "string" && pattern.startsWith("<svg") ?
              <div
                className="w-full h-full opacity-30 mix-blend-overlay"
                dangerouslySetInnerHTML={{ __html: pattern }}
              />
            : <img
                alt="pattern"
                className="w-full h-full object-cover opacity-30 mix-blend-overlay"
                src={pattern}
              />
            }
          </div>
        )}
        <div
          className={`absolute inset-0 z-20 bg-gradient-to-br ${city.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        <div
          className={`absolute top-0 right-0 z-30 w-32 h-32 bg-gradient-to-br ${city.gradient} rounded-bl-full opacity-20`}
        />

        {isActive && (
          <motion.div
            animate={{ scale: 1 }}
            className="absolute -top-3 -right-3 z-40"
            initial={{ scale: 0 }}>
            <div className="w-6 h-6 rounded-full bg-tech-green-500 animate-ping" />
            <div className="absolute top-0 left-0 w-6 h-6 rounded-full bg-tech-green-500" />
          </motion.div>
        )}

        <div className="relative z-30 p-8">
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${city.gradient} p-3 shadow-2xl relative`}
              transition={{ duration: 0.6 }}
              whileHover={{ rotate: 360, scale: 1.2 }}>
              <MapPin className="w-full h-full text-white" />
              <div
                className={`absolute inset-0 bg-gradient-to-br ${city.gradient} rounded-2xl blur-xl opacity-50`}
              />
            </motion.div>

            <motion.div
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${city.gradient} text-white text-xs font-bold shadow-lg`}
              initial={{ scale: 0 }}
              transition={{ delay: index * 0.15 + 0.3 }}>
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
            className={`text-3xl font-bold mb-3 bg-gradient-to-r ${city.gradient} bg-clip-text text-transparent`}>
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
              // setShowGallery({ images: city.gallery, gradient: city.gradient });
            }}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}>
            <span>Coming Soon</span>
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>

          <motion.div
            className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${city.gradient}`}
            initial={{ scaleX: 0 }}
            style={{ originX: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scaleX: 1 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export const TourSection = () => {
  const [activeCity, setActiveCity] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-32 px-4 overflow-hidden"
      id="tours"
      ref={containerRef}>
      {/* Pattern SVG background above gradient blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          className="w-full h-full"
          fill="none"
          height="100%"
          viewBox="0 0 1440 900"
          width="100%"
          xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              height="40"
              id="pattern-circles"
              patternUnits="userSpaceOnUse"
              width="40"
              x="0"
              y="0">
              <circle cx="2" cy="2" fill="#2dd4bf" opacity="0.12" r="2" />
            </pattern>
          </defs>
          <rect fill="url(#pattern-circles)" height="900" width="1440" />
        </svg>
      </div>

      <motion.div
        className="absolute inset-0 opacity-20 z-10 pointer-events-none"
        style={{ y: backgroundY }}>
        <div className="absolute top-32 right-20 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-20 w-80 h-80 bg-cyan-500/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="absolute inset-0 z-20 pointer-events-none bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          className="text-center mb-20"
          style={{ y: headerY, opacity: headerOpacity }}>
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/40 mb-6 backdrop-blur-sm"
            initial={{ scale: 0, rotate: -180 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            whileInView={{ scale: 1, rotate: 0 }}>
            <Globe
              className="w-5 h-5 text-emerald-400 animate-spin"
              style={{ animationDuration: "8s" }}
            />
            <span className="text-emerald-400 font-semibold">
              Multi-City Tour
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}>
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Join Us in Shaping the Future
            </span>
          </motion.h2>

          <motion.p
            className="text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileInView={{ opacity: 1 }}>
            APAC Tech Tour 2026
          </motion.p>

          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileInView={{ opacity: 1 }}>
            A roadshow across 6 major APAC cities connecting innovators and
            decision-makers
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOUR_CITIES.map((city, idx) => (
            <div
              key={idx}
              className={
                TOUR_CITIES.length % 3 === 1 && idx === TOUR_CITIES.length - 1 ?
                  "lg:col-start-2"
                : ""
              }>
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

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          whileInView={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-6 bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-xl px-10 py-6 rounded-2xl border border-emerald-500/30">
            <Navigation className="w-10 h-10 text-emerald-400" />
            <div className="text-left">
              <p className="text-gray-400 text-sm mb-1">
                Total Expected C-Level Attendees
              </p>
              <p className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                3000+
              </p>
            </div>
          </div>
        </motion.div>
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
