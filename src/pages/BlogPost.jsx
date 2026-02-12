import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore'; 
import { db } from '../firebase'; 
import { ArrowLeft, Calendar, User, Tag, Loader2, Clock, Share2, Check, Linkedin } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // 1. Fetch Post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setPost(docSnap.data());
      } catch (error) { console.error(error); } 
      finally { setLoading(false); }
    };
    fetchPost();
  }, [id]);

  // 2. Scroll Progress Bar Logic
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. Share Logic
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 4. Calculate Reading Time
  const getReadingTime = (text) => {
    const wpm = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wpm);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin text-primary" size={40}/></div>;
  if (!post) return <div className="text-center py-20 text-2xl font-bold">Article not found!</div>;

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1.5 bg-highlight z-[60]" style={{ width: `${scrollProgress * 100}%`, transition: 'width 0.1s' }}></div>

      <div className="pt-24 pb-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8 transition-colors font-medium">
            <ArrowLeft size={20} /> Back to Articles
          </Link>

          {/* Header */}
          <div className="mb-10">
            <div className="flex gap-2 mb-4">
              <span className="bg-highlight/20 text-primary px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 uppercase tracking-wide">
                <Tag size={12} /> {post.category}
              </span>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <Clock size={12} /> {getReadingTime(post.content)} min read
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">{post.title}</h1>
            
            <div className="flex flex-wrap items-center justify-between gap-6 border-b border-gray-100 pb-8">
              <div className="flex items-center gap-6 text-gray-500 text-sm">
                <span className="flex items-center gap-2"><Calendar size={16} /> {post.date}</span>
                <span className="flex items-center gap-2"><User size={16} /> {post.author}</span>
              </div>

              {/* Share Buttons */}
              <div className="flex gap-3">
                <button onClick={handleCopyLink} className="flex items-center gap-2 px-3 py-1.5 border rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors text-gray-600">
                  {copied ? <Check size={16} className="text-green-500"/> : <Share2 size={16}/>} {copied ? "Copied!" : "Copy Link"}
                </button>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                  target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#0077b5] text-white rounded-lg hover:bg-[#006097] text-sm font-medium transition-colors"
                >
                  <Linkedin size={16}/> Share
                </a>
              </div>
            </div>
          </div>

          <div className="w-full h-64 md:h-96 mb-12 rounded-2xl overflow-hidden shadow-lg relative bg-gray-100">
             <img src={post.image} alt={post.title} className="w-full h-full object-cover" onError={(e) => {e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b"}} />
          </div>

          {/* CONTENT WITH CODE HIGHLIGHTING */}
          <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
             <ReactMarkdown 
               components={{
                 code({node, inline, className, children, ...props}) {
                   const match = /language-(\w+)/.exec(className || '')
                   return !inline && match ? (
                     <div className="rounded-lg overflow-hidden my-6 shadow-xl text-sm">
                       <div className="bg-[#282a36] px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                         <div className="flex gap-1.5">
                           <div className="w-3 h-3 rounded-full bg-red-500"></div>
                           <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                           <div className="w-3 h-3 rounded-full bg-green-500"></div>
                         </div>
                         <span className="text-gray-400 text-xs ml-2">{match[1]}</span>
                       </div>
                       <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div" customStyle={{margin: 0}} {...props}>
                         {String(children).replace(/\n$/, '')}
                       </SyntaxHighlighter>
                     </div>
                   ) : (
                     <code className="bg-gray-100 text-red-500 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                       {children}
                     </code>
                   )
                 },
                 h1: ({node, ...props}) => <h1 className="text-3xl font-bold text-primary mt-8 mb-4" {...props} />,
                 h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-primary mt-8 mb-4 border-l-4 border-highlight pl-4" {...props} />,
                 p: ({node, ...props}) => <p className="mb-6" {...props} />,
                 blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-highlight pl-4 italic my-6 text-gray-600 bg-gray-50 py-4 rounded-r-lg" {...props} />,
                 img: ({node, ...props}) => <img className="rounded-xl shadow-md my-8 w-full" {...props} alt="Blog visual" />,
               }}
             >
               {post.content}
             </ReactMarkdown>
          </article>

        </div>
      </div>
    </>
  );
};

export default BlogPost;