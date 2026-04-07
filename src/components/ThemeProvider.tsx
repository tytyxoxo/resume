"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const THEMES = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate",
  "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
  "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
  "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
  "night", "coffee", "winter", "dim", "nord", "sunset", "caramellatte",
  "abyss", "silk",
] as const;

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

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme") as Theme | null;
  if (stored && (THEMES as readonly string[]).includes(stored)) return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) document.documentElement.setAttribute("data-theme", theme);
  }, [theme, mounted]);

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
