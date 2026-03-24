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
  const angle = (Math.random() * 30 + 15) * (Math.PI / 180); // 15–45 deg downward
  const speed = Math.random() * 4 + 3;
  const maxLife = Math.random() * 60 + 60;

  // Start from top or left edges
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
    ctx.scale(dpr, dpr);

    const stars: Star[] = [];
    let frameCount = 0;

    // Spawn initial stars staggered
    for (let i = 0; i < 4; i++) {
      const s = createStar(width, height);
      s.life = Math.floor(Math.random() * s.maxLife);
      stars.push(s);
    }

    function drawGrid() {
      if (!ctx) return;
      ctx.strokeStyle = "rgba(0,0,0,0.012)";
      ctx.lineWidth = 1;
      const g = 48;
      for (let x = 0; x < width; x += g) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y < height; y += g) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }
    }

    function drawStar(star: Star) {
      if (!ctx) return;
      const progress = star.life / star.maxLife;
      // Fade in first 20%, full opacity middle, fade out last 30%
      let alpha = star.opacity;
      if (progress < 0.2) alpha *= progress / 0.2;
      else if (progress > 0.7) alpha *= (1 - progress) / 0.3;

      const tailX = star.x - (star.vx / star.speed) * star.length;
      const tailY = star.y - (star.vy / star.speed) * star.length;

      const grad = ctx.createLinearGradient(tailX, tailY, star.x, star.y);
      grad.addColorStop(0, `rgba(0,0,0,0)`);
      grad.addColorStop(0.7, `rgba(0,0,0,${alpha * 0.4})`);
      grad.addColorStop(1, `rgba(0,0,0,${alpha})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(star.x, star.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Leading pixel dot
      ctx.beginPath();
      ctx.arc(star.x, star.y, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,0,0,${alpha})`;
      ctx.fill();
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      drawGrid();

      // Spawn a new star every ~90 frames
      if (frameCount % 90 === 0) {
        stars.push(createStar(width, height));
      }

      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        drawStar(s);

        // Remove if off-screen or past max life
        if (s.life > s.maxLife || s.x > width + 150 || s.y > height + 150) {
          stars.splice(i, 1);
        }
      }

      // Keep between 3–5 stars alive
      if (stars.length < 3) stars.push(createStar(width, height));

      frameCount++;
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
