import { Toolbar } from "@/components/ui";
import { Section } from "./Section";

const TOOLS = [
  { tip: "Bold (⌘B)", label: "B", className: "font-bold" },
  { tip: "Italic (⌘I)", label: "I", className: "italic" },
  { tip: "Underline (⌘U)", label: "U", className: "underline" },
  { tip: "Insert Link (⌘K)", label: "🔗" },
  { tip: "Code Block (⌘`)", label: "</>", className: "font-mono text-xs" },
];

const POSITIONS = [
  { label: "top",    cls: "tooltip-top"    },
  { label: "bottom", cls: "tooltip-bottom" },
  { label: "left",   cls: "tooltip-left"   },
  { label: "right",  cls: "tooltip-right"  },
] as const;

export function TooltipSection() {
  return (
    <Section title="Tooltip">
      <div className="flex flex-col gap-5 w-full">
        <Toolbar items={TOOLS} tooltipPlacement="bottom" />
        <div className="divider my-0" />
        <div className="flex flex-wrap gap-6 items-center justify-around">
          {POSITIONS.map(({ label, cls }) => (
            <div key={label} className={`tooltip ${cls}`} data-tip={`tooltip-${label}`}>
              <button className="btn btn-sm btn-outline capitalize">{label}</button>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
