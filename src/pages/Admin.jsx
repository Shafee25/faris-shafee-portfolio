import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; 
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import { LogIn, Send, LogOut, Link as LinkIcon, Eye, EyeOff, LayoutDashboard, Trash2, Edit, Save, PlusCircle } from 'lucide-react';

const Admin = () => {
  const [user, setUser] = useState(null);
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Blog Form State
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null); // ID of post being edited
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('AI Trends');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState(''); 

  // Posts List State
  const [posts, setPosts] = useState([]);

  // 1. Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 2. Fetch Posts (Real-time)
  useEffect(() => {
    if (user) {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const postsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postsData);
      });
      return () => unsubscribe();
    }
  }, [user]);

  // Login Logic
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError("Invalid Email or Password.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // Create or Update Logic
  const handleSave = async (e) => {
    e.preventDefault();
    if (!title || !content || !imageUrl) return alert("Fill all fields");
    
    setLoading(true);
    try {
      const postData = {
        title, category, excerpt, content, image: imageUrl,
        author: "Faris Shafee",
        date: new Date().toLocaleDateString(),
        updatedAt: serverTimestamp()
      };

      if (isEditing) {
        // UPDATE Existing Post
        await updateDoc(doc(db, "posts", editId), postData);
        alert("Post Updated Successfully!");
        setIsEditing(false);
        setEditId(null);
      } else {
        // CREATE New Post
        await addDoc(collection(db, "posts"), {
          ...postData,
          createdAt: serverTimestamp()
        });
        alert("Post Published Successfully!");
      }

      // Reset Form
      setTitle(''); setExcerpt(''); setContent(''); setImageUrl('');
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving post.");
    }
    setLoading(false);
  };

  // Edit Button Click
  const startEdit = (post) => {
    setIsEditing(true);
    setEditId(post.id);
    setTitle(post.title);
    setCategory(post.category);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setImageUrl(post.image);
    window.scrollTo(0,0); // Scroll to top
  };

  // Delete Button Click
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post? This cannot be undone.")) {
      try {
        await deleteDoc(doc(db, "posts", id));
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditId(null);
    setTitle(''); setExcerpt(''); setContent(''); setImageUrl('');
  };

  // ==============================
  // LOGIN SCREEN
  // ==============================
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary px-4">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-highlight/5 rounded-full blur-3xl"></div>

        <div className="relative w-full max-w-md bg-[#0A1619] border border-[#1F4E56] p-8 rounded-2xl shadow-2xl backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
              <LayoutDashboard className="text-highlight" /> Admin Panel
            </h2>
            <p className="text-gray-400 text-sm mt-2">Sign in to manage content</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
              <input type="email" className="w-full bg-[#0F1C20] border border-[#1F4E56] text-white p-3 rounded-lg focus:border-highlight outline-none" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} className="w-full bg-[#0F1C20] border border-[#1F4E56] text-white p-3 rounded-lg focus:border-highlight outline-none pr-10" onChange={(e) => setPassword(e.target.value)} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button>
              </div>
            </div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button type="submit" disabled={loading} className="w-full bg-highlight text-primary font-bold py-3 rounded-lg hover:bg-white transition-all shadow-lg">{loading ? "Verifying..." : "Login"}</button>
          </form>
        </div>
      </div>
    );
  }

  // ==============================
  // DASHBOARD
  // ==============================
  return (
    <div className="pt-24 pb-12 bg-primary min-h-screen px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: EDITOR */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6 bg-[#0A1619] p-6 rounded-2xl border border-[#1F4E56] shadow-xl">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                {isEditing ? <Edit className="text-highlight"/> : <PlusCircle className="text-highlight"/>} 
                {isEditing ? "Edit Article" : "Create New Article"}
              </h1>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 font-bold hover:text-red-300 bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20 transition-all"><LogOut size={18} /> Logout</button>
          </div>

          <div className="bg-[#0A1619] border border-[#1F4E56] p-8 rounded-2xl shadow-xl">
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-highlight mb-2">Title</label>
                <input type="text" className="w-full bg-[#0F1C20] border border-[#1F4E56] text-white p-3 rounded-lg focus:border-highlight outline-none" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-highlight mb-2">Category</label>
                  <select className="w-full bg-[#0F1C20] border border-[#1F4E56] text-white p-3 rounded-lg focus:border-highlight outline-none" value={category} onChange={e => setCategory(e.target.value)}>
                    <option>AI Trends</option><option>Tutorials</option><option>Code Snippets</option><option>News</option>
                  </select>
                </div>
                <div>
                   <label className="block text-sm font-bold text-highlight mb-2">Image URL</label>
                   <div className="flex items-center gap-2 bg-[#0F1C20] border border-[#1F4E56] p-3 rounded-lg focus-within:border-highlight">
                     <LinkIcon size={18} className="text-gray-400" />
                     <input type="text" className="w-full bg-transparent text-white outline-none text-sm" value={imageUrl} onChange={e => setImageUrl(e.target.value)} required />
                   </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-highlight mb-2">Excerpt</label>
                <textarea className="w-full bg-[#0F1C20] border border-[#1F4E56] text-white p-3 rounded-lg focus:border-highlight outline-none h-20 resize-none" value={excerpt} onChange={e => setExcerpt(e.target.value)} required></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-highlight mb-2">Content (Markdown)</label>
                <textarea className="w-full bg-[#0F1C20] border border-[#1F4E56] text-gray-200 p-4 rounded-lg focus:border-highlight outline-none h-80 font-mono text-sm leading-relaxed" value={content} onChange={e => setContent(e.target.value)} required></textarea>
              </div>
              
              <div className="flex gap-4">
                {isEditing && (
                  <button type="button" onClick={cancelEdit} className="w-1/3 bg-gray-700 text-white font-bold py-4 rounded-xl hover:bg-gray-600 transition-all">Cancel</button>
                )}
                <button disabled={loading} type="submit" className={`flex-1 ${isEditing ? 'bg-blue-600' : 'bg-highlight text-primary'} text-white font-bold py-4 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg`}>
                  {loading ? "Saving..." : <><Save size={20} /> {isEditing ? "Update Article" : "Publish Article"}</>}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT COLUMN: POST LIST */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-bold text-white mb-6">Your Posts ({posts.length})</h2>
          <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
            {posts.map((post) => (
              <div key={post.id} className={`bg-[#0A1619] border ${editId === post.id ? 'border-highlight' : 'border-[#1F4E56]'} p-4 rounded-xl group hover:border-gray-500 transition-all`}>
                <h3 className="text-white font-bold line-clamp-1">{post.title}</h3>
                <p className="text-xs text-gray-400 mt-1">{post.date} • {post.category}</p>
                <div className="flex justify-end gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => startEdit(post)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(post.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
            {posts.length === 0 && <p className="text-gray-500 text-center py-10">No posts yet.</p>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Admin;