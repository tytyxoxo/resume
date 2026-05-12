export interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items: FaqItem[];
  name?: string;
}

export function FaqAccordion({ items, name = "faq" }: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {items.map((item, i) => (
        <div key={i} className="collapse collapse-arrow bg-base-200">
          <input type="radio" name={name} defaultChecked={i === 0} />
          <div className="collapse-title font-medium text-sm">{item.question}</div>
          <div className="collapse-content text-sm text-base-content/70">
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
