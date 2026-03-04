import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import { poolDb } from "../db";
import * as schema from "@shared/schema";
import { Resend } from "resend";

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error(
    "BETTER_AUTH_SECRET is not set. Generate one with: openssl rand -base64 32"
  );
}

// Lazy-init Resend client
let resendClient: Resend | null = null;
function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export const auth = betterAuth({
  database: drizzleAdapter(poolDb, { provider: "pg", schema }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "https://www.bodhilab.io",
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:5000",
    "http://localhost:5173",
    "https://bodhilab.io",
    "https://www.bodhilab.io",
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 8,
    autoSignIn: true, // Auto sign in after signup
    sendResetPassword: async ({ user, url }) => {
      const resend = getResend();
      if (!resend) {
        console.error("Resend not configured - cannot send password reset email");
        return;
      }
      
      void resend.emails.send({
        from: "Bodhi Technology Lab <auth@bodhilab.io>",
        to: user.email,
        subject: "Reset Your Password - Bodhi Technology Lab",
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #991b1b;">Reset Your Password</h2>
            <p>Hello ${user.name || "there"},</p>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${url}" style="background-color: #991b1b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Reset Password</a>
            </p>
            <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this email. This link will expire in 1 hour.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p style="color: #888; font-size: 12px;">Bodhi Technology Lab - Mindful Technology for Spiritual Communities</p>
          </div>
        `,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: false, // Don't require email verification
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const resend = getResend();
      if (!resend) {
        console.error("Resend not configured - cannot send verification email");
        return;
      }
      
      void resend.emails.send({
        from: "Bodhi Technology Lab <auth@bodhilab.io>",
        to: user.email,
        subject: "Verify Your Email - Bodhi Technology Lab",
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #991b1b;">Welcome to Bodhi Technology Lab!</h2>
            <p>Hello ${user.name || "there"},</p>
            <p>Thank you for creating an account. Please verify your email address by clicking the button below:</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${url}" style="background-color: #991b1b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Verify Email</a>
            </p>
            <p style="color: #666; font-size: 14px;">If you didn't create this account, you can safely ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p style="color: #888; font-size: 12px;">Bodhi Technology Lab - Mindful Technology for Spiritual Communities</p>
          </div>
        `,
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "temple_admin",
        input: false,
      },
    },
  },
  plugins: [organization()],
});
