"use client";

import { useState } from "react";

const interests = [
  {
    title: "Reading",
    icon: "//",
    content:
      "Drawn to existentialism and war history — the questions that don't have clean answers. Currently reading Thus Spoke Zarathustra and Our Mathematical Universe.",
  },
  {
    title: "Football",
    icon: "//",
    content: "FC Barcelona, nothing else.",
  },
  {
    title: "Aviation",
    icon: "//",
    content:
      "The aircraft is an engineering marvel. Have been hooked since I was 8.",
  },
  {
    title: "Betting & Markets",
    icon: "//",
    content:
      "I love risk, quantifying risk, and then taking the said risk.",
  },
];

export default function SidePanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-6 right-6 z-40 text-sm tracking-wider hover:opacity-60 transition-opacity cursor-pointer"
      >
        [ beyond work ]
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 backdrop-blur-[2px]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#fafafa] border-l border-[#e5e5e5] z-50 side-panel ${
          isOpen ? "open" : ""
        } overflow-y-auto`}
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold tracking-wider">
              beyond the resume_
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-sm hover:opacity-60 transition-opacity cursor-pointer"
            >
              [ close ]
            </button>
          </div>

          <p className="text-sm text-[#666] mb-8 leading-relaxed">
            Work is one dimension. Here&apos;s the rest of the operating
            system.
          </p>

          <div className="space-y-0">
            {interests.map((interest, i) => (
              <div key={i} className="border-t border-[#e5e5e5]">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === i ? null : i)
                  }
                  className="w-full py-4 flex justify-between items-center text-left hover:opacity-60 transition-opacity cursor-pointer"
                >
                  <span className="text-sm font-bold tracking-wider">
                    {interest.icon} {interest.title}
                  </span>
                  <span className="text-xs">
                    {openAccordion === i ? "[-]" : "[+]"}
                  </span>
                </button>
                <div
                  className={`accordion-content ${
                    openAccordion === i ? "open" : ""
                  }`}
                >
                  <p className="text-sm text-[#666] pb-4 leading-relaxed">
                    {interest.content}
                  </p>
                </div>
              </div>
            ))}
            <div className="border-t border-[#e5e5e5]" />
          </div>

          <div className="mt-12 text-xs text-[#999] italic leading-relaxed">
            <p>
              &quot;karmanye vadhikaraste ma phaleshu kadachana&quot;
            </p>
            <p className="mt-1">
              You have the right to work only, but never to its fruits.
            </p>
            <p className="mt-2 not-italic text-[#bbb]">
              — Bhagavad Gita, Chapter 2, Verse 47
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
