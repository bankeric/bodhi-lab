---
inclusion: auto
---

# Product Overview — Bodhi Labs

## Purpose

Bodhi Labs is an internal sales and operations tool that enables Bodhi team to manage temple partnerships from initial contact through ongoing subscription management. The platform eliminates manual intervention in the temple onboarding process.

**Success Metric:** A temple can go from form submission → contract signing → payment → live Space on giac.ngo within 14 days without manual Bodhi intervention.

**Deadline:** March 31, 2026

## Target Users

### 1. Bodhi Admin (Internal Staff)
**Goals:**
- Track and manage temple leads through sales pipeline
- Onboard new temples to giac.ngo platform
- Monitor revenue and subscription health
- Create and provision giac.ngo Spaces for temples

**Pain Points:**
- Manual lead tracking is time-consuming
- Payment status requires constant checking
- Temple onboarding involves too many manual steps

### 2. Temple Admin (Temple Management)
**Goals:**
- Manage subscription plan (upgrade/downgrade/cancel)
- Access giac.ngo Space for their temple
- View invoices and payment history
- Get support when needed

**Pain Points:**
- Need to contact Bodhi for simple plan changes
- Unclear billing and renewal dates
- No self-service portal

### 3. Visitor (Prospective Temple)
**Goals:**
- Understand Bodhi Labs services
- Compare pricing plans
- Submit inquiry to start conversation

**Pain Points:**
- Unclear what services are offered
- No easy way to express interest

## Key Features

### Lead Management (Bodhi Admin)
- Custom React form on website captures temple inquiries
- Form submits to API → saves to database → triggers notifications
- Notifications: Email via Resend + Telegram bot alert
- Pipeline tracking with status updates (New → Contacted → Qualified → Signed → Lost)
- Internal notes for context and follow-up
- Pipeline overview dashboard

### Client Management (Bodhi Admin)
- View all paying temples with subscription details
- Auto-updated payment status from Stripe webhooks
- MRR (Monthly Recurring Revenue) tracking
- Temple count by status (Active/Overdue/Cancelled)
- giac.ngo Space creation and provisioning
- Automated welcome emails

### Temple Self-Service Portal (Temple Admin)
- View current plan and renewal date
- Manage subscription via Autumn Customer Portal (upgrade/downgrade/cancel)
- Download invoices
- Direct link to giac.ngo Space
- Support contact form

### Billing & Payments
- Autumn Checkout for initial signup ($500 onboarding + first month)
- Automatic monthly recurring billing via Autumn
- Autumn Customer Portal for all subscription management
- Webhook-driven status updates (`customer.products.updated`)
- Three tiers: Basic ($99) / Standard ($199) / Premium ($299)

## Business Objectives

1. **Reduce manual work:** Automate 90% of temple onboarding and billing tasks
2. **Improve cash flow:** Automatic recurring billing with clear payment status
3. **Enable self-service:** Temples manage their own subscriptions without contacting support
4. **Scale operations:** Support 50+ temples without adding staff
5. **Data visibility:** Real-time MRR and pipeline metrics for business decisions

## Out of Scope (Phase 1)

- Mobile app
- Demo booking / calendar scheduling
- Electronic contract signing
- Referral program
- Multi-language admin portal
- Custom billing UI (using Autumn Customer Portal instead)

## Technical Philosophy

**Third-party services first** — Maximize use of existing SaaS tools to minimize custom code:
- Better Auth for authentication (free, open source, self-hosted)
- Autumn for billing & subscriptions (modern billing with React hooks)
- Resend for transactional emails and lead notifications
- Telegram Bot API for real-time alerts
- Neon for serverless PostgreSQL (not traditional database)

This approach prioritizes speed to market and reduces maintenance burden while keeping costs low.
