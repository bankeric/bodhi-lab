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
    from: "Bodhi Technology Lab <notifications@mail.bodhilab.io>",
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
    from: "Bodhi Technology Lab <notifications@mail.bodhilab.io>",
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

/**
 * Send welcome email to new temple admins after email verification
 * Uses platform design system (serif font, #991b1b accent color)
 */
async function sendWelcomeEmail(user: { name: string; email: string }): Promise<void> {
  const resend = getResendClient();
  if (!resend) {
    console.warn("Resend not configured — skipping welcome email");
    return;
  }

  const dashboardUrl = process.env.BETTER_AUTH_URL
    ? `${process.env.BETTER_AUTH_URL}/dashboard`
    : "https://www.bodhilab.io/dashboard";

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #991b1b;">Welcome to Bodhi Technology Lab!</h2>
      <p>Hello ${escapeHtml(user.name) || "there"},</p>
      <p>Thank you for joining Bodhi Technology Lab! Your email has been verified and your account is now active.</p>

      <h3 style="color: #991b1b; margin-top: 24px;">Getting Started</h3>
      <p>As a temple administrator, you can now:</p>
      <ul style="color: #333; line-height: 1.8;">
        <li>Access your personalized dashboard to manage your temple</li>
        <li>Configure your temple's profile and settings</li>
        <li>Connect with your community through our platform</li>
      </ul>

      <p style="text-align: center; margin: 30px 0;">
        <a href="${dashboardUrl}" style="background-color: #991b1b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Go to Dashboard</a>
      </p>

      <p style="color: #666; font-size: 14px;">If you have any questions, feel free to reach out to our support team. We're here to help you make the most of your experience.</p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
      <p style="color: #888; font-size: 12px;">Bodhi Technology Lab - Mindful Technology for Spiritual Communities</p>
    </div>
  `.trim();

  const { error } = await resend.emails.send({
    from: "Bodhi Technology Lab <notifications@mail.bodhilab.io>",
    to: user.email,
    subject: "Welcome to Bodhi Technology Lab!",
    html,
  });

  if (error) {
    console.error("Resend welcome email error:", error);
    // Don't throw - welcome email failure should not block user access (Requirement 3.4)
  }
}



/**
 * Send invitation email to new temple admins invited by bodhi admins
 * Uses platform design system (serif font, #991b1b accent color)
 * Includes inviter context and password-set link with 72-hour expiration
 */
async function sendInvitationEmail(params: {
  email: string;
  name: string;
  inviterName: string;
  setPasswordUrl: string;
}): Promise<void> {
  const resend = getResendClient();
  if (!resend) {
    console.warn("Resend not configured — skipping invitation email");
    throw new Error("Email service not configured");
  }

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #991b1b;">You've Been Invited to Bodhi Technology Lab!</h2>
      <p>Hello ${escapeHtml(params.name) || "there"},</p>
      <p>You've been invited by <strong>${escapeHtml(params.inviterName)}</strong> to join Bodhi Technology Lab as a temple administrator.</p>

      <h3 style="color: #991b1b; margin-top: 24px;">About Bodhi Technology Lab</h3>
      <p>Bodhi Technology Lab provides mindful technology solutions for spiritual communities. Our platform helps temples and religious organizations connect with their communities, manage operations, and grow their reach.</p>

      <h3 style="color: #991b1b; margin-top: 24px;">Set Up Your Account</h3>
      <p>To get started, please set your password by clicking the button below:</p>

      <p style="text-align: center; margin: 30px 0;">
        <a href="${escapeHtml(params.setPasswordUrl)}" style="background-color: #991b1b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Set Your Password</a>
      </p>

      <p style="color: #b91c1c; font-weight: bold; font-size: 14px;">⏰ This link will expire in 72 hours.</p>

      <p style="color: #666; font-size: 14px; margin-top: 20px;">Once you've set your password, you'll be able to sign in and access your temple dashboard.</p>

      <p style="color: #666; font-size: 14px;">If you didn't expect this invitation or have any questions, please contact our support team.</p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
      <p style="color: #888; font-size: 12px;">Bodhi Technology Lab - Mindful Technology for Spiritual Communities</p>
    </div>
  `.trim();

  const { error } = await resend.emails.send({
    from: "Bodhi Technology Lab <notifications@mail.bodhilab.io>",
    to: params.email,
    subject: `${escapeHtml(params.inviterName)} invited you to Bodhi Technology Lab`,
    html,
  });

  if (error) {
    console.error("Resend invitation email error:", error);
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

export async function notifyWelcome(user: { name: string; email: string }): Promise<void> {
  await sendWelcomeEmail(user);
}

export async function notifyInvitation(params: {
  email: string;
  name: string;
  inviterName: string;
  setPasswordUrl: string;
}): Promise<void> {
  await sendInvitationEmail(params);
}

export function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}
