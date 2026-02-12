import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogNavbar from './components/BlogNavbar'; // <-- Import Blog Navbar
import Home from './pages/Home';
import Blog from './pages/Blog';
import Admin from './pages/Admin'; // Import
import Chatbot from './components/Chatbot'; // <-- Import Chatbot
import BlogPost from './pages/BlogPost'; // <--- Import this

// Create a wrapper component to handle Navbar Logic
const Layout = ({ children }) => {
  const location = useLocation();
  const isBlogPage = location.pathname === '/blog';

  return (
    <div className="bg-white min-h-screen">
      {/* Conditionally render the correct Navbar */}
      {isBlogPage ? <BlogNavbar /> : <Navbar />}
      
      {children}

      {/* Global Footer
      <div className="py-8 bg-primary text-center text-gray-500 text-sm border-t border-white/10">
        © {new Date().getFullYear()} Faris Shafee. Built with React & Tailwind.
      </div> */}

      {/* Global Chatbot - Always visible */}
      <Chatbot />
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
          <Route path="/blog/:id" element={<BlogPost />} /> {/* <--- New Route */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;