# Decisions

Newest first. Each entry: decision, reason, trade-off, alternatives rejected.

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
