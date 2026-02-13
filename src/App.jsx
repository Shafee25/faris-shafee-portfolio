import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// ... existing imports ...
import Navbar from './components/Navbar';
import BlogNavbar from './components/BlogNavbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import Chatbot from './components/Chatbot';
import DevTerminal from './components/DevTerminal'; 
import CommandPalette from './components/CommandPalette'; // <--- Import Palette
import { useKonamiCode } from './hooks/useKonamiCode'; // <--- Import Konami

// Layout Wrapper
const Layout = ({ children }) => {
  const location = useLocation();
  const isBlogPage = location.pathname === '/blog' || location.pathname.startsWith('/blog/');
  const isAdminPage = location.pathname === '/admin';

  // Enable Konami Code globally
  useKonamiCode(); 

  return (
    <div className="bg-white min-h-screen">
      
      {!isAdminPage && (isBlogPage ? <BlogNavbar /> : <Navbar />)}
      
      {children}

      {!isAdminPage && (
        <div className="py-8 bg-primary text-center text-gray-500 text-sm border-t border-white/10">
          © {new Date().getFullYear()} Faris Shafee. Built with React & Tailwind.
        </div>
      )}

      {/* Global Interactive Elements */}
      {!isAdminPage && <Chatbot />}
      {!isAdminPage && <DevTerminal />}
      
      {/* GLOBAL COMMAND PALETTE - Available Everywhere */}
      <CommandPalette /> 
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;