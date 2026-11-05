"use client";

import { useRef } from "react";
import { projects } from "@/data/resume";
import { useScene } from "@/components/scene/store";

// Vertical project tabs: every name stays visible for scanning, the selected one opens on the 3D monitor.
export function WorkTabs() {
  const active = useScene((s) => s.project);
  const setProject = useScene((s) => s.setProject);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const step = e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault(); // keep the page (and the journey) where it is
    const next = (i + step + projects.length) % projects.length;
    setProject(projects[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Projects" aria-orientation="vertical" className="flex flex-col">
        {projects.map((p, i) => {
          const on = p.id === active;
          return (
            <button
              key={p.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`tab-${p.id}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`panel-${p.id}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setProject(p.id)}
              onMouseEnter={() => setProject(p.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`flex cursor-pointer items-baseline gap-3 rounded-lg px-3 py-1.5 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-primary pointer-coarse:py-3 ${
                on ? "bg-base-200 font-medium text-base-content" : "text-base-content/65 hover:text-base-content"
              }`}
            >
              <span className="flex-1">{p.name}</span>
              <span className="font-mono text-xs tabular-nums text-base-content/65">{p.year}</span>
            </button>
          );
        })}
      </div>
      {projects.map((p) => (
        <div key={p.id} id={`panel-${p.id}`} role="tabpanel" aria-labelledby={`tab-${p.id}`} hidden={p.id !== active} className="mt-4 px-3">
          <p className="font-mono text-xs text-base-content/65">
            {p.kind} · {p.status}
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-base-content/80 text-pretty">{p.desc}</p>
          <p className="mt-2 font-mono text-xs text-base-content/65">{p.stack.join(" · ")}</p>
          {(p.demo || p.source) && (
            <p className="mt-2 flex gap-4 text-sm">
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noopener noreferrer" className="font-medium text-base-content underline-offset-4 hover:underline">
                  Live demo
                </a>
              )}
              {p.source && (
                <a href={p.source} target="_blank" rel="noopener noreferrer" className="font-medium text-base-content underline-offset-4 hover:underline">
                  Source
                </a>
              )}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
