import React from 'react';
import { ExternalLink, Github, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Low Stock Alert System",
      category: "Cloud & Azure",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?fit=crop&w=800&q=80",
      tech: ["Azure Functions", "Cosmos DB", "React", "Node.js"],
      description: "A serverless inventory monitoring system. Uses Azure Functions to scan stock levels and send intelligent email alerts via SendGrid."
    },
    {
      id: 2,
      title: "Smart Cradle IoT",
      category: "IoT & Mobile",
      image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?fit=crop&w=800&q=80",
      tech: ["Flutter", "Arduino ESP32", "Firebase", "C++"],
      description: "AI-based sleep pattern analysis system. Features real-time sensor monitoring, mobile app control, and automated cradle rocking."
    },
    {
      id: 3,
      title: "Oasis Amps EV",
      category: "Full Stack Web",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?fit=crop&w=800&q=80",
      tech: ["Laravel", "MySQL", "Google Maps API", "Stripe"],
      description: "EV Charger booking platform with interactive maps and secure payments. Allows station owners to list charging spots."
    }
  ];

  return (
    <section id="projects" className="py-24 bg-primary text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
             <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
             <div className="w-20 h-1 bg-highlight rounded-full mb-4"></div>
             <p className="text-gray-400 max-w-xl">
               A selection of my recent work in Cloud Computing, IoT, and Full-Stack Web Development.
             </p>
          </div>
          <a href="https://github.com/Shafee25" target="_blank" className="px-6 py-2 border border-secondary hover:bg-highlight hover:text-primary rounded-full transition-all duration-300 flex items-center gap-2 text-sm font-bold">
            View Github <Github size={16} />
          </a>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group bg-secondary/20 rounded-2xl overflow-hidden border border-white/5 hover:border-highlight/50 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image Area */}
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/40 group-hover:bg-transparent transition-all duration-300 z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <span className="absolute top-4 right-4 z-20 bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-highlight border border-highlight/20">
                  {project.category}
                </span>
              </div>

              {/* Content Area */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-highlight transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs text-gray-300 bg-white/5 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                   <button className="flex items-center gap-2 text-sm font-semibold hover:text-highlight transition-colors">
                     <Layers size={16} /> Details
                   </button>
                   <button className="flex items-center gap-2 text-sm font-semibold hover:text-highlight transition-colors">
                     Live Demo <ExternalLink size={16} />
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;