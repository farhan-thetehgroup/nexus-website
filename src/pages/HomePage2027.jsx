/* eslint-disable no-undef */
import { useState } from "react";

import { useMotionPreference } from "../components/aurora/useMotionPreference";
import { AdvancedNavbar } from "../components/AdvancedNavbar";
import WhatsappFab from "../components/WhatsappFab";
import { NEXUS_2027_MENU_ITEMS } from "../constants/nexus2027";
import { AudienceSection } from "../sections/AudienceSection";
import ContactFormSection from "../sections/ContactFormSection";
import { EventFormatSection } from "../sections/EventFormatSection";
import { FooterSection } from "../sections/FooterSection";
import { HeroNexus2027Section } from "../sections/HeroNexus2027Section";
import { PastSponsorSection } from "../sections/PastSponsorSection";
import { WhySponsorSection } from "../sections/WhySponsorSection";

const pageClasses = [
  "nx-aurora-theme",
  "relative min-h-screen overflow-hidden",
  "bg-gradient-to-b from-[#03101a] via-[#062030] to-[#03101a]",
  "text-white",
].join(" ");

/**
 * NEXUS 2027 — full page.
 * The 2027 hero (Polar Drift), then the shared content sections (past
 * sponsors, why sponsor, audience, event formats, contact, footer). The
 * 2026 tour/highlights sections stay out until 2027 programme details land.
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
      <PastSponsorSection />
      <WhySponsorSection />
      <AudienceSection />
      <EventFormatSection />
      <ContactFormSection />
      <FooterSection items={NEXUS_2027_MENU_ITEMS} />
      <WhatsappFab />
    </main>
  );
};
