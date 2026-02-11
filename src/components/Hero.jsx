import React from 'react';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div id="home" className="relative bg-primary pt-24 pb-16 lg:pt-32 lg:pb-0 overflow-hidden min-h-screen flex flex-col justify-center">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-highlight/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-secondary/30 border border-secondary text-accent text-xs md:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Available for Hire
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              Building Scalable <br />
              <span className="text-highlight">Cloud & Web</span> Solutions.
            </h1>
            
            <p className="text-base md:text-lg text-gray-400 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Hi, I'm <span className="text-white font-semibold">Faris Shafee</span>. A Full-Stack Engineer specialized in React, Laravel, and Azure. I transform complex problems into secure, high-performance applications.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <a href="#projects" className="w-full sm:w-auto px-8 py-3 bg-highlight text-primary font-bold rounded-full hover:bg-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg">
                View Work <ArrowRight size={18} />
              </a>
              
              {/* WORKING DOWNLOAD BUTTON */}
              <a 
                href="/FarisShafeeCV.pdf" 
                download="Faris Shafee - CV.pdf"
                className="w-full sm:w-auto px-8 py-3 border border-gray-600 text-white font-medium rounded-full hover:border-highlight hover:text-highlight transition-all duration-300 flex items-center justify-center gap-2"
              >
                Download CV <Download size={18} />
              </a>
            </div>

            {/* Stats Box - IMPROVED VISIBILITY */}
            <div className="grid grid-cols-3 gap-2 md:gap-6 border-t border-gray-800 pt-6 mt-2 bg-white/5 p-4 rounded-xl backdrop-blur-sm">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white">4+</h3>
                <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">Years Exp</p>
              </div>
              <div className="text-center lg:text-left border-l border-gray-700 pl-2 md:pl-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white">10+</h3>
                <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">Projects</p>
              </div>
              <div className="text-center lg:text-left border-l border-gray-700 pl-2 md:pl-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white">5+</h3>
                <p className="text-xs md:text-sm text-gray-400 uppercase tracking-wide">Certifications</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              {/* Image Container */}
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-primary rounded-full border-4 border-white/10 shadow-2xl overflow-hidden z-10">
                {/* 
                   Replace this URL with your actual photo later. 
                   Ensure your photo is square for best results.
                */}
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&h=800" 
                  alt="Faris Shafee" 
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Social Cards - Positioned to not overlap text on mobile */}
              <a href="https://linkedin.com/in/shafee-ahamed" target="_blank" rel="noreferrer" className="absolute bottom-0 -left-2 z-20 bg-[#1A2C32] p-3 rounded-xl shadow-lg border border-gray-700 flex items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer">
                <Linkedin size={20} className="text-blue-500" />
                <span className="hidden md:block font-bold text-white text-sm">LinkedIn</span>
              </a>

              <a href="https://github.com/Shafee25" target="_blank" rel="noreferrer" className="absolute top-4 -right-2 z-20 bg-[#1A2C32] p-3 rounded-xl shadow-lg border border-gray-700 flex items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer">
                <Github size={20} className="text-white" />
                <span className="hidden md:block font-bold text-white text-sm">GitHub</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Wave - Positioned absolutely at the bottom */}
      <div className="absolute bottom-0 left-0 w-full leading-none z-0">
         <svg className="relative block w-full h-12 md:h-24" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;