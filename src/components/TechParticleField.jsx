/* eslint-disable no-undef */
import { useEffect, useRef } from "react";
import * as THREE from "three";

export const TechParticleField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 50;

    // Digital particles - menggunakan brand colors
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 120;
      posArray[i + 1] = (Math.random() - 0.5) * 120;
      posArray[i + 2] = (Math.random() - 0.5) * 100;

      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        // Cyber Cyan - #06b6d4
        colorsArray[i] = 0.02;
        colorsArray[i + 1] = 0.71;
        colorsArray[i + 2] = 0.83;
      } else if (colorChoice < 0.66) {
        // Tech Green - #10b981
        colorsArray[i] = 0.06;
        colorsArray[i + 1] = 0.73;
        colorsArray[i + 2] = 0.51;
      } else {
        // Brand Blue - #3b82f6
        colorsArray[i] = 0.23;
        colorsArray[i + 1] = 0.51;
        colorsArray[i + 2] = 0.96;
      }
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );
    particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorsArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Network lines - Tech Green
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.15,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];

    for (let i = 0; i < 100; i++) {
      const x1 = (Math.random() - 0.5) * 100;
      const y1 = (Math.random() - 0.5) * 100;
      const z1 = (Math.random() - 0.5) * 50;
      const x2 = x1 + (Math.random() - 0.5) * 20;
      const y2 = y1 + (Math.random() - 0.5) * 20;
      const z2 = z1 + (Math.random() - 0.5) * 20;

      linePositions.push(x1, y1, z1, x2, y2, z2);
    }

    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // AI Brain - Tech Green
    const brainGeometry = new THREE.TorusKnotGeometry(3, 1, 100, 16);
    const brainMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const aiBrain = new THREE.Mesh(brainGeometry, brainMaterial);
    aiBrain.position.set(-30, 20, -20);
    scene.add(aiBrain);

    // Cybersecurity Shield - Cyber Cyan
    const shieldGeometry = new THREE.OctahedronGeometry(4, 0);
    const shieldMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const cyberShield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    cyberShield.position.set(30, -15, -15);
    scene.add(cyberShield);

    // Enterprise Network - Brand Blue
    const cubeGeometry = new THREE.BoxGeometry(3, 3, 3);
    const cubeMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const enterpriseCube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    enterpriseCube.position.set(0, -25, -10);
    scene.add(enterpriseCube);

    // Data streams - Teal
    const rings = [];
    for (let i = 0; i < 6; i++) {
      const ringGeometry = new THREE.TorusGeometry(2, 0.3, 16, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x14b8a6 : 0x06b6d4,
        wireframe: true,
        transparent: true,
        opacity: 0.15,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 30
      );
      ring.userData = {
        floatSpeed: Math.random() * 0.02 + 0.01,
        initialY: ring.position.y,
      };
      scene.add(ring);
      rings.push(ring);
    }

    let mouseX = 0;
    let mouseY = 0;
    let scrollPosition = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollPosition = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const animate = () => {
      requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x = mouseY * 0.05;
      particlesMesh.position.y = scrollPosition * -0.015;

      const positions = particlesMesh.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin((scrollPosition + i) * 0.002) * 0.03;
        positions[i] += Math.cos(time * 0.5 + i) * 0.01;
      }
      particlesMesh.geometry.attributes.position.needsUpdate = true;

      lines.rotation.y += 0.001;
      lines.rotation.x = scrollPosition * 0.0005;

      aiBrain.rotation.x += 0.01;
      aiBrain.rotation.y += 0.015;
      const brainScale = 1 + Math.sin(time * 2) * 0.2;
      aiBrain.scale.set(brainScale, brainScale, brainScale);
      aiBrain.position.y += Math.sin(time) * 0.02;

      cyberShield.rotation.x += 0.015;
      cyberShield.rotation.y += 0.012;
      cyberShield.rotation.z += 0.018;
      const shieldScale = 1 + Math.sin(time * 3) * 0.15;
      cyberShield.scale.set(shieldScale, shieldScale, shieldScale);

      enterpriseCube.rotation.x += 0.012;
      enterpriseCube.rotation.y += 0.012;
      enterpriseCube.position.y += Math.cos(time * 0.8) * 0.015;

      rings.forEach((ring, idx) => {
        ring.position.y =
          ring.userData.initialY +
          Math.sin(time * ring.userData.floatSpeed + idx) * 8;
        ring.rotation.z += 0.02;
        ring.rotation.x += 0.01;
        ring.position.z = Math.sin(scrollPosition * 0.005 + idx) * 5;
      });

      camera.position.x = mouseX * 8;
      camera.position.y = mouseY * 8;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};
