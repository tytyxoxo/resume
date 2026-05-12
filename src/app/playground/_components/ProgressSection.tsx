import { UploadProgress } from "@/components/ui";
import { Section } from "./Section";

export function ProgressSection() {
  return (
    <Section title="Progress">
      <div className="w-full max-w-sm">
        <UploadProgress filename="profile-photo.jpg" />
      </div>
    </Section>
  );
}
