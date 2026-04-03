'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { consumables } from '@/data/categories';
import { ChevronRight, Home, Download, PhoneCall, Info, LayoutGrid, CheckCircle2 } from 'lucide-react';

export default function ConsumablePage() {
  const { slug } = useParams();
  const consumable = consumables.find(c => c.slug === slug);

  // Fallback if consumable is not found
  if (!consumable) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-50">
        <h1 className="text-4xl font-black text-gray-800 mb-4 tracking-tighter uppercase">Consumable not found</h1>
        <p className="text-gray-600 mb-10 text-lg">The resource you are looking for does not exist or has been moved.</p>
        <Link href="/" className="bg-[#0f7db7] text-white px-10 py-4 rounded-sm font-black text-sm tracking-widest uppercase hover:bg-[#0d6da1] transition-all shadow-xl shadow-[#0f7db7]/20">
          Return to registry
        </Link>
      </div>
    );
  }

  const { details } = consumable;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <nav className="bg-gray-50 border-b border-gray-100 py-3 sm:py-4 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
          <Link href="/" className="hover:text-[#0f7db7] flex items-center transition-colors">
            <Home size={12} className="mr-1 sm:mr-2" /> Home
          </Link>
          <ChevronRight size={10} className="mx-2 sm:mx-3 text-gray-300" />
          <span className="hover:text-[#0f7db7] cursor-pointer">Consumables</span>
          <ChevronRight size={10} className="mx-2 sm:mx-3 text-gray-300" />
          <span className="text-gray-800">{consumable.name}</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 sm:pt-16 pb-24 lg:pb-32">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left Column: Image and Primary Info */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative group perspective-1000">
              <div className="aspect-square bg-white rounded-2xl border-2 border-gray-50 shadow-2xl overflow-hidden flex items-center justify-center p-8 sm:p-16 transition-all duration-500 group-hover:border-[#0f7db7]/20">
                <Image
                  src={consumable.image}
                  alt={consumable.alt}
                  width={600}
                  height={600}
                  className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  priority
                />
                
                {/* Floating Category Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="bg-[#0f7db7] text-white px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-[#0f7db7]/30">
                    {consumable.categorySlug.replace('-', ' ')}
                  </span>
                </div>
              </div>
              
              {/* Product Badge Effect */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#0f7db7]/5 rounded-full -z-10 blur-2xl group-hover:bg-[#0f7db7]/10 transition-all duration-500"></div>
            </div>

            {/* Quick Specs Table */}
            <div className="mt-12 sm:mt-16 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 border-l-4 border-l-[#0f7db7]">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Stock availability</h4>
                <p className="text-gray-800 font-bold flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> High retention
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 border-l-4 border-l-[#0f7db7]">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Ordering mode</h4>
                <p className="text-gray-800 font-bold">Priority shipment</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Details and CTA */}
          <motion.div 
            className="lg:w-1/2 flex flex-col pt-4 lg:pt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-4 flex items-center gap-4">
               <div className="h-[2px] w-12 bg-[#0f7db7]"></div>
               <span className="text-[#0f7db7] text-xs font-black tracking-[0.3em] uppercase">Technical module</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-[1.05] tracking-tight mb-8 uppercase">
              {consumable.name}
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 font-medium">
              {details.description}
            </p>

            {/* Feature List */}
            <div className="space-y-4 mb-12">
               {details.features.map((feature, idx) => (
                 <motion.div 
                   key={idx}
                   className="flex items-start gap-3 text-slate-700"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.4 + (idx * 0.1) }}
                 >
                   <CheckCircle2 size={18} className="text-[#0f7db7] mt-1 shrink-0" />
                   <span className="font-bold tracking-tight">{feature}</span>
                 </motion.div>
               ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <button className="bg-[#0f7db7] text-white flex-1 px-8 py-5 rounded-sm font-black text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:bg-[#004c6b] transition-all transform hover:-translate-y-1 shadow-2xl shadow-[#0f7db7]/30">
                Request technical quote <ChevronRight size={16} />
              </button>
              <button className="bg-white text-gray-900 border-2 border-gray-100 flex-1 px-8 py-5 rounded-sm font-black text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-3 hover:border-[#0f7db7] hover:text-[#0f7db7] transition-all transform hover:-translate-y-1">
                <Download size={16} /> Download data sheet
              </button>
            </div>

            {/* Specification Grid */}
            <div className="border-t border-gray-100 pt-10">
               <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center">
                 <LayoutGrid size={18} className="mr-3 text-[#0f7db7]" /> Technical parameter grid
               </h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                  {details.type && (
                    <div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Matrix material</span>
                      <span className="text-gray-800 font-bold">{Array.isArray(details.type) ? details.type.join(', ') : details.type}</span>
                    </div>
                  )}
                  {details.sizes && details.sizes.length > 0 && (
                    <div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Available metrics</span>
                      <span className="text-gray-800 font-bold">{details.sizes.join(' / ')}</span>
                    </div>
                  )}
                  {details.packaging && details.packaging.length > 0 && (
                    <div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Industrial packaging</span>
                      <span className="text-gray-800 font-bold">{details.packaging.join(', ')}</span>
                    </div>
                  )}
                  {details.formats && details.formats.length > 0 && (
                    <div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Configuration formats</span>
                      <span className="text-gray-800 font-bold">{details.formats.join(' / ')}</span>
                    </div>
                  )}
               </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
