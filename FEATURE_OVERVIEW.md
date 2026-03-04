# Bodhi Technology Lab — Comprehensive Feature Overview

## Executive Summary

Bodhi Technology Lab is a white-label technology platform designed specifically for Buddhist organizations (temples, monasteries, dharma centers, meditation centers, and sangha communities). The platform provides modern digital infrastructure to help these organizations manage operations, engage members, process donations, and leverage AI-powered tools for spiritual guidance.

**Website:** https://bodhilab.io  
**Target Market:** Buddhist temples, monasteries, and dharma centers globally (primary: US/Canada, secondary: Vietnam)

---

## User Personas & Roles

### 1. Bodhi Admin (`bodhi_admin`)
Internal Bodhi Labs staff responsible for:
- Managing leads and client pipeline
- Monitoring MRR and subscription metrics
- Onboarding new temple clients
- Platform administration

### 2. Temple Admin (`temple_admin`)
Temple administrators who:
- Manage their temple's subscription
- Access billing portal for upgrades/downgrades
- View invoices and payment history
- Access their giac.ngo Space (future)
- Contact support

### 3. Sangha Member / Visitor (Public)
End users who:
- Browse platform capabilities
- Submit contact inquiries
- Subscribe to service plans
- Make donations (future)
- Interact with AI Dharma agents (future)

---

## Feature Categories

## 1. Authentication & User Management

### 1.1 Better Auth Integration
- **Email/Password Authentication**: Secure login with session management stored in PostgreSQL
- **Google OAuth**: One-click sign-in with Google accounts
- **Session Management**: Persistent sessions across page refreshes with automatic expiration
- **Password Recovery**: Forgot password and reset password flows via email

### 1.2 Role-Based Access Control
- **Two User Roles**: `bodhi_admin` (internal staff) and `temple_admin` (temple clients)
- **Protected Routes**: Frontend route guards redirect unauthorized users
- **API Authorization**: Backend middleware validates sessions and roles for all protected endpoints

### 1.3 User Flows
| User Type | Login Redirect | Dashboard Access |
|-----------|---------------|------------------|
| Bodhi Admin | `/admin` | Lead Management CRM |
| Temple Admin | `/dashboard` | Temple Dashboard |
| Unauthenticated | `/login` | Public pages only |

---

## 2. Subscription & Billing (Autumn Integration)

### 2.1 Subscription Plans
| Plan | Price | Target Audience | Key Features |
|------|-------|-----------------|--------------|
| **Lay Practitioner (Basic)** | $79/month | Small temples | 1,000 users, 2 admins, shared domain, email support |
| **Devoted Practitioner (Standard)** | $199/month | Growing communities | 5,000 users, 5 admins, AI Dharma Agent, custom domain, mobile app |
| **Sangha Community (Premium)** | $499+/month | Large monasteries | 10,000+ users, 10+ admins, white-label, free donations, 24/7 support |
| **Onboarding Add-on** | $500 one-time | All tiers | 5 training sessions, 60-day setup support, data migration |

### 2.2 Billing Features
- **Checkout Flow**: Autumn-powered checkout with Stripe payment processing
- **Subscription Management**: Upgrade, downgrade, cancel via self-service portal
- **Invoice Access**: Download invoices from billing portal
- **Scheduled Changes**: Downgrades take effect at end of billing period
- **Webhook Sync**: Real-time subscription status updates via Autumn webhooks

### 2.3 Pricing Page (`/pricing`)
- Visual comparison of all three plans
- Current plan indicator for logged-in users
- Upgrade/downgrade buttons with appropriate actions
- Manage Billing button to open Autumn portal
- Cancel subscription option with period-end access

---

## 3. Lead Management CRM (Bodhi Admin)

### 3.1 Admin Dashboard (`/admin`)
- **Access**: Bodhi Admin only
- **MRR Statistics**: Total MRR, active subscriptions, new leads this month
- **Pipeline Funnel Chart**: Visual breakdown by status (new → contacted → qualified → converted → lost)
- **Subscription Status Chart**: Distribution by payment status (unpaid, active, overdue, cancelled)

### 3.2 Lead Management
- **Lead List**: All leads with contact info, status badges, and notes
- **Search & Filter**: Search by name/email/phone, filter by status and payment status
- **Status Updates**: One-click status transitions through pipeline stages
- **Notes**: Inline editing for admin notes on each lead
- **Billing Fields**: Payment status, plan tier, monthly amount, Stripe IDs

### 3.3 Lead Data Model
```
Lead {
  id, name, phone, email, interests, package, status,
  paymentStatus, planTier, monthlyAmount, nextBillingDate,
  stripeCustomerId, stripeSubscriptionId, notes, createdAt
}
```

---

## 4. Temple Admin Dashboard

### 4.1 Dashboard Features (`/dashboard`)
- **Personalized Greeting**: Welcome message with user's name
- **Subscription Info**: Current plan, renewal date, status
- **Billing Management**: Button to open Autumn billing portal
- **giac.ngo Space**: Placeholder for future digital space access
- **Support Contact**: Link to contact page
- **Sign Out**: Secure session termination

### 4.2 Subscription API
- **Endpoint**: `GET /api/temple/subscription`
- **Data**: Product ID, name, status, renewal date, scheduled changes
- **Source**: Local database (synced from webhooks) with Autumn API fallback

---

## 5. Contact & Lead Capture

### 5.1 Contact Form (`/contact`)
**Fields:**
- First Name (required)
- Last Name (required)
- Email (required)
- Organization Name (optional)
- Role (optional)
- Organization Type (optional)
- Community Size (optional)
- Message (optional)

**Behavior:**
- Client-side validation
- Loading state during submission
- Success/error toast notifications
- Form reset on success

### 5.2 Lead Submission (Subscription Interest)
**Fields:**
- Name, Phone, Email, Interests, Package selection

**Behavior:**
- Public endpoint (no auth required)
- Creates lead record in database
- Triggers notification service

---

## 6. Notification System

### 6.1 Email Notifications (Resend)
- **New Lead Alert**: Email to admin with lead details
- **New Contact Alert**: Email to admin with contact form submission
- **Reply-To**: Set to visitor's email for easy response

### 6.2 Telegram Notifications
- **Real-time Alerts**: Instant notification to Telegram group
- **Lead Info**: Temple name, contact name, plan interest
- **Fire-and-Forget**: Non-blocking, doesn't affect API response

### 6.3 Configuration
```
RESEND_API_KEY=...
ADMIN_EMAIL=...
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
```

---

## 7. AI Dharma Agents

### 7.1 Agent Collection (12 Agents)
| Agent | Vehicle | Purpose | Model |
|-------|---------|---------|-------|
| **Tâm An** | Tiểu Thừa | Healing, stress reduction | GPT-4o |
| **Giác Ngộ** | Đại Thừa | Direct awakening guidance | GPT-4o |
| **Đốn Ngộ** | Phật Thừa | Sudden awakening, concept-shattering | GPT-5 |
| **Tỉnh Thức** | Trung Thừa | Awareness and liberation | GPT-4o |
| **Kệ Vấn Ngộ** | Đại Thừa | Verses and self-inquiry | GPT-4o |
| **Vấn Tỉnh** | Trung Thừa | Self-inquiry practice | GPT-4o |
| **An Lạc** | Tiểu Thừa | Beginner foundation practice | GPT-4o |
| **Chánh Niệm** | Tiểu Thừa | Mindfulness in daily life | GPT-4o |
| **Tư Quang** | Trung Thừa | Vipassana and insight | GPT-4o |
| **Bi Trí** | Đại Thừa | Bodhisattva path | GPT-4o |
| **Vô Niệm** | Phật Thừa | Non-conceptual transmission | GPT-5 |
| **Pháp Giới** | Phật Thừa | Ultimate reality teaching | GPT-5 |

### 7.2 Buddhist Vehicles (Yāna)
- **Tiểu Thừa (Foundation)**: Personal liberation, basic mindfulness
- **Trung Thừa (Pratyekabuddha)**: Self-inquiry, dependent origination
- **Đại Thừa (Mahayana)**: Wisdom + compassion, Bodhisattva path
- **Phật Thừa (Buddha Vehicle)**: Ultimate realization, sudden awakening

### 7.3 Model Pricing
| Model | Input | Output | Context | Agents |
|-------|-------|--------|---------|--------|
| GPT-4o | $2.50/1M | $10.00/1M | 128K | 9 agents |
| GPT-5 | $5.00/1M | $15.00/1M | 200K | 3 agents |

---

## 8. Platform Capabilities (White-Label Features)

### 8.1 Custom Branding
- Upload custom logos
- Custom color palettes
- Custom domain mapping
- Pre-built Buddhist-themed templates

### 8.2 Donation Tools (Dāna System)
- Credit/Debit cards (2.5% + $0.20)
- Bank transfers (0.8% + $0.20)
- QR code payments
- Recurring donations
- Anonymous donations
- Merit dedication messages
- Automatic tax receipts

### 8.3 Event Calendar & Management
- Schedule ceremonies, meditation sessions, retreats
- RSVP tracking
- Automatic reminders (email/SMS)
- Recurring event templates
- Buddhist holiday templates (Vesak, etc.)

### 8.4 Document & Resource Library
- Organize sutras, chants, commentaries
- Audio/video file management
- Searchable database
- Access control system
- Version control for translations

### 8.5 Community Forum
- Moderated discussion areas
- "Right Speech" guidelines
- Anonymous posting options
- Study group formation
- Q&A sections

### 8.6 AI Automation Builder
- No-code visual workflow builder
- Donor acknowledgment automation
- Event reminders
- Content distribution
- Member engagement campaigns

### 8.7 Multi-Channel AI Assistant
- Website embedded chat
- Social media (Facebook, Instagram)
- Messaging apps (WhatsApp, Telegram)
- 24/7 availability
- Lineage-specific training

### 8.8 Marketing Automation
- Email campaign builder
- Automated sequences
- Analytics dashboard
- A/B testing
- Segmentation and personalization

### 8.9 CRM & Member Management
- Centralized member database
- Engagement history tracking
- Donation records
- Event attendance
- Practice milestones
- Segmentation by tradition, language, level

---

## 9. Public Pages & Content

### 9.1 Marketing Pages
| Route | Purpose |
|-------|---------|
| `/` | Landing page with hero, capabilities, pricing preview |
| `/platform` | Platform features overview |
| `/process` | How it works / onboarding process |
| `/pricing` | Subscription plans comparison |
| `/about` | Company information |
| `/career` | Job opportunities |
| `/contact` | Contact form |

### 9.2 Documentation Pages
| Route | Content |
|-------|---------|
| `/docs/overview` | Platform overview |
| `/docs/manifesto` | Company manifesto |
| `/docs/mandala-merit` | Merit system explanation |
| `/docs/merit-tokenomics` | Token economics |
| `/docs/path-of-unraveling` | Spiritual path guide |
| `/docs/tech-stack` | Technical documentation |
| `/docs/models` | AI agent models |
| `/docs/quick-start` | Getting started guide |
| `/docs/pricing` | Token pricing details |

### 9.3 Legal Pages
| Route | Content |
|-------|---------|
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

---

## 10. Internationalization

### 10.1 Language Support
- **Primary**: Vietnamese (authoritative)
- **Secondary**: English (translation)
- **Switcher**: Language toggle in header

### 10.2 Translation Coverage
- Landing page content
- Navigation labels
- Form labels and messages
- Error messages

---

## 11. Technical Infrastructure

### 11.1 Frontend Stack
- React 18 + TypeScript
- Vite build tool
- Tailwind CSS + Shadcn/ui
- React Query for server state
- Wouter for routing

### 11.2 Backend Stack
- Node.js + Express.js
- Drizzle ORM
- Neon PostgreSQL (serverless)
- Better Auth for authentication
- Autumn for billing

### 11.3 Third-Party Services
| Service | Purpose |
|---------|---------|
| Neon | Serverless PostgreSQL database |
| Better Auth | Authentication & sessions |
| Autumn | Subscription billing |
| Stripe | Payment processing (via Autumn) |
| Resend | Transactional email |
| Telegram Bot API | Real-time notifications |
| Vercel | Serverless deployment |

### 11.4 Database Schema
```
Tables:
- user (Better Auth)
- session (Better Auth)
- account (Better Auth)
- verification (Better Auth)
- organization (Better Auth)
- member (Better Auth)
- invitation (Better Auth)
- leads (CRM)
- subscriptions (Billing sync)
```

---

## 12. API Endpoints

### 12.1 Public Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/contact` | Submit contact form |
| POST | `/api/leads` | Submit subscription interest |
| POST | `/api/webhooks/autumn` | Autumn billing webhooks |
| ALL | `/api/auth/*` | Better Auth routes |

### 12.2 Protected Endpoints (Bodhi Admin)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/leads` | List all leads |
| PATCH | `/api/leads/:id` | Update lead |

### 12.3 Protected Endpoints (Temple Admin)
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/temple/subscription` | Get subscription info |

---

## 13. Security & Compliance

### 13.1 Authentication Security
- Session-based auth with secure cookies
- Password hashing via Better Auth
- CSRF protection
- Rate limiting on public endpoints

### 13.2 Data Protection
- User data stored in own database (not third-party)
- PCI compliance via Stripe (no raw card data)
- SSL/TLS encryption
- Environment variable secrets

### 13.3 Access Control
- Role-based route protection
- Server-side authorization checks
- Data isolation (temple admins see only their data)

---

## Appendix: User Journey Maps

### A. New Temple Onboarding
1. Visitor lands on homepage
2. Explores capabilities and pricing
3. Submits contact form or subscription interest
4. Bodhi Admin receives notification
5. Admin contacts lead, moves through pipeline
6. Lead converts → creates account
7. Temple Admin logs in → accesses dashboard
8. Subscribes to plan via Autumn checkout
9. Manages billing via self-service portal

### B. Existing Temple Admin
1. Temple Admin logs in
2. Views dashboard with subscription info
3. Manages billing (upgrade/downgrade/cancel)
4. Downloads invoices
5. Contacts support if needed
6. Signs out

### C. Bodhi Admin Daily Workflow
1. Admin logs in to `/admin`
2. Reviews MRR stats and charts
3. Checks new leads
4. Updates lead statuses
5. Adds notes to leads
6. Filters/searches for specific leads
7. Signs out

---

*Document generated: March 2026*  
*Version: 1.0*  
*Maintained by: Bodhi Technology Lab*
