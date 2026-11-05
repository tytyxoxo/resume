import type { ReactNode } from "react";
import { sections, type SectionId } from "@/data/resume";

const pad = (n: number) => String(n).padStart(2, "0");

// A journey stop's content: a solid card over the 3D room, beside the object on wide screens,
// docked at the bottom on phones.
// Footer links walk the journey without JavaScript (anchors + smooth scroll + snap).
export function JourneyCard({ id, title, hint, children }: { id: SectionId; title: string; hint?: string; children: ReactNode }) {
  const i = sections.findIndex((s) => s.id === id);
  const prev = sections[i - 1];
  const next = sections[i + 1];
  return (
    <div className="pointer-events-auto mx-auto w-full max-w-2xl rounded-2xl border border-base-content/10 bg-base-100 p-5 shadow-[0_12px_40px_-16px_rgba(0,0,0,0.25)] sm:p-6 side:mx-0 side:w-[440px]">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id={`${id}-heading`} className="text-xl font-semibold tracking-tight text-base-content sm:text-2xl">
          {title}
        </h2>
        <p className="shrink-0 font-mono text-xs tabular-nums text-base-content/65">
          {pad(i + 1)} / {pad(sections.length)}
        </p>
      </div>
      {hint && <p className="mt-1 text-sm text-base-content/65">{hint}</p>}
      <div className="mt-5">{children}</div>
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-base-content/10 pt-3 text-sm">
        {prev ? (
          <a href={`#${prev.id}`} className="py-1 text-base-content/70 transition-colors hover:text-base-content pointer-coarse:py-3">
            ← {prev.label}
          </a>
        ) : (
          <span />
        )}
        {next && (
          <a href={`#${next.id}`} className="py-1 font-medium text-base-content transition-colors hover:text-primary pointer-coarse:py-3">
            Next: {next.label} →
          </a>
        )}
      </div>
    </div>
  );
}
