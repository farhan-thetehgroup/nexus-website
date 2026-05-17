import { motion } from "framer-motion";

import { PHONE_WHATSAPP } from "../constants";
import WhatsappIcon from "./icons/WhatsappIcon";
import { buildWhatsAppLink } from "../utils/whatsapp";

const fabClasses = [
  "group fixed right-5 z-50 flex h-14 w-14 items-center justify-start",
  "bottom-[calc(1.25rem+env(safe-area-inset-bottom))] sm:right-8",
  "overflow-hidden rounded-full border border-emerald-300/50 bg-[#25D366]",
  "text-white shadow-[0_18px_45px_rgba(37,211,102,0.35)]",
  "transition-all duration-300 hover:w-[13.25rem] hover:pr-5",
  "focus:outline-none focus-visible:ring-2",
  "focus-visible:ring-emerald-200 focus-visible:ring-offset-2",
  "focus-visible:ring-offset-slate-950",
].join(" ");

const WhatsappFab = () => {
  const whatsappUrl = buildWhatsAppLink(PHONE_WHATSAPP);

  if (!whatsappUrl) {
    return null;
  }

  return (
    <motion.a
      animate={{ opacity: 1, y: 0 }}
      aria-label="Chat with Nexus Team on WhatsApp"
      className={fabClasses}
      href={whatsappUrl}
      initial={{ opacity: 0, y: 20 }}
      rel="noopener noreferrer"
      target="_blank"
      transition={{ delay: 1.1 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 42px rgba(37, 211, 102, 0.5)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.42),transparent_32%)]" />
      <span className="absolute inset-0 rounded-full border border-white/20" />
      <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center">
        <WhatsappIcon className="block h-10 w-10 shrink-0" />
      </span>
      <span className="relative z-10 max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold tracking-wide opacity-0 transition-all duration-300 group-hover:max-w-40 group-hover:opacity-100">
        Talk to Nexus Team
      </span>
    </motion.a>
  );
};

export default WhatsappFab;
