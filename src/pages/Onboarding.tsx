import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Droplet, MapPin, Calendar, User as UserIcon, Loader2 } from 'lucide-react';

export default function Onboarding() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    bloodGroup: user?.bloodGroup || 'A+',
    district: user?.district || '',
    phone: user?.phone || '',
    gender: user?.gender || 'Male',
    dob: user?.dob ? new Date(user.dob).toISOString().split('T')[0] : ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      navigate('/'); // Go home after onboarding
    } catch (error) {
      // Error handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-subtle py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-bg-surface p-10 rounded-3xl border border-border-subtle shadow-xl">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-primary/10 flex items-center justify-center rounded-full mb-4">
            <Droplet className="h-8 w-8 text-primary fill-current" />
          </div>
          <h2 className="text-3xl font-extrabold text-text-base">Complete your profile</h2>
          <p className="mt-2 text-sm text-text-muted">
            We need a few more details before you can start saving lives.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {/* Blood Group */}
            <div>
              <label className="block text-sm font-bold text-text-muted mb-1">Blood Group</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Droplet className="h-5 w-5 text-text-muted" />
                </div>
                <select 
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 bg-bg-subtle border-transparent rounded-xl focus:bg-bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-text-base transition-colors"
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-bold text-text-muted mb-1">Phone Number</label>
              <div className="relative">
                <input 
                  type="tel" 
                  required
                  placeholder="e.g. +8801700000000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="block w-full px-4 py-3 bg-bg-subtle border-transparent rounded-xl focus:bg-bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-text-base transition-colors"
                />
              </div>
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-bold text-text-muted mb-1">District</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-text-muted" />
                </div>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Dhaka"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 bg-bg-subtle border-transparent rounded-xl focus:bg-bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-text-base transition-colors"
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-bold text-text-muted mb-1">Gender</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-text-muted" />
                </div>
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 bg-bg-subtle border-transparent rounded-xl focus:bg-bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-text-base transition-colors"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-bold text-text-muted mb-1">Date of Birth</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-text-muted" />
                </div>
                <input 
                  type="date" 
                  required
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="block w-full pl-10 pr-3 py-3 bg-bg-subtle border-transparent rounded-xl focus:bg-bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-text-base transition-colors"
                />
              </div>
            </div>

          </div>

          <div>
            <button 
              type="submit" 
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-70 shadow-lg shadow-primary/30"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Registration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
