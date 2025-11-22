import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  AllProjects,
  StarsCanvas,
  Footer,
  Background3D,
} from "./components";
import Pageloader from "./components/Pageloader";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [currentView, setCurrentView] = useState("home"); // 'home' or 'all-projects'

  // Fix for SSR - only render loader on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if user has already seen the loader; if so, skip it
  useEffect(() => {
    if (!isClient) return;
    try {
      const visited = window.localStorage.getItem("portfolioVisited");
      if (visited === "true") {
        setIsLoading(false);
      }
    } catch (e) {
      // ignore storage errors
    }
  }, [isClient]);

  // Debug effect to track current view
  useEffect(() => {
    console.log("App.jsx - currentView:", currentView);
    console.log("App.jsx - handleViewAllProjects function exists:", typeof handleViewAllProjects === 'function');
  }, [currentView]);

  // Debug effect for Works component
  useEffect(() => {
    console.log("App.jsx - Works component should receive onViewAllProjects prop");
  }, []);

  // Initialize view from URL (so /projects can be bookmarked) and handle browser navigation
  useEffect(() => {
    const pathname = window.location.pathname;
    console.log("Current path:", pathname);

    if (pathname === "/projects" || pathname === "/all-projects") {
      setCurrentView("all-projects");
    } else {
      setCurrentView("home");
    }

    const onPopState = () => {
      const p = window.location.pathname;
      console.log("Pop state to:", p);
      if (p === "/projects" || p === "/all-projects") {
        setCurrentView("all-projects");
      } else {
        setCurrentView("home");
      }
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const handleLoadingComplete = () => {
    try {
      window.localStorage.setItem("portfolioVisited", "true");
    } catch (e) {
      console.error("Error setting localStorage:", e);
    }
    setIsLoading(false);
  };

  const handleViewAllProjects = () => {
    console.log("Navigating to all projects");
    setCurrentView("all-projects");
    try {
      window.history.pushState({}, "All Projects", "/all-projects");
    } catch (e) {
      console.error("History pushState failed:", e);
      // Fallback: direct navigation
      window.location.href = '/all-projects';
    }
  };

  const handleBackToHome = () => {
    console.log("Navigating back to home");
    setCurrentView("home");
    // Scroll to projects section when coming back
    setTimeout(() => {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    try {
      window.history.pushState({}, "Home", "/");
    } catch (e) {
      console.error("History pushState failed:", e);
      // Fallback: direct navigation
      window.location.href = '/';
    }
  };

  // Safe navigation handlers with fallbacks
  const safeHandleViewAllProjects = () => {
    console.log("Safe navigation to all projects");
    setCurrentView("all-projects");
    try {
      window.history.pushState({}, "All Projects", "/all-projects");
      // Force popstate event for browsers that need it
      window.dispatchEvent(new PopStateEvent('popstate'));
    } catch (e) {
      console.error("Safe navigation failed, using direct method:", e);
      window.location.href = '/all-projects';
    }
  };

  // Don't render anything during SSR
  if (!isClient) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center">
        <div className="text-cyan-400 text-lg">Loading...</div>
      </div>
    );
  }

  if (isLoading) {
    return <Pageloader onLoadingComplete={handleLoadingComplete} />;
  }

  // Page variants for animations
  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.98,
    },
    in: {
      opacity: 1,
      scale: 1,
    },
    out: {
      opacity: 0,
      scale: 0.98,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.6,
  };

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        {/* Background for all pages - Fixed positioning */}
        <div className="fixed inset-0 -z-10">
          <Background3D />
        </div>

        {/* Main content */}
        <div className="relative z-10">
          <Navbar />

          <AnimatePresence mode="wait">
            {/* HOME VIEW - Show all sections */}
            {currentView === "home" && (
              <motion.div
                key="home"
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={pageTransition}
              >
                <section id="home" className="relative">
                  <Hero />
                </section>
                <section id="about" className="relative">
                  <About />
                </section>
                <section id="work" className="relative">
                  <Experience />
                </section>
                <section id="tech" className="relative">
                  <Tech />
                </section>
                <section id="projects" className="relative">
                  <Works onViewAllProjects={safeHandleViewAllProjects} />
                </section>
                <section id="testimonials" className="relative">
                  <Feedbacks />
                </section>
                <section id="contact" className="relative">
                  <div className="relative z-0">
                    <Contact />
                    <StarsCanvas />
                  </div>
                </section>
                <Footer />
              </motion.div>
            )}

            {/* ALL PROJECTS VIEW */}
            {currentView === "all-projects" && (
              <motion.div
                key="all-projects"
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={pageTransition}
                className="min-h-screen"
              >
                <AllProjects onBack={handleBackToHome} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;