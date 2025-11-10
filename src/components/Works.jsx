import React from "react";
import { motion } from "framer-motion";

import { styles } from "../style";
import { github, website } from "../assets"; // Import website icon
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

// Unified Design: Gradient Border (All cards use this same design)
const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  // Check if it's the Premier Aviation project to show website icon
  const isPremierAviation = name === "Premier Aviation";
  const iconSrc = isPremierAviation ? website : github;
  const iconAlt = isPremierAviation ? "live website" : "source code";

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <div 
        onClick={() => window.open(source_code_link, "_blank")}
        className="relative p-0.5 rounded-3xl sm:w-[360px] w-full h-[440px] bg-transparent group cursor-pointer"
      >
        {/* Gradient border that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
        
        <div className="relative bg-gray-900 rounded-3xl h-full w-full p-6 flex flex-col justify-between overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500"></div>
          </div>
          
          {/* Image section */}
          <div className="relative w-full h-[150px] rounded-2xl overflow-hidden">
            <img
              src={image}
              alt="project_image"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between pt-4">
            <div>
              {/* Header with title and icon */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-bold text-2xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {name}
                </h3>
                {/* Dynamic icon based on project */}
                <div className="flex-shrink-0">
                  <div className="bg-gray-800 w-10 h-10 rounded-full flex justify-center items-center border border-gray-700 group-hover:bg-gray-700 group-hover:border-gray-600 transition-all duration-300">
                    <img
                      src={iconSrc}
                      alt={iconAlt}
                      className="w-5 h-5 object-contain"
                    />
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 text-[14px] leading-relaxed">
                {description.length > 100 ? description.slice(0, 100) + "..." : description}
              </p>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span 
                  key={`${name}-${tag.name}`} 
                  className="px-3 py-1.5 rounded-full text-[12px] font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-300"
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>

          {/* Click overlay for better UX */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Works Component
const Works = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-6xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap gap-7 justify-center'>
        {projects.map((project, index) => (
          <ProjectCard 
            key={`project-${index}`} 
            index={index} 
            {...project} 
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");