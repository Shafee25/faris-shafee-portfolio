import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Temporary Placeholder for next sections */}
      <div className="h-screen flex items-center justify-center text-primary font-bold text-2xl">
        More Content Coming Soon...
      </div>
    </div>
  );
}

export default App;