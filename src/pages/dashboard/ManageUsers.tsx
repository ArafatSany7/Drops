import { useState, useEffect } from 'react';
import { Search, Trash2, Shield } from 'lucide-react';
import api from '../../api/axios';
import Pagination from '../../components/Pagination';

export default function ManageUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '10');
      if (search.trim()) params.append('search', search.trim());
      if (roleFilter) params.append('role', roleFilter);

      const response = await api.get(`/admin/users?${params.toString()}`);
      setUsers(response.data.data);
      setTotalPages(response.data.pagination?.totalPages || 1);
      setCurrentPage(response.data.pagination?.currentPage || 1);
    } catch { setUsers([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(1); }, [roleFilter]);

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      fetchUsers(currentPage);
    } catch {}
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      await api.delete(`/admin/users/${userId}`);
      fetchUsers(currentPage);
    } catch {}
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-base">Manage Users</h1>
        <p className="text-text-muted mt-1">View and manage all registered users on the platform.</p>
      </div>

      {/* Filters */}
      <div className="bg-bg-surface p-4 rounded-2xl border border-border-subtle flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-text-muted mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && fetchUsers(1)} className="w-full bg-bg-subtle border border-border-strong rounded-xl pl-9 pr-4 py-2.5 text-sm text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        <div className="w-full md:w-40">
          <label className="block text-xs font-bold text-text-muted mb-1">Role</label>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="w-full bg-bg-subtle border border-border-strong rounded-xl px-3 py-2.5 text-sm text-text-base appearance-none">
            <option value="">All Roles</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <button onClick={() => fetchUsers(1)} className="w-full md:w-auto bg-gray-900 dark:bg-primary text-white font-medium py-2.5 px-5 rounded-xl hover:opacity-90 transition text-sm">Search</button>
      </div>

      {/* Table */}
      <div className="bg-bg-surface rounded-2xl border border-border-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-bg-subtle">
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Email</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Blood</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">District</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Role</th>
                <th className="text-right px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-border-subtle animate-pulse">
                    {[...Array(6)].map((_, j) => <td key={j} className="px-6 py-4"><div className="h-4 bg-bg-subtle rounded w-3/4" /></td>)}
                  </tr>
                ))
              ) : users.length > 0 ? (
                users.map(u => (
                  <tr key={u.id} className="border-b border-border-subtle hover:bg-bg-subtle transition-colors">
                    <td className="px-6 py-4 font-medium text-text-base">{u.firstName} {u.lastName}</td>
                    <td className="px-6 py-4 text-text-muted">{u.email}</td>
                    <td className="px-6 py-4"><span className="font-bold text-primary">{u.bloodGroup || '-'}</span></td>
                    <td className="px-6 py-4 text-text-muted">{u.district || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${u.role === 'ADMIN' ? 'bg-primary/10 text-primary' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleRoleChange(u.id, u.role === 'ADMIN' ? 'USER' : 'ADMIN')} title="Toggle role" className="p-1.5 rounded-lg hover:bg-bg-subtle text-text-muted hover:text-primary transition-colors">
                          <Shield className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(u.id)} title="Delete user" className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 text-text-muted hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-text-muted">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => fetchUsers(p)} />
    </div>
  );
}
