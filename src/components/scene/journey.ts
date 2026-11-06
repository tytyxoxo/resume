import type { SectionId } from "@/data/resume";

// Journey stops (plain data: shared by the server-rendered page and the client camera rig).
type V3 = [number, number, number];

// One stop per section, in journey order. The content card floats beside the object on desktop
// (`card` side) and docks at the bottom on phones; the view offset slides the picture away from it:
// `lift` = vertical share of the height (phones/hero); `span` = share of the width the subject fills on a
// 1440×900 screen — narrower screens back the camera off until it fits across.
export type Stop = { pos: V3; target: V3; card: "left" | "right" | "bottom"; lift: number; span: number };
export const STOPS: Record<SectionId, Stop> = {
  hero: { pos: [10.7, 7.5, 10.8], target: [-0.1, 0.95, -0.35], card: "bottom", lift: 0.25, span: 0.38 },
  work: { pos: [0.5, 1.22, 0.02], target: [0.3, 1.12, -1.36], card: "right", lift: 0.24, span: 0.6 },
  experience: { pos: [0.75, 1.6, -0.25], target: [-1.6, 1.5, -0.6], card: "left", lift: 0.24, span: 0.6 },
  education: { pos: [0.35, 1.35, 1.75], target: [-1.6, 1.12, 0.6], card: "right", lift: 0.24, span: 0.6 },
  skills: { pos: [0.84, 1.28, -0.28], target: [0.56, 0.77, -1.0], card: "left", lift: 0.26, span: 0.6 },
  contact: { pos: [1.42, 1.53, -0.44], target: [0.8, 1.3, -1.58], card: "right", lift: 0.3, span: 0.6 },
};
