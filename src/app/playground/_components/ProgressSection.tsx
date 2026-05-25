import { UploadProgress } from "@/components/ui";
import { Section } from "./Section";

export function ProgressSection() {
  return (
    <Section title="Progress">
      <div className="flex flex-col gap-5 w-full">
        <UploadProgress filename="profile-photo.jpg" />
        <UploadProgress filename="resume-2025.pdf" />
        <UploadProgress filename="portfolio-assets.zip" />
      </div>
    </Section>
  );
}
