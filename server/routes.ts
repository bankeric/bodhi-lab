import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";
import nodemailer from "nodemailer";

// Initialize Stripe only if the key is available
let stripe: Stripe | null = null;

// Email transporter configuration
const createEmailTransporter = () => {
  if (!process.env.SMTP_PASSWORD) {
    console.warn('Warning: SMTP_PASSWORD not configured. Email features will be disabled.');
    return null;
  }
  
  return nodemailer.createTransport({
    host: "smtp.larksuite.com",
    port: 465,
    secure: true,
    auth: {
      user: "om@bodhilab.io",
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-10-29.clover",
  });
} else {
  console.warn('Warning: STRIPE_SECRET_KEY not configured. Payment features will be disabled.');
}

export function registerRoutes(app: Express): void {
  // Contact form submission route
  app.post("/api/contact", async (req, res) => {
    try {
      const { firstName, lastName, email, organizationName, role, organizationType, communitySize, message } = req.body;

      if (!firstName || !lastName || !email) {
        return res.status(400).json({ message: "First name, last name, and email are required" });
      }

      const transporter = createEmailTransporter();
      
      if (!transporter) {
        return res.status(503).json({ message: "Email service is not configured" });
      }

      const emailContent = `
New Contact Form Submission from Bodhi Technology Lab Website

Contact Information:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Role: ${role || 'Not specified'}

Organization Details:
- Organization Name: ${organizationName || 'Not specified'}
- Organization Type: ${organizationType || 'Not specified'}
- Community Size: ${communitySize || 'Not specified'}

Message:
${message || 'No message provided'}

---
This email was sent from the Bodhi Technology Lab contact form.
      `.trim();

      await transporter.sendMail({
        from: '"Bodhi Technology Lab" <om@bodhilab.io>',
        to: "om@bodhilab.io",
        replyTo: email,
        subject: `New Contact: ${firstName} ${lastName} - ${organizationName || 'Individual'}`,
        text: emailContent,
      });

      res.json({ success: true, message: "Your message has been sent successfully" });
    } catch (error: any) {
      console.error("Error sending contact email:", error);
      res.status(500).json({ message: "Error sending message: " + error.message });
    }
  });

  // Stripe payment route for one-time donations (VND currency)
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      if (!stripe) {
        return res.status(503).json({ message: "Payment service is not configured" });
      }

      const { amount } = req.body;

      if (!amount || amount < 1000) {
        return res.status(400).json({ message: "Invalid donation amount" });
      }

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount),
        currency: "vnd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });
}

// Create server only when needed (for local development)
export function createAppServer(app: Express): Server {
  return createServer(app);
}
