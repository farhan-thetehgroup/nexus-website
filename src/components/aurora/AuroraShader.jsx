/* eslint-disable no-undef */
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { AURORA_PALETTES } from "../../constants/nexus2027";

import "./aurora.css";

const VERTEX = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uPointer;
  uniform float uMode;
  uniform float uIntensity;
  uniform vec2 uWave;
  uniform vec3 uBg;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.02 + vec2(13.7, 7.3);
      a *= 0.5;
    }
    return v;
  }

  float ribbon(vec2 uv, float t, float seed, float width) {
    vec2 q = vec2(uv.x * 1.15 + seed * 11.3 + t * 0.03, uv.y * 0.32 - t * 0.018);
    float warp = fbm(q * 1.7 + t * 0.05);
    float n = fbm(q + vec2(warp * 0.8, warp * 0.3));
    float rays = fbm(vec2(uv.x * 5.5 + seed * 3.3 - t * 0.02, uv.y * 0.5));
    float center = 0.35 + seed * 0.15 + (n - 0.5) * 0.5;
    float d = abs(uv.y - center);
    float band = smoothstep(width, 0.0, d);
    return band * (0.35 + 0.9 * rays);
  }

  void main() {
    vec2 uv0 = gl_FragCoord.xy / uRes.xy;
    float aspect = uRes.x / uRes.y;

    vec2 p = uv0 - 0.5;
    p.x *= aspect;
    p += (uPointer - 0.5) * 0.05;

    // Movement-driven waves — moving the pointer stirs the aurora like
    // water; uWave decays to zero when the pointer rests, so still water
    // stays perfectly still.
    vec2 uv = uv0;
    float wave = min(length(uWave), 1.0);
    if (wave > 0.004) {
      vec2 pd = uv0 - uPointer;
      pd.x *= aspect;
      float pdist = length(pd);
      float fall = exp(-pdist * pdist * 7.5);
      float ripple = sin(pdist * 34.0 - uTime * 6.0);
      uv +=
        (pd / max(pdist, 1e-4) + normalize(uWave + vec2(1e-5)) * 0.45) *
        ripple *
        fall *
        0.022 *
        wave;
    }

    float t = uTime;
    float breathe = 0.9 + 0.1 * sin(t * 0.35 + 1.7);
    float glow = 0.0;
    float core = 0.0;

    if (uMode < 0.5) {
      // 01 POLAR DRIFT - wide curtains travelling across the frame.
      // Broad vertical spread: curtains stay visible well into the upper half.
      float weight = mix(0.5, 1.0, smoothstep(1.6, 0.0, uv.y));
      glow += ribbon(uv, t, 0.0, 0.34);
      glow += ribbon(uv - vec2(0.0, 0.09), t + 21.0, 1.0, 0.24) * 0.8;
      glow += ribbon(uv + vec2(0.0, 0.12), t + 47.0, 2.0, 0.38) * 0.5;
      glow *= weight;
      core += smoothstep(0.3, 0.0, uv.y) * 0.16;
    } else if (uMode < 1.5) {
      // 02 VECTOR HORIZON - aurora rising over a hard horizon arc.
      float arc = 0.10 * (1.0 - clamp(pow(abs(p.x) * 1.15, 2.0), 0.0, 1.0));
      float horizon = 0.22 + arc;
      float d = uv.y - horizon;
      float n = fbm(vec2(uv.x * 1.7 + t * 0.02, uv.y * 0.55 - t * 0.012));
      float above = smoothstep(0.6, 0.0, abs(d - 0.18));
      glow += above * (0.3 + n * 0.95) * smoothstep(-0.42, 0.3, -d + n * 0.18);
      float upper = smoothstep(0.5, 0.0, abs(d - 0.42));
      glow += upper * (0.16 + n * 0.6) * 0.45;
      core += smoothstep(0.014, 0.0, abs(d)) * 0.85;
      core += smoothstep(0.2, 0.0, abs(d)) * 0.16;
    } else {
      // 03 SIGNAL BLOOM - ribbons radiating from the centre.
      // Normalised by the short edge so the bloom stays circular in any format.
      vec2 c =
        (gl_FragCoord.xy - 0.5 * uRes.xy) / min(uRes.x, uRes.y);
      c += (uPointer - 0.5) * 0.05;
      float r = length(c);
      float ang = atan(c.y, c.x);
      float n = fbm(vec2(ang * 1.5 + t * 0.06, r * 1.4 - t * 0.1));
      float ring = smoothstep(0.34, 0.0, abs(r - (0.26 + n * 0.3)));
      glow += ring * (0.5 + n * 0.8);
      glow += smoothstep(0.42, 0.0, r) * 0.11;
      core += smoothstep(0.2, 0.0, abs(r - 0.12)) * 0.5;
      core += smoothstep(0.3, 0.0, uv.y) * 0.14;
    }

    glow = clamp(glow * uIntensity * breathe, 0.0, 1.35);
    core = clamp(core * uIntensity, 0.0, 1.4);

    float green = smoothstep(0.22, 1.15, glow);
    vec3 col = uBg;
    col += uC1 * glow * 0.4;
    col += mix(uC1, uC2, green) * green * 0.56;
    col += uC3 * pow(green, 2.5) * 0.34;
    col += uC3 * core * 0.5;

    // Starfield, kept away from the bright curtain cores.
    float star = step(0.9976, hash(floor(uv0 * uRes / 3.0)));
    col += vec3(star) * 0.26 * (1.0 - green);

    // Vignette + ordered-ish dither to kill banding on dark gradients.
    float vig = smoothstep(1.3, 0.3, length(p * vec2(1.0, 1.25)));
    col *= 0.62 + 0.38 * vig;
    col += (hash(gl_FragCoord.xy * 0.731) - 0.5) / 220.0;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const MODES = { drift: 0, horizon: 1, bloom: 2 };

const canUseWebGL = (() => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
})();

const withAlpha = (hex, alpha) => {
  const value = hex.replace("#", "");
  const int = Number.parseInt(value, 16);
  const r = (int >> 16) & 255;
  const g = (int >> 8) & 255;
  const b = int & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/** Static, dependency-free poster used when WebGL is unavailable. */
const AuroraFallback = ({ palette, className = "", style }) => (
  <div
    className={className}
    style={{
      backgroundColor: palette.bg,
      backgroundImage: [
        `radial-gradient(120% 90% at 62% 96%, ${withAlpha(palette.c2, 0.32)} 0%, transparent 58%)`,
        `radial-gradient(95% 75% at 26% 86%, ${withAlpha(palette.c1, 0.38)} 0%, transparent 62%)`,
        `radial-gradient(70% 60% at 84% 74%, ${withAlpha(palette.c3, 0.14)} 0%, transparent 60%)`,
        `radial-gradient(160% 120% at 50% 40%, transparent 40%, rgba(2, 9, 15, 0.6) 100%)`,
      ].join(", "),
      ...style,
    }}
  />
);

export const AuroraShader = ({
  mode = "drift",
  intensity,
  motion = true,
  water = 0,
  palette: paletteOverride,
  className = "",
  style,
}) => {
  const canvasRef = useRef(null);
  const visibleRef = useRef(true);

  const modePalette = useMemo(
    () => AURORA_PALETTES[mode] ?? AURORA_PALETTES.drift,
    [mode],
  );
  const palette = paletteOverride ?? modePalette;

  // Pause the shader whenever the canvas leaves the viewport or the tab is hidden.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !motion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "120px" },
    );
    observer.observe(canvas);

    return () => observer.disconnect();
  }, [motion]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canUseWebGL) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(new THREE.Color(palette.bg), 1);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTime: { value: 0 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uMode: { value: MODES[mode] ?? 0 },
      uIntensity: { value: intensity ?? palette.intensity },
      uWave: { value: new THREE.Vector2(0, 0) },
      uBg: { value: new THREE.Color(palette.bg) },
      uC1: { value: new THREE.Color(palette.c1) },
      uC2: { value: new THREE.Color(palette.c2) },
      uC3: { value: new THREE.Color(palette.c3) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    let rect = canvas.getBoundingClientRect();
    const updateRect = () => {
      rect = canvas.getBoundingClientRect();
    };

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth || window.innerWidth;
      const height = parent?.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      uniforms.uRes.value.set(width, height);
      updateRect();
    };
    resize();

    const observer = new ResizeObserver(resize);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    // Track pointer motion in canvas-uv space so the shader can turn
    // movement into waves: accumulate deltas, then convert to velocity
    // per frame. No movement → zero velocity → still water.
    const pointer = { x: 0.5, y: 0.5 };
    let lastX = null;
    let lastY = null;
    let accumX = 0;
    let accumY = 0;
    const onPointerMove = (event) => {
      if (rect.width <= 0 || rect.height <= 0) return;
      const x = Math.min(
        1,
        Math.max(0, (event.clientX - rect.left) / rect.width),
      );
      const y = Math.min(
        1,
        Math.max(0, (event.clientY - rect.top) / rect.height),
      );
      if (lastX !== null) {
        accumX += x - lastX;
        accumY += lastY - y;
      }
      lastX = x;
      lastY = y;
      pointer.x = x;
      pointer.y = 1 - y;
    };
    if (motion) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("scroll", updateRect, { passive: true });
      window.addEventListener("resize", updateRect, { passive: true });
    }

    let raf = 0;
    let lastRendered = 0;
    let prevNow = 0;
    const startedAt = performance.now();
    const renderFrame = (now) => {
      uniforms.uTime.value = (now - startedAt) / 1000;
      uniforms.uPointer.value.x +=
        (pointer.x - uniforms.uPointer.value.x) * 0.06;
      uniforms.uPointer.value.y +=
        (pointer.y - uniforms.uPointer.value.y) * 0.06;
      // Pointer velocity (uv/s) drives the wave; with no movement the
      // accumulated delta is zero and uWave eases back to still water.
      const dt = Math.min(0.12, Math.max(0.008, (now - prevNow) / 1000));
      prevNow = now;
      const targetX = motion && water ? (accumX / dt) * 1.5 : 0;
      const targetY = motion && water ? (accumY / dt) * 1.5 : 0;
      accumX = 0;
      accumY = 0;
      // Rise fast while moving, settle gently when the pointer rests.
      const waveK = targetX !== 0 || targetY !== 0 ? 0.35 : 0.14;
      uniforms.uWave.value.x += (targetX - uniforms.uWave.value.x) * waveK;
      uniforms.uWave.value.y += (targetY - uniforms.uWave.value.y) * waveK;
      renderer.render(scene, camera);
    };

    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (!visibleRef.current || document.hidden) return;
      // Cap to ~40fps; the aurora is slow, extra frames buy nothing.
      if (now - lastRendered < 24) return;
      lastRendered = now;
      renderFrame(now);
    };

    if (motion) {
      raf = requestAnimationFrame(loop);
    } else {
      renderFrame(startedAt + 2400);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", updateRect);
      window.removeEventListener("resize", updateRect);
      quad.geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [mode, motion, intensity, water, palette]);

  if (!canUseWebGL) {
    return (
      <AuroraFallback className={className} palette={palette} style={style} />
    );
  }

  return (
    <canvas
      aria-hidden="true"
      className={`block h-full w-full ${className}`}
      ref={canvasRef}
      style={style}
    />
  );
};
