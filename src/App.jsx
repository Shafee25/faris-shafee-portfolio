import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills'; // <-- Import this

function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      <Skills /> {/* <-- Add this */}
      
      {/* Temporary Placeholder for next sections */}
      <div className="h-40 flex items-center justify-center text-primary/50">
        More Content Coming Soon...
      </div>
    </div>
  );
}

export default App;