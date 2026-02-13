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

  // FIXED: Handle Scroll Logic
  const handleNavigation = (e, targetId) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile menu

    if (targetId === 'home') {
      if (!isHomePage) {
        navigate('/');
        // Wait for navigation, then scroll
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Handle other sections (Skills, Projects, etc.)
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || !isHomePage ? 'bg-primary/95 shadow-lg backdrop-blur-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo - Clicks go to Top */}
          <a href="/" onClick={(e) => handleNavigation(e, 'home')} className="flex-shrink-0 cursor-pointer group">
            <span className="text-xl md:text-2xl font-bold text-white tracking-wider flex items-center gap-2">
              <Terminal size={24} className="text-highlight group-hover:rotate-12 transition-transform"/> 
              Shafee<span className="text-highlight"> Ahamed</span>
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6 lg:space-x-8">
              
              {/* Home Link - FIXED */}
              <a 
                href="#home" 
                onClick={(e) => handleNavigation(e, 'home')}
                className="text-gray-300 hover:text-highlight px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
              >
                Home
              </a>

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavigation(e, link.id)}
                  className="text-gray-300 hover:text-highlight px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ))}

              <Link 
                to="/blog" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname.includes('/blog') ? 'text-highlight' : 'text-gray-300 hover:text-highlight'}`}
              >
                Blog
              </Link>

              <a
                href="#contact"
                onClick={(e) => handleNavigation(e, 'contact')}
                className="bg-highlight text-primary px-5 py-2 rounded-full text-sm font-bold hover:bg-white hover:scale-105 transition-all duration-300 shadow-md"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-secondary absolute w-full shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <a href="#home" onClick={(e) => handleNavigation(e, 'home')} className="text-gray-300 block px-3 py-3 font-medium border-b border-gray-800">Home</a>
            
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.id}`}
                onClick={(e) => handleNavigation(e, link.id)}
                className="text-gray-300 block px-3 py-3 font-medium border-b border-gray-800"
              >
                {link.name}
              </a>
            ))}

             <Link to="/blog" className="text-highlight block px-3 py-3 font-medium border-b border-gray-800" onClick={() => setIsOpen(false)}>Blog</Link>

            <a
              href="#contact"
              onClick={(e) => handleNavigation(e, 'contact')}
              className="w-full text-center block mt-4 bg-highlight text-primary px-5 py-3 rounded-md font-bold"
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;