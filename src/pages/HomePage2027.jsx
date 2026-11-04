/* eslint-disable no-undef */
import { useState } from "react";

import "../components/aurora/aurora.css";
import { useMotionPreference } from "../components/aurora/useMotionPreference";
import { AdvancedNavbar } from "../components/AdvancedNavbar";
import AmbientCursorLight from "../components/common/ui/AmbientCursorLight";
import WhatsappFab from "../components/WhatsappFab";
import { NEXUS_2027_MENU_ITEMS } from "../constants/nexus2027";
import { AudienceSection } from "../sections/AudienceSection";
import ContactFormSection from "../sections/ContactFormSection";
import { EventFormatSection } from "../sections/EventFormatSection";
import { FooterSection } from "../sections/FooterSection";
import { HeroNexus2027Section } from "../sections/HeroNexus2027Section";
import { PastSponsorSection } from "../sections/PastSponsorSection";
import { EventVideoSection } from "../sections/EventVideoSection";
import { TourSection } from "../sections/TourSection";
import { NEXUS_2027_EVENTS } from "../constants/nexus2027";
import { TOUR_CITIES } from "../constants";
import { WhySponsorSection } from "../sections/WhySponsorSection";

const pageClasses = [
  "nx-aurora-theme",
  // overflow-clip, NOT overflow-hidden: hidden would turn <main> into a
  // scroll container and silently kill every position:sticky inside it
  // (the tour scrollytelling). Clip paints the same and keeps sticky alive.
  "relative min-h-screen overflow-clip",
  "bg-gradient-to-b from-[#03101a] via-[#062030] to-[#03101a]",
  "text-white",
].join(" ");

/**
 * NEXUS 2027 — the site's main page (moved off /2027; every non-lab path
 * renders this component, legacy /2027 links included).
 * The 2027 hero (Polar Drift), then the shared content sections (past
 * sponsors, why sponsor, audience, event formats, contact, footer). The
 * tour content renders in two phases: the pinned-map scrollytelling as the
 * HISTORICAL preview of the 2026 tour, then the 2027 UPCOMING event grid
 * (client's temporary stop list in constants/nexus2027.js).
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
      <AmbientCursorLight />
      <HeroNexus2027Section motion={motion} />
      <PastSponsorSection />
      <EventVideoSection />
      {/* Tour split: history first, then the 2027 upcoming grid. */}
      <TourSection cities={TOUR_CITIES} mode="history" />
      <TourSection cities={NEXUS_2027_EVENTS} mode="upcoming" id="tour-2027" />
      <WhySponsorSection />
      <AudienceSection />
      <EventFormatSection />
      <ContactFormSection />
      <FooterSection items={NEXUS_2027_MENU_ITEMS} />
      <WhatsappFab />
    </main>
  );
};
