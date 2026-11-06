"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { sections } from "@/data/resume";
import { useScene, useSystemReducedMotion } from "./scene/store";
import { useTheme } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const pathname  = usePathname();
  const isHome    = pathname === "/";
  const [visible, setVisible] = useState(true);
  const section = useScene((s) => s.section); // set by the journey's scroll handler (HomeScene)
  const motionOff = useScene((s) => s.motionOff);
  const setMotionOff = useScene((s) => s.setMotionOff);
  const systemReduced = useSystemReducedMotion();
  const { mounted } = useTheme(); // the saved choice is only known on the client
  const lastY  = useRef(0);
  const bgRef  = useRef<HTMLDivElement>(null);

  const applyScroll = (y: number) => {
    if (bgRef.current) bgRef.current.style.opacity = y > 20 ? "0.9" : "0.65";
  };

  useEffect(() => {
    applyScroll(window.scrollY);
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      applyScroll(y);
      if (!isHome) setVisible(y < lastY.current || y < 60);
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;
    e.preventDefault();
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  const label = sections.find((s) => s.id === section)?.label ?? "";

  return (
    <header
      className="sticky top-0 z-50 flex justify-center px-4 pt-3 pointer-events-none"
      style={{
        transform:  visible ? "translateY(0)" : "translateY(-110%)",
        transition: "transform 0.3s ease",
      }}
    >
      <div
        className="pointer-events-auto shadow-md"
        style={{ borderRadius: "999px" }}
      >
        <div
          className="relative overflow-hidden border"
          style={{
            borderRadius:    "999px",
            borderColor:     "var(--color-base-200)",
            backdropFilter:  "blur(20px) saturate(1.6)",
          }}
        >
          {/* Frosted background */}
          <div
            ref={bgRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundColor: "var(--color-base-100)",
              opacity:    0.65,
              transition: "opacity 0.4s ease",
            }}
          />

          <div className="relative flex items-center h-10 px-4 gap-2.5">
            {/* Brand */}
            <a
              href={isHome ? "#hero" : "/"}
              onClick={handleBrandClick}
              className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 rounded-full"
              aria-label="Home"
            >
              <span className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-md bg-base-content text-base-100 shrink-0">
                P
              </span>
              <span className="text-sm font-semibold text-base-content tracking-tight">
                Passon
              </span>
            </a>

            {/* Section label — homepage only; phones show it on the card itself */}
            {isHome && (
              <>
                <span className="hidden text-base-content/20 select-none text-sm sm:inline" aria-hidden>·</span>
                <span
                  key={section}
                  className="navbar-label hidden text-sm font-medium text-base-content/70 whitespace-nowrap sm:inline"
                >
                  {label}
                </span>
              </>
            )}

            {/* Divider */}
            <span
              className="w-px h-4 bg-base-content/10 mx-1 shrink-0"
              aria-hidden
            />

            <a
              href="/resume"
              aria-current={pathname === "/resume" ? "page" : undefined}
              className="rounded-full text-sm font-medium text-base-content/70 transition-colors duration-200 hover:text-base-content aria-[current=page]:text-base-content focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
            >
              Resume
            </a>

            {/* WCAG 2.2.2: a way to stop the room's ambient motion (blinking tower lights, swaying plant, clock) */}
            {isHome && mounted && !systemReduced && (
              <button
                type="button"
                aria-pressed={motionOff}
                aria-label="Pause animations"
                onClick={() => setMotionOff(!motionOff)}
                className="flex size-7 cursor-pointer items-center justify-center rounded-full text-base-content/70 transition-colors duration-200 hover:text-base-content aria-pressed:bg-base-content/10 aria-pressed:text-base-content focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {motionOff ? <path d="M7 4.5v15l12-7.5z" /> : <path d="M8 5v14M16 5v14" />}
                </svg>
              </button>
            )}

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
