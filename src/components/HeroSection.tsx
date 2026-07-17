"use client";

import React, { useState, useEffect, useRef } from 'react';
import { m as motion, useMotionValue, useSpring, useTransform, useMotionValueEvent, animate, MotionValue } from 'framer-motion';
import { ShieldCheck, Cpu, Gauge, Zap } from 'lucide-react';

const AnimatedScoreText = ({ 
  score, 
  suffix = "+", 
  className 
}: { 
  score: MotionValue<number>; 
  suffix?: string; 
  className?: string; 
}) => {
  const [roundedScore, setRoundedScore] = useState(0);
  
  useMotionValueEvent(score, "change", (latest) => {
    setRoundedScore(Math.round(latest));
  });

  return (
    <span className={className}>
      {roundedScore}{suffix}
    </span>
  );
};

export const HeroSection: React.FC = () => {
  const onLaunchExperience = () => {
    const servicesElement = document.getElementById('services');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Score count-up MotionValue for Card 01
  const score = useMotionValue(0);
  const strokeDashoffset = useTransform(score, value => 100 - value * 0.93);

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
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Motion value transformations for individual cards to prevent re-renders
  const c0X = useTransform(smoothMouseX, x => x * 6);
  const c0Y = useTransform(smoothMouseY, y => y * 6);

  const c1X = useTransform(smoothMouseX, x => x * 14);
  const c1RotateX = useTransform(smoothMouseY, y => y * -12);
  const c1RotateY = useTransform(smoothMouseX, x => x * 12);

  const c2X = useTransform(smoothMouseX, x => x * -18);
  const c2RotateX = useTransform(smoothMouseY, y => y * -10);
  const c2RotateY = useTransform(smoothMouseX, x => x * 10);

  const c3X = useTransform(smoothMouseX, x => x * -12);
  const c3RotateX = useTransform(smoothMouseY, y => y * -8);
  const c3RotateY = useTransform(smoothMouseX, x => x * 8);

  const c5X = useTransform(smoothMouseX, x => x * 16);
  const c5RotateX = useTransform(smoothMouseY, y => y * -12);
  const c5RotateY = useTransform(smoothMouseX, x => x * 12);

  // Count up animation for SEO score (0 -> 93) using Framer Motion animate to avoid React re-renders
  useEffect(() => {
    if (isMobile) return;
    const controls = animate(score, 93, {
      duration: 2,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [isMobile]);

  // Track mouse movement over dashboard canvas for 3D tilt & parallax, throttled via requestAnimationFrame
  const ticking = useRef(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dashboardRef.current) return;
    
    const clientX = e.clientX;
    const clientY = e.clientY;

    if (!ticking.current) {
      window.requestAnimationFrame(() => {
        if (!dashboardRef.current) {
          ticking.current = false;
          return;
        }
        const rect = dashboardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Normalized values from -1 to 1
        const normX = (clientX - centerX) / (rect.width / 2);
        const normY = (clientY - centerY) / (rect.height / 2);

        mouseX.set(Math.max(-1, Math.min(1, normX)));
        mouseY.set(Math.max(-1, Math.min(1, normY)));
        
        ticking.current = false;
      });
      ticking.current = true;
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative z-10 lg:h-screen lg:max-h-screen pt-20 pb-8 lg:py-0 px-6 md:px-12 flex items-center max-w-7xl mx-auto w-full overflow-hidden">
      <div className="grid grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        
        {/* ====================================================
            LEFT EDITORIAL COPY COLUMN (PRESERVED EXACTLY)
           ==================================================== */}
        <div className="col-span-12 lg:col-span-6 xl:col-span-6 flex flex-col justify-center pr-0 lg:pr-4">
          
          {/* Tagline */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-4 flex items-center gap-4"
          >
            <span className="h-[1.5px] w-12 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
              The New Digital Standard
            </span>
          </motion.div>

          {/* Monumental Headline */}
          <motion.h1
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-[52px] sm:text-[76px] md:text-[90px] xl:text-[105px] leading-[0.88] font-black tracking-tighter uppercase mb-6 font-display"
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
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="text-[#8E8E8E] text-base sm:text-lg leading-relaxed max-w-[500px] mb-8"
          >
            We engineer high-ticket digital growth for world-class brands through precision branding and aggressive search dominance.
          </motion.p>

          {/* Single Primary CTA: "Let's Talk Growth" */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
            className="flex items-center"
          >
            <button
              onClick={onLaunchExperience}
              data-interactive="true"
              className="group relative flex items-center gap-4 bg-[#DD183B] px-6 py-4 text-[13px] font-bold uppercase tracking-widest hover:bg-white hover:text-[#0B0B0B] transition-all duration-300 shadow-[0_0_35px_rgba(221,24,59,0.4)] cursor-pointer overflow-hidden"
            >
              <span className="relative z-10">Let's Talk Growth</span>
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
          </motion.div>
        </div>

        {/* ====================================================
            RIGHT SIDE: PREMIUM SEO INTELLIGENCE DASHBOARD (Desktop/Tablet)
           ==================================================== */}
          <div 
            ref={dashboardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="hidden md:flex col-span-12 lg:col-span-6 xl:col-span-6 relative flex-col items-center justify-center min-h-[500px] lg:min-h-[540px] py-6 lg:py-0"
          >
            {/* ==================== DESKTOP CANVAS (Floating Dashboard) ==================== */}
            <div className="hidden lg:block relative w-full max-w-[520px] mx-auto h-[500px] perspective-[1000px]">
              
              {/* Subtle ambient lighting glows (No visible lines) */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-visible opacity-20">
                <div className="absolute top-[20%] left-[20%] w-32 h-32 bg-[#DD183B]/10 rounded-full filter blur-3xl pointer-events-none" />
                <div className="absolute bottom-[20%] right-[20%] w-32 h-32 bg-white/5 rounded-full filter blur-3xl pointer-events-none" />
              </div>

              {/* ----------------------------------------------------
                  CENTER TYPOGRAPHY & AMBIENT CRIMSON GLOW
                 ---------------------------------------------------- */}
              <motion.div
                initial={false}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                style={{
                  x: c0X,
                  y: c0Y,
                }}
                transition={{ 
                  opacity: { duration: 1.0, delay: 0.4 },
                  scale: { duration: 1.0, delay: 0.4 },
                  filter: { duration: 1.0, delay: 0.4 },
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 text-center select-none w-max pointer-events-none"
              >
                {/* Soft Crimson Ambient Glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.15, 0.28, 0.15]
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#DD183B]/20 rounded-full filter blur-3xl pointer-events-none -z-10"
                />

                <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter font-display text-white mb-2.5 leading-none">
                  VCLICK <span className="text-[#DD183B]">DIGITALLY</span>
                </h2>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-[#8E8E8E] mb-1 font-sans">
                  Search Intelligence.
                </p>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-[#8E8E8E] font-sans">
                  Growth Engine.
                </p>
              </motion.div>

              {/* ----------------------------------------------------
                  CARD 01: SEO SCORE (Top-Right)
                 ---------------------------------------------------- */}
              <motion.div
                initial={false}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                style={{ willChange: 'transform, opacity' }}
                className="absolute top-4 right-2 z-30"
              >
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [1, -1, 1] }}
                  transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
                  style={{ willChange: 'transform' }}
                >
                  <motion.div
                    style={{ 
                      x: c1X,
                      rotateX: c1RotateX,
                      rotateY: c1RotateY,
                    }}
                    whileHover={{ 
                      scale: 1.04, 
                      y: -8, 
                      borderColor: 'rgba(221, 24, 59, 0.5)',
                      boxShadow: '0 25px 50px -12px rgba(221, 24, 59, 0.25), 0 0 20px 0 rgba(221, 24, 59, 0.15)'
                    }}
                    className="bg-[#111111]/85 backdrop-blur-xl border border-white/10 p-5 rounded-xl w-[210px] shadow-2xl glass-card transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] uppercase tracking-widest text-[#8E8E8E] font-bold">SEO Score</span>
                      <div className="flex items-center gap-1 bg-[#DD183B]/10 px-2 py-0.5 rounded border border-[#DD183B]/20">
                        <ShieldCheck className="w-3 h-3 text-[#DD183B] animate-pulse" />
                        <span className="text-[8px] font-bold text-[#DD183B]">AUDITED</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 my-2">
                      {/* SVG Progress Ring */}
                      <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
                          <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
                          <motion.circle
                            cx="20"
                            cy="20"
                            r="16"
                            stroke="#DD183B"
                            strokeDasharray="100"
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            fill="none"
                            className="animate-pulse-stroke"
                          />
                        </svg>
                        <AnimatedScoreText
                          score={score}
                          suffix="+"
                          className="absolute text-[11px] font-black tracking-tighter text-white font-display"
                        />
                      </div>

                      <div>
                        <p className="text-xs font-black text-white tracking-tight font-display">93+</p>
                        <p className="text-[9px] text-[#8E8E8E] font-medium tracking-wide">Technical Excellence</p>
                      </div>
                    </div>

                    <div className="h-[1px] bg-white/10 my-3" />
                    
                    <div className="text-[9px] text-[#8E8E8E] font-medium tracking-wide">
                      Continuous Audit • 99.8% Passed
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* ----------------------------------------------------
                  CARD 02: MARKET DOMINANCE (Bottom-Left)
                 ---------------------------------------------------- */}
              <motion.div
                initial={false}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                style={{ willChange: 'transform, opacity' }}
                className="absolute bottom-2 left-0 z-30"
              >
                <motion.div
                  animate={{ y: [0, 8, 0], rotate: [-1.5, 1.5, -1.5] }}
                  transition={{ duration: 7.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                  style={{ willChange: 'transform' }}
                >
                  <motion.div
                    style={{ 
                      x: c2X,
                      rotateX: c2RotateX,
                      rotateY: c2RotateY,
                    }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -8, 
                      borderColor: 'rgba(221, 24, 59, 0.5)',
                      boxShadow: '0 25px 50px -12px rgba(221, 24, 59, 0.25), 0 0 20px 0 rgba(221, 24, 59, 0.15)'
                    }}
                    className="bg-[#111111]/90 backdrop-blur-xl border border-[#DD183B]/30 p-5 rounded-xl w-[210px] shadow-2xl glass-card transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-[#8E8E8E] leading-tight">
                        Market<br />Dominance
                      </div>
                      <div className="text-right leading-tight">
                        <div className="text-[8px] text-[#DD183B] font-bold uppercase tracking-wider">Organic</div>
                        <div className="text-[8px] text-[#DD183B] font-bold uppercase tracking-wider">Growth</div>
                      </div>
                    </div>

                    {/* Sleek Animated Financial Bars - Optimized scaleY and bounce for 60 FPS */}
                    <motion.div 
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="flex items-end justify-center gap-1.5 h-12 my-2 px-1"
                    >
                      {[
                        { scaleYAnim: [0.15, 0.35, 0.15], dur: 1.8, delay: 0 },
                        { scaleYAnim: [0.3, 0.6, 0.3], dur: 2.0, delay: 0.15 },
                        { scaleYAnim: [0.2, 0.45, 0.2], dur: 1.7, delay: 0.3 },
                        { scaleYAnim: [0.55, 0.85, 0.55], dur: 2.2, delay: 0.45 },
                        { scaleYAnim: [0.75, 1.0, 0.75], dur: 1.9, delay: 0.6 },
                      ].map((bar, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ scaleY: 0.1, originY: 1 }}
                          animate={{ 
                            scaleY: bar.scaleYAnim,
                            opacity: idx >= 3 ? [0.8, 1, 0.8] : 1
                          }}
                          transition={{ 
                            scaleY: { duration: bar.dur, repeat: Infinity, ease: 'easeInOut', delay: bar.delay },
                            opacity: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                          }}
                          style={{ willChange: 'transform' }}
                          className={`w-2.5 h-10 rounded-t transition-shadow duration-300 ${
                            idx >= 3 
                              ? 'bg-gradient-to-t from-[#DD183B]/50 to-[#DD183B] shadow-[0_0_12px_rgba(221,24,59,0.7)] border border-[#DD183B]/20' 
                              : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </motion.div>

                    <div className="h-[1px] bg-white/10 my-3" />

                    <div className="text-[9px] text-[#DD183B] font-bold uppercase tracking-wider animate-pulse">
                      Algorithmic Monopolies
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* ----------------------------------------------------
                  CARD 03: AI SEARCH OPTIMIZED (Top-Left)
                 ---------------------------------------------------- */}
              <motion.div
                initial={false}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                style={{ willChange: 'transform, opacity' }}
                className="absolute top-2 left-2 z-30"
              >
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [-1, 1, -1] }}
                  transition={{ duration: 6.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                  style={{ willChange: 'transform' }}
                >
                  <motion.div
                    style={{ 
                      x: c3X,
                      rotateX: c3RotateX,
                      rotateY: c3RotateY,
                    }}
                    whileHover={{ 
                      scale: 1.04, 
                      y: -8, 
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 25px 50px -12px rgba(255, 255, 255, 0.15)'
                    }}
                    className="bg-[#111111]/85 backdrop-blur-xl border border-white/10 p-5 rounded-xl w-[210px] shadow-2xl glass-card transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] uppercase tracking-widest text-[#8E8E8E] font-bold">AI Search</span>
                      <span className="relative overflow-hidden flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider text-white bg-white/5 px-2 py-0.5 rounded border border-white/15">
                        <span className="w-1 h-1 rounded-full bg-[#DD183B] animate-pulse" />
                        OPTIMIZED
                        <motion.span
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'linear' }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        />
                      </span>
                    </div>

                    <div className="flex items-center gap-3 my-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="flex items-center justify-center flex-shrink-0"
                      >
                        <Cpu className="w-5 h-5 text-[#DD183B]" />
                      </motion.div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-wider text-white">AI Ready</p>
                        <p className="text-[9px] text-[#8E8E8E] font-medium tracking-wide">Multi-LLM Indexing</p>
                      </div>
                    </div>

                    <div className="h-[1px] bg-white/10 my-3" />

                    {/* Platforms Typography Badges */}
                    <div className="text-[9px] text-[#8E8E8E] font-medium tracking-wide">
                      ChatGPT • Claude • Gemini
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* ----------------------------------------------------
                  CARD 05: PERFORMANCE (Bottom-Right)
                 ---------------------------------------------------- */}
              <motion.div
                initial={false}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
                style={{ willChange: 'transform, opacity' }}
                className="absolute bottom-4 right-0 z-30"
              >
                <motion.div
                  animate={{ y: [0, -8, 0], rotate: [-1.2, 1.2, -1.2] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                  style={{ willChange: 'transform' }}
                >
                  <motion.div
                    style={{ 
                      x: c5X,
                      rotateX: c5RotateX,
                      rotateY: c5RotateY,
                    }}
                    whileHover={{ 
                      scale: 1.04, 
                      y: -8, 
                      borderColor: 'rgba(221, 24, 59, 0.5)',
                      boxShadow: '0 25px 50px -12px rgba(221, 24, 59, 0.25), 0 0 20px 0 rgba(221, 24, 59, 0.15)'
                    }}
                    className="bg-[#111111]/85 backdrop-blur-xl border border-white/10 p-5 rounded-xl w-[210px] shadow-2xl glass-card transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] uppercase tracking-widest text-[#8E8E8E] font-bold">Performance</span>
                      <motion.div
                        animate={{
                          opacity: [1, 0.4, 1, 0.8, 0.2, 1, 1, 0.6, 1],
                        }}
                        transition={{
                          duration: 3.8,
                          repeat: Infinity,
                          ease: "linear",
                          repeatDelay: 1.5
                        }}
                      >
                        <Zap className="w-3.5 h-3.5 text-[#DD183B]" />
                      </motion.div>
                    </div>

                    <div className="flex items-center gap-3 my-2">
                      {/* Dark Rounded Box with Gauge Meter */}
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
                        <svg className="w-8 h-8 overflow-visible absolute top-1" viewBox="0 0 36 36">
                          <path
                            d="M 6 26 A 12 12 0 1 1 30 26"
                            fill="none"
                            stroke="rgba(255,255,255,0.15)"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 0.92 }}
                            transition={{ duration: 1.8, ease: 'easeOut', delay: 1.5 }}
                            d="M 6 26 A 12 12 0 1 1 30 26"
                            fill="none"
                            stroke="#DD183B"
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        <motion.div
                          animate={{ rotate: [-15, 25, -15] }}
                          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute bottom-1.5 origin-bottom"
                        >
                          <Gauge className="w-3.5 h-3.5 text-white" />
                        </motion.div>
                      </div>

                      <div>
                        <p className="text-xs font-black uppercase tracking-wider text-white">Built to Convert</p>
                        <p className="text-[9px] text-[#8E8E8E] font-medium tracking-wide">Core Web Vitals Optimized</p>
                      </div>
                    </div>

                    <div className="h-[1px] bg-white/10 my-3" />

                    <div className="text-[9px] text-[#8E8E8E] font-medium tracking-wide">
                      Fast • Stable • Optimized
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>

            </div>

            {/* ==================== TABLET STACK (Under Hero, Hidden on Mobile/Desktop) ==================== */}
            <div className="lg:hidden flex flex-col gap-4 w-full mt-8">
              
              {/* Tablet Center Typography Banner */}
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center py-6 px-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 relative overflow-hidden"
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#DD183B]/20 rounded-full filter blur-2xl pointer-events-none" />
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#DD183B] mb-1 font-sans">
                  VClick Digitally
                </p>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-display text-white">
                  Search Intelligence.
                </h2>
                <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-display text-transparent text-stroke-white">
                  Growth Engine.
                </h3>
              </motion.div>

              {/* Card 01 - SEO Score */}
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="bg-[#111111] border border-white/10 p-5 rounded-xl w-full"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold font-sans">SEO Score</span>
                  <div className="flex items-center gap-1 bg-[#DD183B]/10 px-2 py-0.5 rounded border border-[#DD183B]/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#DD183B]" />
                    <span className="text-[9px] font-bold text-[#DD183B] font-sans">AUDITED</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.1)" strokeWidth="3" fill="none" />
                      <motion.circle cx="20" cy="20" r="16" stroke="#DD183B" strokeWidth="3.5" strokeDasharray="100" strokeDashoffset={strokeDashoffset} strokeLinecap="round" fill="none" />
                    </svg>
                    <AnimatedScoreText
                      score={score}
                      suffix="+"
                      className="absolute text-xs font-black text-white font-display"
                    />
                  </div>
                  <div>
                    <p className="text-base font-black text-white font-display">93+</p>
                    <p className="text-xs text-[#8E8E8E] font-sans">Technical Excellence</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 02 - Market Dominance */}
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="bg-[#111111] border border-[#DD183B]/40 p-5 rounded-xl w-full shadow-[0_0_20px_rgba(221,24,59,0.15)]"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Market Dominance</span>
                  <span className="text-[10px] text-[#DD183B] font-bold uppercase font-sans">Organic Growth</span>
                </div>
                <div className="flex items-end justify-center gap-1.5 h-12 mb-2 px-1">
                  {[
                    { scaleYAnim: [0.15, 0.35, 0.15], dur: 1.8, delay: 0 },
                    { scaleYAnim: [0.3, 0.6, 0.3], dur: 2.0, delay: 0.15 },
                    { scaleYAnim: [0.2, 0.45, 0.2], dur: 1.7, delay: 0.3 },
                    { scaleYAnim: [0.55, 0.85, 0.55], dur: 2.2, delay: 0.45 },
                    { scaleYAnim: [0.75, 1.0, 0.75], dur: 1.9, delay: 0.6 },
                  ].map((bar, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scaleY: 0.1, originY: 1 }}
                      animate={{ scaleY: bar.scaleYAnim }}
                      transition={{ duration: bar.dur, repeat: Infinity, ease: 'easeInOut', delay: bar.delay }}
                      style={{ willChange: 'transform' }}
                      className={`w-3 h-10 rounded-t ${idx >= 3 ? 'bg-[#DD183B]' : 'bg-white/20'}`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Card 03 - AI Search */}
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.05 }}
                className="bg-[#111111] border border-white/10 p-5 rounded-xl w-full"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold font-sans">AI Search</span>
                  <span className="text-[9px] font-bold uppercase text-emerald-400 font-sans">OPTIMIZED</span>
                </div>
                <p className="text-xs font-mono text-white/80">ChatGPT • Claude • Gemini</p>
              </motion.div>

              {/* Card 05 - Performance */}
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="bg-[#111111] border border-white/10 p-5 rounded-xl w-full"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold font-sans">Performance</span>
                  <Zap className="w-4 h-4 text-[#DD183B]" />
                </div>
                <p className="text-xs font-black uppercase text-white">Built to Convert</p>
                <p className="text-[10px] text-[#8E8E8E] font-sans">Fast • Stable • Optimized</p>
              </motion.div>

            </div>

          </div>
      </div>
    </section>
  );
};
