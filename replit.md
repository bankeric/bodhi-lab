# Buddhist Agents Documentation Platform

## Overview
This full-stack web application documents and showcases Buddhist AI agents, integrating spiritual wisdom with modern AI. The platform features agent models, pricing, quick start guides, and an overview of the Buddhist AI system. It organizes specialized Buddhist agents by traditional vehicle levels (Tiểu Thừa, Trung Thừa, Đại Thừa, Phật Thừa) and aims to provide B2B solutions for Buddhist organizations, including white-label technology, donation tools, and AI guidance trained on spiritual texts. The project's ambition is to preserve and propagate Buddha-Dharma in the digital age by offering accessible and ethically aligned technology.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The frontend uses React with TypeScript and Vite. Routing is handled by Wouter, creating a single-page application. UI components are built with Shadcn/ui and Radix UI, following a "new-york" style with extensive customization via CSS variables. State management leverages React Query for server state and React hooks for local state. Styling is managed with Tailwind CSS, an HSL-based color system, custom design tokens, and a combination of serif, monospace, and sans-serif fonts to blend technical clarity with spiritual aesthetics. Key design patterns include component composition, custom utility classes for elevation, and responsive grid layouts.

### Backend Architecture
The backend is built with Express.js on Node.js with TypeScript, featuring a RESTful API under the `/api` prefix. Session management is planned with `connect-pg-simple` for PostgreSQL-backed storage. Development uses Vite for HMR in middleware mode, and production builds involve Vite for the frontend (`dist/public`) and esbuild for the backend (`dist/index.js`).

### Data Storage Solutions
PostgreSQL is used as the database, configured via Drizzle ORM. The schema is defined in `shared/schema.ts`, and migrations are managed separately. A basic users table is currently implemented. The storage interface is abstracted, with an in-memory implementation for development and a PostgreSQL implementation planned.

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