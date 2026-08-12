import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function DashboardProfile() {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    district: user?.district || '',
    bloodGroup: user?.bloodGroup || '',
    gender: user?.gender || '',
    availableForDonation: user?.availableForDonation ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try { await updateProfile(formData); }
    catch {} finally { setLoading(false); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-base">My Profile</h1>
        <p className="text-text-muted mt-1">Update your personal information.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-bg-surface p-8 rounded-2xl border border-border-subtle shadow-sm space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-text-muted mb-1">First Name</label>
            <input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-sm font-bold text-text-muted mb-1">Last Name</label>
            <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-sm font-bold text-text-muted mb-1">Phone</label>
            <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-sm font-bold text-text-muted mb-1">District</label>
            <input type="text" value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})} className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="block text-sm font-bold text-text-muted mb-1">Blood Group</label>
            <select value={formData.bloodGroup} onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})} className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-3 text-text-base appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="">Select</option>
              {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-text-muted mb-1">Gender</label>
            <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-3 text-text-base appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-bg-subtle rounded-xl">
          <input type="checkbox" id="available" checked={formData.availableForDonation} onChange={(e) => setFormData({...formData, availableForDonation: e.target.checked})} className="w-4 h-4 text-primary rounded accent-primary" />
          <label htmlFor="available" className="text-sm text-text-base font-medium">Available for blood donation</label>
        </div>

        <button type="submit" disabled={loading} className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary-hover transition shadow-md shadow-primary/20 flex items-center gap-2 disabled:opacity-70">
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
