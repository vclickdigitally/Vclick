import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ShieldCheck } from 'lucide-react';

interface CtaSectionProps {
  onStartProject: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartProject }) => {
  return (
    <section className="relative z-20 py-16 md:py-24 px-6 md:px-12 bg-[#111111] border-t border-white/10 overflow-hidden">
      {/* Background Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#DD183B] rounded-full filter blur-[180px] opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <span className="h-[1.5px] w-6 bg-[#DD183B]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">
            LET'S GROW TOGETHER
          </span>
          <span className="h-[1.5px] w-6 bg-[#DD183B]" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.95] font-display text-white mb-8"
        >
          Ready to Build<br />
          Your Next <span className="text-[#DD183B]">Growth Story?</span>
        </motion.h2>

        {/* Description */}
        <p className="text-[#8E8E8E] text-base sm:text-lg max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
          Whether you're launching a new business, improving your online presence,
          or scaling your digital marketing, VClick Digitally is here to help you
          turn ideas into measurable results.
        </p>

        {/* Core Value Checklist Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
          {[
            'SEO & AI Search Optimization',
            'Website Design & Development',
            'Branding & Social Media',
            'Performance Marketing'
          ].map((item) => (
            <div 
              key={item} 
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/90 font-sans font-bold"
            >
              <ShieldCheck className="w-4 h-4 text-[#DD183B]" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Button Wrapper */}
        <div className="flex flex-col items-center justify-center gap-3">
          <button
            onClick={onStartProject}
            data-interactive="true"
            className="group w-full sm:w-auto bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white px-12 py-6 font-black uppercase text-xs sm:text-sm tracking-[0.25em] transition-all duration-300 rounded-xl shadow-[0_0_55px_rgba(221,24,59,0.55)] hover:scale-[1.05] cursor-pointer flex items-center justify-center gap-3"
          >
            <span>Let's Talk Growth</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Subtitle Under CTA */}
          <div className="text-[10px] sm:text-xs text-[#8E8E8E] font-medium tracking-wide font-sans mt-3">
            No pressure. No obligations. Just a conversation about your business.
          </div>
        </div>

      </div>
    </section>
  );
};
