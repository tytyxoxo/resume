import { ConfirmModal } from "@/components/ui";
import { Section } from "./Section";

export function ModalSection() {
  return (
    <Section title="Modal">
      <ConfirmModal
        trigger={<button className="btn btn-error btn-outline">Delete Project</button>}
        title="Delete Project"
        description={
          <p>
            Are you sure you want to delete this project? This action{" "}
            <strong>cannot be undone</strong>.
          </p>
        }
        confirmLabel="Delete"
        confirmClassName="btn-error"
      />
    </Section>
  );
}
