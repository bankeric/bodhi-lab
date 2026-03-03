---
inclusion: auto
---

# Security Guidelines — Bodhi Labs

## Core Security Principles

1. **Never expose database credentials to frontend**
2. **All database operations happen server-side only**
3. **Frontend communicates with backend via authenticated API calls**
4. **Verify user identity and permissions on every API request**
5. **Validate and sanitize all user input**

---

## Database Access Rules

### ❌ NEVER DO THIS
```typescript
// Frontend code - WRONG!
import { db } from '../db';  // ❌ Never import database in frontend

function MyComponent() {
  const leads = await db.select().from(leadsTable);  // ❌ Direct DB access from frontend
}
```

### ✅ CORRECT PATTERN
```typescript
// Frontend code - CORRECT
import { useSession } from '@/lib/auth-client';

function MyComponent() {
  const { data: session, isPending } = useSession();
  
  // Fetch data via API (not direct DB access)
  const { data: leads } = useQuery({
    queryKey: ['leads'],
    queryFn: async () => {
      const response = await fetch('/api/leads', {
        credentials: 'include', // Include session cookies
      });
      if (!response.ok) throw new Error('Failed to fetch leads');
      return response.json();
    },
    enabled: !!session, // Only fetch when authenticated
  });
}

// Backend code - CORRECT
// server/routes/leads.ts
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../lib/auth';

router.get('/', async (req, res) => {
  // Get session from Better Auth
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  
  if (!session) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  
  // Check role
  if (session.user.role !== 'bodhi_admin') {
    return res.status(403).json({ success: false, error: 'Forbidden' });
  }
  
  // Now safe to query database
  const leads = await db.select().from(leadsTable);
  res.json({ success: true, data: leads });
});
```

---

## API Security Layers

### Layer 1: Authentication (Who are you?)

**All protected routes must verify session via Better Auth:**

```typescript
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../lib/auth';

// Reusable middleware
async function requireAuth(req, res, next) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  
  if (!session) {
    return res.status(401).json({ 
      success: false, 
      error: 'Unauthorized' 
    });
  }
  
  // Attach session to request for downstream use
  req.session = session;
  next();
}

// Usage
app.get('/api/leads', requireAuth, async (req, res) => {
  // req.session is now available
  const userId = req.session.user.id;
});
```

**Frontend uses session hook:**

```typescript
import { useSession } from '@/lib/auth-client';

function ProtectedPage() {
  const { data: session, isPending } = useSession();
  
  if (isPending) return <Loading />;
  if (!session) return <Navigate to="/login" />;
  
  return <Dashboard user={session.user} />;
}
```

### Layer 2: Authorization (What can you do?)

**Check user role on every sensitive operation:**

```typescript
// Middleware to require specific role
function requireRole(...allowedRoles: string[]) {
  return (req, res, next) => {
    const userRole = req.session?.user?.role;
    
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ 
        success: false, 
        error: 'Forbidden: Insufficient permissions' 
      });
    }
    
    next();
  };
}

// Usage
app.get('/api/admin/leads', 
  requireAuth,
  requireRole('bodhi_admin'),
  async (req, res) => {
    // Only Bodhi Admins reach here
  }
);

app.get('/api/temple/subscription',
  requireAuth,
  requireRole('temple_admin'),
  async (req, res) => {
    // Only Temple Admins reach here
  }
);
```

**Using Better Auth Organization Plugin for complex permissions:**

```typescript
import { organization } from 'better-auth/plugins';

// In auth config
plugins: [
  organization({
    // Built-in roles: owner, admin, member
    // Or define custom roles with specific permissions
  }),
]

// Check organization membership
const member = await auth.api.getActiveMember({
  headers: fromNodeHeaders(req.headers),
});

if (member?.role !== 'admin') {
  return res.status(403).json({ error: 'Admin access required' });
}
```

### Layer 3: Data Isolation

**Temple Admins can only see their own data:**

```typescript
// server/routes/clients.ts
router.get('/api/temple/subscription', 
  clerkMiddleware(), 
  requireAuth(), 
  requireTempleAdmin,
  async (req, res) => {
    try {
      // Get temple ID from authenticated user
      const templeId = req.auth.sessionClaims?.metadata?.templeId;
      
      if (!templeId) {
        return res.status(400).json({ 
          success: false, 
          error: 'Temple ID not found' 
        });
      }
      
      // Query ONLY this temple's data
      const subscription = await db
        .select()
        .from(subscriptionsTable)
        .where(eq(subscriptionsTable.templeId, templeId))
        .limit(1);
      
      res.json({ success: true, data: subscription[0] });
    } catch (error) {
      console.error('Error fetching subscription:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
);
```

### Layer 4: Input Validation

**Validate all user input before database operations:**

```typescript
import { z } from 'zod';

// Define schema
const updateLeadSchema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'signed', 'lost']),
  notes: z.string().max(5000).optional(),
});

router.patch('/api/leads/:id', 
  clerkMiddleware(), 
  requireAuth(), 
  requireBodhiAdmin,
  async (req, res) => {
    try {
      // Validate input
      const result = updateLeadSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          success: false, 
          error: 'Invalid input',
          details: result.error.errors 
        });
      }
      
      // Safe to use validated data
      const { status, notes } = result.data;
      
      await db
        .update(leadsTable)
        .set({ status, notes, updatedAt: new Date() })
        .where(eq(leadsTable.id, req.params.id));
      
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating lead:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
);
```

---

## Webhook Security

### Autumn Webhooks

**Handle billing events from Autumn:**

```typescript
app.post('/api/webhooks/autumn', 
  express.json(),
  async (req, res) => {
    try {
      const event = req.body;
      
      // Autumn webhook events
      if (event.type === 'customer.products.updated') {
        const { customer_id, scenario } = event.data;
        
        switch (scenario) {
          case 'new':
          case 'upgrade':
          case 'renew':
            await updateTempleStatus(customer_id, 'active');
            break;
          case 'cancel':
          case 'expired':
            await updateTempleStatus(customer_id, 'cancelled');
            break;
          case 'past_due':
            await updateTempleStatus(customer_id, 'overdue');
            break;
          case 'downgrade':
            await handleDowngrade(customer_id, event.data);
            break;
        }
      }
      
      res.json({ received: true });
    } catch (err) {
      console.error('Webhook error:', err.message);
      return res.status(400).json({ error: 'Webhook error' });
    }
  }
);
```

---

## Environment Variables Security

### Never Commit Secrets

**Add to `.gitignore`:**
```
.env
.env.local
.env.production
```

### Use Vercel Environment Variables

**Set in Vercel Dashboard:**
- Production secrets → Production environment
- Development secrets → Development environment
- Preview secrets → Preview environment

**Access in code:**
```typescript
// Always check if env var exists
const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  throw new Error('STRIPE_SECRET_KEY is not set');
}
```

### Required Environment Variables

**Backend (.env):**
```bash
# Database
DATABASE_URL=postgresql://...

# Authentication (Better Auth)
BETTER_AUTH_SECRET=...        # Generate: openssl rand -base64 32
GOOGLE_CLIENT_ID=...          # Optional: for Google OAuth
GOOGLE_CLIENT_SECRET=...

# Billing
AUTUMN_SECRET_KEY=am_sk_...

# Email
RESEND_API_KEY=re_...

# Notifications
ADMIN_EMAIL=admin@bodhi-labs.com
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...

# External API
GIAC_NGO_API_URL=https://...
GIAC_NGO_API_KEY=...
```

**Frontend (.env):**
```bash
# API URL for Better Auth and Autumn
VITE_API_URL=http://localhost:3000
VITE_AUTUMN_BACKEND_URL=http://localhost:3000
```

---

## SQL Injection Prevention

### ✅ Use Drizzle ORM (Safe)

```typescript
// Drizzle uses prepared statements automatically
const leads = await db
  .select()
  .from(leadsTable)
  .where(eq(leadsTable.email, userInput));  // ✅ Safe - parameterized
```

### ❌ Never Use Raw SQL with User Input

```typescript
// NEVER DO THIS
const leads = await db.execute(
  `SELECT * FROM leads WHERE email = '${userInput}'`  // ❌ SQL injection vulnerability
);
```

### ✅ If You Must Use Raw SQL

```typescript
import { sql } from 'drizzle-orm';

// Use parameterized queries
const leads = await db.execute(
  sql`SELECT * FROM leads WHERE email = ${userInput}`  // ✅ Safe - parameterized
);
```

---

## CORS Configuration

**Configure CORS properly for production:**

```typescript
import cors from 'cors';

const allowedOrigins = [
  'https://bodhi-labs.vercel.app',
  'https://bodhi-labs.com',
  process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : null
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
```

---

## Rate Limiting

**Protect public endpoints from abuse:**

```typescript
import rateLimit from 'express-rate-limit';

// Apply to webhook endpoints
const webhookLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests from this IP',
});

router.post('/api/webhooks/tally', webhookLimiter, async (req, res) => {
  // ...
});

// Apply to public API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use('/api/', apiLimiter);
```

---

## Error Handling Security

### ❌ Never Expose Internal Details

```typescript
// WRONG - exposes internal details
catch (error) {
  res.status(500).json({ 
    error: error.message,  // ❌ Might expose database structure
    stack: error.stack      // ❌ Exposes code paths
  });
}
```

### ✅ Log Internally, Return Generic Messages

```typescript
// CORRECT
catch (error) {
  // Log detailed error internally
  console.error('Database error:', error);
  
  // Return generic message to client
  res.status(500).json({ 
    success: false,
    error: 'Internal server error'  // ✅ Generic message
  });
}
```

---

## Frontend Security Checklist

- [ ] Never import database modules in frontend code
- [ ] All API calls include authentication token (Clerk handles this)
- [ ] Use React Query for API calls (built-in error handling)
- [ ] Validate user input before sending to API
- [ ] Display generic error messages to users
- [ ] No sensitive data in localStorage (use Clerk session)
- [ ] No API keys or secrets in frontend code

## Backend Security Checklist

- [ ] All protected routes verify session via `auth.api.getSession()`
- [ ] Role checks on every sensitive operation
- [ ] Input validation with Zod or similar
- [ ] Webhook endpoints configured properly
- [ ] Environment variables for all secrets
- [ ] CORS configured for production domains only
- [ ] Rate limiting on public endpoints
- [ ] SQL injection prevention (use Drizzle ORM)
- [ ] Generic error messages to clients
- [ ] Detailed error logging internally
- [ ] BETTER_AUTH_SECRET is strong and unique

## Deployment Security Checklist

- [ ] Environment variables set in Vercel dashboard
- [ ] `.env` files in `.gitignore`
- [ ] HTTPS enforced (Vercel does this automatically)
- [ ] Webhook endpoints configured in Autumn dashboard
- [ ] Database connection uses SSL (Neon does this automatically)
- [ ] Autumn in production mode (not sandbox)
- [ ] BETTER_AUTH_SECRET is set and secure
- [ ] OAuth credentials are production keys (not development)

---

## Security Incident Response

If a security issue is discovered:

1. **Immediately rotate compromised credentials** (API keys, database passwords)
2. **Update environment variables** in Vercel dashboard
3. **Review logs** for unauthorized access
4. **Notify affected users** if data was compromised
5. **Document the incident** and prevention measures
6. **Update security guidelines** to prevent recurrence
