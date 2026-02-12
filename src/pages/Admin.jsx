import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; 
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, onSnapshot, query, orderBy } from "firebase/firestore";
import { LogIn, LogOut, LayoutDashboard, Trash2, Edit, Save, PlusCircle, Layers, Briefcase, Code, PenTool, Eye, EyeOff, ShieldCheck, Lock, User, Bold, Italic, Heading1, Heading2, Quote, List, Code as CodeIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('posts'); 
  const [loading, setLoading] = useState(false);
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Generic Form State
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [items, setItems] = useState([]); 

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  // Fetch Data
  useEffect(() => {
    if (!user) return;
    setFormData({}); setIsEditing(false); 
    
    const collectionName = activeTab;
    const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setItems(data);
    });
    return () => unsubscribe();
  }, [user, activeTab]);

  // Handlers
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError('');
    try { 
      await signInWithEmailAndPassword(auth, email, password); 
    } catch (err) { 
      setLoginError("Access Denied: Invalid Credentials"); 
      setLoading(false);
    }
  };

  const handleLogout = () => signOut(auth);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- NEW: MARKDOWN TOOLBAR LOGIC ---
  const insertFormat = (symbol, closeSymbol = "") => {
    const textarea = document.getElementById('content-editor');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = formData.content || "";
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);

    const newText = `${before}${symbol}${selected}${closeSymbol}${after}`;
    setFormData({ ...formData, content: newText });
    
    // Return focus (optional refinement)
    textarea.focus();
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const collectionRef = collection(db, activeTab);
      // Auto-add Author and Date if not present
      const payload = { 
        ...formData, 
        author: formData.author || "Faris Shafee", // Default Author
        date: formData.date || new Date().toLocaleDateString(), // Default Date string
        createdAt: serverTimestamp() 
      };

      if (isEditing) {
        await updateDoc(doc(db, activeTab, editId), payload);
        alert("System Updated Successfully!");
      } else {
        await addDoc(collectionRef, payload);
        alert("New Record Initialized!");
      }
      setFormData({}); setIsEditing(false); setEditId(null);
    } catch (err) {
      console.error(err);
      alert("System Error: Check Console");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Execute Delete Protocol? This cannot be undone.")) await deleteDoc(doc(db, activeTab, id));
  };

  const startEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
    setEditId(item.id);
  };

  // --- RENDER HELPERS ---
  const renderFormFields = () => {
    switch (activeTab) {
      case 'posts': // BLOG
        return (
          <>
            <div className="grid md:grid-cols-2 gap-4">
               <input name="title" placeholder="Blog Title" value={formData.title || ''} onChange={handleInputChange} className="admin-input" required />
               <select name="category" value={formData.category || 'AI Trends'} onChange={handleInputChange} className="admin-input">
                 <option value="AI Trends">AI Trends</option>
                 <option value="Tutorials">Tutorials</option>
                 <option value="Code Snippets">Code Snippets</option>
                 <option value="News">News</option>
               </select>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <input name="author" placeholder="Author (e.g. Faris Shafee)" value={formData.author || ''} onChange={handleInputChange} className="admin-input" />
              <input name="date" placeholder="Date (e.g. Feb 14, 2026)" value={formData.date || ''} onChange={handleInputChange} className="admin-input" />
            </div>

            <input name="image" placeholder="Cover Image URL" value={formData.image || ''} onChange={handleInputChange} className="admin-input" required />
            <textarea name="excerpt" placeholder="Short Excerpt (SEO)" value={formData.excerpt || ''} onChange={handleInputChange} className="admin-input h-20" required />
            
            {/* MARKDOWN TOOLBAR */}
            <div className="bg-[#0F1C20] border border-[#1F4E56] border-b-0 rounded-t-xl p-2 flex gap-2 overflow-x-auto">
              <button type="button" onClick={() => insertFormat('**', '**')} className="toolbar-btn" title="Bold"><Bold size={16}/></button>
              <button type="button" onClick={() => insertFormat('_', '_')} className="toolbar-btn" title="Italic"><Italic size={16}/></button>
              <button type="button" onClick={() => insertFormat('# ')} className="toolbar-btn" title="Heading 1"><Heading1 size={16}/></button>
              <button type="button" onClick={() => insertFormat('## ')} className="toolbar-btn" title="Heading 2"><Heading2 size={16}/></button>
              <button type="button" onClick={() => insertFormat('> ')} className="toolbar-btn" title="Quote"><Quote size={16}/></button>
              <button type="button" onClick={() => insertFormat('- ')} className="toolbar-btn" title="List"><List size={16}/></button>
              <button type="button" onClick={() => insertFormat('```javascript\n', '\n```')} className="toolbar-btn" title="Code Block"><CodeIcon size={16}/></button>
            </div>
            <textarea 
              id="content-editor"
              name="content" 
              placeholder="Write your article here..." 
              value={formData.content || ''} 
              onChange={handleInputChange} 
              className="admin-input h-80 font-mono text-sm rounded-t-none mt-0" 
              required 
            />
          </>
        );
      case 'projects': // PROJECTS
        return (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="title" placeholder="Project Title" value={formData.title || ''} onChange={handleInputChange} className="admin-input" required />
              <input name="category" placeholder="Category (e.g. Cloud)" value={formData.category || ''} onChange={handleInputChange} className="admin-input" required />
            </div>
            <input name="image" placeholder="Thumbnail URL" value={formData.image || ''} onChange={handleInputChange} className="admin-input" required />
            <input name="tech" placeholder="Tech Stack (React, AWS, etc.)" value={formData.tech || ''} onChange={handleInputChange} className="admin-input" required />
            <div className="grid md:grid-cols-2 gap-4">
              <input name="github" placeholder="GitHub Link" value={formData.github || ''} onChange={handleInputChange} className="admin-input" />
              <input name="demo" placeholder="Live Demo Link" value={formData.demo || ''} onChange={handleInputChange} className="admin-input" />
            </div>
            <textarea name="description" placeholder="Project Description" value={formData.description || ''} onChange={handleInputChange} className="admin-input h-32" required />
          </>
        );
      // ... Skills and Experience stay the same ...
      case 'skills': return (
        <>
          <input name="title" placeholder="Skill Area" value={formData.title || ''} onChange={handleInputChange} className="admin-input" required />
          <input name="tools" placeholder="Tools (Node.js, Docker)" value={formData.tools || ''} onChange={handleInputChange} className="admin-input" required />
          <textarea name="description" placeholder="Short Description" value={formData.description || ''} onChange={handleInputChange} className="admin-input h-24" required />
        </>
      );
      case 'experience': return (
        <>
           <div className="grid md:grid-cols-2 gap-4">
              <input name="role" placeholder="Role" value={formData.role || ''} onChange={handleInputChange} className="admin-input" required />
              <input name="company" placeholder="Company" value={formData.company || ''} onChange={handleInputChange} className="admin-input" required />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input name="period" placeholder="Period" value={formData.period || ''} onChange={handleInputChange} className="admin-input" required />
              <select name="type" value={formData.type || 'work'} onChange={handleInputChange} className="admin-input">
                <option value="work">Work Experience</option>
                <option value="education">Education</option>
              </select>
            </div>
            <textarea name="description" placeholder="Job Description" value={formData.description || ''} onChange={handleInputChange} className="admin-input h-32" required />
        </>
      );
      default: return null;
    }
  };

  if (!user) return (
    /* ... LOGIN CODE FROM PREVIOUS STEP (Keep it exactly as it was) ... */
    <div className="min-h-screen flex items-center justify-center bg-[#0F1C20]">
        {/* Simplified Login for brevity in this snippet - use the beautiful one I gave you before */}
        <form onSubmit={handleLogin} className="bg-white p-8 rounded">
            <h2 className="text-black font-bold mb-4">Admin Login</h2>
            <input type="email" onChange={e => setEmail(e.target.value)} className="border p-2 w-full mb-2" placeholder="Email"/>
            <input type="password" onChange={e => setPassword(e.target.value)} className="border p-2 w-full mb-2" placeholder="Password"/>
            <button className="bg-highlight px-4 py-2 w-full font-bold">Login</button>
        </form>
    </div>
  );

  return (
    <div className="pt-24 pb-12 bg-primary min-h-screen px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-wrap gap-4 justify-between items-center mb-8 bg-[#0A1619] p-6 rounded-2xl border border-[#1F4E56] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-highlight/5 to-transparent pointer-events-none"></div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3 relative z-10">
            <LayoutDashboard className="text-highlight" /> 
            <span className="tracking-wide">COMMAND CENTER</span>
          </h1>
          <button onClick={handleLogout} className="text-red-400 font-bold hover:text-red-300 flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-all"><LogOut size={18}/> Logout</button>
        </div>

        {/* TABS */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { id: 'posts', label: 'Blogs', icon: PenTool },
            { id: 'projects', label: 'Projects', icon: Layers },
            { id: 'skills', label: 'Skills', icon: Code },
            { id: 'experience', label: 'Experience', icon: Briefcase },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all border ${activeTab === tab.id ? 'bg-highlight text-primary border-highlight shadow-lg scale-105' : 'bg-[#0A1619] text-gray-400 border-[#1F4E56] hover:border-gray-500 hover:text-white'}`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* EDITOR COLUMN */}
          <div className="lg:col-span-2 bg-[#0A1619] border border-[#1F4E56] p-8 rounded-2xl h-fit shadow-xl relative">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
              {isEditing ? <Edit size={20} className="text-blue-400"/> : <PlusCircle size={20} className="text-green-400"/>} 
              {isEditing ? `Edit ${activeTab.slice(0,-1)}` : `Initialize New ${activeTab.slice(0,-1)}`}
            </h2>
            <form onSubmit={handleSave} className="space-y-5">
              {renderFormFields()}
              <div className="flex gap-4 pt-4 border-t border-white/5 mt-6">
                {isEditing && <button type="button" onClick={() => {setIsEditing(false); setFormData({});}} className="w-1/3 bg-gray-700 text-white font-bold py-3 rounded-xl hover:bg-gray-600 transition-all">Cancel</button>}
                <button disabled={loading} className={`flex-1 ${isEditing ? 'bg-blue-600' : 'bg-highlight text-primary'} font-bold py-3 rounded-xl hover:brightness-110 flex items-center justify-center gap-2 shadow-lg transition-all`}>
                   <Save size={18}/> {loading ? "Processing..." : isEditing ? "Update Database" : "Deploy to Live"}
                </button>
              </div>
            </form>
          </div>

          {/* LIST COLUMN (Updated to show Author/Date) */}
          <div className="lg:col-span-1 bg-[#0A1619] border border-[#1F4E56] p-6 rounded-2xl h-[650px] overflow-y-auto custom-scrollbar shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
              <span>Database Records</span>
              <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">{items.length}</span>
            </h2>
            <div className="space-y-3">
              <AnimatePresence>
                {items.map(item => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                    key={item.id} 
                    className={`bg-[#0F1C20] border ${editId === item.id ? 'border-highlight' : 'border-[#1F4E56]'} p-4 rounded-xl group hover:border-gray-500 transition-all relative overflow-hidden`}
                  >
                    <div className="relative z-10">
                      <h3 className="text-white font-bold line-clamp-1 text-sm">{item.title || item.role}</h3>
                      <p className="text-xs text-gray-400 mt-1 truncate">
                        {/* Display Extra Info (Author/Date) */}
                        {item.author && <span className="block text-highlight/80 mb-0.5">By {item.author}</span>}
                        {item.date && <span className="block opacity-70">{item.date}</span>}
                        {(!item.author && !item.date) && (item.company || item.category || 'No details')}
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#0F1C20] to-transparent z-20"></div>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEdit(item)} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"><Edit size={14}/></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors"><Trash2 size={14}/></button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {items.length === 0 && <div className="text-gray-500 text-center py-10 flex flex-col items-center"><Layers size={32} className="mb-2 opacity-50"/>Empty Database</div>}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .admin-input {
          width: 100%;
          background-color: #0F1C20;
          border: 1px solid #1F4E56;
          color: white;
          padding: 14px;
          border-radius: 12px;
          outline: none;
          font-size: 0.95rem;
          transition: all 0.2s;
        }
        .admin-input:focus {
          border-color: #FCA311;
          box-shadow: 0 0 0 2px rgba(252, 163, 17, 0.1);
          background-color: #132429;
        }
        .toolbar-btn {
          padding: 8px;
          background: #1F4E56;
          color: #E0E6ED;
          border-radius: 6px;
          transition: all 0.2s;
        }
        .toolbar-btn:hover {
          background: #FCA311;
          color: #0F1C20;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0A1619; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1F4E56; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Admin;