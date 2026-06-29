import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 px-6 md:px-12 py-16 bg-[#0B0B0B] border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top Tier */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-3 h-8 bg-[#DD183B]" />
            <span className="text-3xl font-black tracking-tighter uppercase font-display text-white">
              VClick <span className="text-[#DD183B]">/</span> Digitally
            </span>
          </div>

          <div className="flex flex-wrap gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8E8E8E]">
            <a href="#services" className="hover:text-[#DD183B] transition-colors">Services</a>
            <a href="#projects" className="hover:text-[#DD183B] transition-colors">Portfolio</a>
            <a href="#process" className="hover:text-[#DD183B] transition-colors">Method</a>
            <a href="#estimator" className="hover:text-[#DD183B] transition-colors">Estimator</a>
            <a href="#faq" className="hover:text-[#DD183B] transition-colors">FAQ</a>
          </div>
        </div>

        {/* Bottom Tier matching Sleek Interface design exactly */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8E8E8E] mb-1">
              Global Headquarters
            </p>
            <p className="text-xs font-bold text-white tracking-wide">
              London — New York — Dubai
            </p>
          </div>

          <div className="hidden sm:block h-10 w-[1px] bg-white/10" />

          <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
            <p className="text-[11px] text-[#8E8E8E]">
              © {currentYear} VClick Digitally Ltd. All rights reserved.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#DD183B] hover:border-[#DD183B] text-white text-[10px] font-bold transition-all"
                aria-label="LinkedIn"
              >
                IN
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#DD183B] hover:border-[#DD183B] text-white text-[10px] font-bold transition-all"
                aria-label="Twitter / X"
              >
                X
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#DD183B] hover:border-[#DD183B] text-white text-[10px] font-bold transition-all"
                aria-label="Instagram"
              >
                IG
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
