"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dropdownData from '@/data/categories.json';
import consumablesData from '@/data/consumables.json';

export default function Navbar() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const menuRef = useRef(null);
  const pathname = usePathname();

  const isProductsActive = pathname?.startsWith('/products');

  const toSentenceCase = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };


  // Unified list for tabs
  const tabs = [
    ...dropdownData,
    { title: "Consumables", slug: "consumables", categories: consumablesData.map(c => ({ name: c.title, subcategories: c.items, slug: c.slug, icon: c.icon })) }
  ];

  const handleTabClick = (idx) => {
    setActiveGroup(idx);
    setActiveAccordion(null);
  };

  const toggleAccordion = (name) => {
    setActiveAccordion(activeAccordion === name ? null : name);
  };

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsProductsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#e5e7eb] h-20 flex items-center shadow-none" ref={menuRef}>
      <div className="flex justify-between items-center w-full px-8 max-w-[1920px] mx-auto h-full">
        <div className="flex items-center h-full">
          <Link href="/" className="flex items-center shrink-0">
            <Image 
              src="/images/metatech_logo.png" 
              alt="Metatech Industries Logo" 
              width={180} 
              height={40} 
              className="object-contain h-10 w-auto"
              priority
            />
          </Link>
        </div>
        <div className="flex items-center gap-10 h-full">
          <nav className="hidden lg:flex items-center gap-8 h-full font-sans text-sm font-medium tracking-tight">
            <div className="relative flex items-center h-full">
              <div className="flex items-center gap-1 group">
                <Link 
                  href="/products"
                  className={`relative flex items-center py-1 transition-colors ${isProductsActive ? 'text-[#1a3c5a]' : 'text-[#374151] hover:text-[#1a3c5a]'}`}
                  onClick={() => setIsProductsOpen(false)}
                >
                  Products
                  {/* Underline for Active/Hover state */}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#1E6FA8] transition-all duration-300 ${isProductsActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsProductsOpen(!isProductsOpen);
                  }}
                  className={`flex items-center p-1 transition-colors ${isProductsOpen ? 'text-[#1a3c5a]' : 'text-[#374151] hover:text-[#1a3c5a]'}`}
                  aria-expanded={isProductsOpen}
                  aria-label="Toggle products dropdown"
                >
                  <span className={`material-symbols-outlined text-[18px] transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`}>
                    keyboard_arrow_down
                  </span>
                </button>
              </div>
            </div>

            {[
              { label: "Accolades", path: "/accolades" },
              { label: "Courses", path: "/courses" },
              { label: "About Us", path: "/about" }
            ].map((link, idx) => {
              const active = pathname?.startsWith(link.path);
              return (
                <Link 
                  key={idx} 
                  href={link.path} 
                  className={`group relative flex items-center py-1 transition-colors whitespace-nowrap ${active ? 'text-[#1a3c5a]' : 'text-[#374151] hover:text-[#1a3c5a]'}`}
                >
                  {link.label}
                  {/* Active/Hover Underline */}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#1E6FA8] transition-all duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/rfq" className="bg-[#1a3c5a] text-white px-5 py-2 text-[11px] font-bold tracking-wider rounded-[4px] hover:bg-[#122b42] transition-colors">
              Request quote
            </Link>
            <Link href="/contact" className="hidden sm:inline-flex border border-[#1a3c5a] text-[#1a3c5a] bg-white px-5 py-2 text-[11px] font-bold tracking-wider rounded-[4px] hover:bg-slate-50 transition-colors">
              Contact us
            </Link>
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      <div 
        className={`absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-[1100px] bg-white border border-[#eee] shadow-2xl rounded-b-lg overflow-hidden flex flex-col z-50 transition-all duration-300 ease-out origin-top ${isProductsOpen ? 'opacity-100 translate-y-0 visible pointer-events-auto' : 'opacity-0 -translate-y-3 invisible pointer-events-none'}`}
      >
            
            {/* Top Category Tabs (Fixed at Top) */}
            <div className="flex flex-wrap border-b border-[#eee] bg-white p-1">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTabClick(idx)}
                  className={`px-4 py-3 text-[11px] font-bold tracking-wider transition-all duration-200 border-b-2 m-0.5 rounded-sm whitespace-nowrap ${
                    activeGroup === idx 
                      ? 'text-[#1a3c5a] border-[#1a3c5a] bg-slate-50' 
                      : 'text-[#94a3b8] border-transparent hover:text-[#1a3c5a] hover:bg-slate-50/50'
                  }`}
                >
                  {toSentenceCase(tab.title)}
                </button>
              ))}
            </div>

            {/* Dynamic Content Area (Scrollable) */}
            <div className="flex flex-col md:flex-row overflow-y-auto max-h-[70vh] category-scroll bg-white">
              {/* Accordion for Subcategories (Left Column) */}
              <div className="w-full md:w-1/2 p-6 border-r border-[#eee]">
                <div className="space-y-1.5">
                  {tabs[activeGroup].categories.map((category, cIdx) => (
                    <div key={cIdx} className="border border-[#f1f5f9] rounded-sm overflow-hidden">
                      <button
                        onClick={() => toggleAccordion(category.name)}
                        className={`w-full flex items-center justify-between p-4 text-left transition-colors duration-200 ${
                          activeAccordion === category.name 
                            ? 'bg-slate-50 text-[#1a3c5a] border-l-4 border-l-[#1a3c5a]' 
                            : 'hover:bg-slate-50/50 text-[#475569]'
                        }`}
                      >
                        <span className="font-bold text-[12px] tracking-wider capitalize flex items-center gap-2">
                          {category.icon && (
                            <span className="material-symbols-outlined text-[18px] leading-none text-[#1E6FA8]">
                              {category.icon}
                            </span>
                          )}
                          {category.name}
                        </span>
                        <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${activeAccordion === category.name ? 'rotate-180' : ''}`}>
                          expand_more
                        </span>
                      </button>
                      
                      {/* Accordion Content */}
                      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        activeAccordion === category.name ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="p-4 bg-white grid grid-cols-1 gap-1">
                          {category.subcategories.map((sub, sIdx) => {
                            const isConsumable = tabs[activeGroup].title === "Consumables";
                            const basePath = isConsumable ? '/consumables' : '/products';
                            return (
                              <Link 
                                key={sIdx}
                                href={`${basePath}/${sub.slug}`}
                                className="flex items-center gap-2.5 px-3 py-2 rounded transition-all text-[#64748b] hover:text-[#1a3c5a] hover:bg-slate-50 group"
                                onClick={() => setIsProductsOpen(false)}
                              >
                                <div className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-[#1a3c5a] transition-all"></div>
                                <span className="text-[13px] font-medium leading-tight">
                                  {sub.name}
                                </span>
                              </Link>
                            );
                          })}
                          <Link 
                            href={`/products?category=${tabs[activeGroup].slug}&subcategory=${category.slug}`}
                            className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1a3c5a] hover:underline px-3 opacity-80 hover:opacity-100"
                            onClick={() => setIsProductsOpen(false)}
                          >
                            Explore {category.name.toLowerCase()} range
                            <span className="material-symbols-outlined text-xs">chevron_right</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column (Minimal Info Section) */}
              <div className="w-full md:w-1/2 p-12 bg-slate-50/20 flex flex-col justify-center items-start text-left">
                <h3 className="text-[#1a3c5a] text-2xl font-light mb-4 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#1a3c5a]"></span>
                  {toSentenceCase(tabs[activeGroup].title)}
                </h3>
                <p className="text-[#64748b] text-[14px] leading-relaxed max-w-[320px] mb-8 font-sans">
                  {activeGroup === tabs.length - 1 
                    ? "Specially formulated consumables and accessories designed to ensure precision and reliability in your material preparation workflows."
                    : `High-performance industrial solutions for ${tabs[activeGroup].title.toLowerCase()}. Engineered for durability, accuracy, and ease of use in professional laboratories.`
                  }
                </p>
                <div className="flex flex-col gap-3 w-full max-w-[180px]">
                   <Link 
                    href={`/products?category=${tabs[activeGroup].slug}`} 
                    className="bg-[#1a3c5a] text-white px-5 py-2.5 text-[10px] font-extrabold tracking-[0.1em] rounded-sm hover:bg-[#122b42] transition-colors text-center"
                    onClick={() => setIsProductsOpen(false)}
                  >
                    View selection
                  </Link>
                   <Link 
                    href="/contact" 
                    className="border border-[#1a3c5a]/20 text-[#1a3c5a] bg-white px-5 py-2.5 text-[10px] font-extrabold tracking-[0.1em] rounded-sm hover:bg-slate-50 transition-colors text-center"
                    onClick={() => setIsProductsOpen(false)}
                  >
                    Request demo
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-white border-t border-[#eee] px-8 py-4 flex justify-between items-center text-[12px]">
              <div className="flex items-center gap-2 text-[#94a3b8]">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>ISO certified solutions</span>
              </div>
              <p className="text-[#64748b] font-medium">
                © {new Date().getFullYear()} Metatech Industries • Quality engineered
              </p>
            </div>
        </div>
    </header>
  );
}
