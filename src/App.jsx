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
  StarsCanvas, 
  Footer,
  Background3D 
} from './components';
import Pageloader from './components/Pageloader';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Fix for SSR - only render loader on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLoadingComplete = () => {
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
      <div className="relative z-0 bg-primary">
        {/* Background for all pages - Fixed positioning */}
        <div className="fixed inset-0 -z-10">
          <Background3D />
        </div>
        
        {/* Main content */}
        <div className="relative z-10">
          <Navbar />
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
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;