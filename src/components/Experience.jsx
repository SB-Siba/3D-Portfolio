import React, { useState } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion, AnimatePresence, useInView } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../style";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";

const ExperienceCard = ({ experience, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Alternate layout: even → left, odd → right (on desktop only)
  const position = index % 2 === 0 ? "left" : "right";

  return (
    <motion.div
      ref={ref}
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="relative"
    >
      <VerticalTimelineElement
        className="experience-timeline-card"
        position={position}
        date={
          <motion.div
            className="text-slate-300 font-medium text-sm"
            whileHover={{ scale: 1.05 }}
          >
            {experience.date}
          </motion.div>
        }
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
        {/* Top gradient bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />

        {/* Expand/Collapse Button (top-right) */}
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

        <motion.div className="space-y-3" layout>
          {/* Company & Title + Date fallback */}
          <div className="space-y-2">
            <motion.h3
              className="text-white text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
              whileHover={{ x: 5 }}
            >
              {experience.title}
            </motion.h3>
            <motion.p className="m-0 text-cyan-300 text-lg font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              {experience.company_name}
            </motion.p>

            {/* 👇 Fallback date — always visible inside the card */}
            <motion.p className="text-slate-400 text-xs font-medium tracking-wide">
              {experience.date}
            </motion.p>
          </div>

          {/* Tech Stack Tags */}
          {experience.technologies && (
            <motion.div
              className="flex flex-wrap gap-2 mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {experience.technologies
                .slice(0, isExpanded ? experience.technologies.length : 4)
                .map((tech, techIndex) => (
                  <motion.span
                    key={tech}
                    className="px-3 py-1 bg-slate-700/50 text-cyan-300 text-xs rounded-full border border-cyan-400/20"
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(6, 182, 212, 0.2)",
                    }}
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

          {/* Points */}
          <AnimatePresence>
            <motion.ul className="mt-4 space-y-3" layout>
              {experience.points
                .filter((_, pointIndex) => isExpanded || pointIndex < 2)
                .map((point, pointIndex) => (
                  <motion.li
                    key={`experience-point-${pointIndex}`}
                    className="text-slate-300 text-sm pl-4 relative leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: isExpanded ? pointIndex * 0.1 : 0,
                      duration: 0.4,
                    }}
                  >
                    <div className="absolute left-0 top-2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                    {point}
                  </motion.li>
                ))}
            </motion.ul>
          </AnimatePresence>

          {/* Show More/Less */}
          {experience.points.length > 2 && (
            <motion.button
              className="text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors flex items-center gap-1 mt-3"
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ gap: 2 }}
            >
              {isExpanded
                ? "Show Less"
                : `Show ${experience.points.length - 2} More`}
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

const Experience = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div ref={ref} className="relative py-12">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <p className={`${styles.sectionSubText} text-cyan-300`}>
              My Professional Journey
            </p>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </motion.div>

          <h2 className={`${styles.sectionHeadText} mb-4`}>
            Work <span className="text-cyan-400">Experience</span>
          </h2>

          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          <motion.p
            className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed"
            variants={fadeIn("", "", 0.2, 0.8)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            A timeline of my professional journey and career milestones
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={fadeIn("up", "spring", 0.4, 0.8)}
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

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 text-slate-400 text-sm">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
              More experiences coming soon...
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "work");