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

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

// One flat shape covers all three service categories so react-hook-form can
// register every field up front. `category` decides which of the
// category-specific fields are actually required -- enforced in superRefine
// below, so the same rules run on the client and on the server.
export const appointmentSchema = z
  .object({
    category: z.enum(["car", "solar", "sofa"], {
      error: "Please select a service category",
    }),

    // Shared across every category.
    fullName: z.string().trim().min(2, "Please enter your full name").max(80),
    phone: z.string().trim().min(7, "Please enter a valid phone number").max(20),
    email: z.string().trim().email("Please enter a valid email"),
    service: z.string().trim().min(1, "Please select a service"),
    date: z.string().trim().min(1, "Please select a date"),
    time: z.string().trim().min(1, "Please select a time"),
    address: z.string().trim().min(5, "Please enter your service address").max(200),
    area: z.string().trim().min(2, "Please enter your area").max(80),
    notes: optionalText(500),
    website: z.string().max(0).optional().or(z.literal("")),

    // Car Wash & Detailing only.
    vehicleType: z.enum(["hatchback", "sedan", "crossover", "suv"]).optional(),
    vehicleModel: optionalText(80),

    // Solar Panel Cleaning only.
    panelCount: optionalText(60),
    roofAccess: optionalText(300),

    // Sofa Cleaning only.
    sofaType: optionalText(60),
    seatCount: optionalText(60),
    fabricType: optionalText(60),
  })
  .superRefine((data, ctx) => {
    const require = (path: string, message: string) =>
      ctx.addIssue({ code: "custom", path: [path], message });

    if (data.category === "car") {
      if (!data.vehicleType) require("vehicleType", "Please select your vehicle type");
      if (!data.vehicleModel || data.vehicleModel.trim().length < 2) {
        require("vehicleModel", "Please enter your vehicle make/model");
      }
    }

    if (data.category === "solar") {
      if (!data.panelCount) require("panelCount", "Please select the number of panels");
      if (!data.roofAccess || data.roofAccess.trim().length < 3) {
        require("roofAccess", "Please describe how the panels are accessed");
      }
    }

    if (data.category === "sofa") {
      if (!data.sofaType) require("sofaType", "Please select your sofa type");
      if (!data.seatCount) require("seatCount", "Please select the number of seats");
    }
  });

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
