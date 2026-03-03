# Design: Lead Notifications

## Architecture Overview

Thay thế Nodemailer/LarkSuite SMTP bằng notification service layer sử dụng Resend (email) và Telegram Bot API (instant messaging).

```
Visitor → POST /api/leads or /api/contact
  → Save to DB (leads only)
  → notifyNewLead() or notifyNewContact()
    → sendEmailViaResend()     (parallel)
    → sendTelegramMessage()    (parallel)
  → Return response to visitor
```

## Component Design

### 1. Notification Service (`server/services/notifications.ts`)

Centralized notification service handling both Resend email and Telegram:

```typescript
// Resend client (lazy init)
function getResendClient(): Resend | null

// Email notifications
async function sendLeadEmailNotification(lead: Lead): Promise<void>
async function sendContactEmailNotification(contact: ContactData): Promise<void>

// Telegram notifications  
async function sendTelegramNotification(message: string): Promise<void>

// High-level orchestrators (called from routes)
async function notifyNewLead(lead: Lead): Promise<void>
async function notifyNewContact(contact: ContactData): Promise<void>
```

### 2. Route Changes (`server/routes.ts`)

- Remove all `nodemailer` imports and `createEmailTransporter()`
- Import `notifyNewLead` and `notifyNewContact` from notification service
- `POST /api/leads`: Call `notifyNewLead()` after saving lead (fire-and-forget)
- `POST /api/contact`: Call `notifyNewContact()` — if Resend not configured, return 503

### 3. Package Changes

- Add: `resend`
- Remove: `nodemailer`, `@types/nodemailer`

## Environment Variables

```bash
RESEND_API_KEY=re_...           # Resend API key
ADMIN_EMAIL=admin@bodhilab.io   # Recipient for notifications
TELEGRAM_BOT_TOKEN=...          # Telegram bot token
TELEGRAM_CHAT_ID=...            # Telegram chat/group ID
```

## Error Handling Strategy

- Resend/Telegram failures are caught and logged, never thrown to caller
- `notifyNewLead()`: Both email and Telegram are fire-and-forget
- `notifyNewContact()`: If Resend is not configured → 503 (matches current behavior). If configured but fails → log error, still return success to visitor
- Telegram is always fire-and-forget (never blocks response)

## Data Flow

### Lead Submission
1. Validate input with Zod schema
2. Save lead to DB
3. Fire `notifyNewLead(lead)` — runs email + Telegram in parallel, errors caught
4. Return `{ success: true, lead }` to visitor

### Contact Form
1. Validate required fields
2. If Resend not configured → return 503
3. Fire `notifyNewContact(contact)` — runs email + Telegram in parallel
4. Return `{ success: true }` to visitor

## Dependencies
- `resend` — Resend SDK for email delivery
- Native `fetch` — Telegram Bot API (no extra package needed)
