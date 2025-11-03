# Buddhist Agents Documentation Platform

## Overview

This is a full-stack web application for documenting and showcasing Buddhist AI agents. The platform provides comprehensive documentation pages including agent models, pricing information, quick start guides, and an overview of the Buddhist AI system. It combines spiritual wisdom with modern AI technology, presenting specialized Buddhist agents organized by traditional vehicle levels (Tiểu Thừa, Trung Thừa, Đại Thừa, Phật Thừa).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**Routing**: Implemented using Wouter, a lightweight routing library. The application has a single-page architecture with client-side routing between documentation pages (`/docs/overview`, `/docs/models`, `/docs/quick-start`, `/docs/pricing`).

**UI Component Library**: Shadcn/ui with Radix UI primitives. The application follows the "new-york" style variant with extensive customization through CSS variables. Components are located in `client/src/components/ui/`.

**State Management**: React Query (TanStack Query) for server state management, with local state handled via React hooks.

**Styling System**: 
- Tailwind CSS with custom configuration
- HSL-based color system with CSS custom properties for theming
- Custom design tokens for spacing (2, 4, 8, 12, 16 units)
- Serif fonts for spiritual content, monospace for technical details, sans-serif for UI elements
- Hybrid design approach combining technical documentation clarity with Buddhist spiritual aesthetics

**Key Design Patterns**:
- Component composition with shared props interfaces
- Custom utility classes for elevation effects (`hover-elevate`, `active-elevate-2`)
- Responsive grid layouts (2-column for cards, 3-4 columns for technical specs)
- Accent color system per Buddhist agent with HSL alpha transparency

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**API Structure**: RESTful API design with routes prefixed under `/api`. The routes are registered through a modular system in `server/routes.ts`.

**Session Management**: Uses `connect-pg-simple` for PostgreSQL-backed session storage.

**Development Setup**: Custom Vite integration for HMR (Hot Module Replacement) in development mode, with middleware mode enabled for seamless frontend/backend integration.

**Build Process**: 
- Frontend: Vite builds React application to `dist/public`
- Backend: esbuild bundles server code to `dist/index.js`
- Production server serves static files from the Vite build output

### Data Storage Solutions

**Database**: PostgreSQL configured through Drizzle ORM.

**ORM Configuration**: 
- Schema definition in `shared/schema.ts`
- Migrations directory: `./migrations`
- Database connection via `DATABASE_URL` environment variable
- Neon serverless PostgreSQL driver for edge deployment compatibility

**Schema Design**: Currently includes a basic users table with UUID primary keys, username/password authentication fields.

**Storage Interface**: Abstracted through `IStorage` interface in `server/storage.ts`, currently implemented with in-memory storage (`MemStorage`) for development, with PostgreSQL implementation planned.

### Authentication and Authorization

**Current State**: Basic user schema exists with username/password fields. No active authentication middleware is implemented yet.

**Planned Approach**: Session-based authentication using PostgreSQL session store via `connect-pg-simple`.

### External Dependencies

**Neon Serverless PostgreSQL**: Cloud-native PostgreSQL database with serverless driver (`@neondatabase/serverless`).

**OpenAI API Integration**: The Buddhist agents are designed to work with OpenAI's language models (GPT-4o and GPT-5), though the actual API integration is not yet implemented in the codebase. System prompts and model configurations are defined in `shared/buddhistAgents.ts`.

**UI Component Libraries**:
- Radix UI primitives for accessible, unstyled component foundation
- Embla Carousel for carousel functionality
- Lucide React for iconography
- React Hook Form with Zod for form validation

**Development Tools**:
- Replit-specific plugins for runtime error overlay, cartographer, and dev banner
- TypeScript with strict mode enabled
- Date-fns for date manipulation

**Build Dependencies**:
- Vite for frontend bundling and development server
- esbuild for backend bundling
- PostCSS with Tailwind CSS and Autoprefixer

### Agent System Design

**Agent Data Model**: Each Buddhist agent is defined with:
- Unique identifier and display name
- Tagline for quick purpose identification
- OpenAI model selection (gpt-4o or gpt-5)
- Accent color for visual identity
- Purpose description and capability list
- Complete system prompt for AI behavior
- Vehicle level classification (Tiểu Thừa through Phật Thừa)
- Optional monastery affiliation

**Pricing Model**: Token-based pricing structure aligned with OpenAI's pricing tiers, configured in `shared/buddhistAgents.ts` with separate input/output token costs per model.

**Documentation Structure**: 
- Overview page introducing the concept and system
- Agent Models page with filtering by vehicle level and search functionality
- Quick Start guide with code examples for API integration
- Token Pricing page displaying transparent cost breakdown

### Platform Capabilities (B2B Showcase)

**Recent Changes (November 3, 2025)**: Transformed the Platform page from a basic social network demo into a comprehensive B2B showcase with six in-depth capability sections targeting Buddhist organizations (temples, monasteries, meditation centers).

**Platform Page Structure**: Located at `/platform`, the page showcases white-label technology solutions with detailed feature cards designed to convert B2B customers. Each section follows a consistent pattern: Icon + Title + Description + Feature Cards (3-column responsive grid) + Interactive Demo/Examples.

**Six Platform Capability Sections**:

1. **Engage Your Sangha** (`#awaken-feed`)
   - Community Forum section with enhanced B2B messaging
   - Feature cards: Right Speech Moderation (AI-assisted flagging), Study Groups & Circles (sutra study), Anonymous Posting (sensitive questions)
   - Includes interactive social feed demo with Vietnamese sample content
   - Data-testid: card-forum-moderation, card-forum-study-groups, card-forum-anonymous

2. **Custom Branding** (`#branding`)
   - Logo & visual identity upload with theme builder
   - Domain & white-labeling with SSL certificates
   - Sovereignty messaging emphasizing temple control over data and branding
   - Data-testid: card-branding-logo, card-branding-domain, card-branding-sovereignty

3. **Donation Tools** (`#donations`)
   - Recurring donations with multiple payment cycles
   - Multiple payment methods (QR codes, cards, bank transfers)
   - Merit dedication and anonymous giving options
   - Data-testid: card-donation-recurring, card-donation-payment, card-donation-merit

4. **Document & Resource Library** (`#library`)
   - Searchable library with full-text search across PDFs
   - Access control with role-based permissions
   - Offline download capabilities and version history
   - Data-testid: card-library-search, card-library-access, card-library-offline

5. **Events & Reminder Calendar** (`#dharma-radio`)
   - Smart scheduling with recurring event templates (Vesak, Uposatha)
   - RSVP tracking with capacity limits and attendance analytics
   - Automated reminders via email, SMS, and push notifications
   - Includes interactive "Dharma Radio" live audio rooms demo
   - Data-testid: card-events-scheduling, card-events-rsvp, card-events-reminders

6. **Compassionate AI Guidance** (Community Agents section)
   - Custom knowledge training from monastery resources (PDFs, audio, video)
   - Multi-tradition modes (Zen, Pure Land, Theravāda, Tibetan)
   - Voice & text queries in 50+ languages with text-to-speech responses
   - Community Agent Marketplace showcasing pre-trained agents from temples worldwide
   - Data-testid: card-ai-training, card-ai-traditions, card-ai-voice

**Design Consistency**:
- All sections use Buddhist color palette (#991b1b for primary red, #8B4513 for browns, #EFE0BD for beige backgrounds)
- Feature cards use HSL alpha transparency for layered glass-morphism effects
- CheckCircle2 icons from lucide-react for feature bullet points
- Icons consistently placed in rounded containers with #991b1b/10 backgrounds
- Responsive grids: 1 column mobile, 2-3 columns tablet/desktop

**B2B Messaging Strategy**:
- Emphasizes sovereignty, white-labeling, and temple control over technology
- Highlights spiritual aspects (merit dedication, Right Speech, Dharma preservation)
- Focuses on practical temple needs (donations, events, moderation, AI customization)
- Uses professional B2B language while maintaining Buddhist authenticity

**Testing Compliance**:
- All feature cards include unique data-testid attributes following pattern: card-{section}-{feature}
- Interactive elements and key content blocks marked for testing
- No duplicate testids across entire Platform page