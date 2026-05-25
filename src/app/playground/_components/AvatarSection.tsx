import { TeamList } from "@/components/ui";
import { Section } from "./Section";

const MEMBERS = [
  { name: "Alice Chen", role: "Designer", color: "bg-primary", online: true },
  { name: "Bob Smith", role: "Developer", color: "bg-secondary", online: true },
  { name: "Carol Davis", role: "Manager", color: "bg-accent", online: false },
  { name: "Dan Wilson", role: "DevOps", color: "bg-info", online: true },
  { name: "Eve Park", role: "QA", color: "bg-warning", online: false },
];

const SIZES = [
  { cls: "w-16", label: "lg" },
  { cls: "w-12", label: "md" },
  { cls: "w-9", label: "sm" },
  { cls: "w-6", label: "xs" },
];

export function AvatarSection() {
  return (
    <Section title="Avatar">
      <div className="flex flex-col gap-5 w-full">
        <div className="bg-base-200 rounded-2xl p-4">
          <h3 className="text-sm font-semibold mb-3">Team Members</h3>
          <TeamList members={MEMBERS} extras={2} />
        </div>
        <div className="flex items-end gap-4">
          {SIZES.map(({ cls, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className={`avatar placeholder`}>
                <div className={`${cls} rounded-full bg-primary text-primary-content flex items-center justify-center font-bold`}>
                  <span>A</span>
                </div>
              </div>
              <span className="text-xs text-base-content/40">{label}</span>
            </div>
          ))}
          <div className="avatar-group -space-x-4">
            {["bg-primary", "bg-secondary", "bg-accent"].map((c, i) => (
              <div key={i} className="avatar placeholder">
                <div className={`w-9 rounded-full ${c} text-white flex items-center justify-center text-xs font-bold`}>
                  <span>{String.fromCharCode(65 + i)}</span>
                </div>
              </div>
            ))}
            <div className="avatar placeholder">
              <div className="w-9 rounded-full bg-base-300 text-base-content flex items-center justify-center text-xs font-bold">
                <span>+3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
