import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
} from "react-icons/fa";
import { styles } from "../style";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  return (
    <div className="xl:mt-12 flex xl:flex-row flex-col gap-10 items-center">
      {/* Contact Info Card */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-10 rounded-xl shadow-lg text-white"
      >
        <p className={`${styles.sectionSubText} text-gray-400`}>
          Let's Connect
        </p>
        <h3 className={`${styles.sectionHeadText} text-primary`}>Contact Me</h3>

        <div className="mt-6 space-y-6">
          {/* Email */}
          <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
            <FaEnvelope className="text-secondary text-2xl" />
            <a
              href="mailto:sbehera0330@gmail.com"
              className="text-lg font-medium hover:text-blue-400 transition duration-300"
            >
              sbehera0330@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
            <FaPhone className="text-secondary text-2xl" />
            <a
              href="tel:+919692199548"
              className="text-lg font-medium hover:text-green-400 transition duration-300"
            >
              +91 96921 99548
            </a>
          </div>

          {/* LinkedIn */}
          <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
            <FaLinkedin className="text-secondary text-2xl" />
            <a
              href="https://www.linkedin.com/in/sibananda-behera-276274222"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium hover:text-blue-400 transition duration-300"
            >
              linkedin.com/in/sibananda-behera-276274222
            </a>
          </div>

          {/* Location */}
          <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-lg">
            <FaMapMarkerAlt className="text-secondary text-2xl" />
            <a
              href="https://www.google.com/maps/search/Bhubaneswar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-medium hover:text-red-400 transition duration-300"
            >
              Bhubaneswar, Odisha, India
            </a>
          </div>
        </div>
      </motion.div>

      {/* EarthCanvas Animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
          duration: 0.5,
        }}
        className="xl:flex-1 xl:h-[700px] md:h-[600px] h-[450px] w-full flex justify-center items-center"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
