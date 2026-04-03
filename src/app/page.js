"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MarqueeProductCard from "@/components/MarqueeProductCard";
import { products, mainConsumables } from "@/data/categories";

const sliderImages = [
  "/bgremoved%20homepage%20slider%20images/autocut-removebg-preview.png",
  "/bgremoved%20homepage%20slider%20images/autopol-ii-removebg-preview.png",
  "/bgremoved%20homepage%20slider%20images/electro-hydraulic-press-removebg-preview.png",
  "/bgremoved%20homepage%20slider%20images/metagraph-I-removebg-preview.png",
  "/bgremoved%20homepage%20slider%20images/metacut1-removebg-preview.png",
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000); // Changed from 10000 to 5000 (5 seconds)
    return () => clearInterval(interval);
  }, []);

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
      {/* Hero Section - Stabilized Split Layout */}
      <section className="relative min-h-[60vh] md:min-h-[650px] flex items-center overflow-hidden bg-[#F8FAFC] border-b border-slate-100 py-12 md:py-0">
        <div className="max-w-7xl mx-auto px-8 w-full relative z-10 lg:-translate-y-12 transition-transform duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
            {/* Left: Content */}
            <div className="max-w-2xl">
              {/* <span className="inline-block border-l-4 border-primary px-4 py-1 text-[11px] font-black tracking-[0.2em] text-primary mb-8">Engineering Innovation</span> */}
              <span className="inline-block text-sm md:text-base font-semibold tracking-[0.08em] text-primary mb-6">
                Precision Engineering & Excellence
                <span className="block w-12 h-[2px] bg-primary mt-2 text-left"></span>
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-[#1a3c5a] leading-[1.01] tracking-tighter mb-4">
                Precision Engineering for Global Industries
              </h1>
              <p className="text-base md:text-lg text-slate-600 font-medium mb-10 leading-relaxed max-w-xl">
                40 years of experience in developing and manufacturing high end metallography and other material testing machines.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link href="/products" className="bg-[#00658d] text-white px-10 py-5 font-medium text-sm tracking-widest flex items-center gap-3 hover:bg-[#004c6b] transition-all duration-300 shadow-xl shadow-[#00658d]/20 group">
                  Explore machinery <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
                <Link href="/contact" className="border-2 border-[#1a3c5a] text-[#1a3c5a] px-10 py-5 font-medium text-sm tracking-widest hover:bg-slate-50 transition-all duration-300">
                  Technical support
                </Link>
              </div>
            </div>

            {/* Right Side: Hero Slider (Stabilized Premium Frame) */}
            <div className="relative group w-full max-w-lg mx-auto lg:ml-auto lg:mr-0 flex items-center justify-center pt-8 lg:pt-0">
              <div className="relative z-10 rounded-sm overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.12)] border-8 border-white bg-gradient-to-br from-slate-50 to-white flex items-center justify-center h-[420px] md:h-[480px] w-full">
                {sliderImages.map((img, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 w-full h-full flex items-center justify-center p-6 md:p-10 transition-opacity duration-700 ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                      }`}
                  >
                    <img
                      src={img}
                      alt="Metatech Asset"
                      className="max-w-[85%] max-h-[85%] object-contain drop-shadow-2xl"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#00658d]/5 rounded-full blur-3xl -z-10"></div>
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
              img: "/bgremoved%20homepage%20slider%20images/autocut-removebg-preview.png"
            },
            {
              title: "Precision cutting",
              desc: "Micro-cutting systems for delicate electronic and ceramic parts.",
              icon: "content_cut",
              img: "/bgremoved%20homepage%20slider%20images/metacut1-removebg-preview.png"
            },
            {
              title: "Hot mounting",
              desc: "Fully automated mounting presses for high-throughput labs.",
              icon: "layers",
              img: "/bgremoved%20homepage%20slider%20images/electro-hydraulic-press-removebg-preview.png"
            },
            {
              title: "Grinding & polishing",
              desc: "Systematic surface preparation from coarse to mirror finish.",
              icon: "shutter_speed",
              img: "/bgremoved%20homepage%20slider%20images/autopol-ii-removebg-preview.png"
            }
          ].map((cat, i) => (
            <Link key={i} href={`/products?category=${cat.title.toLowerCase().split(' ')[0]}`} className="group bg-slate-50 border border-[#1a3c5a]/10 hover:bg-white hover:border-[#1a3c5a]/30 transition-all duration-300 flex flex-col h-full rounded-none overflow-hidden hover:shadow-lg shadow-sm">
              <div className="h-[180px] md:h-[200px] overflow-hidden bg-white border-b border-[#1a3c5a]/5 relative flex items-center justify-center p-2">
                <img
                  alt={cat.title}
                  className="w-full h-full object-contain scale-[1.10] group-hover:scale-[1.20] transition-all duration-500 drop-shadow-md"
                  src={cat.img}
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-[8px] mb-2">
                  <span className="material-symbols-outlined text-primary text-base flex-shrink-0">{cat.icon}</span>
                  <h3 className="text-[16px] font-black text-[#1a3c5a] tracking-tight first-letter:uppercase leading-tight">{cat.title}</h3>
                </div>
                <p className="text-[14px] text-slate-500 leading-relaxed mb-5 flex-1 first-letter:uppercase line-clamp-3">{cat.desc}</p>
                <div className="text-primary font-black text-[13px] tracking-widest flex items-center gap-2 group/cta">
                  Explore Catalogue <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
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
          .hp-hover-panel {
            opacity: 0;
            visibility: hidden;
            transition: opacity 200ms ease-out, visibility 200ms ease-out;
            pointer-events: none;
          }
          .hp-card-group:hover .hp-hover-panel {
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
          }
          .hp-card-group {
            z-index: 10;
          }
          .hp-card-group:hover {
            z-index: 50;
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
            {[...featuredProducts, ...featuredProducts].map((product, i) => (
              <MarqueeProductCard key={`${product.slug}-${i}`} product={product} />
            ))}

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[
            {
              title: "Cutting/Sectioning Consumables",
              slug: "cutting-sectioning",
              img: "/cutting/automatic-cutting-machines/consumables/cutting-wheel.png",
              features: ["Burn-free abrasive sectioning", "High-life Diamond wafering blades", "Rust-resistant cooling fluids"]
            },
            {
              title: "Moulding Consumables",
              slug: "moulding",
              img: "/consumables images/bakelite or phenolic hot moulding powder.png",
              features: ["Superior edge retention powders", "Fast-curing cold mount systems", "High-hardness conductive resins"]
            },
            {
              title: "Grinding Consumables",
              slug: "grinding",
              img: "/consumables images/abrasive grinding disc.png",
              features: ["Waterproof SiC abrasive discs", "Metal/Resin bonded Diamond discs", "Magnetic fixation system compatibility"]
            },
            {
              title: "Polishing Consumables",
              slug: "polishing",
              img: "/consumables images/diamond paste monocrystalline.png",
              features: ["Monocrystalline Diamond pastes", "Non-coagulating Colloidal silica", "High-nap technical polishing cloths"]
            },
            {
              title: "In-Situ Metallography",
              slug: "in-situ-metallography",
              img: "/consumables images/replica.png",
              features: ["Self-adhesive replica tapes", "High-gain reflecting replicas", "Etching & cleaning chemicals"]
            },
            {
              title: "Millipore Analysis",
              slug: "millipore-fluid-contamination-analysis",
              img: "/consumables images/vacuum-pressure-pump.png",
              features: ["Precision vacuum/pressure pumps", "Solvent filtering dispensers", "High-retention filter papers"]
            },
            {
              title: "Hardness Testing",
              slug: "hardness-testing",
              img: "/consumables images/abrasive grinding disc.png",
              features: ["Wet/Dry SiC grinding discs", "Standardized test blocks", "Indenter protection accessories"]
            },
            {
              title: "Magnetic Particle (MPI)",
              slug: "magnetic-particle-inspection",
              img: "/consumables images/grinding disc and polishing cloths.png",
              features: ["Fluorescent magnetic powders", "High-viscosity MPI carrier oils", "UV-LED inspection lamps"]
            }
          ].map((cat, idx) => (
            <div key={idx} className="group flex flex-col md:flex-row bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:bg-white hover:border-primary/30 transition-all duration-500 shadow-sm hover:shadow-xl">
              {/* Image Side - Zoomed View */}
              <div className="w-full md:w-[150px] lg:w-[180px] bg-white border-b md:border-b-0 md:border-r border-slate-100 flex items-center justify-center p-4 overflow-hidden relative">
                <img
                  src={cat.img}
                  alt={cat.title}
                  className="w-full h-full object-contain mix-blend-multiply scale-[1.35] group-hover:scale-[1.50] transition-transform duration-700"
                />
              </div>

              {/* Info Side */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-[18px] font-black text-[#1a3c5a] tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-1 leading-tight">
                    {cat.title}
                  </h3>
                  <div className="h-[2px] w-10 bg-primary/40 rounded-full"></div>
                </div>

                <div className="space-y-3 mb-6 flex-1">
                  <ul className="space-y-2.5">
                    {cat.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-slate-700 font-medium leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 flex-shrink-0"></span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={`/products?category=consumables&subcategory=${cat.slug}`} className="text-[#1E6FA8] text-[13px] font-black tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all w-fit group/btn">
                  Explore Range <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
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
