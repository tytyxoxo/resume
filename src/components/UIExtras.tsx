"use client";

import dynamic from "next/dynamic";

const ScrollProgress = dynamic(() => import("@/components/ScrollProgress").then((m) => ({ default: m.ScrollProgress })), { ssr: false });
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop").then((m) => ({ default: m.ScrollToTop })), { ssr: false });

export function UIExtras() {
  return (
    <>
      <ScrollProgress />
      <ScrollToTop />
    </>
  );
}
