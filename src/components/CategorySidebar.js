"use client";
import React, { useState } from 'react';

export default function CategorySidebar({ categories, selectedCategory, onSelectCategory }) {
  const [openGroup, setOpenGroup] = useState(null);

  const toSentenceCase = (str) => {
    if (!str) return '';
    const cleanStr = str.replace(/-/g, ' ');
    return cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1).toLowerCase();
  };

  const toggleGroup = (slug) => {
    setOpenGroup(openGroup === slug ? null : slug);
  };

  return (
    <aside className="w-full md:w-72 flex-shrink-0 space-y-4">
      <div className="bg-white border border-[#eee] p-4 rounded-sm shadow-sm">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#1a3c5a] mb-6 flex items-center gap-2">
          Product categories
        </h3>

        <div className="space-y-1">
          {categories.map((group) => (
            <div key={group.slug} className="border-b border-[#f1f5f9] last:border-none">
              <button
                onClick={() => toggleGroup(group.slug)}
                className={`w-full flex items-center justify-between py-3.5 px-2 text-[13px] font-bold transition-all text-left ${
                  selectedCategory.category === group.slug 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-[#475569] hover:bg-gray-100'
                }`}
              >
                {toSentenceCase(group.title)}
                <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${openGroup === group.slug ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openGroup === group.slug ? 'max-h-[1000px] opacity-100 py-3' : 'max-h-0 opacity-0'
                  }`}
              >
                <ul className="space-y-1.5 ml-1">
                  <li
                    onClick={() => onSelectCategory(group.slug, null)}
                    className={`text-[12px] font-bold px-3 py-2 cursor-pointer transition-colors text-left border-l-2 ${selectedCategory.category === group.slug && !selectedCategory.subcategory
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-transparent text-[#64748b] hover:bg-gray-100'
                      }`}
                  >
                    All {toSentenceCase(group.title).toLowerCase()}
                  </li>
                  {group.categories.map((cat) => (
                    <li key={cat.slug}>
                      <button
                        onClick={() => onSelectCategory(group.slug, cat.slug)}
                        className={`w-full text-left text-[12px] font-medium px-3 py-2.5 cursor-pointer transition-colors border-l-2 flex justify-between items-center ${selectedCategory.subcategory === cat.slug
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-transparent text-[#64748b] hover:bg-gray-100'
                          }`}
                      >
                        {toSentenceCase(cat.name)}
                        <span className={`material-symbols-outlined text-[14px] transition-transform ${selectedCategory.subcategory === cat.slug ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`}>
                          chevron_right
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1a3c5a]/5 p-6 border-l-4 border-[#1a3c5a] rounded-sm">
        <span className="material-symbols-outlined text-[#1a3c5a] mb-3 text-xl">support_agent</span>
        <h4 className="font-bold text-[#1a3c5a] mb-2 text-sm">Need technical assistance?</h4>
        <p className="text-[11px] text-[#64748b] leading-relaxed mb-4">
          Our application engineers are ready to help you find the optimal solution for your production requirements.
        </p>
        <button className="w-full py-2.5 bg-[#1a3c5a] text-white text-[10px] font-bold uppercase tracking-wider hover:bg-[#122b42] transition-colors shadow-sm rounded-sm">
          Talk to an expert
        </button>
      </div>
    </aside>
  );
}
