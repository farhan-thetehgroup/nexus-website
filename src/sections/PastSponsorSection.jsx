/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Handshake } from "lucide-react";

import { PARTNERS } from "../constants";

const SPEED_PARTNERS_MARQUEE = 40000;

export const PastSponsorSection = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    mass: 0.25,
  });

  const blobOpacity = useTransform(progress, [0, 1], [0.1, 0.3]);
  const blobScale = useTransform(progress, [0, 1], [0.8, 1.2]);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden py-20 md:py-28"
      id="sponsors"
      ref={sectionRef}
    >
      {/* Animated Background Blobs */}
      <motion.div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          className="absolute top-20 -left-24 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl"
          style={{ opacity: blobOpacity, scale: blobScale }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          className="absolute -right-28 bottom-20 h-[500px] w-[500px] rounded-full bg-cyan-400/20 blur-3xl"
          style={{ opacity: blobOpacity, scale: blobScale }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-400/40 mb-6 backdrop-blur-sm shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            viewport={{ once: false }}
            whileInView={{ scale: 1, rotate: 0 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Handshake className="w-5 h-5 text-emerald-400" />
            </motion.div>
            <span className="text-emerald-400 font-semibold text-sm md:text-base">
              Proudly partnered with leading institutions
            </span>
            <motion.span
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
              className="h-2 w-2 rounded-full bg-emerald-400"
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: false }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Our Past Sponsors
            </span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: false }}
            whileInView={{ opacity: 1 }}
          >
            Join a prestigious group of sponsors and partners who are shaping
            the future of technology and innovation. Elevate your brand by
            collaborating with us.
          </motion.p>
        </div>

        {/* Marquee Section */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: false }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <PartnersMarquee logos={PARTNERS} speedMs={SPEED_PARTNERS_MARQUEE} />
        </motion.div>
      </div>
    </section>
  );
};

const PartnersMarquee = ({ logos = [], speedMs = 40000 }) => {
  // Spread logos round-robin into 4 rows so each row stays near-equal and
  // the drop order is preserved. Alternating rows scroll opposite ways:
  // row 1 right-to-left, row 2 left-to-right, and so on.
  const rowsCount = 4;
  const rowDirections = ["rtl", "ltr", "rtl", "ltr"];
  // Slight speed detunes so rows never look mechanically synchronized.
  const rowSpeedFactors = [1, 1.08, 0.94, 1.04];

  const rows = Array.from({ length: rowsCount }, () => []);
  logos.forEach((logo, i) => rows[i % rowsCount].push(logo));

  return (
    // One elliptical fog mask wraps all four rows (instead of a per-row
    // linear fade): the band fades out toward every edge with a curved,
    // circular vignette ~ a third deep on each side.
    <div
      className="relative overflow-hidden py-6 max-w-7xl mx-auto"
      style={{
        maskImage:
          "radial-gradient(ellipse 48% 78% at 50% 50%, black 40%, rgba(0, 0, 0, 0.55) 70%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 48% 78% at 50% 50%, black 40%, rgba(0, 0, 0, 0.55) 70%, transparent 100%)",
      }}
    >
      {rows.map((row, index) => (
        <MarqueeRow
          key={index}
          direction={rowDirections[index]}
          index={index}
          logos={row}
          speedMs={speedMs * rowSpeedFactors[index]}
        />
      ))}
    </div>
  );
};

const MarqueeRow = ({ direction, index, logos = [], speedMs }) => {
  const [isPaused, setIsPaused] = useState(false);
  const track = [...logos, ...logos];

  return (
    <div
      className={`relative ${index > 0 ? "mt-6" : ""}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex">
        <motion.div
          animate={{
            x: isPaused
              ? undefined
              : direction === "rtl"
                ? [0, "-50%"]
                : ["-50%", 0],
          }}
          className="flex gap-6 will-change-transform"
          style={{
            display: "flex",
            minWidth: "max-content",
          }}
          transition={
            isPaused
              ? {}
              : {
                  duration: speedMs / 1000,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }
          }
        >
          {track.map((logo, i) => (
            <LogoCard key={`row${index}-${i}`} logo={logo} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const LogoCard = ({ logo }) => {
  const handleClick = () => {
    if (logo.url) {
      window.open(logo.url, "_blank", "noopener,noreferrer");
    }
  };

  // Plain white tile, uniform size, logo in full color (no grayscale).
  return (
    <motion.div
      className="flex h-24 w-40 items-center justify-center rounded-2xl bg-white shadow-md cursor-pointer"
      onClick={handleClick}
      whileHover={{
        scale: 1.06,
        y: -4,
        boxShadow: "0 16px 32px rgba(0, 0, 0, 0.35)",
      }}
    >
      <img
        alt={logo.alt}
        className="h-auto max-h-12 w-auto max-w-[130px] object-contain"
        src={logo.src}
      />
    </motion.div>
  );
};
