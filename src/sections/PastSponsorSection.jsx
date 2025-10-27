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
      ref={sectionRef}>
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
            whileInView={{ scale: 1, rotate: 0 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
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
            whileInView={{ opacity: 1, y: 0 }}>
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Our Past Sponsors
            </span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: false }}
            whileInView={{ opacity: 1 }}>
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
          whileInView={{ opacity: 1, y: 0 }}>
          <PartnersMarquee logos={PARTNERS} speedMs={SPEED_PARTNERS_MARQUEE} />
        </motion.div>
      </div>
    </section>
  );
};

const PartnersMarquee = ({ logos = [], speedMs = 40000 }) => {
  const [isPausedTop, setIsPausedTop] = useState(false);
  const [isPausedBottom, setIsPausedBottom] = useState(false);

  const trackTop = [...logos, ...logos];
  const offset = 1;
  const trackBottom = [
    ...logos.slice(offset),
    ...logos.slice(0, offset),
    ...logos.slice(offset),
    ...logos.slice(0, offset),
  ];

  return (
    <div className="relative overflow-hidden py-4 max-w-7xl mx-auto">
      {/* Top Row */}
      <div
        className="mb-8 relative"
        onMouseEnter={() => setIsPausedTop(true)}
        onMouseLeave={() => setIsPausedTop(false)}
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}>
        <motion.div
          animate={{ scale: isPausedTop ? 1.05 : 1 }}
          className="flex gap-6"
          transition={{ duration: 0.3 }}>
          <motion.div
            animate={{
              x: isPausedTop ? undefined : [0, "-50%"],
            }}
            className="flex gap-6 will-change-transform"
            style={{
              display: "flex",
              minWidth: "max-content",
            }}
            transition={
              isPausedTop ?
                {}
              : {
                  duration: speedMs / 1000,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }
            }>
            {trackTop.map((logo, i) => (
              <LogoCard isPaused={isPausedTop} key={`top-${i}`} logo={logo} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div
        className="relative"
        onMouseEnter={() => setIsPausedBottom(true)}
        onMouseLeave={() => setIsPausedBottom(false)}
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}>
        <motion.div
          animate={{ scale: isPausedBottom ? 1.05 : 1 }}
          className="flex gap-6"
          transition={{ duration: 0.3 }}>
          <motion.div
            animate={{
              x: isPausedBottom ? undefined : ["-50%", 0],
            }}
            className="flex gap-6 will-change-transform"
            style={{
              display: "flex",
              minWidth: "max-content",
            }}
            transition={
              isPausedBottom ?
                {}
              : {
                  duration: (speedMs * 1.1) / 1000,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }
            }>
            {trackBottom.map((logo, i) => (
              <LogoCard
                isPaused={isPausedBottom}
                key={`bottom-${i}`}
                logo={logo}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

const LogoCard = ({ logo }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (logo.url) {
      window.open(logo.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-w-[160px] min-h-[80px] rounded-3xl bg-white/90 backdrop-blur-sm border-2 border-emerald-400/30 shadow-lg cursor-pointer overflow-hidden relative group"
      onClick={handleClick}
      onHoverEnd={() => setIsHovered(false)}
      onHoverStart={() => setIsHovered(true)}
      transition={{ duration: 0.3 }}
      whileHover={{
        scale: 1.08,
        y: -4,
        borderColor: "rgba(16, 185, 129, 0.6)",
        boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)",
      }}>
      {/* Glow Effect */}
      <motion.div
        animate={{ opacity: isHovered ? 1 : 0 }}
        className="absolute inset-0 bg-gradient-to-br from-tech-green-100/10 to-brand-400/20 opacity-0"
        transition={{ duration: 0.3 }}
      />

      {/* Shine Effect */}
      <motion.div
        animate={{ x: isHovered ? "200%" : "-100%" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        transition={{ duration: 0.6 }}
      />

      {/* Logo */}
      <motion.img
        alt={logo.alt}
        animate={{
          filter:
            isHovered ?
              "grayscale(0%) brightness(1.15) contrast(1.1)"
            : "grayscale(100%) brightness(0.95) opacity(0.8)",
        }}
        className="relative z-10 h-auto max-h-12 w-auto max-w-[130px] object-contain"
        src={logo.src}
        transition={{ duration: 0.3 }}
      />

      {/* Corner Accents */}
      <motion.div
        animate={{
          borderColor:
            isHovered ? "rgba(16, 185, 129, 0.6)" : "rgba(16, 185, 129, 0)",
        }}
        className="absolute top-1 right-1 w-6 h-6 border-t-2 border-r-2 border-emerald-400/0 rounded-tr-3xl"
        transition={{ duration: 0.3 }}
      />
      <motion.div
        animate={{
          borderColor:
            isHovered ? "rgba(6, 182, 212, 0.6)" : "rgba(6, 182, 212, 0)",
        }}
        className="absolute bottom-1 left-1 w-6 h-6 border-b-2 border-l-2 border-cyan-400/0 rounded-bl-3xl"
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};
