"use client";

import React from 'react';
import { motion } from 'framer-motion';

const CARDS = [
  {
    num: '01',
    title: 'Strategic Thinking',
    description: 'Every project starts with understanding your business, your goals, and your audience before we recommend solutions.'
  },
  {
    num: '02',
    title: 'Tailored Solutions',
    description: 'No two businesses are alike. Every strategy is designed specifically for your industry, challenges, and growth objectives.'
  },
  {
    num: '03',
    title: 'Transparent Collaboration',
    description: 'Clear communication, regular updates, and complete visibility throughout every stage of the project.'
  },
  {
    num: '04',
    title: 'Long-Term Partnership',
    description: 'We focus on building lasting relationships, helping businesses grow through continuous improvement and ongoing support.'
  }
];

export const WhyChooseVClick: React.FC = () => {

  return (
    <section className="relative z-20 pt-10 pb-16 md:pt-14 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      
      {/* ====================================================
          SECTION HEADER
         ==================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-20 gap-8">
        <div>
          {/* Section Tag */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">
              Why Businesses Choose VClick Digitally
            </span>
          </div>
          {/* Main Title */}
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase font-display text-white max-w-2xl leading-none">
            Built on Trust.<br />
            Driven by <span className="text-[#DD183B]">Results.</span>
          </h2>
        </div>
        {/* Description */}
        <p className="text-[#8E8E8E] text-base sm:text-lg max-w-md leading-relaxed font-sans lg:mb-2">
          We believe successful digital growth comes from strong partnerships,
          clear communication, and strategies tailored to your business.
          Every project is approached with transparency, creativity,
          and a commitment to delivering measurable value.
        </p>
      </div>

      {/* ====================================================
          CARDS GRID (1, 2, 3, 4)
         ==================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {CARDS.map((card, index) => (
          <motion.div
            key={card.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
            className="group relative bg-[#111111]/85 backdrop-blur-xl border border-white/15 hover:border-[#DD183B]/40 p-6 rounded-2xl shadow-2xl transition-all duration-400 flex flex-col justify-between min-h-[220px]"
          >
            {/* Subtle Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-[#DD183B]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* s1, s2, s3, s4 Counter (As requested, no icons, s1 s2 s3 s4 / 01 02 03 04 style) */}
            <div className="text-3xl font-black font-display text-white/20 group-hover:text-[#DD183B] transition-colors duration-300 mb-6 select-none">
              {card.num}
            </div>

            {/* Content block */}
            <div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-display text-white mb-2 group-hover:text-[#DD183B] transition-colors duration-300">
                {card.title}
              </h3>
              <p className="text-[#8E8E8E] text-xs sm:text-sm leading-relaxed font-sans">
                {card.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};
