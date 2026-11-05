"use client";

import { forwardRef, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import {
  CatmullRomCurve3,
  Color,
  TubeGeometry,
  Vector3,
  type CanvasTexture,
  type Group,
} from "three";
import { experience, projects } from "@/data/resume";
import { font, fontsReady, makeCanvasTexture, redraw, roundRect } from "../canvasTexture";
import { usePalette, useReducedMotion, type Palette } from "../palette";
import { useScene } from "../store";

const BOARD = { width: 1.1, height: 0.75, depth: 0.02 };
const CARD_Z = BOARD.depth + 0.004 + 0.0015 / 2;

const projectLabel = (id: "hr-checkin" | "admin-dashboard" | "oms" | "data-management") => {
  const name = projects.find((project) => project.id === id)!.name;
  return id === "data-management" ? name.replace(" System", "") : name;
};

const papers = [
  { kind: "role" as const, role: experience[0], size: [0.34, 0.2] as const, position: [-0.27, 0.19] as const, rotation: -0.045 },
  { kind: "note" as const, label: projectLabel("hr-checkin"), size: [0.17, 0.11] as const, position: [0.03, 0.275] as const, rotation: 0.052 },
  { kind: "note" as const, label: projectLabel("admin-dashboard"), size: [0.17, 0.11] as const, position: [0.3, 0.2] as const, rotation: -0.036 },
  { kind: "role" as const, role: experience[1], size: [0.34, 0.2] as const, position: [0.22, -0.115] as const, rotation: 0.043 },
  { kind: "note" as const, label: projectLabel("oms"), size: [0.17, 0.11] as const, position: [-0.29, -0.115] as const, rotation: -0.06 },
  { kind: "note" as const, label: projectLabel("data-management"), size: [0.17, 0.11] as const, position: [-0.115, -0.265] as const, rotation: 0.038 },
] as const;

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(" ");
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(test).width > maxWidth) {
      ctx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else line = test;
  }
  ctx.fillText(line, x, y);
}

function drawRole(ctx: CanvasRenderingContext2D, p: Palette, role: (typeof experience)[number]) {
  const { width, height } = ctx.canvas;
  ctx.fillStyle = p.paper;
  roundRect(ctx, 0, 0, width, height, 14);
  ctx.fill();
  ctx.fillStyle = p.inkMuted;
  ctx.font = font(25, 500, "mono");
  ctx.fillText(role.period, 34, 54);
  ctx.fillStyle = p.ink;
  ctx.font = font(38, 600);
  wrapText(ctx, role.title, 34, 118, width - 68, 46);
  ctx.fillStyle = p.inkMuted;
  ctx.font = font(28, 500);
  ctx.fillText(role.company, 34, 255);
}

function drawNote(ctx: CanvasRenderingContext2D, p: Palette, label: string) {
  const { width, height } = ctx.canvas;
  ctx.fillStyle = p.paper;
  roundRect(ctx, 0, 0, width, height, 18);
  ctx.fill();
  ctx.fillStyle = p.ink;
  ctx.font = font(40, 600);
  wrapText(ctx, label, 34, 115, width - 68, 52);
}

function drawCork(ctx: CanvasRenderingContext2D, p: Palette) {
  const { width, height } = ctx.canvas;
  ctx.fillStyle = p.cork;
  ctx.fillRect(0, 0, width, height);
  const dark = new Color(p.cork).multiplyScalar(0.78).getStyle();
  ctx.fillStyle = dark;
  ctx.globalAlpha = 0.12;
  // Deterministic flecks keep the texture quiet and stable across redraws.
  for (let i = 0; i < 190; i++) {
    const x = (i * 83 + 17) % width;
    const y = (i * 47 + (i % 7) * 19) % height;
    ctx.fillRect(x, y, i % 5 === 0 ? 2 : 1, 1);
  }
  ctx.globalAlpha = 1;
}

const Paper = forwardRef<Group, {
  item: (typeof papers)[number];
  texture: CanvasTexture;
  pinColor: string;
}>(function Paper({
  item,
  texture,
  pinColor,
}, ref) {
  const [width, height] = item.size;
  return (
    <group
      ref={ref}
      position={[item.position[0], item.position[1], CARD_Z]}
      rotation-z={item.rotation}
    >
      <mesh castShadow={item.kind === "role"}>
        <boxGeometry args={[width, height, 0.0015]} />
        <meshStandardMaterial map={texture} roughness={0.92} />
      </mesh>
      <group position={[0, height * 0.34, 0.001]} rotation-x={Math.PI / 2}>
        <mesh position={[0, 0.004, 0]}>
          <cylinderGeometry args={[0.0035, 0.0035, 0.008, 10]} />
          <meshStandardMaterial color={pinColor} roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.012, 0]}>
          <sphereGeometry args={[0.008, 12, 8]} />
          <meshStandardMaterial color={pinColor} roughness={0.48} />
        </mesh>
      </group>
    </group>
  );
});

export function Pinboard() {
  const p = usePalette();
  const reduced = useReducedMotion();
  const section = useSceneSection();
  const paperRefs = useRef<(Group | null)[]>([]);
  const corkTexture = useMemo(() => makeCanvasTexture(512, 350, () => {}), []);
  const textures = useMemo(
    () => papers.map((item) => makeCanvasTexture(512, item.kind === "role" ? 300 : 332, () => {})),
    [],
  );
  const thread = useMemo(() => {
    const curve = new CatmullRomCurve3([
      new Vector3(0.22, -0.047, 0.0305),
      new Vector3(0.03, 0.015, 0.032),
      new Vector3(-0.1, 0.14, 0.032),
      new Vector3(-0.27, 0.258, 0.0305),
    ]);
    return new TubeGeometry(curve, 44, 0.0015, 6, false);
  }, []);

  useEffect(() => {
    redraw(corkTexture, (ctx) => drawCork(ctx, p));
    textures.forEach((texture, index) => {
      const item = papers[index];
      redraw(texture, (ctx) =>
        item.kind === "role" ? drawRole(ctx, p, item.role) : drawNote(ctx, p, item.label),
      );
    });
    fontsReady().then(() =>
      textures.forEach((texture, index) => {
        const item = papers[index];
        redraw(texture, (ctx) =>
          item.kind === "role" ? drawRole(ctx, p, item.role) : drawNote(ctx, p, item.label),
        );
      }),
    );
  }, [corkTexture, p, textures]);

  useEffect(() => {
    if (reduced) {
      paperRefs.current.forEach((paper, index) => {
        if (!paper) return;
        paper.position.z = CARD_Z;
        paper.rotation.z = papers[index].rotation;
      });
      return;
    }
    if (section !== "experience") return;
    paperRefs.current.forEach((paper, index) => {
      if (!paper) return;
      paper.position.z = CARD_Z + 0.002;
      paper.rotation.z = papers[index].rotation + (index % 2 ? 0.024 : -0.024);
    });
  }, [reduced, section]);

  useFrame((_, delta) => {
    if (reduced) return;
    paperRefs.current.forEach((paper, index) => {
      if (!paper) return;
      easing.damp(paper.position, "z", CARD_Z, 0.22, delta);
      easing.damp(paper.rotation, "z", papers[index].rotation, 0.28, delta);
    });
  });

  useEffect(
    () => () => {
      corkTexture.dispose();
      textures.forEach((texture) => texture.dispose());
      thread.dispose();
    },
    [corkTexture, textures, thread],
  );

  return (
    <group>
      <mesh position={[0, 0, BOARD.depth / 2]} receiveShadow>
        <boxGeometry args={[BOARD.width, BOARD.height, BOARD.depth]} />
        <meshStandardMaterial map={corkTexture} roughness={0.96} />
      </mesh>
      {/* Four slim rails keep the frame lighter than a second full board. */}
      {[-1, 1].map((side) => (
        <mesh key={`v-${side}`} position={[side * (BOARD.width / 2 + 0.0125), 0, 0.015]} castShadow>
          <boxGeometry args={[0.025, BOARD.height + 0.05, 0.03]} />
          <meshStandardMaterial color={p.woodDark} roughness={0.72} />
        </mesh>
      ))}
      {[-1, 1].map((side) => (
        <mesh key={`h-${side}`} position={[0, side * (BOARD.height / 2 + 0.0125), 0.015]} castShadow>
          <boxGeometry args={[BOARD.width, 0.025, 0.03]} />
          <meshStandardMaterial color={p.woodDark} roughness={0.72} />
        </mesh>
      ))}
      <mesh geometry={thread}>
        <meshStandardMaterial color={p.pinRed} roughness={0.72} />
      </mesh>
      {papers.map((item, index) => (
        <Paper
          key={item.kind === "role" ? item.role.period : item.label}
          ref={(node) => {
            paperRefs.current[index] = node;
          }}
          item={item}
          texture={textures[index]}
          pinColor={index === 0 ? p.accentSoft : p.pinRed}
        />
      ))}
    </group>
  );
}

const useSceneSection = () => useScene((state) => state.section);
