import React from 'react';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

const Blog = () => {
  // Sample Data - You can add your AI news here
  const posts = [
    {
      id: 1,
      title: "The Future of AI: GPT-5 and Beyond",
      excerpt: "Exploring the potential capabilities of the next generation of Large Language Models and their impact on software engineering.",
      date: "Feb 10, 2026",
      author: "Faris Shafee",
      category: "Artificial Intelligence",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 2,
      title: "Optimizing React Performance in 2026",
      excerpt: "Deep dive into the latest React compiler features and how to reduce bundle sizes for high-traffic web applications.",
      date: "Feb 08, 2026",
      author: "Faris Shafee",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    },
    {
      id: 3,
      title: "IoT Security: Protecting Smart Devices",
      excerpt: "Best practices for securing ESP32 and Arduino based IoT networks against modern cyber threats.",
      date: "Jan 25, 2026",
      author: "Faris Shafee",
      category: "IoT Security",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=800",
    }
  ];

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Blog Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Tech & AI Insights</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Daily updates on Artificial Intelligence, Web Development, and the future of Tech.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-highlight text-primary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Tag size={12} /> {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-xs text-gray-500 mb-3 gap-4">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                  <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <button className="text-secondary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                  Read Article <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;