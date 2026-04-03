"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function SearchBarWithSuggestions({ searchQuery, onSearchChange, products }) {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef(null);

  // Close suggestions on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    onSearchChange(query);

    if (query.trim().length > 1) {
      const filtered = products
        .filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          (product.title && product.title.toLowerCase().includes(query.toLowerCase()))
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
      setHighlightedIndex(-1);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product) => {
    const value = product.name || product.title;
    onSearchChange(value);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        handleSuggestionClick(suggestions[highlightedIndex]);
      } else {
        setShowSuggestions(false);
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const highlightMatch = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === query.toLowerCase()
            ? <strong key={i} className="text-[#1E6FA8] font-bold">{part}</strong>
            : part
        )}
      </span>
    );
  };

  return (
    <div className="relative w-full md:w-96" ref={searchRef}>
      <div className="relative flex items-center bg-white border border-[#eee] rounded-sm group focus-within:border-[#1E6FA8] transition-all overflow-hidden shadow-sm h-11">
        <span className="material-symbols-outlined ml-4 text-[#94a3b8] text-[20px]">search</span>
        <input
          className="w-full bg-transparent border-none focus:ring-0 px-3 py-2 text-[14px] text-[#374151] placeholder:text-[#94a3b8] font-sans outline-none"
          placeholder="Search product name or series..."
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => { if (searchQuery.length > 1) setShowSuggestions(true); }}
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="p-2 hover:text-[#1E6FA8] text-[#94a3b8] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#eee] rounded-sm shadow-2xl z-[100] max-h-[300px] overflow-y-auto overflow-x-hidden origin-top scale-x-100 transition-all">
          <ul className="py-1">
            {suggestions.map((product, index) => (
              <li
                key={product.id}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleSuggestionClick(product)}
                className={`px-4 py-2.5 cursor-pointer text-sm transition-colors border-l-4 flex flex-col gap-0.5 ${highlightedIndex === index ? 'bg-slate-50 border-[#1E6FA8] text-[#1a3c5a]' : 'border-transparent text-[#475569]'
                  }`}
              >
                <span className="font-bold text-[12px] uppercase tracking-wider">
                  {highlightMatch(product.name || product.title, searchQuery)}
                </span>
                <span className="text-[10px] text-[#94a3b8] uppercase tracking-widest">
                  {product.categorySlug.replace(/-/g, ' ')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
