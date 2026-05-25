"use client";
import { useEffect, useState } from "react";
import { Section } from "./Section";

const DURATION_MS = 3 * 24 * 60 * 60 * 1000; // 3 days

function calcTime(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  /    60_000),
    seconds: Math.floor((diff % 60_000)      /     1_000),
  };
}

const ZERO = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export function CountdownSection() {
  const [time, setTime] = useState(ZERO);

  useEffect(() => {
    const target = Date.now() + DURATION_MS;
    setTime(calcTime(target));
    const id = setInterval(() => setTime(calcTime(target)), 1000);
    return () => clearInterval(id);
  }, []);

  const { days, hours, minutes, seconds } = time;

  return (
    <Section title="Countdown">
      <div className="flex flex-col items-center gap-6 w-full py-2">
        <div className="flex gap-3">
          {[
            { v: days,    l: "days"  },
            { v: hours,   l: "hours" },
            { v: minutes, l: "min"   },
            { v: seconds, l: "sec"   },
          ].map(({ v, l }) => (
            <div key={l} className="flex flex-col items-center">
              <span className="countdown font-mono text-4xl font-bold text-base-content">
                <span style={{ "--value": v } as React.CSSProperties} />
              </span>
              <span className="text-xs text-base-content/50 mt-1">{l}</span>
            </div>
          ))}
        </div>

        <div className="text-sm text-base-content/50">Until next release 🚀</div>

        <div className="divider my-0 w-full" />
        <div className="flex gap-2 items-center text-sm text-base-content/60">
          <span className="countdown font-mono font-semibold text-base-content">
            <span style={{ "--value": 42 } as React.CSSProperties} />
          </span>
          days left in the sprint
        </div>
      </div>
    </Section>
  );
}
