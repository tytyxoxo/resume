// Regenerates the social share image (src/app/opengraph-image.jpg, 1200×630) from the running dev server (port 3005):
// the name, role and availability line on the left, the hero's 3D room enlarged on the right.
// usage: node scripts/og.mjs [--dark]
import { chromium } from "playwright";

const theme = process.argv.includes("--dark") ? "dark" : "light";
const out = new URL("../src/app/opengraph-image.jpg", import.meta.url).pathname;

const browser = await chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" });
// rendered at 2x so the CSS-enlarged canvas stays sharp, captured at 1200×630
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.addInitScript((t) => localStorage.setItem("theme", t), theme);
await page.goto("http://localhost:3005/", { waitUntil: "networkidle" });
await page.evaluate(() => {
  document.querySelector("header")?.remove();
  document.querySelector(".fixed.top-0.h-0\\.5")?.remove(); // scroll progress bar
  const caption = document.querySelector("#hero > div");
  const [availability, name, role] = caption.children;
  // keep: availability, name, role (without the live clock); sized to stay readable as a feed thumbnail
  [...caption.children].slice(3).forEach((el) => el.remove());
  role.querySelector("time")?.parentElement?.remove();
  Object.assign(caption.style, { position: "fixed", left: "72px", top: "50%", transform: "translateY(-50%)", margin: "0", maxWidth: "540px", textAlign: "left" });
  availability.style.fontSize = "22px";
  Object.assign(name.style, { fontSize: "68px", lineHeight: "1.02", marginTop: "20px" });
  Object.assign(role.style, { fontSize: "28px", marginTop: "20px" });
  // transform the <canvas>, not its container: R3F measures the container with getBoundingClientRect
  document.querySelector("canvas").style.transform = "translate(270px, 222px) scale(1.45)";
});
await page.waitForTimeout(3500); // scene fade-in and the first-frame camera glide
await page.screenshot({ path: out, type: "jpeg", quality: 88, scale: "css" });
await browser.close();
console.log("saved", out);
