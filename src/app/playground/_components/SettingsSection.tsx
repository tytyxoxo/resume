import { SettingsPanel } from "@/components/ui";
import { Section } from "./Section";

export function SettingsSection() {
  return (
    <Section title="Settings Panel">
      <div className="w-full">
        <SettingsPanel />
      </div>
    </Section>
  );
}
