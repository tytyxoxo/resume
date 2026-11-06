# Passon Rattanakongton — portfolio and resume

A full-screen 3D journey through a small room, Passon's desk in Bangkok, plus a printable one-page resume.
Live: https://passonr.vercel.app
Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4 + daisyUI 5, three.js with @react-three/fiber 9
and @react-three/drei 10.

## Run it

```bash
npm install
npm run dev        # http://localhost:3005
npm run build      # production build (static pages)
```

Environment (`.env.local`):

| Variable | Needed for |
|---|---|
| `RESEND_API_KEY` | the contact and booking forms (`/api/contact`) |
| `ASK_AI_ENABLED=true` + `ANTHROPIC_API_KEY` | only if the AskAI endpoint (`/api/chat`) is switched back on; it answers 404 otherwise |

## Where things are

| Path | What |
|---|---|
| `src/data/resume.ts` | every fact on the site; the home cards, the 3D textures and `/resume` all read from it |
| `src/app/page.tsx` | the journey: six one-screen sections, each with its card (`src/components/home/*`) |
| `src/components/scene/` | the 3D room: `Scene.tsx` (canvas), `Diorama.tsx` (placement and interaction), `journey.ts` (camera stops), `CameraRig.tsx`, `palette.ts`, `SceneLighting.tsx`, `objects/*` |
| `src/app/resume/` | the printable resume (A4, one page, "Print / Save as PDF") |
| `docs/scene-brief.md` | art direction, object contract, world layout, budgets |
| `docs/DECISIONS.md` | why things are the way they are |
| `docs/SPEC.md` | requirements, acceptance criteria and open questions |

## Check it

```bash
node scripts/smoke.mjs                       # needs `npm run dev`; drives the real page with system Chrome
node scripts/shot.mjs / /tmp/x.png --scroll=work --dark   # screenshot one journey stop
node scripts/og.mjs                          # regenerate the share image src/app/opengraph-image.jpg
node scripts/resume-pdf.mjs                  # regenerate public/Passon-Rattanakongton-Resume.pdf after editing the data
```

`/portfolio` and `/contact` (the old pages) redirect to `/#work` and `/#contact`.

The smoke test hovers and clicks every 3D object (through a development-only `window.__scene` probe), switches the
theme with the desk lamp, walks the stops with the arrow keys, opens a project tab, sends the contact form against
a mocked API (no real email), checks touch scrolling on a phone viewport and that `/resume` prints on one A4 page.

If a CSS or Tailwind change has no effect in development, the Turbopack dev cache may be stale: stop `npm run dev`,
`rm -rf .next/dev`, start it again (`next build` shows what the CSS really produces).
