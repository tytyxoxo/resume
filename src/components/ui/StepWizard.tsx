"use client";

import { useState } from "react";

interface Props {
  steps: string[];
  onComplete?: () => void;
}

export function StepWizard({ steps, onComplete }: Props) {
  const [current, setCurrent] = useState(0);
  const isLast = current === steps.length - 1;

  const next = () => {
    if (isLast) onComplete?.();
    else setCurrent((s) => s + 1);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <ul className="steps steps-horizontal w-full">
        {steps.map((s, i) => (
          <li key={s} className={`step ${i <= current ? "step-primary" : ""}`}>{s}</li>
        ))}
      </ul>
      <div className="bg-base-200 rounded-2xl p-5 text-sm text-base-content/70">
        Step {current + 1}: Fill in your{" "}
        <strong className="text-base-content">{steps[current]}</strong> details.
      </div>
      <div className="flex justify-between">
        <button
          className="btn btn-sm btn-outline"
          onClick={() => setCurrent((s) => Math.max(0, s - 1))}
          disabled={current === 0}
        >
          Back
        </button>
        <button
          className="btn btn-sm btn-primary"
          onClick={next}
          disabled={isLast}
        >
          {current === steps.length - 2 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );
}
