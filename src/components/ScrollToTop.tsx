"use client";

import { useEffect, useRef } from "react";

export function ScrollToTop() {
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = btnRef.current;
      if (!el) return;
      const show = window.scrollY > 400;
      el.style.opacity = show ? "1" : "0";
      el.style.pointerEvents = show ? "auto" : "none";
      el.style.transform = show ? "translateY(0) scale(1)" : "translateY(16px) scale(0.8)";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-primary text-primary-content shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-xl cursor-pointer"
      style={{
        opacity: 0,
        pointerEvents: "none",
        transform: "translateY(16px) scale(0.8)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
