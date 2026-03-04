import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { toNodeHandler } from "better-auth/node";
import { fromNodeHeaders } from "better-auth/node";
import { autumnHandler } from "autumn-js/express";
import { auth } from "./lib/auth";
import { registerRoutes, createAppServer } from "./routes";

// Lazy-import vite helpers — they pull in "vite" (a devDependency) which
// doesn't exist on Vercel's serverless runtime.  We use a variable path
// so esbuild cannot statically resolve and inline the module.
type ViteHelpers = typeof import("./vite");
async function getViteHelpers(): Promise<ViteHelpers> {
  // Variable path prevents esbuild from bundling ./vite (and its "vite" dep)
  const modulePath = "./vite" + "";
  return import(/* @vite-ignore */ modulePath) as Promise<ViteHelpers>;
}

function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}

// ─── Security Middleware ───

// Helmet — security headers (CSP, X-Frame-Options, etc.)
app.use(helmet({
  contentSecurityPolicy: false, // Vite dev server needs inline scripts
}));

// CORS — restrict origins in production
const allowedOrigins = [
  "https://bodhilab.io",
  "https://www.bodhilab.io",
  process.env.NODE_ENV === "development" ? "http://localhost:5173" : "",
  process.env.NODE_ENV === "development" ? "http://localhost:5000" : "",
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "",
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (same-origin, server-to-server, mobile apps)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Stricter limiter for form submissions
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // 10 form submissions per 15 min per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many submissions, please try again later." },
});

// Apply rate limiters to public endpoints
app.use("/api/contact", formLimiter);
// POST /api/leads is handled in registerRoutes but we apply limiter here
app.post("/api/leads", formLimiter);

// Mount Better Auth handler BEFORE express.json() to avoid body parsing conflicts
app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json({
  limit: "100kb", // Prevent oversized payloads
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false, limit: "100kb" }));

// Mount Autumn billing handler (needs parsed body + Better Auth session)
app.use(
  "/api/autumn",
  autumnHandler({
    identify: async (req: any) => {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });

      if (!session) {
        return { customerId: undefined };
      }

      return {
        customerId: session.user.id,
        customerData: {
          name: session.user.name,
          email: session.user.email,
        },
      };
    },
  })
);

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Initialize app for both development and production
let isInitialized = false;
let initializationPromise: Promise<void> | null = null;

async function initializeApp() {
  if (isInitialized) return;
  if (initializationPromise) return initializationPromise;

  initializationPromise = (async () => {
    // Register routes (no server creation)
    registerRoutes(app);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      // Log full error internally
      console.error("Unhandled error:", err);

      // Return generic message to client (don't leak internals)
      if (!res.headersSent) {
        res.status(status).json({ message: status >= 500 ? "Internal Server Error" : message });
      }
    });

    // Setup based on environment
    if (process.env.VERCEL) {
      // Vercel serverless - only API routes, no static serving
      // Vercel handles static files automatically from outputDirectory
      log("Running in Vercel serverless mode", "express");
    } else if (app.get("env") === "development") {
      // Development mode with Vite HMR
      const { setupVite } = await getViteHelpers();
      const server = createAppServer(app);
      await setupVite(app, server);

      const port = parseInt(process.env.PORT || '5000', 10);
      server.listen(port, "0.0.0.0", () => {
        log(`serving on port ${port}`);
      });
    } else {
      // Production but not Vercel (e.g., self-hosted)
      const { serveStatic } = await getViteHelpers();
      serveStatic(app);
      const server = createAppServer(app);
      const port = parseInt(process.env.PORT || '5000', 10);
      server.listen(port, "0.0.0.0", () => {
        log(`serving on port ${port}`);
      });
    }

    isInitialized = true;
  })();

  return initializationPromise;
}

// For Vercel serverless, create a proper handler that wraps the Express app
async function handler(req: any, res: any) {
  await initializeApp();
  return new Promise((resolve, reject) => {
    app(req, res, (err: any) => {
      if (err) reject(err);
      else resolve(undefined);
    });
  });
}

// Start initialization in development
if (!process.env.VERCEL) {
  initializeApp();
}

// Export for Vercel serverless
export default handler;
