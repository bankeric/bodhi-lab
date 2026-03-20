import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import { poolDb } from "../db";
import * as schema from "@shared/schema";
import { Resend } from "resend";
import { notifyWelcome } from "../services/notifications";

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error(
    "BETTER_AUTH_SECRET is not set. Generate one with: openssl rand -base64 32"
  );
}

// Determine the base URL based on environment
const baseURL = process.env.NODE_ENV === "development" 
  ? "http://localhost:3000"
  : "https://www.bodhilab.io";

console.log("[Auth] Initializing Better Auth configuration...");
console.log("[Auth] RESEND_API_KEY configured:", !!process.env.RESEND_API_KEY);
console.log("[Auth] NODE_ENV:", process.env.NODE_ENV);
console.log("[Auth] Base URL:", baseURL);

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
  baseURL,
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:5000",
    "http://localhost:5173",
    "https://bodhilab.io",
    "https://www.bodhilab.io",
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true, // Require email verification before sign-in
    minPasswordLength: 8,
    autoSignIn: false, // Don't auto sign in, require verification first
    sendResetPassword: async ({ user, url }) => {
      console.log("[Auth] sendResetPassword triggered for:", user.email);
      console.log("[Auth] Reset URL:", url);
      const resend = getResend();
      if (!resend) {
        console.error("[Auth] Resend not configured - cannot send password reset email");
        return;
      }
      
      try {
        const { data, error } = await resend.emails.send({
          from: "Bodhi Technology Lab <auth@mail.bodhilab.io>",
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
        
        if (error) {
          console.error("[Auth] Failed to send reset password email:", error);
        } else {
          console.log("[Auth] Reset password email sent successfully:", data?.id);
        }
      } catch (err) {
        console.error("[Auth] Exception sending reset password email:", err);
      }
    },
  },
  emailVerification: {
    sendOnSignUp: false, // Disabled - we send manually from client after sign-up
    sendOnSignIn: true, // Send verification email when unverified user tries to sign in
    autoSignInAfterVerification: true,
    expiresIn: 86400, // 24 hours for verification tokens
    sendVerificationEmail: async ({ user, url }) => {
      console.log("[Auth] ========================================");
      console.log("[Auth] sendVerificationEmail TRIGGERED!");
      console.log("[Auth] User email:", user.email);
      console.log("[Auth] User name:", user.name);
      console.log("[Auth] Verification URL:", url);
      console.log("[Auth] ========================================");
      
      const resend = getResend();
      if (!resend) {
        console.error("[Auth] Resend not configured - cannot send verification email");
        return;
      }
      
      console.log(`[Email] Sending verification email to ${user.email}`);
      console.log(`[Email] Verification URL: ${url}`);
      
      // Use void to avoid awaiting (prevents timing attacks per Better Auth docs)
      void (async () => {
        try {
          const { data, error } = await resend.emails.send({
            from: "Bodhi Technology Lab <auth@mail.bodhilab.io>",
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
    async afterEmailVerification(user) {
      // Send welcome email to temple admins after verification (Requirement 3.1)
      // Log errors without blocking user access (Requirement 3.4)
      // Cast user to include role field from additionalFields configuration
      const userWithRole = user as typeof user & { role?: string };
      if (userWithRole.role === "temple_admin") {
        try {
          await notifyWelcome({ name: user.name, email: user.email });
        } catch (error) {
          console.error("Failed to send welcome email to temple admin:", error);
        }
      }
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
