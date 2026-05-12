"use client";

import { LoadingButton } from "@/components/ui";
import { Section } from "./Section";

export function ButtonSection() {
  return (
    <Section title="Button">
      <div className="flex flex-wrap gap-3 items-center">
        <LoadingButton
          onAction={() => new Promise((r) => setTimeout(r, 1500))}
        />
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-outline btn-primary">Outline</button>
        <button className="btn btn-ghost">Ghost</button>
        <button className="btn btn-error btn-outline">Delete</button>
        <div className="join">
          <button className="join-item btn btn-sm">«</button>
          <button className="join-item btn btn-sm btn-active">1</button>
          <button className="join-item btn btn-sm">2</button>
          <button className="join-item btn btn-sm">3</button>
          <button className="join-item btn btn-sm">»</button>
        </div>
        <div className="indicator">
          <span className="indicator-item badge badge-error badge-sm">3</span>
          <button className="btn btn-outline btn-sm">Notifications</button>
        </div>
      </div>
    </Section>
  );
}
