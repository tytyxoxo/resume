"use client";

import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import type { Mesh, MeshStandardMaterial, SpotLight } from "three";
import { useMode, usePalette, useReducedMotion } from "../palette";

// Architect desk lamp. At night the bulb glows and throws a warm pool of light on the desk.
// The Diorama wraps it in <Interactive> so a click toggles the theme. Local: base at origin, the arm
// reaches toward +x — rotate the placement so +x points at the keyboard.
const LOWER = 0.34;
const UPPER = 0.3;

export function Lamp() {
  const p = usePalette();
  const night = useMode() === "dark";
  const reduced = useReducedMotion();
  const light = useRef<SpotLight>(null);
  const bulb = useRef<Mesh>(null);
  const target = useRef<Mesh>(null);

  useLayoutEffect(() => {
    if (light.current && target.current) light.current.target = target.current;
  }, []);

  useFrame((_, dt) => {
    const on = night ? 1 : 0;
    if (light.current) {
      if (reduced) light.current.intensity = on * 5;
      else easing.damp(light.current, "intensity", on * 5, 0.25, dt);
    }
    const mat = bulb.current?.material as MeshStandardMaterial | undefined;
    if (mat) {
      if (reduced) mat.emissiveIntensity = on * 2.2;
      else easing.damp(mat, "emissiveIntensity", on * 2.2, 0.25, dt);
    }
  });

  const metal = <meshStandardMaterial color={p.steel} roughness={0.42} metalness={0.55} />;
  return (
    <group>
      <mesh position={[0, 0.011, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.075, 0.08, 0.022, 32]} />
        {metal}
      </mesh>
      {/* Arms move in the local XY plane (+x = toward the desk). Lower arm leans back 15°,
          upper arm reaches forward at 60°, the shade opens down-forward. */}
      <group position={[0, 0.022, 0]} rotation-z={0.26}>
        <mesh position={[0, LOWER / 2, 0]} castShadow>
          <cylinderGeometry args={[0.008, 0.008, LOWER, 10]} />
          {metal}
        </mesh>
        <mesh position={[0, LOWER, 0]}>
          <sphereGeometry args={[0.016, 16, 12]} />
          {metal}
        </mesh>
        <group position={[0, LOWER, 0]} rotation-z={-1.309}>
          <mesh position={[0, UPPER / 2, 0]} castShadow>
            <cylinderGeometry args={[0.007, 0.007, UPPER, 10]} />
            {metal}
          </mesh>
          <group position={[0, UPPER, 0]} rotation-z={1.716}>
            <mesh>
              <sphereGeometry args={[0.014, 14, 10]} />
              {metal}
            </mesh>
            <mesh position={[0, -0.05, 0]} castShadow>
              <cylinderGeometry args={[0.025, 0.07, 0.1, 32, 1, true]} />
              <meshStandardMaterial color={p.steel} roughness={0.42} metalness={0.55} side={2} />
            </mesh>
            <mesh ref={bulb} position={[0, -0.075, 0]}>
              <sphereGeometry args={[0.026, 20, 14]} />
              <meshStandardMaterial color={p.bulb} emissive={p.lampLight} emissiveIntensity={0} roughness={0.3} />
            </mesh>
            <spotLight
              ref={light}
              position={[0, -0.08, 0]}
              color={p.lampLight}
              intensity={0}
              angle={0.62}
              penumbra={0.8}
              distance={2.6}
              decay={1.6}
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-bias={-0.0006}
              shadow-radius={5}
            />
            <mesh ref={target} position={[0, -1, 0]} visible={false}>
              <boxGeometry args={[0.01, 0.01, 0.01]} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}
