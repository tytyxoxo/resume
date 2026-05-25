"use client";

import { useState } from "react";
import { Section } from "./Section";

const ITEMS = [
  { name: "Alice Chen", role: "UI Designer · Online", color: "bg-primary" },
  { name: "Bob Smith", role: "Developer · Away", color: "bg-secondary" },
  { name: "Carol Davis", role: "Manager · Offline", color: "bg-accent" },
];

export function SkeletonSection() {
  const [show, setShow] = useState(true);

  return (
    <Section title="Skeleton">
      <div className="flex flex-col gap-3 w-full">
        <button
          className="btn btn-xs btn-outline self-start"
          onClick={() => setShow((s) => !s)}
        >
          {show ? "Show content" : "Show skeleton"}
        </button>
        <div className="flex flex-col gap-3">
          {ITEMS.map((item) =>
            show ? (
              <div key={item.name} className="flex items-center gap-3">
                <div className="skeleton w-12 h-12 rounded-full shrink-0" />
                <div className="flex flex-col gap-2 flex-1">
                  <div className="skeleton h-3 w-full" />
                  <div className="skeleton h-3 w-2/3" />
                </div>
              </div>
            ) : (
              <div key={item.name} className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center text-white font-bold shrink-0`}>
                  {item.name[0]}
                </div>
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-base-content/50">{item.role}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Section>
  );
}
