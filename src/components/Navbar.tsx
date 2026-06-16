"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const sections = [
  { id: "hero",       label: "Home"       },
  { id: "work",       label: "Work"       },
  { id: "experience", label: "Experience" },
  { id: "education",  label: "Education"  },
  { id: "skills",     label: "Skills"     },
  { id: "contact",    label: "Contact"    },
];

export function Navbar() {
  const pathname  = usePathname();
  const isHome    = pathname === "/";
  const [visible, setVisible]             = useState(true);
  const [activeSection, setActiveSection] = useState("hero");
  const lastY  = useRef(0);
  const bgRef  = useRef<HTMLDivElement>(null);

  const applyScroll = (y: number) => {
    if (bgRef.current) bgRef.current.style.opacity = y > 20 ? "0.9" : "0.65";
  };

  useEffect(() => {
    applyScroll(window.scrollY);
    lastY.current = window.scrollY;

    const detectActive = () => {
      const midY = window.scrollY + window.innerHeight * 0.5;
      let current = sections[0].id;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= midY) current = id;
      }
      setActiveSection(current);
    };

    const onScroll = () => {
      const y = window.scrollY;
      applyScroll(y);
      if (!isHome) setVisible(y < lastY.current || y < 60);
      lastY.current = y;
    };

    window.addEventListener("scroll",    onScroll,     { passive: true });
    window.addEventListener("scrollend", detectActive, { passive: true });
    detectActive();

    return () => {
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("scrollend", detectActive);
    };
  }, [isHome]);

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;
    e.preventDefault();
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
  };

  const label = sections.find((s) => s.id === activeSection)?.label ?? "";

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
              <span className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-md bg-base-content text-base-100 transition-transform duration-200 group-hover:scale-110 shrink-0">
                P
              </span>
              <span className="text-sm font-semibold text-base-content tracking-tight">
                Passon
              </span>
            </a>

            {/* Section label — homepage only */}
            {isHome && (
              <>
                <span className="text-base-content/20 select-none text-sm" aria-hidden>·</span>
                <span
                  key={activeSection}
                  className="navbar-label text-sm font-medium text-base-content/50 whitespace-nowrap"
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

            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
