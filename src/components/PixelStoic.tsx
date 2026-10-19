"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  speed: number;
  life: number;
  maxLife: number;
}

function createStar(width: number, height: number): Star {
  const angle = (Math.random() * 30 + 15) * (Math.PI / 180);
  const speed = Math.random() * 4 + 3;
  const maxLife = Math.random() * 60 + 60;

  const fromTop = Math.random() > 0.4;
  const x = fromTop ? Math.random() * width : -10;
  const y = fromTop ? -10 : Math.random() * height * 0.5;

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    length: Math.random() * 80 + 60,
    opacity: Math.random() * 0.15 + 0.06,
    speed,
    life: 0,
    maxLife,
  };
}

export default function ShootingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let width = canvas.clientWidth;
    let height = canvas.clientHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const stars: Star[] = [];
    let spawnTimer = 0;

    for (let i = 0; i < 4; i++) {
      const s = createStar(width, height);
      s.life = Math.floor(Math.random() * s.maxLife);
      stars.push(s);
    }

    // Read theme color once, refresh only when the theme changes.
    let star = "";
    const readColors = () => {
      star = getComputedStyle(document.documentElement).getPropertyValue("--color-star").trim();
    };
    readColors();
    const themeObserver = new MutationObserver(readColors);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    const getStarColor = () => star;
    function drawStar(star: Star) {
      if (!ctx) return;
      const rgb = getStarColor();
      const progress = star.life / star.maxLife;
      let alpha = star.opacity;
      if (progress < 0.2) alpha *= progress / 0.2;
      else if (progress > 0.7) alpha *= (1 - progress) / 0.3;

      const tailX = star.x - (star.vx / star.speed) * star.length;
      const tailY = star.y - (star.vy / star.speed) * star.length;

      const grad = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
      grad.addColorStop(0, `rgba(${rgb},0)`);
      grad.addColorStop(0.7, `rgba(${rgb},${alpha * 0.4})`);
      grad.addColorStop(1, `rgba(${rgb},${alpha})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(star.x, star.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(star.x, star.y, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb},${alpha})`;
      ctx.fill();
    }

    // Time-based motion: speeds are tuned in "60fps frames", scaled by real elapsed time,
    // so dropped frames or 120Hz screens don't change the speed or cause jumps.
    let raf = 0, prev = 0;
    function animate(now: number) {
      if (!ctx) return;
      const f = prev ? Math.min((now - prev) / (1000 / 60), 3) : 1;
      prev = now;
      ctx.clearRect(0, 0, width, height);

      spawnTimer += f;
      if (spawnTimer >= 90) {
        spawnTimer = 0;
        stars.push(createStar(width, height));
      }

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.x += s.vx * f;
        s.y += s.vy * f;
        s.life += f;
        drawStar(s);

        if (s.life > s.maxLife || s.x > width + 150 || s.y > height + 150) {
          stars.splice(i, 1);
        }
      }

      if (stars.length < 3) stars.push(createStar(width, height));
      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);

    const handleResize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="star-field fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
