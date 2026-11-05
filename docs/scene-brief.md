# 3D scene brief — "Passon's desk, Bangkok"

Shared brief for everyone building the 3D home page. Read it fully before writing an object.

## The idea

The home page is a full-screen 3D journey through a small room, Passon's desk in Bangkok, floating on the plain
page background (transparent canvas covering the viewport). Six real DOM sections (`hero`, `work`,
`experience`, `education`, `skills`, `contact`) are one screen of scroll each; each holds a solid card that floats
beside the object (wide screens) or docks at the bottom (phones). Scroll progress moves the camera continuously
along a path through the stops in `src/components/scene/journey.ts`, and the view offset slides the picture away
from the card. The facts are also shown in the room itself (screen UI, pinboard cards, diploma, school frame,
macropad legends, seedling labels, sill postcard):

| Section | Object (who builds it) | What it shows |
|---|---|---|
| hero | whole room, overview | the room itself |
| work | Monitor (agent C) | a mini UI of the selected project on the screen |
| experience | Pinboard on the left wall (agent D) | role cards + project notes linked by thread |
| education | Shelf + framed diploma (agent D) | books and the Thai-Nichi diploma |
| skills | Keyboard + Macropad (agent B), seedling pot (lead) | 8 tools on macropad keycaps; three labelled seedlings sprout for "currently learning" |
| contact | Paper plane + postcard on the window sill (lead) | the plane flies out of the window after a successful send |
| — | Room, window, Bangkok skyline, wall clock (agent A) | the world: day = Bangkok afternoon, night = Bangkok night |
| — | Desk, chair, mug, lamp, resume sheet (lead) | the lamp is the light/dark theme toggle |

Signature details: the 3D keyboard mirrors the visitor's real typing; the wall clock shows the real Bangkok time.

## Art direction — "soft studio miniature"

- Calm, precise, a little warm. Real-world proportions, generous rounding (RoundedBox radius 0.005–0.04 m),
  matte clay-like materials, a restrained palette, one accent used on at most one or two small parts per object.
- Silhouette first, detail second: from the overview camera (~7 m away, fov 30) every object must be
  recognisable at a glance; close-ups (0.6–1.5 m) reveal legends, card text and screen UI.
- Both themes are first-class. Night is lit by dim moonlight, the warm desk lamp (desk, back-left), the cool
  monitor glow and city light through the window. Each object must look intentional in both.
- Never: glossy plastic everywhere, neon, glow halos, rainbow colours, hue gradients on surfaces, emoji,
  noisy greebles, pure black (#000) or pure white (#fff) albedo, uppercase letter-spaced labels.
- Emissive only for real light sources: screen, bulb, lit city windows, small LEDs. Keep it modest.

## Shared code (read-only for object builders)

| File | What it gives you |
|---|---|
| `src/data/resume.ts` | every fact (projects, experience, education, tools, learning). Never hardcode or invent facts. |
| `src/components/scene/palette.ts` | `usePalette()` colours for the current theme, `useMode()`, `useReducedMotion()` |
| `src/components/scene/store.ts` | `useScene` (zustand): `section`, `project`, `hovered`, `sentCount` + setters |
| `src/components/scene/canvasTexture.ts` | `makeCanvasTexture`, `redraw`, `font(px, weight, "sans" \| "mono")`, `fontsReady()`, `roundRect` |
| `src/components/scene/SceneLighting.tsx` | lights, environment and per-theme tone mapping (Neutral by day, AgX at night) |
| `src/components/scene/Interactive.tsx` | hover lift + label + click-to-section wrapper (the lead wraps objects with it) |
| `src/components/scene/journey.ts` | the journey stops (camera position/target, card side, lift, span) |

If you need a shared change (a new palette colour, a store field), do not edit these files — define a local
constant derived from the palette, and list the request in your final report.

## Object contract

- Units are metres, y is up. Author every object in **local space**: origin at the bottom-centre of its
  footprint (y = 0 is the surface it stands on), front facing **+z**. Wall-mounted things: origin at the
  centre of the back face (the face touching the wall), front facing +z.
- The lead's `Diorama` places and rotates objects. Objects never position themselves in world space
  (exception: `Room`, which defines the world).
- Read state with `useScene((s) => s.section)` etc. Colours only from `usePalette()` (derive local shades from
  them if needed). Respect `useReducedMotion()`: no loops, final states set instantly.
- Animate in `useFrame((state, delta) => …)` with `maath` easing (`easing.damp`, `damp3`, `dampC`) so motion is
  frame-rate independent. No allocations inside `useFrame` (reuse vectors/colors via refs or module scope).
- Text on objects: draw on a 2D canvas with `canvasTexture.ts` (drei `<Text>`/troika is not allowed — the
  site's CSP blocks blob workers). Use `font()` for Satoshi / Geist Mono and redraw after `fontsReady()`.
- Internal pointer handlers (e.g. pressing a key) must not call `stopPropagation()` unless the click must not
  navigate — the `Interactive` wrapper above you handles navigation.
- Dispose what you create (textures, geometries made outside JSX) on unmount.
- Shadows: `castShadow` on the few big meshes that matter, `receiveShadow` on surfaces. Small parts don't cast.

## Budgets (per object file)

- ≤ 30 draw calls (use `InstancedMesh` for repeated parts — the keyboard must stay ≤ 12), ≤ 25k triangles.
- Canvas textures ≤ 1024², except the monitor screen (≤ 2048 × 1152).
- No new npm packages. Available: `three` 0.187 (+ `three/addons/*`), `@react-three/fiber` 9, `@react-three/drei` 10, `maath`, `zustand`.

## World layout (metres; room origin = top of the floor, centre)

- Floor slab: x, z ∈ [−1.6, 1.6], top at y = 0, 0.14 thick. Open sides: front (+z) and right (+x).
- Back wall: inner face z = −1.6, 2.5 high, 0.1 thick. Window opening centred at x = 0.3, y = 1.55, 1.2 wide × 0.95 high.
- Left wall: inner face x = −1.6, 2.5 high, 0.1 thick.
- Desk (lead): top surface y = 0.74, footprint x ∈ [−0.45, 1.05], z ∈ [−1.54, −0.82].

| Anchor | Position (world) | Rotation | Notes |
|---|---|---|---|
| Monitor base | (0.30, 0.74, −1.36) | 0 | screen ≈ 0.62 × 0.35, centre ≈ y 1.14 |
| Keyboard centre | (0.26, 0.74, −1.00) | 0 | ≈ 0.33 × 0.12 |
| Macropad centre | (0.66, 0.74, −1.00) | 0 | scaled 1.3 so legends read |
| Mouse | (0.82, 0.74, −0.98) | 0 | |
| Lamp base | (−0.30, 0.74, −1.36) | lead | |
| Mug | (−0.12, 0.74, −1.02) | lead | |
| Paper plane | (0.66, 1.063, −1.53) on the window sill | lead | rest yaw −1.4, scale 1.5 |
| Postcard | (0.80, 1.063, −1.585) on the sill | lead | leans on the frame |
| Seedling pot | (0.52, 0.74, −1.20) | lead | three labelled stakes |
| School frame | (−1.42, 0.82, 0.60) on the shelf | lead | y = +π/2 − 0.4 |
| Chair | (0.30, 0, −0.42) | lead | |
| Rug centre | (0.30, 0, −0.50) | 0 | part of `Room` |
| Plant (floor) | (1.28, 0, −1.25) | 0 | ≤ 1.3 tall, pot ⌀ ≈ 0.34 |
| Wall clock | (−0.95, 1.85, −1.60) on the back wall | 0 | ⌀ 0.34 |
| Pinboard | (−1.60, 1.50, −0.60) on the left wall | y = +π/2 | 1.1 wide × 0.75 high |
| Shelf (bookcase) | (−1.60, 0, 0.65) against the left wall | y = +π/2 | ≈ 1.0 long × 0.35 deep × 0.85 high |
| Diploma frame | (−1.60, 1.45, 0.65) on the left wall | y = +π/2 | |

Rotation y = +π/2 turns an object's local +z (front) to world +x (into the room) and its local +x to world −z,
so it reads correctly (not mirrored) from the camera.

Cameras: one stop per section in `src/components/scene/journey.ts` (position, target, card side, lift, span),
tuned for a full-screen 1440×900 canvas. Use them to judge legibility.

## Verify your work

1. The dev server runs at http://localhost:3005. Screenshot any journey stop:
   `node scripts/shot.mjs / /tmp/shots/x.png --scroll=<sectionId> [--dark] [--w=390 --h=844]`, open the PNG and
   look at it critically. The script prints browser console errors.
2. `node scripts/smoke.mjs` drives the real page (hover/click every object through the dev-only `window.__scene`
   probe, lamp theme switch, arrow keys, project tabs, contact form with a mocked API, phone swipe, `/resume` print
   page count). It must stay green.
3. `npx tsc --noEmit -p .` and `npx eslint <files>`. No new packages, no commits.
(The temporary `/lab/*` preview routes used while the objects were built in parallel have been removed.)

## Final report (what the lead needs from you)

Files created; exported components and props; the anchor you recommend if it differs from the table; which
store state each object reacts to; screenshot paths (light + dark, overview-distance + close-up); draw calls /
triangle estimate; anything you could not do or any shared change you need.
