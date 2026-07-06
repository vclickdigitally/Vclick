import React from 'react';
import { WHY_CHOOSE_US_MATRIX } from '../data/mockData';
import { CheckCircle2, XCircle } from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="relative z-20 py-16 md:py-24 px-6 md:px-12 bg-[#0B0B0B] max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="h-[1.5px] w-8 bg-[#DD183B]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
            The Asymmetric Advantage
          </span>
          <span className="h-[1.5px] w-8 bg-[#DD183B]" />
        </div>
        <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase font-display text-white">
          Why Category Kings <span className="text-transparent text-stroke-white">Reject</span> Standard Agencies
        </h2>
      </div>

      {/* Comparison Table */}
      <div className="rounded-3xl border border-white/10 bg-[#111111]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
        {/* Table Head */}
        <div className="grid grid-cols-12 p-6 sm:p-8 bg-white/[0.03] border-b border-white/10 text-xs font-bold uppercase tracking-widest">
          <div className="col-span-4 text-[#8E8E8E]">Evaluation Dimension</div>
          <div className="col-span-4 text-[#DD183B] flex items-center gap-2 font-display text-base tracking-normal">
            <span className="w-2 h-2 rounded-full bg-[#DD183B] shadow-[0_0_10px_#DD183B]" />
            <span>VClick Digitally</span>
          </div>
          <div className="col-span-4 text-[#8E8E8E]">Traditional Agency Standard</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-white/5">
          {WHY_CHOOSE_US_MATRIX.map((row, idx) => (
            <div key={idx} className="grid grid-cols-12 p-6 sm:p-8 hover:bg-white/[0.02] transition-colors items-center gap-4 text-sm">
              <div className="col-span-12 sm:col-span-4 font-bold text-white font-sans text-base">
                {row.feature}
              </div>

              <div className="col-span-12 sm:col-span-4 flex items-start gap-3 bg-[#DD183B]/[0.06] p-4 rounded-xl border border-[#DD183B]/20">
                <CheckCircle2 className="w-5 h-5 text-[#DD183B] shrink-0 mt-0.5" />
                <span className="text-white font-medium leading-relaxed">{row.vclick}</span>
              </div>

              <div className="col-span-12 sm:col-span-4 flex items-start gap-3 bg-white/[0.01] p-4 rounded-xl border border-white/5 opacity-60">
                <XCircle className="w-5 h-5 text-rose-500/70 shrink-0 mt-0.5" />
                <span className="text-[#8E8E8E] leading-relaxed">{row.standard}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
