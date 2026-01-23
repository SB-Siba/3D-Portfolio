import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../style";
import { navLinks } from "../constants";
import { menu, close } from "../assets";
import profileImage from "../assets/profile/Profile.jpeg";

const Navbar = ({ isScrolledDown }) => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  // Scroll lock effect
  useEffect(() => {
    if (toggle) {
      const scrollY = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [toggle]);

  // Scroll detection with responsive spacing
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation handler
  const handleNavClick = (navTitle) => {
    setToggle(false);
    setActive(navTitle);
  };

  // Animation variants
  const sidebarVariants = {
    closed: {
      x: "100%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    open: {
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: {
      x: 100,
      opacity: 0,
      transition: {
        duration: 0.4,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "backOut",
      },
    },
  };

  const glowVariants = {
    animate: {
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.1, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Icon animations
  const iconAnimations = [
    { emoji: "🚀", hover: { scale: 1.5, rotate: 180 } },
    { emoji: "👨‍💻", hover: { scale: 1.4, rotate: 90 } },
    { emoji: "💼", hover: { scale: 1.3, rotate: -180 } },
    { emoji: "🛠️", hover: { scale: 1.6, rotate: 360 } },
    { emoji: "🌟", hover: { scale: 1.5, rotate: 45 } },
    { emoji: "📞", hover: { scale: 1.4, rotate: -90 } },
  ];

  return (
    <motion.nav
      className={`${styles.paddingX} w-full flex items-center fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/20 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10 border-b border-cyan-500/20 py-2"
          : "bg-transparent py-4"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* LOGO SECTION - Only shows hero image and name when scrolled down */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {isScrolledDown && (
              <motion.div
                key="nav-hero-image"
                layoutId="hero-image"
                initial={{ scale: 0, opacity: 0, rotate: -180 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0, rotate: 180 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="relative w-10 h-10 md:w-12 md:h-12"
              >
                {/* Outer Glow Ring */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 10px rgba(59, 130, 246, 0.3)",
                      "0 0 20px rgba(139, 92, 246, 0.4)",
                      "0 0 10px rgba(59, 130, 246, 0.3)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                {/* Rotating Border */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Image Container */}
                <div className="absolute inset-1 rounded-full bg-slate-900 overflow-hidden z-10">
                  <img
                    src={profileImage}
                    alt="Sibananda Behera"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `
        <div class="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/30 flex items-center justify-center">
          <div class="text-center">
            <div class="text-lg md:text-xl">👨‍💻</div>
          </div>
        </div>
      `;
                    }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Name in a single line */}
          <AnimatePresence mode="wait">
            {isScrolledDown && (
              <motion.div
                key="nav-hero-name"
                layoutId="hero-name"
                initial={{ x: -20, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: -20, opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.4,
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="flex flex-row items-center gap-1"
              >
                <motion.span
                  className="font-bold cursor-pointer bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-base md:text-lg"
                  whileHover={{ scale: 1.05 }}
                >
                  SIBANANDA BEHERA
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show nothing when not scrolled down */}
          {!isScrolledDown && <motion.div className="w-12 h-12" />}
        </motion.div>

        {/* DESKTOP NAV LINKS - Responsive spacing */}
        <motion.ul
          className="list-none hidden md:flex flex-row transition-all duration-300"
          initial="hidden"
          animate="visible"
          style={{ gap: scrolled ? "1.5rem" : "2rem" }}
        >
          {navLinks.map((nav, index) => (
            <motion.li
              key={nav.id}
              className="relative"
              onMouseEnter={() => setHoveredLink(index)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              <a
                href={`#${nav.id}`}
                className={`relative text-[15px] font-medium cursor-pointer transition-all duration-300 flex items-center ${
                  active === nav.title
                    ? "text-cyan-400"
                    : "text-slate-300 hover:text-white"
                }`}
                onClick={() => setActive(nav.title)}
                style={{
                  padding: scrolled ? "0.375rem 0.75rem" : "0.5rem 1rem",
                }}
              >
                {/* Link text with responsive font size */}
                <motion.span
                  animate={{
                    fontSize: scrolled ? "14px" : "16px",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {nav.title}
                </motion.span>

                {/* Animated underline - responsive height */}
                <motion.div
                  className={`absolute bottom-0 left-0 bg-gradient-to-r from-blue-500 to-cyan-500 ${
                    active === nav.title ? "w-full" : "w-0"
                  }`}
                  animate={{
                    height: scrolled ? "2px" : "3px",
                    width:
                      hoveredLink === index
                        ? "100%"
                        : active === nav.title
                          ? "100%"
                          : "0%",
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Hover background effect - responsive opacity */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg -z-10"
                  animate={{
                    opacity: hoveredLink === index ? (scrolled ? 0.8 : 1) : 0,
                    scale: hoveredLink === index ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* MOBILE MENU BUTTON - Responsive */}
        <motion.div className="md:hidden flex flex-1 justify-end items-center">
          <motion.button
            className={`relative flex items-center justify-center bg-slate-900/80 backdrop-blur-xl rounded-xl border transition-all duration-300 group ${
              scrolled
                ? "w-12 h-12 border-cyan-400/20 hover:border-cyan-400/40"
                : "w-14 h-14 border-cyan-400/30 hover:border-cyan-400/60"
            }`}
            onClick={() => setToggle(!toggle)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated border glow - responsive intensity */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500"
              animate={{
                rotate: [0, 360],
                opacity: scrolled ? [0, 0.15, 0] : [0, 0.25, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <AnimatePresence mode="wait">
              {toggle ? (
                <motion.img
                  key="close"
                  src={close}
                  alt="close"
                  className={`z-10 object-contain transition-all duration-300 ${
                    scrolled ? "w-6 h-6" : "w-7 h-7"
                  }`}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              ) : (
                <motion.img
                  key="menu"
                  src={menu}
                  alt="menu"
                  className={`z-10 object-contain transition-all duration-300 ${
                    scrolled ? "w-6 h-6" : "w-7 h-7"
                  }`}
                  initial={{ rotate: 180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -180, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </AnimatePresence>
          </motion.button>

          {/* HOLOGRAPHIC SIDEBAR */}
          <AnimatePresence>
            {toggle && (
              <>
                {/* Backdrop */}
                <motion.div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setToggle(false)}
                />

                {/* Sidebar */}
                <motion.div
                  className="fixed top-0 right-0 h-full w-80 max-w-full bg-slate-900/95 backdrop-blur-2xl border-l border-cyan-400/20 z-50 shadow-2xl shadow-cyan-400/10"
                  variants={sidebarVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl"
                      variants={glowVariants}
                      animate="animate"
                    />
                    <motion.div
                      className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"
                      variants={glowVariants}
                      animate="animate"
                      transition={{ delay: 1 }}
                    />

                    {/* Grid Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent" />
                    </div>
                  </div>

                  {/* Header */}
                  <motion.div
                    className="relative z-10 p-6 border-b border-cyan-400/20"
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="relative w-12 h-12"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {/* Outer Glow Ring */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          animate={{
                            boxShadow: [
                              "0 0 10px rgba(59, 130, 246, 0.3)",
                              "0 0 20px rgba(139, 92, 246, 0.4)",
                              "0 0 10px rgba(59, 130, 246, 0.3)",
                            ],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />

                        {/* Rotating Border */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background:
                              "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)",
                          }}
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />

                        {/* Image Container */}
                        <div className="absolute inset-1 rounded-full bg-slate-900 overflow-hidden z-10">
                          <img
                            src={profileImage}
                            alt="Sibananda Behera"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.parentElement.innerHTML = `
        <div class="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-600/30 flex items-center justify-center">
          <div class="text-lg">👨‍💻</div>
        </div>
      `;
                            }}
                          />
                        </div>
                      </motion.div>
                      <div>
                        <motion.h2
                          className="text-white font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                          whileHover={{ scale: 1.05 }}
                        >
                          SIBANANDA BEHERA
                        </motion.h2>
                        <motion.p
                          className="text-slate-300 text-sm mt-1"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Navigation
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Navigation Links */}
                  <div className="relative z-10 p-6 space-y-3">
                    {navLinks.map((nav, index) => (
                      <motion.div
                        key={nav.id}
                        variants={itemVariants}
                        custom={index}
                        className="relative group"
                        onClick={() => handleNavClick(nav.title)}
                      >
                        <a
                          href={`#${nav.id}`}
                          className={`relative flex items-center gap-4 p-4 rounded-xl cursor-pointer overflow-hidden transition-all duration-300 ${
                            active === nav.title
                              ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/30"
                              : "text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent"
                          }`}
                        >
                          {/* Enhanced Holographic Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100"
                            whileHover={{
                              scale: 1.05,
                              rotate: [0, 1, -1, 0],
                            }}
                            transition={{
                              duration: 0.5,
                              rotate: {
                                duration: 0.3,
                                repeat: 1,
                              },
                            }}
                          />

                          {/* Pulse effect on active */}
                          {active === nav.title && (
                            <motion.div
                              className="absolute inset-0 bg-cyan-400/10 rounded-xl"
                              animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [1, 1.02, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                              }}
                            />
                          )}

                          {/* Animated Icon */}
                          <motion.div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                              active === nav.title
                                ? "bg-cyan-400/20 text-cyan-400"
                                : "bg-slate-700/50 text-slate-300 group-hover:bg-cyan-400/10 group-hover:text-cyan-300"
                            }`}
                            whileHover={iconAnimations[index].hover}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 10,
                            }}
                            animate={{
                              y: active === nav.title ? [0, -2, 0] : 0,
                            }}
                          >
                            {iconAnimations[index].emoji}
                          </motion.div>

                          <span className="font-semibold relative z-10 flex-1">
                            {nav.title}
                          </span>

                          {/* Hover Arrow */}
                          <motion.div
                            className="text-cyan-400 opacity-0 group-hover:opacity-100"
                            initial={{ x: -10 }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            →
                          </motion.div>
                        </a>

                        {/* Enhanced Connection Lines */}
                        {index < navLinks.length - 1 && (
                          <motion.div
                            className="absolute -bottom-1.5 left-12 w-0.5 h-3 bg-gradient-to-b from-cyan-400/40 to-transparent"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Footer */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 p-6 border-t border-cyan-400/20 bg-slate-900/80 backdrop-blur-lg"
                    variants={itemVariants}
                  >
                    <div className="text-center">
                      <motion.p
                        className="text-cyan-400 font-semibold text-lg mb-1"
                        animate={{
                          textShadow: [
                            "0 0 5px rgba(34, 211, 238, 0.5)",
                            "0 0 20px rgba(34, 211, 238, 0.8)",
                            "0 0 5px rgba(34, 211, 238, 0.5)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        SIBANANDA BEHERA
                      </motion.p>
                      <motion.p
                        className="text-cyan-400/60 text-sm"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Full Stack Developer
                      </motion.p>
                      <motion.div className="flex justify-center gap-1 mt-2">
                        {[0, 1, 2].map((dot) => (
                          <motion.div
                            key={dot}
                            className="w-1 h-1 bg-cyan-400 rounded-full"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: dot * 0.2,
                            }}
                          />
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
