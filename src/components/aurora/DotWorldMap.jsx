/* eslint-disable no-undef */
import { useEffect, useRef } from "react";

import dotMap from "./dotMap.json";

const LEVELS = 12;

/**
 * Dotted halftone world map (the Nexus key visual motif) rendered to canvas.
 * Dots are bucketed into phase levels so a slow aurora wave can travel
 * across the map with only `LEVELS` fill calls per frame.
 */
export const DotWorldMap = ({
  className = "",
  motion = true,
  baseAlpha = 0.32,
  focusAlpha = 0.78,
  waveSpeed = 0.4,
  tone = "150, 205, 220",
  focusTone = "110, 255, 190",
  style,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let paths = [];
    let focusPaths = [];
    let width = 1;
    let height = 1;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const { cols, rows, dots } = dotMap;
      const sx = width / cols;
      const sy = height / rows;
      const unit = Math.min(sx, sy);
      const rRest = Math.max(0.65, unit * 0.17);
      const rFocus = Math.max(0.85, unit * 0.22);

      paths = Array.from({ length: LEVELS }, () => new Path2D());
      focusPaths = Array.from({ length: LEVELS }, () => new Path2D());

      for (const [ix, iy, region] of dots) {
        const x = (ix + 0.5) * sx;
        const y = (iy + 0.5) * sy;
        const phase = ((ix / cols) * 1.7 + (iy / rows) * 0.5) % 1;
        const level = Math.min(LEVELS - 1, Math.floor(phase * LEVELS));
        const radius = region ? rFocus : rRest;
        const target = region ? focusPaths[level] : paths[level];
        target.moveTo(x + radius, y);
        target.arc(x, y, radius, 0, Math.PI * 2);
      }
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);

      for (let level = 0; level < LEVELS; level++) {
        const phase = (level / LEVELS) * Math.PI * 2;
        const wave = 0.5 + 0.5 * Math.sin(phase - time * waveSpeed);
        const alpha = baseAlpha * (0.45 + 0.75 * wave);
        ctx.fillStyle = `rgba(${tone}, ${alpha.toFixed(3)})`;
        ctx.fill(paths[level]);
      }

      for (let level = 0; level < LEVELS; level++) {
        const phase = (level / LEVELS) * Math.PI * 2;
        const wave =
          0.5 + 0.5 * Math.sin(phase * 0.55 - time * waveSpeed * 0.62);
        const alpha = focusAlpha * (0.58 + 0.42 * wave);
        ctx.fillStyle = `rgba(${focusTone}, ${alpha.toFixed(3)})`;
        ctx.fill(focusPaths[level]);
      }
    };

    build();

    if (motion) {
      const loop = (now) => {
        draw(now / 1000);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    } else {
      draw(2.2);
    }

    const observer = new ResizeObserver(() => {
      build();
      if (!motion) draw(2.2);
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [motion, baseAlpha, focusAlpha, waveSpeed, tone, focusTone]);

  return (
    <canvas
      aria-hidden="true"
      className={className}
      ref={canvasRef}
      style={style}
    />
  );
};
