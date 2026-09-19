import type { Testimonial } from "@/types";

// Fallback testimonials shown when Supabase is not yet configured,
// or as initial seed content once the testimonials table is created.
export const seedTestimonials: Testimonial[] = [
  {
    id: "seed-1",
    name: "Hassan Raza",
    vehicle: "Honda Civic",
    area: "DHA Phase 5",
    rating: 5,
    review:
      "Booked the Complete Detailing package and the car looked better than when I bought it. The team was on time and very professional.",
    image_url: null,
    created_at: "2026-06-12T10:00:00.000Z",
    status: "approved",
  },
  {
    id: "seed-2",
    name: "Ayesha Malik",
    vehicle: "Suzuki Swift",
    area: "Gulberg",
    rating: 5,
    review:
      "Loved not having to leave the house. They arrived on time, brought all their own equipment, and my car looked spotless afterwards.",
    image_url: null,
    created_at: "2026-05-28T10:00:00.000Z",
    status: "approved",
  },
  {
    id: "seed-3",
    name: "Bilal Ahmed",
    vehicle: "Toyota Fortuner",
    area: "Bahria Town",
    rating: 4,
    review:
      "Great ceramic coating job on my SUV. Water just beads right off now. Booking on WhatsApp was quick and easy.",
    image_url: null,
    created_at: "2026-04-15T10:00:00.000Z",
    status: "approved",
  },
];
