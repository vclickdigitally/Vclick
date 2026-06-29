import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

interface HeroSectionProps {
  onLaunchExperience: () => void;
  onOpenShowreel: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLaunchExperience,
  onOpenShowreel,
}) => {
  return (
    <section className="relative z-10 min-h-screen pt-28 pb-16 px-6 md:px-12 flex items-center max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        {/* Left Editorial Copy Column */}
        <div className="col-span-12 lg:col-span-7 flex flex-col justify-center pr-0 lg:pr-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-[1.5px] w-12 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
              The New Digital Standard
            </span>
          </motion.div>

          {/* Monumental Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-[64px] sm:text-[90px] md:text-[110px] xl:text-[124px] leading-[0.88] font-black tracking-tighter uppercase mb-8 font-display"
          >
            BUILD.
            <br />
            RANK.
            <br />
            <span className="text-transparent text-stroke-white hover:text-stroke-accent transition-all duration-500 cursor-default inline-block">
              SCALE.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="text-[#8E8E8E] text-lg sm:text-xl leading-relaxed max-w-[540px] mb-10"
          >
            We engineer high-ticket digital growth for world-class brands through precision branding and aggressive search dominance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
            className="flex flex-wrap items-center gap-6"
          >
            <button
              onClick={onLaunchExperience}
              data-interactive="true"
              className="group relative flex items-center gap-4 bg-[#DD183B] px-8 py-5 text-[14px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#0B0B0B] transition-all duration-300 shadow-[0_0_35px_rgba(221,24,59,0.4)] cursor-pointer overflow-hidden"
            >
              <span className="relative z-10">Launch Experience</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative z-10 group-hover:translate-x-1.5 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <button
              onClick={onOpenShowreel}
              data-interactive="true"
              className="group flex items-center gap-3 text-[12px] font-bold uppercase tracking-widest border-b border-white/20 pb-1.5 hover:border-[#DD183B] hover:text-[#DD183B] transition-colors cursor-pointer"
            >
              <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#DD183B] group-hover:text-white transition-colors">
                <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
              </span>
              <span>View Showreel</span>
            </button>
          </motion.div>
        </div>

        {/* Right Interactive Visualization Column */}
        <div className="col-span-12 lg:col-span-5 relative flex items-center justify-center min-h-[440px] py-12 lg:py-0">
          {/* Animated Concentric Rings Network */}
          <div className="relative w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] border border-white/5 rounded-full flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[260px] sm:w-[340px] h-[260px] sm:h-[340px] border border-white/10 rounded-full border-dashed"
            />
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-[180px] sm:w-[220px] h-[180px] sm:h-[220px] border border-[#DD183B]/30 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[120px] sm:w-[150px] h-[120px] sm:h-[150px] border border-white/20 rounded-full flex items-start justify-end"
            >
              <div className="w-2.5 h-2.5 bg-[#DD183B] rounded-full shadow-[0_0_15px_#DD183B]" />
            </motion.div>

            {/* Glowing Core */}
            <motion.div
              animate={{ scale: [0.95, 1.1, 0.95] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="w-14 sm:w-16 h-14 sm:h-16 bg-[#DD183B] rounded-full shadow-[0_0_60px_rgba(221,24,59,0.8)] flex items-center justify-center cursor-pointer group"
              onClick={onOpenShowreel}
            >
              <span className="text-xs font-black uppercase tracking-tighter text-white sm:group-hover:scale-110 transition-transform">
                VC/D
              </span>
            </motion.div>
          </div>

          {/* Floating Glassmorphism Badge 1: Live Results (+240%) */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotate: 3 }}
            animate={{ opacity: 1, y: [0, -10, 0], rotate: [3, 5, 3] }}
            transition={{
              y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              opacity: { duration: 1 },
            }}
            className="absolute top-4 sm:top-1/4 right-0 sm:-right-4 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-lg w-[200px] sm:w-[220px] shadow-2xl glass-card hover:border-[#DD183B]/50 transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <p className="text-[10px] uppercase tracking-widest text-[#8E8E8E]">Live Results</p>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <p className="text-3xl sm:text-4xl font-black tracking-tighter font-display text-white">
              +240%
            </p>
            <p className="text-[11px] text-[#DD183B] font-bold uppercase tracking-wider mt-0.5">
              Organic Traffic ROI
            </p>
          </motion.div>

          {/* Floating Glassmorphism Badge 2: Market Dominance */}
          <motion.div
            initial={{ opacity: 0, y: -20, rotate: -6 }}
            animate={{ opacity: 1, y: [0, 10, 0], rotate: [-6, -4, -6] }}
            transition={{
              y: { duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 },
              opacity: { duration: 1, delay: 0.3 },
            }}
            className="absolute bottom-4 sm:bottom-1/4 left-0 sm:-left-4 bg-[#111111]/90 backdrop-blur-xl border border-white/10 p-6 rounded-lg w-[190px] sm:w-[210px] shadow-2xl glass-card"
          >
            <div className="flex items-end gap-1.5 h-12 mb-3">
              <motion.div animate={{ height: ['30%', '55%', '30%'] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 bg-white/20 rounded-t" />
              <motion.div animate={{ height: ['45%', '85%', '45%'] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-2 bg-white/40 rounded-t" />
              <motion.div animate={{ height: ['60%', '75%', '60%'] }} transition={{ duration: 1.8, repeat: Infinity }} className="w-2 bg-[#DD183B]/70 rounded-t" />
              <motion.div animate={{ height: ['75%', '100%', '75%'] }} transition={{ duration: 2.2, repeat: Infinity }} className="w-2 bg-[#DD183B] rounded-t shadow-[0_0_10px_#DD183B]" />
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest text-white">
              Market Dominance
            </p>
            <p className="text-[9px] text-[#8E8E8E] uppercase tracking-wider mt-0.5">Algorithmic Monopolies</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
