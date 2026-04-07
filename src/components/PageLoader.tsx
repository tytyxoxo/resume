"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useTheme } from "./ThemeProvider";

// Resets on hard navigation (full page load), persists across soft navigation
let softNavLoaded = false;

export function PageLoader() {
  const { mounted } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  const hide = (animate: boolean) => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = animate ? "opacity 0.5s ease, visibility 0.5s ease" : "none";
    el.style.opacity = "0";
    el.style.visibility = "hidden";
  };

  // Hide before paint on soft navigation (component remounts but module-level var persists)
  useLayoutEffect(() => {
    if (softNavLoaded) hide(false);
  }, []);

  useEffect(() => {
    if (softNavLoaded) return;
    if (mounted) {
      softNavLoaded = true;
      hide(true);
    }
  }, [mounted]);

  useEffect(() => {
    // pageshow fires on both back AND forward bfcache restore
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) hide(false);
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  return (
    <div
      id="page-loader"
      ref={ref}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-base-100 pointer-events-none"
      style={{ transition: "opacity 0.5s ease, visibility 0.5s ease" }}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="loading loading-ring loading-lg text-primary" />
        <span className="text-base-content/40 text-sm tracking-widest uppercase">
          Loading
        </span>
      </div>
    </div>
  );
}
