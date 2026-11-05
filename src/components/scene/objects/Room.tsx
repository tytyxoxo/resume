"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { BackSide, Color, Object3D } from "three";
import type { CanvasTexture, Group, InstancedMesh } from "three";
import { profile } from "@/data/resume";
import { makeCanvasTexture, redraw } from "../canvasTexture";
import { useMode, usePalette, useReducedMotion, type Palette } from "../palette";

type Box = [x: number, y: number, z: number, width: number, height: number, depth: number];

const WALLS: Box[] = [
  [-1, 1.25, -1.65, 1.4, 2.5, 0.1],
  [1.25, 1.25, -1.65, 0.7, 2.5, 0.1],
  [0.3, 0.5375, -1.65, 1.2, 1.075, 0.1],
  [0.3, 2.2625, -1.65, 1.2, 0.475, 0.1],
  [-1.65, 1.25, 0, 0.1, 2.5, 3.2],
];

const TRIM: Box[] = [
  [-0.05, 2.506, -1.65, 3.3, 0.012, 0.1],
  [-1.65, 2.506, 0, 0.1, 0.012, 3.2],
  [1.606, 1.25, -1.65, 0.012, 2.5, 0.1],
  [-1.65, 1.25, 1.606, 0.1, 2.5, 0.012],
  [0, 0.03, -1.594, 3.2, 0.06, 0.012],
  [-1.594, 0.03, 0, 0.012, 0.06, 3.2],
];

const WINDOW_FRAME: Box[] = [
  [-0.3, 1.55, -1.64, 0.045, 0.995, 0.12],
  [0.9, 1.55, -1.64, 0.045, 0.995, 0.12],
  [0.3, 1.075, -1.64, 1.245, 0.045, 0.12],
  [0.3, 2.025, -1.64, 1.245, 0.045, 0.12],
  [0.3, 1.55, -1.64, 0.045, 0.95, 0.12],
  [0.3, 1.05, -1.55, 1.3, 0.025, 0.14],
];

const instanceHelper = new Object3D();

function setBoxes(mesh: InstancedMesh | null, boxes: Box[]) {
  if (!mesh) return;
  boxes.forEach(([x, y, z, width, height, depth], index) => {
    instanceHelper.position.set(x, y, z);
    instanceHelper.scale.set(width, height, depth);
    instanceHelper.rotation.set(0, 0, 0);
    instanceHelper.updateMatrix();
    mesh.setMatrixAt(index, instanceHelper.matrix);
  });
  mesh.instanceMatrix.needsUpdate = true;
}

function mulberry32(seed: number) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function drawFloor(ctx: CanvasRenderingContext2D, p: Palette) {
  // Quiet oak planks: tiny tone shifts per plank, soft seams, staggered end joints
  const { width, height } = ctx.canvas;
  const rows = Math.round(3.16 / 0.18);
  const plankH = height / rows;
  const base = new Color(p.floor);
  const tone = new Color();
  const random = mulberry32(2207);
  for (let row = 0; row < rows; row++) {
    const joints = [0, 0.3 + random() * 0.15, 0.62 + random() * 0.18, 1];
    for (let j = 0; j < joints.length - 1; j++) {
      tone.copy(base).multiplyScalar(0.985 + random() * 0.03);
      ctx.fillStyle = tone.getStyle();
      ctx.fillRect(joints[j] * width, row * plankH, (joints[j + 1] - joints[j]) * width, plankH);
    }
  }
  ctx.fillStyle = tone.copy(base).multiplyScalar(0.82).getStyle();
  ctx.globalAlpha = 0.22;
  for (let row = 1; row < rows; row++) ctx.fillRect(0, row * plankH - 1, width, 2);
  ctx.globalAlpha = 1;
}

function drawRug(ctx: CanvasRenderingContext2D, p: Palette) {
  // Flat-woven rug: base, two stripe bands near the short ends, a fine weave texture
  const { width, height } = ctx.canvas;
  ctx.fillStyle = p.rug;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = p.rugStripe;
  for (const x of [0.07, 0.11, 0.89, 0.93]) ctx.fillRect(x * width - 4, 0, 8, height);
  ctx.globalAlpha = 0.05;
  ctx.fillStyle = p.ink;
  for (let y = 0; y < height; y += 4) ctx.fillRect(0, y, width, 1);
  ctx.globalAlpha = 1;
}

type SkylineLayer = "far" | "mid" | "near";

function drawWindows(
  ctx: CanvasRenderingContext2D,
  p: Palette,
  seed: number,
  x: number,
  top: number,
  width: number,
  bottom: number,
) {
  const random = mulberry32(seed);
  const cool = new Color(p.cityWindowLit).lerp(new Color(p.skyTop), 0.48).getStyle();
  const stepX = Math.max(15, Math.round(width / 5));
  for (let wx = x + 7; wx < x + width - 5; wx += stepX) {
    for (let wy = top + 12; wy < bottom - 8; wy += 17) {
      if (random() > 0.21) continue;
      ctx.fillStyle = random() < 0.16 ? cool : p.cityWindowLit;
      ctx.globalAlpha = 0.8 + random() * 0.2;
      ctx.fillRect(wx, wy, 4, 6);
    }
  }
  ctx.globalAlpha = 1;
}

function drawSkyline(ctx: CanvasRenderingContext2D, p: Palette, mode: "light" | "dark", layer: SkylineLayer) {
  const { width: w, height: h } = ctx.canvas;
  const isNight = mode === "dark";
  const random = mulberry32(layer === "far" ? 4103 : layer === "mid" ? 9827 : 17321);
  const bottom = h - 18;
  const color = layer === "far" ? p.cityFar : layer === "mid" ? p.cityMid : p.cityNear;
  ctx.fillStyle = color;
  ctx.globalAlpha = !isNight && layer === "far" ? 0.68 : !isNight && layer === "mid" ? 0.82 : 1;

  if (layer === "mid") {
    const towerX = Math.round(w * 0.64);
    const towerW = Math.round(w * 0.105);
    const towerTop = Math.round(h * 0.11);
    ctx.beginPath();
    ctx.moveTo(towerX + towerW * 0.42, towerTop);
    ctx.lineTo(towerX + towerW * 0.58, towerTop);
    ctx.lineTo(towerX + towerW * 0.58, towerTop + 16);
    ctx.lineTo(towerX + towerW * 0.76, towerTop + 16);
    ctx.lineTo(towerX + towerW * 0.76, towerTop + 50);
    ctx.lineTo(towerX + towerW, towerTop + 50);
    ctx.lineTo(towerX + towerW, bottom);
    ctx.lineTo(towerX, bottom);
    ctx.lineTo(towerX, towerTop + 82);
    ctx.lineTo(towerX + towerW * 0.22, towerTop + 82);
    ctx.lineTo(towerX + towerW * 0.22, towerTop + 36);
    ctx.lineTo(towerX + towerW * 0.42, towerTop + 36);
    ctx.closePath();
    ctx.fill();
    if (isNight) drawWindows(ctx, p, 8821, towerX + 5, towerTop + 28, towerW - 10, bottom);
  }

  let x = -12;
  let building = 0;
  while (x < w + 20) {
    const buildingW = layer === "far" ? 24 + random() * 30 : layer === "mid" ? 45 + random() * 68 : 68 + random() * 105;
    const buildingH =
      layer === "far" ? 80 + random() * 150 : layer === "mid" ? 140 + random() * 245 : 90 + random() * 150;
    const top = bottom - buildingH;
    if (layer !== "mid" || x + buildingW < w * 0.61 || x > w * 0.77) {
      ctx.fillStyle = color; // drawWindows leaves the lit-window colour behind
      ctx.globalAlpha = !isNight && layer === "far" ? 0.68 : !isNight && layer === "mid" ? 0.82 : 1;
      ctx.fillRect(x, top, buildingW, buildingH);
      if (isNight) drawWindows(ctx, p, 5000 + building * 97, x, top, buildingW, bottom);
    }
    x += buildingW + (layer === "far" ? 5 : 10 + random() * 12);
    building++;
  }

  if (layer === "near") {
    ctx.fillStyle = color;
    ctx.globalAlpha = 1;
    const railY = h * 0.7;
    ctx.fillRect(0, railY, w, h * 0.03);
    for (let px = 40; px < w; px += w * 0.15) ctx.fillRect(px, railY, 12, bottom - railY);
  }
  ctx.globalAlpha = 1;
}

function drawSkyGradient(ctx: CanvasRenderingContext2D, p: Palette) {
  const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
  gradient.addColorStop(0, p.skyTop);
  gradient.addColorStop(1, p.skyHorizon);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

// Soft contact shading (cheap ambient occlusion): a linear fade for wall/floor seams and corners and a
// radial one for things standing on the floor. Drawn once; alpha only, so it darkens whatever is under it.
function linearShade() {
  return makeCanvasTexture(8, 128, (ctx) => {
    const g = ctx.createLinearGradient(0, 0, 0, 128);
    g.addColorStop(0, "rgba(0,0,0,1)");
    g.addColorStop(0.35, "rgba(0,0,0,0.35)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 8, 128);
  });
}
function radialShade() {
  return makeCanvasTexture(128, 128, (ctx) => {
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(0,0,0,1)");
    g.addColorStop(0.5, "rgba(0,0,0,0.45)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
  });
}

// [position, rotation, size, opacity]; the texture's dark edge is its top (v = 1)
type Shade = [[number, number, number], [number, number, number], [number, number], number];
const SEAMS: Shade[] = [
  [[0, 0.0015, -1.42], [-Math.PI / 2, 0, 0], [3.2, 0.36], 0.22], // floor along the back wall
  [[-1.42, 0.0015, 0], [-Math.PI / 2, 0, Math.PI / 2], [3.2, 0.36], 0.22], // floor along the left wall
  [[0, 0.16, -1.598], [0, 0, Math.PI], [3.2, 0.32], 0.16], // back wall above the floor
  [[-1.598, 0.16, 0], [0, Math.PI / 2, Math.PI], [3.2, 0.32], 0.16], // left wall above the floor
  [[-1.45, 1.25, -1.598], [0, 0, Math.PI / 2], [2.5, 0.3], 0.14], // back wall into the corner
  [[-1.598, 1.25, -1.45], [0, Math.PI / 2, -Math.PI / 2], [2.5, 0.3], 0.14], // left wall into the corner
];
const BLOBS: [[number, number, number], [number, number], number][] = [
  [[1.28, 0.0025, -1.25], [0.62, 0.62], 0.32], // plant pot
  [[-1.43, 0.0025, 0.65], [0.5, 1.15], 0.3], // bookshelf
  [[0.3, 0.0025, -0.42], [0.7, 0.7], 0.18], // chair base
];

function ContactShading() {
  const linear = useMemo(() => linearShade(), []);
  const radial = useMemo(() => radialShade(), []);
  useEffect(
    () => () => {
      linear.dispose();
      radial.dispose();
    },
    [linear, radial],
  );
  return (
    <group>
      {SEAMS.map(([position, rotation, [w, h], opacity], i) => (
        <mesh key={i} position={position} rotation={rotation} renderOrder={1}>
          <planeGeometry args={[w, h]} />
          <meshBasicMaterial color="#000000" alphaMap={linear} transparent opacity={opacity} depthWrite={false} />
        </mesh>
      ))}
      {BLOBS.map(([position, [w, d], opacity], i) => (
        <mesh key={i} position={position} rotation-x={-Math.PI / 2} renderOrder={1}>
          <planeGeometry args={[w, d]} />
          <meshBasicMaterial color="#000000" alphaMap={radial} transparent opacity={opacity} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
}

export function Room() {
  const p = usePalette();
  const mode = useMode();
  const reduced = useReducedMotion();
  const walls = useRef<InstancedMesh>(null);
  const trim = useRef<InstancedMesh>(null);
  const frame = useRef<InstancedMesh>(null);
  const aviation = useRef<InstancedMesh>(null);
  const floorTexture = useMemo(() => makeCanvasTexture(1024, 1024, () => {}), []);
  const rugTexture = useMemo(() => makeCanvasTexture(512, 360, () => {}), []);
  const skyTexture = useMemo(() => makeCanvasTexture(512, 512, () => {}), []);
  const farTexture = useMemo(() => makeCanvasTexture(1024, 800, () => {}), []);
  const midTexture = useMemo(() => makeCanvasTexture(1024, 800, () => {}), []);
  const nearTexture = useMemo(() => makeCanvasTexture(1024, 800, () => {}), []);
  const skylineLayers: [CanvasTexture, number][] = [
    [farTexture, -2.2],
    [midTexture, -2.05],
    [nearTexture, -1.9],
  ];
  const aviationColor = useMemo(
    () => new Color(p.pinRed).lerp(new Color(p.cityWindowLit), 0.07).multiplyScalar(1.12),
    [p],
  );

  useLayoutEffect(() => {
    setBoxes(walls.current, WALLS);
    setBoxes(trim.current, TRIM);
    setBoxes(frame.current, WINDOW_FRAME);
    setBoxes(aviation.current, [
      [0.57, 1.94, -2.04, 1, 1, 1],
      [-0.08, 1.76, -2.19, 1, 1, 1],
      [0.86, 1.61, -1.89, 1, 1, 1],
    ]);
  }, [mode]);

  useEffect(() => {
    redraw(floorTexture, (ctx) => drawFloor(ctx, p));
    redraw(rugTexture, (ctx) => drawRug(ctx, p));
    redraw(skyTexture, (ctx) => drawSkyGradient(ctx, p));
    redraw(farTexture, (ctx) => drawSkyline(ctx, p, mode, "far"));
    redraw(midTexture, (ctx) => drawSkyline(ctx, p, mode, "mid"));
    redraw(nearTexture, (ctx) => drawSkyline(ctx, p, mode, "near"));
  }, [floorTexture, rugTexture, skyTexture, farTexture, midTexture, nearTexture, mode, p]);

  useEffect(
    () => () => {
      floorTexture.dispose();
      rugTexture.dispose();
      skyTexture.dispose();
      farTexture.dispose();
      midTexture.dispose();
      nearTexture.dispose();
    },
    [floorTexture, rugTexture, skyTexture, farTexture, midTexture, nearTexture],
  );

  useFrame((state) => {
    if (aviation.current) aviation.current.visible = reduced || state.clock.elapsedTime % 1.6 < 0.8;
  });

  return (
    <group>
      {/* Slab top sits 2 mm under the plank plate so the two never z-fight */}
      <RoundedBox args={[3.2, 0.14, 3.2]} radius={0.03} smoothness={3} position={[0, -0.072, 0]} castShadow>
        <meshStandardMaterial color={p.floorEdge} roughness={0.82} />
      </RoundedBox>
      <mesh position={[0, -0.006, 0]} receiveShadow>
        <boxGeometry args={[3.16, 0.012, 3.16]} />
        <meshStandardMaterial map={floorTexture} roughness={0.78} />
      </mesh>

      {/* Wall masses and cut-edge caps are instanced to keep the room shell inexpensive. */}
      <instancedMesh ref={walls} args={[undefined, undefined, WALLS.length]} castShadow receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color={p.wall} roughness={0.9} />
      </instancedMesh>
      <instancedMesh ref={trim} args={[undefined, undefined, TRIM.length]} receiveShadow>
        <boxGeometry />
        <meshStandardMaterial color={p.wallTrim} roughness={0.84} />
      </instancedMesh>
      <instancedMesh ref={frame} args={[undefined, undefined, WINDOW_FRAME.length]}>
        <boxGeometry />
        <meshStandardMaterial color={p.plastic} roughness={0.55} />
      </instancedMesh>

      <mesh position={[0.3, 1.55, -1.705]}>
        <planeGeometry args={[1.15, 0.905]} />
        <meshStandardMaterial color={p.glass} transparent opacity={0.12} roughness={0.05} depthWrite={false} />
      </mesh>

      {/* ponytail: one inside-out box replaces four well panels; split it only if exterior views are added.
          Kept shallow (0.55 m) so the diagonal overview never sees it past the back wall's end. */}
      <mesh position={[0.3, 1.575, -1.975]}>
        <boxGeometry args={[1.5, 1.25, 0.55]} />
        <meshBasicMaterial color={p.skyHorizon} side={BackSide} />
      </mesh>
      <mesh position={[0.3, 1.575, -2.245]}>
        <planeGeometry args={[1.48, 1.21]} />
        <meshBasicMaterial map={skyTexture} />
      </mesh>
      {skylineLayers.map(([texture, z]) => (
        <mesh key={z} position={[0.3, 1.55, z]}>
          <planeGeometry args={[1.44, 1.1]} />
          <meshBasicMaterial map={texture} transparent depthWrite={false} />
        </mesh>
      ))}
      {mode === "dark" && (
        <instancedMesh ref={aviation} args={[undefined, undefined, 3]}>
          <sphereGeometry args={[0.008, 10, 8]} />
          <meshBasicMaterial color={aviationColor} />
        </instancedMesh>
      )}

      <ContactShading />

      {/* A plain box: its top face has 0–1 UVs for the rug texture (RoundedBox caps do not) */}
      <mesh position={[0.3, 0.007, -0.5]} receiveShadow>
        <boxGeometry args={[1.7, 0.012, 1.2]} />
        <meshStandardMaterial map={rugTexture} roughness={0.97} />
      </mesh>
    </group>
  );
}

const bangkokClock = new Intl.DateTimeFormat("en-GB", {
  timeZone: profile.timeZone,
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function bangkokTime(date: Date) {
  const parts = bangkokClock.formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  return { hour: value("hour"), minute: value("minute"), second: value("second") };
}

if (process.env.NODE_ENV !== "production") {
  const check = bangkokTime(new Date("2024-01-01T00:00:00Z"));
  console.assert(check.hour === 7 && check.minute === 0, "Bangkok clock must use UTC+7");
}

export function WallClock() {
  const p = usePalette();
  const reduced = useReducedMotion();
  const ticks = useRef<InstancedMesh>(null);
  const hourHand = useRef<Group>(null);
  const minuteHand = useRef<Group>(null);
  const secondHand = useRef<Group>(null);

  useLayoutEffect(() => {
    if (!ticks.current) return;
    for (let index = 0; index < 12; index++) {
      const angle = (index / 12) * Math.PI * 2;
      const cardinal = index % 3 === 0;
      instanceHelper.position.set(Math.sin(angle) * 0.126, Math.cos(angle) * 0.126, 0.034);
      instanceHelper.rotation.set(0, 0, -angle);
      instanceHelper.scale.set(cardinal ? 0.006 : 0.004, cardinal ? 0.026 : 0.016, 0.002);
      instanceHelper.updateMatrix();
      ticks.current.setMatrixAt(index, instanceHelper.matrix);
    }
    ticks.current.instanceMatrix.needsUpdate = true;
  }, []);

  useEffect(() => {
    const update = () => {
      const { hour, minute, second } = bangkokTime(new Date());
      if (hourHand.current) hourHand.current.rotation.z = -(((hour % 12) + minute / 60) / 12) * Math.PI * 2;
      if (minuteHand.current) minuteHand.current.rotation.z = -((minute + second / 60) / 60) * Math.PI * 2;
      if (secondHand.current) secondHand.current.rotation.z = -(second / 60) * Math.PI * 2;
    };
    update();
    const interval = window.setInterval(update, reduced ? 60_000 : 1_000);
    return () => window.clearInterval(interval);
  }, [reduced]);

  return (
    <group>
      <mesh position={[0, 0, 0.015]} rotation-x={Math.PI / 2} castShadow>
        <cylinderGeometry args={[0.17, 0.17, 0.03, 48]} />
        <meshStandardMaterial color={p.plastic} roughness={0.52} />
      </mesh>
      <mesh position={[0, 0, 0.031]}>
        <circleGeometry args={[0.153, 48]} />
        <meshStandardMaterial color={p.paper} roughness={0.84} />
      </mesh>
      <mesh position={[0, 0, 0.034]}>
        <torusGeometry args={[0.158, 0.008, 10, 48]} />
        <meshStandardMaterial color={p.steel} roughness={0.38} metalness={0.48} />
      </mesh>
      <instancedMesh ref={ticks} args={[undefined, undefined, 12]}>
        <boxGeometry />
        <meshStandardMaterial color={p.ink} roughness={0.7} />
      </instancedMesh>

      <group ref={hourHand}>
        <mesh position={[0, 0.039, 0.038]}>
          <boxGeometry args={[0.012, 0.078, 0.005]} />
          <meshStandardMaterial color={p.ink} roughness={0.65} />
        </mesh>
      </group>
      <group ref={minuteHand}>
        <mesh position={[0, 0.054, 0.041]}>
          <boxGeometry args={[0.008, 0.108, 0.004]} />
          <meshStandardMaterial color={p.ink} roughness={0.65} />
        </mesh>
      </group>
      <group ref={secondHand} visible={!reduced}>
        <mesh position={[0, 0.047, 0.044]}>
          <boxGeometry args={[0.003, 0.125, 0.002]} />
          <meshStandardMaterial color={p.accentSoft} roughness={0.58} />
        </mesh>
      </group>
      <mesh position={[0, 0, 0.048]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.009, 0.009, 0.008, 18]} />
        <meshStandardMaterial color={p.steel} roughness={0.4} metalness={0.4} />
      </mesh>
    </group>
  );
}
