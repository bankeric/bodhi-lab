---
inclusion: auto
---

# SEO & UI/UX Guidelines — Bodhi Labs

## Current State Assessment

### What's Working
- index.html has solid base meta tags (title, description, OG, Twitter Card)
- Heading hierarchy is correct across pages (h1 → h2 → h3)
- Semantic HTML used well (header, main, section, footer)
- Alt text on images is comprehensive
- Responsive design with mobile-first Tailwind breakpoints
- Proper viewport configuration
- Font preconnect for Google Fonts performance

### Critical Gaps
- No per-page document titles (every page shows the same title in browser tab and search results)
- No robots.txt or sitemap.xml
- No structured data (JSON-LD)
- No canonical URL tag
- No SSR/prerendering (SPA — search engines may not index content properly)
- Image files use generic timestamp names (e.g., `3_1761844028297.png`) instead of descriptive SEO-friendly names
- Google Fonts request loads 25+ font families — massive performance hit on Core Web Vitals

---

## SEO Implementation Rules

### 1. Per-Page Meta Tags

Every public page must set a unique document title and meta description using the `useDocumentTitle` hook (located at `client/src/hooks/use-document-title.ts`).

Title format: `{Page Title} | Bodhi Technology Lab`

```typescript
// In every page component:
import { useDocumentTitle } from "@/hooks/use-document-title";

export default function About() {
  useDocumentTitle("About Us", "Learn about Bodhi Technology Lab's mission to empower Buddhist communities with modern technology.");
  // ...
}
```

Page title map (for reference when creating or reviewing pages):

| Route | Title | Description Keywords |
|-------|-------|---------------------|
| `/` | `Bodhi Technology Lab - White-Label Platform for Buddhist Organizations` | temple technology, Buddhist community platform, AI guidance |
| `/about` | `About Us \| Bodhi Technology Lab` | mission, Buddhist technology, dharma, community |
| `/pricing` | `Pricing Plans \| Bodhi Technology Lab` | temple subscription, Buddhist organization pricing |
| `/contact` | `Contact Us \| Bodhi Technology Lab` | get in touch, temple inquiry, Buddhist organization support |
| `/platform` | `Platform Features \| Bodhi Technology Lab` | AI agents, temple management, community tools |
| `/discovery` | `Discovery \| Bodhi Technology Lab` | explore Buddhist centers, dharma communities |
| `/career` | `Careers \| Bodhi Technology Lab` | jobs, Buddhist technology, engineering |
| `/privacy` | `Privacy Policy \| Bodhi Technology Lab` | data privacy, temple data protection |
| `/terms` | `Terms of Service \| Bodhi Technology Lab` | terms, conditions, service agreement |
| `/docs/*` | `{Doc Title} \| Bodhi Docs` | varies by doc content |

### 2. Image File Naming

All image files imported from `attached_assets/` must use descriptive, keyword-rich, kebab-case names. Generic timestamp names hurt SEO (image search), accessibility (screen readers fall back to filename), and developer experience.

Current → Recommended renames:

| Current Name | New Name | Used As |
|-------------|----------|---------|
| `3_1761844028297.png` | `buddhist-agent-tam-an-artwork.png` | Agent card art (Tâm An) |
| `15_1761844089890.png` | `buddhist-agent-giac-ngo-artwork.png` | Agent card art (Giác Ngộ) |
| `4_1761844089892.png` | `buddhist-agent-don-ngo-artwork.png` | Agent card art (Đốn Ngộ) |
| `32_1761844089890.png` | `buddhist-agent-tinh-thuc-artwork.png` | Agent card art (Tỉnh Thức) |
| `19_1761844089892.png` | `buddhist-agent-ke-van-ngo-artwork.png` | Agent card art (Kệ Văn Ngộ) |
| `5_1761844089893.png` | `buddhist-agent-van-tinh-artwork.png` | Agent card art (Vạn Tịnh) |
| `44_1762155616660.png` | `lotus-icon.png` | Lotus decorative icon |
| `2_1762155709385.png` | `buddha-icon.png` | Buddha decorative icon |
| `Bell_no_bg (1)_1762155616660.png` | `bell-icon.png` | Bell decorative icon |
| `ChatGPT Image Nov 18...png` | `hero-buddhist-temple-background.png` | Landing hero background |
| `Bodhi Logo_1763503529516.png` | `bodhi-technology-lab-logo.png` | Site logo |
| `Wordless Sutra Icon...png` | `sutra-scroll-icon.png` | Sutra decorative icon |
| `download (1-4)_*.jpg` | `buddhist-practitioner-{n}.jpg` | Avatar/testimonial images |

Rules for new images:
- Use kebab-case: `temple-dashboard-screenshot.png`, not `Temple Dashboard Screenshot.png`
- Include keywords: `buddhist-meditation-center.jpg`, not `photo1.jpg`
- Use descriptive alt text that matches the filename intent
- Prefer WebP format for photos (smaller file size, better Core Web Vitals)
- Keep decorative icons as PNG/SVG

### 3. Structured Data (JSON-LD)

Add Organization schema to the landing page and BreadcrumbList to doc pages:

```html
<!-- In index.html or injected via component -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Bodhi Technology Lab",
  "url": "https://bodhilab.io",
  "logo": "https://bodhilab.io/bodhi-technology-lab-logo.png",
  "description": "White-label technology platform for Buddhist temples, monasteries, and dharma centers",
  "sameAs": []
}
</script>
```

### 4. robots.txt

Located at `client/public/robots.txt`:

```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /dashboard
Disallow: /login
Disallow: /api/

Sitemap: https://bodhilab.io/sitemap.xml
```

### 5. sitemap.xml

Located at `client/public/sitemap.xml`. Must include all public routes. Update when adding new public pages.

### 6. Canonical URL

Add to index.html:
```html
<link rel="canonical" href="https://bodhilab.io/" />
```

For SPA with client-side routing, the canonical should be updated per-page via the `useDocumentTitle` hook.

---

## UI/UX Rules

### 1. Performance (Core Web Vitals)

The current Google Fonts request loads 25+ font families in a single request. This blocks rendering and destroys LCP (Largest Contentful Paint).

Fix: Only load fonts actually used in the design system:
- `Libre Baskerville` or `Lora` (serif — used via `font-serif` class)
- `Inter` or `DM Sans` (sans-serif — if used for UI elements)

Remove all unused font families from the Google Fonts link in `index.html`.

### 2. Semantic HTML Checklist

Every public page must include:
- Exactly one `<h1>` tag (the page title)
- `<main>` wrapping the primary content
- `<header>` for navigation
- `<nav>` for navigation links (with `aria-label` if multiple navs exist)
- `<footer>` for footer content
- `<section>` for distinct content blocks (with heading inside each)
- `<article>` for self-contained content (blog posts, doc pages)

### 3. Accessibility Minimums

- All interactive elements must be keyboard-accessible (Shadcn/ui handles this)
- All images must have `alt` text (decorative images use `alt=""`)
- Color contrast ratio must meet WCAG AA (4.5:1 for normal text, 3:1 for large text)
- Form inputs must have associated `<label>` elements
- Focus indicators must be visible (the `ring-[#991b1b]/50` pattern is good)
- Skip-to-content link for keyboard users (add to layout)

### 4. Mobile UX

- Touch targets must be at least 44x44px (check small buttons and links)
- No horizontal scroll on any viewport width
- Mobile menu must be accessible (aria-expanded, aria-controls)
- Form inputs should use appropriate `inputMode` and `type` attributes

### 5. Loading States

Every data-fetching page must show:
- Skeleton or spinner while loading (never blank screen)
- Error state with retry action
- Empty state with helpful guidance

This is already well-implemented in Dashboard and Admin pages. Maintain this pattern.

---

## Technical SEO for SPA

Since Bodhi Labs is a client-side rendered SPA (React + Vite), search engines may not fully index dynamic content. Mitigation strategies in priority order:

1. Ensure index.html meta tags are comprehensive (already done)
2. Add `robots.txt` and `sitemap.xml` (implement now)
3. Consider Vercel's Edge Middleware for dynamic meta tag injection (future)
4. Consider prerendering public pages with `vite-plugin-ssr` or `prerender-spa-plugin` (future)
5. Consider migrating public-facing pages to Next.js for SSR (long-term, only if SEO becomes critical)

For now, the static meta tags in index.html + per-page document.title + structured data provide a reasonable SEO baseline for a B2B SaaS targeting a niche market (Buddhist organizations).

---

## Quick Reference

```
New page?     → Set useDocumentTitle() with unique title + description
New image?    → Descriptive kebab-case filename + meaningful alt text
New route?    → Add to sitemap.xml if public, robots.txt Disallow if private
Performance?  → Check font loading, image sizes, bundle splitting
Accessibility → Heading hierarchy, alt text, keyboard nav, color contrast
```
