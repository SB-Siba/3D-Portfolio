// Loader.jsx - Fully Mobile Responsive Loader
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Pageloader = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  const loadingSteps = [
    { text: "Initializing Portfolio", emoji: "⚡", short: "Initializing" },
    { text: "Loading 3D Assets", emoji: "🎮", short: "3D Assets" },
    { text: "Setting Up Animations", emoji: "✨", short: "Animations" },
    { text: "Optimizing Performance", emoji: "🚀", short: "Optimizing" },
    { text: "Welcome to SB Portfolio", emoji: "🌟", short: "Welcome" }
  ];

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile breakpoints
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isSmallMobile = windowSize.width < 480;

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1000);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onLoadingComplete();
      }, 800);
    }, 6000);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(timer);
    };
  }, [onLoadingComplete, loadingSteps.length]);

  // Responsive values
  const logoSize = isSmallMobile ? 80 : isMobile ? 100 : isTablet ? 120 : 128;
  const titleSize = isSmallMobile ? 'text-xl' : isMobile ? 'text-2xl' : 'text-3xl';
  const subtitleSize = isSmallMobile ? 'text-xs' : 'text-sm';
  const progressBarWidth = isSmallMobile ? 'w-64' : isMobile ? 'w-72' : 'w-80';
  const containerPadding = isSmallMobile ? 'px-4' : 'px-6';
  const logoMB = isSmallMobile ? 'mb-6' : 'mb-8';
  const textMB = isSmallMobile ? 'mb-6' : 'mb-8';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900"
        >
          <div className={`text-center max-w-md mx-auto ${containerPadding} w-full`}>
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 120, 
                damping: 15,
                duration: 1.2 
              }}
              className={`mx-auto ${logoMB} relative`}
              style={{ width: logoSize, height: logoSize }}
            >
              {/* Outer Glow Ring */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              />
              
              {/* Middle Ring */}
              <motion.div
                className="absolute inset-2 bg-slate-900 rounded-full"
                animate={{
                  rotate: [0, -360],
                }}
                transition={{
                  rotate: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              />
              
              {/* Inner Content */}
              <div className="absolute inset-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-cyan-400/30">
                <motion.span 
                  className="text-cyan-400 font-bold"
                  style={{ fontSize: isSmallMobile ? '1.5rem' : isMobile ? '1.75rem' : '2rem' }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  SB
                </motion.span>
              </div>

              {/* Floating Particles */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                  style={{
                    left: `${Math.cos((i * 90 * Math.PI) / 180) * 48}%`,
                    top: `${Math.sin((i * 90 * Math.PI) / 180) * 48}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    x: [
                      0, 
                      Math.cos((i * 90 * Math.PI) / 180) * (isSmallMobile ? 15 : 20),
                      0
                    ],
                    y: [
                      0,
                      Math.sin((i * 90 * Math.PI) / 180) * (isSmallMobile ? 15 : 20),
                      0
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            {/* Loading Text */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={textMB}
            >
              <motion.div
                className={`text-cyan-400 font-bold mb-2 flex items-center justify-center gap-3 ${titleSize}`}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className={isSmallMobile ? "text-2xl" : "text-3xl"}>
                  {loadingSteps[currentStep].emoji}
                </span>
                <span className={isSmallMobile ? "text-lg" : ""}>
                  {isMobile ? loadingSteps[currentStep].short : loadingSteps[currentStep].text}
                </span>
              </motion.div>
              <motion.p
                className={`text-slate-400 ${subtitleSize}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Full Stack Developer & Creative Technologist
              </motion.p>
            </motion.div>

            {/* Progress Bar */}
            <div className="mb-8">
              <motion.div 
                className={`h-2 bg-slate-800 rounded-full overflow-hidden mx-auto mb-3 ${progressBarWidth}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full relative"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ 
                    duration: 6, 
                    ease: "easeInOut" 
                  }}
                >
                  {/* Progress Glow */}
                  <motion.div
                    className="absolute inset-0 bg-cyan-400 rounded-full"
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>
              
              {/* Progress Percentage */}
              <motion.div
                className="text-slate-400 text-sm font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {Math.min(100, Math.floor((currentStep + 1) * 20))}%
                </motion.span>
                <span className="text-cyan-400 ml-2">Complete</span>
              </motion.div>
            </div>

            {/* Loading Dots */}
            <motion.div
              className="flex justify-center gap-2 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-2 h-2 bg-cyan-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: dot * 0.2,
                  }}
                />
              ))}
            </motion.div>

            {/* System Info Grid - Hidden on small mobile */}
            {!isSmallMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="grid grid-cols-3 gap-3 mb-6 text-xs"
              >
                <div className="text-center p-2 bg-slate-800/30 rounded-lg backdrop-blur-sm">
                  <div className="text-cyan-400 font-bold mb-1">RAM</div>
                  <div className="text-slate-400">{Math.min(100, Math.floor((currentStep + 1) * 20))}%</div>
                </div>
                <div className="text-center p-2 bg-slate-800/30 rounded-lg backdrop-blur-sm">
                  <div className="text-blue-400 font-bold mb-1">GPU</div>
                  <div className="text-slate-400">
                    {currentStep > 2 ? 'Ready' : 'Loading'}
                  </div>
                </div>
                <div className="text-center p-2 bg-slate-800/30 rounded-lg backdrop-blur-sm">
                  <div className="text-purple-400 font-bold mb-1">CPU</div>
                  <div className="text-slate-400">
                    {currentStep > 1 ? 'Online' : 'Booting'}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Footer Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="text-slate-500 text-xs"
            >
              <motion.div
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className={isSmallMobile ? "text-[10px]" : ""}
              >
                Crafted with ❤️ using React & Three.js
              </motion.div>
            </motion.div>

            {/* Mobile Orientation Warning - Only show on mobile in landscape */}
            {isMobile && windowSize.width > windowSize.height && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg px-4 py-2 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 text-yellow-400 text-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h2v2h-2v-2zm0-10h2v8h-2V7z"/>
                  </svg>
                  <span>For best experience, use portrait mode</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Background Elements - Responsive sizes */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-1/4 rounded-full blur-3xl"
              style={{
                width: isSmallMobile ? '12rem' : isMobile ? '16rem' : '20rem',
                height: isSmallMobile ? '12rem' : isMobile ? '16rem' : '20rem',
                background: 'rgba(6, 182, 212, 0.05)'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 rounded-full blur-3xl"
              style={{
                width: isSmallMobile ? '12rem' : isMobile ? '16rem' : '20rem',
                height: isSmallMobile ? '12rem' : isMobile ? '16rem' : '20rem',
                background: 'rgba(59, 130, 246, 0.05)'
              }}
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.6, 0.3, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          {/* Safe area insets for notch phones */}
          <div className="absolute top-0 left-0 w-full h-[env(safe-area-inset-top)] bg-slate-900 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-[env(safe-area-inset-bottom)] bg-slate-900 pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Pageloader;