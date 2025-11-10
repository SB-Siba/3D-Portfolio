import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { styles } from "../style";
import { github, website } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

// Enhanced Project Card with fixed size and read more
const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const hasLiveDemo = live_demo_link && live_demo_link !== "#";
  
  // Check if description needs read more
  const needsReadMore = description.length > 120;
  const displayDescription = isExpanded ? description : description.slice(0, 120) + (needsReadMore ? "..." : "");

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      className="w-full"
    >
      <div 
        className="relative p-[2px] rounded-3xl w-full h-[500px] bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 group cursor-pointer shadow-2xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated gradient border */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-3xl"
          animate={{
            opacity: isHovered ? 1 : 0.7,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-3xl h-full w-full p-6 flex flex-col justify-between overflow-hidden border border-slate-700/50">
          {/* Image section - Always visible */}
          <div className="relative w-full h-[180px] rounded-2xl overflow-hidden mb-4">
            <motion.img
              src={image}
              alt="project_image"
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.7 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
            
            {/* Live preview overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute inset-0 bg-blue-500/20 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 border border-white/30"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-white text-sm font-semibold">View Project</span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content section with fixed height */}
          <div className="flex flex-col flex-1 min-h-0">
            {/* Header with title and buttons */}
            <div className="flex items-start justify-between mb-3">
              <motion.h3 
                className="text-white font-bold text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex-1 mr-4"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {name}
              </motion.h3>
              
              {/* Action buttons */}
              <div className="flex gap-2 flex-shrink-0">
                {/* GitHub/Code Button */}
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(source_code_link, "_blank");
                  }}
                  className="bg-slate-800 w-8 h-8 rounded-full flex justify-center items-center border border-slate-700 hover:bg-blue-500/20 hover:border-blue-400 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img
                    src={github}
                    alt="source code"
                    className="w-4 h-4 object-contain"
                  />
                </motion.button>
                
                {/* Live Demo Button - Only show if available */}
                {hasLiveDemo && (
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(live_demo_link, "_blank");
                    }}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 w-8 h-8 rounded-full flex justify-center items-center border border-cyan-400/50 hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <img
                      src={website}
                      alt="live demo"
                      className="w-4 h-4 object-contain filter brightness-0 invert"
                    />
                  </motion.button>
                )}
              </div>
            </div>
            
            {/* Description with Read More */}
            <div className="flex-1 overflow-hidden mb-4">
              <motion.p
                className="text-slate-300 text-[14px] leading-relaxed"
                animate={{ 
                  opacity: isHovered ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              >
                {displayDescription}
              </motion.p>
              
              {/* Read More/Less Button */}
              {needsReadMore && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                  className="text-cyan-400 text-[12px] font-medium hover:text-cyan-300 transition-colors mt-2 flex items-center gap-1"
                  whileHover={{ gap: 2 }}
                >
                  {isExpanded ? 'Read Less' : 'Read More'}
                  <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    ↓
                  </motion.span>
                </motion.button>
              )}
            </div>

            {/* Tags section */}
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, tagIndex) => (
                <motion.span 
                  key={`${name}-${tag.name}`}
                  className="px-3 py-1.5 rounded-full text-[12px] font-medium bg-slate-800/50 text-slate-300 border border-slate-600/50 backdrop-blur-sm hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-300 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05,
                    y: -1
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: tagIndex * 0.1 }}
                >
                  #{tag.name}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Floating particles on hover */}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.div
                  className="absolute -top-2 -right-2 w-3 h-3 bg-cyan-400 rounded-full"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-2 h-2 bg-purple-400 rounded-full"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Main Works Component without filters
const Works = () => {
  return (
    <div className="relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <p className={`${styles.sectionSubText} text-cyan-300`}>My Creative Work</p>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </motion.div>
          
          <h2 className={`${styles.sectionHeadText} mb-6`}>
            Featured <span className="text-cyan-400">Projects</span>
          </h2>

          {/* Animated underline */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>

        {/* Project Description */}
        <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="text-center mb-12 max-w-4xl mx-auto"
        >
          <p className="text-slate-300 text-lg leading-relaxed">
            Explore my portfolio of innovative projects that showcase my expertise in modern web technologies. 
            Each project represents unique challenges solved with creative solutions, clean code, and 
            <span className="text-cyan-400"> exceptional user experiences</span>.
          </p>
        </motion.div>

        {/* Projects Grid with proper responsive layout */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        >
          <AnimatePresence mode="wait">
            {projects.map((project, index) => (
              <ProjectCard 
                key={`project-${project.name}-${index}`} 
                index={index} 
                {...project} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 text-slate-400 text-sm">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            {projects.length} Amazing Projects
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Works, "projects");