import React from 'react';
import { Mail, MapPin, Linkedin, Github, ArrowUp, Terminal, Cloud, DollarSign, Clock, Calculator, Regex } from 'lucide-react'; // Make sure to install lucide-react if Regex icon is missing, or use Code icon
import { Link } from 'react-router-dom';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const apps = [
    { name: "Currency", icon: <DollarSign size={18}/>, link: "/currency", color: "text-green-400", desc: "Live Rates" },
    { name: "Weather", icon: <Cloud size={18}/>, link: "/weather", color: "text-blue-400", desc: "SL Climate" },
    { name: "Focus", icon: <Clock size={18}/>, link: "/focus", color: "text-orange-400", desc: "Pomodoro" },
    { name: "Cost Calc", icon: <Calculator size={18}/>, link: "/meeting-cost", color: "text-red-400", desc: "Tech Lead Tool" }, // New!
    { name: "Regex", icon: <Terminal size={18}/>, link: "/regex", color: "text-purple-400", desc: "Tester" }, // New!
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050b0d] border-t border-[#1F4E56] pt-16 pb-8 relative overflow-hidden">
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-highlight/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand (Span 4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-highlight rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(252,163,17,0.3)]">
                <span className="text-primary font-black text-2xl">SA</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-wide">
                Shafee<span className="text-gray-500">.Dev</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Full-Stack Software Engineer & Tech Lead. Specialized in scalable cloud architecture, IoT ecosystems, and high-performance web solutions.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com/in/shafee-ahamed" target="_blank" rel="noreferrer" className="social-btn"><Linkedin size={18} /></a>
              <a href="https://github.com/Shafee25" target="_blank" rel="noreferrer" className="social-btn"><Github size={18} /></a>
            </div>
          </div>

          {/* Column 2: Utility Launchpad (Span 5 cols) - NEW DESIGN */}
          <div className="md:col-span-5">
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-6 flex items-center gap-2">
              <Terminal size={14} className="text-highlight"/> Engineer's Utility Belt
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {apps.map((app) => (
                <Link to={app.link} key={app.name} className="group bg-[#0F1C20] border border-[#1F4E56] hover:border-highlight p-3 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-highlight/10 flex flex-col justify-between h-24">
                  <div className={`${app.color} bg-white/5 w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {app.icon}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm group-hover:text-highlight transition-colors">{app.name}</div>
                    <div className="text-[10px] text-gray-500">{app.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Contact (Span 3 cols) */}
          <div className="md:col-span-3 space-y-6 md:pl-8">
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-6">Contact</h3>
            <div className="space-y-4 text-sm">
              <a href="mailto:shafeeahamed494@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                <Mail size={16} className="text-highlight" /> shafeeahamed494@gmail.com
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin size={16} className="text-highlight mt-1" /> 
                <span>No 31B, OPA Road,<br/>Addalaichenai, Ampara,<br/>Sri Lanka.</span>
              </div>
            </div>
            <button onClick={scrollToTop} className="flex items-center gap-2 text-highlight text-xs font-bold hover:underline mt-4">
              <ArrowUp size={14} /> Back to Top
            </button>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <p>© {currentYear} Shafee Ahamed. All rights reserved.</p>
          <div className="flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Systems Operational
          </div>
        </div>
      </div>

      <style>{`
        .social-btn {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: #0F1C20;
          border: 1px solid #1F4E56;
          display: flex; align-items: center; justify-content: center;
          color: #9ca3af;
          transition: all 0.3s;
        }
        .social-btn:hover {
          background: #FCA311;
          color: #050b0d;
          border-color: #FCA311;
          transform: translateY(-3px);
        }
      `}</style>
    </footer>
  );
};

export default Footer;