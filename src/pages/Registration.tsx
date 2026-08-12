import { Calendar, ChevronDown, Bell, Activity, Zap, Lock, Mail, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Registration() {
  const [step, setStep] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { register } = useAuth()
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', dob: '', gender: '',
    bloodGroup: '', weight: '', lastDonation: '', medication: '',
    email: '', phone: '', city: '', address: '', password: ''
  })

  const validateStep1 = () => {
    const errs: Record<string, string> = {}
    if (!formData.firstName.trim()) errs.firstName = 'First name is required'
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required'
    if (!formData.dob) errs.dob = 'Date of birth is required'
    if (!formData.gender || formData.gender === 'Select') errs.gender = 'Please select a gender'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep2 = () => {
    const errs: Record<string, string> = {}
    if (!formData.bloodGroup || formData.bloodGroup === 'Select Blood Group') errs.bloodGroup = 'Please select a blood group'
    if (!formData.weight || parseInt(formData.weight) < 50) errs.weight = 'Weight must be at least 50kg to donate'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validateStep3 = () => {
    const errs: Record<string, string> = {}
    if (!formData.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email format'
    if (!formData.phone.trim()) errs.phone = 'Phone is required'
    if (!formData.city.trim()) errs.city = 'District/City is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const validatePassword = () => {
    const errs: Record<string, string> = {}
    if (!formData.password || formData.password.length < 6) errs.password = 'Password must be at least 6 characters'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return
    if (step === 2 && !validateStep2()) return
    if (step === 3 && !validateStep3()) return
    
    if (step < 3) setStep(step + 1)
    else setShowModal(true)
  }

  const handleRegistration = async () => {
    if (!validatePassword()) return
    setLoading(true)
    try {
      await register({
        ...formData,
        district: formData.city // backend expects district
      })
      // AuthContext handles redirect and toast on success
    } catch (error) {
      // Error is already shown by AuthContext via toast
      setShowModal(false) // Close modal on error to let them fix stuff
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-73px)] flex flex-col bg-bg-subtle selection:bg-primary/20 selection:text-primary transition-colors">
      <main className="flex-1 flex flex-col items-center py-8 px-4 sm:px-8">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Form Area */}
          <div className="flex-1 bg-bg-surface border border-border-subtle rounded-3xl p-6 sm:p-10 shadow-sm">
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

            {/* Form Fields */}
            <div className="space-y-6">
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-text-muted mb-2">First Name *</label>
                      <input type="text" value={formData.firstName} onChange={e => {setFormData({...formData, firstName: e.target.value}); if(errors.firstName) setErrors({...errors, firstName: ''})}} placeholder="Enter your first name" className={`w-full bg-bg-subtle border rounded-xl px-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.firstName ? 'border-red-400' : 'border-border-strong'}`} />
                      {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-text-muted mb-2">Last Name *</label>
                      <input type="text" value={formData.lastName} onChange={e => {setFormData({...formData, lastName: e.target.value}); if(errors.lastName) setErrors({...errors, lastName: ''})}} placeholder="Enter your last name" className={`w-full bg-bg-subtle border rounded-xl px-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.lastName ? 'border-red-400' : 'border-border-strong'}`} />
                      {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-text-muted mb-2">Date of Birth *</label>
                      <div className="relative">
                        <input type="date" value={formData.dob} onChange={e => {setFormData({...formData, dob: e.target.value}); if(errors.dob) setErrors({...errors, dob: ''})}} className={`w-full bg-bg-subtle border rounded-xl pl-4 pr-10 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.dob ? 'border-red-400' : 'border-border-strong'}`} />
                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                      </div>
                      {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-text-muted mb-2">Gender Identity *</label>
                      <div className="relative">
                        <select value={formData.gender} onChange={e => {setFormData({...formData, gender: e.target.value}); if(errors.gender) setErrors({...errors, gender: ''})}} className={`w-full bg-bg-subtle border rounded-xl pl-4 pr-10 py-3 text-text-base appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.gender ? 'border-red-400' : 'border-border-strong'}`}>
                          <option>Select</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                      </div>
                      {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-text-muted mb-2">Blood Group *</label>
                      <div className="relative">
                        <select value={formData.bloodGroup} onChange={e => {setFormData({...formData, bloodGroup: e.target.value}); if(errors.bloodGroup) setErrors({...errors, bloodGroup: ''})}} className={`w-full bg-bg-subtle border rounded-xl pl-4 pr-10 py-3 text-text-base appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.bloodGroup ? 'border-red-400' : 'border-border-strong'}`}>
                          <option>Select Blood Group</option>
                          {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg}>{bg}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                      </div>
                      {errors.bloodGroup && <p className="text-red-500 text-xs mt-1">{errors.bloodGroup}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-text-muted mb-2">Weight (kg) *</label>
                      <input type="number" value={formData.weight} onChange={e => {setFormData({...formData, weight: e.target.value}); if(errors.weight) setErrors({...errors, weight: ''})}} placeholder="e.g. 65" className={`w-full bg-bg-subtle border rounded-xl px-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.weight ? 'border-red-400' : 'border-border-strong'}`} />
                      {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-text-muted mb-2">Last Donation Date (Optional)</label>
                      <div className="relative">
                        <input type="date" value={formData.lastDonation} onChange={e => setFormData({...formData, lastDonation: e.target.value})} className="w-full bg-bg-subtle border border-border-strong rounded-xl pl-4 pr-10 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-text-muted mb-2">Any ongoing medication?</label>
                      <input type="text" value={formData.medication} onChange={e => setFormData({...formData, medication: e.target.value})} placeholder="e.g. None" className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-text-muted mb-2">Email Address *</label>
                      <div className="relative">
                        <input type="email" value={formData.email} onChange={e => {setFormData({...formData, email: e.target.value}); if(errors.email) setErrors({...errors, email: ''})}} placeholder="Enter email" className={`w-full bg-bg-subtle border rounded-xl pl-10 pr-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.email ? 'border-red-400' : 'border-border-strong'}`} />
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      </div>
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-text-muted mb-2">Phone Number *</label>
                      <input type="tel" value={formData.phone} onChange={e => {setFormData({...formData, phone: e.target.value}); if(errors.phone) setErrors({...errors, phone: ''})}} placeholder="e.g. +88017..." className={`w-full bg-bg-subtle border rounded-xl px-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.phone ? 'border-red-400' : 'border-border-strong'}`} />
                      {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-text-muted mb-2">District/City *</label>
                      <input type="text" value={formData.city} onChange={e => {setFormData({...formData, city: e.target.value}); if(errors.city) setErrors({...errors, city: ''})}} placeholder="e.g. Dhaka" className={`w-full bg-bg-subtle border rounded-xl px-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${errors.city ? 'border-red-400' : 'border-border-strong'}`} />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-bold text-text-muted mb-2">Detailed Address (Optional)</label>
                      <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Street, house no. etc" className="w-full bg-bg-subtle border border-border-strong rounded-xl px-4 py-3 text-text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-6 flex justify-between items-center mt-8">
                {step > 1 ? (
                  <button onClick={() => setStep(step - 1)} className="bg-bg-subtle border border-border-strong text-text-base font-bold py-3 px-8 rounded-xl hover:bg-border-strong transition-colors">
                    Back
                  </button>
                ) : <div />}
                <button 
                  onClick={handleNext} 
                  className="bg-primary text-white font-bold py-3 px-8 rounded-xl hover:bg-primary-hover transition shadow-md shadow-primary/20"
                >
                  {step === 3 ? "Review Details" : "Continue"}
                </button>
              </div>
            </div>

          </div>

          {/* Right Column - Info */}
          <div className="w-full lg:w-80 flex flex-col gap-6">
            <div className="bg-gray-800 rounded-3xl h-48 relative overflow-hidden shadow-sm flex items-end p-6">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop" 
                alt="Hospital Waiting Room" 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60"
              />
              <h2 className="text-2xl font-bold text-white z-20 relative">Join the Reserve</h2>
            </div>

            <div className="bg-bg-surface border border-border-subtle rounded-3xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-text-base mb-6">Why Register?</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center shrink-0">
                    <Bell className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-base text-sm mb-1">Urgent Alerts</h4>
                    <p className="text-xs text-text-muted leading-relaxed">Get notified instantly when your specific blood type is needed nearby.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center shrink-0">
                    <Activity className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-base text-sm mb-1">Track Impact</h4>
                    <p className="text-xs text-text-muted leading-relaxed">See exactly how many lives you've helped save over time.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-base text-sm mb-1">Faster Donations</h4>
                    <p className="text-xs text-text-muted leading-relaxed">Pre-filled forms and priority scheduling for registered donors.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 px-2">
              <Lock className="w-4 h-4 text-text-muted shrink-0 mt-0.5" />
              <p className="text-xs text-text-muted font-medium leading-relaxed">Your data is securely encrypted and HIPAA compliant.</p>
            </div>
          </div>

        </div>
      </main>

      {/* Completion Modal */}
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
                  <div className="font-medium text-text-base">{formData.firstName} {formData.lastName}</div>
                  <div className="text-text-muted">Blood Group</div>
                  <div className="font-medium text-text-base text-primary font-bold">{formData.bloodGroup}</div>
                  <div className="text-text-muted">Email</div>
                  <div className="font-medium text-text-base">{formData.email}</div>
                  <div className="text-text-muted">City</div>
                  <div className="font-medium text-text-base">{formData.city}</div>
                </div>
              </div>

              <div className="bg-bg-subtle p-5 rounded-2xl border border-border-strong">
                <label className="block text-sm font-bold text-text-base mb-2">Create Password *</label>
                <div className="relative">
                  <input 
                    type="password" 
                    placeholder="Enter password (min 6 characters)"
                    value={formData.password}
                    onChange={(e) => {setFormData({...formData, password: e.target.value}); if(errors.password) setErrors({...errors, password: ''})}}
                    className={`w-full bg-bg-surface border rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-base transition-all ${errors.password ? 'border-red-400' : 'border-border-strong'}`}
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
                className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors shadow-md shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                {loading ? "Registering..." : "Complete Registration"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
