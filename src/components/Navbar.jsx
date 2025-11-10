import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../style";
import { navLinks } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar1 = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);

      let currentSection = "";
      navLinks.forEach((nav) => {
        const section = document.getElementById(nav.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
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
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  };

  const itemVariants = {
    closed: {
      x: -100,
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

  return (
    <motion.nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-50 ${
        scrolled ? "bg-primary/80 backdrop-blur-md shadow-lg shadow-black/20" : "bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        {/* LOGO */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img
            src={logo}
            alt="logo"
            className="w-9 h-9 object-contain"
          />
          <div className="flex flex-col sm:flex-row sm:items-center">
            <span className="text-white text-[18px] font-bold cursor-pointer">
              SB SIBA
            </span>
            <span className="text-white text-[18px] font-semibold sm:ml-2">
              | SIBANANDA BEHERA
            </span>
          </div>
        </motion.div>

        {/* DESKTOP NAV LINKS */}
        <motion.ul
          className="list-none hidden sm:flex flex-row gap-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {navLinks.map((nav, index) => (
            <motion.li
              key={nav.id}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className={`${
                active === nav.title
                  ? "text-white font-bold"
                  : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer transition-all duration-300 relative group`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
              <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 ${
                active === nav.title ? "w-full" : ""
              }`} />
            </motion.li>
          ))}
        </motion.ul>

        {/* MOBILE MENU BUTTON */}
        <motion.div
          className="sm:hidden flex flex-1 justify-end items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain cursor-pointer z-50 relative"
            onClick={() => setToggle(!toggle)}
            whileTap={{ scale: 0.9 }}
          />

          {/* SLIDE-UP MOBILE MENU */}
          <AnimatePresence>
            {toggle && (
              <motion.div
                className="fixed inset-0 bg-primary/95 backdrop-blur-md z-40"
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="flex flex-col items-center justify-center h-full gap-8">
                  {navLinks.map((nav, index) => (
                    <motion.div
                      key={nav.id}
                      variants={itemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      custom={index}
                      className="text-center"
                    >
                      <a
                        href={`#${nav.id}`}
                        className={`text-3xl font-bold cursor-pointer block py-4 ${
                          active === nav.title
                            ? "text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text"
                            : "text-white"
                        } hover:text-transparent hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:bg-clip-text transition-all duration-300`}
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
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar1;