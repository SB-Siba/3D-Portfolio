import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import { CursorCard } from "./ui/cursor-card";
import HangingIdCard from "./ui/HangingIdCard";

// Animation variants
const slideInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const slideInFromBottom = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

// Marquee Tech Stack Items with official icons
const techStackItems = [
  { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Framer Motion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framer/framer-original.svg" },
  { 
    name: "GSAP", 
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' fill='%2388CE02'/%3E%3Cpath d='M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z' fill='%2388CE02'/%3E%3C/svg%3E"
  },
  { 
    name: "Render", 
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c5.422 0 9.818 4.396 9.818 9.818 0 5.422-4.396 9.818-9.818 9.818-5.422 0-9.818-4.396-9.818-9.818 0-5.422 4.396-9.818 9.818-9.818z' fill='%2346E3B7'/%3E%3Cpath d='M12 4.364c-4.218 0-7.636 3.418-7.636 7.636s3.418 7.636 7.636 7.636 7.636-3.418 7.636-7.636-3.418-7.636-7.636-7.636zm0 2.182c3.018 0 5.455 2.437 5.455 5.455s-2.437 5.455-5.455 5.455-5.455-2.437-5.455-5.455 2.437-5.455 5.455-5.455z' fill='%2346E3B7'/%3E%3C/svg%3E"
  },
  { 
    name: "Neon", 
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' fill='%236C63FF'/%3E%3Cpath d='M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z' fill='%236C63FF'/%3E%3C/svg%3E"
  },
  { 
    name: "Vercel", 
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" 
  },
];

const Hero = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const rightContentRef = useRef(null);
  const marqueeRef = useRef(null);

  // Check if elements are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.1 });
  const nameInView = useInView(nameRef, { once: true, amount: 0.1 });
  const descriptionInView = useInView(descriptionRef, {
    once: true,
    amount: 0.1,
  });
  const buttonsInView = useInView(buttonsRef, { once: true, amount: 0.1 });
  const rightContentInView = useInView(rightContentRef, {
    once: true,
    amount: 0.1,
  });
  const marqueeInView = useInView(marqueeRef, { once: true, amount: 0.1 });

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Function to scroll to projects section
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center pt-28 lg:pt-20 pb-20 lg:pb-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
          {/* Mobile: Stack layout, Desktop: Grid layout */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Content - Main Info */}
            <div className="space-y-4 lg:space-y-6 order-1 lg:order-1 w-full">
              {/* Available Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-full mb-3 lg:mb-4 mt-4 lg:mt-6"
              >
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-blue-300 text-xs lg:text-sm font-mono">
                  Available for Freelance Projects
                </span>
              </motion.div>

              {/* Name */}
              <motion.div
                ref={nameRef}
                variants={slideInFromLeft}
                initial="hidden"
                animate={nameInView ? "show" : "hidden"}
                className="mb-2 lg:mb-3"
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Hi, I'm
                </h1>
                <motion.span
                  className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mt-1 lg:mt-2 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold hero-name-gradient"
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  SIBANANDA BEHERA
                </motion.span>

                <div className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed mt-2">
                  <span className="text-blue-400">Full-Stack Developer</span> •
                  AI Research Enthusiast
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                ref={descriptionRef}
                variants={slideInFromRight}
                initial="hidden"
                animate={descriptionInView ? "show" : "hidden"}
              >
                <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed backdrop-blur-sm bg-slate-900/30 p-3 lg:p-4 rounded-xl border border-slate-700/50">
                  Crafting{" "}
                  <CursorCard
                    image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
                    description="Custom digital solutions tailored to your unique business needs"
                  >
                    <span className="text-blue-400">bespoke digital solutions</span>
                  </CursorCard>{" "}
                  that blend{" "}
                  <CursorCard
                    image="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop"
                    description="Innovative approaches combining art and technology"
                  >
                    <span className="text-purple-400">creative innovation</span>
                  </CursorCard>{" "}
                  with{" "}
                  <CursorCard
                    image="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop"
                    description="Precision engineering and robust architecture"
                  >
                    <span className="text-cyan-400">technical excellence</span>
                  </CursorCard>
                  . From concept to deployment, I build{" "}
                  <CursorCard
                    image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
                    description="Enterprise-grade applications that grow with your business"
                  >
                    <span className="text-green-400">scalable applications</span>
                  </CursorCard>{" "}
                  that stand out in today's competitive landscape.
                </p>
              </motion.div>

              {/* Buttons */}
              <motion.div
                ref={buttonsRef}
                variants={slideInFromBottom}
                initial="hidden"
                animate={buttonsInView ? "show" : "hidden"}
                className="flex flex-wrap items-center gap-3 lg:gap-4 pt-4 lg:pt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToProjects}
                  className="px-5 py-2 lg:px-6 lg:py-2.5 xl:px-8 xl:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm lg:text-base hover:from-blue-700 hover:to-purple-700 transition-all border border-blue-500/30 shadow-lg shadow-blue-500/20 flex items-center gap-2"
                >
                  View Projects
                </motion.button>
              </motion.div>
            </div>

            {/* Right Content - Hanging ID Card */}
            <motion.div
              ref={rightContentRef}
              variants={slideInFromRight}
              initial="hidden"
              animate={rightContentInView ? "show" : "hidden"}
              className="relative flex flex-col items-center order-2 lg:order-2 w-full"
            >
              <HangingIdCard
                name="SIBANANDA BEHERA"
                role="Full-Stack Developer"
                badgeId="SB-2024-PRO"
                accentColor="#8b5cf6"
                ropeLength={75}
                ropeColor="#27272a"
                cardWidth="w-72 sm:w-80 md:w-84"
              />
            </motion.div>
          </div>

          {/* Marquee Section - Infinite Scrolling */}
          <motion.div
            ref={marqueeRef}
            variants={fadeInUp}
            initial="hidden"
            animate={marqueeInView ? "show" : "hidden"}
            className="mt-12 lg:mt-16"
          >
            <div className="relative overflow-hidden py-3 lg:py-4 bg-slate-900/20 backdrop-blur-sm rounded-full border border-slate-700/30">
              <motion.div
                className="flex items-center gap-8 lg:gap-12 whitespace-nowrap"
                animate={{
                  x: ["0%", "-100%"],
                }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {[...techStackItems, ...techStackItems, ...techStackItems, ...techStackItems].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors flex-shrink-0"
                  >
                    {item.icon.startsWith('data:') ? (
                      <img 
                        src={item.icon} 
                        alt={item.name}
                        className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                        style={{ filter: 'brightness(0.9) saturate(1.2)' }}
                      />
                    ) : (
                      <img 
                        src={item.icon} 
                        alt={item.name}
                        className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                        style={{ filter: 'brightness(0.9) saturate(1.2)' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <span className="text-xs sm:text-sm lg:text-base font-medium">{item.name}</span>
                    {index < techStackItems.length * 4 - 1 && (
                      <span className="text-slate-600 ml-2 lg:ml-4">•</span>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-slate-400 text-xs flex flex-col items-center cursor-pointer"
          onClick={scrollToProjects}
        >
          <div className="mb-1 lg:mb-2">Explore My Projects</div>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-4 h-6 lg:w-5 lg:h-8 border-2 border-slate-400 rounded-full flex justify-center"
          >
            <div className="w-0.5 h-1.5 lg:w-1 lg:h-2 bg-slate-400 rounded-full mt-1 lg:mt-2" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;