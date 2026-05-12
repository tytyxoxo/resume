import { FaqAccordion } from "@/components/ui";
import { Section } from "./Section";

const FAQ = [
  {
    question: "What is your tech stack?",
    answer: "React, Next.js, TypeScript on the frontend — Go or Node.js on the backend with PostgreSQL.",
  },
  {
    question: "Are you available for freelance work?",
    answer: "Yes, I'm open to interesting projects. Feel free to reach out through the contact section.",
  },
  {
    question: "How long have you been coding?",
    answer: "I've been writing code professionally for 4+ years, across web, mobile, and backend systems.",
  },
];

export function AccordionSection() {
  return (
    <Section title="Accordion">
      <div className="w-full max-w-md">
        <FaqAccordion items={FAQ} />
      </div>
    </Section>
  );
}
