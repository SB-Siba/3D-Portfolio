import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCode,
  FaHeart,
  FaArrowUp,
  FaMapMarkerAlt,
  FaPhone,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import SocialFlipButton from "./ui/social-flip-button";

const Footer = () => {
  const particleConfigs = useMemo(
    () => [
      { position: "left-[6%] top-[12%]", duration: 4.2, delay: 0.2 },
      { position: "left-[14%] top-[68%]", duration: 5.1, delay: 0.8 },
      { position: "left-[22%] top-[38%]", duration: 4.6, delay: 1.3 },
      { position: "left-[30%] top-[80%]", duration: 5.8, delay: 0.5 },
      { position: "left-[40%] top-[22%]", duration: 4.9, delay: 1.1 },
      { position: "left-[52%] top-[72%]", duration: 6, delay: 0.3 },
      { position: "left-[60%] top-[44%]", duration: 4.4, delay: 1.6 },
      { position: "left-[68%] top-[16%]", duration: 5.2, delay: 0.9 },
      { position: "left-[76%] top-[84%]", duration: 4.8, delay: 1.4 },
      { position: "left-[84%] top-[34%]", duration: 5.6, delay: 0.7 },
      { position: "left-[90%] top-[58%]", duration: 4.3, delay: 1.9 },
      { position: "left-[96%] top-[24%]", duration: 5.4, delay: 1.2 },
    ],
    []
  );

  const footerLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#work" },
    { name: "Contact", href: "#contact" },
  ];

  // Social items spelling "CONTACT"
  const socialItems = [
    {
      letter: "C",
      icon: <FaGithub />,
      label: "GitHub",
      href: "https://github.com/SB-Siba",
    },
    {
      letter: "O",
      icon: <FaLinkedin />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/sibananda-behera-276274222",
    },
    {
      letter: "N",
      icon: <FaEnvelope />,
      label: "Email",
      href: "mailto:sbehera0330@gmail.com",
    },
    {
      letter: "T",
      icon: <FaFacebook />,
      label: "Facebook",
      href: "https://facebook.com/your-profile",
    },
    {
      letter: "A",
      icon: <FaInstagram />,
      label: "Instagram",
      href: "https://instagram.com/your-profile",
    },
    {
      letter: "C",
      icon: <FaPhone />,
      label: "Phone",
      href: "tel:+919692199548",
    },
    {
      letter: "T",
      icon: <FaEnvelope />,
      label: "Email",
      href: "mailto:sbehera0330@gmail.com",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
              Passionate about creating efficient, scalable, and user-friendly
              applications that make a difference.
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
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-white font-semibold mb-6 text-lg">
              Quick Links
            </h4>
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
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="min-w-0"
          >
            <motion.h4 
              className="text-white font-semibold mb-3 text-lg text-center sm:text-left"
            >
              Let's Connect
            </motion.h4>
            
            <motion.p 
              className="text-slate-400 text-sm mb-4 text-center sm:text-left"
            >
              Hover on letters to connect!
            </motion.p>

            {/* Social Flip Buttons with Attractive Animation */}
            <div className="w-full overflow-visible flex justify-center sm:justify-start">
              <SocialFlipButton
                items={socialItems}
                className="p-2 gap-0.5 sm:gap-1 md:gap-1.5 flex-nowrap justify-start bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl border border-cyan-500/20"
                itemClassName="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 flex-shrink-0"
                frontClassName="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-slate-300 hover:border-cyan-400/30 group-hover:text-cyan-400 transition-all text-[8px] sm:text-[10px] md:text-xs"
                backClassName="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[8px] sm:text-[10px] md:text-xs"
              />
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="border-t border-slate-700/50 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          {/* Tech Stack */}
          <motion.div
            className="flex items-center gap-3 text-slate-400 text-sm flex-wrap justify-center"
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
              © {new Date().getFullYear()} SIBANANDA BEHERA. All rights
              reserved.
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
        {particleConfigs.map((particle, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-cyan-400/20 rounded-full ${particle.position}`}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
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