import React from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, BadgeCheck } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="relative z-20 py-32 px-6 md:px-12 bg-[#0B0B0B] border-t border-white/5 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
              Verified Executive Consensus
            </span>
          </div>
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase font-display text-white">
            What Institutional <span className="text-transparent text-stroke-white">Leaders</span> Say
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-[#111111] px-4 py-2 rounded-full border border-white/10 text-xs text-[#8E8E8E] font-mono">
          <BadgeCheck className="w-4 h-4 text-[#DD183B]" />
          <span>ALL REVENUE OUTCOMES VERIFIED BY AUDIT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {TESTIMONIALS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="p-8 sm:p-10 rounded-3xl bg-[#111111] border border-white/10 flex flex-col justify-between relative group hover:border-[#DD183B]/50 transition-all duration-400 glass-card-hover"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1 text-[#DD183B]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-black uppercase font-display tracking-wider text-[#DD183B] bg-[#DD183B]/10 px-3 py-1 rounded-full border border-[#DD183B]/20">
                  {item.verifiedRevenue}
                </span>
              </div>

              <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8 font-sans">
                "{item.quote}"
              </p>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#DD183B] to-[#111111] flex items-center justify-center text-white font-black font-display text-xl shrink-0 shadow-lg">
                {item.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">{item.name}</h3>
                <p className="text-xs text-[#8E8E8E] uppercase tracking-wider font-medium">
                  {item.role} // <span className="text-white/80">{item.company}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
