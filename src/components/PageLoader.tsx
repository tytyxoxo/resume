"use client";

import { useTheme } from "./ThemeProvider";

export function PageLoader() {
  const { mounted } = useTheme();

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-base-100 pointer-events-none"
      style={{
        transition: "opacity 0.5s ease, visibility 0.5s ease",
        opacity: mounted ? 0 : 1,
        visibility: mounted ? "hidden" : "visible",
      }}
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
