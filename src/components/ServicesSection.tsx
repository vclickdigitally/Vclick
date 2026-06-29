import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem } from '../types';
import { ArrowUpRight, CheckCircle2, BarChart3, Terminal } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeService, setActiveService] = useState<ServiceItem>(SERVICES_DATA[0]);

  return (
    <section id="services" className="relative z-20 py-32 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
              Core Capabilities
            </span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase font-display max-w-2xl">
            Engineered For <span className="text-transparent text-stroke-white">Asymmetric</span> Dominance
          </h2>
        </div>
        <p className="text-[#8E8E8E] text-base sm:text-lg max-w-md leading-relaxed">
          We reject template marketing. Every protocol is custom-architected to capture transactional search monopolies and slash customer acquisition costs.
        </p>
      </div>

      {/* Interactive Bento / Tab System */}
      <div className="grid grid-cols-12 gap-8 items-start">
        {/* Left Column: Service Selector Cards */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
          {SERVICES_DATA.map((service) => {
            const isActive = activeService.id === service.id;
            return (
              <div
                key={service.id}
                onClick={() => setActiveService(service)}
                data-interactive="true"
                className={`p-8 rounded-xl cursor-pointer transition-all duration-400 relative overflow-hidden group ${
                  isActive
                    ? 'bg-[#111111] border border-[#DD183B] shadow-[0_0_35px_-10px_rgba(221,24,59,0.4)]'
                    : 'bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                {/* Active Indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="serviceActiveBar"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#DD183B]"
                  />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded ${isActive ? 'bg-[#DD183B] text-white' : 'bg-white/5 text-[#8E8E8E]'}`}>
                    {service.category}
                  </span>
                  <ArrowUpRight className={`w-5 h-5 transition-transform duration-300 ${isActive ? 'text-[#DD183B] translate-x-0.5 -translate-y-0.5' : 'text-[#8E8E8E] group-hover:text-white'}`} />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight font-display mb-2 text-white">
                  {service.title}
                </h3>
                <p className="text-[#8E8E8E] text-sm leading-relaxed line-clamp-2">
                  {service.tagline}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep Dive Interactive Visualization Panel */}
        <div className="col-span-12 lg:col-span-7 bg-[#111111] border border-white/10 rounded-2xl p-8 sm:p-12 relative overflow-hidden min-h-[560px] flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none font-display font-black text-9xl text-white select-none">
            {activeService.category}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 flex flex-col h-full justify-between gap-8"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Terminal className="w-4 h-4 text-[#DD183B]" />
                  <span className="text-xs font-mono text-[#8E8E8E]">
                    PROTOCOL_SPEC // {activeService.id.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black tracking-tight font-display mb-4 text-white">
                  {activeService.title}
                </h3>
                <p className="text-[#8E8E8E] text-lg leading-relaxed mb-8">
                  {activeService.description}
                </p>

                {/* Deliverables Grid */}
                <div className="mb-8">
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/90 mb-4 flex items-center gap-2">
                    <span>Key Engineering Deliverables</span>
                    <span className="h-[1px] flex-1 bg-white/10" />
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeService.keyDeliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-[#DD183B] shrink-0 mt-0.5" />
                        <span className="text-xs font-semibold text-white/90 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Simulation Telemetry & Metrics Box */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#DD183B]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">Verified Cohort Benchmarks</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#DD183B] bg-[#DD183B]/10 px-2.5 py-1 rounded">
                    {activeService.simulationData.highlightText}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {activeService.metrics.map((metric, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#0B0B0B] border border-white/5 flex flex-col justify-center">
                      <span className="text-[10px] uppercase tracking-wider text-[#8E8E8E] mb-1 truncate">{metric.label}</span>
                      <span className="text-2xl sm:text-3xl font-black font-display text-white">{metric.value}</span>
                      <span className="text-[10px] text-[#DD183B] font-semibold mt-1 truncate">{metric.change}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onSelectService(activeService)}
                  className="w-full mt-8 bg-white/10 hover:bg-[#DD183B] text-white py-4 font-bold uppercase text-xs tracking-[0.2em] rounded-xl transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Request {activeService.category} Strategy Audit</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
