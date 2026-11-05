"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const ScrollProgress = dynamic(
  () =>
    import("@/components/ScrollProgress").then((m) => ({
      default: m.ScrollProgress,
    })),
  { ssr: false },
);
const ScrollToTop = dynamic(
  () =>
    import("@/components/ScrollToTop").then((m) => ({
      default: m.ScrollToTop,
    })),
  { ssr: false },
);

export function UIExtras() {
  // The home page has its own section navigation (keys 1–6 and the 3D room)
  const isHome = usePathname() === "/";
  return (
    <>
      <ScrollProgress />
      {!isHome && <ScrollToTop />}
    </>
  );
}
