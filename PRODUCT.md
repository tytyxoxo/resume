# Product

## Register

brand

## Users

Tech recruiters and HR professionals screening frontend developer candidates. They open many tabs in sequence, spend under a minute on each, and decide quickly whether to pass it up the chain. Their context is a hiring queue, not a leisurely browse. They need competence to land immediately and contact to be frictionless.

## Product Purpose

A personal resume and portfolio for Passon Rattanakongton, Senior Frontend Developer based in Bangkok. The site exists to convert a recruiter's scan into a conversation. Success is an email or LinkedIn message; failure is a closed tab. The site must communicate skill level, professional credibility, and human approachability before the visitor scrolls past the hero.

Since November 2026 the home page is a full-screen 3D journey through a small room, Passon's desk in Bangkok. Scrolling moves the camera from object to object, and each object carries its part of the resume in the room itself: the monitor shows the projects, the pinboard the roles, the shelf the diploma and school, the macropad the toolchain, labelled seedlings what is being learned, a postcard on the window sill the contact details. A solid card beside each object (at the bottom on phones) holds the same facts as real text, and a paper plane flies out of the window when a message is sent. The 3D is proof of craft, not a gate: every fact is readable without it, and `/resume` is a one-page printable version.

## Brand Personality

Precise, restrained, quietly confident. "The work speaks." Three words: composed, capable, considered.

Voice is clear and direct, not marketing-heavy. No buzzwords, no "passionate about building the future." Specific project names and outcomes over vague claims.

Reference: Vercel / Next.js documentation sites — clean, confident, minimal. Every element earns its place. Light and dark both feel authoritative, not like one is an afterthought.

## Anti-references

- **Over-animated creative portfolio**: scroll hijacking, 3D that hides or delays the content, cursor trails, staggered entrance on every section, loading screens. Motion that buries content. The 3D room is welcome only because it illustrates content that is already readable.
- **Generic AI-generated portfolio**: tiny uppercase tracked eyebrows above every section, identical rounded-icon card grids, warm beige/cream backgrounds, hero metric blocks, glassmorphism decorations.
- **Dense resume-dump**: no hierarchy, everything at the same visual weight, reads like a PDF exported to HTML.

## Design Principles

1. **Restraint signals confidence.** A developer who uses the simplest solution that works has better judgment than one who reaches for the flashiest tool. The portfolio should make that argument through its own design: no decorative chrome, no over-engineered sections.
2. **Scannable before deep.** Recruiters decide in seconds. Every section must communicate its value at a glance — heading and one key data point visible without reading. Depth is for those who choose to stay.
3. **Type and space do the structural work.** Hierarchy through weight, size, and whitespace — not color fills, background gradients, or icon badges. The Vercel reference wins because it trusts its typography.
4. **Both themes are first-class.** Light and dark must each feel complete and intentional. Neither is the "real" mode. Contrast targets apply to both.
5. **Credibility through specificity.** "Built OMS for tracking orders end-to-end" beats "passionate about clean code." Every claim should name a real thing built or a real outcome delivered.
6. **The room illustrates, the DOM informs.** The 3D scene only ever restates facts that are already in the page text (`src/data/resume.ts` is the single source). If WebGL fails, motion is reduced, or a screen reader is used, nothing is lost.

## Accessibility & Inclusion

WCAG AAA where practical on both light and dark themes: body text at 7:1+ contrast ratio, large text at 4.5:1+. No motion that cannot be suppressed via `prefers-reduced-motion` (the camera jumps instead of flying, ambient loops stop). Theme toggle must be keyboard-accessible (the navbar toggle; the 3D lamp is a pointer shortcut). The canvas is `aria-hidden`; every interaction in it has a DOM equivalent (section links, arrow keys, project tabs). No single-character shortcuts (WCAG 2.1.4). Informational text never goes below `base-content/65` (5.5:1 light, 7:1 dark).
