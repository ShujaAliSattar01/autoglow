import nodemailer from "nodemailer";

import type { ServiceCategoryId } from "@/types";

export interface AppointmentEmailData {
  category: ServiceCategoryId;
  fullName: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  address: string;
  area: string;
  notes?: string;
  /** Car Wash & Detailing */
  vehicleType?: string;
  vehicleModel?: string;
  /** Solar Panel Cleaning */
  panelCount?: string;
  roofAccess?: string;
  /** Sofa Cleaning */
  sofaType?: string;
  seatCount?: string;
  fabricType?: string;
}

const categoryLabels: Record<ServiceCategoryId, string> = {
  car: "Car Wash & Detailing",
  solar: "Solar Panel Cleaning",
  sofa: "Sofa Cleaning",
};

/** Customer-supplied values land in an HTML email, so escape them. */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** The category-specific rows that sit between the customer and the schedule. */
function categoryRows(data: AppointmentEmailData): [string, string][] {
  if (data.category === "solar") {
    return [
      ["Number of Panels", data.panelCount || "—"],
      ["Roof / Access Details", data.roofAccess || "—"],
    ];
  }
  if (data.category === "sofa") {
    return [
      ["Sofa Type", data.sofaType || "—"],
      ["Number of Seats", data.seatCount || "—"],
      ["Fabric Type", data.fabricType || "Not specified"],
    ];
  }
  return [["Vehicle", `${data.vehicleType ?? "—"} — ${data.vehicleModel ?? "—"}`]];
}

const contactEmail = process.env.CONTACT_EMAIL;
const smtpUser = process.env.SMTP_USER;
const smtpAppPassword = process.env.SMTP_APP_PASSWORD;

export const isEmailConfigured = Boolean(contactEmail && smtpUser && smtpAppPassword);

function getTransporter() {
  if (!isEmailConfigured) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpAppPassword,
    },
  });
}

export async function sendAppointmentEmail(data: AppointmentEmailData) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn(
      "[email] SMTP is not configured (CONTACT_EMAIL / SMTP_USER / SMTP_APP_PASSWORD missing). Skipping owner notification email."
    );
    return { sent: false as const };
  }

  const categoryLabel = categoryLabels[data.category] ?? categoryLabels.car;

  const rows: [string, string][] = [
    ["Service Category", categoryLabel],
    ["Customer Name", data.fullName],
    ["Phone", data.phone],
    ["Email", data.email],
    ...categoryRows(data),
    ["Package", data.service],
    ["Date", data.date],
    ["Time", data.time],
    ["Address", data.address],
    ["Area", data.area],
    ["Notes", data.notes?.trim() || "—"],
  ];

  const html = `
    <div style="font-family: Arial, sans-serif; color: #071426;">
      <h2 style="margin-bottom: 8px;">New AutoGlow Booking — ${escapeHtml(categoryLabel)}</h2>
      <table cellpadding="6" style="border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="font-weight: 600; vertical-align: top;">${escapeHtml(label)}</td>
            <td>${escapeHtml(value)}</td>
          </tr>`
          )
          .join("")}
      </table>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: smtpUser,
      to: contactEmail,
      replyTo: data.email,
      subject: `New AutoGlow Booking — ${categoryLabel} — ${data.fullName} — ${data.service}`,
      html,
    });
    return { sent: true as const };
  } catch (error) {
    console.error("[email] Failed to send appointment notification email:", error);
    return { sent: false as const };
  }
}
