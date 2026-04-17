"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  required?: boolean;
  name?: string;
}

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDisplay(dateStr: string) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d} ${MONTHS[parseInt(m) - 1]} ${y}`;
}

export function DatePicker({ value, onChange, min, required, name }: DatePickerProps) {
  const today = new Date();
  const minDate = min ? new Date(min) : null;

  const [open, setOpen] = useState(false);
  const [dropPos, setDropPos] = useState({ top: 0, left: 0, openUp: false });
  const [viewYear, setViewYear] = useState(value ? parseInt(value.split("-")[0]) : today.getFullYear());
  const [viewMonth, setViewMonth] = useState(value ? parseInt(value.split("-")[1]) - 1 : today.getMonth());
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        dropRef.current?.contains(e.target as Node)
      ) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropHeight = 320;
    const openUp = spaceBelow < dropHeight && rect.top > dropHeight;
    setDropPos({
      top: openUp ? rect.top - dropHeight - 4 : rect.bottom + 4,
      left: rect.left,
      openUp,
    });
    setOpen(o => !o);
  };

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isDisabled = (day: number) => {
    if (!minDate) return false;
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const m = new Date(minDate);
    m.setHours(0, 0, 0, 0);
    return d < m;
  };

  const isToday = (day: number) =>
    viewYear === today.getFullYear() &&
    viewMonth === today.getMonth() &&
    day === today.getDate();

  const isSelected = (day: number) => {
    if (!value) return false;
    const [y, m, d] = value.split("-").map(Number);
    return y === viewYear && m - 1 === viewMonth && d === day;
  };

  const selectDay = (day: number) => {
    if (isDisabled(day)) return;
    const m = String(viewMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    onChange(`${viewYear}-${m}-${d}`);
    setOpen(false);
  };

  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  const dropdown = open && (
    <div
      ref={dropRef}
      style={{ position: "fixed", top: dropPos.top, left: dropPos.left, zIndex: 9999, width: 256 }}
      className="bg-base-100 border border-base-300 rounded-2xl shadow-xl p-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <button type="button" onClick={prevMonth} className="btn btn-ghost btn-xs btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <span className="text-sm font-semibold text-base-content">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button type="button" onClick={nextMonth} className="btn btn-ghost btn-xs btn-circle">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-xs text-base-content/40 font-medium py-1">{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((day, i) => (
          <div key={i} className="flex justify-center">
            {day ? (
              <button
                type="button"
                onClick={() => selectDay(day)}
                disabled={isDisabled(day)}
                className={`
                  w-8 h-8 rounded-full text-sm font-medium transition-all
                  ${isSelected(day)
                    ? "bg-primary text-primary-content"
                    : isToday(day)
                    ? "border border-primary text-primary hover:bg-primary/10"
                    : isDisabled(day)
                    ? "text-base-content/20 cursor-not-allowed"
                    : "hover:bg-base-200 text-base-content"
                  }
                `}
              >
                {day}
              </button>
            ) : null}
          </div>
        ))}
      </div>

      {/* Today shortcut */}
      {(!minDate || new Date() >= minDate) && (
        <div className="border-t border-base-200 mt-2 pt-2 text-center">
          <button
            type="button"
            onClick={() => {
              const y = today.getFullYear();
              const m = String(today.getMonth() + 1).padStart(2, "0");
              const d = String(today.getDate()).padStart(2, "0");
              onChange(`${y}-${m}-${d}`);
              setOpen(false);
            }}
            className="text-xs text-primary hover:underline"
          >
            Today
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative w-full">
      <input type="hidden" name={name} value={value} required={required} />
      <button
        ref={triggerRef}
        type="button"
        onClick={handleOpen}
        className={`input input-bordered input-sm w-full flex items-center gap-2 text-left cursor-pointer ${!value ? "text-base-content/40" : "text-base-content"}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0 text-base-content/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
        <span className="flex-1 truncate text-sm">
          {value ? formatDisplay(value) : "Select a date"}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-3.5 h-3.5 shrink-0 text-base-content/40 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {typeof window !== "undefined" && createPortal(dropdown, document.body)}
    </div>
  );
}
