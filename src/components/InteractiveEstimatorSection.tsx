import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ArrowUpRight, Sparkles, TrendingUp } from 'lucide-react';

interface InteractiveEstimatorSectionProps {
  onStartWithEstimate: (budget: number, service: string) => void;
}

export const InteractiveEstimatorSection: React.FC<InteractiveEstimatorSectionProps> = ({
  onStartWithEstimate,
}) => {
  const [monthlyBudget, setMonthlyBudget] = useState<number>(15000);
  const [selectedChannel, setSelectedChannel] = useState<'SEO' | 'PPC' | 'FULL'>('FULL');
  const [avgContractValue, setAvgContractValue] = useState<number>(8500);

  // Simulation Calculations based on agency verified performance benchmarks
  const multiplier = selectedChannel === 'FULL' ? 4.8 : selectedChannel === 'SEO' ? 5.2 : 4.1;
  const estimatedPipeline = Math.round((monthlyBudget * multiplier) / 100) * 100;
  const estimatedQualifiedLeads = Math.max(8, Math.round(estimatedPipeline / avgContractValue));
  const estimatedClosedDeals = Math.max(2, Math.round(estimatedQualifiedLeads * 0.28));
  const annualProjectedRevenue = estimatedPipeline * 12;

  return (
    <section id="estimator" className="relative z-20 py-16 md:py-24 px-6 md:px-12 bg-[#0B0B0B] max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center mb-20">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Calculator className="w-4 h-4 text-[#DD183B]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
            Algorithmic Growth Simulation
          </span>
        </div>
        <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase font-display text-white max-w-3xl mx-auto">
          Calculate Your <span className="text-transparent text-stroke-white">Asymmetric</span> Revenue Horizon
        </h2>
        <p className="text-[#8E8E8E] text-base sm:text-lg max-w-xl mx-auto mt-6 leading-relaxed">
          Input your current monthly marketing allocation to simulate projected qualified pipeline generation based on our tracked historical client benchmarks.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8 lg:gap-12 p-8 sm:p-12 rounded-3xl bg-[#111111] border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Left Inputs Control Panel */}
        <div className="col-span-12 lg:col-span-6 flex flex-col justify-between gap-8">
          <div>
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white mb-6 flex items-center gap-2">
              <span>Simulation Parameters</span>
              <span className="h-[1px] flex-1 bg-white/10" />
            </h3>

            {/* Slider 1: Monthly Budget */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8E8E8E]">
                  Monthly Growth Allocation
                </label>
                <span className="text-2xl font-black font-display text-[#DD183B] font-mono">
                  ${monthlyBudget.toLocaleString()} / mo
                </span>
              </div>
              <input
                type="range"
                min={5000}
                max={100000}
                step={2500}
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#DD183B]"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#8E8E8E] mt-2">
                <span>$5,000</span>
                <span>$50,000</span>
                <span>$100,000+</span>
              </div>
            </div>

            {/* Slider 2: Average Client Contract Value */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#8E8E8E]">
                  Your Average Deal / LTV Size
                </label>
                <span className="text-xl font-black font-display text-white font-mono">
                  ${avgContractValue.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={50000}
                step={1000}
                value={avgContractValue}
                onChange={(e) => setAvgContractValue(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#DD183B]"
              />
            </div>

            {/* Channel Selector Buttons */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#8E8E8E] block mb-3">
                Primary Dominance Engine
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['FULL', 'SEO', 'PPC'] as const).map((channel) => (
                  <button
                    key={channel}
                    onClick={() => setSelectedChannel(channel)}
                    className={`py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedChannel === channel
                        ? 'bg-[#DD183B] text-white shadow-[0_0_20px_rgba(221,24,59,0.4)]'
                        : 'bg-[#0B0B0B] text-[#8E8E8E] border border-white/5 hover:text-white'
                    }`}
                  >
                    {channel === 'FULL' ? 'Full-Stack' : channel === 'SEO' ? 'SEO Only' : 'Google Ads'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-[#8E8E8E] leading-relaxed">
            *Projections based on conservative historical agency performance cohorts. Actual returns compound over 180-day optimization cycles.
          </div>
        </div>

        {/* Right Output Telemetry Panel */}
        <div className="col-span-12 lg:col-span-6 bg-[#0B0B0B] border border-[#DD183B]/30 rounded-2xl p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden glow-red">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#DD183B]/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#DD183B]" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">Projected Monthly Yield</span>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">+{(multiplier * 100).toFixed(0)}% ROI Yield</span>
            </div>

            {/* Huge Pipeline Number */}
            <div className="mb-8">
              <span className="text-[11px] uppercase tracking-widest text-[#8E8E8E] block mb-1">
                Estimated Monthly Pipeline Generated
              </span>
              <motion.div
                key={estimatedPipeline}
                initial={{ scale: 0.95, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-5xl sm:text-7xl font-black font-display text-white tracking-tighter"
              >
                ${estimatedPipeline.toLocaleString()}
              </motion.div>
            </div>

            {/* Granular Breakdown */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-[#111111] border border-white/5">
                <span className="text-[10px] uppercase tracking-wider text-[#8E8E8E] block">Qualified Sales Inquiries</span>
                <span className="text-2xl sm:text-3xl font-black font-display text-white mt-1 block">
                  ~{estimatedQualifiedLeads} / mo
                </span>
              </div>
              <div className="p-4 rounded-xl bg-[#111111] border border-white/5">
                <span className="text-[10px] uppercase tracking-wider text-[#8E8E8E] block">Estimated Deployed Deals</span>
                <span className="text-2xl sm:text-3xl font-black font-display text-[#DD183B] mt-1 block">
                  ~{estimatedClosedDeals} closed
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#DD183B]/10 border border-[#DD183B]/20 flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase">
                <TrendingUp className="w-4 h-4 text-[#DD183B]" />
                <span>Annualized Horizon</span>
              </div>
              <span className="text-xl font-black font-display text-[#DD183B] font-mono">
                ${annualProjectedRevenue.toLocaleString()} / yr
              </span>
            </div>
          </div>

          <button
            onClick={() => onStartWithEstimate(monthlyBudget, selectedChannel)}
            className="w-full bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white py-5 px-8 font-black uppercase text-xs tracking-[0.25em] transition-all duration-300 rounded-xl shadow-[0_0_30px_rgba(221,24,59,0.5)] cursor-pointer flex items-center justify-center gap-3"
          >
            <span>Lock In ${monthlyBudget.toLocaleString()}/mo Growth Protocol</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
