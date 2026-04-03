"use client";

import React from 'react';
import Link from 'next/link';

// Icon components for the service cards
const TestTube = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 2v17.5A2.5 2.5 0 0 0 11.5 22h1a2.5 2.5 0 0 0 2.5-2.5V2"></path>
    <path d="M12 2a4 4 0 0 0-2 7.5"></path>
    <path d="M12 2a4 4 0 0 1 2 7.5"></path>
  </svg>
);

const Cutting = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3"></circle>
    <circle cx="18" cy="18" r="3"></circle>
    <path d="M20 4 8.12 15.88"></path>
    <path d="M14.47 14.48 20 20"></path>
    <path d="M8.12 8.12 12 12"></path>
  </svg>
);

const Diamond = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"></path>
  </svg>
);

const Mounting = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 15A7 7 0 1 0 12 1a7 7 0 0 0 0 14Z"></path>
    <path d="M12 5v2"></path>
    <path d="M12 15v2"></path>
    <path d="M5 12H3"></path>
    <path d="M21 12h-2"></path>
    <path d="m7.6 6.6-1.4-1.4"></path>
    <path d="m17.4 16.4-1.4-1.4"></path>
    <path d="m16 7-1.4 1.4"></path>
    <path d="m7.5 16.5-1 1"></path>
    <path d="M16 16a4 4 0 0 1-8 0"></path>
  </svg>
);

const Polishing = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="1"></circle>
  </svg>
);

const Electrolytic = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2v7.31"></path>
    <path d="M14 9.3V1.99"></path>
    <path d="M8.5 2h7"></path>
    <path d="M14 9.3a6.5 6.5 0 1 1-4 0"></path>
    <path d="M5.52 16h12.96"></path>
  </svg>
);

const Microscope = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 18h8"></path>
    <path d="M3 22h18"></path>
    <path d="M14 22a7 7 0 1 0 0-14h-1"></path>
    <path d="M9 14h2"></path>
    <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"></path>
    <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"></path>
  </svg>
);

const ImageAnalysis = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
    <line x1="16" x2="22" y1="5" y2="5"></line>
    <line x1="19" x2="19" y1="2" y2="8"></line>
    <circle cx="9" cy="9" r="2"></circle>
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
  </svg>
);

const Hardness = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="3" rx="2"></rect>
    <path d="M12 8v8"></path>
    <path d="M8 12h8"></path>
  </svg>
);

const Metallography = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21 15-9-9-9 9"></path>
    <path d="m21 11-9-9-9 9"></path>
  </svg>
);

export default function CoursesPage() {

  const services = [
    {
      id: "comp-test",
      title: "Comprehensive Testing",
      description: "State-of-the-art testing laboratory specialized in thorough failure investigations and in-situ applications.",
      capabilities: ["Failure analysis", "Material characterization", "In-situ testing", "Environmental testing"],
      icon: <TestTube className="h-6 w-6" />,
    },
    {
      id: "auto-sect",
      title: "Automatic Sectioning",
      description: "Precision cutting services with computer-controlled equipment to preserve material microstructure.",
      capabilities: ["Abrasive cutting", "Precision sectioning", "Large sample capacity", "Minimal deformation"],
      icon: <Cutting className="h-6 w-6" />,
    },
    {
      id: "diam-sect",
      title: "Diamond Sectioning",
      description: "Specialized cutting for hard or delicate materials requiring exceptional precision.",
      capabilities: ["Ultra-thin sectioning", "Delicate material handling", "Minimal heat generation", "Precision control"],
      icon: <Diamond className="h-6 w-6" />,
    },
    {
      id: "hot-cold",
      title: "Hot/Cold Mounting",
      description: "Advanced specimen preparation using both hot and cold mounting techniques for optimal results.",
      capabilities: ["Hot compression mounting", "Cold epoxy mounting", "Edge retention", "Custom mounts"],
      icon: <Mounting className="h-6 w-6" />,
    },
    {
      id: "pol-grid",
      title: "Polishing & Grinding",
      description: "Manual and automatic polishing systems producing mirror-like surfaces for microstructural examination.",
      capabilities: ["Multi-stage polishing", "Automated processes", "Custom protocols", "Final polishing <1μm"],
      icon: <Polishing className="h-6 w-6" />,
    },
    {
      id: "elec-pol",
      title: "Electrolytic Polishing",
      description: "Advanced electrochemical process providing deformation-free surfaces for superior analysis.",
      capabilities: ["Deformation-free surfaces", "Selective etching", "Process monitoring", "Custom electrolytes"],
      icon: <Electrolytic className="h-6 w-6" />,
    },
    {
      id: "micr-anal",
      title: "Microscopy Analysis",
      description: "High-resolution optical microscopy delivering detailed material analysis across multiple magnifications.",
      capabilities: ["50x-1000x magnification", "Dark field imaging", "Polarized light", "Digital imaging"],
      icon: <Microscope className="h-6 w-6" />,
    },
    {
      id: "imag-anal",
      title: "Image Analysis",
      description: "Sophisticated digital systems for quantitative measurements and feature recognition in materials.",
      capabilities: ["Phase distribution", "Grain size analysis", "Porosity measurement", "Custom algorithms"],
      icon: <ImageAnalysis className="h-6 w-6" />,
    },
    {
      id: "harn-test",
      title: "Microhardness Testing",
      description: "Precision hardness testing with integrated imaging for comprehensive material characterization.",
      capabilities: ["Vickers testing", "Knoop testing", "Automated mapping", "Low-load precision"],
      icon: <Hardness className="h-6 w-6" />,
    },
    {
      id: "insi-meta",
      title: "In-situ Metallography",
      description: "Portable equipment enabling on-site material analysis without destructive sample removal.",
      capabilities: ["Field replication", "Non-destructive testing", "Digital documentation", "Immediate results"],
      icon: <Metallography className="h-6 w-6" />,
    },
  ];

  return (
    <div className="bg-surface text-on-surface">
      <main>
        {/* Accolades-Aligned Perfectly Centered Hero Section */}
        <section className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b border-slate-200">
          {/* Subtle Rotated Background Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/images/courses_hero.jpeg"
              alt="Industrial Background"
              className="w-full h-full object-cover opacity-[0.20] mix-blend-normal transform -rotate-12 scale-150 origin-center translate-x-[-10%] translate-y-[-5%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-[#f0f7fd]/70 to-white/80"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1E6FA8]/5 -skew-x-12 translate-x-1/4"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1E6FA8]/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl shadow-[0_0_100px_rgba(30,111,168,0.1)]"></div>
          </div>

          <div className="relative z-20 max-w-6xl mx-auto px-8 w-full flex flex-col items-center text-center">
            {/* Precision Badge */}
            <span className="inline-block text-sm md:text-base font-semibold tracking-[0.08em] text-primary mb-6">
              Advanced Materialography Solutions
              <span className="block w-12 h-[2px] bg-primary mt-2 mx-auto"></span>
            </span>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#1a3c5a] tracking-tighter leading-tight mb-8 text-center w-full max-w-5xl">
              Precision <span className="text-[#1E6FA8]">Metallurgical</span> Services
            </h1>

            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mx-auto mb-10 text-center">
              Delivering cutting-edge material testing and characterization. Our specialized laboratory workflows ensure absolute structural integrity and performance validation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full">
              <button className="bg-[#1E6FA8] text-white px-12 py-5 font-bold text-sm tracking-wide hover:bg-[#1a3c5a] shadow-xl shadow-[#1E6FA8]/20 transition-all duration-400 hover:-translate-y-1 min-w-[200px]">
                Explore capabilities
              </button>
              <button className="bg-white/80 border-2 border-[#1E6FA8] text-[#1E6FA8] px-12 py-5 font-bold text-sm tracking-wide hover:bg-[#1E6FA8] hover:text-white transition-all duration-400 backdrop-blur-sm shadow-lg hover:-translate-y-1 min-w-[200px]">
                Technical docs
              </button>
            </div>
          </div>
        </section>

        {/* Specialized Solutions Section (5-column Icon Layout with Interactivity) */}
        <section className="py-12 px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-black text-on-surface tracking-tight mb-4 text-[#1a3c5a]">Specialized Solutions</h2>
              <p className="text-secondary font-medium tracking-widest text-xs">Standardized testing protocols & advanced characterization</p>
            </div>
            <div className="flex gap-2">
              <div className="h-[2px] w-24 bg-[#1a3c5a]/40"></div>
              <div className="h-[2px] w-8 bg-[#1a3c5a]"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-[#1a3c5a]/20 border border-[#1a3c5a]/20 transition-all duration-500">
            {services.map((service) => {
              return (
                <div
                  key={service.id}
                  className="relative h-[280px]"
                >
                  {/* Compact Main Card - Pop-out expansion on hover */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-start group transition-all duration-500 ease-out bg-white border border-slate-100 hover:border-primary/10 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.18)] hover:z-50 hover:-translate-y-4 rounded-none h-full hover:h-fit">

                    <div className="text-[#1E6FA8] mb-4 transition-all duration-300 group-hover:scale-110 origin-left">
                      <div className="text-2xl">{service.icon}</div>
                    </div>

                    <h3 className="text-base font-black mb-3 leading-tight text-[#1a3c5a] tracking-tight group-hover:text-[#1E6FA8] transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-[13px] text-[#475569] leading-relaxed font-semibold mb-0">
                      {service.description}
                    </p>

                    {/* Popped-out capabilities extension */}
                    <div className="opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-[300px] transition-all duration-500 ease-in-out border-t border-slate-50 pt-0 group-hover:pt-6 mt-0 group-hover:mt-6 overflow-hidden">
                      <h4 className="text-[9px] font-black text-primary tracking-[0.15em] mb-3">Key Capabilities</h4>
                      <div className="flex flex-col gap-1.5 pb-6">
                        {service.capabilities.map((cap, idx) => (
                          <div key={idx} className="bg-[#f0f9ff] px-3 py-1.5 rounded-sm border border-[#1E6FA8]/5">
                            <span className="text-[10px] font-bold text-[#1E6FA8] capitalize leading-tight">
                              {cap.toLowerCase()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Decorative bottom glow only on hover */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#1E6FA8]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#f8fafc] py-12 px-8 relative overflow-hidden border-t border-slate-200">
          <div className="absolute right-0 top-0 w-1/3 h-full bg-slate-200/40 skew-x-12 translate-x-1/2"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-[#1a3c5a] leading-tight mb-4 tracking-tight">
                  Ready to Solve Your Material Challenges?
                </h2>
                <p className="text-slate-600 text-base mb-2 max-w-md font-medium leading-relaxed">
                  Consult with our engineering team to develop a custom testing protocol tailored to your specific application requirements.
                </p>
              </div>
              <div className="flex flex-wrap md:justify-end gap-4">
                <button className="bg-[#1E6FA8] text-white px-8 py-3.5 font-black text-[14px] tracking-[0.1em] hover:bg-[#1a3c5a] transition-all shadow-lg hover:shadow-xl shadow-[#1E6FA8]/20 hover:-translate-y-0.5">
                  Contact engineering
                </button>
                <button className="bg-white border-2 border-[#1E6FA8] text-[#1E6FA8] px-8 py-3.5 font-black text-[14px] tracking-[0.1em] hover:bg-[#1E6FA8] hover:text-white transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5">
                  Browse catalog
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
