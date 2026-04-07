"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { AriaAttributes, DOMAttributes } from "react";

interface CallyDateElement extends AriaAttributes, DOMAttributes<HTMLElement> {
  class?: string;
  value?: string;
  min?: string;
  ref?: React.Ref<HTMLElement>;
}

declare module "react" {
  interface IntrinsicElements {
    "calendar-date": CallyDateElement;
    "calendar-month": AriaAttributes & DOMAttributes<HTMLElement>;
  }
}

interface CallyDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  min?: string;
  name?: string;
  required?: boolean;
}

function formatDisplay(dateStr: string) {
  if (!dateStr) return "Pick a date";
  const [y, m, d] = dateStr.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
}

export function CallyDatePicker({ value, onChange, min, name, required }: CallyDatePickerProps) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const closeWithAnimation = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 150);
  };

  useEffect(() => {
    import("cally").then(() => setLoaded(true));
  }, []);

  const callyRef = (el: HTMLElement | null) => {
    if (!el) return;
    const handler = (e: Event) => {
      const target = e.target as HTMLElement & { value: string };
      if (target.value) {
        onChange(target.value);
        closeWithAnimation();
      }
    };
    el.addEventListener("change", handler);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current?.contains(e.target as Node) ||
        dropRef.current?.contains(e.target as Node)
      ) return;
      closeWithAnimation();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleOpen = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const dropHeight = 320;
    setPos({
      top: spaceBelow < dropHeight && rect.top > dropHeight
        ? rect.top - dropHeight - 4
        : rect.bottom + 4,
      left: rect.left,
    });
    setOpen(o => !o);
  };

  const portalTarget =
    typeof window !== "undefined"
      ? (triggerRef.current?.closest("dialog") ?? document.body)
      : null;

  const dropdown = (open || closing) && loaded && (
    <div
      ref={dropRef}
      style={{ position: "fixed", top: pos.top, left: pos.left, zIndex: 9999 }}
      className={`bg-base-100 rounded-box shadow-lg border border-base-300 p-0 transition-all duration-150 ${closing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* @ts-expect-error cally web component */}
      <calendar-date ref={callyRef} class="cally" value={value || undefined} min={min}>
        <svg aria-label="Previous" className="fill-current size-4" slot="previous" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
        <svg aria-label="Next" className="fill-current size-4" slot="next" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
        {/* @ts-expect-error cally web component */}
        <calendar-month />
      {/* @ts-expect-error cally web component */}
      </calendar-date>
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
        <span className={`flex-1 text-sm ${!value ? "text-base-content/40" : "text-base-content"}`}>
          {formatDisplay(value)}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" className={`w-3.5 h-3.5 shrink-0 text-base-content/40 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {portalTarget && createPortal(dropdown, portalTarget)}
    </div>
  );
}
