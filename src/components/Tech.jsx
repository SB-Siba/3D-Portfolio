// Tech.jsx - Diamond Shape Design with Centered Tech Icons
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { fadeIn, staggerContainer, textVariant } from "../utils/motion";

const Tech = () => {
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <div className="relative py-8">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
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
          className="text-center mb-6 sm:mb-8"
        >
          <motion.div
            className="inline-flex items-center gap-2 sm:gap-3 mb-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <p className="text-cyan-300 text-sm sm:text-lg font-semibold">
              My Tech Arsenal
            </p>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </motion.div>
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3"
            whileHover={{ scale: 1.02 }}
          >
            Technologies & <span className="text-cyan-400">Tools</span>
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            className="w-16 sm:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full mb-3 sm:mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          {/* Subheading */}
          <motion.p
            className="text-slate-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto px-4"
            variants={fadeIn("", "", 0.2, 0.8)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            Technologies I use to bring ideas to life. From frontend to backend, 
            these are the tools that power my <span className="text-cyan-400">creative solutions</span> 
            and <span className="text-purple-400">innovative projects</span>.
          </motion.p>
        </motion.div>

        {/* Centered Diamond Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          {technologies.map((technology, index) => (
            <motion.div
              key={technology.name}
              variants={fadeIn("up", "spring", index * 0.06, 0.6)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="relative group"
              onMouseEnter={() => setHoveredTech(index)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              {/* Diamond Container */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex justify-center items-center">
                {/* Outer Animated Border */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 rounded-lg transform rotate-45"
                  animate={{
                    scale: hoveredTech === index ? 1.1 : 1,
                    rotate: hoveredTech === index ? [45, 50, 45] : 45,
                    opacity: hoveredTech === index ? 1 : 0.7,
                  }}
                  transition={{
                    duration: 0.4,
                    rotate: {
                      duration: 2.5,
                      repeat: hoveredTech === index ? Infinity : 0,
                      ease: "easeInOut"
                    }
                  }}
                />
                
                {/* Main Diamond */}
                <motion.div
                  className="absolute inset-1 bg-slate-900 rounded-lg transform rotate-45 border border-slate-700/50 group-hover:border-cyan-400/50 transition-all duration-400 shadow-2xl"
                  animate={{
                    scale: hoveredTech === index ? 1.05 : 1,
                    rotate: hoveredTech === index ? [45, 42, 45] : 45,
                    backgroundColor: hoveredTech === index ? "rgba(15, 23, 42, 0.9)" : "rgba(15, 23, 42, 0.8)",
                  }}
                  transition={{
                    duration: 0.4,
                    rotate: {
                      duration: 1.5,
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
                  transition={{ duration: 0.2 }}
                />

                {/* Icon Container */}
                <motion.div
                  className="relative z-10 transform -rotate-45"
                  animate={{
                    scale: hoveredTech === index ? 1.2 : 1,
                    rotate: hoveredTech === index ? [-45, -48, -45] : -45,
                    y: hoveredTech === index ? [-2, 2, -2] : 0,
                  }}
                  transition={{
                    duration: 0.4,
                    rotate: {
                      duration: 1.5,
                      repeat: hoveredTech === index ? Infinity : 0,
                      ease: "easeInOut"
                    },
                    y: {
                      duration: 1,
                      repeat: hoveredTech === index ? Infinity : 0,
                      ease: "easeInOut"
                    }
                  }}
                >
                  <img
                    src={technology.icon}
                    alt={technology.name}
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain filter brightness-100 invert-0 transition-all duration-400"
                  />
                </motion.div>

                {/* Floating Orbital Rings */}
                {hoveredTech === index && (
                  <>
                    <motion.div
                      className="absolute inset-0 border-2 border-cyan-400/30 rounded-lg transform rotate-45"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{
                        scale: [0.8, 1.2, 0.8],
                        opacity: [0.3, 0.8, 0.3],
                        rotate: [45, 405, 45],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 border border-purple-400/20 rounded-lg transform rotate-45"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{
                        scale: [0.9, 1.3, 0.9],
                        opacity: [0.2, 0.6, 0.2],
                        rotate: [45, -315, 45],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 0.3
                      }}
                    />
                  </>
                )}

                {/* Particle Burst on Hover */}
                {hoveredTech === index && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                        initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                        animate={{
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                          x: Math.cos((i * 60 * Math.PI) / 180) * 30,
                          y: Math.sin((i * 60 * Math.PI) / 180) * 30,
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.08,
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Corner Dots */}
                <motion.div
                  className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 bg-cyan-400 rounded-full"
                  animate={{
                    scale: hoveredTech === index ? [1, 1.3, 1] : 1,
                    opacity: hoveredTech === index ? [0.5, 1, 0.5] : 0.3,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: hoveredTech === index ? Infinity : 0,
                  }}
                />
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-400 rounded-full"
                  animate={{
                    scale: hoveredTech === index ? [1, 1.3, 1] : 1,
                    opacity: hoveredTech === index ? [0.5, 1, 0.5] : 0.3,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: hoveredTech === index ? Infinity : 0,
                    delay: 0.2
                  }}
                />
                <motion.div
                  className="absolute -bottom-0.5 -left-0.5 w-1.5 h-1.5 bg-purple-400 rounded-full"
                  animate={{
                    scale: hoveredTech === index ? [1, 1.3, 1] : 1,
                    opacity: hoveredTech === index ? [0.5, 1, 0.5] : 0.3,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: hoveredTech === index ? Infinity : 0,
                    delay: 0.4
                  }}
                />
                <motion.div
                  className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-pink-400 rounded-full"
                  animate={{
                    scale: hoveredTech === index ? [1, 1.3, 1] : 1,
                    opacity: hoveredTech === index ? [0.5, 1, 0.5] : 0.3,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: hoveredTech === index ? Infinity : 0,
                    delay: 0.6
                  }}
                />
              </div>

              {/* Enhanced Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.8 }}
                animate={{ 
                  opacity: hoveredTech === index ? 1 : 0,
                  y: hoveredTech === index ? 0 : 8,
                  scale: hoveredTech === index ? 1 : 0.8
                }}
                transition={{ duration: 0.2 }}
                className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 z-50"
              >
                <div className="bg-slate-900/95 backdrop-blur-xl text-white text-xs px-2 py-1.5 rounded-lg border border-cyan-400/30 shadow-2xl shadow-cyan-500/20 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      className="w-1 h-1 bg-cyan-400 rounded-full"
                      animate={{
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                      }}
                    />
                    {technology.name}
                  </div>
                </div>
                
                {/* Tooltip Arrow */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-slate-900 rotate-45 border-l border-t border-cyan-400/30"></div>
              </motion.div>

              {/* Hover Background Glow */}
              <motion.div
                className="absolute inset-0 bg-cyan-500/10 rounded-2xl blur-xl -z-10"
                animate={{
                  opacity: hoveredTech === index ? 0.8 : 0,
                  scale: hoveredTech === index ? 1.3 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-6 sm:mt-8"
        >
          <div className="inline-flex items-center gap-2 text-slate-400 text-sm">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-300 font-medium">Experience the magic:</span> 
            Hover over diamonds
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");