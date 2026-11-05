/* eslint-disable no-undef */
import "../components/aurora/aurora.css";
import { AdvancedNavbar } from "../components/AdvancedNavbar";
import AmbientCursorLight from "../components/common/ui/AmbientCursorLight";
import WhatsappFab from "../components/WhatsappFab";
import { TOUR_CITIES } from "../constants";
import { NEXUS_2027_MENU_ITEMS } from "../constants/nexus2027";
import { FooterSection } from "../sections/FooterSection";
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
 * Our Journey — the 2026 tour retrospective that used to be the first half
 * of the home page's tour split. Same scrollytelling (pinned dotted map,
 * stacked stop cards, venue plane), now a page of its own so the home page
 * only carries the current year's events.
 *
 * The navbar items point at home sections, so they navigate back to
 * `/#<id>` (HomePage2027 re-runs the hash scroll after mount) instead of
 * trying to scroll a section that is not on this route.
 */
export const JourneyPage = () => {
  const goHomeSection = (id) => {
    window.location.href = `/#${id}`;
  };

  return (
    <main className={pageClasses}>
      <AdvancedNavbar
        items={NEXUS_2027_MENU_ITEMS}
        scrollToSection={goHomeSection}
      />
      <AmbientCursorLight />
      {/* pt-16 clears the fixed navbar; the section header adds its own
          padding on top of that. */}
      <div className="pt-16">
        <TourSection cities={TOUR_CITIES} id="journey" mode="history" />
      </div>
      <FooterSection items={NEXUS_2027_MENU_ITEMS} linkBase="/" />
      <WhatsappFab />
    </main>
  );
};
