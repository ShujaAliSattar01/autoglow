import { z } from "zod";

export const reviewSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  vehicle: z.string().trim().max(60).optional().or(z.literal("")),
  area: z.string().trim().max(60).optional().or(z.literal("")),
  rating: z.number().int().min(1, "Please select a rating").max(5),
  review: z.string().trim().min(10, "Please write at least 10 characters").max(1000),
  // Honeypot: must stay empty. Bots that auto-fill every field will trip this.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;

export const MAX_IMAGE_SIZE_BYTES = 4 * 1024 * 1024; // 4MB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const appointmentSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(80),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
  email: z.string().trim().email("Please enter a valid email"),
  vehicleType: z.enum(["hatchback", "sedan", "crossover", "suv"], {
    error: "Please select your vehicle type",
  }),
  vehicleModel: z.string().trim().min(2, "Please enter your vehicle make/model").max(80),
  service: z.string().trim().min(1, "Please select a service"),
  date: z.string().trim().min(1, "Please select a date"),
  time: z.string().trim().min(1, "Please select a time"),
  address: z.string().trim().min(5, "Please enter your service address").max(200),
  area: z.string().trim().min(2, "Please enter your area").max(80),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
