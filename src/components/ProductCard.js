"use client";
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function ProductCard({ id, slug, title, name, category, series, description, image, inStock, level, type }) {
  const displayTitle = title || name;
  const stockLabel = inStock === 'true' ? 'In stock' : inStock === 'limited' ? 'Limited stock' : 'Special order';
  const detailLink = type === 'consumable' ? `/consumables/${slug || id}` : `/products/${slug || id}`;

  // Deriving "keywords" equivalent from existing props as requested
  const detailsList = [
    category && category !== 'undefined' ? `Category: ${category}` : null,
    series && series !== 'undefined' ? `Series: ${series}` : null,
    // stockLabel ? `Availability: ${stockLabel}` : null,
    `Unit ID: ${id || slug}`
  ].filter(Boolean);

  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const popupWidth = 280; // approximate width + margin
      if (rect.right + popupWidth > window.innerWidth) {
        setIsFlipped(true);
      } else {
        setIsFlipped(false);
      }
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      className="relative group w-full h-full"
    >

      {/* Visual Card Container - Removed zoom/lift effects */}
      <div className="bg-gray-100 rounded-lg shadow-sm overflow-hidden flex flex-col h-full border border-gray-200 relative z-10 w-full">
        <Link href={detailLink} className="relative h-56 lg:h-64 w-full flex flex-col bg-gray-100 flex-shrink-0 z-10">

          {/* Main Product Image centered with bottom padding for footer fitting */}
          <div className="w-full h-full flex items-center justify-center relative p-4 pb-14">
            <img
              alt={displayTitle}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
              src={image}
            />
          </div>

          {/* Structural Fitting Flush Footer - Merged Name & Simplified CTA */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <div className="flex items-center justify-between gap-3 bg-white px-4 py-3 transition-all duration-300 border-t border-gray-100 group-hover:border-[#1E6FA8]/20 shadow-[-5px_0_15px_rgba(0,0,0,0.02)]">
              <h2 className="text-[14px] font-black text-[#1a3c5a] leading-tight flex-grow text-left group-hover:text-[#1E6FA8] transition-colors duration-300">
                {displayTitle}
              </h2>
              
              <div className="shrink-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#1a3c5a] text-[20px] group-hover:text-[#1E6FA8] group-hover:translate-x-1.5 transition-all duration-300 ease-out">
                  arrow_forward
                </span>
              </div>
            </div>
          </div>
        </Link>
        
        {/* 2. Mobile Fallback View (Expanded Content below image) */}
        <div className="lg:hidden bg-white p-5 flex flex-col flex-grow border-t border-gray-200">
          <ul className="space-y-2.5 mb-5 flex-grow">
            {detailsList.map((item, idx) => (
              <li key={idx} className="text-[12px] text-gray-600 flex items-start gap-2 border-b border-gray-50 pb-2 last:border-none">
                <span className="min-w-[4px] h-[4px] bg-[#1E6FA8] rounded-full mt-1.5"></span>
                <span className="font-medium text-gray-800">{item.split(':')[0]}:</span>
                <span>{item.split(':')[1]}</span>
              </li>
            ))}
          </ul>
          <Link href={detailLink} className="w-full bg-white text-[#1E6FA8] text-xs font-bold py-3 rounded-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5 border border-[#1E6FA8]">
            Get details <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* 3. Desktop Hover Pop-Out Panel - Premium Refined Version */}
      <div 
        className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 ${
          isFlipped ? "right-[100%] mr-[10px]" : "left-[100%] ml-[10px]"
        } w-[240px] bg-gradient-to-br from-[#f8fafc] to-[#eef2f7] border border-[#e2e8f0] shadow-[0_12px_32px_rgba(0,0,0,0.08)] rounded-[12px] opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 ${
          isFlipped ? "translate-x-3" : "-translate-x-3"
        } group-hover:translate-x-0 scale-95 group-hover:scale-100 transition-all duration-400 ease-out z-[100] p-5 flex-col overflow-hidden group/panel hover:-translate-y-[2px] hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]`}
      >
        {/* Connector Notch */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#f8fafc] rotate-45 z-0 border-[#e2e8f0] ${
            isFlipped 
              ? "-right-[9px] border-r border-t" 
              : "-left-[9px] border-l border-b"
          }`}
        ></div>

        {/* Subtle Visual Accent (Soft Highlight) */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#1E6FA8] opacity-[0.03] blur-3xl rounded-full pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-10 h-[2px] bg-[#1E6FA8]/40 rounded-full"></span>
            <h3 className="text-[12px] font-semibold text-[#1a3c5a] uppercase tracking-[0.15em]">
              Key specifications
            </h3>
          </div>
          
          <ul className="space-y-4 mb-4">
            {detailsList.slice(0, 5).map((item, idx) => (
              <li key={idx} className="text-[13px] font-medium text-[#475569] flex items-start gap-3 leading-[1.65]">
                <span className="min-w-[6px] h-[6px] bg-[#1E6FA8]/60 rounded-full mt-[7px] shadow-sm"></span>
                <span className="flex-grow">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Link 
          href={detailLink} 
          className="relative z-10 w-full bg-[#1a3c5a] text-white text-[12px] font-bold py-3.5 mt-4 rounded-sm hover:bg-[#1E6FA8] hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(30,111,168,0.3)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
        >
          View details 
          <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
}
