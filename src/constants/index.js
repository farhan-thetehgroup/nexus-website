export const MENU_ITEMS = [
  { name: "Sponsors", id: "sponsors" },
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
    gallery: GALLERY_ID,
    pattern: "/images/pattern/jakarta.webp",
  },
  {
    city: "Singapore",
    date: "March 11, 2026",
    country: "Singapore",
    attendees: "400+",
    gradient: "from-red-500 to-pink-600",
    position: { top: "45%", left: "70%" },
    gallery: GALLERY_SG,
    pattern: "/images/pattern/singapore.webp",
  },
  {
    city: "Manila",
    date: "April 9, 2026",
    country: "Philippines",
    attendees: "400+",
    gradient: "from-yellow-500 to-orange-600",
    position: { top: "35%", left: "75%" },
    gallery: GALLERY,
    pattern: "/images/pattern/manila.webp",
  },
  {
    city: "Ho Chi Minh",
    date: "May 6, 2026",
    country: "Vietnam",
    attendees: "400+",
    gradient: "from-indigo-500 to-purple-600",
    position: { top: "35%", left: "65%" },
    gallery: GALLERY_COLLAB,
    pattern: "/images/pattern/hochiminh.webp",
  },
  {
    city: "Kuala Lumpur",
    date: "June 10, 2026",
    country: "Malaysia",
    attendees: "400+",
    gradient: "from-emerald-500 to-teal-600",
    position: { top: "50%", left: "62%" },
    gallery: GALLERY_MY,
    pattern: "/images/pattern/malaysia.webp",
  },
  {
    city: "Shenzhen",
    date: "July 10, 2026",
    country: "China",
    attendees: "400+",
    gradient: "from-purple-500 to-pink-600",
    position: { top: "40%", left: "60%" },
    gallery: GALLERY_CN,
    pattern: "/images/pattern/shenzhen.webp",
  },
];

export const PARTNERS = [
  {
    src: "/images/sponsors/akamai.png",
    alt: "Akamai",
    url: "https://www.akamai.com/",
  },
  {
    src: "/images/sponsors/alibaba.png",
    alt: "Alibaba",
    url: "https://www.alibabacloud.com/",
  },
  {
    src: "/images/sponsors/aws.png",
    alt: "AWS",
    url: "https://aws.amazon.com/",
  },
  {
    src: "/images/sponsors/cintegrity.png",
    alt: "Cintegrity",
    url: "https://www.cintegrity.com/",
  },
  {
    src: "/images/sponsors/cloudflare.png",
    alt: "Cloudflare",
    url: "https://www.cloudflare.com/",
  },
  {
    src: "/images/sponsors/coupa.png",
    alt: "Coupa",
    url: "https://www.coupa.com/",
  },
  {
    src: "/images/sponsors/fortinet.png",
    alt: "Fortinet",
    url: "https://www.fortinet.com/",
  },
  {
    src: "/images/sponsors/googlecloud.png",
    alt: "Google Cloud",
    url: "https://cloud.google.com/",
  },
  { src: "/images/sponsors/ibm.png", alt: "IBM", url: "https://www.ibm.com/" },
  {
    src: "/images/sponsors/infoblox.png",
    alt: "Infoblox",
    url: "https://www.infoblox.com/",
  },
  {
    src: "/images/sponsors/nutanix.png",
    alt: "Nutanix",
    url: "https://www.nutanix.com/",
  },
  {
    src: "/images/sponsors/paypal.webp",
    alt: "PayPal",
    url: "https://www.paypal.com/",
  },
  { src: "/images/sponsors/pwc.svg", alt: "PwC", url: "https://www.pwc.com/" },
  {
    src: "/images/sponsors/searce.png",
    alt: "Searce",
    url: "https://www.searce.com/",
  },
  {
    src: "/images/sponsors/senitalone.png",
    alt: "SentinelOne",
    url: "https://www.sentinelone.com/",
  },
  {
    src: "/images/sponsors/servicenow.png",
    alt: "ServiceNow",
    url: "https://www.servicenow.com/",
  },
  { src: "/images/sponsors/ssc.png", alt: "SSC", url: "https://www.ssc.com/" },
  {
    src: "/images/sponsors/trend.png",
    alt: "Trend Micro",
    url: "https://www.trendmicro.com/",
  },
];

export const EMAIL = "Jeffrey.Teh@thetehgroup.com";
export const MAILTO_URL = `mailto:${EMAIL}?subject=Become a Sponsor Nexus 2026&body=Hello, I am interested in becoming a sponsor for Nexus 2026 event. Could we discuss further details about the event? `;
export const PHONE_WHATSAPP = "+852 68019775";
export const WHATSAPP_MESSAGE =
  "Hi Nexus Team,\nI'm interested in joining as a sponsor for Nexus. Could we discuss the available sponsorship packages and next steps? Thank you!";
