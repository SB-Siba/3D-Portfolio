import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";

// --------------------------------------------------
// Animation Variants
// --------------------------------------------------

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// --------------------------------------------------
// Popup helpers
// --------------------------------------------------

const getCornerOffset = (origin) => {
  const [v, h] = origin.split(" ");
  return {
    x: h === "left" ? -14 : 14,
    y: v === "top" ? -14 : 14,
  };
};

const buildPopupAnimation = (origin) => {
  const offset = getCornerOffset(origin);
  return {
    initial: {
      opacity: 0,
      scale: 0.25,
      x: offset.x,
      y: offset.y,
    },
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 450,
        damping: 22,
        mass: 0.7,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.25,
      x: offset.x,
      y: offset.y,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };
};

// --------------------------------------------------
// Animated Visual for each step - Using Lottie/JSON animations
// --------------------------------------------------

const StepVisual = ({ step }) => {
  // Map each step to an animation style
  const getAnimationStyle = (stepId) => {
    const styles = {
      0: { // Discovery
        emoji: "🔍",
        bg: "from-blue-500/20 to-cyan-500/20",
        animation: "pulse",
      },
      1: { // Requirements
        emoji: "📋",
        bg: "from-indigo-500/20 to-purple-500/20",
        animation: "bounce",
      },
      2: { // Architecture
        emoji: "🏗️",
        bg: "from-purple-500/20 to-pink-500/20",
        animation: "rotate",
      },
      3: { // Design
        emoji: "🎨",
        bg: "from-pink-500/20 to-rose-500/20",
        animation: "float",
      },
      4: { // Setup
        emoji: "⚙️",
        bg: "from-slate-500/20 to-gray-500/20",
        animation: "spin",
      },
      5: { // Backend
        emoji: "🗄️",
        bg: "from-orange-500/20 to-amber-500/20",
        animation: "pulse",
      },
      6: { // Frontend
        emoji: "💻",
        bg: "from-cyan-500/20 to-blue-500/20",
        animation: "float",
      },
      7: { // Integration
        emoji: "🔗",
        bg: "from-teal-500/20 to-emerald-500/20",
        animation: "rotate",
      },
      8: { // Review
        emoji: "🔍",
        bg: "from-yellow-500/20 to-amber-500/20",
        animation: "bounce",
      },
      9: { // QA
        emoji: "🧪",
        bg: "from-red-500/20 to-rose-500/20",
        animation: "pulse",
      },
      10: { // UAT
        emoji: "👀",
        bg: "from-green-500/20 to-emerald-500/20",
        animation: "float",
      },
      11: { // Change Loop
        emoji: "🔄",
        bg: "from-violet-500/20 to-purple-500/20",
        animation: "spin",
      },
      12: { // Staging
        emoji: "🚀",
        bg: "from-blue-500/20 to-indigo-500/20",
        animation: "float",
      },
      13: { // Production
        emoji: "🌐",
        bg: "from-amber-500/20 to-orange-500/20",
        animation: "pulse",
      },
      14: { // Handover
        emoji: "📦",
        bg: "from-emerald-500/20 to-green-500/20",
        animation: "bounce",
      },
      15: { // Maintenance
        emoji: "🔧",
        bg: "from-slate-500/20 to-gray-500/20",
        animation: "rotate",
      },
    };
    return styles[stepId] || styles[0];
  };

  const style = getAnimationStyle(step.id);
  const colorGradient = step.color || "from-blue-400 to-cyan-500";

  // Animation variants for different visual effects
  const animationVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.7, 1, 0.7],
    },
    bounce: {
      y: [0, -10, 0],
    },
    rotate: {
      rotate: [0, 360],
    },
    float: {
      y: [0, -8, 0],
      rotate: [0, 5, -5, 0],
    },
    spin: {
      rotate: [0, 360],
      scale: [1, 1.1, 1],
    },
  };

  const animation = animationVariants[style.animation] || animationVariants.pulse;

  return (
    <div
      className="relative w-full h-28 sm:h-32 mb-4 flex items-center justify-center"
      style={{ perspective: "800px" }}
    >
      {/* Glow blob behind */}
      <motion.div
        className={`absolute w-24 h-24 rounded-full bg-gradient-to-br ${colorGradient} blur-2xl opacity-40`}
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated 3D floating element */}
      <motion.div
        className={`relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${colorGradient} shadow-xl`}
        style={{ transformStyle: "preserve-3d" }}
        animate={animation}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        initial={{ rotateX: 10, rotateY: -18 }}
      >
        {/* subtle inner highlight */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 via-transparent to-transparent" />
        
        {/* Large animated emoji */}
        <motion.span
          className="text-4xl sm:text-5xl drop-shadow-lg"
          style={{ transform: "translateZ(20px)" }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {style.emoji}
        </motion.span>

        {/* Floating particles */}
        <motion.div
          className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-white/30 blur-sm"
          animate={{
            y: [0, -8, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-white/20 blur-sm"
          animate={{
            y: [0, 6, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.div>

      {/* Grounding shadow */}
      <motion.div
        className="absolute bottom-1 w-16 h-3 rounded-full bg-black/40 blur-md"
        animate={{ scaleX: [1, 0.8, 1], opacity: [0.4, 0.25, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

// --------------------------------------------------
// Component
// --------------------------------------------------

const Process = () => {
  const [activeProcess, setActiveProcess] = useState(0);
  const [processProgress, setProcessProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredProcess, setHoveredProcess] = useState(null);
  const [selectedProcess, setSelectedProcess] = useState(null);
  const [popupData, setPopupData] = useState({
    show: false,
    step: null,
    position: { top: 0, left: 0 },
    origin: "top left",
  });

  const processRef = useRef(null);
  const processInView = useInView(processRef, { once: true, amount: 0.1 });

  // --------------------------------------------------
  // Process Steps Data with animated visual indicators
  // --------------------------------------------------

  const processSteps = [
    {
      id: 0,
      title: "Client Discovery & Requirement Gathering",
      shortDesc: "Understand business goals, users, and project expectations",
      description:
        "Initial consultation / project discussion. Business goals and target audience. Website/app scope and core features. Reference websites and competitor analysis. Integrations and technical constraints. Initial timeline and project expectations.",
      deliverable: "Initial project scope and requirement notes",
      icon: "🔍",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
      visualEmoji: "🔍",
    },
    {
      id: 1,
      title: "Requirement Analysis & SRS",
      shortDesc: "Turn ideas into clear, structured, testable requirements",
      description:
        "Functional requirements. Non-functional requirements. User roles and permissions. User flows and feature breakdown. API and integration requirements. Security and performance requirements.",
      deliverable: "Approved SRS and project scope",
      icon: "📋",
      color: "from-indigo-400 to-purple-500",
      bgColor: "bg-indigo-500/20",
      borderColor: "border-indigo-500/30",
      visualEmoji: "📋",
    },
    {
      id: 2,
      title: "Project Planning & Architecture",
      shortDesc: "Define how the solution will be built",
      description:
        "Technology stack selection. Frontend, backend, and database architecture. API architecture. Authentication and authorization approach. Third-party services. Hosting/deployment architecture. Development milestones and timeline.",
      deliverable: "Technical architecture and development plan",
      icon: "🏗️",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30",
      visualEmoji: "🏗️",
    },
    {
      id: 3,
      title: "UI/UX Design & Prototyping",
      shortDesc: "Design user experience before development",
      description:
        "Information architecture and sitemap. Wireframes. UI design and responsive layouts. User journeys. Interactive prototype. Design system and reusable components. Animations, 3D, or WebGL concepts when required.",
      deliverable: "Approved UI/UX designs",
      icon: "🎨",
      color: "from-pink-400 to-rose-500",
      bgColor: "bg-pink-500/20",
      borderColor: "border-pink-500/30",
      visualEmoji: "🎨",
    },
    {
      id: 4,
      title: "Development Environment & Project Setup",
      shortDesc: "Prepare a clean development foundation",
      description:
        "Git repository and branching strategy. Project scaffolding. Environment variables. Development/staging/production environments. Dependencies and code standards. Database connection. CI/CD foundation where required.",
      deliverable: "Ready-to-develop project environment",
      icon: "⚙️",
      color: "from-slate-400 to-gray-500",
      bgColor: "bg-slate-500/20",
      borderColor: "border-slate-500/30",
      visualEmoji: "⚙️",
    },
    {
      id: 5,
      title: "Backend & Database Development",
      shortDesc: "Build the application foundation and APIs",
      description:
        "Database schema and relationships. Models and migrations. REST/GraphQL APIs. Authentication and authorization. RBAC/permissions. Business logic. Validation and error handling. Security implementation. Third-party integrations.",
      deliverable: "Functional backend and database layer",
      icon: "🗄️",
      color: "from-orange-400 to-amber-500",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/30",
      visualEmoji: "🗄️",
    },
    {
      id: 6,
      title: "Frontend Development",
      shortDesc: "Build user-facing application",
      description:
        "Pages and reusable components. Forms and validation. API integration. Authentication UI. State management. Responsive design. Animations and interactions. 3D/WebGL features. Loading, error, and empty states. Accessibility considerations.",
      deliverable: "Functional frontend",
      icon: "💻",
      color: "from-cyan-400 to-blue-500",
      bgColor: "bg-cyan-500/20",
      borderColor: "border-cyan-500/30",
      visualEmoji: "💻",
    },
    {
      id: 7,
      title: "Integration & Feature Completion",
      shortDesc: "Connect all layers into one complete system",
      description:
        "Frontend ↔ backend integration. Backend ↔ database integration. Payment gateways. Email/SMS services. CRM and analytics. AI APIs. Maps and external APIs. Webhooks and automation. End-to-end feature completion.",
      deliverable: "Complete integrated application",
      icon: "🔗",
      color: "from-teal-400 to-emerald-500",
      bgColor: "bg-teal-500/20",
      borderColor: "border-teal-500/30",
      visualEmoji: "🔗",
    },
    {
      id: 8,
      title: "Internal Review / Code Review",
      shortDesc: "Internal review before client presentation",
      description:
        "Requirement coverage. UI vs. approved design. Code quality and maintainability. Security review. API and database behavior. Performance checks. Responsive layout checks. Console errors and broken links. Edge-case review.",
      deliverable: "Internally reviewed build",
      icon: "🔍",
      color: "from-yellow-400 to-amber-500",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/30",
      visualEmoji: "🔍",
    },
    {
      id: 9,
      title: "Quality Assurance (QA) & Testing",
      shortDesc: "Validate application correctness and reliability",
      description:
        "Functional testing. UI testing. Responsive testing: mobile, tablet, desktop. Cross-browser testing. API testing. Database testing. Authentication and authorization testing. Integration testing. Performance testing. Security testing. Regression testing.",
      deliverable: "QA-tested build with resolved defects",
      icon: "🧪",
      color: "from-red-400 to-rose-500",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30",
      visualEmoji: "🧪",
    },
    {
      id: 10,
      title: "Client Review & UAT",
      shortDesc: "Real-world review and acceptance",
      description:
        "Client reviews completed features. Client validates workflows and business requirements. Collect feedback and issues. Perform User Acceptance Testing (UAT). Document requested changes.",
      deliverable: "Client approval or change requests",
      icon: "👀",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
      visualEmoji: "👀",
    },
    {
      id: 11,
      title: "Requirement Change / Feedback Loop",
      shortDesc: "Handle new requirements without losing control",
      description:
        "Analyze the requested change. Determine scope. Assess time, technical, and cost impact. Get approval. Implement change. Run QA and regression testing. Return to client review.",
      deliverable: "Approved changes implemented",
      icon: "🔄",
      color: "from-violet-400 to-purple-500",
      bgColor: "bg-violet-500/20",
      borderColor: "border-violet-500/30",
      visualEmoji: "🔄",
    },
    {
      id: 12,
      title: "Staging & Pre-Production Validation",
      shortDesc: "Validate in production-like environment",
      description:
        "Staging deployment. Production-like configuration. Environment variables and secrets. Database migration validation. SSL/HTTPS configuration. Performance validation. Final QA and smoke testing. Backup and recovery checks. Monitoring and logging setup.",
      deliverable: "Validated staging environment",
      icon: "🚀",
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
      visualEmoji: "🚀",
    },
    {
      id: 13,
      title: "Production Deployment & Launch",
      shortDesc: "Deploy to live production environment",
      description:
        "Production server/cloud configuration. Domain and DNS configuration. SSL/HTTPS. Production database. Environment variables. Build and deployment. CI/CD pipeline. Database migrations. Monitoring and error tracking. Post-deployment smoke testing.",
      deliverable: "Live production application",
      icon: "🌐",
      color: "from-amber-400 to-orange-500",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/30",
      visualEmoji: "🌐",
    },
    {
      id: 14,
      title: "Handover & Documentation",
      shortDesc: "Transfer project and operational knowledge",
      description:
        "Source code / repository access. Hosting and server information. Domain/DNS information. Database information. API documentation. Admin access and credentials transfer. Deployment documentation. User/admin documentation. Technical documentation. Backup and recovery information.",
      deliverable: "Complete project handover",
      icon: "📦",
      color: "from-emerald-400 to-green-500",
      bgColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/30",
      visualEmoji: "📦",
    },
    {
      id: 15,
      title: "Maintenance & Continuous Support",
      shortDesc: "Keep production system secure and stable",
      description:
        "Bug fixes. Security updates. Dependency updates. Performance optimization. Monitoring. Backups. Content or configuration updates. New features and future enhancements.",
      deliverable: "Ongoing maintenance and improvement",
      icon: "🔧",
      color: "from-slate-400 to-gray-500",
      bgColor: "bg-slate-500/20",
      borderColor: "border-slate-500/30",
      visualEmoji: "🔧",
    },
  ];

  // --------------------------------------------------
  // Detect Screen Size
  // --------------------------------------------------

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // --------------------------------------------------
  // Auto Rotate Active Process
  // --------------------------------------------------

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProcess((prev) => (prev + 1) % processSteps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [processSteps.length]);

  // --------------------------------------------------
  // Progress Animation
  // --------------------------------------------------

  useEffect(() => {
    const targetProgress = (activeProcess / (processSteps.length - 1)) * 100;
    const progressInterval = setInterval(() => {
      setProcessProgress((prev) => {
        const diff = targetProgress - prev;
        if (Math.abs(diff) < 0.5) return targetProgress;
        return prev + diff * 0.1;
      });
    }, 50);
    return () => clearInterval(progressInterval);
  }, [activeProcess, processSteps.length]);

  // --------------------------------------------------
  // Show Popup
  // --------------------------------------------------

  const CORNER_OVERLAP = 18;
  const EDGE_PADDING = 12;

  const showPopup = (event, step) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const popupWidth = isMobile ? Math.min(320, viewportWidth - EDGE_PADDING * 2) : 380;
    const popupHeight = isMobile ? 460 : 420;
    const gap = 10;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    const vertical =
      spaceBelow >= popupHeight + gap || spaceBelow >= spaceAbove ? "bottom" : "top";

    const spaceRight = viewportWidth - rect.right;
    const spaceLeft = rect.left;
    const horizontal =
      spaceRight >= popupWidth - CORNER_OVERLAP || spaceRight >= spaceLeft ? "right" : "left";

    let top = vertical === "bottom" ? rect.bottom + gap : rect.top - gap - popupHeight;

    let left =
      horizontal === "right"
        ? rect.right - CORNER_OVERLAP
        : rect.left - popupWidth + CORNER_OVERLAP;

    left = Math.max(EDGE_PADDING, Math.min(left, viewportWidth - popupWidth - EDGE_PADDING));
    top = Math.max(EDGE_PADDING, Math.min(top, viewportHeight - popupHeight - EDGE_PADDING));

    const origin = `${vertical === "bottom" ? "top" : "bottom"} ${
      horizontal === "right" ? "left" : "right"
    }`;

    setPopupData({
      show: true,
      step,
      position: { top, left, width: popupWidth },
      origin,
    });
  };

  // --------------------------------------------------
  // Hide Popup
  // --------------------------------------------------

  const hidePopup = () => {
    setPopupData((prev) => ({ ...prev, show: false }));
  };

  // --------------------------------------------------
  // Handle Card Interactions
  // --------------------------------------------------

  const handleMouseEnter = (event, step) => {
    if (isMobile) return;
    showPopup(event, step);
    setHoveredProcess(step.id);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    hidePopup();
    setHoveredProcess(null);
  };

  const handleClick = (event, step) => {
    if (!isMobile) return;

    if (selectedProcess === step.id) {
      hidePopup();
      setSelectedProcess(null);
      return;
    }

    showPopup(event, step);
    setSelectedProcess(step.id);
  };

  // --------------------------------------------------
  // Close Popup
  // --------------------------------------------------

  const closePopup = () => {
    hidePopup();
    setHoveredProcess(null);
    setSelectedProcess(null);
  };

  // --------------------------------------------------
  // Escape Key
  // --------------------------------------------------

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") closePopup();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // --------------------------------------------------
  // Close Popup On Scroll
  // --------------------------------------------------

  useEffect(() => {
    const handleScroll = () => {
      setPopupData((prev) => (prev.show ? { ...prev, show: false } : prev));
    };
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  const cornerDotClass = {
    "top left": "-top-1.5 -left-1.5",
    "top right": "-top-1.5 -right-1.5",
    "bottom left": "-bottom-1.5 -left-1.5",
    "bottom right": "-bottom-1.5 -right-1.5",
  };

  const popupAnimation = popupData.show
    ? buildPopupAnimation(popupData.origin)
    : buildPopupAnimation("top left");

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <>
      <section ref={processRef} className="relative py-16 lg:py-24">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          {/* SECTION HEADER */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={processInView ? "show" : "hidden"}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4">
              End-to-End Software Development Process
            </h2>

            <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto">
              Client discovery → requirements → design → development → QA → launch → handover → maintenance
            </p>

            {/* Progress Bar */}
            <div className="mt-8 max-w-2xl mx-auto px-4">
              <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"
                  style={{ width: `${processProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-500">
                <span>Start</span>
                <span className="text-blue-400">{Math.round(processProgress)}% Complete</span>
                <span>Production Ready</span>
              </div>
            </div>
          </motion.div>

          {/* PROCESS STEPS GRID */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5"
            variants={staggerContainer}
            initial="hidden"
            animate={processInView ? "show" : "hidden"}
          >
            {processSteps.map((step, index) => {
              const isActive = activeProcess === step.id;
              const isHovered = hoveredProcess === step.id;
              const isSelected = selectedProcess === step.id;

              return (
                <motion.div
                  key={step.id}
                  variants={scaleIn}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    group relative p-4 lg:p-5 rounded-xl border backdrop-blur-sm cursor-pointer select-none transition-all duration-300
                    ${
                      isActive || isHovered || isSelected
                        ? `${step.bgColor} ${step.borderColor} shadow-lg scale-[1.02] -translate-y-1`
                        : "bg-slate-800/30 border-slate-600/30 hover:border-slate-500/50"
                    }
                  `}
                  onClick={(event) => handleClick(event, step)}
                  onMouseEnter={(event) => handleMouseEnter(event, step)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Step Number */}
                  <div className="absolute top-2 right-2 text-xs font-mono text-slate-500/50">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Card Content */}
                  <div className="flex items-start gap-3">
                    <motion.div
                      animate={{
                        scale: isActive ? [1, 1.2, 1] : 1,
                        rotate: isActive ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-2xl lg:text-3xl flex-shrink-0"
                    >
                      {step.icon}
                    </motion.div>

                    <div className="flex-1 min-w-0 pr-3">
                      <h3
                        className={`
                          font-semibold text-sm lg:text-base mb-1 transition-colors
                          ${
                            isActive || isHovered || isSelected
                              ? `bg-gradient-to-r ${step.color} bg-clip-text text-transparent`
                              : "text-slate-300 group-hover:text-white"
                          }
                        `}
                      >
                        {step.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-slate-400 leading-relaxed">
                        {step.shortDesc}
                      </p>
                    </div>

                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0 shadow-lg shadow-green-400/50"
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CORE LIFECYCLE */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={processInView ? "show" : "hidden"}
            className="mt-10 p-4 lg:p-6 bg-slate-800/20 backdrop-blur-sm rounded-xl border border-slate-700/30"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs lg:text-sm">
              <span className="text-blue-400 font-semibold">Core Lifecycle:</span>
              <span className="text-slate-300">Discovery</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-300">Requirements</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-300">Architecture</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-300">Design</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-300">Setup</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-300">Backend/Database</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-300">Frontend</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-300">Integration</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-300">Internal Review</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-300">QA</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-300">Client Review/UAT</span>
              <span className="text-slate-600">→</span>
              <span className="text-yellow-400 font-semibold">Change Loop</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-300">Staging</span>
              <span className="text-slate-600">→</span>
              <span className="text-green-400 font-semibold">Production</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-300">Handover</span>
              <span className="text-slate-600">→</span>
              <span className="text-slate-300">Maintenance</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================== */}
      {/* POPUP - Portaled to <body> with Animated Visual */}
      {/* ================================================== */}

      {ReactDOM.createPortal(
        <AnimatePresence>
          {popupData.show && popupData.step && (
            <>
              {/* Mobile Backdrop */}
              {isMobile && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm"
                  onClick={closePopup}
                />
              )}

              <motion.div
                variants={popupAnimation}
                initial="initial"
                animate="animate"
                exit="exit"
                className="fixed z-[100] pointer-events-none"
                style={{
                  top: `${popupData.position.top}px`,
                  left: `${popupData.position.left}px`,
                  width: `${popupData.position.width}px`,
                  maxWidth: "calc(100vw - 24px)",
                  transformOrigin: popupData.origin,
                }}
              >
                <div
                  className={`
                    relative pointer-events-auto bg-slate-900/95 backdrop-blur-xl 
                    ${isMobile ? "rounded-2xl" : "rounded-xl"} 
                    border border-slate-700/60 shadow-2xl shadow-black/40 p-5 pt-4
                    ${isMobile ? "max-h-[80vh] overflow-y-auto" : ""}
                  `}
                >
                  {/* Close Button (Mobile) */}
                  {isMobile && (
                    <button
                      type="button"
                      onClick={closePopup}
                      className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors z-10"
                    >
                      ×
                    </button>
                  )}

                  {/* Animated Visual */}
                  <StepVisual step={popupData.step} />

                  {/* Content */}
                  <div className={isMobile ? "pr-2" : ""}>
                    <h4 className="text-white font-semibold text-base sm:text-lg mb-2 text-center">
                      {popupData.step.title}
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {popupData.step.description}
                    </p>
                    <div className="mt-3 pt-3 border-t border-slate-700/50">
                      <span className="text-xs text-slate-400">📦 Deliverable: </span>
                      <span className="text-xs text-blue-400">{popupData.step.deliverable}</span>
                    </div>
                  </div>

                  {/* Corner connector */}
                  <div
                    className={`
                      absolute w-3.5 h-3.5 rounded-[3px] rotate-45
                      bg-gradient-to-br ${popupData.step.color}
                      shadow-md shadow-black/30
                      ${cornerDotClass[popupData.origin] || cornerDotClass["top left"]}
                    `}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Process;