import { StatCard } from "@/components/ui";
import { Section } from "./Section";

export function StatsSection() {
  return (
    <Section title="Stats">
      <div className="stats stats-horizontal shadow w-full max-w-2xl flex-wrap">
        <StatCard
          title="Projects"
          value="24"
          desc="↗︎ 6 this year"
          valueClassName="text-primary"
          figure={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-8 h-8 stroke-current text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />
        <StatCard
          title="Technologies"
          value="15+"
          desc="React, Go, and more"
          valueClassName="text-secondary"
          figure={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-8 h-8 stroke-current text-secondary">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          }
        />
        <StatCard
          title="Experience"
          value="4y"
          desc="Professional"
          valueClassName="text-accent"
          figure={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-8 h-8 stroke-current text-accent">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>
    </Section>
  );
}
