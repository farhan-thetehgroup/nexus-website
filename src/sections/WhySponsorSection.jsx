import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Target, TrendingUp, Globe, Award } from "lucide-react";

import {
  MaskedLine,
  useSectionEntry,
} from "../components/common/ui/SectionEntry";
import { GlowField } from "../components/common/ui/GlowField";
import { CursorSpotlight } from "../components/common/ui/CursorSpotlight";
import { DotFieldInteraction } from "../components/common/ui/DotFieldInteraction";

const whyReasons = [
  {
    icon: Target,
    title: "Targeted Audience",
    desc: "Gain direct access to 200 Chief, Director, Head, and Lead-level prospects in every city.",
    gradient: "from-blue-500 to-cyan-500",
    delay: 0,
  },
  {
    icon: TrendingUp,
    title: "Maximized ROI",
    desc: "Move beyond brand awareness to generate qualified leads, close deals, and build relationships in a high-intensity environment.",
    gradient: "from-purple-500 to-pink-500",
    delay: 0.2,
  },
  {
    icon: Globe,
    title: "Regional Dominance",
    desc: "Build your brand presence across multiple key APAC markets in a single, coordinated campaign.",
    gradient: "from-emerald-500 to-teal-500",
    delay: 0.4,
  },
  {
    icon: Award,
    title: "Quality Over Quantity",
    desc: "Our curated matchmaking ensures your time is spent with the right people who have real budget and authority.",
    gradient: "from-orange-500 to-red-500",
    delay: 0.6,
  },
];

const Card = ({ reason, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  const Icon = reason.icon;

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      ref={cardRef}
      transition={{
        duration: 0.85,
        delay: reason.delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Colored field the frost refracts: sits just behind the glass edge */}
      <div
        className={`absolute -inset-2 bg-gradient-to-br ${reason.gradient} rounded-[2rem] opacity-20 blur-2xl`}
      />

      {/* Glass panel */}
      <motion.div
        className="nx-glass-pane relative overflow-hidden p-8 cursor-pointer group-hover:border-white/30 transition-colors duration-300"
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -10 }}
      >
        {/* Refracted bloom inside the glass */}
        <div
          className={`absolute -top-24 -right-24 w-56 h-56 bg-gradient-to-br ${reason.gradient} rounded-full blur-3xl opacity-20`}
        />
        {/* Sheen along the top edge of the pane */}
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <div className="relative z-10">
          <motion.div
            className="nx-glass-icon relative w-16 h-16 flex items-center justify-center mb-6 overflow-hidden"
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.08 }}
          >
            {/* Faint tint of the card's gradient keeps each icon's identity */}
            <div
              className={`absolute inset-0 rounded-[inherit] bg-gradient-to-br ${reason.gradient} opacity-25`}
            />
            <Icon className="relative w-full h-full p-3 text-white" />
          </motion.div>

          <motion.div
            animate={isInView ? { width: "60px" } : { width: 0 }}
            className={`h-1 bg-gradient-to-r ${reason.gradient} mb-4 rounded-full`}
            initial={{ width: 0 }}
            transition={{ duration: 0.6, delay: reason.delay + 0.3 }}
          />

          <h3 className="text-2xl font-bold mb-4 text-white transition-colors duration-300">
            {reason.title}
          </h3>

          <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
            {reason.desc}
          </p>
        </div>
        <CursorSpotlight above />
      </motion.div>
    </motion.div>
  );
};

export const WhySponsorSection = () => {
  const containerRef = useRef(null);
  const entry = useSectionEntry();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-32 px-4"
      id="why"
      ref={containerRef}
    >
      <DotFieldInteraction />
      {/* Pooled color fields the glass needs behind the grid — the bottom
          purple pool straddles into the audience section's light */}
      <GlowField
        className="opacity-55"
        style={{ y: backgroundY }}
        blobs={[
          {
            className:
              "top-1/3 left-[10%] w-[380px] h-[380px] bg-emerald-500/40",
          },
          {
            className: "top-1/3 right-[8%] w-[420px] h-[420px] bg-cyan-500/30",
          },
          {
            className:
              "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[620px] h-[480px] bg-purple-500/25",
          },
          {
            className:
              "bottom-[12%] left-[22%] w-[300px] h-[300px] bg-orange-500/20",
          },
          {
            // Straddles the bottom seam into the audience section.
            className:
              "-bottom-48 left-[38%] w-[520px] h-[440px] bg-purple-500/20",
          },
          {
            // Receives the teal light arriving from the tour section above.
            className:
              "-top-40 right-[18%] w-[420px] h-[420px] bg-emerald-500/25",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-20">
          <motion.div
            className="nx-glass-chip inline-flex items-center gap-2 px-4 py-2 mb-6"
            {...entry.fade(0, 14, 0.6)}
          >
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-300 font-semibold">
              Premium Benefits
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <MaskedLine delay={0.1}>
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Why Sponsor Nexus?
              </span>
            </MaskedLine>
          </h2>

          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            {...entry.fade(0.24, 16)}
          >
            Unlock unprecedented opportunities and maximize your brands impact
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {whyReasons.map((reason, idx) => (
            <Card index={idx} key={idx} reason={reason} />
          ))}
        </div>
      </div>
    </section>
  );
};
