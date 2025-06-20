import React from "react";
import { BrowserRouter } from "react-router-dom";
import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import LazyLoad from "./components/LazyLoad";
import FloatingAIAssistant from "./components/FloatingAIAssistant";



const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <div className='relative z-0'>
          <LazyLoad>
            <Contact />
          </LazyLoad>
          <StarsCanvas />
        </div>
        <FloatingAIAssistant />
      </div>
    </BrowserRouter>
  );
}

export default App;
