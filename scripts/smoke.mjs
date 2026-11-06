// Smoke test for the 3D journey home page. Needs `npm run dev` (port 3005) — it uses the dev-only
// window.__scene probe from Scene.tsx. Usage: node scripts/smoke.mjs [--shots=/tmp/smoke]
import { statSync } from "node:fs";
import { chromium } from "playwright";

const shots = process.argv.find((a) => a.startsWith("--shots="))?.split("=")[1];
const BASE = "http://localhost:3005";
const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
};

const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });

// ---- Desktop ----
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await ctx.addInitScript(() => localStorage.setItem("theme", "light"));
const page = await ctx.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => m.type() === "error" && !m.text().includes("speed-insights") && errors.push(m.text()));
// Never send real email from a test
let sends = 0;
await page.route("**/api/contact", (r) => {
  sends++;
  return r.fulfill({ status: 200, contentType: "application/json", body: '{"success":true}' });
});

await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.waitForFunction(() => window.__scene?.points("monitor")?.length, null, { timeout: 30000 });
await page.waitForTimeout(2500);

check("all six sections are in the server HTML", (await page.locator("section[id]").count()) === 6);
const stats = await page.evaluate(() => window.__scene.render());
check("overview stays within the draw-call budget (< 250)", stats.calls < 250, `${stats.calls} calls, ${stats.triangles} triangles, ${stats.textures} textures`);

const hover = async (id) => {
  for (const p of await page.evaluate((i) => window.__scene.points(i), id)) {
    await page.mouse.move(p.x, p.y);
    await page.waitForTimeout(200);
    if ((await page.evaluate(() => getComputedStyle(document.body).cursor)) === "pointer") return p;
  }
  return null;
};
for (const id of ["lamp", "monitor", "keyboard", "plant", "pinboard", "shelf", "resume", "plane"]) {
  check(`hover ${id} shows the pointer`, Boolean(await hover(id)));
}

const lamp = await hover("lamp");
await page.mouse.click(lamp.x, lamp.y);
await page.waitForTimeout(1200);
check("clicking the lamp switches to dark", (await page.evaluate(() => document.documentElement.dataset.theme)) === "dark");
const lamp2 = await hover("lamp");
await page.mouse.click(lamp2.x, lamp2.y);
await page.waitForTimeout(1200);
check("clicking it again switches back to light", (await page.evaluate(() => document.documentElement.dataset.theme)) === "light");

const monitor = await hover("monitor");
await page.mouse.click(monitor.x, monitor.y);
await page.waitForTimeout(1800);
check("clicking the monitor travels to Work", await page.evaluate(() => Math.abs(document.getElementById("work").getBoundingClientRect().top) < 80));

await page.mouse.move(5, 450); // pointer off the canvas objects
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(1500);
check("ArrowRight travels from Work to Experience", await page.evaluate(() => Math.abs(document.getElementById("experience").getBoundingClientRect().top) < 80));
check("the navbar names the current stop", (await page.locator("header .navbar-label").textContent()) === "Experience");
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(1500);
check("ArrowRight travels to Education", await page.evaluate(() => Math.abs(document.getElementById("education").getBoundingClientRect().top) < 80));
await page.keyboard.press("ArrowLeft");
await page.waitForTimeout(1500);
check("ArrowLeft travels back to Experience", await page.evaluate(() => Math.abs(document.getElementById("experience").getBoundingClientRect().top) < 80));

await page.keyboard.press("ArrowLeft");
await page.waitForTimeout(1500);
// The tab list must not move under a resting pointer (hover used to select, panels changed height: flicker loop)
const listTop = () => page.evaluate(() => document.querySelector("#work [role=tablist]").getBoundingClientRect().top);
const top0 = await listTop();
await page.getByRole("tab", { name: /Admin Dashboard/ }).hover();
await page.waitForTimeout(300);
check(
  "hovering a project tab previews it without changing the selection or moving the list",
  (await page.getByRole("tab").first().getAttribute("aria-selected")) === "true" && (await listTop()) === top0,
);
await page.getByRole("tab", { name: /Order Management System/ }).click();
check("project tab selects OMS", (await page.getByRole("tab", { name: /Order Management System/ }).getAttribute("aria-selected")) === "true");
check("OMS panel is visible", await page.locator("#panel-oms").isVisible());
check("the card keeps its height when the selection changes", (await listTop()) === top0);
if (shots) await page.screenshot({ path: `${shots}-work-oms.png` });

await page.evaluate(() => document.getElementById("contact").scrollIntoView({ behavior: "instant" }));
await page.waitForTimeout(1500);
await page.fill("#contact-name", "Smoke Test");
await page.fill("#contact-email", "smoke@example.com");
await page.fill("#contact-subject", "Hello");
await page.fill("#contact-message", "Testing the paper plane");
await page.getByRole("button", { name: "Send message" }).click();
await page.waitForTimeout(900);
if (shots) await page.screenshot({ path: `${shots}-plane-flight.png` });
check("contact form shows success", await page.getByText("Message sent.").isVisible());

await page.getByRole("button", { name: "Request a call" }).click();
await page.fill("#booking-name", "Smoke Test");
await page.fill("#booking-email", "smoke@example.com");
await page.selectOption("#booking-time", { index: 1 });
const sendsBefore = sends;
await page.getByRole("button", { name: "Send request" }).click();
await page.waitForTimeout(300);
check(
  "a call request without a date is stopped and points at the date",
  sends === sendsBefore &&
    (await page.getByRole("alert").filter({ hasText: "Pick a date for the call" }).isVisible()) &&
    (await page.evaluate(() => document.activeElement?.getAttribute("aria-haspopup") === "dialog")),
);
await page.keyboard.press("Escape");

check("the navbar links to the printable resume", await page.locator("header").getByRole("link", { name: "Resume" }).isVisible());
for (const [from, to] of [["/portfolio", "/#work"], ["/contact", "/#contact"]]) {
  const res = await page.request.get(BASE + from, { maxRedirects: 0 });
  check(`${from} redirects to ${to}`, res.status() === 307 && res.headers().location?.endsWith(to), `${res.status()} ${res.headers().location}`);
}

const pause = page.getByRole("button", { name: "Pause animations" });
await pause.click();
const saved = await page.evaluate(() => [document.documentElement.dataset.motion, localStorage.getItem("motion")]);
check("the pause button turns the room's animations off", (await pause.getAttribute("aria-pressed")) === "true" && saved.join() === "reduce,reduce");
await page.reload({ waitUntil: "domcontentloaded" });
const early = await page.evaluate(() => document.documentElement.dataset.motion); // before hydration: the inline script
await page.waitForLoadState("networkidle");
check("the paused state survives a reload", early === "reduce" && (await pause.getAttribute("aria-pressed")) === "true");

check("no page or console errors", errors.length === 0, errors.slice(0, 3).join(" | "));
await ctx.close();

// ---- Phone: swiping over the full-screen canvas must still scroll the page ----
const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
const mp = await phone.newPage();
await mp.goto(BASE + "/", { waitUntil: "networkidle" });
await mp.waitForTimeout(3000);
const cdp = await phone.newCDPSession(mp);
await cdp.send("Input.synthesizeScrollGesture", { x: 195, y: 250, yDistance: -500, speed: 1200, gestureSourceType: "touch" });
await mp.waitForTimeout(1500);
check("touch swipe over the canvas scrolls the page", (await mp.evaluate(() => scrollY)) > 200, `scrollY ${await mp.evaluate(() => scrollY)}`);
await phone.close();

// ---- /resume prints on one A4 page, in both themes ----
for (const theme of ["light", "dark"]) {
  const pc = await browser.newContext();
  await pc.addInitScript((t) => localStorage.setItem("theme", t), theme);
  const rp = await pc.newPage();
  await rp.goto(BASE + "/resume", { waitUntil: "networkidle" });
  await rp.emulateMedia({ media: "print" });
  const pdf = await rp.pdf({ preferCSSPageSize: true, printBackground: true });
  const pages = (pdf.toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  check(`/resume prints on one A4 page (${theme})`, pages === 1, `${pages} page(s)`);
  await pc.close();
}

// ---- The downloadable PDF exists, is one page and is not older than what it is made from ----
// (mtimes: after a fresh clone this can fail until the PDF is regenerated, which is the point)
const rc = await browser.newContext();
const pdfRes = await rc.request.get(BASE + "/Passon-Rattanakongton-Resume.pdf");
const pdfPages = ((await pdfRes.body()).toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
const pdfTime = statSync(new URL("../public/Passon-Rattanakongton-Resume.pdf", import.meta.url)).mtimeMs;
const stale = ["../src/data/resume.ts", "../src/app/resume/page.tsx"].filter((f) => statSync(new URL(f, import.meta.url)).mtimeMs > pdfTime);
check(
  "the downloadable PDF is served, one page and up to date",
  pdfRes.ok() && pdfPages === 1 && stale.length === 0,
  stale.length ? `run node scripts/resume-pdf.mjs (${stale.join(", ")} changed)` : `${pdfPages} page(s)`,
);
const rp2 = await rc.newPage();
await rp2.goto(BASE + "/resume", { waitUntil: "networkidle" });
check("/resume offers the PDF download", await rp2.getByRole("link", { name: "Download PDF" }).isVisible());
await rc.close();

await browser.close();
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
