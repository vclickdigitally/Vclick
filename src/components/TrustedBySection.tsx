import React from 'react';
import { motion } from 'motion/react';
import { TRUSTED_BRANDS } from '../data/mockData';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

export const TrustedBySection: React.FC = () => {
  // Split 17 real brands into two subsets for top and bottom marquee rows
  const topRowBrands = TRUSTED_BRANDS.slice(0, 9);
  const bottomRowBrands = TRUSTED_BRANDS.slice(9, 17);

  // Duplicate arrays for seamless infinite looping without gaps
  const topLoop = [...topRowBrands, ...topRowBrands, ...topRowBrands, ...topRowBrands];
  const bottomLoop = [...bottomRowBrands, ...bottomRowBrands, ...bottomRowBrands, ...bottomRowBrands];

  // Card component with mouse 3D tilt interaction
  const CardItem = ({ brand }: { brand: typeof TRUSTED_BRANDS[0] }) => {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      card.style.transform = `perspective(600px) rotateX(${-y / 8}deg) rotateY(${x / 8}deg) translateY(-8px) scale(1.03)`;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)';
    };

    return (
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-interactive="true"
        className="w-[170px] sm:w-[240px] h-[78px] sm:h-[102px] shrink-0 bg-[#111111]/85 backdrop-blur-xl border border-white/18 rounded-xl p-3 sm:p-4 shadow-2xl glass-card flex flex-col justify-between items-center transition-all duration-300 group cursor-pointer relative overflow-hidden"
        style={{ transition: 'transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s' }}
      >
        {/* Subtle Ambient Red Glow Overlay on Hover */}
        <div className="absolute inset-0 bg-[#DD183B]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Top Tagline & Arrow */}
        <div className="w-full flex items-center justify-between pointer-events-none z-10">
          <span className="text-[7px] sm:text-[9px] font-bold uppercase tracking-wider text-[#8E8E8E] group-hover:text-[#DD183B] transition-colors font-sans">
            {brand.category || 'ENTERPRISE'}
          </span>
          <ArrowUpRight className="w-2.5 h-2.5 text-white/30 group-hover:text-[#DD183B] transition-colors" />
        </div>

        {/* Monochrome White Logo Text -> Red on Hover */}
        <span className={`text-white/85 group-hover:text-[#DD183B] transition-colors duration-300 select-none text-center z-10 text-xs sm:text-sm md:text-base ${brand.style}`}>
          {brand.name}
        </span>

        {/* Bottom Micro Line */}
        <div className="w-full flex items-center justify-between text-[6.5px] sm:text-[7.5px] text-[#8E8E8E] opacity-0 group-hover:opacity-100 transition-opacity z-10 font-sans">
          <span>VERIFIED PARTNER</span>
          <ShieldCheck className="w-2.5 h-2.5 text-[#DD183B]" />
        </div>
      </div>
    );
  };

  return (
    <section className="relative z-20 py-16 md:py-24 bg-[#0B0B0B] border-t border-b border-white/5 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1.5px] w-10 bg-[#DD183B]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">
                Global Track Record
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white max-w-2xl leading-none">
              Trusted By <span className="text-transparent text-stroke-white">Industry</span> Leaders
            </h2>
          </div>
          <p className="text-[#8E8E8E] text-base sm:text-lg max-w-md leading-relaxed font-sans">
            Powering asymmetric organic growth and transactional search monopolies for category-defining unicorns and global enterprises.
          </p>
        </motion.div>
      </div>

      {/* Marquee Container with Left & Right Gradient Vignette Fades */}
      <div className="relative w-full overflow-hidden flex flex-col gap-6 select-none">
        
        {/* Left & Right Edge Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-40 bg-gradient-to-r from-[#0B0B0B] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-40 bg-gradient-to-l from-[#0B0B0B] to-transparent z-20 pointer-events-none" />

        {/* TOP ROW MARQUEE: Left-to-Right Continuous Scroll */}
        <div className="flex overflow-hidden w-full">
          <motion.div
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              x: { duration: 52, repeat: Infinity, ease: 'linear' },
            }}
            className="flex items-center gap-6 shrink-0"
          >
            {topLoop.map((brand, idx) => (
              <CardItem key={`top-${brand.name}-${idx}`} brand={brand} />
            ))}
          </motion.div>
        </div>

        {/* BOTTOM ROW MARQUEE: Right-to-Left Continuous Scroll */}
        <div className="flex overflow-hidden w-full">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: { duration: 52, repeat: Infinity, ease: 'linear' },
            }}
            className="flex items-center gap-6 shrink-0"
          >
            {bottomLoop.map((brand, idx) => (
              <CardItem key={`bottom-${brand.name}-${idx}`} brand={brand} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};
