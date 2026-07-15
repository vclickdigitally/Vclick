"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../data/mockData';
import { Check } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  return (
    <section id="process" className="relative z-20 pt-10 pb-16 md:pt-14 md:pb-24 px-6 md:px-12 bg-[#0B0B0B] max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
              OUR PROCESS
            </span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase font-display max-w-2xl leading-none">
            A Clear Process.<br />
            Built Around Your <span className="text-[#DD183B]">Success.</span>
          </h2>
        </div>
        <div className="flex flex-col gap-4 text-[#8E8E8E] text-base sm:text-lg max-w-md leading-relaxed">
          <p>
            Every successful project begins with understanding your business and ends with measurable digital growth.
          </p>
          <p>
            Our streamlined process keeps every stage transparent, collaborative, and focused on delivering long-term value.
          </p>
        </div>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PROCESS_STEPS.map((step, idx) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="p-8 rounded-2xl bg-[#111111] border border-white/10 flex flex-col justify-between relative group hover:border-[#DD183B]/50 transition-all duration-400 min-h-[420px]"
          >
            {/* Step Number Badge */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-4xl font-black font-display text-[#DD183B] group-hover:scale-110 transition-transform origin-left inline-block">
                  {step.step}
                </span>
                <span className="text-[10px] font-mono text-[#8E8E8E]">PHASE_{step.step}</span>
              </div>

              <h3 className="text-2xl font-black tracking-tight font-display text-white mb-2 leading-tight">
                {step.title}
              </h3>
              <p className="text-xs font-bold uppercase tracking-wider text-[#DD183B] mb-4">
                {step.subtitle}
              </p>
              <p className="text-[#8E8E8E] text-sm leading-relaxed mb-8">
                {step.description}
              </p>
            </div>

            {/* Deliverables checklist */}
            <div className="pt-6 border-t border-white/5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70 block mb-3">
                Core Deliverables
              </span>
              <ul className="flex flex-col gap-2">
                {step.deliverables.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-[#8E8E8E]">
                    <Check className="w-3.5 h-3.5 text-[#DD183B] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
