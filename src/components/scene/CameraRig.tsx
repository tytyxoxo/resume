"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { CatmullRomCurve3, Vector3, type PerspectiveCamera } from "three";
import { sections } from "@/data/resume";
import { STOPS, type Stop } from "./journey";
import { useReducedMotion } from "./palette";
import { useScene } from "./store";

const SHIFT = 0.17;
// Desktop: cards beside the object → shift sideways. Phones (and the hero): cards at the bottom → lift.
const shiftOf = (s: Stop, wide: boolean) => (!wide || s.card === "bottom" ? 0 : s.card === "right" ? SHIFT : -SHIFT);
const liftOf = (s: Stop, wide: boolean) => (wide && s.card !== "bottom" ? 0 : s.lift);

const ORDER = sections.map((s) => STOPS[s.id]);
const PATH = new CatmullRomCurve3(ORDER.map((s) => new Vector3(...s.pos)), false, "centripetal");
const DESIGN_ASPECT = 1.6;

const goal = new Vector3();
const target = new Vector3();
const nextTarget = new Vector3();
const right = new Vector3();
const UP = new Vector3(0, 1, 0);
const coarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
const smooth = (t: number) => t * t * (3 - 2 * t);

export function CameraRig() {
  const reduced = useReducedMotion();
  const look = useRef(new Vector3(...STOPS.hero.target));
  const lift = useRef(STOPS.hero.lift);
  const shift = useRef(0);
  const placed = useRef(false);

  useFrame((state, dt) => {
    const camera = state.camera as PerspectiveCamera;
    const { width, height } = state.size;
    const last = ORDER.length - 1;
    const p = Math.min(last, Math.max(0, useScene.getState().progress));
    const i = Math.min(last - 1, Math.floor(p));
    // Reduced motion: no travel between stops, the camera cuts to the nearest one
    const t = reduced ? Math.round(p - i) : smooth(p - i);

    PATH.getPoint((i + t) / last, goal);
    target.set(...ORDER[i].target).lerp(nextTarget.set(...ORDER[i + 1].target), t);
    const wide = width >= 1024 && width / height >= 1; // same as the CSS `side` variant
    const wantShift = shiftOf(ORDER[i], wide) + (shiftOf(ORDER[i + 1], wide) - shiftOf(ORDER[i], wide)) * t;
    const wantLift = liftOf(ORDER[i], wide) + (liftOf(ORDER[i + 1], wide) - liftOf(ORDER[i], wide)) * t;

    // Narrow (portrait) screens: back off until the subject fits across
    const span = ORDER[i].span + (ORDER[i + 1].span - ORDER[i].span) * t;
    const k = Math.min(3, Math.max(1, (span * DESIGN_ASPECT) / (width / height) / 0.92));
    goal.sub(target).multiplyScalar(k);
    const dist = goal.length();
    goal.add(target);

    if (!reduced && !coarse) {
      right.subVectors(target, goal).cross(UP).normalize();
      goal.addScaledVector(right, state.pointer.x * dist * 0.025);
      goal.y += state.pointer.y * dist * 0.015;
    }

    if (!placed.current) {
      // One entrance: glide in from further out (skipped under reduced motion)
      camera.position.copy(goal);
      if (!reduced) camera.position.sub(target).multiplyScalar(1.45).add(target).add(UP);
      look.current.copy(target);
      lift.current = wantLift;
      shift.current = wantShift;
      placed.current = true;
    } else if (reduced) {
      camera.position.copy(goal);
      look.current.copy(target);
      lift.current = wantLift;
      shift.current = wantShift;
    } else {
      easing.damp3(camera.position, goal, 0.3, dt);
      easing.damp3(look.current, target, 0.3, dt);
      easing.damp(lift, "current", wantLift, 0.3, dt);
      easing.damp(shift, "current", wantShift, 0.3, dt);
    }
    camera.lookAt(look.current);

    camera.setViewOffset(width, height, width * shift.current, height * lift.current, width, height);
  });

  return null;
}
