import { Search, Calendar, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import Pagination from '../components/Pagination'

interface BlogPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  publishedAt: string;
  author: { firstName: string; lastName: string };
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '6');
      if (search.trim()) params.append('search', search.trim());
      if (category) params.append('category', category);

      const response = await api.get(`/blog?${params.toString()}`);
      setPosts(response.data.data);
      setCategories(response.data.categories || []);
      setTotalPages(response.data.pagination?.totalPages || 1);
      setCurrentPage(response.data.pagination?.currentPage || 1);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(1); }, [category]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchPosts(1);
  };

  return (
    <div className="flex-1 bg-bg-subtle">
      {/* Header */}
      <section className="w-full bg-gray-900 text-white py-20 px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Blog & Resources</h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          Stay informed with the latest news, guides, and stories from the blood donation community.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Search & Filter */}
        <div className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm mb-8 flex flex-col md:flex-row gap-4 items-end">
          <form onSubmit={handleSearch} className="flex-1 w-full">
            <label className="block text-xs font-bold text-text-muted mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-bg-subtle border border-border-strong rounded-xl pl-10 pr-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
              />
            </div>
          </form>
          <div className="w-full md:w-48">
            <label className="block text-xs font-bold text-text-muted mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <button onClick={() => fetchPosts(1)} className="w-full md:w-auto bg-gray-900 dark:bg-primary text-white font-medium py-3 px-6 rounded-xl hover:opacity-90 transition">
            Search
          </button>
        </div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-bg-surface rounded-2xl border border-border-subtle overflow-hidden animate-pulse">
                <div className="h-48 bg-bg-subtle" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-bg-subtle rounded w-1/4" />
                  <div className="h-5 bg-bg-subtle rounded w-3/4" />
                  <div className="h-4 bg-bg-subtle rounded w-full" />
                  <div className="h-4 bg-bg-subtle rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="bg-bg-surface rounded-2xl border border-border-subtle overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 flex flex-col group"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{post.category}</span>
                      <span className="text-xs text-text-muted flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-text-base mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-sm text-text-muted leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
                    <div className="mt-4 pt-4 border-t border-border-subtle flex items-center gap-2 text-xs text-text-muted">
                      <User className="w-3.5 h-3.5" />
                      {post.author.firstName} {post.author.lastName}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => fetchPosts(p)} />
          </>
        ) : (
          <div className="bg-bg-surface border border-dashed border-border-strong rounded-3xl p-16 text-center">
            <h3 className="text-2xl font-bold text-text-base mb-2">No posts found</h3>
            <p className="text-text-muted">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
