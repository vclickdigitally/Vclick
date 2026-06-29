import React from 'react';
import { TRUSTED_BRANDS } from '../data/mockData';

export const TrustedBySection: React.FC = () => {
  return (
    <section className="relative z-20 py-10 px-6 md:px-12 border-t border-b border-white/5 bg-[#0B0B0B]/60 backdrop-blur-md overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-4 shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#DD183B]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8E8E8E]">
            Trusted By Global Industry Leaders
          </span>
        </div>

        {/* Marquee / Brand Grid */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-8 sm:gap-12 opacity-50 hover:opacity-90 transition-opacity">
          {TRUSTED_BRANDS.slice(0, 6).map((brand) => (
            <span
              key={brand.name}
              className={`text-base sm:text-lg text-white hover:text-[#DD183B] transition-colors cursor-default ${brand.style}`}
            >
              {brand.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
