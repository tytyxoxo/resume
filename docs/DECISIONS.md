# Decisions

Newest first. Each entry: decision, reason, trade-off, alternatives rejected.

## 2026-11-06 (night) — production domain

- The site lives at https://passonr.vercel.app (owner). `profile.site` feeds `metadataBase`, a canonical link per page (`/`, `/resume`), `sitemap.ts` and `robots.ts` (everything allowed: `/playground` and `/svln` must stay crawlable for their `noindex` to be read).
- Checked on the live site after the merge to `main`: pages, PDF and share image answer 200, `og:image` points at passonr.vercel.app, `/portfolio` → `/#work`, `/api/chat` 404, the production CSP has no `'unsafe-eval'`, no console errors, and Speed Insights loads on `/` and `/resume` (Vercel serves it from a randomized first-party path, not `/_vercel/...`).
- The GitHub repo's "website" field still points at `resume-phi-blush-83.vercel.app`, which answers `DEPLOYMENT_NOT_FOUND`; the owner changes it in the repo settings.

## 2026-11-06 (evening) — weak devices, short screens, Safari engine check

### Adaptive pixel density
- drei `PerformanceMonitor` drops the canvas to 1x pixels while the frame rate is low and restores the maximum (2x, 1.5x on touch screens) when it recovers; after 3 flips it stays at 1x. The `[1, max]` range form is kept so 1x screens never render above their resolution.
- Pinboard pins are just the head now (the needle was invisible from the cameras): 249 → 241 draw calls at the overview.

### Short wide screens (`short:` variant)
- `min-width 1024px`, landscape and `max-height 820px` (1366×768, 1280×720, 1536×864 laptops with browser chrome): tighter stage and card padding, list spacing and line height. Measured: the Experience card overflowed by 96 / 106 / 169 px at 1536×730 / 1280×720 / 1366×657; now it fits except +25 px at 1366×657, and Skills and Contact fit everywhere.
- Gotcha: the Turbopack dev cache kept serving the old CSS after the variant was added (0 rules in dev, 10 in `next build`); fixed by `rm -rf .next/dev` (README).

### Skills
- Git out, Redux Toolkit in (used by the CRM); the macropad keeps eight keys.

### Safari engine check
- Playwright WebKit 26.4, desktop 1440×900 and iPhone 15 emulation: the scene renders, contact form, call request dialog, theme switch and the PDF link work, no console errors. Not a substitute for a real iPhone (touch scrolling feel, address bar resizing).

## 2026-11-06 (afternoon) — owner answers, Work tab fix

### Experience: projects under the role that built them, the 2019–2023 gap filled (SPEC Q1 = A, Q2)
- HR CheckIn Dashboard (2025) and Admin Dashboard (2024) moved from Senior (2026 – Present) to Frontend Developer (2023 – 2025), whose stack now lists what its projects used.
- Senior's 2026 work is the company's internal CRM (owner: "มีเป็น CRM แต่ว่าเป็นภายในองค์กร"). Facts taken read-only from the CRM repo: the owner's commits start 2026-08-21 (all 176 in 2026); React, TypeScript, Redux Toolkit, Tailwind CSS; areas from its page list (campaigns, customers and follow-ups, orders, supervisor dashboards, role permissions). Written as "Outbound CRM", Internal, Production (owner confirmed it is in use and that this level of detail can be public), with no vendor names or internal numbers; the monitor shows a mock call list (made-up names), like the other internal projects. Senior's stack follows the CRM (Next.js moved with the dashboards).
- 2019 – 2023: "Video Editor & Motion Graphics · Freelance", work through personal referrals while moving into frontend development (owner: a rest, then a career change; video editing and motion graphics via people they knew). No location: not given.
- The home Experience card drops the per-role stack line (the Work card and Skills already show it; `/resume` keeps it), so three roles still fit a 900 px tall screen. Shorter screens (< ~760 px) scroll that section a little; the card stays page-scrolled, no inner scroll.
- Pinboard: three role cards from bottom-left (editor) to top-right (senior), each role's project notes next to it (four around the frontend card, the CRM under the senior one), the thread between the role pins. The thread runs between the cork and the papers so it never crosses their text.

### Work tabs: hover previews, click selects (bug: flicker)
- **Bug:** hovering selected the tab, the panels had different heights (459–509 px), and the card is centred (bottom-docked on phones), so the tabs moved under a resting pointer and the selection flipped back and forth (reproduced: 91 flips in 1.5 s at 390×844, 13 flicker positions at 1440×900). Moving the mouse down from a tab to its "Live demo" link also re-selected every tab on the way.
- **Fix:** all panels share one grid cell (the card keeps the tallest panel's height; inactive panels `invisible`), and hover only sets `preview` in the store, shown on the 3D monitor until the pointer leaves the list. Click and arrow keys select. Smoke checks both.

### Pause animations button (WCAG 2.2.2)
- A navbar button on the home page (`aria-pressed`, hidden when the OS already asks for reduced motion) sets `motionOff` in the store; `useReducedMotion()` = OS setting or `motionOff`, so the room behaves exactly as with `prefers-reduced-motion` (no loops, cuts instead of camera flights). Saved in `localStorage` and applied before first paint (`html[data-motion="reduce"]` mirrors the CSS rules). On phones the stop label leaves the navbar to make room (the card shows it).

### Downloadable PDF (SPEC Q12 = B)
- `public/Passon-Rattanakongton-Resume.pdf`, written from `/resume` by `node scripts/resume-pdf.mjs` (Chrome print, one A4 page, fonts embedded as subsets, which the Satoshi license allows for documents). `/resume` offers "Download PDF" next to "Print". The smoke test fails while the PDF is older than `src/data/resume.ts` or the resume page.

### Tooling
- Impeccable skill updated to v4.8.0 (in `tyty/.claude` and this repo's `.claude`/`.gemini`). The updater also installed design-check hooks (`.claude/settings.local.json`: session start, after Edit/Write, on Stop) and four `impeccable-*` agents; existing local permissions were kept.

## 2026-11-06 — polish round (owner: "แก้ไขเพิ่มเติมได้เลย")

### Old `/portfolio` and `/contact` redirect into the journey
- **Decision:** `next.config.ts` redirects `/portfolio` → `/#work` and `/contact` → `/#contact`; the old pages (and `Reveal`/`useReveal`, their only users) are deleted. `/playground` and `/svln` stay but are `noindex` (their own `layout.tsx`).
- **Reason:** they repeated the home content in the old design and had drifted; links already shared keep working.
- **Trade-off:** 307 (temporary) for now, so the owner can still bring a page back without browsers caching the redirect; switch to `permanent: true` once confirmed (SPEC Q8).

### Navbar
- A "Resume" link (`aria-current="page"` on `/resume`): recruiters reach the printable resume from every stop, not only from the hero.
- The stop label reads `section` from the scene store (set by the journey's scroll handler) instead of its own `scrollend` detection: one source, and older Safari has no `scrollend`. Label contrast /50 → /70.

### Booking is a request, not a booking
- Copy says "Request a call" / "Send request" / "I'll confirm the time by email": nothing checks availability. The date minimum is today in Asia/Bangkok (was UTC, so 00:00–06:59 allowed yesterday); a request without a date is stopped with an inline alert (hidden inputs are never validated by the browser); `cally` loads when the date button is reached, not with the page.

### Share image from the real scene
- `src/app/opengraph-image.jpg` (1200×630, light theme) is a capture of the hero room with the name, regenerated by `node scripts/og.mjs [--dark]`. Absolute URLs come from `metadataBase` = `profile.site` (https://passonr.vercel.app, set on the evening of 2026-11-06); Vercel previews use their own URL, development uses localhost (Next's `resolve-url.js`).
- **Rejected:** `next/og` `ImageResponse` (would redraw the room in Satori, not the real render); a hand-made image (goes stale).

### Satoshi stays on the Fontshare CDN (owner decision pending)
- The ITF Free Font License 2.0 allows self-hosting for your own site, but forbids making the font files available through "a repository" or "publicly accessible servers"; this repo is public on GitHub, so committing the `.woff2` is not clearly allowed. Added `preconnect` to `cdn.fontshare.com` (the font files) next to `api.fontshare.com` (the CSS). Options for the owner: make the repo private and self-host, or switch to Geist Sans via `next/font` (SPEC Q11).

### Smaller rules
- Only the `light` and `dark` daisyUI themes ship; the inline theme script applies only `dark` (a stale value from the old 35-theme selector can't break the page).
- CSP: production drops `'unsafe-eval'` (React dev tooling only) and adds `object-src 'none'; base-uri 'self'; frame-ancestors 'none'`. Verified with `next start`: the scene renders, no CSP errors.
- `SpeedInsights` moved to the layout (now also measures `/resume`), rendered in production only: in development it loads a debug script from a third-party CDN the CSP blocks.
- Placeholders at the /65 floor (Tailwind's preflight 50% measured 3.9:1); reduced motion turns off the circle reveal of the theme switch; the old design's reveal/hero animation CSS was removed (no users left).
- Daytime skyline buildings get faint glass rows so they read as towers; the contact stop was reframed so the plant no longer pokes out under the card.

## 2026-11-05 (evening) — full-screen 3D journey, information in the room

### The home page is a full-screen 3D journey (supersedes the split layout below)
- **Decision:** the canvas covers the whole viewport. Each of the six DOM sections is one screen of scroll and holds one solid card that floats beside the object (wide screens: `min-width 1024px` and landscape, the `side:` CSS variant) or docks at the bottom (phones and tall screens). The camera follows scroll progress continuously along a Catmull-Rom path through the stops in `src/components/scene/journey.ts`; a view offset slides the picture away from the card. One-screen-per-stop snapping (mandatory with a mouse, proximity on touch).
- **Reason:** the owner asked for "3D Journey ไปเลย ไม่ต้องแสดงซ้ายขวา". The cards keep every fact as server-rendered, accessible text.
- **Trade-off:** cards cover part of the scene; framing is tuned per stop (and per layout via `span`/`lift`).
- **Rejected:** DOM panels in 3D via drei `<Html transform>` (blurry text when scaled, depth sorting with WebGL, client-only so no SSR/SEO); fixed-position cards anchored to projected 3D points (drift during camera travel, `inert` juggling for hidden cards).

### The facts also live in the room
- Monitor UI per project, pinboard role cards, diploma, a small school frame on the shelf, macropad legends, three labelled seedlings ("currently learning", they sprout at the Skills stop), a postcard with the contact details on the window sill next to the paper plane. All drawn from `src/data/resume.ts` on canvas textures.

### Object drafts by Codex, reviewed and finished by the lead
- After the parallel Claude agents hit the account session limit (none had written files yet), the four object groups were drafted by Codex CLI (separate quota) from `docs/scene-brief.md` and reviewed visually. Fixes made in review: colour multiplied twice (`color` + baked `map`), floor/slab z-fighting, RoundedBox caps without 0–1 UVs (rug), the skyline light well peeking past the wall end, skyline buildings filled with the lit-window colour at night (`fillStyle` leak), unreadable macropad legends (pad scaled 1.3), stops reframed.

### Night look: same albedo, different light; AgX at night
- Night material colours stay close to day ones (it is the same room); night comes from dim neutral light, the lamp pool, the screen glow and the city. Tone mapping is Neutral by day (palette fidelity) and AgX at night: Neutral's dark offset turned neutral grey walls navy.

### Contact shading instead of post-processing
- Soft gradient planes along wall/floor seams and corners and radial blobs under the plant, shelf and chair give the miniature its grounding. No `@react-three/postprocessing`/N8AO: no new dependency, no extra full-screen passes on phones.

### Accessibility and copy rules from the impeccable audit
- Informational text never below `base-content/65` (5.5:1 light, 7:1 dark); `/40–/55` failed WCAG AA (2.5–3.95:1).
- No single-character shortcuts (WCAG 2.1.4): the 1–6 keys were removed; ← → step through the stops (ignored while typing or composing, in tab lists and dialogs).
- No em dashes in UI copy; en dash for year ranges. The 01–05 project numbers were dropped (scaffolding, the list is already ordered by year).
- The six identical "Journey" nav landmarks in the cards became plain links.

### Robustness
- `SceneBoundary` (error boundary): an error inside the 3D scene removes the scene, never the page.
- `/api/chat` answers 404 unless `ASK_AI_ENABLED=true` (AskAI is off the site; the endpoint would otherwise spend the API key for anyone).
- Dev-only `window.__scene` probe (`Scene.tsx`) lets `scripts/smoke.mjs` hover and click 3D objects; `/lab/*` preview routes were removed.

## 2026-11-05 — 3D interactive rebuild

### ~~Home = scrollytelling resume + a 3D room~~ (superseded the same evening by the full-screen journey above)
- **Decision:** the home page is six real DOM sections (`hero`, `work`, `experience`, `education`, `skills`, `contact`) in a left column, with a fixed transparent WebGL canvas on the right (a band at the top on mobile) showing a small 3D room. The section under the reading line drives the camera to the object that tells that part of the story. Built with three 0.187 + @react-three/fiber 9 + @react-three/drei 10 (+ zustand for DOM ↔ scene state).
- **Reason:** the owner asked for a 3D interactive portfolio and resume; the audience (recruiters, PRODUCT.md) still needs every fact readable in seconds, by screen readers and by search engines — so the facts live in the DOM and the 3D illustrates them.
- **Trade-off:** ~250 KB gzipped of 3D JavaScript, loaded only after the text is on screen; more moving parts to maintain.
- **Rejected:** a full-screen 3D world with content only inside it (slow to scan, inaccessible); CSS-3D "exploded layers" (no lighting/material richness); a Spline embed (heavy runtime, not code-owned); a drivable-car world (cliché, heavy, hides the content).
- Details and the object contract: `docs/scene-brief.md`. Requirements: `docs/SPEC.md`.

### One source of truth for content: `src/data/resume.ts`
- **Reason:** the home sections, the 3D textures (monitor, pinboard, diploma, macropad) and `/resume` all show the same facts; the old pages had already drifted (`/`, `/portfolio`, `/contact`).
- **Trade-off:** `/portfolio` and `/contact` still carry their own copies (left untouched, see SPEC open questions).

### `/resume` — printable one-page resume
- Server-rendered from the data module, A4 `@page` rules, "Print / Save as PDF" via `window.print()`. The paper is pinned to the light theme so a dark-mode print stays readable.
- **Rejected:** a pre-generated PDF in `public/` (goes stale), react-pdf (new dependency).

### The desk lamp is the light/dark toggle
- Clicking the lamp calls the existing `ThemeProvider.setTheme` with the click point as the view-transition origin; the navbar toggle stays for keyboard users. Light = Bangkok afternoon, dark = Bangkok night (lamp on, monitor glow, lit city).

### AskAI removed from the layout (for now)
- Per the owner. `src/components/AskAI.tsx` and `/api/chat` are kept so it can come back.

### PageLoader removed; theme set by an inline script before first paint
- **Reason:** the full-screen loader hid all content until hydration (bad LCP, worse once the 3D bundle exists). Its only job — avoiding a light flash for dark-mode visitors — is done by a 1-line script in `<head>` (CSP already allows inline scripts).

### SectionDots removed, ScrollToTop hidden on the home page
- Replaced by the hero's section links, the cards' previous/next links, arrow keys, the navbar's section label and the 3D objects themselves.

### Scroll snapping
- Every section is one screen; mandatory snapping with a mouse, proximity on touch screens so a card taller than the screen never feels sticky.

### 3D rendering choices
- Text in 3D is drawn on 2D canvases (`canvasTexture.ts`), not troika / drei `<Text>`: the CSP (`script-src` without `blob:`) blocks its workers, and canvases reuse the page fonts.
- `NeutralToneMapping` instead of R3F's default ACES, so palette colours render as designed.
- Shadows: `PCFShadowMap` + `shadow.radius` (three r187 removed `PCFSoftShadowMap`, R3F's default).
- Night lights are near-neutral, not saturated blue: blue light in linear space crushed warm materials to black. The night mood comes from the darker palette, the warm lamp and the monitor glow.
- All objects share `palette.ts`, `SceneLighting.tsx` and real-world metric scale so parallel builders produce one coherent room.
