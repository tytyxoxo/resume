"use client";

import { useEffect, useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import { profile } from "@/data/resume";
import { font, fontsReady, makeCanvasTexture, redraw } from "../canvasTexture";
import { usePalette, type Palette } from "../palette";

// Desk, chair, mug and the printed resume. Local space: origin at the floor (or desk top for small
// items), front facing +z. Placed by the Diorama.

export const DESK = { width: 1.5, depth: 0.72, top: 0.74, thickness: 0.035 };

export function Desk() {
  const p = usePalette();
  const { width, depth, top, thickness } = DESK;
  const legH = top - thickness;
  const legX = width / 2 - 0.06;
  const legZ = depth / 2 - 0.06;
  return (
    <group>
      <RoundedBox args={[width, thickness, depth]} radius={0.012} smoothness={3} position={[0, top - thickness / 2, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={p.wood} roughness={0.62} />
      </RoundedBox>
      {/* Steel frame: two side frames joined by a rail at the back */}
      {[-legX, legX].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          {[-legZ, legZ].map((z) => (
            <mesh key={z} position={[0, legH / 2, z]} castShadow>
              <boxGeometry args={[0.03, legH, 0.03]} />
              <meshStandardMaterial color={p.steel} roughness={0.45} metalness={0.5} />
            </mesh>
          ))}
          <mesh position={[0, legH - 0.03, 0]}>
            <boxGeometry args={[0.03, 0.03, depth - 0.12]} />
            <meshStandardMaterial color={p.steel} roughness={0.45} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[0.03, 0.02, depth - 0.12]} />
            <meshStandardMaterial color={p.steel} roughness={0.45} metalness={0.5} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, legH - 0.03, -legZ]}>
        <boxGeometry args={[legX * 2, 0.03, 0.02]} />
        <meshStandardMaterial color={p.steel} roughness={0.45} metalness={0.5} />
      </mesh>
    </group>
  );
}

export function Chair() {
  const p = usePalette();
  return (
    <group>
      {/* Five-star base on casters */}
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i / 5) * Math.PI * 2;
        return (
          <group key={i} rotation-y={a}>
            <mesh position={[0, 0.055, 0.15]} castShadow>
              <boxGeometry args={[0.04, 0.025, 0.3]} />
              <meshStandardMaterial color={p.steel} roughness={0.5} metalness={0.3} />
            </mesh>
            <mesh position={[0, 0.025, 0.28]}>
              <sphereGeometry args={[0.025, 12, 8]} />
              <meshStandardMaterial color={p.plasticDark} roughness={0.6} />
            </mesh>
          </group>
        );
      })}
      <mesh position={[0, 0.25, 0]} castShadow>
        <cylinderGeometry args={[0.022, 0.026, 0.36, 16]} />
        <meshStandardMaterial color={p.steelLight} roughness={0.3} metalness={0.7} />
      </mesh>
      <RoundedBox args={[0.48, 0.07, 0.46]} radius={0.03} smoothness={4} position={[0, 0.46, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={p.fabric} roughness={0.9} />
      </RoundedBox>
      {/* Backrest on a slim spine, slightly reclined; the back sits at -z, the seat front at +z */}
      <mesh position={[0, 0.6, -0.235]} rotation-x={-0.08}>
        <boxGeometry args={[0.04, 0.3, 0.025]} />
        <meshStandardMaterial color={p.steel} roughness={0.5} metalness={0.3} />
      </mesh>
      <RoundedBox args={[0.46, 0.46, 0.06]} radius={0.03} smoothness={4} position={[0, 0.84, -0.27]} rotation-x={-0.12} castShadow>
        <meshStandardMaterial color={p.fabric} roughness={0.9} />
      </RoundedBox>
    </group>
  );
}

export function Mug() {
  const p = usePalette();
  return (
    <group>
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.042, 0.038, 0.1, 28, 1, true]} />
        <meshStandardMaterial color={p.paper} roughness={0.4} side={2} />
      </mesh>
      <mesh position={[0, 0.002, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.038, 28]} />
        <meshStandardMaterial color={p.paper} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.088, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.039, 28]} />
        <meshStandardMaterial color="#4a3426" roughness={0.25} />
      </mesh>
      {/* Handle: right half of a ring, standing on the +x side */}
      <mesh position={[0.04, 0.052, 0]} rotation-z={-Math.PI / 2}>
        <torusGeometry args={[0.022, 0.0065, 10, 20, Math.PI]} />
        <meshStandardMaterial color={p.paper} roughness={0.4} />
      </mesh>
    </group>
  );
}

function drawResume(ctx: CanvasRenderingContext2D, p: Palette) {
  const { width: w, height: h } = ctx.canvas;
  ctx.fillStyle = p.paper;
  ctx.fillRect(0, 0, w, h);
  const x = 64;
  ctx.fillStyle = p.ink;
  ctx.font = font(44, 600);
  ctx.fillText(profile.name, x, 120);
  ctx.fillStyle = p.inkMuted;
  ctx.font = font(26, 500);
  ctx.fillText(profile.role, x, 168);
  // Body copy as quiet grey bars — it reads as a printed page from the camera distance
  let y = 240;
  for (const block of [4, 5, 3, 5, 4]) {
    ctx.fillStyle = p.ink;
    ctx.globalAlpha = 0.75;
    ctx.fillRect(x, y, 150, 14);
    y += 40;
    ctx.globalAlpha = 0.22;
    for (let i = 0; i < block; i++) {
      ctx.fillRect(x, y, w - x * 2 - (i % 3) * 60, 10);
      y += 24;
    }
    y += 34;
  }
  ctx.globalAlpha = 1;
}

export function ResumeSheet() {
  const p = usePalette();
  const texture = useMemo(() => makeCanvasTexture(512, 724, () => {}), []);
  useEffect(() => {
    redraw(texture, (ctx) => drawResume(ctx, p));
    fontsReady().then(() => redraw(texture, (ctx) => drawResume(ctx, p)));
  }, [texture, p]);
  useEffect(() => () => texture.dispose(), [texture]);
  return (
    <mesh position={[0, 0.0012, 0]} rotation-x={-Math.PI / 2} receiveShadow>
      <planeGeometry args={[0.21, 0.297]} />
      <meshStandardMaterial map={texture} roughness={0.85} />
    </mesh>
  );
}
