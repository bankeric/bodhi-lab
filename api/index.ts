// Vercel serverless function entry point
import express, { type Request, Response, NextFunction } from "express";
import Stripe from "stripe";

const app = express();

// JSON parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize Stripe only if the key is available
let stripe: Stripe | null = null;

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-10-29.clover",
  });
} else {
  console.warn('Warning: STRIPE_SECRET_KEY not configured. Payment features will be disabled.');
}

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

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Export handler for Vercel
export default app;
