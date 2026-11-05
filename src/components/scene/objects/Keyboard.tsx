"use client";

import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { RoundedBox } from "@react-three/drei";
import { type ThreeEvent, useFrame } from "@react-three/fiber";
import { easing } from "maath";
import {
  BufferAttribute,
  Color,
  DynamicDrawUsage,
  type InstancedMesh,
  Matrix4,
  type Mesh,
} from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { allTools } from "@/data/resume";
import { font, fontsReady, makeCanvasTexture, redraw } from "../canvasTexture";
import { usePalette, useReducedMotion, type Palette } from "../palette";
import { useScene } from "../store";

const U = 0.019;
const KEY_GAP = 0.0016;
const KEY_HEIGHT = 0.009;
const PRESS = 0.0028;

type KeySpec = { code: string; width: number };
type KeyTone = "paper" | "ceramic" | "accentSoft";
type PlacedKey = KeySpec & { x: number; z: number; tone: KeyTone };

const sequence = (prefix: string, from: number, to: number): KeySpec[] =>
  Array.from({ length: to - from + 1 }, (_, i) => ({ code: `${prefix}${from + i}`, width: 1 }));
const letters = (value: string): KeySpec[] => [...value].map((letter) => ({ code: `Key${letter}`, width: 1 }));

const KEY_ROWS: KeySpec[][] = [
  [{ code: "Escape", width: 1 }, ...sequence("F", 1, 12), { code: "Delete", width: 1 }, { code: "Home", width: 1 }, { code: "End", width: 1 }],
  [
    { code: "Backquote", width: 1 },
    ...sequence("Digit", 1, 9),
    { code: "Digit0", width: 1 },
    { code: "Minus", width: 1 },
    { code: "Equal", width: 1 },
    { code: "Backspace", width: 2 },
    { code: "PageUp", width: 1 },
  ],
  [
    { code: "Tab", width: 1.5 },
    ...letters("QWERTYUIOP"),
    { code: "BracketLeft", width: 1 },
    { code: "BracketRight", width: 1 },
    { code: "Backslash", width: 1.5 },
    { code: "PageDown", width: 1 },
  ],
  [
    { code: "CapsLock", width: 1.75 },
    ...letters("ASDFGHJKL"),
    { code: "Semicolon", width: 1 },
    { code: "Quote", width: 1 },
    { code: "Enter", width: 2.25 },
    { code: "Insert", width: 1 },
  ],
  [
    { code: "ShiftLeft", width: 2.25 },
    ...letters("ZXCVBNM"),
    { code: "Comma", width: 1 },
    { code: "Period", width: 1 },
    { code: "Slash", width: 1 },
    { code: "ShiftRight", width: 1.75 },
    { code: "ArrowUp", width: 1 },
    { code: "PrintScreen", width: 1 },
  ],
  [
    { code: "ControlLeft", width: 1.25 },
    { code: "MetaLeft", width: 1.25 },
    { code: "AltLeft", width: 1.25 },
    { code: "Space", width: 6.25 },
    { code: "AltRight", width: 1 },
    { code: "ContextMenu", width: 1 },
    { code: "ControlRight", width: 1 },
    { code: "ArrowLeft", width: 1 },
    { code: "ArrowDown", width: 1 },
    { code: "ArrowRight", width: 1 },
  ],
];

const CERAMIC_KEYS = new Set([
  "Tab",
  "CapsLock",
  "ShiftLeft",
  "ShiftRight",
  "Backspace",
  "ControlLeft",
  "ControlRight",
  "MetaLeft",
  "AltLeft",
  "AltRight",
  "ContextMenu",
  "Delete",
  "Home",
  "End",
  "PageUp",
  "PageDown",
  "Insert",
  "PrintScreen",
  "ArrowUp",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
  ...sequence("F", 1, 12).map((key) => key.code),
]);

function keyTone(code: string): KeyTone {
  if (code === "Escape" || code === "Enter") return "accentSoft";
  return CERAMIC_KEYS.has(code) ? "ceramic" : "paper";
}

const PLACED_KEYS: PlacedKey[] = KEY_ROWS.flatMap((row, rowIndex) => {
  let cursor = -8 * U;
  const z = (rowIndex - 2.5) * U - (rowIndex === 0 ? U * 0.25 : 0);
  return row.map((key) => {
    const placed = { ...key, x: cursor + (key.width * U) / 2, z, tone: keyTone(key.code) };
    cursor += key.width * U;
    return placed;
  });
});

const KEY_WIDTHS = [...new Set(PLACED_KEYS.map((key) => key.width))];
const KEY_GROUPS = KEY_WIDTHS.map((width) => ({ width, keys: PLACED_KEYS.filter((key) => key.width === width) }));

// ponytail: module-load checks cover the hand-authored layout; add a dedicated test only if layouts become data-driven.
if (process.env.NODE_ENV !== "production" && (KEY_ROWS.some((row) => row.reduce((sum, key) => sum + key.width, 0) !== 16) || allTools.length !== 8)) {
  throw new Error("Keyboard rows must be 16u and the macropad requires exactly eight tools.");
}

type KeyMotion = {
  mesh: InstancedMesh;
  instanceId: number;
  rest: Matrix4;
  offset: number;
};

function omitKeycapBottom(geometry: RoundedBoxGeometry) {
  const bottom = geometry.groups[3];
  if (!bottom) return geometry;
  for (const name of ["position", "normal", "uv"]) {
    const attribute = geometry.getAttribute(name);
    const start = bottom.start * attribute.itemSize;
    const end = (bottom.start + bottom.count) * attribute.itemSize;
    attribute.array.copyWithin(start, end);
    geometry.setAttribute(name, new BufferAttribute(attribute.array.slice(0, attribute.array.length - bottom.count * attribute.itemSize), attribute.itemSize, attribute.normalized));
  }
  geometry.clearGroups();
  return geometry;
}

function isEditableTarget(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest("input, textarea, select, [contenteditable]:not([contenteditable='false'])"));
}

export function Keyboard() {
  const p = usePalette();
  const reduced = useReducedMotion();
  const meshRefs = useRef<(InstancedMesh | null)[]>([]);
  const bindings = useRef(new Map<string, KeyMotion>());
  const keyboardPressed = useRef(new Set<string>());
  const pointerKey = useRef<string | null>(null);
  const scratch = useRef(new Matrix4());
  const geometries = useMemo(
    // ponytail: omit desk-facing bottoms to meet the triangle ceiling; restore them if keys ever float above a surface.
    () => KEY_GROUPS.map(({ width }) => omitKeycapBottom(new RoundedBoxGeometry(width * U - KEY_GAP, KEY_HEIGHT, U - KEY_GAP, 2, 0.0022))),
    [],
  );
  const plateColor = useMemo(() => new Color(p.steelLight).lerp(new Color(p.steel), 0.24), [p]);

  useEffect(() => () => geometries.forEach((geometry) => geometry.dispose()), [geometries]);

  useLayoutEffect(() => {
    bindings.current.clear();
    const tones = {
      paper: new Color(p.paper),
      ceramic: new Color(p.ceramic),
      accentSoft: new Color(p.accentSoft),
    };
    KEY_GROUPS.forEach((group, groupIndex) => {
      const mesh = meshRefs.current[groupIndex];
      if (!mesh) return;
      mesh.instanceMatrix.setUsage(DynamicDrawUsage);
      group.keys.forEach((key, instanceId) => {
        const rest = new Matrix4().makeTranslation(key.x, KEY_HEIGHT / 2 + 0.0008, key.z);
        mesh.setMatrixAt(instanceId, rest);
        mesh.setColorAt(instanceId, tones[key.tone]);
        bindings.current.set(key.code, { mesh, instanceId, rest, offset: 0 });
      });
      mesh.instanceMatrix.needsUpdate = true;
      if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      mesh.computeBoundingSphere();
    });
  }, [p]);

  useEffect(() => {
    const releaseAll = () => {
      keyboardPressed.current.clear();
      pointerKey.current = null;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isEditableTarget(event.target) && bindings.current.has(event.code)) keyboardPressed.current.add(event.code);
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (!isEditableTarget(event.target)) keyboardPressed.current.delete(event.code);
    };
    const onVisibility = () => {
      if (document.hidden) releaseAll();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", releaseAll);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", releaseAll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useFrame((_, delta) => {
    bindings.current.forEach((motion, code) => {
      const target = keyboardPressed.current.has(code) || pointerKey.current === code ? PRESS : 0;
      const previous = motion.offset;
      if (reduced) motion.offset = target;
      else easing.damp(motion, "offset", target, target ? 0.04 : 0.075, delta, Infinity, undefined, 0.00001);
      if (motion.offset === previous) return;
      scratch.current.copy(motion.rest);
      scratch.current.elements[13] = motion.rest.elements[13] - motion.offset;
      motion.mesh.setMatrixAt(motion.instanceId, scratch.current);
      motion.mesh.instanceMatrix.needsUpdate = true;
    });
  });

  const pressPointerKey = (event: ThreeEvent<PointerEvent>, keys: PlacedKey[]) => {
    const key = event.instanceId === undefined ? undefined : keys[event.instanceId];
    if (!key) return;
    pointerKey.current = key.code;
  };
  const releasePointerKey = () => {
    pointerKey.current = null;
  };

  return (
    <group>
      <RoundedBox args={[16 * U + 0.012, 0.014, 6 * U + 0.016]} radius={0.006} smoothness={3} bevelSegments={1} position={[0, 0.007, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={p.steelLight} roughness={0.46} metalness={0.42} />
      </RoundedBox>
      {/* Caps share the plate's 4° rake; local -y is therefore exactly the press direction. */}
      <group position={[0, 0.018, 0]} rotation-x={Math.PI / 45}>
        <RoundedBox args={[16 * U + 0.004, 0.0022, 6 * U + 0.004]} radius={0.0035} smoothness={2} bevelSegments={1} position={[0, -0.0011, 0]} receiveShadow>
          <meshStandardMaterial color={plateColor} roughness={0.56} metalness={0.3} />
        </RoundedBox>
        {KEY_GROUPS.map((group, groupIndex) => (
          <instancedMesh
            key={group.width}
            ref={(mesh) => {
              meshRefs.current[groupIndex] = mesh;
            }}
            args={[geometries[groupIndex], undefined, group.keys.length]}
            frustumCulled={false}
            onPointerDown={(event) => pressPointerKey(event, group.keys)}
            onPointerUp={releasePointerKey}
            onPointerLeave={releasePointerKey}
          >
            <meshStandardMaterial roughness={0.74} />
          </instancedMesh>
        ))}
      </group>
    </group>
  );
}

const PAD_PITCH = 0.027;
const PAD_CAP_HEIGHT = 0.011;
const PAD_CASE_HEIGHT = 0.014;
const PAD_SLOTS = [
  [-PAD_PITCH, -PAD_PITCH],
  [0, -PAD_PITCH],
  [-PAD_PITCH, 0],
  [0, 0],
  [PAD_PITCH, 0],
  [-PAD_PITCH, PAD_PITCH],
  [0, PAD_PITCH],
  [PAD_PITCH, PAD_PITCH],
] as const;

function drawToolLegend(ctx: CanvasRenderingContext2D, label: string, p: Palette) {
  const maxWidth = 218;
  const words = label.split(" ");
  let lines = [label];
  let size = 48;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = font(size, 600);
  if (words.length > 1 && ctx.measureText(label).width > maxWidth) lines = words;
  while (size > 27) {
    ctx.font = font(size, 600);
    if (lines.every((line) => ctx.measureText(line).width <= maxWidth)) break;
    size -= 2;
  }
  ctx.fillStyle = p.ink;
  const lineHeight = size * 1.04;
  const firstY = 128 - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, index) => ctx.fillText(line, 128, firstY + index * lineHeight));
}

type PadMotion = { offset: number; color: Color };

export function Macropad() {
  const p = usePalette();
  const reduced = useReducedMotion();
  const section = useScene((state) => state.section);
  const capMesh = useRef<InstancedMesh>(null);
  const legendMeshes = useRef<(Mesh | null)[]>([]);
  const hovered = useRef<number | null>(null);
  const sequenceState = useRef({ active: false, elapsed: 0 });
  const matrix = useRef(new Matrix4());
  const motions = useMemo<PadMotion[]>(() => allTools.map(() => ({ offset: 0, color: new Color() })), []);
  const calm = useMemo(() => new Color(p.paper), [p.paper]);
  const lit = useMemo(() => new Color(p.paper).lerp(new Color(p.accentSoft), 0.18), [p.paper, p.accentSoft]);
  const capGeometry = useMemo(() => new RoundedBoxGeometry(0.0245, PAD_CAP_HEIGHT, 0.0245, 1, 0.003), []);
  const textures = useMemo(() => allTools.map(() => makeCanvasTexture(256, 256, () => {})), []);

  useEffect(() => () => capGeometry.dispose(), [capGeometry]);
  useEffect(() => () => textures.forEach((texture) => texture.dispose()), [textures]);
  useEffect(() => {
    let cancelled = false;
    const paint = () => textures.forEach((texture, index) => redraw(texture, (ctx) => drawToolLegend(ctx, allTools[index], p)));
    paint();
    fontsReady().then(() => {
      if (!cancelled) paint();
    });
    return () => {
      cancelled = true;
    };
  }, [p, textures]);

  useLayoutEffect(() => {
    const mesh = capMesh.current;
    if (!mesh) return;
    mesh.instanceMatrix.setUsage(DynamicDrawUsage);
    motions.forEach((motion, index) => {
      const [x, z] = PAD_SLOTS[index];
      motion.offset = 0;
      motion.color.copy(calm);
      matrix.current.makeTranslation(x, PAD_CASE_HEIGHT + PAD_CAP_HEIGHT / 2, z);
      mesh.setMatrixAt(index, matrix.current);
      mesh.setColorAt(index, calm);
      const legend = legendMeshes.current[index];
      if (legend) legend.position.set(x, PAD_CASE_HEIGHT + PAD_CAP_HEIGHT + 0.00015, z);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.computeBoundingSphere();
  }, [calm, motions]);

  useEffect(() => {
    sequenceState.current.active = section === "skills" && !reduced;
    sequenceState.current.elapsed = 0;
  }, [section, reduced]);

  useFrame((_, delta) => {
    const mesh = capMesh.current;
    if (!mesh) return;
    const sequence = sequenceState.current;
    if (sequence.active) {
      sequence.elapsed += delta;
      if (sequence.elapsed > (allTools.length - 1) * 0.09 + 1.2) sequence.active = false;
    }
    let matricesChanged = false;
    let colorsChanged = false;
    motions.forEach((motion, index) => {
      const offsetTarget = hovered.current === index ? 0.0015 : 0;
      const previousOffset = motion.offset;
      if (reduced) motion.offset = offsetTarget;
      else easing.damp(motion, "offset", offsetTarget, 0.055, delta, Infinity, undefined, 0.00001);
      if (motion.offset !== previousOffset) {
        const [x, z] = PAD_SLOTS[index];
        const y = PAD_CASE_HEIGHT + PAD_CAP_HEIGHT / 2 - motion.offset;
        matrix.current.makeTranslation(x, y, z);
        mesh.setMatrixAt(index, matrix.current);
        const legend = legendMeshes.current[index];
        if (legend) legend.position.y = PAD_CASE_HEIGHT + PAD_CAP_HEIGHT + 0.00015 - motion.offset;
        matricesChanged = true;
      }

      const start = index * 0.09;
      const isLit = !reduced && sequence.active && sequence.elapsed >= start && sequence.elapsed < start + 1.2;
      if (reduced) {
        if (!motion.color.equals(calm)) {
          motion.color.copy(calm);
          colorsChanged = true;
        }
      } else if (easing.dampC(motion.color, isLit ? lit : calm, 0.1, delta, Infinity, undefined, 0.0001)) {
        colorsChanged = true;
      }
      if (colorsChanged) mesh.setColorAt(index, motion.color);
    });
    if (matricesChanged) mesh.instanceMatrix.needsUpdate = true;
    if (colorsChanged && mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      <RoundedBox args={[0.092, PAD_CASE_HEIGHT, 0.092]} radius={0.006} smoothness={3} bevelSegments={1} position={[0, PAD_CASE_HEIGHT / 2, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={p.steel} roughness={0.52} metalness={0.36} />
      </RoundedBox>
      <instancedMesh
        ref={capMesh}
        args={[capGeometry, undefined, allTools.length]}
        frustumCulled={false}
        onPointerOver={(event) => {
          if (event.instanceId !== undefined) hovered.current = event.instanceId;
        }}
        onPointerOut={(event) => {
          if (event.instanceId === hovered.current) hovered.current = null;
        }}
      >
        <meshStandardMaterial roughness={0.74} />
      </instancedMesh>
      {textures.map((texture, index) => (
        <mesh
          key={allTools[index]}
          ref={(mesh) => {
            legendMeshes.current[index] = mesh;
          }}
          rotation-x={-Math.PI / 2}
        >
          <planeGeometry args={[0.0215, 0.0215]} />
          <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
        </mesh>
      ))}
      {/* The ninth slot is deliberately tactile rather than another labelled key. */}
      <mesh position={[PAD_PITCH, PAD_CASE_HEIGHT + 0.007, -PAD_PITCH]}>
        <cylinderGeometry args={[0.0105, 0.0105, 0.014, 24]} />
        <meshStandardMaterial color={p.steelLight} roughness={0.38} metalness={0.55} />
      </mesh>
      <mesh position={[PAD_PITCH, PAD_CASE_HEIGHT + 0.0144, -PAD_PITCH + 0.0045]}>
        <boxGeometry args={[0.0018, 0.001, 0.007]} />
        <meshStandardMaterial color={p.plasticDark} roughness={0.7} />
      </mesh>
    </group>
  );
}

export function Mouse() {
  const p = usePalette();
  return (
    <group>
      <RoundedBox args={[0.06, 0.004, 0.11]} radius={0.002} smoothness={2} bevelSegments={1} position={[0, 0.002, 0]} receiveShadow>
        <meshStandardMaterial color={p.plasticDark} roughness={0.65} />
      </RoundedBox>
      {/* A true upper hemisphere keeps the shell flat at the base instead of hiding a full ellipsoid below the desk. */}
      <mesh position={[0, 0.004, 0]} scale={[0.031, 0.028, 0.056]} castShadow>
        <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={p.plastic} roughness={0.68} />
      </mesh>
      <mesh position={[0, 0.0322, 0.012]}>
        <boxGeometry args={[0.0011, 0.0007, 0.048]} />
        <meshStandardMaterial color={p.plasticDark} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.0325, -0.007]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.005, 0.005, 0.008, 18]} />
        <meshStandardMaterial color={p.plasticDark} roughness={0.78} />
      </mesh>
    </group>
  );
}
