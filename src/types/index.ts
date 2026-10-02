export type VehicleType = "hatchback" | "sedan" | "crossover" | "suv";

export interface VehicleOption {
  id: VehicleType;
  label: string;
  description: string;
}

export type VehiclePricing = Record<VehicleType, number>;

export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  image: string;
  prices: VehiclePricing;
  duration?: string;
  included: string[];
  badge?: "MOST POPULAR" | "BEST VALUE";
  ctaLabel: string;
}

export interface MonthlyPlan {
  id: string;
  name: string;
  description: string;
  prices: VehiclePricing;
  included: string[];
  badge?: "BEST VALUE";
  ctaLabel: string;
}

export interface AddOnService {
  id: string;
  name: string;
  priceLabel: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  /** Path to a dedicated service page, if one exists. */
  href?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  vehicle: string | null;
  area: string | null;
  rating: number;
  review: string;
  image_url: string | null;
  created_at: string;
  status: "approved" | "pending";
}

// ---------------------------------------------------------------------------
// Service categories
//
// AutoGlow offers three doorstep categories. Car wash & detailing is priced per
// vehicle type (see PricingPackage); solar panel and sofa cleaning are priced
// from a flat starting rate per quantity band (see FlatPricingPackage).
// ---------------------------------------------------------------------------

export type ServiceCategoryId = "car" | "solar" | "sofa";

/** A package priced from a single starting rate rather than by vehicle type. */
export interface FlatPricingPackage {
  id: string;
  name: string;
  /** Starting price in PKR. Edit here -- never hardcode prices in components. */
  price: number;
  /** The quantity band this package covers, e.g. "Up to 10 solar panels". */
  scope: string;
  description: string;
  included: string[];
  badge?: "MOST POPULAR" | "BEST VALUE";
  ctaLabel: string;
}

/** A top-level service category shown on the homepage and in navigation. */
export interface ServiceCategory {
  id: ServiceCategoryId;
  /** Full customer-facing name, e.g. "Solar Panel Cleaning". */
  name: string;
  /** Compact label for tabs and mobile navigation. */
  shortName: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Dedicated service page, or the homepage pricing anchor for car care. */
  href: string;
  /** Lowest starting price, pre-formatted for display. */
  startingPrice: string;
}
