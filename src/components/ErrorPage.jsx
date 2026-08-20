import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[var(--bg-primary)] px-4 sm:px-6 py-8">
      <div className="text-center w-full max-w-2xl mx-auto">
        {/* Animated 404 Text */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-[var(--text-primary)] tracking-tight leading-none">
            4
            <span className="text-cyan-400">0</span>
            4
          </h1>
          
          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mx-auto rounded-full max-w-[80px] sm:max-w-[100px] md:max-w-[120px] mt-3"
          />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-6 sm:mt-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-3 sm:mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed px-2">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <Link to="/" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="soft-btn w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </motion.button>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="soft-btn w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute top-10 left-5 sm:left-10 w-20 h-20 sm:w-28 sm:h-28 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-10 right-5 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 bg-purple-400/10 rounded-full blur-2xl pointer-events-none"
        />
      </div>
    </div>
  );
};

export default ErrorPage;