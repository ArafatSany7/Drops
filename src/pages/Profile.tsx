import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Droplet, MapPin, Calendar, Clock, Edit2, Loader2, Save } from 'lucide-react';


export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    bloodGroup: user?.bloodGroup || '',
    phone: user?.phone || '',
    district: user?.district || '',
    lastDonationDate: user?.lastDonationDate ? new Date(user.lastDonationDate).toISOString().split('T')[0] : '',
    availableForDonation: user?.availableForDonation ?? true
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        bloodGroup: user.bloodGroup || '',
        phone: user.phone || '',
        district: user.district || '',
        lastDonationDate: user.lastDonationDate ? new Date(user.lastDonationDate).toISOString().split('T')[0] : '',
        availableForDonation: user.availableForDonation ?? true
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      // Error handled by AuthContext
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex-1 bg-bg-subtle py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-text-base">My Profile</h1>
            <p className="text-text-muted mt-1">Manage your donor information and availability.</p>
          </div>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-bg-surface border border-border-strong text-text-base font-bold py-2.5 px-5 rounded-xl hover:bg-bg-subtle transition shadow-sm"
            >
              <Edit2 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsEditing(false)}
                className="text-text-muted hover:text-text-base font-bold py-2.5 px-5 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="flex items-center gap-2 bg-primary text-white font-bold py-2.5 px-6 rounded-xl hover:bg-primary-hover transition shadow-md shadow-primary/20 disabled:opacity-70"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Avatar & Quick Info */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-bg-surface p-8 rounded-3xl border border-border-subtle shadow-sm text-center">
              <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center font-black text-4xl mx-auto mb-4 border-4 border-primary/20">
                {user.firstName[0]}{user.lastName ? user.lastName[0] : ''}
              </div>
              <h2 className="text-xl font-bold text-text-base">{user.firstName} {user.lastName}</h2>
              <p className="text-text-muted text-sm flex items-center justify-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                {user.district || 'Not specified'}
              </p>
              
              <div className="mt-8 pt-8 border-t border-border-subtle flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-muted">Blood Group</span>
                  <span className="font-black text-primary bg-primary/10 px-3 py-1 rounded-lg">
                    {user.bloodGroup || 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-muted">Status</span>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${formData.availableForDonation ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
                    {formData.availableForDonation ? 'Available' : 'Unavailable'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="md:col-span-2">
            <div className="bg-bg-surface p-8 rounded-3xl border border-border-subtle shadow-sm">
              <h3 className="text-lg font-bold text-text-base mb-6 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Details
              </h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-text-muted mb-1">First Name</label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      disabled={!isEditing}
                      className="block w-full px-4 py-3 bg-bg-subtle border-transparent rounded-xl focus:bg-bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-text-base disabled:opacity-60 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-muted mb-1">Last Name</label>
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      disabled={!isEditing}
                      className="block w-full px-4 py-3 bg-bg-subtle border-transparent rounded-xl focus:bg-bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-text-base disabled:opacity-60 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-muted mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-text-muted" />
                    </div>
                    <input 
                      type="email" 
                      value={user.email}
                      disabled
                      className="block w-full pl-11 pr-4 py-3 bg-bg-subtle border-transparent rounded-xl text-text-base opacity-60 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-text-muted mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    placeholder="e.g. +8801700000000"
                    className="block w-full px-4 py-3 bg-bg-subtle border-transparent rounded-xl focus:bg-bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-text-base disabled:opacity-60 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-text-muted mb-1">District</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-text-muted" />
                      </div>
                      <input 
                        type="text" 
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        disabled={!isEditing}
                        className="block w-full pl-11 pr-4 py-3 bg-bg-subtle border-transparent rounded-xl focus:bg-bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-text-base disabled:opacity-60 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-text-muted mb-1">Blood Group</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Droplet className="h-5 w-5 text-text-muted" />
                      </div>
                      <select 
                        value={formData.bloodGroup}
                        onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                        disabled={!isEditing}
                        className="block w-full pl-11 pr-4 py-3 bg-bg-subtle border-transparent rounded-xl focus:bg-bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-text-base disabled:opacity-60 transition-colors appearance-none"
                      >
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                          <option key={group} value={group}>{group}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border-subtle">
                  <h3 className="text-lg font-bold text-text-base mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Donation Status
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-text-muted mb-1">Last Donation Date</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-text-muted" />
                        </div>
                        <input 
                          type="date" 
                          value={formData.lastDonationDate}
                          onChange={(e) => setFormData({ ...formData, lastDonationDate: e.target.value })}
                          disabled={!isEditing}
                          className="block w-full pl-11 pr-4 py-3 bg-bg-subtle border-transparent rounded-xl focus:bg-bg-surface focus:border-primary focus:ring-1 focus:ring-primary text-text-base disabled:opacity-60 transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col justify-center">
                      <label className="block text-sm font-bold text-text-muted mb-3">Availability</label>
                      <label className="flex items-center cursor-pointer">
                        <div className="relative">
                          <input 
                            type="checkbox" 
                            className="sr-only" 
                            checked={formData.availableForDonation}
                            onChange={(e) => setFormData({ ...formData, availableForDonation: e.target.checked })}
                            disabled={!isEditing}
                          />
                          <div className={`block w-14 h-8 rounded-full transition-colors ${formData.availableForDonation ? 'bg-primary' : 'bg-border-strong'} ${!isEditing && 'opacity-60'}`}></div>
                          <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${formData.availableForDonation ? 'transform translate-x-6' : ''}`}></div>
                        </div>
                        <div className="ml-3 text-sm font-medium text-text-base">
                          Available for urgent requests
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
