"use client";

import { useState } from "react";
import { Section } from "./Section";

export function SkeletonSection() {
  const [show, setShow] = useState(true);

  return (
    <Section title="Skeleton">
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          className="btn btn-xs btn-outline self-start"
          onClick={() => setShow((s) => !s)}
        >
          {show ? "Show content" : "Show skeleton"}
        </button>
        {show ? (
          <div className="flex items-center gap-3">
            <div className="skeleton w-12 h-12 rounded-full shrink-0" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="skeleton h-3 w-full" />
              <div className="skeleton h-3 w-2/3" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold text-lg">
                A
              </div>
            </div>
            <div>
              <p className="font-medium text-sm">Alice Chen</p>
              <p className="text-xs text-base-content/50">UI Designer · Online</p>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
}
