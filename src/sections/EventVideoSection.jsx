/* eslint-disable react/no-unknown-property */
/* eslint-disable prettier/prettier */
import { motion } from "framer-motion";
import { Video, Sparkles } from "lucide-react";

import { EVENT_VIDEO } from "../constants";
import { GlowField } from "../components/common/ui/GlowField";
import {
  MaskedLine,
  useSectionEntry,
} from "../components/common/ui/SectionEntry";
import { CursorSpotlight } from "../components/common/ui/CursorSpotlight";

export const EventVideoSection = () => {
  const entry = useSectionEntry();

  return (
    // pb trimmed at md: this section's bottom padding stacked with the tour
    // section's top padding under the pinned map read as a map-only blank.
    <section className="relative py-20 md:pt-32 md:pb-10 px-4" id="event-video">
      {/* Ambient light — the bottom blob straddles into the tour section */}
      <GlowField
        blobs={[
          {
            className: "top-1/4 left-0 h-96 w-96 bg-emerald-500/10",
            blurClass: "blur-[120px]",
          },
          {
            className: "bottom-1/4 right-0 h-96 w-96 bg-cyan-500/10",
            blurClass: "blur-[120px]",
          },
          {
            className:
              "-bottom-56 left-[22%] h-[520px] w-[520px] bg-emerald-500/10",
            blurClass: "blur-[160px]",
          },
        ]}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* CSS Grid for smart mobile reordering and desktop positioning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-0 lg:gap-x-12 relative z-20">
          {/* Left Side: Header (Order 1 on mobile, Top-Left on desktop) */}
          <div className="order-1 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:pb-32 flex flex-col justify-start text-left z-20 mb-8 lg:mb-0">
            <motion.div
              className="nx-glass-chip inline-flex items-center gap-2 px-4 py-2 mb-6 w-fit"
              {...entry.fade(0, 14, 0.6)}
            >
              <Video className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-medium tracking-wide text-sm">
                {EVENT_VIDEO.sectionBadge}
              </span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 md:mb-6 pb-2 tracking-tight">
              <MaskedLine delay={0.1}>
                <span className="bg-gradient-to-br from-white via-emerald-100 to-cyan-200 bg-clip-text text-transparent">
                  {EVENT_VIDEO.sectionTitle}
                </span>
              </MaskedLine>
            </h2>

            <motion.p
              className="text-lg md:text-2xl text-emerald-400/80 font-medium max-w-2xl"
              {...entry.fade(0.24, 16)}
            >
              {EVENT_VIDEO.sectionSubtitle}
            </motion.p>
          </div>

          {/* Video - Full Width Underneath (Order 2 on mobile, Bottom on desktop) */}
          {/* On Desktop: negative top margin (-mt-24) pulls it up under the Title's padding and behind the Card */}
          <motion.div
            className="order-2 lg:col-span-12 lg:col-start-1 lg:row-start-2 relative z-10 lg:mt-10 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/15 bg-slate-950 aspect-video shadow-[0_20px_80px_-20px_rgba(16,185,129,0.25)]"
            {...entry.fade(0.36, 24)}
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
            {...entry.fade(0.36, 24)}
          >
            {/* Glass description card */}
            <div className="nx-glass-pane group relative overflow-hidden p-6 md:p-8 lg:p-10 transition-colors duration-300 hover:border-white/30">
              <CursorSpotlight above />

              <div className="relative flex flex-col gap-3 md:gap-5">
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
