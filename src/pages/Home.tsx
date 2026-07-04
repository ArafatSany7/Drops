import { Heart, Users, Activity, Search, ShieldCheck, Megaphone, Info } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const helpCards = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Locate donors based on blood group, proximity, and availability in real-time.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Profiles",
    description: "All donors and requests are authenticated to ensure safety and reliability.",
  },
  {
    icon: Megaphone,
    title: "Emergency Board",
    description: "Instant alerts and direct communication channels for urgent blood requirements.",
  }
];

export default function Home() {
  const [hoveredHelpIndex, setHoveredHelpIndex] = useState<number | null>(null);

 return (
 <div className="flex flex-col items-center">
 
 {}
 <section className="w-full bg-red-50 dark:bg-red-950/20 py-20 px-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 border-b border-red-100 dark:border-red-900/30 transition-colors">
 <div className="flex-1 space-y-6">
 <h1 className="text-5xl md:text-6xl font-extrabold text-text-base mb-6 leading-tight tracking-tight">
 Donate Blood, <br/>
 <span className="text-primary dark:text-red-500 relative inline-block">
 Save Lives
 <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary-200 dark:text-primary-900/50" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg>
 </span>
 </h1>
 <p className="text-lg text-text-muted mb-8 max-w-lg leading-relaxed">
 Join the smart blood donation network. Find donors instantly, track your impact, and become a hero in your community.
 </p>
 <div className="flex gap-4 pt-2">
 <Link to="/registration" className="flex items-center justify-center gap-2 bg-bg-surface text-text-base font-bold py-4 px-8 rounded-full hover:bg-bg-subtle transition shadow-lg shadow-gray-200/50 dark:shadow-none border border-border-subtle ">
 Become a Donor
 </Link>
 <Link to="/find-blood" className="flex items-center justify-center bg-bg-surface text-text-base border border-border-strong px-8 py-3 rounded-full font-medium hover:bg-bg-subtle transition shadow-sm">
 Find Blood
 </Link>
 </div>
 </div>

 {}
 <div className="relative p-8 rounded-[2.5rem] shadow-2xl shadow-primary/20 w-full max-w-md overflow-hidden flex flex-col justify-end min-h-[380px] group border border-border-subtle bg-gray-900">
 <img 
 src="https://images.unsplash.com/photo-1536856136534-bb679c52a9aa?q=80&w=800&auto=format&fit=crop" 
 alt="Blood Cells" 
 className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-40 mix-blend-overlay"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/20" />
 
 <div className="relative z-10 w-full h-full flex flex-col justify-between">
 <div className="mb-6">
 <span className="inline-flex items-center gap-2 text-xs font-bold bg-bg-surface/20 text-white px-3 py-1.5 rounded-full border border-white/30 backdrop-blur-md mb-4">
 <Info className="w-3 h-3" />
 Did you know?
 </span>
 <h3 className="text-3xl font-extrabold text-white leading-tight">
 One donation can save up to <span className="text-primary-100">3 lives.</span>
 </h3>
 </div>
 
 <div className="p-5 bg-bg-surface/10 backdrop-blur-md rounded-2xl border border-white/20 hover:bg-bg-surface/20 transition-all">
 <div className="flex items-start gap-4">
 <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1 border border-primary/30">
 <Activity className="text-primary-100 w-5 h-5" />
 </div>
 <div>
 <h4 className="text-white font-bold text-sm mb-1.5">Constant Need</h4>
 <p className="text-gray-300 text-xs leading-relaxed">
 Blood cannot be manufactured. Every 2 seconds, someone relies entirely on generous volunteer donors for survival.
 </p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {}
 <section className="w-full max-w-7xl mx-auto px-8 py-12 -mt-10 relative z-20">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 <Link to="/find-blood" className="block bg-bg-surface p-8 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-border-subtle hover:-translate-y-1 transition-transform cursor-pointer group">
 <div className="w-14 h-14 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
 <Search className="text-primary group-hover:text-white w-7 h-7" />
 </div>
 <h3 className="text-xl font-bold mb-3 text-text-base">Find Blood Now</h3>
 <p className="text-text-muted text-sm leading-relaxed">Search our real-time database of verified donors near your location.</p>
 </Link>
 
 <div className="bg-bg-surface p-8 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-border-subtle hover:-translate-y-1 transition-transform cursor-pointer group">
 <div className="w-14 h-14 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
 <Megaphone className="text-primary group-hover:text-white w-7 h-7" />
 </div>
 <h3 className="text-xl font-bold mb-3 text-text-base">Post a Request</h3>
 <p className="text-text-muted text-sm leading-relaxed">Create an urgent request and instantly notify matching donors nearby.</p>
 </div>

 <div className="bg-bg-surface p-8 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-border-subtle hover:-translate-y-1 transition-transform cursor-pointer group">
 <div className="w-14 h-14 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
 <ShieldCheck className="text-primary group-hover:text-white w-7 h-7" />
 </div>
 <h3 className="text-xl font-bold mb-3 text-text-base">Verified Donors</h3>
 <p className="text-text-muted text-sm leading-relaxed">Every donor is screened to ensure safety and reliability for patients.</p>
 </div>
 </div>
 </section>

 {}
 <section className="w-full bg-bg-subtle py-20 px-8">
 <div className="max-w-7xl mx-auto flex flex-col items-center">
 <div className="text-center mb-16">
 <h2 className="text-3xl font-bold text-text-base mb-4">Why use Drops?</h2>
 <p className="text-text-muted max-w-2xl">
 We eliminate the chaos of finding blood during emergencies. Our intelligent matching algorithm connects you with the right donors in minutes.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
 <div className="flex flex-col items-center text-center p-6">
 <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-primary rounded-full flex items-center justify-center mb-4">
 <Users className="w-8 h-8" />
 </div>
 <h4 className="text-4xl font-black text-text-base mb-2">24k+</h4>
 <p className="text-text-muted font-medium">Active Donors</p>
 </div>
 <div className="flex flex-col items-center text-center p-6">
 <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-primary rounded-full flex items-center justify-center mb-4">
 <Heart className="w-8 h-8" />
 </div>
 <h4 className="text-4xl font-black text-text-base mb-2">12k+</h4>
 <p className="text-text-muted font-medium">Lives Saved</p>
 </div>
 <div className="flex flex-col items-center text-center p-6">
 <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-primary rounded-full flex items-center justify-center mb-4">
 <Activity className="w-8 h-8" />
 </div>
 <h4 className="text-4xl font-black text-text-base mb-2">5 min</h4>
 <p className="text-text-muted font-medium">Avg. Match Time</p>
 </div>
 <div className="flex flex-col items-center text-center p-6">
 <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 text-primary rounded-full flex items-center justify-center mb-4">
 <ShieldCheck className="w-8 h-8" />
 </div>
 <h4 className="text-4xl font-black text-text-base mb-2">100%</h4>
 <p className="text-text-muted font-medium">Verified Users</p>
 </div>
 </div>
 </div>
 </section>

 {}
 <section className="w-full max-w-7xl mx-auto px-8 py-20">
 <div className="flex justify-between items-end mb-10">
 <div>
 <h2 className="text-3xl font-bold mb-3 text-text-base">How We Help</h2>
 <p className="text-text-muted text-sm max-w-sm leading-relaxed">
 Streamlined processes to connect those in need with those who can give.
 </p>
 </div>
 <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
 Learn More <span>&rarr;</span>
 </button>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-6" onMouseLeave={() => setHoveredHelpIndex(null)}>
  {helpCards.map((card, index) => {
    const isActive = hoveredHelpIndex !== null ? hoveredHelpIndex === index : index === 1;
    const Icon = card.icon;
    return (
      <div 
        key={index}
        onMouseEnter={() => setHoveredHelpIndex(index)}
        className={`bg-bg-surface p-8 rounded-3xl shadow-sm transition-all duration-300 cursor-pointer ${
          isActive ? 'border-2 border-primary shadow-md' : 'border border-border-subtle hover:shadow-md'
        }`}
      >
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 ${
          isActive ? 'bg-primary shadow-md shadow-primary/30' : 'bg-red-50 dark:bg-red-500/10'
        }`}>
          <Icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-white' : 'text-primary'}`} />
        </div>
        <h3 className="text-lg font-bold mb-2 text-text-base">{card.title}</h3>
        <p className="text-sm text-text-muted leading-relaxed">
          {card.description}
        </p>
      </div>
    );
  })}
  </div>
 </section>
 
 {}
 <section className="w-full max-w-7xl mx-auto px-8 pb-20 pt-20">
 <h2 className="text-3xl font-bold mb-8 text-text-base">Team & volunteers</h2>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {['Armaan Rahim', 'Sumaiya Noor', 'Tasnim Hosain'].map((name, i) => (
 <div key={i} className="bg-bg-surface p-6 rounded-3xl border border-border-subtle shadow-sm ">
 <span className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 block">
 {i === 0 ? 'Coordinator' : i === 1 ? 'Medical Advisor' : 'Community Lead'}
 </span>
 <h4 className="text-lg font-bold text-text-base mb-2">{name}</h4>
 <p className="text-xs text-text-muted">
 {i === 0 ? 'Connects donors with urgent cases and...' : i === 1 ? 'Ensures donation guidelines are followed...' : 'Onboards volunteers and runs awareness...'}
 </p>
 </div>
 ))}
 </div>
 </section>

 {}
 <section className="w-full bg-bg-surface py-12 border-t border-border-subtle overflow-hidden flex flex-col items-center">
 <p className="text-xs font-bold text-text-muted uppercase tracking-[0.2em] mb-8">Trusted by our partners</p>
 <div className="w-full overflow-hidden flex group">
 <div className="flex w-max animate-scroll group-hover:[animation-play-state:paused]">
 {[...Array(2)].map((_, i) => (
 <div key={i} className="flex items-center gap-20 pr-20">
 <span className="text-2xl font-bold text-gray-300 dark:text-text-base hover:text-text-base hover:text-text-base transition-colors whitespace-nowrap cursor-pointer">Square Hospital</span>
 <span className="text-2xl font-bold text-gray-300 dark:text-text-base hover:text-text-base hover:text-text-base transition-colors whitespace-nowrap cursor-pointer">Evercare Hospital</span>
 <span className="text-2xl font-bold text-gray-300 dark:text-text-base hover:text-text-base hover:text-text-base transition-colors whitespace-nowrap cursor-pointer">United Hospital</span>
 <span className="text-2xl font-bold text-gray-300 dark:text-text-base hover:text-text-base hover:text-text-base transition-colors whitespace-nowrap cursor-pointer">Labaid</span>
 <span className="text-2xl font-bold text-gray-300 dark:text-text-base hover:text-text-base hover:text-text-base transition-colors whitespace-nowrap cursor-pointer">BIRDEM General Hospital</span>
 <span className="text-2xl font-bold text-gray-300 dark:text-text-base hover:text-text-base hover:text-text-base transition-colors whitespace-nowrap cursor-pointer">Popular Diagnostic Centre</span>
 <span className="text-2xl font-bold text-gray-300 dark:text-text-base hover:text-text-base hover:text-text-base transition-colors whitespace-nowrap cursor-pointer">icddr,b</span>
 <span className="text-2xl font-bold text-gray-300 dark:text-text-base hover:text-text-base hover:text-text-base transition-colors whitespace-nowrap cursor-pointer">BRAC Healthcare</span>
 </div>
 ))}
 </div>
 </div>
 </section>

 </div>
 )
}
