import React from 'react';
import { motion } from 'framer-motion';
import { CASE_STUDY_STATS } from '../data/mockData';

export const CaseStudyNumbersSection: React.FC = () => {
  return (
    <section id="case-studies" className="relative z-20 py-16 md:py-24 px-6 md:px-12 bg-[#111111] border-t border-b border-white/10 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
        <span className="font-display font-black text-[280px] uppercase tracking-widest text-white whitespace-nowrap">
          RESULTS
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] block mb-3">
            Tracked Institutional Impact
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white">
            Numbers That Speak <span className="text-transparent text-stroke-white"> louder</span> Than Pitch Decks
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {CASE_STUDY_STATS.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`flex flex-col justify-center pt-8 sm:pt-0 ${idx > 0 ? 'sm:pl-8 lg:pl-12' : ''}`}
            >
              <div className="flex items-baseline font-display font-black text-[72px] sm:text-[88px] lg:text-[100px] leading-none text-white tracking-tighter mb-4 group cursor-default">
                <span className="text-[#DD183B] mr-1 text-5xl sm:text-6xl">{stat.prefix}</span>
                <span className="hover:text-transparent hover:text-stroke-accent transition-all duration-300">
                  {stat.value}
                </span>
                <span className="text-[#DD183B] ml-1 text-5xl sm:text-6xl">{stat.suffix}</span>
              </div>

              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white mb-2 font-sans">
                {stat.title}
              </h3>
              <p className="text-[#8E8E8E] text-xs leading-relaxed max-w-[240px]">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
