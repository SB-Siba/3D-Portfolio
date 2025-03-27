import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { Link } from "react-router-dom";

// Animated Floating Sphere Component
const FloatingSphere = ({ position, color, size, speed }) => {
  const mesh = useRef();

  useFrame(({ clock }) => {
    mesh.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed) * 0.3;
    mesh.current.rotation.y += 0.002;
  });

  return (
    <Sphere ref={mesh} args={[size, 32, 32]} position={position}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.8} />
    </Sphere>
  );
};

const Footer = () => {
  return (
    <div className="relative w-full h-50 bg-gray-900 text-white flex flex-col items-center justify-center">
      {/* 3D Background */}
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          
          {/* Floating Spheres */}
          <FloatingSphere position={[-1, 1, -2]} color="#ff0000" size={0.5} speed={2} />
          <FloatingSphere position={[1, -1, -2]} color="#00ffcc" size={0.7} speed={1.5} />
          <FloatingSphere position={[2, 0, -1]} color="#ffcc00" size={0.6} speed={2.2} />
          <FloatingSphere position={[-2, -1, -1.5]} color="#0088ff" size={0.4} speed={1.8} />
          <FloatingSphere position={[0, 1.5, -1.2]} color="#aa00ff" size={0.55} speed={2} />

          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>

      {/* Footer Links */}
      <div className="absolute bottom-12 flex flex-wrap gap-6 text-gray-400 text-sm">
        <Link to="/" className="hover:text-white transition">Home</Link>
        <Link to="/about" className="hover:text-white transition">About</Link>
        <Link to="/works" className="hover:text-white transition">Projects</Link>
        <Link to="/contact" className="hover:text-white transition">Contact</Link>
      </div>

      {/* Copyright */}
      <p className="absolute bottom-4 text-xs text-gray-500">
        © {new Date().getFullYear()} SIBANANDA BEHERA. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
