"use client";

import { useReveal } from "@/hooks/useReveal";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** "up" (default): fade + slide up. "fade": opacity only — use for headings already in position. */
  variant?: "up" | "fade";
}

export function Reveal({ children, className = "", delay = 0, variant = "up" }: RevealProps) {
  const ref = useReveal();
  const variantClass = variant === "fade" ? "reveal--fade" : "";

  return (
    <div
      ref={ref}
      className={`reveal ${variantClass} ${className}`.trim()}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
