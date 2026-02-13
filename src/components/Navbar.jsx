import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (e, targetId) => {
    e.preventDefault();
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        if (targetId === 'home') window.scrollTo(0, 0);
        else document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      if (targetId === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
      <div className={`max-w-5xl mx-auto px-6 ${scrolled ? 'bg-[#0F1C20]/80 backdrop-blur-xl border border-white/5 shadow-2xl rounded-full' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between h-12">
          
          {/* Logo */}
          <a onClick={(e) => handleNavigation(e, 'home')} className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-gradient-to-tr from-highlight to-orange-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Terminal size={20} className="text-[#0F1C20]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Faris<span className="text-highlight">.Dev</span></span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a onClick={(e) => handleNavigation(e, 'home')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">Home</a>
            {navLinks.map((link) => (
              <a key={link.name} onClick={(e) => handleNavigation(e, link.id)} className="text-sm font-medium text-gray-400 hover:text-white transition-colors cursor-pointer">{link.name}</a>
            ))}
            <Link to="/blog" className="text-sm font-medium text-gray-400 hover:text-highlight transition-colors">Blog</Link>
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a onClick={(e) => handleNavigation(e, 'contact')} className="bg-white/5 hover:bg-highlight hover:text-[#0F1C20] border border-white/10 text-white px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 cursor-pointer">
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white"><Menu/></button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-20 left-4 right-4 bg-[#16292F] border border-white/10 p-6 rounded-2xl shadow-2xl md:hidden flex flex-col gap-4 z-[100]">
          <a onClick={(e) => handleNavigation(e, 'home')} className="text-lg font-bold text-white">Home</a>
          {navLinks.map((link) => (
            <a key={link.name} onClick={(e) => handleNavigation(e, link.id)} className="text-lg font-bold text-gray-400">{link.name}</a>
          ))}
          <Link to="/blog" className="text-lg font-bold text-highlight">Read Blog</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;