import { create } from "zustand";
import type { ProjectId, SectionId } from "@/data/resume";

// Shared between the DOM sections and the 3D scene.
type SceneState = {
  section: SectionId; // stop the journey is at (nearest), drives object reactions
  progress: number; // continuous journey position, 0 = hero … 5 = contact; read in useFrame, never subscribed
  project: ProjectId; // project shown on the 3D monitor
  hovered: string | null; // id of the hovered 3D object
  sentCount: number; // bumps on every successful contact send, launches the paper plane
  setSection: (section: SectionId) => void;
  setProgress: (progress: number) => void;
  setProject: (project: ProjectId) => void;
  setHovered: (hovered: string | null) => void;
  markSent: () => void;
};

export const useScene = create<SceneState>()((set) => ({
  section: "hero",
  progress: 0,
  project: "component-library",
  hovered: null,
  sentCount: 0,
  setSection: (section) => set({ section }),
  setProgress: (progress) => set({ progress }),
  setProject: (project) => set({ project }),
  setHovered: (hovered) => set({ hovered }),
  markSent: () => set((s) => ({ sentCount: s.sentCount + 1 })),
}));

export function goToSection(id: SectionId) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
