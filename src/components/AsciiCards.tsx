"use client";

import { useEffect, useRef } from "react";

// Card is W x H inside its border. All art is original.
const W = 27;
const H = 32;

type Card = { rank: string; suit: string; art: string[] };

const CARDS: Card[] = [
  {
    rank: "JOKER",
    suit: "",
    art: [
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
    ],
  },
  {
    rank: "A",
    suit: "\u2660",
    art: [
      "         .",
      "        / \\",
      "       /   \\",
      "      /     \\",
      "     /       \\",
      "    /         \\",
      "   /           \\",
      "  /             \\",
      " (               )",
      "  \\     /|\\     /",
      "   `---' | `---'",
      "        /_\\",
    ],
  },
  {
    rank: "K",
    suit: "\u2665",
    art: [
      "  _    _    _",
      " | |__| |__| |",
      " |  .--o--.  |",
      " |_/_______\\_|",
      "   |  - -  |",
      "   | (o o) |",
      "   |   ^   |",
      "   | \\===/ |",
      "  /|\\_____/|\\",
      " / | .-v-. | \\",
      "|  | \\   / |  |",
      "|  |  \\ /  |  |",
      "|__|___v___|__|",
    ],
  },
  {
    rank: "Q",
    suit: "\u2663",
    art: [
      "   o    o    o",
      "  /\\   /\\   /\\",
      " /  \\_/  \\_/  \\",
      " \\____________/",
      "  /  .----.  \\",
      " |  ( ^  ^ )  |",
      " |  (  ..  )  |",
      " |   \\ -- /   |",
      "  \\   `--'   /",
      "  /\\   _O_  /\\",
      " /  \\ (_._) /  \\",
      "|    \\ /|\\ /    |",
      "|_____\\_|_/_____|",
    ],
  },
  {
    rank: "J",
    suit: "\u2666",
    art: [
      "    _________",
      "   /   __    \\__",
      "  |   /  \\     _>",
      "  |___\\__/____|",
      "   |  o   o  |",
      "   |    >    |",
      "   |  \\___/  |",
      "    \\_______/",
      "   /|   /\\  |\\",
      "  / |  <  > | \\",
      " |  |   \\/  |  |",
      " |__|_______|__|",
    ],
  },
];

function face(c: Card): string[] {
  const g = Array.from({ length: H }, () => Array(W).fill(" "));
  if (c.rank.length > 1) {
    c.rank.split("").forEach((ch, i) => {
      g[1 + i][1] = ch;
      g[H - 2 - i][W - 2] = ch;
    });
  } else {
    g[1][1] = g[H - 2][W - 2] = c.rank;
    g[2][1] = g[H - 3][W - 2] = c.suit;
  }
  const bw = Math.max(...c.art.map((l) => l.length));
  const ox = Math.floor((W - bw) / 2);
  const oy = Math.floor((H - c.art.length) / 2);
  c.art.forEach((l, y) => l.split("").forEach((ch, x) => (g[oy + y][ox + x] = ch)));
  const rows = g.map((r) => "|" + r.join("") + "|");
  return ["." + "-".repeat(W) + ".", ...rows, "'" + "-".repeat(W) + "'"];
}

const CW = W + 2, CH = H + 2; // card incl. border
const COLS = CW;
const ROWS = CH;
const GLITCH = "01#%*+=";
const DEAL = 1.8; // seconds for the ripple to cross the card
const BAND = 0.07; // width of the scrambled wave front

export default function AsciiCards() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const faces = CARDS.map(face);
    const font = `9px ${getComputedStyle(document.body).fontFamily}`;
    ctx.font = font;
    const cw = ctx.measureText("M").width, ch = 10;
    const aspect = ch / cw;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = COLS * cw * dpr;
    canvas.height = ROWS * ch * dpr;
    canvas.style.width = `${COLS * cw}px`;
    canvas.style.height = `${ROWS * ch}px`;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let colors = ["#888", "#888", "#888"];

    // Deal state: ripple from a random origin to a random next card.
    let cur = Math.floor(Math.random() * faces.length), next = cur;
    let dealing = false, phaseStart = performance.now() / 1000, hold = 3;
    let thr: number[][] = [];
    const deal = () => {
      do next = Math.floor(Math.random() * faces.length); while (next === cur);
      const ox = Math.random() * CW, oy = Math.random() * CH;
      const max = Math.hypot(Math.max(ox, CW - ox), Math.max(oy, CH - oy) * aspect);
      thr = Array.from({ length: CH }, (_, y) =>
        Array.from({ length: CW }, (_, x) => 0.85 * (Math.hypot(x - ox, (y - oy) * aspect) / max) + 0.15 * Math.random())
      );
    };

    let raf = 0, last = 0, frame = 0;
    function draw(now: number) {
      const t = now / 1000;
      if (!reduce) {
        const el = t - phaseStart;
        if (!dealing && el > hold) { deal(); dealing = true; phaseStart = t; }
        else if (dealing && el > DEAL) { dealing = false; cur = next; phaseStart = t; hold = 3 + Math.random() * 3; }
      }
      const p = dealing ? (t - phaseStart) / DEAL : 0;

      const grad = ctx!.createLinearGradient(0, 0, COLS * cw, ROWS * ch);
      grad.addColorStop(0, colors[0]);
      grad.addColorStop(1, colors[1]);

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, COLS * cw, ROWS * ch);
      ctx!.font = font;
      ctx!.textBaseline = "top";

      for (let y = 0; y < ROWS; y++)
        for (let x = 0; x < COLS; x++) {
          let c: string;
          let hi = false;
          const th = dealing ? thr[y][x] : 1;
          if (dealing && Math.abs(th - p) < BAND) {
            const n = (x * 7 + y * 13 + frame) % 23;
            c = GLITCH[n % GLITCH.length];
            hi = n < 3; // a few lit cells ride the wave front
          } else {
            c = faces[th < p ? next : cur][y][x];
          }
          if (hi) {
            ctx!.fillStyle = colors[2];
            ctx!.globalAlpha = 0.35;
            ctx!.fillRect(x * cw, y * ch, cw, ch);
            ctx!.globalAlpha = 1;
            ctx!.fillText(c, x * cw, y * ch);
          } else if (c !== " ") {
            ctx!.fillStyle = grad;
            ctx!.fillText(c, x * cw, y * ch);
          }
        }
      frame++;
    }

    const readColors = () => {
      const css = getComputedStyle(document.documentElement);
      colors = ["--ascii-a", "--ascii-b", "--ascii-hi"].map((v) => css.getPropertyValue(v).trim() || "#888");
      if (reduce) draw(performance.now());
    };
    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });

    function loop(now: number) {
      if (now - last > 70) { draw(now); last = now; }
      raf = requestAnimationFrame(loop);
    }
    readColors();
    if (reduce) draw(performance.now());
    else raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none hidden lg:block" />;
}
