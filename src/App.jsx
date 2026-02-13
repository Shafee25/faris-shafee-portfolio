import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Standard Components
import Navbar from './components/Navbar';
import BlogNavbar from './components/BlogNavbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import DevTerminal from './components/DevTerminal';
import CommandPalette from './components/CommandPalette';

// Pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Admin from './pages/Admin';
import DevTools from './pages/DevTools';

// New Utility Pages
import Currency from './pages/Currency';
import Weather from './pages/Weather';
import DevZen from './pages/DevZen';
import MeetingCost from './pages/MeetingCost';
import RegexTester from './pages/RegexTester';

// Hooks
import { useKonamiCode } from './hooks/useKonamiCode';

const Layout = ({ children }) => {
  const location = useLocation();
  const isBlogPage = location.pathname === '/blog' || location.pathname.startsWith('/blog/');
  const isAdminPage = location.pathname === '/admin';

  // Enable Easter Egg
  useKonamiCode(); 

  return (
    <div className="bg-white min-h-screen flex flex-col">
      
      {/* Hide standard navbars on Admin page for immersion */}
      {!isAdminPage && (isBlogPage ? <BlogNavbar /> : <Navbar />)}
      
      {/* Main Content Area */}
      <div className="flex-grow">
        {children}
      </div>

      {/* FOOTER - Only hide on Admin */}
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
          {/* Main Portfolio */}
          <Route path="/" element={<Home />} />
          
          {/* Blog Section */}
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          
          {/* Admin Section */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Utility Apps Routes */}
          <Route path="/devtools" element={<DevTools />} />
          <Route path="/currency" element={<Currency />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/focus" element={<DevZen />} />
          <Route path="/meeting-cost" element={<MeetingCost />} />
          <Route path="/regex" element={<RegexTester />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;