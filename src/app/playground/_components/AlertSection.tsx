"use client";

import { useState } from "react";
import { DismissibleAlerts } from "@/components/ui";
import type { AlertItem } from "@/components/ui";
import { Section } from "./Section";

const INITIAL: AlertItem[] = [
  { id: 1, type: "info", message: "Your profile is 80% complete." },
  { id: 2, type: "success", message: "Changes saved successfully!" },
  { id: 3, type: "warning", message: "Your session will expire in 5 minutes." },
  { id: 4, type: "error", message: "Failed to connect to server." },
];

export function AlertSection() {
  const [key, setKey] = useState(0);

  return (
    <Section title="Alert">
      <div className="flex flex-col gap-3 w-full max-w-lg">
        <DismissibleAlerts key={key} alerts={INITIAL} />
        <button
          className="btn btn-sm btn-outline self-start"
          onClick={() => setKey((k) => k + 1)}
        >
          Reset alerts
        </button>
      </div>
    </Section>
  );
}
