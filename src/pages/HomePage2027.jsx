/* eslint-disable no-undef */
import { useEffect, useState } from "react";

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
import { WhySponsorSection } from "../sections/WhySponsorSection";

// The 2026 tour retrospective lives on its own route (JourneyPage); this
// page only carries the current year's events, so its closing CTA is the
// only door to the history.
const JOURNEY_CTA = {
  label: "See Our Journey So Far in 2026",
  href: "/journey",
};

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
 * sponsors, why sponsor, audience, event formats, contact, footer) and a
 * single tour section: the current year's UPCOMING stops. The 2026
 * retrospective (pinned-map scrollytelling) moved to /journey.
 */
export const HomePage2027 = () => {
  const motion = useMotionPreference();
  const [, setIsMenuOpen] = useState(false);

  // Deep links from the journey page (/#contact and friends) arrive before
  // the sections have painted, so the browser's own hash scroll lands on
  // nothing. Re-run it once after the first frame.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const raf = requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    });
    return () => cancelAnimationFrame(raf);
  }, []);

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
      {/* Current year only: the 2027 stop grid + the journey hand-off. */}
      <TourSection
        cities={NEXUS_2027_EVENTS}
        cta={JOURNEY_CTA}
        id="tours"
        mode="upcoming"
      />
      <WhySponsorSection />
      <AudienceSection />
      <EventFormatSection />
      <ContactFormSection />
      <FooterSection items={NEXUS_2027_MENU_ITEMS} />
      <WhatsappFab />
    </main>
  );
};
