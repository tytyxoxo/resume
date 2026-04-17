"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  slots: string[];
  required?: boolean;
  name?: string;
}

export function TimePicker({ value, onChange, slots, required, name }: TimePickerProps) {
  const [open, setOpen] = useState(false);
  const [dropPos, setDropPos] = useState({ top: 0, left: 0, width: 0 });
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
    const dropHeight = slots.length * 40 + 16;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < dropHeight && rect.top > dropHeight;
    setDropPos({
      top: openUp ? rect.top - dropHeight - 4 : rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    });
    setOpen(o => !o);
  };

  const dropdown = open && (
    <div
      ref={dropRef}
      style={{ position: "fixed", top: dropPos.top, left: dropPos.left, width: dropPos.width, zIndex: 9999 }}
      className="bg-base-100 border border-base-300 rounded-2xl shadow-xl p-2 flex flex-col gap-0.5"
    >
      {slots.map((slot) => (
        <button
          key={slot}
          type="button"
          onClick={() => { onChange(slot); setOpen(false); }}
          className={`
            w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-all
            ${value === slot
              ? "bg-primary text-primary-content"
              : "hover:bg-base-200 text-base-content"
            }
          `}
        >
          {slot}
        </button>
      ))}
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
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="flex-1 truncate text-sm">
          {value || "Select a time"}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-3.5 h-3.5 shrink-0 text-base-content/40 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {typeof window !== "undefined" && createPortal(dropdown, document.body)}
    </div>
  );
}
