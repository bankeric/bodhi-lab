import { type Lead, type InsertLead, leads, type Subscription, type InsertSubscription, subscriptions, type TempleOnboarding, templeOnboarding, type TempleApiKey, templeApiKeys, type TempleSiteMetrics, type InsertTempleSiteMetrics, templeSiteMetrics, type TempleExternalApi, type InsertTempleExternalApi, templeExternalApis } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, gte, lte, isNull } from "drizzle-orm";
import { randomUUID, randomBytes } from "crypto";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  updateLeadStatus(id: string, status: string): Promise<Lead | undefined>;
  updateLead(id: string, data: Partial<Lead>): Promise<Lead | undefined>;
  // Subscription methods
  getSubscriptionByUserId(userId: string): Promise<Subscription | undefined>;
  upsertSubscription(data: InsertSubscription): Promise<Subscription>;
  updateSubscription(userId: string, data: Partial<Subscription>): Promise<Subscription | undefined>;
  // Onboarding methods
  getOnboardingByUserId(userId: string): Promise<TempleOnboarding | undefined>;
  upsertOnboarding(userId: string, data: Partial<TempleOnboarding>): Promise<TempleOnboarding>;
  getAllOnboardings(): Promise<(TempleOnboarding & { email?: string })[]>;
  updateOnboardingStatus(id: string, status: string): Promise<TempleOnboarding | undefined>;
  // API Key methods
  createApiKey(userId: string, domain?: string, label?: string): Promise<TempleApiKey>;
  getApiKeysByUserId(userId: string): Promise<TempleApiKey[]>;
  getActiveApiKey(apiKey: string): Promise<TempleApiKey | undefined>;
  revokeApiKey(id: string, userId: string): Promise<TempleApiKey | undefined>;
  touchApiKeyUsage(id: string): Promise<void>;
  // Site Metrics methods
  pushSiteMetrics(userId: string, data: InsertTempleSiteMetrics): Promise<TempleSiteMetrics>;
  getLatestMetrics(userId: string): Promise<TempleSiteMetrics | undefined>;
  getMetricsHistory(userId: string, days: number): Promise<TempleSiteMetrics[]>;
  getAllLatestMetrics(): Promise<(TempleSiteMetrics & { userName?: string; userEmail?: string })[]>;
}

export class DatabaseStorage implements IStorage {
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const id = randomUUID();
    const now = new Date();
    await db.insert(leads).values({
      id,
      name: insertLead.name,
      phone: insertLead.phone,
      email: insertLead.email,
      interests: insertLead.interests || null,
      package: insertLead.package,
      status: insertLead.status || "new",
      createdAt: now,
    });

    // Fetch the created lead since returning() may not work with neon-http
    const result = await db.select().from(leads).where(eq(leads.id, id));
    return result[0];
  }

  async getLeads(): Promise<Lead[]> {
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async updateLeadStatus(
    id: string,
    status: string
  ): Promise<Lead | undefined> {
    const result = await db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, id))
      .returning();
    return result[0];
  }

  async updateLead(
    id: string,
    data: Partial<Lead>
  ): Promise<Lead | undefined> {
    const result = await db
      .update(leads)
      .set(data)
      .where(eq(leads.id, id))
      .returning();
    return result[0];
  }

  // ─── Subscription Methods ───

  async getSubscriptionByUserId(userId: string): Promise<Subscription | undefined> {
    const result = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId));
    return result[0];
  }

  async upsertSubscription(data: InsertSubscription): Promise<Subscription> {
    // Check if subscription exists for this user
    const existing = await this.getSubscriptionByUserId(data.userId);
    
    if (existing) {
      // Update existing subscription
      const result = await db
        .update(subscriptions)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(eq(subscriptions.userId, data.userId))
        .returning();
      return result[0];
    } else {
      // Create new subscription
      const id = randomUUID();
      await db.insert(subscriptions).values({
        id,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const result = await db.select().from(subscriptions).where(eq(subscriptions.id, id));
      return result[0];
    }
  }

  async updateSubscription(
    userId: string,
    data: Partial<Subscription>
  ): Promise<Subscription | undefined> {
    const result = await db
      .update(subscriptions)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(subscriptions.userId, userId))
      .returning();
    return result[0];
  }

  // ─── Onboarding Methods ───

  async getOnboardingByUserId(userId: string): Promise<TempleOnboarding | undefined> {
    const result = await db
      .select()
      .from(templeOnboarding)
      .where(eq(templeOnboarding.userId, userId));
    return result[0];
  }

  async upsertOnboarding(userId: string, data: Partial<TempleOnboarding>): Promise<TempleOnboarding> {
    const existing = await this.getOnboardingByUserId(userId);

    if (existing) {
      const result = await db
        .update(templeOnboarding)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(templeOnboarding.userId, userId))
        .returning();
      return result[0];
    } else {
      const id = randomUUID();
      await db.insert(templeOnboarding).values({
        id,
        userId,
        templeName: data.templeName || "",
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const result = await db.select().from(templeOnboarding).where(eq(templeOnboarding.id, id));
      return result[0];
    }
  }

  async getAllOnboardings(): Promise<(TempleOnboarding & { email?: string })[]> {
    const { user } = await import("@shared/schema");
    const result = await db
      .select({
        onboarding: templeOnboarding,
        email: user.email,
      })
      .from(templeOnboarding)
      .leftJoin(user, eq(templeOnboarding.userId, user.id))
      .orderBy(desc(templeOnboarding.updatedAt));
    return result.map((r) => ({ ...r.onboarding, email: r.email || undefined }));
  }

  async updateOnboardingStatus(id: string, status: string): Promise<TempleOnboarding | undefined> {
    const result = await db
      .update(templeOnboarding)
      .set({ status, updatedAt: new Date() })
      .where(eq(templeOnboarding.id, id))
      .returning();
    return result[0];
  }

  // ─── API Key Methods ───

  async createApiKey(userId: string, domain?: string, label?: string): Promise<TempleApiKey> {
    const id = randomUUID();
    const apiKey = `btl_${randomBytes(32).toString("hex")}`;
    await db.insert(templeApiKeys).values({
      id,
      userId,
      apiKey,
      domain: domain || null,
      label: label || "Default",
      createdAt: new Date(),
    });
    const result = await db.select().from(templeApiKeys).where(eq(templeApiKeys.id, id));
    return result[0];
  }

  async getApiKeysByUserId(userId: string): Promise<TempleApiKey[]> {
    return await db
      .select()
      .from(templeApiKeys)
      .where(eq(templeApiKeys.userId, userId))
      .orderBy(desc(templeApiKeys.createdAt));
  }

  async getActiveApiKey(apiKey: string): Promise<TempleApiKey | undefined> {
    const result = await db
      .select()
      .from(templeApiKeys)
      .where(and(eq(templeApiKeys.apiKey, apiKey), isNull(templeApiKeys.revokedAt)));
    return result[0];
  }

  async revokeApiKey(id: string, userId: string): Promise<TempleApiKey | undefined> {
    const result = await db
      .update(templeApiKeys)
      .set({ revokedAt: new Date() })
      .where(and(eq(templeApiKeys.id, id), eq(templeApiKeys.userId, userId)))
      .returning();
    return result[0];
  }

  async touchApiKeyUsage(id: string): Promise<void> {
    await db
      .update(templeApiKeys)
      .set({ lastUsedAt: new Date() })
      .where(eq(templeApiKeys.id, id));
  }

  // ─── Site Metrics Methods ───

  async pushSiteMetrics(userId: string, data: InsertTempleSiteMetrics): Promise<TempleSiteMetrics> {
    const id = randomUUID();
    const now = new Date();
    // Truncate to date (start of day UTC)
    const dateKey = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    // Upsert: if metrics for today exist, update; otherwise insert
    const existing = await db
      .select()
      .from(templeSiteMetrics)
      .where(and(eq(templeSiteMetrics.userId, userId), eq(templeSiteMetrics.date, dateKey)));

    if (existing.length > 0) {
      const result = await db
        .update(templeSiteMetrics)
        .set({
          totalUsers: data.totalUsers ?? 0,
          paidUsers: data.paidUsers ?? 0,
          activeUsers: data.activeUsers ?? 0,
          newUsersToday: data.newUsersToday ?? 0,
          totalSessions: data.totalSessions ?? 0,
          pageViews: data.pageViews ?? 0,
          avgSessionDuration: data.avgSessionDuration ?? 0,
          totalSutras: data.totalSutras ?? 0,
          totalDharmaContent: data.totalDharmaContent ?? 0,
          aiConversations: data.aiConversations ?? 0,
          monthlyRevenue: data.monthlyRevenue ?? 0,
          totalDonations: data.totalDonations ?? 0,
          storageUsedMb: data.storageUsedMb ?? 0,
        })
        .where(eq(templeSiteMetrics.id, existing[0].id))
        .returning();
      return result[0];
    }

    await db.insert(templeSiteMetrics).values({
      id,
      userId,
      date: dateKey,
      totalUsers: data.totalUsers ?? 0,
      paidUsers: data.paidUsers ?? 0,
      activeUsers: data.activeUsers ?? 0,
      newUsersToday: data.newUsersToday ?? 0,
      totalSessions: data.totalSessions ?? 0,
      pageViews: data.pageViews ?? 0,
      avgSessionDuration: data.avgSessionDuration ?? 0,
      totalSutras: data.totalSutras ?? 0,
      totalDharmaContent: data.totalDharmaContent ?? 0,
      aiConversations: data.aiConversations ?? 0,
      monthlyRevenue: data.monthlyRevenue ?? 0,
      totalDonations: data.totalDonations ?? 0,
      storageUsedMb: data.storageUsedMb ?? 0,
      createdAt: now,
    });
    const result = await db.select().from(templeSiteMetrics).where(eq(templeSiteMetrics.id, id));
    return result[0];
  }

  async getLatestMetrics(userId: string): Promise<TempleSiteMetrics | undefined> {
    const result = await db
      .select()
      .from(templeSiteMetrics)
      .where(eq(templeSiteMetrics.userId, userId))
      .orderBy(desc(templeSiteMetrics.date))
      .limit(1);
    return result[0];
  }

  async getMetricsHistory(userId: string, days: number): Promise<TempleSiteMetrics[]> {
    const since = new Date();
    since.setDate(since.getDate() - days);
    return await db
      .select()
      .from(templeSiteMetrics)
      .where(and(eq(templeSiteMetrics.userId, userId), gte(templeSiteMetrics.date, since)))
      .orderBy(templeSiteMetrics.date);
  }

  async getAllLatestMetrics(): Promise<(TempleSiteMetrics & { userName?: string; userEmail?: string })[]> {
    const { user } = await import("@shared/schema");
    // Get the latest metrics for each user using a subquery approach
    const allMetrics = await db
      .select({
        metrics: templeSiteMetrics,
        userName: user.name,
        userEmail: user.email,
      })
      .from(templeSiteMetrics)
      .leftJoin(user, eq(templeSiteMetrics.userId, user.id))
      .orderBy(desc(templeSiteMetrics.date));

    // Deduplicate: keep only the latest per userId
    const seen = new Set<string>();
    const latest: (TempleSiteMetrics & { userName?: string; userEmail?: string })[] = [];
    for (const row of allMetrics) {
      if (!seen.has(row.metrics.userId)) {
        seen.add(row.metrics.userId);
        latest.push({
          ...row.metrics,
          userName: row.userName || undefined,
          userEmail: row.userEmail || undefined,
        });
      }
    }
    return latest;
  }

  // ─── Temple External API Methods ───

  async getAllTempleExternalApis(): Promise<TempleExternalApi[]> {
    return await db
      .select()
      .from(templeExternalApis)
      .orderBy(desc(templeExternalApis.createdAt));
  }

  async getTempleExternalApiById(id: string): Promise<TempleExternalApi | undefined> {
    const result = await db
      .select()
      .from(templeExternalApis)
      .where(eq(templeExternalApis.id, id))
      .limit(1);
    return result[0];
  }

  async getTempleExternalApiByUserId(userId: string): Promise<TempleExternalApi | undefined> {
    const result = await db
      .select()
      .from(templeExternalApis)
      .where(eq(templeExternalApis.userId, userId))
      .limit(1);
    return result[0];
  }

  async createTempleExternalApi(data: InsertTempleExternalApi): Promise<TempleExternalApi> {
    const id = randomUUID();
    await db.insert(templeExternalApis).values({
      id,
      ...data,
    });
    const result = await db
      .select()
      .from(templeExternalApis)
      .where(eq(templeExternalApis.id, id))
      .limit(1);
    return result[0];
  }

  async updateTempleExternalApi(id: string, data: Partial<TempleExternalApi>): Promise<TempleExternalApi | undefined> {
    await db
      .update(templeExternalApis)
      .set(data)
      .where(eq(templeExternalApis.id, id));
    const result = await db
      .select()
      .from(templeExternalApis)
      .where(eq(templeExternalApis.id, id))
      .limit(1);
    return result[0];
  }

  async deleteTempleExternalApi(id: string): Promise<boolean> {
    const result = await db
      .delete(templeExternalApis)
      .where(eq(templeExternalApis.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();
