import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; 
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { LogIn, Send, LogOut, Link as LinkIcon, Eye, EyeOff, LayoutDashboard } from 'lucide-react';

const Admin = () => {
  const [user, setUser] = useState(null);
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // <--- State for Eye Icon
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Blog Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('AI Trends');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState(''); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError("Invalid Email or Password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title || !content || !imageUrl) {
      alert("Please fill all fields.");
      return;
    }
    setLoading(true);

    try {
      await addDoc(collection(db, "posts"), {
        title,
        category,
        excerpt,
        content,
        image: imageUrl,
        author: "Faris Shafee",
        date: new Date().toLocaleDateString(),
        createdAt: serverTimestamp()
      });

      alert("Blog Published Successfully!");
      // Reset Form
      setTitle('');
      setExcerpt('');
      setContent('');
      setImageUrl('');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error publishing. Check console.");
    }
    setLoading(false);
  };

  // ==============================
  // 1. LOGIN SCREEN (Dark Theme)
  // ==============================
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary px-4">
        {/* Decorative Background Blur */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl"></div>

        <div className="relative w-full max-w-md bg-[#0A1619] border border-[#1F4E56] p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
              <LayoutDashboard className="text-highlight" /> Admin Panel
            </h2>
            <p className="text-gray-400 text-sm mt-2">Sign in to manage your content</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
              <input 
                type="email" 
                placeholder="admin@example.com" 
                className="w-full bg-[#0F1C20] border border-[#1F4E56] text-white p-3 rounded-lg focus:outline-none focus:border-highlight transition-colors"
                onChange={(e) => setEmail(e.target.value)} 
                required
              />
            </div>

            {/* Password Input with Eye Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} // Toggle type
                  placeholder="••••••••" 
                  className="w-full bg-[#0F1C20] border border-[#1F4E56] text-white p-3 rounded-lg focus:outline-none focus:border-highlight transition-colors pr-10"
                  onChange={(e) => setPassword(e.target.value)} 
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-highlight text-primary font-bold py-3 rounded-lg hover:bg-white hover:scale-[1.02] transition-all duration-200 shadow-lg"
            >
              {loading ? "Verifying..." : "Login to Dashboard"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==============================
  // 2. DASHBOARD SCREEN (Dark Theme)
  // ==============================
  return (
    <div className="pt-24 pb-12 bg-primary min-h-screen px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-[#0A1619] p-6 rounded-2xl border border-[#1F4E56] shadow-xl">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Create New Article</h1>
            <p className="text-gray-400 text-sm">Publish updates to your blog instantly.</p>
          </div>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 text-red-400 font-bold hover:text-red-300 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20 transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Editor Form */}
        <div className="bg-[#0A1619] border border-[#1F4E56] p-8 rounded-2xl shadow-xl">
          <form onSubmit={handlePublish} className="space-y-6">
            
            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-highlight mb-2">Article Title</label>
              <input 
                type="text" 
                placeholder="e.g. The Future of AI in 2026"
                className="w-full bg-[#0F1C20] border border-[#1F4E56] text-white p-3 rounded-lg focus:outline-none focus:border-highlight transition-colors placeholder-gray-600"
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                required 
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-highlight mb-2">Category</label>
                <div className="relative">
                  <select 
                    className="w-full bg-[#0F1C20] border border-[#1F4E56] text-white p-3 rounded-lg focus:outline-none focus:border-highlight appearance-none cursor-pointer"
                    value={category} 
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option>AI Trends</option>
                    <option>Tutorials</option>
                    <option>Code Snippets</option>
                    <option>News</option>
                  </select>
                  {/* Custom Arrow for styling consistency */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
                </div>
              </div>
              
              {/* Image URL */}
              <div>
                 <label className="block text-sm font-bold text-highlight mb-2">Cover Image URL</label>
                 <div className="flex items-center gap-2 bg-[#0F1C20] border border-[#1F4E56] p-3 rounded-lg focus-within:border-highlight transition-colors">
                   <LinkIcon size={18} className="text-gray-400 shrink-0" />
                   <input 
                      type="text" 
                      placeholder="https://images.unsplash.com/..." 
                      className="w-full bg-transparent text-white outline-none placeholder-gray-600 text-sm" 
                      value={imageUrl}
                      onChange={e => setImageUrl(e.target.value)} 
                      required 
                   />
                 </div>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-bold text-highlight mb-2">Short Excerpt (Preview)</label>
              <textarea 
                className="w-full bg-[#0F1C20] border border-[#1F4E56] text-white p-3 rounded-lg focus:outline-none focus:border-highlight transition-colors h-24 placeholder-gray-600 resize-none"
                placeholder="A brief summary that appears on the card..."
                value={excerpt} 
                onChange={e => setExcerpt(e.target.value)} 
                required
              ></textarea>
            </div>

            {/* Full Content */}
            <div>
              <label className="block text-sm font-bold text-highlight mb-2">Full Content (Markdown Supported)</label>
              <textarea 
                className="w-full bg-[#0F1C20] border border-[#1F4E56] text-gray-200 p-4 rounded-lg focus:outline-none focus:border-highlight transition-colors h-80 font-mono text-sm placeholder-gray-600 leading-relaxed"
                placeholder="# Introduction&#10;Write your main article content here using Markdown..."
                value={content} 
                onChange={e => setContent(e.target.value)} 
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button 
              disabled={loading} 
              type="submit" 
              className="w-full bg-highlight text-primary font-bold py-4 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-highlight/20"
            >
              {loading ? "Publishing..." : <><Send size={20} /> Publish Article</>}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;