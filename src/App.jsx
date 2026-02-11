import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience'; // <-- Import
import Projects from './components/Projects';     // <-- Import
import Contact  from './components/Contact';

function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <Skills />
      <Experience /> {/* <-- Add Timeline */}
      <Projects />   {/* <-- Add Projects */}
      <Contact /> {/* <-- Add Contact Section */}
      
    </div>
  );
}

export default App;