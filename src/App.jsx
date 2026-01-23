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

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkLoaderStatus = () => {
      try {
        const visited = localStorage.getItem("portfolioVisited");
        if (visited === "true") {
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

    const timer = setTimeout(() => {
      setIsLoading(false);
      try {
        localStorage.setItem("portfolioVisited", "true");
      } catch (e) {
        console.error("Error setting localStorage:", e);
      }
    }, 3000);

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

  const pageVariants = {
    initial: { opacity: 0, scale: 0.98 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 0.98 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.6,
  };

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="fixed inset-0 -z-10">
          <Background3D />
        </div>
        <div className="relative z-10">
          <Navbar isScrolledDown={isScrolledDown} />
          <Routes>
            <Route
              path="/services/:serviceId"
              element={
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
              }
            />
            <Route
              path="/services/:serviceId/inquiry"
              element={
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
              }
            />
            <Route
              path="/services"
              element={
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
              }
            />
            <Route
              path="/all-projects"
              element={
                <motion.div
                  key="all-projects"
                  variants={pageVariants}
                  initial="initial"
                  animate="in"
                  exit="out"
                  transition={pageTransition}
                  className="min-h-screen"
                >
                  <AllProjects />
                </motion.div>
              }
            />
            <Route
              path="/"
              element={
                <motion.div
                  key="home"
                  variants={pageVariants}
                  initial="initial"
                  animate="in"
                  exit="out"
                  transition={pageTransition}
                >
                  <section id="home" className="relative">
                    <Hero onScrollStateChange={setIsScrolledDown} />
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
                    <Works />
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
              }
            />
          </Routes>
          <ServiceChatbot />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
