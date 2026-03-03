---
inclusion: auto
---

# Code Review Framework — Bodhi Labs

## Purpose

This framework defines how to review code changes, spec implementations, and pull requests for the Bodhi Labs platform. It ensures consistency, catches common issues early, and maintains the quality bar across all contributions — whether from humans or AI agents.

## Review Dimensions

Every review should evaluate changes across these six dimensions, in priority order:

### 1. Security

The highest priority. A single security gap can compromise temple data, billing info, or admin access.

Checklist:
- All protected endpoints use `requireAuth` middleware; role-restricted endpoints also use `requireRole` (never trust client-side role checks alone)
- No database imports (`server/db`, `server/storage`, Drizzle schema) in any `client/` file
- API responses never expose stack traces, SQL errors, table names, or file paths
- User input is validated with Zod schemas before any database write operation; read-only or notification-only endpoints may use manual validation
- Webhook endpoints verify signatures or are rate-limited when implemented
- Public form endpoints (`/api/contact`, `POST /api/leads`) use rate limiting via `formLimiter` in `server/index.ts`
- Environment variables are accessed via `process.env` only on the server; frontend uses only `VITE_`-prefixed vars
- No secrets, API keys, or credentials hardcoded anywhere (check string literals)
- `credentials: 'include'` is used on all authenticated frontend fetch calls
- Session data comes from `auth.api.getSession()` with `fromNodeHeaders()`, never from request body or query params
- Temple admin endpoints enforce data isolation (query scoped to `session.user.id`, never from URL params for ownership)

Red flags that block merge:
- Direct DB access from frontend code
- Missing auth middleware on a new protected endpoint
- `(req as any).body.userId` used instead of `(req as any).session.user.id` for data scoping
- Raw SQL with string interpolation instead of Drizzle ORM or parameterized `sql` template

### 2. Correctness

Does the code do what the spec says it should?

Checklist:
- Implementation matches the acceptance criteria in the relevant `requirements.md`
- API response format follows the standard `{ success: boolean, data?: any, error?: string }` shape — success responses wrap data in `data` field, error responses use `error` field with optional `details` for validation errors
- Error cases return appropriate HTTP status codes (401 for no auth, 403 for wrong role, 400 for bad input, 500 for server errors)
- Frontend loading states are handled (`isPending` → spinner, error → retry UI, no data → empty state)
- Role-based redirects are correct: `bodhi_admin` → `/admin`, `temple_admin` → `/dashboard`
- React Query `queryKey` arrays are unique and descriptive (no collisions between different data fetches)
- Mutations call `queryClient.invalidateQueries` with the correct key after success
- Zod schemas match the actual database column types and constraints

Questions to ask:
- What happens if the API returns an unexpected shape?
- What happens if the user's session expires mid-interaction?
- Are all edge cases from the spec's error handling table covered?

### 3. Architecture & Patterns

Does the code follow established project patterns?

Checklist:
- Backend routes are registered in `server/routes.ts` via `registerRoutes(app)`
- New API endpoints follow the pattern: public routes first, then protected routes grouped by role
- Frontend pages go in `client/src/pages/`, reusable components in `client/src/components/`
- Shadcn/ui components in `client/src/components/ui/` are not modified directly
- State management: React Query for server state, React Context for UI state (no Redux, no Zustand)
- Database queries use `storage` abstraction layer, not direct `db.select()` in route handlers (check `server/storage.ts`); external API calls (e.g., Autumn SDK) are fine inline since they don't touch the database
- New routes are added to `client/src/App.tsx` Router with appropriate `ProtectedRoute` wrapping — use `requiredRole` prop for role-restricted pages (e.g., `/admin` requires `bodhi_admin`); omit `requiredRole` when any authenticated user should access the page (e.g., `/dashboard`)
- Import order follows the convention: external libs → internal utils → components → types → styles
- Path aliases use `@/` prefix for client imports

Anti-patterns to flag:
- Business logic in route handlers instead of service/storage layer
- `useEffect` for data fetching instead of React Query
- Inline styles instead of Tailwind classes
- New global state when React Query cache would suffice
- Duplicating existing utility functions instead of reusing them

### 4. Serverless Compatibility

The app runs on Vercel serverless functions. Code that works locally may fail in production.

Checklist:
- No long-running processes, WebSocket connections, or file system writes
- Security headers are set via Helmet middleware (CSP disabled for Vite dev server compatibility)
- Database uses `@neondatabase/serverless` (neon-http for queries, Pool for transactions), never `pg` or `node-postgres`
- No traditional connection pools (`new Pool()` from `pg`)
- Functions complete within Vercel's timeout (10s free tier)
- No `setInterval`, `setTimeout` with long delays, or background workers
- Better Auth handler is mounted before `express.json()` middleware (see `server/index.ts` line 63)
- Autumn handler is mounted after `express.json()` (it needs parsed body + Better Auth session)
- Rate limiters are applied before route handlers via `app.use()` in `server/index.ts`
- Autumn SDK instantiation happens per-request (no module-level singleton with secrets); Resend client uses lazy singleton pattern (acceptable since it only reads the API key once)

### 5. Design System & UX

The Bodhi Labs visual identity must be consistent.

Checklist:
- Background color: `bg-[#EFE0BD]` (cream)
- Primary accent: `bg-[#991b1b]` (deep red) with `hover:bg-[#7a1515]`
- Secondary text/borders: `text-[#8B4513]` with opacity variants (`/70`, `/60`, `/30`, `/20`)
- Cards use: `bg-white/80 backdrop-blur-md border-[#8B4513]/20`
- Typography: `font-serif` on all text elements
- Icons: Lucide React (`lucide-react` package)
- Form inputs: white background, `border-[#8B4513]/30`, focus ring `ring-[#991b1b]/50`
- Buttons follow Shadcn/ui `Button` component with Bodhi color overrides
- Loading states use the spinning border pattern: `animate-spin w-8 h-8 border-4 border-[#991b1b] border-t-transparent rounded-full`
- Responsive: mobile-first with `sm:` and `md:` breakpoints
- Toast notifications use `useToast` hook with `variant: "destructive"` for errors

### 6. TypeScript Quality

Checklist:
- No `any` type unless interfacing with Better Auth session (where `(req as any).session` is the established pattern) or Autumn SDK responses (where types aren't fully available)
- Interfaces defined for API response shapes, component props, and shared data structures
- Zod schemas used for runtime validation of external input (API requests, webhook payloads)
- Optional chaining (`?.`) used when accessing potentially undefined nested properties
- No `@ts-ignore` or `@ts-nocheck` comments
- Exported types use `export type` or `export interface` (not `export const` for type-only exports)

## Review Process

### For Spec Implementations (Task Execution)

When reviewing code generated from a spec task:

1. Open the relevant `requirements.md` and `design.md` from `.kiro/specs/{feature}/`
2. Cross-reference each acceptance criterion against the implementation
3. Verify the correctness properties from `design.md` are testable in the implementation
4. Check that error handling matches the error table in the design doc
5. Confirm no scope creep — the implementation should do exactly what the spec says, nothing more

### For Bug Fixes

1. Verify the bug condition is actually addressed (not just symptoms)
2. Check that the fix doesn't break existing behavior (regression check)
3. Ensure error messages remain generic to the client while logging details server-side

### For New Files

When a new file is added:
- Does it belong in the correct directory per `structure.md`?
- Does it follow the naming convention (PascalCase for components, kebab-case for utils)?
- Is it imported and used somewhere, or is it dead code?
- If it's a new page, is the route registered in `App.tsx`?
- If it's a new API endpoint, is it in `server/routes.ts`?

## Common Issues by Area

### Backend (Express + Drizzle)

| Issue | What to look for | Fix |
|-------|-----------------|-----|
| Missing auth | New endpoint without `requireAuth` | Add `requireAuth`; add `requireRole` if endpoint is role-restricted |
| Wrong role | Endpoint uses wrong role string | Match role to `bodhi_admin` or `temple_admin` |
| No Zod on write | `req.body` used in DB write without schema validation | Add Zod schema + `safeParse` before insert/update |
| Unsafe update | `req.body` spread directly into DB update | Use Zod schema + explicit field mapping |
| Error leak | `error.message` in response body | Use generic message, `console.error` for details |
| Wrong driver | Import from `pg` or `node-postgres` | Use `@neondatabase/serverless` |

### Frontend (React + Tailwind)

| Issue | What to look for | Fix |
|-------|-----------------|-----|
| Missing loading state | No `isPending` / `isLoading` check | Add spinner or skeleton |
| Missing error state | No error handling on query/mutation | Add error UI with retry |
| Wrong redirect | Role check missing or incorrect | Use `ProtectedRoute` — add `requiredRole` only for role-restricted pages |
| Stale data | Mutation without cache invalidation | Add `onSuccess` with `invalidateQueries` |
| Style drift | Colors or fonts not matching design system | Use established Bodhi color tokens |
| Direct DB import | Import from `server/` in `client/` code | Use API fetch instead |

### Spec Compliance

| Issue | What to look for | Fix |
|-------|-----------------|-----|
| Missing requirement | Acceptance criterion not implemented | Implement or flag as intentionally deferred |
| Extra scope | Code does more than the spec requires | Remove or create a new spec for the addition |
| Wrong behavior | Implementation contradicts spec | Fix to match spec, or update spec if spec was wrong |
| Missing property test | Correctness property has no corresponding test | Add property-based test with fast-check |

## Severity Levels

- **Blocker**: Security vulnerability, data leak, auth bypass, production crash. Must fix before merge.
- **Major**: Incorrect behavior per spec, missing error handling, broken user flow. Should fix before merge.
- **Minor**: Style inconsistency, missing TypeScript type, suboptimal pattern. Can fix in follow-up.
- **Nit**: Naming preference, comment wording, import order. Optional.

## Quick Reference

```
Security    → Auth middleware? Data isolation? No secrets exposed?
Correctness → Matches spec? Error cases handled? Right status codes?
Architecture → Right file location? Right pattern? No anti-patterns?
Serverless  → Neon driver? No long-running? Timeout-safe?
Design      → Bodhi colors? font-serif? Consistent UI?
TypeScript  → Typed? Validated? No unnecessary any?
```
