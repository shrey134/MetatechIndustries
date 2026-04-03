"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AccoladesPage() {
  const accoladesData = {
    Awards: [
      { year: "2023", title: "Materials Analysis Innovation Award", description: "Recognized for pioneering advancements in automated electrolytic polishing techniques", icon: "emoji_events" },
      { year: "2021", title: "Excellence in Metallography Solutions", description: "Awarded by the International Materials Testing Association", icon: "military_tech" },
      { year: "2018", title: "Industry Partner of the Year", description: "Presented by the Association of Aerospace Manufacturers", icon: "handshake" },
      { year: "2019", title: "Quality Leadership Award", description: "For maintaining exceptional standards in materials testing and analysis", icon: "military_tech" },
      { year: "2015", title: "Technology Pioneer Award", description: "For introducing advanced image analysis capabilities to the metallography field", icon: "emoji_events" }
    ],
    Certifications: [
      { year: "2024", title: "ISO 9001:2015", description: "Quality Management System Certification", icon: "verified" },
      { year: "2022", title: "AS9100 Rev D", description: "Aerospace Quality Management System", icon: "verified" },
      { year: "2020", title: "ISO 17025", description: "Testing and Calibration Laboratories Accreditation", icon: "verified" }
    ],
    Partnerships: [
      { year: "2023", title: "Strategic Partnership with AeroTech Industries", description: "Collaborative research on advanced aerospace materials", icon: "handshake" },
      { year: "2021", title: "Research Collaboration with MIT Materials Science Department", description: "Joint development of next-generation material analysis methodologies", icon: "handshake" },
      { year: "2019", title: "Government Defense Contract", description: "Selected as primary materials analysis partner for defense applications", icon: "handshake" }
    ],
    Milestones: [
      { year: "2024", title: "40 Years of Excellence", description: "Celebrating four decades of industry leadership and innovation in materials analysis", icon: "emoji_events" },
      { year: "2020", title: "Global Expansion", description: "Opened facilities in Asia and Europe to serve international clients", icon: "military_tech" },
      { year: "2015", title: "Advanced Imaging Lab", description: "Launched state-of-the-art imaging laboratory with proprietary analysis technology", icon: "military_tech" },
      { year: "2010", title: "Research Publication Milestone", description: "Published 100th research paper in collaboration with leading universities", icon: "military_tech" },
      { year: "1984", title: "Company Founding", description: "Established with a mission to revolutionize metallography and materials analysis", icon: "military_tech" }
    ]
  };

  const Digit = ({ value, hasStarted }) => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
      if (hasStarted) {
        setOffset(Number(value));
      }
    }, [hasStarted, value]);

    return (
      <div className="inline-block overflow-hidden h-[48px] md:h-[60px] relative align-bottom">
        <div
          className="transition-transform duration-[2000ms] ease-in-out"
          style={{ transform: `translateY(-${offset * 10}%)` }}
        >
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <div key={n} className="h-[48px] md:h-[60px] flex items-center justify-start">
              {n}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const StatItem = ({ target, label, suffix = "" }) => {
    const [hasStarted, setHasStarted] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        },
        { threshold: 0.1 }
      );
      if (elementRef.current) observer.observe(elementRef.current);
      return () => observer.disconnect();
    }, [hasStarted]);

    const digits = typeof target === 'number' ? target.toString().split("") : [target];

    return (
      <div ref={elementRef}>
        <div className="text-5xl md:text-6xl font-black text-[#1a3c5a] tracking-tighter flex items-center leading-none">
          {digits.map((d, i) => (
            isNaN(parseInt(d)) ? <span key={i}>{d}</span> : <Digit key={i} value={d} hasStarted={hasStarted} />
          ))}
          <span className="ml-1">{suffix}</span>
        </div>
        <div className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400 mt-4">
          {label}
        </div>
      </div>
    );
  };

  const AccoladeCard = ({ item }) => (
    <div className="bg-white border border-slate-200 flex flex-col relative rounded-[12px] overflow-hidden transition-all duration-300 group hover:-translate-y-1 shadow-sm hover:shadow-xl">
      {/* Header Strip */}
      <div className="bg-[#F0F9FF] px-6 py-5 flex justify-between items-center border-b border-[#E5E7EB]">
        <h4 className="text-[15px] font-black text-[#1a3c5a] leading-snug pr-4">
          {item.title}
        </h4>
        <span className="material-symbols-outlined text-[#1E6FA8] text-[20px] shrink-0">
          {item.icon}
        </span>
      </div>

      {/* Content Area */}
      <div className="p-6 pt-5">
        <span className="text-[13px] font-bold text-[#1E6FA8] tracking-tight mb-3 block opacity-70">
          {item.year}
        </span>
        <p className="text-[14px] text-slate-500 leading-relaxed font-medium">
          {item.description}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Hero Section - Light Brand Alignment */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-gradient-to-br from-[#EAF6FB] to-white border-b border-slate-100">
        <img 
          alt="Professional Industrial Context" 
          className="absolute inset-0 z-0 w-full h-full object-cover opacity-[0.08] grayscale pointer-events-none" 
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
        />
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block text-sm md:text-base font-semibold tracking-[0.08em] text-primary mb-6">
              Precision Engineering & Excellence
              <span className="block w-12 h-[2px] bg-primary mt-2 mx-auto"></span>
            </span>
            <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tighter text-[#1a3c5a] mb-8">
              Our accolades <br />& achievements
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto">
              For over 40 years, METATECH Industries has set the global standard for materials analysis. Our commitment to technical excellence and industrial precision is reflected in our history of pioneering innovations.
            </p>
          </div>
        </div>
        {/* Subtle accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1E6FA8]/5 -skew-x-12 translate-x-1/2"></div>
      </section>

      {/* Stats Section Area - Unified Padding */}
      <section className="py-24 px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-wrap justify-between items-center gap-12 border-l-8 border-[#1E6FA8] pl-10 py-4">
          <StatItem target={40} suffix="+" label="Years of excellence" />
          <StatItem target={150} suffix="+" label="Global patents" />
          <StatItem target="ISO" label="Certified systems" />
          <StatItem target={50} suffix="+" label="Countries served" />
        </div>
      </section>

      {/* Main Content - Categories Single Scroll */}
      <main className="pb-32 px-8">
        <div className="max-w-7xl mx-auto space-y-32">
          {Object.entries(accoladesData).map(([category, items]) => (
            <section key={category} className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Category Header Design */}
              <div className="mb-12 flex items-center gap-4 bg-[#F0F9FF] p-6 rounded-lg border-l-8 border-[#1E6FA8] shadow-sm">
                <span className="material-symbols-outlined text-[#1E6FA8] text-3xl">
                  {items[0]?.icon || 'stars'}
                </span>
                <h2 className="text-2xl font-black text-[#1a3c5a] uppercase tracking-tight">
                  {category}
                </h2>
              </div>

              {/* Grid System - Structured Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, idx) => (
                  <AccoladeCard key={idx} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      {/* CTA Section - Polished & Prominent */}
      <section className="py-32 px-8 relative overflow-hidden bg-[#F0F9FF] border-t border-slate-100">
        <div className="absolute inset-0 opacity-[0.03] technical-grid"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-[#1a3c5a] tracking-tighter mb-8 uppercase leading-tight">
            Partner with METATECH today!
          </h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Trust Metatech to be your partner in pushing the boundaries of materials analysis and achieving success in your endeavors.
          </p>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="bg-[#1a3c5a] text-white px-12 py-5 font-black tracking-[0.2em] uppercase text-sm hover:bg-[#1E6FA8] transition-all rounded-[4px] shadow-2xl shadow-[#1a3c5a]/20 group flex items-center gap-4"
            >
              Get in touch
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
