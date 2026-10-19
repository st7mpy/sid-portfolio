"use client";

import { useState } from "react";

// Ledger row: title ······ meta [+], optional └─ sub line, expands to children.
// The whole row toggles on click, except links inside the title; the [+] is the
// real button so keyboard users get a focusable control.
export default function Collapsible({
  title,
  sub,
  meta,
  defaultOpen = false,
  children,
}: {
  title: React.ReactNode;
  sub?: React.ReactNode;
  meta?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-3">
      <div
        onClick={(e) => {
          if (!(e.target as HTMLElement).closest("a, button")) setIsOpen(!isOpen);
        }}
        className="py-1.5 cursor-pointer group"
      >
        <div className="flex items-baseline gap-2">
          <span className="font-bold min-w-0 group-hover:opacity-60 transition-opacity">{title}</span>
          <span className="flex-1 min-w-4 border-b border-dotted border-[var(--color-muted)] opacity-40 -translate-y-1" />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            className="flex items-baseline gap-2 shrink-0 cursor-pointer hover:opacity-60 transition-opacity"
          >
            {meta && <span className="text-xs text-[var(--color-muted)]">{meta}</span>}
            <span className="text-[10px] text-[var(--color-accent)]">{isOpen ? "[-]" : "[+]"}</span>
          </button>
        </div>
        {sub && (
          <div className="text-sm text-[var(--color-muted)] mt-0.5 group-hover:opacity-60 transition-opacity">
            <span className="opacity-50">└─ </span>
            {sub}
          </div>
        )}
      </div>
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>{children}</div>
    </div>
  );
}
