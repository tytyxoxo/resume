---
name: Passon's Portfolio
description: Frontend developer portfolio for Passon Rattanakongton
colors:
  primary: "oklch(49.12% 0.3096 275.75)"
  secondary: "oklch(69.71% 0.329 342.55)"
  success: "oklch(72.39% 0.198 160.03)"
  base-100: "oklch(100% 0 0)"
  base-200: "oklch(96.1% 0 0)"
  base-300: "oklch(92.05% 0 0)"
  base-content: "oklch(26.13% 0.02 264.05)"
typography:
  display:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.25
  title:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Satoshi, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.025em"
rounded:
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "1.5rem"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "1.25rem"
  md: "2rem"
  lg: "3.5rem"
  xl: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.base-100}"
    rounded: "{rounded.full}"
    padding: "0.5rem 1.25rem"
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.base-100}"
    rounded: "{rounded.full}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "0.5rem 1.25rem"
  card:
    backgroundColor: "{colors.base-100}"
    textColor: "{colors.base-content}"
    rounded: "{rounded.lg}"
    padding: "1.25rem"
  chip:
    backgroundColor: "{colors.base-200}"
    textColor: "{colors.base-content}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.625rem"
  chip-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.base-100}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.625rem"
---

# Design System: Passon's Portfolio

## 1. Overview

**Creative North Star: "The Quiet Specialist"**

This system belongs to a senior developer's desk at a focused hour: precise, purposeful, no ornamentation that doesn't earn its keep. Every spacing decision, every color choice, every motion beats the same question: does this help the reader understand something faster? If not, it doesn't ship. The signal-to-noise ratio is the design.

The aesthetic is calibrated, not austere. Where DaisyUI's semantic token system provides the color layer, Satoshi's geometry provides the typographic backbone: clean strokes, tight metrics, weight contrast that establishes hierarchy without requiring color. Sections breathe through whitespace, not through decorative borders or background fills.

This system explicitly refuses: scroll-hijacking, 3D transforms, cursor trails, eyebrow labels on every section heading, identical card grids repeated section after section, warm beige or cream backgrounds, hero metric blocks, and gradient-text monograms. The reference is Vercel and Next.js documentation sites: confident, minimal, readable in both themes without leaning on either one as the "real" mode.

**Key Characteristics:**
- Type-led hierarchy: weight and size do the structural work, not color or decoration
- Both themes are first-class surfaces: WCAG AAA contrast targets on light and dark
- Flat at rest, elevated on hover: surfaces separate tonally; shadows appear only in response to interaction
- Precise without being cold: clean borders, tight padding, hover states that are clear but not bouncy
- Mobile-first performance: animations are disabled entirely below 640px; motion is a progressive enhancement

## 2. Colors: The Calibrated Palette

DaisyUI semantic tokens. The system inherits all values from DaisyUI's light and dark themes. Custom hard-coded hex values are prohibited; use the semantic token layer.

### Primary
- **Indigo Pulse** (`oklch(49.12% 0.3096 275.75)`): The single accent. Used for CTAs, active nav indicators, timeline nodes, section header text accents, and hover-state border reveals. Its rarity at ~10% of any screen surface is the point.

### Secondary
- **Rose Signal** (`oklch(69.71% 0.329 342.55)`): Unused on the home page since the 2026-11 unslop pass (hero blobs and hover gradients removed). Do not reintroduce as a gradient endpoint.

### Neutral
- **High-Ink** (`oklch(26.13% 0.02 264.05)`, `base-content`): Primary text. Near-black with a trace blue-gray chroma. All body copy, headings, and UI labels.
- **Paper White** (`oklch(100% 0 0)`, `base-100`): Main surface. Card backgrounds, navbar fill.
- **Mist** (`oklch(96.1% 0 0)`, `base-200`): Alternate section backgrounds. Creates tonal rhythm between sections.
- **Rule Gray** (`oklch(92.05% 0 0)`, `base-300`): Borders, dividers, separator lines.
- **Available Green** (`oklch(72.39% 0.198 160.03)`, `success`): Reserved for the "Available for new opportunities" badge only. Not a general accent.

### Named Rules

**The One Accent Rule.** Primary color appears on at most 10–15% of any given screen. The rest is base-content and base-200 tones. If primary is appearing on backgrounds, card fills, or multiple decorative elements per section, it is overused. Reduce it.

**The No Hard-Code Rule.** All colors must flow through DaisyUI semantic tokens (`var(--color-primary)`, `var(--color-base-content)`, etc.) or Tailwind semantic utilities (`text-primary`, `bg-base-200`). Hard-coding hex or OKLCH values in component markup breaks both theme modes.

**The Success Singularity Rule.** The success green is used in exactly one context: the "available" status badge. It must not appear on skill tags, hover states, or section accents. Its context-specificity makes it read as intentional rather than decorative.

## 3. Typography

**Display/Body Font:** Satoshi (`--font-sans`, loaded from the Fontshare CDN in `layout.tsx`, with `system-ui, sans-serif` fallback)
**Mono Font:** Geist Mono (`var(--font-geist-mono)`)

**Character:** A geometric humanist that reads at both display scale and body size without faltering. Size and color create the hierarchy; weights stay 400 to 600. No second display family needed.

### Hierarchy

- **Display** (600 weight, `clamp(2.25rem, 5vw, 3.75rem)`, line-height 1.1, tracking -0.02em): Hero heading only — Passon Rattanakongton. `text-wrap: balance` to prevent widow lines.
- **Headline** (600 weight, `clamp(1.5rem, 3vw, 1.875rem)`, line-height 1.25): Section titles. "Core Expertise", "Professional Journey", "Education".
- **Title** (600 weight, `1rem`, line-height 1.4): Card headings, role titles within experience entries.
- **Body** (400 weight, `1rem`, line-height 1.625): Bullet descriptions, paragraph text. Maximum 65–75ch per line.
- **Label** (600 weight, `0.75rem`, tracking 0.025em): Tech tags, category badges, metadata. Never all-caps on body text; reserved for single-word or short-phrase labels only.

### Named Rules

**The No Eyebrow Rule.** Tiny all-caps tracked labels above section headings ("WHAT I DO", "CAREER", "BACKGROUND") are prohibited as default section grammar. A single deliberate kicker as a named brand system is permitted; one on every section is AI scaffold. Remove or replace with a different structural choice.

**The Single Family Rule.** One family, multiple weights. Satoshi handles every role from display to label; Geist Mono is reserved for dates, numbers and meta. Adding a second display face or a decorative serif breaks the calibrated system this portfolio projects.

## 4. Elevation

The system uses a hybrid: tonal layering at rest, a crisp shadow on interaction. No element casts a shadow in its default state; elevation is earned by hover or focus.

### Shadow Vocabulary

- **Ambient Low** (`0 4px 12px rgba(0,0,0,0.06)`): Cards on hover. `hover:shadow-md` in Tailwind. Lifts the card ~2–4px from the surface.
- **Ambient High** (`0 8px 32px rgba(0,0,0,0.1)`): Stronger lift for primary cards or featured items. `hover:shadow-xl`. Used sparingly.
- **Navbar Float** (`0 4px 24px rgba(0,0,0,0.08)`): The floating navbar pill. Permanent, not hover-driven; the nav is always elevated above content.

### Tonal Layering at Rest

Section backgrounds alternate between `base-100` (white) and `base-200/50` (50% mist tint). Cards on `base-100` sections use a `border border-base-300` boundary. Cards on `base-200` sections use `bg-base-100` to rise above the section floor. No shadow at rest.

### Named Rules

**The Flat-by-Default Rule.** Every card, chip, and container starts flat (no shadow, no glow, no blur). A shadow appears only when the element responds to state: hover, focus, or explicit permanent elevation (navbar). A design with ambient shadows on resting cards is not this system.

## 5. Components

### Buttons

Precise, rounded-pill shape. No square corners; no large radii that read casual.

- **Shape:** Full pill radius (9999px). Used site-wide for both primary and outline variants.
- **Primary:** `background: oklch(49.12% 0.3096 275.75)`, `color: white`, padding `0.5rem 1.25rem` (sm) / `0.625rem 1.5rem` (md). Font-weight 600. No border.
- **Hover/Focus:** Opacity 90% on hover (`hover:opacity-90`). Focus ring via DaisyUI defaults. No spring, no lift — state change is a fade, not a bounce.
- **Outline:** `background: transparent`, `border: 1px solid oklch(49.12% 0.3096 275.75)`, `color: oklch(49.12% 0.3096 275.75)`. Hover: fill to 10% primary tint.
- **Labels:** Verb + object. "Work with me" beats "Contact". "View Portfolio" beats "See more".

### Cards

- **Corner Style:** Gently rounded (1rem / `rounded-2xl`). Precise, not soft.
- **Background:** `base-100` (white)
- **Resting Border:** `1px solid oklch(92.05% 0 0)` (base-300)
- **Hover Border:** `hover:border-primary/30` — primary at 30% opacity reveals on hover
- **Hover Shadow:** `hover:shadow-md` + `hover:shadow-lg` for more prominent cards
- **Hover:** border steps to `base-content/20` with `transition-colors`. No gradient bars, shadows or scale on hover
- **Internal Padding:** `1.25rem` (20px). Body content uses gap-3 or gap-4 for internal rhythm.

### Chips and Tags

Two patterns:

1. **Neutral chip** (skill tags, tech stack pills): `background: base-200`, `color: base-content/60`, `border: 1px solid base-300`, `border-radius: full`, `padding: 0.25rem 0.625rem`, `font-size: 0.75rem`, `font-weight: 500`.
2. **Accent chip** (active skill category badges): color-specific tinted background at 10% opacity, matching text at full or 60% opacity, matching border at 30% opacity. Uses raw Tailwind color utilities for per-technology identity.

**The No Identical Grid Rule.** Three sections may not use the same "icon + heading + text" card grid layout. If two sections already use it, the third must use a different affordance: timeline, horizontal list, plain text hierarchy, or table.

### Navigation

A floating pill — the signature component. Stays sticky at the top, hides on scroll down, reveals on scroll up.

- **Shape:** `border-radius: 1rem` pill container, centered, `max-width: 48rem`.
- **Background:** `backdrop-filter: blur(16px) saturate(1.5)` + `base-100` fill at 60–85% opacity (increases with scroll depth).
- **Border:** `1px solid base-200`.
- **Shadow:** `0 4px 24px rgba(0,0,0,0.08)` — permanent elevation.
- **Active link:** Sliding indicator div beneath links (`bg-base-content/10`, `border-radius: full`), animated with `cubic-bezier(0.34, 1.56, 0.64, 1)`. Active link text: `base-content` (full opacity). Inactive: `base-content/50`.
- **Transition:** `transform: translateY(-110%)` on scroll-down, `translateY(0)` on scroll-up, eased at `0.3s ease`.

### Reveal Animation

Scroll-triggered entrances. Class-based: `.reveal` starts at `opacity: 0`. When `.visible` is added by `IntersectionObserver`, `reveal-up` animation fires: `opacity 0 → 1`, `translateY(40px → 0)`, 0.6s ease. Staggered with `delay` props (100ms, 120ms steps per list item). Disabled entirely on mobile (`< 640px`) — content is visible by default.

**The No-Gate Rule.** Elements must never be invisible in their default state if the `.visible` class fails to fire (server render, headless browser, reduced motion). The `.reveal` class sets `opacity: 0` as a starting animation state, not a persistent hidden state. Any screen without JavaScript sees content.

## 6. Do's and Don'ts

### Do:

- **Do** use DaisyUI semantic tokens for every color reference: `text-primary`, `bg-base-200`, `border-base-300`. Never hard-code hex values in JSX or CSS.
- **Do** target WCAG AAA contrast on body text: 7:1+ on both light and dark themes. Check `base-content/60` muted text — it commonly fails at 60% opacity on light backgrounds.
- **Do** keep the primary accent to under 15% of any screen's visual weight. One CTA, one nav indicator, one section accent per section — not all three.
- **Do** test both themes before calling a component done. Dark mode is a first-class surface, not an afterthought.
- **Do** wrap all new sections in `<Reveal>` for scroll entrance, and disable with `@media (prefers-reduced-motion: reduce)` and on mobile via the existing CSS rule.
- **Do** give buttons verb+object labels: "Work with me", "Download CV", "View portfolio". Never "Click here", "Submit", "OK".
- **Do** use `text-wrap: balance` on h1–h3 and `text-wrap: pretty` on body paragraphs to prevent orphaned words.
- **Do** keep card grids diverse: if two sections already use icon+heading+text cards, the next section must use a different layout pattern (timeline, horizontal row, plain list, or prose).

### Don't:

- **Don't** add a tiny all-caps tracked eyebrow (`text-xs font-bold uppercase tracking-widest`) above every section heading. The existing page already has one on every section. Either make it a deliberate brand system with a name (and use it selectively) or remove it. One per page maximum.
- **Don't** use gradient text (`background-clip: text` + `bg-gradient-to-br`). The "PR" monogram in the hero card currently does this — it is on the removal list. Use solid `text-primary` or `text-base-content`.
- **Don't** add motion that runs on every section with the same pattern. "Staggered reveal on every card in every grid" is the uniform reflex. Each entrance should be calibrated to what it reveals.
- **Don't** number every process step (01 / 02 / 03 / 04) as default section scaffolding. Numbers earn their place when the sequence genuinely carries information — a real ordered workflow, not just visual decoration. If the numbers are purely decorative, remove them.
- **Don't** add gradient blobs (`bg-primary/10 rounded-full blur-3xl`) or dot-pattern backgrounds anywhere. Primary appears only on the main CTA and the current role.
- **Don't** use `border-left: 4px solid` or `border-right: 4px solid` as a colored accent on cards or callouts. No side-stripe borders.
- **Don't** add glassmorphism cards (backdrop-filter + semi-transparent fill) decoratively. The navbar uses it intentionally because it floats over content; that context is earned. A card inside a section does not have the same justification.
- **Don't** reach for warm beige, cream, or sand backgrounds (`oklch L 0.84–0.97, C < 0.06, hue 40–100`). The existing `base-100` and `base-200` are neutral-to-cool, which is correct. Any "warmth" passes through accent color and typography, not background.
- **Don't** add a second font family. Satoshi handles all roles (Geist Mono only for dates, numbers and meta). A display serif, a decorative mono, or a headline script would break the "quiet specialist" voice.
- **Don't** animate layout properties (`width`, `height`, `padding`, `margin`). Animate `transform` and `opacity` only. For top-edge accent bars on cards, use `transform: scaleX(0 → 1)` rather than `width: 0 → 100%`.

## 7. The 3D room

The home page is a full-screen 3D journey through a small room ("Passon's desk, Bangkok"); a solid card beside each
object (bottom-docked on phones) carries the same facts as text. Full contract, palette
names, world layout and budgets: `docs/scene-brief.md`. The rules that matter for design work:

- **One bright element per screen.** The room is it. Chrome around it (navbar, journey cards, buttons) stays quiet
  and uses the tokens above; nothing in the DOM competes with the scene.
- **Soft studio miniature.** Real-world scale, generous rounding, matte materials, colours only from
  `src/components/scene/palette.ts`. The 3D accent (`accentSoft`) is the brand violet shifted slightly red so it
  still reads violet once lit; it appears on one or two small parts per object.
- **Two lighting moods.** Light theme = Bangkok afternoon (sun, day skyline). Dark theme = Bangkok night (lamp
  pool, monitor glow, lit city). The lamp on the desk switches between them.
- **Text in 3D** is drawn with the page fonts on canvas textures (Satoshi for UI, Geist Mono for dates), and it
  only restates facts already in the DOM.
- **Motion** follows section changes (the camera eases between stops) and direct input (keys, hover lift).
  Ambient motion is minimal and stops under `prefers-reduced-motion`.
