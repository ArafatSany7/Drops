import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import api from '../../api/axios';
import Pagination from '../../components/Pagination';

export default function ManageDonors() {
  const [donors, setDonors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchDonors = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      params.append('limit', '10');
      if (search.trim()) params.append('search', search.trim());
      if (bloodGroup) params.append('bloodGroup', bloodGroup);

      const response = await api.get(`/donors?${params.toString()}`);
      setDonors(response.data.data);
      setTotalPages(response.data.pagination?.totalPages || 1);
      setCurrentPage(response.data.pagination?.currentPage || 1);
    } catch { setDonors([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDonors(1); }, [bloodGroup]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-base">Manage Donors</h1>
        <p className="text-text-muted mt-1">View all registered blood donors.</p>
      </div>

      <div className="bg-bg-surface p-4 rounded-2xl border border-border-subtle flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label className="block text-xs font-bold text-text-muted mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input type="text" placeholder="Search by name..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && fetchDonors(1)} className="w-full bg-bg-subtle border border-border-strong rounded-xl pl-9 pr-4 py-2.5 text-sm text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>
        <div className="w-full md:w-40">
          <label className="block text-xs font-bold text-text-muted mb-1">Blood Group</label>
          <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="w-full bg-bg-subtle border border-border-strong rounded-xl px-3 py-2.5 text-sm text-text-base appearance-none">
            <option value="">All</option>
            {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(g => <option key={g}>{g}</option>)}
          </select>
        </div>
        <button onClick={() => fetchDonors(1)} className="w-full md:w-auto bg-gray-900 dark:bg-primary text-white font-medium py-2.5 px-5 rounded-xl hover:opacity-90 transition text-sm">Search</button>
      </div>

      <div className="bg-bg-surface rounded-2xl border border-border-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-bg-subtle">
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Name</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Blood Group</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">District</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Gender</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Phone</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-border-subtle animate-pulse">
                    {[...Array(6)].map((_, j) => <td key={j} className="px-6 py-4"><div className="h-4 bg-bg-subtle rounded w-3/4" /></td>)}
                  </tr>
                ))
              ) : donors.length > 0 ? (
                donors.map(d => (
                  <tr key={d.id} className="border-b border-border-subtle hover:bg-bg-subtle transition-colors">
                    <td className="px-6 py-4 font-medium text-text-base">{d.firstName} {d.lastName}</td>
                    <td className="px-6 py-4"><span className="font-bold text-primary">{d.bloodGroup}</span></td>
                    <td className="px-6 py-4 text-text-muted">{d.district || '-'}</td>
                    <td className="px-6 py-4 text-text-muted">{d.gender || '-'}</td>
                    <td className="px-6 py-4 text-text-muted">{d.phone || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${d.availableForDonation ? 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400'}`}>
                        {d.availableForDonation ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-text-muted">No donors found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => fetchDonors(p)} />
    </div>
  );
}
