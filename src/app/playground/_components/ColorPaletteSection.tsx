import { Section } from "./Section";

const COLORS = [
  { name: "primary",   bg: "bg-primary",   text: "text-primary-content"   },
  { name: "secondary", bg: "bg-secondary", text: "text-secondary-content" },
  { name: "accent",    bg: "bg-accent",    text: "text-accent-content"    },
  { name: "neutral",   bg: "bg-neutral",   text: "text-neutral-content"   },
  { name: "base-100",  bg: "bg-base-100",  text: "text-base-content"      },
  { name: "base-200",  bg: "bg-base-200",  text: "text-base-content"      },
  { name: "base-300",  bg: "bg-base-300",  text: "text-base-content"      },
  { name: "info",      bg: "bg-info",      text: "text-info-content"      },
  { name: "success",   bg: "bg-success",   text: "text-success-content"   },
  { name: "warning",   bg: "bg-warning",   text: "text-warning-content"   },
  { name: "error",     bg: "bg-error",     text: "text-error-content"     },
] as const;

export function ColorPaletteSection() {
  return (
    <Section title="Color Palette">
      <div className="grid grid-cols-4 gap-2 w-full sm:grid-cols-6">
        {COLORS.map(({ name, bg, text }) => (
          <div
            key={name}
            className={`${bg} ${text} rounded-xl flex items-end p-2 h-16 border border-base-content/10`}
          >
            <span className="text-[10px] font-medium leading-tight break-all">{name}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}
