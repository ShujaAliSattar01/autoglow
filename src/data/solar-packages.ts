import type { FlatPricingPackage } from "@/types";

// Central source of truth for Solar Panel Cleaning pricing.
// Edit prices and features here -- every card, service page and booking
// dropdown reads from this file.

export const solarPackages: FlatPricingPackage[] = [
  {
    id: "essential-solar-clean",
    name: "Essential Solar Clean",
    scope: "Up to 10 solar panels",
    price: 2000,
    description: "A straightforward dust and dirt clean for smaller rooftop installations.",
    included: [
      "Up to 10 solar panels",
      "Surface dust removal",
      "Gentle, panel-appropriate cleaning",
      "Removal of ordinary dirt and light deposits",
      "Basic visual condition check",
    ],
    ctaLabel: "Book Essential Clean",
  },
  {
    id: "standard-solar-clean",
    name: "Standard Solar Clean",
    scope: "11–20 solar panels",
    price: 3500,
    description: "Our most commonly booked size for medium home and office arrays.",
    badge: "MOST POPULAR",
    included: [
      "11–20 solar panels",
      "Gentle, panel-appropriate cleaning",
      "Dust and ordinary dirt removal",
      "Basic visual condition check",
      "Final surface inspection",
    ],
    ctaLabel: "Book Standard Clean",
  },
  {
    id: "complete-solar-clean",
    name: "Complete Solar Clean",
    scope: "21–30 solar panels",
    price: 5000,
    description: "For larger rooftop arrays that need a full pass across every panel.",
    included: [
      "21–30 solar panels",
      "Gentle, panel-appropriate cleaning",
      "Dust and ordinary dirt removal",
      "Basic visual condition check",
      "Final surface inspection",
    ],
    ctaLabel: "Book Complete Clean",
  },
];

/** Shown directly beneath the solar pricing cards. Keep the wording factual. */
export const solarPricingNotes = [
  "All prices shown are starting rates. Final pricing is confirmed before work begins and may vary based on roof accessibility, panel condition, the number of panels and your location in Lahore.",
  "Safe access to the panels is required. We confirm access details and service eligibility with you before a booking is finalised.",
  "More than 30 panels? Message us on WhatsApp for a custom quotation.",
];

/** Options offered in the booking form and used for WhatsApp booking messages. */
export const solarPanelCountOptions = [
  "Up to 10 panels",
  "11–20 panels",
  "21–30 panels",
  "More than 30 panels (custom quote)",
];

/** Service options added to the booking form when Solar Panel Cleaning is selected. */
export const solarServiceOptions = [
  ...solarPackages.map((pkg) => pkg.name),
  "Custom Solar Clean (more than 30 panels)",
];
