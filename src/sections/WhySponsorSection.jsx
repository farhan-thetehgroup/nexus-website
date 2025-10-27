import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Target, TrendingUp, Globe, Award } from "lucide-react";

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
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  const Icon = reason.icon;

  return (
    <motion.div
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      className="relative group"
      initial={{ opacity: 0, y: 50 }}
      ref={cardRef}
      style={{ y, opacity, scale, rotate }}
      transition={{
        duration: 0.8,
        delay: reason.delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

      <motion.div
        className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-8 rounded-3xl border border-emerald-500/20 hover:border-emerald-400/60 overflow-hidden group cursor-pointer"
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        whileHover={{ y: -10 }}>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/10 group-hover:to-cyan-500/10 transition-all duration-500" />

        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

        <div className="relative z-10">
          <motion.div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.gradient} p-3 mb-6 shadow-lg`}
            transition={{ duration: 0.6 }}
            whileHover={{ rotate: 360, scale: 1.1 }}>
            <Icon className="w-full h-full text-white" />
          </motion.div>

          <motion.div
            animate={isInView ? { width: "60px" } : { width: 0 }}
            className={`h-1 bg-gradient-to-r ${reason.gradient} mb-4 rounded-full`}
            initial={{ width: 0 }}
            transition={{ duration: 0.6, delay: reason.delay + 0.3 }}
          />

          <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-400 transition-colors duration-300">
            {reason.title}
          </h3>

          <p className="text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
            {reason.desc}
          </p>

          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"
            initial={{ scaleX: 0 }}
            style={{ originX: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scaleX: 1 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export const WhySponsorSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-32 px-4 overflow-hidden"
      id="why"
      ref={containerRef}>
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ y: backgroundY }}>
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl" />
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          className="text-center mb-20"
          style={{ y: headerY, opacity: headerOpacity }}>
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6"
            initial={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            whileInView={{ scale: 1 }}>
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">
              Premium Benefits
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}>
            Why Sponsor Nexus?
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileInView={{ opacity: 1 }}>
            Unlock unprecedented opportunities and maximize your brands impact
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {whyReasons.map((reason, idx) => (
            <Card index={idx} key={idx} reason={reason} />
          ))}
        </div>
      </div>
    </section>
  );
};
