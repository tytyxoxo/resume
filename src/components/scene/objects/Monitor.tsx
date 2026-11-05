"use client";

import { useEffect, useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import { Color } from "three";
import { drawScreen, type MonitorScreen } from "./screens";
import { fontsReady, makeCanvasTexture, redraw } from "../canvasTexture";
import { useMode, usePalette } from "../palette";
import { useScene } from "../store";

// Desktop monitor. Local origin is the bottom-centre of its stand, front facing +z.
export function Monitor() {
  const p = usePalette();
  const mode = useMode();
  const section = useScene((state) => state.section);
  const project = useScene((state) => state.project);
  const screenKey = section === "work" ? project : "home";
  const texture = useMemo(() => makeCanvasTexture(2048, 1152, () => {}), []);
  const displayTint = useMemo(() => new Color(p.screenBg).setScalar(mode === "light" ? 0.92 : 1), [mode, p.screenBg]);

  useEffect(() => {
    let active = true;
    const screen: MonitorScreen = screenKey === "home" ? { kind: "home" } : { kind: "project", id: screenKey };
    const paint = () => redraw(texture, (ctx) => drawScreen(ctx, 2048, 1152, screen, mode));
    paint();
    fontsReady().then(() => {
      if (active) paint();
    });
    return () => {
      active = false;
    };
  }, [mode, screenKey, texture]);

  useEffect(() => () => texture.dispose(), [texture]);

  return (
    <group>
      {/* The screen bottom sits at 0.235 m; its wide dark bezel carries the silhouette. */}
      <RoundedBox args={[0.64, 0.375, 0.022]} radius={0.008} smoothness={4} position={[0, 0.4225, 0]} castShadow>
        <meshStandardMaterial color={p.steel} roughness={0.48} metalness={0.18} />
      </RoundedBox>
      <mesh position={[0, 0.4225, 0.0115]}>
        <planeGeometry args={[0.616, 0.347]} />
        <meshBasicMaterial map={texture} color={displayTint} toneMapped={false} />
      </mesh>
      <RoundedBox args={[0.5, 0.27, 0.018]} radius={0.01} smoothness={3} position={[0, 0.4225, -0.019]}>
        <meshStandardMaterial color={p.steel} roughness={0.52} metalness={0.25} />
      </RoundedBox>

      {/* A shallow metal base and slightly rear-leaning neck keep the panel visually light. */}
      <RoundedBox args={[0.22, 0.008, 0.16]} radius={0.004} smoothness={3} position={[0, 0.004, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={p.steelLight} roughness={0.35} metalness={0.6} />
      </RoundedBox>
      <RoundedBox args={[0.04, 0.25, 0.012]} radius={0.004} smoothness={3} position={[0, 0.127, -0.006]} rotation-x={-0.055}>
        <meshStandardMaterial color={p.steelLight} roughness={0.35} metalness={0.6} />
      </RoundedBox>
      {mode === "dark" && <pointLight position={[0, 0.42, 0.15]} color="#cfd8ff" intensity={0.6} distance={1.2} decay={2} />}
    </group>
  );
}
