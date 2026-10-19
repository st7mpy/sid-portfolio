"use client";

import { useState } from "react";

// Ledger row: title ······ meta [+], optional └─ sub line, expands to children.
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full py-1.5 text-left hover:opacity-60 transition-opacity cursor-pointer"
      >
        <div className="flex items-baseline gap-2">
          <span className="font-bold min-w-0">{title}</span>
          <span className="flex-1 min-w-4 border-b border-dotted border-[var(--color-muted)] opacity-40 -translate-y-1" />
          {meta && <span className="text-xs text-[var(--color-muted)] shrink-0">{meta}</span>}
          <span className="text-[10px] text-[var(--color-accent)] shrink-0">{isOpen ? "[-]" : "[+]"}</span>
        </div>
        {sub && (
          <div className="text-sm text-[var(--color-muted)] mt-0.5">
            <span className="opacity-50">└─ </span>
            {sub}
          </div>
        )}
      </button>
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>{children}</div>
    </div>
  );
}
