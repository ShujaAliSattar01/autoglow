import type { FlatPricingPackage } from "@/types";

// Central source of truth for Sofa Cleaning pricing.
// Edit prices and features here -- every card, service page and booking
// dropdown reads from this file.

export const sofaPackages: FlatPricingPackage[] = [
  {
    id: "single-sofa-seat",
    name: "Single Sofa Seat",
    scope: "One fabric sofa seat",
    price: 500,
    description: "A single-seat clean — useful for a chair, a recliner or a quick refresh.",
    included: [
      "One fabric sofa seat",
      "Dust and loose-debris removal",
      "Fabric-compatible surface cleaning",
      "General dirt treatment",
    ],
    ctaLabel: "Book Single Seat",
  },
  {
    id: "family-sofa-set",
    name: "Family Sofa Set",
    scope: "Up to 5 sofa seats",
    price: 2499,
    description: "The usual choice for a standard living-room sofa set.",
    badge: "MOST POPULAR",
    included: [
      "Up to 5 sofa seats",
      "Dust and debris removal",
      "Fabric-compatible cleaning",
      "General dirt and spot treatment",
      "Finishing inspection",
    ],
    ctaLabel: "Book Family Set",
  },
  {
    id: "complete-sofa-care",
    name: "Complete Sofa Care",
    scope: "Up to 7 seats or eligible L-shaped sofa",
    price: 3999,
    description: "For larger sofa sets and eligible L-shaped sofas in one visit.",
    included: [
      "Up to 7 seats or eligible L-shaped sofa",
      "Dust and debris removal",
      "Fabric-compatible cleaning",
      "General stain treatment",
      "Finishing inspection",
    ],
    ctaLabel: "Book Complete Care",
  },
];

/** Shown directly beneath the sofa pricing cards. Keep the wording factual. */
export const sofaPricingNotes = [
  "All prices shown are starting rates. Final pricing is confirmed before work begins and may vary based on sofa size, fabric and condition.",
  "Delicate fabrics, heavy stains, oversize sofas and additional seats may require a custom quotation.",
  "We treat general dirt and stains, but complete stain removal cannot be guaranteed on every fabric.",
];

/** Options offered in the booking form and used for WhatsApp booking messages. */
export const sofaTypeOptions = [
  "Single seat / chair",
  "2-seater sofa",
  "3-seater sofa",
  "Sofa set",
  "L-shaped sofa",
  "Other / not sure",
];

export const sofaSeatCountOptions = [
  "1 seat",
  "2 seats",
  "3 seats",
  "4 seats",
  "5 seats",
  "6 seats",
  "7 seats",
  "More than 7 seats (custom quote)",
];

export const sofaFabricOptions = [
  "Not sure",
  "Fabric",
  "Velvet",
  "Suede",
  "Leather / leatherette",
  "Other",
];

/** Service options added to the booking form when Sofa Cleaning is selected. */
export const sofaServiceOptions = [
  ...sofaPackages.map((pkg) => pkg.name),
  "Custom Sofa Clean (quote required)",
];
