# Requirements Document

## Introduction

Replace the current shared-password authentication system (`bodhi2024` via `X-Admin-Password` header) with Better Auth — a free, open-source, self-hosted authentication library that stores sessions in the project's existing Neon PostgreSQL database. This feature also fixes the database driver from `pg` (Node.js native) to `@neondatabase/serverless` for Vercel serverless compatibility. Two user roles are supported: `bodhi_admin` (internal Bodhi Labs staff) and `temple_admin` (temple management). The frontend uses Better Auth's React client (`useSession`, `signIn`, `signUp`, `signOut`) and the backend uses `toNodeHandler` to mount auth routes on Express.js.

## Glossary

- **Auth_Server**: The Better Auth server instance configured with `betterAuth()`, Drizzle adapter, and organization plugin, running on the Express.js backend
- **Auth_Client**: The Better Auth React client created with `createAuthClient()`, used in the frontend for session management and auth actions
- **Session**: A server-side record in Neon PostgreSQL that identifies an authenticated user, managed by Better Auth
- **Bodhi_Admin**: A user with the `bodhi_admin` role — internal Bodhi Labs staff who manage leads, clients, and platform operations
- **Temple_Admin**: A user with the `temple_admin` role — temple administrators who manage their own temple's subscription and data
- **Auth_Middleware**: Express.js middleware that verifies the user's session via `auth.api.getSession()` using `fromNodeHeaders()`
- **Database_Driver**: The PostgreSQL client library used to connect to Neon — must be `@neondatabase/serverless` for serverless environments
- **Protected_Route**: Any API endpoint or frontend page that requires a valid Session to access
- **Login_Page**: The frontend page where users enter email and password to authenticate via Auth_Client
- **Organization_Plugin**: Better Auth plugin that provides role-based access control and organization membership


## Requirements

### Requirement 1: Fix Neon Database Driver

**User Story:** As a developer, I want the database connection to use `@neondatabase/serverless` instead of `pg`, so that the application works correctly in Vercel's serverless environment.

#### Acceptance Criteria

1. THE Database_Driver SHALL use `@neondatabase/serverless` with `drizzle-orm/neon-http` for standard queries
2. THE Database_Driver SHALL use `Pool` from `@neondatabase/serverless` with `drizzle-orm/neon-serverless` for transactions
3. WHEN the `DATABASE_URL` environment variable is missing, THE Database_Driver SHALL throw a descriptive error before attempting a connection
4. THE Database_Driver SHALL connect to Neon PostgreSQL using the connection string format `postgres://...?sslmode=require`
5. THE Database_Driver SHALL export a `db` instance compatible with all existing Drizzle ORM queries in `server/storage.ts`
6. THE `drizzle.config.ts` SHALL continue to use the `postgresql` dialect and `DATABASE_URL` for migrations

### Requirement 2: Configure Better Auth Server

**User Story:** As a developer, I want to set up Better Auth on the Express.js backend with Drizzle adapter and organization plugin, so that the application has a proper authentication system.

#### Acceptance Criteria

1. THE Auth_Server SHALL be configured with `betterAuth()` using `drizzleAdapter(db, { provider: 'pg' })`
2. THE Auth_Server SHALL enable email and password authentication
3. THE Auth_Server SHALL include the Organization_Plugin for role management
4. WHERE Google OAuth credentials are provided, THE Auth_Server SHALL enable Google as a social login provider
5. THE Auth_Server SHALL use the `BETTER_AUTH_SECRET` environment variable for signing sessions
6. WHEN `BETTER_AUTH_SECRET` is not set, THE Auth_Server SHALL throw a descriptive error at startup
7. THE Auth_Server SHALL store all session and user data in the Neon PostgreSQL database via the Drizzle adapter


### Requirement 3: Mount Better Auth Handler on Express

**User Story:** As a developer, I want Better Auth routes mounted on Express.js, so that the frontend can call auth endpoints for sign-up, sign-in, sign-out, and session management.

#### Acceptance Criteria

1. THE Auth_Server handler SHALL be mounted at `/api/auth/*` using `toNodeHandler(auth)` from `better-auth/node`
2. THE Auth_Server handler SHALL be mounted BEFORE `express.json()` middleware to avoid body parsing conflicts
3. WHEN a request is made to `/api/auth/*`, THE Auth_Server SHALL handle the request and return the appropriate auth response
4. THE Auth_Server handler SHALL support cookie-based session management with `credentials: 'include'` from the frontend

### Requirement 4: Create Auth Middleware for Protected Routes

**User Story:** As a developer, I want reusable Express middleware that verifies sessions and checks roles, so that API endpoints are properly secured.

#### Acceptance Criteria

1. THE Auth_Middleware SHALL verify the user's Session by calling `auth.api.getSession()` with `fromNodeHeaders(req.headers)`
2. WHEN a request lacks a valid Session, THE Auth_Middleware SHALL return HTTP 401 with `{ success: false, error: 'Unauthorized' }`
3. WHEN a valid Session exists, THE Auth_Middleware SHALL attach the session object to `req.session` and call `next()`
4. THE Auth_Middleware SHALL provide a `requireRole()` function that accepts one or more allowed role strings
5. WHEN the authenticated user's role does not match any allowed role, THE `requireRole()` function SHALL return HTTP 403 with `{ success: false, error: 'Forbidden' }`
6. THE Auth_Middleware SHALL replace all existing `X-Admin-Password` header checks in `server/routes.ts`


### Requirement 5: Bodhi Admin Authentication

**User Story:** As a Bodhi Admin, I want to log in with my email and password, so that I can access the lead management CRM securely.

#### Acceptance Criteria

1. WHEN a Bodhi_Admin submits valid email and password on the Login_Page, THE Auth_Client SHALL create a Session that persists across page refreshes
2. WHEN a Bodhi_Admin is authenticated, THE Auth_Client SHALL provide the user's role as `bodhi_admin` via the `useSession` hook
3. WHEN a Bodhi_Admin navigates to `/admin`, THE frontend SHALL display the leads dashboard without requiring a password prompt
4. WHEN an unauthenticated user navigates to `/admin`, THE frontend SHALL redirect the user to the Login_Page
5. WHEN a Bodhi_Admin clicks sign out, THE Auth_Client SHALL destroy the Session and redirect to the Login_Page

### Requirement 6: Temple Admin Authentication

**User Story:** As a Temple Admin, I want to log in with my email and password, so that I can manage my temple's data securely.

#### Acceptance Criteria

1. WHEN a Temple_Admin submits valid email and password on the Login_Page, THE Auth_Client SHALL create a Session that persists across page refreshes
2. WHEN a Temple_Admin is authenticated, THE Auth_Client SHALL provide the user's role as `temple_admin` via the `useSession` hook
3. WHEN a Temple_Admin accesses API endpoints, THE Auth_Middleware SHALL verify that the Temple_Admin can only access data belonging to the Temple_Admin's own temple
4. WHEN a Temple_Admin attempts to access Bodhi_Admin-only endpoints (e.g., `GET /api/leads`), THE Auth_Middleware SHALL return HTTP 403


### Requirement 7: Frontend Auth Client Setup

**User Story:** As a developer, I want a configured Better Auth React client, so that frontend components can manage authentication state and call auth APIs.

#### Acceptance Criteria

1. THE Auth_Client SHALL be created with `createAuthClient()` from `better-auth/react` and configured with `baseURL` pointing to the API server
2. THE Auth_Client SHALL include the `organizationClient()` plugin
3. THE Auth_Client SHALL export `useSession`, `signIn`, `signUp`, and `signOut` functions for use in React components
4. THE Auth_Client SHALL send requests with `credentials: 'include'` for cookie-based session management
5. WHEN the `useSession` hook returns `isPending: true`, THE frontend SHALL display a loading indicator
6. WHEN the `useSession` hook returns no session, THE Protected_Route components SHALL redirect to the Login_Page

### Requirement 8: Login Page

**User Story:** As a user (Bodhi Admin or Temple Admin), I want a login page with email and password fields, so that I can authenticate and access my dashboard.

#### Acceptance Criteria

1. THE Login_Page SHALL display email and password input fields and a submit button
2. WHEN the user submits valid credentials, THE Login_Page SHALL call `signIn.email()` from Auth_Client and redirect to the appropriate dashboard based on user role
3. WHEN the user submits invalid credentials, THE Login_Page SHALL display a descriptive error message without exposing internal details
4. THE Login_Page SHALL follow the existing Bodhi Labs design system (Tailwind CSS, Shadcn/ui, `#EFE0BD` background, `#991b1b` accent)
5. THE Login_Page SHALL be accessible at the `/login` route
6. WHEN an already-authenticated user navigates to `/login`, THE Login_Page SHALL redirect to the appropriate dashboard


### Requirement 9: Protected Route Guards (Frontend)

**User Story:** As a developer, I want reusable route guard components, so that protected pages automatically redirect unauthenticated users to the login page.

#### Acceptance Criteria

1. THE frontend SHALL provide a `ProtectedRoute` component that wraps protected pages
2. WHEN an unauthenticated user accesses a Protected_Route, THE `ProtectedRoute` component SHALL redirect to `/login`
3. WHEN an authenticated user with an insufficient role accesses a role-restricted route, THE `ProtectedRoute` component SHALL display an "Access Denied" message or redirect to the appropriate dashboard
4. WHILE the Session is being loaded (`isPending`), THE `ProtectedRoute` component SHALL display a loading indicator
5. THE `/admin` route SHALL be wrapped with `ProtectedRoute` requiring the `bodhi_admin` role

### Requirement 10: Protected API Routes (Backend)

**User Story:** As a developer, I want all sensitive API endpoints protected by Better Auth session verification, so that unauthorized users cannot access or modify data.

#### Acceptance Criteria

1. THE `GET /api/leads` endpoint SHALL require a valid Session with the `bodhi_admin` role
2. THE `PATCH /api/leads/:id` endpoint SHALL require a valid Session with the `bodhi_admin` role
3. THE `POST /api/admin/auth` endpoint SHALL be removed since authentication is handled by Better Auth at `/api/auth/*`
4. THE `POST /api/contact` endpoint SHALL remain publicly accessible (no authentication required)
5. THE `POST /api/leads` endpoint (lead submission from subscription form) SHALL remain publicly accessible
6. THE `POST /api/create-payment-intent` endpoint SHALL remain publicly accessible for donation processing


### Requirement 11: Database Schema for Better Auth

**User Story:** As a developer, I want Better Auth's required tables created in the Neon database, so that user accounts, sessions, and organization data are persisted.

#### Acceptance Criteria

1. THE database schema SHALL include Better Auth's required tables: `user`, `session`, `account`, and `verification`
2. THE database schema SHALL include Better Auth's organization tables: `organization`, `member`, and `invitation`
3. THE `user` table SHALL include a `role` field to store `bodhi_admin` or `temple_admin`
4. THE existing `users` table in `shared/schema.ts` SHALL be migrated or replaced by Better Auth's `user` table
5. THE existing `leads` table SHALL remain unchanged
6. THE schema changes SHALL be applied via Drizzle Kit migrations (`drizzle-kit push` or `drizzle-kit generate`)

### Requirement 12: Remove Legacy Authentication

**User Story:** As a developer, I want all traces of the shared-password authentication removed, so that the codebase has a single, secure auth mechanism.

#### Acceptance Criteria

1. THE `ADMIN_PASSWORD` constant and `bodhi2024` default value SHALL be removed from `server/routes.ts`
2. THE `POST /api/admin/auth` endpoint SHALL be removed from `server/routes.ts`
3. THE `X-Admin-Password` header checks SHALL be removed from all API endpoints
4. THE frontend Admin page SHALL be refactored to use `useSession` from Auth_Client instead of the password form
5. THE `passport`, `passport-local`, `express-session`, `memorystore`, and `connect-pg-simple` packages SHALL be removed from `package.json` since they are replaced by Better Auth
6. THE `nodemailer` import in `server/routes.ts` SHALL remain (used for contact form email), but the LarkSuite SMTP transporter is a separate concern outside this feature scope

### Requirement 13: Environment Variables

**User Story:** As a developer, I want all required environment variables documented and validated, so that the application fails fast with clear errors if misconfigured.

#### Acceptance Criteria

1. THE application SHALL require `BETTER_AUTH_SECRET` environment variable for session signing
2. THE application SHALL require `DATABASE_URL` environment variable for Neon PostgreSQL connection
3. WHERE `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are provided, THE Auth_Server SHALL enable Google OAuth
4. WHERE Google OAuth environment variables are missing, THE Auth_Server SHALL operate with email/password authentication only
5. THE frontend SHALL use `VITE_API_URL` environment variable to configure the Auth_Client base URL
6. WHEN a required environment variable is missing, THE application SHALL throw a descriptive error at startup identifying the missing variable
