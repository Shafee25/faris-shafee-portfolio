import React from 'react';
import { Database, Server, Smartphone, Code, Cloud, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const Skills = () => {
  const skills = [
    {
      id: 1,
      title: "Full Stack Web",
      icon: <Code size={32} className="text-highlight" />,
      description: "Building responsive apps with React, Node.js, and Laravel using MVC architecture.",
      tools: ["React.js", "Node.js", "Express JS", "Tailwind", "Next.js", "MySQL", "MongoDB", "Ms SQL", "Git", "Stored Procedures", "Laravel"]
    },
    {
      id: 2,
      title: "Cloud & DevOps",
      icon: <Cloud size={32} className="text-blue-400" />,
      description: "Deploying serverless applications on Azure/AWS and managing CI/CD pipelines.",
      tools: ["Azure Functions", "Cosmos DB", "AWS", "Docker", "EC2"]
    },
    {
      id: 3,
      title: "Mobile & IoT",
      icon: <Smartphone size={32} className="text-green-400" />,
      description: "Developing cross-platform mobile apps and IoT systems with real-time sensor data.",
      tools: ["Flutter", "Arduino", "ESP32", "MQTT"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
          >
            Technical Expertise
          </motion.h2>
          <div className="w-20 h-1 bg-highlight mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A blend of modern web technologies, cloud infrastructure, and hardware integration.
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                {skill.icon}
              </div>
              
              <h3 className="text-xl font-bold text-primary mb-3">{skill.title}</h3>
              <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                {skill.description}
              </p>

              {/* Tools Tags */}
              <div className="flex flex-wrap gap-2">
                {skill.tools.map((tool) => (
                  <span key={tool} className="px-3 py-1 bg-gray-100 text-primary text-xs font-semibold rounded-full">
                    {tool}
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