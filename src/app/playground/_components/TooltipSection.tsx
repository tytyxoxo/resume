import { Toolbar } from "@/components/ui";
import { Section } from "./Section";

const TOOLS = [
  { tip: "Bold (⌘B)", label: "B", className: "font-bold" },
  { tip: "Italic (⌘I)", label: "I", className: "italic" },
  { tip: "Underline (⌘U)", label: "U", className: "underline" },
  { tip: "Insert Link (⌘K)", label: "🔗" },
  { tip: "Code Block (⌘`)", label: "</>", className: "font-mono text-xs" },
];

export function TooltipSection() {
  return (
    <Section title="Tooltip">
      <Toolbar items={TOOLS} tooltipPlacement="bottom" />
    </Section>
  );
}
