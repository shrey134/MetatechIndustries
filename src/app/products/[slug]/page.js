'use client';

import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useParams } from 'next/navigation';
import { products } from '@/data/categories';
import categoriesData from '@/data/categories.json';
import BrochureModal from '@/components/BrochureModal';

export default function ProductPage() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const parentGroup = categoriesData.find(g => 
    g.categories.some(c => c.slug === product?.categorySlug)
  );
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  // Fallback if product is not found
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product not found</h1>
          <p className="text-gray-600 mb-8">The product you are looking for does not exist or has been moved.</p>
          <Link href="/" className="bg-[#0f7db7] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#0d6da1] transition-all">
            Return to home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const videoThumbnails = product.images.map((img, idx) => ({
    id: idx + 1,
    title: `${product.name} Image ${idx + 1}`,
    image: img
  }));


  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Auto-rotate carousel
  useEffect(() => {
    if (!isVideoPlaying) {
      const interval = setInterval(() => {
        setActiveVideoIndex((prevIndex) =>
          prevIndex === videoThumbnails.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isVideoPlaying, videoThumbnails.length]);

  // State for currently selected image
  const [selectedImage, setSelectedImage] = useState(0);

  // Zoom feature state
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ 
      x: Math.max(0, Math.min(100, x)), 
      y: Math.max(0, Math.min(100, y)) 
    });
  };

  // Lightbox State & Logic
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen]);

  // Images Video section
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);


  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };


  const relatedProducts = products.filter(p => p.categorySlug === product.categorySlug && p.slug !== product.slug).slice(0, 4);

  return (
    <div className="w-full bg-[#fef7ff] text-[#1d1a22] font-['Inter',_sans-serif]">
      {/* Breadcrumb (Refined & Professional - Balanced Spacing) */}
      <div className="bg-white px-8 py-6 flex items-center gap-2 text-[14px] font-medium tracking-tight text-slate-500 border-b border-slate-100 mt-2">
        <Link href="/" className="hover:text-[#1E6FA8] transition-colors">Home</Link>
        <span className="material-symbols-outlined text-[16px] opacity-40">chevron_right</span>
        <Link 
          href={`/products?category=${parentGroup?.slug}&subcategory=${product.categorySlug}`} 
          className="hover:text-[#1E6FA8] transition-colors capitalize"
        >
          {product.categorySlug?.replace(/-/g, ' ')}
        </Link>
        <span className="material-symbols-outlined text-[16px] opacity-40">chevron_right</span>
        <span className="text-[#1a3c5a] font-bold capitalize">{product.name}</span>
      </div>

      {/* Product Intro Section */}
      <section className="bg-white py-8 lg:py-16 px-4 md:px-8 border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-start relative">
          
          {/* Left: Product Gallery Container (Refined Vertical Layout) */}
          <div className="flex flex-col lg:flex-row-reverse gap-4 relative w-full group/gallery">
            
            {/* The Main Image Stage (With Inner Zoom) */}
            <div 
              ref={imageContainerRef}
              className="relative flex-1 aspect-square md:aspect-[4/3] bg-white rounded-xl border border-slate-100 flex items-center justify-center p-8 overflow-hidden cursor-crosshair shadow-sm"
              onClick={() => setIsLightboxOpen(true)}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onMouseMove={handleMouseMove}
            >
              {/* Optional UI tags */}
              {product.tag && (
                <div className="absolute top-5 left-5 z-20 pointer-events-none">
                  <span className="bg-[#1a3c5a] text-white text-[10px] font-black px-4 py-2 rounded-sm tracking-widest uppercase shadow-lg">
                    {product.tag}
                  </span>
                </div>
              )}
              
              {/* Main Image with Inner Zoom Logic */}
              <div className="w-full h-full relative">
                <img 
                  alt={product.name} 
                  className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-200 ease-out`}
                  style={{ 
                    transform: isZooming ? `scale(2.2) translate(${-(zoomPosition.x - 50) / 2}%, ${-(zoomPosition.y - 50) / 2}%)` : 'scale(1)',
                    transformOrigin: 'center'
                  }}
                  src={product.images[selectedImage]}
                />
              </div>

              {/* Zoom Guide Link */}
              {!isZooming && (
                <div className="absolute bottom-5 right-5 z-20 pointer-events-none bg-white shadow-md p-2.5 rounded-full border border-slate-100 ring-4 ring-white/50 opacity-80">
                  <span className="material-symbols-outlined text-[#1E6FA8] text-xl">zoom_in</span>
                </div>
              )}
            </div>

            {/* Vertical Thumbnail Gallery */}
            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto lg:h-full lg:max-h-[500px] pb-2 lg:pb-0 scrollbar-hide justify-start lg:w-20 shrink-0">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 relative w-16 h-16 md:w-20 md:h-20 rounded-lg border-2 transition-all overflow-hidden ${
                    selectedImage === index ? 'border-[#1E6FA8] opacity-100 shadow-md ring-2 ring-[#1E6FA8]/10' : 'border-slate-100 bg-slate-50 opacity-60 hover:opacity-100 hover:border-slate-200 shadow-sm'
                  }`}
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain p-2 mix-blend-multiply" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col justify-start w-full py-4 lg:py-0">
            <Link 
              href={`/products?category=${parentGroup?.slug}&subcategory=${product.categorySlug}`}
              className="text-[#1E6FA8] font-bold text-[11px] tracking-[0.15em] mb-4 uppercase hover:underline w-fit"
            >
              Hardware / {product.categorySlug?.replace(/-/g, ' ')}
            </Link>
            
            <h1 className="text-[28px] md:text-[34px] lg:text-[38px] font-black text-[#1a3c5a] tracking-tight leading-[1.15] mb-4">
              {product.name}
            </h1>
            
            <p className="text-[14px] md:text-[15px] text-slate-600 mb-6 leading-relaxed font-medium">
              {product.description}
            </p>
            
            <div className="space-y-4 mb-8">
              <h3 className="text-[10px] font-bold text-[#1a3c5a] uppercase tracking-widest border-b border-slate-200 pb-2">Key capabilities</h3>
              <ul className="grid grid-cols-1 gap-4">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-[#1E6FA8] text-xl shrink-0">check_circle</span>
                    <span className="text-[14px] text-slate-700 font-medium leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto w-full">
              <Link 
                href={`/rfq?category=${parentGroup?.slug}&product=${product.name}`}
                className="bg-[#1E6FA8] text-white px-8 py-4 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#122b42] transition-colors rounded-[4px] shadow-sm flex-1"
              >
                Request quotation
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
              <button 
                onClick={() => setIsBrochureModalOpen(true)}
                className="bg-white border border-slate-300 text-slate-700 px-8 py-4 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors rounded-[4px] flex-1"
              >
                <span className="material-symbols-outlined text-[16px]">download</span>
                Datasheet
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Technical Specifications */}
      <section className="bg-white py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black text-[#1d1a22] tracking-tighter uppercase mb-2">Technical specifications</h2>
              <p className="text-[#595f67] text-sm font-medium">Precision engineering data for the {product.name} unit.</p>
            </div>
          </div>
          <div className="overflow-hidden bg-[#f9f1fd] rounded-sm shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#e7e0eb]">
                  <th className="px-6 py-3.5 text-[10px] font-black text-[#1d1a22] uppercase tracking-[0.2em]">Parameter</th>
                  <th className="px-6 py-3.5 text-[10px] font-black text-[#1d1a22] uppercase tracking-[0.2em] border-l border-[#c6c5d0]/30">Specification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c6c5d0]/10">
                {(product.specifications || product.ordering)?.map((spec, i) => (
                  <tr key={i} className="bg-white hover:bg-[#dde1ff] transition-colors group">
                    <td className="px-6 py-3 text-xs font-bold text-[#45464f] uppercase tracking-tight">{spec.param || `Model ${spec.part}`}</td>
                    <td className="px-6 py-3 text-xs font-medium text-[#071240] border-l border-[#c6c5d0]/30" dangerouslySetInnerHTML={{ __html: spec.value || `${spec.capacity} | ${spec.voltage}` }}></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-white py-10 px-6 md:px-12 lg:px-24 border-t border-[#c6c5d0]/10">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <h2 className="text-xl font-black text-[#1d1a22] tracking-tighter uppercase mb-2">Related products</h2>
              <div className="h-1 w-12 bg-[#071240]"></div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`} className="group cursor-pointer">
                  <div className="aspect-square mb-4 bg-[#f9f1fd] border border-[#c6c5d0]/20 overflow-hidden relative p-3 flex items-center justify-center">
                    <img 
                      className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
                      src={p.image || p.images?.[0]} 
                      alt={p.name} 
                    />
                  </div>
                  <h3 className="text-sm font-black text-[#1d1a22] uppercase tracking-tighter mb-2 group-hover:text-[#071240] transition-colors">{p.name}</h3>
                  <div className="flex items-center gap-1 text-[9px] font-black text-[#595f67] uppercase tracking-[0.2em] group-hover:text-[#071240] transition-colors">
                    View details
                    <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Consumables Integration */}
      {product.consumables && product.consumables.length > 0 && (
        <section className="bg-[#f9f1fd] py-12 px-6 md:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-10">
              <span className="text-[#071240] font-bold text-[10px] tracking-[0.3em] uppercase">System integration</span>
              <h2 className="text-3xl font-black text-[#1d1a22] tracking-tighter mt-2 uppercase">Essential consumables</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {product.consumables.map((item, idx) => (
                <div key={idx} className="bg-white p-6 flex flex-col group cursor-pointer border-b-4 border-transparent hover:border-[#071240] transition-all shadow-sm">
                  <div className="aspect-video mb-6 overflow-hidden bg-[#f9f1fd] relative p-4 flex items-center justify-center">
                    {item.image ? (
                      <img 
                        className="max-w-full max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
                        src={item.image} 
                        alt={item.title} 
                      />
                    ) : (
                      <span className="material-symbols-outlined text-5xl text-[#bdc8d1]">inventory_2</span>
                    )}
                  </div>
                  <h3 className="text-lg font-black text-[#1d1a22] tracking-tighter mb-2 uppercase">{item.title}</h3>
                  <p className="text-[13px] text-[#595f67] font-medium mb-6 leading-relaxed line-clamp-2">{item.subtitle}</p>
                  <Link 
                    href={`/consumables/${item.slug || '#'}`} 
                    className="mt-auto flex items-center gap-2 text-[10px] font-black text-[#071240] uppercase tracking-[0.2em] group-hover:gap-4 transition-all"
                  >
                    Explore specs
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Data Library Section */}
      {product.literature && product.literature.length > 0 && (
        <section className="bg-white py-12 px-6 md:px-12 text-center border-t border-[#c6c5d0]/10">
          <div className="max-w-3xl mx-auto">
            <span className="material-symbols-outlined text-[#071240] text-4xl mb-4">database</span>
            <h2 className="text-2xl font-black text-[#1d1a22] tracking-tighter uppercase mb-4">Technical documentation</h2>
            <p className="text-[#595f67] text-[13px] font-medium mb-8">Access the full technical library for the {product.name} system, including user manuals and specialized engineering data.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {product.literature.map((lit, i) => (
                <button key={i} className="bg-[#f9f1fd] border border-[#c6c5d0]/20 px-6 py-3 text-[10px] font-black text-[#071240] uppercase tracking-widest hover:bg-[#dde1ff] transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg font-normal">description</span>
                  {lit.title}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] bg-black/90 flex flex-col items-center justify-center backdrop-blur-md"
          >
            {/* Click-away backdrop overlay */}
            <div className="absolute inset-0 z-0" onClick={() => setIsLightboxOpen(false)}></div>

            {/* Close Button */}
            <button 
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50 p-2"
            >
              <span className="material-symbols-outlined text-4xl">close</span>
            </button>

            {/* Main Stage */}
            <div className="relative w-full max-w-7xl h-[70vh] flex items-center justify-center px-12 md:px-24 select-none z-10">
              
              {/* Prev Button */}
              {product.images.length > 1 && (
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/20 hover:bg-black/60 p-4 border border-white/10 rounded-full transition-all focus:outline-none"
                >
                  <span className="material-symbols-outlined text-4xl">chevron_left</span>
                </button>
              )}

              {/* Central Image */}
              <motion.img 
                key={`lightbox-${selectedImage}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                src={product.images[selectedImage]} 
                alt={`${product.name} expanded`}
                className="max-w-full max-h-full object-contain pointer-events-none drop-shadow-2xl"
              />

              {/* Next Button */}
              {product.images.length > 1 && (
                <button 
                  onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white bg-black/20 hover:bg-black/60 p-4 border border-white/10 rounded-full transition-all focus:outline-none"
                >
                  <span className="material-symbols-outlined text-4xl">chevron_right</span>
                </button>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 px-4 overflow-x-auto select-none z-10">
                {product.images.map((img, idx) => (
                  <button 
                    key={`thumb-${idx}`}
                    onClick={(e) => { e.stopPropagation(); setSelectedImage(idx); }}
                    className={`relative w-20 h-20 bg-white/10 rounded-sm border-2 overflow-hidden transition-all ${
                      selectedImage === idx ? 'border-white opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'border-transparent opacity-40 hover:opacity-100'
                    }`}
                  >
                    {/* We use a white background block explicitly so mix-blend-multiply on transparent/white-bg JPEGs doesn't black out */}
                    <div className="absolute inset-0 bg-white"></div>
                    <img src={img} alt={`thumb ${idx}`} className="absolute inset-0 w-full h-full object-contain p-2 mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
            
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brochure Modal Overlay */}
      <BrochureModal 
        isOpen={isBrochureModalOpen} 
        onClose={() => setIsBrochureModalOpen(false)} 
        productName={product.name} 
        downloadUrl={product.brochureUrl || "/sample-datasheet.pdf"} 
      />

    </div>
  );
}