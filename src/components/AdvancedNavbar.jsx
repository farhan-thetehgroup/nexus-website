/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import { useState, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

import { BRAND_LOGO_WHITE, MENU_ITEMS } from "../constants";

export const AdvancedNavbar = ({ scrollToSection }) => {
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, [0, 300], [0, 1]);
  const navBackground = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgba(30, 58, 138, 0)", "rgba(30, 58, 138, 0)"]
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // IntersectionObserver untuk update activeSection
    const sectionIds = MENU_ITEMS.map((item) => item.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    let ticking = false;
    const handleSectionScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          let current = "hero";
          for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const rect = section.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom > 120) {
              current = section.id;
              break;
            }
          }
          setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleSectionScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleSectionScroll);
    };
  }, [MENU_ITEMS]);

  const handleNavClick = (id) => {
    scrollToSection(id);
    setIsMenuOpen(false);
    setActiveSection(id);
  };

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 backdrop-blur-xl border-b transition-all duration-500 ${
          scrolled ?
            "border-emerald-400/20 shadow-lg shadow-emerald-500/10"
          : "border-transparent"
        }`}
        style={{ backgroundColor: navBackground }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section with Advanced Animation */}
            <div
              className="flex items-center space-x-3 group cursor-pointer"
              onClick={() => handleNavClick("hero")}>
              {/* Animated Border */}
              <div className="absolute left-4 w-16 h-16 border-2 border-emerald-400/30 rounded-full animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Logo Container */}
              <div className="relative z-10">
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Logo */}
                  <div className="relative flex items-center space-x-3 transform group-hover:scale-105 transition-transform duration-300">
                    {/* Icon Placeholder - ganti dengan logo Anda */}
                    <div className="block">
                      <img
                        alt="Nexus Logo"
                        className="w-32 h-w-32 sm:w-44 sm:h-44"
                        src={BRAND_LOGO_WHITE}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {MENU_ITEMS.map((item, idx) => (
                <div
                  className="relative"
                  key={item.id}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}>
                  <button
                    className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeSection === item.id ?
                        "text-emerald-400"
                      : "text-gray-300 hover:text-white"
                    }`}
                    onClick={() => handleNavClick(item.id)}
                    style={{
                      animationDelay: `${idx * 0.1}s`,
                    }}>
                    {/* Hover Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        activeSection === item.id ? "opacity-100" : ""
                      }`}
                    />

                    {/* Active Indicator */}
                    {activeSection === item.id && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full" />
                    )}

                    {/* Text with Icon */}
                    <span className="relative flex items-center gap-2">
                      {item.name}
                    </span>

                    {/* Hover Glow */}
                    <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md bg-emerald-400/20" />
                  </button>
                </div>
              ))}
            </div>

            {/* CTA Button - Desktop */}
            <div className="hidden lg:block">
              <button
                className="group relative px-6 py-2.5 rounded-full font-semibold text-sm overflow-hidden"
                onClick={() => handleNavClick("contact")}>
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shine" />
                </div>

                {/* Button Text */}
                <span className="relative flex items-center gap-2 text-gray-900">
                  Join Us
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-lg border border-emerald-400/30 hover:border-emerald-400 hover:bg-emerald-400/10 transition-all group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <div className="relative w-6 h-6">
                {isMenuOpen ?
                  <X className="w-6 h-6 text-emerald-400 transform rotate-90 transition-transform duration-300" />
                : <Menu className="w-6 h-6 text-emerald-400 transform group-hover:scale-110 transition-transform duration-300" />
                }
              </div>

              {/* Ping Effect */}
              {!isMenuOpen && (
                <span className="absolute inset-0 rounded-lg border-2 border-emerald-400 animate-ping opacity-20" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}>
          <div className="px-4 py-6 bg-gradient-to-b from-gray-900 to-gray-800 border-t border-emerald-400/20">
            <div className="space-y-2">
              {MENU_ITEMS.map((item, idx) => (
                <button
                  className={`group w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeSection === item.id ?
                      "bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30"
                    : "hover:bg-gray-800 border border-transparent"
                  }`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    animationDelay: `${idx * 0.05}s`,
                    animation:
                      isMenuOpen ?
                        "slideInRight 0.3s ease-out forwards"
                      : "none",
                  }}>
                  <span className="flex items-center gap-3">
                    <span className="text-2xl transform group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <span
                      className={`font-medium ${
                        activeSection === item.id ?
                          "text-emerald-400"
                        : "text-gray-300"
                      }`}>
                      {item.name}
                    </span>
                  </span>

                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      activeSection === item.id ?
                        "rotate-180 text-emerald-400"
                      : ""
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <button
                className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 rounded-lg font-semibold text-gray-900 flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50"
                onClick={() => handleNavClick("contact")}>
                Join Us
                <svg
                  className="w-5 h-5"
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
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes shine {
          from { transform: translateX(-100%) skewX(-12deg); }
          to { transform: translateX(200%) skewX(-12deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        .animate-shine {
          animation: shine 2s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};
