import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const Background3D = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Enhanced Main Three.js 3D Scene (Background)
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: !isMobile, // Disable antialias on mobile for performance
      powerPreference: 'high-performance'
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Optimize pixel ratio for different devices
    let pixelRatio = Math.min(window.devicePixelRatio, 2);
    if (isMobile) pixelRatio = 1; // Lower pixel ratio on mobile
    if (isTablet) pixelRatio = Math.min(window.devicePixelRatio, 1.5); // Moderate on tablet
    
    renderer.setPixelRatio(pixelRatio);

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, isMobile ? 2 : 3);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x3b82f6, isMobile ? 1 : 1.5);
    directionalLight1.position.set(10, 10, 10);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x8b5cf6, isMobile ? 0.8 : 1);
    directionalLight2.position.set(-10, -5, 5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0x06b6d4, isMobile ? 1 : 2, 100);
    pointLight.position.set(0, 0, 20);
    scene.add(pointLight);

    // Create process-themed shapes - Reduce count on mobile
    const shapes = [];
    const geometries = [
      new THREE.OctahedronGeometry(0.8, 0),
      new THREE.BoxGeometry(1.2, 1.2, 1.2),
      new THREE.TorusGeometry(1, 0.3, 16, 100),
      new THREE.ConeGeometry(0.8, 1.5, 8),
      new THREE.SphereGeometry(0.9, 32, 32),
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.CylinderGeometry(0.6, 0.6, 1.5, 8),
      new THREE.DodecahedronGeometry(0.7, 0),
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.OctahedronGeometry(0.6, 1),
      new THREE.SphereGeometry(0.7, 16, 16),
      new THREE.BoxGeometry(1, 1, 1)
    ];

    const colors = [0xfbbf24, 0x3b82f6, 0x8b5cf6, 0x10b981, 0x06b6d4, 0xef4444, 0x84cc16, 0x6366f1, 0xec4899, 0xf59e0b, 0x14b8a6, 0x22c55e];

    // Adjust number of shapes based on device
    const shapeCount = isMobile ? 8 : isTablet ? 10 : 12;

    for (let i = 0; i < shapeCount; i++) {
      const geometry = geometries[i];
      
      // Reduce geometry complexity on mobile
      let optimizedGeometry = geometry;
      if (isMobile) {
        if (geometry.type === 'SphereGeometry') {
          optimizedGeometry = new THREE.SphereGeometry(geometry.parameters.radius, 16, 16);
        } else if (geometry.type === 'TorusGeometry') {
          optimizedGeometry = new THREE.TorusGeometry(
            geometry.parameters.radius, 
            geometry.parameters.tube, 
            8, 
            50
          );
        }
      }

      const material = new THREE.MeshPhongMaterial({
        color: colors[i],
        transparent: true,
        opacity: isMobile ? 0.6 : 0.7, // Slightly lower opacity on mobile
        wireframe: Math.random() > 0.7,
        shininess: isMobile ? 80 : 100 // Reduce shininess on mobile
      });

      const mesh = new THREE.Mesh(optimizedGeometry, material);
      
      const radius = isMobile ? 6 + Math.random() * 3 : 8 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      mesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
      mesh.position.y = radius * Math.sin(phi) * Math.sin(theta);
      mesh.position.z = radius * Math.cos(phi);
      
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;
      
      shapes.push(mesh);
      scene.add(mesh);
    }

    // Enhanced particle system - Reduce particles on mobile/tablet
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = isMobile ? 150 : isTablet ? 400 : 800;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * (isMobile ? 20 : 30);
      posArray[i + 1] = (Math.random() - 0.5) * (isMobile ? 20 : 30);
      posArray[i + 2] = (Math.random() - 0.5) * (isMobile ? 20 : 30);

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.5, 0.8, 0.6);
      colorArray[i] = color.r;
      colorArray[i + 1] = color.g;
      colorArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.02 : isTablet ? 0.012 : 0.008,
      vertexColors: true,
      transparent: true,
      opacity: isMobile ? 0.7 : 0.8,
      sizeAttenuation: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = isMobile ? 10 : 12;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove3D = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove3D);

    // Animation - Slower animation on mobile for better performance
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      shapes.forEach((shape, index) => {
        const speedMultiplier = isMobile ? 0.7 : 1;
        
        shape.rotation.x += 0.005 * (index % 3 + 1) * speedMultiplier;
        shape.rotation.y += 0.008 * (index % 2 + 1) * speedMultiplier;
        shape.rotation.z += 0.003 * (index % 4 + 1) * speedMultiplier;
        
        shape.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.005 * speedMultiplier;
        shape.position.x += Math.cos(elapsedTime * 0.3 + index) * 0.003 * speedMultiplier;
        
        shape.rotation.x += mouseY * 0.005 * speedMultiplier;
        shape.rotation.y += mouseX * 0.005 * speedMultiplier;
      });

      particlesMesh.rotation.y = elapsedTime * 0.02 * (isMobile ? 0.7 : 1);
      particlesMesh.rotation.x = elapsedTime * 0.015 * (isMobile ? 0.7 : 1);

      camera.position.x += (mouseX * (isMobile ? 2 : 3) - camera.position.x) * 0.01;
      camera.position.y += (-mouseY * (isMobile ? 2 : 3) - camera.position.y) * 0.01;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove3D);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      
      // Clean up geometries
      shapes.forEach(shape => {
        shape.geometry.dispose();
        shape.material.dispose();
      });
      particlesGeometry.dispose();
      particlesMaterial.dispose();
    };
  }, [isMobile, isTablet]);

  return (
    <div className="fixed inset-0 -z-10">
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
      
      {/* Enhanced 3D Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />

      {/* Animated Grid Overlay - Simpler on mobile */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: isMobile ? '30px 30px' : '50px 50px',
            transform: `translate(${mousePosition.x * (isMobile ? 0.005 : 0.008)}px, ${mousePosition.y * (isMobile ? 0.005 : 0.008)}px)`
          }}
        />
      </div>

      {/* Enhanced Gradient Orbs - Smaller and fewer on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, isMobile ? 15 : 30, 0],
            y: [0, isMobile ? -10 : -20, 0],
            scale: [1, isMobile ? 1.1 : 1.2, 1],
          }}
          transition={{
            duration: isMobile ? 12 : 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-1/4 left-1/4 ${isMobile ? 'w-40 h-40' : 'w-80 h-80'} bg-blue-500/15 rounded-full blur-3xl`}
        />
        <motion.div
          animate={{
            x: [0, isMobile ? -12 : -25, 0],
            y: [0, isMobile ? 12 : 25, 0],
            scale: [isMobile ? 1.1 : 1.2, 1, isMobile ? 1.1 : 1.2],
          }}
          transition={{
            duration: isMobile ? 10 : 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className={`absolute bottom-1/3 right-1/3 ${isMobile ? 'w-48 h-48' : 'w-96 h-96'} bg-purple-500/15 rounded-full blur-3xl`}
        />
        {!isMobile && ( // Hide third orb on mobile for better performance
          <motion.div
            animate={{
              x: [0, 15, 0],
              y: [0, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute top-3/4 left-3/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
          />
        )}
      </div>
    </div>
  );
};

export default Background3D;