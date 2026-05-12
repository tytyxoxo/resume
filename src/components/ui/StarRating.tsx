"use client";

import { useState } from "react";

interface Props {
  defaultValue?: number;
  max?: number;
  name?: string;
  onChange?: (value: number) => void;
}

export function StarRating({ defaultValue = 0, max = 5, name = "star-rating", onChange }: Props) {
  const [value, setValue] = useState(defaultValue);

  const handle = (n: number) => {
    setValue(n);
    onChange?.(n);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="rating">
        {Array.from({ length: max }, (_, i) => i + 1).map((n) => (
          <input
            key={n}
            type="radio"
            name={name}
            className="mask mask-star-2 bg-warning"
            checked={value === n}
            onChange={() => handle(n)}
          />
        ))}
      </div>
      <span className="text-base-content/50 text-sm">{value} / {max}</span>
    </div>
  );
}
