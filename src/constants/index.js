export const MENU_ITEMS = [
  { name: "Sponsors", id: "sponsors" },
  { name: "Highlights", id: "event-video" },
  { name: "Why", id: "why" },
  { name: "Tour", id: "tours" },
  { name: "Target Audience", id: "audience" },
  { name: "Event Formats", id: "event-formats" },
  { name: "Contact", id: "contact" },
];

export const BRAND_LOGO = "/images/brand-logo/nexus-green.svg";
export const BRAND_LOGO_WHITE = "/images/brand-logo/nexus-teh-white.svg";
export const SPEED_PARTNERS_MARQUEE = 300000; // kecepatan scroll (ms)
export const LINK_REGISTER =
  " https://event.thetehgroup.com/cyberattack-nexus-manila-2026-the-offsite-retreat-/overview?token=ZT1jNmI4M2RjYS0zMTIzLTRhNmEtYTI1Zi04NDdmYjdlMDdhNTQ%3d";
export const TEASER_URL =
  "https://cyberattack-event.com/wp-content/uploads/2024/10/CA-MY-EVENT-DRAFT-2.mp4";

export const TEASER_URL_2 =
  "https://cyberattack-event.com/wp-content/uploads/2024/03/Cyberattack-Nexus_3-1.mp4";

export const EVENT_VIDEO = {
  videoUrl: "https://youtu.be/ZdBv9bx7di0",
  title: "Nexus APAC 2026",
  sectionBadge: "Watch",
  sectionTitle: "Event Highlights",
  sectionSubtitle:
    "See what Nexus is about and what you can expect from the event",
  description:
    "Nexus brings together innovators, security leaders, and enterprise technology partners across the Asia-Pacific. Join us for a full day of keynotes, live demos, one-on-one meetings, and networking. Our event is designed to connect you with the right people and solutions.",
  keyPoints: [
    {
      text: "Full-day event with keynotes, demos, and curated meetings",
      icon: "CalendarDays",
    },
    {
      text: "Connect with 400+ C-level and decision-makers in your city",
      icon: "Users",
    },
    {
      text: "One-on-one matchmaking with qualified prospects",
      icon: "Handshake",
    },
    {
      text: "Live product showcases and technical deep-dives",
      icon: "Monitor",
    },
    {
      text: "Regional tour: Jakarta, Singapore, Manila, Kuala Lumpur, Bangkok, and more",
      icon: "Globe",
    },
  ],
};

export const GALLERY = [
  { src: "/images/gallery/ev1.png", alt: "Keynote session" },
  { src: "/images/gallery/ev2.png", alt: "Panel discussion" },
  { src: "/images/gallery/ev3.png", alt: "Live demo" },
  { src: "/images/gallery/ev4.png", alt: "Networking session" },
  { src: "/images/gallery/ev5.png", alt: "Audience engagement" },
  { src: "/images/gallery/ev6.png", alt: "Closing remarks" },
];

export const GALLERY_ID = [
  { src: "/images/gallery/id1.png", alt: "Indonesia 1" },
  { src: "/images/gallery/id2.png", alt: "Indonesia 2" },
  { src: "/images/gallery/id3.png", alt: "Indonesia 3" },
  { src: "/images/gallery/id4.png", alt: "Indonesia 4" },
  { src: "/images/gallery/id5.png", alt: "Indonesia 5" },
  { src: "/images/gallery/id6.png", alt: "Indonesia 6" },
  { src: "/images/gallery/id7.png", alt: "Indonesia 7" },
  { src: "/images/gallery/id8.png", alt: "Indonesia 8" },
];

export const GALLERY_SG = [
  { src: "/images/gallery/sg1.png", alt: "Singapore 1" },
  { src: "/images/gallery/sg2.png", alt: "Singapore 2" },
  { src: "/images/gallery/sg3.png", alt: "Singapore 3" },
];

export const GALLERY_CN = [
  { src: "/images/gallery/hk1.png", alt: "Hong Kong 1" },
  { src: "/images/gallery/hk2.png", alt: "Hong Kong 2" },
  { src: "/images/gallery/hk3.png", alt: "Hong Kong 3" },
  { src: "/images/gallery/hk4.png", alt: "Hong Kong 4" },
  { src: "/images/gallery/hk5.png", alt: "Hong Kong 5" },
  { src: "/images/gallery/hk6.png", alt: "Hong Kong 6" },
];

export const GALLERY_MY = [
  { src: "/images/gallery/my1.png", alt: "Malaysia 1" },
  { src: "/images/gallery/my2.png", alt: "Malaysia 2" },
  { src: "/images/gallery/my3.png", alt: "Malaysia 3" },
  { src: "/images/gallery/my4.png", alt: "Malaysia 4" },
  { src: "/images/gallery/my5.png", alt: "Malaysia 5" },
  { src: "/images/gallery/my6.png", alt: "Malaysia 6" },
  { src: "/images/gallery/my7.png", alt: "Malaysia 7" },
  { src: "/images/gallery/my8.png", alt: "Malaysia 8" },
];

export const GALLERY_COLLAB = [
  { src: "/images/gallery/co1.png", alt: "Collaboration 1" },
  { src: "/images/gallery/co2.png", alt: "Collaboration 2" },
  { src: "/images/gallery/co3.png", alt: "Collaboration 3" },
  { src: "/images/gallery/co4.png", alt: "Collaboration 4" },
  { src: "/images/gallery/co5.png", alt: "Collaboration 5" },
  { src: "/images/gallery/co6.png", alt: "Collaboration 6" },
];

export const TOUR_CITIES = [
  {
    city: "Jakarta",
    date: "February 4, 2026",
    country: "Indonesia",
    attendees: "400+",
    gradient: "from-brand-500 to-tech-green-600",
    position: { top: "55%", left: "65%" },
    // Real city coordinates — projected onto the dotted map (DotWorldMap).
    coords: { lat: -6.2088, lon: 106.8456 },
    gallery: GALLERY_ID,
    pattern: "/images/pattern/jakarta.webp",
    url: "https://id.nexus-apac.com",
  },
  {
    city: "Singapore",
    date: "March 11, 2026",
    country: "Singapore",
    attendees: "400+",
    gradient: "from-red-500 to-pink-600",
    position: { top: "45%", left: "70%" },
    coords: { lat: 1.3521, lon: 103.8198 },
    gallery: GALLERY_SG,
    pattern: "/images/pattern/singapore.webp",
    url: "https://sg.nexus-apac.com",
  },
  {
    city: "Manila",
    date: "April 23, 2026",
    country: "Philippines",
    attendees: "400+",
    gradient: "from-yellow-500 to-orange-600",
    position: { top: "35%", left: "75%" },
    coords: { lat: 14.5995, lon: 120.9842 },
    gallery: GALLERY,
    pattern: "/images/pattern/manila.webp",
    url: "https://ph.nexus-apac.com",
  },
  {
    city: "Kuala Lumpur",
    date: "June 10, 2026",
    country: "Malaysia",
    attendees: "400+",
    gradient: "from-emerald-500 to-teal-600",
    position: { top: "50%", left: "62%" },
    coords: { lat: 3.139, lon: 101.6869 },
    gallery: GALLERY_MY,
    pattern: "/images/pattern/malaysia.webp",
    url: "https://my.nexus-apac.com",
  },
  {
    city: "Bangkok",
    date: "September 16, 2026",
    country: "Thailand",
    attendees: "400+",
    gradient: "from-blue-500 to-cyan-600",
    position: { top: "40%", left: "68%" },
    coords: { lat: 13.7563, lon: 100.5018 },
    gallery: GALLERY_COLLAB,
    pattern: "/images/pattern/thailand.webp",
    url: "https://th.nexus-apac.com/",
  },
  {
    city: "Hong Kong",
    date: "October 27, 2026",
    country: "Hong Kong",
    attendees: "200+",
    gradient: "from-purple-500 to-pink-600",
    position: { top: "40%", left: "60%" },
    coords: { lat: 22.3193, lon: 114.1694 },
    gallery: GALLERY_COLLAB,
    pattern: "/images/pattern/city-line.svg",
    url: "https://hk.nexus-apac.com/",
  },
];

export const PARTNERS = [
  // NEXUS 2026 (this year's event) sponsor set — old sponsors dropped by the
  // client; logo text verified by OCR/vision reads of each dropped file.
  // url fields intentionally omitted until the client supplies official URLs.
  { src: "/images/sponsors/agilitec.jpg", alt: "Agilitec" },
  { src: "/images/sponsors/beyondtrust.webp", alt: "BeyondTrust" },
  { src: "/images/sponsors/bitdefender.webp", alt: "Bitdefender" },
  { src: "/images/sponsors/cardinal.webp", alt: "Cardinal" },
  { src: "/images/sponsors/clinkit.webp", alt: "ClinkIT" },
  { src: "/images/sponsors/cloudflare.webp", alt: "Cloudflare" },
  { src: "/images/sponsors/commvault.webp", alt: "Commvault" },
  { src: "/images/sponsors/darktrace.webp", alt: "Darktrace" },
  { src: "/images/sponsors/equinix.webp", alt: "Equinix" },
  { src: "/images/sponsors/everpure.webp", alt: "Everpure" },
  { src: "/images/sponsors/gigamon.webp", alt: "Gigamon" },
  { src: "/images/sponsors/h2oai.webp", alt: "H2O.ai" },
  { src: "/images/sponsors/lark.webp", alt: "Lark" },
  { src: "/images/sponsors/lmntrix.webp", alt: "LMNTRIX" },
  { src: "/images/sponsors/mimecast.webp", alt: "Mimecast" },
  { src: "/images/sponsors/mtech.webp", alt: "M.Tech" },
  { src: "/images/sponsors/netron-datadog.webp", alt: "Netron / Datadog" },
  { src: "/images/sponsors/okta-techdirect.webp", alt: "Okta / Techdirect" },
  { src: "/images/sponsors/pointwest.jpg", alt: "Pointwest" },
  { src: "/images/sponsors/proofpoint.webp", alt: "Proofpoint" },
  { src: "/images/sponsors/redrock.webp", alt: "Redrock IT Security" },
  { src: "/images/sponsors/rsa.webp", alt: "RSA" },
  { src: "/images/sponsors/silverfort.webp", alt: "Silverfort" },
  { src: "/images/sponsors/skyhigh.webp", alt: "Skyhigh Security" },
  { src: "/images/sponsors/tanium.webp", alt: "Tanium" },
  { src: "/images/sponsors/technow.webp", alt: "Technow" },
  { src: "/images/sponsors/tenable.webp", alt: "Tenable" },
  { src: "/images/sponsors/trend-ai.webp", alt: "TrendAI" },
  { src: "/images/sponsors/tlr-global.png", alt: "TLR Global" },
  {
    src: "/images/sponsors/viettel-cybersecurity.webp",
    alt: "Viettel Cybersecurity",
  },
  { src: "/images/sponsors/xtremax.webp", alt: "XTREMAX" },
];

export const EMAIL = "hello@thetehgroup.com";
export const MAILTO_URL = `mailto:${EMAIL}?subject=Become a Sponsor Nexus 2026&body=Hello, I am interested in becoming a sponsor for Nexus 2026 event. Could we discuss further details about the event? `;
export const PHONE_WHATSAPP = "+852 68019775";
export const WHATSAPP_MESSAGE =
  "Hi Nexus Team,\nI'm interested in joining as a sponsor for Nexus. Could we discuss the available sponsorship packages and next steps? Thank you!";
