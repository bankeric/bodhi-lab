import { db } from "../db";
import { user, subscriptions, giacNgoSyncLog } from "../../shared/schema";
import { eq } from "drizzle-orm";

// ─── Interfaces ───

interface SyncParams {
  userId: string;
  scenario: string;
  productId: string;
  productName?: string;
  currentPeriodStart?: string | null;
  currentPeriodEnd?: string | null;
  cancelAtPeriodEnd?: boolean;
  scheduledProductId?: string | null;
  scheduledProductName?: string | null;
}

interface SyncPayload {
  // User info
  user_id: string;
  email: string;
  name: string;
  role: string;
  // Plan info
  plan: string;
  plan_name: string | null;
  status: string;
  scenario: string;
  // Billing period
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  // Scheduled changes
  scheduled_plan: string | null;
  scheduled_plan_name: string | null;
  // Meta
  timestamp: string;
}

// ─── Scenario Mapping ───

const STATUS_MAP: Record<string, string> = {
  new: "active",
  renew: "active",
  upgrade: "active",
  downgrade: "active",
  scheduled: "active",
  cancel: "unsubscribe",
  expired: "unsubscribe",
  past_due: "past_due",
};

/**
 * Map scenario từ Autumn sang status cho Giác Ngộ.
 * Unknown scenarios default to "active".
 */
export function mapScenarioToStatus(scenario: string): string {
  return STATUS_MAP[scenario] ?? "active";
}

/**
 * Map scenario sang plan — trả về productId cho mọi scenario.
 */
export function mapScenarioToPlan(_scenario: string, productId: string): string {
  return productId;
}

// ─── Main Sync Function ───

/**
 * Gọi Giác Ngộ API để đồng bộ trạng thái subscription.
 * Fire-and-forget — tự xử lý mọi lỗi, không bao giờ throw exception.
 */
export async function syncToGiacNgo(params: SyncParams): Promise<void> {
  try {
    const apiUrl = process.env.GIAC_NGO_API_URL;
    const apiKey = process.env.GIAC_NGO_API_KEY;

    if (!apiUrl || !apiKey) {
      console.warn("Giác Ngộ sync skipped: missing configuration");
      return;
    }

    // Query user info from DB
    const [foundUser] = await db
      .select({ email: user.email, name: user.name, role: user.role })
      .from(user)
      .where(eq(user.id, params.userId))
      .limit(1);

    if (!foundUser) {
      console.warn(`[Giác Ngộ Sync] User not found: ${params.userId}`);
      return;
    }

    // Build enriched payload
    const payload: SyncPayload = {
      user_id: params.userId,
      email: foundUser.email,
      name: foundUser.name,
      role: foundUser.role,
      plan: mapScenarioToPlan(params.scenario, params.productId),
      plan_name: params.productName || null,
      status: mapScenarioToStatus(params.scenario),
      scenario: params.scenario,
      current_period_start: params.currentPeriodStart || null,
      current_period_end: params.currentPeriodEnd || null,
      cancel_at_period_end: params.cancelAtPeriodEnd ?? false,
      scheduled_plan: params.scheduledProductId || null,
      scheduled_plan_name: params.scheduledProductName || null,
      timestamp: new Date().toISOString(),
    };

    const payloadJson = JSON.stringify(payload);

    // HTTP POST with 10s timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10_000);

    let responseOk = false;
    let responseStatus: number | null = null;
    let errorMessage: string | null = null;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: payloadJson,
        signal: controller.signal,
      });

      responseOk = response.ok;
      responseStatus = response.status;

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        errorMessage = `HTTP ${response.status}: ${body}`;
        console.error(`[Giác Ngộ Sync] API error: ${errorMessage}`);
      }
    } catch (err: unknown) {
      responseOk = false;
      if (err instanceof Error && err.name === "AbortError") {
        errorMessage = "Request timeout (10s)";
        console.error("[Giác Ngộ Sync] Request timeout (10s)");
      } else {
        errorMessage = err instanceof Error ? err.message : String(err);
        console.error(`[Giác Ngộ Sync] Network error: ${errorMessage}`);
      }
    } finally {
      clearTimeout(timeoutId);
    }

    // Log to giac_ngo_sync_log
    try {
      await db.insert(giacNgoSyncLog).values({
        userId: params.userId,
        eventType: params.scenario,
        payload: payloadJson,
        responseOk,
        responseStatus,
        errorMessage,
      });
    } catch (dbErr: unknown) {
      console.error(
        "[Giác Ngộ Sync] Failed to write sync log:",
        dbErr instanceof Error ? dbErr.message : String(dbErr)
      );
    }
  } catch (err: unknown) {
    // Outer catch — never throw
    console.error(
      "[Giác Ngộ Sync] Unexpected error:",
      err instanceof Error ? err.message : String(err)
    );
  }
}
