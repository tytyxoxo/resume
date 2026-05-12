"use client";

import { useState } from "react";

interface Props {
  label: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  className?: string;
  onChange?: (value: number) => void;
}

export function RangeSlider({
  label,
  defaultValue = 50,
  min = 0,
  max = 100,
  className = "range-primary",
  onChange,
}: Props) {
  const [value, setValue] = useState(defaultValue);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = Number(e.target.value);
    setValue(n);
    onChange?.(n);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-sm">
        <span>{label}</span>
        <span className="text-base-content/50 tabular-nums">{value}%</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handle}
        className={`range range-sm ${className}`}
      />
    </div>
  );
}
