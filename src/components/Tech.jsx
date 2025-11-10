// Tech.jsx - Enhanced Hexagon Design
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { fadeIn, staggerContainer, textVariant } from "../utils/motion";

const Tech = () => {
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <div className="relative min-h-screen py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-4 sm:right-10 w-56 h-56 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-64 sm:h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <p className="text-cyan-300 text-sm sm:text-lg font-semibold">
              My Tech Arsenal
            </p>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </motion.div>
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6"
            whileHover={{ scale: 1.02 }}
          >
            Technologies & <span className="text-cyan-400">Tools</span>
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full mb-6 sm:mb-8"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ delay: 0.5, duration: 1 }}
          />

          {/* Subheading */}
          <motion.p
            className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto px-4"
            variants={fadeIn("", "", 0.3, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
          >
            Technologies I use to bring ideas to life. From frontend to backend, 
            these are the tools that power my <span className="text-cyan-400">creative solutions</span> 
            and <span className="text-purple-400">innovative projects</span>.
          </motion.p>
        </motion.div>

        {/* Hexagon Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 md:gap-6 justify-items-center"
        >
          {technologies.map((technology, index) => (
            <motion.div
              key={technology.name}
              variants={fadeIn("up", "spring", index * 0.08, 0.75)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="relative group"
              onMouseEnter={() => setHoveredTech(index)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              {/* Hexagon Container */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex justify-center items-center">
                {/* Outer Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-2xl blur-md"
                  animate={{
                    opacity: hoveredTech === index ? 0.6 : 0,
                    scale: hoveredTech === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Hexagon Shape */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl transform rotate-45 border border-slate-700/50 group-hover:border-cyan-400/50 transition-all duration-300 shadow-lg"
                  animate={{
                    scale: hoveredTech === index ? 1.15 : 1,
                    rotate: hoveredTech === index ? [45, 50, 45] : 45,
                    background: hoveredTech === index 
                      ? "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3))" 
                      : "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))"
                  }}
                  transition={{
                    duration: 0.5,
                    rotate: {
                      duration: 2,
                      repeat: hoveredTech === index ? Infinity : 0,
                      ease: "easeInOut"
                    }
                  }}
                />
                
                {/* Inner Hexagon Glow */}
                <motion.div
                  className="absolute inset-1 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl"
                  animate={{
                    opacity: hoveredTech === index ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Icon */}
                <motion.div
                  className="relative z-10 transform -rotate-45"
                  animate={{
                    scale: hoveredTech === index ? 1.2 : 1,
                    rotate: hoveredTech === index ? [-45, -40, -45] : -45,
                    y: hoveredTech === index ? [-2, 2, -2] : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    rotate: {
                      duration: 2,
                      repeat: hoveredTech === index ? Infinity : 0,
                      ease: "easeInOut"
                    },
                    y: {
                      duration: 1.5,
                      repeat: hoveredTech === index ? Infinity : 0,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <img
                    src={technology.icon}
                    alt={technology.name}
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500"
                  />
                </motion.div>

                {/* Hover Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.8 }}
                  animate={{ 
                    opacity: hoveredTech === index ? 1 : 0,
                    y: hoveredTech === index ? 0 : 5,
                    scale: hoveredTech === index ? 1 : 0.8
                  }}
                  className="absolute -bottom-6 sm:-bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-20"
                >
                  <div className="bg-slate-900/95 backdrop-blur-xl text-white text-xs px-2 sm:px-3 py-1 rounded-full border border-slate-700/50 shadow-lg">
                    {technology.name}
                  </div>
                </motion.div>

                {/* Floating particles on hover */}
                {hoveredTech === index && (
                  <>
                    <motion.div
                      className="absolute -top-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div
                      className="absolute -bottom-1 -left-1 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400 rounded-full"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                    <motion.div
                      className="absolute top-0 left-0 w-1 h-1 bg-blue-400 rounded-full"
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-8 sm:mt-12"
        >
          <div className="inline-flex items-center gap-2 sm:gap-3 text-slate-400 text-xs sm:text-sm">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            Hover over technologies to see magic happen
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");