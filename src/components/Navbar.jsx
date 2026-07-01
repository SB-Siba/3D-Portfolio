import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { styles } from "../style";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
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

      let currentSection = "";
      navLinks.forEach((nav) => {
        const section = document.getElementById(nav.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = nav.title;
          }
        }
      });
      setActive(currentSection);
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
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    closed: {
      x: 100,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
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

  // Icon animations - smaller icons for sidebar
  const iconAnimations = [
    { emoji: "🚀", hover: { scale: 1.4, rotate: 180 } },
    { emoji: "👨‍💻", hover: { scale: 1.3, rotate: 90 } },
    { emoji: "💼", hover: { scale: 1.3, rotate: -180 } },
    { emoji: "🛠️", hover: { scale: 1.4, rotate: 360 } },
    { emoji: "🌟", hover: { scale: 1.3, rotate: 45 } },
    { emoji: "📞", hover: { scale: 1.3, rotate: -90 } },
  ];

  return (
    <motion.nav
      className={`${
        styles.paddingX
      } w-full flex items-center fixed top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/20 backdrop-blur-2xl shadow-2xl shadow-cyan-500/10 border-b border-cyan-500/20 py-2"
          : "bg-transparent py-4"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* LOGO SECTION - Responsive */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              animate={{
                scale: scrolled ? [1, 1.05, 1] : [1, 1.1, 1],
                opacity: scrolled ? [0.5, 0.8, 0.5] : [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: scrolled ? 2 : 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-sm"
              animate={{
                opacity: scrolled ? 0.4 : 0.6,
              }}
              transition={{ duration: 0.3 }}
            />
            <img
              src={logo}
              alt="logo"
              className={`relative z-10 object-contain transition-all duration-300 ${
                scrolled ? "w-8 h-8" : "w-10 h-10"
              }`}
            />
          </motion.div>

          <div className="flex flex-col">
            <motion.span
              className={`font-bold cursor-pointer bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-300 ${
                scrolled ? "text-lg" : "text-xl"
              }`}
              whileHover={{ scale: 1.05 }}
              animate={{
                letterSpacing: scrolled ? "0.025em" : "0.05em",
              }}
              transition={{ duration: 0.3 }}
            >
              SIBANANDA BEHERA
            </motion.span>
            <motion.span
              className="text-slate-300 font-medium hidden sm:block transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                fontSize: scrolled ? "0.75rem" : "0.875rem",
                marginTop: scrolled ? "0.125rem" : "0.25rem",
              }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              Full Stack Developer
            </motion.span>
          </div>
        </motion.div>

        {/* DESKTOP NAV LINKS */}
        <motion.ul
          className={`list-none hidden md:flex flex-row transition-all duration-300 ${
            scrolled ? "gap-6" : "gap-8"
          }`}
          initial="hidden"
          animate="visible"
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
                } ${scrolled ? "px-3 py-1.5" : "px-4 py-2"}`}
                onClick={() => setActive(nav.title)}
              >
                <motion.span
                  animate={{
                    fontSize: scrolled ? "14px" : "16px",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {nav.title}
                </motion.span>

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

        <div className="hidden md:flex items-center">
          <Link
            to="/book-call"
            className="rounded-lg border border-cyan-400/40 bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:from-blue-700 hover:to-cyan-600"
          >
            Book a Call
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
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

          {/* HOLOGRAPHIC SIDEBAR - Redesigned with compact spacing */}
          <AnimatePresence>
            {toggle && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setToggle(false)}
                />

                <motion.div
                  className="fixed top-0 right-0 h-full w-72 max-w-full bg-slate-900/95 backdrop-blur-2xl border-l border-cyan-400/20 z-50 shadow-2xl shadow-cyan-400/10"
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
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent" />
                    </div>
                  </div>

                  {/* Header - Compact */}
                  <motion.div
                    className="relative z-10 px-4 py-3 border-b border-cyan-400/20"
                    variants={itemVariants}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-cyan-400 rounded-full blur-md"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        />
                        <img
                          src={logo}
                          alt="logo"
                          className="w-10 h-10 object-contain relative z-10"
                        />
                      </motion.div>
                      <div>
                        <motion.h2
                          className="text-white font-bold text-base bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                          whileHover={{ scale: 1.05 }}
                        >
                          SB PORTFOLIO
                        </motion.h2>
                        <motion.p
                          className="text-slate-300 text-xs mt-0.5"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          Navigation
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Navigation Links - Compact */}
                  <div className="relative z-10 px-4 py-2 space-y-1.5 overflow-y-auto" style={{ maxHeight: 'calc(100% - 180px)' }}>
                    {navLinks.map((nav, index) => (
                      <motion.div
                        key={nav.id}
                        variants={itemVariants}
                        custom={index}
                        className="relative group"
                      >
                        <a
                          href={`#${nav.id}`}
                          className={`relative flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer overflow-hidden transition-all duration-300 ${
                            active === nav.title
                              ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/30"
                              : "text-slate-300 hover:text-white hover:bg-slate-800/50 border border-transparent"
                          }`}
                          onClick={() => handleNavClick(nav.title)}
                        >
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100"
                            whileHover={{
                              scale: 1.03,
                              rotate: [0, 1, -1, 0],
                            }}
                            transition={{
                              duration: 0.4,
                              rotate: {
                                duration: 0.2,
                                repeat: 1,
                              },
                            }}
                          />

                          {active === nav.title && (
                            <motion.div
                              className="absolute inset-0 bg-cyan-400/10 rounded-lg"
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

                          {/* Smaller Icon */}
                          <motion.div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
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

                          <span className="font-medium text-sm relative z-10 flex-1">
                            {nav.title}
                          </span>

                          {active === nav.title && (
                            <motion.div
                              className="relative"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              <motion.div
                                className="w-2 h-2 bg-cyan-400 rounded-full"
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [1, 0.7, 1],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                }}
                              />
                              <motion.div
                                className="absolute inset-0 bg-cyan-400 rounded-full blur-sm"
                                animate={{
                                  scale: [1, 2, 1],
                                  opacity: [0.5, 0, 0.5],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                }}
                              />
                            </motion.div>
                          )}

                          <motion.div
                            className="text-cyan-400 opacity-0 group-hover:opacity-100 text-xs"
                            initial={{ x: -5 }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            →
                          </motion.div>
                        </a>

                        {index < navLinks.length - 1 && (
                          <motion.div
                            className="absolute -bottom-0.5 left-10 w-0.5 h-2 bg-gradient-to-b from-cyan-400/40 to-transparent"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Book a Call Button - Now before footer */}
                  <motion.div 
                    className="relative z-10 px-4 py-2"
                    variants={itemVariants}
                  >
                    <Link
                      to="/book-call"
                      onClick={() => setToggle(false)}
                      className="block w-full rounded-lg border border-cyan-400/40 bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:from-blue-700 hover:to-cyan-600 shadow-lg shadow-cyan-500/20"
                    >
                      📞 Book a Call
                    </Link>
                  </motion.div>

                  {/* Footer - Compact */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 px-4 py-3 border-t border-cyan-400/20 bg-slate-900/80 backdrop-blur-lg"
                    variants={itemVariants}
                  >
                    <div className="text-center">
                      <motion.p
                        className="text-cyan-400 font-semibold text-sm mb-0.5"
                        animate={{
                          textShadow: [
                            "0 0 5px rgba(34, 211, 238, 0.5)",
                            "0 0 15px rgba(34, 211, 238, 0.8)",
                            "0 0 5px rgba(34, 211, 238, 0.5)",
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        SIBANANDA BEHERA
                      </motion.p>
                      <motion.p
                        className="text-cyan-400/60 text-xs"
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        Full Stack Developer
                      </motion.p>
                      <motion.div className="flex justify-center gap-1 mt-1">
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