import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { organization } from "better-auth/plugins";
import { poolDb } from "../db";

if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error(
    "BETTER_AUTH_SECRET is not set. Generate one with: openssl rand -base64 32"
  );
}

export const auth = betterAuth({
  database: drizzleAdapter(poolDb, { provider: "pg" }),
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true },
  plugins: [organization()],
});
