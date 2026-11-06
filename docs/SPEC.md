# SPEC — Portfolio rebuild: "Passon's desk, Bangkok"

> ร่างสำหรับเจ้าของรีวิว · 2026-11-05 · system-analyst agent · อ่านคู่กับ `docs/scene-brief.md` (art direction, world layout, object contract)
> แหล่งข้อมูล: โค้ดใน repo (HEAD `f1e5d1e` + working tree ณ 16:05), `PRODUCT.md`, `DESIGN.md`, `node_modules/next/dist/docs/`, `npm audit --omit=dev`, ทดสอบ print `/resume` ด้วย Chrome จริง

> **อัปเดต 2026-11-05 ค่ำ (lead):** เจ้าของเปลี่ยน layout เป็น **full-screen 3D journey** ("ไม่ต้องแสดงซ้ายขวา") และขอให้ข้อมูลแสดงในฉากด้วย สิ่งที่สร้างจริงอยู่ใน `docs/DECISIONS.md` (หัวข้อ evening) — ข้อกำหนดด้านล่างที่ผูกกับ layout เดิม (canvas ขวา 58%, band 42svh, reading line) ถูกแทนที่ดังนี้
> - **ถูกแทนที่:** FR-10/FR-11, AC-08/AC-10/AC-24, R-03, Q13 → canvas เต็มจอ, section ละหนึ่งจอ, การ์ดทึบลอยข้าง object (จอกว้าง) หรือชิดล่าง (มือถือ), กล้องวิ่งต่อเนื่องตาม scroll ผ่าน stop ใน `src/components/scene/journey.ts`; snap แบบ mandatory (เมาส์) / proximity (จอสัมผัส)
> - **FR-22 เปลี่ยน:** ตัดปุ่มลัด 1–6 ออก (WCAG 2.1.4) เหลือ ← → (ข้ามเมื่อพิมพ์/IME, tab list, dialog) — Q14 ไม่ต้องตอบแล้ว
> - **ทำแล้ว:** FR-01, 02, 04 (`/api/chat` = 404 ถ้าไม่ตั้ง `ASK_AI_ENABLED=true`), 05, 12 (เป็น tab แนวตั้ง), 13, 14, 15, 16 (error boundary; ยังไม่จับ `webglcontextlost`), 19, 20, 21, 23, 28 (`window.__scene` dev-only), 29, 30 (บางส่วน), 33, 34, 42 (`next` 16.4.5, `npm audit --omit=dev` = 0) + ข้อมูลในฉาก (โปสการ์ด, ต้นกล้า 3 ป้าย, กรอบรูปโรงเรียน) + `scripts/smoke.mjs` 23 เช็ก
> - **อัปเดต 2026-11-06 ทำเพิ่ม:** FR-03 บางส่วน (ลิงก์ Resume + `aria-current`; ไม่ใส่ลิงก์ section เพราะมี prev/next, ลูกศร และลิงก์ใน hero แล้ว), FR-06 (307 ไป `/#work` `/#contact` + `noindex` `/playground` `/svln`), FR-07, FR-24 (ยกเว้น `type:"booking"` ฝั่ง server), FR-25 บางส่วน (OG image static + twitter card; canonical/sitemap รอ domain Q15), FR-27, FR-41 บางส่วน (ตัด `'unsafe-eval'` ใน production + `object-src`/`base-uri`/`frame-ancestors`) — รายละเอียดใน `docs/DECISIONS.md` หัวข้อ 2026-11-06; FR-40 ติดเรื่อง license (repo เป็น public) → Q11
> - **อัปเดต 2026-11-06 บ่าย — เจ้าของตอบแล้ว:** Q1 = A (ย้าย HR CheckIn + Admin Dashboard ไปใต้ Frontend Developer), Q2 = 2019–2023 พักและเปลี่ยนสายงาน รับงาน video editor + motion graphic ผ่านคนรู้จัก (ใส่เป็น "Video Editor & Motion Graphics · Freelance"), งานปี 2026 ของ Senior = CRM ภายในองค์กร (เพิ่ม project "Outbound CRM"), Q11 = C (ใช้ CDN ต่อ), Q12 = B (PDF จาก `scripts/resume-pdf.mjs`), Q15 = ยังไม่มีโดเมน → ทำ FR-17 (ปุ่มหยุด animation) และ FR-26 (PDF) แล้ว + แก้ bug แท็บ Featured work กระพริบตอน hover — รายละเอียดใน `docs/DECISIONS.md` หัวข้อ 2026-11-06 (afternoon)
> - **ยังไม่ทำ (รอเจ้าของ/รอบถัดไป):** FR-03 (ลิงก์ใน navbar + `aria-current`), FR-06 (redirect `/portfolio` `/contact`, noindex — Q8–10), FR-07 (ตัด THEMES เหลือ 2), FR-17 (ปุ่มหยุด ambient motion), FR-18 (poster), FR-24, FR-25 (SEO/OG — Q15), FR-26, FR-27, FR-31/32 (hardening `/api/contact`), FR-35, FR-36, FR-40 (self-host Satoshi — Q11), FR-41 (CSP เต็ม)

**ปัญหา:** เว็บเดิมมีเนื้อหาชุดเดียวกันซ้ำ 3 route ซ่อนเนื้อหาไว้หลัง loader/animation และมี AskAI ที่อ้างข้อมูลที่หน้าเว็บไม่มี — rebuild นี้ทำให้เป็น 3D interactive portfolio + resume ที่ recruiter ยังสแกนข้อมูลจริงใน DOM ได้ใน < 30 วินาที และติดต่อได้ทันทีแม้ 3D จะไม่โหลด

**Assumptions**
- A1 ทุกข้อเท็จจริงมาจาก `src/data/resume.ts`; ไม่แต่งตัวเลข/ผลงานเพิ่มจนกว่าเจ้าของตอบ §9
- A2 Deploy บน Vercel (ใช้ `@vercel/speed-insights`); production domain ยังไม่ทราบ (Q15)
- A3 ธีมเริ่มต้น = light ไม่ตาม system preference (ตัดสินใจแล้วใน commit `0d9a00b`)
- A4 Scene สร้างจาก primitive ในโค้ดทั้งหมด — ไม่มี GLTF/Draco/KTX2/HDRI/CDN asset
- A5 ตัวเลข NFR เป็นเป้าเริ่มต้น วัดบน production build (`next build` + `next start`) ไม่ใช่ dev server; Next 16 เลิกแสดง First Load JS ใน build output → วัดด้วย `npx next experimental-analyze` + Playwright resource timing
- A6 Concept (3D, layout) เป็นการตัดสินใจของ lead — spec นี้วิเคราะห์และชี้ความเสี่ยง ไม่ออกแบบใหม่

## 1. สรุปสถานะปัจจุบัน

### 1.1 Routes (baseline ก่อน rebuild)
| Route | มีอะไร | ปัญหา / ความเสี่ยง |
|---|---|---|
| `/` `src/app/page.tsx` | `"use client"` ทั้งหน้า 663 บรรทัด, 6 section | hydrate ทั้งหน้า; `.reveal`, `.animate-hero-name` เริ่มที่ `opacity:0` (เนื้อหาหายถ้า JS พัง, LCP ช้า — ขัดกฎ No-Gate ของ DESIGN.md); `select-none` บนการ์ด → copy ข้อความไม่ได้; `SpeedInsights` อยู่ใน page ไม่ใช่ layout |
| `/portfolio` | projects ชุดที่ 2 + demo/source links (ที่เดียวที่มีลิงก์) | ไม่มีลิงก์เข้า, ไม่มี metadata, eyebrow + gradient bar ขัด DESIGN.md |
| `/contact` | form + booking ชุดที่ 2 (copy เกือบทุกบรรทัด) | copy แบบฟรีแลนซ์ขัด hero (C-07); `bg-white` hard-code (`contact/page.tsx:183`) พังใน dark |
| `/playground` | daisyUI showcase 29 section ใช้ `src/components/ui/*` | ไม่มีลิงก์เข้า แต่ index ได้ |
| `/svln` | แกลเลอรีรูปบุคคล 7 คน (`public/img` 3.5 MB + สำเนาซ้ำใน `/img`) | ไม่เกี่ยวกับ resume, รูปบุคคลที่สาม, social link เป็น placeholder, `div onClick` ใช้ keyboard ไม่ได้ |
| `/api/contact` | Resend, ตรวจ type/length/email | ไม่มี rate limit/honeypot, ไม่ strip CR/LF ใน subject, แยก booking กับข้อความไม่ได้ |
| `/api/chat` | proxy ไป Anthropic (`claude-haiku-4-5-20251001`) | ไม่มี auth/rate limit — ถ้า prod มี `ANTHROPIC_API_KEY` คือ endpoint สาธารณะที่ใครก็ใช้เครดิตได้; system prompt อ้างข้อมูลที่เว็บไม่มี (C-06) |

### 1.2 Global chrome, theme, fonts, CSS
- `layout.tsx` (baseline): `ThemeProvider` > `PageLoader` (overlay เต็มจอปิดเนื้อหาจน hydrate) + `UIExtras` (ScrollProgress/ScrollToTop/SectionDots) + `AskAI` (import ตรง) + `Navbar` + `FooterWrapper` (ซ่อนบน `/`)
- `ThemeProvider`: อ่าน `localStorage` ใน `useState` initializer (server = light, client = ค่าที่เก็บ → mismatch ได้), ตั้ง `data-theme` ใน `useEffect` (หลัง paint → แฟลช จึงต้องมี PageLoader), เรียก `setThemeState` ใน callback ของ `startViewTransition` โดยไม่ `flushSync` → snapshot "new" อาจถูกจับก่อน React commit (ยังไม่พิสูจน์ — R-06)
- `THEMES` 35 ธีม + `@plugin "daisyui" { themes: all }` (`daisyui/themes.css` 38 KB ดิบ) แต่ใช้จริงแค่ light/dark; `ThemeSelector` ไม่มีใครใช้ — localStorage เก่าอาจเป็น `synthwave` ฯลฯ
- `Navbar`: ไม่มีลิงก์ไป section (แสดงแค่ชื่อ section ปัจจุบัน), ตรวจ active ด้วย `scrollend`; `ThemeToggle` ใช้ `focus:outline-none` โดยไม่มี focus style แทน และสูง 22 px บนมือถือ (< 24 px, WCAG 2.5.8)
- Fonts: Satoshi (body) เป็น stylesheet render-blocking จาก `api.fontshare.com` (third-party); Geist Mono ผ่าน `next/font`. `DESIGN.md` เขียนว่า Geist Sans และใช้ token ของ daisyUI 4 (primary `oklch(49.12% 0.3096 275.75)`) — ค่าที่ติดตั้งจริง (daisyUI 5) คือ `oklch(45% 0.24 277)`
- `globals.css`: `scroll-behavior: smooth` ไม่ผูก reduced-motion (Next 16 เลิก override ตอนเปลี่ยน route — ถ้ายังใช้ต้องใส่ `data-scroll-behavior="smooth"` ที่ `<html>`); `scroll-snap-type: y mandatory` + `scroll-snap-stop: always`; animation ของ view-transition circle ไม่ถูกปิดเมื่อ reduced motion
- `PRODUCT.md`/`DESIGN.md` ระบุ anti-reference ตรงๆ: "3D perspective transforms", "scroll hijacking", "over-animated creative portfolio" → concept ใหม่ขัดเอกสารแบรนด์ (R-01)

### 1.3 CSP และ security
- `next.config.ts` มีแค่ `script-src 'self' 'unsafe-eval' 'unsafe-inline'` → ไม่มี `frame-ancestors`/`object-src`/`base-uri`; Next docs (`01-app/02-guides/content-security-policy.md`) ยืนยันว่า `'unsafe-eval'` จำเป็นแค่ตอน dev
- ไม่มี `worker-src` → ใช้ `script-src` แทน → **blob: worker ถูกบล็อก**: troika (`drei <Text>`) ตกไปทำงานบน main thread และถ้าไม่ส่ง `font` จะ fetch font จาก `cdn.jsdelivr.net`; Draco (`gstatic.com`), KTX2 (`jsdelivr`), `Environment preset` (`raw.githack.com`) เป็น third-party → lead ตัดสินใจแล้ว: ข้อความใน 3D วาดด้วย CanvasTexture และใช้ `Lightformer` แทน preset ✔
- `.env.local` ไม่เคยถูก commit (ตรวจ git history แล้ว) ✔ — repo `github.com/tytyxoxo/resume` เป็น public

### 1.4 Dependencies (lockfile) และ `npm audit --omit=dev`
- next 16.2.2 (pin), react 19.2.4, three 0.187.0 (ต้องมี WebGL2 — `WebGLRenderer` throw ถ้าเป็น WebGL1), @react-three/fiber 9.8.2 (bridge React context เข้า Canvas อัตโนมัติ ✔; error ใน Canvas ถูก rethrow ออกนอก Canvas), drei 10.7.9 (`sideEffects:false`; พ่วง hls.js, @mediapipe/tasks-vision, detect-gpu — tree-shake ได้ถ้าไม่ import), zustand 5.0.16, daisyui 5.5.19, tailwindcss 4.2.2, playwright 1.60 (library เท่านั้น; ไม่มี `@playwright/test`/test/config)
- audit: **9 รายการ — critical 1, high 4, moderate 4**: `next ≤ 16.4.0` (critical — มี RCE ใน Image Optimization, cache poisoning, proxy bypass; แก้ที่ `16.4.5`), `postcss` + `sharp` (ผ่าน next), `nanoid`, `source-map-js` (high), `resend → svix → uuid`, `baseline-browser-mapping` (moderate)

### 1.5 ซ้ำ / ไม่ได้ใช้ / bug เล็ก
- projects / experience / form มี 3 ชุดใน `/`, `/portfolio`, `/contact` (ไม่ sync กัน)
- ไม่มีใครใช้: `AskAI.tsx` (เก็บไว้ตามสั่ง), `ThemeSelector.tsx`, `DatePicker.tsx`, `TimePicker.tsx`, `public/{file,globe,next,vercel,window}.svg`, `/img`, `src/app/favicon.svg` (favicon convention ต้องเป็น `.ico`); `src/components/ui/*` ใช้แค่ `/playground`; `README.md` ยังเป็น boilerplate
- `Modal` render children ตลอด → `CallyDatePicker` mount ตอนโหลดหน้า → `import("cally")` ทุกครั้งแม้ไม่เปิด booking
- booking: `required` อยู่บน `<input type="hidden">` (ไม่ถูก validate → ส่งได้โดยไม่มีวัน); `min` คำนวณด้วย `toISOString()` (UTC → ช่วง 00:00–06:59 เวลาไทยได้วันเมื่อวาน); label "Date" ไม่ผูกกับ control

### 1.6 Contrast (คำนวณจาก token daisyUI 5 ที่ติดตั้ง บนพื้น `base-100`)
| ข้อความ | light | dark |
|---|---|---|
| `text-base-content` /85 · /75 · /70 · /60 · /55 · /50 · /40 | 11.2 · 7.8 · 6.5 · 4.6 · **3.9** · **3.4** · **2.5** | 11.0 · 8.9 · 7.9 · 6.2 · 5.4 · 4.7 · **3.5** |
| `text-success` · `text-error` (สถานะฟอร์ม) | **1.96** · **2.87** | 8.1 · 5.5 |
| `text-primary` · ตัวอักษรบน `btn-primary` | 8.3 · 6.8 | **3.40** · **4.14** |

ตัวหนา = ต่ำกว่า AA 4.5:1 · เป้า AAA ของ body (7:1) ผ่านเฉพาะ ≥ `/75` (light) และ ≥ `/65` (dark)

### 1.7 Working tree และงาน rebuild ที่เริ่มแล้ว
- modified 16 ไฟล์ (รวม `package.json` +three/R3F/drei/zustand), ลบ `AskAILazy.tsx`, `PageLoader.tsx`, `SectionDots.tsx`; untracked: `PRODUCT.md`, `DESIGN.md`, `docs/`, `scripts/shot.mjs`, `src/app/{lab,resume}/`, `src/components/{home,scene}/`, `src/data/`
- ทำแล้ว ✔: AskAI + PageLoader ออกจาก layout; inline script ตั้งธีมก่อน paint; `page.tsx` เป็น Server Component + islands (`Hero`, `WorkList`, `Contact`, `HomeScene`); `/resume` — ตรวจด้วย Chrome `page.pdf()` แล้ว **ได้ A4 1 หน้าทั้ง light และ dark** (พิมพ์ตัวเข้มเพราะ `article[data-theme="light"]`)
- ยังขัด spec: inline script ไม่ whitelist ค่า; `HomeScene.webglAvailable()` ยอม WebGL1 และไม่มี error boundary (ไม่มี `error.tsx` ใน app → ทั้งหน้าพังได้); import scene ทันทีหลัง mount (ไม่รอ `load`/idle); ปุ่ม 1–6 ปิดไม่ได้และไม่เช็ก `e.repeat`; `Contact` ยังใช้ `toISOString()`, hidden-input `required`, `text-success/error`; ใช้ `/55` `/50` ใน `WorkList`, `Hero`, mini-footer; desktop ยัง `scroll-snap-type: y mandatory`

## 2. Content inventory — `src/data/resume.ts`
| กลุ่ม | ข้อมูล | ใช้ที่ |
|---|---|---|
| `profile` | Passon Rattanakongton · Senior Frontend Developer · Nutrition Profess · Bangkok, Thailand · `Asia/Bangkok` · "Available for new opportunities" · `summary` (เขียนใหม่) · tyty.passon@gmail.com · linkedin.com/in/passon-rattanakongton | hero, contact, `/resume`, นาฬิกา |
| `projects` ×5 | 01 Design Component Library 2026 Personal/In progress — Next.js·TS·Tailwind, demo `designcomponent.vercel.app` (HTTP 200), source `github.com/tytyxoxo/playground` (200) · 02 HR CheckIn Dashboard 2025 · 03 Admin Dashboard 2024 (Next.js·TS·Tailwind) · 04 Data Management System 2024 (React·TS·Tailwind) · 05 Order Management System 2023 (React·JS·Vite) — 02–05 Internal/Production | Work, จอ monitor, pinboard, `/resume` |
| `experience` ×2 | Senior Frontend Developer 2026—Present (React·Next.js·TS·Tailwind; HR CheckIn, Admin Dashboard, mentoring) · Frontend Developer 2023—2025 (React·JS·Tailwind·Figma; OMS, Data Management Web) | Experience, pinboard |
| `education` ×2 | Thai-Nichi Institute of Technology — "Faculty of Information Technology and Multimedia" 2015—2019, Second Class Honours · Udomsuksa School — High School 2012—2015, Arts-Mathematics Program | Education, ชั้นหนังสือ + ใบปริญญา |
| `allTools` ×8 | React, Next.js, JavaScript, TypeScript, Tailwind CSS, Figma, Git, Vite (รวม `stack` + `toolchain`) | hero, macropad |
| `learning` ×3 | AI integration · Web animations (GSAP, Framer Motion, CSS keyframes) · System design | Skills, ใบใหม่ของต้นไม้ |
| `bookingSlots` ×5 | 09–10, 10–11, 13–14, 14–15, 16–17 (ไม่มี timezone ใน data) | booking modal |

ไม่ได้ย้ายมา: ประโยค hero เดิม "I build clean, responsive interfaces and ship them with care." และ copy `/contact` เดิม ("Let's build something remarkable together", "Currently taking on select projects…")

**ข้อขัดแย้ง / ช่องโหว่ — ถามเจ้าของ ไม่แก้เอง**
- C-01 ตำแหน่ง Senior (2026—Present) อ้าง HR CheckIn Dashboard + Admin Dashboard แต่ project ลงปี 2025 และ 2024 (อยู่ในช่วง Frontend Developer) — pinboard ที่โยงเส้น role↔project จะทำให้เห็นชัดขึ้น
- C-02 ชื่อไม่ตรงกัน: "Data Management Web" (experience) vs "Data Management System" (project); "OMS (Order Management System)" vs "Order Management System"
- C-03 stack ไม่ตรง: role Frontend Developer ไม่มี TypeScript/Vite แต่ project ในช่วงนั้นใช้ (DMS = TS, OMS = Vite); OMS ไม่มี Tailwind แต่ role มี
- C-04 `education[0].degree` เป็นชื่อคณะ ไม่ใช่ชื่อปริญญา/สาขา → ใบปริญญาใน 3D และ `/resume` ไม่มีชื่อปริญญาให้แสดง
- C-05 จบปี 2019 แต่งานแรกเริ่ม 2023 (ช่องว่าง 4 ปี); ทุก period ไม่มีเดือน; Senior < 1 ปี; AI prompt เขียน "ประสบการณ์ 3+ ปี"
- C-06 system prompt ของ `/api/chat` มีข้อมูลที่เว็บไม่มี: React Native, "shared component library ที่นักพัฒนากว่า 50 คนใช้", "analytics dashboard เพิ่ม retention 40%", "UI แอปมือถือ 3 แอป" — ขณะที่ component library บนเว็บเป็น Personal / In progress
- C-07 สถานะ: hero "Available for new opportunities" vs `/contact` เดิมแบบฟรีแลนซ์ vs ปุ่ม "Book a consultation" (สื่อเป็นที่ปรึกษา) ขณะยังทำงานที่ Nutrition Profess
- C-08 LinkedIn URL มี `TODO: Replace with your actual LinkedIn profile URL` (`src/components/Footer.tsx:4`); ตรวจอัตโนมัติไม่ได้ (LinkedIn บล็อก bot)
- C-09 `profile.summary` เป็นข้อความใหม่ ไม่ได้มาจากหน้าเดิม → ต้องได้รับอนุมัติ
- C-10 ไม่มีผลลัพธ์/ขนาดงานใน project ใดเลย (critique 2026-06-02 ข้อ P2) — ขัด PRODUCT.md "Credibility through specificity"
- C-11 copy "book a call in one of the open time slots" สื่อว่ามีการเช็กเวลาว่าง ซึ่งไม่มี
- C-12 macropad 3×3 = 9 ปุ่ม แต่มี 8 tools → ปุ่มที่ 9 ยังไม่กำหนด (lead ตัดสิน; ห้ามเพิ่ม skill ที่ไม่มีใน data)

## 3. Users & key journeys
| ID | ผู้ใช้ / บริบท | เส้นทาง | สำเร็จเมื่อ |
|---|---|---|---|
| J-01 | Recruiter, desktop 1440×900, เปิดหลายแท็บ | `/` → เห็น availability, ชื่อ, role, Bangkok + เวลา, summary, CTA ทันที (ไม่รอ 3D) → scroll 1 ครั้งเห็น Work 5 รายการ → Email / LinkedIn / Resume | ติดต่อหรือได้ PDF ใน 30 วินาที; ไม่มีหน้า loading |
| J-02 | Hiring manager, desktop, 5–10 นาที | Work (hover/focus เปลี่ยนจอ) → Experience (pinboard) → Skills → demo/source → อาจเปิด DevTools/Lighthouse/repo | ข้อมูลสอดคล้องกัน (C-01..06), Lighthouse ดี, console สะอาด |
| J-03 | มือถือ (iPhone 13 / Pixel 7) มักมาจาก LinkedIn in-app browser | band 3D ด้านบน อ่านเนื้อหาใต้ band แตะ object → ไป section | ปัดแนวตั้งบน band แล้วหน้า scroll, ไม่มี horizontal scroll ที่ 320 px, mailto ใช้ได้ |
| J-04 | Keyboard-only / screen reader | Skip link → nav → section; Tab ผ่าน project row, ฟอร์ม, booking | ทุกข้อมูล/การกระทำอยู่ใน DOM; focus เห็นชัดและไม่ถูก navbar/band บัง; สถานะฟอร์มถูกอ่าน; canvas ไม่ถูกอ่าน |
| J-05 | เครื่องสเปกต่ำ / ไม่มี WebGL2 / Save-Data | gate ไม่ผ่าน → ไม่ดาวน์โหลด three.js → poster หรือพื้นที่ว่างที่ตั้งใจ | เนื้อหาครบ, ไม่มี error, JS อยู่ในงบก่อน scene |
| J-06 | ต้องการ PDF | "Resume" → `/resume` → Print / Save as PDF (หรือไฟล์ PDF ตาม Q12) | A4 1 หน้า พื้นขาวตัวเข้มทุกธีม, URL อ่านได้บนกระดาษ |
| J-07 | กลับมาซ้ำ เคยเลือก dark | เปิด `/` | dark ตั้งแต่ paint แรก, ห้องเป็นกลางคืน, ไม่มีแฟลช |

## 4. Functional requirements
| ID | Requirement | P |
|---|---|---|
| FR-01 | `/` render 6 `<section id>` (`hero, work, experience, education, skills, contact`) จาก `resume.ts` ฝั่ง server; h1 เดียว, h2 ต่อ section; ไม่มีเนื้อหาที่เริ่มด้วย `opacity:0` รอ JS/animation | M |
| FR-02 | Hero: availability, ชื่อ, role, summary, "Bangkok · เวลา", CTA ติดต่อ (`#contact` หรือ mailto) + `Resume` — อยู่ใน viewport แรก (มือถือ: ใต้ band) | M |
| FR-03 | Navbar: brand, ลิงก์ section, `Resume`, `#theme-toggle`; section ปัจจุบันมี `aria-current="location"` | M |
| FR-04 | ไม่มี AskAI ในทุก route; เก็บ `AskAI.tsx` + `/api/chat` ไว้ แต่ endpoint ตอบ 404 เว้นแต่ `ASK_AI_ENABLED=true` | M |
| FR-05 | `/resume`: server-render, A4 1 หน้า, พิมพ์ธีม light เสมอ, ตอนพิมพ์แสดง URL ของ LinkedIn/email เป็นข้อความ, ปุ่ม `#print-resume`, ไม่โหลด 3D | M |
| FR-06 | `/portfolio`, `/contact` → 308 (Q8); `/svln`, `/playground` ตาม Q9–10 (ระหว่างนี้ `noindex`); ลบ `/lab/*` + `scripts/shot.mjs` ก่อน ship | M |
| FR-07 | ธีมเหลือ `light`/`dark` (`THEMES`, daisyUI `themes: light --default, dark`); inline script whitelist ค่า; `#theme-toggle` = `button[aria-pressed]` focus ring ชัด; ไม่มี loader | M |
| FR-08 | Scroll แบบ native: ไม่มี `mandatory` snap; smooth เฉพาะ `prefers-reduced-motion: no-preference`; `scroll-padding-top` = navbar (+ band บนมือถือ) | M |
| FR-10 | Scene island โหลดหลัง `load` + idle เมื่อผ่าน gate (WebGL2, ไม่ติด `failIfMajorPerformanceCaveat`, ไม่ Save-Data, ไม่ `?3d=off`); `#scene-root[data-scene-state]`; `aria-hidden`; desktop fixed ขวา 58% โปร่งใส, < lg เป็น band บน 42svh (Q13) | M |
| FR-11 | Section ที่อยู่บน reading line → `setSection` → กล้องไป preset ของ section (แยก preset desktop/band), บินแบบ damped ≤ 1.2 s, reduced motion = ตัดภาพ; โหลดครั้งแรก/deep link วางกล้องทันที | M |
| FR-12 | Work: ทุก row มี `button[data-project-id][aria-pressed]`; hover/focus/tap → `setProject` → จอ monitor วาด mini UI แบบ schematic จากฟิลด์ใน `resume.ts` เท่านั้น (ไม่มีข้อมูล/โลโก้จริงของบริษัท) | M |
| FR-13 | Object ที่ interactive: label ตอน hover (pointer: fine), click/tap → `goToSection`; ลาก > 4 px ไม่นับเป็น click | M |
| FR-14 | โคมไฟ = ทางลัดสลับธีม เรียก `setTheme` ตัวเดียวกับ `#theme-toggle` โดย VT circle เริ่มที่ตำแหน่งโคมบนจอ; reduced motion = ไม่มี VT animation; DOM toggle ยังเป็นทางหลัก | M |
| FR-15 | Palette light = บ่ายกรุงเทพ / dark = กลางคืน; DOM และ canvas เปลี่ยนใน transition เดียวกัน | M |
| FR-16 | Error boundary รอบ Scene + จัดการ `webglcontextlost`; ทุกความล้มเหลว → `fallback` โดยเนื้อหา DOM ไม่กระทบ ไม่ขึ้น error page | M |
| FR-17 | `#scene-motion` (DOM button) พัก/เล่น ambient loop (WCAG 2.2.2); reduced motion → พักเป็นค่าเริ่ม | M |
| FR-18 | Poster ต่อธีม (≤ 60 KB) ระหว่างโหลดและเป็น fallback | S |
| FR-19 | Skills: macropad 8 legend จาก `allTools` (+ ปุ่มที่ 9 ตาม C-12), keyboard, ต้นไม้งอกใบ = `learning.length` | S |
| FR-20 | Pinboard: การ์ดจาก `experience`, โยง project ตาม mapping ชัดเจน (เสนอ `experience[].projects: ProjectId[]`) ไม่คำนวณจากปี; ใบปริญญาใช้ข้อมูลจริงเท่านั้น | S |
| FR-21 | Keyboard mirror ตาม `event.code`; ข้ามเมื่อ target แก้ไขได้หรือ `isComposing` (IME ไทย); ปล่อยทุกปุ่มเมื่อ `blur`/`visibilitychange`; ไม่เก็บ ไม่ส่ง | S |
| FR-22 | ปุ่ม 1–6 ไป section (ข้าม modifier, editable, `repeat`) + `#shortcuts-toggle` ปิดได้ (Q14) | S |
| FR-23 | เวลา Bangkok: `time#bkk-time[datetime]` ใน hero + นาฬิกาผนัง (เข็มชั่วโมง/นาที) render หลัง mount, อัปเดตทุกนาที | S |
| FR-24 | Booking: วันที่บังคับจริง (client + server), `min` = วันนี้ใน `Asia/Bangkok`, slot ระบุ ICT (UTC+7), ส่ง `type:"booking"`, โหลด `cally` ตอนเปิด modal (Q16) | S |
| FR-25 | `metadataBase` (Q15), OG image static, canonical, `sitemap.ts`/`robots.ts` | S |
| FR-26 | PDF สำเร็จรูป generate จาก `/resume` (Q12) | S |
| FR-27 | ย้าย `SpeedInsights` ไป layout (วัด `/resume` ด้วย) | S |
| FR-28 | dev/test hooks เฉพาะ non-production: `?3d=on\|off\|crash`, `window.__scene.screenPos(id)` → `{x,y}` | S |
| FR-29 | อัปเดต `PRODUCT.md` + `DESIGN.md` ให้ตรงงานจริง (3D, font, token daisyUI 5, ข้อยกเว้นสี hard-code ใน `palette.ts`) หลังเจ้าของอนุมัติ | S |
| FR-30 | Contact form: สถานะใน `#contact-status[role=status]`, network error ไม่ค้าง, error คงค่าที่กรอก, success → `markSent()` | M |
| FR-31 | `/api/contact`: honeypot, เวลากรอกขั้นต่ำ 3 s, ตรวจ `Origin`, strip CR/LF, ข้อความ error ไม่เปิดเผยรายละเอียด, `CONTACT_DRY_RUN=1` ข้าม Resend | M |
| FR-32 | หมายเหตุ privacy ใต้ฟอร์ม ("ส่งเข้า inbox ผ่าน Resend ไม่เก็บไว้") | S |
| FR-33 | ลากหมุน diorama ≤ ±15° yaw / ±8° pitch แล้วเด้งกลับ เฉพาะ fine pointer, ปิดเมื่อ reduced motion | C |
| FR-34 | Paper plane บินออกหน้าต่างเมื่อ `sentCount` เพิ่ม (reduced motion: หายไปเฉยๆ) แล้วลำใหม่กลับมา | C |
| FR-35 | `PerformanceMonitor`: ลด DPR/ปิดเงา → ถ้า < 24 fps นาน 5 s สลับเป็น poster | C |
| FR-36 | JSON-LD `Person` | C |
| FR-40 | Self-host font (Q11); ไม่มี request ไป third-party ตอน runtime | M |
| FR-41 | CSP + security headers ตาม §5.7 | M |
| FR-42 | `next ≥ 16.4.5`; `npm audit --omit=dev` ไม่มี critical/high ก่อน deploy | M |

## 5. Non-functional requirements

### 5.1 Performance budgets (production build)
| Metric | Budget |
|---|---|
| LCP | ≤ 2.5 s p75 (Speed Insights); lab: Lighthouse mobile ≤ 2.5 s, desktop ≤ 1.2 s; element LCP ต้องอยู่ใน `#hero` ไม่ใช่ canvas/poster |
| CLS / INP / TBT | CLS ≤ 0.05 (canvas/poster เป็น fixed, เนื้อหาจองที่ `pt-[42svh]` ไว้แล้ว) · INP ≤ 200 ms · TBT (mobile) ≤ 200 ms; long task จาก scene init ≤ 150 ms ต่อ task |
| ก่อน first paint (render-blocking) | HTML + CSS ไฟล์เดียว ≤ 25 KB gz + inline theme script < 1 KB; ไม่มี third-party stylesheet; font `display: swap` |
| JS ก่อน scene | ทุก script ที่เริ่มโหลดก่อน `loadEventEnd` รวม ≤ 180 KB gz |
| Scene chunk | three + R3F + drei + objects ≤ 350 KB gz; เริ่มโหลดหลัง `load` + `requestIdleCallback` (timeout 2 s); ไม่โหลดเลยใน `/resume` และ fallback |
| อื่นๆ | `cally` โหลดเมื่อเปิด booking · font ≤ 2 family / ≤ 4 ไฟล์ woff2 preload เฉพาะ body regular · poster ≤ 60 KB/ธีม `fetchpriority="low"` |

### 5.2 3D runtime
- FPS: desktop 60 fps (p95 frame ≤ 20 ms) บน M1 / Iris Xe ที่ 1440×900; มือถือระดับกลาง (Pixel 6a / iPhone 12) ≥ 30 fps ต่อเนื่อง (p95 ≤ 34 ms)
- DPR cap: desktop `[1, 2]`, < lg หรือ coarse pointer `[1, 1.5]`; ลดเหลือ 1 เมื่อ fps ตก
- ทั้งฉาก: draw calls ≤ 150 (main pass, มุม overview) / ≤ 200 รวม shadow pass, triangles ≤ 200k, shader programs ≤ 10 (ใช้ material ร่วมกัน), GPU texture ≤ 48 MB; ต่อ object ตาม `docs/scene-brief.md` (≤ 30 calls, keyboard ≤ 12, ≤ 25k tris)
- เงา: directional light ตัวเดียว map ≤ 2048 (desktop), ≤ 1024 หรือปิด (มือถือ); ควรอัปเดต shadow map เฉพาะตอนฉากเปลี่ยน (`shadowMap.autoUpdate = false`)
- ไม่มี postprocessing, ไม่มี network asset ในฉาก; พัก/reduced motion/กล้องนิ่ง → `frameloop="demand"`
- State ความถี่สูง (ปุ่มที่กดอยู่, เวลา) ห้าม re-render React tree ของฉาก — อ่านแบบ transient (`useScene.getState()`/`subscribe`) ใน `useFrame`
- รับ `webglcontextlost/restored`; สลับ `/` ↔ `/resume` 5 รอบต้องไม่มี warning "Too many active WebGL contexts"

### 5.3 Accessibility — WCAG 2.2 AA ขั้นต่ำ + AAA contrast ของ body ตาม PRODUCT.md
- Contrast: body ≥ 7:1 ทั้งสองธีม (light ใช้ ≥ `/75`), ข้อความรอง/metadata ≥ 4.5:1 (light ≥ `/70`, ห้าม `/60` ลงไปกับข้อความ); ข้อความสถานะห้ามใช้ `text-success`/`text-error` บน light (ใช้ base-content + ไอคอน); ตัวอักษร `btn-primary` ใน dark ต้อง ≥ 4.5:1 (ตอนนี้ 4.14 → override token); `text-primary` ใน dark ห้ามใช้กับข้อความเล็ก
- Canvas container `aria-hidden="true"` ไม่ focusable; ทุกอย่างใน 3D มีคู่ใน DOM (โคม = `#theme-toggle`, object = nav link, จอ = Work list)
- 2.2.2 Pause/Stop/Hide: ambient loop ทั้งหมดหยุดด้วย `#scene-motion`; 2.3.3: reduced motion → ตัดภาพ, ไม่มี loop, ไม่มี VT circle, เครื่องบินไม่บิน
- 2.1.4 Character key shortcuts: 1–6 ต้องปิดได้ (Q14) · 2.4.7/2.4.11: focus ring ชัดทุก control และไม่ถูก navbar/band บัง (`scroll-padding-top`)
- 2.5.8 target ≥ 24×24 px · 1.4.10 reflow ที่ 320 px · 4.1.3 สถานะฟอร์มใน `role="status"` · 2.5.7: การลากเป็นแค่ cosmetic เด้งกลับ ไม่มีข้อมูลที่ต้องลากถึงจะเห็น
- ห้าม `select-none` บนเนื้อหา; `lang="en"`; heading: h1 เดียว + h2 ต่อ section

### 5.4 SEO
- เนื้อหาทั้งหมดอยู่ใน DOM จาก server (ทดสอบด้วย JS ปิด); canvas ไม่มีข้อมูลที่ DOM ไม่มี
- `metadataBase`, title/description ต่อหน้า, OG/Twitter image 1200×630, canonical, sitemap (`/`, `/resume`), `noindex` ให้ `/lab/*` (จนลบ), `/playground`, `/svln` ตาม Q9–10; redirect ถาวรใช้ 308

### 5.5 Browser support
- Baseline ของ Next 16: Chrome/Edge/Firefox 111+, Safari/iOS 16.4+ — เนื้อหา, ฟอร์ม, `/resume` ต้องใช้ได้ทั้งหมด
- 3D ต้องมี WebGL2 และไม่ติด major performance caveat; View Transition เป็น progressive (มี guard `document.startViewTransition` แล้ว); ห้ามพึ่ง `scrollend`
- In-app browser (LinkedIn/LINE/Facebook): เนื้อหา + mailto ต้องใช้ได้; `window.print()` อาจไม่ทำงาน → Q12
- เมทริกซ์ทดสอบ: Chrome (macOS/Windows), Safari 18 (macOS + iOS), Firefox, Android Chrome ระดับกลาง, LinkedIn in-app บน iOS (manual)

### 5.6 Privacy
- ไม่มี cookie; ไม่มี tracking นอกจาก Vercel Speed Insights (cookieless, aggregate); ไม่มี request ไป third-party ตอน runtime
- Keyboard mirror ประมวลผลในเครื่องเท่านั้น ไม่เก็บ/ไม่ส่ง/ไม่ log และไม่ฟังเมื่อ focus อยู่ในช่องกรอก
- ฟอร์มส่งผ่าน Resend ถึง inbox เจ้าของ ไม่เก็บใน server ไม่ log ตัวข้อความ · `/svln` มีรูปบุคคลที่สาม → Q9

### 5.7 Security
- CSP production (แบบ "Without Nonces" ของ Next docs; dev เพิ่ม `'unsafe-eval'` และ `connect-src ws:`):
  `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests` — ไม่เปิด `worker-src blob:` (ไม่ใช้ troika/Draco); ถ้าเลือก Q11 C ต้องเพิ่ม host ของ Fontshare
- Header เพิ่ม: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `/api/contact` ตาม FR-31; `/api/chat` ตาม FR-04 และถอด `ANTHROPIC_API_KEY` ออกจาก production env ถ้ายังไม่ใช้; dependency ตาม FR-42

## 6. Acceptance criteria (Playwright)
**Selector contract** (spec นี้กำหนด; id ที่มีอยู่แล้วคงไว้): `section#hero|#work|#experience|#education|#skills|#contact` · `header nav a[href^="#"]`, `a[href="/resume"]` · `#theme-toggle` · `#scene-root[data-scene-state][data-section][data-camera][data-project][data-mode][data-sent]` (`data-camera` = section ที่กล้องนิ่งแล้ว, ระหว่างบิน = `moving`) · `#scene-motion` (`aria-pressed="true"` = พัก) · `#work button[data-project-id]` · `time#bkk-time` · `#contact-form`, `#contact-name|email|subject|message`, honeypot `input[name="website"]`, `#contact-status` · `#booking-open`, `#booking-form`, `#booking-date`, `#booking-time` · `#shortcuts-toggle` · `/resume`: `#print-resume`
**หมายเหตุ QA:** รันบน `next build && next start`; ใช้ Chrome ของเครื่อง (`executablePath` แบบ `scripts/shot.mjs`) หรือ `?3d=on` เพราะ headless shell อาจตกไป SwiftShader แล้ว gate ปฏิเสธ; axe/Lighthouse เป็นเครื่องมือใหม่ ต้องขออนุมัติก่อนติดตั้ง

1. [ ] AC-01 (FR-01) Given `javaScriptEnabled:false` When GET `/` Then มี 6 section ตามลำดับ, มี `h1` เดียว = "Passon Rattanakongton", และชื่อทุก project, ทุก role title, ชื่อโรงเรียน, email มองเห็นได้ (`opacity` = 1)
2. [ ] AC-02 (FR-02) Given 1440×900 และ 390×844 กับ `?3d=off` When โหลด `/` Then h1, role, availability, CTA ติดต่อ และ `a[href="/resume"]` อยู่ใน viewport แรก (มือถือ: อยู่ใต้ band)
3. [ ] AC-03 (FR-03) Given desktop When scroll ไป `#skills` Then `a[href="#skills"]` ใน nav มี `aria-current="location"` และลิงก์อื่นไม่มี
4. [ ] AC-04 (FR-04) Given ทุก route Then ไม่มี `[aria-label="Ask AI"]`; When POST `/api/chat` โดยไม่ตั้ง `ASK_AI_ENABLED` Then 404
5. [ ] AC-05 (FR-05) Given `localStorage.theme="dark"` When `/resume` + `emulateMedia({media:"print"})` + `page.pdf({format:"A4"})` Then 1 หน้า, `article h1` สีเข้ม, URL LinkedIn เป็นข้อความที่มองเห็น, และ `document.querySelector("canvas")` เป็น null
6. [ ] AC-06 (FR-06) When GET `/portfolio` Then 308 `Location: /#work`; `/contact` → 308 `/#contact`; release build: `/lab/base` → 404
7. [ ] AC-07 (FR-07) Given `localStorage.theme="dark"` Then ที่ `DOMContentLoaded` (ก่อน hydrate) `html[data-theme="dark"]`; Given `"synthwave"` Then `light`; When click `#theme-toggle` Then สลับ light↔dark, `aria-pressed` ตาม, `localStorage` ถูกเขียน, focus ด้วย Tab แล้ว outline กว้าง > 0
8. [ ] AC-08 (FR-08) Given desktop 1280×720 When กด `Space`/`PageDown` ซ้ำจนสุดหน้า Then ทุกบรรทัดของทุก section เคยอยู่ใน viewport (ไม่ถูก snap ข้าม); Given 390×844 When activate `a[href="#contact"]` Then `#contact h2` อยู่ต่ำกว่าขอบล่างของ band + navbar
9. [ ] AC-09 (FR-10) Given WebGL ปกติ Then `#scene-root` เปลี่ยน `idle → loading → ready` และ request แรกของ scene chunk เริ่มหลัง `loadEventEnd`, JS ก่อน `load` ≤ 180 KB; Given Chrome `--disable-webgl --disable-webgl2` (หรือ `?3d=off`) Then `data-scene-state="fallback"`, 0 `pageerror`, ไม่มี request ของ three.js
10. [ ] AC-10 (FR-11) Given ready บน desktop When `#experience` ข้าม reading line Then `data-section="experience"` ทันที และ `data-camera="experience"` ภายใน 1.5 s; Given `reducedMotion:"reduce"` Then `data-camera` เปลี่ยนโดยไม่ผ่าน `moving`; Given เปิด `/#contact` Then `data-camera` แรกที่นิ่งคือ `contact`
11. [ ] AC-11 (FR-12) Given ready When hover/focus/tap `#work button[data-project-id="oms"]` Then row นั้น `aria-pressed="true"` แถวเดียว และ `#scene-root[data-project="oms"]`; Tab ผ่านครบ 5 row แล้ว `data-project` ตามทุกครั้ง
12. [ ] AC-12 (FR-13) Given กล้อง overview When click ที่ `__scene.screenPos("shelf")` Then `#education` ขึ้นมาที่ตำแหน่ง scroll-padding (±8 px); When ลาก 10 px เริ่มที่ object Then ไม่ navigate
13. [ ] AC-13 (FR-14, FR-15) Given light When click ที่ `__scene.screenPos("lamp")` Then `html[data-theme="dark"]`, `data-mode="dark"`, `--vt-x/--vt-y` ห่างจากตำแหน่งโคม ≤ 4 px, และ pixel ของ canvas บริเวณหน้าต่างหลัง `transition.finished` เป็นโทนกลางคืน (ไม่มีจังหวะ DOM dark + canvas light); Given reduced motion Then `document.getAnimations()` ไม่มี animation ของ `::view-transition-*`
14. [ ] AC-14 (FR-16) Given `?3d=crash` (dev) หรือเรียก `WEBGL_lose_context.loseContext()` Then `data-scene-state="fallback"`, ทุก section ยังอยู่ ไม่มี error overlay/error page; สลับ `/`↔`/resume` 5 รอบไม่มี warning เรื่องจำนวน WebGL context
15. [ ] AC-15 (FR-17) Given ready Then `#scene-motion` มองเห็นและ focus ได้, click แล้ว `aria-pressed` สลับ; Given `reducedMotion:"reduce"` Then ค่าเริ่ม `aria-pressed="true"`
16. [ ] AC-16 (FR-30) Given `page.route("/api/contact")` ตอบ 200 When submit Then `#contact-status` (`role="status"`) แสดง "Message sent…", ช่องถูกล้าง, `data-sent="1"`; Given route abort Then ข้อความ error, ค่าที่กรอกยังอยู่, ปุ่มกดได้อีก; ข้อความสถานะ contrast ≥ 4.5:1 ทั้งสองธีม
17. [ ] AC-17 (FR-31) Given `CONTACT_DRY_RUN=1` When POST โดยกรอก `website` หรือ `startedAt` < 3 s Then 200 แต่ไม่ forward; Given `Origin: https://evil.example` Then 403; Given subject `"a\r\nBcc: x"` Then subject ที่ forward ไม่มี CR/LF
18. [ ] AC-18 (FR-40) Given context ใหม่ When โหลด `/` และ `/resume` Then ไม่มี request ไป host อื่นนอกจาก origin ของเว็บ
19. [ ] AC-19 (FR-41) Given production Then CSP ของ `/` มี `frame-ancestors 'none'` และ `object-src 'none'` และไม่มี `'unsafe-eval'`; ไม่มี event `securitypolicyviolation` ระหว่าง scroll ทั้งหน้า + สลับธีม + ส่งฟอร์ม + เปิด booking
20. [ ] AC-20 (FR-42) `npm audit --omit=dev --audit-level=high` exit 0 และ lockfile มี `next` ≥ 16.4.5
21. [ ] AC-21 (NFR a11y) axe scan บน `/` (2 ธีม × desktop/มือถือ) และ `/resume`: ไม่มี violation ระดับ serious/critical รวม `color-contrast`
22. [ ] AC-22 (NFR perf) Lighthouse mobile: Performance ≥ 90, LCP ≤ 2.5 s, TBT ≤ 200 ms, CLS ≤ 0.05; element ของ LCP อยู่ใน `#hero`
23. [ ] AC-23 (NFR hydration) โหลด `/` และ `/resume` ด้วยธีม light และ dark: 0 console error/warning ที่มีคำว่า "Hydration" หรือ "did not match" (จับตาปี © และ `#bkk-time`)
24. [ ] AC-24 (FR-08, FR-10) Given 390×844 `hasTouch` Then band สูง 42svh ±2 px, ปัดแนวตั้งที่เริ่มบน band ทำให้ `scrollY` เพิ่ม; Given desktop When wheel เหนือ canvas Then หน้า scroll; Given 320×640 Then `scrollWidth` ≤ 320
25. [ ] AC-25 (FR-22, S) Focus ที่ body กด `3` → ไป `#experience`; focus ใน `#contact-message` กด `3` → ไม่ scroll และมี "3" ในช่อง; `Meta+3`/`Control+3` → ไม่ scroll; ปิด `#shortcuts-toggle` แล้วกด `3` → ไม่มีอะไรเกิด
26. [ ] AC-26 (FR-23, S) `#bkk-time` ตรง `^\d{2}:\d{2}$` และเท่ากับเวลา `Asia/Bangkok` ตอนทดสอบ (±1 นาที), มี `datetime`
27. [ ] AC-27 (FR-24, S) Given `page.clock` = 2026-11-05T18:30Z (01:30 ICT วันที่ 6) Then `min` ของ `#booking-date` = 2026-11-06; submit โดยไม่เลือกวัน → ถูกบล็อกพร้อมข้อความที่ช่องวันที่

## 7. Architecture & data flow

### 7.1 File plan
```
src/data/resume.ts                        ข้อเท็จจริงทั้งหมด (เสนอเพิ่ม experience[].projects: ProjectId[])
src/app/page.tsx                          Server Component: 6 section + client islands
src/components/home/{Hero,WorkList,Contact}.tsx   islands (มีแล้ว)
src/components/scene/HomeScene.tsx        gate → next/dynamic(ssr:false) Scene + error boundary + poster + reading line + shortcuts
src/components/scene/{Scene,CameraRig,Diorama,SceneLighting,Interactive,palette,store,canvasTexture}
src/components/scene/objects/*            ตาม docs/scene-brief.md
src/app/resume/*                          มีแล้ว
src/app/lab/*, scripts/shot.mjs           ชั่วคราว — ลบก่อน ship
ลบ: src/app/{portfolio,contact} (redirect), ThemeSelector, DatePicker, TimePicker, public/*.svg boilerplate, /img
```

### 7.2 Store contract (`src/components/scene/store.ts`; `*` = เสนอเพิ่ม)
```ts
type SceneState = {
  section: SectionId;      // writer: reading line ใน HomeScene → CameraRig, objects, nav aria-current
  project: ProjectId;      // writer: WorkList → Monitor
  hovered: string | null;  // writer: Interactive → label, cursor
  sentCount: number;       // writer: Contact (markSent) → PaperPlane
  status*: "idle" | "loading" | "ready" | "fallback"; // → #scene-root[data-scene-state], poster
  motion*: boolean;        // writer: #scene-motion; ค่าเริ่ม = !prefersReducedMotion → ambient, frameloop
};
// ปุ่มที่กดค้าง (keyboard mirror) ไม่อยู่ใน store: module-level Set<string> + invalidate()
```

### 7.3 DOM sections → camera
1. Reading line: desktop 50% ของ viewport, มือถือ 71% (กลางพื้นที่ใต้ band); section = ตัวสุดท้ายที่ `top ≤ line` (rAF-throttled scroll + resize — แบบใน `HomeScene` ตอนนี้)
2. `setSection` เฉพาะตอนเปลี่ยน → `CameraRig` เลือก `presets[section][layout]` (`layout` = `wide` | `band` เพราะ aspect ต่างกัน) → `easing.damp3` ทั้ง position และ target; reduced motion = คัดลอกค่าทันที
3. Mount ครั้งแรกวางกล้องที่ section ปัจจุบันทันที (รองรับ deep link และ scroll restoration)
4. Click object / ปุ่ม 1–6 แค่เรียก `goToSection` (scroll) — กล้องตาม scroll เสมอ ไม่มีทางกลับ (source of truth เดียว = ตำแหน่ง scroll)
5. เมื่อระยะ < ε → เขียน `data-camera` (ใช้ทดสอบ)

### 7.4 Theme → canvas
1. Inline script (whitelist light|dark) ตั้ง `html[data-theme]` ก่อน paint
2. `ThemeProvider` context → bridge เข้า R3F อัตโนมัติ → `useMode()` → `palette` → material props; `Environment` ใช้ `key` ตาม mode
3. กดโคม: project ตำแหน่ง world ของโคมด้วยกล้อง → พิกัดจอ (บวก rect ของ canvas) → `setTheme(next, {x, y})`
4. ใน callback ของ `startViewTransition`: ตั้ง `data-theme` แบบ synchronous + `flushSync(setThemeState)` + `invalidate()` แล้วรอ 1 rAF ให้ canvas วาด palette ใหม่ก่อน snapshot "new"; reduced motion → ไม่เรียก VT

### 7.5 อะไรโหลดเมื่อไร
| ขั้น | โหลด | เงื่อนไข |
|---|---|---|
| 0 | HTML (เนื้อหาครบ) + CSS + inline theme script + preload font | ทุกครั้ง |
| 1 | React/Next runtime + islands (Hero time, WorkList, Contact, HomeScene shell) | hydration |
| 2 | ตรวจ gate | หลัง `load` + idle |
| 3 | `import("./Scene")` → three/R3F/drei/objects | ผ่าน gate |
| 4 | `document.fonts.ready` → วาด CanvasTexture → frame แรก → `status=ready` → ซ่อน poster | — |
| ตามต้องการ | `cally` | เปิด booking modal |
| ไม่โหลดเลย | GLTF/Draco/KTX2/HDR, CDN font, AskAI | — |

## 8. Risks & mitigations
| ID | ความเสี่ยง | ระดับ | การรับมือ |
|---|---|---|---|
| R-01 | Concept ขัด PRODUCT.md/DESIGN.md (anti-reference 3D, over-animated) — recruiter อาจมองว่าโชว์ของ | สูง | 3D เป็น progressive enhancement, DOM มาก่อน, motion พักได้; อัปเดตเอกสารหลังเจ้าของอนุมัติ (FR-29) |
| R-02 | Desktop ยังมี `scroll-snap-type: y mandatory` + `snap-stop: always` — ขัด "native scrolling only"; section ที่สูงกว่าจอ (แล็ปท็อป 720 px), PageDown, find-in-page กระโดด | กลาง | ใช้ `proximity` หรือเอาออก; AC-08 |
| R-03 | Band 42svh กินจอมือถือ (667 px เหลือ ~387 px ให้เนื้อหา; แนวนอนเหลือ band ~160 px) | กลาง | Q13; ซ่อน band เมื่อความสูง < 560 px |
| R-04 | ถ้าใส่ `touch-action: none` บน canvas (use-gesture แนะนำใน dev) มือถือจะ scroll ไม่ได้ใน 42% ของจอ | สูง | `touch-action: pan-y`, ไม่มี drag บน coarse pointer; AC-24 |
| R-05 | Scene init (parse JS ~1 MB + compile shader) เป็น long task ชน INP บน Android ล่าง | กลาง | import หลัง load+idle, ≤ 10 programs, `PerformanceMonitor` → poster |
| R-06 | สี canvas ไม่ตรง DOM ระหว่าง view transition (state commit ไม่ทัน snapshot) | กลาง | ลำดับใน §7.4; AC-13 |
| R-07 | WebGL1-only / context lost / object throw → R3F rethrow → ไม่มี `error.tsx` → ทั้งหน้าพัง | สูง | gate WebGL2 อย่างเดียว + error boundary; AC-14 |
| R-08 | CI แบบ headless ไม่มี GPU → SwiftShader → gate ปฏิเสธ → ทดสอบ 3D ไม่ได้ | กลาง | ใช้ Chrome ของเครื่องหรือ `?3d=on` |
| R-09 | ข้อมูลขัดกัน (C-01..C-06) ถูกขยายด้วยภาพ (เส้นบน pinboard, ใบปริญญา) | สูง | mapping ชัดใน data; รอ Q1–Q4 ก่อนวาด |
| R-10 | จอ monitor แสดง "UI ระบบภายใน" อาจดูเหมือนเปิดเผยระบบของบริษัท | กลาง | UI เชิงสัญลักษณ์เท่านั้น ไม่มีข้อมูล/โลโก้จริง; ให้เจ้าของดู screenshot ก่อน ship |
| R-11 | Global keydown listener ถูกมองว่าเป็น keylogger | ต่ำ | visual อย่างเดียว ข้ามช่องกรอก มีคำอธิบายใน privacy note |
| R-12 | next 16.2.2 มีช่องโหว่ critical | สูง | อัปเกรด 16.4.5 เป็น commit แยก อ่าน docs ใน `node_modules/next/dist/docs/` ก่อน แล้วรัน build + AC ทั้งหมด |
| R-13 | License ของ Satoshi สำหรับ self-host ยังไม่ยืนยัน (หน้า Fontshare เป็น JS-rendered อ่านอัตโนมัติไม่ได้) | ต่ำ | Q11 |
| R-14 | Redirect ไป URL ที่มี `#` — Next docs ไม่ได้ระบุ | ต่ำ | ตรวจด้วย `curl -I` หลัง build; ถ้าไม่ได้ ให้ redirect ไป `/` |
| R-15 | `/api/chat` ยังเรียกได้ + prompt อ้างข้อมูลที่ยังไม่ยืนยัน | สูง | FR-04, Q3 |
| R-16 | Agent หลายตัวแก้ไฟล์ร่วมพร้อมกัน; `/lab` หลุดไป production | กลาง | ไฟล์ร่วมเป็นของ lead (scene-brief); checklist ลบ `/lab` + `scripts/shot.mjs`; AC-06 |
| R-17 | Static prerender + ค่าที่ขึ้นกับเวลา (ปี ©, เวลา Bangkok, `min` date) → hydration mismatch/ค่าเก่า | ต่ำ | render หลัง mount / คำนวณฝั่ง client; AC-23, AC-27 |

## 9. คำถามที่ต้องถามเจ้าของ
1. **ปีของ project กับตำแหน่ง Senior (C-01)** — A) ย้าย HR CheckIn + Admin Dashboard ไปไว้ใต้ Frontend Developer และให้ Senior มีงานปี 2026 ของตัวเอง; B) แก้ปี project เป็นปีที่ส่งมอบ/ทำต่อจริง; C) คงไว้ — **แนะนำ A** (ถ้างานทำก่อนเลื่อนตำแหน่ง) เพราะ timeline จะตรงกับปีที่ recruiter เห็นในรายการ project
2. **ช่องว่าง 2019–2023 และเดือน (C-05)** — A) เพิ่มงาน/ฟรีแลนซ์ช่วง 2019–2023 + ใส่เดือนทุก period; B) ใส่เดือนอย่างเดียว; C) คงแค่ปี — **แนะนำ A** เพราะ recruiter ถามเรื่อง gap แทบทุกครั้ง และ ATS อ่าน "Mon YYYY" ได้ดีกว่า
3. **ผลงานที่อยู่ใน AI prompt แต่ไม่อยู่บนเว็บ (C-06)** — A) จริงทั้งหมด → ส่งรายละเอียด (ที่ไหน ปีไหน ตัวเลข) มาใส่ `resume.ts`; B) ไม่จริง/ไม่แน่ใจ → ลบออกจาก prompt; C) จริงบางข้อ (ระบุ) — **แนะนำ A หรือ C** เพราะตัวเลขผลลัพธ์คือสิ่งที่เว็บขาดที่สุด (C-10) และห้ามมีข้อมูลสองชุด
4. **ชื่อปริญญา (C-04)** — A) ส่งชื่อปริญญา + สาขาภาษาอังกฤษตามใบปริญญา; B) ใช้ชื่อกว้างๆ เช่น "B.Sc. in Information Technology" (ต้องยืนยัน); C) คงชื่อคณะ — **แนะนำ A** เพราะใบปริญญาใน 3D และ `/resume` ต้องใช้ชื่อจริง
5. **มัธยม (Udomsuksa)** — A) เอาออกจาก `/resume` แต่คงบนเว็บ; B) เอาออกทุกที่; C) คงทั้งสองที่ — **แนะนำ A** เพราะ PDF หน้าเดียวควรใช้พื้นที่กับงาน และตำแหน่ง senior ไม่ค่อยดูมัธยม
6. **เปิดรับงานแบบไหน (C-07)** — A) งานประจำ; B) ฟรีแลนซ์/contract; C) ทั้งสอง — **แนะนำ A** เพราะกลุ่มเป้าหมายใน PRODUCT.md คือ recruiter; ถ้า A จะเปลี่ยน "Book a consultation" เป็น "Schedule a call" และตัด copy ฟรีแลนซ์ (ถ้าอยากบอก notice period ให้ส่งมา)
7. **ยืนยันลิงก์และชื่อบริษัท (C-08)** — LinkedIn `linkedin.com/in/passon-rattanakongton` และ "Nutrition Profess": A) ถูกทั้งคู่; B) ส่งค่าที่ถูกมา — **แนะนำให้เปิดลิงก์ยืนยันเอง** เพราะตรวจอัตโนมัติไม่ได้ และ LinkedIn คือหนึ่งในสองช่องทางที่นับเป็นความสำเร็จ
8. **`/portfolio` และ `/contact` เดิม** — A) 308 ไป `/#work` และ `/#contact`; B) ลบ (404); C) คงหน้าเดิม — **แนะนำ A** เพราะลิงก์เก่าที่เคยแชร์ยังใช้ได้และไม่มีเนื้อหาซ้ำ
9. **`/svln`** — A) ลบออกจากเว็บนี้ (ย้ายไป repo อื่นได้); B) คงไว้แบบไม่มีลิงก์ + `noindex`; C) คงเดิม — **แนะนำ A** เพราะไม่เกี่ยวกับ resume เป็นรูปบุคคลที่สาม และหนัก 3.5 MB
10. **`/playground`** — A) ลบ (demo จริงอยู่ที่ designcomponent.vercel.app); B) คงไว้แบบไม่มีลิงก์ + `noindex`; C) ลิงก์จาก Work — **แนะนำ B** เพราะไม่กระทบหน้าแรกและย้อนกลับได้ (ถ้าเป็นโปรเจกต์เดียวกับ Design Component Library ให้เลือก A)
11. **Font หลัก** — A) self-host Satoshi ด้วย `next/font/local` (ต้องยืนยันว่า ITF Free Font License อนุญาต); B) เปลี่ยนเป็น Geist Sans ผ่าน `next/font` (ตรง DESIGN.md ไม่มีประเด็น license); C) ใช้ CDN Fontshare ต่อ — **แนะนำ A ถ้า license อนุญาต ไม่งั้น B** เพราะได้หน้าตาเดิม ไม่มี third-party และใช้ CSP `font-src 'self'` ได้
12. **PDF resume** — A) `/resume` + Print อย่างเดียว; B) เพิ่มไฟล์ PDF สำเร็จรูปที่ generate จาก `/resume` ด้วย script ตอน release; C) ทำ PDF แยกด้วยมือ — **แนะนำ B** เพราะ `window.print()` อาจใช้ไม่ได้ใน LinkedIn in-app browser และ recruiter มักต้องแนบไฟล์เข้า ATS
13. **3D บนมือถือ** — A) band 42svh ตลอด (ตาม concept); B) 42svh ตอนอยู่ hero แล้วหดเหลือ ~24svh; C) 3D เฉพาะ hero แล้ว scroll หายไป — **แนะนำ B** เพราะยังได้ความรู้สึก 3D แต่คืนพื้นที่อ่านให้คนบนมือถือ
14. **ปุ่มลัด 1–6** — A) ใช้ได้ทั้งหน้า + มีสวิตช์ปิด (จำค่าใน localStorage); B) ใช้ได้เฉพาะตอน focus อยู่ในพื้นที่ 3D; C) ตัดทิ้ง — **แนะนำ A** เพราะผ่าน WCAG 2.1.4 และยังเป็นลูกเล่นที่ hiring manager เจอได้
15. **Production domain** (สำหรับ canonical/OG/sitemap) — A) `*.vercel.app` ที่ deploy อยู่ (ส่ง URL); B) โดเมนส่วนตัว (ส่งชื่อ); C) ยังไม่มี → ใช้ `VERCEL_PROJECT_PRODUCTION_URL` ไปก่อน — **แนะนำ B ถ้ามี ไม่งั้น C**
16. **Booking** — A) คง modal (เป็นการ "ขอเวลา" ทางอีเมล) + ระบุ ICT; B) เปลี่ยนเป็นลิงก์ไป scheduler จริง (Cal.com / Google Calendar appointment); C) ตัด booking เหลืออีเมลอย่างเดียว — **แนะนำ A** สำหรับรอบนี้ (ไม่มี dependency ใหม่) แต่แก้ copy ไม่ให้สื่อว่าเช็กเวลาว่าง (C-11)
17. **ลิงก์ source ของเว็บนี้ (repo เป็น public)** — A) ใส่ลิงก์ "Source of this site" ที่ footer; B) ไม่ใส่ — **แนะนำ A** เพราะ hiring manager ดูโค้ด 3D ได้ทันที และตรวจแล้วว่า repo ไม่มี secret

## 10. นอกขอบเขต
- เปิด AskAI กลับ หรือออกแบบ chat ใหม่ (เก็บไฟล์ไว้ ปิด endpoint ด้วย env)
- เขียนเนื้อหาหรือแต่งตัวเลขผลงานเอง — ใช้เฉพาะที่เจ้าของยืนยัน
- เวอร์ชันภาษาไทย/i18n, CMS, blog, หน้า case study แยกต่อ project
- ระบบนัดหมายจริง ปฏิทินว่าง หรือฐานข้อมูลเก็บข้อความ
- WebGPU, postprocessing, physics, เสียง, VR/AR, โมเดล GLTF/HDRI จากภายนอก
- Analytics/tracking เพิ่ม, cookie banner (ไม่มี cookie)
- ปรับปรุง `/playground` หรือ component library (นอกจากตัดสินใจเก็บ/ลบ)
- PWA/offline, native app
- Deploy/release และการตั้งค่า Vercel dashboard/env (เจ้าของทำเอง: ถอด `ANTHROPIC_API_KEY`, ไม่ตั้ง `ASK_AI_ENABLED`)
