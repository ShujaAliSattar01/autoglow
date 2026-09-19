import nodemailer from "nodemailer";

export interface AppointmentEmailData {
  fullName: string;
  phone: string;
  email: string;
  vehicleType: string;
  vehicleModel: string;
  service: string;
  date: string;
  time: string;
  address: string;
  area: string;
  notes?: string;
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

  const rows: [string, string][] = [
    ["Customer Name", data.fullName],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Vehicle", `${data.vehicleType} — ${data.vehicleModel}`],
    ["Package", data.service],
    ["Date", data.date],
    ["Time", data.time],
    ["Address", data.address],
    ["Area", data.area],
    ["Notes", data.notes?.trim() || "—"],
  ];

  const html = `
    <div style="font-family: Arial, sans-serif; color: #071426;">
      <h2 style="margin-bottom: 8px;">New AutoGlow Booking</h2>
      <table cellpadding="6" style="border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="font-weight: 600; vertical-align: top;">${label}</td>
            <td>${value}</td>
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
      subject: `New AutoGlow Booking — ${data.fullName} — ${data.service}`,
      html,
    });
    return { sent: true as const };
  } catch (error) {
    console.error("[email] Failed to send appointment notification email:", error);
    return { sent: false as const };
  }
}
