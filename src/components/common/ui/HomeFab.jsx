import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const fabClasses = [
  "group fixed right-5 z-50",
  "inline-flex h-14 items-center gap-3 rounded-full px-4 text-white",
  "border border-[#3dffa2]/35 bg-[#071c17]/85 backdrop-blur-xl backdrop-saturate-150",
  "shadow-[0_18px_45px_rgba(2,8,20,0.55),inset_0_1px_0_rgba(255,255,255,0.18)]",
  "transition-colors duration-300 hover:border-[#3dffa2]/70 hover:bg-[#3dffa2]/15",
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3dffa2]/70",
  "sm:right-8 sm:px-5",
].join(" ");

/**
 * The retrospective page's single floating action: a compact glass pill
 * that sends visitors forward from the 2026 archive to the current event
 * (NEXUS APAC 2027). The label stays visible on touch devices, where
 * hover expansion would never trigger.
 */
export const HomeFab = ({ href = "/", label = "Nexus APAC 2027" }) => (
  <motion.a
    animate={{ opacity: 1, y: 0 }}
    aria-label={`Back to ${label} — event information`}
    className={fabClasses}
    href={href}
    initial={{ opacity: 0, y: 20 }}
    style={{ bottom: "calc(1.25rem + env(safe-area-inset-bottom))" }}
    transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
  >
    <span className="h-1.5 w-1.5 rounded-full bg-[#3dffa2]" />

    <span className="flex flex-col text-left leading-none">
      <span className="nx-mono text-[0.65rem] tracking-[0.2em] text-white/60 uppercase">
        Nexus APAC
      </span>
      <span className="nx-mono mt-1 text-base font-medium tracking-[0.14em] text-[#d9ffef] uppercase">
        2027
      </span>
    </span>

    <ArrowUpRight className="h-5 w-5 text-[#3dffa2] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
  </motion.a>
);
