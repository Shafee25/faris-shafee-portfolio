import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // Import Link

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // Get current page URL

  // Check if we are on the Home Page
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
  ];

  // Function to handle navigation
  const handleScrollClick = (e, href) => {
    if (!isHomePage) {
      // If on Blog page, let the Link tag handle the redirect to "/"
      return; 
    }
    // If on Home page, prevent redirect and scroll smoothly
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || !isHomePage ? 'bg-primary/95 shadow-lg backdrop-blur-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <span className="text-xl md:text-2xl font-bold text-white tracking-wider">
              Shafee<span className="text-highlight"> Ahamed</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6 lg:space-x-8">
              
              <Link to="/" className="text-gray-300 hover:text-highlight px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Home
              </Link>

              {/* Dynamic Links (Skills, Projects) */}
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={isHomePage ? link.href : `/${link.href}`} // Add slash if on blog page
                  onClick={(e) => handleScrollClick(e, link.href)}
                  className="text-gray-300 hover:text-highlight px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ))}

              {/* Blog Link */}
              <Link 
                to="/blog" 
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === '/blog' ? 'text-highlight' : 'text-gray-300 hover:text-highlight'}`}
              >
                Blog
              </Link>

              <a
                href={isHomePage ? "#contact" : "/#contact"}
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

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-primary border-t border-secondary absolute w-full shadow-2xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link to="/" className="text-gray-300 block px-3 py-3 font-medium border-b border-gray-800" onClick={() => setIsOpen(false)}>Home</Link>
            
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={isHomePage ? link.href : `/${link.href}`}
                className="text-gray-300 block px-3 py-3 font-medium border-b border-gray-800"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}

             <Link to="/blog" className="text-highlight block px-3 py-3 font-medium border-b border-gray-800" onClick={() => setIsOpen(false)}>Blog</Link>

            <a
              href={isHomePage ? "#contact" : "/#contact"}
              className="w-full text-center block mt-4 bg-highlight text-primary px-5 py-3 rounded-md font-bold"
              onClick={() => setIsOpen(false)}
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