import { TeamList } from "@/components/ui";
import { Section } from "./Section";

const MEMBERS = [
  { name: "Alice Chen", role: "Designer", color: "bg-primary", online: true },
  { name: "Bob Smith", role: "Developer", color: "bg-secondary", online: true },
  { name: "Carol Davis", role: "Manager", color: "bg-accent", online: false },
];

export function AvatarSection() {
  return (
    <Section title="Avatar">
      <div className="w-full max-w-xs bg-base-200 rounded-2xl p-4">
        <h3 className="text-sm font-semibold mb-3">Team Members</h3>
        <TeamList members={MEMBERS} extras={3} />
      </div>
    </Section>
  );
}
