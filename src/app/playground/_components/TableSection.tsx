import { SelectableTable } from "@/components/ui";
import { Section } from "./Section";

const DATA = [
  { name: "Alice Chen", role: "Designer", status: "success", label: "Active" },
  { name: "Bob Smith", role: "Developer", status: "warning", label: "Away" },
  { name: "Carol Davis", role: "Manager", status: "error", label: "Offline" },
  { name: "Dan Wilson", role: "DevOps", status: "success", label: "Active" },
];

export function TableSection() {
  return (
    <Section title="Table">
      <div className="w-full max-w-2xl">
        <SelectableTable data={DATA} />
      </div>
    </Section>
  );
}
