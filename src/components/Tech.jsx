// Tech.jsx - Diamond Shape Design with Advanced Animations
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { fadeIn, staggerContainer, textVariant } from "../utils/motion";

const Tech = () => {
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <div className="relative py-12">
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
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 sm:gap-3 mb-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <p className="text-cyan-300 text-sm sm:text-lg font-semibold">
              My Tech Arsenal
            </p>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </motion.div>
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4"
            whileHover={{ scale: 1.02 }}
          >
            Technologies & <span className="text-cyan-400">Tools</span>
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full mb-4 sm:mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
          />

          {/* Subheading */}
          <motion.p
            className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto px-4"
            variants={fadeIn("", "", 0.3, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            Technologies I use to bring ideas to life. From frontend to backend, 
            these are the tools that power my <span className="text-cyan-400">creative solutions</span> 
            and <span className="text-purple-400">innovative projects</span>.
          </motion.p>
        </motion.div>

        {/* Diamond Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-6 sm:gap-8 md:gap-10 justify-items-center"
        >
          {technologies.map((technology, index) => (
            <motion.div
              key={technology.name}
              variants={fadeIn("up", "spring", index * 0.08, 0.75)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="relative group"
              onMouseEnter={() => setHoveredTech(index)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              {/* Diamond Container */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex justify-center items-center">
                {/* Outer Animated Border */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 rounded-lg transform rotate-45"
                  animate={{
                    scale: hoveredTech === index ? 1.1 : 1,
                    rotate: hoveredTech === index ? [45, 50, 45] : 45,
                    opacity: hoveredTech === index ? 1 : 0.7,
                  }}
                  transition={{
                    duration: 0.5,
                    rotate: {
                      duration: 3,
                      repeat: hoveredTech === index ? Infinity : 0,
                      ease: "easeInOut"
                    }
                  }}
                />
                
                {/* Main Diamond */}
                <motion.div
                  className="absolute inset-1 bg-slate-900 rounded-lg transform rotate-45 border border-slate-700/50 group-hover:border-cyan-400/50 transition-all duration-500 shadow-2xl"
                  animate={{
                    scale: hoveredTech === index ? 1.05 : 1,
                    rotate: hoveredTech === index ? [45, 42, 45] : 45,
                    backgroundColor: hoveredTech === index ? "rgba(15, 23, 42, 0.9)" : "rgba(15, 23, 42, 0.8)",
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

                {/* Inner Glow */}
                <motion.div
                  className="absolute inset-2 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-md transform rotate-45"
                  animate={{
                    opacity: hoveredTech === index ? 1 : 0.3,
                    scale: hoveredTech === index ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon Container */}
                <motion.div
                  className="relative z-10 transform -rotate-45"
                  animate={{
                    scale: hoveredTech === index ? 1.3 : 1,
                    rotate: hoveredTech === index ? [-45, -48, -45] : -45,
                    y: hoveredTech === index ? [-3, 3, -3] : 0,
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
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain filter brightness-100 invert-0 transition-all duration-500"
                  />
                </motion.div>

                {/* Floating Orbital Rings */}
                {hoveredTech === index && (
                  <>
                    <motion.div
                      className="absolute inset-0 border-2 border-cyan-400/30 rounded-lg transform rotate-45"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: [0.8, 1.3, 0.8],
                        opacity: [0.3, 0.8, 0.3],
                        rotate: [45, 405, 45],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 border border-purple-400/20 rounded-lg transform rotate-45"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{
                        scale: [0.9, 1.4, 0.9],
                        opacity: [0.2, 0.6, 0.2],
                        rotate: [45, -315, 45],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 0.5
                      }}
                    />
                  </>
                )}

                {/* Particle Burst on Hover */}
                {hoveredTech === index && (
                  <>
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full"
                        initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          x: Math.cos((i * 45 * Math.PI) / 180) * 40,
                          y: Math.sin((i * 45 * Math.PI) / 180) * 40,
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Corner Dots */}
                <motion.div
                  className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{
                    scale: hoveredTech === index ? [1, 1.5, 1] : 1,
                    opacity: hoveredTech === index ? [0.5, 1, 0.5] : 0.3,
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredTech === index ? Infinity : 0,
                  }}
                />
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full"
                  animate={{
                    scale: hoveredTech === index ? [1, 1.5, 1] : 1,
                    opacity: hoveredTech === index ? [0.5, 1, 0.5] : 0.3,
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredTech === index ? Infinity : 0,
                    delay: 0.3
                  }}
                />
                <motion.div
                  className="absolute -bottom-1 -left-1 w-2 h-2 bg-purple-400 rounded-full"
                  animate={{
                    scale: hoveredTech === index ? [1, 1.5, 1] : 1,
                    opacity: hoveredTech === index ? [0.5, 1, 0.5] : 0.3,
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredTech === index ? Infinity : 0,
                    delay: 0.6
                  }}
                />
                <motion.div
                  className="absolute -bottom-1 -right-1 w-2 h-2 bg-pink-400 rounded-full"
                  animate={{
                    scale: hoveredTech === index ? [1, 1.5, 1] : 1,
                    opacity: hoveredTech === index ? [0.5, 1, 0.5] : 0.3,
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredTech === index ? Infinity : 0,
                    delay: 0.9
                  }}
                />
              </div>

              {/* Enhanced Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ 
                  opacity: hoveredTech === index ? 1 : 0,
                  y: hoveredTech === index ? 0 : 10,
                  scale: hoveredTech === index ? 1 : 0.8
                }}
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 z-50"
              >
                <div className="bg-slate-900/95 backdrop-blur-xl text-white text-xs px-3 py-2 rounded-lg border border-cyan-400/30 shadow-2xl shadow-cyan-500/20 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                      }}
                    />
                    {technology.name}
                  </div>
                </div>
                
                {/* Tooltip Arrow */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-l border-t border-cyan-400/30"></div>
              </motion.div>

              {/* Hover Background Glow */}
              <motion.div
                className="absolute inset-0 bg-cyan-500/10 rounded-2xl blur-xl -z-10"
                animate={{
                  opacity: hoveredTech === index ? 0.8 : 0,
                  scale: hoveredTech === index ? 1.5 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-8 sm:mt-12"
        >
          <div className="inline-flex items-center gap-3 text-slate-400 text-sm">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-300 font-medium">Experience the magic:</span> 
            Hover over diamonds
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");