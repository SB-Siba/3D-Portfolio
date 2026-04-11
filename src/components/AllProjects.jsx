import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styles } from "../style";
import { github, website } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";

// Enhanced Project Card with animated gradient border
const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
  status,
  category,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const hasLiveDemo = live_demo_link && live_demo_link !== "#";

  // Check if description needs read more
  const needsReadMore = description.length > 120;
  const displayDescription = isExpanded
    ? description
    : description.slice(0, 120) + (needsReadMore ? "..." : "");

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.1, 0.75)}
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
            background: isHovered
              ? [
                  "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)",
                  "linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)",
                  "linear-gradient(225deg, #3b82f6, #8b5cf6, #06b6d4)",
                  "linear-gradient(315deg, #3b82f6, #8b5cf6, #06b6d4)",
                  "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)",
                ]
              : "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)",
          }}
          transition={{
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 },
            background: {
              duration: 3,
              repeat: isHovered ? Infinity : 0,
              ease: "linear",
            },
          }}
        />

        {/* Border glow effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0"
          animate={{
            opacity: isHovered ? [0, 0.3, 0] : 0,
          }}
          transition={{
            duration: 2,
            repeat: isHovered ? Infinity : 0,
          }}
          style={{
            background: "linear-gradient(45deg, #3b82f6, #8b5cf6, #06b6d4)",
            filter: "blur(8px)",
          }}
        />

        <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-3xl h-full w-full p-6 flex flex-col justify-between overflow-hidden border border-slate-700/50">
          {/* Image section */}
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

            {/* Status & Category Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <motion.div
                className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                {status || "Completed"}
              </motion.div>
            </div>

            <div className="absolute top-3 right-3">
              <motion.div
                className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
              >
                {category || "Web App"}
              </motion.div>
            </div>

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
                    <span className="text-white text-sm font-semibold">
                      View Project
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Content section */}
          <div className="flex flex-col flex-1 min-h-0">
            {/* Header with title and buttons */}
            <div className="flex items-start justify-between mb-3">
              <motion.h3
                className="text-white font-bold text-lg bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent flex-1 mr-4"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {name}
              </motion.h3>

              {/* Action buttons */}
              <div className="flex gap-2 flex-shrink-0">
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
                className="text-slate-300 text-sm leading-relaxed"
                animate={{
                  opacity: isHovered ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              >
                {displayDescription}
              </motion.p>

              {needsReadMore && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(!isExpanded);
                  }}
                  className="text-cyan-400 text-xs font-medium hover:text-cyan-300 transition-colors mt-2 flex items-center gap-1"
                  whileHover={{ gap: 2 }}
                >
                  {isExpanded ? "Read Less" : "Read More"}
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
                  className="px-2 py-1 rounded-full text-xs font-medium bg-slate-800/50 text-slate-300 border border-slate-600/50 backdrop-blur-sm hover:bg-blue-500/20 hover:border-blue-400/50 hover:text-blue-300 transition-all duration-300"
                  whileHover={{
                    scale: 1.05,
                    y: -1,
                  }}
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
                  className="absolute -top-2 -right-2 w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-purple-400 rounded-full"
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

// Alternative Compact Card Design
const ProjectCardCompact = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  live_demo_link,
  status,
  category,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasLiveDemo = live_demo_link && live_demo_link !== "#";

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.08, 0.75)}
      className="w-full"
    >
      <div
        className="relative p-[1px] rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 group cursor-pointer shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-2xl"
          animate={{
            opacity: isHovered ? 1 : 0.6,
          }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-2xl h-full w-full p-4 flex flex-col border border-slate-700/50">
          {/* Compact header */}
          <div className="flex gap-3 mb-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={image}
                alt="project_image"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-base mb-1 line-clamp-1 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {name}
              </h3>
              <div className="flex gap-1">
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                  {status}
                </span>
                <span className="px-1.5 py-0.5 rounded-full text-[9px] font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {category}
                </span>
              </div>
            </div>
          </div>

          {/* Compact description */}
          <p className="text-slate-300 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
            {description}
          </p>

          {/* Compact tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={`${name}-${tag.name}`}
                className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-800/50 text-slate-300 border border-slate-600/50"
              >
                {tag.name}
              </span>
            ))}
          </div>

          {/* Compact action buttons */}
          <div className="flex gap-2">
            <motion.button
              onClick={() => window.open(source_code_link, "_blank")}
              className="flex-1 py-1.5 bg-slate-800 hover:bg-blue-500/20 border border-slate-700 hover:border-blue-400 rounded-lg text-slate-300 hover:text-white transition-all duration-300 text-xs font-medium flex items-center justify-center gap-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src={github} alt="code" className="w-3 h-3" />
              Code
            </motion.button>

            {hasLiveDemo && (
              <motion.button
                onClick={() => window.open(live_demo_link, "_blank")}
                className="flex-1 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg text-white transition-all duration-300 text-xs font-medium flex items-center justify-center gap-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <img
                  src={website}
                  alt="demo"
                  className="w-3 h-3 filter brightness-0 invert"
                />
                Demo
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main AllProjects Component
const AllProjects = ({ onBack }) => {
  const [activeView, setActiveView] = useState("detailed");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(true);

  // Extend projects with additional data
  const allProjects = projects.map((project) => ({
    ...project,
    status: "Completed",
    category: "Web Development",
  }));

  // Get unique categories
  const categories = [
    "all",
    ...new Set(allProjects.map((project) => project.category)),
  ];

  // Filter projects based on search and category
  const filteredProjects = allProjects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Reset visibility when component mounts or filters change
  useEffect(() => {
    setIsVisible(true);
  }, [searchTerm, selectedCategory]);

  // Updated back button handler to match navbar navigation
  const handleBackClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      // Use the same navigation logic as your navbar
      window.history.pushState({}, "Home", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));

      // Also call the onBack prop if provided
      if (onBack && typeof onBack === "function") {
        onBack();
      }
    }, 300);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen pt-16 pb-12"
    >
      {/* Back Button - Mobile: Above heading, Desktop: Same level as heading */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button - Mobile: Above heading, Desktop: Fixed top left */}
        <div className="md:hidden w-full mb-4">
          <motion.button
            onClick={handleBackClick}
            className="px-4 py-2 bg-slate-900/80 backdrop-blur-xl rounded-xl border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 transition-all duration-300 flex items-center gap-2 text-sm w-full justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            ← Back to Home
          </motion.button>
        </div>

        {/* Desktop Back Button - Fixed position */}
        <div className="hidden md:block fixed top-24 left-6 z-40">
          <motion.button
            onClick={handleBackClick}
            className="px-4 py-2 bg-slate-900/80 backdrop-blur-xl rounded-xl border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/20 transition-all duration-300 flex items-center gap-2 text-sm"
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Back to Home
          </motion.button>
        </div>

        {/* Centered Heading and Subtitle */}
        <div className="text-center w-full py-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-3"
          >
            All <span className="text-cyan-400">Projects</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Complete collection of my work
          </motion.p>
        </div>
      </div>

      {/* Search and Filter Section - Keep this part as is but ensure it's also centered */}
      <section className="w-full py-6">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            {/* Search Input */}
            <div className="relative flex-1 w-full sm:max-w-md">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full px-4 py-3 bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-all duration-300"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
                🔍
              </div>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full sm:w-auto px-4 py-3 bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-600 text-white focus:outline-none focus:border-cyan-500 transition-all duration-300"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>

            {/* View Toggle */}
            <div className="flex gap-1 bg-slate-800/50 backdrop-blur-xl rounded-xl p-1 border border-slate-600">
              <button
                onClick={() => setActiveView("detailed")}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                  activeView === "detailed"
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/30"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                Detailed
              </button>
              <button
                onClick={() => setActiveView("compact")}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                  activeView === "compact"
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-400/30"
                    : "text-slate-400 hover:text-slate-300"
                }`}
              >
                Compact
              </button>
            </div>
          </motion.div>

          {/* Results Count - Centered */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-4"
          >
            <div className="inline-flex items-center gap-3 text-slate-400 text-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              Showing {filteredProjects.length} of {allProjects.length} projects
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid Section */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <motion.div
          key={`${activeView}-${searchTerm}-${selectedCategory}`}
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className={`grid ${
            activeView === "detailed"
              ? "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          } gap-6`}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) =>
              activeView === "detailed" ? (
                <ProjectCard
                  key={`detailed-${project.name}-${index}`}
                  index={index}
                  {...project}
                />
              ) : (
                <ProjectCardCompact
                  key={`compact-${project.name}-${index}`}
                  index={index}
                  {...project}
                />
              )
            )}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">
              No projects found
            </h3>
            <p className="text-slate-400 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <motion.button
              onClick={resetFilters}
              className="px-6 py-2 bg-cyan-500 text-white rounded-xl font-semibold hover:bg-cyan-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset filters
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SectionWrapper(AllProjects, "all-projects");
