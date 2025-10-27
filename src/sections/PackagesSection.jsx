import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Check,
  Crown,
  Star,
  Zap,
  ChevronRight,
  Sparkles,
  Award,
} from "lucide-react";

const packagesData = [
  {
    name: "BRONZE",
    price: "15,000",
    subtitle: "Essential Presence",
    color: "from-amber-600 to-orange-700",
    borderColor: "border-amber-500/40",
    badge: null,
    icon: Award,
    features: [
      "Conference Pass (2 pax)",
      "Exhibition Booth (3m x 3m)",
      "Logo on Event Materials",
      "Social Media Mentions",
      "Post-Event Report Access",
    ],
  },
  {
    name: "SILVER",
    price: "25,000",
    subtitle: "Enhanced Visibility",
    color: "from-slate-400 to-slate-600",
    borderColor: "border-slate-400/40",
    badge: "Most Popular",
    badgeColor: "from-blue-500 to-cyan-500",
    icon: Star,
    featured: true,
    features: [
      "Conference Pass (4 pax)",
      "Premium Exhibition Booth (4m x 4m)",
      "Workshop Co-Hosting Slot",
      "Logo on Stage Backdrop",
      "15-minute Speaking Opportunity",
      "VIP Networking Dinner Access",
      "Dedicated Email Blast",
      "Lead Retrieval System",
    ],
  },
  {
    name: "GOLD",
    price: "40,000",
    subtitle: "Maximum Impact",
    color: "from-yellow-400 to-amber-600",
    borderColor: "border-yellow-500/40",
    badge: "Best Value",
    badgeColor: "from-purple-500 to-pink-500",
    icon: Crown,
    features: [
      "Conference Pass (6 pax)",
      "Prime Exhibition Booth (5m x 5m)",
      "Keynote Speaking Slot (30 mins)",
      "Exclusive Workshop Session",
      "Logo Prominence (Top-tier)",
      "VIP Lounge Access",
      "Pre-Event Attendee List",
      "30 Pre-Scheduled Meetings",
      "Dedicated Social Media Campaign",
      "Post-Event Video Highlights",
    ],
  },
];

const PackageCard = ({ pkg, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.8]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const Icon = pkg.icon;

  return (
    <motion.div
      animate={
        isInView ?
          { opacity: 1, y: 0, rotateY: 0 }
        : { opacity: 0, y: 100, rotateY: -20 }
      }
      className={`relative ${pkg.featured ? "md:-mt-8" : ""}`}
      initial={{ opacity: 0, y: 100, rotateY: -20 }}
      ref={cardRef}
      style={{ y: pkg.featured ? 0 : y, scale, opacity }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}>
      {pkg.badge && (
        <motion.div
          animate={isInView ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
          initial={{ y: -20, opacity: 0 }}
          transition={{ delay: index * 0.2 + 0.4 }}>
          <div
            className={`px-6 py-2 rounded-full bg-gradient-to-r ${pkg.badgeColor} shadow-2xl flex items-center gap-2`}>
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-white font-bold text-sm">{pkg.badge}</span>
          </div>
        </motion.div>
      )}

      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${pkg.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-all duration-500`}
      />

      <motion.div
        className={`relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl rounded-3xl border-2 ${
          pkg.borderColor
        } hover:border-opacity-100 overflow-hidden cursor-pointer group ${
          pkg.featured ? "shadow-2xl shadow-slate-500/20" : ""
        }`}
        style={{ rotateX }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        whileHover={{
          y: -20,
          scale: 1.05,
        }}>
        <div
          className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        <div
          className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${pkg.color} rounded-bl-full opacity-20`}
        />

        <div className="relative p-8">
          <div className="flex items-center justify-between mb-6">
            <motion.div
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pkg.color} p-3 shadow-2xl`}
              transition={{ duration: 0.6 }}
              whileHover={{ rotate: 360 }}>
              <Icon className="w-full h-full text-white" />
            </motion.div>

            {pkg.featured && (
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                className="text-yellow-400"
                transition={{ duration: 2, repeat: Infinity }}>
                <Zap className="w-8 h-8 fill-yellow-400" />
              </motion.div>
            )}
          </div>

          <motion.div
            animate={isInView ? { width: "100%" } : { width: 0 }}
            className={`h-1 bg-gradient-to-r ${pkg.color} mb-6 rounded-full`}
            initial={{ width: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
          />

          <h3
            className={`text-3xl font-bold mb-2 bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
            {pkg.name}
          </h3>

          <p className="text-gray-400 text-sm mb-6">{pkg.subtitle}</p>

          <div className="mb-8">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-white">
                ${pkg.price.split(",")[0]}
                <span className="text-3xl">,{pkg.price.split(",")[1]}</span>
              </span>
              <span className="text-gray-400 text-lg">USD</span>
            </div>
            <p className="text-gray-500 text-sm mt-2">per event city</p>
          </div>

          <div className="space-y-4 mb-8">
            {pkg.features.map((feature, idx) => (
              <motion.div
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                }
                className="flex items-start gap-3 group/item"
                initial={{ opacity: 0, x: -20 }}
                key={idx}
                transition={{ delay: index * 0.2 + 0.5 + idx * 0.05 }}>
                <div
                  className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${pkg.color} flex items-center justify-center mt-0.5`}>
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-gray-300 group-hover/item:text-white transition-colors duration-200">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.button
            className={`w-full py-4 rounded-xl bg-gradient-to-r ${pkg.color} text-white font-bold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group/btn`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <span>Choose {pkg.name}</span>
            <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${pkg.color}`}
          initial={{ scaleX: 0 }}
          style={{ originX: 0 }}
          transition={{ duration: 0.4 }}
          whileHover={{ scaleX: 1 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default function PackagesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-32 px-4 overflow-hidden bg-gradient-to-br from-slate-950 via-amber-950/20 to-slate-950"
      id="packages"
      ref={containerRef}>
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}>
        <div className="absolute top-20 left-10 w-96 h-96 bg-amber-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-yellow-500/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-500/20 rounded-full blur-3xl" />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.05)_0%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <motion.div
          className="text-center mb-20"
          style={{ y: headerY, opacity: headerOpacity }}>
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 mb-6 backdrop-blur-sm"
            initial={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            whileInView={{ scale: 1, rotate: 0 }}>
            <Crown className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 font-semibold">
              Sponsorship Tiers
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}>
            <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Secure Your Spot
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileInView={{ opacity: 1 }}>
            Choose the perfect package to maximize your brand visibility and ROI
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {packagesData.map((pkg, idx) => (
            <PackageCard index={idx} key={idx} pkg={pkg} />
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileInView={{ opacity: 1, y: 0 }}>
          <div className="inline-flex flex-col items-center gap-4 bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-xl px-10 py-6 rounded-2xl border border-amber-500/30">
            <Sparkles className="w-8 h-8 text-amber-400" />
            <div>
              <p className="text-gray-400 text-sm mb-1">
                Need a custom package?
              </p>
              <p className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                Contact Us for Platinum Options
              </p>
            </div>
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-amber-500/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              Get in Touch
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
