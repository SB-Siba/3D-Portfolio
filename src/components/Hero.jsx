import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import * as THREE from 'three';

// Animation variants
const slideInFromLeft = {
  hidden: { opacity: 0, x: -100 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 100 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const slideInFromBottom = {
  hidden: { opacity: 0, y: 50 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

// Add fadeInUp variant that was missing
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const Hero = () => {
  const moleculeCanvasRef = useRef(null);
  const [activeTech, setActiveTech] = useState('Three.js');
  const [activeProcess, setActiveProcess] = useState(0);
  const [processProgress, setProcessProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const skillsRef = useRef(null);
  const buttonsRef = useRef(null);
  const rightContentRef = useRef(null);
  const processRef = useRef(null);
  
  // Check if elements are in view
  const heroInView = useInView(heroRef, { once: false, amount: 0.1 });
  const nameInView = useInView(nameRef, { once: false, amount: 0.1 });
  const descriptionInView = useInView(descriptionRef, { once: false, amount: 0.1 });
  const skillsInView = useInView(skillsRef, { once: false, amount: 0.1 });
  const buttonsInView = useInView(buttonsRef, { once: false, amount: 0.1 });
  const rightContentInView = useInView(rightContentRef, { once: false, amount: 0.1 });
  const processInView = useInView(processRef, { once: false, amount: 0.2 });

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Function to scroll to projects section
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Process steps with descriptions and icons
  const processSteps = [
    {
      id: 0,
      title: "Idea & Research",
      description: "Market analysis, AI technology research, and project conceptualization",
      icon: "💡",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-500/20",
      borderColor: "border-yellow-500/30"
    },
    {
      id: 1,
      title: "SRS Documentation",
      description: "Technical specifications, AI architecture planning, and system design",
      icon: "📋",
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-500/20",
      borderColor: "border-blue-500/30"
    },
    {
      id: 2,
      title: "UI/UX Design",
      description: "3D interface prototyping, user experience design, and interactive wireframes",
      icon: "🎨",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30"
    },
    {
      id: 3,
      title: "3D Development",
      description: "Three.js implementation, WebGL optimization, and immersive experiences",
      icon: "🔮",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30"
    },
    {
      id: 4,
      title: "Frontend Development",
      description: "React components, modern JavaScript, and responsive interfaces",
      icon: "⚛️",
      color: "from-cyan-400 to-blue-500",
      bgColor: "bg-cyan-500/20",
      borderColor: "border-cyan-500/30"
    },
    {
      id: 5,
      title: "Backend Development",
      description: "API development, server architecture, and business logic implementation",
      icon: "🔧",
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/30"
    },
    {
      id: 6,
      title: "Database Design",
      description: "PostgreSQL/MySQL schema design, optimization, and data modeling",
      icon: "🗃️",
      color: "from-emerald-400 to-green-500",
      bgColor: "bg-emerald-500/20",
      borderColor: "border-emerald-500/30"
    },
    {
      id: 7,
      title: "AI Integration",
      description: "Machine learning APIs, AI technology implementation, and smart features",
      icon: "🤖",
      color: "from-indigo-400 to-purple-500",
      bgColor: "bg-indigo-500/20",
      borderColor: "border-indigo-500/30"
    },
    {
      id: 8,
      title: "Testing & QA",
      description: "Unit testing, integration testing, and performance optimization",
      icon: "🧪",
      color: "from-red-400 to-pink-500",
      bgColor: "bg-red-500/20",
      borderColor: "border-red-500/30"
    },
    {
      id: 9,
      title: "Bug Fixing",
      description: "Debugging, performance optimization, and cross-browser compatibility",
      icon: "🐛",
      color: "from-amber-400 to-yellow-500",
      bgColor: "bg-amber-500/20",
      borderColor: "border-amber-500/30"
    },
    {
      id: 10,
      title: "Deployment",
      description: "CI/CD pipeline, cloud deployment, and production environment setup",
      icon: "🚀",
      color: "from-teal-400 to-cyan-500",
      bgColor: "bg-teal-500/20",
      borderColor: "border-teal-500/30"
    },
    {
      id: 11,
      title: "Production Ready",
      description: "Monitoring, maintenance, and continuous improvement",
      icon: "🏆",
      color: "from-lime-400 to-green-500",
      bgColor: "bg-lime-500/20",
      borderColor: "border-lime-500/30"
    }
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
      setProcessProgress(prev => {
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
      antialias: !isMobile
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
        })
      ),
      segments,
      0.05,
      8,
      false
    );

    const backboneMaterial1 = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });

    const backboneMaterial2 = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });

    const backbone1 = new THREE.Mesh(backboneGeometry, backboneMaterial1);
    const backbone2 = new THREE.Mesh(backboneGeometry, backboneMaterial2);
    backbone2.rotation.y = Math.PI;
    dnaGroup.add(backbone1);
    dnaGroup.add(backbone2);

    const basePairGeometry = new THREE.CylinderGeometry(0.03, 0.03, helixRadius * 2, 8);
    
    const basePairMaterials = [
      new THREE.MeshPhongMaterial({ color: 0x10b981 }),
      new THREE.MeshPhongMaterial({ color: 0xf59e0b }),
      new THREE.MeshPhongMaterial({ color: 0xef4444 }),
      new THREE.MeshPhongMaterial({ color: 0x06b6d4 })
    ];

    for (let i = 0; i < basePairs; i++) {
      const t = (i / basePairs) * Math.PI * 2 * helixTurns;
      const height = (i - basePairs / 2) * 0.4;
      
      const basePair = new THREE.Mesh(
        basePairGeometry, 
        basePairMaterials[i % basePairMaterials.length]
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
      emissiveIntensity: 0.5
    });

    for (let i = 0; i < 8; i++) {
      const electron = new THREE.Mesh(electronGeometry, electronMaterial);
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2.5;
      
      electron.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        0
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
        y: event.clientY - previousMousePosition.y
      };

      dnaGroup.rotation.y += deltaMove.x * 0.01;
      dnaGroup.rotation.x += deltaMove.y * 0.01;

      previousMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
    };

    moleculeCanvasRef.current.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        dnaGroup.rotation.y = elapsedTime * 0.2;
        dnaGroup.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1;
      }

      electronGroup.children.forEach((electron, index) => {
        const angle = electron.userData.initialAngle + elapsedTime * electron.userData.speed;
        const radius = 2.5 + Math.sin(elapsedTime * 2 + index) * 0.3;
        
        electron.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle) * radius,
          Math.sin(elapsedTime * 3 + index) * 0.5
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

    window.addEventListener('resize', handleResize);

    return () => {
      moleculeCanvasRef.current?.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [isMobile]);

  const skills = ['Three.js', 'React', 'JavaScript', 'PostgreSQL', 'AI Research', 'WebGL', 'Node.js', 'GitHub'];

  const techDescriptions = {
    'Three.js': 'Creating immersive 3D web experiences and interactive visualizations',
    'React': 'Building dynamic, scalable user interfaces with modern frameworks', 
    'JavaScript': 'Full-stack development with ES6+ features and advanced patterns',
    'PostgreSQL': 'Designing robust database architectures and optimized queries',
    'AI Research': 'Exploring machine learning and AI integration in web applications',
    'WebGL': 'High-performance 3D graphics and real-time rendering',
    'Node.js': 'Server-side development and API architecture',
    'GitHub': 'Version control and collaborative development workflows'
  };

  return (
    <div ref={heroRef} className="relative min-h-screen overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center pt-16 lg:pt-20 pb-20 lg:pb-32">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
          {/* Mobile: Stack layout, Desktop: Grid layout */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            {/* Left Content - Main Info */}
            <div className="space-y-4 lg:space-y-6 order-1 lg:order-1 w-full">
              {/* Available Badge */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/30 rounded-full mb-3 lg:mb-4"
              >
                <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-blue-300 text-xs lg:text-sm font-mono">Available for Freelance Projects</span>
              </motion.div>

              {/* Name - Slide from Left */}
              <motion.div
                ref={nameRef}
                variants={slideInFromLeft}
                initial="hidden"
                animate={nameInView ? "show" : "hidden"}
                className="mb-2 lg:mb-3"
              >
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  SIBANANDA
                  <motion.span 
                    className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mt-1 lg:mt-2 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl"
                    animate={{ 
                      backgroundPosition: ['0%', '100%', '0%'] 
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{ 
                      backgroundSize: '300% 100%' 
                    }}
                  >
                    BEHERA
                  </motion.span>
                </h1>
                
                <div className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed">
                  <span className="text-blue-400">Full-Stack Developer</span> • 3D Web Specialist • AI Research Enthusiast
                </div>
              </motion.div>

              {/* Description - Slide from Right */}
              <motion.div
                ref={descriptionRef}
                variants={slideInFromRight}
                initial="hidden"
                animate={descriptionInView ? "show" : "hidden"}
              >
                <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed backdrop-blur-sm bg-slate-900/30 p-3 lg:p-4 rounded-xl border border-slate-700/50">
                  Crafting <span className="text-blue-400">immersive 3D web experiences</span> while pioneering 
                  <span className="text-purple-400"> AI integration</span> in modern applications. I transform complex 
                  ideas into <span className="text-cyan-400">interactive digital realities</span> through cutting-edge 
                  technologies and innovative solutions.
                </p>
              </motion.div>

              {/* Skills Tags - Staggered One by One */}
              <motion.div
                ref={skillsRef}
                variants={staggerContainer}
                initial="hidden"
                animate={skillsInView ? "show" : "hidden"}
                className="flex flex-wrap gap-1.5 lg:gap-2"
              >
                {skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    variants={scaleIn}
                    whileHover={{ scale: 1.1, y: -2 }}
                    onHoverStart={() => setActiveTech(skill)}
                    className="px-2.5 py-1 lg:px-3 lg:py-1.5 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full text-slate-300 text-xs lg:text-sm hover:border-blue-500 hover:bg-blue-500/20 transition-all cursor-pointer"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>

              {/* Buttons - Slide from Bottom */}
              <motion.div
                ref={buttonsRef}
                variants={slideInFromBottom}
                initial="hidden"
                animate={buttonsInView ? "show" : "hidden"}
                className="flex flex-col sm:flex-row gap-2 lg:gap-3 pt-4 lg:pt-6"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToProjects}
                  className="px-5 py-2 lg:px-6 lg:py-2.5 xl:px-8 xl:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm lg:text-base hover:from-blue-700 hover:to-purple-700 transition-all border border-blue-500/30 shadow-lg shadow-blue-500/20"
                >
                  View Projects
                </motion.button>
              </motion.div>
            </div>

            {/* Right Content - DNA Helix Structure - Slide from Right */}
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
                    <div className="text-xs lg:text-sm text-slate-400 mb-1">Current Phase</div>
                    <div className="text-lg lg:text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {processSteps[activeProcess]?.title}
                    </div>
                    <div className="text-xs text-slate-300 mt-1 lg:mt-2 leading-tight">
                      {processSteps[activeProcess]?.description}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Tech Description Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute bottom-2 lg:bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900/80 backdrop-blur-xl rounded-xl p-2 lg:p-3 border border-slate-700/50 max-w-[240px] lg:max-w-[280px] text-center"
                >
                  <div className="text-xs text-slate-400 mb-1">Expertise</div>
                  <div className="text-xs lg:text-sm text-slate-200 font-medium leading-tight">
                    {techDescriptions[activeTech]}
                  </div>
                </motion.div>

                {/* Floating Process Indicators */}
                <motion.div
                  animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-4 lg:top-8 right-4 lg:right-8 w-3 h-3 lg:w-4 lg:h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
                />
                <motion.div
                  animate={{
                    rotate: -360,
                    scale: [1.1, 1, 1.1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
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
                <div className="w-full bg-slate-700/50 rounded-full h-1.5 lg:h-2">
                  <motion.div
                    className="h-1.5 lg:h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${processProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
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
                From innovative concept to immersive 3D deployment - transforming ideas into digital excellence
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
                      : 'bg-slate-800/30 border-slate-600/30 hover:border-slate-500/50'
                  }`}
                  onClick={() => setActiveProcess(index)}
                >
                  <div className="flex items-center gap-2 lg:gap-3">
                    <motion.div
                      animate={{ 
                        scale: activeProcess === index ? [1, 1.2, 1] : 1,
                        rotate: activeProcess === index ? [0, 5, -5, 0] : 0
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-xl lg:text-2xl"
                    >
                      {step.icon}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold text-sm lg:text-base ${
                        activeProcess === index 
                          ? 'text-white' 
                          : 'text-slate-300'
                      }`}>
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