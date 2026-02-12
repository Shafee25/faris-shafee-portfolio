import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // Removed 'storage'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { LogIn, Send, LogOut, Link as LinkIcon } from 'lucide-react';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('AI Trends');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState(''); // Changed from file to string URL

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Invalid Login Credentials!");
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
      // Save Data to Firestore (No Storage Upload)
      await addDoc(collection(db, "posts"), {
        title,
        category,
        excerpt,
        content,
        image: imageUrl, // Saving the link directly
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

  // Login View
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-2xl w-96">
          <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
            <LogIn /> Admin Login
          </h2>
          <input 
            type="email" placeholder="Admin Email" 
            className="w-full border p-2 mb-4 rounded"
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" placeholder="Password" 
            className="w-full border p-2 mb-6 rounded"
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="submit" className="w-full bg-highlight text-primary font-bold py-2 rounded hover:bg-orange-400">
            Login
          </button>
        </form>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="pt-24 pb-12 bg-gray-50 min-h-screen px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-primary">Write New Article</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-bold hover:text-red-700">
            <LogOut size={20} /> Logout
          </button>
        </div>

        <form onSubmit={handlePublish} className="space-y-6">
          
          <div>
            <label className="block font-bold mb-2">Title</label>
            <input type="text" className="w-full border p-3 rounded-lg" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold mb-2">Category</label>
              <select className="w-full border p-3 rounded-lg" value={category} onChange={e => setCategory(e.target.value)}>
                <option>AI Trends</option>
                <option>Tutorials</option>
                <option>Code Snippets</option>
                <option>News</option>
              </select>
            </div>
            
            {/* Image URL Input instead of File Upload */}
            <div>
               <label className="block font-bold mb-2">Image URL</label>
               <div className="flex items-center gap-2 border p-3 rounded-lg">
                 <LinkIcon size={20} className="text-gray-400" />
                 <input 
                    type="text" 
                    placeholder="https://images.unsplash.com/..." 
                    className="w-full outline-none" 
                    value={imageUrl}
                    onChange={e => setImageUrl(e.target.value)} 
                    required 
                 />
               </div>
               <p className="text-xs text-gray-400 mt-1">Paste a link from Unsplash or GitHub.</p>
            </div>
          </div>

          <div>
            <label className="block font-bold mb-2">Short Excerpt</label>
            <textarea className="w-full border p-3 rounded-lg h-20" value={excerpt} onChange={e => setExcerpt(e.target.value)} required></textarea>
          </div>

          <div>
            <label className="block font-bold mb-2">Full Content (Markdown Supported)</label>
            <textarea className="w-full border p-3 rounded-lg h-64 font-mono text-sm" value={content} onChange={e => setContent(e.target.value)} placeholder="# Heading 1&#10;Write your article content here..." required></textarea>
          </div>

          <button disabled={loading} type="submit" className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-secondary transition-all flex items-center justify-center gap-2">
            {loading ? "Publishing..." : <><Send size={20} /> Publish Article</>}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Admin;