/* eslint-disable prettier/prettier */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  UserCheck,
  Monitor,
  MessageCircle,
  Mic2,
  Coffee,
  ChevronRight,
  Zap,
  Target,
  Clock,
  X,
  Globe,
  Calendar,
} from "lucide-react";

/* ----------------- Data ----------------- */
const eventFormats = [
  {
    id: 1,
    icon: UserCheck,
    title: "One-on-One Meeting",
    description:
      "Private consultations with industry experts, tailored business solutions, and flexible scheduling - all in a personalized session just for you.",
    features: [
      "30-minute sessions",
      "Pre-scheduled meetings",
      "Expert matching",
      "Private consultation rooms",
    ],
    image:
      "https://images.unsplash.com/photo-1630672790237-38eeb57cb60b?q=80&w=1171&auto=format&fit=crop",
    color: "from-tech-green-400 to-tech-green-600",
    attendees: "1-on-1",
  },
  {
    id: 2,
    icon: Monitor,
    title: "Live Demo Session",
    description:
      "See real-world NEXUS and defense tools in action, guided by top technology experts. Experience what works, live and in action.",
    features: [
      "Hands-on experience",
      "Real-time Q&A",
      "Product showcases",
      "Technical deep-dives",
    ],
    image:
      "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop",
    color: "from-cyan-400 to-cyan-600",
    attendees: "20-30",
  },
  {
    id: 3,
    icon: MessageCircle,
    title: "Interactive Workshop",
    description:
      "An immersive learning experience where participants engage in hands-on activities and collaborative problem-solving sessions.",
    features: [
      "Practical exercises",
      "Group activities",
      "Expert guidance",
      "Takeaway materials",
    ],
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
    color: "from-brand-400 to-brand-600",
    attendees: "15-20",
  },
  {
    id: 4,
    icon: Mic2,
    title: "Insightfull Conference",
    description:
      "Industry leaders share insights on emerging trends, best practices, and future innovations in the technology landscape.",
    features: [
      "4-5 expert panelists",
      "Audience Q&A",
      "Recorded sessions",
      "Live streaming available",
    ],
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    color: "from-teal-400 to-teal-600",
    attendees: "300",
  },
  {
    id: 5,
    icon: Coffee,
    title: "Exhibition Hall",
    description:
      "Explore cutting-edge solutions and connect with innovators in an open exhibition space designed for networking and discovery.",
    features: [
      "Networking breaks",
      "Solution showcases",
      "Interactive demos",
      "Informal discussions",
    ],
    image:
      "https://images.unsplash.com/photo-1632383380175-812d44ec112b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
    color: "from-tech-green-500 to-teal-600",
    attendees: "Open",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0, y: 20 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 15 },
  },
};

export const EventFormatSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);

  return (
    <section
      className="relative overflow-hidden py-20 md:py-28"
      id="event-formats">
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        className="absolute top-20 left-10 h-72 w-64 rounded-full opacity-10 blur-3xl bg-tech-green-400"
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        className="absolute right-10 bottom-20 h-80 w-80 rounded-full opacity-10 blur-3xl bg-cyan-400"
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

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

      <div className="max-w-7xl relative z-10 mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: false, amount: 0.3 }}
          whileInView="visible">
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 mb-6 backdrop-blur-sm"
            initial={{ scale: 0, rotate: -180 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            whileInView={{ scale: 1, rotate: 0 }}>
            <Calendar className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-semibold">
              Diverse Experience
            </span>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-tech-green-400 bg-clip-text text-transparent">
              The Event Format
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileInView={{ opacity: 1 }}>
            Multiple engagement opportunities designed to maximize value and
            networking
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          variants={containerVariants}
          viewport={{ once: false, amount: 0.2 }}
          whileInView="visible">
          <div className="grid gap-8 md:grid-cols-3 mb-8">
            {eventFormats.slice(0, 3).map((format, index) => {
              const IconComponent = format.icon;
              return (
                <motion.div
                  className="group cursor-pointer"
                  key={format.id}
                  onClick={() => setSelectedFormat(format)}
                  onMouseEnter={() => setHoveredCard(format.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  variants={cardVariants}
                  whileHover={{ y: -12, scale: 1.02 }}>
                  <motion.div
                    animate={{
                      boxShadow:
                        hoveredCard === format.id ?
                          "0 20px 60px rgba(16, 185, 129, 0.4)"
                        : "0 10px 30px rgba(0, 0, 0, 0.3)",
                    }}
                    className="relative h-full overflow-hidden rounded-2xl bg-brand-700/40 backdrop-blur-sm shadow-xl border-2 border-tech-green-400/20 hover:border-tech-green-400/60 transition-all duration-500">
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        alt={format.title}
                        animate={{
                          scale: hoveredCard === format.id ? 1.15 : 1,
                        }}
                        className="h-full w-full object-cover"
                        src={format.image}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/60 to-transparent" />

                      <motion.div
                        animate={{
                          rotate: hoveredCard === format.id ? 360 : 0,
                        }}
                        className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-tech-green-400/90 shadow-lg backdrop-blur-sm border-2 border-white"
                        transition={{ duration: 0.6 }}>
                        <span className="text-brand-900 text-lg font-bold">
                          {index + 1}
                        </span>
                      </motion.div>

                      <motion.div
                        animate={{
                          rotate:
                            hoveredCard === format.id ? [0, -10, 10, 0] : 0,
                          scale: hoveredCard === format.id ? 1.1 : 1,
                        }}
                        className={`absolute top-4 left-4 rounded-full bg-gradient-to-br p-3 ${format.color} text-white shadow-xl border-2 border-white/50`}
                        transition={{ duration: 0.5 }}>
                        <IconComponent className="h-5 w-5" />
                      </motion.div>

                      <motion.div
                        className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 backdrop-blur-sm shadow-lg border border-tech-green-400/50"
                        whileHover={{ scale: 1.1 }}>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-tech-green-600" />
                          <span className="text-brand-900 text-sm font-bold">
                            {format.attendees}
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-white group-hover:text-tech-green-400 mb-3 text-xl font-bold transition-colors">
                        {format.title}
                      </h3>
                      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-200">
                        {format.description}
                      </p>
                      <div className="mb-4 space-y-2">
                        {format.features.slice(0, 2).map((f, idx) => (
                          <motion.div
                            className="flex items-center gap-2 text-xs text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            key={idx}
                            transition={{
                              delay: hoveredCard === format.id ? idx * 0.1 : 0,
                            }}
                            viewport={{ once: false }}
                            whileInView={{ opacity: 1, x: 0 }}>
                            <div className="h-2 w-2 flex-shrink-0 rounded-full bg-tech-green-400" />
                            <span>{f}</span>
                          </motion.div>
                        ))}
                      </div>
                      <motion.div className="flex items-center justify-between border-t border-tech-green-400/20 pt-4">
                        <span className="text-tech-green-400 text-sm font-semibold">
                          Learn More
                        </span>
                        <motion.div
                          animate={
                            hoveredCard === format.id ?
                              { x: [0, 5, 0] }
                            : { x: 0 }
                          }
                          transition={{
                            repeat: hoveredCard === format.id ? Infinity : 0,
                            duration: 1.5,
                          }}>
                          <ChevronRight className="h-5 w-5 text-tech-green-400" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex flex-col justify-center gap-8 md:flex-row">
            {eventFormats.slice(3).map((format, index) => {
              const IconComponent = format.icon;
              return (
                <motion.div
                  className="group w-full cursor-pointer md:max-w-md"
                  key={format.id}
                  onClick={() => setSelectedFormat(format)}
                  onMouseEnter={() => setHoveredCard(format.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  variants={cardVariants}
                  whileHover={{ y: -12, scale: 1.02 }}>
                  <motion.div
                    animate={{
                      boxShadow:
                        hoveredCard === format.id ?
                          "0 20px 60px rgba(16, 185, 129, 0.4)"
                        : "0 10px 30px rgba(0, 0, 0, 0.3)",
                    }}
                    className="relative h-full overflow-hidden rounded-2xl bg-brand-700/40 backdrop-blur-sm shadow-xl border-2 border-tech-green-400/20 hover:border-tech-green-400/60 transition-all duration-500">
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        alt={format.title}
                        animate={{
                          scale: hoveredCard === format.id ? 1.15 : 1,
                        }}
                        className="h-full w-full object-cover"
                        src={format.image}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/60 to-transparent" />

                      <motion.div
                        animate={{
                          rotate: hoveredCard === format.id ? 360 : 0,
                        }}
                        className="absolute top-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-tech-green-400/90 shadow-lg backdrop-blur-sm border-2 border-white"
                        transition={{ duration: 0.6 }}>
                        <span className="text-brand-900 text-lg font-bold">
                          {3 + index + 1}
                        </span>
                      </motion.div>

                      <motion.div
                        animate={{
                          rotate:
                            hoveredCard === format.id ? [0, -10, 10, 0] : 0,
                          scale: hoveredCard === format.id ? 1.1 : 1,
                        }}
                        className={`absolute top-4 left-4 rounded-full bg-gradient-to-br p-3 ${format.color} text-white shadow-xl border-2 border-white/50`}
                        transition={{ duration: 0.5 }}>
                        <IconComponent className="h-5 w-5" />
                      </motion.div>

                      <motion.div
                        className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 backdrop-blur-sm shadow-lg border border-tech-green-400/50"
                        whileHover={{ scale: 1.1 }}>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-tech-green-600" />
                          <span className="text-brand-900 text-sm font-bold">
                            {format.attendees}
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-white group-hover:text-tech-green-400 mb-3 text-xl font-bold transition-colors">
                        {format.title}
                      </h3>
                      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-200">
                        {format.description}
                      </p>
                      <div className="mb-4 space-y-2">
                        {format.features.slice(0, 2).map((f, idx) => (
                          <motion.div
                            className="flex items-center gap-2 text-xs text-gray-300"
                            initial={{ opacity: 0, x: -20 }}
                            key={idx}
                            transition={{
                              delay: hoveredCard === format.id ? idx * 0.1 : 0,
                            }}
                            viewport={{ once: false }}
                            whileInView={{ opacity: 1, x: 0 }}>
                            <div className="h-2 w-2 flex-shrink-0 rounded-full bg-tech-green-400" />
                            <span>{f}</span>
                          </motion.div>
                        ))}
                      </div>
                      <motion.div className="flex items-center justify-between border-t border-tech-green-400/20 pt-4">
                        <span className="text-tech-green-400 text-sm font-semibold">
                          Learn More
                        </span>
                        <motion.div
                          animate={
                            hoveredCard === format.id ?
                              { x: [0, 5, 0] }
                            : { x: 0 }
                          }
                          transition={{
                            repeat: hoveredCard === format.id ? Infinity : 0,
                            duration: 1.5,
                          }}>
                          <ChevronRight className="h-5 w-5 text-tech-green-400" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedFormat && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-900/90 backdrop-blur-md overflow-y-auto"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setSelectedFormat(null)}>
            <motion.div
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="w-full max-w-3xl max-h-screen overflow-y-auto overflow-x-hidden rounded-2xl bg-brand-900 shadow-2xl border-2 border-tech-green-400/50"
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}>
              <div className="relative h-80">
                <img
                  alt={selectedFormat.title}
                  className="h-full w-full object-cover"
                  src={selectedFormat.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/60 to-transparent" />

                <motion.button
                  className="absolute top-4 right-4 rounded-full bg-white/95 p-3 shadow-lg hover:bg-tech-green-400 transition-colors"
                  onClick={() => setSelectedFormat(null)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}>
                  <X className="h-5 w-5 text-brand-900" />
                </motion.button>

                <div className="absolute right-6 bottom-6 left-6">
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className={`inline-flex rounded-full bg-gradient-to-r ${selectedFormat.color} p-3 mb-4 shadow-xl`}
                    initial={{ opacity: 0, y: 20 }}>
                    {(() => {
                      const IconComponent = selectedFormat.icon;
                      return <IconComponent className="h-6 w-6" />;
                    })()}
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {selectedFormat.title}
                  </h3>
                  <div className="flex items-center gap-2 text-tech-green-400">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-semibold">
                      {selectedFormat.attendees} Participants
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gradient-to-b from-brand-900 to-brand-900">
                <p className="mb-6 leading-relaxed text-gray-200 text-lg">
                  {selectedFormat.description}
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                  <motion.div
                    animate={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -20 }}
                    transition={{ delay: 0.2 }}>
                    <h4 className="flex items-center gap-2 font-semibold mb-4 text-tech-green-400">
                      <Target className="h-5 w-5" />
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      {selectedFormat.features.map((f, i) => (
                        <motion.li
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-3 text-sm text-gray-200"
                          initial={{ opacity: 0, x: -10 }}
                          key={i}
                          transition={{ delay: 0.3 + i * 0.1 }}>
                          <div className="h-2 w-2 rounded-full bg-tech-green-400" />
                          {f}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  <motion.div
                    animate={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.2 }}>
                    <h4 className="mb-4 flex items-center gap-2 font-semibold text-cyan-400">
                      <Clock className="h-5 w-5" />
                      Session Details
                    </h4>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-200">
                        <span className="font-semibold text-white">
                          Duration:
                        </span>{" "}
                        Varies by format
                      </p>
                      <p className="text-sm text-gray-200">
                        <span className="font-semibold text-white">
                          Language:
                        </span>{" "}
                        English
                      </p>
                      <p className="text-sm text-gray-200">
                        <span className="font-semibold text-white">
                          Recording:
                        </span>{" "}
                        Available for select sessions
                      </p>
                      <p className="text-sm text-gray-200">
                        <span className="font-semibold text-white">
                          Materials:
                        </span>{" "}
                        Digital resources provided
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
