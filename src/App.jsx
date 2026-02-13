import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import BlogNavbar from './components/BlogNavbar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import Chatbot from './components/Chatbot';
import DevTerminal from './components/DevTerminal'; 
import CommandPalette from './components/CommandPalette';
import Footer from './components/Footer'; // <--- IMPORT NEW FOOTER
import DevTools from './pages/DevTools';   // <--- IMPORT DEV TOOLS
import { useKonamiCode } from './hooks/useKonamiCode';

const Layout = ({ children }) => {
  const location = useLocation();
  const isBlogPage = location.pathname === '/blog' || location.pathname.startsWith('/blog/');
  const isAdminPage = location.pathname === '/admin';

  useKonamiCode(); 

  return (
    <div className="bg-white min-h-screen flex flex-col"> {/* Added flex-col for footer sticking */}
      
      {!isAdminPage && (isBlogPage ? <BlogNavbar /> : <Navbar />)}
      
      <div className="flex-grow"> {/* Content grows to fill space */}
        {children}
      </div>

      {/* NEW FOOTER COMPONENT - Only hide on Admin */}
      {!isAdminPage && <Footer />}

      {/* Global Interactive Elements */}
      {!isAdminPage && <Chatbot />}
      {!isAdminPage && <DevTerminal />}
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
          <Route path="/devtools" element={<DevTools />} /> {/* <--- NEW ROUTE */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;