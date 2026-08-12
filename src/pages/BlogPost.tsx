import { Calendar, User, ArrowLeft, Tag } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/axios'

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  publishedAt: string;
  author: { firstName: string; lastName: string };
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/blog/${slug}`);
        setPost(response.data.data);
        setRelatedPosts(response.data.relatedPosts || []);
      } catch {
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold text-text-base mb-4">Post not found</h2>
        <Link to="/blog" className="text-primary font-bold hover:underline">← Back to blog</Link>
      </div>
    );
  }

  // Simple markdown-like rendering for content
  const renderContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-text-base mt-8 mb-4">{line.slice(3)}</h2>;
      if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold text-text-base mt-6 mb-3">{line.slice(4)}</h3>;
      if (line.startsWith('- **')) {
        const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
        if (match) return <li key={i} className="mb-2 text-text-muted"><strong className="text-text-base">{match[1]}</strong>{match[2] ? `: ${match[2]}` : ''}</li>;
      }
      if (line.startsWith('- ')) return <li key={i} className="mb-1 text-text-muted ml-4">{line.slice(2)}</li>;
      if (line.startsWith('|')) return null; // Skip tables in simple render
      if (line.startsWith('**Myth**') || line.startsWith('**Fact**')) {
        const isMYTH = line.startsWith('**Myth**');
        return <p key={i} className={`mb-1 ${isMYTH ? 'font-bold text-text-base' : 'text-text-muted italic mb-4'}`}>{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-text-muted leading-relaxed mb-4">{line}</p>;
    });
  };

  return (
    <div className="flex-1 bg-bg-subtle">
      {/* Cover Image */}
      <div className="w-full h-64 md:h-96 overflow-hidden relative">
        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-8 -mt-16 relative z-10">
        {/* Back */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white font-medium mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to blog
        </Link>

        {/* Article */}
        <article className="bg-bg-surface p-8 md:p-12 rounded-3xl border border-border-subtle shadow-sm mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">{post.category}</span>
            <span className="text-xs text-text-muted flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="text-xs text-text-muted flex items-center gap-1">
              <User className="w-3 h-3" />
              {post.author.firstName} {post.author.lastName}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-text-base mb-8 leading-tight">{post.title}</h1>

          <div className="prose max-w-none">
            {renderContent(post.content)}
          </div>

          {post.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-border-subtle flex flex-wrap gap-2">
              <Tag className="w-4 h-4 text-text-muted mt-0.5" />
              {post.tags.map(tag => (
                <span key={tag} className="text-xs font-medium bg-bg-subtle text-text-muted px-3 py-1 rounded-full border border-border-subtle">{tag}</span>
              ))}
            </div>
          )}
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-text-base mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp: any) => (
                <Link
                  key={rp.id}
                  to={`/blog/${rp.slug}`}
                  className="bg-bg-surface rounded-2xl border border-border-subtle overflow-hidden shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="h-36 overflow-hidden">
                    <img src={rp.coverImage} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-bold text-primary">{rp.category}</span>
                    <h3 className="text-sm font-bold text-text-base mt-1 line-clamp-2 group-hover:text-primary transition-colors">{rp.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
