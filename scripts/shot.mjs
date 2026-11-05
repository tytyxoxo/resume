// Dev helper: screenshot a route of the running dev server (port 3005) with system Chrome.
// usage: node scripts/shot.mjs <path> <out.png> [--dark] [--w=1440] [--h=900] [--wait=2500] [--full] [--reduced] [--scroll=<sectionId>] [--click=<button name>]
import { chromium } from "playwright";

const args = process.argv.slice(2);
const flag = (n, d) => args.find((a) => a.startsWith(`--${n}=`))?.split("=")[1] ?? d;
const [path, out] = args.filter((a) => !a.startsWith("--"));
if (!path || !out) {
  console.error("usage: node scripts/shot.mjs <path> <out.png> [--dark] [--w=1440] [--h=900] [--wait=2500] [--full] [--reduced] [--scroll=id]");
  process.exit(1);
}
const theme = args.includes("--dark") ? "dark" : "light";
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const context = await browser.newContext({
  viewport: { width: Number(flag("w", 1440)), height: Number(flag("h", 900)) },
  reducedMotion: args.includes("--reduced") ? "reduce" : "no-preference",
});
await context.addInitScript((t) => localStorage.setItem("theme", t), theme);
const page = await context.newPage();
page.on("console", (m) => m.type() === "error" && console.log("console error:", m.text().slice(0, 400)));
page.on("pageerror", (e) => console.log("page error:", e.message.slice(0, 400)));
await page.goto(`http://localhost:3005${path}`, { waitUntil: "networkidle" });
const click = flag("click", "");
if (click) {
  await page.waitForTimeout(1500);
  await page.getByRole("button", { name: click, exact: true }).first().click();
}
const section = flag("scroll", "");
if (section) await page.evaluate((id) => document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" }), section);
await page.waitForTimeout(Number(flag("wait", 2500)));
await page.screenshot({ path: out, fullPage: args.includes("--full") });
await browser.close();
console.log("saved", out);
