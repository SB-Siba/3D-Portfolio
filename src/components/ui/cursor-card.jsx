// src/components/ui/cursor-card.jsx
"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/cn";

export function CursorCard({ children, image, description, href = "#", className }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e) => {
    x.set(e.clientX - 120);
    y.set(e.clientY + 20);
  };

  return (
    <>
      <span
        className={cn(
          "relative inline-block font-bold transition-colors cursor-pointer",
          "hover:text-cyan-400 dark:hover:text-cyan-400 rounded px-1 -mx-1",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        {children}
      </span>

      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              style={{
                x: springX,
                y: springY,
              }}
              className={cn(
                "fixed top-0 left-0 pointer-events-none z-50 w-[240px]",
                "bg-slate-900/95 backdrop-blur-xl p-3 shadow-2xl rounded-xl border border-slate-700/50"
              )}
            >
              <img 
                src={image} 
                alt="preview" 
                className="w-full h-auto rounded-md mb-3 object-cover" 
              />
              <p className="text-sm text-slate-300 m-0 leading-relaxed">
                {description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

export default CursorCard;