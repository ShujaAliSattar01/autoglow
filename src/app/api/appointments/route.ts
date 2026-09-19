import { NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/validation";
import { isRateLimited, getClientKey } from "@/lib/rate-limit";
import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase/server";
import { sendAppointmentEmail } from "@/lib/email";
import { sendOwnerWhatsappNotification } from "@/lib/whatsapp";

export const runtime = "nodejs";

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
    const admin = getSupabaseAdmin()!;
    const { error } = await admin.from("appointments").insert({
      full_name: data.fullName,
      phone: data.phone,
      email: data.email,
      vehicle_type: data.vehicleType,
      vehicle_model: data.vehicleModel,
      service: data.service,
      preferred_date: data.date,
      preferred_time: data.time,
      address: data.address,
      area: data.area,
      notes: data.notes || null,
      status: "new",
    });
    if (error) {
      console.error("[appointments] Failed to save to Supabase:", error.message);
    }
  } else {
    console.warn(
      "[appointments] Supabase is not configured. Appointment was not persisted to a database."
    );
  }

  const emailResult = await sendAppointmentEmail({
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    vehicleType: data.vehicleType,
    vehicleModel: data.vehicleModel,
    service: data.service,
    date: data.date,
    time: data.time,
    address: data.address,
    area: data.area,
    notes: data.notes,
  });

  const whatsappMessage = [
    "New AutoGlow Booking",
    `Name: ${data.fullName}`,
    `Phone: ${data.phone}`,
    `Vehicle: ${data.vehicleType} — ${data.vehicleModel}`,
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
