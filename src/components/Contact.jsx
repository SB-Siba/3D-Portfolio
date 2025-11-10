import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaArrowRight,
  FaPaperPlane,
} from "react-icons/fa";
import { styles } from "../style";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";

const Contact = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const leftInView = useInView(leftRef, { once: false, amount: 0.3 });
  const rightInView = useInView(rightRef, { once: false, amount: 0.3 });

  const contactCards = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email Me",
      description: "Send me an email anytime",
      link: "mailto:sbehera0330@gmail.com",
      linkText: "sbehera0330@gmail.com",
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-500/10 to-pink-500/10",
      delay: 0.2
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Call Me",
      description: "Mon - Fri, 9AM - 6PM",
      link: "tel:+919692199548",
      linkText: "+91 96921 99548",
      gradient: "from-green-500 to-teal-500",
      bgGradient: "from-green-500/10 to-teal-500/10",
      delay: 0.3
    },
    {
      icon: <FaLinkedin className="text-2xl" />,
      title: "LinkedIn",
      description: "Let's connect professionally",
      link: "https://www.linkedin.com/in/sibananda-behera-276274222",
      linkText: "Connect on LinkedIn",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      delay: 0.4
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Location",
      description: "Based in Bhubaneswar",
      link: "https://maps.app.goo.gl/Dj3m3HnFsBDUuWUQA",
      linkText: "View on Map",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-500/10 to-indigo-500/10",
      delay: 0.5
    }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin className="text-xl" />,
      link: "https://www.linkedin.com/in/sibananda-behera-276274222",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaGithub className="text-xl" />,
      link: "https://github.com/your-github",
      gradient: "from-gray-500 to-gray-700",
    },
    {
      icon: <FaTwitter className="text-xl" />,
      link: "https://twitter.com/your-twitter",
      gradient: "from-sky-500 to-blue-500",
    },
    {
      icon: <FaEnvelope className="text-xl" />,
      link: "mailto:sbehera0330@gmail.com",
      gradient: "from-red-500 to-pink-500",
    }
  ];

  return (
    <div className="relative min-h-screen py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <p className={`${styles.sectionSubText} text-cyan-300`}>Get In Touch</p>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </motion.div>
          
          <h2 className={`${styles.sectionHeadText} mb-6`}>
            Let's <span className="text-cyan-400">Connect</span>
          </h2>

          {/* Animated underline */}
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full mb-8"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ delay: 0.5, duration: 1 }}
          />

          <motion.p
            className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Your vision + my code = digital magic. Let's create something 
            <span className="text-cyan-400"> extraordinary</span> together.
          </motion.p>
        </motion.div>

        <div className="flex flex-col xl:flex-row justify-between items-start gap-12 xl:gap-16">
          {/* Contact Cards Grid */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -50 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 w-full max-w-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactCards.map((card, index) => (
                <motion.a
                  key={index}
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={leftInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: card.delay, duration: 0.6 }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative p-[2px] rounded-2xl bg-gradient-to-br from-slate-700 to-slate-800 hover:from-blue-500 hover:to-cyan-500 transition-all duration-500 shadow-2xl"
                >
                  {/* Animated gradient border */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-2xl p-6 h-full border border-slate-700/50 group-hover:border-cyan-400/30 transition-all duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${card.gradient} shadow-lg`}>
                        {card.icon}
                      </div>
                      <motion.div
                        animate={{ 
                          x: hoveredCard === index ? 5 : 0,
                          scale: hoveredCard === index ? 1.1 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <FaArrowRight className="text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                      </motion.div>
                    </div>
                    
                    <h4 className="text-white font-bold text-lg mb-3 group-hover:text-cyan-100 transition-colors duration-300">
                      {card.title}
                    </h4>
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                      {card.description}
                    </p>
                    <motion.p 
                      className="text-cyan-300 font-medium text-sm group-hover:text-cyan-200 transition-colors duration-300"
                      animate={{ 
                        x: hoveredCard === index ? 3 : 0 
                      }}
                    >
                      {card.linkText}
                    </motion.p>

                    {/* Floating particles on hover */}
                    {hoveredCard === index && (
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
                          className="absolute -bottom-2 -left-2 w-2 h-2 bg-blue-400 rounded-full"
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                      </>
                    )}
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={leftInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="text-center mt-8"
            >
              <motion.a
                href="mailto:sbehera0330@gmail.com"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg shadow-cyan-500/25 group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPaperPlane className="group-hover:rotate-12 transition-transform duration-300" />
                Send Quick Email
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={leftInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
              className="flex justify-center gap-4 mt-8"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300 group`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className={`text-slate-400 group-hover:text-white transition-colors duration-300`}>
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Earth Canvas */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={
              rightInView
                ? { opacity: 1, x: 0, scale: 1 }
                : {}
            }
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full xl:w-[45%] flex justify-center items-center"
          >
            <div className="relative w-full max-w-[500px] h-[400px] sm:h-[500px] md:h-[550px] xl:h-[600px]">
              {/* Canvas Container with Gradient Border */}
              <div className="absolute inset-0 p-[2px] rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500">
                <div className="w-full h-full rounded-3xl bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 overflow-hidden">
                  <EarthCanvas />
                </div>
              </div>
              
              {/* Floating elements around canvas */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-cyan-400 rounded-full blur-sm"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full blur-sm"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");