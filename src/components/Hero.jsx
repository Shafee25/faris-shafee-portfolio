import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Download, MousePointer2 } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Dynamic Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-highlight/10 rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Status Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-xs font-bold text-gray-300 tracking-wide">AVAILABLE FOR WORK</span>
        </motion.div>

        {/* Main Typography - MASSIVE & BOLD */}
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-extrabold text-white tracking-tight leading-none mb-6">
          <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="block">
            BUILDING
          </motion.span>
          <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-100">
            DIGITAL
          </motion.span>
          <motion.span initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="block text-transparent bg-clip-text bg-gradient-to-r from-highlight to-orange-600">
            REALITY.
          </motion.span>
        </h1>

        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I'm <strong className="text-white">Faris Shafee</strong>. A Full-Stack Engineer obsessed with performance, cloud architecture, and clean UI. I turn complex problems into elegant code.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#projects" className="group relative px-8 py-4 bg-white text-[#0F1C20] font-bold rounded-full overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">View My Work <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20}/></span>
            <div className="absolute inset-0 bg-highlight transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </a>
          
          <a href="/Faris_Shafee_CV.pdf" download className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded-full hover:bg-white/5 transition-all flex items-center gap-2">
            <Download size={20}/> Download CV
          </a>
        </motion.div>

        {/* Social Proof / Tech Stack Marquee */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="mt-20 border-t border-white/5 pt-10"
        >
          <p className="text-sm text-gray-500 mb-6 uppercase tracking-widest">Powering Solutions With</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {['React', 'Next.js', 'Laravel', 'Azure', 'AWS', 'Node.js', 'Flutter'].map(tech => (
               <span key={tech} className="text-xl md:text-2xl font-bold text-white/40 hover:text-highlight cursor-default">{tech}</span>
             ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;