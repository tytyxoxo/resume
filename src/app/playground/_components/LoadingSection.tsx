import { Section } from "./Section";

const TYPES = [
  { name: "spinner",  cls: "loading-spinner"  },
  { name: "dots",     cls: "loading-dots"     },
  { name: "ring",     cls: "loading-ring"     },
  { name: "ball",     cls: "loading-ball"     },
  { name: "bars",     cls: "loading-bars"     },
  { name: "infinity", cls: "loading-infinity" },
] as const;

export function LoadingSection() {
  return (
    <Section title="Loading">
      <div className="flex flex-wrap gap-5 items-center">
        {TYPES.map(({ name, cls }) => (
          <div key={name} className="flex flex-col items-center gap-1">
            <span className={`loading ${cls} loading-md text-primary`} />
            <span className="text-xs text-base-content/40">{name}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
