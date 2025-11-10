import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaHeart } from "react-icons/fa";

const Footer = () => {
  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#work" },
    { name: "Contact", href: "#contact" }
  ];

  const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/SB-Siba", label: "GitHub" },
    { icon: <FaLinkedin />, href: "https://linkedin.com/in/sibananda-behera-276274222", label: "LinkedIn" },
    { icon: <FaEnvelope />, href: "mailto:sbehera0330@gmail.com", label: "Email" }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative w-full bg-primary/80 backdrop-blur-md"
    >
      {/* Roof Tin Line Design */}
      <div className="relative h-4 bg-gradient-to-b from-gray-800 to-transparent overflow-hidden">
        {/* Roof tin pattern */}
        <div className="absolute top-0 left-0 right-0 h-4 flex">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 h-full border-r border-gray-600/50 relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.02 }}
            >
              {/* Tin sheet segments */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 transform -skew-x-12"></div>
              
              {/* Rivets/bolts */}
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </motion.div>
          ))}
        </div>

        {/* Roof shadow effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-900 to-transparent"></div>
      </div>

      {/* Diagonal cut effect below roof */}
      <div className="h-2 bg-gradient-to-b from-gray-900/50 to-transparent transform -skew-y-1 -mt-1"></div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              SIBANANDA BEHERA
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Full Stack Developer specializing in modern web technologies. 
              Passionate about creating efficient, scalable, and user-friendly applications.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h4 className="text-white font-semibold mb-4">Let's Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-4 md:mb-0">
            <FaCode className="text-blue-400" />
            <span>Built with React & Three.js</span>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-400">
              © {new Date().getFullYear()} SIBANANDA BEHERA
            </span>
            <div className="flex items-center space-x-1 text-gray-400">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaHeart className="text-red-400" />
              </motion.div>
              <span>Me</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </motion.footer>
  );
};

export default Footer;