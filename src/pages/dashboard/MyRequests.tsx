import { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import api from '../../api/axios';
import toast from 'react-hot-toast';

export default function MyRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '', bloodGroupNeeded: 'A+', hospitalName: '', district: '', urgencyLevel: 'HIGH'
  });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await api.get('/requests/urgent');
        setRequests(response.data.data || []);
      } catch {} finally { setLoading(false); }
    };
    fetchRequests();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.hospitalName || !formData.district) {
      toast.error('Please fill all required fields');
      return;
    }
    setSubmitting(true);
    try {
      await api.post('/requests', formData);
      toast.success('Blood request created successfully!');
      setShowForm(false);
      setFormData({ patientName: '', bloodGroupNeeded: 'A+', hospitalName: '', district: '', urgencyLevel: 'HIGH' });
      // Refresh
      const response = await api.get('/requests/urgent');
      setRequests(response.data.data || []);
    } catch { toast.error('Failed to create request'); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-base">Blood Requests</h1>
          <p className="text-text-muted mt-1">View and create blood donation requests.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 bg-primary text-white font-bold py-2.5 px-5 rounded-xl hover:bg-primary-hover transition shadow-md shadow-primary/20 text-sm">
          <Plus className="w-4 h-4" /> New Request
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-text-base">Create Blood Request</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-text-muted mb-1">Patient Name *</label>
              <input type="text" value={formData.patientName} onChange={(e) => setFormData({...formData, patientName: e.target.value})} placeholder="Enter patient name" className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-2.5 text-sm text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-muted mb-1">Blood Group Needed *</label>
              <select value={formData.bloodGroupNeeded} onChange={(e) => setFormData({...formData, bloodGroupNeeded: e.target.value})} className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-2.5 text-sm text-text-base appearance-none">
                {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(g => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-text-muted mb-1">Hospital Name *</label>
              <input type="text" value={formData.hospitalName} onChange={(e) => setFormData({...formData, hospitalName: e.target.value})} placeholder="e.g. Square Hospital" className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-2.5 text-sm text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-muted mb-1">District *</label>
              <input type="text" value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} placeholder="e.g. Dhaka" className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-2.5 text-sm text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="block text-xs font-bold text-text-muted mb-1">Urgency Level</label>
              <select value={formData.urgencyLevel} onChange={(e) => setFormData({...formData, urgencyLevel: e.target.value})} className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-2.5 text-sm text-text-base appearance-none">
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 text-sm font-bold text-text-muted hover:text-text-base transition">Cancel</button>
            <button type="submit" disabled={submitting} className="flex items-center gap-2 bg-primary text-white font-bold py-2.5 px-6 rounded-xl hover:bg-primary-hover transition text-sm disabled:opacity-70">
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {submitting ? 'Creating...' : 'Create Request'}
            </button>
          </div>
        </form>
      )}

      {/* Requests List */}
      <div className="bg-bg-surface rounded-2xl border border-border-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-subtle bg-bg-subtle">
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Patient</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Blood Group</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Hospital</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">District</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Urgency</th>
                <th className="text-left px-6 py-3 text-xs font-bold text-text-muted uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(3)].map((_, i) => (
                  <tr key={i} className="border-b border-border-subtle animate-pulse">
                    {[...Array(6)].map((_, j) => <td key={j} className="px-6 py-4"><div className="h-4 bg-bg-subtle rounded w-3/4" /></td>)}
                  </tr>
                ))
              ) : requests.length > 0 ? (
                requests.map(r => (
                  <tr key={r.id} className="border-b border-border-subtle hover:bg-bg-subtle transition-colors">
                    <td className="px-6 py-4 font-medium text-text-base">{r.patientName}</td>
                    <td className="px-6 py-4"><span className="font-bold text-primary">{r.bloodGroupNeeded}</span></td>
                    <td className="px-6 py-4 text-text-muted">{r.hospitalName}</td>
                    <td className="px-6 py-4 text-text-muted">{r.district}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        r.urgencyLevel === 'CRITICAL' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        r.urgencyLevel === 'HIGH' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>{r.urgencyLevel}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${r.status === 'ACTIVE' ? 'bg-green-50 text-green-600 dark:bg-green-900/20' : 'bg-gray-100 text-gray-600 dark:bg-gray-800'}`}>{r.status}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-text-muted">No requests found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
