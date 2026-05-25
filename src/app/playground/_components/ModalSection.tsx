import { ConfirmModal } from "@/components/ui";
import { Section } from "./Section";

export function ModalSection() {
  return (
    <Section title="Modal">
      <div className="flex flex-wrap gap-3 w-full">
        <ConfirmModal
          trigger={<button className="btn btn-error btn-outline">Delete Project</button>}
          title="Delete Project"
          description={
            <p>Are you sure you want to delete this project? This action <strong>cannot be undone</strong>.</p>
          }
          confirmLabel="Delete"
          confirmClassName="btn-error"
        />
        <ConfirmModal
          trigger={<button className="btn btn-warning btn-outline">Archive</button>}
          title="Archive Project"
          description={
            <p>This project will be moved to the archive. You can restore it later from settings.</p>
          }
          confirmLabel="Archive"
          confirmClassName="btn-warning"
        />
        <ConfirmModal
          trigger={<button className="btn btn-primary btn-outline">Publish</button>}
          title="Publish Changes"
          description={
            <p>Your changes will be live immediately. Make sure everything looks good before publishing.</p>
          }
          confirmLabel="Publish"
          confirmClassName="btn-primary"
        />
      </div>
    </Section>
  );
}
