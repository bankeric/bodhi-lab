import type { Express } from "express";
import { createServer, type Server } from "http";
import rateLimit from "express-rate-limit";
import { storage } from "./storage";
import { Autumn } from "autumn-js";
import { insertLeadSchema, updateLeadSchema, contactSchema } from "@shared/schema";
import { requireAuth, requireRole } from "./middleware/auth";
import { notifyNewLead, notifyNewContact, notifyInvitation, isResendConfigured } from "./services/notifications";
import { auth } from "./lib/auth";
import { db } from "./db";
import { user, verification } from "@shared/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";
import { Webhook } from "svix";

// ─── Cloudflare Turnstile Verification ───

async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn("TURNSTILE_SECRET_KEY not set — skipping bot check");
    return true; // Allow in dev if not configured
  }
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = await res.json() as { success: boolean };
    return data.success;
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return false;
  }
}

// ─── Rate Limiting for Verification Emails ───
// In-memory rate limit tracking (server restart clears)
const verificationRateLimits = new Map<string, { count: number; resetAt: Date }>();

const RATE_LIMIT_MAX_REQUESTS = 3;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Check if an email is allowed to request a verification email.
 * Enforces max 3 requests per 15 minutes per email address.
 * @param email - The email address to check
 * @returns Object with allowed status and optional retryAfter seconds
 */
export function checkRateLimit(email: string): { allowed: boolean; retryAfter?: number } {
  const normalizedEmail = email.toLowerCase().trim();
  const now = new Date();
  const entry = verificationRateLimits.get(normalizedEmail);

  // No entry or window has expired - allow and create/reset entry
  if (!entry || entry.resetAt <= now) {
    verificationRateLimits.set(normalizedEmail, {
      count: 1,
      resetAt: new Date(now.getTime() + RATE_LIMIT_WINDOW_MS),
    });
    return { allowed: true };
  }

  // Within window and under limit - allow and increment
  if (entry.count < RATE_LIMIT_MAX_REQUESTS) {
    entry.count += 1;
    return { allowed: true };
  }

  // Rate limit exceeded - deny with retryAfter
  const retryAfterMs = entry.resetAt.getTime() - now.getTime();
  const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);
  return { allowed: false, retryAfter: retryAfterSeconds };
}


export function registerRoutes(app: Express): void {
  // ─── Rate Limiters for Public Endpoints ───
  const formLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 submissions per 15 min per IP
    message: { success: false, error: "Too many submissions. Please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  const leadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { success: false, error: "Too many requests. Please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // ─── Public Routes ───

  // Test endpoint to verify Resend is working (development only)
  if (process.env.NODE_ENV === "development") {
    app.post("/api/test-email", async (req, res) => {
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
          html: "<p>This is a test email to verify Resend is working.</p>",
        });

        if (error) {
          console.error("[Test Email] Error:", error);
          return res.status(500).json({ success: false, error });
        }

        console.log("[Test Email] Sent successfully:", data?.id);
        res.json({ success: true, id: data?.id });
      } catch (err: any) {
        console.error("[Test Email] Exception:", err);
        res.status(500).json({ success: false, error: err.message });
      }
    });
  }

  // Contact form submission
  app.post("/api/contact", formLimiter, async (req, res) => {
    try {
      const result = contactSchema.safeParse(req.body);

      if (!result.success) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid contact data", details: result.error.issues });
      }

      const contact = result.data;

      // Verify Turnstile token if configured
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

      // Always save to leads table so no submission is lost
      const leadData = {
        name: [contact.firstName, contact.lastName].filter(Boolean).join(" "),
        phone: "",
        email: contact.email,
        package: "contact-form",
        status: "new" as const,
        interests: [
          contact.organizationName && `Organization: ${contact.organizationName}`,
          contact.role && `Role: ${contact.role}`,
          contact.organizationType && `Type: ${contact.organizationType}`,
          contact.communitySize && `Community size: ${contact.communitySize}`,
          contact.message && `Message: ${contact.message}`,
        ].filter(Boolean).join("\n") || null,
      };
      await storage.createLead(leadData);

      // Also send email notification if Resend is configured
      if (isResendConfigured()) {
        try {
          await notifyNewContact(contact);
        } catch (emailErr) {
          console.error("[Contact] Email notification failed (lead already saved):", emailErr);
        }
      }

      res.json({
        success: true,
        message: "Your message has been sent successfully",
      });
    } catch (error: any) {
      console.error("Error processing contact form:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to send message. Please try again later." });
    }
  });

  // Resend verification email (rate-limited)
  app.post("/api/auth/resend-verification", async (req, res) => {
    try {
      const { email } = req.body;

      // Validate email is provided
      if (!email || typeof email !== "string") {
        return res.status(400).json({
          success: false,
          message: "Email address is required",
        });
      }

      const normalizedEmail = email.toLowerCase().trim();

      // Check rate limit before sending
      const rateLimitResult = checkRateLimit(normalizedEmail);
      if (!rateLimitResult.allowed) {
        return res.status(429).json({
          success: false,
          message: `Too many requests. Please wait ${Math.ceil(rateLimitResult.retryAfter! / 60)} minutes before requesting another email.`,
          retryAfter: rateLimitResult.retryAfter,
        });
      }

      // Call Better Auth's sendVerificationEmail API
      const result = await auth.api.sendVerificationEmail({
        body: {
          email: normalizedEmail,
          callbackURL: "/login?verified=true",
        },
      });

      // Check if the API call was successful
      if (!result) {
        return res.status(500).json({
          success: false,
          message: "Failed to send verification email. Please try again later.",
        });
      }

      res.json({
        success: true,
        message: "Verification email sent. Please check your inbox.",
      });
    } catch (error: any) {
      console.error("Error sending verification email:", error);
      
      // Handle specific error cases
      if (error.message?.includes("User not found") || error.status === 404) {
        return res.status(400).json({
          success: false,
          message: "No account found with this email address.",
        });
      }

      if (error.message?.includes("already verified") || error.status === 400) {
        return res.status(400).json({
          success: false,
          message: "This email is already verified. You can sign in.",
        });
      }

      res.status(500).json({
        success: false,
        message: "Failed to send verification email. Please try again later.",
      });
    }
  });

  // Lead submission (subscription pop-up) — public
  app.post("/api/leads", leadLimiter, async (req, res) => {
    try {
      const result = insertLeadSchema.safeParse(req.body);

      if (!result.success) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid lead data", details: result.error.issues });
      }

      // Verify Turnstile token if configured
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

      // Fire-and-forget notifications (email + Telegram)
      notifyNewLead(lead).catch((err) =>
        console.error("Lead notification error:", err)
      );

      res.json({
        success: true,
        message: "Your request has been received",
      });
    } catch (error: any) {
      console.error("Error creating lead:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to submit request. Please try again later." });
    }
  });

  // ─── Autumn Webhook (subscription events) ───
  app.post("/api/webhooks/autumn", async (req, res) => {
    try {
      // Verify webhook signature if secret is configured
      const webhookSecret = process.env.AUTUMN_WEBHOOK_SECRET;
      if (webhookSecret) {
        const wh = new Webhook(webhookSecret);
        try {
          wh.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"] as string,
            "svix-timestamp": req.headers["svix-timestamp"] as string,
            "svix-signature": req.headers["svix-signature"] as string,
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

        // Map scenario to status
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
            // Downgrade is scheduled for end of period
            status = "active"; // Still active until period ends
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

        // Find active subscription from customer data
        const activeSubscription = customer.subscriptions?.find(
          (s: any) => s.status === "active" || s.status === "scheduled"
        );

        await storage.upsertSubscription({
          userId,
          productId: scenario === "scheduled" || scenario === "downgrade" 
            ? (activeSubscription?.product_id || updated_product.id)
            : updated_product.id,
          productName: scenario === "scheduled" || scenario === "downgrade"
            ? (activeSubscription?.product_name || updated_product.name)
            : updated_product.name,
          status,
          scenario,
          currentPeriodStart: activeSubscription?.current_period_start 
            ? new Date(activeSubscription.current_period_start) 
            : null,
          currentPeriodEnd: activeSubscription?.current_period_end 
            ? new Date(activeSubscription.current_period_end) 
            : null,
          cancelAtPeriodEnd,
          scheduledProductId,
          scheduledProductName,
        });

        console.log(`[Autumn Webhook] Updated subscription for user ${userId}: ${scenario}`);
      }

      res.status(200).json({ received: true });
    } catch (error: any) {
      console.error("[Autumn Webhook Error]", error);
      // Always return 200 to prevent retries
      res.status(200).json({ received: true, error: error.message });
    }
  });

  // ─── Protected Routes (Better Auth session required) ───

  // Get all leads — Bodhi Admin only
  app.get("/api/leads", requireAuth, requireRole("bodhi_admin"), async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json({ success: true, data: leads });
    } catch (error: any) {
      console.error("Error getting leads:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // Update lead — Bodhi Admin only
  app.patch("/api/leads/:id", requireAuth, requireRole("bodhi_admin"), async (req, res) => {
    try {
      const result = updateLeadSchema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          success: false,
          error: "Invalid update data",
          details: result.error.issues,
        });
      }

      const updateData: Record<string, any> = {};
      const data = result.data;

      if (data.status !== undefined) updateData.status = data.status;
      if (data.paymentStatus !== undefined) updateData.paymentStatus = data.paymentStatus;
      if (data.planTier !== undefined) updateData.planTier = data.planTier;
      if (data.monthlyAmount !== undefined) updateData.monthlyAmount = data.monthlyAmount;
      if (data.nextBillingDate !== undefined) updateData.nextBillingDate = new Date(data.nextBillingDate);
      if (data.stripeCustomerId !== undefined) updateData.stripeCustomerId = data.stripeCustomerId;
      if (data.stripeSubscriptionId !== undefined) updateData.stripeSubscriptionId = data.stripeSubscriptionId;
      if (data.notes !== undefined) updateData.notes = data.notes;

      const lead = await storage.updateLead(req.params.id, updateData);

      if (!lead) {
        return res.status(404).json({ success: false, error: "Lead not found" });
      }

      res.json({ success: true, data: lead });
    } catch (error: any) {
      console.error("Error updating lead:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // ─── Temple Admin Routes ───

  // Get subscription info for temple_admin (from local DB + Autumn fallback)
  app.get("/api/temple/subscription", requireAuth, requireRole("temple_admin"), async (req, res) => {
    try {
      const userId = (req as any).session.user.id;
      
      // First try local database
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
            scheduledProductName: localSub.scheduledProductName,
          },
        });
      }

      // Fallback to Autumn API
      const autumn = new Autumn({ secretKey: process.env.AUTUMN_SECRET_KEY! });
      const { data: customer } = await autumn.customers.get(userId);

      const activeProduct = customer?.products?.find(
        (p: any) => p.status === "active"
      ) || null;

      res.json({
        success: true,
        data: {
          productId: activeProduct?.id || null,
          productName: activeProduct?.name || null,
          renewalDate: activeProduct?.current_period_end
            ? new Date(activeProduct.current_period_end).toISOString()
            : null,
          status: activeProduct?.status || null,
          cancelAtPeriodEnd: false,
          scheduledProductId: null,
          scheduledProductName: null,
        },
      });
    } catch (error: any) {
      console.error("Error fetching subscription:", error);
      res.status(500).json({ success: false, error: "Failed to fetch subscription info" });
    }
  });

  // ─── Bodhi Admin Routes ───

  // Invite a new temple admin (Bodhi Admin only)
  // Requirements: 4.3, 4.4, 4.5, 4.6
  app.post("/api/admin/invite-temple-admin", requireAuth, requireRole("bodhi_admin"), async (req, res) => {
    try {
      const { name, email } = req.body;

      // Validate required fields
      if (!name || typeof name !== "string" || name.trim().length === 0) {
        return res.status(400).json({
          success: false,
          message: "Name is required",
        });
      }

      if (!email || typeof email !== "string") {
        return res.status(400).json({
          success: false,
          message: "Email is required",
        });
      }

      const normalizedEmail = email.toLowerCase().trim();
      const trimmedName = name.trim();

      // Check if email already exists (Requirement 4.6)
      const existingUser = await db.select().from(user).where(eq(user.email, normalizedEmail)).limit(1);
      if (existingUser.length > 0) {
        return res.status(409).json({
          success: false,
          message: "This email is already registered",
        });
      }

      // Generate a random temporary password (user will set their own via invitation link)
      const tempPassword = crypto.randomBytes(32).toString("hex");

      // Create user with temple_admin role and emailVerified=false (Requirement 4.3)
      const signUpResult = await auth.api.signUpEmail({
        body: {
          email: normalizedEmail,
          password: tempPassword,
          name: trimmedName,
        },
      });

      if (!signUpResult?.user) {
        return res.status(500).json({
          success: false,
          message: "Failed to create user account",
        });
      }

      const newUserId = signUpResult.user.id;

      // Update the user's role to temple_admin (Better Auth defaults may differ)
      await db.update(user).set({ role: "temple_admin" }).where(eq(user.id, newUserId));

      // Generate a custom password reset token with 72-hour expiration (Requirement 4.5)
      const resetToken = crypto.randomBytes(32).toString("hex");
      const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000); // 72 hours

      // Store the token in the verification table
      await db.insert(verification).values({
        id: crypto.randomUUID(),
        identifier: normalizedEmail,
        value: resetToken,
        expiresAt,
      });

      // Build the set-password URL
      const baseUrl = process.env.BETTER_AUTH_URL || "https://www.bodhilab.io";
      const setPasswordUrl = `${baseUrl}/reset-password?token=${resetToken}`;

      // Get inviter's name for the email
      const inviterName = (req as any).session.user.name || "Bodhi Technology Lab";

      // Send invitation email (Requirement 4.4)
      await notifyInvitation({
        email: normalizedEmail,
        name: trimmedName,
        inviterName,
        setPasswordUrl,
      });

      res.json({
        success: true,
        message: "Invitation sent successfully",
        userId: newUserId,
      });
    } catch (error: any) {
      console.error("Error inviting temple admin:", error);

      // Handle specific error cases
      if (error.message?.includes("already exists") || error.code === "23505") {
        return res.status(409).json({
          success: false,
          message: "This email is already registered",
        });
      }

      res.status(500).json({
        success: false,
        message: "Failed to send invitation. Please try again later.",
      });
    }
  });
}

// Create server only when needed (for local development)
export function createAppServer(app: Express): Server {
  return createServer(app);
}
