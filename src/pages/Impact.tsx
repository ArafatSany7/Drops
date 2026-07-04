import { Heart, Activity, Globe, Users, TrendingUp, Award } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

function AnimatedNumber({ value, isHovered }: { value: number, isHovered: boolean }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  const animateValue = (start: number, end: number, duration: number) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateValue(0, value, 2000);
        }
      },
      { threshold: 0.1 }
    );
    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [value]);

  useEffect(() => {
    if (isHovered && hasAnimated.current) {
      animateValue(0, value, 1000);
    }
  }, [isHovered, value]);

  return <span ref={nodeRef}>{count.toLocaleString()}</span>;
}

const stats = [
  { icon: Users, value: 24500, suffix: "+", label: "Active Donors" },
  { icon: Heart, value: 73500, suffix: "+", label: "Lives Impacted" },
  { icon: Globe, value: 42, suffix: "", label: "Districts Covered" }
];

export default function Impact() {
 const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
 return (
 <div className="flex flex-col flex-1 bg-bg-surface">
 
 {}
 <section className="w-full bg-gray-900 text-white py-20 px-8 relative overflow-hidden">
 <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/4 pointer-events-none">
 <Heart className="w-96 h-96" />
 </div>
 <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
 <p className="text-primary text-sm font-bold tracking-[0.2em] uppercase mb-4">Our Impact</p>
 <h1 className="text-5xl font-extrabold mb-6 max-w-2xl leading-tight">Measuring the power of a single drop</h1>
 <p className="text-text-muted text-lg max-w-2xl leading-relaxed mb-10">
 Every day, Drops connects heroes with those in critical need. 
 Our transparent tracking ensures you always know the lives you touch.
 </p>
 </div>
 </section>

 {}
 <section className="w-full max-w-7xl mx-auto px-8 py-16 -mt-16 relative z-20">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6" onMouseLeave={() => setHoveredIndex(null)}>
 {stats.map((stat, index) => {
   const isActive = hoveredIndex !== null ? hoveredIndex === index : index === 1;
   const Icon = stat.icon;
   
   return (
     <div 
       key={index}
       onMouseEnter={() => setHoveredIndex(index)}
       className={`p-8 rounded-3xl flex flex-col items-center text-center transform transition-all duration-300 cursor-pointer ${
         isActive 
           ? 'bg-primary shadow-xl shadow-primary/30 text-white md:-translate-y-4' 
           : 'bg-bg-surface shadow-xl shadow-gray-200/50 dark:shadow-none border border-border-subtle md:translate-y-0'
       }`}
     >
       <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 ${
         isActive ? 'bg-bg-surface/20' : 'bg-red-50 dark:bg-red-500/10'
       }`}>
         <Icon className={`w-8 h-8 transition-colors duration-300 ${isActive ? 'text-white' : 'text-primary'}`} />
       </div>
       <h3 className={`text-4xl font-bold mb-2 transition-colors duration-300 ${!isActive ? 'text-text-base' : ''}`}>
         <AnimatedNumber value={stat.value} isHovered={isActive} />{stat.suffix}
       </h3>
       <p className={`font-medium transition-colors duration-300 ${isActive ? 'text-primary-100' : 'text-text-muted'}`}>
         {stat.label}
       </p>
     </div>
   );
 })}
 </div>
 <p className="text-center text-sm text-text-muted mt-8 italic opacity-75">
    * These figures represent our projected 3-year impact goals, not current live data.
 </p>
 </section>

 {}
 <section className="w-full bg-bg-subtle py-20 px-8">
 <div className="max-w-7xl mx-auto">
 <div className="text-center mb-16">
 <h2 className="text-3xl font-bold text-text-base mb-4">Stories of Hope</h2>
 <p className="text-text-muted max-w-2xl mx-auto">
 Real stories from our community. See how a simple act of donation can completely change the course of a family's life.
 </p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="bg-bg-surface p-8 rounded-3xl border border-border-subtle shadow-sm flex flex-col gap-6">
 <p className="text-text-muted italic leading-relaxed text-lg">
 "When my mother needed O- blood urgently during surgery, Drops connected us with a donor within 15 minutes. He arrived at Square Hospital immediately. We are forever grateful."
 </p>
 <div className="flex items-center gap-4 mt-auto">
 <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
 <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="Recipient" className="w-full h-full object-cover" />
 </div>
 <div>
 <h4 className="font-bold text-text-base">Nadia Rahman</h4>
 <p className="text-xs text-text-muted">Patient's Daughter</p>
 </div>
 </div>
 </div>
 
 <div className="bg-bg-surface p-8 rounded-3xl border border-border-subtle shadow-sm flex flex-col gap-6">
 <p className="text-text-muted italic leading-relaxed text-lg">
 "I've been donating for 5 years, but the Drops app makes it so much more meaningful. Getting a notification that says 'Your donation saved a life today' is an indescribable feeling."
 </p>
 <div className="flex items-center gap-4 mt-auto">
 <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Donor" className="w-full h-full object-cover" />
 </div>
 <div>
 <h4 className="font-bold text-text-base">Hasan Mahmud</h4>
 <p className="text-xs text-text-muted">Verified Donor</p>
 </div>
 </div>
 </div>
 </div>
 </div>
 </section>

 {}
 <section className="w-full max-w-7xl mx-auto py-20 px-8 flex flex-col md:flex-row items-center gap-12">
 <div className="flex-1 space-y-6">
 <div className="inline-flex items-center gap-2 bg-red-50 text-primary px-4 py-2 rounded-full text-sm font-bold">
 <TrendingUp className="w-4 h-4" />
 Our Vision for 2026
 </div>
 <h2 className="text-3xl font-bold text-text-base leading-tight">
 Building a nation where no one dies waiting for blood.
 </h2>
 <p className="text-text-muted leading-relaxed">
 We are expanding our network to reach every remote corner of the country. 
 By partnering with local clinics and running continuous awareness campaigns, 
 we aim to double our donor base in the next two years.
 </p>
 <ul className="space-y-4 pt-4">
 <li className="flex items-center gap-3 text-text-base font-medium">
 <Award className="w-5 h-5 text-primary" />
 100% Nationwide coverage
 </li>
 <li className="flex items-center gap-3 text-text-base font-medium">
 <Activity className="w-5 h-5 text-primary" />
 Under 30-minute average response time
 </li>
 </ul>
 </div>
 <div className="flex-1 w-full relative">
 <div className="aspect-square bg-bg-subtle rounded-full absolute -top-8 -right-8 w-64 -z-10" />
 <img 
 src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=800&auto=format&fit=crop" 
 alt="Medical Professional" 
 className="rounded-3xl shadow-xl w-full object-cover"
 />
 </div>
 </section>
 </div>
 )
}
