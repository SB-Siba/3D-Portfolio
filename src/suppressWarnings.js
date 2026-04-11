// src/suppressWarnings.js
// This file suppresses non-critical warnings in development

// Only suppress in development
if (process.env.NODE_ENV === 'development') {
  const originalWarn = console.warn;
  const originalError = console.error;
  
  // Suppress React Router v7 future flag warnings
  console.warn = function(...args) {
    if (
      args[0] && 
      typeof args[0] === 'string' &&
      (
        args[0].includes('React Router Future Flag Warning') ||
        args[0].includes('v7_startTransition') ||
        args[0].includes('v7_relativeSplatPath')
      )
    ) {
      return; // Suppress React Router warnings
    }
    originalWarn.apply(console, args);
  };

  // Suppress Three.js warnings
  console.error = function(...args) {
    if (
      args[0] && 
      typeof args[0] === 'string' &&
      (
        args[0].includes('THREE.WebGLRenderer: Property .outputEncoding has been removed') ||
        args[0].includes('THREE.BufferGeometry.computeBoundingSphere')
      )
    ) {
      return; // Suppress Three.js warnings
    }
    originalError.apply(console, args);
  };

  // Suppress non-boolean attribute warnings (already fixed in ServiceChatbot)
  console.warn = function(...args) {
    if (
      args[0] && 
      typeof args[0] === 'string' &&
      args[0].includes('Received `true` for a non-boolean attribute')
    ) {
      return; // Suppress attribute warnings
    }
    return originalWarn.apply(console, args);
  };
}