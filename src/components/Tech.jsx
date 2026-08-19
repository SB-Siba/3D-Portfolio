// Tech.jsx - Modern Gradient Design with Interactive Tech Cards
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { fadeIn, staggerContainer, textVariant } from "../utils/motion";

const Tech = () => {
  const [hoveredTech, setHoveredTech] = useState(null);

  return (
    <div className="relative py-8 md:py-12 lg:py-16">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-4 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-4 sm:right-10 w-56 h-56 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-64 sm:h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 sm:gap-3 mb-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <p className="text-cyan-300 text-sm sm:text-lg font-semibold tracking-wider">
              My Tech Arsenal
            </p>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </motion.div>
          
          <motion.h2 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3"
            whileHover={{ scale: 1.02 }}
          >
            Technologies & <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Tools</span>
          </motion.h2>

          {/* Animated underline */}
          <motion.div
            className="w-20 sm:w-28 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mx-auto rounded-full mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: "7rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          {/* Subheading - Fixed spacing */}
          <motion.p
            className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto px-4"
            variants={fadeIn("", "", 0.2, 0.8)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            Technologies I use to bring ideas to life. From frontend to backend, 
            these are the tools that power my <span className="text-cyan-400 font-semibold">creative solutions</span>{' '}
            and <span className="text-purple-400 font-semibold">innovative projects</span>.
          </motion.p>
        </motion.div>

        {/* Tech Grid - Glassmorphism Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 max-w-6xl mx-auto"
        >
          {technologies.map((technology, index) => (
            <motion.div
              key={technology.name}
              variants={fadeIn("up", "spring", index * 0.05, 0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="relative group"
              onMouseEnter={() => setHoveredTech(index)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              {/* Glass Card */}
              <div className="relative p-4 sm:p-5 rounded-2xl bg-slate-900/40 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-400/40 transition-all duration-500 shadow-lg hover:shadow-cyan-500/20 hover:shadow-xl">
                {/* Background Gradient on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Animated Border Glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  animate={{
                    boxShadow: hoveredTech === index 
                      ? ['0 0 20px rgba(34,211,238,0.1)', '0 0 40px rgba(34,211,238,0.2)', '0 0 20px rgba(34,211,238,0.1)']
                      : 'none'
                  }}
                  transition={{
                    duration: 2,
                    repeat: hoveredTech === index ? Infinity : 0,
                  }}
                />

                {/* Icon Container */}
                <div className="flex flex-col items-center gap-3">
                  {/* Icon with Rotation Effect */}
                  <motion.div
                    className="relative"
                    animate={{
                      rotateY: hoveredTech === index ? 360 : 0,
                      scale: hoveredTech === index ? 1.1 : 1,
                    }}
                    transition={{
                      duration: 0.6,
                      rotateY: {
                        duration: 1,
                        repeat: hoveredTech === index ? 1 : 0,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <img
                      src={technology.icon}
                      alt={technology.name}
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain filter brightness-100 invert-0 transition-all duration-300 group-hover:brightness-110"
                    />
                    
                    {/* Floating Orbital Ring */}
                    {hoveredTech === index && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    )}
                  </motion.div>

                  {/* Tech Name */}
                  <motion.p
                    className="text-xs sm:text-sm font-medium text-slate-300 group-hover:text-white transition-colors duration-300 text-center"
                    animate={{
                      color: hoveredTech === index ? '#22d3ee' : '#94a3b8'
                    }}
                  >
                    {technology.name}
                  </motion.p>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-2 left-2 w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-2 right-2 w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 right-2 w-1 h-1 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Hover Glow Effect */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-xl -z-10"
                animate={{
                  opacity: hoveredTech === index ? 0.6 : 0,
                  scale: hoveredTech === index ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "tech");