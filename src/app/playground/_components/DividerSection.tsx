import { Section } from "./Section";

export function DividerSection() {
  return (
    <Section title="Divider">
      <div className="flex flex-col w-full">
        <div className="text-xs divider text-base-content/40">TODAY</div>
        <div className="text-xs divider divider-primary">Section A</div>
        <div className="text-xs divider divider-neutral">Section B</div>
      </div>
      <div className="flex items-center justify-center w-full h-16 gap-2">
        <span className="text-sm text-base-content/60 whitespace-nowrap">
          Continue with email
        </span>
        <div className="text-xs divider divider-horizontal text-base-content/30">
          OR
        </div>
        <button className="btn btn-outline btn-sm whitespace-nowrap w-[125px]">
          Google
        </button>
      </div>
    </Section>
  );
}
