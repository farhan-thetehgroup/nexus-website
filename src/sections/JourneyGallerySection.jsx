import { motion } from "framer-motion";
import { Images } from "lucide-react";

import { GlowField } from "../components/common/ui/GlowField";
import {
  MaskedLine,
  useSectionEntry,
} from "../components/common/ui/SectionEntry";
import { NEXUS_2026_JOURNEY as JOURNEY } from "../constants/nexus2026";

/**
 * Gallery — the closing section of the retrospective.
 *
 * Deliberately a shell: the real content (event photos plus testimony/post
 * cards from the Nexus team) is still being brainstormed, so only the
 * section frame and an empty-state panel ship for now. Drop the gallery
 * implementation in where the placeholder pane sits.
 */
export const JourneyGallerySection = () => {
  const entry = useSectionEntry();
  const copy = JOURNEY.gallery;

  return (
    <section className="relative px-4 py-28 md:py-36" id="gallery">
      <GlowField
        blobs={[
          {
            className: "top-24 right-0 h-96 w-96 bg-emerald-500/10",
            blurClass: "blur-[140px]",
          },
          {
            className:
              "-bottom-40 left-[18%] h-[420px] w-[420px] bg-cyan-500/10",
            blurClass: "blur-[160px]",
          },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.div
            className="nx-glass-chip mb-6 inline-flex items-center gap-2 px-4 py-2"
            {...entry.fade(0, 14, 0.6)}
          >
            <Images className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium tracking-wide text-emerald-400">
              {copy.eyebrow}
            </span>
          </motion.div>

          <h2 className="mb-5 text-4xl font-bold md:text-6xl">
            <MaskedLine delay={0.1}>
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                {copy.title}
              </span>
            </MaskedLine>
          </h2>

          <motion.p
            className="text-lg leading-relaxed text-white/65 md:text-xl"
            {...entry.fade(0.24, 16)}
          >
            {copy.body}
          </motion.p>
        </div>

        {/* Placeholder pane — replace with the photo wall + testimony cards. */}
        <motion.div
          className="nx-glass-pane mx-auto flex min-h-[320px] max-w-4xl flex-col items-center justify-center gap-3 border-dashed px-8 py-16 text-center"
          {...entry.fade(0.36, 24)}
        >
          <span className="nx-glass-icon flex h-14 w-14 items-center justify-center rounded-2xl">
            <Images className="h-6 w-6 text-emerald-300/80" />
          </span>
          <p className="text-base font-semibold text-white/80">
            {copy.emptyTitle}
          </p>
          <p className="max-w-sm text-sm text-white/50">{copy.emptyBody}</p>
        </motion.div>
      </div>
    </section>
  );
};
