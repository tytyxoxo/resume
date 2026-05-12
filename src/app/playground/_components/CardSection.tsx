import { ProfileCard } from "@/components/ui";
import { Section } from "./Section";

const CARDS = [
  { name: "Alice Chen", role: "UI Designer", color: "bg-primary", skills: ["Figma", "CSS", "Motion"] },
  { name: "Bob Smith", role: "Full Stack Dev", color: "bg-secondary", skills: ["React", "Go", "Postgres"] },
  { name: "Carol Davis", role: "Product Manager", color: "bg-accent", skills: ["Roadmap", "OKR", "Agile"] },
];

export function CardSection() {
  return (
    <Section title="Card">
      <div className="flex flex-wrap gap-4">
        {CARDS.map((card) => (
          <ProfileCard key={card.name} {...card} />
        ))}
      </div>
    </Section>
  );
}
