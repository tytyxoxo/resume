import { CanvasTexture, SRGBColorSpace } from "three";

// Text in the 3D scene is drawn on 2D canvases (no troika/drei <Text>: the CSP blocks blob workers).
// Draw at 2–4x the on-screen size so it stays crisp when the camera moves close.

export function fontFamily(kind: "sans" | "mono") {
  if (kind === "sans") return "Satoshi, system-ui, sans-serif";
  const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim();
  return `${mono || "ui-monospace"}, ui-monospace, monospace`;
}

export function font(px: number, weight: 400 | 500 | 600, kind: "sans" | "mono" = "sans") {
  return `${weight} ${px}px ${fontFamily(kind)}`;
}

// Resolves once the page fonts are usable on canvas; redraw textures after it.
export const fontsReady = () => (typeof document === "undefined" ? Promise.resolve() : document.fonts.ready.then(() => undefined));

export function makeCanvasTexture(width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  draw(ctx);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export function redraw(texture: CanvasTexture, draw: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = texture.image as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw(ctx);
  texture.needsUpdate = true;
}

export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}
