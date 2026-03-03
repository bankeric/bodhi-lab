import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleHttp } from "drizzle-orm/neon-http";
import { Pool } from "@neondatabase/serverless";
import { drizzle as drizzlePool } from "drizzle-orm/neon-serverless";
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Provide a Neon PostgreSQL connection string."
  );
}

// HTTP driver — lowest latency for single queries (used by app routes)
const sql = neon(process.env.DATABASE_URL);
export const db = drizzleHttp(sql, { schema });

// Pool driver — transaction support (used by Better Auth internally)
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const poolDb = drizzlePool(pool, { schema });
