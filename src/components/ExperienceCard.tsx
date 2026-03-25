"use client";

import { useState } from "react";

interface ExperienceCardProps {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export default function ExperienceCard({
  role,
  company,
  period,
  bullets,
}: ExperienceCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2 group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-baseline py-2 text-left hover:opacity-60 transition-opacity cursor-pointer"
      >
        <div>
          <span className="font-bold">{role}</span>
          <span className="text-[var(--color-muted)]">, {company}</span>
        </div>
        <span className="text-xs text-[var(--color-muted)] mt-1 sm:mt-0 shrink-0 flex items-center gap-2">
          {period}
          <span className="text-[10px]">{isOpen ? "[-]" : "[+]"}</span>
        </span>
      </button>
      <div
        className={`accordion-content ${isOpen ? "open" : ""}`}
      >
        <ul className="space-y-1.5 pb-3">
          {bullets.map((bullet, i) => (
            <li key={i} className="text-sm text-[var(--color-text-secondary)] leading-relaxed pl-4">
              <span className="text-[var(--color-muted)] mr-2">-</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
