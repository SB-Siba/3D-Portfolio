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

  // Animation variants
  const menuVariants = {
    closed: {
      y: "-100%",
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: {
      x: -50,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const linkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

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
        {/* LOGO */}
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
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {navLinks.map((nav, index) => (
            <motion.li
              key={nav.id}
              variants={linkVariants}
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

        {/* MOBILE MENU BUTTON */}
        <motion.div
          className="md:hidden flex flex-1 justify-end items-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <motion.button
            className="relative w-12 h-12 flex items-center justify-center bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300"
            onClick={() => setToggle(!toggle)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {toggle ? (
                <motion.img
                  key="close"
                  src={close}
                  alt="close menu"
                  className="w-6 h-6 object-contain"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <motion.img
                  key="menu"
                  src={menu}
                  alt="menu"
                  className="w-6 h-6 object-contain"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </motion.button>

          {/* ENHANCED MOBILE MENU */}
          <AnimatePresence>
            {toggle && (
              <motion.div
                className="fixed inset-0 bg-slate-900/95 backdrop-blur-xl z-40"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
                </div>

                {/* CLOSE BUTTON - Fixed Position */}
                <motion.button
                  className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300 z-50"
                  onClick={() => setToggle(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.img
                    src={close}
                    alt="close menu"
                    className="w-6 h-6 object-contain"
                    whileHover={{ rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>

                <div className="flex flex-col items-center justify-center h-full gap-6 relative z-10 px-4">
                  {/* Mobile Logo */}
                  <motion.div
                    className="mb-8 text-center"
                    variants={itemVariants}
                  >
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-sm opacity-75"></div>
                        <img
                          src={logo}
                          alt="logo"
                          className="w-14 h-14 object-contain relative z-10"
                        />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">SB SIBA</h2>
                        <h2 className="text-2xl font-bold text-white">SIBANANDA BEHERA</h2>
                        <p className="text-slate-400 text-sm">Full Stack Developer</p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Navigation Links */}
                  {navLinks.map((nav, index) => (
                    <motion.div
                      key={nav.id}
                      variants={itemVariants}
                      custom={index}
                      className="text-center w-full max-w-xs"
                    >
                      <a
                        href={`#${nav.id}`}
                        className={`block py-4 px-6 text-xl font-semibold cursor-pointer rounded-2xl transition-all duration-300 border ${
                          active === nav.title
                            ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-400/30"
                            : "text-slate-300 hover:text-white hover:bg-slate-800/50 border-transparent hover:border-slate-600/50"
                        }`}
                        onClick={() => {
                          setToggle(false);
                          setActive(nav.title);
                        }}
                      >
                        {nav.title}
                      </a>
                    </motion.div>
                  ))}
                </div>

                {/* Close on background click */}
                <motion.div
                  className="absolute inset-0 -z-10"
                  onClick={() => setToggle(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar1;