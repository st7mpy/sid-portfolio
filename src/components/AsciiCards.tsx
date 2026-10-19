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
  // Corner indices are drawn separately at a larger size (see drawCorners).
  const g = Array.from({ length: H }, () => Array(W).fill(" "));
  const bw = Math.max(...c.art.map((l) => l.length));
  const ox = Math.floor((W - bw) / 2);
  const oy = Math.floor((H - c.art.length) / 2);
  c.art.forEach((l, y) => l.split("").forEach((ch, x) => (g[oy + y][ox + x] = ch)));
  const rows = g.map((r) => "|" + r.join("") + "|");
  return ["." + "-".repeat(W) + ".", ...rows, "'" + "-".repeat(W) + "'"];
}

const CW = W + 2, CH = H + 2; // card incl. border
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
    const family = getComputedStyle(document.body).fontFamily;
    const font = `9px ${family}`;
    const BIG = 15; // px, corner rank/suit size
    ctx.font = font;
    ctx.textBaseline = "top";
    const cw = ctx.measureText("M").width, ch = 10;
    const aspect = ch / cw;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = CW * cw * dpr;
    canvas.height = CH * ch * dpr;
    canvas.style.width = `${CW * cw}px`;
    canvas.style.height = `${CH * ch}px`;
    ctx.font = font; // resizing the canvas reset the context state
    ctx.textBaseline = "top";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let colors = ["#888", "#888"];

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

    // Corner rank/suit labels, pre-rendered per card (and per theme) so frames never switch fonts.
    let corners: HTMLCanvasElement[] = [];
    const makeCorner = (card: Card) => {
      const lines = card.rank.length > 1 ? card.rank.split("") : [card.rank, card.suit];
      const step = card.rank.length > 1 ? BIG - 2 : BIG + 1;
      const w = BIG + 4, h = step * (lines.length - 1) + BIG + 2;
      const c = document.createElement("canvas");
      c.width = w * dpr;
      c.height = h * dpr;
      const g = c.getContext("2d")!;
      g.scale(dpr, dpr);
      g.font = `bold ${BIG}px ${family}`;
      g.textAlign = "center";
      g.textBaseline = "top";
      lines.forEach((l, i) => {
        g.fillStyle = card.suit && i === 1 ? colors[1] : colors[0];
        g.fillText(l, w / 2, i * step);
      });
      return c;
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

      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx!.clearRect(0, 0, CW * cw, CH * ch);

      // One fillText per row (monospace keeps columns aligned); lit wave-front cells drawn on top.
      const lit: [number, number, string][] = [];
      ctx!.fillStyle = colors[0];
      for (let y = 0; y < CH; y++) {
        let row = "";
        for (let x = 0; x < CW; x++) {
          const th = dealing ? thr[y][x] : 1;
          if (dealing && Math.abs(th - p) < BAND) {
            const n = (x * 7 + y * 13 + frame) % 23;
            const g = GLITCH[n % GLITCH.length];
            if (n < 3) { lit.push([x, y, g]); row += " "; } else row += g;
          } else {
            row += faces[th < p ? next : cur][y][x];
          }
        }
        ctx!.fillText(row, 0, y * ch);
      }
      ctx!.fillStyle = colors[1];
      for (const [x, y, g] of lit) {
        ctx!.globalAlpha = 0.35;
        ctx!.fillRect(x * cw, y * ch, cw, ch);
        ctx!.globalAlpha = 1;
        ctx!.fillText(g, x * cw, y * ch);
      }

      // Big corner indices: top-left upright, bottom-right rotated like a real card.
      // Each corner shows whichever card the ripple has reached there; hidden while the wave front passes.
      for (const [cx, cy, rot] of [[1, 1, 0], [CW - 2, CH - 2, Math.PI]] as const) {
        const th = dealing ? thr[cy][cx] : 1;
        if (dealing && Math.abs(th - p) < BAND) continue;
        const img = corners[th < p ? next : cur];
        const w = img.width / dpr, h = img.height / dpr;
        ctx!.save();
        ctx!.translate(cx * cw + cw / 2, cy * ch + (rot ? ch : 0));
        ctx!.rotate(rot);
        ctx!.drawImage(img, cw / 2 - w / 2, 0, w, h);
        ctx!.restore();
      }
      frame++;
    }

    const readColors = () => {
      const css = getComputedStyle(document.documentElement);
      colors = ["--ascii-a", "--ascii-hi"].map((v) => css.getPropertyValue(v).trim() || "#888");
      corners = CARDS.map(makeCorner);
      draw(performance.now());
    };
    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });

    // Only repaint while a deal is rippling (plus one frame to settle); a resting card is static.
    let settled = false;
    function loop(now: number) {
      const due = now / 1000 - phaseStart > hold;
      if (now - last > 70 && (dealing || due || !settled)) {
        draw(now);
        last = now;
        settled = !dealing;
      }
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
