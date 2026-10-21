import { useEffect, useRef } from "react";
import * as THREE from "three";

// Port of the-nexus-club's constellation background: a brass-style dot grid
// whose dots spring back after the pointer pushes them, plus expanding
// ripple rings from fast pointer strokes; displaced dots brighten and get
// constellation lines. Retuned for the nexus-website emerald theme.

const DOT_SPACING = 48;
const DOT_BASE_RADIUS = 1.0;
const RIPPLE_MAX_RADIUS = 300;
const RIPPLE_STRENGTH = 6;
const RIPPLE_SPEED = 2.2;
const RIPPLE_DECAY = 0.007;
const MOUSE_INFLUENCE = 170;
const MOUSE_PUSH = 3.5;
const SPRING_K = 0.03;
const DAMPING = 0.9;
// Theme accent (aurora drift c2)
const ACCENT_R = 47;
const ACCENT_G = 233;
const ACCENT_B = 141;

const dotVertexShader = `
  attribute float pointSize;
  attribute float pointAlpha;
  varying float vAlpha;
  void main() {
    vAlpha = pointAlpha;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = pointSize;
  }
`;

const dotFragmentShader = `
  varying float vAlpha;
  uniform vec3 color;
  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    if (length(coord) > 0.5) discard;
    gl_FragColor = vec4(color, vAlpha);
  }
`;

const heavyEffectsOff = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    return true;
  // Touch/pointer-coarse devices: the interaction needs a cursor to be worth it
  return (
    window.matchMedia("(pointer: coarse)").matches &&
    !window.matchMedia("(hover: hover)").matches
  );
};

/**
 * Interactive dotted field. Mount inside a dark section as its background
 * layer (absolute inset-0); it renders nothing on touch/reduced-motion.
 */
export const DotFieldInteraction = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (heavyEffectsOff()) return;
    const container = containerRef.current;
    if (!container) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let dots = [];
    const ripples = [];

    const mouse = { x: -9999, y: -9999 };
    let lastRippleTime = 0;
    let lastMX = -9999;
    let lastMY = -9999;

    let animationFrameId = 0;
    let isVisible = false;
    let initialized = false;

    let scene, camera, renderer, dotsGeometry, linesGeometry;
    let cachedOffset = { left: 0, top: 0 };
    const MAX_LINES = 10000;

    const updateCachedOffset = () => {
      const rect = container.getBoundingClientRect();
      cachedOffset = {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
      };
    };

    const initThree = () => {
      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(0, 1, 0, -1, 0.1, 100);
      camera.position.z = 10;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      container.appendChild(renderer.domElement);

      dotsGeometry = new THREE.BufferGeometry();
      const dotsMaterial = new THREE.ShaderMaterial({
        uniforms: {
          color: {
            value: new THREE.Color(
              ACCENT_R / 255,
              ACCENT_G / 255,
              ACCENT_B / 255,
            ),
          },
        },
        vertexShader: dotVertexShader,
        fragmentShader: dotFragmentShader,
        transparent: true,
        depthWrite: false,
      });
      scene.add(new THREE.Points(dotsGeometry, dotsMaterial));

      linesGeometry = new THREE.BufferGeometry();
      linesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(MAX_LINES * 6), 3),
      );
      linesGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(new Float32Array(MAX_LINES * 8), 4),
      );
      const linesMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        linewidth: 1,
      });
      scene.add(new THREE.LineSegments(linesGeometry, linesMaterial));

      initialized = true;
    };

    const init = () => {
      updateCachedOffset();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      camera.left = 0;
      camera.right = width;
      camera.top = 0;
      camera.bottom = -height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(dpr);

      dots = [];
      const cols = Math.ceil(width / DOT_SPACING) + 2;
      const rows = Math.ceil(height / DOT_SPACING) + 2;
      const offsetX = (width - (cols - 1) * DOT_SPACING) / 2;
      const offsetY = (height - (rows - 1) * DOT_SPACING) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const ox = offsetX + c * DOT_SPACING;
          const oy = offsetY + r * DOT_SPACING;
          dots.push({
            originX: ox,
            originY: oy,
            x: ox,
            y: oy,
            vx: 0,
            vy: 0,
            radius: DOT_BASE_RADIUS,
          });
        }
      }

      dotsGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(dots.length * 3), 3),
      );
      dotsGeometry.setAttribute(
        "pointSize",
        new THREE.BufferAttribute(new Float32Array(dots.length), 1),
      );
      dotsGeometry.setAttribute(
        "pointAlpha",
        new THREE.BufferAttribute(new Float32Array(dots.length), 1),
      );
    };

    const spawnRipple = (x, y) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: RIPPLE_MAX_RADIUS + Math.random() * 100,
        strength: RIPPLE_STRENGTH,
        life: 1,
      });
    };

    const handleInteraction = (clientX, clientY) => {
      mouse.x = clientX - (cachedOffset.left - window.scrollX);
      mouse.y = clientY - (cachedOffset.top - window.scrollY);

      const dx = mouse.x - lastMX;
      const dy = mouse.y - lastMY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const now = performance.now();

      if (
        mouse.x >= 0 &&
        mouse.x <= width &&
        mouse.y >= 0 &&
        mouse.y <= height
      ) {
        if (dist > 45 && now - lastRippleTime > 110) {
          spawnRipple(mouse.x, mouse.y);
          lastRippleTime = now;
          lastMX = mouse.x;
          lastMY = mouse.y;
        }
      } else {
        lastMX = mouse.x;
        lastMY = mouse.y;
      }
    };

    const handlePointerMove = (e) => handleInteraction(e.clientX, e.clientY);
    const handlePointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const update = () => {
      try {
        updateDots();
      } catch (e) {
        window.__dotErr = String((e && e.message) || e);
      }
    };

    const updateDots = () => {
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.radius += RIPPLE_SPEED;
        rp.life -= RIPPLE_DECAY;
        if (rp.life <= 0 || rp.radius > rp.maxRadius) ripples.splice(i, 1);
      }

      const dotPositions = dotsGeometry.attributes.position.array;
      const dotSizes = dotsGeometry.attributes.pointSize.array;
      const dotAlphas = dotsGeometry.attributes.pointAlpha.array;

      const connectDist = DOT_SPACING * 1.8;
      const connectDistSq = connectDist * connectDist;

      const activeIndices = [];
      const displacements = new Array(dots.length);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        let fx = 0;
        let fy = 0;

        const mdx = dot.originX - mouse.x;
        const mdy = dot.originY - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < MOUSE_INFLUENCE && mDist > 0) {
          const t = 1 - mDist / MOUSE_INFLUENCE;
          const force = t * t * MOUSE_PUSH;
          fx += (mdx / mDist) * force;
          fy += (mdy / mDist) * force;
        }

        for (const rp of ripples) {
          const rdx = dot.originX - rp.x;
          const rdy = dot.originY - rp.y;
          const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
          const ringDist = Math.abs(rDist - rp.radius);
          const ringWidth = 50;
          if (ringDist < ringWidth && rDist > 0) {
            const wave = Math.cos((ringDist / ringWidth) * Math.PI * 0.5);
            const intensity = wave * rp.strength * rp.life * rp.life;
            fx += (rdx / rDist) * intensity;
            fy += (rdy / rDist) * intensity;
          }
        }

        dot.vx += (dot.originX + fx - dot.x) * SPRING_K;
        dot.vy += (dot.originY + fy - dot.y) * SPRING_K;
        dot.vx *= DAMPING;
        dot.vy *= DAMPING;
        dot.x += dot.vx;
        dot.y += dot.vy;

        const displacement = Math.sqrt(
          (dot.x - dot.originX) ** 2 + (dot.y - dot.originY) ** 2,
        );
        dot.radius = DOT_BASE_RADIUS + displacement * 0.07;

        displacements[i] = displacement;
        if (displacement >= 1.5) activeIndices.push(i);

        const t = Math.min(displacement / 14, 1);

        dotPositions[i * 3] = dot.x;
        dotPositions[i * 3 + 1] = -dot.y;
        dotPositions[i * 3 + 2] = 0;

        dotSizes[i] = (dot.radius + t * 0.8) * 2 * dpr;
        // Sprightly resting alpha so the grid reads on this page's brighter
        // navy bg; displaced dots light up to ~0.7
        dotAlphas[i] = 0.26 + t * 0.44;
      }

      dotsGeometry.attributes.position.needsUpdate = true;
      dotsGeometry.attributes.pointSize.needsUpdate = true;
      dotsGeometry.attributes.pointAlpha.needsUpdate = true;

      const lPositions = linesGeometry.attributes.position.array;
      const lColors = linesGeometry.attributes.color.array;
      let lineIndex = 0;

      for (let i = 0; i < activeIndices.length; i++) {
        const idxA = activeIndices[i];
        const a = dots[idxA];
        const aDis = displacements[idxA];

        for (let j = i + 1; j < activeIndices.length; j++) {
          const idxB = activeIndices[j];
          const b = dots[idxB];
          const bDis = displacements[idxB];

          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < connectDistSq && lineIndex < MAX_LINES) {
            const dist = Math.sqrt(distSq);
            const strength = 1 - dist / connectDist;
            const avgDis = Math.min((aDis + bDis) / 24, 1);
            const alpha = strength * avgDis * 0.45;

            const vIdx = lineIndex * 6;
            const cIdx = lineIndex * 8;

            lPositions[vIdx] = a.x;
            lPositions[vIdx + 1] = -a.y;
            lPositions[vIdx + 2] = 0;
            lPositions[vIdx + 3] = b.x;
            lPositions[vIdx + 4] = -b.y;
            lPositions[vIdx + 5] = 0;

            lColors[cIdx] = ACCENT_R / 255;
            lColors[cIdx + 1] = ACCENT_G / 255;
            lColors[cIdx + 2] = ACCENT_B / 255;
            lColors[cIdx + 3] = alpha;
            lColors[cIdx + 4] = ACCENT_R / 255;
            lColors[cIdx + 5] = ACCENT_G / 255;
            lColors[cIdx + 6] = ACCENT_B / 255;
            lColors[cIdx + 7] = alpha;

            lineIndex++;
          }
        }
      }

      linesGeometry.setDrawRange(0, lineIndex * 2);
      linesGeometry.attributes.position.needsUpdate = true;
      linesGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    const animate = () => {
      if (!isVisible) return;
      update();
      animationFrameId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!initialized) {
              initThree();
              init();
            }
            if (!isVisible) {
              isVisible = true;
              animate();
            }
          } else {
            isVisible = false;
          }
        });
      },
      { threshold: 0 },
    );
    observer.observe(container);

    window.addEventListener("resize", init);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", init);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
      if (initialized) {
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="nx-dot-field absolute inset-0 z-0 h-full w-full pointer-events-none [transform:translateZ(0)] will-change-transform [&>canvas]:!h-full [&>canvas]:!w-full"
    />
  );
};
