import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; 
import { db } from '../firebase'; 
import { ArrowLeft, Calendar, User, Tag, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { id } = useParams(); // Get the ID from the URL (e.g., /blog/xyz123)
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Reference to the specific document in the "posts" collection
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-primary" size={40}/>
      </div>
    );
  }

  // Error/Not Found State
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Article not found!</h2>
        <Link to="/blog" className="text-highlight font-bold hover:underline">
          Go back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors font-medium">
          <ArrowLeft size={20} /> Back to Articles
        </Link>

        {/* Article Header */}
        <div className="mb-10">
          <div className="flex gap-2 mb-4">
             <span className="bg-highlight/20 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 uppercase tracking-wide">
               <Tag size={12} /> {post.category}
             </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-500 text-sm border-b border-gray-100 pb-8">
            <span className="flex items-center gap-2">
              <Calendar size={16} /> {post.date}
            </span>
            <span className="flex items-center gap-2">
              <User size={16} /> {post.author}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="w-full h-64 md:h-96 mb-12 rounded-2xl overflow-hidden shadow-lg relative bg-gray-100">
           <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
            onError={(e) => {e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"}} // Fallback image if link is broken
          />
        </div>

        {/* Markdown Content Area */}
        {/* We use 'prose' class from Tailwind Typography plugin if available, or custom styles */}
        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
           <ReactMarkdown 
             components={{
               // Custom styling for markdown elements
               h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-primary mt-8 mb-4" {...props} />,
               h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-primary mt-8 mb-4" {...props} />,
               h3: ({node, ...props}) => <h3 className="text-xl font-bold text-primary mt-6 mb-3" {...props} />,
               p: ({node, ...props}) => <p className="mb-6" {...props} />,
               ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6" {...props} />,
               ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6" {...props} />,
               li: ({node, ...props}) => <li className="mb-2" {...props} />,
               code: ({node, ...props}) => <code className="bg-gray-100 text-red-500 px-1 py-0.5 rounded text-sm font-mono" {...props} />,
               blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-highlight pl-4 italic my-6 text-gray-600 bg-gray-50 py-2" {...props} />,
             }}
           >
             {post.content}
           </ReactMarkdown>
        </article>

      </div>
    </div>
  );
};

export default BlogPost;