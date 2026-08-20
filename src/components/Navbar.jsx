import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { styles } from "../style";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

// SVG Icons - Better color control
const MenuIcon = ({ className }) => (
  <svg 
    className={className}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg 
    className={className}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const Navbar = () => {
  const [active, setActive] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    if (isMobileMenuOpen) {
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
  }, [isMobileMenuOpen]);

  // Navigation handler
  const handleNavClick = (navTitle, sectionId) => {
    setIsMobileMenuOpen(false);
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
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0, transition: { duration: 0.4 } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
        >
          <div className={`w-full max-w-7xl rounded-[2rem] flex items-center justify-between px-6 py-3 shadow-xl transition-all duration-300 ${
            scrolled
              ? "bg-[var(--glass-bg)] backdrop-blur-2xl border border-[var(--glass-border)]"
              : "bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)]"
          }`}>
            {/* Logo Section */}
            <a
              onClick={() => handleNavClick("Home", "home")}
              className="cursor-pointer font-extrabold text-lg flex items-center gap-3 group select-none"
            >
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-blue-500 to-cyan-400 p-[1px] shadow-lg group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full bg-[var(--bg-primary)] rounded-[11px] flex items-center justify-center">
                  <img
                    src={logo}
                    alt="logo"
                    className="w-5 h-5 object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold tracking-tight text-[var(--text-primary)] text-sm leading-none group-hover:text-cyan-400 transition-colors">
                  SIBANANDA BEHERA
                </span>
                <span className="text-[9px] font-bold text-[var(--text-muted)] tracking-widest uppercase mt-0.5">
                  Portfolio
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex flex-1 justify-center">
              <ul className="flex space-x-8">
                {navLinks.map((nav) => (
                  <motion.li
                    key={nav.id}
                    className="relative group text-sm font-medium text-[var(--text-secondary)] transition-colors"
                  >
                    <a
                      onClick={() => handleNavClick(nav.title, nav.id)}
                      className="cursor-pointer hover:text-[var(--text-primary)] transition-colors"
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

            {/* Actions: Mobile Toggle Only */}
            <div className="flex items-center gap-2">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden text-[var(--text-primary)] hover:text-cyan-400 transition-colors p-2"
                aria-label="Open menu"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Sidebar */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className="fixed inset-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center"
              >
                {/* Close Button */}
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="absolute top-8 right-8 text-[var(--text-primary)] hover:text-cyan-400 transition-colors z-50"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.2 }}
                  aria-label="Close menu"
                >
                  <CloseIcon className="w-8 h-8" />
                </motion.button>

                {/* Navigation Links */}
                <motion.ul
                  variants={listVariants}
                  className="flex flex-col items-center justify-center h-full space-y-10"
                >
                  {navLinks.map((nav) => (
                    <motion.li key={nav.id} variants={itemVariants}>
                      <a
                        onClick={() => handleNavClick(nav.title, nav.id)}
                        className={`text-4xl font-bold transition-all cursor-pointer ${
                          active === nav.title
                            ? "text-cyan-400"
                            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:tracking-wider"
                        }`}
                      >
                        {nav.title}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Navbar;