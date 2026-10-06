import { Item } from "../types";

// Single source of truth for the mobile app.
// Deliberately mirrors website/js/data.js item-for-item so the
// website and the app can never quote different prices, inclusions
// or contact details for the same thing.

export const contact = {
  address: "Block G, Maverick Esports Park, Sandton, Johannesburg, 2196",
  phone: "+27 (0) 11 987 6543",
  phoneDial: "+27119876543",
  email: "play@nextlevelgaming.co.za",
  hours: [
    { day: "Monday – Thursday", time: "10:00 AM – 10:00 PM" },
    { day: "Friday – Saturday", time: "09:00 AM – 12:00 AM" },
    { day: "Sunday", time: "11:00 AM – 08:00 PM" },
  ],
};

export const vatRate = 0.15;

// "More than three" bookings = 15%, matching the Phase 3 report
const discountTiers = [
  { min: 1, max: 1, rate: 0 },
  { min: 2, max: 2, rate: 0.05 },
  { min: 3, max: 3, rate: 0.1 },
  { min: 4, max: Infinity, rate: 0.15 },
];

export function discountFor(totalBookings: number): number {
  if (totalBookings <= 0) return 0;
  const tier = discountTiers.find((t) => totalBookings >= t.min && totalBookings <= t.max);
  return tier ? tier.rate : 0;
}

export const packages: Item[] = [
  {
    id: "ultimate-gamer-pass",
    name: "Ultimate Gamer Pass",
    price: 1500,
    badge: "Package",
    category: "Gaming",
    summary: "Full-day unlimited access to high-performance PC rigs, consoles and specialised esports zones.",
    inclusions: [
      "Unlimited PC & console gaming for a full day",
      "High-speed, low-latency internet on every station",
      "Snack & drink voucher redeemable at the arena café",
      "Tournament entry pass for daily community brackets",
    ],
  },
  {
    id: "vip-gaming-experience",
    name: "VIP Gaming Experience",
    price: 1500,
    badge: "Package",
    category: "VIP",
    summary: "A private, soundproof booth with premium equipment, catering and a personal gaming assistant.",
    inclusions: [
      "Private gaming booth reserved exclusively for your session",
      "Premium equipment — flagship peripherals, high-refresh displays",
      "Food and drinks served directly to the booth",
      "Priority booking and a personal gaming assistant",
    ],
  },
  {
    id: "esports-training-package",
    name: "Esports Training Package",
    price: 1500,
    badge: "Package",
    category: "Training",
    summary: "Structured coaching and match analysis for competitive teams and solo players.",
    inclusions: [
      "Strategy coaching from an experienced competitive player",
      "Team communication drills and call-out structure",
      "Match analysis using recorded footage from recent games",
      "Written performance feedback after the session",
    ],
  },
  {
    id: "birthday-party-package",
    name: "Birthday Party Package",
    price: 1500,
    badge: "Package",
    category: "Events",
    summary: "A reserved gaming area with hosted competitions, catering and prizes for up to ten guests.",
    inclusions: [
      "Reserved gaming area for your group for the full session",
      "Hosted multiplayer competitions across console and PC",
      "Party decorations set up before you arrive",
      "Catering and tournament prizes for the winners",
    ],
  },
];

export const experiences: Item[] = [
  {
    id: "virtual-reality-experience",
    name: "Virtual Reality Experience",
    price: 750,
    badge: "Solo Experience",
    summary: "Full-room VR with a staff member guiding your first session.",
    inclusions: [
      "VR headset and controllers",
      "Choice of games from the arena library",
      "Staff assistance throughout the session",
    ],
  },
  {
    id: "racing-simulator-challenge",
    name: "Racing Simulator Challenge",
    price: 750,
    badge: "Solo Experience",
    summary: "A force-feedback wheel, hydraulic seat and a live monthly leaderboard.",
    inclusions: [
      "Full racing simulator rig",
      "Choice of tracks and vehicle classes",
      "Entry onto the arena leaderboard",
    ],
  },
  {
    id: "escape-room-challenge",
    name: "Escape Room Challenge",
    price: 750,
    badge: "Team Experience",
    summary: "A themed room, a locked door and a countdown — built for small teams.",
    inclusions: [
      "Themed escape room for your team",
      "Guided team challenge",
      "Digital scorecard emailed after the session",
    ],
  },
];

export const allItems: Item[] = [...packages, ...experiences];

export function findItem(id: string): Item | undefined {
  return allItems.find((i) => i.id === id);
}
