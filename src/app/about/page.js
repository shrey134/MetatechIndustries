"use client";

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-800">

      {/* 1. HERO SECTION (Refined Industrial Layout) */}
      <section className="relative overflow-hidden bg-white border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[64px] items-stretch">
            {/* Left: Image Side (Image First on Mobile) */}
            <div className="order-1 relative min-h-[400px] lg:h-auto rounded-[16px] shadow-[0_20px_40px_rgba(0,0,0,0.08)] overflow-hidden">
              <img
                alt="Metatech Industrial Innovation"
                className="w-full h-full object-cover lg:absolute lg:inset-0"
                src="/images/about us hero section.jpg"
              />
            </div>

            {/* Right: Content Side */}
            <div className="flex flex-col text-center lg:text-left order-2">
              <div className="mb-4">
                <h1 className="text-[28px] md:text-[44px] font-black text-[#1a3c5a] leading-[1.1] mb-4 max-w-[520px] mx-auto lg:mx-0">
                  Pioneering Mechanical Innovation
                </h1>
                <p className="text-[15px] md:text-[16px] leading-[1.6] text-[#5f6b7a] mb-8 max-w-[520px] mx-auto lg:mx-0">
                  At Metatech Industries, we engineer the future of industrial automation. Since 2008, we’ve delivered precision machinery solutions to manufacturers across India, combining German engineering standards with local expertise.
                </p>
              </div>

              {/* Elements Grid - Standardized to new radius */}
              <div className="space-y-4 max-w-[520px] mx-auto lg:mx-0">
                {/* 1. Industrial Footprint */}
                <div className="bg-white rounded-[16px] p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] group transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[#1E6FA8] text-2xl mt-1">location_on</span>
                    <div className="flex-1 text-left">
                      <h3 className="text-[16px] font-bold text-[#1a3c5a] mb-3">Our Industrial Footprint</h3>
                      <ul className="space-y-2 text-[14px] text-[#5f6b7a]">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#1E6FA8] rounded-full"></span>
                          <span><strong>HQ:</strong> Plot 45, MIDC Industrial Zone, Pune</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#1E6FA8] rounded-full"></span>
                          <span><strong>Regional warehouses:</strong> Chennai, Bengaluru, Ahmedabad</span>
                        </li>
                        <li className="flex items-center gap-2 font-bold text-[#1E6FA8]">
                          <span className="w-1.5 h-1.5 bg-[#1E6FA8] rounded-full"></span>
                          <span>5 new service centers opening 2025</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Our Specializations */}
                  <div className="bg-white rounded-[16px] p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-left h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="material-symbols-outlined text-[#1E6FA8] text-xl">settings_suggest</span>
                      <h3 className="text-[15px] font-bold text-[#1a3c5a]">Specializations</h3>
                    </div>
                    <ul className="space-y-2 text-[13px] text-[#5f6b7a]">
                      {["CNC Machinery", "Industrial Robotics", "Assembly Lines"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-[#1E6FA8]">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Certifications */}
                  <div className="bg-white rounded-[16px] p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-left h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="material-symbols-outlined text-[#1E6FA8] text-xl">workspace_premium</span>
                      <h3 className="text-[15px] font-bold text-[#1a3c5a]">Certifications</h3>
                    </div>
                    <ul className="space-y-2 text-[13px] text-[#5f6b7a]">
                      {["ISO 9001:2015", "MSME Udyam", "CE Marked"].map((item, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-[#1E6FA8]">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE EVOLUTION TIMELINE
      <section className="py-24 px-8 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#1a3c5a] tracking-tight uppercase">The Evolution Timeline</h2>
            <div className="h-1.5 w-16 bg-[#1a3c5a] mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { year: "1994", event: "Foundation", detail: "Metatech Industries established with a core focus on precision abrasive cutting." },
              { year: "2005", event: "Standardization", detail: "Launch of fully automatic mounting systems, setting a benchmark." },
              { year: "2015", event: "Digital Shift", detail: "Integration of high-resolution digital image analysis into our ecosystem." },
              { year: "2024", event: "Precision Blueprint", detail: "Launch of the global intelligent laboratory integration platform." }
            ].map((milestone, idx) => (
              <div key={idx} className="bg-[#F8FAFC] p-10 border border-slate-100 rounded-[12px] group hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                <span className="text-4xl font-black text-[#1E6FA8] mb-6 block opacity-80 group-hover:opacity-100 transition-opacity">{milestone.year}</span>
                <h4 className="font-bold uppercase tracking-widest text-[#1a3c5a] mb-4 text-[13px]">{milestone.event}</h4>
                <div className="h-px w-8 bg-[#1a3c5a]/20 mb-6 group-hover:w-16 transition-all duration-300"></div>
                <p className="text-[14px] text-slate-500 leading-relaxed font-medium">
                  {milestone.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 3. MEET OUR ENGINEERING LEADERSHIP (FULL REPLACEMENT) */}
      <section className="py-12 px-8 bg-[#F0F9FF] border-y border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col items-center mb-10 text-center">
          <h2 className="text-[28px] md:text-[34px] font-black text-[#1a3c5a] tracking-tight">Meet Our Engineering Leadership</h2>
          <p className="text-[#5f6b7a] font-medium text-[16px] md:text-[18px] max-w-none px-4">
            The brilliant minds behind our mechanical innovations and industrial solutions
          </p>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          {/* Mr. Y. Gowaikar - CEO Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 md:p-6 flex flex-col md:flex-row gap-6 items-center md:items-start group transition-all duration-500">
            {/* Leadership Image */}
            <div className="shrink-0 w-[220px] h-[280px] rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/ceo-image.jpg"
                alt="Mr. Y. Gowaikar - CEO"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Leadership Content */}
            <div className="flex-1">
              <div className="mb-4">
                <h4 className="text-[28px] md:text-[32px] font-black text-[#1a3c5a] leading-tight mb-1">Mr. Y. Gowaikar</h4>
                <div className="flex flex-col gap-2">
                  <span className="text-[14px] font-bold text-[#1E6FA8]">CEO @ Metatech Industries</span>

                  {/* Compact Tags */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {["Industrial Automation", "Precision Engineering", "Strategic Growth"].map((tag, i) => (
                      <span key={i} className="px-2.5 py-0.5 text-[10px] font-medium text-[#1E6FA8] border border-[#1E6FA8]/30 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-[13px] leading-relaxed text-slate-600 mt-3 font-medium">
                Mr. Y. Gowaikar leads Metatech Industries with over 25 years of experience in industrial machinery and automation solutions. His visionary leadership has positioned our company as an innovator in precision engineering.
                <br /><br />
                Under his guidance, we've expanded to serve 500+ clients across India with cutting-edge mechanical solutions. His expertise spans robotics, CNC systems, and large-scale industrial automation projects.
              </p>

              {/* Compact Achievements + Contact layout */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
                {/* Left: Achievements */}
                <div>
                  <h4 className="text-[11px] font-bold tracking-[0.12em] text-slate-500 mb-2 uppercase">
                    Key Achievements
                  </h4>

                  <ul className="space-y-2 text-[13px] text-slate-600">
                    {[
                      "Led expansion to 3 new industrial regions in 2022",
                      "Pioneered robotics division with 15+ automation solutions",
                      "Recipient of \"Industrial Innovator 2023\" award"
                    ].map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#1E6FA8] text-[12px] mt-[2px]">✔</span>
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Contact */}
                <div className="md:border-l md:pl-4 space-y-3">
                  <div>
                    <p className="text-[11px] text-slate-400 tracking-[0.1em] font-bold uppercase">Direct Contact</p>
                    <p className="text-[13px] font-bold text-[#1a3c5a]">+91 9876543210</p>
                  </div>

                  <div>
                    <p className="text-[11px] text-slate-400 tracking-[0.1em] font-bold uppercase">Official Email</p>
                    <p className="text-[13px] font-bold text-[#1a3c5a] truncate">ceo@metatechind.com</p>
                  </div>

                  <div>
                    <p className="text-[11px] text-slate-400 tracking-[0.1em] font-bold uppercase">Professional Profile</p>
                    <a 
                      href="https://www.linkedin.com/in/vinod-t-41082314/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[13px] font-bold text-[#1E6FA8] hover:underline flex items-center gap-1.5 mt-1"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      Y. Gowaikar
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISION & MISSION (REFRESHED) */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <span className="inline-block text-sm md:text-base font-semibold tracking-[0.08em] text-primary mb-6 uppercase">
            Our Purpose
            <span className="block w-12 h-[2px] bg-primary mt-2 mx-auto"></span>
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-[#1a3c5a] tracking-tight">Vision & Mission</h2>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#1a3c5a] to-[#0d2238] p-8 md:p-10 rounded-[16px] text-white shadow-xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-8xl">visibility</span>
            </div>
            <span className="material-symbols-outlined text-4xl text-[#82cfff] mb-6 block">visibility</span>
            <h3 className="text-2xl font-bold tracking-tight mb-4">Our Vision</h3>
            <p className="text-[#e2f1f8] leading-relaxed font-normal">
              To be the undisputed global authority in metallography, defining the universal standards for quality and innovation that every material test lab aspires to achieve.
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#1a3c5a] to-[#0d2238] p-8 md:p-10 rounded-[16px] text-white shadow-xl hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-8xl">track_changes</span>
            </div>
            <span className="material-symbols-outlined text-4xl text-[#82cfff] mb-6 block">track_changes</span>
            <h3 className="text-2xl font-bold tracking-tight mb-4">Our Mission</h3>
            <p className="text-[#e2f1f8] leading-relaxed font-normal">
              We enable laboratories and manufacturers to achieve precision and consistency through advanced material preparation solutions, backed by engineering excellence and continuous innovation.
            </p>
          </div>
        </div>
      </section>

      {/* 5. MEET OUR TEAM (Compact Photo Section) */}
      <section className="py-12 px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-6">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-[2px] w-6 bg-[#1E6FA8]"></div>
                <span className="text-[10px] font-black tracking-[0.3em] text-[#1E6FA8] uppercase">Team Excellence</span>
              </div>
              <h2 className="text-3xl font-black text-[#1a3c5a] tracking-tight">Meet Our Team</h2>
            </div>
            <div className="hidden md:block h-[1px] flex-1 bg-slate-100 max-w-[200px] mb-2"></div>
          </div>

          {/* Compact Team Photo Placeholder */}
          <div className="relative group">
            <div className="relative aspect-[21/7] md:aspect-[21/6] w-full rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-4 border-white">
              <img
                src="/images/team-group-photo.jpg"
                alt="Metatech Industries Team"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay with subtle grid and text */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3c5a]/50 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
                <h3 className="text-white text-xl md:text-2xl font-black tracking-tighter opacity-90">Precision in Every Role</h3>
              </div>
              
              {/* Floating Engineering Tag - Smaller for compact layout */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-lg shadow-md border border-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1E6FA8] text-[16px]">engineering</span>
                <span className="text-[9px] font-bold tracking-widest text-[#1a3c5a] uppercase">Metatech Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CORE VALUES (UPDATED CONTENT) */}
      <section className="py-12 px-8 bg-[#F8FAFC] border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-[#1a3c5a] tracking-tight">Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "architecture", title: "Structural Clarity", desc: "We simplify the complex, delivering intuitive systems that enhance precision and workflow efficiency." },
              { icon: "precision_manufacturing", title: "Unwavering Accuracy", desc: "Engineering solutions that deliver consistent, repeatable, and reliable results." },
              { icon: "verified", title: "Verified Reliability", desc: "Our products undergo rigorous validation to ensure long-term performance in demanding environments." },
              { icon: "model_training", title: "Continuous Evolution", desc: "We innovate relentlessly to stay ahead of industry advancements and customer needs." }
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[16px] border border-slate-200 shadow-sm hover:border-[#1E6FA8] hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-[#F0F9FF] rounded-lg flex items-center justify-center mb-6 text-[#1E6FA8]">
                  <span className="material-symbols-outlined text-[24px]">{value.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-[#1a3c5a] mb-3">{value.title}</h3>
                <p className="text-[14px] text-[#5f6b7a] leading-relaxed font-medium">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CHOOSE US / DIFFERENCE (Refined) */}
      <section className="py-12 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="relative rounded-[12px] overflow-hidden aspect-square md:aspect-auto md:h-full shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
            <img
              src="/images/metatech_difference.png"
              alt="The Metatech Difference"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="inline-block text-base font-black tracking-[0.2em] text-[#1E6FA8] mb-6 uppercase">
              The Advantage
              <span className="block w-12 h-[3px] bg-[#1E6FA8] mt-2"></span>
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-[#1a3c5a] tracking-tight mb-6">The Metatech Difference</h2>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed text-lg">
              We empower metallurgical labs with tools that are authoritative, silent, and incredibly structured—ensuring that every phase of material analysis is backed by unwavering reliability.
            </p>
            <ul className="space-y-8">
              <li className="flex gap-6 items-start">
                <div className="shrink-0 w-12 h-12 rounded-full bg-[#EAF6FB] text-[#1E6FA8] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">check</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#1a3c5a] mb-2 text-[16px]">Absolute Edge Retention</h4>
                  <p className="text-[14px] text-slate-500 leading-relaxed font-medium">Our mounting systems ensure zero specimen deformation for critical interface analysis, maintaining exact parameter control.</p>
                </div>
              </li>
              <li className="flex gap-6 items-start">
                <div className="shrink-0 w-12 h-12 rounded-full bg-[#EAF6FB] text-[#1E6FA8] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">check</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#1a3c5a] mb-2 text-[16px]">Microstructural Integrity</h4>
                  <p className="text-[14px] text-slate-500 leading-relaxed font-medium">Computer-controlled precision sectioning preserves the original material state perfectly for accurate diagnostic testing.</p>
                </div>
              </li>
              <li className="flex gap-6 items-start">
                <div className="shrink-0 w-12 h-12 rounded-full bg-[#EAF6FB] text-[#1E6FA8] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">check</span>
                </div>
                <div>
                  <h4 className="font-bold text-[#1a3c5a] mb-2 text-[16px]">Tonal Layering Depth</h4>
                  <p className="text-[14px] text-slate-500 leading-relaxed font-medium">Systems designed with logical, intuitive UI/UX layering to minimize operator error in high-density laboratory environments.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 7. STATS (Refined from hero) */}
      <section className="py-12 px-8 bg-[#F0F9FF] border-y border-[#1E6FA8]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center">
          <div className="flex flex-col items-center px-4">
            <span className="text-5xl md:text-7xl font-black text-[#1a3c5a] tracking-tighter mb-4 flex items-center">30<span className="text-[#1E6FA8] ml-1">+</span></span>
            <span className="text-[12px] md:text-[14px] tracking-[0.2em] text-[#5f6b7a] font-bold uppercase">Years of mastery</span>
          </div>
          <div className="flex flex-col items-center px-4 border-y md:border-y-0 md:border-x border-[#1E6FA8]/15 py-12 md:py-0">
            <span className="text-5xl md:text-7xl font-black text-[#1a3c5a] tracking-tighter mb-4 flex items-center">500<span className="text-[#1E6FA8] ml-1">+</span></span>
            <span className="text-[12px] md:text-[14px] tracking-[0.2em] text-[#5f6b7a] font-bold uppercase">Global installations</span>
          </div>
          <div className="flex flex-col items-center px-4">
            <span className="text-5xl md:text-7xl font-black text-[#1a3c5a] tracking-tighter mb-4 flex items-center">50<span className="text-[#1E6FA8] ml-1">+</span></span>
            <span className="text-[12px] md:text-[14px] tracking-[0.2em] text-[#5f6b7a] font-bold uppercase">Countries served</span>
          </div>
        </div>
      </section>

      {/* 8. OUR PREMIUM SERVICES (Refined) */}
      <section className="py-12 px-8 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-6 border-b border-slate-100">
            <div className="max-w-xl">
              <span className="inline-block text-[13px] font-black tracking-[0.3em] text-[#1E6FA8] mb-4 uppercase">
                End-To-End Solutions
                <span className="block w-10 h-[3px] bg-[#1E6FA8] mt-2"></span>
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#1a3c5a] tracking-tighter leading-none">
                Our Premium Services
              </h2>
            </div>
            <p className="text-[#5f6b7a] font-medium text-[14px] md:text-[15px] max-w-xs leading-relaxed">
              Technical support systems designed for maximum laboratory uptime.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { 
                num: "01",
                icon: "home_repair_service", 
                title: "Installation & Calibration", 
                desc: "Turn-key laboratory setups performed by certified engineers for day-one operational perfection." 
              },
              { 
                num: "02",
                icon: "psychology", 
                title: "Technical Training", 
                desc: "On-site operator training on precision mechanics and digital evaluation software." 
              },
              { 
                num: "03",
                icon: "support_agent", 
                title: "Lifecycle Support", 
                desc: "Priority technical assistance and maintenance programs to guarantee continuous uptime." 
              }
            ].map((service, idx) => (
              <div key={idx} className="p-8 flex flex-col group transition-all duration-300 bg-[#F0F9FF] hover:bg-[#E0F2FE] border border-[#1E6FA8]/10 rounded-xl relative hover:shadow-[0_20px_40px_rgba(30,111,168,0.08)]">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-3xl font-black text-[#1E6FA8]/10 group-hover:text-[#1E6FA8]/20 transition-colors duration-300">{service.num}</span>
                  <div className="w-10 h-10 bg-white text-[#1E6FA8] flex items-center justify-center rounded-lg group-hover:bg-[#1E6FA8] group-hover:text-white transition-all duration-300 shadow-sm border border-[#1E6FA8]/10">
                    <span className="material-symbols-outlined text-[20px]">{service.icon}</span>
                  </div>
                </div>
                <h3 className="text-[17px] font-black text-[#1a3c5a] mb-4 tracking-tight group-hover:text-[#1E6FA8] transition-colors duration-300">{service.title}</h3>
                <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-6 flex-1">{service.desc}</p>
                <div className="w-6 h-[2.5px] bg-[#1E6FA8]/20 group-hover:w-16 group-hover:bg-[#1E6FA8] transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. WHAT OUR CLIENTS SAY (NEW Testimonials) */}
      <section className="py-12 px-8 bg-[#F0F9FF] border-t border-[#1E6FA8]/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-[#1a3c5a] tracking-tight">What Our Clients Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Dr. Jonathan Reyes", role: "Head of R&D, AeroDynamics Corp", text: "Metatech's precision sectioning equipment has fundamentally changed our workflow. The absolute edge retention provides data clarity we've never seen before." },
              { name: "Sarah Lin", role: "Quality Assurance Director, Global Steel", text: "Operating in a high-density lab environment requires equipment that simply doesn't fail. Metatech delivers consistently robust performance." },
              { name: "Marcus Thorne", role: "Chief Metallurgist, Titanium Forge Inc.", text: "Their digital analysis integration is seamless. It transforms subjective imagery into rigorous, quantitative data. Truly excellent engineering." }
            ].map((testi, idx) => (
              <div key={idx} className="bg-white p-6 md:p-8 rounded-[12px] shadow-sm border border-slate-200 relative hover:shadow-lg transition-shadow duration-300">
                <span className="material-symbols-outlined absolute top-6 right-6 text-[#F0F9FF] text-[40px]">format_quote</span>
                <p className="text-[13px] text-slate-600 font-medium leading-relaxed mb-6 relative z-10 italic">"{testi.text}"</p>
                <div className="flex items-center gap-4 relative z-10 border-t border-slate-100 pt-6">
                  <div className="w-12 h-12 bg-[#F8FAFC] rounded-full border border-slate-200 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#1E6FA8]">person</span>
                  </div>
                  <div>
                    <h5 className="font-bold text-[#1a3c5a] text-[15px]">{testi.name}</h5>
                    <span className="text-[12px] font-medium text-slate-500 block mt-1">{testi.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PRE-FOOTER (Minor Enhancement) */}
      <section className="py-16 px-8 relative overflow-hidden bg-gradient-to-br from-[#1a3c5a] to-[#0d2238] text-white">
        <div className="absolute inset-0 opacity-[0.03] technical-grid"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="text-[32px] md:text-[48px] font-bold tracking-tighter mb-6 leading-tight">
            Request a Machine
          </h2>
          <p className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            Looking for the right solution for your lab or production line? Tell us your requirements and our engineers will recommend the ideal machine.
          </p>
          <div className="flex justify-center">
            <Link
              href="/rfq"
              className="bg-[#1E6FA8] text-white px-10 py-4 font-black tracking-[0.2em] text-sm hover:bg-white hover:text-[#1a3c5a] transition-all rounded-[4px] shadow-xl flex items-center gap-3 group"
            >
              Request quotation <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
