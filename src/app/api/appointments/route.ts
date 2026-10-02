import { NextResponse } from "next/server";
import { appointmentSchema, type AppointmentFormValues } from "@/lib/validation";
import { isRateLimited, getClientKey } from "@/lib/rate-limit";
import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase/server";
import { sendAppointmentEmail } from "@/lib/email";
import { sendOwnerWhatsappNotification } from "@/lib/whatsapp";
import { serviceCategoryLabels } from "@/data/service-categories";

export const runtime = "nodejs";

/** The category-specific lines included in the owner's notification message. */
function categoryDetailLines(data: AppointmentFormValues): string[] {
  if (data.category === "solar") {
    return [
      `Panels: ${data.panelCount || "—"}`,
      `Roof/Access: ${data.roofAccess || "—"}`,
    ];
  }
  if (data.category === "sofa") {
    return [
      `Sofa: ${data.sofaType || "—"}`,
      `Seats: ${data.seatCount || "—"}`,
      `Fabric: ${data.fabricType || "Not specified"}`,
    ];
  }
  return [`Vehicle: ${data.vehicleType || "—"} — ${data.vehicleModel || "—"}`];
}

/** A human-readable summary of the category-specific answers, for the notes column. */
function detailSummary(data: AppointmentFormValues): string {
  return categoryDetailLines(data).join(" | ");
}

/**
 * Persists a booking, tolerating both the original `appointments` schema and
 * the extended one documented in the README.
 *
 * The original table has NOT NULL `vehicle_type` / `vehicle_model` columns and
 * no category columns, so a solar or sofa booking cannot be written to it
 * directly. We try the extended insert first and fall back to a legacy-safe
 * row that folds the category answers into `notes`. A booking never fails
 * because persistence failed -- the owner is still notified by email/WhatsApp.
 */
async function persistAppointment(data: AppointmentFormValues) {
  const admin = getSupabaseAdmin()!;

  const shared = {
    full_name: data.fullName,
    phone: data.phone,
    email: data.email,
    service: data.service,
    preferred_date: data.date,
    preferred_time: data.time,
    address: data.address,
    area: data.area,
    status: "new",
  };

  const extended = await admin.from("appointments").insert({
    ...shared,
    category: data.category,
    vehicle_type: data.vehicleType ?? null,
    vehicle_model: data.vehicleModel || null,
    panel_count: data.panelCount || null,
    roof_access: data.roofAccess || null,
    sofa_type: data.sofaType || null,
    seat_count: data.seatCount || null,
    fabric_type: data.fabricType || null,
    notes: data.notes || null,
  });

  if (!extended.error) return;

  console.warn(
    "[appointments] Extended insert failed, retrying against the original schema:",
    extended.error.message
  );

  const legacyNotes = [detailSummary(data), data.notes?.trim()].filter(Boolean).join(" | ");

  const legacy = await admin.from("appointments").insert({
    ...shared,
    // The original schema requires both vehicle columns.
    vehicle_type: data.vehicleType ?? data.category,
    vehicle_model: data.vehicleModel || serviceCategoryLabels[data.category],
    notes: legacyNotes || null,
  });

  if (legacy.error) {
    console.error("[appointments] Failed to save to Supabase:", legacy.error.message);
  }
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (isRateLimited(`appointment:${clientKey}`, 8, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many booking attempts. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Older cached clients submit car bookings without a category field.
  if (body && typeof body === "object" && !Array.isArray(body) && !("category" in body)) {
    (body as Record<string, unknown>).category = "car";
  }

  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      { error: firstIssue?.message ?? "Invalid submission." },
      { status: 400 }
    );
  }

  if (parsed.data.website) {
    return NextResponse.json({ error: "Submission rejected." }, { status: 400 });
  }

  const data = parsed.data;

  const todayStr = new Date().toISOString().slice(0, 10);
  if (data.date < todayStr) {
    return NextResponse.json({ error: "Please select a valid future date." }, { status: 400 });
  }

  if (isSupabaseAdminConfigured) {
    await persistAppointment(data);
  } else {
    console.warn(
      "[appointments] Supabase is not configured. Appointment was not persisted to a database."
    );
  }

  const emailResult = await sendAppointmentEmail({
    category: data.category,
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    service: data.service,
    date: data.date,
    time: data.time,
    address: data.address,
    area: data.area,
    notes: data.notes,
    vehicleType: data.vehicleType,
    vehicleModel: data.vehicleModel,
    panelCount: data.panelCount,
    roofAccess: data.roofAccess,
    sofaType: data.sofaType,
    seatCount: data.seatCount,
    fabricType: data.fabricType,
  });

  const whatsappMessage = [
    `New AutoGlow Booking — ${serviceCategoryLabels[data.category]}`,
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    ...categoryDetailLines(data),
    `Service: ${data.service}`,
    `Date/Time: ${data.date} at ${data.time}`,
    `Address: ${data.address}, ${data.area}`,
  ].join("\n");
  const whatsappResult = await sendOwnerWhatsappNotification(whatsappMessage);

  return NextResponse.json(
    {
      success: true,
      emailSent: emailResult.sent,
      whatsappSent: whatsappResult.sent,
    },
    { status: 201 }
  );
}
