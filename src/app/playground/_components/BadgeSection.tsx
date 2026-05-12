import { Section } from "./Section";

const SKILLS = ["React", "TypeScript", "Next.js", "TailwindCSS", "Go"];

export function BadgeSection() {
  return (
    <Section title="Badge">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="indicator">
          <span className="indicator-item badge badge-primary">12</span>
          <button className="btn btn-outline btn-sm">Inbox</button>
        </div>
        <div className="flex gap-1 flex-wrap">
          {SKILLS.map((tag) => (
            <span key={tag} className="badge badge-outline">{tag}</span>
          ))}
        </div>
        <div className="flex gap-1 flex-wrap">
          <span className="badge badge-success">Active</span>
          <span className="badge badge-warning">Pending</span>
          <span className="badge badge-error">Blocked</span>
          <span className="badge badge-ghost">Draft</span>
        </div>
      </div>
    </Section>
  );
}
