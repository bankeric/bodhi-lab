import { db } from "../db";
import { templeExternalApis, templeExternalStats, type TempleExternalApi } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

interface ExternalStatsResponse {
  // Standard fields
  totalUsers?: number;
  paidUsers?: number;
  activeUsers?: number;
  totalSessions?: number;
  pageViews?: number;
  aiConversations?: number;
  monthlyRevenue?: number;
  totalDonations?: number;
  storageUsedMb?: number;
  // Tathata-specific top-level fields
  totalConversations?: number;
  totalAiConfigs?: number;
  interactingUsers?: number;
  topAIs?: Array<{
    id: number;
    name: string;
    avatarUrl?: string;
    conversationCount?: string | number;
    totalLikes?: number;
    totalDislikes?: number;
  }>;
  // Legacy flat fields (in case API changes)
  conversationCount?: string | number;
  totalLikes?: number;
  totalDislikes?: number;
  recentConversations?: any[];
  // Allow any other fields
  [key: string]: any;
}

/**
 * Map external API response to our standard stats format
 * Handles Tathata format: { totalUsers, totalConversations, interactingUsers, topAIs: [...] }
 */
function mapExternalStatsToStandard(data: ExternalStatsResponse): {
  totalUsers: number;
  paidUsers: number;
  activeUsers: number;
  totalSessions: number;
  pageViews: number;
  aiConversations: number;
  monthlyRevenue: number;
  totalDonations: number;
  storageUsedMb: number;
} {
  // Aggregate likes/dislikes from topAIs array
  let aggregatedLikes = 0;
  let aggregatedDislikes = 0;
  if (Array.isArray(data.topAIs)) {
    for (const ai of data.topAIs) {
      aggregatedLikes += ai.totalLikes ?? 0;
      aggregatedDislikes += ai.totalDislikes ?? 0;
    }
  } else {
    aggregatedLikes = data.totalLikes ?? 0;
    aggregatedDislikes = data.totalDislikes ?? 0;
  }

  // totalConversations is the Tathata top-level field
  const conversations = data.totalConversations ?? data.aiConversations ?? 0;
  
  return {
    totalUsers: data.totalUsers ?? 0,
    paidUsers: data.paidUsers ?? 0,
    activeUsers: data.interactingUsers ?? data.activeUsers ?? 0,
    totalSessions: data.totalSessions ?? 0,
    pageViews: data.pageViews ?? 0,
    aiConversations: conversations,
    monthlyRevenue: data.monthlyRevenue ?? 0,
    totalDonations: data.totalDonations ?? 0,
    storageUsedMb: data.storageUsedMb ?? 0,
  };
}

/**
 * Fetch stats from an external temple API
 */
export async function fetchExternalTempleStats(api: TempleExternalApi): Promise<{
  success: boolean;
  data?: ExternalStatsResponse;
  error?: string;
}> {
  try {
    const url = `${api.baseUrl}${api.statsEndpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (api.authType === "bearer" && api.authToken) {
      headers["Authorization"] = `Bearer ${api.authToken}`;
    } else if (api.authType === "api_key" && api.authToken) {
      headers["X-API-Key"] = api.authToken;
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
      signal: AbortSignal.timeout(30000), // 30 second timeout (responses can be large with embedded images)
    });

    if (!response.ok) {
      return {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Unknown error",
    };
  }
}

/**
 * Sync stats from an external temple API and cache them
 */
export async function syncExternalTempleStats(apiId: string): Promise<{
  success: boolean;
  error?: string;
}> {
  const [api] = await db
    .select()
    .from(templeExternalApis)
    .where(eq(templeExternalApis.id, apiId))
    .limit(1);

  if (!api) {
    return { success: false, error: "API configuration not found" };
  }

  if (!api.isActive) {
    return { success: false, error: "API is disabled" };
  }

  const result = await fetchExternalTempleStats(api);

  // Update sync status
  await db
    .update(templeExternalApis)
    .set({
      lastSyncAt: new Date(),
      lastSyncStatus: result.success ? "success" : "error",
      lastSyncError: result.error || null,
    })
    .where(eq(templeExternalApis.id, apiId));

  if (!result.success) {
    return { success: false, error: result.error };
  }

  // Map the response to our standard format
  const rawData = result.data!;
  const stats = mapExternalStatsToStandard(rawData);
  
  // Strip large base64 avatarUrl fields before storing raw response to avoid bloating the DB
  const sanitizedRaw = { ...rawData };
  if (Array.isArray(sanitizedRaw.topAIs)) {
    sanitizedRaw.topAIs = sanitizedRaw.topAIs.map((ai: any) => {
      const { avatarUrl, ...rest } = ai;
      return rest;
    });
  }
  // Also strip recentConversations to keep storage lean
  delete sanitizedRaw.recentConversations;

  await db.insert(templeExternalStats).values({
    apiId,
    date: new Date(),
    totalUsers: stats.totalUsers,
    paidUsers: stats.paidUsers,
    activeUsers: stats.activeUsers,
    totalSessions: stats.totalSessions,
    pageViews: stats.pageViews,
    aiConversations: stats.aiConversations,
    monthlyRevenue: stats.monthlyRevenue,
    totalDonations: stats.totalDonations,
    storageUsedMb: stats.storageUsedMb,
    rawResponse: JSON.stringify(sanitizedRaw),
  });

  return { success: true };
}

/**
 * Get all external temple APIs with their latest stats
 */
export async function getAllExternalTempleStats() {
  const apis = await db
    .select()
    .from(templeExternalApis)
    .where(eq(templeExternalApis.isActive, true));

  const results = await Promise.all(
    apis.map(async (api) => {
      const [latestStats] = await db
        .select()
        .from(templeExternalStats)
        .where(eq(templeExternalStats.apiId, api.id))
        .orderBy(desc(templeExternalStats.createdAt))
        .limit(1);

      return {
        api: {
          id: api.id,
          templeName: api.templeName,
          slug: api.slug,
          baseUrl: api.baseUrl,
          isActive: api.isActive,
          lastSyncAt: api.lastSyncAt,
          lastSyncStatus: api.lastSyncStatus,
        },
        stats: latestStats || null,
      };
    })
  );

  return results;
}

/**
 * Get external temple stats for a specific user (temple admin)
 */
export async function getExternalTempleStatsForUser(userId: string) {
  const [api] = await db
    .select()
    .from(templeExternalApis)
    .where(eq(templeExternalApis.userId, userId))
    .limit(1);

  if (!api) {
    return null;
  }

  const [latestStats] = await db
    .select()
    .from(templeExternalStats)
    .where(eq(templeExternalStats.apiId, api.id))
    .orderBy(desc(templeExternalStats.createdAt))
    .limit(1);

  return {
    api: {
      id: api.id,
      templeName: api.templeName,
      slug: api.slug,
      baseUrl: api.baseUrl,
      isActive: api.isActive,
      lastSyncAt: api.lastSyncAt,
      lastSyncStatus: api.lastSyncStatus,
    },
    stats: latestStats || null,
  };
}

/**
 * Sync all active external temple APIs
 */
export async function syncAllExternalTempleStats(): Promise<{
  total: number;
  success: number;
  failed: number;
}> {
  const apis = await db
    .select()
    .from(templeExternalApis)
    .where(eq(templeExternalApis.isActive, true));

  let success = 0;
  let failed = 0;

  for (const api of apis) {
    const result = await syncExternalTempleStats(api.id);
    if (result.success) {
      success++;
    } else {
      failed++;
      console.error(`[Temple Sync] Failed to sync ${api.templeName}:`, result.error);
    }
  }

  return { total: apis.length, success, failed };
}
