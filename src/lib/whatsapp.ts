import type { VehicleType } from "@/types";

// ---------------------------------------------------------------------------
// Client-safe WhatsApp helpers
//
// IMPORTANT technical distinction: a plain wa.me link can only pre-fill a
// message in WhatsApp for the *visitor* to send themselves -- it cannot
// silently send a message on anyone's behalf. Automatically notifying the
// AutoGlow owner requires the WhatsApp Business Cloud API (see below).
// ---------------------------------------------------------------------------

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hi AutoGlow! I would like to book a car wash/detailing service.";

const vehicleLabels: Record<VehicleType, string> = {
  hatchback: "Hatchback",
  sedan: "Sedan",
  crossover: "Crossover",
  suv: "SUV/7-Seater",
};

function normalizeNumber(raw: string) {
  // international format, digits only -- strips +, spaces, dashes, leading zero handling
  return raw.replace(/[^\d]/g, "");
}

function getConfiguredNumber(): string {
  return normalizeNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "");
}

export function isWhatsAppNumberConfigured(): boolean {
  return getConfiguredNumber().length > 0;
}

/** Builds a wa.me URL with an optional pre-filled message. Returns null if no number is configured. */
export function getWhatsAppUrl(message?: string): string | null {
  const number = getConfiguredNumber();
  if (!number) return null;
  const text = encodeURIComponent(message ?? DEFAULT_WHATSAPP_MESSAGE);
  return `https://wa.me/${number}?text=${text}`;
}

/** Message for "Ask on WhatsApp" actions on a pricing package or add-on. */
export function getPackageWhatsAppMessage(packageName: string, vehicleType?: VehicleType) {
  const vehicleLabel = vehicleType ? vehicleLabels[vehicleType] : null;
  return vehicleLabel
    ? `Hi AutoGlow! I am interested in the ${packageName} package for a ${vehicleLabel}.`
    : `Hi AutoGlow! I am interested in the ${packageName} package.`;
}

/** Message for "Ask on WhatsApp" actions on a monthly plan. */
export function getMonthlyPlanWhatsAppMessage(planName: string, vehicleType?: VehicleType) {
  const vehicleLabel = vehicleType ? vehicleLabels[vehicleType] : null;
  return vehicleLabel
    ? `Hi AutoGlow! I am interested in the ${planName} monthly plan for a ${vehicleLabel}.`
    : `Hi AutoGlow! I am interested in the ${planName} monthly plan.`;
}

/** Message shown after a successful booking submission, offering to continue on WhatsApp. */
export function getBookingWhatsAppMessage(details: {
  service: string;
  vehicleType?: VehicleType;
  date: string;
  time: string;
}) {
  const vehicleLabel = details.vehicleType ? vehicleLabels[details.vehicleType] : "vehicle";
  return `Hi AutoGlow! I just submitted a booking request for ${details.service} for my ${vehicleLabel} on ${details.date} at ${details.time}.`;
}

// ---------------------------------------------------------------------------
// Server-side WhatsApp Cloud API notification helper.
//
// Only the WhatsApp Business Cloud API (configured below) can send a message
// to the owner automatically. If these env vars are not set, we simply skip
// this step; the booking flow must never fail because of it.
// ---------------------------------------------------------------------------

const accessToken = process.env.WHATSAPP_CLOUD_ACCESS_TOKEN;
const phoneNumberId = process.env.WHATSAPP_CLOUD_PHONE_NUMBER_ID;
const ownerNumber = process.env.WHATSAPP_OWNER_NUMBER;

export const isWhatsappCloudConfigured = Boolean(
  accessToken && phoneNumberId && ownerNumber
);

export async function sendOwnerWhatsappNotification(message: string) {
  if (!isWhatsappCloudConfigured) {
    console.warn(
      "[whatsapp] WhatsApp Cloud API is not configured. Skipping automated owner notification."
    );
    return { sent: false as const };
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: ownerNumber,
          type: "text",
          text: { body: message },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[whatsapp] Cloud API request failed:", errorText);
      return { sent: false as const };
    }

    return { sent: true as const };
  } catch (error) {
    console.error("[whatsapp] Failed to send owner notification:", error);
    return { sent: false as const };
  }
}
