# Bodhi Lab - Branding Guidelines

## Brand Identity

**Project Name**: Bodhi Lab (Bodhi Technology Lab)  
**Full Name**: Bodhi Technology Lab  
**Purpose**: A studio-first builder hub for Buddhist organisations—providing sacred technology solutions, AI agents, and white-label platforms to temples, monasteries, and meditation centres worldwide

**Core Philosophy**: Technical precision meets spiritual intention—we partner with monks, nuns, and Buddhist communities to build fast, righteous technology that serves the Dharma, not the market.

## Target Audience

**Primary**: Temples, monasteries, meditation centres, and Buddhist organisations seeking digital transformation
**Secondary**: Monastic leaders, Dharma teachers, and sangha administrators
**Geography**: Global, with bilingual Vietnamese/English support

## Mission

1. **Recreate Electronic Mandalas of the Buddhas** - Unite the global sangha in real-time awakening through digital platforms
2. **Flourish with Sovereignty and Dignity** - Help temples thrive, self-fund, and preserve lineages with technology that strengthens autonomy
3. **Respond to Digital Afflictions** - Offer antidotes to the Dharma-ending age: digital Bodhi that cultivates mindfulness, compassion, and insight

## Principles

- **Build Fast and Righteous**: Technology serves Dharma, not the market; we move quickly without sacrificing ethics
- **No Use, No Build**: If a tool doesn't directly cut suffering, we don't make it
- **Presence Over Metrics**: Success means the tool is no longer needed; inner transformation matters more than engagement statistics
- **Transparency, Not Exploitation**: User data is sovereign; no surveillance, manipulation, or hidden agendas
- **Censorship Resistance**: Dharma must never be silenced by worldly powers

## Service Offerings

1. **Sacred Pods**: Dedicated teams (frontend, backend, QA, PM, AI specialists) for your temple's needs
2. **White-Label Platforms**: Custom branding, donation tools, event calendars, AI guidance, document libraries
3. **Sprint & Deploy**: Weekly demos, strict QA, feature flags, monitoring, and quarterly hardening
4. **Decentralized Infrastructure**: Elastic, censorship-resistant compute that scales to zero when idle

---

## Color Palette

### Primary Colors

#### Light Mode
- **Background**: `#EFE0BD` (Warm parchment beige)
  - HSL: `42 61% 84%`
  - Use: Main page background, creates warm paper-like aesthetic

- **Primary (Dark Red)**: `#991b1b`
  - HSL: `0 70% 35%`
  - Use: Primary CTA buttons, headings, important UI elements
  - Hex: Dark burgundy red, symbolizing spiritual depth

- **Brown Accent**: `#8B4513` (SaddleBrown)
  - Use: Text accents, borders, secondary elements
  - Opacity variants: `#8B4513/70`, `#8B4513/50`, `#8B4513/20`

#### Card & Surface Colors
- **Card Background**: `#f6efe0` (Lighter cream)
  - HSL: `41 52% 90%`
  - Use: Card containers, elevated surfaces

- **Sidebar**: `#e8ddc8` (Warm beige-gray)
  - HSL: `42 55% 88%`
  - Use: Sidebar navigation, secondary panels

#### Dark Mode
- **Background**: `hsl(24 5% 10%)` (Deep warm charcoal)
- **Primary**: `hsl(14 85% 32%)` (Rich terra cotta)
- **Card**: `hsl(24 6% 13%)` (Slightly elevated dark surface)
- **Foreground**: `hsl(42 30% 92%)` (Warm off-white text)

### Agent Accent Colors
Each Buddhist agent has a unique accent color for visual identification:

- **Tâm An**: `#7bb89b` (Peaceful green)
- **Giác Ngộ**: `#5f6cf1` (Deep wisdom purple)
- **Đốn Ngộ**: `#f05d5e` (Awakening red)
- **Tỉnh Thức**: `#71b7e6` (Clear awareness blue)
- **Kệ Vấn Ngộ**: `#b38df6` (Contemplative lavender)
- **Vấn Tỉnh**: `#e6b871` (Mindful gold)
- **An Lạc**: `#8bc9a8` (Tranquil jade)
- **Chánh Niệm**: `#95d5b2` (Mindful mint)
- **Tư Quang**: `#6ba3d4` (Insight sky)
- **Bi Trí**: `#f4a261` (Compassionate amber)
- **Vô Niệm**: `#d62828` (Direct transmission crimson)
- **Pháp Giới**: `#c1121f` (Ultimate reality ruby)

**Usage Rules**:
- Use agent colors ONLY for: left card borders, badge backgrounds (10% opacity), icon highlights
- NEVER use as primary button colors (maintain brand consistency)

### Semantic Colors

#### Borders & Outlines
- **Border**: `#2c2c2c` at 20% opacity (`#2c2c2c/20`)
- **Border Style**: 2px solid, consistent across all components
- **Card Border**: `hsl(41 35% 75%)` in light mode

#### Shadows
- **Card Shadow**: `0 2px 0 #00000030` (subtle elevation)
- **Button Shadow**: `shadow-sm` (minimal depth)
- **Philosophy**: No heavy drop shadows—maintain paper-like aesthetic

#### Text Hierarchy
- **Foreground (Primary Text)**: `hsl(0 0% 17%)` (Dark charcoal)
- **Muted (Secondary Text)**: `hsl(0 0% 40%)` (Medium gray)
- **Subdued (Tertiary)**: `#8B4513/50` (Brown at 50% opacity)

---

## Typography System

### Font Families

**Primary (Serif)**:
```css
font-family: 'Libre Baskerville', 'Lora', 'Merriweather', Georgia, serif;
```
- Use: Headings, body text, Vietnamese/English content, spiritual content
- Purpose: Creates contemplative, scholarly aesthetic
- Class: `font-serif`

**Secondary (Sans-Serif)**:
```css
font-family: 'Inter', 'Open Sans', sans-serif;
```
- Use: UI elements, navigation, buttons, labels
- Purpose: Clean, modern readability for interface elements
- Class: `font-sans`

**Monospace (Code)**:
```css
font-family: 'JetBrains Mono', 'Fira Code', monospace;
```
- Use: Model names, technical specs, code snippets, API examples
- Purpose: Technical precision
- Class: `font-mono`

### Type Scale & Hierarchy

| Element | Size | Weight | Font | Use Case |
|---------|------|--------|------|----------|
| **Page Title** | `text-4xl` (36px) | `font-bold` | Serif | Main page headings |
| **Section Headers** | `text-3xl` (30px) | `font-bold` | Serif | Major sections |
| **Subsection** | `text-2xl` (24px) | `font-semibold` | Serif | Secondary sections |
| **Agent Names** | `text-xl` (20px) | `font-bold` | Serif | Card titles |
| **Agent Taglines** | `text-base` (16px) | `font-semibold italic` | Serif | Taglines, quotes |
| **Body Text** | `text-base` (16px) | `font-normal` | Serif | Paragraphs |
| **Labels** | `text-sm` (14px) | `uppercase tracking-wide` | Sans | Form labels, categories |
| **Technical** | `text-sm` (14px) | `font-medium` | Mono | Model names, specs |
| **Caption** | `text-xs` (12px) | `font-normal` | Sans | Metadata, timestamps |

### Typography Guidelines
- **Line Height**: Generous spacing (1.6-1.8) for readability
- **Letter Spacing**: Slight tracking on uppercase labels (`tracking-wide`)
- **Text Color**: Use foreground hierarchy (primary → muted → subdued)
- **Vietnamese Text**: Always use serif for cultural authenticity

---

## Layout System

### Spacing Primitives
Use Tailwind spacing units: **2, 4, 8, 12, 16, 20, 24**

```
p-2   = 8px    (Tight internal spacing)
p-4   = 16px   (Component padding)
p-6   = 24px   (Card padding)
p-8   = 32px   (Section padding)
p-12  = 48px   (Large section padding)
p-16  = 64px   (Major section spacing)
p-20  = 80px   (Hero section padding)
```

**Spacing Rules**:
- Component padding: `p-6`, `p-8`
- Section spacing: `space-y-16`, `space-y-20`, `py-16`, `py-20`
- Card gaps: `gap-6`, `gap-8`
- Related content: `space-y-2`, `space-y-4`
- Generous whitespace between sections: `py-20`, `py-24`

### Grid System

- **Agent Cards**: 
  - Desktop: `grid-cols-3` or `grid-cols-2`
  - Tablet: `md:grid-cols-2`
  - Mobile: `grid-cols-1`
  - Gap: `gap-6`

- **Feature Comparison**: 3-4 columns for technical specs
- **Pricing Tables**: Full-width responsive with sticky headers

### Container Widths

```
max-w-7xl  = 1280px  (Main content container)
max-w-6xl  = 1152px  (Documentation content)
max-w-4xl  = 896px   (Narrow intro content)
max-w-3xl  = 768px   (Social feed, focused content)
max-w-2xl  = 672px   (Reading width)
```

### Responsive Breakpoints

```
sm: 640px   (Mobile landscape)
md: 768px   (Tablet)
lg: 1024px  (Desktop)
xl: 1280px  (Large desktop)
```

---

## Component Library

### Buttons

#### Primary CTA
```css
Background: #991b1b (dark red)
Text: white
Border: 2px solid #2c2c2c/20
Border Radius: rounded-xl (12px)
Padding: px-6 py-3
Shadow: shadow-md
Font: font-serif font-semibold
```

**Hover State**: Darker background `#7a1515`, maintains shadow

#### Secondary Button
```css
Background: Transparent or white/50
Border: 2px solid #2c2c2c/20
Text: #2c2c2c or #991b1b
Border Radius: rounded-xl
Padding: px-6 py-3
```

#### Retro Shadowed Button (Signature Style)
```css
Background: #f3ead7 (parchment)
Border: 2px solid #2c2c2c
Box Shadow: 0 2px 0 #00000030, 0 0 0 3px #00000010 inset
Border Radius: rounded-2xl
Transition: All 200ms
```

**Active State**: `bg-[#d4af37]` (golden), pressed effect

#### Icon Buttons
```css
Size: w-12 h-12
Border Radius: rounded-2xl or rounded-full
Background: Circular with agent accentColor
Icon: Lucide React icons, w-5 h-5
```

### Cards

#### Standard Agent Card
```css
Background: white/50 backdrop-blur-md
Border: 2px solid #8B4513/20
Border Radius: rounded-2xl
Padding: p-6
Shadow: Minimal elevation
Hover: border-[#991b1b]/40, shadow-xl
```

**Structure**:
1. Image/Artwork area (h-32, Buddhist artwork with zoom on hover)
2. Content padding (p-6)
3. Agent name (text-xl font-bold)
4. Tagline (italic, text-sm)
5. Purpose/Description
6. Metadata (users, likes)
7. CTA button

#### Card Variations
- **Elevated**: Add `shadow-lg` on hover
- **Accent Border**: 4px left border using agent's `accentColor`
- **Backdrop Blur**: `backdrop-blur-md` for glass effect over backgrounds

### Navigation

#### Header
```css
Position: Sticky top-0
Background: white/50 or #EFE0BD/95
Backdrop: backdrop-blur-md
Border Bottom: 2px solid #8B4513/20
Padding: p-4
Shadow: shadow-sm
```

#### Links
- Default: `text-[#8B4513]/70`
- Hover: `text-[#991b1b]`
- Active: `text-[#991b1b] font-semibold`

### Forms & Inputs

#### Text Input
```css
Border: 2px solid #8B4513/20
Border Radius: rounded-xl
Padding: px-4 py-3
Background: white/30
Focus: ring-2 ring-[#991b1b]
```

#### Search Bar (Hero)
```css
Width: max-w-2xl
Height: h-16
Border: 2px solid white/40
Backdrop: backdrop-blur-xl
Border Radius: rounded-full
Shadow: shadow-2xl
Transition: All 300ms ease-in-out
```

**Focus State**: Scale up, enhanced shadow, full opacity

### Badges

```css
Border Radius: rounded-lg or rounded-full
Padding: px-3 py-1
Font: font-mono text-xs font-semibold
Background: agent.accentColor at 20% opacity
Text: agent.accentColor (full opacity)
```

**Model Badges**: `gpt-4o`, `gpt-5` in monospace

### Icons

**Icon Treatment**:
- Source: Lucide React (`lucide-react`)
- Size: `w-5 h-5` (default), `w-4 h-4` (small), `w-8 h-8` (large)
- Color: Inherits text color or uses `text-[#991b1b]`
- Background: Circular containers with subtle background
- Use: Actions, visual cues, status indicators

**Company Logos**: Use `react-icons/si` for brand icons

---

## Design Principles

### 1. Warm Spiritual Aesthetic
- Parchment-like backgrounds (`#EFE0BD`)
- Serif typography for contemplative feel
- Buddhist artwork and imagery
- Warm color temperature throughout

### 2. Technical Precision
- Clear information hierarchy
- Monospace for technical specs
- Structured data presentation
- Scannable documentation format

### 3. Minimal Elevation
- Subtle shadows only (`0 2px 0 #00000030`)
- Paper-like flatness
- No heavy drop shadows
- Border-based separation

### 4. Retro Modern Fusion
- Shadowed buttons (retro game aesthetic)
- Backdrop blur effects (modern)
- Rounded corners (friendly, modern)
- Parchment textures (vintage)

### 5. Bilingual Excellence
- Vietnamese as primary/authoritative language
- English translations in parallel
- Serif fonts for Vietnamese authenticity
- Clear language switching UI

### 6. Interaction Restraint
- Subtle hover states (100-150ms transitions)
- Minimal animation
- Focus on usability over delight
- Smooth scroll behavior only

---

## Visual Treatment Guidelines

### Backgrounds

**Gradient Patterns** (Parchment Effect):
```css
background: linear-gradient(
  135deg,
  hsl(42, 61%, 84%) 0%,
  hsl(41, 52%, 90%) 100%
)
```

**Section Alternation**:
- Primary sections: `bg-[#EFE0BD]/50`
- Alternate sections: Pure `#EFE0BD` or white/50
- Never stark white—always warm tones

### Borders & Dividers

**Standard Border**:
```css
border: 2px solid #2c2c2c/20
```

**Accent Borders**:
```css
border-left: 4px solid {agent.accentColor}
```

**Dividers**:
```css
border-bottom: 1px solid #8B4513/20
```

### Shadows

**Card Shadow**:
```css
box-shadow: 0 2px 0 #00000030
```

**Button Shadow (Retro)**:
```css
box-shadow: 0 2px 0 #00000030, 0 0 0 3px #00000010 inset
```

**Hover Shadow**:
```css
box-shadow: 0 8px 16px #00000020
transition: shadow 200ms ease
```

### Imagery

#### Buddhist Artwork
- 6 unique spiritual images for featured agents
- High-quality illustrations with Buddhist themes
- Placed in card headers (h-32)
- Zoom on hover (`scale-105`)
- Object-fit: cover

#### Avatar System
- 13 Buddhist practitioner photos
- Circular avatars (`rounded-full`)
- Used in social feed, notifications, radio sections
- Sizes: `w-10 h-10` (default), `w-12 h-12` (prominent)

#### Logo
- `@/assets/logo.png`
- Used in header
- Maintains aspect ratio

### Special Effects

#### TracingBeam (Scroll Indicator)
- Visual scroll progress indicator
- Placed on documentation pages
- Guides user through long content
- Subtle, non-intrusive

#### Backdrop Blur
```css
backdrop-filter: blur(12px)
background: white/50 or color/50
```
- Use on: Cards, modals, overlays, sticky headers
- Creates depth and focus

#### Hover Zoom (Images)
```css
transition: transform 300ms ease
hover: scale-105
```

---

## Animation Guidelines

### Transitions

**Default Duration**:
```css
transition: all 200ms ease-in-out
```

**Specific Properties**:
- Background/Border: `150ms ease`
- Transform: `300ms ease`
- Shadow: `200ms ease`
- Opacity: `200ms ease`

### Hover States

**Buttons**: Subtle background shift, no scale
**Cards**: Border color change, shadow elevation
**Images**: Scale 1.05, smooth transform
**Links**: Color change only

### Animation Philosophy
- **Minimal, purposeful motion**
- NO parallax effects
- NO complex animations
- NO distracting effects
- Focus on immediate usability

---

## Accessibility Standards

### Contrast Ratios
- **WCAG AA Minimum**: 4.5:1 for normal text
- **Large Text**: 3:1 minimum
- Test all color combinations in both light/dark modes

### Focus States
```css
focus-visible:ring-2
focus-visible:ring-[#991b1b]
focus-visible:ring-offset-2
```

### Keyboard Navigation
- Logical tab order through cards and tables
- Skip navigation for long content
- Focus indicators visible on all interactive elements

### Screen Reader Support
- Semantic HTML (`<nav>`, `<article>`, `<section>`)
- ARIA labels for complex tables and interactive elements
- `alt` text for all images
- `data-testid` for testing and accessibility

---

## Design Consistency Rules

### The Sacred Rules (Never Break)

1. **Border Treatment**: Always 2px, always `#2c2c2c/20`
2. **Corner Rounding**: 
   - Cards: `rounded-xl` (12px)
   - Buttons: `rounded-xl` (12px) or `rounded-full`
   - Badges: `rounded-lg` (8px) or `rounded-full`
3. **Shadow Usage**: Sparingly, only `0 2px 0 #00000030` pattern
4. **Accent Color Application**: Left borders, badges (10% opacity), NEVER primary fills
5. **Typography Scale**: Maintain 1.5-2x jump between hierarchical levels
6. **Serif for Content**: All Vietnamese/English content uses serif
7. **Spacing Rhythm**: Stick to 2, 4, 8, 12, 16, 20, 24 multiples
8. **No Stark White**: Always warm tones, never pure `#ffffff`
9. **Vietnamese is Sacred**: NEVER modify Vietnamese text
10. **Agent Colors are Identity**: Each agent keeps its unique accent color

---

## Brand Voice & Tone

### Verbal Identity

**Voice Characteristics**:
- Contemplative yet clear
- Technically precise yet spiritually aware
- Respectful of Buddhist tradition
- Welcoming to all experience levels

**Tone Guidelines**:
- **Documentation**: Clear, structured, informative
- **Marketing**: Warm, inviting, purposeful
- **Agent Descriptions**: Character-specific, authentic
- **Error Messages**: Gentle, helpful, non-judgmental

### Writing Style

**Vietnamese (Primary)**:
- Formal yet accessible
- Respectful Buddhist terminology
- Clear technical explanations in Vietnamese
- Cultural authenticity

**English (Translation)**:
- Parallel structure to Vietnamese
- Technical clarity maintained
- Buddhist terms explained when needed
- Not literal translation—conceptual equivalence

---

## File Structure & Asset Organization

### Color Definitions
- `client/src/index.css` - All CSS variables and theme colors

### Typography
- Defined in `index.css` with `--font-serif`, `--font-sans`, `--font-mono`

### Images
- Buddhist Artwork: `attached_assets/*.png` (imported via `@assets/`)
- Practitioner Avatars: `attached_assets/*.jpg`
- Logo: `client/src/assets/logo.png`

### Design Documentation
- `design_guidelines.md` - Component and layout guidelines
- `BRANDING_GUIDELINES.md` (this file) - Comprehensive brand reference

---

## Quick Reference

### Most Common Colors
```
Primary Red:    #991b1b
Background:     #EFE0BD
Card:           #f6efe0
Brown Accent:   #8B4513
Border:         #2c2c2c at 20%
Shadow:         0 2px 0 #00000030
```

### Most Common Spacing
```
Card Padding:   p-6
Section:        py-16 or py-20
Gap:            gap-6 or gap-8
```

### Most Common Typography
```
Heading:    text-4xl font-serif font-bold text-[#991b1b]
Body:       text-base font-serif text-[#2c2c2c]
Label:      text-sm font-sans uppercase tracking-wide
```

### Most Common Components
```
Button:     rounded-xl px-6 py-3 bg-[#991b1b] text-white font-serif font-semibold
Card:       rounded-2xl bg-white/50 backdrop-blur-md border-2 border-[#8B4513]/20 p-6
Input:      rounded-xl border-2 border-[#8B4513]/20 px-4 py-3 bg-white/30
```

---

## Version History

- **v1.0** - October 30, 2025 - Initial comprehensive branding guidelines
- **v1.1** - October 30, 2025 - Rebranded from Giác Ngộ Initiative to Bodhi Lab
- Maintained by: Bodhi Technology Lab
- Project: Bodhi Lab (Bodhi Technology Lab)

---

*"Technical precision meets spiritual intention—clean, scannable documentation that respects the sacred purpose of these AI agents."*
