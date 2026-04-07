"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
  // { label: "SVLN", href: "/svln" },
  // { label: "Playground", href: "/playground" },
];

export function Navbar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const navRef = useRef<HTMLDivElement>(null);

  const applyScrolled = (y: number) => {
    const el = navRef.current;
    if (!el) return;
    if (y > 20) {
      el.style.background = "var(--color-base-100)";
      el.style.borderColor = "var(--color-base-200)";
      el.style.backdropFilter = "blur(12px)";
    } else {
      el.style.background = "transparent";
      el.style.borderColor = "transparent";
      el.style.backdropFilter = "none";
    }
  };

  // Apply correct bg on mount (before first scroll event)
  useEffect(() => {
    applyScrolled(window.scrollY);
    lastY.current = window.scrollY;
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      applyScrolled(y);
      setVisible(y < lastY.current || y < 60);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={navRef}
      className="navbar sticky top-0 z-50 border-b transition-transform duration-300"
      style={{
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        background: "transparent",
        borderColor: "transparent",
        backdropFilter: "none",
      }}
    >
      {/* Mobile hamburger */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            style={{ color: "var(--color-base-content)" }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{ color: "var(--color-base-content)" }}
                  className={`font-medium ${pathname === link.href ? "text-primary" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Theme toggle — desktop only, next to logo */}
        <div className="hidden lg:flex ml-2">
          <ThemeToggle />
        </div>
      </div>

      {/* Desktop menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className={`relative font-medium transition-colors duration-200 ${active ? "text-primary" : "text-base-content/70 hover:text-base-content"}`}
                >
                  {link.label}
                  <span
                    className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-base-content/30 origin-left transition-transform duration-300"
                    style={{ transform: active ? "scaleX(0)" : "scaleX(0)" }}
                  />
                  <span className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-base-content/30 origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
                  <span
                    className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full bg-primary transition-[transform,opacity] duration-300"
                    style={{
                      opacity: active ? 1 : 0,
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                    }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {/* Theme toggle — mobile only */}
        <div className="flex lg:hidden">
          <ThemeToggle />
        </div>
        <a
          href="/cv.pdf"
          download
          className="btn btn-primary btn-sm hidden sm:flex"
        >
          Download CV
        </a>
      </div>
    </div>
  );
}
