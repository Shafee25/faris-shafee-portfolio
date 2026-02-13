import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { motion } from 'framer-motion';
import { Code, Cloud, Cpu, Database, Globe, Terminal } from 'lucide-react';
import { defaultSkills } from '../data/defaults';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "skills"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setSkills(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const allSkills = [...skills, ...defaultSkills];
  const getIcon = (title) => {
    if (title.includes('Web')) return <Globe size={28}/>;
    if (title.includes('Cloud')) return <Cloud size={28}/>;
    if (title.includes('IoT')) return <Cpu size={28}/>;
    return <Code size={28}/>;
  };

  return (
    <section id="skills" className="py-32 bg-[#0F1C20] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Technical <span className="text-highlight">Arsenal.</span></h2>
          <div className="h-1 w-20 bg-gray-800"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
          {/* Main Large Block */}
          <div className="md:col-span-2 row-span-1 md:row-span-2 bg-[#16292F] rounded-3xl p-8 border border-white/5 relative overflow-hidden group hover:border-highlight/30 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-highlight/5 rounded-full blur-[80px] group-hover:bg-highlight/10 transition-colors"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-highlight mb-4">
                  <Terminal size={24}/>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Full Stack Engineering</h3>
                <p className="text-gray-400 max-w-md">My core strength. Building scalable architectures using the MERN stack and Laravel MVC patterns.</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {['React', 'Node.js', 'Laravel', 'Next.js', 'Tailwind'].map(t => (
                  <span key={t} className="px-3 py-1 bg-black/20 text-gray-300 text-sm rounded-lg border border-white/5">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Dynamic Blocks from DB */}
          {allSkills.slice(1, 5).map((skill, i) => (
            <motion.div 
              key={skill.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-[#16292F] rounded-3xl p-6 border border-white/5 flex flex-col justify-between hover:bg-[#1a3036] transition-colors group"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-white/5 rounded-xl text-white group-hover:text-highlight transition-colors">
                  {getIcon(skill.title)}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 text-xs font-mono">0{i+2}</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{skill.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{skill.description}</p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Skills;