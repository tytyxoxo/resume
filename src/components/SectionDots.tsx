"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const sections = [
  { id: "hero", label: "Home" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export function SectionDots() {
  const pathname = usePathname();
  const [active, setActive] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") return;

    const detect = () => {
      const midY = window.scrollY + window.innerHeight * 0.5;
      let current = sections[0].id;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= midY) current = id;
      }
      setActive(current);
    };

    window.addEventListener("scrollend", detect, { passive: true });
    window.addEventListener("scroll", detect, { passive: true });
    detect();

    return () => {
      window.removeEventListener("scrollend", detect);
      window.removeEventListener("scroll", detect);
    };
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3.5">
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
          onMouseEnter={() => setHovered(id)}
          onMouseLeave={() => setHovered(null)}
          className="relative flex items-center justify-end gap-3 cursor-default"
          aria-label={`Go to ${label}`}
        >
          {/* Label tooltip */}
          <span
            style={{
              opacity: hovered === id ? 1 : 0,
              transform: hovered === id ? "translateX(0)" : "translateX(4px)",
              transition: "opacity 0.2s ease, transform 0.2s ease",
              pointerEvents: "none",
            }}
            className="text-xs font-medium px-2 py-0.5 rounded-md bg-base-content text-base-100 whitespace-nowrap"
          >
            {label}
          </span>

          {/* Dot */}
          <span
            style={{
              transition: "width 0.25s ease, height 0.25s ease, opacity 0.25s ease",
            }}
            className={`block rounded-full shrink-0 ${
              active === id
                ? "w-2.5 h-2.5 bg-primary"
                : "w-1.5 h-1.5 bg-base-content/25 hover:bg-base-content/50"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
