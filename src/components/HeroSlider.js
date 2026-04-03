"use client";

import { useEffect, useState } from "react";

const images = [
  "/cutting/automatic-cutting-machines/autocut.png",
  "/microscope-and-image-analyzer/inverted-microscope/metagraph-I.png",
  "/moulding-grinding-polishing/moulding-machines/electro-hydraulic-press.png",
  "/cutting/automatic-cutting-machines/metacut1.png",
  "/microscope-and-image-analyzer/particle-size-analysis-systems/clean-est-metallurgical.png",
  "/moulding-grinding-polishing/multi-specimen-grinding-polishing-machines/autopol-ii.png",
  "/microscope-and-image-analyzer/image-analyzer/planimetry-method.png",
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group max-w-lg mx-auto lg:ml-auto lg:mr-0 border-4 border-red-500 bg-white">
      <div className="p-4 text-red-500 font-bold z-50 relative">Debug: HeroSlider Component Loaded</div>
      <div className="relative z-10 rounded-sm overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)] border-8 border-white bg-white min-h-[300px]">
        {/* Spacer image to force container height */}
        <img
          src={images[0]}
          alt="spacer"
          className="w-full h-auto opacity-0 pointer-events-none"
        />

        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Metatech Industrial Laboratory Asset"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${index === current
                ? "opacity-100 z-10"
                : "opacity-0 z-0"
              }`}
          />
        ))}

      </div>

      {/* Decorative accent (unchanged) */}
      <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
    </div>
  );
}
