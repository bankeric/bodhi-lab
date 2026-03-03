---
inclusion: auto
---

# Technology Stack — Bodhi Labs

## Core Stack (Existing)

### Frontend
- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/ui (pre-built accessible components)
- **State Management:** React Query for server state, React Context for UI state
- **Routing:** React Router v6

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **ORM:** Drizzle ORM
- **Language:** TypeScript

### Deployment
- **Platform:** Vercel (serverless)
- **Environment:** Serverless functions (no long-running processes)

## Third-Party Services

### Authentication — Better Auth
**Why:** 100% free & open source, self-hosted, uses your own database, native Drizzle adapter

**Key Benefits:**
- No per-user costs (free forever)
- Data stays in your Neon PostgreSQL
- Native Drizzle ORM adapter
- Organization & roles plugin built-in
- Works seamlessly with Autumn billing

**Key Packages:**
```json
{
  "better-auth": "latest"
}
```

**Server Setup (lib/auth.ts):**
```typescript
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { organization } from 'better-auth/plugins';
import { db } from './db';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [
    organization({
      // Roles: owner, admin, member (built-in)
      // Custom roles can be added
    }),
  ],
});
```

**Express.js Handler:**
```typescript
import express from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';

const app = express();

// Mount Better Auth handler BEFORE express.json()
app.all('/api/auth/*', toNodeHandler(auth));

// Then apply JSON middleware for other routes
app.use(express.json());
```

**React Client Setup (lib/auth-client.ts):**
```typescript
import { createAuthClient } from 'better-auth/react';
import { organizationClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  plugins: [organizationClient()],
});

export const { useSession, signIn, signUp, signOut } = authClient;
```

**Protect Express Routes:**
```typescript
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from './lib/auth';

// Middleware to require authentication
async function requireAuth(req, res, next) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  req.session = session;
  next();
}

// Middleware to require specific role
function requireRole(role: string) {
  return async (req, res, next) => {
    const member = req.session?.user?.role;
    if (member !== role) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  };
}

// Usage
app.get('/api/admin/leads', requireAuth, requireRole('admin'), async (req, res) => {
  // Only admins reach here
});
```

**React Session Hook:**
```tsx
import { useSession } from '@/lib/auth-client';

function Dashboard() {
  const { data: session, isPending } = useSession();
  
  if (isPending) return <Loading />;
  if (!session) return <Redirect to="/login" />;
  
  return <h1>Welcome {session.user.name}</h1>;
}
```

**User Roles for Bodhi Labs:**
- `bodhi_admin` - Internal Bodhi staff (manage leads, clients, create Spaces)
- `temple_admin` - Temple administrators (manage their subscription, access Space)

### Database — Neon (PostgreSQL)
**Why:** Serverless-compatible PostgreSQL with auto-scaling

**Critical:** Must use `@neondatabase/serverless` driver, NOT `pg` or `node-postgres`

**Implementation (HTTP for single queries - lowest latency):**
```typescript
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// Simple query
const users = await db.select().from(usersTable);
```

**Implementation (WebSocket for transactions):**
```typescript
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

// Transaction support
await db.transaction(async (tx) => {
  await tx.insert(leadsTable).values(lead);
  await tx.update(statsTable).set({ count: sql`count + 1` });
});
```

**Connection String Format:**
```
postgres://username:password@ep-cool-darkness-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
```

**Existing Schema:** Keep all current Drizzle schemas and migrations

**New Fields for `leads` table:**
- `payment_status` (unpaid | active | overdue | cancelled)
- `plan_tier` (basic | standard | premium)
- `monthly_amount` (number)
- `next_billing_date` (date)
- `stripe_customer_id` (string)
- `stripe_subscription_id` (string)
- `giac_ngo_space_id` (string)
- `giac_ngo_space_url` (string)
- `notes` (text)

### Forms — Custom React + API
**Why:** Full control, data goes directly to your database, no third-party dependency

**Implementation:**
- Build contact form with Shadcn/ui components (Input, Select, Button, etc.)
- Submit to Express API endpoint `POST /api/leads`
- Save to Neon database via Drizzle ORM
- Trigger notification function on new submission:
  - Send alert email to Bodhi Admin via Resend
  - Send alert to Telegram group via Telegram Bot API

**Form Fields:**
- Name (text)
- Email (email)
- Phone (tel)
- Temple Name (text)
- Plan Interest (dropdown: Basic/Standard/Premium)

**Notification Service:**
```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Email notification
async function notifyNewLead(lead: Lead) {
  await resend.emails.send({
    from: 'Bodhi Labs <alerts@bodhi-labs.com>',
    to: process.env.ADMIN_EMAIL!,
    subject: `New Lead: ${lead.templeName}`,
    html: `
      <h2>New temple inquiry</h2>
      <p><strong>Name:</strong> ${lead.name}</p>
      <p><strong>Email:</strong> ${lead.email}</p>
      <p><strong>Phone:</strong> ${lead.phone}</p>
      <p><strong>Temple:</strong> ${lead.templeName}</p>
      <p><strong>Plan:</strong> ${lead.planInterest}</p>
    `,
  });
}

// Telegram notification
async function notifyTelegram(lead: Lead) {
  const message = `🔔 New Lead!\n\nTemple: ${lead.templeName}\nName: ${lead.name}\nPlan: ${lead.planInterest}`;
  
  await fetch(
    `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    }
  );
}
```

### Email — Resend
**Why:** Simple API, React Email templates, reliable delivery

**Implementation:**
- Templates written in React (same stack as frontend)
- API: `resend.emails.send()`
- Free tier: 3,000 emails/month

**Key Packages:**
```json
{
  "resend": "latest",
  "@react-email/components": "latest"
}
```

**Send Email with React Template:**
```typescript
import { Resend } from 'resend';
import { jsx } from 'react/jsx-runtime';
import WelcomeEmail from './emails/WelcomeEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

const { data, error } = await resend.emails.send({
  from: 'Bodhi Labs <hello@bodhi-labs.com>',
  to: 'temple@example.com',
  subject: 'Welcome to Bodhi Labs',
  react: jsx(WelcomeEmail, { templeName: 'Chùa ABC', spaceUrl: 'https://giac.ngo/abc' }),
});
```

**Replaces:** LarkSuite SMTP + Nodemailer

### Payments & Billing — Autumn (useautumn)
**Why:** Modern billing platform with built-in React hooks, feature gating, and customer portal

**Features Used:**
- **Autumn Checkout:** Initial signup payment ($500 onboarding + subscription)
- **Autumn Billing:** Recurring subscriptions (monthly)
- **Autumn Customer Portal:** Temple self-service (upgrade/downgrade/cancel/invoices)
- **Autumn Webhooks:** Auto-update payment status
- **Feature Gating:** Check subscription access in frontend and backend

**Key Packages:**
```json
{
  "autumn-js": "latest"
}
```

**Environment Variables:**
```bash
AUTUMN_SECRET_KEY=am_sk_test_...
VITE_AUTUMN_BACKEND_URL=http://localhost:3000  # For Vite frontend
```

**Express.js Handler Setup (with Clerk):**
```typescript
import { autumnHandler } from 'autumn-js/express';
import { getAuth } from '@clerk/express';

app.use(express.json());

app.use(
  '/api/autumn',
  autumnHandler({
    identify: async (req) => {
      const { userId, sessionClaims } = getAuth(req);
      
      return {
        customerId: userId,
        customerData: {
          name: sessionClaims?.name,
          email: sessionClaims?.email,
        },
      };
    },
  })
);
```

**React Provider Setup (Vite):**
```tsx
// main.tsx
import { AutumnProvider } from 'autumn-js/react';

function App() {
  return (
    <AutumnProvider backendUrl={import.meta.env.VITE_AUTUMN_BACKEND_URL}>
      <RouterProvider router={router} />
    </AutumnProvider>
  );
}
```

**Checkout Flow:**
```typescript
import { Autumn } from 'autumn-js';

const autumn = new Autumn({ secretKey: process.env.AUTUMN_SECRET_KEY });

// Create checkout session
const { data } = await autumn.checkout({
  customer_id: userId,
  product_id: 'premium',  // basic, standard, premium
});

if (data.url) {
  // Redirect to checkout
  res.json({ url: data.url });
}
```

**Open Customer Portal:**
```tsx
import { useCustomer } from 'autumn-js/react';

function BillingButton() {
  const { openBillingPortal } = useCustomer();
  
  return (
    <Button onClick={() => openBillingPortal({ returnUrl: window.location.href })}>
      Manage Billing
    </Button>
  );
}
```

**Check Feature Access (Frontend):**
```tsx
import { useCustomer } from 'autumn-js/react';

function PremiumFeature() {
  const { check } = useCustomer();
  
  const isPremium = check({ productId: 'premium' });
  const hasFeature = check({ featureId: 'advanced-analytics' });
  
  if (!isPremium) {
    return <UpgradePrompt />;
  }
  
  return <PremiumContent />;
}
```

**Check Feature Access (Backend):**
```typescript
const { data } = await autumn.check({
  customer_id: userId,
  feature_id: 'api-calls',
  required_balance: 1,
});

if (!data.allowed) {
  return res.status(403).json({ error: 'Upgrade required' });
}
```

**Webhook Events:**
- `customer.products.updated` with scenarios: `new`, `upgrade`, `downgrade`, `renew`, `cancel`, `expired`, `past_due`

**Products to Create in Autumn Dashboard:**
- `basic` - $99/month
- `standard` - $199/month  
- `premium` - $299/month
- `onboarding` - $500 one-time (add-on)

### Charts — Recharts
**Why:** Already in package.json, React-native, good for MRR dashboard

**Usage:** MRR trends, pipeline funnel, subscription status breakdown

## Development Tools

### Code Quality
- **Linting:** ESLint with TypeScript rules
- **Formatting:** Prettier
- **Type Checking:** TypeScript strict mode

### Environment Variables
Required in `.env`:
```
DATABASE_URL=
BETTER_AUTH_SECRET=           # Generate with: openssl rand -base64 32
GOOGLE_CLIENT_ID=             # Optional: for Google OAuth
GOOGLE_CLIENT_SECRET=
AUTUMN_SECRET_KEY=
RESEND_API_KEY=
ADMIN_EMAIL=                  # Email to receive lead notifications
TELEGRAM_BOT_TOKEN=           # Telegram bot token for alerts
TELEGRAM_CHAT_ID=             # Telegram group/chat ID for alerts
GIAC_NGO_API_URL=
GIAC_NGO_API_KEY=
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:3000
VITE_AUTUMN_BACKEND_URL=http://localhost:3000
```

## Technical Constraints

### Serverless Limitations
- No long-running processes
- No WebSocket connections
- No file system writes (use Cloudflare R2 if needed later)
- 10-second function timeout on Vercel free tier

### Database Connections
- Must use HTTP-based connection pooling (`@neondatabase/serverless`)
- No traditional connection pools (`pg.Pool`)
- Drizzle ORM handles connection management

### Authentication
- All protected routes must verify session via Better Auth
- Role checks must happen server-side (never trust client)
- Session stored in your database (Neon PostgreSQL)

### Payment Processing
- Never handle raw card data (PCI compliance)
- Always use Stripe Checkout for payment collection
- Verify all webhook signatures
- Use idempotency keys for critical operations

## Performance Considerations

### Frontend
- Code splitting with React.lazy()
- React Query caching (staleTime: 5 minutes for dashboard data)
- Optimistic updates for better UX
- Image optimization (WebP format, proper sizing)

### Backend
- Database indexes on frequently queried columns (`stripe_customer_id`, `payment_status`)
- Prepared statements via Drizzle ORM
- Rate limiting on public endpoints (form submission)
- Webhook signature verification before processing

### Deployment
- Automatic deployments on push to main
- Preview deployments for PRs
- Environment variables managed in Vercel dashboard

## Migration Path

### Current Issues to Fix
1. **Database Driver:** Change from `pg` to `@neondatabase/serverless`
2. **Auth:** Replace shared password (`bodhi2024`) with Clerk
3. **Email:** Replace LarkSuite SMTP with Resend
4. **Contact Form:** Replace custom form with Tally + webhook integration

### No Breaking Changes
- Keep all existing Drizzle schemas
- Keep all existing React components
- Keep Tailwind + Shadcn/ui styling
- Keep Vercel deployment setup
