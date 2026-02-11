import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience'; // <-- Import
import Projects from './components/Projects';     // <-- Import

function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <Skills />
      <Experience /> {/* <-- Add Timeline */}
      <Projects />   {/* <-- Add Projects */}
      
      {/* Footer Placeholder */}
      <div className="py-8 bg-primary text-center text-gray-500 text-sm border-t border-white/10">
        © 2026 Faris Shafee. Built with React & Tailwind.
      </div>
    </div>
  );
}

export default App;