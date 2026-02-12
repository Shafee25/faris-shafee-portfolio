import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore'; 
import { db } from '../firebase'; 
import { Calendar, User, ArrowRight, Tag, Loader2, Filter } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { blogPosts } from '../data/content'; // Fallback static data if needed

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // ROBUST FILTERING Logic
  const displayPosts = categoryFilter 
    ? posts.filter(post => {
        // Normalize strings (trim spaces, check strict equality)
        const postCat = (post.category || "").trim();
        const filterCat = categoryFilter.trim();
        return postCat === filterCat;
      })
    : posts;

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin text-primary" size={40}/></div>;
  }

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            {categoryFilter ? `${categoryFilter}` : "Tech & AI Insights"}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Thoughts on AI, Web Development, and Engineering.
          </p>
          
          {categoryFilter && (
            <Link to="/blog" className="inline-flex items-center gap-2 mt-4 text-highlight font-bold hover:underline bg-white px-4 py-2 rounded-full shadow-sm">
              <Filter size={16} /> Clear Filter (Show All)
            </Link>
          )}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayPosts.length > 0 ? (
            displayPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 flex flex-col h-full">
                
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => e.target.src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b"}
                  />
                  <div className="absolute top-4 left-4 bg-highlight text-primary text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                    <Tag size={12} /> {post.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-xs text-gray-500 mb-3 gap-4">
                    <span className="flex items-center gap-1"><Calendar size={14} /> {post.date || 'Recently'}</span>
                    <span className="flex items-center gap-1"><User size={14} /> {post.author || 'Admin'}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  <Link to={`/blog/${post.id}`} className="text-secondary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto pt-4 border-t border-gray-100">
                    Read Article <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-20">
              <p className="text-xl text-gray-400 font-medium">No articles found in this category.</p>
              <Link to="/blog" className="text-highlight font-bold mt-2 inline-block">View all posts</Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Blog;