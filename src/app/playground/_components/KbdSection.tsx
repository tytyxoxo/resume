import { ShortcutList } from "@/components/ui";
import { Section } from "./Section";

const SHORTCUTS = [
  { keys: ["⌘", "K"], label: "Open command palette" },
  { keys: ["⌘", "S"], label: "Save file" },
  { keys: ["⌘", "Z"], label: "Undo" },
  { keys: ["⌘", "⇧", "P"], label: "Run command" },
  { keys: ["⌘", "⇧", "F"], label: "Search everywhere" },
];

export function KbdSection() {
  return (
    <Section title="Kbd">
      <div className="w-full max-w-xs">
        <ShortcutList shortcuts={SHORTCUTS} />
      </div>
    </Section>
  );
}
