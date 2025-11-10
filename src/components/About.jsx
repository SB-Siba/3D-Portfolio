"use client";
import React from "react";
import { Tilt } from "react-tilt";
import { motion, useInView } from "framer-motion";

import { styles } from "../style";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import ScrollReveal from "./ScrollReveal"; // Custom scroll animation wrapper (optional)

// 🎯 Each Service Card Animates on Scroll
const ServiceCard = ({ index, title, icon }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: false, // allow replay on scroll up
    amount: 0.3, // trigger when 30% visible
  });

  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        ref={ref}
        variants={fadeIn("up", "spring", index * 0.2, 0.75)}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
        className="w-full p-[2px] rounded-[20px] shadow-card bg-gradient-to-r from-[#00cea8] to-[#bf61ff]"
      >
        <div
          options={{ max: 45, scale: 1, speed: 450 }}
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img src={icon} alt={title} className="w-16 h-16 object-contain" />

          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

// 🎯 About Section + Services Grid
const About = () => {
  return (
    <>
      {/* Section Heading */}
      <motion.div variants={textVariant(0.1)}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      {/* Paragraph fade-in */}
      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        className="mt-4 text-secondary text-[17px] max-w-6xl leading-[30px]"
      >
        I'm a passionate and skilled software developer with expertise in
        TypeScript and JavaScript, specializing in modern frameworks like React,
        Node.js, and Three.js. With a strong problem-solving mindset and a keen
        eye for detail, I focus on building efficient, scalable, and
        user-friendly applications. I thrive in collaborative environments,
        working closely with clients to transform ideas into innovative digital
        solutions. Let's create something amazing together!
      </motion.p>

      {/* Services Grid with Scroll Animation */}
      <div className="mt-20 flex flex-wrap gap-10 justify-center">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
