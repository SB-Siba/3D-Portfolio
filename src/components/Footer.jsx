import React from "react";
import { motion } from "framer-motion";
import { 
  FaGithub, 
  FaLinkedin, 
  FaEnvelope, 
  FaCode, 
  FaHeart,
  FaArrowUp,
  FaMapMarkerAlt,
  FaPhone
} from "react-icons/fa";

const Footer = () => {
  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#work" },
    { name: "Contact", href: "#contact" }
  ];

  const socialLinks = [
    { 
      icon: <FaGithub />, 
      href: "https://github.com/SB-Siba", 
      label: "GitHub",
      gradient: "from-gray-600 to-gray-800"
    },
    { 
      icon: <FaLinkedin />, 
      href: "https://linkedin.com/in/sibananda-behera-276274222", 
      label: "LinkedIn",
      gradient: "from-blue-600 to-blue-800"
    },
    { 
      icon: <FaEnvelope />, 
      href: "mailto:sbehera0330@gmail.com", 
      label: "Email",
      gradient: "from-red-500 to-pink-600"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="relative w-full bg-slate-900/80 backdrop-blur-xl border-t border-slate-700/50"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <motion.h3 
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4"
              whileHover={{ scale: 1.02 }}
            >
              SIBANANDA BEHERA
            </motion.h3>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md mb-6">
              Full Stack Developer specializing in modern web technologies. 
              Passionate about creating efficient, scalable, and user-friendly applications 
              that make a difference.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <FaMapMarkerAlt className="text-cyan-400" />
                <span>Bangalore, Karnataka, India</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <FaPhone className="text-cyan-400" />
                <span>+91 96921 99548</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-white font-semibold mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h4 className="text-white font-semibold mb-6 text-lg">Let's Connect</h4>
            <p className="text-slate-400 text-sm mb-4">
              Ready to start your next project? Let's talk!
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300 group relative overflow-hidden`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  title={social.label}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${social.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  <div className="relative text-slate-400 group-hover:text-white transition-colors duration-300">
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick Email CTA */}
            <motion.a
              href="mailto:sbehera0330@gmail.com"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-slate-800/50 rounded-lg text-slate-300 hover:text-cyan-400 transition-all duration-300 border border-slate-700/50 hover:border-cyan-400/30 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <FaEnvelope />
              Send Quick Email
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="border-t border-slate-700/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          {/* Tech Stack */}
          <motion.div 
            className="flex items-center gap-3 text-slate-400 text-sm"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-2">
              <FaCode className="text-cyan-400" />
              <span>Built with React & Three.js</span>
            </div>
            <div className="w-1 h-1 bg-slate-600 rounded-full"></div>
            <div className="flex items-center gap-2">
              <span>Made by</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaHeart className="text-red-400" />
              </motion.div>
              <span>SB SIBA</span>
            </div>
          </motion.div>

          {/* Copyright */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-400">
              © {new Date().getFullYear()} SIBANANDA BEHERA. All rights reserved.
            </span>
            
            {/* Back to Top Button */}
            <motion.button
              onClick={scrollToTop}
              className="p-2 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-cyan-400/30 text-slate-400 hover:text-cyan-400 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              title="Back to Top"
            >
              <FaArrowUp />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Gradient accent line */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
    </motion.footer>
  );
};

export default Footer;