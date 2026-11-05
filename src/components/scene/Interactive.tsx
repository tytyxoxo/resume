"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html, useCursor } from "@react-three/drei";
import { easing } from "maath";
import type { Group } from "three";
import type { SectionId } from "@/data/resume";
import { goToSection, useScene } from "./store";

type Props = {
  id: string;
  label: string;
  section?: SectionId; // click scrolls here unless onActivate is given
  onActivate?: (e: ThreeEvent<MouseEvent>) => void;
  labelPosition?: [number, number, number];
  lift?: number; // metres the object rises on hover
  children: ReactNode;
};

// Interactive objects by id, so the dev-only probe (Scene.tsx) can find them on screen for E2E tests.
export const interactives = new Map<string, Group>();

// Hover lift + pointer cursor + a quiet label; click navigates to the object's section.
export function Interactive({ id, label, section, onActivate, labelPosition = [0, 0.3, 0], lift = 0.012, children }: Props) {
  const ref = useRef<Group>(null);
  const hovered = useScene((s) => s.hovered === id);
  const setHovered = useScene((s) => s.setHovered);
  useCursor(hovered);

  useEffect(() => {
    const g = ref.current;
    if (!g) return;
    interactives.set(id, g);
    return () => void interactives.delete(id);
  }, [id]);

  useFrame((_, dt) => {
    if (ref.current) easing.damp(ref.current.position, "y", hovered ? lift : 0, 0.12, dt);
  });

  return (
    <group
      ref={ref}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(id);
      }}
      onPointerOut={() => {
        if (useScene.getState().hovered === id) setHovered(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (e.delta > 4) return; // it was a drag, not a click
        if (onActivate) onActivate(e);
        else if (section) goToSection(section);
      }}
    >
      {children}
      {hovered && (
        <Html position={labelPosition} center zIndexRange={[40, 0]} style={{ pointerEvents: "none" }}>
          <span className="whitespace-nowrap rounded-md border border-base-content/10 bg-base-100/95 px-2 py-1 text-xs font-medium text-base-content shadow-sm">
            {label}
          </span>
        </Html>
      )}
    </group>
  );
}
