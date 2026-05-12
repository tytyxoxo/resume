import { ContentTabs } from "@/components/ui";
import { Section } from "./Section";

const TABS = [
  { label: "Overview", content: <p className="text-sm text-base-content/70">Summary statistics and key metrics for this reporting period.</p> },
  { label: "Analytics", content: <p className="text-sm text-base-content/70">Detailed analytics data, charts, and performance breakdowns.</p> },
  { label: "Reports", content: <p className="text-sm text-base-content/70">Generated reports and exported data for the selected period.</p> },
];

export function TabsSection() {
  return (
    <Section title="Tabs">
      <div className="w-full max-w-lg">
        <ContentTabs tabs={TABS} />
      </div>
    </Section>
  );
}
