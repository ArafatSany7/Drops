import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';
import api from '../../api/axios';
import Pagination from '../../components/Pagination';

export default function ContactMessages() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState<any>(null);

  const fetchMessages = async (page = 1) => {
    setLoading(true);
    try {
      const response = await api.get(`/contact?page=${page}&limit=10`);
      setMessages(response.data.data);
      setTotalPages(response.data.pagination?.totalPages || 1);
      setCurrentPage(response.data.pagination?.currentPage || 1);
    } catch { setMessages([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchMessages(1); }, []);

  const markAsRead = async (id: string) => {
    try {
      await api.put(`/contact/${id}/read`);
      fetchMessages(currentPage);
    } catch {}
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-base">Contact Messages</h1>
        <p className="text-text-muted mt-1">View messages submitted through the contact form.</p>
      </div>

      <div className="bg-bg-surface rounded-2xl border border-border-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-bg-subtle">
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Email</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Subject</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="border-b border-border-subtle animate-pulse">
                    {[...Array(6)].map((_, j) => <td key={j} className="px-6 py-4"><div className="h-4 bg-bg-subtle rounded w-3/4" /></td>)}
                  </tr>
                ))
              ) : messages.length > 0 ? (
                messages.map(m => (
                  <tr key={m.id} className={`border-b border-border-subtle hover:bg-bg-subtle transition-colors ${m.status === 'UNREAD' ? 'font-medium' : ''}`}>
                    <td className="px-6 py-4 text-text-base">{m.name}</td>
                    <td className="px-6 py-4 text-text-muted">{m.email}</td>
                    <td className="px-6 py-4 text-text-base">{m.subject}</td>
                    <td className="px-6 py-4 text-text-muted">{new Date(m.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${m.status === 'UNREAD' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500 dark:bg-gray-800'}`}>{m.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => { setSelected(m); if (m.status === 'UNREAD') markAsRead(m.id); }} className="p-1.5 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-primary transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-text-muted">No messages yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => fetchMessages(p)} />

      {/* Message Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-bg-surface rounded-3xl p-8 max-w-lg w-full border border-border-subtle shadow-2xl">
            <h3 className="text-xl font-bold text-text-base mb-1">{selected.subject}</h3>
            <p className="text-sm text-text-muted mb-6">From: {selected.name} ({selected.email})</p>
            <div className="bg-bg-subtle p-4 rounded-xl mb-6">
              <p className="text-text-base whitespace-pre-wrap">{selected.message}</p>
            </div>
            <button onClick={() => setSelected(null)} className="w-full bg-border-strong text-text-base font-bold py-3 rounded-xl hover:bg-border-subtle transition">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
