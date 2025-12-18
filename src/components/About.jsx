import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { styles } from "../style";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { Link } from "react-router-dom";

// Add missing staggerContainer variant
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Counter Component for animated numbers
const Counter = ({ end, duration = 2, label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const increment = end / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, end, duration]);

  return (
    <div
      ref={ref}
      className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-4 text-center border border-slate-700/50 hover:border-blue-400/30 transition-all duration-300"
    >
      <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        {count}+
      </div>
      <div className="text-slate-400 text-sm mt-1">{label}</div>
    </div>
  );
};

// Clean Service Card without tilt animation
const ServiceCard = ({ index, title, icon, description, features = [] }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      variants={fadeIn("up", "spring", index * 0.1, 0.5)}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Container */}
      <motion.div
        className="relative h-full rounded-2xl overflow-hidden group"
        animate={{
          y: isHovered ? -8 : 0,
          boxShadow: isHovered
            ? "0 20px 40px rgba(0, 0, 0, 0.4), 0 0 0 1.5px rgba(34, 211, 238, 0.3)"
            : "0 10px 30px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
        transition={{ duration: 0.3 }}
        style={{
          height: "100%",
          minHeight: "340px", // Reduced from 380px
        }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

          {/* Subtle Grid Lines */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"
                style={{ top: `${(i / 10) * 100}%` }}
                animate={{
                  opacity: [0.05, 0.15, 0.05],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Curved Edge Highlights - Subtle */}
        {/* Top Edge */}
        <div className="absolute top-0 left-3 right-3 h-2 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-40"></div>
        </div>

        {/* Bottom Edge */}
        <div className="absolute bottom-0 left-3 right-3 h-2 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-30"></div>
        </div>

        {/* Left Edge */}
        <div className="absolute top-3 left-0 bottom-3 w-2 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/25 to-transparent opacity-30"></div>
        </div>

        {/* Right Edge */}
        <div className="absolute top-3 right-0 bottom-3 w-2 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-l from-white/20 to-transparent opacity-25"></div>
        </div>

        {/* Corner Highlights */}
        <div className="absolute top-0 left-0 w-4 h-4">
          <div className="absolute top-0 left-0 w-3 h-3 bg-gradient-to-br from-white/40 to-transparent rounded-tl-2xl"></div>
        </div>
        <div className="absolute top-0 right-0 w-4 h-4">
          <div className="absolute top-0 right-0 w-3 h-3 bg-gradient-to-bl from-white/40 to-transparent rounded-tr-2xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-4 h-4">
          <div className="absolute bottom-0 left-0 w-3 h-3 bg-gradient-to-tr from-white/20 to-transparent rounded-bl-2xl"></div>
        </div>
        <div className="absolute bottom-0 right-0 w-4 h-4">
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-gradient-to-tl from-white/20 to-transparent rounded-br-2xl"></div>
        </div>

        {/* Main Border */}
        <div className="absolute inset-0 rounded-2xl border border-white/15 group-hover:border-cyan-400/40 transition-all duration-300"></div>

        {/* Inner Glow */}
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_30px_rgba(0,0,0,0.4)]"></div>

        {/* Glass Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-2xl backdrop-blur-sm"></div>

        {/* Content Container */}
        <div className="relative h-full p-5 flex flex-col">
          {/* Icon */}
          <div className="mb-5 relative mx-auto">
            <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <img
                  src={icon}
                  alt={title}
                  className="w-5 h-5 filter brightness-0 invert"
                />
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-white font-bold text-lg mb-3 text-center">
            {title}
          </h3>

          {/* Description */}
          <p className="text-slate-300 text-sm mb-4 flex-grow text-center leading-relaxed">
            {description}
          </p>

          {/* Features */}
          {features.length > 0 && (
            <div className="space-y-2 mb-4">
              {features.slice(0, 3).map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/30 hover:bg-slate-700/40 transition-all duration-300"
                >
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  <span className="text-xs text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          <Link to={`/services/${index}`} className="block">
            <div className="pt-4 mt-auto border-t border-white/10 group-hover:border-cyan-400/30 transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 group-hover:text-cyan-300 transition-colors duration-300">
                  View details
                </span>
                <div className="w-6 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full group-hover:w-8 transition-all duration-300"></div>
              </div>
            </div>
          </Link>
        </div>

        {/* Hover Glow Effect */}
        {isHovered && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Enhanced About Section
const About = () => {
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, {
    once: true,
    amount: 0.05,
    margin: "-100px 0px",
  });

  // Add scrollToContact function here in the main About component
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const stats = [
    { number: 20, label: "Projects Completed" },
    { number: 2, label: "Years Experience" },
    { number: 15, label: "Happy Clients" },
    { number: 10, label: "Technologies" },
  ];

  return (
    <div ref={aboutRef} className="relative">
      {/* Reduced padding to minimize gap */}
      <div className="pt-8 lg:pt-12">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Section Header with Enhanced Animation */}
          <motion.div
            variants={textVariant(0.1)}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <p className={`${styles.sectionSubText} text-cyan-300`}>
                Get To Know More
              </p>
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            </motion.div>

            <h2 className={`${styles.sectionHeadText} mb-6`}>
              About <span className="text-cyan-400">Me</span>
            </h2>

            {/* Animated underline */}
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={isInView ? { width: 96 } : { width: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 items-start mb-16">
            {/* Left Column - Personal Story */}
            <motion.div
              variants={fadeIn("right", "spring", 0.1, 0.6)}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="space-y-6"
            >
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="text-cyan-400">👨‍💻</span>
                  My Journey
                </h3>
                <motion.p
                  variants={fadeIn("", "", 0.2, 0.6)}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                  className="text-slate-300 text-lg leading-relaxed"
                >
                  I'm a passionate full-stack developer specializing in creating
                  <span className="text-cyan-400">
                    {" "}
                    immersive digital experiences
                  </span>
                  . With expertise in
                  <span className="text-blue-400">
                    {" "}
                    modern web technologies
                  </span>{" "}
                  and a keen eye for
                  <span className="text-purple-400"> innovative solutions</span>
                  , I transform complex ideas into
                  <span className="text-green-400">
                    {" "}
                    elegant, user-friendly applications
                  </span>
                  .
                </motion.p>

                <motion.p
                  variants={fadeIn("", "", 0.3, 0.6)}
                  initial="hidden"
                  animate={isInView ? "show" : "hidden"}
                  className="text-slate-300 text-lg leading-relaxed mt-4"
                >
                  My journey in tech has been driven by a constant curiosity for
                  <span className="text-yellow-400">
                    {" "}
                    cutting-edge technologies
                  </span>{" "}
                  and a commitment to
                  <span className="text-orange-400">
                    {" "}
                    delivering exceptional results
                  </span>
                  . I thrive on challenges and believe in the power of
                  technology to create meaningful impact.
                </motion.p>
              </div>

              {/* Stats Grid with Animated Counters */}
              <motion.div
                variants={fadeIn("up", "spring", 0.4, 0.6)}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="grid grid-cols-2 gap-4"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -2, scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={
                      isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                    }
                    transition={{ delay: 0.5 + index * 0.08 }}
                  >
                    <Counter
                      end={stat.number}
                      duration={1.5}
                      label={stat.label}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Skills & Expertise */}
            <motion.div
              variants={fadeIn("left", "spring", 0.2, 0.6)}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="space-y-6"
            >
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-purple-400/30 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-purple-400">🚀</span>
                  What I Do
                </h3>

                <div className="space-y-4">
                  {[
                    "Full-Stack Web Development",
                    "3D Interactive Experiences",
                    "AI Integration & Research",
                    "Responsive UI/UX Design",
                    "API Development & Integration",
                    "Performance Optimization",
                  ].map((skill, index) => (
                    <motion.div
                      key={skill}
                      className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-700/50 transition-all duration-300"
                      whileHover={{ x: 5 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                      }
                      transition={{ delay: 0.3 + index * 0.06 }}
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-slate-300">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <motion.div
                variants={fadeIn("up", "spring", 0.5, 0.6)}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-400/30 text-center"
              >
                <h4 className="text-white font-semibold mb-2">
                  Ready to start your project?
                </h4>
                <p className="text-slate-300 text-sm mb-4">
                  Let's collaborate to bring your vision to life with
                  cutting-edge technology.
                </p>
                <motion.button
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  onClick={scrollToContact}
                  whileTap={{ scale: 0.95 }}
                >
                  Let's Talk
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Services Grid */}
          <motion.div
            variants={fadeIn("up", "spring", 0.4, 0.6)}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="text-center mb-8"
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              My <span className="text-cyan-400">Services</span>
            </h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Comprehensive digital solutions tailored to transform your ideas
              into reality
            </p>
          </motion.div>

          {/* Equal Height Cards Grid - Clean Layout */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            {services.map((service, index) => (
              <div key={service.title} className="h-full">
                <ServiceCard index={index} {...service} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
