/* eslint-disable react/no-unknown-property */
/* eslint-disable prettier/prettier */
import { motion } from "framer-motion";
import {
  Video,
  CalendarDays,
  Users,
  Handshake,
  Monitor,
  Globe,
} from "lucide-react";

import { EVENT_VIDEO } from "../constants";

const ICON_MAP = {
  CalendarDays,
  Users,
  Handshake,
  Monitor,
  Globe,
};

export const EventVideoSection = () => {
  return (
    <section
      className="relative py-16 md:py-24 px-4 overflow-hidden"
      id="event-video"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section title (like other sections) */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 mb-6"
            initial={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
            <Video className="w-5 h-5 text-emerald-400" />
            <span className="text-emerald-400 font-semibold">
              {EVENT_VIDEO.sectionBadge}
            </span>
          </motion.div>
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {EVENT_VIDEO.sectionTitle}
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {EVENT_VIDEO.sectionSubtitle}
          </motion.p>
        </motion.div>

        {/* Full-width video container */}
        <motion.div
          className="relative w-full rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 mb-12"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="relative w-full aspect-video bg-slate-900">
            <iframe
              className="absolute inset-0 w-full h-full object-cover"
              src={(() => {
                let url = EVENT_VIDEO.videoUrl;
                if (url.includes("watch?v="))
                  url = url.replace("watch?v=", "embed/");
                if (url.includes("youtu.be/"))
                  url = url.replace(
                    "youtu.be/",
                    "www.youtube-nocookie.com/embed/",
                  );
                return url.replace(
                  /(https?:\/\/)(www\.)?youtube\.com/,
                  "$1www.youtube-nocookie.com",
                );
              })()}
              title={EVENT_VIDEO.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>

        {/* Description in a centered card */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="w-full max-w-3xl rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-8 md:p-10 border border-emerald-500/20 text-center">
            <p className="text-gray-300 text-lg leading-relaxed">
              {EVENT_VIDEO.description}
            </p>
          </div>
        </motion.div>

        {/* Key points as list cards with icons */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {EVENT_VIDEO.keyPoints.map((point, i) => {
            const IconComponent = ICON_MAP[point.icon] || Monitor;
            return (
              <motion.div
                key={i}
                className="flex items-start gap-4 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6 border border-emerald-500/20 hover:border-emerald-400/40 transition-colors"
                initial={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30">
                  <IconComponent className="h-6 w-6 text-emerald-400" />
                </div>
                <p className="text-gray-300 text-base leading-relaxed pt-1">
                  {point.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
