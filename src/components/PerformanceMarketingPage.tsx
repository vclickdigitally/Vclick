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

// ── PERFORMANCE MARKETING SERVICES DATA ────────────────────────────────────────
const PERF_SERVICES = [
  { icon: <Search className="w-5 h-5" />, title: 'Google Search Ads', desc: 'Capture high-intent searches. Meticulous keyword match typing, bid optimization, and search query audits.' },
  { icon: <TrendingUp className="w-5 h-5" />, title: 'Meta Ads Management', desc: 'Scale acquisition on Instagram & Facebook. Strategic audience lookalikes, custom creative testing, and retargeting.' },
  { icon: <Zap className="w-5 h-5" />, title: 'Lead Gen Sprints', desc: 'Configuring custom instant forms, calendar appointments, and automated CRM routing to speed up bookings.' },
  { icon: <Cpu className="w-5 h-5" />, title: 'Conversion APIs', desc: 'Deploying Meta CAPI and Google Offline Conversions to secure tracking precision post-iOS14.' },
  { icon: <Layers className="w-5 h-5" />, title: 'Landing Pages', desc: 'Designing lightning-fast landing page layouts focused entirely on maximizing email/lead capture rates.' },
  { icon: <RefreshCw className="w-5 h-5" />, title: 'Remarketing Engines', desc: 'Re-engage lost site traffic with personalized ad templates displaying the exact service they viewed.' },
  { icon: <FileSearch className="w-5 h-5" />, title: 'CPA Reduction Audits', desc: 'Analyzing existing ad logs to locate wasted clicks, duplicate bids, and poor location coordinates.' },
  { icon: <BarChart2 className="w-5 h-5" />, title: 'Weekly Reports', desc: 'Transparent reporting mapped directly to pipeline growth, conversions, and client acquisition costs.' },
  { icon: <Code2 className="w-5 h-5" />, title: 'Ad Copywriting', desc: 'Writing high-click headlines and description text variants matching search intent thresholds.' },
  { icon: <Settings className="w-5 h-5" />, title: 'Bid Automation', desc: 'Deploying custom scripting to automatically adjust bids based on device, hours, and performance.' },
  { icon: <Globe className="w-5 h-5" />, title: 'Google Shopping Ads', desc: 'Optimizing product catalog feeds, custom asset groups, and smart bidding for e-commerce scaling.' },
  { icon: <Activity className="w-5 h-5" />, title: 'GA4 Event Mapping', desc: 'Mapping exact custom event triggers in Google Analytics 4 to match lead form completions.' },
];

// ── PROCESS STEPS ─────────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  { num: '01', title: 'Ad Account Audit', desc: 'We review your history, spend metrics, keyword reports, and conversions to isolate areas of wasted ad spend.' },
  { num: '02', title: 'Tracking Setup & API', desc: 'We configure Google Tag Manager, custom event tracking, GA4 goals, and offline Conversion APIs for 100% data accuracy.' },
  { num: '03', title: 'Creative & Copywriting', desc: 'We write conversion-focused ad headlines, configure graphics/posters, and prepare landing page layouts.' },
  { num: '04', title: 'Launch & Smart Bidding', desc: 'We launch campaigns using micro-targeted location settings, strategic bid options, and device parameters.' },
  { num: '05', title: 'Scale & Optimize', desc: 'We continuously audit search queries, adjust ad placements, run A/B copy tests, and scale your ROI month-on-month.' },
];

// ── INDUSTRIES DATA ───────────────────────────────────────────────────────────
const INDUSTRIES = [
  { title: 'Ecommerce', desc: 'Dynamic product remarketing, Google Shopping ads, catalog optimization, and direct checkout ROAS boosts.' },
  { title: 'Healthcare', desc: 'Local search queries, medical lead forms, privacy-compliant ads, and direct booking campaigns.' },
  { title: 'Education', desc: 'Course registration funnels, inquiry forms, academy search ads, and student pipeline acquisitions.' },
  { title: 'SaaS & Technology', desc: 'Qualified trial signups, product demo bookings, display ads, and custom CRM event integrations.' },
  { title: 'Manufacturing & B2B', desc: 'Niche B2B keyword targets, specific trade coordinates, LinkedIn lead forms, and corporate contacts.' },
  { title: 'Local Businesses', desc: 'Local location coordinates, direct click-to-call ads, map direction conversions, and immediate leads.' },
];

// ── PLATFORMS DATA ────────────────────────────────────────────────────────────
const PLATFORMS = [
  {
    name: 'Google Ads',
    points: [
      'Google Search Campaign keyword matches',
      'Performance Max asset group optimizations',
      'Google Shopping product catalog syncs',
      'Negative keyword list exclusions',
      'Device bid modifiers and schedules'
    ]
  },
  {
    name: 'Meta Ads Manager',
    points: [
      'Lookalike audience scaling strategies',
      'Meta pixel custom events mapping',
      'Facebook & Instagram creative testing',
      'Lead form custom questionnaires',
      'Instagram Reels placement optimization'
    ]
  },
  {
    name: 'Advanced Tracking APIs',
    points: [
      'Meta Conversion API server connection',
      'Google Offline Conversions GCLID upload',
      'Google Tag Manager server container setup',
      'GA4 custom event checkout triggers',
      'CRM pipeline status integrations'
    ]
  }
];

// ── FAQ DATA ──────────────────────────────────────────────────────────────────
const FAQ_DATA = [
  { q: 'How long does it take to see positive results?', a: 'While testing starts immediately, we usually see ad optimization curves balance within 2 to 4 weeks. By day 30, campaigns are fine-tuned to block wasted budget and prioritize keywords that convert.' },
  { q: 'Do you design the ad graphics and write the copy?', a: 'Yes. We handle the complete copywriting, graphic asset layouts, and form parameters so you do not have to worry about coordinating designers.' },
  { q: 'What is your recommended monthly ad spend?', a: 'We recommend a testing budget starting at $1,000/month to accumulate sufficient conversion data, though we scale budgets dynamically based on verified ROAS outcomes.' },
  { q: 'How do you handle post-iOS14 tracking limitations?', a: 'We deploy Server-Side Conversion APIs (CAPI) and Google Enhanced Conversions to bypass browser cookie blocks, securing accurate tracking for conversions.' },
];

// ── HERO SUB-COMPONENT ────────────────────────────────────────────────────
const HERO_WORDS = ['PERFORMANCE', 'MARKETING', 'THAT', 'DELIVERS', 'MEASURABLE', 'ROI'];

const PerformanceHero: React.FC = () => {
  const { openProject } = useModals();
  const onStartProject = () => openProject(20000, "PAID");
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

  const roas = useAnimatedCounter(54, 1600, inView);
  const wasted = useAnimatedCounter(98, 1400, inView);
  const reduction = useAnimatedCounter(42, 1000, inView);

  const badges = [
    {
      id: 'roas',
      icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
      label: 'Meta ROAS avg',
      value: `5.4x Lift`,
      valueColor: 'text-emerald-400',
      trend: 'Optimised bids',
      delay: '0.1s',
      className: 'top-[10%] right-[4%]',
      animY: [-5, 5, -5]
    },
    {
      id: 'cpa',
      icon: <TrendingDown className="w-4 h-4 text-[#DD183B]" />,
      label: 'Acquisition Cost',
      value: `-42% Drop`,
      valueColor: 'text-[#DD183B]',
      trend: 'Zero ad waste',
      delay: '0.4s',
      className: 'bottom-[12%] left-[4%]',
      animY: [6, -6, 6]
    }
  ];

  return (
    <section ref={ref} className="relative z-10 overflow-hidden pt-6 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Heading Copy */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DD183B]/10 border border-[#DD183B]/20 text-[10px] font-bold uppercase tracking-widest text-[#DD183B]">
            <Zap className="w-3.5 h-3.5" />
            <span>ROI-Driven PPC campaigns</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tighter uppercase font-display text-white leading-none">
            {HERO_WORDS.map((w, i) => (
              <span key={w} className="inline-block mr-3">
                {w === 'ROI' ? <span className="text-[#DD183B]">{w}</span> : w}
              </span>
            ))}
          </h1>

          {/* Descriptive Copy */}
          <p className="text-[#8E8E8E] text-base sm:text-lg max-w-xl leading-relaxed font-sans">
            Stop losing budget on poor placements and vanity metrics. We construct paid campaign loops across Google Ads & Meta, supported by server-side APIs to track conversions with precision.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={onStartProject}
              className="group bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white px-8 py-4.5 font-black uppercase text-xs tracking-[0.25em] transition-all duration-300 rounded-xl shadow-[0_0_40px_rgba(221,24,59,0.3)] cursor-pointer flex items-center justify-center gap-3"
            >
              <span>Scale Campaign ROI</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            
            <a
              href="#perf-what-is"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('perf-what-is')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-[#8E8E8E] hover:text-white transition-colors text-center cursor-pointer"
            >
              Explore Our System
            </a>
          </div>

        </div>

        {/* Right Column: Dashboard Mockup */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[400px]">
          
          {/* Dashboard Frame */}
          <div className="w-full max-w-[420px] bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10">
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E8E]">Acquisition Dashboard</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            {/* Performance metrics list */}
            <div className="space-y-4">
              {[
                { label: 'Google Search Ads', metric: `${roas ? (roas / 10).toFixed(1) : '5.4'}x ROAS`, desc: 'Targeted High-Intent Leads', status: 'Scale active' },
                { label: 'Wasted Spend Blocked', metric: `${wasted}%`, desc: 'Invalid coordinates removed', status: 'Optimal' },
                { label: 'Acquisition Cost Drop', metric: `-${reduction}%`, desc: 'Optimized bidding modifiers', status: 'Saving active' }
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

// ── MAIN PERFORMANCE MARKETING PAGE COMPONENT ──────────────────────────────────
export const PerformanceMarketingPage: React.FC = () => {
  const { openProject } = useModals();
  const onStartProject = () => openProject(20000, "PAID");
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
          <Link href="/" className="hover:text-white transition-colors">Home</Link> &rsaquo; <Link href="/#services" className="hover:text-white transition-colors">Services</Link> &rsaquo; <span className="text-[#DD183B]">Performance Marketing</span>
        </p>
      </div>

      {/* Hero section */}
      <PerformanceHero />

      {/* What is Performance Marketing */}
      <section id="perf-what-is" className="relative z-10 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
          <motion.div {...fadeUp} className="flex items-center gap-3 mb-6">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">ROI AND PPC ACTIONS</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="space-y-6">
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white max-w-xl leading-none">
                Stop Paying for impressions. Start Buying <span className="text-[#DD183B]">Pipeline ARR.</span>
              </h2>
              <p className="text-[#8E8E8E] text-sm sm:text-base leading-relaxed">
                Many agencies measure clicks and impressions, leaving you to wonder if the campaign drove revenue. We prioritize bottom-of-funnel conversion signals, tracking every acquisition from ad click to signed invoice.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {[
                  'Server-Side Event Integrations',
                  'Audience lookalike modifiers',
                  'Search intent bid scripting',
                  'Precision landing page testing'
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
                <p className="text-[10px] uppercase tracking-widest text-[#DD183B] font-black mb-5">Campaign Pillar Breakdown</p>
                <div className="flex flex-col gap-4">
                  {[
                    { label: 'Paid Acquisition (PPC)', desc: 'Meta, Google Search, and Shopping ads target high-converting intent', color: 'bg-[#DD183B]' },
                    { label: 'Precision Tracking API', desc: 'Offline triggers, Google Tag Manager server setups, and Meta CAPIs', color: 'bg-white/30' },
                    { label: 'Landing Page Layouts', desc: 'Lightweight, conversion-driven custom landing pages optimized for mobile', color: 'bg-white/10' }
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

          {/* PPC channels table */}
          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.2 }} className="mt-14 overflow-x-auto">
            <p className="text-[10px] uppercase tracking-widest text-[#DD183B] font-black mb-4">PPC Optimization Matrix</p>
            <table className="w-full text-sm border-collapse min-w-[560px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold">Strategy</th>
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold">Standard Setup</th>
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold">VClick Optimization</th>
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold">Data Accuracy</th>
                  <th className="text-left py-3 text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { strategy: 'Google Search Ads', standard: 'Broad Match keywords', vclick: 'Meticulous Exact Phrase match bid script', accuracy: 'Browser Cookie pixels', outcome: 'Lower CPA', highlight: true },
                  { strategy: 'Meta Ads Manager', standard: 'Generic interests list', vclick: 'Lookalike custom pixel stacks', accuracy: 'Server Connection API', outcome: 'Higher ROAS', highlight: true },
                  { strategy: 'Remarketing', standard: 'Generic homelinks', vclick: 'Specific product item dynamic layouts', accuracy: 'Enhanced event checks', outcome: 'Higher Conversion' }
                ].map((r) => (
                  <tr key={r.strategy} className={`border-b border-white/5 transition-colors ${r.highlight ? 'bg-[#DD183B]/5' : ''}`}>
                    <td className={`py-3 pr-4 font-semibold ${r.highlight ? 'text-[#DD183B]' : 'text-white/80'}`}>{r.strategy}</td>
                    <td className="py-3 pr-4 text-white/50">{r.standard}</td>
                    <td className="py-3 pr-4 text-white/50">{r.vclick}</td>
                    <td className="py-3 pr-4 text-white/50">{r.accuracy}</td>
                    <td className="py-3 font-semibold">{r.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
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
              PPC Ad Campaigns.<br />
              <span className="text-[#DD183B]">Optimized Weekly.</span>
            </h2>
            <p className="text-[#8E8E8E] text-base max-w-md leading-relaxed font-sans lg:mb-2">
              We manage campaigns in-house, testing creative options and tracking conversion loops weekly to keep your campaigns profitable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {PERF_SERVICES.map((svc, i) => (
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
              <span>Audit Your Spend</span>
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
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">CAMPAIGN PROTOCOL</span>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white max-w-2xl leading-none">
              Optimization Cycle.<br />
              <span className="text-[#DD183B]">No Budget Waste.</span>
            </h2>
            <p className="text-[#8E8E8E] text-base max-w-md leading-relaxed font-sans lg:mb-2">
              Our 5-step onboarding and audit loop ensures that tracking is solid, targets are aligned, and waste is minimized before scaling budgets.
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
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">ACQUISITION CHANNELS</span>
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-12 max-w-3xl leading-none">
            Google Search. Meta Campaigns.<br />
            <span className="text-[#DD183B]">Server Tag Manager.</span>
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
            Paid Search Prowess.<br />
            <span className="text-[#DD183B]">Pure Mathematics.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '01', title: '5+ Years Ad Account History', desc: 'Dhiwaagar audits and structures PPC campaigns personally to ensure ad spend efficiency.' },
              { num: '02', title: 'Tracking Audits First', desc: 'We reject generic pixel solutions and do not launch campaigns until tracking integrations match your backend pipeline.' },
              { num: '03', title: 'Phrase Match Intent Modifiers', desc: 'Targeting transactional search intents directly, excluding high-cost generic matches.' },
              { num: '04', title: 'A/B landing page trials', desc: 'Testing design modifications and headline targets to maximize conversion metrics.' },
              { num: '05', title: 'No Link Farming or Shortcuts', desc: 'Acquiring relevant placement coordinates and targets that grow actual brand authority.' },
              { num: '06', title: 'Honest Weekly Reporting', desc: 'Reports tied to conversions, leads, pipeline and actual ROAS — no fluffy impressions data.' }
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
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">MARKETS WE SCALE</span>
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-12 max-w-3xl leading-none">
            Paid Search That Dominates<br />
            <span className="text-[#DD183B]">Your Specific Market.</span>
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
            Campaign Answers That<br />
            <span className="text-[#DD183B]">Secure Trust.</span>
          </motion.h2>
          <motion.p {...fadeUp} transition={{ duration: 0.65, delay: 0.15 }} className="text-[#8E8E8E] text-base text-center max-w-xl mx-auto mb-12 font-sans leading-relaxed">
            Direct, plain-English answers to paid acquisition queries.
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
            Ready to scale campaign<br />
            <span className="text-[#DD183B]">ROI & Conversions?</span>
          </motion.h2>

          <motion.p {...fadeUp} transition={{ duration: 0.65, delay: 0.2 }} className="text-[#8E8E8E] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-sans">
            Deploy conversion-focused bid scripts and accurate offline Tag APIs. Get in touch for a free ad account spend audit.
          </motion.p>

          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.25 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={onStartProject}
              className="group bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white px-10 py-5 font-black uppercase text-xs tracking-[0.25em] transition-all duration-300 rounded-xl shadow-[0_0_45px_rgba(221,24,59,0.35)] cursor-pointer flex items-center gap-3"
            >
              <span>Get Free Spend Audit</span>
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
            {['Free spend audit', '5+ years experience', 'Real results, real campaigns', 'Chennai & worldwide'].map((tag) => (
              <div key={tag} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[#DD183B]" />
                <span className="text-[11px] text-[#8E8E8E] font-sans">{tag}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Explore other services cross-linking */}
      <ExploreServices currentService="performance-marketing" />

    </div>
  );
};
