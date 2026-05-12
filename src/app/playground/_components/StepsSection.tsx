import { StepWizard } from "@/components/ui";
import { Section } from "./Section";

export function StepsSection() {
  return (
    <Section title="Steps">
      <div className="w-full max-w-md">
        <StepWizard steps={["Account", "Profile", "Settings", "Done"]} />
      </div>
    </Section>
  );
}
