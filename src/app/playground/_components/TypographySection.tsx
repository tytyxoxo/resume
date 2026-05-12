import { Section } from "./Section";

const SIZES = [
  "text-5xl", "text-4xl", "text-3xl", "text-2xl",
  "text-xl", "text-lg", "text-base", "text-sm", "text-xs",
] as const;

export function TypographySection() {
  return (
    <Section title="Typography">
      <div className="flex flex-col gap-1 w-full max-w-lg">
        {SIZES.map((size) => (
          <p key={size} className={`${size} font-semibold text-base-content`}>
            {size} — The quick brown fox
          </p>
        ))}
      </div>
    </Section>
  );
}
