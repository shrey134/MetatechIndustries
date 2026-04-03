"use client";
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function ProductCard({ id, slug, title, name, category, series, description, image, inStock, level, type }) {
  const displayTitle = title || name;
  const detailLink = type === 'consumable' ? `/consumables/${slug || id}` : `/products/${slug || id}`;

  const detailsList = [
    category && category !== 'undefined' ? `Category: ${category}` : null,
    series && series !== 'undefined' ? `Series: ${series}` : null,
    `Unit ID: ${id || slug}`
  ].filter(Boolean);

  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const popupWidth = 280;
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
      className="relative group w-full h-full cursor-pointer"
    >
      {/* Whole card is a clickable Link — wraps the entire visual card */}
      <Link href={detailLink} className="block h-full">
        <div className="bg-gray-100 rounded-lg shadow-sm overflow-hidden flex flex-col h-full border border-gray-200 relative z-10 w-full transition-all duration-300 group-hover:border-[#1E6FA8]/30 group-hover:shadow-[0_8px_24px_rgba(30,111,168,0.10)]">

          {/* Product Image */}
          <div className="relative h-56 lg:h-64 w-full flex flex-col bg-gray-100 flex-shrink-0 z-10">
            <div className="w-full h-full flex items-center justify-center relative p-4 pb-14">
              <img
                alt={displayTitle}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
                src={image}
              />
            </div>

            {/* Flush footer with product title */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
              <div className="flex items-center justify-between gap-3 bg-white px-4 py-3 transition-all duration-300 border-t border-gray-100 group-hover:border-[#1E6FA8]/20 shadow-[-5px_0_15px_rgba(0,0,0,0.02)]">
                <h2 className="text-[20px] font-semibold text-[#1a3c5a] leading-tight flex-grow text-left group-hover:text-[#1E6FA8] transition-colors duration-300 mt-0.5">
                  {displayTitle}
                </h2>
                <div className="shrink-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#1a3c5a] text-[20px] group-hover:text-[#1E6FA8] group-hover:translate-x-1.5 transition-all duration-300 ease-out">
                    arrow_forward
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Fallback View */}
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
            <span className="w-full bg-white text-[#1E6FA8] text-xs font-bold py-3 rounded-sm flex items-center justify-center gap-1.5 border border-[#1E6FA8]">
              Get details <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </span>
          </div>
        </div>
      </Link>

      {/* Desktop Hover Pop-Out Panel — sits outside the Link to avoid nested anchor */}
      <div
        className={`hidden lg:flex absolute top-1/2 -translate-y-1/2 ${
          isFlipped ? "right-full mr-4" : "left-full ml-4"
        } w-[240px] bg-white border-2 border-[#1E6FA8]/35 shadow-[0_8px_28px_rgba(30,111,168,0.15)] rounded-lg opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-200 z-[100] p-4 flex-col`}
      >
        {/* Large triangle arrow */}
        {isFlipped ? (
          <div className="absolute top-1/2 -translate-y-1/2 -right-[26px] flex items-center">
            <div className="w-0 h-0
              border-t-[20px] border-t-transparent
              border-b-[20px] border-b-transparent
              border-l-[26px] border-l-[#1E6FA8]/60"
            />
          </div>
        ) : (
          <div className="absolute top-1/2 -translate-y-1/2 -left-[26px] flex items-center">
            <div className="w-0 h-0
              border-t-[20px] border-t-transparent
              border-b-[20px] border-b-transparent
              border-r-[26px] border-r-[#1E6FA8]/60"
            />
          </div>
        )}

        {/* Header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#1E6FA8]/15">
          <span className="w-3 h-[2px] bg-[#1E6FA8] rounded-full"></span>
          <h3 className="text-[10px] font-black text-[#1E6FA8] uppercase tracking-[0.18em]">
            Key specifications
          </h3>
        </div>

        {/* Specs list — fills vertical space */}
        <ul className="space-y-2.5 flex-1 mb-3">
          {detailsList.slice(0, 5).map((item, idx) => (
            <li key={idx} className="text-[12px] font-medium text-[#334155] flex items-start gap-2 leading-snug">
              <span className="min-w-[5px] h-[5px] bg-[#1E6FA8] rounded-full mt-[5px] shrink-0"></span>
              <span className="flex-grow">{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA at bottom */}
        <Link
          href={detailLink}
          className="w-full bg-[#1a3c5a] text-white text-[11px] font-bold py-3 rounded-sm hover:bg-[#1E6FA8] transition-colors duration-200 flex items-center justify-center gap-2 group/btn mt-auto"
          onClick={(e) => e.stopPropagation()}
        >
          View details
          <span className="material-symbols-outlined text-[14px] group-hover/btn:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
}
