import React from 'react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: "Associate Software Engineer",
      company: "AI Generix - Remote (Part Time)",
      period: "Sept 2025 - Present",
      type: "work",
      description: "Implementing frontend and backend features using Laravel & React. Designing schemas for MySQL/MS SQL and managing MVC architecture."
    },
    {
      id: 2,
      role: "Software Engineer - Intern",
      company: "MobioS Pvt Ltd",
      period: "Sept 2025 - Present",
      type: "work",
      description: "Developing scalable web apps with React.js, Node.js, and MS SQL. optimizing stored procedures and deploying to cloud environments."
    },
    {
      id: 3,
      role: "Freelance Developer",
      company: "Fiverr & Upwork",
      period: "March 2024 - Sept 2025",
      type: "work",
      description: "Completed diverse client projects including responsive websites, UI/UX designs, and full-stack applications. Maintained 5-star ratings."
    },
    {
      id: 4,
      role: "B.ICT (Hons) in Software Tech",
      company: "South Eastern University of Sri Lanka",
      period: "2021 - 2025",
      type: "education",
      description: "Specialized in Software Technologies. Gained strong foundation in Algorithms, Cloud Computing, and Mobile Development."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
          >
            My Professional Journey
          </motion.h2>
          <div className="w-20 h-1 bg-highlight mx-auto rounded-full"></div>
        </div>

        {/* Timeline */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
          {experiences.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Icon Bubble */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-highlight shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                {item.type === 'work' ? <Briefcase size={16} className="text-primary" /> : <GraduationCap size={16} className="text-primary" />}
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-primary text-lg">{item.role}</span>
                  <span className="text-xs font-semibold text-highlight bg-primary/5 px-2 py-1 rounded-full flex items-center gap-1">
                     <Calendar size={10} /> {item.period}
                  </span>
                </div>
                <div className="text-sm font-semibold text-secondary mb-3">{item.company}</div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Experience;