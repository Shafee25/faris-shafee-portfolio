import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogNavbar from './components/BlogNavbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import Chatbot from './components/Chatbot';
import DevTerminal from './components/DevTerminal'; // <--- IMPORT THIS

const Layout = ({ children }) => {
  const location = useLocation();
  const isBlogPage = location.pathname === '/blog' || location.pathname.startsWith('/blog/');
  const isAdminPage = location.pathname === '/admin';

  return (
    <div className="bg-white min-h-screen">
      
      {/* Hide standard navbars on Admin page for immersion */}
      {!isAdminPage && (isBlogPage ? <BlogNavbar /> : <Navbar />)}
      
      {children}

      {!isAdminPage && (
        <div className="py-8 bg-primary text-center text-gray-500 text-sm border-t border-white/10">
          © {new Date().getFullYear()} Faris Shafee. Built with React & Tailwind.
        </div>
      )}

      {/* Global Interactive Elements */}
      {!isAdminPage && <Chatbot />}
      {!isAdminPage && <DevTerminal />}  {/* <--- ADD THIS */}
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