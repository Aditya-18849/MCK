export const LINKS = {
  coaching: "https://linktr.ee/coachingbymck",
  instagram: "https://www.instagram.com/mck.ifbbpro/",
  youtube: "https://www.youtube.com/@IFBBPROMCK",
  hulkcast: "https://www.youtube.com/watch?v=Dr2G1EXO0ks",
  dayOne: "https://www.day1performance.com.au/",
  card1o: "https://www.day1performance.com.au/collections/new-collection/products/card1o",
  slimtum: "https://slimtum.com.au/",
  onegym: "https://www.onegym.net.au/",
  animal: "https://www.instagram.com/theanimallifemovement/",
  olympia:
    "https://contests.npcnewsonline.com/contests/2026/ifbb_mr_olympia/pnax/murat_can_karahasanlar",
};

/** WhatsApp number in international format, digits only (for example 61412345678). */
export const WHATSAPP_NUMBER: string = "";
/** Text already typed into the chat when a visitor opens it. */
export const WHATSAPP_MESSAGE = "Hi MCK, I'd like to know more about coaching.";
/** Null until a number is set, so a button can never open the wrong chat. */
export const WHATSAPP_URL = WHATSAPP_NUMBER
  ? `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
  : null;

export const img = (name: string) => `${import.meta.env.BASE_URL}img/${name}.webp`;

export const RECORD: {
  year: string;
  shows: { place: number; name: string; note?: string }[];
}[] = [
  {
    year: "2026",
    shows: [
      { place: 15, name: "Mr. Olympia", note: "Las Vegas, 26 September" },
      { place: 3, name: "Tokyo Pro", note: "28 June" },
      { place: 1, name: "Legion Sports Fest Pro", note: "Reno, 30 May" },
      { place: 11, name: "Pittsburgh Pro", note: "17 May" },
      { place: 4, name: "New York Pro", note: "9 May" },
    ],
  },
  {
    year: "2025",
    shows: [
      { place: 4, name: "Global Classic Hong Kong Pro" },
      { place: 2, name: "Tokyo Pro" },
      { place: 4, name: "New York Pro" },
      { place: 5, name: "Pittsburgh Pro" },
    ],
  },
  {
    year: "2024",
    shows: [
      { place: 5, name: "Atlantic Coast Pro" },
      { place: 3, name: "Tokyo Pro" },
    ],
  },
];

export const ordinal = (n: number) => {
  const v = n % 100;
  if (v >= 11 && v <= 13) return "th";
  return ["th", "st", "nd", "rd"][n % 10] ?? "th";
};

const O = "Mr. Olympia 2026";
export const POSES = [
  { src: img("pose-fdb"), label: "Front double biceps", subtitle: O },
  { src: img("pose-side-chest"), label: "Side chest", subtitle: O },
  { src: img("pose-bdb"), label: "Back double biceps", subtitle: O },
  { src: img("pose-twist"), label: "Twisting back", subtitle: O },
  { src: img("pose-archer"), label: "Kneeling archer", subtitle: O },
  { src: img("pose-kneel"), label: "Kneeling side chest", subtitle: O },
  { src: img("pose-classic"), label: "Classic one-arm", subtitle: O },
  { src: img("pose-quarter"), label: "Quarter turn", subtitle: O },
  { src: img("pose-phone-archer"), label: "Standing archer", subtitle: "Mr. Olympia 2026, from the crowd" },
  { src: img("pose-nypro"), label: "The kneel", subtitle: "New York Pro 2025" },
  { src: img("pose-phone-bdb"), label: "Back, from the floor", subtitle: "Mr. Olympia 2026, from the crowd" },
  { src: img("pose-rear-twist"), label: "Rear twist", subtitle: O },
].map((p) => ({
  ...p,
  alt: `Murat Can Karahasanlar, ${p.label.toLowerCase()}, ${p.subtitle}`,
}));

export const MILESTONES = [
  {
    label: "New York Pro 2025",
    sublabel: "4th",
    image: img("row-nypro"),
    imageAlt: "Murat kneeling in a side pose on the New York Pro stage",
    description: "Top four, the show he calls career-defining",
  },
  {
    label: "Legion Sports Fest Pro 2026",
    sublabel: "1st",
    image: img("row-legion"),
    imageAlt: "Murat looking down at the Legion Sports Fest trophy",
    description: "Reno, Nevada. The win",
  },
  {
    label: "Mr. Olympia 2026",
    sublabel: "15th",
    image: img("row-olympia"),
    imageAlt: "Murat posing on the Olympia stage, photographed from the crowd",
    description: "Las Vegas, Men's Classic Physique",
  },
];

export const JOURNEYS = [
  {
    title: "One pose, a season apart",
    text: "From fourth place in New York to the Olympia stage the following year, kneeling in the same side chest.",
    before: { image: img("journey-a-before"), label: "New York Pro 2025" },
    after: { image: img("journey-a-after"), label: "Mr. Olympia 2026" },
    split: 50,
  },
  {
    title: "Morning to showtime",
    text: "How he woke up on Olympia show day, and the same back double biceps under the lights.",
    before: { image: img("journey-b-before"), label: "Olympia show day" },
    after: { image: img("journey-b-after"), label: "Mr. Olympia 2026" },
    split: 50,
  },
  {
    title: "Days out to stage",
    text: "The last few days of prep, seen in one side chest: hotel room first, then the stage.",
    before: { image: img("journey-c-before"), label: "A few days out" },
    after: { image: img("journey-c-after"), label: "Mr. Olympia 2026" },
    split: 45,
  },
];

export const ROUTE = [
  { place: "İzmir", text: "Balçova, where he kept chasing professional status. He knows what a long goal asks of you." },
  { place: "Tunisia", text: "March 2022. Overall champion at the NPC Pro Qualifier, and the IFBB Pro card behind his coaching." },
  { place: "Melbourne", text: "His base. He coaches online from here, so you can train wherever you are." },
  { place: "Las Vegas", text: "26 September 2026. Fifteenth at Mr. Olympia. Your coach is still competing." },
];

export const FAQ = [
  {
    question: "What is Coaching by MCK?",
    answer: "Premium one-to-one online coaching with Murat, run on the Kahunas coaching platform.",
  },
  {
    question: "Where do I sign up?",
    answer:
      "On the Coaching by MCK Linktree. The “Premium One on One Online Coaching” link takes you to his page on Kahunas.",
  },
  {
    question: "Do I need to be in Melbourne?",
    answer: "No. Coaching is online. Murat lives in Melbourne and competes internationally.",
  },
  {
    question: "What does it cost?",
    answer:
      "Check the coaching link for current prices, inclusions and availability, or ask on WhatsApp.",
  },
  {
    question: "Who coaches Murat?",
    answer:
      "Neil “Yoda” Hill, who developed the Y3T training system. Murat competes as a Y3T athlete.",
  },
];

export const CODES = [
  { brand: "Day One Performance", code: "MCK10", href: LINKS.dayOne },
  { brand: "The Animal Life Movement", code: "MCK15", href: LINKS.animal },
  { brand: "Slimtum", code: "MCK10", href: LINKS.slimtum },
];

export const INGREDIENTS = [
  "Vitamin D", "Vitamin K", "Selenium", "Bergamot", "Arjuna",
  "Olive leaf", "Nattokinase", "Aged garlic", "Astragalus", "CoQ10",
];
