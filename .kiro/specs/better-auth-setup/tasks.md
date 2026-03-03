# Implementation Plan: Better Auth Setup

## Overview

Replace the insecure shared-password authentication (`bodhi2024` via `X-Admin-Password`) with Better Auth using Drizzle adapter and organization plugin. Fix the database driver from `pg` to `@neondatabase/serverless` for Vercel serverless compatibility. Implementation is ordered by dependency: database driver first, then auth server, middleware, routes, frontend client, and finally legacy removal.

## Tasks

- [x] 1. Install dependencies and fix Neon database driver
  - [x] 1.1 Install Better Auth and update database packages
    - Run `npm install better-auth` to add Better Auth
    - Run `npm install fast-check --save-dev` for property-based testing
    - Verify `@neondatabase/serverless` is already in `package.json` (it is at `^0.10.4`)
    - _Requirements: 1.1, 1.2, 2.1_

  - [x] 1.2 Rewrite `server/db.ts` to use `@neondatabase/serverless` dual drivers
    - Replace `pg` import with `neon` from `@neondatabase/serverless` and `drizzle-orm/neon-http` for the HTTP driver
    - Add `Pool` from `@neondatabase/serverless` with `drizzle-orm/neon-serverless` for the pool driver
    - Export `db` (HTTP driver for app queries) and `poolDb` (Pool driver for Better Auth transactions)
    - Keep the `DATABASE_URL` validation with a descriptive error message
    - Ensure `db` is compatible with existing Drizzle ORM queries in `server/storage.ts`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [ ]* 1.3 Write property test for missing DATABASE_URL error (Property 13)
    - **Property 13: Missing required environment variable produces descriptive error**
    - **Validates: Requirements 13.6, 1.3, 2.6**
    - Test that when `DATABASE_URL` is unset, the module throws an error containing "DATABASE_URL" in the message

- [x] 2. Define Better Auth database schema
  - [x] 2.1 Add Better Auth tables to `shared/schema.ts`
    - Add `user` table (replaces old `users` table) with `id`, `name`, `email`, `emailVerified`, `image`, `role`, `createdAt`, `updatedAt`
    - Add `session` table with `id`, `expiresAt`, `token`, `createdAt`, `updatedAt`, `ipAddress`, `userAgent`, `userId`
    - Add `account` table with `id`, `accountId`, `providerId`, `userId`, `accessToken`, `refreshToken`, `idToken`, `accessTokenExpiresAt`, `refreshTokenExpiresAt`, `scope`, `password`, `createdAt`, `updatedAt`
    - Add `verification` table with `id`, `identifier`, `value`, `expiresAt`, `createdAt`, `updatedAt`
    - Add `organization`, `member`, and `invitation` tables per design
    - Remove or replace the old `users` table definition (keep `leads` table unchanged)
    - Import `boolean` from `drizzle-orm/pg-core` for `emailVerified` field
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

  - [ ]* 2.2 Write property test for user role invariant (Property 11)
    - **Property 11: User role invariant**
    - **Validates: Requirements 11.3**
    - Test that the `role` field default is `'temple_admin'` and only `'bodhi_admin'` or `'temple_admin'` are valid values

- [x] 3. Configure Better Auth server and mount on Express
  - [x] 3.1 Create `server/lib/auth.ts` with Better Auth configuration
    - Configure `betterAuth()` with `drizzleAdapter(poolDb, { provider: 'pg' })`
    - Enable `emailAndPassword: { enabled: true }`
    - Add `organization()` plugin
    - Use `BETTER_AUTH_SECRET` env var for session signing with descriptive error if missing
    - Conditionally enable Google OAuth when `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are set
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 13.1, 13.3, 13.4_

  - [x] 3.2 Mount Better Auth handler in `server/index.ts`
    - Add `app.all('/api/auth/*', toNodeHandler(auth))` BEFORE `express.json()` middleware
    - Import `toNodeHandler` from `better-auth/node` and `auth` from `./lib/auth`
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [x] 4. Checkpoint - Ensure backend compiles and auth handler is mounted
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Create auth middleware and protect API routes
  - [x] 5.1 Create `server/middleware/auth.ts` with `requireAuth` and `requireRole`
    - Implement `requireAuth` middleware that calls `auth.api.getSession()` with `fromNodeHeaders(req.headers)`
    - Return 401 `{ success: false, error: 'Unauthorized' }` when no valid session
    - Attach session to `req.session` and call `next()` when valid
    - Implement `requireRole(...allowedRoles)` that checks `req.session.user.role`
    - Return 403 `{ success: false, error: 'Forbidden' }` when role doesn't match
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 5.2 Update `server/routes.ts` to use auth middleware on protected endpoints
    - Add `requireAuth, requireRole('bodhi_admin')` to `GET /api/leads`
    - Add `requireAuth, requireRole('bodhi_admin')` to `PATCH /api/leads/:id`
    - Remove `ADMIN_PASSWORD` constant and `bodhi2024` default
    - Remove `POST /api/admin/auth` endpoint
    - Remove all `X-Admin-Password` header checks from route handlers
    - Keep `POST /api/contact`, `POST /api/leads`, and `POST /api/create-payment-intent` as public
    - _Requirements: 4.6, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 12.1, 12.2, 12.3_

  - [ ]* 5.3 Write property test for unauthenticated requests returning 401 (Property 1)
    - **Property 1: Unauthenticated requests to protected endpoints return 401**
    - **Validates: Requirements 4.2, 10.1, 10.2**

  - [ ]* 5.4 Write property test for wrong role returning 403 (Property 2)
    - **Property 2: Authenticated requests with wrong role return 403**
    - **Validates: Requirements 4.5, 6.4**

  - [ ]* 5.5 Write property test for correct role passing through (Property 3)
    - **Property 3: Authenticated requests with correct role pass through**
    - **Validates: Requirements 4.3**

  - [ ]* 5.6 Write property test for X-Admin-Password having no effect (Property 12)
    - **Property 12: X-Admin-Password header has no effect**
    - **Validates: Requirements 12.3**

- [x] 6. Checkpoint - Ensure backend auth middleware and protected routes work
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Set up frontend auth client
  - [x] 7.1 Create `client/src/lib/auth-client.ts`
    - Create auth client with `createAuthClient()` from `better-auth/react`
    - Add `organizationClient()` plugin
    - Configure `baseURL` from `import.meta.env.VITE_API_URL || ''`
    - Export `useSession`, `signIn`, `signUp`, `signOut`
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 13.5_

  - [x] 7.2 Create `client/src/components/ProtectedRoute.tsx`
    - Import `useSession` from auth client
    - Show loading spinner when `isPending` is true
    - Redirect to `/login` when no session (use `wouter` `Redirect`)
    - Show "Access Denied" when `requiredRole` doesn't match `session.user.role`
    - Render children when authenticated with correct role
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [ ]* 7.3 Write property test for unauthenticated frontend redirect (Property 5)
    - **Property 5: Unauthenticated access to protected frontend routes redirects to login**
    - **Validates: Requirements 5.4, 7.6, 9.2**

  - [ ]* 7.4 Write property test for insufficient role showing access denied (Property 6)
    - **Property 6: Insufficient role on protected frontend route shows access denied**
    - **Validates: Requirements 9.3**

- [x] 8. Create Login page and update Admin page
  - [x] 8.1 Create `client/src/pages/Login.tsx`
    - Add email and password input fields with a submit button using Shadcn/ui components
    - Follow Bodhi design system: `#EFE0BD` background, `#991b1b` accent, Tailwind CSS
    - Call `signIn.email()` on form submit
    - Redirect to appropriate dashboard based on user role after successful login
    - Display descriptive error message on invalid credentials (no internal details)
    - Redirect already-authenticated users away from `/login` based on role
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [x] 8.2 Update `client/src/pages/Admin.tsx` to use Better Auth session
    - Remove the password form and `X-Admin-Password` header usage
    - Use `useSession` from auth client to check authentication
    - Update API calls to use `credentials: 'include'` instead of `X-Admin-Password` header
    - _Requirements: 5.3, 12.4_

  - [x] 8.3 Update `client/src/App.tsx` with auth routes
    - Add `/login` route pointing to `Login` page
    - Wrap `/admin` route with `ProtectedRoute` requiring `bodhi_admin` role
    - _Requirements: 5.4, 8.5, 9.5_

  - [ ]* 8.4 Write property test for invalid credentials producing safe error messages (Property 9)
    - **Property 9: Invalid credentials produce safe error messages**
    - **Validates: Requirements 8.3**

  - [ ]* 8.5 Write property test for role-based redirect after login (Property 10)
    - **Property 10: Role-based redirect after successful login**
    - **Validates: Requirements 8.2**

  - [ ]* 8.6 Write property test for authenticated user redirect on /login (Property 8)
    - **Property 8: Login redirects authenticated users by role**
    - **Validates: Requirements 8.6**

- [x] 9. Checkpoint - Ensure frontend auth flow works end-to-end
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Remove legacy authentication packages and code
  - [x] 10.1 Remove legacy auth packages from `package.json`
    - Run `npm uninstall passport passport-local express-session memorystore connect-pg-simple pg`
    - Also remove corresponding `@types` dev dependencies: `@types/passport`, `@types/passport-local`, `@types/express-session`, `@types/connect-pg-simple`, `@types/pg`
    - _Requirements: 12.5_

  - [x] 10.2 Clean up any remaining legacy auth imports
    - Remove any leftover `passport`, `express-session`, or `pg` imports across the codebase
    - Verify `nodemailer` import in `server/routes.ts` remains intact (used for contact form)
    - _Requirements: 12.5, 12.6_

  - [ ]* 10.3 Write property test for session role matching stored user role (Property 4)
    - **Property 4: Session role matches stored user role**
    - **Validates: Requirements 5.2, 6.2**

  - [ ]* 10.4 Write property test for temple admin data isolation (Property 7)
    - **Property 7: Temple admin data isolation**
    - **Validates: Requirements 6.3**

- [x] 11. Final checkpoint - Ensure all tests pass and legacy code is removed
  - Ensure all tests pass, ask the user if questions arise.
  - Verify no references to `X-Admin-Password`, `ADMIN_PASSWORD`, `bodhi2024`, `passport`, or `pg` remain in the codebase
  - Run `drizzle-kit push` to apply schema changes to the Neon database

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests use `fast-check` with minimum 100 iterations per property
- The design uses TypeScript throughout — all code examples should be TypeScript
- Better Auth handler must be mounted BEFORE `express.json()` to avoid body parsing conflicts
