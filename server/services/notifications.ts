import { Resend } from "resend";
import type { Lead } from "@shared/schema";

// ─── HTML Escaping (XSS prevention) ───

function escapeHtml(str: string | null | undefined): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ─── Types ───

interface ContactData {
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  organizationName?: string;
  organizationType?: string;
  communitySize?: string;
  message?: string;
}

// ─── Resend Client (lazy init) ───

let resendClient: Resend | null = null;

function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

/** Parse comma-separated ADMIN_EMAIL into array of trimmed addresses */
function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAIL;
  if (!raw) return [];
  return raw.split(",").map((e) => e.trim()).filter(Boolean);
}

// ─── Email Notifications ───

async function sendLeadEmailNotification(lead: Lead): Promise<void> {
  const resend = getResendClient();
  if (!resend) {
    console.warn("Resend not configured — skipping lead email notification");
    return;
  }

  const recipients = getAdminEmails();
  if (recipients.length === 0) {
    console.warn("ADMIN_EMAIL not set — skipping lead email notification");
    return;
  }

  const html = `
    <h2>🔔 New Lead Submission</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;">
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Name:</td><td>${escapeHtml(lead.name)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Phone:</td><td>${escapeHtml(lead.phone)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${escapeHtml(lead.email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Package:</td><td>${escapeHtml(lead.package)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Interests:</td><td>${escapeHtml(lead.interests) || "Not specified"}</td></tr>
    </table>
    <p style="color:#888;font-size:12px;margin-top:16px;">Sent from Bodhi Technology Lab website</p>
  `.trim();

  const { error } = await resend.emails.send({
    from: "Bodhi Technology Lab <notifications@bodhilab.io>",
    to: recipients,
    replyTo: lead.email,
    subject: `New Lead: ${lead.name} — ${lead.package}`,
    html,
  });

  if (error) {
    console.error("Resend lead email error:", error);
  }
}

async function sendContactEmailNotification(contact: ContactData): Promise<void> {
  const resend = getResendClient();
  if (!resend) throw new Error("Resend not configured");

  const recipients = getAdminEmails();
  if (recipients.length === 0) throw new Error("ADMIN_EMAIL not set");

  const html = `
    <h2>📬 New Contact Form Submission</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;">
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Name:</td><td>${escapeHtml(contact.firstName)} ${escapeHtml(contact.lastName)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Email:</td><td>${escapeHtml(contact.email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Role:</td><td>${escapeHtml(contact.role) || "Not specified"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Organization:</td><td>${escapeHtml(contact.organizationName) || "Not specified"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Type:</td><td>${escapeHtml(contact.organizationType) || "Not specified"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;font-weight:bold;">Community Size:</td><td>${escapeHtml(contact.communitySize) || "Not specified"}</td></tr>
    </table>
    ${contact.message ? `<h3>Message:</h3><p>${escapeHtml(contact.message)}</p>` : ""}
    <p style="color:#888;font-size:12px;margin-top:16px;">Sent from Bodhi Technology Lab contact form</p>
  `.trim();

  const { error } = await resend.emails.send({
    from: "Bodhi Technology Lab <notifications@bodhilab.io>",
    to: recipients,
    replyTo: contact.email,
    subject: `New Contact: ${contact.firstName} ${contact.lastName} — ${contact.organizationName || "Individual"}`,
    html,
  });

  if (error) {
    console.error("Resend contact email error:", error);
    throw error;
  }
}

// ─── High-Level Orchestrators ───

export async function notifyNewLead(lead: Lead): Promise<void> {
  await sendLeadEmailNotification(lead);
}

export async function notifyNewContact(contact: ContactData): Promise<void> {
  await sendContactEmailNotification(contact);
}

export function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}
