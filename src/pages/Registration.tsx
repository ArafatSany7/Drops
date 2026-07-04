import { Calendar, ChevronDown, Bell, Activity, Zap, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'


export default function Registration() {
 const [step, setStep] = useState(1)
 const [showModal, setShowModal] = useState(false)
 const [loading, setLoading] = useState(false)
 const { register } = useAuth()
 const [formData, setFormData] = useState({
   firstName: '', lastName: '', dob: '', gender: '',
   bloodGroup: '', weight: '', lastDonation: '', medication: '',
   email: '', phone: '', city: '', address: '', password: ''
 })

 const handleRegistration = async () => {
   setLoading(true)
   try {
     await register({
       ...formData,
       district: formData.city // backend expects district
     })
     // AuthContext handles redirect and toast on success
   } catch (error) {
     // Error is already shown by AuthContext
   } finally {
     setLoading(false)
   }
 }

 return (
 <div className="min-h-screen flex flex-col bg-bg-subtle font-sans selection:bg-primary/20 selection:text-primary dark:selection:bg-primary/40 dark:selection:text-primary-100 transition-colors">
 
 {/* Main Content */}
 <main className="flex-1 flex flex-col items-center py-8 px-8">
 <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
 
 {/* Left Column - Form Area */}
 <div className="flex-1 bg-bg-surface border border-border-subtle rounded-2xl p-10 shadow-sm ">
 
 <div className="text-center mb-10">
 <h1 className="text-3xl font-bold text-text-base mb-2">Register as a Donor</h1>
 <p className="text-text-muted">Your commitment today could save a life tomorrow.</p>
 </div>

 {/* Steps Indicator */}
  <div className="flex items-center justify-between max-w-md mx-auto mb-12 relative">
  <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border-subtle -translate-y-1/2 -z-10" />
  
  {[
    { num: 1, label: 'Personal' },
    { num: 2, label: 'Medical' },
    { num: 3, label: 'Contact' }
  ].map((s) => (
    <div key={s.num} className="flex flex-col items-center gap-2 bg-bg-surface px-4 transition-all duration-300">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${
      step >= s.num ? 'bg-primary text-white shadow-md shadow-primary/20' : 'border-2 border-border-strong text-text-muted'
    }`}>
    {s.num}
    </div>
    <span className={`text-xs font-bold transition-colors duration-300 ${step >= s.num ? 'text-primary' : 'text-text-muted'}`}>{s.label}</span>
    </div>
  ))}
  </div>

  {}
  <div className="space-y-6">
  {step === 1 && (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1">
      <label className="block text-xs font-bold text-text-muted dark:text-text-muted mb-2">First Name</label>
      <input type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} placeholder="Enter your first name" className="w-full bg-transparent border border-border-strong rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-base " />
      </div>
      <div className="flex-1">
      <label className="block text-xs font-bold text-text-muted dark:text-text-muted mb-2">Last Name</label>
      <input type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} placeholder="Enter your last name" className="w-full bg-transparent border border-border-strong rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-base " />
      </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 relative">
      <label className="block text-xs font-bold text-text-muted dark:text-text-muted mb-2">Date of Birth</label>
      <div className="relative">
      <input type="text" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} placeholder="mm/dd/yyyy" className="w-full bg-transparent border border-border-strong rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-base " />
      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
      </div>
      </div>
      <div className="flex-1 relative">
      <label className="block text-xs font-bold text-text-muted dark:text-text-muted mb-2">Gender Identity</label>
      <div className="relative">
      <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full bg-transparent border border-border-strong rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-base appearance-none bg-bg-surface">
      <option>Select</option>
      <option>Male</option>
      <option>Female</option>
      <option>Other</option>
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
      </div>
      </div>
      </div>
    </div>
  )}

  {step === 2 && (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 relative">
      <label className="block text-xs font-bold text-text-muted dark:text-text-muted mb-2">Blood Group</label>
      <div className="relative">
      <select value={formData.bloodGroup} onChange={e => setFormData({...formData, bloodGroup: e.target.value})} className="w-full bg-transparent border border-border-strong rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-base appearance-none bg-bg-surface">
      <option>Select Blood Group</option>
      <option>A+</option>
      <option>A-</option>
      <option>B+</option>
      <option>B-</option>
      <option>O+</option>
      <option>O-</option>
      <option>AB+</option>
      <option>AB-</option>
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
      </div>
      </div>
      <div className="flex-1">
      <label className="block text-xs font-bold text-text-muted dark:text-text-muted mb-2">Weight (kg)</label>
      <input type="number" value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} placeholder="e.g. 65" className="w-full bg-transparent border border-border-strong rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-base " />
      </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 relative">
      <label className="block text-xs font-bold text-text-muted dark:text-text-muted mb-2">Last Donation Date (Optional)</label>
      <div className="relative">
      <input type="text" value={formData.lastDonation} onChange={e => setFormData({...formData, lastDonation: e.target.value})} placeholder="mm/dd/yyyy" className="w-full bg-transparent border border-border-strong rounded-lg pl-4 pr-10 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-base " />
      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
      </div>
      </div>
      <div className="flex-1">
      <label className="block text-xs font-bold text-text-muted dark:text-text-muted mb-2">Any ongoing medication?</label>
      <input type="text" value={formData.medication} onChange={e => setFormData({...formData, medication: e.target.value})} placeholder="e.g. None" className="w-full bg-transparent border border-border-strong rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-base " />
      </div>
      </div>
    </div>
  )}

  {step === 3 && (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 relative">
      <label className="block text-xs font-bold text-text-muted dark:text-text-muted mb-2">Email Address</label>
      <div className="relative">
      <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="Enter email" className="w-full bg-transparent border border-border-strong rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-base " />
      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
      </div>
      </div>
      <div className="flex-1">
      <label className="block text-xs font-bold text-text-muted dark:text-text-muted mb-2">Phone Number</label>
      <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Enter phone number" className="w-full bg-transparent border border-border-strong rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-base " />
      </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1">
      <label className="block text-xs font-bold text-text-muted dark:text-text-muted mb-2">City/District</label>
      <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} placeholder="e.g. Dhaka" className="w-full bg-transparent border border-border-strong rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-base " />
      </div>
      <div className="flex-1">
      <label className="block text-xs font-bold text-text-muted dark:text-text-muted mb-2">Detailed Address</label>
      <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Street, house no. etc" className="w-full bg-transparent border border-border-strong rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-base " />
      </div>
      </div>
    </div>
  )}

  <div className="pt-6 flex justify-between items-center mt-8">
  {step > 1 ? (
    <button onClick={() => setStep(step - 1)} className="bg-bg-subtle border border-border-strong text-text-base font-bold py-3 px-8 rounded-lg hover:bg-border-strong transition-colors">
      Back
    </button>
  ) : <div />}
  <button 
    onClick={() => {
      if (step < 3) setStep(step + 1);
      else {
        setShowModal(true);
      }
    }} 
    className="bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-primary-hover transition shadow-md shadow-primary/20"
  >
    {step === 3 ? "Submit" : "Continue"}
  </button>
  </div>
  </div>

 </div>

 {}
 <div className="w-full lg:w-80 flex flex-col gap-6">
 
 <div className="bg-gray-800 rounded-2xl h-48 relative overflow-hidden shadow-sm flex items-end p-6">
 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
 <img 
 src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop" 
 alt="Hospital Waiting Room" 
 className="absolute inset-0 w-full h-full object-cover grayscale mix-blend-overlay opacity-80"
 />
 <h2 className="text-2xl font-bold text-white z-20 relative">Join the Reserve</h2>
 </div>

 <div className="bg-bg-subtle border border-border-strong rounded-2xl p-6 shadow-sm ">
 <h3 className="text-xl font-bold text-text-base mb-6">Why Register?</h3>
 
 <div className="space-y-6">
 <div className="flex gap-4">
 <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center shrink-0">
 <Bell className="w-4 h-4 text-primary" />
 </div>
 <div>
 <h4 className="font-bold text-text-base text-sm mb-1">Urgent Need Alerts</h4>
 <p className="text-xs text-text-muted dark:text-text-muted leading-relaxed">
 Get notified instantly when your specific blood type is needed nearby.
 </p>
 </div>
 </div>

 <div className="flex gap-4">
 <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center shrink-0">
 <Activity className="w-4 h-4 text-primary" />
 </div>
 <div>
 <h4 className="font-bold text-text-base text-sm mb-1">Track Your Impact</h4>
 <p className="text-xs text-text-muted dark:text-text-muted leading-relaxed">
 See exactly how many lives you've helped save over time.
 </p>
 </div>
 </div>

 <div className="flex gap-4">
 <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center shrink-0">
 <Zap className="w-4 h-4 text-primary" />
 </div>
 <div>
 <h4 className="font-bold text-text-base text-sm mb-1">Faster Donations</h4>
 <p className="text-xs text-text-muted dark:text-text-muted leading-relaxed">
 Pre-filled forms and priority scheduling for registered donors.
 </p>
 </div>
 </div>
 </div>
 </div>

 <div className="flex items-start gap-3 px-2">
 <Lock className="w-4 h-4 text-text-muted shrink-0 mt-0.5" />
 <p className="text-xs text-text-muted font-medium leading-relaxed">
 Your data is securely encrypted and HIPAA compliant.
 </p>
 </div>

 </div>

 </div>
 </main>

 {}
 <footer className="bg-bg-surface border-t border-border-strong py-6 text-center">
 <p className="text-sm text-text-muted">
 &copy; 2024 Drops. Every drop matters.
 </p>
 </footer>

 {}
  {showModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-bg-surface w-full max-w-lg rounded-3xl border border-border-subtle shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-border-subtle bg-bg-subtle">
          <h2 className="text-2xl font-bold text-text-base">Complete Registration</h2>
          <p className="text-sm text-text-muted mt-1">Review your details and set a password.</p>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          <div>
            <h3 className="font-bold text-text-base mb-3 border-b border-border-subtle pb-2">Summary</h3>
            <div className="grid grid-cols-2 gap-y-3 text-sm">
              <div className="text-text-muted">Name</div>
              <div className="font-medium text-text-base">{formData.firstName || 'Not provided'} {formData.lastName}</div>
              <div className="text-text-muted">Blood Group</div>
              <div className="font-medium text-text-base text-primary font-bold">{formData.bloodGroup && formData.bloodGroup !== 'Select Blood Group' ? formData.bloodGroup : 'Not specified'}</div>
              <div className="text-text-muted">Email</div>
              <div className="font-medium text-text-base">{formData.email || 'Not provided'}</div>
              <div className="text-text-muted">City</div>
              <div className="font-medium text-text-base">{formData.city || 'Not provided'}</div>
            </div>
          </div>

          <div className="bg-bg-subtle p-5 rounded-xl border border-border-strong">
            <label className="block text-sm font-bold text-text-base mb-2">Create Password</label>
            <div className="relative">
              <input 
                type="password" 
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-bg-surface border border-border-strong rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-text-base"
              />
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            </div>
            <p className="text-xs text-text-muted mt-3 flex items-start gap-2">
              <Lock className="w-3 h-3 shrink-0 mt-0.5" />
              This email and password can be used later to log in to your account.
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-border-subtle bg-bg-surface flex gap-3">
          <button 
            onClick={() => setShowModal(false)}
            className="flex-1 py-3 font-bold text-text-muted hover:text-text-base hover:bg-bg-subtle rounded-xl transition-colors"
          >
            Go Back
          </button>
          <button 
            onClick={handleRegistration}
            disabled={loading}
            className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors shadow-md shadow-primary/20 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Complete Registration"}
          </button>
        </div>
      </div>
    </div>
  )}

 </div>
 )
}
