/* eslint-disable no-undef */
import { useState } from "react";

import { useMotionPreference } from "../components/aurora/useMotionPreference";
import { AdvancedNavbar } from "../components/AdvancedNavbar";
import WhatsappFab from "../components/WhatsappFab";
import { NEXUS_2027_MENU_ITEMS } from "../constants/nexus2027";
import { HeroNexus2027Section } from "../sections/HeroNexus2027Section";

const pageClasses = [
  "nx-aurora-theme",
  "relative min-h-screen overflow-hidden",
  "bg-gradient-to-b from-[#03101a] via-[#062030] to-[#03101a]",
  "text-white",
].join(" ");

/**
 * NEXUS INDONESIA 2027 — header only for now.
 * The navbar and the 2027 hero (Polar Drift); the content sections (past
 * sponsors, why, audience, event formats, contact, footer) come back as the
 * 2027 programme lands.
 */
export const HomePage2027 = () => {
  const motion = useMotionPreference();
  const [, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <main className={pageClasses}>
      <AdvancedNavbar
        items={NEXUS_2027_MENU_ITEMS}
        scrollToSection={scrollToSection}
      />
      <HeroNexus2027Section motion={motion} />
      <WhatsappFab />
    </main>
  );
};
