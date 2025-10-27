import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useState } from "react";

export const TiltCard = ({ item }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // motion values normalized 0–1
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // spring untuk efek halus
  const springX = useSpring(mouseX, { stiffness: 200, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 20 });

  // map posisi kursor → rotasi (-15°..15°)
  const rotateX = useTransform(springY, [0, 1], [15, -15]);
  const rotateY = useTransform(springX, [0, 1], [-15, 15]);

  // glare radial mengikuti mouse
  const glare = useMotionTemplate`
    radial-gradient(240px 240px at ${useTransform(
      springX,
      (v) => `${v * 100}%`
    )}
    ${useTransform(springY, (v) => `${v * 100}%`)},
      rgba(255,255,255,0.25),
      rgba(255,255,255,0) 60%)
  `;

  // posisi mouse relatif terhadap elemen
  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  // reset ke tengah saat keluar
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="group relative" style={{ perspective: 1000 }}>
      {/* Glow border luar */}
      <div
        className={`pointer-events-none absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500`}
      />

      {/* Card utama */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transformPerspective: 1000,
          rotateX,
          rotateY,
        }}
        whileHover={{ scale: 1.05, y: -6 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className="relative bg-gray-900/90 backdrop-blur-xl border border-emerald-400/20 rounded-2xl p-6 hover:border-emerald-400/60 will-change-transform">
        {/* Icon */}
        <div className="text-6xl mb-4 text-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
          <img
            src={item.icon}
            alt={item.text}
            className="w-40 h-w-40 object-contain mx-auto"
          />
        </div>

        {/* Text */}
        <h3
          className={`text-xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-2`}>
          {item.text}
        </h3>

        {/* Line animasi */}
        <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-500 rounded-full" />

        {/* Glare — hanya muncul saat hover */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-screen transition-opacity duration-500"
          style={{
            background: glare,
            transform: "translateZ(40px)",
          }}
          animate={{ opacity: isHovered ? 0.9 : 0 }}
        />
      </motion.div>
    </div>
  );
};
