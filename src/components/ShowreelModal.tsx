import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Volume2, Maximize2, Sparkles, Award } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        {/* Cinematic Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B0B0B]/95 backdrop-blur-2xl"
        />

        {/* Modal Player Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: 'spring', damping: 28, stiffness: 350 }}
          className="relative w-full max-w-5xl rounded-3xl bg-[#111111] border border-white/20 overflow-hidden shadow-[0_0_100px_rgba(221,24,59,0.35)] z-10 flex flex-col"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#0B0B0B]/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DD183B] animate-pulse shadow-[0_0_10px_#DD183B]" />
              <span className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                VCLICK_DIGITALLY // 2026_GLOBAL_SHOWREEL_4K
              </span>
            </div>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#DD183B] text-white/80 hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Video / Simulated High-End Canvas Viewport */}
          <div className="relative aspect-video w-full bg-[#0B0B0B] flex items-center justify-center overflow-hidden group">
            {/* Background Animated Abstract Mesh Simulation */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#DD183B]/20 via-[#0B0B0B] to-[#111111] animate-pulse duration-1000" />
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 50%, rgba(221,24,59,0.3) 0%, transparent 60%), linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
                backgroundSize: '100% 100%, 30px 30px, 30px 30px',
              }}
            />

            {/* Floating Brand Typography in Video */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute font-display font-black text-[120px] sm:text-[200px] tracking-tighter text-white/[0.04] select-none uppercase pointer-events-none"
            >
              DOMINANCE
            </motion.div>

            {/* Embedded Responsive Video or HTML5 Simulation */}
            <div className="relative z-10 text-center max-w-lg px-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 rounded-full border border-dashed border-[#DD183B]/50 flex items-center justify-center mx-auto mb-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#DD183B] flex items-center justify-center shadow-[0_0_40px_#DD183B]">
                  <Play className="w-6 h-6 fill-white text-white ml-1" />
                </div>
              </motion.div>
              <h4 className="text-3xl font-black uppercase font-display text-white tracking-tight mb-2">
                Engineering Unfair Digital Advantages
              </h4>
              <p className="text-[#8E8E8E] text-xs font-mono uppercase tracking-widest">
                [AUDIO CHOREOGRAPHY ACTIVE // GSAP WEB ARCHITECTURE]
              </p>
            </div>

            {/* Bottom Simulated Video HUD Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0B0B0B] to-transparent flex items-center justify-between opacity-80 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-4 text-xs font-mono text-[#8E8E8E]">
                <Play className="w-4 h-4 text-white fill-white cursor-pointer" />
                <span>01:42 / 02:15</span>
              </div>
              <div className="h-1 flex-1 mx-6 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-[76%] bg-[#DD183B] shadow-[0_0_10px_#DD183B]" />
              </div>
              <div className="flex items-center gap-4 text-[#8E8E8E]">
                <Volume2 className="w-4 h-4 hover:text-white cursor-pointer" />
                <Maximize2 className="w-4 h-4 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Accolades Footer */}
          <div className="p-6 bg-[#0B0B0B] border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>FWA Of The Month & Awwwards Site Of The Day Winner</span>
            </div>
            <div className="flex items-center gap-2 text-[#8E8E8E] font-mono">
              <Sparkles className="w-4 h-4 text-[#DD183B]" />
              <span>CLIENT ACQUISITION ENGINE v4.8</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
