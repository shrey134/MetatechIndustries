"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, mainConsumables } from "@/data/categories";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  // Include all products except those containing "analyzer" in the name
  const featuredProducts = products.filter(p =>
    p.image &&
    p.name &&
    !p.name.toLowerCase().includes('analyzer')
  );

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <div className="bg-white font-work-sans">
      {/* Hero Section - Refined Split Layout */}
      <section className="relative min-h-[60vh] flex items-start overflow-hidden bg-[#F8FAFC] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-8 pt-[6vh] pb-10 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
            {/* Left: Content */}
            <div className="max-w-2xl">
              {/* <span className="inline-block border-l-4 border-primary px-4 py-1 text-[11px] font-black tracking-[0.2em] text-primary mb-8">Engineering Innovation</span> */}
              <span className="inline-block text-sm md:text-base font-semibold tracking-[0.08em] text-primary mb-6">
                Precision Engineering & Excellence
                <span className="block w-12 h-[2px] bg-primary mt-2 text-left"></span>
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-[#1a3c5a] leading-[1.01] tracking-tighter mb-4 animate-in slide-in-from-left duration-700">
                Precision Engineering for Global Industries
              </h1>
              <p className="text-base md:text-lg text-slate-600 font-medium mb-10 leading-relaxed max-w-xl">
                Advanced materialography solutions designed for the most demanding metallurgical analysis environments. Engineering excellence in every micron.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link href="/products" className="bg-primary text-white px-10 py-5 font-medium text-sm tracking-widest flex items-center gap-3 hover:bg-[#004c6b] transition-all duration-300 shadow-xl shadow-primary/20 group">
                  Explore machinery <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
                <Link href="/contact" className="border-2 border-[#1a3c5a] text-[#1a3c5a] px-10 py-5 font-medium text-sm tracking-widest hover:bg-slate-50 transition-all duration-300">
                  Technical support
                </Link>
              </div>
            </div>

            {/* Right: Premium Image */}
            <div className="relative group max-w-lg mx-auto lg:ml-auto lg:mr-0">
              <div className="relative z-10 rounded-sm overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)] border-8 border-white bg-white aspect-[4/3] md:aspect-auto">
                <img
                  alt="Metatech Industrial Laboratory Asset"
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000"
                  src="/images/hosted_img_AB6AXuDm.png"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Portfolio Section */}
      <section className="pt-4 pb-8 md:pt-6 md:pb-10 max-w-[1240px] mx-auto px-6 md:px-8">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-100 pb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-[#1a3c5a] mb-2">Product Portfolio</h2>
            <div className="h-1.5 w-16 bg-primary"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              title: "Abrasive sectioning",
              desc: "High-performance cut-off machines for heavy-duty metal sampling.",
              icon: "precision_manufacturing",
              img: "/images/hosted_img_AB6AXuBg9.png"
            },
            {
              title: "Precision cutting",
              desc: "Micro-cutting systems for delicate electronic and ceramic parts.",
              icon: "content_cut",
              img: "/images/hosted_img_AB6AXuDen.png"
            },
            {
              title: "Hot mounting",
              desc: "Fully automated mounting presses for high-throughput labs.",
              icon: "layers",
              img: "/images/hosted_img_AB6AXuCXH.png"
            },
            {
              title: "Grinding & polishing",
              desc: "Systematic surface preparation from coarse to mirror finish.",
              icon: "shutter_speed",
              img: "/images/hosted_img_AB6AXuDXg.png"
            }
          ].map((cat, i) => (
            <Link key={i} href={`/products?category=${cat.title.toLowerCase().split(' ')[0]}`} className="group bg-slate-50 border border-[#1a3c5a]/20 hover:bg-white hover:border-[#1a3c5a]/40 transition-all duration-300 flex flex-col h-full rounded-none overflow-hidden">
              <div className="h-[180px] md:h-[200px] overflow-hidden bg-slate-100 border-b border-[#1a3c5a]/10 relative flex items-center justify-center">
                <img
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                  src={cat.img}
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-[8px] mb-2">
                  <span className="material-symbols-outlined text-primary text-base flex-shrink-0">{cat.icon}</span>
                  <h3 className="text-[16px] font-black text-[#1a3c5a] tracking-tight first-letter:uppercase leading-tight">{cat.title}</h3>
                </div>
                <p className="text-[14px] text-slate-500 leading-relaxed mb-5 flex-1 first-letter:uppercase line-clamp-3">{cat.desc}</p>
                <div className="text-primary font-black text-[10px] tracking-widest flex items-center gap-1 group/cta">
                  Explore <span className="material-symbols-outlined text-[12px] group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Explore Our Machines Section */}
      <section className="bg-[#f8fafc] pt-8 pb-12 md:pt-10 md:pb-16 border-y border-slate-100 overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-6 md:px-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 pb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-[#1a3c5a] mb-2">Explore Our Machines</h2>
              <div className="h-1.5 w-16 bg-primary"></div>
              <p className="text-[14px] text-slate-500 font-bold tracking-[0.1em] mt-4">Engineered for precision and performance</p>
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes scrollMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            will-change: transform;
            animation: scrollMarquee 1000s linear infinite;
          }
          .marquee-container {
            display: flex;
            width: 100%;
          }
          @media (hover: hover) and (pointer: fine) {
            .marquee-container:hover .animate-marquee {
              animation-play-state: paused;
            }
          }
          .hover-panel {
            opacity: 0;
            visibility: hidden;
            transform: translateX(10px);
            transition: all 250ms ease-out;
            transition-delay: 200ms;
          }
          .card-group:hover .hover-panel {
            opacity: 1;
            visibility: visible;
            transform: translateX(0);
            transition-delay: 180ms;
          }
          .card-group {
            z-index: 10;
            transition: transform 250ms ease-out 200ms, box-shadow 250ms ease-out 200ms, border-color 250ms ease-out 200ms, opacity 250ms ease-out 200ms, z-index 0ms linear 450ms;
          }
          .card-group:hover {
            z-index: 50;
            transition: transform 250ms ease-out 180ms, box-shadow 250ms ease-out 180ms, border-color 250ms ease-out 180ms, opacity 250ms ease-out 180ms, z-index 0ms linear 180ms;
          }
          @media (max-width: 1024px) {
            .marquee-container {
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              -webkit-overflow-scrolling: touch;
              padding-bottom: 2rem;
            }
            .marquee-container::-webkit-scrollbar { display: none; }
            .animate-marquee { animation: none; }
            .animate-marquee > div { scroll-snap-align: center; }
          }
        `}} />

        <div className="w-full relative marquee-container overflow-visible mt-2">
          <div className="animate-marquee gap-8 pr-8 shrink-0">
            {[...featuredProducts, ...featuredProducts].map((product, i) => {
              const titleCase = product.name.charAt(0).toUpperCase() + product.name.slice(1).toLowerCase();
              return (
                <div
                  key={`${product.slug}-${i}`}
                  className="card-group relative flex bg-white border border-slate-200/60 w-[240px] md:w-[280px] shrink-0 hover:scale-[1.03] hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.15)] hover:border-[#1a3c5a]/30"
                >
                  <div className="flex flex-col w-full">
                    <div className="h-[200px] md:h-[240px] w-full bg-slate-50 flex items-center justify-center relative overflow-hidden">
                      <img
                        src={product.image || product.images?.[0]}
                        alt={product.name}
                        className="w-full h-full object-contain p-0 m-0 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 border-t border-slate-100">
                      <h3 className="text-[13px] font-black tracking-tight text-[#1a3c5a] line-clamp-1">
                        {titleCase}
                      </h3>
                    </div>
                  </div>

                  <div className="hover-panel absolute left-full top-0 h-full w-[200px] bg-white border border-slate-200 shadow-2xl z-[60] p-5 hidden lg:flex flex-col border-l-0">
                    <h4 className="text-[10px] font-black text-primary tracking-[0.15em] mb-4 border-b border-slate-100 pb-2">Key Specifications</h4>
                    <div className="flex flex-col gap-2.5 mb-5 text-[10px]">
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-400 font-bold">Category</span>
                        <span className="text-[#1a3c5a] font-bold line-clamp-1 first-letter:uppercase">{(product.categorySlug || '').replace(/-/g, ' ').toLowerCase() || "Precision machine"}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-400 font-bold">Series</span>
                        <span className="text-[#1a3c5a] font-bold line-clamp-1">Standard industrial</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[8px] text-slate-400 font-bold">Unit ID</span>
                        <span className="text-slate-600 font-mono font-bold line-clamp-1">MT-{product.slug?.toUpperCase().split('-')[0] || 'GEN'}</span>
                      </div>
                    </div>

                    <h4 className="text-[9px] font-black text-slate-400 tracking-[0.15em] mb-3 pb-1">Technical Data</h4>
                    <div className="flex flex-col gap-2.5 mb-2 text-[10px]">
                      {product.specifications?.slice(0, 2).map((spec, idx) => (
                        <div key={idx} className="flex flex-col">
                          <span className="text-[8px] text-slate-400 font-bold line-clamp-1">{spec.param}</span>
                          <span className="text-[#1a3c5a] font-bold line-clamp-1">{spec.value}</span>
                        </div>
                      )) || (
                          <>
                            <div className="flex flex-col">
                              <span className="text-[8px] text-slate-400 font-bold uppercase line-clamp-1">Power</span>
                              <span className="text-[#1a3c5a] font-bold line-clamp-1">2.2 kW / 3 HP</span>
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[8px] text-slate-400 font-bold uppercase line-clamp-1">Operation</span>
                              <span className="text-[#1a3c5a] font-bold line-clamp-1">Automatic</span>
                            </div>
                          </>
                        )}
                    </div>

                    <Link
                      href={`/products/${product.slug}`}
                      className="mt-auto group/btn flex items-center justify-between bg-[#1a3c5a] text-white px-3 py-2.5 text-[9px] font-black tracking-widest hover:bg-primary transition-all"
                    >
                      Get details <span className="material-symbols-outlined text-[12px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                  </div>
                  <style jsx>{`
                    .marquee-container:hover .card-group:not(:hover) { opacity: 0.9; }
                  `}</style>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Consumables Section */}
      <section className="py-12 md:py-16 max-w-[1240px] mx-auto px-6 md:px-8 border-t border-slate-100">
        <div className="mb-10 text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-[#1a3c5a] mb-2">Laboratory Consumables</h2>
          <div className="h-1.5 w-16 bg-primary mx-auto lg:mx-0"></div>
          <p className="text-slate-500 text-sm font-medium mt-4 max-w-2xl mx-auto lg:mx-0 tracking-widest">High-quality preparation accessories for precise materialography</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainConsumables.map((cat, idx) => (
            <div key={idx} className="group flex flex-col justify-between bg-white border border-[#e5e7eb] rounded-lg p-4 h-auto shadow-sm hover:shadow-md transition-all duration-300">
              <div>
                <span className="material-symbols-outlined text-3xl text-slate-300 group-hover:text-primary transition-colors mb-2.5 block">{cat.icon}</span>
                <h3 className="text-[16px] font-semibold text-[#1a1a1a] mb-2 line-clamp-2 leading-snug">
                  {cat.title}
                </h3>
                <p className="text-[13px] text-[#555] mb-3 leading-relaxed">Industrial grade standards</p>
              </div>
              <Link href={`/products?category=consumables&subcategory=${cat.slug}`} className="text-[13px] font-semibold text-[#0077cc] hover:underline flex items-center gap-2 group-hover:gap-2.5 transition-all w-fit mt-auto">
                Explore range <span className="material-symbols-outlined text-[16px] transition-transform">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Pre-Footer (Quote Request) */}
      <section className="bg-blue-50 py-16 text-center lg:text-left relative border-t border-slate-100">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h2 className="text-[24px] md:text-[32px] font-black text-[#1a3c5a] tracking-tight leading-none mb-3">
              Request a Machine
            </h2>
            <p className="text-slate-500 text-[13px] md:text-sm font-medium leading-relaxed">
              Looking for the right solution for your lab or production line? Tell us your requirements and our engineers will recommend the ideal machine.
            </p>
          </div>
          <Link
            href="/rfq"
            className="shrink-0 bg-primary text-white px-8 py-4 font-medium text-[14px] tracking-[0.2m] transition-all duration-400 group flex items-center gap-3 shadow-xl shadow-primary/20"
          >
            Request quotation <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#f8fafc] py-14 border-t border-slate-100">
        <div className="max-w-[1300px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center border border-slate-200/60 p-8 shadow-sm bg-white">
          <div>
            <h3 className="text-[#1a3c5a] text-xl font-black mb-2 tracking-tight">Stay Ahead in Industry 4.0</h3>
            <p className="text-slate-500 text-[13px] font-medium leading-relaxed max-w-sm">
              Receive monthly insights on metallurgical preparing and materialography trends from our global engineering network.
            </p>
          </div>
          <div className="relative">
            {status === "success" ? (
              <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 p-4 font-bold text-[13px] tracking-widest flex items-center justify-center gap-3 animate-in fade-in zoom-in duration-500">
                <span className="material-symbols-outlined">check_circle</span>
                Subscription confirmed
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-0">
                <input
                  className={`flex-1 bg-slate-50 border ${status === 'error' ? 'border-red-500' : 'border-slate-200'} text-[#1a3c5a] text-[13px] font-medium focus:border-primary focus:ring-0 focus:outline-none px-5 py-4 min-w-0 transition-colors`}
                  placeholder="Corporate email address"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  disabled={status === "loading"}
                  required
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[#1a3c5a] text-white px-8 font-medium text-[14px] py-4 hover:bg-primary transition-all whitespace-nowrap disabled:bg-slate-400 flex items-center justify-center min-w-[150px]"
                >
                  {status === "loading" ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : "Join network"}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="absolute -bottom-6 left-0 text-[10px] text-red-500 font-bold tracking-widest">Please enter a valid email address</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
