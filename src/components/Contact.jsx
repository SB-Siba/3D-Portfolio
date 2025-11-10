import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaArrowRight,
} from "react-icons/fa";
import { styles } from "../style";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";

const Contact = () => {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const leftInView = useInView(leftRef, { once: false, margin: "-100px" });
  const rightInView = useInView(rightRef, { once: false, margin: "-100px" });

  const contactCards = [
    {
      icon: <FaEnvelope className="text-3xl" />,
      title: "Email Me",
      description: "Send me an email anytime",
      link: "mailto:sbehera0330@gmail.com",
      linkText: "sbehera0330@gmail.com",
      gradient: "from-red-500 to-pink-500",
      delay: 0.2
    },
    {
      icon: <FaPhone className="text-3xl" />,
      title: "Call Me",
      description: "Mon - Fri, 9AM - 6PM",
      link: "tel:+919692199548",
      linkText: "+91 96921 99548",
      gradient: "from-green-500 to-teal-500",
      delay: 0.3
    },
    {
      icon: <FaLinkedin className="text-3xl" />,
      title: "LinkedIn",
      description: "Let's connect professionally",
      link: "https://www.linkedin.com/in/sibananda-behera-276274222",
      linkText: "Connect on LinkedIn",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.4
    },
    {
      icon: <FaMapMarkerAlt className="text-3xl" />,
      title: "Location",
      description: "Based in Bhubaneswar",
      link: "https://maps.app.goo.gl/Dj3m3HnFsBDUuWUQA",
      linkText: "View on Map",
      gradient: "from-purple-500 to-indigo-500",
      delay: 0.5
    }
  ];

  return (
    <div className="xl:mt-12 flex flex-col xl:flex-row justify-between items-center gap-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
      
      {/* Contact Cards Grid */}
      <motion.div
        ref={leftRef}
        initial={{ opacity: 0, x: -120 }}
        animate={leftInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -120 }}
        transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex-1 w-full"
      >
        <div className="text-center mb-8">
          <p className={`${styles.sectionSubText} text-gray-400`}>
            Get in touch
          </p>
          <h3 className={`${styles.sectionHeadText} text-white mb-4`}>
            Contact Me
          </h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Your vision + my code = digital magic. Let's create together.
          </p>
        </div>

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
              className="group bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-all duration-300 hover:scale-105 border border-gray-800 hover:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${card.gradient}`}>
                  {card.icon}
                </div>
                <FaArrowRight className="text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </div>
              
              <h4 className="text-white font-bold text-lg mb-2">
                {card.title}
              </h4>
              <p className="text-gray-400 text-sm mb-3">
                {card.description}
              </p>
              <p className="text-white font-medium text-sm">
                {card.linkText}
              </p>
            </motion.a>
          ))}
        </div>

        {/* Quick Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={leftInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center mt-8"
        >
          <a
            href="mailto:sbehera0330@gmail.com"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
          >
            <FaEnvelope />
            Send Quick Email
          </a>
        </motion.div>
      </motion.div>

      {/* Earth Canvas */}
      <motion.div
        ref={rightRef}
        initial={{ opacity: 0, x: 120, scale: 0.8 }}
        animate={
          rightInView
            ? { opacity: 1, x: 0, scale: 1 }
            : { opacity: 0, x: 120, scale: 0.8 }
        }
        transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex justify-center items-center w-full xl:w-[45%]"
      >
        <div className="w-full h-[350px] sm:h-[450px] md:h-[550px] xl:h-[600px] max-w-[500px]">
          <EarthCanvas />
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");