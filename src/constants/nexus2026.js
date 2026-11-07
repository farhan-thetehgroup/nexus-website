/**
 * NEXUS APAC 2026 — retrospective voice for the /journey archive page.
 * Tour dates/cities stay in TOUR_CITIES (the single source of truth); this
 * file only holds page-level copy so the historical framing can be rewritten
 * in one place.
 */
export const NEXUS_2026_JOURNEY = {
  scope: "ASIA-PACIFIC",
  year: "2026",
  season: "FEB — OCT 2026",
  eyebrow: "2026 Retrospective",
  headline: "A Year of Innovation Across the Asia-Pacific",
  supporting:
    "The 2026 APAC Tech Tour is a wrap. Relive the six stops, the conversations, and the leaders who made the year.",
  scrollCue: "Relive the journey",
  // Content Review — post-event social content, one card per post. Starts
  // with the Bangkok stop but is deliberately event-agnostic: later Nexus
  // events drop in as new entries, so the section copy never names a city.
  // Copy is verbatim from each post (og:description, captured 2026-11-06);
  // the third post shipped without a caption, so its excerpt is the opening
  // line of the video itself (LinkedIn auto-captions, proper nouns corrected).
  // Cards link straight to the source post — never rewrite a quote.
  contentReview: {
    eyebrow: "Content Review",
    title: "Nexus 2026, In Review",
    body: "Recap films and live dispatches from Nexus events across 2026 — published by the TEH Group team.",
    cta: {
      label: "See all posts on LinkedIn",
      href: "https://www.linkedin.com/company/teh-group/",
    },
    posts: [
      {
        key: "thailand-recap",
        kind: "Recap film",
        duration: "1:03",
        date: "2026-09-18",
        title: "A Look Back at the Day",
        excerpt:
          "Here’s a glimpse of what took place at NEXUS Financial Technology Thailand 2026, held on 16 September 2026 at The St. Regis Bangkok, featuring some of the activities, conversations, connections and highlights from the event.",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7506570337614991360/",
        image: "/images/journey/thailand-recap.webp",
        alt: "NEXUS Financial Technology Thailand 2026 stage backdrop at The St. Regis Bangkok",
      },
      {
        key: "thailand-one-to-one",
        kind: "One-to-one",
        duration: "0:44",
        date: "2026-09-16",
        title: "Live update in Thailand!!",
        excerpt:
          "What makes an event truly valuable? For me, it’s not just about the number of people in the room. It’s about the quality of conversations and connections that happen.",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7505912064545173504/",
        image: "/images/journey/thailand-one-to-one.webp",
        alt: "Jeffrey Teh speaking to camera at NEXUS Financial Technology Thailand 2026",
      },
      {
        key: "thailand-live-stage",
        kind: "Stage update",
        duration: "2:08",
        date: "2026-09-16",
        title: "Live Update event in Thailand",
        excerpt:
          "Hello, I’m Jeffrey from the TEH Group. Today I’m in Bangkok hosting NEXUS Financial Technology.",
        attribution: "Jeffrey Teh, CEO — TEH Group",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7505870642617958400/",
        image: "/images/journey/thailand-live-stage.webp",
        alt: "Jeffrey Teh on stage at NEXUS Financial Technology Thailand 2026",
      },
    ],
  },
  gallery: {
    eyebrow: "Gallery",
    // Working title — the gallery layout (photos + team testimony) is still
    // a blank canvas; only the section shell ships for now.
    title: "Moments From the Road",
    body: "Photos, testimonies, and field notes from the Nexus team — the 2026 tour as it happened.",
    emptyTitle: "Gallery in progress",
    emptyBody: "Photos and team stories from the road will be added here.",
  },
};
