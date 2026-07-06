import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Cpu, Gauge, Zap, ArrowUpRight } from 'lucide-react';

interface HeroSectionProps {
  onLaunchExperience: () => void;
  onOpenShowreel?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLaunchExperience,
}) => {
  // Score count-up state for SEO Score card
  const [score, setScore] = useState(0);

  // Mobile check state to avoid loading/calculating on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse tilt / parallax position for desktop dashboard
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Count up animation for SEO score (0 -> 93)
  useEffect(() => {
    if (isMobile) return;
    let start = 0;
    const end = 93;
    const duration = 2000;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setScore(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isMobile]);

  // Track mouse movement over dashboard canvas for subtle 3D tilt & parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dashboardRef.current) return;
    const rect = dashboardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalized values from -1 to 1
    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);

    setMouseOffset({
      x: Math.max(-1, Math.min(1, normX)),
      y: Math.max(-1, Math.min(1, normY)),
    });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section className="relative z-10 min-h-screen md:min-h-screen min-h-[auto] pt-24 pb-8 md:pt-28 md:pb-16 px-6 md:px-12 flex items-center max-w-7xl mx-auto w-full overflow-hidden">
      <div className="grid grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        
        {/* ====================================================
            LEFT EDITORIAL COPY COLUMN (PRESERVED EXACTLY)
           ==================================================== */}
        <div className="col-span-12 lg:col-span-6 xl:col-span-6 flex flex-col justify-center pr-0 lg:pr-4">
          
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-6 flex items-center gap-4"
          >
            <span className="h-[1.5px] w-12 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">
              The New Digital Standard
            </span>
          </motion.div>

          {/* Monumental Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-[64px] sm:text-[90px] md:text-[110px] xl:text-[124px] leading-[0.88] font-black tracking-tighter uppercase mb-8 font-display text-white"
          >
            BUILD.
            <br />
            RANK.
            <br />
            <span className="text-transparent text-stroke-white hover:text-stroke-accent transition-all duration-500 cursor-default inline-block">
              SCALE.
            </span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="text-[#8E8E8E] text-lg sm:text-xl leading-relaxed max-w-[540px] mb-10 font-sans"
          >
            We drive digital growth for brands through custom website development, strategic SEO, and performance marketing.
          </motion.p>

          {/* Single Primary CTA: "Let's Talk Growth" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
            className="flex items-center"
          >
            <button
              onClick={onLaunchExperience}
              data-interactive="true"
              className="group w-full sm:w-auto bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white px-10 py-5 font-black uppercase text-xs tracking-[0.25em] transition-all duration-300 rounded-xl shadow-[0_0_35px_rgba(221,24,59,0.3)] cursor-pointer flex items-center justify-center gap-3 min-h-[48px]"
            >
              <span>Let's Talk Growth</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* ====================================================
            RIGHT SIDE: UNIFIED 4-CARD SEO INTELLIGENCE DASHBOARD
           ==================================================== */}
        {!isMobile && (
          <div 
            ref={dashboardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="col-span-12 lg:col-span-6 xl:col-span-6 relative flex flex-col items-center justify-center min-h-[520px] lg:min-h-[580px] py-4 lg:py-0"
          >
            {/* ==================== DESKTOP CANVAS (Identical Uniform Cards) ==================== */}
            <div className="hidden lg:block relative w-full h-[540px] perspective-[1000px]">
              
              {/* ----------------------------------------------------
                  CENTER BRAND BLOCK (PRIMARY VISUAL FOCUS)
                 ---------------------------------------------------- */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  x: mouseOffset.x * 4,
                  y: mouseOffset.y * 4,
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.6 },
                  scale: { duration: 0.8, delay: 0.6 },
                  x: { type: 'spring', damping: 25, stiffness: 150 },
                  y: { type: 'spring', damping: 25, stiffness: 150 },
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center select-none w-max pointer-events-none p-8"
              >
                {/* Soft Crimson Ambient Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#DD183B]/15 rounded-full filter blur-3xl pointer-events-none -z-10 animate-pulse" />

                {/* Primary Visual Focus */}
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black uppercase tracking-tighter font-display text-white leading-none mb-3">
                  VClick <span className="text-[#DD183B]">Digitally</span>
                </h2>

                {/* Subtle Taglines */}
                <div className="flex flex-col items-center gap-1">
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-[#8E8E8E] font-sans">
                    Search Intelligence.
                  </p>
                  <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-[#8E8E8E] font-sans">
                    Growth Engine.
                  </p>
                </div>
              </motion.div>

              {/* ----------------------------------------------------
                  CARD 01: AI SEARCH (TOP-LEFT CORNER) - UNIFORM 230x160
                 ---------------------------------------------------- */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ 
                  opacity: 1,
                  y: [0, -9, 0],
                  rotate: [-1, 1, -1],
                  x: mouseOffset.x * -10,
                  rotateX: mouseOffset.y * -8,
                  rotateY: mouseOffset.x * 8,
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.75 },
                  y: { duration: 6.8, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 7.5, repeat: Infinity, ease: 'easeInOut' },
                  x: { type: 'spring', damping: 20, stiffness: 120 },
                  rotateX: { type: 'spring', damping: 20, stiffness: 120 },
                  rotateY: { type: 'spring', damping: 20, stiffness: 120 },
                }}
                whileHover={{ scale: 1.04, y: -6, borderColor: 'rgba(221, 24, 59, 0.5)' }}
                className="absolute top-4 left-4 bg-[#111111]/85 backdrop-blur-xl border border-white/20 hover:border-[#DD183B]/50 p-4 rounded-xl w-[230px] h-[160px] shadow-2xl glass-card z-30 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Heading: Prominent Solid White (#FFFFFF) */}
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-white font-display">AI SEARCH</span>
                  <span className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider text-white/90 bg-white/10 px-1.5 py-0.5 rounded border border-white/10 font-sans">
                    <span className="w-1 h-1 rounded-full bg-[#DD183B] animate-pulse" />
                    OPTIMIZED
                  </span>
                </div>

                {/* Primary Visual & Main Text */}
                <div className="flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-[#DD183B] group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <p className="text-sm sm:text-base font-black tracking-tight text-white font-display uppercase">AI Ready</p>
                    <p className="text-[10px] text-[#8E8E8E] font-medium tracking-wide font-sans">Multi-LLM Indexing</p>
                  </div>
                </div>

                {/* Supporting Text Line */}
                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[9px] text-[#8E8E8E] font-sans">
                  <span>ChatGPT • Claude • Gemini</span>
                </div>
              </motion.div>

              {/* ----------------------------------------------------
                  CARD 02: HIGH-DR BACKLINKS (TOP-RIGHT CORNER) - UNIFORM 230x160
                 ---------------------------------------------------- */}
              <motion.div
                initial={{ opacity: 0, y: -25 }}
                animate={{ 
                  opacity: 1,
                  y: [0, 9, 0],
                  rotate: [1, -1, 1],
                  x: mouseOffset.x * 12,
                  rotateX: mouseOffset.y * 6,
                  rotateY: mouseOffset.x * -6,
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 0.9 },
                  y: { duration: 7.2, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 6.8, repeat: Infinity, ease: 'easeInOut' },
                  x: { type: 'spring', damping: 20, stiffness: 120 },
                  rotateX: { type: 'spring', damping: 20, stiffness: 120 },
                  rotateY: { type: 'spring', damping: 20, stiffness: 120 },
                }}
                whileHover={{ scale: 1.04, y: 6, borderColor: 'rgba(221, 24, 59, 0.5)' }}
                className="absolute top-4 right-4 bg-[#111111]/85 backdrop-blur-xl border border-white/20 hover:border-[#DD183B]/50 p-4 rounded-xl w-[230px] h-[160px] shadow-2xl glass-card z-30 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Heading: Prominent Solid White (#FFFFFF) */}
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-white font-display">SEO SCORE</span>
                  <div className="flex items-center gap-1 bg-[#DD183B]/10 px-1.5 py-0.5 rounded border border-[#DD183B]/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#DD183B]" />
                    <span className="text-[8px] font-bold text-[#DD183B] font-sans">AUDITED</span>
                  </div>
                </div>

                {/* Primary Visual & Main Text (SEO Score Count-up) */}
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
                      {/* Background circle */}
                      <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5" fill="none" />
                      {/* Animated foreground ring */}
                      <circle cx="20" cy="20" r="16" stroke="#DD183B" strokeWidth="4" strokeDasharray="100" strokeDashoffset={100 - score * 0.93} strokeLinecap="round" fill="none" className="transition-all duration-100" />
                    </svg>
                    <span className="absolute text-[13px] font-black text-white font-display">{score}+</span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-black tracking-tight text-white font-display uppercase">93+</p>
                    <p className="text-[10px] text-[#8E8E8E] font-medium tracking-wide font-sans">Technical Excellence</p>
                  </div>
                </div>

                {/* Supporting Text Line */}
                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[9px] text-[#8E8E8E] font-sans">
                  <span>Continuous Audit • 99.8% Passed</span>
                </div>
              </motion.div>

              {/* ----------------------------------------------------
                  CARD 03: CONVERSION UX (BOTTOM-LEFT CORNER) - UNIFORM 230x160
                 ---------------------------------------------------- */}
              <motion.div
                initial={{ opacity: 0, x: -25 }}
                animate={{ 
                  opacity: 1,
                  y: [0, 8, 0],
                  rotate: [-1.5, 1, -1.5],
                  x: mouseOffset.x * -12,
                  rotateX: mouseOffset.y * -6,
                  rotateY: mouseOffset.x * 6,
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 1.05 },
                  y: { duration: 6.5, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 8.2, repeat: Infinity, ease: 'easeInOut' },
                  x: { type: 'spring', damping: 20, stiffness: 120 },
                  rotateX: { type: 'spring', damping: 20, stiffness: 120 },
                  rotateY: { type: 'spring', damping: 20, stiffness: 120 },
                }}
                whileHover={{ scale: 1.04, y: 4, borderColor: 'rgba(221, 24, 59, 0.5)' }}
                className="absolute bottom-4 left-4 bg-[#111111]/85 backdrop-blur-xl border border-[#DD183B]/40 p-4 rounded-xl w-[230px] h-[160px] shadow-[0_0_30px_rgba(221,24,59,0.12)] glass-card z-30 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Heading: Prominent Solid White (#FFFFFF) */}
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-white font-display">MARKET DOMINANCE</span>
                  <span className="text-[9.5px] text-[#DD183B] font-black uppercase font-sans">Organic Growth</span>
                </div>

                {/* Primary Visual & Main Text (Mini Sparkline bar-chart representation) */}
                <div className="flex items-end justify-center gap-1.5 h-11 px-1 mt-1">
                  <div className="w-2.5 h-4 bg-white/20 rounded-t" />
                  <div className="w-2.5 h-7 bg-white/20 rounded-t" />
                  <div className="w-2.5 h-5 bg-white/20 rounded-t" />
                  <div className="w-2.5 h-9 bg-[#DD183B] rounded-t animate-pulse" />
                  <div className="w-2.5 h-12 bg-[#DD183B] rounded-t shadow-[0_0_10px_rgba(221,24,59,0.5)]" />
                </div>

                {/* Supporting Text Line */}
                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[9px] text-[#DD183B] font-bold font-sans">
                  <span>Algorithmic Monopolies</span>
                </div>
              </motion.div>

              {/* ----------------------------------------------------
                  CARD 04: SITE SPEED VITAL (BOTTOM-RIGHT CORNER) - UNIFORM 230x160
                 ---------------------------------------------------- */}
              <motion.div
                initial={{ opacity: 0, x: 25 }}
                animate={{ 
                  opacity: 1,
                  y: [0, -8, 0],
                  rotate: [1, -1.5, 1],
                  x: mouseOffset.x * 10,
                  rotateX: mouseOffset.y * 8,
                  rotateY: mouseOffset.x * -8,
                }}
                transition={{
                  opacity: { duration: 0.8, delay: 1.2 },
                  y: { duration: 7.0, repeat: Infinity, ease: 'easeInOut' },
                  rotate: { duration: 7.0, repeat: Infinity, ease: 'easeInOut' },
                  x: { type: 'spring', damping: 20, stiffness: 120 },
                  rotateX: { type: 'spring', damping: 20, stiffness: 120 },
                  rotateY: { type: 'spring', damping: 20, stiffness: 120 },
                }}
                whileHover={{ scale: 1.04, y: -4, borderColor: 'rgba(221, 24, 59, 0.5)' }}
                className="absolute bottom-4 right-4 bg-[#111111]/85 backdrop-blur-xl border border-white/20 hover:border-[#DD183B]/50 p-4 rounded-xl w-[230px] h-[160px] shadow-2xl glass-card z-30 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Heading: Prominent Solid White (#FFFFFF) */}
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-white font-display">PERFORMANCE</span>
                  <Zap className="w-3.5 h-3.5 text-[#DD183B] animate-pulse" />
                </div>

                {/* Primary Visual & Main Text */}
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center relative">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" 
                        className="animate-spin"
                        style={{ transformOrigin: 'center', animationDuration: '6s' }}
                      />
                    </svg>
                    <Gauge className="w-3 h-3 text-white absolute bottom-1" />
                  </div>

                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-white font-display">Built to Convert</p>
                    <p className="text-[10px] text-[#8E8E8E] tracking-tight font-sans">Core Web Vitals Optimized</p>
                  </div>
                </div>

                {/* Supporting Text Line */}
                <div className="pt-1.5 border-t border-white/20 flex items-center justify-between">
                  <p className="text-[9px] text-[#8E8E8E] font-sans">Fast • Stable • Optimized</p>
                </div>
              </motion.div>

            </div>

            {/* ==================== MOBILE / TABLET STACK ==================== */}
            <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-12">
              
              {/* Mobile Center Brand Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center py-6 px-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/20 relative overflow-hidden"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-[#DD183B]/15 rounded-full filter blur-2xl pointer-events-none" />
                <h2 className="text-2xl font-black uppercase tracking-tight font-display text-white mb-2">
                  VClick <span className="text-[#DD183B]">Digitally</span>
                </h2>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#8E8E8E] font-sans">
                  Search Intelligence. Growth Engine.
                </p>
              </motion.div>

              {/* Card 01 - AI Search */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="bg-[#111111] border border-white/20 p-4 rounded-xl w-full flex flex-col justify-between h-[160px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-white font-display">AI SEARCH</span>
                  <span className="text-[9px] font-bold uppercase text-white/90 bg-white/10 px-2 py-0.5 rounded font-sans">OPTIMIZED</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Cpu className="w-4 h-4 text-[#DD183B]" />
                  <div>
                    <p className="text-xs font-black uppercase text-white font-display">AI Ready</p>
                    <p className="text-[10px] text-[#8E8E8E] font-sans">Multi-LLM Indexing</p>
                  </div>
                </div>
                <p className="text-[9px] font-sans text-white/80 tracking-wider">ChatGPT • Claude • Gemini</p>
              </motion.div>

              {/* Card 02 - SEO Score */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-[#111111] border border-white/20 p-4 rounded-xl w-full flex flex-col justify-between h-[160px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-white font-display">SEO SCORE</span>
                  <div className="flex items-center gap-1 bg-[#DD183B]/10 px-2 py-0.5 rounded border border-[#DD183B]/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#DD183B]" />
                    <span className="text-[9px] font-bold text-[#DD183B] font-sans">AUDITED</span>
                  </div>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="relative w-11 h-11 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
                      <circle cx="20" cy="20" r="16" stroke="#DD183B" strokeWidth="3.5" strokeDasharray="100" strokeDashoffset={100 - score * 0.93} strokeLinecap="round" fill="none" />
                    </svg>
                    <span className="absolute text-xs font-black text-white font-display">{score}+</span>
                  </div>
                  <div>
                    <p className="text-sm font-black text-white font-display">93+</p>
                    <p className="text-xs text-[#8E8E8E] font-sans">Technical Excellence</p>
                  </div>
                </div>
                <p className="text-[9px] text-[#8E8E8E] font-sans">Continuous Audit • 99.8% Passed</p>
              </motion.div>

              {/* Card 03 - Market Dominance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.05 }}
                className="bg-[#111111] border border-[#DD183B]/40 p-4 rounded-xl w-full shadow-[0_0_20px_rgba(221,24,59,0.15)] flex flex-col justify-between h-[160px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-white font-display">MARKET DOMINANCE</span>
                  <span className="text-[9.5px] text-[#DD183B] font-bold uppercase font-sans">Organic Growth</span>
                </div>
                <div className="flex items-end justify-center gap-2 h-11 px-1">
                  {[25, 45, 30, 75, 100].map((h, idx) => (
                    <div key={idx} style={{ height: `${h}%` }} className={`w-2.5 rounded-t ${idx >= 3 ? 'bg-[#DD183B]' : 'bg-white/20'}`} />
                  ))}
                </div>
                <p className="text-[9px] text-[#8E8E8E] font-sans">Algorithmic Monopolies</p>
              </motion.div>

              {/* Card 04 - Performance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="bg-[#111111] border border-white/20 p-4 rounded-xl w-full flex flex-col justify-between h-[160px]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-white font-display">PERFORMANCE</span>
                  <Zap className="w-3.5 h-3.5 text-[#DD183B]" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-white font-display">Built to Convert</p>
                  <p className="text-[10px] text-[#8E8E8E] font-sans">Core Web Vitals Optimized</p>
                </div>
                <p className="text-[9px] text-[#8E8E8E] font-sans">Fast • Stable • Optimized</p>
              </motion.div>

            </div>

          </div>
        )}
      </div>
    </section>
  );
};
