# Implementation Plan: Temple Admin Dashboard

## Overview

Triển khai Temple Admin Dashboard cho `temple_admin`: tạo utility functions, sửa Login redirect, thêm backend API endpoint `/api/temple/subscription`, xây dựng Dashboard page, và đăng ký route. Sử dụng TypeScript + React 18 + Shadcn/ui + Tailwind CSS + Autumn SDK.

## Tasks

- [x] 1. Create dashboard utility functions
  - [x] 1.1 Create `client/src/lib/dashboard-utils.ts` with pure utility functions
    - Define `SubscriptionInfo` interface with `productId`, `productName`, `renewalDate`, `status` fields (all nullable)
    - Define `DisplayStatus` interface with `hasActivePlan: boolean`, `planLabel: string`, `renewalLabel: string`
    - Implement `getRedirectPath(role: string): string` — returns `/dashboard` for `temple_admin`, `/admin` for `bodhi_admin`, `/` for all others
    - Implement `getWelcomeMessage(name: string | null | undefined): string` — returns greeting with name, or default "Welcome to your Dashboard" for null/undefined/empty/whitespace
    - Implement `formatRenewalDate(isoDate: string | null): string` — formats ISO date to locale display string, returns "N/A" for null
    - Implement `getSubscriptionDisplayStatus(sub: SubscriptionInfo): DisplayStatus` — determines `hasActivePlan`, `planLabel`, and `renewalLabel` from subscription data
    - _Requirements: 1.1, 1.2, 3.1, 3.2, 4.1, 4.2, 4.3_

  - [ ]* 1.2 Write property test: role-based redirect mapping (Property 1)
    - **Property 1: Role-based redirect mapping**
    - **Validates: Requirements 1.1, 1.2**
    - Create `client/src/__tests__/dashboard-utils.property.test.ts`
    - Use `fast-check` to generate arbitrary role strings
    - Assert `getRedirectPath("temple_admin")` always returns `/dashboard`, `getRedirectPath("bodhi_admin")` always returns `/admin`, and any other role returns `/`

  - [ ]* 1.3 Write property test: welcome message contains user name (Property 2)
    - **Property 2: Welcome message contains user name**
    - **Validates: Requirements 3.1, 3.2**
    - Use `fast-check` to generate non-empty, non-whitespace strings for name
    - Assert `getWelcomeMessage(name)` contains the provided name
    - Assert `getWelcomeMessage(null)`, `getWelcomeMessage(undefined)`, `getWelcomeMessage("")`, `getWelcomeMessage("  ")` all return "Welcome to your Dashboard"

  - [ ]* 1.4 Write property test: subscription display status (Property 3)
    - **Property 3: Subscription display status**
    - **Validates: Requirements 4.1, 4.2, 4.3**
    - Use `fast-check` to generate `SubscriptionInfo` objects with `productId` from `["basic", "standard", "premium"]` and `status` as `"active"`
    - Assert `getSubscriptionDisplayStatus` returns `hasActivePlan: true` with non-empty `planLabel` and `renewalLabel`
    - Generate `SubscriptionInfo` with `productId: null`, assert `hasActivePlan: false`

  - [ ]* 1.5 Write property test: renewal date formatting (Property 4)
    - **Property 4: Renewal date formatting**
    - **Validates: Requirements 4.2**
    - Use `fast-check` to generate valid ISO 8601 date strings
    - Assert `formatRenewalDate(date)` returns a non-empty string different from the raw ISO input
    - Assert `formatRenewalDate(null)` returns "N/A"

- [x] 2. Modify Login page redirect for temple_admin
  - [x] 2.1 Update `client/src/pages/Login.tsx` to redirect temple_admin to /dashboard
    - In the already-authenticated redirect block: add `if (role === "temple_admin") return <Redirect to="/dashboard" />;` before the default redirect
    - In `handleSubmit` after successful login: add `else if (userRole === "temple_admin") { setLocation("/dashboard"); }` before the default case
    - In Google OAuth `callbackURL`: set to `/dashboard` when user role is `temple_admin` (or use `getRedirectPath` from dashboard-utils)
    - Import `getRedirectPath` from `@/lib/dashboard-utils` to keep redirect logic DRY
    - _Requirements: 1.1, 1.2, 1.3_

- [x] 3. Add backend API endpoint for subscription data
  - [x] 3.1 Add `GET /api/temple/subscription` endpoint in `server/routes.ts`
    - Use existing `requireAuth` and `requireRole("temple_admin")` middleware
    - Get authenticated user ID from `(req as any).session.user.id`
    - Initialize Autumn SDK with `AUTUMN_SECRET_KEY` from environment
    - Call `autumn.customers.get(userId)` to fetch customer subscription data
    - Extract first active product from `customer.products` array
    - Return `SubscriptionInfo` JSON: `{ productId, productName, renewalDate, status }` (all null if no subscription)
    - Return 500 with `{ success: false, error: "Failed to fetch subscription info" }` on Autumn API errors
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [ ]* 3.2 Write property test: API role guard rejects non-temple_admin (Property 5)
    - **Property 5: API role guard rejects non-temple_admin**
    - **Validates: Requirements 9.3**
    - Create `server/__tests__/temple-subscription.test.ts`
    - Use `fast-check` to generate arbitrary role strings that are not `"temple_admin"`
    - Mock `requireRole` middleware behavior, assert HTTP 403 response for all non-temple_admin roles

  - [ ]* 3.3 Write property test: API data isolation (Property 6)
    - **Property 6: API data isolation**
    - **Validates: Requirements 9.1, 9.4**
    - Use `fast-check` to generate random user ID strings
    - Mock Autumn SDK `customers.get` call
    - Assert the customer ID passed to Autumn equals exactly `session.user.id` from the request

- [x] 4. Checkpoint — Verify backend and utilities
  - Ensure TypeScript compiles without errors. Verify utility functions and API endpoint are correct. Ask the user if questions arise.

- [x] 5. Create Dashboard page
  - [x] 5.1 Create `client/src/pages/Dashboard.tsx` with temple admin dashboard UI
    - Import `useSession`, `signOut` from `@/lib/auth-client`
    - Import `useCustomer` from `autumn-js/react`
    - Import `useQuery` from `@tanstack/react-query`
    - Import `useLocation` from `wouter`
    - Import Shadcn/ui components: `Card`, `Button`
    - Import `getWelcomeMessage`, `formatRenewalDate`, `getSubscriptionDisplayStatus` from `@/lib/dashboard-utils`
    - Fetch subscription data via React Query from `GET /api/temple/subscription`
    - Build header section with welcome message (using `getWelcomeMessage(session.user.name)`) and "Sign Out" button
    - Build Subscription Card showing plan name, status, renewal date, "Manage Billing" button (calls `openBillingPortal({ returnUrl: "/dashboard" })`), and "Download Invoices" button (also opens billing portal)
    - Show "No active plan" state with link to `/pricing` when no subscription
    - Build giac.ngo Space Card with "Coming soon — your Space will be configured shortly" placeholder message
    - Build Support Card with link to `/contact`
    - Handle loading state with skeleton/spinner in Subscription Card
    - Handle error state with retry button in Subscription Card
    - Apply design system: font-serif, Tailwind CSS styling consistent with existing pages
    - _Requirements: 3.1, 3.2, 4.1, 4.2, 4.3, 5.1, 5.2, 5.3, 6.1, 6.2, 6.3, 7.1, 7.2, 8.1, 8.2_

- [x] 6. Register Dashboard route in App.tsx
  - [x] 6.1 Add `/dashboard` route in `client/src/App.tsx`
    - Import `Dashboard` from `@/pages/Dashboard`
    - Add `<Route path="/dashboard">` wrapped with `<ProtectedRoute requiredRole="temple_admin">` inside the Switch block
    - _Requirements: 2.1, 2.2, 2.3_

- [x] 7. Final checkpoint — Verify full integration
  - Ensure TypeScript compiles without errors across all modified files. Verify Login redirect, Dashboard page rendering, route protection, and API endpoint work together. Ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties using `fast-check` + Vitest
- Utility functions are extracted to `dashboard-utils.ts` for testability
- `AutumnProvider` is already configured in `main.tsx` — `useCustomer` hook is available
- `ProtectedRoute` component already supports `requiredRole` prop
- Existing `requireAuth` and `requireRole` middleware in `server/routes.ts` are reused
- No new database schema needed — subscription data comes from Autumn API
