import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";
import { styles } from "../style";

const Feedbacks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  // Pause auto-slide on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Navigation handlers
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = testimonials[currentIndex];

  // Generate star rating
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="relative py-16 md:py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
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
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
            <p className="text-purple-300 text-sm font-medium tracking-wider">Testimonials</p>
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            What Clients <span className="text-purple-400">Say</span>
          </h2>

          <motion.div
            className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          />
        </motion.div>

        {/* Testimonial Card */}
        <div 
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl border border-purple-500/20 p-8 md:p-10 shadow-2xl shadow-purple-500/10"
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
              {/* Left - Avatar & Info */}
              <div className="flex-shrink-0 flex flex-col items-center md:items-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 blur-xl opacity-50 animate-pulse"></div>
                  <motion.img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-purple-400/50 relative z-10"
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute bottom-0 right-0 z-20 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
                </div>
                
                <motion.h3 
                  className="text-white font-bold text-lg md:text-xl mt-4"
                >
                  {currentTestimonial.name}
                </motion.h3>
                
                <p className="text-slate-400 text-sm">
                  {currentTestimonial.designation}
                </p>
                
                <p className="text-purple-300 text-xs mt-0.5 font-medium">
                  {currentTestimonial.company}
                </p>

                {/* Rating */}
                <div className="flex gap-1 mt-3">
                  {renderStars(currentTestimonial.rating || 5)}
                </div>
              </div>

              {/* Right - Testimonial Content */}
              <div className="flex-1 relative">
                {/* Quote Icon */}
                <div className="absolute -top-2 -left-2 text-6xl text-purple-400/10">
                  "
                </div>
                
                <div className="relative z-10">
                  <p className="text-slate-200 text-base md:text-lg leading-relaxed italic">
                    "{currentTestimonial.testimonial}"
                  </p>
                  
                  <div className="flex items-center gap-2 mt-4 text-purple-400/50">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-purple-400/30"></div>
                    <span className="text-xs font-medium tracking-wider">✦</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-purple-400/30"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Controls - Positioned outside card */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={goToPrevious}
              className="w-10 h-10 rounded-full bg-slate-800/50 border border-purple-400/20 text-purple-400 hover:bg-purple-400/20 hover:border-purple-400/50 transition-all flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Dot Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400"
                      : "w-1.5 h-1.5 bg-slate-600 hover:bg-slate-400"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>

            <motion.button
              onClick={goToNext}
              className="w-10 h-10 rounded-full bg-slate-800/50 border border-purple-400/20 text-purple-400 hover:bg-purple-400/20 hover:border-purple-400/50 transition-all flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* Slide Counter */}
          <div className="text-center mt-4">
            <p className="text-slate-500 text-xs">
              {currentIndex + 1} / {testimonials.length}
            </p>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          variants={fadeIn("up", "spring", 0.8, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mt-8"
        >
          {/* <div className="inline-flex items-center gap-2 text-slate-500 text-xs">
            <span>✦</span>
            <span>Real experiences from real clients</span>
            <span>✦</span>
          </div> */}
        </motion.div>
      </div>
    </div>
  );
};

export default Feedbacks;