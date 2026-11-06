"use client";

import { useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, PerformanceMonitor, PresentationControls } from "@react-three/drei";
import { Box3, NeutralToneMapping, Vector3, type Mesh } from "three";
import { CameraRig } from "./CameraRig";
import { Diorama } from "./Diorama";
import { interactives } from "./Interactive";
import { SceneLighting } from "./SceneLighting";
import { useScene } from "./store";

const coarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
const MAX_DPR = coarse ? 1.5 : 2;

// Dev only: window.__scene.points("lamp") → client {x, y} of each mesh of an object, for Playwright checks.
function DevProbe() {
  const { camera, gl } = useThree();
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const box = new Box3();
    const v = new Vector3();
    (window as unknown as { __scene?: unknown }).__scene = {
      ids: () => [...interactives.keys()],
      render: () => ({ ...gl.info.render, programs: gl.info.programs?.length, textures: gl.info.memory.textures, geometries: gl.info.memory.geometries }),
      // Centres of every visible mesh of the object (a bbox centre can be empty air, e.g. the lamp)
      points: (id: string) => {
        const g = interactives.get(id);
        if (!g) return [];
        const r = gl.domElement.getBoundingClientRect();
        const out: { x: number; y: number }[] = [];
        g.traverse((o) => {
          if (!(o as Mesh).isMesh || !o.visible) return;
          box.setFromObject(o).getCenter(v).project(camera);
          out.push({ x: r.left + ((v.x + 1) / 2) * r.width, y: r.top + ((1 - v.y) / 2) * r.height });
        });
        return out;
      },
    };
  }, [camera, gl]);
  return null;
}

// The whole 3D room. Loaded client-side only (see HomeScene) after the text content is on screen.
export default function Scene({ onReady }: { onReady: () => void }) {
  const overview = useScene((s) => s.section === "hero");
  const [maxDpr, setMaxDpr] = useState(MAX_DPR);
  return (
    <Canvas
      shadows="percentage"
      dpr={[1, maxDpr]}
      gl={{ alpha: true, antialias: true, toneMapping: NeutralToneMapping }}
      camera={{ fov: 30, near: 0.05, far: 60, position: [5.6, 4.3, 5.6] }}
      onCreated={onReady}
    >
      {/* Weak GPUs: render at 1x pixels while the frame rate is low, back up when it recovers; stop flipping after 3 */}
      <PerformanceMonitor onDecline={() => setMaxDpr(1)} onIncline={() => setMaxDpr(MAX_DPR)} flipflops={3} onFallback={() => setMaxDpr(1)} />
      <SceneLighting shadowSize={coarse ? 1024 : 2048} />
      <CameraRig />
      <DevProbe />
      {/* Drag to turn the room a little in the overview; it springs back on release */}
      <PresentationControls
        enabled={overview && !coarse}
        global={false}
        cursor={false}
        snap
        speed={1.2}
        polar={[-0.06, 0.12]}
        azimuth={[-0.5, 0.35]}
      >
        <Diorama />
        <ContactShadows position={[0, -0.15, 0]} scale={6} blur={2.6} far={1.2} opacity={0.35} frames={1} />
      </PresentationControls>
    </Canvas>
  );
}
