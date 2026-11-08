import "../components/aurora/aurora.css";
import { useMotionPreference } from "../components/aurora/useMotionPreference";
import AmbientCursorLight from "../components/common/ui/AmbientCursorLight";
import { HomeFab } from "../components/common/ui/HomeFab";
import { TOUR_CITIES } from "../constants";
import { NEXUS_2027_MENU_ITEMS } from "../constants/nexus2027";
import { FooterSection } from "../sections/FooterSection";
import { JourneyContentReviewSection } from "../sections/JourneyContentReviewSection";
import { JourneyGallerySection } from "../sections/JourneyGallerySection";
import { JourneyHeroSection } from "../sections/JourneyHeroSection";
import { PastSponsorSection } from "../sections/PastSponsorSection";
import { TourSection } from "../sections/TourSection";

const pageClasses = [
  "nx-aurora-theme",
  // overflow-clip, NOT overflow-hidden: hidden would turn <main> into a
  // scroll container and silently kill every position:sticky inside it
  // (the retrospective scrollytelling).
  "relative min-h-screen overflow-clip",
  "bg-gradient-to-b from-[#03101a] via-[#062030] to-[#03101a]",
  "text-white",
].join(" ");

/**
 * Our Journey — the 2026 APAC tour retrospective.
 *
 * A standalone historical page: archive hero, the sponsor wall carried over
 * from the main site, the interactive scrollytelling of every 2026 stop,
 * and a gallery slot (shell only for now). There is deliberately NO navbar
 * here — navigation is a single floating action that points forward to the
 * current NEXUS APAC 2027 page.
 */
export const JourneyPage = () => {
  const motion = useMotionPreference();

  return (
    <main className={pageClasses}>
      <AmbientCursorLight />
      <JourneyHeroSection motion={motion} />
      <PastSponsorSection />
      <TourSection cities={TOUR_CITIES} id="journey" mode="history" />
      <JourneyContentReviewSection />
      <JourneyGallerySection />
      {/* No scroll-to-top FAB here: the page must keep exactly one floating
          action (the 2027 hand-off). */}
      <FooterSection
        items={NEXUS_2027_MENU_ITEMS}
        linkBase="/"
        showScrollTop={false}
      />
      <HomeFab href="/" />
    </main>
  );
};
