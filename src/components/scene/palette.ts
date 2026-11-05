"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "@/components/ThemeProvider";

// One palette per theme. Light = Bangkok afternoon, dark = Bangkok night.
// Objects take every colour from here so the room reads as one place.
const light = {
  page: "#ffffff",
  wall: "#eee9e2",
  wallTrim: "#ded6ca",
  floor: "#d8c1a0",
  floorEdge: "#bfa27d",
  slabUnder: "#a98c68",
  rug: "#e3d9cb",
  rugStripe: "#cdbfac",
  wood: "#c99f72",
  woodDark: "#9c7a55",
  steel: "#2e2f35",
  steelLight: "#c7cad0",
  plastic: "#f4f1ec",
  plasticDark: "#3b3d45",
  fabric: "#3b3d45",
  paper: "#fffdf8",
  ink: "#2c2d33",
  inkMuted: "#7a7b82",
  accent: "#4a00ff", // brand primary — chrome-level accent, use sparingly
  accentSoft: "#6236f0", // accent on physical materials (keycaps, pins) — redder than accent so it reads violet once lit
  leaf: "#4f8a5b",
  leafLight: "#6fa772",
  ceramic: "#e7e1d8",
  terracotta: "#c47a5a",
  soil: "#5a4636",
  cork: "#cfa97c",
  pinRed: "#d95b4b",
  books: ["#3e5c76", "#c9a24b", "#b5653e", "#6b8f71", "#34363e", "#d8cfc2"],
  skyTop: "#9cc3ea",
  skyHorizon: "#f5e6d3",
  cityNear: "#8ea1b8",
  cityMid: "#a7b7c9",
  cityFar: "#c2cdda",
  cityWindowLit: "#fff4d6",
  glass: "#dcebf7",
  screenBg: "#ffffff",
  bulb: "#ede6da",
  lampLight: "#ffd9a0",
};

// Night albedos stay close to the day ones (it is the same room); the darkness comes from the lighting
// (SceneLighting + lamp + screen). Sky, city and screen colours are unlit, so they are final colours.
const dark: typeof light = {
  page: "#1d232a",
  wall: "#6a6e7c",
  wallTrim: "#585c69",
  floor: "#8a7564",
  floorEdge: "#67564a",
  slabUnder: "#45372d",
  rug: "#666a77",
  rugStripe: "#757a88",
  wood: "#8a6a50",
  woodDark: "#6a503c",
  steel: "#2a2c33",
  steelLight: "#8d929c",
  plastic: "#cfcbc4",
  plasticDark: "#3a3d45",
  fabric: "#3e414b",
  paper: "#ebe5d8",
  ink: "#24252b",
  inkMuted: "#6b6c73",
  accent: "#7a6bff",
  accentSoft: "#7d63ff",
  leaf: "#4f7d58",
  leafLight: "#62905f",
  ceramic: "#b8b0a5",
  terracotta: "#a8694f",
  soil: "#4a3a2c",
  cork: "#a88a63",
  pinRed: "#c4503f",
  books: ["#3d5874", "#a8893f", "#9a5636", "#5d7d63", "#3a3d45", "#b8b0a5"],
  skyTop: "#0b1026",
  skyHorizon: "#2c2f55",
  cityNear: "#161c33",
  cityMid: "#1f2742",
  cityFar: "#2a3352",
  cityWindowLit: "#ffd58a",
  glass: "#1b2340",
  screenBg: "#16181d",
  bulb: "#ffc57a",
  lampLight: "#ffb86b",
};

export const palettes = { light, dark };
export type Palette = typeof light;
export type Mode = keyof typeof palettes;

// Any daisyUI theme other than "dark" renders the daytime room.
export function useMode(): Mode {
  return useTheme().theme === "dark" ? "dark" : "light";
}

export function usePalette(): Palette {
  return palettes[useMode()];
}

const reducedQuery = "(prefers-reduced-motion: reduce)";
export function useReducedMotion() {
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
