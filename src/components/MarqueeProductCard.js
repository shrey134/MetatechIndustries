"use client";
import Link from 'next/link';
import { useState, useRef } from 'react';

export default function MarqueeProductCard({ product }) {
  const titleCase = product.name.charAt(0).toUpperCase() + product.name.slice(1).toLowerCase();
  const detailHref = `/products/${product.slug}`;

  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const panelWidth = 250; // panel width + margin
      const safetyMargin = 16;
      if (rect.right + panelWidth + safetyMargin > window.innerWidth) {
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
      className="hp-card-group relative flex shrink-0 w-[240px] md:w-[280px] cursor-pointer"
    >
      {/* Full card is a clickable Link */}
      <Link
        href={detailHref}
        className="flex flex-col w-full bg-white border border-slate-200/60 transition-all duration-300 hover:border-[#1E6FA8]/40 hover:shadow-[0_12px_32px_rgba(30,111,168,0.12)]"
      >
        <div className="h-[200px] md:h-[240px] w-full bg-slate-50 flex items-center justify-center relative overflow-hidden">
          <img
            src={product.image || product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-contain p-0 m-0 transition-transform duration-500"
          />
        </div>
        <div className="p-4 border-t border-slate-100">
          <h3 className="text-[20px] font-semibold tracking-tight text-[#1a3c5a] line-clamp-2 leading-snug">
            {titleCase}
          </h3>
        </div>
      </Link>

      {/* Hover Panel — outside Link to avoid nested anchor */}
      <div
        className={`hp-hover-panel absolute top-1/2 -translate-y-1/2 ${
          isFlipped
            ? 'right-full mr-4'
            : 'left-full ml-4'
        } w-[230px] bg-white border-2 border-[#1E6FA8]/35 shadow-[0_8px_28px_rgba(30,111,168,0.15)] rounded-lg z-[60] p-5 hidden lg:flex flex-col`}
      >
        {/* Triangle arrow — flips direction based on panel side */}
        {isFlipped ? (
          // Arrow on RIGHT side of panel (pointing right → card)
          <div className="absolute top-1/2 -translate-y-1/2 -right-[26px] w-0 h-0
            border-t-[20px] border-t-transparent
            border-b-[20px] border-b-transparent
            border-l-[26px] border-l-[#1E6FA8]/55"
          />
        ) : (
          // Arrow on LEFT side of panel (pointing left ← card)
          <div className="absolute top-1/2 -translate-y-1/2 -left-[26px] w-0 h-0
            border-t-[20px] border-t-transparent
            border-b-[20px] border-b-transparent
            border-r-[26px] border-r-[#1E6FA8]/55"
          />
        )}

        {/* Panel header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#1E6FA8]/15">
          <span className="w-3 h-[2px] bg-[#1E6FA8] rounded-full"></span>
          <h4 className="text-[11px] font-black text-[#1E6FA8] uppercase tracking-[0.18em]">Key Specifications</h4>
        </div>

        {/* Spec rows */}
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] text-slate-500 font-medium">Category</span>
            <span className="text-[16px] font-semibold text-[#1a3c5a] line-clamp-1 first-letter:uppercase">
              {(product.categorySlug || '').replace(/-/g, ' ').toLowerCase() || 'Precision machine'}
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] text-slate-500 font-medium">Series</span>
            <span className="text-[16px] font-semibold text-[#1a3c5a] line-clamp-1">Standard industrial</span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[13px] text-slate-500 font-medium">Unit ID</span>
            <span className="text-[16px] font-semibold text-[#1a3c5a] font-mono line-clamp-1">
              MT-{product.slug?.toUpperCase().split('-')[0] || 'GEN'}
            </span>
          </div>
          {product.specifications?.slice(0, 2).map((spec, idx) => (
            <div key={idx} className="flex flex-col gap-0.5">
              <span className="text-[13px] text-slate-500 font-medium line-clamp-1">{spec.param}</span>
              <span className="text-[16px] font-semibold text-[#1a3c5a] line-clamp-1">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Inline text CTA — no button box */}
        <Link
          href={detailHref}
          onClick={(e) => e.stopPropagation()}
          className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[15px] font-semibold text-[#1E6FA8] hover:text-[#1a3c5a] transition-colors group/cta"
        >
          View details
          <span className="material-symbols-outlined text-[18px] group-hover/cta:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
}
