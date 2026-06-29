import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ShieldCheck, Zap } from 'lucide-react';

interface CtaSectionProps {
  onStartProject: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onStartProject }) => {
  return (
    <section className="relative z-20 py-32 px-6 md:px-12 bg-[#111111] border-t border-white/10 overflow-hidden">
      {/* Background Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#DD183B] rounded-full filter blur-[180px] opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#DD183B] mb-8"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>CURRENT PROTOCOL CAPACITY: 2 ONBOARDING SLOTS FOR Q3</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[72px] sm:text-[110px] md:text-[130px] lg:text-[150px] font-black tracking-tighter uppercase leading-[0.85] font-display text-white mb-12"
        >
          THIS IS YOUR
          <br />
          <span className="text-transparent text-stroke-accent hover:text-white transition-colors duration-500">
            TURNING POINT.
          </span>
        </motion.h2>

        <p className="text-[#8E8E8E] text-xl sm:text-2xl max-w-2xl mx-auto mb-14 font-sans leading-relaxed">
          Stop watching competitors claim your high-ticket traffic. We build digital monopolies that position your brand on an untouchable tier.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
          <button
            onClick={onStartProject}
            data-interactive="true"
            className="group w-full sm:w-auto bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white px-10 py-6 font-black uppercase text-sm tracking-[0.25em] transition-all duration-300 rounded-xl shadow-[0_0_50px_rgba(221,24,59,0.5)] cursor-pointer flex items-center justify-center gap-4"
          >
            <span>Initiate Project Onboarding</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-[#8E8E8E] font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>95+ PageSpeed Guarantee</span>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Senior Architect Direct Access</span>
          </div>
          <span className="hidden sm:inline text-white/20">•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Sub-Second Edge Rendering</span>
          </div>
        </div>
      </div>
    </section>
  );
};
