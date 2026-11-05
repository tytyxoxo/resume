"use client";

import { useEffect, useMemo, useRef } from "react";
import { makeCanvasTexture } from "../canvasTexture";
import { useFrame } from "@react-three/fiber";
import { BufferGeometry, CatmullRomCurve3, Float32BufferAttribute, RepeatWrapping, Vector3, type Group, type MeshStandardMaterial } from "three";
import { usePalette, useReducedMotion } from "../palette";
import { useScene } from "../store";

// A folded paper dart resting on the window sill, nose to the glass. Each successful contact send
// (store.sentCount) launches it out over the city; then it refolds on the sill. Local: resting at the origin.

// Grid paper (repeating), so the dart reads against the white sill and frame
function gridTexture(paper: string, line: string) {
  const texture = makeCanvasTexture(128, 128, (ctx) => {
    ctx.fillStyle = paper;
    ctx.fillRect(0, 0, 128, 128);
    ctx.strokeStyle = line;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.35;
    for (let i = 0; i <= 128; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 128);
      ctx.moveTo(0, i);
      ctx.lineTo(128, i);
      ctx.stroke();
    }
  });
  texture.wrapS = texture.wrapT = RepeatWrapping;
  return texture;
}

function dartGeometry() {
  // Nose at -x; two wings rising to a dihedral V over a centre keel (folded paper, double-sided)
  const nose = [-0.11, 0.014, 0];
  const v = [
    ...nose, 0.07, 0.042, -0.06, 0.07, 0.018, 0, // left wing
    ...nose, 0.07, 0.018, 0, 0.07, 0.042, 0.06, // right wing
    ...nose, 0.07, 0.018, 0, 0.07, 0.0, 0, // keel
  ];
  const g = new BufferGeometry();
  g.setAttribute("position", new Float32BufferAttribute(v, 3));
  g.computeVertexNormals();
  // Planar UVs from the top view (x, z), tiled by the grid texture
  const pos = g.getAttribute("position");
  const uv: number[] = [];
  for (let i = 0; i < pos.count; i++) uv.push(pos.getX(i) * 18, pos.getZ(i) * 18);
  g.setAttribute("uv", new Float32BufferAttribute(uv, 2));
  return g;
}

// Flight path relative to the rest pose on the sill: a small hop back into the room, then up and out
// through the window into the city (the light well behind the glass), fading as it goes.
const PATH = new CatmullRomCurve3([
  new Vector3(0, 0, 0),
  new Vector3(0.02, 0.07, 0.08),
  new Vector3(-0.03, 0.2, -0.05),
  new Vector3(-0.1, 0.3, -0.35),
  new Vector3(-0.2, 0.38, -0.68),
]);
const REST_YAW = -1.4; // nose (local −x) toward the glass (−z), slightly turned
const FLIGHT = 2.4; // seconds
const tangent = new Vector3();
const lookAt = new Vector3();

export function PaperPlane() {
  const p = usePalette();
  const reduced = useReducedMotion();
  const sentCount = useScene((s) => s.sentCount);
  const geometry = useMemo(() => dartGeometry(), []);
  const grid = useMemo(() => gridTexture(p.paper, p.accentSoft), [p]);
  const group = useRef<Group>(null);
  const material = useRef<MeshStandardMaterial>(null);
  const flight = useRef(-1); // seconds since launch, -1 = resting

  useEffect(() => () => geometry.dispose(), [geometry]);
  useEffect(() => () => grid.dispose(), [grid]);
  useEffect(() => {
    if (sentCount > 0 && !reduced) flight.current = 0;
  }, [sentCount, reduced]);

  useFrame((_, dt) => {
    const g = group.current;
    const m = material.current;
    if (!g || !m) return;
    if (flight.current < 0) return;
    flight.current += dt;
    const t = flight.current / FLIGHT;
    if (t < 1) {
      const e = t * t * (3 - 2 * t);
      PATH.getPointAt(e, g.position);
      PATH.getTangentAt(e, tangent);
      // Dart nose is local -x: look along the path then turn the nose onto it
      lookAt.copy(g.position).add(tangent);
      g.parent?.localToWorld(lookAt); // lookAt() expects world space
      g.lookAt(lookAt);
      g.rotateY(Math.PI / 2);
      g.rotateX(Math.sin(e * Math.PI) * 0.5); // bank through the turn
      m.opacity = t > 0.8 ? 1 - (t - 0.8) / 0.2 : 1;
    } else if (t < 1.6) {
      m.opacity = 0; // out of sight, wait a beat
    } else {
      g.position.set(0, 0, 0);
      g.rotation.set(0, REST_YAW, 0);
      m.opacity = Math.min(1, (t - 1.6) / 0.3);
      if (t >= 1.9) flight.current = -1;
    }
  });

  return (
    <group ref={group} rotation-y={REST_YAW} scale={1.5}>
      <mesh geometry={geometry} castShadow>
        <meshStandardMaterial ref={material} map={grid} roughness={0.8} side={2} transparent />
      </mesh>
    </group>
  );
}
