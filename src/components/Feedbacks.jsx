// FeedbacksDesign1.jsx
import React from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";
import { styles } from "../style";

const FeedbackCard = ({ testimonial, name, company, designation, image, index }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.8)}
    initial="hidden"
    whileInView="show"
    viewport={{ once: false }}
    className="bg-[#1d1836] p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl w-full sm:w-[300px] md:w-[320px] flex flex-col justify-between hover:scale-[1.03] transition-transform duration-500"
  >
    {/* Quote */}
    <p className="text-[40px] text-purple-400 mb-2 sm:mb-4 leading-none">“</p>

    {/* Testimonial Text */}
    <p className="text-white text-[14px] sm:text-[15px] md:text-[16px] italic leading-relaxed text-center sm:text-left">
      {testimonial}
    </p>

    {/* User Info */}
    <div className="mt-6 flex flex-col items-center text-center">
      <img
        src={image}
        alt={name}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-purple-400"
      />
      <p className="text-white font-semibold mt-3 text-[15px] sm:text-[16px]">@{name}</p>
      <p className="text-gray-400 text-xs sm:text-sm mt-1">
        {designation}, {company}
      </p>
    </div>
  </motion.div>
);

const FeedbacksDesign1 = () => (
  <section className="py-14 sm:py-16 md:py-20 bg-black-100 px-4 sm:px-6 md:px-10">
    {/* Section Header */}
    <motion.div
      variants={textVariant()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false }}
      className="text-center"
    >
      <p className={`${styles.sectionSubText}`}>What others say</p>
      <h2 className={`${styles.sectionHeadText}`}>Testimonials</h2>
    </motion.div>

    {/* Cards Grid */}
    <div
      className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center"
    >
      {testimonials.map((t, i) => (
        <FeedbackCard key={i} {...t} index={i} />
      ))}
    </div>
  </section>
);

export default FeedbacksDesign1;
