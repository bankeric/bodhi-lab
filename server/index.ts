import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes, createAppServer } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

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

      res.status(status).json({ message });
      throw err;
    });

    // Setup based on environment
    if (process.env.VERCEL) {
      // Vercel serverless - only API routes, no static serving
      // Vercel handles static files automatically from outputDirectory
      log("Running in Vercel serverless mode", "express");
    } else if (app.get("env") === "development") {
      // Development mode with Vite HMR
      const server = createAppServer(app);
      await setupVite(app, server);

      const port = parseInt(process.env.PORT || '5000', 10);
      server.listen(port, "0.0.0.0", () => {
        log(`serving on port ${port}`);
      });
    } else {
      // Production but not Vercel (e.g., self-hosted)
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
