"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useModals } from '@/providers/ModalProvider';
import {
  ArrowLeft, ArrowRight, ChevronDown, CheckCircle2, ArrowUpRight,
  Zap, Globe, Search, BarChart2, Code2, ShoppingBag,
  MapPin, Cpu, FileSearch, Link2, RefreshCw, Layers, Settings,
  TrendingUp, Star, HelpCircle, TrendingDown, Activity, Award
} from 'lucide-react';
import { ExploreServices } from './ExploreServices';

// ── ANIMATED COUNTER HOOK ─────────────────────────────────────────────────────
function useAnimatedCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// ── BRANDING & SOCIAL MEDIA SERVICES DATA ──────────────────────────────────────
const BRAND_SERVICES = [
  { icon: <Layers className="w-5 h-5" />, title: 'Brand Strategy', desc: 'Define your core brand positioning, values, guidelines, and market messaging.' },
  { icon: <Award className="w-5 h-5" />, title: 'Logo & Identity', desc: 'Modern logo packages, visual grids, color palettes, and corporate typefaces.' },
  { icon: <Globe className="w-5 h-5" />, title: 'Social Management', desc: 'End-to-end management — scheduling, community engagement, and query replies.' },
  { icon: <BarChart2 className="w-5 h-5" />, title: 'Content Calendars', desc: 'Strategic weekly content maps planned 30 days in advance for absolute clarity.' },
  { icon: <Layers className="w-5 h-5" />, title: 'Poster Design', desc: 'Stunning visual assets, infographics, carousel layouts, and branded quote templates.' },
  { icon: <Zap className="w-5 h-5" />, title: 'Reels Strategy', desc: 'Short-form vertical video guidelines, custom editing, sound sourcing, and reels scripts.' },
  { icon: <TrendingUp className="w-5 h-5" />, title: 'Personal Branding', desc: 'Establish founder authority on LinkedIn with structured posts and thought leadership.' },
  { icon: <FileSearch className="w-5 h-5" />, title: 'Monthly Audits', desc: 'Monthly performance checks tracing visual consistency, traffic, and engagement lifts.' },
  { icon: <ShoppingBag className="w-5 h-5" />, title: 'Packaging Design', desc: 'Premium, physical product box templates, label layouts, and print assets.' },
  { icon: <Code2 className="w-5 h-5" />, title: 'Brand Guidelines', desc: 'Comprehensive style books detailing exact logo parameters, margins, and typography.' },
  { icon: <Link2 className="w-5 h-5" />, title: 'Creative Copywriting', desc: 'Distinct, creative captions, ad copies, and corporate taglines matching your tone.' },
  { icon: <Settings className="w-5 h-5" />, title: 'Assets Management', desc: 'Structuring shared assets folders so your team can access brand files easily.' },
];

// ── PROCESS STEPS ─────────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  { num: '01', title: 'Identity Discovery', desc: 'We start with a thorough brand audit, competitor visual mapping, and client alignment questionnaires.' },
  { num: '02', title: 'Strategy & Identity', desc: 'We design custom logo drafts, color palettes, typographical pairings, and brand voice taglines.' },
  { num: '03', title: 'Content Mapping', desc: 'We prepare the initial 30-day social media grid layouts, poster styles, and captions for approval.' },
  { num: '04', title: 'Asset Production', desc: 'Our design team constructs high-end visual assets, custom graphics, and reels scripts.' },
  { num: '05', title: 'Publishing & Audits', desc: 'We manage calendars, schedule creative assets, reply to inquiries, and run brand audits monthly.' },
];

// ── INDUSTRIES DATA ───────────────────────────────────────────────────────────
const INDUSTRIES = [
  { title: 'Ecommerce', desc: 'Premium retail catalog layouts, custom Instagram posts, unboxing videos, and direct shop design branding.' },
  { title: 'Healthcare', desc: 'Trust-focused patient guides, clear medical infographics, brand guideline templates, and local profiles.' },
  { title: 'Education', desc: 'Academy brochure designs, student highlight posters, professional social grids, and local maps setups.' },
  { title: 'SaaS & Technology', desc: 'Interactive vector layouts, pricing diagrams, clean SaaS badges, and professional LinkedIn posts.' },
  { title: 'Manufacturing & B2B', desc: 'Corporate brochures, specs data tables, LinkedIn executive setups, and trade banners.' },
  { title: 'Local Businesses', desc: 'Review card handouts, location layouts, local maps design assets, and direct call banners.' },
];

// ── PLATFORMS DATA ────────────────────────────────────────────────────────────
const PLATFORMS = [
  {
    name: 'Brand Identity',
    points: [
      'Custom vector logo designs (SVG, EPS, PNG)',
      'Primary, secondary, and accent color swatches',
      'Typography sheets (Display, Sans, Serif headers)',
      'Corporate stationery and business card templates',
      'Brand guideline booklets outlining layout rules'
    ]
  },
  {
    name: 'Social Presence',
    points: [
      '30-day content calendar plans matching voice',
      'Custom Instagram grids (posters, carousels)',
      'LinkedIn executive profiles & banner designs',
      'Facebook and Twitter creative posts assets',
      'Active community engagement & replies support'
    ]
  },
  {
    name: 'Video Production',
    points: [
      'Short-form vertical video reels strategy',
      'Sound sourcing and dynamic caption editing',
      'Brand colors overlaid correctly on footage',
      'Storyboard parameters and scripts templates',
      'TikTok and YouTube Shorts layout guidelines'
    ]
  }
];

// ── FAQ DATA ──────────────────────────────────────────────────────────────────
const FAQ_DATA = [
  { q: 'What is included in a complete brand identity package?', a: 'Our identity package includes custom vector logo assets, color guidelines, font sets, brand book guides, and ready-to-print stationery files (cards, envelopes).' },
  { q: 'Do you manage posting and caption copywriting?', a: 'Yes. We manage captions, hashtags, and schedule publishing via shared buffers so you have absolute visibility.' },
  { q: 'How do you determine the visual style and tone?', a: 'We align style parameters based on target demographic research, competitors audit, and your long-term brand objectives.' },
  { q: 'Can you work within our existing style guidelines?', a: 'Absolutely. We regularly work with established corporate brand books, expanding visual assets while preserving existing typography rules.' },
];

// ── HERO SUB-COMPONENT ────────────────────────────────────────────────────
const HERO_WORDS = ['BUILD', 'A', 'BRAND', 'PEOPLE', 'REMEMBER'];

const BrandingHero: React.FC = () => {
  const { openProject } = useModals();
  const onStartProject = () => openProject(20000, "BRAND");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const engagement = useAnimatedCounter(48, 1600, inView);
  const consistency = useAnimatedCounter(100, 1400, inView);
  const reach = useAnimatedCounter(150, 1000, inView);

  const badges = [
    {
      id: 'brand',
      icon: <Award className="w-4 h-4 text-emerald-400" />,
      label: 'Brand Assets',
      value: `100% Unique`,
      valueColor: 'text-emerald-400',
      trend: 'Custom vector layout',
      delay: '0.2s',
      className: 'top-[12%] right-[5%]',
      animY: [-4, 4, -4]
    },
    {
      id: 'reach',
      icon: <TrendingUp className="w-4 h-4 text-[#DD183B]" />,
      label: 'Organic Reach',
      value: `+150% Lift`,
      valueColor: 'text-[#DD183B]',
      trend: 'Unified social grid',
      delay: '0.5s',
      className: 'bottom-[15%] left-[5%]',
      animY: [5, -5, 5]
    }
  ];

  return (
    <section ref={ref} className="relative z-10 overflow-hidden pt-6 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Heading Copy */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DD183B]/10 border border-[#DD183B]/20 text-[10px] font-bold uppercase tracking-widest text-[#DD183B]">
            <Award className="w-3.5 h-3.5" />
            <span>Luxury Identity & Social Pipelines</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tighter uppercase font-display text-white leading-none">
            {HERO_WORDS.map((w, i) => (
              <span key={w} className="inline-block mr-3">
                {w === 'REMEMBER' ? <span className="text-[#DD183B]">{w}</span> : w}
              </span>
            ))}
          </h1>

          {/* Descriptive Copy */}
          <p className="text-[#8E8E8E] text-base sm:text-lg max-w-xl leading-relaxed font-sans">
            Build authority and trust with luxury brand assets, color guidelines, custom typography pairings, and a strategic social media content pipeline planned 30 days in advance.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={onStartProject}
              className="group bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white px-8 py-4.5 font-black uppercase text-xs tracking-[0.25em] transition-all duration-300 rounded-xl shadow-[0_0_40px_rgba(221,24,59,0.3)] cursor-pointer flex items-center justify-center gap-3"
            >
              <span>Build Brand Identity</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            
            <a
              href="#brand-what-is"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('brand-what-is')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-[#8E8E8E] hover:text-white transition-colors text-center cursor-pointer"
            >
              Explore Creative System
            </a>
          </div>

        </div>

        {/* Right Column: Creative Showcase */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[400px]">
          
          {/* Creative Display Frame */}
          <div className="w-full max-w-[420px] bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E8E]">Visual Grid System</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#DD183B] animate-pulse" />
            </div>

            {/* Brand details display */}
            <div className="space-y-4">
              {[
                { label: 'Social Engagement Lift', metric: `${engagement ? (engagement / 10).toFixed(1) : '4.8'}x`, desc: 'Targeted brand content reach', status: 'Active campaigns' },
                { label: 'Creative Consistency', metric: `${consistency}%`, desc: 'Brand colors & margins aligned', status: 'Perfect' },
                { label: 'Weekly Reach Increase', metric: `+${reach}%`, desc: 'Instagram Reels & LinkedIn posts', status: 'Compounding' }
              ].map((m) => (
                <div key={m.label} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-white uppercase tracking-tight">{m.label}</span>
                    <span className="text-[9px] uppercase tracking-wider text-[#DD183B] font-black">{m.status}</span>
                  </div>
                  <div className="text-2xl font-black font-display text-white">{m.metric}</div>
                  <div className="text-[10px] text-[#8E8E8E] font-sans">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges container */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {badges.map((b) => (
              <motion.div
                key={b.id}
                animate={{ y: b.animY }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: parseFloat(b.delay) }}
                className={`absolute hidden sm:flex items-start gap-3 p-4 rounded-2xl bg-[#0B0B0B]/90 border border-white/10 shadow-xl max-w-[180px] backdrop-blur-md ${b.className}`}
              >
                <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                  {b.icon}
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-[#8E8E8E] leading-none mb-1">{b.label}</p>
                  <p className={`text-base font-black uppercase font-display leading-tight ${b.valueColor}`}>{b.value}</p>
                  <p className="text-[8px] text-white/30 font-sans mt-0.5 leading-none">{b.trend}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

// ── MAIN BRANDING & SOCIAL COMPONENT ──────────────────────────────────────────
export const BrandingSocialMediaPage: React.FC = () => {
  const { openProject } = useModals();
  const onStartProject = () => openProject(20000, "BRAND");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activePlatform, setActivePlatform] = useState(0);

  const fadeUp = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <div className="relative bg-[#0B0B0B] text-white font-sans selection:bg-[#DD183B] selection:text-white">
      
      {/* ambient spotlight */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] bg-[#DD183B] rounded-full filter blur-[160px] opacity-[0.05]" />
        <div className="absolute bottom-[30%] left-[5%] w-[400px] h-[400px] bg-[#DD183B] rounded-full filter blur-[180px] opacity-[0.04]" />
      </div>

      {/* backnav breadcrumbs */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#8E8E8E] hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Homepage</span>
        </Link>
        <p className="text-[11px] text-white/30 font-sans tracking-wider">
          <Link href="/" className="hover:text-white transition-colors">Home</Link> &rsaquo; <Link href="/#services" className="hover:text-white transition-colors">Services</Link> &rsaquo; <span className="text-[#DD183B]">Branding & Social Media</span>
        </p>
      </div>

      {/* Hero section */}
      <BrandingHero />

      {/* What is Branding & Social Media */}
      <section id="brand-what-is" className="relative z-10 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
          <motion.div {...fadeUp} className="flex items-center gap-3 mb-6">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">VISUAL STRATEGY</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="space-y-6">
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white max-w-xl leading-none">
                Consistency Builds Trust. Trust Builds <span className="text-[#DD183B]">Monopolies.</span>
              </h2>
              <p className="text-[#8E8E8E] text-sm sm:text-base leading-relaxed">
                If your Instagram grid, LinkedIn headers, and landing page look like they were built by three different teams, your brand is bleeding credibility. We design a single unified visual grid system to establish clear authority.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {[
                  'Custom Vector Logo Swatches',
                  'Branded Social Grid Calendars',
                  'Distinct Poster Designs',
                  'Executive Personal Branding'
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                    <CheckCircle2 className="w-4 h-4 text-[#DD183B] shrink-0 mt-0.5" />
                    <span className="text-sm text-white/60 font-sans leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Pillar grid */}
            <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.15 }} className="space-y-6">
              <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
                <p className="text-[10px] uppercase tracking-widest text-[#DD183B] font-black mb-5">Creative Pillar Breakdown</p>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Visual Identity', desc: 'Logos, guidelines, brand books, and custom vector typography layouts', color: 'bg-[#DD183B]' },
                    { label: 'Branded Content Calendars', desc: 'Instagram posters, custom infographics, and LinkedIn authority captions', color: 'bg-white/30' },
                    { label: 'Reels Video Sprints', desc: 'Editing guidelines, caption overlays, storyboards, and scripts management', color: 'bg-white/10' }
                  ].map((p) => (
                    <div key={p.label} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/8">
                      <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${p.color}`} />
                      <div>
                        <p className="text-sm font-black text-white mb-1 font-display uppercase tracking-tight">{p.label}</p>
                        <p className="text-xs text-[#8E8E8E] font-sans leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
          <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">SERVICES OUTLINE</span>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white max-w-2xl leading-none">
              Brand Assets & Grids.<br />
              <span className="text-[#DD183B]">Planned 30 Days Ahead.</span>
            </h2>
            <p className="text-[#8E8E8E] text-base max-w-md leading-relaxed font-sans lg:mb-2">
              We design custom visual systems matching your corporate objectives, auditing calendars weekly to keep your branding authoritative.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {BRAND_SERVICES.map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.07 }}
                className="group bg-[#111111] border border-white/10 hover:border-[#DD183B]/40 rounded-xl p-5 flex flex-col gap-3 transition-all duration-300 hover:bg-[#111111]/90"
              >
                <div className="w-9 h-9 rounded-lg bg-[#DD183B]/10 flex items-center justify-center text-[#DD183B] group-hover:bg-[#DD183B]/20 transition-colors">
                  {svc.icon}
                </div>
                <h3 className="text-sm font-black text-white font-display uppercase tracking-tight leading-tight">{svc.title}</h3>
                <p className="text-xs text-[#8E8E8E] leading-relaxed font-sans">{svc.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-10 flex items-center justify-center">
            <button
              onClick={onStartProject}
              className="group bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white px-8 py-4 font-black uppercase text-xs tracking-[0.25em] transition-all duration-300 rounded-xl cursor-pointer flex items-center gap-3"
            >
              <span>Review Your Branding</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Process */}
      <section className="relative z-10 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
          <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">CREATIVE PROCESS</span>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white max-w-2xl leading-none">
              Design Sprints.<br />
              <span className="text-[#DD183B]">Consistent Posting.</span>
            </h2>
            <p className="text-[#8E8E8E] text-base max-w-md leading-relaxed font-sans lg:mb-2">
              Our 5-phase strategic timeline focuses on creating brand guidelines, visual mockups, calendars and monthly consistency audits.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group bg-[#111111] border border-white/10 hover:border-[#DD183B]/30 p-5 rounded-2xl transition-all duration-300 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black font-display text-[#DD183B]">{step.num}</span>
                    <span className="text-[8px] font-mono text-[#8E8E8E]">PHASE_{step.num}</span>
                  </div>
                  <h3 className="text-xs font-black text-white mb-2 font-display uppercase tracking-tight leading-tight">{step.title}</h3>
                  <p className="text-[11px] text-[#8E8E8E] leading-relaxed font-sans">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs platforms */}
      <section className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
          <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">PLATFORMS WE MANAGE</span>
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-12 max-w-3xl leading-none">
            Corporate Identity. Social Grid.<br />
            <span className="text-[#DD183B]">Reels Video Editing.</span>
          </motion.h2>

          <div className="flex gap-2 mb-8 flex-wrap">
            {PLATFORMS.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setActivePlatform(i)}
                className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                  activePlatform === i
                    ? 'bg-[#DD183B] text-white'
                    : 'bg-[#111111] text-[#8E8E8E] border border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePlatform}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-[#111111] border border-white/10 rounded-2xl p-7"
            >
              <h3 className="text-lg font-black text-white mb-5 font-display uppercase tracking-tight">
                {PLATFORMS[activePlatform].name} Competencies
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PLATFORMS[activePlatform].points.map((point) => (
                  <div key={point} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#DD183B] shrink-0 mt-0.5" />
                    <span className="text-sm text-white/80 font-sans">{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Why Choose VClick */}
      <section className="relative z-10 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
          <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">VCLICK STANDARDS</span>
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-14 max-w-3xl leading-none">
            Corporate Integrity.<br />
            <span className="text-[#DD183B]">Unified Visuals.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '01', title: '5+ Years Brand Experience', desc: 'Dhiwaagar establishes and guides style parameters personally to keep layouts matching values.' },
              { num: '02', title: 'Strategy Before Visuals', desc: 'We do not draft logos or layouts until we fully map your corporate values and demographical markers.' },
              { num: '03', title: 'Vector Standards Files', desc: 'Delivering complete vector sheets, corporate typography pairs, and layout outlines.' },
              { num: '04', title: '30-Day Grid Calendars', desc: 'All social media assets are planned and scheduled 30 days ahead for transparency.' },
              { num: '05', title: 'Custom Designs Only', desc: 'We reject generic stock layout templates and design custom vector assets for your brand.' },
              { num: '06', title: 'Monthly Quality Audits', desc: 'Regular reviews tracing visual consistency and organic reach lifts across all profiles.' }
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.07 }}
                className="group bg-[#111111] border border-white/10 hover:border-[#DD183B]/30 p-6 rounded-2xl transition-all duration-300"
              >
                <span className="text-4xl font-black font-display text-[#DD183B]/30 group-hover:text-[#DD183B]/60 transition-colors mb-4 block">{item.num}</span>
                <h3 className="text-base font-black text-white mb-3 font-display uppercase tracking-tight leading-tight">{item.title}</h3>
                <p className="text-sm text-[#8E8E8E] leading-relaxed font-sans">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
          <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">MARKETS WE STYLE</span>
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-12 max-w-3xl leading-none">
            Corporate Branding That Dominates<br />
            <span className="text-[#DD183B]">Your Specific Sector.</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={ind.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group bg-[#111111] border border-white/10 hover:border-[#DD183B]/30 p-6 rounded-2xl transition-all duration-300"
              >
                <h3 className="text-sm font-black text-white mb-3 font-display uppercase tracking-tight group-hover:text-[#DD183B] transition-colors">{ind.title}</h3>
                <p className="text-sm text-[#8E8E8E] leading-relaxed font-sans">{ind.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-24">
          <motion.div {...fadeUp} className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">FREQUENTLY ASKED QUESTIONS</span>
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-4 text-center leading-none">
            Branding Answers That<br />
            <span className="text-[#DD183B]">Verify Standards.</span>
          </motion.h2>
          <motion.p {...fadeUp} transition={{ duration: 0.65, delay: 0.15 }} className="text-[#8E8E8E] text-base text-center max-w-xl mx-auto mb-12 font-sans leading-relaxed">
            Direct, plain-English answers to brand strategy and social management queries.
          </motion.p>

          <div className="flex flex-col gap-3">
            {FAQ_DATA.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen ? 'bg-[#111111] border-[#DD183B]/50' : 'bg-white/[0.02] border-white/5 hover:border-white/15'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full p-5 sm:p-6 flex items-center justify-between text-left gap-4 cursor-pointer text-white hover:text-[#DD183B] transition-colors"
                  >
                    <span className="text-base sm:text-lg font-bold font-sans tracking-tight leading-snug">{faq.q}</span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-[#DD183B] text-white rotate-180' : 'bg-white/5 text-[#8E8E8E]'}`}>
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-5 pb-6 sm:px-6 text-[#8E8E8E] text-sm sm:text-base leading-relaxed border-t border-white/5 pt-4 font-sans">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t border-white/5 bg-[#0B0B0B] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-[#DD183B] rounded-full filter blur-[140px] opacity-10" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32 text-center">
          <motion.div {...fadeUp} className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">START TODAY</span>
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase font-display text-white mb-6 leading-none">
            Ready to build a brand<br />
            <span className="text-[#DD183B]">people remember?</span>
          </motion.h2>

          <motion.p {...fadeUp} transition={{ duration: 0.65, delay: 0.2 }} className="text-[#8E8E8E] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-sans">
            Scale your organic reach with stunning vector assets and consistent calendars. Contact us for a free identity audit.
          </motion.p>

          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.25 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={onStartProject}
              className="group bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white px-10 py-5 font-black uppercase text-xs tracking-[0.25em] transition-all duration-300 rounded-xl shadow-[0_0_45px_rgba(221,24,59,0.35)] cursor-pointer flex items-center gap-3"
            >
              <span>Get Free Identity Audit</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <Link
              href="/"
              className="px-8 py-5 font-bold uppercase text-xs tracking-[0.2em] rounded-xl transition-all duration-300 border border-white/10 hover:border-white/25 text-white/70 hover:text-white flex items-center justify-center cursor-pointer"
            >
              Return to Homepage
            </Link>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.3 }} className="flex items-center justify-center gap-6 flex-wrap">
            {['Free identity audit', '5+ years experience', 'Real results, real campaigns', 'Chennai & worldwide'].map((tag) => (
              <div key={tag} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[#DD183B]" />
                <span className="text-[11px] text-[#8E8E8E] font-sans">{tag}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Explore other services cross-linking */}
      <ExploreServices currentService="branding-social-media" />

    </div>
  );
};
