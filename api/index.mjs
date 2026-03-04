var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit2 from "express-rate-limit";
import { toNodeHandler } from "better-auth/node";
import { fromNodeHeaders as fromNodeHeaders2 } from "better-auth/node";
import { autumnHandler } from "autumn-js/express";

// server/lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization as organization2 } from "better-auth/plugins";

// server/db.ts
import { neon, neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle as drizzleHttp } from "drizzle-orm/neon-http";
import { drizzle as drizzlePool } from "drizzle-orm/neon-serverless";
import ws from "ws";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  account: () => account,
  contactSchema: () => contactSchema,
  giacNgoSyncLog: () => giacNgoSyncLog,
  insertLeadSchema: () => insertLeadSchema,
  invitation: () => invitation,
  leads: () => leads,
  member: () => member,
  organization: () => organization,
  session: () => session,
  subscriptions: () => subscriptions,
  updateLeadSchema: () => updateLeadSchema,
  user: () => user,
  verification: () => verification
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, index, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  role: text("role").notNull().default("temple_admin"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
});
var session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" })
  },
  (table) => [index("session_userId_idx").on(table.userId)]
);
var account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [index("account_userId_idx").on(table.userId)]
);
var verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
);
var organization = pgTable("organization", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  logo: text("logo"),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var member = pgTable(
  "member",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id").notNull().references(() => organization.id, { onDelete: "cascade" }),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    role: text("role").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
  },
  (table) => [
    index("member_organizationId_idx").on(table.organizationId),
    index("member_userId_idx").on(table.userId)
  ]
);
var invitation = pgTable(
  "invitation",
  {
    id: text("id").primaryKey(),
    organizationId: text("organization_id").notNull().references(() => organization.id, { onDelete: "cascade" }),
    email: text("email").notNull(),
    role: text("role"),
    status: text("status").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    inviterId: text("inviter_id").notNull().references(() => user.id, { onDelete: "cascade" })
  },
  (table) => [index("invitation_organizationId_idx").on(table.organizationId)]
);
var leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  interests: text("interests"),
  package: text("package").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  // ─── Billing columns ───
  paymentStatus: text("payment_status").default("unpaid"),
  planTier: text("plan_tier"),
  monthlyAmount: integer("monthly_amount"),
  nextBillingDate: timestamp("next_billing_date"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  notes: text("notes")
});
var subscriptions = pgTable(
  "subscriptions",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    productId: text("product_id").notNull(),
    // basic, standard, premium
    productName: text("product_name"),
    status: text("status").notNull().default("active"),
    // active, scheduled, cancelled, expired, past_due
    scenario: text("scenario"),
    // new, upgrade, downgrade, renew, cancel, expired, past_due, scheduled
    currentPeriodStart: timestamp("current_period_start"),
    currentPeriodEnd: timestamp("current_period_end"),
    cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
    scheduledProductId: text("scheduled_product_id"),
    // For scheduled downgrades
    scheduledProductName: text("scheduled_product_name"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().$onUpdate(() => /* @__PURE__ */ new Date()).notNull()
  },
  (table) => [
    index("subscriptions_userId_idx").on(table.userId),
    index("subscriptions_productId_idx").on(table.productId)
  ]
);
var insertLeadSchema = createInsertSchema(leads).omit({
  id: true,
  createdAt: true,
  paymentStatus: true,
  planTier: true,
  monthlyAmount: true,
  nextBillingDate: true,
  stripeCustomerId: true,
  stripeSubscriptionId: true,
  notes: true
});
var updateLeadSchema = z.object({
  status: z.enum(["new", "contacted", "qualified", "converted", "lost"]).optional(),
  paymentStatus: z.enum(["unpaid", "active", "overdue", "cancelled"]).optional(),
  planTier: z.enum(["basic", "standard", "premium"]).optional(),
  monthlyAmount: z.number().int().positive().optional(),
  nextBillingDate: z.string().optional(),
  stripeCustomerId: z.string().optional(),
  stripeSubscriptionId: z.string().optional(),
  notes: z.string().optional()
});
var contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(255),
  lastName: z.string().min(1, "Last name is required").max(255),
  email: z.email("Invalid email address").max(255),
  role: z.string().max(255).optional().default(""),
  organizationName: z.string().max(255).optional().default(""),
  organizationType: z.string().max(100).optional().default(""),
  communitySize: z.string().max(50).optional().default(""),
  message: z.string().max(5e3).optional().default("")
});
var giacNgoSyncLog = pgTable(
  "giac_ngo_sync_log",
  {
    id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
    userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
    eventType: text("event_type").notNull(),
    payload: text("payload").notNull(),
    responseOk: boolean("response_ok").notNull(),
    responseStatus: integer("response_status"),
    errorMessage: text("error_message"),
    createdAt: timestamp("created_at").defaultNow().notNull()
  },
  (table) => [
    index("giac_ngo_sync_log_userId_idx").on(table.userId),
    index("giac_ngo_sync_log_createdAt_idx").on(table.createdAt)
  ]
);

// server/db.ts
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Provide a Neon PostgreSQL connection string."
  );
}
var sql2 = neon(process.env.DATABASE_URL);
var db = drizzleHttp(sql2, { schema: schema_exports });
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var poolDb = drizzlePool(pool, { schema: schema_exports });

// server/lib/auth.ts
import { Resend as Resend2 } from "resend";

// server/services/notifications.ts
import { Resend } from "resend";
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
var resendClient = null;
function getResendClient() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}
function getAdminEmails() {
  const raw = process.env.ADMIN_EMAIL;
  if (!raw) return [];
  return raw.split(",").map((e) => e.trim()).filter(Boolean);
}
async function sendLeadEmailNotification(lead) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("Resend not configured \u2014 skipping lead email notification");
    return;
  }
  const recipients = getAdminEmails();
  if (recipients.length === 0) {
    console.warn("ADMIN_EMAIL not set \u2014 skipping lead email notification");
    return;
  }
  const html = `
    <h2>\u{1F514} New Lead Submission</h2>
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
    subject: `New Lead: ${lead.name} \u2014 ${lead.package}`,
    html
  });
  if (error) {
    console.error("Resend lead email error:", error);
  }
}
async function sendContactEmailNotification(contact) {
  const resend = getResendClient();
  if (!resend) throw new Error("Resend not configured");
  const recipients = getAdminEmails();
  if (recipients.length === 0) throw new Error("ADMIN_EMAIL not set");
  const html = `
    <h2>\u{1F4EC} New Contact Form Submission</h2>
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
    subject: `New Contact: ${contact.firstName} ${contact.lastName} \u2014 ${contact.organizationName || "Individual"}`,
    html
  });
  if (error) {
    console.error("Resend contact email error:", error);
    throw error;
  }
}
async function sendWelcomeEmail(user2) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("Resend not configured \u2014 skipping welcome email");
    return;
  }
  const dashboardUrl = process.env.BETTER_AUTH_URL ? `${process.env.BETTER_AUTH_URL}/dashboard` : "https://www.bodhilab.io/dashboard";
  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #991b1b;">Welcome to Bodhi Technology Lab!</h2>
      <p>Hello ${escapeHtml(user2.name) || "there"},</p>
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
    to: user2.email,
    subject: "Welcome to Bodhi Technology Lab!",
    html
  });
  if (error) {
    console.error("Resend welcome email error:", error);
  }
}
async function sendInvitationEmail(params) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("Resend not configured \u2014 skipping invitation email");
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

      <p style="color: #b91c1c; font-weight: bold; font-size: 14px;">\u23F0 This link will expire in 72 hours.</p>

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
    html
  });
  if (error) {
    console.error("Resend invitation email error:", error);
    throw error;
  }
}
async function notifyNewLead(lead) {
  await sendLeadEmailNotification(lead);
}
async function notifyNewContact(contact) {
  await sendContactEmailNotification(contact);
}
async function notifyWelcome(user2) {
  await sendWelcomeEmail(user2);
}
async function notifyInvitation(params) {
  await sendInvitationEmail(params);
}
function isResendConfigured() {
  return !!process.env.RESEND_API_KEY;
}

// server/lib/auth.ts
if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error(
    "BETTER_AUTH_SECRET is not set. Generate one with: openssl rand -base64 32"
  );
}
var baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.bodhilab.io";
console.log("[Auth] Initializing Better Auth configuration...");
console.log("[Auth] RESEND_API_KEY configured:", !!process.env.RESEND_API_KEY);
console.log("[Auth] NODE_ENV:", process.env.NODE_ENV);
console.log("[Auth] Base URL:", baseURL);
var resendClient2 = null;
function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resendClient2) {
    resendClient2 = new Resend2(process.env.RESEND_API_KEY);
  }
  return resendClient2;
}
var auth = betterAuth({
  database: drizzleAdapter(poolDb, { provider: "pg", schema: schema_exports }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL,
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:5000",
    "http://localhost:5173",
    "https://bodhilab.io",
    "https://www.bodhilab.io"
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    // Require email verification before sign-in
    minPasswordLength: 8,
    autoSignIn: false,
    // Don't auto sign in, require verification first
    sendResetPassword: async ({ user: user2, url }) => {
      console.log("[Auth] sendResetPassword triggered for:", user2.email);
      const resend = getResend();
      if (!resend) {
        console.error("Resend not configured - cannot send password reset email");
        return;
      }
      void resend.emails.send({
        from: "Bodhi Technology Lab <auth@mail.bodhilab.io>",
        to: user2.email,
        subject: "Reset Your Password - Bodhi Technology Lab",
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #991b1b;">Reset Your Password</h2>
            <p>Hello ${user2.name || "there"},</p>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${url}" style="background-color: #991b1b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Reset Password</a>
            </p>
            <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this email. This link will expire in 1 hour.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p style="color: #888; font-size: 12px;">Bodhi Technology Lab - Mindful Technology for Spiritual Communities</p>
          </div>
        `
      });
    }
  },
  emailVerification: {
    sendOnSignUp: false,
    // Disabled - we send manually from client after sign-up
    sendOnSignIn: true,
    // Send verification email when unverified user tries to sign in
    autoSignInAfterVerification: true,
    expiresIn: 86400,
    // 24 hours for verification tokens
    sendVerificationEmail: async ({ user: user2, url }) => {
      console.log("[Auth] ========================================");
      console.log("[Auth] sendVerificationEmail TRIGGERED!");
      console.log("[Auth] User email:", user2.email);
      console.log("[Auth] User name:", user2.name);
      console.log("[Auth] Verification URL:", url);
      console.log("[Auth] ========================================");
      const resend = getResend();
      if (!resend) {
        console.error("[Auth] Resend not configured - cannot send verification email");
        return;
      }
      console.log(`[Email] Sending verification email to ${user2.email}`);
      console.log(`[Email] Verification URL: ${url}`);
      void (async () => {
        try {
          const { data, error } = await resend.emails.send({
            from: "Bodhi Technology Lab <auth@mail.bodhilab.io>",
            to: user2.email,
            subject: "Verify Your Email - Bodhi Technology Lab",
            html: `
              <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #991b1b;">Welcome to Bodhi Technology Lab!</h2>
                <p>Hello ${user2.name || "there"},</p>
                <p>Thank you for creating an account. Please verify your email address by clicking the button below:</p>
                <p style="text-align: center; margin: 30px 0;">
                  <a href="${url}" style="background-color: #991b1b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Verify Email</a>
                </p>
                <p style="color: #666; font-size: 14px;">If you didn't create this account, you can safely ignore this email.</p>
                <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
                <p style="color: #888; font-size: 12px;">Bodhi Technology Lab - Mindful Technology for Spiritual Communities</p>
              </div>
            `
          });
          if (error) {
            console.error("[Email] Failed to send verification email:", error);
          } else {
            console.log("[Email] Verification email sent successfully:", data?.id);
          }
        } catch (err) {
          console.error("[Email] Exception sending verification email:", err);
        }
      })();
    },
    async afterEmailVerification(user2) {
      const userWithRole = user2;
      if (userWithRole.role === "temple_admin") {
        try {
          await notifyWelcome({ name: user2.name, email: user2.email });
        } catch (error) {
          console.error("Failed to send welcome email to temple admin:", error);
        }
      }
    }
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "temple_admin",
        input: false
      }
    }
  },
  plugins: [organization2()]
});

// server/routes.ts
import { createServer } from "http";
import rateLimit from "express-rate-limit";

// server/storage.ts
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";
var DatabaseStorage = class {
  async createLead(insertLead) {
    const id = randomUUID();
    const now = /* @__PURE__ */ new Date();
    await db.insert(leads).values({
      id,
      name: insertLead.name,
      phone: insertLead.phone,
      email: insertLead.email,
      interests: insertLead.interests || null,
      package: insertLead.package,
      status: insertLead.status || "new",
      createdAt: now
    });
    const result = await db.select().from(leads).where(eq(leads.id, id));
    return result[0];
  }
  async getLeads() {
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }
  async updateLeadStatus(id, status) {
    const result = await db.update(leads).set({ status }).where(eq(leads.id, id)).returning();
    return result[0];
  }
  async updateLead(id, data) {
    const result = await db.update(leads).set(data).where(eq(leads.id, id)).returning();
    return result[0];
  }
  // ─── Subscription Methods ───
  async getSubscriptionByUserId(userId) {
    const result = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId));
    return result[0];
  }
  async upsertSubscription(data) {
    const existing = await this.getSubscriptionByUserId(data.userId);
    if (existing) {
      const result = await db.update(subscriptions).set({
        ...data,
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq(subscriptions.userId, data.userId)).returning();
      return result[0];
    } else {
      const id = randomUUID();
      await db.insert(subscriptions).values({
        id,
        ...data,
        createdAt: /* @__PURE__ */ new Date(),
        updatedAt: /* @__PURE__ */ new Date()
      });
      const result = await db.select().from(subscriptions).where(eq(subscriptions.id, id));
      return result[0];
    }
  }
  async updateSubscription(userId, data) {
    const result = await db.update(subscriptions).set({ ...data, updatedAt: /* @__PURE__ */ new Date() }).where(eq(subscriptions.userId, userId)).returning();
    return result[0];
  }
};
var storage = new DatabaseStorage();

// server/routes.ts
import { Autumn } from "autumn-js";

// server/middleware/auth.ts
import { fromNodeHeaders } from "better-auth/node";
async function requireAuth(req, res, next) {
  const session2 = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  });
  if (!session2) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }
  req.session = session2;
  next();
}
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.session?.user?.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ success: false, error: "Forbidden" });
    }
    next();
  };
}

// server/routes.ts
import { eq as eq3 } from "drizzle-orm";
import crypto from "crypto";
import { Webhook } from "svix";

// server/services/giac-ngo-sync.ts
import { eq as eq2 } from "drizzle-orm";
var STATUS_MAP = {
  new: "active",
  renew: "active",
  upgrade: "active",
  downgrade: "active",
  scheduled: "active",
  cancel: "unsubscribe",
  expired: "unsubscribe",
  past_due: "past_due"
};
function mapScenarioToStatus(scenario) {
  return STATUS_MAP[scenario] ?? "active";
}
function mapScenarioToPlan(_scenario, productId) {
  return productId;
}
async function syncToGiacNgo(params) {
  try {
    const apiUrl = process.env.GIAC_NGO_API_URL;
    const apiKey = process.env.GIAC_NGO_API_KEY;
    if (!apiUrl || !apiKey) {
      console.warn("Gi\xE1c Ng\u1ED9 sync skipped: missing configuration");
      return;
    }
    const [foundUser] = await db.select({ email: user.email }).from(user).where(eq2(user.id, params.userId)).limit(1);
    if (!foundUser) {
      console.warn(`[Gi\xE1c Ng\u1ED9 Sync] User not found: ${params.userId}`);
      return;
    }
    const payload = {
      user_id: params.userId,
      email: foundUser.email,
      plan: mapScenarioToPlan(params.scenario, params.productId),
      status: mapScenarioToStatus(params.scenario)
    };
    const payloadJson = JSON.stringify(payload);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1e4);
    let responseOk = false;
    let responseStatus = null;
    let errorMessage = null;
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: payloadJson,
        signal: controller.signal
      });
      responseOk = response.ok;
      responseStatus = response.status;
      if (!response.ok) {
        const body = await response.text().catch(() => "");
        errorMessage = `HTTP ${response.status}: ${body}`;
        console.error(`[Gi\xE1c Ng\u1ED9 Sync] API error: ${errorMessage}`);
      }
    } catch (err) {
      responseOk = false;
      if (err instanceof Error && err.name === "AbortError") {
        errorMessage = "Request timeout (10s)";
        console.error("[Gi\xE1c Ng\u1ED9 Sync] Request timeout (10s)");
      } else {
        errorMessage = err instanceof Error ? err.message : String(err);
        console.error(`[Gi\xE1c Ng\u1ED9 Sync] Network error: ${errorMessage}`);
      }
    } finally {
      clearTimeout(timeoutId);
    }
    try {
      await db.insert(giacNgoSyncLog).values({
        userId: params.userId,
        eventType: params.scenario,
        payload: payloadJson,
        responseOk,
        responseStatus,
        errorMessage
      });
    } catch (dbErr) {
      console.error(
        "[Gi\xE1c Ng\u1ED9 Sync] Failed to write sync log:",
        dbErr instanceof Error ? dbErr.message : String(dbErr)
      );
    }
  } catch (err) {
    console.error(
      "[Gi\xE1c Ng\u1ED9 Sync] Unexpected error:",
      err instanceof Error ? err.message : String(err)
    );
  }
}

// server/routes.ts
async function verifyTurnstileToken(token) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("TURNSTILE_SECRET_KEY not set \u2014 skipping bot check");
    return true;
  }
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token })
    });
    const data = await res.json();
    return data.success;
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return false;
  }
}
var verificationRateLimits = /* @__PURE__ */ new Map();
var RATE_LIMIT_MAX_REQUESTS = 3;
var RATE_LIMIT_WINDOW_MS = 15 * 60 * 1e3;
function checkRateLimit(email) {
  const normalizedEmail = email.toLowerCase().trim();
  const now = /* @__PURE__ */ new Date();
  const entry = verificationRateLimits.get(normalizedEmail);
  if (!entry || entry.resetAt <= now) {
    verificationRateLimits.set(normalizedEmail, {
      count: 1,
      resetAt: new Date(now.getTime() + RATE_LIMIT_WINDOW_MS)
    });
    return { allowed: true };
  }
  if (entry.count < RATE_LIMIT_MAX_REQUESTS) {
    entry.count += 1;
    return { allowed: true };
  }
  const retryAfterMs = entry.resetAt.getTime() - now.getTime();
  const retryAfterSeconds = Math.ceil(retryAfterMs / 1e3);
  return { allowed: false, retryAfter: retryAfterSeconds };
}
function registerRoutes(app2) {
  const formLimiter2 = rateLimit({
    windowMs: 15 * 60 * 1e3,
    // 15 minutes
    max: 5,
    // 5 submissions per 15 min per IP
    message: { success: false, error: "Too many submissions. Please try again later." },
    standardHeaders: true,
    legacyHeaders: false
  });
  const leadLimiter = rateLimit({
    windowMs: 15 * 60 * 1e3,
    max: 5,
    message: { success: false, error: "Too many requests. Please try again later." },
    standardHeaders: true,
    legacyHeaders: false
  });
  if (process.env.NODE_ENV === "development") {
    app2.post("/api/test-email", async (req, res) => {
      try {
        const { email } = req.body;
        if (!email) {
          return res.status(400).json({ success: false, message: "Email required" });
        }
        const resend = new (await import("resend")).Resend(process.env.RESEND_API_KEY);
        const { data, error } = await resend.emails.send({
          from: "Bodhi Technology Lab <auth@mail.bodhilab.io>",
          to: email,
          subject: "Test Email - Bodhi Technology Lab",
          html: "<p>This is a test email to verify Resend is working.</p>"
        });
        if (error) {
          console.error("[Test Email] Error:", error);
          return res.status(500).json({ success: false, error });
        }
        console.log("[Test Email] Sent successfully:", data?.id);
        res.json({ success: true, id: data?.id });
      } catch (err) {
        console.error("[Test Email] Exception:", err);
        res.status(500).json({ success: false, error: err.message });
      }
    });
  }
  app2.post("/api/contact", formLimiter2, async (req, res) => {
    try {
      const result = contactSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ success: false, error: "Invalid contact data", details: result.error.issues });
      }
      const contact = result.data;
      const cfToken = req.body.cfTurnstileToken;
      if (process.env.TURNSTILE_SECRET_KEY) {
        if (!cfToken) {
          return res.status(400).json({ success: false, error: "Captcha verification required" });
        }
        const valid = await verifyTurnstileToken(cfToken);
        if (!valid) {
          return res.status(403).json({ success: false, error: "Captcha verification failed" });
        }
      }
      const leadData = {
        name: [contact.firstName, contact.lastName].filter(Boolean).join(" "),
        phone: "",
        email: contact.email,
        package: "contact-form",
        status: "new",
        interests: [
          contact.organizationName && `Organization: ${contact.organizationName}`,
          contact.role && `Role: ${contact.role}`,
          contact.organizationType && `Type: ${contact.organizationType}`,
          contact.communitySize && `Community size: ${contact.communitySize}`,
          contact.message && `Message: ${contact.message}`
        ].filter(Boolean).join("\n") || null
      };
      await storage.createLead(leadData);
      if (isResendConfigured()) {
        try {
          await notifyNewContact(contact);
        } catch (emailErr) {
          console.error("[Contact] Email notification failed (lead already saved):", emailErr);
        }
      }
      res.json({
        success: true,
        message: "Your message has been sent successfully"
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({ success: false, error: "Failed to send message. Please try again later." });
    }
  });
  app2.post("/api/auth/resend-verification", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || typeof email !== "string") {
        return res.status(400).json({
          success: false,
          message: "Email address is required"
        });
      }
      const normalizedEmail = email.toLowerCase().trim();
      const rateLimitResult = checkRateLimit(normalizedEmail);
      if (!rateLimitResult.allowed) {
        return res.status(429).json({
          success: false,
          message: `Too many requests. Please wait ${Math.ceil(rateLimitResult.retryAfter / 60)} minutes before requesting another email.`,
          retryAfter: rateLimitResult.retryAfter
        });
      }
      const result = await auth.api.sendVerificationEmail({
        body: {
          email: normalizedEmail,
          callbackURL: "/login?verified=true"
        }
      });
      if (!result) {
        return res.status(500).json({
          success: false,
          message: "Failed to send verification email. Please try again later."
        });
      }
      res.json({
        success: true,
        message: "Verification email sent. Please check your inbox."
      });
    } catch (error) {
      console.error("Error sending verification email:", error);
      if (error.message?.includes("User not found") || error.status === 404) {
        return res.status(400).json({
          success: false,
          message: "No account found with this email address."
        });
      }
      if (error.message?.includes("already verified") || error.status === 400) {
        return res.status(400).json({
          success: false,
          message: "This email is already verified. You can sign in."
        });
      }
      res.status(500).json({
        success: false,
        message: "Failed to send verification email. Please try again later."
      });
    }
  });
  app2.post("/api/leads", leadLimiter, async (req, res) => {
    try {
      const result = insertLeadSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({ success: false, error: "Invalid lead data", details: result.error.issues });
      }
      const cfToken = req.body.cfTurnstileToken;
      if (process.env.TURNSTILE_SECRET_KEY) {
        if (!cfToken) {
          return res.status(400).json({ success: false, error: "Captcha verification required" });
        }
        const valid = await verifyTurnstileToken(cfToken);
        if (!valid) {
          return res.status(403).json({ success: false, error: "Captcha verification failed" });
        }
      }
      const lead = await storage.createLead(result.data);
      notifyNewLead(lead).catch(
        (err) => console.error("Lead notification error:", err)
      );
      res.json({
        success: true,
        message: "Your request has been received"
      });
    } catch (error) {
      console.error("Error creating lead:", error);
      res.status(500).json({ success: false, error: "Failed to submit request. Please try again later." });
    }
  });
  app2.post("/api/webhooks/autumn", async (req, res) => {
    try {
      const webhookSecret = process.env.AUTUMN_WEBHOOK_SECRET;
      if (webhookSecret) {
        const wh = new Webhook(webhookSecret);
        try {
          wh.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
          });
        } catch (err) {
          console.error("[Autumn Webhook] Signature verification failed:", err);
          return res.status(401).json({ error: "Invalid webhook signature" });
        }
      }
      const event = req.body;
      console.log("[Autumn Webhook]", event.type, event.data?.scenario);
      if (event.type === "customer.products.updated") {
        const { scenario, customer, updated_product } = event.data;
        const userId = customer?.id;
        if (!userId || !updated_product) {
          return res.status(200).json({ received: true });
        }
        let status = "active";
        let cancelAtPeriodEnd = false;
        let scheduledProductId = null;
        let scheduledProductName = null;
        switch (scenario) {
          case "new":
          case "upgrade":
          case "renew":
            status = "active";
            break;
          case "downgrade":
          case "scheduled":
            status = "active";
            scheduledProductId = updated_product.id;
            scheduledProductName = updated_product.name;
            break;
          case "cancel":
            status = "cancelled";
            cancelAtPeriodEnd = true;
            break;
          case "expired":
            status = "expired";
            break;
          case "past_due":
            status = "past_due";
            break;
        }
        const activeSubscription = customer.subscriptions?.find(
          (s) => s.status === "active" || s.status === "scheduled"
        );
        await storage.upsertSubscription({
          userId,
          productId: scenario === "scheduled" || scenario === "downgrade" ? activeSubscription?.product_id || updated_product.id : updated_product.id,
          productName: scenario === "scheduled" || scenario === "downgrade" ? activeSubscription?.product_name || updated_product.name : updated_product.name,
          status,
          scenario,
          currentPeriodStart: activeSubscription?.current_period_start ? new Date(activeSubscription.current_period_start) : null,
          currentPeriodEnd: activeSubscription?.current_period_end ? new Date(activeSubscription.current_period_end) : null,
          cancelAtPeriodEnd,
          scheduledProductId,
          scheduledProductName
        });
        syncToGiacNgo({ userId, scenario, productId: updated_product.id }).catch((err) => console.error("[Gi\xE1c Ng\u1ED9 Sync] Unexpected error:", err));
        console.log(`[Autumn Webhook] Updated subscription for user ${userId}: ${scenario}`);
      }
      res.status(200).json({ received: true });
    } catch (error) {
      console.error("[Autumn Webhook Error]", error);
      res.status(200).json({ received: true, error: error.message });
    }
  });
  app2.get("/api/leads", requireAuth, requireRole("bodhi_admin"), async (req, res) => {
    try {
      const leads2 = await storage.getLeads();
      res.json({ success: true, data: leads2 });
    } catch (error) {
      console.error("Error getting leads:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });
  app2.patch("/api/leads/:id", requireAuth, requireRole("bodhi_admin"), async (req, res) => {
    try {
      const result = updateLeadSchema.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          success: false,
          error: "Invalid update data",
          details: result.error.issues
        });
      }
      const updateData = {};
      const data = result.data;
      if (data.status !== void 0) updateData.status = data.status;
      if (data.paymentStatus !== void 0) updateData.paymentStatus = data.paymentStatus;
      if (data.planTier !== void 0) updateData.planTier = data.planTier;
      if (data.monthlyAmount !== void 0) updateData.monthlyAmount = data.monthlyAmount;
      if (data.nextBillingDate !== void 0) updateData.nextBillingDate = new Date(data.nextBillingDate);
      if (data.stripeCustomerId !== void 0) updateData.stripeCustomerId = data.stripeCustomerId;
      if (data.stripeSubscriptionId !== void 0) updateData.stripeSubscriptionId = data.stripeSubscriptionId;
      if (data.notes !== void 0) updateData.notes = data.notes;
      const lead = await storage.updateLead(req.params.id, updateData);
      if (!lead) {
        return res.status(404).json({ success: false, error: "Lead not found" });
      }
      res.json({ success: true, data: lead });
    } catch (error) {
      console.error("Error updating lead:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });
  app2.get("/api/temple/subscription", requireAuth, requireRole("temple_admin"), async (req, res) => {
    try {
      const userId = req.session.user.id;
      const localSub = await storage.getSubscriptionByUserId(userId);
      if (localSub && localSub.status !== "expired") {
        return res.json({
          success: true,
          data: {
            productId: localSub.productId,
            productName: localSub.productName,
            status: localSub.status,
            scenario: localSub.scenario,
            renewalDate: localSub.currentPeriodEnd?.toISOString() || null,
            cancelAtPeriodEnd: localSub.cancelAtPeriodEnd,
            scheduledProductId: localSub.scheduledProductId,
            scheduledProductName: localSub.scheduledProductName
          }
        });
      }
      const autumn = new Autumn({ secretKey: process.env.AUTUMN_SECRET_KEY });
      const { data: customer } = await autumn.customers.get(userId);
      const activeProduct = customer?.products?.find(
        (p) => p.status === "active"
      ) || null;
      res.json({
        success: true,
        data: {
          productId: activeProduct?.id || null,
          productName: activeProduct?.name || null,
          renewalDate: activeProduct?.current_period_end ? new Date(activeProduct.current_period_end).toISOString() : null,
          status: activeProduct?.status || null,
          cancelAtPeriodEnd: false,
          scheduledProductId: null,
          scheduledProductName: null
        }
      });
    } catch (error) {
      console.error("Error fetching subscription:", error);
      res.status(500).json({ success: false, error: "Failed to fetch subscription info" });
    }
  });
  app2.post("/api/admin/invite-temple-admin", requireAuth, requireRole("bodhi_admin"), async (req, res) => {
    try {
      const { name, email } = req.body;
      if (!name || typeof name !== "string" || name.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: "Name is required"
        });
      }
      if (!email || typeof email !== "string") {
        return res.status(400).json({
          success: false,
          message: "Email is required"
        });
      }
      const normalizedEmail = email.toLowerCase().trim();
      const trimmedName = name.trim();
      const existingUser = await db.select().from(user).where(eq3(user.email, normalizedEmail)).limit(1);
      if (existingUser.length > 0) {
        return res.status(409).json({
          success: false,
          message: "This email is already registered"
        });
      }
      const tempPassword = crypto.randomBytes(32).toString("hex");
      const signUpResult = await auth.api.signUpEmail({
        body: {
          email: normalizedEmail,
          password: tempPassword,
          name: trimmedName
        }
      });
      if (!signUpResult?.user) {
        return res.status(500).json({
          success: false,
          message: "Failed to create user account"
        });
      }
      const newUserId = signUpResult.user.id;
      await db.update(user).set({ role: "temple_admin" }).where(eq3(user.id, newUserId));
      const resetToken = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1e3);
      await db.insert(verification).values({
        id: crypto.randomUUID(),
        identifier: normalizedEmail,
        value: resetToken,
        expiresAt
      });
      const baseUrl = process.env.BETTER_AUTH_URL || "https://www.bodhilab.io";
      const setPasswordUrl = `${baseUrl}/reset-password?token=${resetToken}`;
      const inviterName = req.session.user.name || "Bodhi Technology Lab";
      await notifyInvitation({
        email: normalizedEmail,
        name: trimmedName,
        inviterName,
        setPasswordUrl
      });
      res.json({
        success: true,
        message: "Invitation sent successfully",
        userId: newUserId
      });
    } catch (error) {
      console.error("Error inviting temple admin:", error);
      if (error.message?.includes("already exists") || error.code === "23505") {
        return res.status(409).json({
          success: false,
          message: "This email is already registered"
        });
      }
      res.status(500).json({
        success: false,
        message: "Failed to send invitation. Please try again later."
      });
    }
  });
}
function createAppServer(app2) {
  return createServer(app2);
}

// server/index.ts
async function getViteHelpers() {
  const modulePath = "./vite";
  return import(
    /* @vite-ignore */
    modulePath
  );
}
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
var app = express();
app.use(helmet({
  contentSecurityPolicy: false
  // Vite dev server needs inline scripts
}));
var allowedOrigins = [
  "https://bodhilab.io",
  "https://www.bodhilab.io",
  process.env.NODE_ENV === "development" ? "http://localhost:5173" : "",
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "",
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : ""
].filter(Boolean);
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
var formLimiter = rateLimit2({
  windowMs: 15 * 60 * 1e3,
  max: 10,
  // 10 form submissions per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many submissions, please try again later." }
});
app.use("/api/contact", formLimiter);
app.post("/api/leads", formLimiter);
app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json({
  limit: "100kb",
  // Prevent oversized payloads
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false, limit: "100kb" }));
app.use(
  "/api/autumn",
  autumnHandler({
    identify: async (req) => {
      const session2 = await auth.api.getSession({
        headers: fromNodeHeaders2(req.headers)
      });
      if (!session2) {
        return { customerId: void 0 };
      }
      return {
        customerId: session2.user.id,
        customerData: {
          name: session2.user.name,
          email: session2.user.email
        }
      };
    }
  })
);
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
var isInitialized = false;
var initializationPromise = null;
async function initializeApp() {
  if (isInitialized) return;
  if (initializationPromise) return initializationPromise;
  initializationPromise = (async () => {
    registerRoutes(app);
    app.use((err, _req, res, _next) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      console.error("Unhandled error:", err);
      if (!res.headersSent) {
        res.status(status).json({ message: status >= 500 ? "Internal Server Error" : message });
      }
    });
    if (process.env.VERCEL) {
      log("Running in Vercel serverless mode", "express");
    } else if (app.get("env") === "development") {
      const { setupVite } = await getViteHelpers();
      const server = createAppServer(app);
      await setupVite(app, server);
      const port = parseInt(process.env.PORT || "5000", 10);
      server.listen(port, "0.0.0.0", () => {
        log(`serving on port ${port}`);
      });
    } else {
      const { serveStatic } = await getViteHelpers();
      serveStatic(app);
      const server = createAppServer(app);
      const port = parseInt(process.env.PORT || "5000", 10);
      server.listen(port, "0.0.0.0", () => {
        log(`serving on port ${port}`);
      });
    }
    isInitialized = true;
  })();
  return initializationPromise;
}
async function handler(req, res) {
  await initializeApp();
  return new Promise((resolve, reject) => {
    app(req, res, (err) => {
      if (err) reject(err);
      else resolve(void 0);
    });
  });
}
if (!process.env.VERCEL) {
  initializeApp();
}
var server_default = handler;
export {
  server_default as default
};
