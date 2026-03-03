import { type Request, type Response, type NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    return res.status(401).json({ success: false, error: "Unauthorized" });
  }

  (req as any).session = session;
  next();
}

export function requireRole(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = (req as any).session?.user?.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ success: false, error: "Forbidden" });
    }
    next();
  };
}
