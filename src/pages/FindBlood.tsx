import { Search, MapPin, CheckCircle, Clock, Megaphone, Droplet } from 'lucide-react'
import { useState, useEffect } from 'react'
import api from '../api/axios'

interface Donor {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  bloodGroup: string;
  district: string;
  gender: string;
}

export default function FindBlood() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);
  const [bloodGroup, setBloodGroup] = useState('All groups');
  const [district, setDistrict] = useState('');
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      // Build query params
      const params = new URLSearchParams();
      if (bloodGroup !== 'All groups') params.append('bloodGroup', bloodGroup);
      if (district.trim()) params.append('district', district.trim());

      const response = await api.get(`/donors?${params.toString()}`);
      setDonors(response.data.data);
    } catch (error) {
      console.error("Failed to fetch donors", error);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchDonors();
  }, []);

  const handleSearch = () => {
    fetchDonors();
  };

  const handleReset = () => {
    setBloodGroup('All groups');
    setDistrict('');
    // Use a timeout to ensure state updates before fetch
    setTimeout(() => {
      api.get('/donors').then(res => setDonors(res.data.data)).catch(console.error);
    }, 0);
  };

 return (
 <div className="flex flex-col flex-1">
 
 {}
 <section className="bg-gray-900 text-white w-full max-w-7xl mx-auto rounded-[2.5rem] mt-8 p-12 flex flex-col md:flex-row justify-between gap-12 relative overflow-hidden">
 <div className="flex-1 z-10 max-w-lg">
 <p className="text-primary-100 text-xs font-bold tracking-[0.2em] uppercase mb-4 opacity-80">Find Blood</p>
 <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Locate a donor in minutes</h1>
 <p className="text-text-muted text-lg leading-relaxed mb-10">
 Search by blood group and district to instantly see available donors from our community. 
 Reach out directly when every second counts.
 </p>
 <div className="flex gap-6 text-sm text-text-muted font-medium">
 <div className="flex items-center gap-2">
 <CheckCircle className="w-4 h-4 text-primary" />
 Verified community donors
 </div>
 <div className="flex items-center gap-2">
 <Clock className="w-4 h-4 text-primary" />
 Response under 1 hour
 </div>
 </div>
 </div>

 {}
 <div className="bg-bg-surface/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 w-full max-w-sm z-10 flex flex-col justify-between">
 <div>
 <div className="flex items-center gap-4 mb-2">
 <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
 <Search className="w-5 h-5 text-primary" />
 </div>
 <div>
 <p className="text-text-muted text-xs font-medium">Live availability</p>
 <p className="text-2xl font-bold text-white">128 donors nearby</p>
 </div>
 </div>
 </div>
 
 <div className="grid grid-cols-2 gap-4 my-6">
 <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
 <p className="text-text-muted text-xs mb-1">Urgent</p>
 <p className="text-lg font-bold">18 requests</p>
 </div>
 <div className="bg-black/30 rounded-2xl p-4 border border-white/5">
 <p className="text-text-muted text-xs mb-1">Cities</p>
 <p className="text-lg font-bold">22 covered</p>
 </div>
 </div>

 <button className="w-full py-3 rounded-full border border-white/20 text-white font-medium hover:bg-bg-surface/10 transition">
 Become a donor
 </button>
 </div>
 </section>

 {}
 <section className="w-full max-w-7xl mx-auto px-8 py-12 flex flex-col lg:flex-row gap-8">
 
 {}
 <div className="flex-1 space-y-8">
 
 {}
 <div className="bg-bg-surface p-6 rounded-3xl border border-border-subtle shadow-sm flex flex-col md:flex-row gap-4 items-end">
 <div className="flex-1 w-full">
 <label className="block text-xs font-bold text-text-muted mb-2">Blood Group</label>
 <select 
 className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none font-medium"
 value={bloodGroup}
 onChange={(e) => setBloodGroup(e.target.value)}
 >
 <option>All groups</option>
 <option>A+</option>
 <option>A-</option>
 <option>B+</option>
 <option>B-</option>
 <option>O+</option>
 <option>O-</option>
 <option>AB+</option>
 <option>AB-</option>
 </select>
 </div>
 
 <div className="flex-1 w-full relative">
 <label className="block text-xs font-bold text-text-muted mb-2">District</label>
 <div className="relative">
 <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
 <input 
 type="text" 
 placeholder="e.g., Dhaka" 
 value={district}
 onChange={(e) => setDistrict(e.target.value)}
 className="w-full bg-bg-subtle border border-border-strong rounded-xl pl-10 pr-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
 />
 </div>
 </div>

 <div className="flex-1 w-full flex flex-col gap-2">
 <label className="block text-xs font-bold text-text-muted mb-0 invisible md:visible">Search Area</label>
 <button onClick={handleSearch} className="w-full bg-gray-900 text-white font-medium py-3 rounded-xl hover:bg-gray-800 transition flex items-center justify-center gap-2">
 <Search className="w-4 h-4" />
 Search donors
 </button>
 <button onClick={handleReset} className="w-full bg-bg-surface text-text-muted border border-border-strong font-medium py-3 rounded-xl hover:bg-bg-subtle transition">
 Reset
 </button>
 </div>
 </div>

 {}
 <div className="space-y-4">
 {loading ? (
 <div className="bg-bg-subtle border border-dashed border-border-strong rounded-3xl p-16 flex flex-col items-center justify-center text-center">
 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
 <p className="text-text-muted">Searching for donors...</p>
 </div>
 ) : donors.length > 0 ? (
 donors.map((donor) => (
 <div key={donor.id} className="bg-bg-surface p-6 rounded-2xl border border-border-subtle shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/30 transition">
 <div className="flex items-center gap-4">
 <div className="w-14 h-14 bg-red-50 dark:bg-red-900/30 text-primary rounded-xl flex items-center justify-center font-black text-xl border border-red-100 dark:border-red-900/50 shadow-inner">
 {donor.bloodGroup}
 </div>
 <div>
 <h4 className="text-lg font-bold text-text-base flex items-center gap-2">
 {donor.firstName} {donor.lastName}
 <CheckCircle className="w-4 h-4 text-green-500" />
 </h4>
 <div className="flex items-center gap-3 text-sm text-text-muted mt-1">
 <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {donor.district}</span>
 <span className="flex items-center gap-1"><Droplet className="w-3.5 h-3.5" /> {donor.gender}</span>
 </div>
 </div>
 </div>
 <button onClick={() => setSelectedDonor(donor)} className="w-full sm:w-auto bg-primary text-white font-bold py-2.5 px-6 rounded-xl hover:bg-primary-hover transition shadow-md shadow-primary/20">
 Contact
 </button>
 </div>
 ))
 ) : (
 <div className="bg-bg-subtle border border-dashed border-border-strong rounded-3xl p-16 flex flex-col items-center justify-center text-center">
 <h3 className="text-2xl font-bold text-text-base mb-2">No Donors Found</h3>
 <p className="text-text-muted">Try adjusting your search criteria to find available donors.</p>
 </div>
 )}
 </div>

 </div>

 {}
 <div className="w-full lg:w-96 bg-bg-surface p-6 rounded-3xl border border-border-subtle shadow-sm flex flex-col">
 <div className="flex items-center gap-2 mb-6">
 <Clock className="w-5 h-5 text-primary" />
 <h3 className="text-xl font-bold text-text-base">Urgent requests</h3>
 </div>

 <div className="space-y-4">
 
 {}
 <div className="border-l-4 border-primary p-4 rounded-r-xl border border-border-subtle hover:border-primary/60 hover:bg-bg-subtle hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer">
 <div className="flex justify-between items-start mb-2">
 <span className="text-xl font-bold text-primary">O+</span>
 <span className="bg-red-100 text-primary text-xs font-bold px-2 py-1 rounded">Need in 2 hrs</span>
 </div>
 <h4 className="font-bold text-text-base text-sm">Square Hospital</h4>
 <p className="text-text-muted text-xs">Dhaka</p>
 </div>

 {}
 <div className="border-l-4 border-primary p-4 rounded-r-xl border border-border-subtle hover:border-primary/60 hover:bg-bg-subtle hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer">
 <div className="flex justify-between items-start mb-2">
 <span className="text-xl font-bold text-primary">B+</span>
 <span className="bg-red-100 text-primary text-xs font-bold px-2 py-1 rounded">Need today</span>
 </div>
 <h4 className="font-bold text-text-base text-sm">Evercare</h4>
 <p className="text-text-muted text-xs">Chittagong</p>
 </div>

 {}
 <div className="border-l-4 border-primary p-4 rounded-r-xl border border-border-subtle hover:border-primary/60 hover:bg-bg-subtle hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer">
 <div className="flex justify-between items-start mb-2">
 <span className="text-xl font-bold text-primary">A-</span>
 <span className="bg-red-100 text-primary text-xs font-bold px-2 py-1 rounded">Need ASAP</span>
 </div>
 <h4 className="font-bold text-text-base text-sm">Apollo Hospital</h4>
 <p className="text-text-muted text-xs">Sylhet</p>
 </div>

 </div>
 
 <button className="mt-6 w-full py-3 bg-red-50 dark:bg-red-500/10 text-primary font-bold rounded-xl border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2 shadow-sm">
 <Megaphone className="w-5 h-5" />
 Post Urgent Request
 </button>
 </div>

 </section>

      {}
      {selectedDonor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-bg-surface rounded-3xl p-8 max-w-md w-full border border-border-subtle shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setSelectedDonor(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-bg-subtle text-text-muted hover:text-text-base hover:bg-border-subtle transition"
            >
              ×
            </button>
            <h3 className="text-2xl font-extrabold text-text-base mb-2">Contact Donor</h3>
            <p className="text-text-muted mb-6">Reach out directly to request a blood donation.</p>
            
            <div className="space-y-4">
              <div className="bg-bg-subtle p-4 rounded-xl border border-border-subtle">
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Donor Name</p>
                <p className="font-bold text-lg text-text-base">{selectedDonor.firstName} {selectedDonor.lastName}</p>
              </div>
              
              <div className="bg-bg-subtle p-4 rounded-xl border border-border-subtle">
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Phone Number</p>
                <a href={`tel:${selectedDonor.phone}`} className="font-bold text-lg text-primary hover:underline block break-all">
                  {selectedDonor.phone || 'Phone not provided'}
                </a>
              </div>
              
              <div className="bg-bg-subtle p-4 rounded-xl border border-border-subtle">
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-1">Email Address</p>
                <a href={`mailto:${selectedDonor.email}`} className="font-bold text-lg text-primary hover:underline block break-all">
                  {selectedDonor.email || 'Email not provided'}
                </a>
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedDonor(null)}
              className="w-full mt-8 bg-border-strong text-text-base font-bold py-3 rounded-xl hover:bg-border-subtle transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

 </div>
 )
}
