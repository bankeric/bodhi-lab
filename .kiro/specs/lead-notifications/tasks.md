# Tasks: Lead Notifications

## Task 1: Install Resend and remove Nodemailer
- [x] Install `resend` package
- [x] Remove `nodemailer` and `@types/nodemailer` from dependencies
- [x] Verify package.json is clean

## Task 2: Create notification service
- [x] Create `server/services/notifications.ts`
- [x] Implement `getResendClient()` with lazy initialization
- [x] Implement `sendLeadEmailNotification(lead)` — sends formatted email via Resend
- [x] Implement `sendContactEmailNotification(contact)` — sends formatted email via Resend
- [x] Implement `sendTelegramNotification(message)` — sends message via Telegram Bot API
- [x] Implement `notifyNewLead(lead)` — orchestrates email + Telegram in parallel
- [x] Implement `notifyNewContact(contact)` — orchestrates email + Telegram in parallel
- [x] All functions handle errors gracefully (catch + log, never throw)

## Task 3: Update routes to use notification service
- [x] Remove all `nodemailer` imports and `createEmailTransporter()` from routes.ts
- [x] Remove `Stripe` import if unused (keep if payment intent route still uses it)
- [x] Import `notifyNewLead` and `notifyNewContact` from notification service
- [x] Update `POST /api/leads` to call `notifyNewLead()` after saving lead
- [x] Update `POST /api/contact` to use `notifyNewContact()` instead of nodemailer
- [x] Keep contact form 503 behavior when Resend is not configured

## Task 4: Update environment variables
- [x] Remove `SMTP_PASSWORD` comment from .env
- [x] Ensure `RESEND_API_KEY`, `ADMIN_EMAIL`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` placeholders exist in .env
- [x] Update .env comments for clarity

## Task 5: Verify TypeScript compilation
- [x] Run `tsc` to verify no type errors
- [x] Verify all imports resolve correctly
