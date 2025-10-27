/* eslint-disable no-undef */
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

// AnimatedSection Component
const AnimatedSection = ({ id, children }) => {
  return (
    <section id={id} className="relative">
      {children}
    </section>
  );
};

// Three.js Background Component
const ThreeBackground = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 3000;
    const posArray = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position
      posArray[i] = (Math.random() - 0.5) * 15;
      posArray[i + 1] = (Math.random() - 0.5) * 15;
      posArray[i + 2] = (Math.random() - 0.5) * 15;

      // Colors - Emerald, Cyan, Blue mix
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i] = 0.06;
        colors[i + 1] = 0.73;
        colors[i + 2] = 0.51; // Emerald
      } else if (colorChoice < 0.66) {
        colors[i] = 0.0;
        colors[i + 1] = 0.71;
        colors[i + 2] = 0.83; // Cyan
      } else {
        colors[i] = 0.25;
        colors[i + 1] = 0.51;
        colors[i + 2] = 0.96; // Blue
      }
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colors, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.015,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    particlesRef.current = particlesMesh;
    scene.add(particlesMesh);

    // Network Lines
    const linesGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    const lineColors = [];

    for (let i = 0; i < 50; i++) {
      const x1 = (Math.random() - 0.5) * 10;
      const y1 = (Math.random() - 0.5) * 10;
      const z1 = (Math.random() - 0.5) * 10;

      const x2 = x1 + (Math.random() - 0.5) * 2;
      const y2 = y1 + (Math.random() - 0.5) * 2;
      const z2 = z1 + (Math.random() - 0.5) * 2;

      linePositions.push(x1, y1, z1, x2, y2, z2);

      // Emerald color for lines
      lineColors.push(0.06, 0.73, 0.51, 0.06, 0.73, 0.51);
    }

    linesGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    linesGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(lineColors, 3)
    );

    const linesMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(linesMesh);

    // Create 3 Globes for each tech category
    const createGlobe = (position, color) => {
      const globeGroup = new THREE.Group();

      // Main sphere
      const geometry = new THREE.SphereGeometry(0.5, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.3,
        wireframe: true,
      });
      const sphere = new THREE.Mesh(geometry, material);
      globeGroup.add(sphere);

      // Orbiting particles
      for (let i = 0; i < 8; i++) {
        const particleGeometry = new THREE.SphereGeometry(0.03, 8, 8);
        const particleMaterial = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.8,
        });
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);

        const angle = (i / 8) * Math.PI * 2;
        particle.position.x = Math.cos(angle) * 0.7;
        particle.position.z = Math.sin(angle) * 0.7;
        particle.userData.angle = angle;
        particle.userData.radius = 0.7;

        globeGroup.add(particle);
      }

      globeGroup.position.set(...position);
      return globeGroup;
    };

    // AI Globe (Emerald)
    const aiGlobe = createGlobe([-4, 2, -2], 0x10b981);
    scene.add(aiGlobe);

    // Cybersecurity Globe (Cyan)
    const cyberGlobe = createGlobe([4, 2, -2], 0x06b6d4);
    scene.add(cyberGlobe);

    // Enterprise Globe (Blue)
    const enterpriseGlobe = createGlobe([0, -2, -3], 0x3b82f6);
    scene.add(enterpriseGlobe);

    // Mouse move effect
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;

      // Rotate particles
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0005;
        particlesRef.current.rotation.x += 0.0002;
      }

      // Rotate lines
      linesMesh.rotation.y += 0.0003;
      linesMesh.rotation.x += 0.0001;

      // Animate globes
      [aiGlobe, cyberGlobe, enterpriseGlobe].forEach((globe, index) => {
        globe.rotation.y += 0.005 + index * 0.001;

        // Orbiting particles
        globe.children.forEach((child, i) => {
          if (i > 0) {
            // Skip the main sphere
            const angle = child.userData.angle + time * (1 + index * 0.5);
            child.position.x = Math.cos(angle) * child.userData.radius;
            child.position.z = Math.sin(angle) * child.userData.radius;
          }
        });

        // Floating animation
        globe.position.y += Math.sin(time * 2 + index) * 0.001;
      });

      // Camera movement based on mouse
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 pointer-events-none" />
  );
};

export const Hero = ({ scrollToSection }) => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Connecting Innovation Across the Asia-Pacific";

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const techItems = [
    {
      icon: "🤖",
      text: "Artificial Intelligence",
      gradient: "from-emerald-400 to-green-600",
    },
    {
      icon: "🔐",
      text: "Cybersecurity",
      gradient: "from-cyan-400 to-blue-600",
    },
    {
      icon: "💼",
      text: "Enterprise Tech",
      gradient: "from-blue-400 to-indigo-600",
    },
  ];

  return (
    <AnimatedSection id="hero">
      <div className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900">
        {/* Three.js Background */}
        <ThreeBackground />

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          {/* Logo */}
          <div className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-emerald-400 blur-3xl opacity-30 animate-pulse" />
            <div className="relative">
              <div className="w-60 h-60 mx-auto relative">
                <div className="absolute inset-0 border-4 border-emerald-400/30 rounded-full animate-spin-slow" />
                <div className="absolute inset-4 border-4 border-cyan-400/20 rounded-full animate-spin-reverse" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="/brand-logo/nexus-green.svg"
                    alt="Nexus Logo"
                    className="w-40 h-40 mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Typewriter Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-12 font-light text-gray-100 min-h-[4rem]">
            <span className="inline-block">
              {typedText}
              <span className="animate-blink ml-1 text-emerald-400">|</span>
            </span>
          </h2>

          {/* Tech Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 px-4">
            {techItems.map((item, idx) => (
              <div
                key={idx}
                className="group relative"
                style={{
                  animationDelay: `${idx * 0.2}s`,
                  animation: "slideUp 0.6s ease-out forwards",
                  opacity: 0,
                }}>
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500`}
                />

                <div className="relative bg-gray-900/90 backdrop-blur-xl border border-emerald-400/20 rounded-2xl p-6 hover:border-emerald-400/60 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                    {item.icon}
                  </div>

                  <h3
                    className={`text-xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-2`}>
                    {item.text}
                  </h3>

                  <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="relative inline-block group">
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition duration-500 animate-pulse" />

            <button
              onClick={() => scrollToSection("why")}
              className="relative bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 px-10 py-5 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-110">
              <span className="relative z-10 flex items-center gap-3">
                Discover More
                <svg
                  className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Scroll Indicator */}
          {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-emerald-400/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-scroll" />
            </div>
          </div> */}
        </div>

        <style>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes spin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }

          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scroll {
            0% { opacity: 0; transform: translateY(0); }
            50% { opacity: 1; }
            100% { opacity: 0; transform: translateY(20px); }
          }

          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }

          .animate-spin-reverse {
            animation: spin-reverse 6s linear infinite;
          }

          .animate-blink {
            animation: blink 1s step-end infinite;
          }

          .animate-scroll {
            animation: scroll 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    </AnimatedSection>
  );
};
