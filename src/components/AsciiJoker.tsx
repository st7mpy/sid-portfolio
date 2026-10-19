"use client";

import { useEffect, useRef } from "react";

// Card is W x H inside its border. Art is original.
const W = 27;
const H = 32;

const JOKER = [
  "o         o         o",
  " \\       / \\       /",
  "  \\     /   \\     /",
  "   \\   /     \\   /",
  "    \\_/_______\\_/",
  "    |  _______  |",
  "    | /       \\ |",
  "    ||  ^   ^  ||",
  "    ||  o   o  ||",
  "    ||    >    ||",
  "    || \\_____/ ||",
  "    | \\_______/ |",
  " ._/\\/\\/\\/\\/\\/\\/\\_.",
  " \\/\\/\\/\\/\\/\\/\\/\\/\\/",
  "    |  <>   <>  |",
  "    |    <>     |",
  "    |  <>   <>  |",
  "    |___________|",
];

function face(front: boolean): string[] {
  const g = Array.from({ length: H }, () => Array(W).fill(" "));
  if (front) {
    "JOKER".split("").forEach((c, i) => {
      g[1 + i][1] = c;
      g[H - 2 - i][W - 2] = c;
    });
    const bw = Math.max(...JOKER.map((l) => l.length));
    const ox = Math.floor((W - bw) / 2);
    const oy = Math.floor((H - JOKER.length) / 2);
    JOKER.forEach((l, y) => l.split("").forEach((c, x) => (g[oy + y][ox + x] = c)));
  } else {
    for (let y = 1; y < H - 1; y++)
      for (let x = 1; x < W - 1; x++) {
        const a = (x + y) % 4 === 0, b = (x - y + 400) % 4 === 0;
        g[y][x] = a && b ? "x" : a ? "/" : b ? "\\" : " ";
      }
  }
  const rows = g.map((r) => "|" + r.join("") + "|");
  return ["." + "-".repeat(W) + ".", ...rows, "'" + "-".repeat(W) + "'"];
}

// Spinning poker chip: striped rim, rings, center pip.
function chip(dx: number, dy: number, t: number, spin: number): string | null {
  const d = dx * dx + dy * dy;
  if (d > 1) return null;
  if (d > 0.62) return Math.floor((Math.atan2(dy, dx) + t * spin) / (Math.PI / 6) + 120) % 2 ? "#" : "=";
  if (d > 0.45) return "-";
  if (d > 0.08) return ".";
  return "o";
}

const CHIPS = [
  { cx: 6, cy: H + 7, rx: 6.5, ry: 2.6, spin: 0.6 },
  { cx: W - 4, cy: H + 9, rx: 6.5, ry: 2.6, spin: -0.45 },
  { cx: W - 4, cy: H + 7, rx: 6.5, ry: 2.6, spin: -0.45 },
];
const COLS = W + 6;
const ROWS = H + 13;
const GLITCH = ".:*#%";
const HOLD = 5, FLIP = 2.4;

export default function AsciiJoker() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const faces = [face(true), face(false)];
    // Threshold per cell: mostly a left-to-right sweep, partly random, so it dissolves cell by cell.
    const thr = Array.from({ length: H + 2 }, () =>
      Array.from({ length: W + 2 }, (_, x) => 0.55 * (x / (W + 1)) + 0.45 * Math.random())
    );

    const font = `9px ${getComputedStyle(document.body).fontFamily}`;
    ctx.font = font;
    const cw = ctx.measureText("M").width, ch = 10;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = COLS * cw * dpr;
    canvas.height = ROWS * ch * dpr;
    canvas.style.width = `${COLS * cw}px`;
    canvas.style.height = `${ROWS * ch}px`;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let shown = 0, phaseStart = performance.now() / 1000, flipping = false, raf = 0, last = 0, frame = 0;

    function draw(now: number) {
      const t = now / 1000;
      if (!reduce) {
        const el = t - phaseStart;
        if (!flipping && el > HOLD) { flipping = true; phaseStart = t; }
        else if (flipping && el > FLIP) { flipping = false; shown = 1 - shown; phaseStart = t; }
      }
      const p = flipping ? (t - phaseStart) / FLIP : 0;
      const from = faces[shown], to = faces[1 - shown];

      const css = getComputedStyle(document.documentElement);
      const grad = ctx!.createLinearGradient(0, 0, COLS * cw, ROWS * ch);
      grad.addColorStop(0, css.getPropertyValue("--ascii-a").trim() || "#888");
      grad.addColorStop(1, css.getPropertyValue("--ascii-b").trim() || "#888");

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, COLS * cw, ROWS * ch);
      ctx!.font = font;
      ctx!.textBaseline = "top";
      ctx!.fillStyle = grad;

      for (let y = 0; y < ROWS; y++)
        for (let x = 0; x < COLS; x++) {
          let c: string | null = null;
          for (const k of CHIPS) c = chip((x - k.cx) / k.rx, (y - k.cy) / k.ry, reduce ? 0 : t, k.spin) ?? c;
          if (y < H + 2 && x < W + 2) {
            const th = thr[y][x];
            c = flipping && Math.abs(th - p) < 0.05
              ? GLITCH[(x * 7 + y * 13 + frame) % GLITCH.length]
              : (th < p ? to : from)[y][x];
          }
          if (c && c !== " ") ctx!.fillText(c, x * cw, y * ch);
        }
      frame++;
    }

    function loop(now: number) {
      if (now - last > 80) { draw(now); last = now; }
      raf = requestAnimationFrame(loop);
    }
    if (reduce) draw(performance.now());
    else raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none hidden lg:block"
    />
  );
}
