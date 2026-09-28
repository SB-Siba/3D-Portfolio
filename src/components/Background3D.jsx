import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

const Background3D = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);
  const initializedRef = useRef(false);

  // Device detection — updates React state only for UI animations
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Mouse tracking for orbs / grid
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Main Three.js scene — runs ONCE
  useEffect(() => {
    if (!canvasRef.current) return;
    if (initializedRef.current) return;
    initializedRef.current = true;

    const width = window.innerWidth;
    const mobileAtInit = width < 768;
    const tabletAtInit = width >= 768 && width < 1024;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: !mobileAtInit,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
      });
    } catch (err) {
      console.warn("WebGL renderer creation failed:", err);
      return;
    }

    // Critical: bail out if the context is null (out of WebGL contexts)
    const gl = renderer.getContext();
    if (!gl) {
      console.warn("No WebGL context available — using fallback background only");
      return;
    }

    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    let pixelRatio = Math.min(window.devicePixelRatio, 2);
    if (mobileAtInit) pixelRatio = 1;
    if (tabletAtInit) pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    renderer.setPixelRatio(pixelRatio);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, mobileAtInit ? 2 : 3);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x3b82f6, mobileAtInit ? 1 : 1.5);
    directionalLight1.position.set(10, 10, 10);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0x8b5cf6, mobileAtInit ? 0.8 : 1);
    directionalLight2.position.set(-10, -5, 5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0x06b6d4, mobileAtInit ? 1 : 2, 100);
    pointLight.position.set(0, 0, 20);
    scene.add(pointLight);

    // Shapes
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
      new THREE.BoxGeometry(1, 1, 1),
    ];

    const colors = [
      0xfbbf24, 0x3b82f6, 0x8b5cf6, 0x10b981, 0x06b6d4, 0xef4444,
      0x84cc16, 0x6366f1, 0xec4899, 0xf59e0b, 0x14b8a6, 0x22c55e,
    ];

    const shapeCount = mobileAtInit ? 8 : tabletAtInit ? 10 : 12;

    for (let i = 0; i < shapeCount; i++) {
      const geometry = geometries[i];
      let optimizedGeometry = geometry;
      if (mobileAtInit) {
        if (geometry.type === "SphereGeometry") {
          optimizedGeometry = new THREE.SphereGeometry(geometry.parameters.radius, 16, 16);
        } else if (geometry.type === "TorusGeometry") {
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
        opacity: mobileAtInit ? 0.6 : 0.7,
        wireframe: Math.random() > 0.7,
        shininess: mobileAtInit ? 80 : 100,
      });

      const mesh = new THREE.Mesh(optimizedGeometry, material);

      const radius = mobileAtInit ? 6 + Math.random() * 3 : 8 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      mesh.position.x = radius * Math.sin(phi) * Math.cos(theta);
      mesh.position.y = radius * Math.sin(phi) * Math.sin(theta);
      mesh.position.z = radius * Math.cos(phi);

      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;

      shapes.push(mesh);
      scene.add(mesh);
    }

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = mobileAtInit ? 150 : tabletAtInit ? 400 : 800;
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * (mobileAtInit ? 20 : 30);
      posArray[i + 1] = (Math.random() - 0.5) * (mobileAtInit ? 20 : 30);
      posArray[i + 2] = (Math.random() - 0.5) * (mobileAtInit ? 20 : 30);

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.3 + 0.5, 0.8, 0.6);
      colorArray[i] = color.r;
      colorArray[i + 1] = color.g;
      colorArray[i + 2] = color.b;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: mobileAtInit ? 0.02 : tabletAtInit ? 0.012 : 0.008,
      vertexColors: true,
      transparent: true,
      opacity: mobileAtInit ? 0.7 : 0.8,
      sizeAttenuation: true,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = mobileAtInit ? 10 : 12;

    // Mouse
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove3D = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove3D);

    // Animation loop
    const clock = new THREE.Clock();
    let lastTime = 0;
    const fpsLimit = 30;
    const interval = 1000 / fpsLimit;
    let contextLost = false;

    const handleContextLost = (event) => {
      event.preventDefault();
      contextLost = true;
      console.log("WebGL context lost");
    };
    const handleContextRestored = () => {
      contextLost = false;
      console.log("WebGL context restored");
    };
    canvasRef.current.addEventListener("webglcontextlost", handleContextLost, false);
    canvasRef.current.addEventListener("webglcontextrestored", handleContextRestored, false);

    const animate = (currentTime) => {
      animationFrameRef.current = requestAnimationFrame(animate);
      if (contextLost) return;

      const delta = currentTime - lastTime;
      if (delta <= interval) return;
      lastTime = currentTime - (delta % interval);

      const elapsedTime = clock.getElapsedTime();

      shapes.forEach((shape, index) => {
        const speedMultiplier = mobileAtInit ? 0.7 : 1;
        shape.rotation.x += 0.005 * ((index % 3) + 1) * speedMultiplier;
        shape.rotation.y += 0.008 * ((index % 2) + 1) * speedMultiplier;
        shape.rotation.z += 0.003 * ((index % 4) + 1) * speedMultiplier;
        shape.position.y += Math.sin(elapsedTime * 0.5 + index) * 0.005 * speedMultiplier;
        shape.position.x += Math.cos(elapsedTime * 0.3 + index) * 0.003 * speedMultiplier;
        shape.rotation.x += mouseY * 0.005 * speedMultiplier;
        shape.rotation.y += mouseX * 0.005 * speedMultiplier;
      });

      particlesMesh.rotation.y = elapsedTime * 0.02 * (mobileAtInit ? 0.7 : 1);
      particlesMesh.rotation.x = elapsedTime * 0.015 * (mobileAtInit ? 0.7 : 1);

      camera.position.x += (mouseX * (mobileAtInit ? 2 : 3) - camera.position.x) * 0.01;
      camera.position.y += (-mouseY * (mobileAtInit ? 2 : 3) - camera.position.y) * 0.01;
      camera.lookAt(scene.position);

      try {
        renderer.render(scene, camera);
      } catch (err) {
        console.error("Render error:", err);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Resize (handled inside effect — no re-mount needed)
    const handleResize = () => {
      if (!rendererRef.current) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup — runs only on unmount
    return () => {
      console.log("Background3D unmounting");

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      window.removeEventListener("mousemove", handleMouseMove3D);
      window.removeEventListener("resize", handleResize);
      canvasRef.current?.removeEventListener("webglcontextlost", handleContextLost);
      canvasRef.current?.removeEventListener("webglcontextrestored", handleContextRestored);

      shapes.forEach((shape) => {
        shape.geometry?.dispose();
        if (Array.isArray(shape.material)) {
          shape.material.forEach((m) => m.dispose());
        } else {
          shape.material?.dispose();
        }
      });

      particlesGeometry?.dispose();
      particlesMaterial?.dispose();

      if (rendererRef.current) {
        rendererRef.current.dispose();
        // ⚠️ NO forceContextLoss() here — it would poison the canvas
      }

      sceneRef.current = null;
      rendererRef.current = null;
      initializedRef.current = false;
    };
  }, []); // ⚠️ EMPTY — scene created exactly once

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div className="absolute inset-0">
        <motion.div
          className={`absolute inset-0 opacity-15 bg-grid-overlay ${
            isMobile ? "bg-grid-mobile" : "bg-grid-desktop"
          }`}
          animate={{
            x: mousePosition.x * (isMobile ? 0.005 : 0.008),
            y: mousePosition.y * (isMobile ? 0.005 : 0.008),
          }}
          transition={{ type: "tween", duration: 0.2, ease: "linear" }}
        />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, isMobile ? 15 : 30, 0],
            y: [0, isMobile ? -10 : -20, 0],
            scale: [1, isMobile ? 1.1 : 1.2, 1],
          }}
          transition={{ duration: isMobile ? 12 : 10, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-1/4 left-1/4 ${isMobile ? "w-40 h-40" : "w-80 h-80"} bg-blue-500/15 rounded-full blur-3xl`}
        />
        <motion.div
          animate={{
            x: [0, isMobile ? -12 : -25, 0],
            y: [0, isMobile ? 12 : 25, 0],
            scale: [isMobile ? 1.1 : 1.2, 1, isMobile ? 1.1 : 1.2],
          }}
          transition={{ duration: isMobile ? 10 : 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className={`absolute bottom-1/3 right-1/3 ${isMobile ? "w-48 h-48" : "w-96 h-96"} bg-purple-500/15 rounded-full blur-3xl`}
        />
        {!isMobile && (
          <motion.div
            animate={{ x: [0, 15, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-3/4 left-3/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
          />
        )}
      </div>
    </div>
  );
};

export default Background3D;