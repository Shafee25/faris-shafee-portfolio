import React from 'react';
import { ArrowRight, Download, Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div id="home" className="relative bg-primary overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      {/* Main Content Container */}
      {/* Added extra padding-bottom (pb-48) to prevent overlap */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-64 md:pt-40 md:pb-80">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-secondary/30 border border-secondary text-accent text-xs md:text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Available for Hire
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Building Scalable <br />
              <span className="text-highlight">Cloud & Web</span> Solutions.
            </h1>
            
            <p className="text-base md:text-lg text-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Hi, I'm <span className="text-white font-semibold">Faris Shafee</span>. A Full-Stack Engineer specialized in React, Laravel, and Azure. I transform complex problems into secure, high-performance applications.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <a href="#projects" className="w-full sm:w-auto px-8 py-3.5 bg-highlight text-primary font-bold rounded-full hover:bg-white hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-highlight/20">
                View Work <ArrowRight size={18} />
              </a>
              
              <a 
                href="/Faris_Shafee_CV.pdf" 
                download="Faris_Shafee_CV.pdf"
                className="w-full sm:w-auto px-8 py-3.5 border border-gray-600 text-white font-medium rounded-full hover:border-highlight hover:text-highlight transition-all duration-300 flex items-center justify-center gap-2"
              >
                Download CV <Download size={18} />
              </a>
            </div>

            {/* Stats - NOW SAFE FROM THE WAVE */}
            <div className="flex flex-row justify-center lg:justify-start gap-8 md:gap-12 border-t border-gray-800 pt-8 relative z-20">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white">4+</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Years Exp</p>
              </div>
              <div className="w-px h-12 bg-gray-800"></div> {/* Vertical Divider */}
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white">10+</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Projects</p>
              </div>
              <div className="w-px h-12 bg-gray-800"></div> {/* Vertical Divider */}
              <div>
                <h3 className="text-3xl md:text-4xl font-bold text-white">5+</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">Certifications</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px]">
              {/* Image Container */}
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-primary rounded-full border-[6px] border-secondary/30 shadow-2xl overflow-hidden z-10">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&h=800" 
                  alt="Faris Shafee" 
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Social Icons */}
              <a href="https://linkedin.com/in/shafee-ahamed" target="_blank" rel="noreferrer" className="absolute bottom-6 -left-4 md:-left-8 z-20 bg-[#0A1619] p-3 md:p-4 rounded-xl shadow-xl border border-gray-800 flex items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer group">
                <Linkedin size={20} className="text-blue-500 group-hover:text-white transition-colors" />
                <span className="hidden md:block font-bold text-white text-sm">LinkedIn</span>
              </a>

              <a href="https://github.com/Shafee25" target="_blank" rel="noreferrer" className="absolute top-10 -right-4 md:-right-8 z-20 bg-[#0A1619] p-3 md:p-4 rounded-xl shadow-xl border border-gray-800 flex items-center gap-3 hover:-translate-y-1 transition-transform cursor-pointer group">
                <Github size={20} className="text-gray-300 group-hover:text-white transition-colors" />
                <span className="hidden md:block font-bold text-white text-sm">GitHub</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Wave - FIXED: FLIPPED HORIZONTALLY (scale-x-[-1]) */}
      {/* This makes the wave 'dip' on the left side (under the text) and 'rise' on the right side */}
      <div className="absolute -bottom-1 left-0 w-full z-20">
         <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 320" 
            className="w-full h-auto block scale-x-[-1]" 
         >
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;