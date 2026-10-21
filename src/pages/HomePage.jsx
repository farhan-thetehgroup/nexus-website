/* eslint-disable no-undef */
import { useState } from "react";

import { TechParticleField } from "../components/TechParticleField";
import "../components/aurora/aurora.css";
import { AdvancedNavbar } from "../components/AdvancedNavbar";
import WhatsappFab from "../components/WhatsappFab";
import { HeroSection } from "../sections/HeroSection";
import { PastSponsorSection } from "../sections/PastSponsorSection";
import { EventVideoSection } from "../sections/EventVideoSection";
import { WhySponsorSection } from "../sections/WhySponsorSection";
import { TourSection } from "../sections/TourSection";
import { AudienceSection } from "../sections/AudienceSection";
import { EventFormatSection } from "../sections/EventFormatSection";
import { FooterSection } from "../sections/FooterSection";
import ContactFormSection from "../sections/ContactFormSection";

const homePageClasses = [
  "bg-gradient-to-br from-brand-800 via-tech-green-900 to-brand-800",
  // overflow-clip, not hidden — hidden would become a scroll container and
  // break position:sticky inside (the tour section uses it on both pages).
  "text-white min-h-screen relative overflow-clip",
].join(" ");

export const HomePage = () => {
  const [, setIsMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <main className={homePageClasses}>
      <TechParticleField />
      <AdvancedNavbar scrollToSection={scrollToSection} />
      <HeroSection scrollToSection={scrollToSection} />
      <PastSponsorSection />
      <EventVideoSection />
      <WhySponsorSection />
      <TourSection />
      <AudienceSection />
      <EventFormatSection />
      <ContactFormSection />
      <FooterSection />
      <WhatsappFab />
    </main>
  );
};
