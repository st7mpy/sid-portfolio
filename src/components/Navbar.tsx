"use client";

import { useEffect, useState } from "react";

export default function Navbar({
  onToggleTheme,
  isDark,
  onOpenPanel,
}: {
  onToggleTheme: () => void;
  isDark: boolean;
  onOpenPanel: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-6 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-background)]/80 backdrop-blur-md shadow-[0_1px_0_var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <button
        onClick={onToggleTheme}
        className="text-sm tracking-wider hover:opacity-60 transition-opacity cursor-pointer"
        aria-label="Toggle dark mode"
      >
        {isDark ? "[ light ]" : "[ dark ]"}
      </button>

      <button
        onClick={onOpenPanel}
        className="text-sm tracking-wider hover:opacity-60 transition-opacity cursor-pointer"
      >
        [ beyond work ]
      </button>
    </nav>
  );
}
