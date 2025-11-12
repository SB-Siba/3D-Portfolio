import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../style";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar1 = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  // Scroll lock effect
  useEffect(() => {
    if (toggle) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [toggle]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 50);

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

  const handleNavClick = (navTitle) => {
    setToggle(false);
    setActive(navTitle);
  };

  // Cyberpunk animations
  const sidebarVariants = {
    closed: {
      x: "100%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    open: {
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: {
      x: 100,
      opacity: 0,
      transition: {
        duration: 0.4
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.1, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Icon animations for each nav item
  const iconAnimations = [
    { emoji: "🚀", hover: { scale: 1.5, rotate: 180 } },
    { emoji: "👨‍💻", hover: { scale: 1.4, rotate: 90 } },
    { emoji: "💼", hover: { scale: 1.3, rotate: -180 } },
    { emoji: "🛠️", hover: { scale: 1.6, rotate: 360 } },
    { emoji: "🌟", hover: { scale: 1.5, rotate: 45 } },
    { emoji: "📞", hover: { scale: 1.4, rotate: -90 } }
  ];

  return (
    <motion.nav
      className={`${styles.paddingX} w-full flex items-center py-4 fixed top-0 z-50 ${
        scrolled 
          ? "bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-black/30 border-b border-slate-700/50" 
          : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* LOGO - UPDATED WITH YOUR TEXT */}
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
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-sm opacity-75"></div>
            <img
              src={logo}
              alt="logo"
              className="w-10 h-10 object-contain relative z-10"
            />
          </motion.div>
          <div className="flex flex-col">
            <motion.span 
              className="text-white text-xl font-bold cursor-pointer bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              SB SIBA | SIBANANDA BEHERA
            </motion.span>
            <motion.span 
              className="text-slate-300 text-sm font-medium hidden sm:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Full Stack Developer
            </motion.span>
          </div>
        </motion.div>

        {/* DESKTOP NAV LINKS */}
        <motion.ul
          className="list-none hidden md:flex flex-row gap-8"
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
                className={`relative px-4 py-2 text-[16px] font-medium cursor-pointer transition-all duration-300 ${
                  active === nav.title
                    ? "text-cyan-400"
                    : "text-slate-300 hover:text-white"
                }`}
                onClick={() => setActive(nav.title)}
              >
                {nav.title}
                
                {/* Animated underline */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 ${
                    active === nav.title ? "w-full" : "w-0"
                  }`}
                  animate={{
                    width: hoveredLink === index ? "100%" : active === nav.title ? "100%" : "0%"
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Hover background effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg -z-10"
                  animate={{
                    opacity: hoveredLink === index ? 1 : 0,
                    scale: hoveredLink === index ? 1 : 0.8
                  }}
                  transition={{ duration: 0.3 }}
                />
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* CYBERPUNK MOBILE MENU BUTTON */}
        <motion.div className="md:hidden flex flex-1 justify-end items-center">
          <motion.button
            className="relative w-14 h-14 flex items-center justify-center bg-slate-900/80 backdrop-blur-xl rounded-xl border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300 group"
            onClick={() => setToggle(!toggle)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <AnimatePresence mode="wait">
              {toggle ? (
                <motion.img
                  key="close"
                  src={close}
                  alt="close"
                  className="w-7 h-7 object-contain z-10"
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
                  className="w-7 h-7 object-contain z-10"
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
                        className="relative"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <div className="absolute inset-0 bg-cyan-400 rounded-full blur-md" />
                        <img
                          src={logo}
                          alt="logo"
                          className="w-12 h-12 object-contain relative z-10"
                        />
                      </motion.div>
                      <div>
                        <motion.h2 
                          className="text-white font-bold text-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                          whileHover={{ scale: 1.05 }}
                        >
                          SB PORTFOLIO
                        </motion.h2>
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
                      >
                        <a
                          href={`#${nav.id}`}
                          className={`relative flex items-center gap-4 p-4 rounded-xl cursor-pointer overflow-hidden transition-all duration-300 ${
                            active === nav.title
                              ? "bg-cyan-400/20 text-cyan-400"
                              : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                          }`}
                          onClick={() => handleNavClick(nav.title)}
                        >
                          {/* Enhanced Holographic Effect */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100"
                            whileHover={{ 
                              scale: 1.05,
                              rotate: [0, 1, -1, 0]
                            }}
                            transition={{ 
                              duration: 0.5,
                              rotate: {
                                duration: 0.3,
                                repeat: 1
                              }
                            }}
                          />
                          
                          {/* Pulse effect on active */}
                          {active === nav.title && (
                            <motion.div
                              className="absolute inset-0 bg-cyan-400/10 rounded-xl"
                              animate={{
                                opacity: [0.3, 0.6, 0.3],
                                scale: [1, 1.02, 1]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity
                              }}
                            />
                          )}
                          
                          {/* Animated Icon - ALWAYS ANIMATING ON HOVER */}
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
                              damping: 10 
                            }}
                            animate={{
                              y: active === nav.title ? [0, -2, 0] : 0
                            }}
                          >
                            {iconAnimations[index].emoji}
                          </motion.div>
                          
                          <span className="font-semibold relative z-10 flex-1">
                            {nav.title}
                          </span>

                          {/* Enhanced Active Indicator */}
                          {active === nav.title && (
                            <motion.div
                              className="relative"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 500 }}
                            >
                              <motion.div
                                className="w-3 h-3 bg-cyan-400 rounded-full"
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [1, 0.7, 1]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity
                                }}
                              />
                              <motion.div
                                className="absolute inset-0 bg-cyan-400 rounded-full blur-sm"
                                animate={{
                                  scale: [1, 2, 1],
                                  opacity: [0.5, 0, 0.5]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity
                                }}
                              />
                            </motion.div>
                          )}

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

                  {/* Footer - UPDATED WITH YOUR NAME */}
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
                            "0 0 5px rgba(34, 211, 238, 0.5)"
                          ]
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
                      {/* Animated dots */}
                      <motion.div className="flex justify-center gap-1 mt-2">
                        {[0, 1, 2].map(dot => (
                          <motion.div
                            key={dot}
                            className="w-1 h-1 bg-cyan-400 rounded-full"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: dot * 0.2
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

export default Navbar1;