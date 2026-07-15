import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INDUSTRIES_SECTORS } from '../data/mockData';
import { IndustrySector } from '../types';
import { ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

interface IndustriesSectionProps {
  onSelectIndustry: (industry: IndustrySector) => void;
}

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onSelectIndustry }) => {
  const [activeTab, setActiveTab] = useState<IndustrySector>(INDUSTRIES_SECTORS[0]);

  return (
    <section className="relative z-20 py-16 md:py-24 px-6 md:px-12 bg-[#111111]/40 border-t border-white/5 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
              Vertical Dominance
            </span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase font-display text-white">
            Architected For Your <span className="text-transparent text-stroke-white">Exact</span> Battlefield
          </h2>
        </div>
        <p className="text-[#8E8E8E] text-base sm:text-lg max-w-md leading-relaxed">
          Every industry has distinct gatekeepers, CPC inflation, and buyer journeys. We deploy custom playbooks built specifically for your vertical.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex flex-wrap gap-3 mb-12 border-b border-white/10 pb-6">
        {INDUSTRIES_SECTORS.map((sector) => {
          const isActive = activeTab.id === sector.id;
          return (
            <button
              key={sector.id}
              onClick={() => setActiveTab(sector)}
              className={`px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#DD183B] text-white shadow-[0_0_25px_rgba(221,24,59,0.5)]'
                  : 'bg-white/5 text-[#8E8E8E] hover:text-white hover:bg-white/10'
              }`}
            >
              {sector.name}
            </button>
          );
        })}
      </div>

      {/* Active Tab Display Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-12 gap-8 lg:gap-12 p-8 sm:p-12 rounded-3xl bg-[#0B0B0B] border border-white/10 relative overflow-hidden"
        >
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-[#DD183B] uppercase tracking-widest block mb-3">
                VERTICAL_SPEC // {activeTab.id.toUpperCase()}
              </span>
              <h3 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-white mb-4">
                {activeTab.tagline}
              </h3>
              <p className="text-[#8E8E8E] text-lg leading-relaxed mb-8">
                {activeTab.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-2xl bg-[#111111] border border-white/5">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Typical Vertical Friction</span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">{activeTab.sampleChallenge}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#111111] border border-[#DD183B]/30">
                <div className="flex items-center gap-2 text-[#DD183B] text-xs font-bold uppercase tracking-wider mb-2">
                  <Zap className="w-4 h-4" />
                  <span>VClick Asymmetric Solution</span>
                </div>
                <p className="text-xs text-white leading-relaxed">{activeTab.solutionOutcome}</p>
              </div>
            </div>

            <div>
              <button
                onClick={() => onSelectIndustry(activeTab)}
                className="group flex items-center gap-3 bg-white/10 hover:bg-[#DD183B] text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-[0.2em] transition-all cursor-pointer"
              >
                <span>Deploy {activeTab.name} Growth Protocol</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5 flex flex-col justify-center gap-6 p-8 rounded-2xl bg-[#111111] border border-white/5">
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#8E8E8E] block mb-1">Average Vertical ROAS</span>
              <span className="text-6xl font-black font-display text-white">{activeTab.avgRoi}</span>
            </div>
            <div className="h-[1px] bg-white/10 w-full" />
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#8E8E8E] block mb-1">Tracked Enterprise Cases</span>
              <span className="text-3xl font-black font-display text-[#DD183B]">{activeTab.caseCount}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
