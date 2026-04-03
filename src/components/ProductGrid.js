"use client";
import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ filteredProducts }) {
  if (filteredProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 bg-slate-50 border border-dashed border-[#eee] rounded-lg">
        <span className="material-symbols-outlined text-[#94a3b8] text-6xl mb-4">inventory_2</span>
        <h3 className="text-xl font-bold text-[#1a3c5a] mb-2 uppercase tracking-tight">No results found</h3>
        <p className="text-[#64748b] text-center max-w-[320px] text-sm">
          We couldn't find any products matching your current search and filter criteria. Try adjusting your selections or clearing the search.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
