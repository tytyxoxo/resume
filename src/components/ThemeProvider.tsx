"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";

export const THEMES = ["light", "dark"] as const;

export type Theme = (typeof THEMES)[number];

const ThemeContext = createContext<{
  theme: Theme;
  mounted: boolean;
  setTheme: (theme: Theme, origin?: { x: number; y: number }) => void;
}>({
  theme: "light",
  mounted: false,
  setTheme: () => {},
});

const noop = () => () => {};

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored && (THEMES as readonly string[]).includes(stored)) return stored;
  return "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  // false while hydrating (server markup), true afterwards: lets the toggle render the stored theme safely
  const mounted = useSyncExternalStore(noop, () => true, () => false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const setTheme = (newTheme: Theme, origin?: { x: number; y: number }) => {
    localStorage.setItem("theme", newTheme);
    if (!document.startViewTransition) {
      setThemeState(newTheme);
      return;
    }
    if (origin) {
      document.documentElement.style.setProperty("--vt-x", `${origin.x}px`);
      document.documentElement.style.setProperty("--vt-y", `${origin.y}px`);
    }
    // used by CSS to control expand vs collapse direction
    const isDarkTheme = newTheme === "dark";
    document.documentElement.setAttribute("data-theme-transition", isDarkTheme ? "expand" : "collapse");
    const transition = document.startViewTransition(() => {
      setThemeState(newTheme);
    });
    transition.finished.finally(() => {
      document.documentElement.removeAttribute("data-theme-transition");
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
