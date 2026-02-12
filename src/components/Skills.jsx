import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Code, Cloud, Smartphone, Database, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { defaultSkills } from '../data/defaults'; // Import Defaults

const Skills = () => {
  const [firebaseSkills, setFirebaseSkills] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "skills"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFirebaseSkills(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const allSkills = [...firebaseSkills, ...defaultSkills];

  // Helper to pick icons (randomly assigns if generic)
  const getIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('web') || t.includes('stack')) return <Code size={32} className="text-highlight" />;
    if (t.includes('cloud') || t.includes('ops')) return <Cloud size={32} className="text-blue-400" />;
    if (t.includes('mobile') || t.includes('iot')) return <Smartphone size={32} className="text-green-400" />;
    if (t.includes('data')) return <Database size={32} className="text-purple-400" />;
    return <Terminal size={32} className="text-gray-400" />;
  };

  return (
    <section id="skills" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
          >
            Technical Expertise
          </motion.h2>
          <div className="w-20 h-1 bg-highlight mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">Technologies I work with.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {allSkills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Subtle gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-highlight/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300 relative z-10">
                {getIcon(skill.title)}
              </div>
              <h3 className="text-xl font-bold text-primary mb-3 relative z-10">{skill.title}</h3>
              <p className="text-gray-500 mb-6 text-sm leading-relaxed relative z-10">{skill.description}</p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {skill.tools && skill.tools.split(',').map((tool) => (
                  <span key={tool} className="px-3 py-1 bg-gray-100 text-primary text-xs font-semibold rounded-full hover:bg-highlight hover:text-white transition-colors cursor-default">
                    {tool.trim()}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;