import React, { useState } from 'react';
import { Menu, X, ArrowLeft, Search, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Area */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-500 hover:text-primary transition-colors flex items-center gap-2 text-sm font-semibold">
              <ArrowLeft size={16} /> Portfolio
            </Link>
            <div className="h-6 w-px bg-gray-300 hidden md:block"></div>
            <Link to="/blog" className="text-2xl font-bold text-primary tracking-tight">
              Faris<span className="text-highlight">.Insights</span>
            </Link>
          </div>

          {/* Desktop Menu - Unique Items */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-highlight font-medium transition-colors">Latest News</a>
              <a href="#" className="text-gray-600 hover:text-highlight font-medium transition-colors">AI Trends</a>
              <a href="#" className="text-gray-600 hover:text-highlight font-medium transition-colors">Code Snippets</a>
              <a href="#" className="text-gray-600 hover:text-highlight font-medium transition-colors">Tutorials</a>
              
              <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
                 <button className="text-gray-400 hover:text-primary"><Search size={20} /></button>
                 <button className="text-gray-400 hover:text-primary"><Bell size={20} /></button>
                 <button className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-secondary transition-colors">
                   Subscribe
                 </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <a href="#" className="block px-3 py-3 text-base font-medium text-gray-700 border-b border-gray-50">Latest News</a>
            <a href="#" className="block px-3 py-3 text-base font-medium text-gray-700 border-b border-gray-50">AI Trends</a>
            <a href="#" className="block px-3 py-3 text-base font-medium text-gray-700 border-b border-gray-50">Code Snippets</a>
            <Link to="/" className="block px-3 py-3 text-base font-bold text-highlight mt-4">Back to Portfolio</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default BlogNavbar;