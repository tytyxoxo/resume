"use client";

import { useState } from "react";

export interface TabItem {
  label: string;
  content: React.ReactNode;
}

interface Props {
  tabs: TabItem[];
  defaultIndex?: number;
}

export function ContentTabs({ tabs, defaultIndex = 0 }: Props) {
  const [active, setActive] = useState(defaultIndex);

  return (
    <div className="w-full">
      <div className="tabs tabs-boxed">
        {tabs.map((t, i) => (
          <a
            key={i}
            className={`tab cursor-pointer ${active === i ? "tab-active" : ""}`}
            onClick={() => setActive(i)}
          >
            {t.label}
          </a>
        ))}
      </div>
      <div className="bg-base-200 rounded-b-2xl rounded-tr-2xl p-5">
        {tabs[active].content}
      </div>
    </div>
  );
}
