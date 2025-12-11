# Bodhi Technology Lab - Buddhist B2B Platform

## Overview
Bodhi Technology Lab is a B2B development studio serving Buddhist organizations with white-label technology solutions. The platform provides temples, monasteries, and dharma centers worldwide with donation tools, AI guidance, resource libraries, and custom branding. Core philosophy: "Công nghệ nơi đây, không vì lợi danh - chỉ một lòng thành, hộ trì Chánh Pháp" (Technology here serves not profit, but sincerely upholds the True Dharma).

## Recent Changes (December 2025)
- Added subscription pop-up modal for lead collection when users click pricing package buttons
- Created password-protected Admin CRM page (/admin) for managing leads
- Lead collection includes: name, phone, email, specific needs/interests, package selected
- Leads stored in PostgreSQL with status tracking (new, contacted, qualified, converted, lost)
- Email notifications sent to om@bodhilab.io when new leads are submitted
- Footer updated with email icon and om@bodhilab.io contact
- Admin password default: "bodhi2024" (can be set via ADMIN_PASSWORD env var)

## Previous Changes (November 2025)
- Updated hero section to be more practical "About Us" style while keeping philosophical Vietnamese phrase
- Improved CTA buttons targeting Buddhist organizations: "Schedule a Consultation" and "See Our Solutions"
- Enhanced logo visibility with larger size (48px headers, 44px footers) and brightness/contrast filters
- Replaced background animation with rotating red enso circle image
- All pages now use official Bodhi Technology Lab logo image

## User Preferences
Preferred communication style: Simple, everyday language.
Hero section style: Practical business-focused content with preserved philosophical essence.

## System Architecture

### Frontend Architecture
The frontend uses React with TypeScript and Vite. Routing is handled by Wouter, creating a single-page application. UI components are built with Shadcn/ui and Radix UI, following a "new-york" style with extensive customization via CSS variables. State management leverages React Query for server state and React hooks for local state. Styling is managed with Tailwind CSS, an HSL-based color system, custom design tokens, and a combination of serif, monospace, and sans-serif fonts to blend technical clarity with spiritual aesthetics. Key design patterns include component composition, custom utility classes for elevation, and responsive grid layouts.

### Backend Architecture
The backend is built with Express.js on Node.js with TypeScript, featuring a RESTful API under the `/api` prefix. Session management is planned with `connect-pg-simple` for PostgreSQL-backed storage. Development uses Vite for HMR in middleware mode, and production builds involve Vite for the frontend (`dist/public`) and esbuild for the backend (`dist/index.js`).

### Data Storage Solutions
PostgreSQL is used as the database, configured via Drizzle ORM. The schema is defined in `shared/schema.ts`, and migrations are managed with `drizzle-kit push`. Tables include:
- `users`: Basic user accounts
- `leads`: CRM lead management (name, phone, email, interests, package, status, createdAt)

The storage interface is abstracted in `server/storage.ts` using DatabaseStorage class for PostgreSQL operations.

### Authentication and Authorization
A basic user schema exists, but active authentication middleware is not yet implemented. Session-based authentication using a PostgreSQL session store is the planned approach.

### Agent System Design
Each Buddhist agent includes a unique ID, display name, tagline, OpenAI model selection (gpt-4o or gpt-5), accent color, purpose, capability list, complete system prompt, and vehicle level classification. Pricing is token-based, aligned with OpenAI's tiers. Documentation covers an overview, agent models (with filtering), quick start guides, and transparent token pricing.

### Platform Capabilities (B2B Showcase)
The `/platform` page showcases white-label technology solutions for Buddhist organizations with six sections: Document & Resource Library, Donation Tools, Custom Branding, Engage Your Sangha (community forum), Events & Reminder Calendar, and Compassionate AI Guidance. These sections feature detailed cards, emphasizing sovereignty, white-labeling, and spiritual aspects. Four professional company pages (About, Career, Privacy, Terms) are also included, maintaining a consistent Buddhist spiritual aesthetic and professional B2B content.

## External Dependencies

-   **Neon Serverless PostgreSQL**: Cloud-native PostgreSQL database.
-   **OpenAI API Integration**: Planned for Buddhist agents using GPT-4o and GPT-5 models.
-   **UI Component Libraries**:
    -   Radix UI: Accessible, unstyled component primitives.
    -   Shadcn/ui: React UI components.
    -   Embla Carousel: Carousel functionality.
    -   Lucide React: Iconography.
    -   React Hook Form with Zod: Form validation.
-   **Development Tools**:
    -   Vite: Frontend bundling and development server.
    -   esbuild: Backend bundling.
    -   PostCSS with Tailwind CSS and Autoprefixer.
    -   TypeScript.
    -   Date-fns: Date manipulation.
    -   Replit-specific plugins (runtime error overlay, cartographer, dev banner).