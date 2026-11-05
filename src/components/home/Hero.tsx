"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { profile, sections, type SectionId } from "@/data/resume";
import { useScene } from "@/components/scene/store";

const timeFormat = new Intl.DateTimeFormat("en-GB", { timeZone: profile.timeZone, hour: "2-digit", minute: "2-digit" });

function useBangkokTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const tick = () => setTime(timeFormat.format(new Date()));
    tick();
    const id = setInterval(tick, 15_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

// Which 3D object answers each journey link (hovering a link lifts it in the room)
const objectFor: Partial<Record<SectionId, string>> = {
  work: "monitor",
  experience: "pinboard",
  education: "shelf",
  skills: "keyboard",
  contact: "plane",
};

// The journey's opening caption, centred under the room overview.
export function Hero({ className }: { className: string }) {
  const time = useBangkokTime();
  const setHovered = useScene((s) => s.setHovered);
  return (
    <section id="hero" aria-label="Introduction" className={className}>
      <div className="pointer-events-auto mx-auto max-w-3xl text-center">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-base-content/70">
          <span className="size-2 rounded-full bg-success" aria-hidden="true" />
          {profile.availability}
        </p>
        <h1 className="mt-4 text-[clamp(2.25rem,5.6vw,4.5rem)] font-semibold leading-[1.02] tracking-tight text-base-content text-balance">
          {profile.name}
        </h1>
        <p className="mt-3 text-lg text-base-content/70 sm:text-xl">
          {profile.role} <span className="text-base-content/35">·</span> Bangkok{" "}
          <span className="font-mono text-base tabular-nums text-base-content/65">
            <time suppressHydrationWarning>{time ?? "--:--"}</time>
          </span>
        </p>
        <p className="mx-auto mt-4 max-w-[58ch] text-base leading-relaxed text-base-content/80 text-pretty">{profile.summary}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="#work" className="btn btn-primary">
            Start the tour
          </a>
          <Link href="/resume" className="btn btn-ghost border-base-300">
            Resume
          </Link>
        </div>
        <nav aria-label="Journey stops" className="mt-6 hidden sm:block">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            {sections.slice(1).map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onMouseEnter={() => setHovered(objectFor[s.id] ?? null)}
                  onMouseLeave={() => setHovered(null)}
                  className="text-base-content/70 underline-offset-4 transition-colors hover:text-base-content hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-base-content/65">
            Scroll, press
            <kbd className="kbd kbd-xs">←</kbd>
            <kbd className="kbd kbd-xs">→</kbd>
            or click anything in the room
          </p>
        </nav>
      </div>
    </section>
  );
}
