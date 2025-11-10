import React from "react";
import { motion } from "framer-motion";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { fadeIn } from "../utils/motion";

const Tech = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology, index) => (
        <motion.div
          key={technology.name}
          variants={fadeIn("up", "spring", index * 0.15, 0.75)} // 👈 Sequential delay
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }} // 👈 reanimates when scrolling back
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-28 h-28 flex justify-center items-center"
        >
          <BallCanvas icon={technology.icon} />
        </motion.div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
