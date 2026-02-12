import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { defaultExperience } from '../data/defaults'; // Import Defaults

const Experience = () => {
  const [firebaseExp, setFirebaseExp] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "experience"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFirebaseExp(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const allExperience = [...firebaseExp, ...defaultExperience];

  return (
    <section id="about" className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-100 to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-primary mb-4">
            My Professional Journey
          </motion.h2>
          <div className="w-20 h-1 bg-highlight mx-auto rounded-full"></div>
        </div>

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
          {allExperience.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Timeline Icon */}
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ${item.type === 'work' ? 'bg-highlight' : 'bg-primary'}`}>
                {item.type === 'work' ? <Briefcase size={16} className="text-primary" /> : <GraduationCap size={16} className="text-white" />}
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl hover:border-highlight/30 transition-all duration-300 group-hover:-translate-y-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-primary text-lg">{item.role}</span>
                  <span className="text-xs font-semibold text-highlight bg-primary/5 px-2 py-1 rounded-full flex items-center gap-1"><Calendar size={10} /> {item.period}</span>
                </div>
                <div className="text-sm font-semibold text-secondary mb-3">{item.company}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;