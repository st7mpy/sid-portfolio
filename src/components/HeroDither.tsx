"use client";

import DitherShader from "@/components/ui/dither-shader";

interface HeroDitherProps {
  /** Current theme — drives the duotone ink/paper colors so the art melts into the page. */
  isDark: boolean;
}

/**
 * Ambient hero backdrop: Van Gogh's "The Starry Night" run through the dither
 * shader as a theme-aware duotone. The artwork's bright areas resolve to the
 * page background (invisible) and its darks to the foreground "ink", so it reads
 * as a faint dithered etching behind the header. A slow CSS drift gives it life.
 *
 * The DitherShader component itself is used unchanged — only its props and the
 * surrounding framing/mask are tuned here.
 */
export default function HeroDither({ isDark }: HeroDitherProps) {
  // Match the theme tokens in globals.css so the duotone blends seamlessly.
  const ink = isDark ? "#e5e5e5" : "#111111";
  const paper = isDark ? "#0a0a0a" : "#fafafa";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[78vh] overflow-hidden select-none"
      style={{
        // Fade out toward the bottom so it dissolves into the page, and ease the
        // very top edge so it doesn't start with a hard line under the navbar.
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 14%, black 52%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 14%, black 52%, transparent 100%)",
      }}
    >
      <div className="hero-dither-drift absolute inset-0 opacity-[0.4] dark:opacity-[0.5]">
        <DitherShader
          src="/art/starry-night.jpg"
          gridSize={3}
          pixelRatio={2}
          ditherMode="bayer"
          colorMode="duotone"
          primaryColor={ink}
          secondaryColor={paper}
          backgroundColor="transparent"
          contrast={1.15}
          brightness={0.02}
          threshold={0.5}
          objectFit="cover"
          animated={false}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
