import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../style";
import { navLinks } from "../constants";
import { menu, close, siba } from "../assets";

const MenuIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const Navbar = () => {
  const [active, setActive] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  // Scroll detection
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (
        currentScrollY > lastScrollY &&
        currentScrollY > 80 &&
        !isMobileMenuOpen
      ) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY = currentScrollY;

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
  }, [isMobileMenuOpen]);

  // Lock body scroll when mobile menu is open
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

  // Robust nav click for both desktop and mobile
  const handleNavClick = (navTitle, sectionId) => {
    setActive(navTitle);

    // Close mobile menu first, then scroll after animation frame
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      // Wait for body scroll lock to release before scrolling
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Header */}
      <AnimatePresence>
        {showHeader && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0, transition: { duration: 0.4 } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
          >
            <div
              className={`w-full max-w-7xl rounded-[2rem] flex items-center justify-between px-6 py-3 shadow-xl transition-all duration-300 ${
                scrolled
                  ? "bg-[var(--glass-bg)] backdrop-blur-2xl border border-[var(--glass-border)]"
                  : "bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)]"
              }`}
            >
              {/* Logo */}
              <a
                onClick={() => handleNavClick("Home", "home")}
                className="cursor-pointer font-extrabold text-lg flex items-center gap-3 group select-none"
              >
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 via-blue-500 to-cyan-400 p-[2px] shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <img
                    src={siba}
                    alt="Sibananda Behera"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-extrabold tracking-tight text-[var(--text-primary)] text-sm leading-none group-hover:text-cyan-400 transition-colors">
                    SIBANANDA BEHERA
                  </span>
                  <span className="text-[9px] font-bold text-[var(--text-muted)] tracking-widest uppercase mt-0.5">
                    Full Stack Developer
                  </span>
                </div>
              </a>

              {/* Desktop nav */}
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

              {/* Mobile menu toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="md:hidden text-[var(--text-primary)] hover:text-cyan-400 transition-colors p-2"
                  aria-label="Open menu"
                >
                  <MenuIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile sidebar — rendered OUTSIDE the header, as a sibling */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[var(--bg-primary)]/95 backdrop-blur-2xl md:hidden flex flex-col"
          >
            {/* Header row inside the sidebar */}
            <div className="flex items-center justify-between px-6 py-5">
              {/* Avatar + name */}
              <div className="flex items-center gap-3">
                <img
                  src={siba}
                  alt="Sibananda Behera"
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-cyan-400/40"
                />
                <div className="flex flex-col">
                  <span className="text-[var(--text-primary)] text-sm font-bold leading-tight">
                    Sibananda Behera
                  </span>
                  <span className="text-[10px] text-cyan-400 font-semibold uppercase tracking-widest">
                    Full Stack Developer
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[var(--text-primary)] hover:text-cyan-400 transition-colors p-2"
                aria-label="Close menu"
              >
                <CloseIcon className="w-7 h-7" />
              </button>
            </div>

            {/* Nav links */}
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                },
                closed: {
                  transition: { staggerChildren: 0.04, staggerDirection: -1 },
                },
              }}
              className="flex flex-col items-center justify-center flex-1 space-y-8 pb-16"
            >
              {navLinks.map((nav) => (
                <motion.li
                  key={nav.id}
                  variants={{
                    open: { y: 0, opacity: 1 },
                    closed: { y: 30, opacity: 0 },
                  }}
                >
                  <a
                    onClick={() => handleNavClick(nav.title, nav.id)}
                    className={`text-3xl font-bold transition-colors cursor-pointer ${
                      active === nav.title
                        ? "text-cyan-400"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
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
    </>
  );
};

export default Navbar;
