"use client";

import { useState } from "react";

interface EducationCardProps {
  degree: string;
  spec: string;
  institution: string;
  period: string;
  details: string;
}

export default function EducationCard({
  degree,
  spec,
  institution,
  period,
  details,
}: EducationCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-baseline py-2 text-left hover:opacity-60 transition-opacity cursor-pointer"
      >
        <div>
          <span className="font-bold">{degree}</span>
          <span className="text-[var(--color-muted)]"> — {spec}</span>
        </div>
        <span className="text-xs text-[var(--color-muted)] mt-1 sm:mt-0 shrink-0 flex items-center gap-2">
          {period}
          <span className="text-[10px]">{isOpen ? "[-]" : "[+]"}</span>
        </span>
      </button>
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <div className="pb-3 pl-4">
          <p className="text-sm text-[var(--color-text-secondary)]">{institution}</p>
          <p className="text-sm text-[var(--color-muted)] mt-1">{details}</p>
        </div>
      </div>
    </div>
  );
}
