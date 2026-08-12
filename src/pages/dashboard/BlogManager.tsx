import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Loader2 } from 'lucide-react';
import api from '../../api/axios';
import Pagination from '../../components/Pagination';
import toast from 'react-hot-toast';

export default function BlogManager() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '', excerpt: '', content: '', coverImage: '', category: '', tags: ''
  });

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    try {
      const response = await api.get(`/blog?page=${page}&limit=10`);
      setPosts(response.data.data);
      setTotalPages(response.data.pagination?.totalPages || 1);
      setCurrentPage(response.data.pagination?.currentPage || 1);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchPosts(1); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt || !formData.content || !formData.coverImage || !formData.category) {
      toast.error('Please fill all required fields');
      return;
    }
    setSubmitting(true);
    try {
      const payload = { ...formData, tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean) };
      if (editId) {
        await api.put(`/blog/${editId}`, payload);
        toast.success('Post updated!');
      } else {
        await api.post('/blog', payload);
        toast.success('Post created!');
      }
      setShowForm(false);
      setEditId(null);
      setFormData({ title: '', excerpt: '', content: '', coverImage: '', category: '', tags: '' });
      fetchPosts(currentPage);
    } catch { toast.error('Failed to save post'); }
    finally { setSubmitting(false); }
  };

  const handleEdit = (post: any) => {
    setEditId(post.id);
    setFormData({
      title: post.title, excerpt: post.excerpt, content: post.content,
      coverImage: post.coverImage, category: post.category, tags: (post.tags || []).join(', ')
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    try {
      await api.delete(`/blog/${id}`);
      toast.success('Post deleted');
      fetchPosts(currentPage);
    } catch {}
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-base">Blog Posts</h1>
          <p className="text-text-muted mt-1">Create and manage blog content.</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); setEditId(null); setFormData({ title: '', excerpt: '', content: '', coverImage: '', category: '', tags: '' }); }} className="flex items-center gap-2 bg-primary text-white font-bold py-2.5 px-5 rounded-xl hover:bg-primary-hover transition shadow-md shadow-primary/20 text-sm">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-text-base">{editId ? 'Edit Post' : 'Create New Post'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-text-muted mb-1">Title *</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-2.5 text-sm text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-text-muted mb-1">Excerpt *</label>
              <input type="text" value={formData.excerpt} onChange={(e) => setFormData({...formData, excerpt: e.target.value})} className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-2.5 text-sm text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-muted mb-1">Cover Image URL *</label>
              <input type="text" value={formData.coverImage} onChange={(e) => setFormData({...formData, coverImage: e.target.value})} className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-2.5 text-sm text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-muted mb-1">Category *</label>
              <input type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} placeholder="e.g. Health, Education" className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-2.5 text-sm text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-text-muted mb-1">Tags (comma-separated)</label>
              <input type="text" value={formData.tags} onChange={(e) => setFormData({...formData, tags: e.target.value})} placeholder="e.g. health, donation, guide" className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-2.5 text-sm text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-text-muted mb-1">Content *</label>
              <textarea rows={8} value={formData.content} onChange={(e) => setFormData({...formData, content: e.target.value})} className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-3 text-sm text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => { setShowForm(false); setEditId(null); }} className="px-5 py-2.5 text-sm font-bold text-text-muted hover:text-text-base transition">Cancel</button>
            <button type="submit" disabled={submitting} className="flex items-center gap-2 bg-primary text-white font-bold py-2.5 px-6 rounded-xl hover:bg-primary-hover transition text-sm disabled:opacity-70">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {submitting ? 'Saving...' : editId ? 'Update Post' : 'Create Post'}
            </button>
          </div>
        </form>
      )}

      <div className="bg-bg-surface rounded-2xl border border-border-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-bg-subtle">
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Title</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Category</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Published</th>
                <th className="text-right px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="border-b border-border-subtle animate-pulse">
                    {[...Array(4)].map((_, j) => <td key={j} className="px-6 py-4"><div className="h-4 bg-bg-subtle rounded w-3/4" /></td>)}
                  </tr>
                ))
              ) : posts.length > 0 ? (
                posts.map(p => (
                  <tr key={p.id} className="border-b border-border-subtle hover:bg-bg-subtle transition-colors">
                    <td className="px-6 py-4 font-medium text-text-base max-w-xs truncate">{p.title}</td>
                    <td className="px-6 py-4"><span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">{p.category}</span></td>
                    <td className="px-6 py-4 text-text-muted">{new Date(p.publishedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(p)} className="p-1.5 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-primary transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 text-text-muted hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-text-muted">No blog posts yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => fetchPosts(p)} />
    </div>
  );
}
