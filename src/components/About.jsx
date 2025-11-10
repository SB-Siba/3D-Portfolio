import React, { useRef, useState } from "react";
import { Tilt } from "react-tilt";
import { motion, useInView } from "framer-motion";
import { styles } from "../style";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// Add missing staggerContainer variant
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// Enhanced Service Card with 3D effects
const ServiceCard = ({ index, title, icon, description }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.3,
  });

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="w-full"
    >
      <Tilt
        options={{
          max: 15,
          scale: 1.05,
          speed: 500,
          glare: true,
          "max-glare": 0.2,
        }}
        className="w-full h-full"
      >
        <motion.div
          className="w-full p-[2px] rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 shadow-2xl"
          whileHover={{ y: -5 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 min-h-[320px] flex flex-col justify-between items-center text-center border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300">
            {/* Animated Icon Container */}
            <motion.div
              className="relative mb-4"
              animate={{
                scale: isHovered ? 1.1 : 1,
                rotateY: isHovered ? 180 : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <img 
                  src={icon} 
                  alt={title} 
                  className="w-10 h-10 object-contain filter brightness-0 invert"
                />
              </div>
              
              {/* Floating particles */}
              {isHovered && (
                <>
                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-400 rounded-full"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                  />
                </>
              )}
            </motion.div>

            {/* Title with gradient text */}
            <h3 className="text-white text-xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {title}
            </h3>

            {/* Description */}
            <p className="text-slate-300 text-sm leading-relaxed flex-1">
              {description}
            </p>

            {/* Hover indicator */}
            <motion.div
              className="w-8 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full mt-4"
              animate={{ width: isHovered ? "100%" : "2rem" }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </Tilt>
    </motion.div>
  );
};

// Enhanced About Section
const About = () => {
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: false, amount: 0.2 });

  // Add scrollToContact function here in the main About component
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const stats = [
    { number: "50+", label: "Projects Completed" },
    { number: "3+", label: "Years Experience" },
    { number: "30+", label: "Happy Clients" },
    { number: "15+", label: "Technologies" },
  ];

  return (
    <div ref={aboutRef} className="relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header with Enhanced Animation */}
        <motion.div
          variants={textVariant(0.1)}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="text-center mb-16 pt-20"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <p className={`${styles.sectionSubText} text-cyan-300`}>Get To Know More</p>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </motion.div>
          
          <h2 className={`${styles.sectionHeadText} mb-6`}>
            About <span className="text-cyan-400">Me</span>
          </h2>

          {/* Animated underline */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left Column - Personal Story */}
          <motion.div
            variants={fadeIn("right", "spring", 0.2, 1)}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="space-y-6"
          >
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-cyan-400">👨‍💻</span>
                My Journey
              </h3>
              <motion.p
                variants={fadeIn("", "", 0.3, 1)}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="text-slate-300 text-lg leading-relaxed"
              >
                I'm a passionate full-stack developer specializing in creating 
                <span className="text-cyan-400"> immersive digital experiences</span>. With expertise in 
                <span className="text-blue-400"> modern web technologies</span> and a keen eye for 
                <span className="text-purple-400"> innovative solutions</span>, I transform complex ideas into 
                <span className="text-green-400"> elegant, user-friendly applications</span>.
              </motion.p>

              <motion.p
                variants={fadeIn("", "", 0.5, 1)}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
                className="text-slate-300 text-lg leading-relaxed mt-4"
              >
                My journey in tech has been driven by a constant curiosity for 
                <span className="text-yellow-400"> cutting-edge technologies</span> and a commitment to 
                <span className="text-orange-400"> delivering exceptional results</span>. I thrive on challenges 
                and believe in the power of technology to create meaningful impact.
              </motion.p>
            </div>

            {/* Stats Grid */}
            <motion.div
              variants={fadeIn("up", "spring", 0.7, 1)}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-slate-900/50 backdrop-blur-xl rounded-xl p-4 text-center border border-slate-700/50 hover:border-blue-400/30 transition-all duration-300"
                  whileHover={{ y: -2, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-slate-400 text-sm mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Skills & Expertise */}
          <motion.div
            variants={fadeIn("left", "spring", 0.4, 1)}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="space-y-6"
          >
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 hover:border-purple-400/30 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-purple-400">🚀</span>
                What I Do
              </h3>
              
              <div className="space-y-4">
                {[
                  "Full-Stack Web Development",
                  "3D Interactive Experiences",
                  "AI Integration & Research",
                  "Responsive UI/UX Design",
                  "API Development & Integration",
                  "Performance Optimization"
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30 hover:bg-slate-700/50 transition-all duration-300"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-300">{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              variants={fadeIn("up", "spring", 0.8, 1)}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-6 border border-cyan-400/30 text-center"
            >
              <h4 className="text-white font-semibold mb-2">Ready to start your project?</h4>
              <p className="text-slate-300 text-sm mb-4">
                Let's collaborate to bring your vision to life with cutting-edge technology.
              </p>
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                onClick={scrollToContact}
                whileTap={{ scale: 0.95 }}
              >
                Let's Talk
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Services Grid */}
        <motion.div
          variants={fadeIn("up", "spring", 0.6, 1)}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-white mb-4">
            My <span className="text-cyan-400">Services</span>
          </h3>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Comprehensive solutions tailored to your unique needs, from concept to deployment.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {services.map((service, index) => (
            <ServiceCard 
              key={service.title} 
              index={index} 
              {...service} 
              description={service.description || "Professional service delivery with attention to detail and quality."}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");