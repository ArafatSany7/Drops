import { Droplet, ArrowRight, Heart, Activity, Users, Shield, Clock, MapPin, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import api from '../api/axios'
import DonorCard from '../components/DonorCard'
import SkeletonCard from '../components/SkeletonCard'

export default function Home() {
  const [stats, setStats] = useState({ totalUsers: 0, livesImpacted: 0, districtsCovered: 0 })
  const [urgentDonors, setUrgentDonors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [statsRes, donorsRes] = await Promise.all([
          api.get('/stats'),
          api.get('/donors?limit=3&sortBy=createdAt&sortOrder=desc')
        ])
        setStats(statsRes.data.data)
        setUrgentDonors(donorsRes.data.data)
      } catch (error) {
        console.error("Failed to fetch home data", error)
      } finally {
        setLoading(false)
      }
    }
    fetchHomeData()
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Drops | Home</title>
      </Helmet>
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-bg-surface py-20 md:py-32">
        {/* Background elements */}
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Urgent requirement in Dhaka
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-base leading-[1.1] mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-5 duration-700">
              Your Blood Can Bring <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Smiles</span> Back to Life.
            </h1>
            <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
              Join our community of lifesavers. A single donation can save up to three lives. Register today and make a real impact in someone's life.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start animate-in fade-in slide-in-from-bottom-7 duration-700 delay-300">
              <Link to="/find-blood" className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-xl shadow-primary/25 hover:shadow-primary/40 flex items-center justify-center gap-2 group">
                <Search className="w-5 h-5" /> Find Blood
              </Link>
              <Link to="/registration" className="w-full sm:w-auto px-8 py-4 bg-bg-subtle text-text-base border-2 border-border-strong font-bold rounded-xl hover:bg-border-subtle hover:border-border-subtle transition-all flex items-center justify-center gap-2">
                Register as Donor
              </Link>
            </div>
          </div>
          
          <div className="flex-1 w-full relative max-w-lg mx-auto animate-in fade-in slide-in-from-right-8 duration-1000">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 border-4 border-white dark:border-gray-800">
              <img src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1000&auto=format&fit=crop" alt="Blood Donation" className="w-full h-auto object-cover aspect-square" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 text-white">
                <p className="font-bold">Did you know?</p>
                <p className="text-sm text-white/80">Every 2 seconds, someone needs blood.</p>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -left-8 top-12 bg-white dark:bg-bg-surface p-4 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-border-subtle flex items-center gap-3 animate-bounce-slow">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-text-muted font-bold uppercase tracking-wider">Verified</p>
                <p className="font-black text-text-base">100% Safe</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Live Stats Section */}
      <section className="py-12 bg-bg-subtle border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border-subtle">
            <div className="text-center px-4">
              <h3 className="text-4xl md:text-5xl font-black text-text-base mb-2">{loading ? '-' : stats.totalUsers.toLocaleString()}</h3>
              <p className="text-sm font-bold text-text-muted uppercase tracking-wider">Registered Donors</p>
            </div>
            <div className="text-center px-4">
              <h3 className="text-4xl md:text-5xl font-black text-text-base mb-2 text-primary">{loading ? '-' : stats.livesImpacted.toLocaleString()}</h3>
              <p className="text-sm font-bold text-text-muted uppercase tracking-wider">Lives Impacted</p>
            </div>
            <div className="text-center px-4">
              <h3 className="text-4xl md:text-5xl font-black text-text-base mb-2">{loading ? '-' : stats.districtsCovered}</h3>
              <p className="text-sm font-bold text-text-muted uppercase tracking-wider">Districts Covered</p>
            </div>
            <div className="text-center px-4">
              <h3 className="text-4xl md:text-5xl font-black text-text-base mb-2">24/7</h3>
              <p className="text-sm font-bold text-text-muted uppercase tracking-wider">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="py-24 bg-bg-surface">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-base mb-4">How Drops Works</h2>
            <p className="text-text-muted text-lg">Our streamlined process connects those in need with willing donors in just a few clicks.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-border-strong border-t border-dashed border-border-strong -z-10" />
            
            <div className="text-center relative">
              <div className="w-24 h-24 bg-bg-surface border-4 border-bg-subtle shadow-xl shadow-gray-200/50 dark:shadow-none rounded-2xl mx-auto mb-6 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <div className="absolute top-0 right-[25%] -translate-y-1/2 translate-x-1/2 w-8 h-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center font-bold">1</div>
              <h3 className="text-xl font-bold text-text-base mb-3">Register Account</h3>
              <p className="text-text-muted">Sign up quickly as a donor or receiver. Provide basic medical details to get started.</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-24 h-24 bg-bg-surface border-4 border-bg-subtle shadow-xl shadow-gray-200/50 dark:shadow-none rounded-2xl mx-auto mb-6 flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform">
                <MapPin className="w-10 h-10 text-blue-500" />
              </div>
              <div className="absolute top-0 right-[25%] -translate-y-1/2 translate-x-1/2 w-8 h-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center font-bold">2</div>
              <h3 className="text-xl font-bold text-text-base mb-3">Find or Be Found</h3>
              <p className="text-text-muted">Search for specific blood types in your area, or get notified when someone needs your blood.</p>
            </div>
            
            <div className="text-center relative">
              <div className="w-24 h-24 bg-bg-surface border-4 border-bg-subtle shadow-xl shadow-gray-200/50 dark:shadow-none rounded-2xl mx-auto mb-6 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform">
                <Heart className="w-10 h-10 text-green-500" />
              </div>
              <div className="absolute top-0 right-[25%] -translate-y-1/2 translate-x-1/2 w-8 h-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center font-bold">3</div>
              <h3 className="text-xl font-bold text-text-base mb-3">Save a Life</h3>
              <p className="text-text-muted">Connect directly, arrange the donation safely at a hospital, and save a life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Donate Section */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/40 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6">Why Your Donation Matters</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Blood cannot be manufactured – it can only come from generous donors. Your single donation can be separated into red blood cells, plasma, and platelets, potentially saving three lives.
            </p>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Health Benefits</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Regular donation helps reduce iron overload, improves cardiovascular health, and stimulates new blood cell production.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Quick Process</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">The actual donation takes only 8-10 minutes. The entire process takes less than an hour.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Safe and Secure</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">Sterile, single-use equipment is used for each donor. It's impossible to contract a disease from donating.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?q=80&w=800&auto=format&fit=crop" alt="Donation" className="rounded-2xl w-full h-48 md:h-64 object-cover" />
              <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop" alt="Lab" className="rounded-2xl w-full h-48 md:h-64 object-cover mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Recent Donors / Request Section */}
      <section className="py-24 bg-bg-subtle">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-extrabold text-text-base mb-4">Newest Donors</h2>
              <p className="text-text-muted text-lg">Meet the heroes who recently joined our platform ready to save lives.</p>
            </div>
            <Link to="/find-blood" className="shrink-0 flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
              View All Donors <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
            ) : urgentDonors.length > 0 ? (
              urgentDonors.map(donor => <DonorCard key={donor.id} donor={donor} />)
            ) : (
              <div className="col-span-full text-center py-12 text-text-muted">
                No recent donors found.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-24 bg-bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-text-base mb-4">Stories of Hope</h2>
            <p className="text-text-muted text-lg">Read how the Drops community has impacted lives across the country.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-bg-subtle p-8 rounded-3xl border border-border-subtle relative">
              <div className="text-5xl text-primary/20 absolute top-4 left-6 font-serif">"</div>
              <p className="text-text-muted italic relative z-10 mb-8 mt-4 leading-relaxed">
                When my mother needed O- blood during her surgery, we couldn't find it anywhere. Drops connected us with a donor in just 30 minutes. He saved her life.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">SA</div>
                <div>
                  <h4 className="font-bold text-text-base">Sarah Ahmed</h4>
                  <p className="text-xs text-text-muted">Family Member</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-primary text-white p-8 rounded-3xl relative shadow-xl shadow-primary/20 transform md:-translate-y-4">
              <div className="text-5xl text-white/20 absolute top-4 left-6 font-serif">"</div>
              <p className="italic relative z-10 mb-8 mt-4 leading-relaxed font-medium">
                I've been donating for 5 years, but this platform makes it so easy. The notifications ensure I only donate when someone urgently needs my exact blood type.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center font-bold">RK</div>
                <div>
                  <h4 className="font-bold">Rahul Kumar</h4>
                  <p className="text-xs text-white/80">O+ Donor, 12 Donations</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-bg-subtle p-8 rounded-3xl border border-border-subtle relative">
              <div className="text-5xl text-primary/20 absolute top-4 left-6 font-serif">"</div>
              <p className="text-text-muted italic relative z-10 mb-8 mt-4 leading-relaxed">
                As a doctor, coordinating blood for emergency cases used to be a nightmare. This platform has revolutionized how we source rare blood types.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold">DR</div>
                <div>
                  <h4 className="font-bold text-text-base">Dr. Rahman</h4>
                  <p className="text-xs text-text-muted">Emergency Surgeon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Call to Action */}
      <section className="py-24 bg-bg-subtle relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10" />
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center relative z-10">
          <Droplet className="w-16 h-16 text-primary mx-auto mb-8 animate-bounce" />
          <h2 className="text-4xl md:text-5xl font-extrabold text-text-base mb-6">Ready to be a Hero?</h2>
          <p className="text-xl text-text-muted mb-10 max-w-2xl mx-auto">
            You don't need a cape to save lives. It only takes 30 minutes to make a difference that lasts a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/registration" className="px-8 py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-all shadow-xl shadow-primary/25">
              Register Now
            </Link>
            <Link to="/about" className="px-8 py-4 bg-bg-surface text-text-base font-bold rounded-xl border border-border-strong hover:bg-bg-subtle transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
