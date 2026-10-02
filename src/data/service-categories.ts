import type { ServiceCategory, ServiceCategoryId } from "@/types";

// The three doorstep services AutoGlow offers in Lahore. Used by the homepage
// services grid, the pricing tabs, the navbar and the booking form.

export const serviceCategoryIds: ServiceCategoryId[] = ["car", "solar", "sofa"];

export const serviceCategories: ServiceCategory[] = [
  {
    id: "car",
    name: "Car Wash & Detailing",
    shortName: "Car Wash",
    description:
      "Our original service — mobile car wash, interior cleaning, polishing and ceramic protection, priced by vehicle type.",
    image: "/images/hero-car-wash.webp",
    imageAlt: "AutoGlow team washing a car at a customer's home in Lahore",
    href: "/services/car-wash-lahore",
    startingPrice: "Rs 1,799",
  },
  {
    id: "solar",
    name: "Solar Panel Cleaning",
    shortName: "Solar",
    description:
      "Gentle, panel-appropriate cleaning that removes dust and ordinary dirt from rooftop solar panels, priced by panel count.",
    image: "/images/solar-panel-cleaning.webp",
    imageAlt: "Rooftop solar panels being cleaned with a soft brush in Lahore",
    href: "/services/solar-panel-cleaning-lahore",
    startingPrice: "Rs 2,000",
  },
  {
    id: "sofa",
    name: "Sofa Cleaning",
    shortName: "Sofa",
    description:
      "Fabric-compatible sofa cleaning at your doorstep — dust, debris and general dirt treatment, priced by number of seats.",
    image: "/images/sofa-cleaning.webp",
    imageAlt: "A clean fabric sofa set in a Lahore living room after AutoGlow sofa cleaning",
    href: "/services/sofa-cleaning-lahore",
    startingPrice: "Rs 500",
  },
];

export const serviceCategoryLabels: Record<ServiceCategoryId, string> = {
  car: "Car Wash & Detailing",
  solar: "Solar Panel Cleaning",
  sofa: "Sofa Cleaning",
};

export function getServiceCategory(id: ServiceCategoryId) {
  return serviceCategories.find((category) => category.id === id);
}
