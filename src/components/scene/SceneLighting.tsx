"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { AgXToneMapping, NeutralToneMapping } from "three";
import { useMode } from "./palette";

// Shared by the home scene and the /lab previews so objects are judged under the same light.
// Day: warm sun from the front-left plus a soft studio environment. Night: dim moonlight;
// the lamp, monitor and city windows carry the room (they add their own lights/emissive).
export function SceneLighting({ shadowSize = 2048 }: { shadowSize?: number }) {
  const day = useMode() === "light";
  const get = useThree((s) => s.get);
  // Neutral keeps the day palette true; at night its dark-offset over-saturates (grey walls turn navy),
  // so night uses AgX, which handles low values gracefully.
  useEffect(() => {
    const { gl } = get();
    gl.toneMapping = day ? NeutralToneMapping : AgXToneMapping;
    gl.toneMappingExposure = day ? 1 : 1.35;
  }, [get, day]);
  return (
    <>
      <hemisphereLight args={[day ? "#e3edf9" : "#b7bccb", day ? "#e6d8c2" : "#5e5047", day ? 0.9 : 0.95]} />
      <directionalLight
        castShadow
        position={[3.5, 6, 4.5]}
        intensity={day ? 2.4 : 0.9}
        color={day ? "#fff1dc" : "#dfe5ff"}
        shadow-mapSize={[shadowSize, shadowSize]}
        shadow-bias={-0.0003}
        shadow-normalBias={0.02}
        shadow-radius={6}
      >
        <orthographicCamera attach="shadow-camera" args={[-3, 3, 3, -3, 0.5, 20]} />
      </directionalLight>
      <Environment key={day ? "day" : "night"} resolution={128} frames={1}>
        <Lightformer form="rect" intensity={day ? 1.6 : 0.5} color="#ffffff" position={[0, 4, 4]} scale={[8, 3, 1]} />
        <Lightformer
          form="rect"
          intensity={day ? 0.8 : 0.3}
          color={day ? "#ffe9cf" : "#dfe3ee"}
          position={[-5, 2, 0]}
          rotation-y={Math.PI / 2}
          scale={[6, 3, 1]}
        />
        <Lightformer form="ring" intensity={day ? 0.6 : 0.3} color={day ? "#dcecff" : "#c9cfe0"} position={[4, 3, -4]} scale={2} />
      </Environment>
    </>
  );
}
