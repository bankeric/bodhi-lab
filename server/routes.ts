import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Autumn } from "autumn-js";
import { insertLeadSchema, updateLeadSchema } from "@shared/schema";
import { requireAuth, requireRole } from "./middleware/auth";
import { notifyNewLead, notifyNewContact, isResendConfigured } from "./services/notifications";

export function registerRoutes(app: Express): void {
  // ─── Public Routes ───

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        organizationName,
        role,
        organizationType,
        communitySize,
        message,
      } = req.body;

      if (!firstName || !lastName || !email) {
        return res
          .status(400)
          .json({ message: "First name, last name, and email are required" });
      }

      if (!isResendConfigured()) {
        return res
          .status(503)
          .json({ message: "Email service is not configured" });
      }

      await notifyNewContact({
        firstName,
        lastName,
        email,
        role,
        organizationName,
        organizationType,
        communitySize,
        message,
      });

      res.json({
        success: true,
        message: "Your message has been sent successfully",
      });
    } catch (error: any) {
      console.error("Error sending contact notification:", error);
      res
        .status(500)
        .json({ message: "Failed to send message. Please try again later." });
    }
  });

  // Lead submission (subscription pop-up) — public
  app.post("/api/leads", async (req, res) => {
    try {
      const result = insertLeadSchema.safeParse(req.body);

      if (!result.success) {
        return res
          .status(400)
          .json({ message: "Invalid lead data", errors: result.error.issues });
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
        .json({ message: "Failed to submit request. Please try again later." });
    }
  });

  // ─── Protected Routes (Better Auth session required) ───

  // Get all leads — Bodhi Admin only
  app.get("/api/leads", requireAuth, requireRole("bodhi_admin"), async (req, res) => {
    try {
      const leads = await storage.getLeads();
      res.json(leads);
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
          message: "Invalid update data",
          errors: result.error.issues,
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
        return res.status(404).json({ message: "Lead not found" });
      }

      res.json(lead);
    } catch (error: any) {
      console.error("Error updating lead:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // ─── Temple Admin Routes ───

  // Get subscription info for temple_admin
  app.get("/api/temple/subscription", requireAuth, requireRole("temple_admin"), async (req, res) => {
    try {
      const userId = (req as any).session.user.id;
      const autumn = new Autumn({ secretKey: process.env.AUTUMN_SECRET_KEY! });
      const { data: customer } = await autumn.customers.get(userId);

      const activeProduct = customer?.products?.find(
        (p: any) => p.status === "active"
      ) || null;

      res.json({
        productId: activeProduct?.id || null,
        productName: activeProduct?.name || null,
        renewalDate: activeProduct?.current_period_end
          ? new Date(activeProduct.current_period_end).toISOString()
          : null,
        status: activeProduct?.status || null,
      });
    } catch (error: any) {
      console.error("Error fetching subscription:", error);
      res.status(500).json({ success: false, error: "Failed to fetch subscription info" });
    }
  });
}

// Create server only when needed (for local development)
export function createAppServer(app: Express): Server {
  return createServer(app);
}
