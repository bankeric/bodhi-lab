# Implementation Plan: Billing Admin Upgrade

## Overview

Nâng cấp hệ thống billing và Admin Dashboard cho Bodhi Labs: tích hợp Autumn SDK, mở rộng schema leads, cập nhật storage/routes, và xây dựng lại Admin Dashboard với MRR stats, charts, search/filter, và notes editing.

## Tasks

- [x] 1. Install autumn-js package and configure environment
  - [x] 1.1 Install `autumn-js` package via npm
    - Run `npm install autumn-js`
    - _Requirements: 1.5_
  - [x] 1.2 Add `AUTUMN_SECRET_KEY` placeholder to `.env`
    - Add `AUTUMN_SECRET_KEY=` and ensure `VITE_AUTUMN_BACKEND_URL` is set
    - _Requirements: 1.1_

- [x] 2. Expand leads schema with billing columns
  - [x] 2.1 Add 7 new columns to `leads` table in `shared/schema.ts`
    - Add `paymentStatus` (text, default "unpaid"), `planTier` (text), `monthlyAmount` (integer), `nextBillingDate` (timestamp), `stripeCustomerId` (text), `stripeSubscriptionId` (text), `notes` (text)
    - All new columns must be nullable to preserve backward compatibility
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8_
  - [x] 2.2 Update `insertLeadSchema` to omit new billing fields
    - Billing fields are set by admin, not by lead submission form
    - _Requirements: 4.9_
  - [x] 2.3 Add `updateLeadSchema` validation with zod enums
    - Define zod schema with `payment_status` enum (unpaid, active, overdue, cancelled), `plan_tier` enum (basic, standard, premium), `monthly_amount` positive integer, and optional string fields
    - _Requirements: 5.2, 5.3_
  - [x] 2.4 Run `drizzle-kit push` to apply schema changes to database
    - _Requirements: 4.1–4.8_

- [x] 3. Update storage layer and API routes
  - [x] 3.1 Add `updateLead` method to `server/storage.ts`
    - Accept partial update object with all new fields plus existing `status`
    - Return updated lead or undefined if not found
    - _Requirements: 5.1_
  - [x] 3.2 Expand PATCH `/api/leads/:id` route in `server/routes.ts`
    - Accept new fields: `payment_status`, `plan_tier`, `monthly_amount`, `next_billing_date`, `stripe_customer_id`, `stripe_subscription_id`, `notes`
    - Validate using `updateLeadSchema`, return 400 for invalid enum values
    - Require `requireAuth` + `requireRole("bodhi_admin")` middleware
    - Return 404 if lead not found
    - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 4. Checkpoint — Verify backend changes
  - Ensure TypeScript compiles without errors. Run `drizzle-kit push` if not done. Ask the user if questions arise.

- [x] 5. Mount Autumn handler in Express backend
  - [x] 5.1 Add `autumnHandler` to `server/index.ts`
    - Import `autumnHandler` from `autumn-js/express` and `fromNodeHeaders` from `better-auth/node`
    - Mount at `/api/autumn` AFTER `express.json()` but BEFORE `registerRoutes()`
    - Implement `identify` function using Better Auth session: return `customerId` (user.id) and `customerData` (name, email), or `customerId: null` if no session
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 6. Add AutumnProvider to React frontend
  - [x] 6.1 Wrap app with `AutumnProvider` in `client/src/main.tsx`
    - Import `AutumnProvider` from `autumn-js/react`
    - Set `backendUrl` to `import.meta.env.VITE_AUTUMN_BACKEND_URL || ""`
    - Set `includeCredentials` to `true`
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [x] 7. Create admin utility functions
  - [x] 7.1 Create `client/src/lib/admin-utils.ts` with computation functions
    - `computeStats(leads)`: calculate totalMRR (sum of monthlyAmount where paymentStatus === "active"), activeCount, newThisMonth count
    - `computeFunnelData(leads)`: return array of 5 entries [new, contacted, qualified, converted, lost] with counts, always in pipeline order, 0 for empty statuses
    - `computeSubscriptionDistribution(leads)`: return entries for each paymentStatus (unpaid, active, overdue, cancelled) with counts
    - `filterLeads(leads, search, statusFilter, paymentFilter)`: client-side filtering by name/email/phone (case-insensitive), status, and paymentStatus
    - _Requirements: 7.1, 7.2, 7.3, 8.1, 8.2, 8.3, 9.1, 11.1, 11.2, 11.3, 11.4, 11.5_

- [x] 8. Rewrite Admin Dashboard page
  - [x] 8.1 Add MRR stats cards section to `Admin.tsx`
    - Display total MRR, active subscription count, and new leads this month at top of page
    - Use `computeStats` from admin-utils
    - _Requirements: 7.1, 7.2, 7.3, 7.4_
  - [x] 8.2 Add Pipeline Funnel chart using Recharts BarChart
    - Display lead counts by status in pipeline order: new → contacted → qualified → converted → lost
    - Use `computeFunnelData` from admin-utils
    - Show 0 values for empty statuses
    - _Requirements: 8.1, 8.2, 8.3_
  - [x] 8.3 Add Subscription Status chart using Recharts PieChart
    - Display lead distribution by paymentStatus: unpaid, active, overdue, cancelled
    - Use `computeSubscriptionDistribution` from admin-utils
    - Show empty state message when all leads are unpaid
    - _Requirements: 9.1, 9.2_
  - [x] 8.4 Add search bar and filter controls
    - Search input for name, email, phone
    - Dropdown/select filters for lead status and payment status
    - Use `filterLeads` from admin-utils for client-side filtering
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_
  - [x] 8.5 Display new billing fields on lead cards
    - Show `paymentStatus` as colored badge (active: green, overdue: orange, cancelled: red, unpaid: gray)
    - Show `planTier` when present, default label when absent
    - Show `notes` as expandable text
    - _Requirements: 12.1, 12.2, 12.3, 12.4_
  - [x] 8.6 Add inline notes editing for each lead
    - Toggle textarea on click for editing notes
    - Save via PATCH `/api/leads/:id` with `notes` field
    - Show toast error on save failure, keep textarea content for retry
    - Display existing notes in lead list
    - _Requirements: 10.1, 10.2, 10.3, 10.4_

- [x] 9. Final checkpoint — Verify full integration
  - Ensure TypeScript compiles without errors across all modified files. Verify no broken imports or type mismatches. Ask the user if questions arise.

## Notes

- All computation (MRR, funnel, distribution, filtering) happens client-side from fetched leads data — no new API endpoints needed for stats
- Autumn handler must be mounted AFTER `express.json()` but BEFORE `registerRoutes()` in server/index.ts
- All new schema columns are nullable to maintain backward compatibility with existing data
- Existing Stripe donation route (`POST /api/create-payment-intent`) must not be affected
- Run `drizzle-kit push` after schema changes to sync with Neon PostgreSQL
