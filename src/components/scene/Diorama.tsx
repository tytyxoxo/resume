"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { Interactive } from "./Interactive";
import { useMode } from "./palette";
import { Chair, Desk, DESK, Mug, ResumeSheet } from "./objects/Desk";
import { Keyboard, Macropad, Mouse } from "./objects/Keyboard";
import { Lamp } from "./objects/Lamp";
import { Monitor } from "./objects/Monitor";
import { Postcard, SchoolFrame, SeedlingPot } from "./objects/Notes";
import { PaperPlane } from "./objects/PaperPlane";
import { Pinboard } from "./objects/Pinboard";
import { Plant } from "./objects/Plant";
import { Room, WallClock } from "./objects/Room";
import { Diploma, Shelf } from "./objects/Shelf";

const TOP = DESK.top;
const LEFT_WALL = Math.PI / 2; // turns an object's front (+z) to face into the room from the left wall

// Places every object in the room (anchors: docs/scene-brief.md) and wires its interaction.
export function Diorama() {
  const router = useRouter();
  const { setTheme } = useTheme();
  const night = useMode() === "dark";

  return (
    <group>
      <Room />
      <group position={[-0.95, 1.85, -1.6]}>
        <WallClock />
      </group>

      <group position={[0.3, 0, -1.18]}>
        <Desk />
      </group>
      <group position={[0.3, 0, -0.42]} rotation-y={Math.PI}>
        <Chair />
      </group>

      <group position={[-0.3, TOP, -1.36]} rotation-y={-0.57}>
        <Interactive
          id="lamp"
          label={night ? "Lamp · switch to day" : "Lamp · switch to night"}
          labelPosition={[0.1, 0.62, 0]}
          onActivate={(e) => setTheme(night ? "light" : "dark", { x: e.nativeEvent.clientX, y: e.nativeEvent.clientY })}
        >
          <Lamp />
        </Interactive>
      </group>

      <group position={[-0.06, TOP, -1.2]}>
        <Mug />
      </group>

      <group position={[-0.24, TOP, -0.98]} rotation-y={0.18}>
        <Interactive id="resume" label="Resume · open" labelPosition={[0, 0.12, 0]} onActivate={() => router.push("/resume")}>
          <ResumeSheet />
        </Interactive>
      </group>

      {/* On the window sill, right of the monitor: the plane ready to fly out, a postcard with the details */}
      <group position={[0.66, 1.063, -1.53]}>
        <Interactive id="plane" label="Contact" section="contact" labelPosition={[0, 0.12, 0]}>
          <PaperPlane />
        </Interactive>
      </group>
      <group position={[0.8, 1.063, -1.585]} rotation-y={-0.1}>
        <Postcard />
      </group>

      <group position={[0.3, TOP, -1.36]}>
        <Interactive id="monitor" label="Work · 5 projects" section="work" labelPosition={[0, 0.66, 0]}>
          <Monitor />
        </Interactive>
      </group>

      <Interactive id="keyboard" label="Skills · toolchain" section="skills" labelPosition={[0.44, TOP + 0.12, -1.0]} lift={0.006}>
        <group position={[0.26, TOP, -1.0]}>
          <Keyboard />
        </group>
        {/* Stylised larger toolchain pad so its legends read from the skills stop */}
        <group position={[0.66, TOP, -1.0]} scale={1.3}>
          <Macropad />
        </group>
        <group position={[0.86, TOP, -0.96]}>
          <Mouse />
        </group>
      </Interactive>

      {/* Currently learning: three labelled seedlings behind the macropad, they sprout at the Skills stop */}
      <group position={[0.52, TOP, -1.2]} rotation-y={0.25}>
        <SeedlingPot />
      </group>

      <group position={[1.28, 0, -1.25]}>
        <Interactive id="plant" label="Currently learning" section="skills" labelPosition={[0, 1.4, 0]} lift={0}>
          <Plant />
        </Interactive>
      </group>

      <group position={[-1.6, 1.5, -0.6]} rotation-y={LEFT_WALL}>
        <Interactive id="pinboard" label="Experience" section="experience" labelPosition={[0, 0.5, 0.1]} lift={0}>
          <Pinboard />
        </Interactive>
      </group>

      <Interactive id="shelf" label="Education" section="education" labelPosition={[-1.4, 1.9, 0.65]} lift={0}>
        <group position={[-1.6, 0, 0.65]} rotation-y={LEFT_WALL}>
          <Shelf />
        </group>
        <group position={[-1.6, 1.45, 0.65]} rotation-y={LEFT_WALL}>
          <Diploma />
        </group>
        <group position={[-1.42, 0.82, 0.6]} rotation-y={LEFT_WALL - 0.4}>
          <SchoolFrame />
        </group>
      </Interactive>
    </group>
  );
}
