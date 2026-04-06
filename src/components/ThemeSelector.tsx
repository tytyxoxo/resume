"use client";

import { THEMES, useTheme } from "./ThemeProvider";

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost gap-1 normal-case"
      >
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
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
        <span className="hidden sm:inline capitalize">{theme}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 opacity-60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content z-50 p-2 shadow-lg bg-base-200 rounded-box w-44 max-h-80 overflow-y-auto flex flex-col gap-0.5"
      >
        {THEMES.map((t) => (
          <li key={t}>
            <button
              onClick={() => setTheme(t)}
              className={`w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-btn text-sm capitalize hover:bg-base-300 transition-colors ${theme === t ? "font-semibold bg-base-300" : ""}`}
              style={{ color: "var(--color-base-content)" }}
            >
              {t}
              <span
                className="flex gap-0.5 shrink-0 bg-transparent"
                data-theme={t}
              >
                {[
                  "--color-primary",
                  "--color-secondary",
                  "--color-accent",
                  "--color-neutral",
                ].map((v) => (
                  <span
                    key={v}
                    className="w-2 h-4 rounded-sm"
                    style={{ background: `var(${v})` }}
                  />
                ))}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
