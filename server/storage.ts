import { type Lead, type InsertLead, leads, type Subscription, type InsertSubscription, subscriptions } from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  updateLeadStatus(id: string, status: string): Promise<Lead | undefined>;
  updateLead(id: string, data: Partial<Lead>): Promise<Lead | undefined>;
  // Subscription methods
  getSubscriptionByUserId(userId: string): Promise<Subscription | undefined>;
  upsertSubscription(data: InsertSubscription): Promise<Subscription>;
  updateSubscription(userId: string, data: Partial<Subscription>): Promise<Subscription | undefined>;
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
}

export const storage = new DatabaseStorage();
