import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { fadeIn, staggerContainer, textVariant } from "../utils/motion";
import LiveGitHubGraph from "./LiveGitHubGraph";
import ActivityBreakdown from "./ActivityBreakdown";

const GITHUB_USERNAME = "SB-Siba";

const GitHubActivity = () => {
  return (
    <div className="relative py-8 md:py-12 lg:py-16">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={textVariant()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div className="inline-flex items-center gap-2 sm:gap-3 mb-3">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <p className="text-cyan-300 text-sm sm:text-lg font-semibold tracking-wider">
              Live on GitHub
            </p>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          </motion.div>

          <motion.h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Contribution
            </span>{" "}
            Activity
          </motion.h2>

          <motion.div
            className="w-20 sm:w-28 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 mx-auto rounded-full mb-4"
            initial={{ width: 0 }}
            whileInView={{ width: "7rem" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          <motion.p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            A live snapshot of my{" "}
            <span className="text-cyan-400 font-semibold">daily commits</span>{" "}
            and pull requests — updated in real time from{" "}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="text-purple-400 font-semibold hover:underline"
            >
              @{GITHUB_USERNAME}
            </a>
          </motion.p>
        </motion.div>

        {/* Cards — side by side on desktop, stacked on mobile */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-stretch"
        >
          {/* LEFT — Green squares */}
          <motion.div
            variants={fadeIn("up", "spring", 0.1, 0.6)}
            className="p-[2px] rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 shadow-xl shadow-cyan-500/10"
          >
            <div className="rounded-2xl bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 p-4 sm:p-6 h-full flex flex-col">
              <h3 className="text-white font-semibold text-base sm:text-lg mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                Contributions in the Last Year
              </h3>
              <LiveGitHubGraph />
            </div>
          </motion.div>

          {/* RIGHT — Activity breakdown */}
          <motion.div
            variants={fadeIn("up", "spring", 0.15, 0.6)}
            className="p-[2px] rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 shadow-xl shadow-cyan-500/10"
          >
            <div className="rounded-2xl bg-slate-900/90 backdrop-blur-sm border border-slate-700/50 p-4 sm:p-6 h-full flex flex-col">
              <h3 className="text-white font-semibold text-base sm:text-lg mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                Activity Overview
              </h3>
              <ActivityBreakdown />
            </div>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 shadow-lg shadow-cyan-500/25 items-center gap-2"
          >
            <span>View Full GitHub Profile</span>
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(GitHubActivity, "github");