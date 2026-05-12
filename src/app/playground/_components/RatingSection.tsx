import { StarRating, RangeSlider } from "@/components/ui";
import { Section } from "./Section";

export function RatingSection() {
  return (
    <Section title="Rating / Range">
      <div className="flex flex-col gap-5 w-full max-w-sm bg-base-200 rounded-2xl p-5">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">Rate this product</span>
          <StarRating defaultValue={4} name="product-rating" />
        </div>
        <div className="divider my-0" />
        <RangeSlider label="Volume" defaultValue={70} className="range-primary" />
        <RangeSlider label="Brightness" defaultValue={40} className="range-secondary" />
      </div>
    </Section>
  );
}
