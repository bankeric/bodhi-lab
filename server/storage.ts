import { type Lead, type InsertLead, leads } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  getLeads(): Promise<Lead[]>;
  updateLeadStatus(id: string, status: string): Promise<Lead | undefined>;
  updateLead(id: string, data: Partial<Lead>): Promise<Lead | undefined>;
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
}

export const storage = new DatabaseStorage();
