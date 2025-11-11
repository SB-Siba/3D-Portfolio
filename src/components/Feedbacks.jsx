import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant, staggerContainer } from "../utils/motion";
import { testimonials } from "../constants";
import { styles } from "../style";

const FeedbackCard = ({ 
  testimonial, 
  name, 
  company, 
  designation, 
  image, 
  index,
  rating 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if testimonial needs read more
  const needsReadMore = testimonial.length > 120;
  const displayTestimonial = isExpanded ? testimonial : testimonial.slice(0, 120) + (needsReadMore ? "..." : "");

  // Generate star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <motion.span
        key={i}
        className={`text-lg ${
          i < rating ? "text-yellow-400" : "text-gray-600"
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: i * 0.1 }}
      >
        ★
      </motion.span>
    ));
  };

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }} // Changed to once: true
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 group cursor-pointer shadow-2xl h-full">
        {/* Animated gradient border */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-3xl"
          animate={{
            opacity: isHovered ? 1 : 0.7,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-3xl h-full w-full p-6 flex flex-col justify-between border border-slate-700/50">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500"></div>
          </div>

          {/* Quote icon */}
          <motion.div
            className="text-6xl text-purple-400 mb-2 leading-none"
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            "
          </motion.div>

          {/* Testimonial content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              {/* Star rating */}
              <motion.div 
                className="flex gap-1 mb-4 justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {renderStars(rating || 5)}
              </motion.div>

              {/* Testimonial text */}
              <motion.p
                className="text-slate-300 text-[15px] leading-relaxed text-center mb-4"
                animate={{ 
                  opacity: isHovered ? 1 : 0.9,
                }}
                transition={{ duration: 0.3 }}
              >
                {displayTestimonial}
              </motion.p>

              {/* Read More/Less Button */}
              {needsReadMore && (
                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-purple-400 text-[12px] font-medium hover:text-purple-300 transition-colors mx-auto flex items-center gap-1 mb-4"
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

            {/* User info */}
            <motion.div 
              className="flex flex-col items-center text-center mt-4"
              animate={{
                y: isHovered ? -5 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <motion.img
                  src={image}
                  alt={name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple-400/50 group-hover:border-purple-400 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                />
                {/* Online indicator */}
                <motion.div
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"
                  animate={{
                    scale: isHovered ? [1, 1.2, 1] : 1,
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </div>
              
              <motion.p 
                className="text-white font-bold mt-3 text-[16px] bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
              >
                @{name}
              </motion.p>
              
              <p className="text-slate-400 text-sm mt-1">
                {designation}
              </p>
              
              <motion.p 
                className="text-purple-300 text-xs mt-1 font-medium"
                animate={{
                  opacity: isHovered ? 1 : 0.8,
                }}
              >
                {company}
              </motion.p>
            </motion.div>
          </div>

          {/* Floating particles on hover */}
          <AnimatePresence>
            {isHovered && (
              <>
                <motion.div
                  className="absolute -top-2 -left-2 w-3 h-3 bg-pink-400 rounded-full"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute -bottom-2 -right-2 w-2 h-2 bg-orange-400 rounded-full"
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

const FeedbacksDesign1 = () => {
  return (
    <div className="relative py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Enhanced Header */}
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            <p className={`${styles.sectionSubText} text-purple-300`}>Client Testimonials</p>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          </motion.div>
          
          <h2 className={`${styles.sectionHeadText} mb-6`}>
            What People <span className="text-purple-400">Say</span>
          </h2>

          {/* Animated underline */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
          />

          {/* Description */}
          <motion.p
            className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed"
            variants={fadeIn("", "", 0.3, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            Don't just take my word for it. Here's what clients and colleagues have to say about 
            working with me. Their feedback drives me to deliver 
            <span className="text-purple-400"> exceptional results</span> every time.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }} // Changed to once: true
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              <FeedbackCard 
                key={`testimonial-${testimonial.name}-${index}`} 
                index={index} 
                {...testimonial} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Simple Footer Note */}
        <motion.div
          variants={fadeIn("up", "spring", 0.8, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }} // Changed to once: true
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 text-slate-400 text-sm">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            Thank you for your trust and feedback
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbacksDesign1;