/* eslint-disable react/no-unknown-property */
/* eslint-disable prettier/prettier */
import { motion } from "framer-motion";
import { Video, Sparkles } from "lucide-react";
import { EVENT_VIDEO } from "../constants";

export const EventVideoSection = () => {
  return (
    <section
      className="relative py-20 md:py-32 px-4 overflow-hidden"
      id="event-video"
    >
      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* CSS Grid for smart mobile reordering and desktop positioning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-0 lg:gap-x-12 relative z-20">
          {/* Left Side: Header (Order 1 on mobile, Top-Left on desktop) */}
          <motion.div
            className="order-1 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:pb-32 flex flex-col justify-start text-left z-20 mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 backdrop-blur-md border border-emerald-500/30 mb-6 shadow-lg shadow-emerald-500/10 w-fit"
              initial={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
            >
              <Video className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-medium tracking-wide text-sm">
                {EVENT_VIDEO.sectionBadge}
              </span>
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 md:mb-6 tracking-tight bg-gradient-to-br from-white via-emerald-100 to-cyan-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {EVENT_VIDEO.sectionTitle}
            </motion.h2>

            <motion.p
              className="text-lg md:text-2xl text-emerald-400/80 font-medium max-w-2xl"
              initial={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              {EVENT_VIDEO.sectionSubtitle}
            </motion.p>
          </motion.div>

          {/* Video - Full Width Underneath (Order 2 on mobile, Bottom on desktop) */}
          {/* On Desktop: negative top margin (-mt-24) pulls it up under the Title's padding and behind the Card */}
          <motion.div
            className="order-2 lg:col-span-12 lg:col-start-1 lg:row-start-2 relative z-10 lg:mt-10 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_20px_80px_-20px_rgba(16,185,129,0.3)] border border-emerald-500/20 bg-slate-950 aspect-video"
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Subtle internal overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none mix-blend-overlay z-10"></div>

            <iframe
              className="absolute inset-0 w-full h-full z-0"
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
          </motion.div>

          {/* Right Side: Description Card (Order 3 on mobile, Top-Right on desktop) */}
          {/* On mobile: negative top margin (-mt-6) slightly overlaps the bottom of the video */}
          <motion.div
            className="order-3 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:self-end z-30 mt-6 md:mt-8 lg:mt-0 px-0"
            initial={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-slate-900/80 backdrop-blur-2xl p-6 md:p-8 lg:p-10 rounded-[1.5rem] md:rounded-[2rem] border border-emerald-500/30 shadow-2xl shadow-slate-950/90 relative overflow-hidden group hover:border-emerald-500/50 transition-colors duration-500">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10 flex flex-col gap-3 md:gap-5">
                <div className="flex items-center gap-2 md:gap-3">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                  <h3 className="text-lg md:text-xl font-semibold text-white tracking-wide">
                    The Experience
                  </h3>
                </div>

                <p className="text-sm md:text-base lg:text-lg text-gray-300 font-light leading-relaxed">
                  {EVENT_VIDEO.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
