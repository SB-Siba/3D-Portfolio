import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import * as THREE from "three";
import profileImage from "../assets/profile/Profile.jpeg";

// Animation variants
const slideInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 100 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const slideInFromBottom = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

const Hero = ({ onScrollStateChange }) => {
  const moleculeCanvasRef = useRef(null);
  const [activeProcess, setActiveProcess] = useState(0);
  const [processProgress, setProcessProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const imageRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonsRef = useRef(null);
  const rightContentRef = useRef(null);
  const processRef = useRef(null);
  const availabilityRef = useRef(null);

  // Scroll detection for sticky hero effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldBeSticky = scrollTop > 100;
      if (shouldBeSticky !== isScrolledDown) {
        setIsScrolledDown(shouldBeSticky);
        if (onScrollStateChange) {
          onScrollStateChange(shouldBeSticky);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolledDown, onScrollStateChange]);

  // Check if elements are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.1 });
  const nameInView = useInView(nameRef, { once: true, amount: 0.1 });
  const imageInView = useInView(imageRef, { once: true, amount: 0.1 });
  const descriptionInView = useInView(descriptionRef, {
    once: true,
    amount: 0.1,
  });
  const buttonsInView = useInView(buttonsRef, { once: true, amount: 0.1 });
  const rightContentInView = useInView(rightContentRef, {
    once: true,
    amount: 0.1,
  });
  const processInView = useInView(processRef, { once: true, amount: 0.2 });
  const availabilityInView = useInView(availabilityRef, {
    once: true,
    amount: 0.1,
  });

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Function to scroll to projects section
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      projectsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Image protection - prevent dragging, right-click, etc.
  useEffect(() => {
    const protectImage = (e) => {
      // Prevent right-click context menu
      if (e.type === "contextmenu") {
        e.preventDefault();
        return false;
      }

      // Prevent dragging
      if (e.type === "dragstart") {
        e.preventDefault();
        return false;
      }

      // Prevent text selection
      if (e.type === "selectstart") {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners for image protection
    const imageElements = document.querySelectorAll("img");
    imageElements.forEach((img) => {
      img.addEventListener("contextmenu", protectImage);
      img.addEventListener("dragstart", protectImage);
      img.addEventListener("selectstart", protectImage);
      img.setAttribute("draggable", "false");
      img.style.userSelect = "none";
      img.style.webkitUserSelect = "none";
      img.style.webkitUserDrag = "none";
    });

    // Add global protection
    document.addEventListener("contextmenu", (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
        return false;
      }
    });

    return () => {
      imageElements.forEach((img) => {
        img.removeEventListener("contextmenu", protectImage);
        img.removeEventListener("dragstart", protectImage);
        img.removeEventListener("selectstart", protectImage);
      });
      document.removeEventListener("contextmenu", protectImage);
    };
  }, []);

  // Process steps with descriptions and icons
  const processSteps = [
    {
      id: 0,
      title: "Idea & Research",
      description:
        "Market analysis, AI technology research, and project conceptualization",
      icon: "💡",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/30",
    },
    {
      id: 1,
      title: "SRS Documentation",
      description:
        "Technical specifications, AI architecture planning, and system design",
      icon: "📋",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      id: 2,
      title: "UI/UX Design",
      description:
        "3D interface prototyping, user experience design, and interactive wireframes",
      icon: "🎨",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      id: 3,
      title: "3D Development",
      description:
        "Three.js implementation, WebGL optimization, and immersive experiences",
      icon: "🔮",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
    },
    {
      id: 4,
      title: "Frontend Development",
      description:
        "React components, modern JavaScript, and responsive interfaces",
      icon: "⚛️",
      color: "from-cyan-400 to-blue-500",
      bgColor: "bg-cyan-500/20",
      borderColor: "border-cyan-500/30",
    },
    {
      id: 5,
      title: "Backend Development",
      description:
        "API development, server architecture, and business logic implementation",
      icon: "🔧",
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/30",
    },
    {
      id: 6,
      title: "Database Design",
      description:
        "PostgreSQL/MySQL schema design, optimization, and data modeling",
      icon: "🗃️",
      color: "from-emerald-400 to-green-500",
      bgColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/30",
    },
    {
      id: 7,
      title: "AI Integration",
      description:
        "Machine learning APIs, AI technology implementation, and smart features",
      icon: "🤖",
      color: "from-indigo-400 to-purple-500",
      bgColor: "bg-indigo-500/20",
      borderColor: "border-indigo-500/30",
    },
    {
      id: 8,
      title: "Testing & QA",
      description:
        "Unit testing, integration testing, and performance optimization",
      icon: "🧪",
      color: "from-red-400 to-pink-500",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30",
    },
    {
      id: 9,
      title: "Bug Fixing",
      description:
        "Debugging, performance optimization, and cross-browser compatibility",
      icon: "🐛",
      color: "from-amber-400 to-yellow-500",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/30",
    },
    {
      id: 10,
      title: "Deployment",
      description:
        "CI/CD pipeline, cloud deployment, and production environment setup",
      icon: "🚀",
      color: "from-teal-400 to-cyan-500",
      bgColor: "bg-teal-500/20",
      borderColor: "border-teal-500/30",
    },
    {
      id: 11,
      title: "Production Ready",
      description: "Monitoring, maintenance, and continuous improvement",
      icon: "🏆",
      color: "from-lime-400 to-green-500",
      bgColor: "bg-lime-500/20",
      borderColor: "border-lime-500/30",
    },
  ];

  // Auto-rotate through process steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProcess((prev) => (prev + 1) % processSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [processSteps.length]);

  // Smooth progress animation
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

  // DNA Helix Molecular Structure for Right Side
  useEffect(() => {
    if (!moleculeCanvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 400 / 400, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: moleculeCanvasRef.current,
      alpha: true,
      antialias: !isMobile,
    });

    const canvasSize = isMobile ? 300 : 400;
    renderer.setSize(canvasSize, canvasSize);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));

    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x3b82f6, 1.2);
    directionalLight1.position.set(10, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x8b5cf6, 0.8);
    directionalLight2.position.set(-5, 10, 5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0x06b6d4, 1, 50);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    const helixRadius = 1.5;
    const helixTurns = 4;
    const segments = 100;
    const basePairs = 20;

    const backboneGeometry = new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(
        Array.from({ length: segments + 1 }, (_, i) => {
          const t = (i / segments) * Math.PI * 2 * helixTurns;
          const x = helixRadius * Math.cos(t);
          const y = helixRadius * Math.sin(t);
          const z = (i - segments / 2) * 0.2;
          return new THREE.Vector3(x, y, z);
        }),
      ),
      segments,
      0.05,
      8,
      false,
    );

    const backboneMaterial1 = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      shininess: 100,
      transparent: true,
      opacity: 0.9,
    });

    const backboneMaterial2 = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      shininess: 100,
      transparent: true,
      opacity: 0.9,
    });

    const backbone1 = new THREE.Mesh(backboneGeometry, backboneMaterial1);
    const backbone2 = new THREE.Mesh(backboneGeometry, backboneMaterial2);
    backbone2.rotation.y = Math.PI;
    dnaGroup.add(backbone1);
    dnaGroup.add(backbone2);

    const basePairGeometry = new THREE.CylinderGeometry(
      0.03,
      0.03,
      helixRadius * 2,
      8,
    );

    const basePairMaterials = [
      new THREE.MeshPhongMaterial({ color: 0x10b981 }),
      new THREE.MeshPhongMaterial({ color: 0xf59e0b }),
      new THREE.MeshPhongMaterial({ color: 0xef4444 }),
      new THREE.MeshPhongMaterial({ color: 0x06b6d4 }),
    ];

    for (let i = 0; i < basePairs; i++) {
      const t = (i / basePairs) * Math.PI * 2 * helixTurns;
      const height = (i - basePairs / 2) * 0.4;

      const basePair = new THREE.Mesh(
        basePairGeometry,
        basePairMaterials[i % basePairMaterials.length],
      );

      basePair.position.set(0, 0, height);
      basePair.rotation.z = t;
      basePair.rotation.x = Math.PI / 2;

      dnaGroup.add(basePair);
    }

    const electronGroup = new THREE.Group();
    dnaGroup.add(electronGroup);

    const electronGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const electronMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0x00ffff,
      emissiveIntensity: 0.5,
    });

    for (let i = 0; i < 8; i++) {
      const electron = new THREE.Mesh(electronGeometry, electronMaterial);
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2.5;

      electron.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0,
      );

      electron.userData.initialAngle = angle;
      electron.userData.speed = 2 + Math.random();
      electronGroup.add(electron);
    }

    camera.position.z = 8;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = () => {
      isDragging = true;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMove = (event) => {
      if (!isDragging) return;

      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y,
      };

      dnaGroup.rotation.y += deltaMove.x * 0.01;
      dnaGroup.rotation.x += deltaMove.y * 0.01;

      previousMousePosition = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    moleculeCanvasRef.current.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        dnaGroup.rotation.y = elapsedTime * 0.2;
        dnaGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;
      }

      electronGroup.children.forEach((electron, index) => {
        const angle =
          electron.userData.initialAngle +
          elapsedTime * electron.userData.speed;
        const radius = 2.5 + Math.sin(elapsedTime * 2 + index) * 0.3;

        electron.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          Math.sin(elapsedTime * 3 + index) * 0.5,
        );
      });

      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.1;
      dnaGroup.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newCanvasSize = window.innerWidth < 768 ? 300 : 400;
      renderer.setSize(newCanvasSize, newCanvasSize);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      moleculeCanvasRef.current?.removeEventListener(
        "mousedown",
        handleMouseDown,
      );
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [isMobile]);

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Add a transparent overlay to prevent image selection */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{ userSelect: "none", WebkitUserSelect: "none" }}
      />

      <div className="relative z-10 w-full min-h-screen flex items-center pt-16 lg:pt-20 pb-20 lg:pb-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
          {/* Center Section with Name and Image */}
          <motion.div
            className={`flex flex-col items-center justify-center mb-8 lg:mb-12 transition-all duration-500 ${
              isScrolledDown ? "opacity-0" : "opacity-100"
            }`}
            animate={{
              marginBottom: isScrolledDown ? "1rem" : "3rem",
              scale: isScrolledDown ? 0.9 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            {/* Profile Image with Enhanced Border Animation */}
            <motion.div
              ref={imageRef}
              layoutId="hero-image"
              initial={{ opacity: 0, scale: 0.8, rotateY: -180 }}
              animate={
                imageInView
                  ? {
                      opacity: isScrolledDown ? 0 : 1,
                      scale: isScrolledDown ? 0.6 : 1,
                      rotateY: 0,
                    }
                  : { opacity: 0, scale: 0.8, rotateY: -180 }
              }
              transition={{ duration: 1.2, ease: "easeOut" }}
              whileHover={{ scale: isScrolledDown ? 0.65 : 1.05 }}
              className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 mb-6 lg:mb-8"
            >
              {/* Enhanced Outer Glow Ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: isScrolledDown
                    ? "0 0 10px rgba(59, 130, 246, 0.3), 0 0 20px rgba(139, 92, 246, 0.2)"
                    : [
                        "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)",
                        "0 0 30px rgba(59, 130, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.5)",
                        "0 0 40px rgba(6, 182, 212, 0.6), 0 0 80px rgba(59, 130, 246, 0.4)",
                        "0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(59, 130, 246, 0.5)",
                        "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.3)",
                      ],
                }}
                transition={{
                  duration: isScrolledDown ? 2 : 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Enhanced Rotating Border with Multiple Layers */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: isScrolledDown ? 10 : 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Pulsing Border Layer */}
              <motion.div
                className="absolute inset-[-4px] rounded-full"
                style={{
                  background:
                    "conic-gradient(from 90deg, #3b82f6, #8b5cf6, #06b6d4, #3b82f6)",
                }}
                animate={{
                  rotate: -360,
                  opacity: [0.3, 0.7, 0.3],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: { duration: 6, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
              />

              {/* Image Container with Protection */}
              <div
                className="absolute inset-2 rounded-full bg-slate-900 overflow-hidden z-10 select-none"
                style={{
                  userSelect: "none",
                  WebkitUserSelect: "none",
                  MozUserSelect: "none",
                  msUserSelect: "none",
                }}
              >
                {!imageError ? (
                  <img
                    src={profileImage}
                    alt="Sibananda Behera"
                    className="w-full h-full object-cover"
                    draggable="false"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    onError={() => setImageError(true)}
                    style={{
                      pointerEvents: "none",
                      userSelect: "none",
                      WebkitUserSelect: "none",
                      MozUserSelect: "none",
                      msUserSelect: "none",
                      WebkitUserDrag: "none",
                      KhtmlUserDrag: "none",
                      MozUserDrag: "none",
                      OUserDrag: "none",
                      userDrag: "none",
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-600/20 to-cyan-500/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl lg:text-5xl mb-2 animate-bounce">
                        👨‍💻
                      </div>
                      <div className="text-sm text-slate-300 animate-pulse">
                        Sibananda Behera
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Floating Elements */}
              {!isScrolledDown && (
                <>
                  <motion.div
                    className="absolute -top-2 -right-2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-blue-500/40 to-cyan-500/40 backdrop-blur-xl border-2 border-blue-400/50 flex items-center justify-center"
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      y: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      rotate: {
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <motion.span
                      className="text-xl"
                      animate={{ rotate: [0, -360] }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      ⚡
                    </motion.span>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-2 -left-2 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-purple-500/40 to-pink-500/40 backdrop-blur-xl border-2 border-purple-400/50 flex items-center justify-center"
                    animate={{
                      y: [0, 15, 0],
                      rotate: [0, -360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      y: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      rotate: {
                        duration: 12,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <motion.span
                      className="text-lg"
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      ✨
                    </motion.span>
                  </motion.div>

                  {/* Additional floating elements */}
                  <motion.div
                    className="absolute top-1/2 -right-6 w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-cyan-400/30 backdrop-blur-sm"
                    animate={{
                      x: [0, 10, 0],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute bottom-1/2 -left-6 w-3 h-3 lg:w-4 lg:h-4 rounded-full bg-purple-400/30 backdrop-blur-sm"
                    animate={{
                      x: [0, -8, 0],
                      y: [0, 5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </>
              )}
            </motion.div>

            {/* Enhanced Name Animation */}
            <motion.div
              ref={nameRef}
              layoutId="hero-name"
              initial={{ opacity: 0, y: -50 }}
              animate={
                nameInView
                  ? {
                      opacity: isScrolledDown ? 0 : 1,
                      y: isScrolledDown ? -10 : 0,
                      scale: isScrolledDown ? 0.85 : 1,
                    }
                  : { opacity: 0, y: -50 }
              }
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center mb-4 lg:mb-6"
            >
              {/* Main Name with Enhanced Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <motion.h1
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
                  animate={{
                    fontSize: isScrolledDown ? "3rem" : "",
                    textShadow: [
                      "0 0 10px rgba(59, 130, 246, 0.3)",
                      "0 0 20px rgba(139, 92, 246, 0.4)",
                      "0 0 30px rgba(6, 182, 212, 0.3)",
                      "0 0 20px rgba(139, 92, 246, 0.4)",
                      "0 0 10px rgba(59, 130, 246, 0.3)",
                    ],
                  }}
                  transition={{
                    textShadow: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  SIBANANDA
                  <motion.span
                    className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                    animate={{
                      backgroundPosition: ["0%", "100%", "0%"],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      backgroundPosition: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    style={{
                      backgroundSize: "300% 100%",
                    }}
                  >
                    BEHERA
                  </motion.span>
                </motion.h1>

                {/* Animated Underline */}
                <motion.div
                  className="h-1 lg:h-1.5 mt-2 lg:mt-3 mx-auto w-48 sm:w-64 lg:w-80 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: isScrolledDown ? "100px" : "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </motion.div>

              {/* Enhanced Title Animation */}
              {!isScrolledDown && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    nameInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  className="text-lg sm:text-xl lg:text-2xl text-slate-300 leading-relaxed mt-3 lg:mt-4"
                >
                  <motion.span
                    className="text-blue-400 relative"
                    animate={{
                      textShadow: [
                        "0 0 5px rgba(59, 130, 246, 0.3)",
                        "0 0 10px rgba(59, 130, 246, 0.5)",
                        "0 0 5px rgba(59, 130, 246, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    Full-Stack Developer
                  </motion.span>
                  {" • "}
                  <motion.span
                    className="text-purple-400 relative"
                    animate={{
                      textShadow: [
                        "0 0 5px rgba(139, 92, 246, 0.3)",
                        "0 0 10px rgba(139, 92, 246, 0.5)",
                        "0 0 5px rgba(139, 92, 246, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 0.5,
                    }}
                  >
                    3D Web Specialist
                  </motion.span>
                  {" • "}
                  <motion.span
                    className="text-cyan-400 relative"
                    animate={{
                      textShadow: [
                        "0 0 5px rgba(6, 182, 212, 0.3)",
                        "0 0 10px rgba(6, 182, 212, 0.5)",
                        "0 0 5px rgba(6, 182, 212, 0.3)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 1,
                    }}
                  >
                    AI Research Enthusiast
                  </motion.span>
                </motion.div>
              )}
            </motion.div>

            {/* Enhanced Available Badge */}
            {!isScrolledDown && (
              <motion.div
                ref={availabilityRef}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={
                  availabilityInView
                    ? { opacity: 1, scale: 1, y: 0 }
                    : { opacity: 0, scale: 0.8, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 lg:px-5 lg:py-2.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-blue-500/30 rounded-full mb-6 lg:mb-8 relative overflow-hidden"
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="w-2 h-2 lg:w-2.5 lg:h-2.5 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full relative z-10"
                  animate={{
                    scale: [1, 1.5, 1],
                    boxShadow: [
                      "0 0 5px rgba(52, 211, 153, 0.5)",
                      "0 0 15px rgba(52, 211, 153, 0.8)",
                      "0 0 5px rgba(52, 211, 153, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <span className="text-blue-300 text-sm lg:text-base font-mono relative z-10">
                  Available for Freelance Projects
                </span>
              </motion.div>
            )}
          </motion.div>

          {/* Rest of the component remains the same */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Content - Description and Buttons */}
            <div className="space-y-4 lg:space-y-6 order-1 lg:order-1 w-full">
              {/* Description - Slide from Left */}
              <motion.div
                ref={descriptionRef}
                variants={slideInFromLeft}
                initial="hidden"
                animate={descriptionInView ? "show" : "hidden"}
              >
                <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed backdrop-blur-sm bg-slate-900/30 p-4 lg:p-6 rounded-xl border border-slate-700/50">
                  I specialize in building{" "}
                  <span className="text-blue-400">
                    scalable backend systems
                  </span>{" "}
                  and{" "}
                  <span className="text-purple-400">
                    API-driven applications
                  </span>{" "}
                  that solve real-world problems.
                  <br />
                  <br />
                  From handling{" "}
                  <span className="text-cyan-400">large datasets</span> and
                  optimized queries to delivering{" "}
                  <span className="text-green-400">
                    production-ready REST APIs
                  </span>
                  , I focus on performance, clean architecture, and
                  maintainability.
                </p>
              </motion.div>

              {/* Background Proof (fills experience gap) */}
              <motion.div
                variants={slideInFromLeft}
                initial="hidden"
                animate={descriptionInView ? "show" : "hidden"}
                className="text-slate-400 text-xs sm:text-sm bg-slate-900/20 border border-slate-700/40 rounded-lg p-3 lg:p-4"
              >
                ✔ Built systems handling 250k+ records
                <br />
                ✔ Implemented pagination, filtering & exports
                <br />✔ Worked with Django, DRF, React & SQL databases
              </motion.div>

              {/* Buttons - Slide from Bottom */}
              <motion.div
                ref={buttonsRef}
                variants={slideInFromBottom}
                initial="hidden"
                animate={buttonsInView ? "show" : "hidden"}
                className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-4 lg:pt-6 sm:justify-start justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToProjects}
                  className="px-6 py-3 lg:px-8 lg:py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-base lg:text-lg hover:from-blue-700 hover:to-purple-700 transition-all border border-blue-500/30 shadow-lg shadow-blue-500/20 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative z-10">View Projects</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="px-6 py-3 lg:px-8 lg:py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold text-base lg:text-lg hover:from-emerald-600 hover:to-teal-700 transition-all border border-emerald-400/30 shadow-lg shadow-emerald-500/30 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <span className="relative z-10 flex items-center gap-2">
                    Contact Me
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </motion.button>
              </motion.div>
            </div>

            {/* Right Content - DNA Helix Structure */}
            <motion.div
              ref={rightContentRef}
              variants={slideInFromRight}
              initial="hidden"
              animate={rightContentInView ? "show" : "hidden"}
              className="relative flex flex-col items-center order-2 lg:order-2 w-full mb-6 lg:mb-0"
            >
              {/* DNA Helix Canvas */}
              <div className="relative w-full max-w-[300px] sm:max-w-[350px] lg:max-w-md aspect-square">
                <canvas
                  ref={moleculeCanvasRef}
                  className="w-full h-full cursor-grab active:cursor-grabbing rounded-2xl bg-slate-900/20 backdrop-blur-sm"
                />

                {/* Current Process Overlay */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProcess}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute top-2 lg:top-4 left-1/2 transform -translate-x-1/2 bg-slate-900/80 backdrop-blur-xl rounded-xl p-3 lg:p-4 border border-slate-700/50 min-w-[180px] lg:min-w-[220px] text-center shadow-2xl"
                  >
                    <div className="text-xs lg:text-sm text-slate-400 mb-1">
                      Current Phase
                    </div>
                    <div className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {processSteps[activeProcess]?.title}
                    </div>
                    <div className="text-xs text-slate-300 mt-1 lg:mt-2 leading-tight">
                      {processSteps[activeProcess]?.description}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <motion.div
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute top-4 lg:top-8 right-4 lg:right-8 w-3 h-3 lg:w-4 lg:h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
                />
                <motion.div
                  animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-4 lg:bottom-8 left-4 lg:left-8 w-2 h-2 lg:w-3 lg:h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"
                />
              </div>

              {/* Process Progress */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="w-full max-w-[300px] sm:max-w-[350px] lg:max-w-md mt-3 lg:mt-4"
              >
                <div className="flex justify-between text-slate-400 text-xs lg:text-sm mb-1 lg:mb-2">
                  <span>Project Progress</span>
                  <span>{Math.round(processProgress)}%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-1.5 lg:h-2 overflow-hidden">
                  <motion.div
                    className="h-1.5 lg:h-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${processProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>

              <p className="text-xs text-slate-400 mt-2 text-center">
                My workflow — from problem analysis to scalable production
                systems
              </p>
            </motion.div>
          </div>

          {/* Process Timeline - Responsive Grid */}
          <motion.div
            ref={processRef}
            variants={fadeInUp}
            initial="hidden"
            animate={processInView ? "show" : "hidden"}
            className="mt-12 lg:mt-16 xl:mt-24"
          >
            <div className="text-center mb-6 lg:mb-8">
              <motion.h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 lg:mb-3"
                variants={fadeInUp}
              >
                End-to-End Development Process
              </motion.h2>
              <motion.p
                className="text-slate-300 text-sm sm:text-base lg:text-lg px-4"
                variants={fadeInUp}
              >
                From innovative concept to immersive 3D deployment -
                transforming ideas into digital excellence
              </motion.p>
            </div>

            {/* Responsive Process Steps Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4"
              variants={staggerContainer}
            >
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  variants={scaleIn}
                  initial="hidden"
                  animate={processInView ? "show" : "hidden"}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 lg:p-4 rounded-xl border backdrop-blur-sm cursor-pointer transition-all ${
                    activeProcess === index
                      ? `${step.bgColor} ${step.borderColor} shadow-lg scale-105 -translate-y-1`
                      : "bg-slate-800/30 border-slate-600/30 hover:border-slate-500/50"
                  }`}
                  onClick={() => setActiveProcess(index)}
                >
                  <div className="flex items-center gap-2 lg:gap-3">
                    <motion.div
                      animate={{
                        scale: activeProcess === index ? [1, 1.2, 1] : 1,
                        rotate: activeProcess === index ? [0, 5, -5, 0] : 0,
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-xl lg:text-2xl"
                    >
                      {step.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-semibold text-sm lg:text-base ${
                          activeProcess === index
                            ? "text-white"
                            : "text-slate-300"
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-xs lg:text-sm text-slate-400 mt-0.5 lg:mt-1 leading-tight">
                        {step.description}
                      </p>
                    </div>
                    {activeProcess === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-green-400 rounded-full flex-shrink-0"
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 lg:bottom-6 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-slate-400 text-xs flex flex-col items-center cursor-pointer"
          onClick={scrollToProjects}
        >
          <div className="mb-1 lg:mb-2">Explore My Projects</div>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-4 h-6 lg:w-5 lg:h-8 border-2 border-slate-400 rounded-full flex justify-center"
          >
            <div className="w-0.5 h-1.5 lg:w-1 lg:h-2 bg-slate-400 rounded-full mt-1 lg:mt-2" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
