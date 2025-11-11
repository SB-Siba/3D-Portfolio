import { BrowserRouter } from "react-router-dom";
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

const App = () => {
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