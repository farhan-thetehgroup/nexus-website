/* eslint-disable prettier/prettier */
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Users,
  Briefcase,
  Target,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const audienceData = [
  {
    icon: Briefcase,
    title: "C-Level Executive",
    desc: "CTO, CIO, CISO, CSO, CDO",
    gradient: "from-violet-600 to-purple-600",
    features: [
      "Strategic Decision Makers",
      "Budget Authority",
      "Vision Leaders",
    ],
    stats: "30%",
    bgPattern: "executives",
  },
  {
    icon: Users,
    title: "Director & Head of Department",
    desc: "AI, Cybersecurity, Enterprise Technology, IT, Digital Transformation, Innovation",
    gradient: "from-blue-600 to-cyan-600",
    features: [
      "Implementation Leaders",
      "Technical Experts",
      "Innovation Drivers",
    ],
    stats: "45%",
    bgPattern: "directors",
  },
  {
    icon: Target,
    title: "Decision-maker",
    desc: "Actively looking for AI, Cybersecurity, and Enterprise Technology Solution",
    gradient: "from-emerald-600 to-teal-600",
    features: ["Active Buyers", "Solution Seekers", "Ready to Invest"],
    stats: "25%",
    bgPattern: "decision",
  },
];

const AudienceCard = ({ item, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.4 });
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 0.9]
  );
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);

  const Icon = item.icon;

  return (
    <motion.div
      animate={
        isInView ?
          { opacity: 1, x: 0 }
        : { opacity: 0, x: index % 2 === 0 ? -100 : 100 }
      }
      className="relative group"
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      ref={cardRef}
      style={{ y, opacity, scale }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}>
      <div
        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
      />

      <motion.div
        className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-3xl border border-emerald-500/30 hover:border-emerald-400/70 overflow-hidden cursor-pointer"
        style={{ rotateX }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        whileHover={{ y: -15 }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent)]" />

        <div
          className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${item.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`}
        />

        <div className="relative p-8">
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.gradient} p-4 shadow-2xl relative`}
              transition={{ duration: 0.5 }}
              whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}>
              <Icon className="w-full h-full text-white" />
              <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl" />
            </motion.div>

            <motion.div
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              className={`px-4 py-2 rounded-full bg-gradient-to-r ${item.gradient} text-white font-bold text-sm shadow-lg`}
              initial={{ scale: 0 }}
              transition={{ delay: index * 0.2 + 0.5, type: "spring" }}>
              {item.stats}
            </motion.div>
          </div>

          <motion.div
            animate={isInView ? { width: "80px" } : { width: 0 }}
            className={`h-1.5 bg-gradient-to-r ${item.gradient} mb-4 rounded-full shadow-lg`}
            initial={{ width: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
          />

          <h3 className="text-3xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors duration-300">
            {item.title}
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed mb-6 group-hover:text-gray-100 transition-colors duration-300">
            {item.desc}
          </p>

          <div className="space-y-3">
            {item.features.map((feature, idx) => (
              <motion.div
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                className="flex items-center gap-3 text-gray-300 group-hover:text-emerald-400 transition-colors duration-300"
                initial={{ opacity: 0, x: -20 }}
                key={idx}
                transition={{ delay: index * 0.2 + 0.4 + idx * 0.1 }}>
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span className="font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${item.gradient} rounded-b-3xl`}
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

export const AudienceSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-32 px-4 overflow-hidden"
      id="audience"
      ref={containerRef}>
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY, rotate: bgRotate }}>
        <div className="absolute top-32 right-20 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-32 left-20 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          className="text-center mb-20"
          style={{ y: headerY, opacity: headerOpacity }}>
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/40 mb-6 backdrop-blur-sm"
            initial={{ scale: 0, rotate: -180 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            whileInView={{ scale: 1, rotate: 0 }}>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">
              Qualified Professionals
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}>
            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
              Target Audience
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileInView={{ opacity: 1 }}>
            Connect with 200+ senior decision-makers actively seeking
            cutting-edge solutions
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-8 text-sm"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileInView={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 animate-pulse" />
              <span className="text-gray-400">C-Level</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse" />
              <span className="text-gray-400">Directors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse" />
              <span className="text-gray-400">Decision Makers</span>
            </div>
          </motion.div>
        </motion.div>

        <div className="space-y-8">
          {audienceData.map((item, idx) => (
            <AudienceCard index={idx} item={item} key={idx} />
          ))}
        </div>

        {/* <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}>
          <div className="inline-block bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-xl px-8 py-6 rounded-2xl border border-emerald-500/30">
            <p className="text-gray-300 text-lg mb-2">
              Total Attendees per City
            </p>
            <p className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              200+
            </p>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};
