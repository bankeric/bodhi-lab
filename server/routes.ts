import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { Autumn } from "autumn-js";
import { insertLeadSchema, updateLeadSchema, contactSchema } from "@shared/schema";
import { requireAuth, requireRole } from "./middleware/auth";
import { notifyNewLead, notifyNewContact, isResendConfigured } from "./services/notifications";

export function registerRoutes(app: Express): void {
  // ─── Public Routes ───

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const result = contactSchema.safeParse(req.body);

      if (!result.success) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid contact data", details: result.error.issues });
      }

      if (!isResendConfigured()) {
        return res
          .status(503)
          .json({ success: false, error: "Email service is not configured" });
      }

      await notifyNewContact(result.data);

      res.json({
        success: true,
        message: "Your message has been sent successfully",
      });
    } catch (error: any) {
      console.error("Error sending contact notification:", error);
      res
        .status(500)
        .json({ success: false, error: "Failed to send message. Please try again later." });
    }
  });

  // Lead submission (subscription pop-up) — public
  app.post("/api/leads", async (req, res) => {
    try {
      const result = insertLeadSchema.safeParse(req.body);

      if (!result.success) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid lead data", details: result.error.issues });
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
}

// Create server only when needed (for local development)
export function createAppServer(app: Express): Server {
  return createServer(app);
}
