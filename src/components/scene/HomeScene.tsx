"use client";

import { Component, useEffect, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { sections } from "@/data/resume";
import { goToSection, useScene } from "./store";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

// Keys belong to the page only when nothing else wants them (forms, tab lists, modals)
const ownsKeys = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName) || !!t.closest('[role="tablist"], dialog'));

// Journey position from the page scroll: stop i+1 is reached while section i+1 travels from the
// bottom of the viewport to the top, so long sections (mobile) hold the camera while you read.
function journeyProgress() {
  const vh = window.innerHeight;
  let p = 0;
  for (let i = 1; i < sections.length; i++) {
    const el = document.getElementById(sections[i].id);
    if (!el) break;
    const top = el.getBoundingClientRect().top;
    p += Math.min(1, Math.max(0, (vh - top) / vh));
  }
  return p;
}

// If anything inside the 3D scene throws, drop the scene and keep the page (all content is DOM)
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("3D scene disabled after an error:", error);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

// Full-screen fixed canvas behind the journey + the glue between page scroll and the scene.
// Arrow keys step through the stops; a crash inside the 3D scene only removes the scene.
export function HomeScene() {
  const [supported, setSupported] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Feature detection has to wait for the browser; the text content never depends on it
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(webglAvailable());
  }, []);

  useEffect(() => {
    const { setProgress, setSection } = useScene.getState();
    let frame = 0;
    const update = () => {
      frame = 0;
      const p = journeyProgress();
      setProgress(p);
      setSection(sections[Math.min(sections.length - 1, Math.round(p))].id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    // Arrow keys only: single-character shortcuts would need an off switch (WCAG 2.1.4)
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.isComposing || ownsKeys(e.target)) return;
      const here = sections.findIndex((s) => s.id === useScene.getState().section);
      if (e.key === "ArrowRight" && here < sections.length - 1) goToSection(sections[here + 1].id);
      else if (e.key === "ArrowLeft" && here > 0) goToSection(sections[here - 1].id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0">
      {supported && (
        <div className={`h-full w-full transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <SceneBoundary>
            <Scene onReady={() => setReady(true)} />
          </SceneBoundary>
        </div>
      )}
    </div>
  );
}
