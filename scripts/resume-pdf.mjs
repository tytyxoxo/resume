// Writes the downloadable resume, public/Passon-Rattanakongton-Resume.pdf (`profile.resumePdf`), from /resume on the
// running dev server (port 3005). Run it after changing src/data/resume.ts or the resume page; the smoke test fails
// while the PDF is older than either.
import { chromium } from "playwright";

const out = new URL("../public/Passon-Rattanakongton-Resume.pdf", import.meta.url).pathname;
const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
const page = await browser.newPage();
await page.addInitScript(() => localStorage.setItem("theme", "light"));
await page.goto("http://localhost:3005/resume", { waitUntil: "networkidle" });
await page.emulateMedia({ media: "print" });
await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true });
await browser.close();
console.log("saved", out);
