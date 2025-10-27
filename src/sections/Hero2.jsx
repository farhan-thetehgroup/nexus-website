/* eslint-disable no-undef */
import { useState, useEffect } from "react";

// AnimatedSection Component
const AnimatedSection = ({ id, children }) => {
  return (
    <section className="relative" id={id}>
      {children}
    </section>
  );
};

// Tech Pattern Particles Component
const TechParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Binary Code Rain */}
      {[...Array(15)].map((_, i) => (
        <div
          className="absolute text-emerald-400/20 font-mono text-xs animate-binary-fall"
          key={`binary-${i}`}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
          }}>
          {Math.random() > 0.5 ? "1010" : "0101"}
        </div>
      ))}

      {/* Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        {[...Array(8)].map((_, i) => (
          <g key={`circuit-${i}`}>
            <line
              className="animate-pulse"
              stroke="rgb(16, 185, 129)"
              strokeWidth="1"
              style={{ animationDelay: `${i * 0.5}s` }}
              x1={Math.random() * 100 + "%"}
              x2={Math.random() * 100 + "%"}
              y1={Math.random() * 100 + "%"}
              y2={Math.random() * 100 + "%"}
            />
          </g>
        ))}
      </svg>

      {/* Floating Tech Icons */}
      <div className="absolute top-20 left-10 animate-float-slow">
        <div className="text-emerald-400/30 text-4xl">⚡</div>
      </div>
      <div
        className="absolute top-40 right-20 animate-float-slower"
        style={{ animationDelay: "2s" }}>
        <div className="text-cyan-400/30 text-3xl">🔒</div>
      </div>
      <div
        className="absolute bottom-40 left-20 animate-float-slow"
        style={{ animationDelay: "1s" }}>
        <div className="text-blue-400/30 text-3xl">💻</div>
      </div>
      <div
        className="absolute bottom-20 right-40 animate-float-slower"
        style={{ animationDelay: "3s" }}>
        <div className="text-emerald-400/30 text-4xl">🌐</div>
      </div>

      {/* Network Nodes */}
      {[...Array(20)].map((_, i) => (
        <div
          className="absolute w-2 h-2 bg-emerald-400 rounded-full animate-pulse-glow"
          key={`node-${i}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
        />
      ))}
    </div>
  );
};

// Animated Globe Component
const AnimatedGlobe = ({ type = "ai" }) => {
  const getGlobeTheme = () => {
    switch (type) {
      case "ai":
        return {
          color: "emerald",
          gradient: "from-emerald-400 to-green-500",
          icon: "🤖",
          label: "AI",
        };
      case "cyber":
        return {
          color: "cyan",
          gradient: "from-cyan-400 to-blue-500",
          icon: "🔐",
          label: "Security",
        };
      case "enterprise":
        return {
          color: "blue",
          gradient: "from-blue-400 to-indigo-500",
          icon: "💼",
          label: "Enterprise",
        };
      default:
        return {
          color: "emerald",
          gradient: "from-emerald-400 to-green-500",
          icon: "🌐",
          label: "Tech",
        };
    }
  };

  const theme = getGlobeTheme();

  return (
    <div className="relative w-32 h-32 group">
      {/* Outer Ring */}
      <div
        className={`absolute inset-0 rounded-full border-2 border-${theme.color}-400/30 animate-spin-slow`}
      />

      {/* Middle Ring */}
      <div
        className={`absolute inset-2 rounded-full border-2 border-${theme.color}-400/20 animate-spin-reverse`}
      />

      {/* Inner Globe */}
      <div
        className={`absolute inset-4 rounded-full bg-gradient-to-br ${theme.gradient} opacity-20 animate-pulse-slow`}
      />

      {/* Center Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-4xl transform group-hover:scale-125 transition-transform duration-500 group-hover:rotate-12">
          {theme.icon}
        </div>
      </div>

      {/* Orbiting Particles */}
      {[0, 90, 180, 270].map((angle, i) => (
        <div
          className={`absolute top-1/2 left-1/2 w-2 h-2 bg-${theme.color}-400 rounded-full`}
          key={i}
          style={{
            animation: `orbit-globe 4s linear infinite`,
            animationDelay: `${i * 0.25}s`,
            transformOrigin: "0 0",
          }}
        />
      ))}

      {/* Glow Effect */}
      <div
        className={`absolute inset-0 rounded-full bg-${theme.color}-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Label */}
      <div
        className={`absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-${theme.color}-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
        {theme.label}
      </div>
    </div>
  );
};

// Grid Background Component
const GridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
        `,
          backgroundSize: "50px 50px",
          animation: "gridMove 20s linear infinite",
        }}
      />
    </div>
  );
};

// Glowing Orb Component
const GlowingOrb = ({ delay = 0 }) => {
  return (
    <div
      className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
      style={{
        background:
          "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)",
        animationDelay: `${delay}s`,
        animationDuration: "4s",
      }}
    />
  );
};

export const Hero = ({ scrollToSection }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "Connecting Innovation Across the Asia-Pacific";

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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
      color: "emerald",
      gradient: "from-emerald-400 to-green-600",
      globeType: "ai",
    },
    {
      icon: "🔐",
      text: "Cybersecurity",
      color: "cyan",
      gradient: "from-cyan-400 to-blue-600",
      globeType: "cyber",
    },
    {
      icon: "💼",
      text: "Enterprise Tech",
      color: "blue",
      gradient: "from-blue-400 to-indigo-600",
      globeType: "enterprise",
    },
  ];

  return (
    <AnimatedSection id="hero">
      <div className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900">
        {/* Animated Background Elements */}
        <GridBackground />
        <TechParticles />

        {/* Glowing Orbs */}
        <GlowingOrb delay={0} />
        <div className="absolute top-1/4 right-1/4 transform translate-x-1/2">
          <GlowingOrb delay={2} />
        </div>
        <div className="absolute bottom-1/4 left-1/4">
          <GlowingOrb delay={1} />
        </div>

        {/* Floating Globes */}
        <div className="absolute top-20 left-10 animate-float-slow opacity-50">
          <AnimatedGlobe type="ai" />
        </div>
        <div
          className="absolute top-40 right-10 animate-float-slower opacity-50"
          style={{ animationDelay: "2s" }}>
          <AnimatedGlobe type="cyber" />
        </div>
        <div
          className="absolute bottom-32 left-20 animate-float-slow opacity-50"
          style={{ animationDelay: "1s" }}>
          <AnimatedGlobe type="enterprise" />
        </div>

        {/* Main Content */}
        <div
          className="relative z-10 text-center max-w-6xl mx-auto"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}>
          {/* Logo with Advanced Animation */}
          <div className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-emerald-400 blur-3xl opacity-30 animate-pulse" />
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              <div className="w-60 h-60 mx-auto relative">
                {/* Rotating Ring */}
                <div className="absolute inset-0 border-4 border-emerald-400/30 rounded-full animate-spin-slow" />
                <div className="absolute inset-4 border-4 border-cyan-400/20 rounded-full animate-spin-reverse" />

                {/* Logo Container */}
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${
                    isHovered ? "scale-110 rotate-12" : "scale-100"
                  }`}>
                  <div className="text-8xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    <img
                      alt="Nexus Logo"
                      className="w-40 h-40 mx-auto"
                      src="/brand-logo/nexus-green.svg"
                    />
                  </div>
                </div>

                {/* Orbiting Dots */}
                {[0, 120, 240].map((angle, i) => (
                  <div
                    className="absolute top-1/2 left-1/2 w-3 h-3 bg-emerald-400 rounded-full"
                    key={i}
                    style={{
                      animation: `orbit 3s linear infinite`,
                      animationDelay: `${i * 1}s`,
                      transformOrigin: "0 0",
                    }}
                  />
                ))}
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

          {/* Tech Cards with 3D Effect */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 px-4">
            {techItems.map((item, idx) => (
              <div
                className="group relative"
                key={idx}
                style={{
                  animationDelay: `${idx * 0.2}s`,
                  animation: "slideUp 0.6s ease-out forwards",
                  opacity: 0,
                }}>
                {/* Card Glow */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500`}
                />

                {/* Card Content */}
                <div className="relative bg-gray-900/90 backdrop-blur-xl border border-emerald-400/20 rounded-2xl p-6 hover:border-emerald-400/60 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                  {/* Animated Globe inside card */}
                  <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-500">
                    <div className="scale-75">
                      <AnimatedGlobe type={item.globeType} />
                    </div>
                  </div>

                  {/* Text */}
                  <h3
                    className={`text-xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent mb-2`}>
                    {item.text}
                  </h3>

                  {/* Animated Line */}
                  <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-500 rounded-full" />

                  {/* Data Stream Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden rounded-2xl">
                    {[...Array(3)].map((_, i) => (
                      <div
                        className="absolute h-px w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-data-stream"
                        key={i}
                        style={{
                          top: `${20 + i * 30}%`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button with Advanced Effects */}
          <div className="relative inline-block group">
            {/* Button Glow Ring */}
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full blur-lg opacity-50 group-hover:opacity-100 transition duration-500 animate-pulse" />

            {/* Main Button */}
            <button
              className="relative bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 px-10 py-5 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-110 group"
              onClick={() => scrollToSection("why")}>
              <span className="relative z-10 flex items-center gap-3">
                Discover More
                <svg
                  className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </span>

              {/* Ripple Effect */}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:animate-ping bg-emerald-400/50" />
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-emerald-400/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-scroll" />
            </div>
          </div>
        </div>

        <style>{`
          @keyframes binary-fall {
            0% { transform: translateY(-100vh); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(100vh); opacity: 0; }
          }

          @keyframes float-slow {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-20px) translateX(10px); }
          }

          @keyframes float-slower {
            0%, 100% { transform: translateY(0) translateX(0); }
            50% { transform: translateY(-30px) translateX(-15px); }
          }

          @keyframes pulse-glow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.5); }
          }

          @keyframes orbit-globe {
            from { transform: rotate(0deg) translateX(60px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
          }

          @keyframes data-stream {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }

          @keyframes gridMove {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }

          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes spin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }

          @keyframes orbit {
            from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
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

          @keyframes pulse-slow {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.1); }
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

          .animate-binary-fall {
            animation: binary-fall 12s linear infinite;
          }

          .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite;
          }

          .animate-float-slower {
            animation: float-slower 8s ease-in-out infinite;
          }

          .animate-pulse-glow {
            animation: pulse-glow 3s ease-in-out infinite;
          }

          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }

          .animate-data-stream {
            animation: data-stream 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    </AnimatedSection>
  );
};
