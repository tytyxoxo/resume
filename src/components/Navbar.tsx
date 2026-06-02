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
      indicator.style.transform = `translateX(${elRect.left - navRect.left}px) scaleX(${elRect.width / navRect.width})`;
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
      <header
        className="sticky top-0 z-50 px-4 pt-3 pointer-events-none"
        style={{
          transform: visible ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.3s ease",
        }}
      >
        {/* Shadow wrapper — separated from overflow-hidden so shadow never clips */}
        <div
          className="max-w-3xl mx-auto shadow-md"
          style={{ borderRadius: "1rem" }}
        >
          <div
            className="relative overflow-hidden border pointer-events-auto"
            style={{
              borderRadius: "1rem",
              borderColor: "var(--color-base-200)",
              backdropFilter: "blur(16px) saturate(1.5)",
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

            <div className="relative flex items-center h-12 gap-4 px-4">
              {/* Brand */}
              <Link
                href="/"
                className="flex items-center gap-2 rounded-lg shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-1"
              >
                <span className="flex items-center justify-center text-xs font-bold transition-transform duration-200 rounded-lg w-7 h-7 bg-base-content text-base-100 group-hover:scale-110">
                  P
                </span>
                <span className="hidden text-sm font-semibold text-base-content sm:block">
                  Passon
                </span>
              </Link>

              {/* Desktop nav — centered */}
              <nav className="justify-center flex-1 hidden lg:flex">
                {/* Sliding indicator */}
                <div className="relative flex items-center">
                  <div
                    ref={indicatorRef}
                    className="absolute top-0 bottom-0 rounded-full pointer-events-none bg-base-content/6"
                    style={{
                      opacity: 0,
                      width: "100%",
                      transformOrigin: "left center",
                      transform: "translateX(0) scaleX(0)",
                      transition:
                        "transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease",
                    }}
                  />
                  <ul ref={navRef} className="relative flex items-center gap-1">
                    {navLinks.map((link) => {
                      const active = pathname === link.href;
                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            data-active={active}
                            className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-1
                            ${
                              active
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
                {/* Download CV — uncomment when cv.pdf is added to /public
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
              */}

                {/* Hamburger (mobile) */}
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="flex items-center justify-center transition-colors rounded-lg cursor-default lg:hidden min-w-11 min-h-11 text-base-content/60 hover:text-base-content hover:bg-base-content/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-1"
                  aria-label="Open menu"
                  aria-expanded={drawerOpen}
                  aria-controls="mobile-drawer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      <div
        className="fixed inset-0 transition-all duration-300 z-60 lg:hidden"
        style={{
          pointerEvents: drawerOpen ? "auto" : "none",
          visibility: drawerOpen ? "visible" : "hidden",
        }}
      >
        <div
          className="absolute inset-0 transition-opacity duration-300 bg-black/40"
          style={{ opacity: drawerOpen ? 1 : 0 }}
          onClick={() => setDrawerOpen(false)}
        />
        <div
          id="mobile-drawer"
          className="absolute top-0 right-0 flex flex-col w-64 h-full transition-transform duration-300 shadow-2xl"
          style={{
            transform: drawerOpen ? "translateX(0)" : "translateX(100%)",
            background: "var(--color-base-100)",
          }}
        >
          <div
            className="flex items-center justify-between px-5 py-4 border-b"
            style={{ borderColor: "var(--color-base-200)" }}
          >
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 text-xs font-bold rounded-md bg-base-content text-base-100">
                P
              </span>
              <span className="text-sm font-semibold">Passon</span>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="flex items-center justify-center transition-colors rounded-lg cursor-default min-w-11 min-h-11 text-base-content/40 hover:text-base-content hover:bg-base-content/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-1"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
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
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-inset
                    ${
                      active
                        ? "text-base-content bg-base-content/10"
                        : "text-base-content/50 hover:text-base-content hover:bg-base-content/5"
                    }`}
                >
                  {link.label}
                  {active && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-base-content/50" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Download CV — uncomment when cv.pdf is added to /public
          <div className="px-4 pb-6">
            <a href="/cv.pdf" download className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold bg-primary text-primary-content hover:opacity-90 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </a>
          </div>
          */}
        </div>
      </div>
    </>
  );
}
