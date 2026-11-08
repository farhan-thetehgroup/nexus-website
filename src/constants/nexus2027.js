/**
 * Nexus Indonesia 2027 — event facts and aurora palettes.
 * Source: Nexus 2027 key visual (24 March 2027, Jakarta).
 */
export const NEXUS_2027 = {
  name: "NEXUS",
  scope: "ASIA-PACIFIC",
  headline: "Connecting Innovation Across the Asia-Pacific",
  chapter: "INDONESIA",
  year: "2027",
  themeLine1: "THE MODERN ENTERPRISE:",
  themeLine2: "BUILDING TOMORROW, SECURING TODAY",
  themeLine: "THE MODERN ENTERPRISE: BUILDING TOMORROW, SECURING TODAY",
  tagline: "CODE-LEVEL INNOVATION. ZERO-TRUST REALITY.",
  dateShort: "24TH MARCH 2027",
  dateNumeric: "24.03.2027",
  city: "JAKARTA, INDONESIA",
  cityShort: "JAKARTA",
  coordinates: "06°12′S 106°49′E",
  focus: "ZERO-TRUST / AI / CLOUD",
  mailto:
    "mailto:hello@thetehgroup.com" +
    "?subject=" +
    encodeURIComponent("Become a Sponsor Nexus Indonesia 2027") +
    "&body=" +
    encodeURIComponent(
      "Hello, I am interested in becoming a sponsor for Nexus Indonesia 2027. Could we discuss further details about the event?",
    ),
};

export const NEXUS_2027_MENU_ITEMS = [
  { name: "Sponsors", id: "sponsors" },
  { name: "Highlights", id: "event-video" },
  { name: "Tour", id: "tours" },
  { name: "Why", id: "why" },
  { name: "Event Formats", id: "event-formats" },
  { name: "Contact", id: "contact" },
];

// NEXUS 2027 upcoming tour stops — TEMPORARY list taken verbatim from the
// client's Drive folder ("NEXUS APAC 2027"): country/edition labels as the
// display names, dates where the folder names carry them ("TBA" where not),
// no official URLs yet (cards render "Coming Soon"). Revisit when the real
// per-city names/dates land. Named after the labels, not tour-city guesses
// (venues may differ from the 2026 cities — do not invent "Jakarta" etc).
export const NEXUS_2027_EVENTS = [
  {
    city: "Philippines",
    date: "February 11, 2027",
    gradient: "from-yellow-500 to-orange-600",
    pattern: "/images/pattern/manila.webp",
    url: "https://ph.nexus-apac.com",
  },
  {
    city: "Indonesia",
    date: "March 24, 2027",
    gradient: "from-brand-500 to-tech-green-600",
    pattern: "/images/pattern/jakarta.webp",
    url: "",
  },
  {
    city: "Singapore",
    date: "April 14, 2027",
    gradient: "from-red-500 to-pink-600",
    pattern: "/images/pattern/singapore.webp",
    url: "",
  },
  {
    city: "Malaysia",
    date: "June 16, 2027",
    gradient: "from-emerald-500 to-teal-600",
    pattern: "/images/pattern/malaysia.webp",
    url: "",
  },
  {
    // "Indonesia (FT)" — the client's label; FT edition affiliation TBD.
    city: "Indonesia (FT)",
    date: "July 21, 2027",
    gradient: "from-blue-500 to-indigo-600",
    pattern: "/images/pattern/city-line.svg",
    url: "",
  },
  {
    city: "Thailand",
    date: "TBA",
    gradient: "from-blue-500 to-cyan-600",
    pattern: "/images/pattern/thailand.webp",
    url: "",
  },
  {
    city: "Hong Kong",
    date: "TBA",
    gradient: "from-purple-500 to-pink-600",
    pattern: "/images/pattern/city-line.svg",
    url: "",
  },
];

export const AURORA_PALETTES = {
  drift: {
    bg: "#04141f",
    c1: "#0c6b63",
    c2: "#2fe98d",
    c3: "#a9ffd9",
    intensity: 1.0,
  },
  horizon: {
    bg: "#031019",
    c1: "#0a5f78",
    c2: "#25d6b2",
    c3: "#9cf5e0",
    intensity: 0.98,
  },
  bloom: {
    bg: "#04121c",
    c1: "#0b7a5f",
    c2: "#3aff9b",
    c3: "#c4ffe4",
    intensity: 0.86,
  },
};

// NEXUS 2027 hero art direction: a blue wash drifting into green cores,
// spread wide across the frame (two-tone aurora).
export const NEXUS_2027_AURORA = {
  bg: "#04141f",
  c1: "#1b5fc4",
  c2: "#2fe98d",
  c3: "#adfff0",
  intensity: 0.78,
};
