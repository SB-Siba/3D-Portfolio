import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../style";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

// Enhanced Experience Card with modern design
const ExperienceCard = ({ experience, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="relative"
    >
      {/* Connection line decoration */}
      <div className="absolute left-6 top-0 w-0.5 h-full bg-gradient-to-b from-blue-500/30 to-purple-500/30 -z-10" />
      
      <VerticalTimelineElement
        contentStyle={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          color: "#fff",
          borderRadius: "20px",
          border: "1px solid rgba(56, 189, 248, 0.1)",
          boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.3)",
          position: "relative",
          overflow: "hidden",
        }}
        contentArrowStyle={{ 
          borderRight: "7px solid #1e293b",
        }}
        date={
          <motion.div
            className="text-slate-300 font-medium text-sm"
            whileHover={{ scale: 1.05 }}
          >
            {experience.date}
          </motion.div>
        }
        iconStyle={{
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
          overflow: "hidden",
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
          border: "2px solid rgba(255, 255, 255, 0.1)",
        }}
        icon={
          <motion.div 
            className="flex justify-center items-center w-full h-full overflow-hidden rounded-full"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={experience.icon}
              alt={experience.company_name}
              className="w-12 h-12 object-contain p-1"
            />
          </motion.div>
        }
      >
        {/* Background glow effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
        
        {/* Expand/Collapse Button */}
        <motion.button
          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-300 hover:bg-slate-600/50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ↓
          </motion.span>
        </motion.button>

        <motion.div
          className="space-y-3"
          layout
        >
          {/* Company & Title */}
          <div className="space-y-2">
            <motion.h3 
              className="text-white text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
              whileHover={{ x: 5 }}
            >
              {experience.title}
            </motion.h3>
            <motion.p
              className="text-cyan-300 text-lg font-semibold flex items-center gap-2"
              style={{ margin: 0 }}
            >
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              {experience.company_name}
            </motion.p>
          </div>

          {/* Location (if available) */}
          {experience.location && (
            <motion.p 
              className="text-slate-400 text-sm flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              📍 {experience.location}
            </motion.p>
          )}

          {/* Tech Stack Tags */}
          {experience.technologies && (
            <motion.div 
              className="flex flex-wrap gap-2 mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {experience.technologies.slice(0, isExpanded ? experience.technologies.length : 4).map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  className="px-3 py-1 bg-slate-700/50 text-cyan-300 text-xs rounded-full border border-cyan-400/20"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(6, 182, 212, 0.2)" }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + techIndex * 0.1 }}
                >
                  {tech}
                </motion.span>
              ))}
              {experience.technologies.length > 4 && !isExpanded && (
                <span className="px-3 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full">
                  +{experience.technologies.length - 4}
                </span>
              )}
            </motion.div>
          )}

          {/* Points with enhanced styling */}
          <AnimatePresence>
            <motion.ul 
              className="mt-4 space-y-3"
              layout
            >
              {experience.points.map((point, pointIndex) => (
                <motion.li
                  key={`experience-point-${pointIndex}`}
                  className="text-slate-300 text-sm pl-4 relative leading-relaxed"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: isExpanded ? pointIndex * 0.1 : 0,
                    duration: 0.4 
                  }}
                  style={{
                    display: isExpanded || pointIndex < 2 ? 'block' : 'none'
                  }}
                >
                  <div className="absolute left-0 top-2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                  {point}
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>

          {/* Show More/Less Button */}
          {experience.points.length > 2 && (
            <motion.button
              className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors flex items-center gap-1 mt-3"
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ gap: 2 }}
            >
              {isExpanded ? 'Show Less' : `Show ${experience.points.length - 2} More`}
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ↓
              </motion.span>
            </motion.button>
          )}
        </motion.div>
      </VerticalTimelineElement>
    </motion.div>
  );
};

// Enhanced Main Experience Section
const Experience = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <div ref={ref} className="relative min-h-screen py-20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Enhanced Header Section */}
        <motion.div
          variants={textVariant()}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="text-center mb-16 relative"
        >
          {/* Decorative Elements */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full"></div>
          
          <motion.div
            className="inline-flex items-center gap-4 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
            <p className={`${styles.sectionSubText} text-cyan-300 font-semibold`}>
              My Professional Journey
            </p>
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping delay-700"></div>
          </motion.div>
          
          <motion.h2 
            className={`${styles.sectionHeadText} mb-6`}
            whileHover={{ scale: 1.02 }}
          >
            Work <span className="text-cyan-400">Experience</span>
          </motion.h2>

          {/* Animated Underline */}
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full mb-8"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ delay: 0.5, duration: 1 }}
          />

          {/* Description */}
          <motion.p
            className="text-slate-400 text-lg max-w-2xl mx-auto"
            variants={fadeIn("up", "spring", 0.3, 1)}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
          >
            A timeline of my professional journey and career milestones
          </motion.p>
        </motion.div>

        {/* Enhanced Timeline */}
        <motion.div
          variants={fadeIn("up", "spring", 0.6, 1)}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="relative"
        >
          <VerticalTimeline
            lineColor="linear-gradient(to bottom, #3b82f6, #8b5cf6)"
            className="vertical-timeline--animate"
          >
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={`experience-${index}`}
                experience={experience}
                index={index}
              />
            ))}
          </VerticalTimeline>

          {/* Timeline End Marker */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="inline-flex items-center gap-3 text-slate-400 text-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              More experiences coming soon...
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");