import React from 'react';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div id="home" className="relative bg-primary pt-24 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-highlight/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-secondary/50 border border-secondary text-accent text-sm font-semibold">
              Software Engineer & Cloud Developer
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Building Scalable <br />
              <span className="text-highlight">Cloud & Web</span> Solutions.
            </h1>
            
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              I am <span className="text-white font-semibold">Faris Shafee Ahamed</span>, a Full-Stack Engineer specialized in React, Laravel, and Azure. I build secure, high-performance applications for Web, Mobile, and IoT.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a href="#projects" className="px-8 py-3.5 bg-highlight text-primary font-bold rounded-full hover:bg-white transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-highlight/20">
                View My Work <ArrowRight size={20} />
              </a>
              <a href="#" className="px-8 py-3.5 border border-gray-600 text-white font-medium rounded-full hover:border-highlight hover:text-highlight transition-all duration-300 flex items-center gap-2">
                Download CV <Download size={20} />
              </a>
            </div>

            {/* Stats Box */}
            <div className="grid grid-cols-3 gap-4 border-t border-gray-800 pt-8">
              <div>
                <h3 className="text-3xl font-bold text-white">4+</h3>
                <p className="text-sm text-gray-500">Years Exp</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">10+</h3>
                <p className="text-sm text-gray-500">Projects</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">5+</h3>
                <p className="text-sm text-gray-500">Certifications</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Image/Visual */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto aspect-square">
              {/* Abstract Shape Behind Image */}
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-primary rounded-full border-4 border-white/5 shadow-2xl overflow-hidden">
                 {/* 
                    PLACEHOLDER IMAGE: 
                    Later we will replace this URL with your actual photo. 
                 */}
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&h=800" 
                  alt="Faris Shafee" 
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating Social Cards */}
              <div className="absolute -bottom-6 -left-4 bg-[#1A2C32] p-4 rounded-xl shadow-xl border border-gray-700 flex items-center gap-3 animate-bounce-slow">
                <div className="bg-blue-600 p-2 rounded-lg text-white">
                  <Linkedin size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Connect on</p>
                  <p className="font-bold text-white">LinkedIn</p>
                </div>
              </div>

              <div className="absolute top-10 -right-4 bg-[#1A2C32] p-4 rounded-xl shadow-xl border border-gray-700 flex items-center gap-3">
                <div className="bg-gray-800 p-2 rounded-lg text-white">
                  <Github size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Check Code</p>
                  <p className="font-bold text-white">GitHub</p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Curved Bottom Edge (Wave) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-16 sm:h-24 lg:h-32" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;