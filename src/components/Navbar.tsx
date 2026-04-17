"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const lastY = useRef(0);
  const bgRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const applyScroll = (y: number) => {
    if (bgRef.current) bgRef.current.style.opacity = y > 20 ? "0.85" : "0.6";
  };

  // Scroll: hide/show + bg opacity + progress
  useEffect(() => {
    applyScroll(window.scrollY);
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      applyScroll(y);
      setVisible(y < lastY.current || y < 60);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sliding active indicator
  useEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;

    const activeEl = nav.querySelector<HTMLElement>("[data-active='true']");
    if (activeEl) {
      const navRect = nav.getBoundingClientRect();
      const elRect = activeEl.getBoundingClientRect();
      indicator.style.opacity = "1";
      indicator.style.width = `${elRect.width}px`;
      indicator.style.transform = `translateX(${elRect.left - navRect.left}px)`;
    } else {
      indicator.style.opacity = "0";
    }
  }, [pathname]);

  // Close drawer on route change
  useEffect(() => {
    const id = setTimeout(() => setDrawerOpen(false), 0);
    return () => clearTimeout(id);
  }, [pathname]);

  return (
    <>
      {/* Top gradient fade */}
      <div
        className="fixed top-0 inset-x-0 z-40 pointer-events-none"
        style={{
          height: "5rem",
          background: "linear-gradient(to bottom, var(--color-base-100) 0%, transparent 100%)",
        }}
      />

      <header
        className="sticky top-0 z-50 px-4 pt-3 pointer-events-none"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.3s ease",
        }}
      >
        <div
          className="max-w-3xl mx-auto border pointer-events-auto relative overflow-hidden"
          style={{
            borderRadius: "1rem",
            borderColor: "var(--color-base-200)",
            backdropFilter: "blur(16px) saturate(1.5)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          }}
        >
          {/* Background overlay */}
          <div
            ref={bgRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundColor: "var(--color-base-100)",
              opacity: 0.6,
              transition: "opacity 0.4s ease",
            }}
          />


          <div className="relative px-4 h-12 flex items-center gap-4">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold bg-base-content text-base-100 transition-transform duration-200 group-hover:scale-110">
                P
              </span>
              <span className="font-semibold text-sm text-base-content hidden sm:block">
                Passon
              </span>
            </Link>

            {/* Desktop nav — centered */}
            <nav className="hidden lg:flex flex-1 justify-center">
              {/* Sliding indicator */}
              <div className="relative flex items-center">
                <div
                  ref={indicatorRef}
                  className="absolute top-0 bottom-0 rounded-full bg-base-content/10 pointer-events-none"
                  style={{
                    opacity: 0,
                    width: 0,
                    transform: "translateX(0)",
                    transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease",
                  }}
                />
                <ul ref={navRef} className="flex items-center gap-1 relative">
                  {navLinks.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          data-active={active}
                          className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200
                            ${active
                              ? "text-base-content"
                              : "text-base-content/50 hover:text-base-content"
                            }`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 ml-auto">
              <ThemeToggle />
              <a
                href="/cv.pdf"
                download
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary text-primary-content hover:opacity-90 transition-opacity duration-200 shadow-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                CV
              </a>

              {/* Hamburger (mobile) */}
              <button
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden p-1.5 rounded-lg text-base-content/60 hover:text-base-content hover:bg-base-content/5 transition-colors cursor-default"
                aria-label="Open menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      <div
        className="fixed inset-0 z-[60] lg:hidden transition-all duration-300"
        style={{
          pointerEvents: drawerOpen ? "auto" : "none",
          visibility: drawerOpen ? "visible" : "hidden",
        }}
      >
        <div
          className="absolute inset-0 bg-black/40 transition-opacity duration-300"
          style={{ opacity: drawerOpen ? 1 : 0 }}
          onClick={() => setDrawerOpen(false)}
        />
        <div
          className="absolute top-0 right-0 h-full w-64 shadow-2xl flex flex-col transition-transform duration-300"
          style={{
            transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
            background: "var(--color-base-100)",
          }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--color-base-200)" }}>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold bg-base-content text-base-100">P</span>
              <span className="font-semibold text-sm">Passon</span>
            </div>
            <button onClick={() => setDrawerOpen(false)} className="p-1.5 rounded-lg text-base-content/40 hover:text-base-content hover:bg-base-content/5 transition-colors cursor-default">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                    ${active
                      ? "text-base-content bg-base-content/10"
                      : "text-base-content/50 hover:text-base-content hover:bg-base-content/5"
                    }`}
                >
                  {link.label}
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-base-content/50" />}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 pb-6">
            <a href="/cv.pdf" download className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-content hover:opacity-90 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
