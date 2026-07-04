import { ShieldCheck, HeartPulse, Droplets, ArrowRight, User } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function About() {
 return (
 <div className="flex flex-col flex-1 bg-bg-surface">
 
 {}
 <section className="w-full bg-bg-subtle py-24 px-8 border-b border-border-subtle text-center">
 <h1 className="text-4xl md:text-5xl font-extrabold text-text-base mb-6">About Drops</h1>
 <p className="text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
 We are a technology-driven community initiative dedicated to bridging the gap between blood donors and those in critical need.
 </p>
 </section>

 {}
 <section className="w-full max-w-7xl mx-auto py-20 px-8">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
 
 <div className="flex flex-col items-center text-center group cursor-pointer">
 <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary">
 <Droplets className="w-8 h-8 text-primary transition-colors duration-300 group-hover:text-white" />
 </div>
 <h3 className="text-xl font-bold text-text-base mb-4">Our Mission</h3>
 <p className="text-text-muted leading-relaxed">
 To eliminate blood scarcity by creating a seamless, transparent, and instant connection platform for voluntary donors.
 </p>
 </div>

 <div className="flex flex-col items-center text-center group cursor-pointer">
 <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary">
 <HeartPulse className="w-8 h-8 text-primary transition-colors duration-300 group-hover:text-white" />
 </div>
 <h3 className="text-xl font-bold text-text-base mb-4">Compassion First</h3>
 <p className="text-text-muted leading-relaxed">
 We believe in the power of humanity. Every feature we build is designed to make the act of saving a life as easy as possible.
 </p>
 </div>

 <div className="flex flex-col items-center text-center group cursor-pointer">
 <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary">
 <ShieldCheck className="w-8 h-8 text-primary transition-colors duration-300 group-hover:text-white" />
 </div>
 <h3 className="text-xl font-bold text-text-base mb-4">Trust & Safety</h3>
 <p className="text-text-muted leading-relaxed">
 Data privacy and donor verification are at our core. We maintain strict medical compliance and HIPAA-level security.
 </p>
 </div>

 </div>
 </section>

 {}
 <section className="w-full bg-gray-900 text-white py-24 px-8">
 <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-center">
 <div className="flex-1 space-y-6">
 <h2 className="text-3xl font-bold">How it all started</h2>
 <div className="w-20 h-1 bg-primary rounded-full" />
 <p className="text-text-muted leading-relaxed text-lg">
 Drops began in 2023 when our founder witnessed firsthand the chaotic and delayed process of sourcing rare blood types during emergencies via social media.
 </p>
 <p className="text-text-muted leading-relaxed text-lg">
 We realized that while people were incredibly willing to help, the lack of a centralized, real-time tracking system was costing lives. What started as a small local database has now grown into a nationwide smart-platform.
 </p>
 </div>
 <div className="flex-1 w-full">
 <img 
 src="https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop" 
 alt="Medical Team" 
 className="rounded-3xl shadow-2xl opacity-90 grayscale hover:grayscale-0 transition duration-500"
 />
 </div>
 </div>
 </section>

 {}
 <section className="w-full max-w-7xl mx-auto py-24 px-8">
 <div className="text-center mb-16">
 <h2 className="text-3xl font-bold text-text-base mb-4">Meet the Leadership</h2>
 <p className="text-text-muted max-w-2xl mx-auto">
 Our core team brings together experts in medicine, technology, and community building.
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
 {[
 { name: 'Arafat Sany', role: 'Founder & CEO' },
 { name: 'Modu', role: 'Head of Medical Affairs' },
 { name: 'Jodu', role: 'Community Director' },
 { name: 'Kodu', role: 'CTO' }
 ].map((member, i) => (
 <div key={i} className="flex flex-col items-center group">
 <div className="w-32 h-32 rounded-full bg-bg-subtle border border-border-subtle mb-4 flex items-center justify-center transition-colors group-hover:border-primary group-hover:bg-primary/5">
 <User className="w-16 h-16 text-text-muted transition-colors group-hover:text-primary" />
 </div>
 <h4 className="text-lg font-bold text-text-base">{member.name}</h4>
 <p className="text-sm text-primary font-medium">{member.role}</p>
 </div>
 ))}
 </div>
 </section>

 {}
 <section className="w-full bg-red-50 dark:bg-red-950/20 py-20 px-8 text-center border-t border-red-100 dark:border-red-900/30">
 <h2 className="text-3xl font-bold text-text-base mb-6">Ready to make a difference?</h2>
 <Link to="/registration" className="inline-flex items-center gap-2 bg-primary text-white font-bold py-4 px-10 rounded-full hover:bg-primary-hover transition shadow-xl shadow-primary/30">
 Join Drops <ArrowRight className="w-5 h-5" />
 </Link>
 </section>

 </div>
 )
}
