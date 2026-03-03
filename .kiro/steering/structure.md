---
inclusion: auto
---

# Project Structure — Bodhi Labs

## Directory Layout

```
bodhi-labs/
├── client/                    # Frontend React application
│   ├── public/               # Static assets
│   │   ├── bodhi-favicon.svg
│   │   └── favicon.png
│   ├── src/
│   │   ├── assets/           # Images, icons
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/          # Shadcn/ui components
│   │   │   ├── AgentCard.tsx
│   │   │   ├── AgentDialog.tsx
│   │   │   ├── DocsLayout.tsx
│   │   │   ├── DocsNav.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   ├── PricingTable.tsx
│   │   │   └── SubscriptionModal.tsx
│   │   ├── contexts/         # React contexts
│   │   │   └── LanguageContext.tsx
│   │   ├── hooks/            # Custom React hooks
│   │   │   ├── use-mobile.tsx
│   │   │   └── use-toast.ts
│   │   ├── lib/              # Utilities
│   │   │   ├── queryClient.ts
│   │   │   └── utils.ts
│   │   ├── pages/            # Route components
│   │   │   ├── About.tsx
│   │   │   ├── Admin.tsx
│   │   │   ├── Career.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Home.tsx
│   │   │   └── ...
│   │   ├── App.tsx           # Root component with routes
│   │   ├── main.tsx          # Entry point
│   │   └── index.css         # Global styles
│   └── index.html
├── server/                    # Backend Express application
│   ├── db/                   # Database layer
│   │   ├── schema.ts         # Drizzle schema definitions
│   │   └── index.ts          # Database connection
│   ├── routes/               # API route handlers
│   │   ├── leads.ts          # Lead management endpoints
│   │   ├── clients.ts        # Client management endpoints
│   │   ├── auth.ts           # Authentication endpoints
│   │   └── webhooks.ts       # Webhook handlers (Stripe, optionally Tally)
│   ├── emails/               # Email templates (React Email)
│   │   ├── welcome.tsx
│   │   └── lead-notification.tsx
│   ├── middleware/           # Express middleware
│   │   ├── auth.ts           # Better Auth middleware helpers
│   │   └── errorHandler.ts
│   ├── services/             # Business logic
│   │   ├── stripe.ts         # Stripe integration
│   │   ├── resend.ts         # Email service
│   │   └── giacngo.ts        # giac.ngo API client
│   └── index.ts              # Express app entry
├── api/                       # Vercel serverless functions
│   └── index.ts              # Proxy to Express app
├── docs/                      # Documentation
│   ├── prd-bodhi.md
│   ├── tech-stack.md
│   └── bodhi-okrs-2026.md
├── .kiro/                     # Kiro configuration
│   └── steering/             # Steering files
│       ├── product.md
│       ├── tech.md
│       └── structure.md
├── drizzle/                   # Database migrations
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vercel.json               # Vercel deployment config
```

## Naming Conventions

### Files
- **React Components:** PascalCase (`AgentCard.tsx`, `DocsLayout.tsx`)
- **Utilities/Hooks:** kebab-case (`use-mobile.tsx`, `use-toast.ts`)
- **API Routes:** kebab-case (`leads.ts`, `webhooks.ts`)
- **Types:** PascalCase with `.types.ts` suffix (`Lead.types.ts`)

### Code
- **Components:** PascalCase (`AgentCard`, `PricingTable`)
- **Functions:** camelCase (`fetchLeads`, `createSpace`)
- **Constants:** UPPER_SNAKE_CASE (`API_BASE_URL`, `STRIPE_PLANS`)
- **Types/Interfaces:** PascalCase (`Lead`, `SubscriptionPlan`)

## Import Patterns

### Frontend Imports Order
```typescript
// 1. External libraries
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Internal utilities
import { cn } from '@/lib/utils';

// 3. Components
import { Button } from '@/components/ui/button';
import { AgentCard } from '@/components/AgentCard';

// 4. Types
import type { Lead } from '@/types/Lead.types';

// 5. Styles (if any)
import './styles.css';
```

### Backend Imports Order
```typescript
// 1. External libraries
import express from 'express';
import Stripe from 'stripe';

// 2. Database
import { db } from '../db';
import { leadsTable } from '../db/schema';

// 3. Services
import { sendEmail } from '../services/resend';

// 4. Middleware
import { requireAuth } from '../middleware/clerk';

// 5. Types
import type { Lead } from '../types';
```

### Path Aliases
```json
{
  "@/*": ["./client/src/*"],
  "@/components/*": ["./client/src/components/*"],
  "@/lib/*": ["./client/src/lib/*"],
  "@/hooks/*": ["./client/src/hooks/*"]
}
```

## Component Architecture

### Page Components
- Located in `client/src/pages/`
- Handle routing and data fetching
- Compose smaller components
- Minimal business logic

### Reusable Components
- Located in `client/src/components/`
- Accept props, no direct data fetching
- Focused single responsibility
- Include TypeScript prop types

### UI Components (Shadcn/ui)
- Located in `client/src/components/ui/`
- DO NOT modify directly (regenerate from Shadcn CLI)
- Extend via composition, not modification

### Example Component Structure
```typescript
// client/src/components/LeadCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Lead } from '@/types/Lead.types';

interface LeadCardProps {
  lead: Lead;
  onStatusChange?: (id: string, status: string) => void;
}

export function LeadCard({ lead, onStatusChange }: LeadCardProps) {
  // Component logic
  return (
    <Card>
      {/* JSX */}
    </Card>
  );
}
```

## API Route Structure

### Express Routes Pattern
```typescript
// server/routes/leads.ts
import { Router } from 'express';
import { fromNodeHeaders } from 'better-auth/node';
import { auth } from '../lib/auth';
import { db } from '../db';
import { leadsTable } from '../db/schema';

const router = Router();

// Middleware to require authentication
async function requireAuth(req, res, next) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  
  if (!session) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  
  req.session = session;
  next();
}

// GET /api/leads - List all leads (Bodhi Admin only)
router.get('/', requireAuth, async (req, res) => {
  try {
    if (req.session.user.role !== 'bodhi_admin') {
      return res.status(403).json({ success: false, error: 'Forbidden' });
    }
    
    const leads = await db.select().from(leadsTable);
    res.json({ success: true, data: leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
```

### Webhook Routes Pattern
```typescript
// server/routes/webhooks.ts
import { Router } from 'express';
import express from 'express';

const router = Router();

// POST /api/webhooks/autumn - Handle Autumn billing events
router.post('/autumn', 
  express.json(),
  async (req, res) => {
    try {
      const event = req.body;
      
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
        }
      }
      
      res.json({ received: true });
    } catch (err) {
      console.error('Autumn webhook error:', err);
      res.status(400).json({ error: 'Webhook error' });
    }
  }
);

export default router;
```

### Response Format
All API responses follow this structure:
```typescript
{
  success: boolean;
  data?: any;        // Present on success
  error?: string;    // Present on failure
}
```

## Database Schema Patterns

### Drizzle Schema
```typescript
// server/db/schema.ts
import { pgTable, text, timestamp, integer, varchar } from 'drizzle-orm/pg-core';

export const leadsTable = pgTable('leads', {
  id: text('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  templeName: varchar('temple_name', { length: 255 }),
  planInterest: varchar('plan_interest', { length: 50 }),
  status: varchar('status', { length: 50 }).default('new'),
  paymentStatus: varchar('payment_status', { length: 50 }).default('unpaid'),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
```

### Migration Files
- Located in `drizzle/` directory
- Generated via `drizzle-kit generate`
- Applied via `drizzle-kit push` or `drizzle-kit migrate`

## State Management Patterns

### React Query (Server State)
```typescript
// Fetch data
const { data, isLoading, error } = useQuery({
  queryKey: ['leads'],
  queryFn: async () => {
    const res = await fetch('/api/leads');
    return res.json();
  },
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// Mutate data
const mutation = useMutation({
  mutationFn: async (lead: Lead) => {
    const res = await fetch('/api/leads', {
      method: 'POST',
      body: JSON.stringify(lead),
    });
    return res.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['leads'] });
  },
});
```

### React Context (UI State)
```typescript
// contexts/LanguageContext.tsx
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en');
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
```

## Styling Patterns

### Tailwind Classes
- Use utility classes directly in JSX
- Use `cn()` helper for conditional classes
- Follow mobile-first responsive design

```typescript
<div className={cn(
  "rounded-lg border p-4",
  isActive && "bg-primary text-primary-foreground",
  "hover:shadow-lg transition-shadow"
)}>
```

### Color Scheme
- Primary: `#D4A574` (warm gold)
- Background: `#EFE0BD` (cream)
- Text: Default Tailwind grays
- Use Shadcn/ui theme variables when possible

## Error Handling

### Frontend
```typescript
try {
  const result = await mutation.mutateAsync(data);
  toast({ title: "Success", description: "Lead created" });
} catch (error) {
  toast({ 
    title: "Error", 
    description: "Failed to create lead",
    variant: "destructive" 
  });
}
```

### Backend
```typescript
try {
  // Operation
} catch (error) {
  console.error('Detailed error:', error);
  res.status(500).json({ 
    success: false, 
    error: 'Generic user-facing message' 
  });
}
```

## Environment Configuration

### Development
```bash
npm run dev          # Start both frontend and backend
npm run dev:client   # Frontend only (Vite)
npm run dev:server   # Backend only (Express)
```

### Production (Vercel)
- Frontend: Vite build output served as static files
- Backend: Express app wrapped in serverless function (`api/index.ts`)
- Environment variables set in Vercel dashboard

## Testing Strategy

### Priority Testing Areas
1. Payment flow (Stripe integration)
2. Lead form submission
3. Space creation (giac.ngo API)
4. Webhook handling

### Testing Approach
- Manual testing in Vercel preview environments
- Stripe test mode with test cards
- Resend test mode for emails
- No automated tests in Phase 1 (add later if needed)
