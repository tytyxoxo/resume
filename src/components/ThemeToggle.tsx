"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();
  const isDark = theme === "dark";

  if (!mounted) return <div className="w-11 sm:w-14 h-[1.375rem] sm:h-7" />;

  return (
    <button
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setTheme(isDark ? "light" : "dark", {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }}
      aria-label="Toggle dark mode"
      className="relative rounded-full transition-colors duration-500 focus:outline-none w-11 h-[1.375rem] sm:w-14 sm:h-7 cursor-default"
      style={
        {
          viewTransitionName: "theme-toggle",
          background: isDark ? "oklch(30% 0.05 260)" : "oklch(90% 0 0)",
        } as React.CSSProperties
      }
    >
      <span
        className="theme-thumb absolute left-[0.125rem] top-[0.125rem] sm:top-0.5 rounded-full shadow-md flex items-center justify-center w-[1.125rem] h-[1.125rem] sm:w-6 sm:h-6"
        style={{
          transform: isDark
            ? "translateX(var(--thumb-travel))"
            : "translateX(0)",
          background: isDark ? "oklch(20% 0.03 260)" : "oklch(100% 0 0)",
          transition:
            "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s ease",
        }}
      >
        {/* Sun */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute transition-[transform,opacity] duration-500 h-3 w-3 sm:h-3.5 sm:w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark
              ? "rotate(90deg) scale(0)"
              : "rotate(0deg) scale(1)",
            color: "oklch(65% 0.18 85)",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>

        {/* Moon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="absolute transition-[transform,opacity] duration-500 h-3 w-3 sm:h-3.5 sm:w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          style={{
            opacity: isDark ? 1 : 0,
            transform: isDark
              ? "rotate(0deg) scale(1)"
              : "rotate(-90deg) scale(0)",
            color: "oklch(85% 0.08 260)",
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
          />
        </svg>
      </span>
    </button>
  );
}
