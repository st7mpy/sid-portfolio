"use client";

// Theme lives on <html data-theme>, set before paint by the script in layout.tsx.
// The button label is picked by CSS, so nothing re-renders on switch.
function toggleTheme() {
  const el = document.documentElement;
  const next = el.dataset.theme === "cobalt" ? "dark" : "cobalt";
  const apply = () => {
    el.dataset.theme = next;
    el.classList.toggle("dark", next === "dark");
  };
  try { localStorage.setItem("theme", next); } catch {}
  if ("startViewTransition" in document && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.startViewTransition(apply);
  } else {
    apply();
  }
}

const btn = "px-2 py-1 text-sm tracking-wider hover:opacity-60 transition-opacity cursor-pointer bg-[var(--color-background)]/70 backdrop-blur-sm";

export default function Navbar() {
  return (
    <nav className="fixed top-3 right-3 z-40 flex gap-2">
      <button onClick={toggleTheme} className={btn} aria-label="Toggle theme">
        <span className="theme-label-to-cobalt">[ cobalt ]</span>
        <span className="theme-label-to-dark">[ dark ]</span>
      </button>
      <button
        onClick={() => document.getElementById("beyond-work")?.scrollIntoView({ behavior: "smooth" })}
        className={btn}
      >
        [ beyond work ]
      </button>
    </nav>
  );
}
