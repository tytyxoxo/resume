"use client";

import { useState } from "react";

export interface AlertItem {
  id: number;
  type: "info" | "success" | "warning" | "error";
  message: string;
}

interface Props {
  alerts: AlertItem[];
  className?: string;
}

const ALERT_CLASS: Record<AlertItem["type"], string> = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
};

export function DismissibleAlerts({ alerts: initial, className = "" }: Props) {
  const [alerts, setAlerts] = useState<AlertItem[]>(initial);
  const dismiss = (id: number) => setAlerts((a) => a.filter((x) => x.id !== id));

  if (alerts.length === 0) {
    return <p className="text-base-content/40 text-sm text-center py-4">No alerts.</p>;
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {alerts.map((a) => (
        <div key={a.id} className={`alert ${ALERT_CLASS[a.type]} flex justify-between items-center`}>
          <span className="text-sm">{a.message}</span>
          <button className="btn btn-ghost btn-xs shrink-0" onClick={() => dismiss(a.id)}>
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
