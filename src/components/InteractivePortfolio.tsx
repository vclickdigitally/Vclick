"use client";

import React, { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Globe, ShieldCheck, CheckCircle2, Cpu, ShoppingBag, GraduationCap, Megaphone } from 'lucide-react';

interface Project {
  client: string;
  service: string;
  navLabel: string;
  overview: string;
  deliverables: string[];
  url?: string;
  themeColor: string;
  mockupType: 'seo' | 'ecommerce' | 'web' | 'ads';
}

const PROJECTS_DATA: Project[] = [
  {
    client: 'Dodecan',
    service: 'SEO Optimization',
    navLabel: 'SEO Optimization',
    overview: 'Implemented a structured SEO strategy focused on improving technical performance, search visibility, and long-term organic growth.',
    deliverables: [
      'Technical SEO',
      'On-Page SEO',
      'Content Optimization',
      'Search Visibility Improvements'
    ],
    themeColor: '#DD183B',
    mockupType: 'seo'
  },
  {
    client: 'Girly Colours',
    service: 'E-Commerce Website Development',
    navLabel: 'E-Commerce Website',
    overview: 'Designed and developed a modern e-commerce website focused on seamless shopping, mobile responsiveness, and future scalability.',
    deliverables: [
      'E-Commerce Website',
      'Responsive Design',
      'User Experience',
      'Performance Optimization'
    ],
    themeColor: '#10b981',
    mockupType: 'ecommerce'
  },
  {
    client: 'Murali Academy',
    service: 'Website Development',
    navLabel: 'Website Development',
    overview: 'Developed a professional educational website with a modern interface, responsive design, and SEO-friendly architecture.',
    deliverables: [
      'Custom Website Design',
      'Responsive Development',
      'SEO-Friendly Structure',
      'Fast Loading Performance'
    ],
    themeColor: '#8b5cf6',
    mockupType: 'web'
  },
  {
    client: 'Magic Minds Education',
    service: 'Meta Ads Campaign Management',
    navLabel: 'Meta Ads',
    overview: 'Created and managed Meta advertising campaigns to improve brand awareness, audience engagement, and lead generation.',
    deliverables: [
      'Campaign Strategy',
      'Audience Targeting',
      'Creative Optimization',
      'Performance Monitoring'
    ],
    themeColor: '#1877f2',
    mockupType: 'ads'
  }
];

export const InteractivePortfolio: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const activeProject = PROJECTS_DATA[selectedIdx];

  // Helper to render interactive CSS elements inside the mockup based on type
  const renderMockupVisual = (type: 'seo' | 'ecommerce' | 'web' | 'ads') => {
    switch (type) {
      case 'seo':
        return (
          <div className="p-6 h-full flex flex-col justify-between font-mono text-[10px] text-white/70">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="flex items-center gap-1.5 text-xs text-[#DD183B] font-bold">
                <Cpu className="w-3.5 h-3.5" /> SEARCH VISIBILITY ANALYTICS
              </span>
              <span className="bg-[#DD183B]/10 px-2 py-0.5 rounded text-[9px] text-[#DD183B] font-bold font-sans">LIVE REPORT</span>
            </div>
            
            {/* Charts & Mini Metrics */}
            <div className="grid grid-cols-3 gap-2 my-4">
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col justify-between">
                <span className="text-[8px] uppercase tracking-wider text-[#8E8E8E] font-sans">Visibility</span>
                <span className="text-sm font-black text-white">+420%</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col justify-between">
                <span className="text-[8px] uppercase tracking-wider text-[#8E8E8E] font-sans">Keywords</span>
                <span className="text-sm font-black text-white">Top 3</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg flex flex-col justify-between">
                <span className="text-[8px] uppercase tracking-wider text-[#8E8E8E] font-sans">Avg. Position</span>
                <span className="text-sm font-black text-[#DD183B]">1.4</span>
              </div>
            </div>

            {/* Keyword Rankings Table */}
            <div className="flex-1 bg-black/40 border border-white/5 rounded-lg p-3 overflow-hidden flex flex-col gap-2">
              <div className="flex justify-between text-[#8E8E8E] border-b border-white/5 pb-1 font-sans">
                <span>Target Query</span>
                <span>Position</span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>dodecan enterprise cloud</span>
                <span className="text-[#DD183B]">1</span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>dodecan platform</span>
                <span className="text-[#DD183B]">1</span>
              </div>
              <div className="flex justify-between text-white/90 opacity-60">
                <span>enterprise technology suite</span>
                <span className="text-[#DD183B]">2</span>
              </div>
            </div>
          </div>
        );
      case 'ecommerce':
        return (
          <div className="p-6 h-full flex flex-col justify-between font-sans text-xs text-white/80">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="flex items-center gap-2 font-bold text-white text-sm">
                <ShoppingBag className="w-4 h-4 text-emerald-400" /> Girly Colours Store
              </span>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-400/10 px-2 py-0.5 rounded-full">WooCommerce</span>
            </div>

            {/* Store Grid */}
            <div className="grid grid-cols-2 gap-3 my-4 flex-1 items-center">
              <div className="bg-white/5 border border-white/15 rounded-xl p-2.5 flex flex-col gap-1.5">
                <div className="w-full aspect-[4/3] rounded-lg bg-emerald-400/10 flex items-center justify-center text-[9px] text-white/50">Apparel Post</div>
                <div className="w-2/3 h-2 bg-white/20 rounded-full" />
                <div className="w-1/3 h-2 bg-emerald-400/40 rounded-full" />
              </div>
              <div className="bg-white/5 border border-white/15 rounded-xl p-2.5 flex flex-col gap-1.5">
                <div className="w-full aspect-[4/3] rounded-lg bg-emerald-400/10 flex items-center justify-center text-[9px] text-white/50">Apparel Post</div>
                <div className="w-2/3 h-2 bg-white/20 rounded-full" />
                <div className="w-1/3 h-2 bg-emerald-400/40 rounded-full" />
              </div>
            </div>

            {/* Simulated Checkout Speed */}
            <div className="bg-emerald-400/10 border border-emerald-400/20 p-2.5 rounded-lg text-center text-[10px] text-emerald-400 font-bold">
              ⚡ Checkout Completed in 0.8s (99 PageSpeed)
            </div>
          </div>
        );
      case 'web':
        return (
          <div className="p-6 h-full flex flex-col justify-between font-sans text-xs text-white/80">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="flex items-center gap-2 font-bold text-white text-sm">
                <GraduationCap className="w-4 h-4 text-purple-400" /> Murali Academy Portal
              </span>
              <span className="text-[10px] text-purple-400 font-semibold bg-purple-400/10 px-2 py-0.5 rounded-full">React Live</span>
            </div>

            {/* Portal Content Mock */}
            <div className="my-4 flex-1 bg-white/[0.03] border border-white/5 rounded-xl p-4 flex flex-col justify-center gap-2">
              <div className="w-2/3 h-3 bg-purple-400/30 rounded-full" />
              <div className="w-full h-2.5 bg-white/10 rounded-full" />
              <div className="w-4/5 h-2.5 bg-white/10 rounded-full" />
            </div>

            <div className="flex items-center justify-between text-[9px] text-[#8E8E8E] border-t border-white/10 pt-3">
              <span>Active Students: 1,200+</span>
              <span className="text-purple-400 font-bold">Responsive Dev</span>
            </div>
          </div>
        );
      case 'ads':
        return (
          <div className="p-6 h-full flex flex-col justify-between font-mono text-[10px] text-white/70">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="flex items-center gap-1.5 text-xs text-blue-400 font-bold">
                <Megaphone className="w-3.5 h-3.5" /> Meta Ads Dashboard
              </span>
              <span className="bg-blue-400/10 px-2 py-0.5 rounded text-[9px] text-blue-400 font-bold font-sans">ACTIVE RUN</span>
            </div>

            {/* Ad Metrics */}
            <div className="my-4 flex-1 flex flex-col justify-center gap-3">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>Impressions</span>
                <span className="text-white">350,000+</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span>CTR (Click-Thru)</span>
                <span className="text-emerald-400">4.1% (+150%)</span>
              </div>
              <div className="flex justify-between">
                <span>Qualified Leads</span>
                <span className="text-emerald-400">+240 Leads</span>
              </div>
            </div>

            {/* Campaign ROAS */}
            <div className="bg-blue-500/10 border border-blue-500/20 p-2.5 rounded-lg text-center text-[10px] text-blue-400 font-bold">
              ⚡ Verified ROAS Achieved: 4.8x
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="relative z-20 pt-10 pb-16 md:pt-14 md:pb-24 px-6 md:px-12 bg-[#0B0B0B] max-w-7xl mx-auto w-full border-b border-white/5 overflow-hidden">
      
      {/* ====================================================
          SECTION HEADER
         ==================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 md:mb-20 gap-8">
        <div>
          {/* Section Tag */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">
              OUR WORK
            </span>
          </div>
          {/* Main Title */}
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase font-display text-white max-w-2xl leading-none">
            Real Projects.<br />
            Real <span className="text-[#DD183B]">Impact.</span>
          </h2>
        </div>
        {/* Description */}
        <p className="text-[#8E8E8E] text-base sm:text-lg max-w-md leading-relaxed font-sans lg:mb-2">
          Explore a selection of real client projects that showcase our expertise across SEO, website development, e-commerce, and digital marketing.
        </p>
      </div>

      {/* ====================================================
          INTERACTIVE PORTFOLIO ASSEMBLY
         ==================================================== */}
      <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start w-full">
        
        {/* ----------------------------------------------------
            LEFT NAVIGATION (30% Desktop / Horiz scroll on Mobile)
           ---------------------------------------------------- */}
        <div className="col-span-12 lg:col-span-4 flex flex-col">
          <h3 className="hidden lg:block text-[11px] font-black uppercase tracking-widest text-white/95 mb-6 flex items-center gap-2 font-sans">
            <span>INDEXED PROJECTS</span>
            <span className="h-[1px] flex-1 bg-white/10" />
          </h3>

          {/* Horizontally scrollable container for Mobile, list for Desktop */}
          <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-3 lg:gap-2.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent w-full snap-x">
            {PROJECTS_DATA.map((project, index) => {
              const isActive = index === selectedIdx;
              
              return (
                <button
                  key={project.client}
                  onClick={() => setSelectedIdx(index)}
                  className={`snap-center shrink-0 lg:shrink-1 flex items-center justify-between text-left p-4 lg:p-5 rounded-xl border transition-all duration-300 group cursor-pointer w-[280px] lg:w-full relative overflow-hidden ${
                    isActive
                      ? 'bg-[#111111] border-white/20'
                      : 'bg-white/[0.01] border-white/15 hover:border-[#DD183B]/40 hover:bg-white/[0.03]'
                  }`}
                >
                  {/* Active Accent left border indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activePortfolioBorder"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-[#DD183B]"
                    />
                  )}

                  <div className="flex flex-col pr-4">
                    <span className={`text-base sm:text-lg font-black uppercase tracking-tight font-display transition-colors duration-300 ${isActive ? 'text-[#DD183B]' : 'text-white group-hover:text-[#DD183B]'}`}>
                      {project.client}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E8E] mt-1 font-sans">
                      {project.navLabel}
                    </span>
                  </div>

                  <ArrowRight className={`w-4 h-4 transition-all duration-300 ${isActive ? 'text-[#DD183B] translate-x-1' : 'text-white/30 group-hover:text-white group-hover:translate-x-1'}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* ----------------------------------------------------
            RIGHT SHOWCASE (70% Desktop / Below Navigation on Mobile)
           ---------------------------------------------------- */}
        <div className="col-span-12 lg:col-span-8 w-full flex flex-col gap-8 relative">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.client}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Browser / Canvas Mockup container */}
              <div className="col-span-12 lg:col-span-6 w-full flex flex-col">
                <motion.div 
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                  className="w-full bg-[#111111] border border-white/20 rounded-2xl shadow-2xl overflow-hidden relative"
                >
                  {/* Browser Bar */}
                  <div className="w-full bg-white/[0.04] border-b border-white/10 px-4 py-3 flex items-center justify-between">
                    {/* Traffic Lights */}
                    <div className="flex gap-1.5 items-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                    </div>
                    {/* Simulated URL */}
                    <div className="w-3/5 bg-black/40 rounded-md py-1 px-3 text-[9px] text-[#8E8E8E] font-sans truncate text-center select-none">
                      {activeProject.client.toLowerCase().replace(' ', '')}.com/preview
                    </div>
                    {/* Action Bullet */}
                    <div className="w-3 h-3 rounded-full bg-[#DD183B]/20 flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-[#DD183B]" />
                    </div>
                  </div>

                  {/* Browser canvas body */}
                  <div className="relative aspect-[4/3] bg-[#0A0A0A] overflow-hidden">
                    {renderMockupVisual(activeProject.mockupType)}
                  </div>
                </motion.div>
              </div>

              {/* Project Metadata details */}
              <div className="col-span-12 lg:col-span-6 flex flex-col justify-between h-full py-2">
                <div>
                  {/* Client title tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-[#DD183B] bg-[#DD183B]/10 px-3 py-1 rounded border border-[#DD183B]/20 font-sans">
                      {activeProject.client}
                    </span>
                    <span className="text-[10px] font-mono text-[#8E8E8E]">CASE_SPEC // {activeProject.mockupType.toUpperCase()}</span>
                  </div>

                  {/* Service Headline */}
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-display text-white mb-4">
                    {activeProject.service}
                  </h3>

                  {/* Overview text */}
                  <p className="text-[#8E8E8E] text-sm leading-relaxed mb-6 font-sans">
                    {activeProject.overview}
                  </p>

                  {/* Deliverables Checklist list */}
                  <div className="mb-8">
                    <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/90 mb-4 flex items-center gap-2 font-sans">
                      <span>What We Delivered</span>
                      <span className="h-[1px] flex-1 bg-white/10" />
                    </h4>
                    <div className="flex flex-col gap-2">
                      {activeProject.deliverables.map((item, idx) => (
                        <motion.div 
                          key={item}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx, duration: 0.4 }}
                          className="flex items-start gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/15 hover:border-white/20 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#DD183B] shrink-0 mt-0.5" />
                          <span className="text-xs font-semibold text-white/90 leading-snug font-sans">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visit site link if applicable */}
                <button className="w-full bg-white/10 hover:bg-[#DD183B] text-white py-4 font-bold uppercase text-xs tracking-[0.2em] rounded-xl transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2 border border-white/5 font-sans mt-2">
                  <span>Analyze Delivery Strategy</span>
                  <Globe className="w-4 h-4" />
                </button>
              </div>

            </motion.div>
          </AnimatePresence>

        </div>

      </div>

      {/* Reusable Scalable Sub-link trigger */}
      <div className="mt-12 text-center border-t border-white/5 pt-8">
        <a 
          href="#contact"
          className="inline-flex items-center gap-1.5 text-xs text-[#8E8E8E] hover:text-[#DD183B] font-bold uppercase tracking-widest font-sans transition-colors duration-300"
        >
          <span>View Full Portfolio</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

    </section>
  );
};
