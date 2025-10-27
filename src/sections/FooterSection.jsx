/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { Linkedin, Instagram, Phone, Youtube, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

import {
  BRAND_LOGO,
  EMAIL,
  MAILTO_URL,
  MENU_ITEMS,
  PHONE_WHATSAPP,
  WHATSAPP_MESSAGE,
} from "../constants";

const ThreeFooterBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Wave particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1200;
    const posArray = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 10;
      posArray[i + 1] = (Math.random() - 0.5) * 3;
      posArray[i + 2] = (Math.random() - 0.5) * 10;

      // Tech green colors
      colors[i] = 0.06 + Math.random() * 0.2;
      colors[i + 1] = 0.73 + Math.random() * 0.1;
      colors[i + 2] = 0.51 + Math.random() * 0.2;
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
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Animated grid
    const gridSize = 20;
    const gridGeometry = new THREE.PlaneGeometry(10, 10, gridSize, gridSize);
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const grid = new THREE.Mesh(gridGeometry, gridMaterial);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -1;
    scene.add(grid);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      const positions = particlesGeometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] = Math.sin(positions[i - 1] * 0.5 + time) * 0.5;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      const gridPositions = gridGeometry.attributes.position.array;
      for (let i = 0; i < gridPositions.length; i += 3) {
        const x = gridPositions[i];
        const y = gridPositions[i + 1];
        gridPositions[i + 2] =
          Math.sin(x * 0.5 + time) * 0.3 + Math.cos(y * 0.5 + time) * 0.3;
      }
      gridGeometry.attributes.position.needsUpdate = true;

      particlesMesh.rotation.y += 0.0005;
      grid.rotation.z += 0.0003;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none" ref={mountRef} />
  );
};

const SocialLink = ({ icon: Icon, href, label }) => {
  return (
    <motion.a
      aria-label={label}
      className="group relative w-12 h-12 flex items-center justify-center rounded-xl bg-blue-900/50 border-2 border-emerald-400/20 hover:border-emerald-400 backdrop-blur-sm"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      whileHover={{ scale: 1.15, y: -2 }}
      whileTap={{ scale: 0.95 }}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/30 to-emerald-400/0 rounded-xl opacity-0"
        transition={{ duration: 0.3 }}
        whileHover={{ opacity: 1 }}
      />

      <Icon className="relative h-5 w-5 text-gray-400 group-hover:text-emerald-400 transition-colors duration-300" />

      <motion.div
        className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-blue-900 border-2 border-emerald-400/50 rounded-lg text-xs text-emerald-400 whitespace-nowrap pointer-events-none opacity-0"
        transition={{ duration: 0.2 }}
        whileHover={{ opacity: 1, y: -4 }}>
        {label}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-900 border-r-2 border-b-2 border-emerald-400/50 rotate-45" />
      </motion.div>
    </motion.a>
  );
};

const FooterLink = ({ href, children }) => {
  // If href starts with #, scroll smoothly to the section
  const handleClick = (e) => {
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  return (
    <motion.a
      className="group relative inline-block text-gray-400 hover:text-emerald-400 transition-colors duration-300"
      href={href}
      onClick={handleClick}
      whileHover={{ x: 4 }}>
      <span className="relative">
        {children}
        <motion.span
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400"
          initial={{ width: 0 }}
          transition={{ duration: 0.3 }}
          whileHover={{ width: "100%" }}
        />
      </span>
    </motion.a>
  );
};

export const FooterSection = () => {
  const [currentYear] = useState(new Date().getFullYear());

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/company/teh-group/",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/the_tehgroup/",
      label: "Instagram",
    },
    {
      icon: Phone,
      href: "https://wa.me/1234567890",
      label: "WhatsApp",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/user/InnoXcell",
      label: "YouTube",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black border-t border-emerald-400/20 overflow-hidden">
      <div className="absolute inset-0 h-full">
        <ThreeFooterBackground />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}>
            <motion.div
              className="mb-6"
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}>
              <h3 className="text-3xl font-bold mb-2">
                <div className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  <img className="h-6 w-auto" src={BRAND_LOGO} />
                </div>
              </h3>
            </motion.div>

            <p className="text-gray-400 mb-6 leading-relaxed">
              Connecting innovation leaders across Asia-Pacific. Join us for the
              most transformative tech summit of 2026.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  key={idx}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, scale: 1 }}>
                  <SocialLink {...social} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}>
            <h3 className="text-emerald-400 font-bold mb-6 text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {MENU_ITEMS.map((link, idx) => (
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  key={idx}
                  transition={{ delay: 0.1 * idx, duration: 0.4 }}
                  viewport={{ once: true }}
                  whileInView={{ opacity: 1, x: 0 }}>
                  <FooterLink
                    href={link.id.startsWith("#") ? link.id : `#${link.id}`}>
                    {link.name}
                  </FooterLink>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}>
            <h3 className="text-cyan-400 font-bold mb-6 text-lg">
              Get In Touch
            </h3>
            <div className="space-y-4">
              <motion.a
                className="flex items-start gap-3 text-gray-400"
                href={`https://api.whatsapp.com/send?phone=${PHONE_WHATSAPP}&text=${WHATSAPP_MESSAGE}`}
                rel="noopener noreferrer"
                target="_blank"
                transition={{ duration: 0.2 }}
                whileHover={{ x: 4 }}>
                <Phone className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm">Call us</p>
                  <p className="text-white">{PHONE_WHATSAPP}</p>
                </div>
              </motion.a>

              <motion.div
                className="flex items-start gap-3 text-gray-400"
                transition={{ duration: 0.2 }}
                whileHover={{ x: 4 }}>
                <svg
                  className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
                <div>
                  <p className="text-sm">Email us</p>
                  <p
                    className="text-white cursor-pointer"
                    onClick={() => (window.location.href = MAILTO_URL)}>
                    {EMAIL}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t-2 border-emerald-400/20"
          initial={{ opacity: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} NEXUS by TEH Group. All rights reserved.
            </p>

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <span>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                className="text-red-500"
                transition={{ duration: 1, repeat: Infinity }}>
                ❤️
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        animate={{ opacity: 1, y: 0 }}
        aria-label="Scroll to top"
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center shadow-xl z-50 group"
        initial={{ opacity: 0, y: 20 }}
        onClick={scrollToTop}
        transition={{ delay: 1 }}
        whileHover={{
          scale: 1.15,
          boxShadow: "0 0 40px rgba(16, 185, 129, 0.6)",
        }}
        whileTap={{ scale: 0.9 }}>
        <ArrowUp className="h-6 w-6 text-blue-950" />

        <motion.span
          className="absolute inset-0 rounded-full bg-emerald-400"
          initial={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          whileHover={{ opacity: 0.3, scale: 1.5 }}
        />
      </motion.button>
    </footer>
  );
};
