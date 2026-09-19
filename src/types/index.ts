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
