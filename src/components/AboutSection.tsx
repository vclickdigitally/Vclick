"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const AboutSection: React.FC = () => {
  const valuePoints = [
    {
      title: '✓ Strategy Before Execution',
      description: 'Every decision starts with understanding your business, your audience, and your goals.'
    },
    {
      title: '✓ Built Around Your Business',
      description: 'No templates. No recycled strategies. Every solution is tailored.'
    },
    {
      title: '✓ Transparent Collaboration',
      description: 'Clear communication, honest reporting, and measurable progress.'
    },
    {
      title: '✓ Long-Term Growth',
      description: 'We focus on building sustainable digital success, not temporary wins.'
    }
  ];

  return (
    <section id="about" className="relative z-20 py-16 md:py-24 px-6 md:px-12 bg-[#0B0B0B] border-b border-white/5 overflow-hidden w-full">
      {/* Background soft red spotlight glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#DD183B]/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* ====================================================
              LEFT COLUMN: HEADINGS & NARRATIVE
             ==================================================== */}
          <div className="col-span-12 lg:col-span-6 flex flex-col justify-start">
            {/* Section Tag */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1.5px] w-10 bg-[#DD183B]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">
                ABOUT VCLICK DIGITALLY
              </span>
            </div>

            {/* Monumental Headline */}
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white leading-[0.95] mb-8">
              We Build Digital<br />
              Experiences That Drive<br />
              Real <span className="text-[#DD183B]">Business Growth.</span>
            </h2>

            {/* Narrative Paragraphs */}
            <div className="flex flex-col gap-6 text-[#8E8E8E] text-sm sm:text-base leading-relaxed font-sans max-w-[540px]">
              <p className="text-white font-semibold">
                VClick Digitally partners with ambitious businesses to create meaningful digital growth through strategy, creativity, and technology.
              </p>
              <p>
                We reject copy-paste solutions. Every project is planned, executed, and refined to build visibility, strengthen presence, and generate measurable results.
              </p>
              <p>
                Whether you are launching a brand, improving search visibility, or scaling web presence, we become an extension of your team—focused on long-term value, not short-term campaigns.
              </p>
            </div>
          </div>

          {/* ====================================================
              RIGHT COLUMN: 4 VALUE POINTS WITH SEPARATORS
             ==================================================== */}
          <div className="col-span-12 lg:col-span-6 lg:pl-8 flex flex-col justify-start">
            <h3 className="text-[11px] font-black uppercase tracking-widest text-white/95 mb-6 flex items-center gap-2 font-sans">
              <span>OUR CORE VALUES</span>
              <span className="h-[1px] flex-1 bg-white/10" />
            </h3>

            <div className="flex flex-col">
              {valuePoints.map((point, index) => (
                <div key={point.title}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="py-5 flex flex-col gap-2 group cursor-default"
                  >
                    {/* Value Title */}
                    <h4 className="text-lg sm:text-xl font-black uppercase tracking-tight font-display text-white group-hover:text-[#DD183B] transition-colors duration-300">
                      {point.title}
                    </h4>
                    {/* Value Body */}
                    <p className="text-[#8E8E8E] text-xs sm:text-sm leading-relaxed font-sans max-w-[480px]">
                      {point.description}
                    </p>
                  </motion.div>
                  
                  {/* Custom Separator Line */}
                  {index < valuePoints.length - 1 && (
                    <div className="h-[1px] w-full bg-white/10" />
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
