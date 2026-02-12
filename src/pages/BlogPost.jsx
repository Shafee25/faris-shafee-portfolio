import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { blogPosts } from '../data/content'; // Importing your data

const BlogPost = () => {
  const { id } = useParams(); // Get the ID from the URL
  const post = blogPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return <div className="text-center py-20 text-2xl font-bold">Article not found!</div>;
  }

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors">
          <ArrowLeft size={20} /> Back to Articles
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex gap-2 mb-4">
             <span className="bg-highlight/20 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
               <Tag size={12} /> {post.category}
             </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-gray-500 text-sm border-b border-gray-100 pb-8">
            <span className="flex items-center gap-2"><Calendar size={16} /> {post.date}</span>
            <span className="flex items-center gap-2"><User size={16} /> {post.author}</span>
          </div>
        </div>

        {/* Image */}
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-96 object-cover rounded-2xl shadow-lg mb-12"
        />

        {/* Markdown Content ( The Article Body ) */}
        <article className="prose prose-lg max-w-none text-gray-700">
           <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

      </div>
    </div>
  );
};

export default BlogPost;