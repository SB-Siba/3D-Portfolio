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
  const [showHeader, setShowHeader] = useState(true);

  // Scroll detection with hide/show header
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state for styling
      setScrolled(currentScrollY > 20);
      
      // Hide/show header on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY = currentScrollY;

      // Update active section
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll lock effect for mobile menu
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

  // Navigation handler
  const handleNavClick = (navTitle, sectionId) => {
    setToggle(false);
    setActive(navTitle);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants for mobile sidebar
  const menuVariants = {
    open: {
      clipPath: "circle(1500px at 90% 5%)",
      transition: { type: "spring", stiffness: 20, restDelta: 2 },
    },
    closed: {
      clipPath: "circle(0px at 90% 5%)",
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
  };

  const listVariants = {
    open: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };

  const itemVariants = {
    open: { 
      y: 0, 
      opacity: 1, 
      transition: { y: { stiffness: 1000, velocity: -100 } } 
    },
    closed: { 
      y: 50, 
      opacity: 0, 
      transition: { y: { stiffness: 1000 } } 
    },
  };

  return (
    <AnimatePresence>
      {showHeader && (
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0, transition: { duration: 0.4 } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
        >
          <div className={`w-full max-w-7xl rounded-[2rem] flex items-center justify-between px-6 py-4 shadow-xl transition-all duration-300 ${
            scrolled
              ? "bg-slate-900/80 backdrop-blur-2xl border border-cyan-500/20"
              : "bg-slate-900/40 backdrop-blur-xl border border-white/10"
          }`}>
            {/* Logo Section */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer group select-none"
              onClick={() => handleNavClick("Home", "hero")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1px] shadow-lg group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center">
                  <img
                    src={logo}
                    alt="logo"
                    className="w-6 h-6 object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold tracking-tight text-white text-sm leading-none group-hover:text-cyan-400 transition-colors">
                  SIBANANDA BEHERA
                </span>
                <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">
                  Full Stack Developer
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-1 justify-center">
              <ul className="flex space-x-8">
                {navLinks.map((nav) => (
                  <motion.li
                    key={nav.id}
                    className="relative group text-sm font-medium text-slate-400 transition-colors"
                  >
                    <a
                      onClick={() => handleNavClick(nav.title, nav.id)}
                      className="cursor-pointer hover:text-white transition-colors"
                    >
                      {nav.title}
                    </a>
                    <motion.span
                      className="absolute -bottom-2 left-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                      initial={{ width: 0, x: "-50%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                    {active === nav.title && (
                      <motion.span
                        className="absolute -bottom-2 left-1/2 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                        initial={{ width: 0, x: "-50%" }}
                        animate={{ width: "100%", x: "-50%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Actions: Book a Call & Mobile Toggle */}
            <div className="flex items-center gap-3">
              {/* Book a Call Button - Desktop */}
              <Link
                to="/book-call"
                className="hidden md:block rounded-xl border border-cyan-400/40 bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2 text-sm font-semibold text-white transition-all hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg hover:shadow-cyan-500/25"
              >
                Book a Call
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setToggle(true)}
                className="md:hidden text-white hover:text-cyan-400 transition-colors p-2 bg-slate-800/50 rounded-xl border border-white/10 hover:border-cyan-400/30"
              >
                <img
                  src={menu}
                  alt="menu"
                  className="w-6 h-6 object-contain"
                />
              </button>
            </div>
          </div>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {toggle && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className="fixed inset-0 z-40 bg-slate-900/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center"
              >
                {/* Close Button */}
                <motion.button
                  onClick={() => setToggle(false)}
                  className="absolute top-8 right-8 text-white hover:text-cyan-400 transition-colors p-2 bg-slate-800/50 rounded-xl border border-white/10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <img
                    src={close}
                    alt="close"
                    className="w-7 h-7 object-contain"
                  />
                </motion.button>

                {/* Logo in Sidebar */}
                <motion.div
                  className="absolute top-8 left-8 flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-cyan-500 to-purple-600 p-[1px]">
                    <div className="w-full h-full bg-slate-900 rounded-[11px] flex items-center justify-center">
                      <img
                        src={logo}
                        alt="logo"
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-extrabold text-white text-sm leading-none">
                      SB PORTFOLIO
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">
                      Navigation
                    </span>
                  </div>
                </motion.div>

                {/* Navigation Links - Centered */}
                <motion.ul
                  variants={listVariants}
                  className="flex flex-col items-center justify-center space-y-8 flex-1"
                >
                  {navLinks.map((nav) => (
                    <motion.li
                      key={nav.id}
                      variants={itemVariants}
                      className="relative"
                    >
                      <a
                        onClick={() => handleNavClick(nav.title, nav.id)}
                        className={`text-4xl font-bold transition-all cursor-pointer relative group ${
                          active === nav.title
                            ? "text-cyan-400"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {nav.title}
                        {active === nav.title && (
                          <motion.div
                            className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                            layoutId="activeMobileIndicator"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <motion.div
                          className="absolute -inset-4 bg-cyan-400/10 rounded-xl -z-10"
                          initial={{ scale: 0, opacity: 0 }}
                          whileHover={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Book a Call Button - Mobile (Centered) */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="w-full max-w-xs px-6 pb-8"
                >
                  <Link
                    to="/book-call"
                    onClick={() => setToggle(false)}
                    className="block w-full rounded-xl border border-cyan-400/40 bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3.5 text-center font-semibold text-white transition-all hover:from-blue-700 hover:to-cyan-600 hover:shadow-lg hover:shadow-cyan-500/25"
                  >
                    📞 Book a Call
                  </Link>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute bottom-32 right-10 w-20 h-20 bg-cyan-400/10 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.div
                  className="absolute top-32 left-10 w-16 h-16 bg-blue-400/10 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default Navbar;