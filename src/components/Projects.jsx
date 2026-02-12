import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { ExternalLink, Github, Code, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { defaultProjects } from '../data/defaults'; // Import Defaults

const Projects = () => {
  const [firebaseProjects, setFirebaseProjects] = useState([]);
  const [filter, setFilter] = useState('All');

  // Fetch Firebase Data
  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFirebaseProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Merge Data (Firebase first, then Defaults)
  const allProjects = [...firebaseProjects, ...defaultProjects];

  // Get Unique Categories for Filter Buttons
  const categories = ['All', ...new Set(allProjects.map(p => p.category || 'Other'))];

  // Filter Logic
  const filteredProjects = filter === 'All' 
    ? allProjects 
    : allProjects.filter(p => (p.category || 'Other') === filter);

  return (
    <section id="projects" className="py-24 bg-[#0F1C20] text-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-secondary/20 via-primary to-primary pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
             <motion.h2 
               initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
               className="text-3xl md:text-4xl font-bold mb-4"
             >
               Featured Projects
             </motion.h2>
             <div className="w-20 h-1 bg-highlight rounded-full mb-4"></div>
             <p className="text-gray-400 max-w-xl">
               A blend of Cloud, IoT, and Full-Stack Engineering.
             </p>
          </div>
          
          {/* Animated Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 border ${
                  filter === cat 
                    ? 'bg-highlight text-primary border-highlight scale-105' 
                    : 'bg-transparent text-gray-400 border-gray-700 hover:border-white hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid with AnimatePresence for smooth filtering */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group bg-[#1A2C32] rounded-2xl overflow-hidden border border-white/5 hover:border-highlight/50 hover:shadow-2xl hover:shadow-highlight/10 transition-all duration-300 flex flex-col"
              >
                {/* Image Area */}
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/40 group-hover:bg-transparent transition-all duration-300 z-10"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => e.target.src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?fit=crop&w=800&q=80"}
                  />
                  <span className="absolute top-4 right-4 z-20 bg-primary/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-highlight border border-highlight/20 shadow-lg">
                    {project.category}
                  </span>
                </div>

                {/* Content Area */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-highlight transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech && project.tech.split(',').map((t) => (
                      <span key={t} className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded border border-white/5">
                        {t.trim()}
                      </span>
                    ))}
                  </div>

                  {/* Action Bar */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                     <div className="flex gap-4">
                       {project.github && (
                         <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors">
                           <Github size={16} /> Code
                         </a>
                       )}
                       {project.demo && (
                         <a href={project.demo} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-highlight transition-colors">
                           <ExternalLink size={16} /> Live
                         </a>
                       )}
                     </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;