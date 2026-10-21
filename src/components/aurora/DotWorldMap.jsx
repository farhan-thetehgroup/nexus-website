/* eslint-disable no-undef */
import { useEffect, useRef } from "react";

import dotMap from "./dotMap.json";

const LEVELS = 12;

/**
 * lat/lon → dot-grid coordinates (floats) using the same equirectangular
 * projection as `scripts/generate-dot-map.mjs`. Defaults are read from the
 * map payload itself so the helper stays in sync if the grid is regenerated.
 */
export const latLonToGrid = (lat, lon, map = dotMap) => {
  const cols = map.cols ?? 200;
  const rows = map.rows ?? 68;
  const latTop = map.latTop ?? 72;
  const latBottom = map.latBottom ?? -50;
  return {
    x: ((lon + 180) / 360) * cols - 0.5,
    y: ((latTop - lat) / (latTop - latBottom)) * rows - 0.5,
  };
};

/**
 * Dotted halftone world map (the Nexus key visual motif) rendered to canvas.
 * Dots are bucketed into phase levels so a slow aurora wave can travel
 * across the map with only `LEVELS` fill calls per frame.
 *
 * `fit="cover"` fills the container edge-to-edge at a uniform dot scale
 * (cropping the overflowing axis, anchored by `anchorX` / `anchorY`);
 * the default `fit="stretch"` keeps the legacy per-axis scaling.
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
  dotMapData = dotMap,
  fit = "stretch",
  anchorX = 0.5,
  anchorY = 0.5,
  // [{ x, y, tone?, active? }] — grid-space points (see latLonToGrid)
  // rendered as breathing dots with staggered ping rings, e.g. tour
  // cities. `active` lifts a point (bigger, brighter, wider rings); it is
  // read per-frame through a ref, so changing it never rebuilds the map.
  pulsePoints,
}) => {
  const canvasRef = useRef(null);
  const pulseRef = useRef(pulsePoints);

  useEffect(() => {
    pulseRef.current = pulsePoints;
  }, [pulsePoints]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let paths = [];
    let focusPaths = [];
    let pulsePx = [];
    let pulseEase = []; // per-point presence, eased per frame toward target
    let width = 1;
    let height = 1;
    let unit = 4; // cell size, set by build() — used by the pulse renderer

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const { cols, rows, dots } = dotMapData;
      const sx = width / cols;
      const sy = height / rows;
      // "cover" keeps square cells (no stretch) and fills the canvas,
      // cropping the overflowing axis; anchored via anchorX / anchorY.
      const cover = fit === "cover";
      const step = cover ? Math.max(sx, sy) : null;
      const stepX = cover ? step : sx;
      const stepY = cover ? step : sy;
      const offX = cover ? (width - cols * step) * anchorX : 0;
      const offY = cover ? (height - rows * step) * anchorY : 0;
      unit = Math.min(stepX, stepY);
      const rRest = Math.max(0.65, unit * 0.17);
      const rFocus = Math.max(0.85, unit * 0.22);

      paths = Array.from({ length: LEVELS }, () => new Path2D());
      focusPaths = Array.from({ length: LEVELS }, () => new Path2D());

      for (const [ix, iy, region] of dots) {
        const x = (ix + 0.5) * stepX + offX;
        const y = (iy + 0.5) * stepY + offY;
        const phase = ((ix / cols) * 1.7 + (iy / rows) * 0.5) % 1;
        const level = Math.min(LEVELS - 1, Math.floor(phase * LEVELS));
        const radius = region ? rFocus : rRest;
        const target = region ? focusPaths[level] : paths[level];
        target.moveTo(x + radius, y);
        target.arc(x, y, radius, 0, Math.PI * 2);
      }

      pulsePx = (pulseRef.current ?? []).map((p) => ({
        tone: p.tone ?? focusTone,
        px: (p.x + 0.5) * stepX + offX,
        py: (p.y + 0.5) * stepY + offY,
      }));
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

      // City pulses: a breathing core with two staggered ping rings per
      // point, phase-offset per city so they never pulse in lockstep.
      // The active city eases toward full presence, the rest rest low.
      const pts = pulseRef.current ?? [];
      if (pulseEase.length !== pts.length) {
        pulseEase = pts.map(() => 0.45);
      }
      for (let i = 0; i < pts.length; i++) {
        const target = pts[i].active ? 1 : 0.45;
        pulseEase[i] += (target - pulseEase[i]) * 0.09;
      }

      for (let i = 0; i < pulsePx.length; i++) {
        const p = pulsePx[i];
        const e = pulseEase[i] ?? 0.45;
        const base = Math.max(2.2, unit * 0.36) * (0.85 + 0.5 * e);
        const breath =
          0.5 + 0.5 * Math.sin((time * Math.PI * 2) / 2.8 + i * 1.1);

        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.tone}, ${Math.min(
          1,
          0.45 + 0.45 * e + 0.1 * breath,
        ).toFixed(3)})`;
        ctx.arc(p.px, p.py, base * (0.78 + 0.3 * breath), 0, Math.PI * 2);
        ctx.fill();

        for (let k = 0; k < 2; k++) {
          const t = (time / 3.6 + i * 0.37 + k * 0.5) % 1;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${p.tone}, ${(0.7 * e * (1 - t)).toFixed(3)})`;
          ctx.lineWidth = 1.6;
          ctx.arc(
            p.px,
            p.py,
            base * (1.1 + (4.4 + 2.6 * e) * t),
            0,
            Math.PI * 2,
          );
          ctx.stroke();
        }
      }
    };

    build();

    // Skip painting while the canvas is scrolled out of view — the loop
    // keeps ticking so it resumes the moment the map re-enters.
    let inView = true;
    const visibility = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
      },
      { rootMargin: "10% 0%" },
    );
    visibility.observe(canvas);

    if (motion) {
      const loop = (now) => {
        if (inView) draw(now / 1000);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    } else {
      // No animation: converge the pulse easing instantly so the static
      // frame shows the current active/inactive mix at full presence.
      for (let i = 0; i < 40; i++) {
        const pts = pulseRef.current ?? [];
        for (let j = 0; j < pts.length; j++) {
          pulseEase[j] = pts[j].active ? 1 : 0.45;
        }
      }
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
      visibility.disconnect();
    };
  }, [
    motion,
    baseAlpha,
    focusAlpha,
    waveSpeed,
    tone,
    focusTone,
    dotMapData,
    fit,
    anchorX,
    anchorY,
    pulsePoints?.length ?? 0,
  ]);

  return (
    <canvas
      aria-hidden="true"
      className={className}
      ref={canvasRef}
      style={style}
    />
  );
};
