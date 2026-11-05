"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { easing } from "maath";
import type { Group } from "three";
import { education, learning, profile } from "@/data/resume";
import { font, fontsReady, makeCanvasTexture, redraw } from "../canvasTexture";
import { usePalette, useReducedMotion, type Palette } from "../palette";
import { useScene } from "../store";

// Small printed things that put the remaining facts into the room: a postcard on the window sill
// (contact), a seedling pot with labelled stakes on the desk (currently learning) and a framed
// school photo card on the shelf (high school). Local space, front +z, origin at the bottom-centre.

type Line = { text: string; px: number; weight: 400 | 500 | 600; mono?: boolean; tone?: "ink" | "muted" | "accent"; gap?: number };

const PX_PER_M = 3200; // texture resolution: 3200 px per metre keeps 8–10 px text crisp at the close-ups

function drawLines(ctx: CanvasRenderingContext2D, p: Palette, lines: Line[], pad: number) {
  const { width, height } = ctx.canvas;
  ctx.fillStyle = p.paper;
  ctx.fillRect(0, 0, width, height);
  let y = pad;
  for (const l of lines) {
    y += l.gap ?? 0;
    ctx.font = font(l.px, l.weight, l.mono ? "mono" : "sans");
    ctx.fillStyle = l.tone === "accent" ? p.accent : l.tone === "muted" ? p.inkMuted : p.ink;
    ctx.textBaseline = "top";
    let text = l.text;
    while (ctx.measureText(text).width > width - pad * 2 && text.length > 4) text = text.slice(0, -2) + "…";
    ctx.fillText(text, pad, y);
    y += l.px * 1.32;
  }
}

function usePrintedTexture(w: number, h: number, lines: Line[], pad: number) {
  const p = usePalette();
  const texture = useMemo(() => makeCanvasTexture(Math.round(w * PX_PER_M), Math.round(h * PX_PER_M), () => {}), [w, h]);
  useEffect(() => {
    redraw(texture, (ctx) => drawLines(ctx, p, lines, pad));
    fontsReady().then(() => redraw(texture, (ctx) => drawLines(ctx, p, lines, pad)));
  }, [texture, p, lines, pad]);
  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

// A card of paper with printed lines on its front face
function PrintedCard({ w, h, lines, pad = 40, thickness = 0.0012 }: { w: number; h: number; lines: Line[]; pad?: number; thickness?: number }) {
  const p = usePalette();
  const map = usePrintedTexture(w, h, lines, pad);
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[w, h, thickness]} />
        <meshStandardMaterial color={p.paper} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, thickness / 2 + 0.0002]}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial map={map} roughness={0.88} />
      </mesh>
    </group>
  );
}

const POSTCARD: Line[] = [
  { text: "Get in touch", px: 40, weight: 600 },
  { text: profile.email, px: 27, weight: 500, gap: 12 },
  { text: "linkedin.com/in/passon-rattanakongton", px: 20, weight: 400, tone: "muted", gap: 4 },
  { text: "Bangkok · UTC+7", px: 20, weight: 400, mono: true, tone: "muted", gap: 14 },
];

// Leans against the window frame on the sill, next to the paper plane
export function Postcard() {
  return (
    <group rotation-x={-0.16}>
      <group position={[0, 0.045, 0]}>
        <PrintedCard w={0.14} h={0.09} lines={POSTCARD} pad={34} />
      </group>
    </group>
  );
}

const school = education[1];
const SCHOOL_CARD: Line[] = [
  { text: school.school, px: 34, weight: 600 },
  { text: `${school.degree} · ${school.note}`, px: 22, weight: 400, tone: "muted", gap: 6 },
  { text: school.year, px: 22, weight: 400, mono: true, tone: "muted", gap: 14 },
];

// A small standing frame on the bookshelf for the high-school entry
export function SchoolFrame() {
  const p = usePalette();
  return (
    <group rotation-x={-0.12}>
      <RoundedBox args={[0.17, 0.125, 0.012]} radius={0.003} smoothness={2} position={[0, 0.0625, 0]} castShadow>
        <meshStandardMaterial color={p.woodDark} roughness={0.6} />
      </RoundedBox>
      <group position={[0, 0.0625, 0.0065]}>
        <PrintedCard w={0.15} h={0.105} lines={SCHOOL_CARD} pad={30} thickness={0.0008} />
      </group>
      {/* Back stand */}
      <mesh position={[0, 0.045, -0.03]} rotation-x={0.45}>
        <boxGeometry args={[0.03, 0.1, 0.004]} />
        <meshStandardMaterial color={p.woodDark} roughness={0.6} />
      </mesh>
    </group>
  );
}

// Seedling pot: one sprout + one labelled stake per "currently learning" topic. The sprouts grow
// the first time the journey reaches Skills.
export function SeedlingPot() {
  const p = usePalette();
  const reduced = useReducedMotion();
  const section = useScene((s) => s.section);
  const grown = useRef(false);
  const sprouts = useRef<(Group | null)[]>([]);
  const growAt = useRef(0);
  useEffect(() => {
    if (section === "skills" && !grown.current) {
      grown.current = true;
      growAt.current = performance.now();
    }
  }, [section]);

  useFrame((_, dt) => {
    sprouts.current.forEach((g, i) => {
      if (!g) return;
      const due = grown.current && performance.now() - growAt.current > i * 260;
      const target = due ? 1 : 0.0001;
      if (reduced) g.scale.setScalar(grown.current ? 1 : 0.0001);
      else {
        easing.damp(g.scale, "x", target, 0.25, dt);
        g.scale.y = g.scale.z = g.scale.x;
      }
    });
  });

  const tags = useMemo(
    () => learning.map((l) => [{ text: l.title, px: 30, weight: 600 as const }] satisfies Line[]),
    [],
  );
  // Sprout spots in the soil, and how high each label rides so the three never overlap
  const spots: [number, number][] = [
    [-0.035, 0.012],
    [0.0, -0.022],
    [0.036, 0.014],
  ];
  const labelHeight = [0.07, 0.112, 0.07];
  const labelSide = [-0.03, 0, 0.03];

  return (
    <group>
      <mesh position={[0, 0.035, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.052, 0.042, 0.07, 28]} />
        <meshStandardMaterial color={p.terracotta} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.066, 0]} rotation-x={-Math.PI / 2}>
        <circleGeometry args={[0.049, 28]} />
        <meshStandardMaterial color={p.soil} roughness={1} />
      </mesh>
      {spots.map(([x, z], i) => (
        <group key={i} position={[x, 0.066, z]}>
          {/* Sprout: a stem and two leaves */}
          <group
            ref={(g) => {
              sprouts.current[i] = g;
            }}
            scale={0.0001}
          >
            <mesh position={[0, 0.03, 0]}>
              <cylinderGeometry args={[0.0018, 0.0022, 0.06, 6]} />
              <meshStandardMaterial color={p.leaf} roughness={0.7} />
            </mesh>
            {[-1, 1].map((side) => (
              <mesh key={side} position={[side * 0.012, 0.058, 0]} rotation-z={side * -0.6} scale={[1, 0.45, 0.6]}>
                <sphereGeometry args={[0.014, 12, 8]} />
                <meshStandardMaterial color={i === 1 ? p.leafLight : p.leaf} roughness={0.6} />
              </mesh>
            ))}
          </group>
          {/* Stake with its label, leaning toward the viewer */}
          <group position={[0, 0, 0.022]} rotation-x={-0.18} rotation-z={(i - 1) * 0.1}>
            <mesh position={[0, labelHeight[i] / 2, 0]}>
              <boxGeometry args={[0.004, labelHeight[i], 0.002]} />
              <meshStandardMaterial color={p.wood} roughness={0.8} />
            </mesh>
            <group position={[labelSide[i], labelHeight[i] + 0.012, 0.0015]}>
              <PrintedCard w={0.1} h={0.024} lines={tags[i]} pad={12} thickness={0.0008} />
            </group>
          </group>
        </group>
      ))}
    </group>
  );
}
