import React from 'react';
import { motion } from 'motion/react';

export const ClientStatsSection: React.FC = () => {
  const stats = [
    {
      value: '17+',
      label: 'Happy Clients',
      description: 'Businesses across India, Singapore, Saudi Arabia and USA trusting VClick with their digital growth.'
    },
    {
      value: '4',
      label: 'Countries',
      description: 'India, Singapore, Saudi Arabia and USA — cross-border digital growth delivered consistently.'
    },
    {
      value: '4',
      label: 'Services Active',
      description: 'Web, SEO, Performance Marketing and Social — all active, all in-house, zero outsourcing.'
    },
    {
      value: '5+',
      label: 'Years Experience',
      description: 'Dhiwaagar brings 5+ years of hands-on digital marketing experience to every single project.'
    }
  ];

  return (
    <section className="relative z-20 py-16 md:py-24 px-6 md:px-12 bg-[#0B0B0B] border-b border-white/5 overflow-hidden w-full">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* ====================================================
            CARDS GRID (1, 2, 3, 4)
           ==================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              className="group relative bg-[#111111]/85 backdrop-blur-xl border border-white/15 hover:border-[#DD183B]/40 p-8 rounded-2xl shadow-2xl transition-all duration-400 flex flex-col justify-between min-h-[220px]"
            >
              {/* Subtle Red Spotlight Glow on Card Hover */}
              <div className="absolute inset-0 bg-[#DD183B]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Stat Number */}
              <div className="text-5xl sm:text-6xl font-black font-display text-white group-hover:text-[#DD183B] transition-colors duration-300 mb-6 leading-none">
                {stat.value}
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-lg font-black uppercase tracking-wider font-display text-white mb-2 group-hover:text-[#DD183B] transition-colors duration-300">
                  {stat.label}
                </h3>
                <p className="text-[#8E8E8E] text-xs sm:text-sm leading-relaxed font-sans">
                  {stat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
