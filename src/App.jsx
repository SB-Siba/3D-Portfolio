import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
  ServiceChatbot,
  StarsCanvas,
  Footer,
  Background3D,
} from "./components";
import Pageloader from "./components/Pageloader";
import { AnimatePresence, motion } from "framer-motion";
import ServiceDetail from "./components/services";
import ServicesList from "./components/ServicesList";
import ServiceInquiryPage from "./components/ServiceInquiryPage";

// Main content component that uses routes
const MainContent = ({ onLoadingComplete }) => {
  const navigate = useNavigate();
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    // Set a small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsPageReady(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle view changes for projects
  const handleViewAllProjects = () => {
    navigate("/all-projects");
  };

  const handleBackToHome = () => {
    navigate("/");
    // Scroll to projects section when coming back
    setTimeout(() => {
      const projectsSection = document.getElementById("projects");
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const safeHandleViewAllProjects = () => {
    handleViewAllProjects();
  };

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

  if (!isPageReady) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center">
        <div className="text-cyan-400 text-lg animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative z-0 bg-primary">
      {/* Background for all pages - Fixed positioning */}
      <div className="fixed inset-0 -z-10">
        <Background3D />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <Navbar />

        <Routes>
          {/* Service Detail Page Route */}
          <Route path="/services/:serviceId" element={
            <motion.div
              key="service-detail"
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={pageTransition}
              className="min-h-screen"
            >
              <ServiceDetail />
            </motion.div>
          } />
          
          {/* Service Inquiry Page Route */}
          <Route path="/services/:serviceId/inquiry" element={
            <motion.div
              key="service-inquiry"
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={pageTransition}
              className="min-h-screen"
            >
              <ServiceInquiryPage />
            </motion.div>
          } />
          
          {/* Services List Page Route */}
          <Route path="/services" element={
            <motion.div
              key="services-list"
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              transition={pageTransition}
              className="min-h-screen"
            >
              <ServicesList />
            </motion.div>
          } />

          {/* All Projects Page Route */}
          <Route path="/all-projects" element={
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
          } />

          {/* Home Page Route */}
          <Route path="/" element={
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
          } />
        </Routes>

        {/* Service Chatbot - Always visible for lead generation */}
        <ServiceChatbot />
      </div>
    </div>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Fix for SSR - only render loader on client side
  useEffect(() => {
    setIsClient(true);
    
    // Check if user has already seen the loader
    const checkLoaderStatus = () => {
      try {
        const visited = localStorage.getItem("portfolioVisited");
        if (visited === "true") {
          // User has visited before, skip loader
          setIsLoading(false);
          return true;
        }
      } catch (e) {
        console.error("Error accessing localStorage:", e);
      }
      return false;
    };

    if (checkLoaderStatus()) {
      return;
    }

    // Show loader for first-time visitors
    const timer = setTimeout(() => {
      setIsLoading(false);
      try {
        localStorage.setItem("portfolioVisited", "true");
      } catch (e) {
        console.error("Error setting localStorage:", e);
      }
    }, 3000); // 3 second loader for first visit

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    try {
      localStorage.setItem("portfolioVisited", "true");
    } catch (e) {
      console.error("Error setting localStorage:", e);
    }
    setIsLoading(false);
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

  return (
    <BrowserRouter>
      <MainContent onLoadingComplete={handleLoadingComplete} />
    </BrowserRouter>
  );
};

export default App;