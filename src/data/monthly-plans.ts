import type { MonthlyPlan } from "@/types";

export const monthlyPlans: MonthlyPlan[] = [
  {
    id: "essential-care",
    name: "Essential Care",
    description: "Regular maintenance washes to keep your car looking fresh.",
    prices: {
      hatchback: 4999,
      sedan: 5999,
      crossover: 7499,
      suv: 8499,
    },
    included: [
      "4 maintenance washes per month",
      "Exterior foam wash",
      "Interior vacuum",
      "Dashboard wipe",
      "Glass cleaning",
      "Tyre shine",
      "Priority booking",
    ],
    ctaLabel: "Subscribe to Essential Care",
  },
  {
    id: "shine-care",
    name: "Shine Care",
    description: "Our most popular monthly plan, balancing shine and value.",
    badge: "BEST VALUE",
    prices: {
      hatchback: 6999,
      sedan: 7999,
      crossover: 9499,
      suv: 10499,
    },
    included: [
      "4 doorstep washes",
      "Full interior vacuum every visit",
      "Dashboard cleaning every visit",
      "Tyre shine every visit",
      "2 wax treatments per month",
      "Priority booking",
      "Preferred time slots",
    ],
    ctaLabel: "Subscribe to Shine Care",
  },
  {
    id: "premium-care",
    name: "Premium Care",
    description: "Complete monthly care including deep cleans and polish.",
    prices: {
      hatchback: 8999,
      sedan: 9999,
      crossover: 11499,
      suv: 12999,
    },
    included: [
      "4 premium maintenance washes",
      "Everything in Shine Care",
      "1 interior deep clean per month",
      "1 exterior polish/wax treatment",
      "Priority booking",
      "Preferred appointment slots",
    ],
    ctaLabel: "Subscribe to Premium Care",
  },
];
