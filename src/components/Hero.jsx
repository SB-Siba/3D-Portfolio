import React from "react";
import { motion } from "framer-motion";

import { styles } from "../style";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        {/* Purple Dot with Growing Line */}
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915EFF]' />

          {/* Vertical Line Growing Downwards */}
          <motion.div
            initial={{ height: 0 }} // Start height is 0 (hidden inside dot)
            animate={{ height: "30rem" }} // Final height
            transition={{
              duration: 2.5,
              ease: [0.2, 1, 0.3, 1], // Fast to slow easing
            }}
            className='w-1 sm:h-80 h-40 violet-gradient'
          />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm{" "}
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "mirror"
              }}
              style={{
                background: "linear-gradient(90deg, #915EFF, #D8BFFF, #915EFF)", 
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                color: "transparent",
                display: "inline-block"
              }}
            >
              SIBANANDA
            </motion.span>
          </h1>
          <p className={`${styles.heroSubText} mt-1 text-white-100`}>
            I develop 3D visuals, user <br className='sm:block hidden' />
            interfaces and web applications
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
