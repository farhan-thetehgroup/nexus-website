import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin } from "lucide-react";

import { CursorSpotlight } from "../components/common/ui/CursorSpotlight";
import { GlassButton } from "../components/common/ui/GlassButton";
import { GlowField } from "../components/common/ui/GlowField";
import {
  MaskedLine,
  useSectionEntry,
} from "../components/common/ui/SectionEntry";
import { NEXUS_2026_JOURNEY as JOURNEY } from "../constants/nexus2026";

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const PostCard = ({ post, index, entry }) => (
  <motion.a
    aria-label={`${post.title} — watch on LinkedIn`}
    className="nx-glass-pane group relative flex flex-col overflow-hidden transition-colors duration-300 hover:border-white/30"
    href={post.url}
    rel="noopener noreferrer"
    target="_blank"
    {...entry.rise(0.36 + index * 0.08)}
  >
    <div className="relative aspect-[4/5] w-full overflow-hidden">
      <img
        alt={post.alt}
        className="h-full w-full object-cover transition-[filter] duration-500 group-hover:brightness-110"
        loading="lazy"
        src={post.image}
      />
      {/* Ties the vertical social frame into the page's navy field. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#03101a]/90 via-[#03101a]/15 to-transparent" />

      <span className="nx-glass-chip absolute left-4 top-4 px-3 py-1 text-[0.68rem] font-medium tracking-[0.14em] text-white/80 uppercase">
        {post.kind}
      </span>
      <span className="absolute bottom-4 right-4 rounded-full bg-black/35 px-2.5 py-1 text-[0.7rem] font-medium text-white/75 backdrop-blur-sm">
        {post.duration}
      </span>
    </div>

    <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
      <div className="mb-3 flex items-center justify-between gap-3 text-[0.66rem] font-medium tracking-[0.1em] text-white/50 uppercase">
        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
          <Linkedin className="h-3.5 w-3.5 text-emerald-400/80" />
          TEH Group
        </span>
        <time className="whitespace-nowrap" dateTime={post.date}>
          {formatDate(post.date)}
        </time>
      </div>

      <h3 className="mb-3 text-xl leading-snug font-semibold text-white">
        {post.title}
      </h3>

      {post.excerpt ? (
        <p className="line-clamp-3 text-sm leading-relaxed text-white/65 transition-colors duration-300 group-hover:text-white/80">
          {post.excerpt}
        </p>
      ) : null}

      {post.attribution ? (
        <p className="mt-2 text-[0.72rem] tracking-wide text-white/40">
          {post.attribution}
        </p>
      ) : null}

      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-emerald-400">
        Watch on LinkedIn
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </div>

    <CursorSpotlight above />
  </motion.a>
);

/**
 * Content Review — the retrospective's social proof.
 *
 * The 2026 tour lives on LinkedIn before it lands anywhere else, so the
 * archive quotes the client's own post-event content back at visitors:
 * recap films and live dispatches, each card linking to the source post.
 * Posts are data (`NEXUS_2026_JOURNEY.contentReview.posts`) — future stops
 * only need new entries, never layout work.
 */
export const JourneyContentReviewSection = () => {
  const entry = useSectionEntry();
  const copy = JOURNEY.contentReview;

  return (
    <section className="relative px-4 py-28 md:py-36" id="review">
      <GlowField
        blobs={[
          {
            className: "top-16 left-0 h-[420px] w-[420px] bg-emerald-500/10",
            blurClass: "blur-[150px]",
          },
          {
            className:
              "-bottom-32 right-[12%] h-[400px] w-[400px] bg-cyan-500/10",
            blurClass: "blur-[150px]",
          },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <motion.div
            className="nx-glass-chip mb-6 inline-flex items-center gap-2 px-4 py-2"
            {...entry.fade(0, 14, 0.6)}
          >
            <Linkedin className="h-4 w-4 text-emerald-400" />
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

        <div className="grid gap-6 md:grid-cols-3">
          {copy.posts.map((post, index) => (
            <PostCard entry={entry} index={index} key={post.key} post={post} />
          ))}
        </div>

        <motion.div
          className="mt-12 flex justify-center"
          {...entry.fade(0.5, 20)}
        >
          <GlassButton
            as="a"
            className="group gap-2 px-6 py-3 text-sm font-medium text-white"
            href={copy.cta.href}
            target="_blank"
            tone="emerald"
          >
            {copy.cta.label}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </GlassButton>
        </motion.div>
      </div>
    </section>
  );
};
