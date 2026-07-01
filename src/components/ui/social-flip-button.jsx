// src/components/ui/social-flip-button.jsx
import { motion } from "framer-motion";
import React, { useState } from "react";

export default function SocialFlipButton({ 
    items, 
    className = "", 
    itemClassName = "",
    frontClassName = "",
    backClassName = ""
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    // Animation variants for the letters
    const letterVariants = {
        initial: { 
            scale: 1,
            y: 0,
            rotate: 0
        },
        animate: (index) => ({
            scale: [1, 1.2, 1],
            y: [0, -5, 0],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                delay: index * 0.15,
                ease: "easeInOut"
            }
        })
    };

    // Glow animation for the container
    const containerVariants = {
        initial: { 
            boxShadow: "0 0 0px rgba(6, 182, 212, 0)"
        },
        animate: {
            boxShadow: [
                "0 0 0px rgba(6, 182, 212, 0)",
                "0 0 20px rgba(6, 182, 212, 0.3)",
                "0 0 40px rgba(6, 182, 212, 0.1)",
                "0 0 0px rgba(6, 182, 212, 0)"
            ],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.div 
            className={`flex items-center gap-0.5 sm:gap-1 md:gap-1.5 overflow-visible p-2 rounded-2xl ${className}`}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setHoveredIndex(null);
            }}
        >
            {items.map((item, index) => (
                <motion.div
                    key={index}
                    className="flex-shrink-0"
                    style={{ position: 'relative', display: 'inline-flex' }}
                    custom={index}
                    variants={letterVariants}
                    initial="initial"
                    animate="animate"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <a
                        href={item.href}
                        target={item.href?.startsWith('http') ? "_blank" : undefined}
                        rel={item.href?.startsWith('http') ? "noopener noreferrer" : undefined}
                        className="block"
                    >
                        <motion.div
                            className={`relative ${itemClassName}`}
                            animate={{ 
                                rotateY: isHovered ? 180 : 0,
                                scale: hoveredIndex === index ? 1.1 : 1,
                            }}
                            transition={{ 
                                duration: 0.6, 
                                type: "spring",
                                stiffness: 120,
                                damping: 15,
                                delay: index * 0.05
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Front - Letter */}
                            <div 
                                className={`absolute inset-0 flex items-center justify-center rounded-lg sm:rounded-xl ${frontClassName}`}
                                style={{ backfaceVisibility: "hidden" }}
                            >
                                <motion.span 
                                    className="font-bold"
                                    animate={{
                                        color: hoveredIndex === index ? '#22d3ee' : undefined,
                                        textShadow: hoveredIndex === index ? '0 0 20px rgba(34, 211, 238, 0.5)' : undefined
                                    }}
                                >
                                    {item.letter}
                                </motion.span>
                            </div>
                            {/* Back - Icon */}
                            <div 
                                className={`absolute inset-0 flex items-center justify-center rounded-lg sm:rounded-xl ${backClassName}`}
                                style={{ 
                                    backfaceVisibility: "hidden", 
                                    transform: "rotateY(180deg)" 
                                }}
                            >
                                <span className="flex items-center justify-center">{item.icon}</span>
                            </div>
                        </motion.div>
                    </a>
                    
                    {/* Individual Tooltip */}
                    {hoveredIndex === index && isHovered && (
                        <div
                            className="absolute z-50 pointer-events-none"
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: 'translate(-50%, calc(-100% - 12px))'
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: 5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 5 }}
                                transition={{ duration: 0.2 }}
                                className="bg-slate-900 text-white text-[8px] sm:text-[10px] md:text-xs font-medium px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-2.5 md:py-1 rounded shadow-xl border border-slate-700/50 whitespace-nowrap"
                            >
                                {item.label}
                                <div 
                                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 rotate-45 bg-slate-900 border-r border-b border-slate-700/50"
                                ></div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            ))}
        </motion.div>
    );
}