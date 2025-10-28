# Design Guidelines: Buddhist Agents Documentation

## Design Approach

**Hybrid Approach**: Combining OpenAI's technical documentation clarity with the established Buddhist spiritual aesthetic. Drawing inspiration from OpenAI Models/Pricing pages for information architecture while maintaining the warm, contemplative design language of the Giác Ngộ platform.

**Core Principle**: Technical precision meets spiritual intention—clean, scannable documentation that respects the sacred purpose of these AI agents.

## Typography System

**Font Families**:
- Primary: Serif font (existing: consistent with manifesto pages)
- Technical specs/code: Monospace for model names and technical details
- UI elements: Sans-serif for navigation and interactive elements

**Hierarchy**:
- Page Title: 3xl-4xl serif, medium weight
- Section Headers: 2xl-3xl serif, semibold
- Agent Names: xl-2xl serif, medium weight
- Agent Taglines: base-lg serif, italic, lighter weight
- Body Text: base serif, normal weight
- Technical Labels: sm sans-serif, uppercase tracking-wide
- Code/Model Names: sm monospace, medium weight

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 4, 8, 12, 16** for consistent rhythm
- Component padding: p-8, p-12
- Section spacing: space-y-16, space-y-20
- Card gaps: gap-8
- Tight spacing for related elements: space-y-2, space-y-4

**Grid System**:
- Agent Cards: 2-column grid on desktop (grid-cols-2), single column on mobile
- Feature Comparison: 3-4 columns for technical specs
- Pricing Tables: Full-width responsive tables with sticky headers

**Container Widths**:
- Main content: max-w-6xl
- Narrow content (intros): max-w-4xl
- Full-width tables: w-full with horizontal scroll on mobile

## Component Library

### Navigation
- **Sticky Header**: Fixed top navigation with section links (Overview, Models, Pricing, Quick Start)
- **Breadcrumbs**: Docs > Agents > [Section]
- **Quick Nav**: Anchor links to major sections with smooth scroll behavior

### Agent Cards
**Primary Display Format**:
- Card container: Rounded corners (rounded-xl), subtle border, light background (#f6efe0)
- Agent accent bar: 4px left border using agent's accentColor
- Layout: Vertical stack with clear hierarchy
  - Agent name (large, bold)
  - Tagline (italic, subdued)
  - Model badge (pill-shaped, monospace)
  - Key capabilities (bulleted list, compact)
  - Action button: "View Details" or "Try Agent"

**Card Variations**:
- Grid view (default): 2-column responsive cards
- Comparison view: Side-by-side table format
- Detailed view: Expanded single agent with full system prompt

### Pricing Tables

**Structure**:
- Sticky column headers on scroll
- Model tiers as columns (gpt-4o, gpt-5)
- Pricing metrics as rows:
  - Input tokens per 1M
  - Output tokens per 1M
  - Context window
  - Use cases
- Visual comparison: Checkmarks, numerical values, feature lists

**Styling**:
- Alternating row backgrounds for scannability
- Bold headers with subtle background differentiation
- Highlight "Recommended" tier with accent border
- Pricing numbers: Large, bold, monospace

### Technical Specifications

**Display Format**:
- Definition list pattern (dt/dd)
- Two-column layout on desktop
- Clear labels with monospace values
- Grouped by category (Model Details, Context Limits, Performance)

### Interactive Elements

**Buttons**:
- Primary CTA: Solid fill with #991b1b, white text, shadow-sm
- Secondary: Border-only (#2c2c2c/20), transparent background
- Hover states: Subtle background shift, no dramatic transforms
- Button sizes: px-6 py-3 for primary actions, px-4 py-2 for secondary

**Agent Accent Integration**:
- Use each agent's accentColor sparingly:
  - Left border on cards
  - Badge backgrounds (10% opacity)
  - Icon highlights
  - Never as primary button color (maintain consistency)

**Code Blocks**:
- Model names in inline code: `gpt-4o` with monospace, subtle background
- API examples: Full code blocks with syntax highlighting, copy button

## Visual Treatment

**Backgrounds**:
- Page background: #EFE0BD (warm paper tone)
- Card backgrounds: #f6efe0 (lighter cream)
- Section backgrounds: Subtle tonal variations, never stark white
- No color references in components beyond structural elements

**Borders & Shadows**:
- Border style: 2px solid with #2c2c2c at 20% opacity
- Card shadows: Minimal, 0_2px_0_#00000030 for subtle elevation
- No heavy drop shadows—keep the paper-like aesthetic

**Spacing & Rhythm**:
- Generous whitespace between sections (py-20, py-24)
- Tight grouping of related content (space-y-2, space-y-4)
- Balanced negative space—never cramped, never floating

## Page Structure

### Agents Overview Section
1. **Hero Introduction** (py-16)
   - Title: "Buddhist AI Agents"
   - Subtitle: Brief context about the agent ecosystem
   - Quick stats: Number of agents, supported models, active users
   
2. **Agent Grid** (py-20)
   - All agents displayed as cards in 2-column grid
   - Filter/sort options: By model, by purpose, alphabetical
   
3. **Quick Comparison Table** (py-20)
   - Horizontal scroll table on mobile
   - Key differentiators at a glance

### Models Section (OpenAI-inspired)
1. **Model Overview** (py-16)
   - Introduction to GPT-4o vs GPT-5
   - Context about model selection per agent
   
2. **Detailed Model Cards** (py-20)
   - Each model (gpt-4o, gpt-5) gets expanded treatment
   - Technical specs, capabilities, agent assignments
   - Use case recommendations

### Pricing Section
1. **Pricing Hero** (py-16)
   - Clear headline: "Simple, Transparent Pricing"
   - Subtext about merit-based economy integration
   
2. **Token Pricing Table** (py-20)
   - Input/Output rates per model
   - Context limits clearly displayed
   - Calculator tool for estimating costs

3. **Agent-Specific Considerations** (py-16)
   - How different agents use tokens
   - Optimization tips per agent type

### Quick Start Section
1. **Getting Started** (py-16)
   - Code examples for agent initialization
   - API authentication flow
   - First agent conversation example

2. **Integration Guides** (py-20)
   - Platform-specific guides
   - Best practices per agent

## Accessibility & Interactions

- Maintain WCAG AA contrast ratios minimum
- Focus states: 2px outline with offset
- Keyboard navigation: Logical tab order through cards and tables
- Screen reader: Semantic HTML with proper ARIA labels for complex tables
- Responsive breakpoints: Mobile-first, tablet (md:768px), desktop (lg:1024px)

## Images

**Strategic Image Use**:
- **Agent Icons**: Small illustrative icons representing each agent's essence (meditation pose, lotus, dharma wheel variations) - 64x64px, placed top-left of each agent card
- **Model Comparison Graphics**: Simple diagrams showing context window sizes, token flow (use abstract geometric shapes consistent with Buddhist aesthetic)
- **Hero Background**: Subtle texture or pattern (lotus petals, mandala outline) at very low opacity behind page title

**No Large Hero Image**: This is a documentation page prioritizing information density over visual drama. Images serve as clarifying elements, not focal points.

## Animation Principles

**Minimal, Purposeful Motion**:
- Card hover: Subtle border color shift (100ms ease)
- Smooth scroll to anchors (behavior: smooth)
- Table row highlight on hover (background transition 150ms)
- NO complex animations, parallax, or distracting effects
- Focus on immediate usability over delight

## Design Consistency Rules

1. **Border Treatment**: Always 2px, always #2c2c2c/20
2. **Corner Rounding**: Cards xl (rounded-xl), buttons lg (rounded-lg), badges full (rounded-full)
3. **Shadow Usage**: Sparingly, only [0_2px_0_#00000030] pattern
4. **Accent Color Application**: Left borders, badges (low opacity), never primary fills
5. **Typography Scale**: Maintain 1.5-2x jump between hierarchical levels