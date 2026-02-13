import React from 'react';
import { Mail, MapPin, Linkedin, Github, ArrowUp, Terminal, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050b0d] border-t border-[#1F4E56] pt-16 pb-8 relative overflow-hidden">
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-highlight/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 lg:gap-20 mb-16">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-highlight rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(252,163,17,0.3)]">
                <span className="text-primary font-black text-2xl">SA</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-wide">
                Shafee<span className="text-gray-500"> Ahamed</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm max-w-sm">
              Full-Stack Software Engineer specialized in building scalable, secure, and high-performance cloud & web solutions. Transforming complex problems into elegant code.
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div className="space-y-6">
            <h3 className="text-white font-bold tracking-widest text-sm uppercase mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              <a href="mailto:shafeeahamed494@gmail.com" className="flex items-start gap-3 group">
                <Mail className="text-gray-500 group-hover:text-highlight transition-colors mt-1" size={20} />
                <span className="text-gray-400 group-hover:text-white transition-colors text-sm">
                  shafeeahamed494@gmail.com
                </span>
              </a>
              
              <div className="flex items-start gap-3 group">
                <MapPin className="text-gray-500 group-hover:text-highlight transition-colors mt-1" size={20} />
                <span className="text-gray-400 group-hover:text-white transition-colors text-sm">
                  No 31B, OPA Road,<br/>Addalaichenai, Ampara,<br/>Sri Lanka.
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Connect & Tools */}
          <div className="space-y-6">
            <h3 className="text-white font-bold tracking-widest text-sm uppercase mb-6">Connect Professionally</h3>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://linkedin.com/in/shafee-ahamed" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 bg-[#0F1C20] border border-[#1F4E56] rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-highlight hover:bg-[#1F4E56] transition-all duration-300"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com/Shafee25" 
                target="_blank" 
                rel="noreferrer"
                className="w-12 h-12 bg-[#0F1C20] border border-[#1F4E56] rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-highlight hover:bg-[#1F4E56] transition-all duration-300"
              >
                <Github size={20} />
              </a>
              <button 
                onClick={scrollToTop}
                className="w-12 h-12 bg-[#0F1C20] border border-[#1F4E56] rounded-full flex items-center justify-center text-highlight hover:text-primary hover:bg-highlight hover:border-highlight transition-all duration-300"
                aria-label="Back to Top"
              >
                <ArrowUp size={20} />
              </button>
            </div>

            {/* Quick Link to Dev Tools */}
            <div className="pt-4">
              <Link to="/devtools" className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-highlight transition-colors border-b border-gray-800 pb-1 hover:border-highlight">
                <Terminal size={12} /> Access Dev Toolkit
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs">
            © {currentYear} Faris Shafee. Built with React, Tailwind & Firebase.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600 font-mono">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             System Operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;