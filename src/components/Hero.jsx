'use client';
import React from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { styles } from "../style";
import { ComputersCanvas } from "./canvas";

// ✨ GradualSpacing Animation (Hi, I'm)
const GradualSpacing = ({ text }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="inline-flex space-x-1 align-baseline">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.span
            ref={ref}
            key={i}
            initial={{ opacity: 0, x: -18 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.07 }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};

// 💨 BlurIn Animation (SIBANANDA)
const BlurIn = ({ children }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      initial={{ filter: "blur(20px)", opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : {}}
      transition={{ duration: 1.2 }}
      style={{
        background: "linear-gradient(90deg, #915EFF, #D8BFFF, #915EFF)",
        backgroundSize: "200% 200%",
        WebkitBackgroundClip: "text",
        color: "transparent",
        display: "inline-block",
        animation: "gradientMove 3s ease-in-out infinite alternate",
      }}
    >
      {children}
    </motion.span>
  );
};

// Add gradient movement animation
const styleTag = `
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
`;

const Hero = () => {
  return (
    <>
      <style>{styleTag}</style>
      <section className="relative w-full h-screen mx-auto bg-primary">
        <div
          className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5 z-10`}
        >
          {/* Purple Dot with Line */}
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[#915EFF]" />

            {/* Vertical Line Animation */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "30rem" }}
              transition={{
                duration: 2.5,
                ease: [0.2, 1, 0.3, 1],
              }}
              className="w-1 sm:h-80 h-40 violet-gradient"
            />
          </div>

          {/* Main Hero Text */}
          <div>
            <h1 className={`${styles.heroHeadText} text-white`}>
              <GradualSpacing text="Hi, I'm" />{" "}
              <BlurIn>SIBANANDA</BlurIn>
            </h1>

            <p className={`${styles.heroSubText} mt-1 text-white-100`}>
              I develop 3D visuals, user <br className="sm:block hidden" />
              interfaces and web applications
            </p>
          </div>
        </div>

        {/* Canvas Container with Fallback */}
        <div className="absolute inset-0 z-0">
          <ComputersCanvas />
        </div>

        {/* Scroll Indicator */}
        <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10">
          <a href="#about">
            <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
              <motion.div
                animate={{ y: [0, 24, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-3 h-3 rounded-full bg-secondary mb-1"
              />
            </div>
          </a>
        </div>
      </section>
    </>
  );
};

export default Hero;