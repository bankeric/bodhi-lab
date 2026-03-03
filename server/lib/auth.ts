import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import { poolDb } from "../db";
import * as schema from "@shared/schema";

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error(
    "BETTER_AUTH_SECRET is not set. Generate one with: openssl rand -base64 32"
  );
}

export const auth = betterAuth({
  database: drizzleAdapter(poolDb, { provider: "pg", schema }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:5000",
    "http://localhost:5173",
    "https://bodhi-labs.vercel.app",
    "https://bodhi-labs.com",
    "https://www.bodhi-labs.com",
  ],
  emailAndPassword: { enabled: true },
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
