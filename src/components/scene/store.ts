import { useSyncExternalStore } from "react";
import { create } from "zustand";
import { projects, type ProjectId, type SectionId } from "@/data/resume";

// Shared between the DOM sections and the 3D scene.
type SceneState = {
  section: SectionId; // stop the journey is at (nearest), drives object reactions
  progress: number; // continuous journey position, 0 = hero … 5 = contact; read in useFrame, never subscribed
  project: ProjectId; // selected project (Work tabs), shown on the 3D monitor
  preview: ProjectId | null; // hovered project tab: shown on the monitor without changing the selection
  hovered: string | null; // id of the hovered 3D object
  sentCount: number; // bumps on every successful contact send, launches the paper plane
  motionOff: boolean; // the visitor paused animations (navbar button): same effect as prefers-reduced-motion
  setSection: (section: SectionId) => void;
  setProgress: (progress: number) => void;
  setProject: (project: ProjectId) => void;
  setPreview: (preview: ProjectId | null) => void;
  setHovered: (hovered: string | null) => void;
  markSent: () => void;
  setMotionOff: (off: boolean) => void;
};

export const useScene = create<SceneState>()((set) => ({
  section: "hero",
  progress: 0,
  project: projects[0].id, // the first tab starts selected
  preview: null,
  hovered: null,
  sentCount: 0,
  // the inline script in the layout sets data-motion before first paint from the saved choice
  motionOff: typeof document !== "undefined" && document.documentElement.dataset.motion === "reduce",
  setSection: (section) => set({ section }),
  setProgress: (progress) => set({ progress }),
  setProject: (project) => set({ project, preview: null }),
  setPreview: (preview) => set({ preview }),
  setHovered: (hovered) => set({ hovered }),
  markSent: () => set((s) => ({ sentCount: s.sentCount + 1 })),
  setMotionOff: (motionOff) => {
    try {
      localStorage.setItem("motion", motionOff ? "reduce" : "full");
    } catch {}
    if (motionOff) document.documentElement.dataset.motion = "reduce";
    else delete document.documentElement.dataset.motion;
    set({ motionOff });
  },
}));

const reducedQuery = "(prefers-reduced-motion: reduce)";

// The operating system's reduced-motion setting, live.
export function useSystemReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(reducedQuery);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );
}

export function goToSection(id: SectionId) {
  const reduce = window.matchMedia(reducedQuery).matches || useScene.getState().motionOff;
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
