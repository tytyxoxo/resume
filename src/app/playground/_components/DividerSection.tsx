import { Section } from "./Section";

export function DividerSection() {
  return (
    <Section title="Divider">
      <div className="w-full max-w-xs flex flex-col">
        <div className="divider text-xs text-base-content/40">TODAY</div>
        <div className="divider divider-primary text-xs">Section A</div>
        <div className="divider divider-neutral text-xs">Section B</div>
      </div>
      <div className="flex h-16 gap-2 items-center">
        <span className="text-sm text-base-content/60">Continue with email</span>
        <div className="divider divider-horizontal text-xs text-base-content/30">OR</div>
        <button className="btn btn-outline btn-sm">Google</button>
      </div>
    </Section>
  );
}
