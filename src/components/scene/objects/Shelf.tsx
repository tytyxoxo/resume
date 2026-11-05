"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Object3D, Vector2, type InstancedMesh } from "three";
import { education } from "@/data/resume";
import { font, fontsReady, makeCanvasTexture, redraw } from "../canvasTexture";
import { usePalette, type Palette } from "../palette";

type Transform = {
  position: [number, number, number];
  scale: [number, number, number];
  rotation?: [number, number, number];
  color: number;
};

const boards: Omit<Transform, "color">[] = [
  { position: [-0.489, 0.41, 0.16], scale: [0.022, 0.82, 0.32] },
  { position: [0.489, 0.41, 0.16], scale: [0.022, 0.82, 0.32] },
  { position: [0, 0.09, 0.16], scale: [0.978, 0.022, 0.32] },
  { position: [0, 0.43, 0.16], scale: [0.978, 0.022, 0.32] },
  { position: [0, 0.809, 0.16], scale: [1, 0.022, 0.32] },
  { position: [0, 0.45, 0.008], scale: [0.956, 0.716, 0.016] },
  { position: [0, 0.04, 0.105], scale: [0.86, 0.08, 0.19] },
];

const upright = (
  x: number,
  base: number,
  height: number,
  width: number,
  depth: number,
  color: number,
  lean = 0,
): Transform => ({
  position: [x, base + height / 2 + Math.abs(Math.sin(lean)) * width * 0.5, 0.018 + depth / 2],
  scale: [width, height, depth],
  rotation: [0, 0, lean],
  color,
});

// ponytail: solid instanced covers are the useful silhouette; add spine planes only if the close-up needs them.
// Two quiet rows, one horizontal trio, and two books on top: 22 books total.
const books: Transform[] = [
  upright(-0.41, 0.102, 0.24, 0.035, 0.25, 0),
  upright(-0.368, 0.102, 0.21, 0.03, 0.23, 4),
  upright(-0.327, 0.102, 0.255, 0.042, 0.27, 2),
  upright(-0.278, 0.102, 0.225, 0.033, 0.24, 1),
  upright(-0.224, 0.102, 0.25, 0.04, 0.26, 5, -0.21),
  upright(-0.173, 0.102, 0.232, 0.028, 0.22, 3, -0.21),
  upright(-0.128, 0.102, 0.26, 0.04, 0.265, 0),
  { position: [0.19, 0.114, 0.145], scale: [0.25, 0.024, 0.25], color: 4 },
  { position: [0.18, 0.141, 0.15], scale: [0.225, 0.03, 0.24], color: 1 },
  { position: [0.2, 0.17, 0.142], scale: [0.24, 0.028, 0.248], color: 3 },
  upright(-0.405, 0.442, 0.22, 0.04, 0.25, 2),
  upright(-0.357, 0.442, 0.25, 0.034, 0.27, 5),
  upright(-0.31, 0.442, 0.235, 0.045, 0.24, 1),
  upright(-0.252, 0.442, 0.205, 0.032, 0.22, 0),
  upright(-0.202, 0.442, 0.255, 0.038, 0.26, 3, 0.2),
  upright(-0.145, 0.442, 0.225, 0.03, 0.23, 4, 0.2),
  upright(-0.085, 0.442, 0.245, 0.043, 0.265, 2),
  upright(-0.035, 0.442, 0.19, 0.026, 0.22, 5),
  upright(0.018, 0.442, 0.23, 0.04, 0.25, 0),
  upright(0.068, 0.442, 0.215, 0.035, 0.235, 3),
  { position: [-0.23, 0.833, 0.16], scale: [0.24, 0.026, 0.245], color: 2 },
  { position: [-0.22, 0.862, 0.155], scale: [0.215, 0.032, 0.235], color: 5 },
];

const vaseProfile = [
  new Vector2(0, 0),
  new Vector2(0.068, 0.006),
  new Vector2(0.064, 0.115),
  new Vector2(0.043, 0.15),
  new Vector2(0.034, 0.2),
  new Vector2(0, 0.204),
];

function Instances({ items, color }: { items: Omit<Transform, "color">[]; color: string }) {
  const ref = useRef<InstancedMesh>(null);
  useLayoutEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const dummy = new Object3D();
    items.forEach((item, index) => {
      dummy.position.set(...item.position);
      dummy.rotation.set(...(item.rotation ?? [0, 0, 0]));
      dummy.scale.set(...item.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [items]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, items.length]} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} roughness={0.72} />
    </instancedMesh>
  );
}

export function Shelf() {
  const p = usePalette();
  return (
    <group>
      <Instances items={boards} color={p.wood} />
      {p.books.map((color, colorIndex) => (
        <Instances key={colorIndex} items={books.filter((book) => book.color === colorIndex)} color={color} />
      ))}
      <mesh position={[0.28, 0.82, 0.16]} castShadow>
        <latheGeometry args={[vaseProfile, 28]} />
        <meshStandardMaterial color={p.ceramic} roughness={0.78} />
      </mesh>
    </group>
  );
}

function drawCertificate(ctx: CanvasRenderingContext2D, p: Palette) {
  const { width, height } = ctx.canvas;
  const record = education[0];
  ctx.fillStyle = p.paper;
  ctx.fillRect(0, 0, width, height);
  ctx.textAlign = "center";
  ctx.fillStyle = p.ink;
  ctx.font = font(48, 600);
  ctx.fillText(record.school, width / 2, 185);
  ctx.font = font(35, 500);
  const [faculty, subject] = record.degree.split(" and ");
  ctx.fillText(faculty, width / 2, 310);
  ctx.fillText(`and ${subject}`, width / 2, 357);
  ctx.fillStyle = p.inkMuted;
  ctx.font = font(30, 500, "mono");
  ctx.fillText(`${record.year} · ${record.note}`, width / 2, 515);
  ctx.globalAlpha = 0.45;
  ctx.fillRect(width / 2 - 110, 230, 220, 3);
  ctx.globalAlpha = 1;
}

const frameRails: Omit<Transform, "color">[] = [
  { position: [-0.2375, 0, 0.0125], scale: [0.025, 0.38, 0.025] },
  { position: [0.2375, 0, 0.0125], scale: [0.025, 0.38, 0.025] },
  { position: [0, -0.1775, 0.0125], scale: [0.45, 0.025, 0.025] },
  { position: [0, 0.1775, 0.0125], scale: [0.45, 0.025, 0.025] },
];

export function Diploma() {
  const p = usePalette();
  const texture = useMemo(() => makeCanvasTexture(1024, 724, () => {}), []);

  useEffect(() => {
    redraw(texture, (ctx) => drawCertificate(ctx, p));
    fontsReady().then(() => redraw(texture, (ctx) => drawCertificate(ctx, p)));
  }, [p, texture]);
  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <group>
      <mesh position={[0, 0, 0.009]} receiveShadow>
        <boxGeometry args={[0.47, 0.35, 0.018]} />
        <meshStandardMaterial color={p.paper} roughness={0.9} />
      </mesh>
      <Instances items={frameRails} color={p.woodDark} />
      <mesh position={[0, 0, 0.026]}>
        <planeGeometry args={[0.42, 0.297]} />
        <meshStandardMaterial map={texture} roughness={0.88} />
      </mesh>
      <mesh position={[0, 0, 0.027]}>
        <planeGeometry args={[0.455, 0.335]} />
        <meshPhysicalMaterial color={p.glass} transparent opacity={0.06} roughness={0.12} depthWrite={false} />
      </mesh>
    </group>
  );
}
