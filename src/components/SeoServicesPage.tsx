"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useModals } from '@/providers/ModalProvider';
import {
  ArrowLeft, ArrowRight, ChevronDown, CheckCircle2, ArrowUpRight,
  Zap, Globe, Search, BarChart2, Code2, ShoppingBag,
  MapPin, Cpu, FileSearch, Link2, RefreshCw, Layers, Settings,
  TrendingUp, Star, HelpCircle, TrendingDown, Activity, Award
} from 'lucide-react';

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

interface SeoServicesPageProps {
  onNavigateHome: () => void;
  onStartProject: () => void;
}

// ── FAQ DATA ──────────────────────────────────────────────────────────────────
const FAQ_DATA = [
  { q: 'How long does SEO take to show results on Google?', a: 'For most websites, organic search traffic and keyword index position improvements become visible within 3 to 6 months. Significant commercial results and traffic compounding typically require 6 to 12 months. The exact timeline depends on site history, domain authority, crawl budget efficiency, and keyword competitiveness. Unlike paid ads (PPC), the ROI from search engine optimization compiles sustainably over time.' },
  { q: 'How much do professional SEO services cost in India?', a: 'Professional SEO campaigns are priced based on the competitiveness of your target queries, scope of technical fixes, and content production requirements. At VClick Digitally, we do not sell generic packages. We build custom monthly search marketing strategies focused on actual ROI, technical audits, and content generation tailored to your company\'s vertical.' },
  { q: 'What is Technical SEO and why is it critical?', a: 'Technical SEO is the optimization of a website\'s infrastructure so search engines can efficiently crawl, render, and index its pages. Key components include optimizing Core Web Vitals (LCP, CLS, INP), structured data implementation (JSON-LD schema), securing HTTPS protocols, fixing crawl errors, managing robots.txt directives, and submitting XML sitemaps to Google Search Console.' },
  { q: 'What is the difference between on-page and off-page SEO?', a: 'On-page SEO involves optimizing elements on your own website, including HTML tags (title, description, headers), semantic content relevance, schema markup, and internal linking structure. Off-page SEO focuses on building external trust signals through earning high-quality backlinks from authoritative domains, brand mentions, and local citation profiles.' },
  { q: 'Do you offer SEO services for React and Next.js websites?', a: 'Yes. React and Next.js single-page applications require specific SEO handling to ensure search engine crawlers can index client-side rendered JavaScript. We specialize in configuring Server-Side Rendering (SSR), Static Site Generation (SSG), dynamic metadata generation, hydration performance, and structured data testing for React web frameworks.' },
  { q: 'How do you optimize websites for AI Search and AI Overviews?', a: 'AI Search Optimization (Generative Engine Optimization or GEO) positions your brand to be cited by LLM search platforms like ChatGPT Search, Perplexity AI, Google Gemini, and Bing Copilot. We achieve this by structuring entity-based semantic content, publishing authoritative research, using structured schema, and building trusted digital PR references.' }
];

// ── SERVICES DATA ─────────────────────────────────────────────────────────────
const SEO_SERVICES = [
  { icon: <FileSearch className="w-5 h-5" />, title: 'Technical SEO', desc: 'Full technical audit and remediation — crawlability, indexability, site architecture, and server-side health.' },
  { icon: <Search className="w-5 h-5" />, title: 'Website SEO Audit', desc: 'Comprehensive analysis of every SEO layer on your site with a prioritised action roadmap.' },
  { icon: <BarChart2 className="w-5 h-5" />, title: 'Keyword Research', desc: 'Intent-based keyword mapping across your entire business to capture searches that convert.' },
  { icon: <TrendingUp className="w-5 h-5" />, title: 'Competitor Analysis', desc: 'Reverse-engineer what your competitors are ranking for — then build a plan to outperform them.' },
  { icon: <Layers className="w-5 h-5" />, title: 'Content Strategy', desc: 'Topic authority mapping, content gap analysis, and an editorial calendar built around search demand.' },
  { icon: <Settings className="w-5 h-5" />, title: 'On-Page SEO', desc: 'Optimise every page — titles, headings, content structure, schema markup, and internal links.' },
  { icon: <Link2 className="w-5 h-5" />, title: 'Off-Page SEO', desc: 'Strategic link building, digital PR, and authority signals from relevant, high-quality sources.' },
  { icon: <MapPin className="w-5 h-5" />, title: 'Local SEO', desc: 'Google Business Profile, local citations, NAP consistency, and map pack domination for your area.' },
  { icon: <Globe className="w-5 h-5" />, title: 'International SEO', desc: 'Hreflang, country targeting, regional keyword research, and multi-market organic expansion.' },
  { icon: <Star className="w-5 h-5" />, title: 'Enterprise SEO', desc: 'Large-scale SEO for complex websites with multiple stakeholders, thousands of pages, and global reach.' },
  { icon: <ShoppingBag className="w-5 h-5" />, title: 'Ecommerce SEO', desc: 'Product and category page optimisation, schema for products and reviews, and conversion-focused rankings.' },
  { icon: <Cpu className="w-5 h-5" />, title: 'AI Search Optimisation', desc: 'Position your brand to be cited by ChatGPT, Perplexity, and Gemini — not just ranked on Google.' },
  { icon: <Zap className="w-5 h-5" />, title: 'Core Web Vitals', desc: 'LCP, CLS, and INP optimisation to meet Google\'s performance standards and improve user experience.' },
  { icon: <Code2 className="w-5 h-5" />, title: 'Schema Markup', desc: 'Structured data implementation — FAQs, reviews, products, local business, articles, and more.' },
  { icon: <Zap className="w-5 h-5" />, title: 'Website Speed', desc: 'Image compression, caching, script deferral, and CDN setup to deliver sub-2-second load times.' },
  { icon: <RefreshCw className="w-5 h-5" />, title: 'SEO Migration', desc: 'Protect your rankings during a website redesign or CMS migration with a meticulous redirect strategy.' },
  { icon: <Code2 className="w-5 h-5" />, title: 'React SEO', desc: 'Fix SSR, SSG, dynamic metadata, and hydration issues specific to React and Next.js applications.' },
  { icon: <Globe className="w-5 h-5" />, title: 'WordPress SEO', desc: 'Full WordPress SEO stack — plugins, themes, speed, structured data, and ranking strategy.' },
  { icon: <ShoppingBag className="w-5 h-5" />, title: 'Shopify SEO', desc: 'Shopify-specific SEO — collection pages, product schema, canonical issues, and app stack review.' },
  { icon: <Link2 className="w-5 h-5" />, title: 'Internal Linking', desc: 'Systematic internal link architecture to distribute authority and guide users through your site.' },
  { icon: <Search className="w-5 h-5" />, title: 'Google Search Console', desc: 'Full GSC setup, monitoring, error resolution, and performance reporting integrated into your strategy.' },
  { icon: <BarChart2 className="w-5 h-5" />, title: 'GA4 Analytics', desc: 'Google Analytics 4 configuration, event tracking, conversion measurement, and SEO performance dashboards.' },
  { icon: <Settings className="w-5 h-5" />, title: 'Indexing Optimisation', desc: 'Ensure your most important pages are indexed quickly and low-value pages are kept out of the index.' },
  { icon: <FileSearch className="w-5 h-5" />, title: 'Crawl Budget', desc: 'Prioritise Googlebot\'s time on your site so your most valuable pages get crawled and updated fastest.' },
];

// ── PROCESS STEPS ─────────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  { num: '01', title: 'SEO Audit & Discovery', desc: 'We start by understanding your website, your industry, and your goals. We run a full technical audit, keyword gap analysis, backlink profile review, and competitor mapping. You get a clear picture of exactly where you stand — and what needs to happen first.' },
  { num: '02', title: 'Strategy & Keyword Architecture', desc: 'Based on audit findings, we build your keyword map — grouping search terms by intent, priority, and funnel stage. We align this with your content strategy and identify the fastest-win opportunities that will drive qualified traffic soonest.' },
  { num: '03', title: 'On-Page & Technical Optimisation', desc: 'We implement all technical fixes, optimise existing pages, create schema markup, improve page speed, and structure internal links. This phase builds the solid foundation that everything else depends on.' },
  { num: '04', title: 'Off-Page Authority Building', desc: 'We build authority through strategic link acquisition, digital PR, and brand mention campaigns. Every link we earn is from a relevant, real website — no link farms, no PBNs, no shortcuts that will get you penalised.' },
  { num: '05', title: 'Monitoring, Reporting & Iteration', desc: 'We track rankings, organic traffic, conversions, and Core Web Vitals every month. You receive plain-English reports tied to actual business outcomes — not vanity metrics. We review, adapt, and double down on what works.' },
];

// ── INDUSTRIES DATA ───────────────────────────────────────────────────────────
const INDUSTRIES = [
  { title: 'Ecommerce', desc: 'Product page rankings, category SEO, schema for products and reviews, abandoned cart recovery via organic traffic.' },
  { title: 'Healthcare', desc: 'YMYL-compliant content, local medical SEO, clinic visibility in Google Maps, and patient trust signals.' },
  { title: 'Education', desc: 'Course and institution rankings, local SEO for schools and academies, content strategy for student acquisition.' },
  { title: 'SaaS & Technology', desc: 'Bottom-of-funnel keyword capture, feature page optimisation, comparison page strategy, and AI search presence.' },
  { title: 'Manufacturing & B2B', desc: 'Niche industrial keyword domination, international SEO for export markets, and long-cycle lead generation via organic.' },
  { title: 'Local Businesses', desc: 'Google Maps pack domination, review strategy, local citation building, and area-specific keyword targeting.' },
];

// ── PLATFORMS DATA ────────────────────────────────────────────────────────────
const PLATFORMS = [
  {
    name: 'WordPress',
    points: [
      'Plugin stack audit (Yoast, RankMath, AIOSEO)',
      'Theme performance and Core Web Vitals fixes',
      'Schema markup implementation',
      'Permalink and URL structure optimisation',
      'Database and server-side speed tuning',
    ],
  },
  {
    name: 'Shopify',
    points: [
      'Collection and product page SEO architecture',
      'Canonical tag fixes for duplicate URL variants',
      'Schema markup for products, reviews, and breadcrumbs',
      'App stack review for SEO impact',
      'Shopify blog content strategy',
    ],
  },
  {
    name: 'React / Next.js',
    points: [
      'Server-side rendering (SSR) and static generation (SSG) audit',
      'Dynamic metadata and Open Graph fixes',
      'JavaScript hydration and indexability review',
      'Core Web Vitals optimisation for React-heavy pages',
      'Structured data implementation via JSON-LD',
    ],
  },
];

// ── SEO HERO SUB-COMPONENT ────────────────────────────────────────────────────
const HERO_WORDS = ['SEO', 'SERVICES', 'THAT', 'TURN', 'RANKINGS', 'INTO'];

const SeoHero: React.FC = () => {
  const { openProject } = useModals();
  const onStartProject = () => openProject(15000, "SEO");
  const onScrollDown = () => {
    document.getElementById('seo-what-is')?.scrollIntoView({ behavior: 'smooth' });
  };
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Trigger counter animations once hero enters view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const traffic  = useAnimatedCounter(327, 1600, inView);
  const keywords = useAnimatedCounter(94,  1400, inView);
  const position = useAnimatedCounter(1,   1000, inView);

  // Floating badge positions — staggered keyframe
  const badges = [
    {
      id: 'traffic',
      icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
      label: 'Organic Traffic',
      value: `+${traffic}%`,
      valueColor: 'text-emerald-400',
      trend: '↑ vs last quarter',
      delay: '0s',
      className: 'top-[8%] right-[4%]',
      animY: [-6, 6, -6],
    },
    {
      id: 'keywords',
      icon: <Search className="w-4 h-4 text-blue-400" />,
      label: 'Keywords Ranking',
      value: `${keywords}`,
      valueColor: 'text-blue-400',
      trend: 'Page 1 positions',
      delay: '0.8s',
      className: 'bottom-[28%] right-[2%]',
      animY: [6, -6, 6],
    },
    {
      id: 'position',
      icon: <Award className="w-4 h-4 text-[#DD183B]" />,
      label: 'Avg. Position',
      value: `#${position}`,
      valueColor: 'text-[#DD183B]',
      trend: 'Primary keyword',
      delay: '1.6s',
      className: 'bottom-[8%] left-[4%] lg:left-auto lg:right-[24%]',
      animY: [-4, 4, -4],
    },
  ];

  // Animated SERP result rows
  const serpResults = [
    { pos: 1, title: 'SEO Services Chennai — VClick Digitally', url: 'vclickdigitally.com/services/seo', highlight: true },
    { pos: 2, title: 'Best SEO Company in India 2025', url: 'competitor-agency.com/seo', highlight: false },
    { pos: 3, title: 'SEO Services — Top Rated Agency India', url: 'another-agency.in/seo-services', highlight: false },
  ];

  return (
    <section
      ref={ref}
      aria-label="SEO Services Hero — VClick Digitally"
      className="relative z-10 w-full overflow-hidden"
    >
      {/* ── HERO GRID OVERLAY ── subtle dot matrix background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* ── HERO INNER GRID ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[75vh]">

          {/* ── LEFT COLUMN — COPY ── */}
          <div className="lg:col-span-7 flex flex-col">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="h-[1.5px] w-12 bg-[#DD183B]" aria-hidden="true" />
              <span
                className="text-[10px] font-black uppercase tracking-[0.35em] text-[#DD183B] font-sans"
                role="doc-subtitle"
              >
                SEO Services — VClick Digitally
              </span>
            </motion.div>

            {/* ── H1 — animated word-by-word entry ── */}
            <h1
              className="font-black tracking-tighter uppercase font-display text-white leading-[0.92] mb-4"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
            >
              {/* Line 1 */}
              <span className="block overflow-hidden">
                {['SEO', 'SERVICES'].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.75, delay: 0.1 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              {/* Line 2 */}
              <span className="block overflow-hidden">
                {['THAT', 'TURN'].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.75, delay: 0.28 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              {/* Line 3 — red highlight */}
              <span className="block overflow-hidden text-[#DD183B]">
                {['RANKINGS', 'INTO'].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.75, delay: 0.46 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              {/* Line 4 */}
              <span className="block overflow-hidden">
                {['REAL', 'GROWTH.'].map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.75, delay: 0.64 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            {/* ── Supporting Paragraph ── */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#8E8E8E] text-base sm:text-lg leading-relaxed font-sans mb-2 max-w-xl"
            >
              Most businesses are invisible on Google — not because their product is wrong,
              but because their SEO is{' '}
              <span className="text-white/80 font-semibold">broken, outdated, or missing entirely.</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#8E8E8E] text-base sm:text-lg leading-relaxed font-sans mb-10 max-w-xl"
            >
              We are a{' '}
              <span className="text-white/80 font-semibold">Chennai-based SEO company</span>{' '}
              with 5+ years of hands-on experience optimising websites across India, Singapore,
              Saudi Arabia, and the USA — entirely in-house, zero outsourcing.
            </motion.p>

            {/* ── Trust Signal Row ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-5 mb-10"
              aria-label="Trust signals"
            >
              {[
                { val: '15+', label: 'Sites Optimised' },
                { val: '5+',  label: 'Years Active' },
                { val: '4',   label: 'Countries' },
                { val: '100%', label: 'White-Hat' },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2.5 pr-5 border-r border-white/10 last:border-0 last:pr-0"
                >
                  <span className="text-2xl font-black font-display text-[#DD183B]">{s.val}</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#8E8E8E] font-sans leading-tight max-w-[60px]">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* ── CTA Buttons ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              {/* Primary CTA */}
              <button
                id="hero-primary-cta"
                onClick={onStartProject}
                aria-label="Get a free SEO audit from VClick Digitally"
                className="group relative bg-[#DD183B] hover:bg-white text-white hover:text-[#0B0B0B] px-8 py-4 font-black uppercase text-xs tracking-[0.25em] transition-all duration-300 rounded-xl cursor-pointer flex items-center gap-3 overflow-hidden"
                style={{ boxShadow: '0 0 40px rgba(221,24,59,0.35), 0 0 80px rgba(221,24,59,0.1)' }}
              >
                {/* Pulse ring animation on button */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl border border-[#DD183B] animate-ping opacity-30"
                />
                <span>Get a Free SEO Audit</span>
                <ArrowUpRight
                  className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  aria-hidden="true"
                />
              </button>

              {/* Secondary CTA */}
              <button
                id="hero-secondary-cta"
                onClick={onScrollDown}
                aria-label="See what our SEO services include"
                className="group flex items-center gap-2 text-[#8E8E8E] hover:text-white text-sm font-semibold font-sans transition-colors cursor-pointer"
              >
                <span>See All Services</span>
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </button>
            </motion.div>

            {/* ── Micro-guarantee line ── */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.35 }}
              className="mt-4 text-[11px] text-white/25 font-sans"
            >
              Free audit · No contract required · Real findings, not a sales pitch
            </motion.p>
          </div>

          {/* ── RIGHT COLUMN — ANIMATED VISUAL PANEL ── */}
          <div
            className="lg:col-span-5 relative flex items-center justify-center h-[460px] lg:h-auto lg:min-h-[520px]"
            aria-hidden="true"
          >
            {/* Ambient glow core */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-72 h-72 bg-[#DD183B] rounded-full opacity-[0.08]"
                style={{ filter: 'blur(80px)' }}
              />
            </div>

            {/* Subtle grid lines */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />

            {/* ── MAIN CARD — SERP MOCKUP ── */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-[360px] mx-auto"
            >
              {/* Browser chrome */}
              <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6)]">

                {/* Browser top bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#141414] border-b border-white/8">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                  </div>
                  <div className="flex-1 mx-3 bg-[#0D0D0D] rounded-md px-3 py-1 flex items-center gap-2">
                    <Search className="w-2.5 h-2.5 text-[#8E8E8E] shrink-0" />
                    <span className="text-[10px] text-[#8E8E8E] font-sans truncate">seo services chennai india</span>
                  </div>
                </div>

                {/* SERP content */}
                <div className="p-4 space-y-3">
                  {/* Ad label */}
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[9px] bg-[#8E8E8E]/20 text-[#8E8E8E] px-1.5 py-0.5 rounded font-mono">Sponsored</span>
                    <span className="text-[9px] text-[#8E8E8E]/50">2 results</span>
                  </div>

                  {/* Organic results */}
                  {serpResults.map((result, i) => (
                    <motion.div
                      key={result.pos}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.15 }}
                      className={`p-3 rounded-xl transition-all duration-300 ${
                        result.highlight
                          ? 'bg-[#DD183B]/10 border border-[#DD183B]/30'
                          : 'bg-white/[0.02] border border-white/5 opacity-50'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <div
                          className={`text-[10px] font-black font-display mt-0.5 shrink-0 w-4 text-center ${
                            result.highlight ? 'text-[#DD183B]' : 'text-[#8E8E8E]'
                          }`}
                        >
                          {result.pos}
                        </div>
                        <div>
                          <p
                            className={`text-[11px] font-bold leading-snug mb-0.5 ${
                              result.highlight ? 'text-[#DD183B]' : 'text-white/40'
                            }`}
                          >
                            {result.title}
                          </p>
                          <p className="text-[10px] text-[#8E8E8E]/60 font-sans font-mono">{result.url}</p>
                        </div>
                        {result.highlight && (
                          <div className="ml-auto shrink-0">
                            <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                              #1
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {/* Thin divider */}
                  <div className="border-t border-white/5 pt-2">
                    <div className="flex items-center gap-1.5">
                      <Activity className="w-3 h-3 text-[#DD183B]" />
                      <span className="text-[9px] text-[#8E8E8E] font-sans">Live ranking — updated in real time</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── FLOATING METRIC BADGES ── */}
            {badges.map((badge) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: badge.animY,
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 1.0 },
                  scale:   { duration: 0.6, delay: 1.0 },
                  y: {
                    delay: parseFloat(badge.delay) + 1.2,
                    duration: 3.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
                className={`absolute ${badge.className} z-20`}
              >
                <div className="bg-[#1A1A1A]/95 backdrop-blur-md border border-white/10 rounded-xl px-3.5 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] min-w-[130px]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center">
                      {badge.icon}
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-[#8E8E8E] font-sans">{badge.label}</span>
                  </div>
                  <div className={`text-xl font-black font-display ${badge.valueColor}`}>{badge.value}</div>
                  <div className="text-[9px] text-[#8E8E8E]/70 font-sans mt-0.5">{badge.trend}</div>
                </div>
              </motion.div>
            ))}

            {/* ── SCROLL INDICATOR ── bottom-right corner of visual */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="absolute bottom-0 left-0 lg:hidden flex items-center gap-2"
            >
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-4 h-4 text-[#8E8E8E]" />
              </motion.div>
              <span className="text-[10px] text-[#8E8E8E] uppercase tracking-widest font-sans">Scroll</span>
            </motion.div>
          </div>
        </div>

        {/* ── "IS THIS YOU?" CALLOUT — below grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 bg-[#111111] border border-white/8 rounded-2xl p-7 max-w-4xl"
          role="complementary"
          aria-label="Common SEO problems we solve"
        >
          <div className="flex items-center gap-2 mb-5">
            <span className="h-[1.5px] w-6 bg-[#DD183B]" aria-hidden="true" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#DD183B]">Sound familiar? You're not alone.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              'Your website gets traffic but no enquiries',
              'A competitor who launched after you ranks above you',
              "You're stuck on page 2 or 3 for your top keywords",
              "You've invested in SEO before and seen no measurable results",
              'Your React, WordPress, or Shopify site has zero organic visibility',
              "You've never had an SEO strategy — just hoping Google figures it out",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 p-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                <CheckCircle2 className="w-4 h-4 text-[#DD183B] shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-sm text-white/60 font-sans leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────
export const SeoServicesPage: React.FC = () => {
  const { openProject } = useModals();
  const onStartProject = () => openProject(15000, "SEO");
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

      {/* ── AMBIENT BACKGROUND GLOW ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] bg-[#DD183B] rounded-full filter blur-[160px] opacity-[0.05]" />
        <div className="absolute bottom-[30%] left-[5%] w-[400px] h-[400px] bg-[#DD183B] rounded-full filter blur-[180px] opacity-[0.04]" />
      </div>

      {/* ── BREADCRUMB + BACK NAV ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#8E8E8E] hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Homepage</span>
        </Link>
        <p className="text-[11px] text-white/30 font-sans tracking-wider">
          <Link href="/" className="hover:text-white transition-colors">Home</Link> &rsaquo; <Link href="/#services" className="hover:text-white transition-colors">Services</Link> &rsaquo; <span className="text-[#DD183B]">SEO Services</span>
        </p>
      </div>

      {/* ════════════════════════════════════════════════════
          SECTION 1 — HERO (PREMIUM TWO-COLUMN)
      ════════════════════════════════════════════════════ */}
      <SeoHero onStartProject={onStartProject} onScrollDown={() => {
        document.getElementById('seo-what-is')?.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* ════════════════════════════════════════════════════
          SECTION 3 — WHAT IS SEO
      ════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">

          <motion.div {...fadeUp} className="flex items-center gap-3 mb-6">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">UNDERSTANDING SEO</span>
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-6 max-w-3xl leading-none">
            What Is SEO — And Why Does It Matter More Than Ever?
          </motion.h2>

          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.15 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[#8E8E8E] text-base sm:text-lg leading-relaxed mb-5 font-sans">
                SEO — Search Engine Optimisation — is the practice of improving your website so it appears higher in Google's organic search results when people search for what you sell or offer.
              </p>
              <p className="text-[#8E8E8E] text-base sm:text-lg leading-relaxed mb-5 font-sans">
                It is not about tricking Google. It is about making your website genuinely more useful, more credible, and more technically sound than your competitors. If you need a new platform built or redesigned, explore our <Link href="/services/website-development" className="text-[#DD183B] hover:underline font-semibold">Website Development Services</Link> to ensure it is SEO-ready from day one.
              </p>
              <p className="text-white text-base sm:text-lg leading-relaxed font-sans font-semibold">
                Paid advertising stops the moment your budget runs out. SEO builds an asset that compounds — every ranking earned, every piece of content published, every authoritative link built continues to work for your business long after the initial investment.
              </p>
            </div>

            {/* Three pillars visual */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
              <p className="text-[10px] uppercase tracking-widest text-[#DD183B] font-black mb-5">The Three Pillars of SEO</p>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Technical SEO', desc: 'Site speed, crawlability, mobile, Core Web Vitals, indexability', color: 'bg-[#DD183B]' },
                  { label: 'On-Page SEO', desc: 'Content quality, keyword intent, schema, internal links, meta tags', color: 'bg-white/30' },
                  { label: 'Off-Page SEO', desc: 'Backlinks, brand mentions, digital PR, authority signals', color: 'bg-white/10' },
                ].map((p, i) => (
                  <div key={p.label} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/8">
                    <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${p.color}`} />
                    <div>
                      <p className="text-sm font-black text-white mb-1 font-display uppercase tracking-tight">{p.label}</p>
                      <p className="text-xs text-[#8E8E8E] font-sans leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-widest text-[#DD183B] font-black mb-3">Also In 2025+</p>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#DD183B]/5 border border-[#DD183B]/15">
                  <Cpu className="w-4 h-4 text-[#DD183B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-black text-white mb-0.5">AI Search Optimisation</p>
                    <p className="text-xs text-[#8E8E8E] leading-relaxed">Getting cited by ChatGPT, Perplexity, Gemini — not just ranking on Google blue links</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SEO vs other channels table */}
          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.2 }} className="mt-14 overflow-x-auto">
            <p className="text-[10px] uppercase tracking-widest text-[#DD183B] font-black mb-4">SEO vs Other Channels</p>
            <table className="w-full text-sm border-collapse min-w-[560px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold">Channel</th>
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold">Ongoing Cost</th>
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold">Result Lifespan</th>
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold">Compounds?</th>
                  <th className="text-left py-3 text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold">User Trust</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { ch: 'Google Ads (PPC)', cost: 'High (per click)', life: 'Stops with budget', comp: '✗', trust: 'Moderate' },
                  { ch: 'Social Media Ads', cost: 'High (per impression)', life: 'Stops with budget', comp: '✗', trust: 'Low' },
                  { ch: 'Email Marketing', cost: 'Low–Medium', life: 'Medium', comp: 'Partially', trust: 'High' },
                  { ch: 'SEO', cost: 'Low–Medium', life: 'Long-term (years)', comp: '✓ Yes', trust: 'Very High', highlight: true },
                ].map((r) => (
                  <tr key={r.ch} className={`border-b border-white/5 transition-colors ${r.highlight ? 'bg-[#DD183B]/5' : ''}`}>
                    <td className={`py-3 pr-4 font-semibold ${r.highlight ? 'text-[#DD183B]' : 'text-white/80'}`}>{r.ch}</td>
                    <td className="py-3 pr-4 text-white/50">{r.cost}</td>
                    <td className="py-3 pr-4 text-white/50">{r.life}</td>
                    <td className={`py-3 pr-4 font-bold ${r.comp === '✓ Yes' ? 'text-emerald-400' : 'text-white/30'}`}>{r.comp}</td>
                    <td className={`py-3 font-semibold ${r.highlight ? 'text-white' : 'text-white/50'}`}>{r.trust}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Expert quote */}
          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.25 }} className="mt-12 border-l-2 border-[#DD183B] pl-6 max-w-2xl">
            <p className="text-white/80 text-base sm:text-lg leading-relaxed italic font-sans mb-3">
              "Google's goal has never changed — it wants to show the most helpful, most trustworthy result for every search query. The agencies that align with that goal rather than try to game it are the ones whose clients rank year after year."
            </p>
            <p className="text-[11px] uppercase tracking-widest text-[#DD183B] font-black">— Dhiwaagar, Founder, VClick Digitally</p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 4 — ALL SEO SERVICES
      ════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">

          <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">WHAT WE OFFER</span>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white max-w-2xl leading-none">
              Every SEO Service You Need.<br />
              <span className="text-[#DD183B]">All In-House.</span>
            </h2>
            <p className="text-[#8E8E8E] text-base max-w-md leading-relaxed font-sans lg:mb-2">
              We do not outsource to freelancers or white-label to other agencies. Every piece of work that goes out under our name is handled directly by our team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SEO_SERVICES.map((svc, i) => (
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
              <span>Talk to an SEO Expert</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 5 — WHY CHOOSE VCLICK
      ════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">

          <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">WHY VCLICK DIGITALLY</span>
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-14 max-w-3xl leading-none">
            Built on Trust.<br />
            <span className="text-[#DD183B]">Driven by Results.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '01', title: '5+ Years of Hands-On Experience', desc: 'Not theoretical knowledge — real campaigns run, real mistakes learned from, and real results delivered across industries from ecommerce to healthcare to SaaS. Our founder Dhiwaagar has personally managed every client account since day one.' },
              { num: '02', title: 'Full-Stack Technical + Content SEO', desc: 'Most agencies are strong at one and weak at the other. We handle both — the technical infrastructure and the content that fills it. This means your SEO strategy is never half-built.' },
              { num: '03', title: 'AI-Ready SEO Strategy', desc: 'We are not still running 2019 SEO playbooks. Our strategies include AI search visibility — positioning your content to be cited by ChatGPT, Perplexity, and Gemini, not just ranked on Google\'s traditional blue links.' },
              { num: '04', title: '100% White-Hat, Algorithm-Safe', desc: 'Every link we build is from a real, relevant website. Every piece of content we create is written for humans. We have never used PBNs, link farms, or black-hat shortcuts — because they work briefly and then destroy everything you\'ve built.' },
              { num: '05', title: 'Transparent GSC + GA4 Reporting', desc: 'You see exactly what we see. Every month, we share reports from Google Search Console and GA4 that tie our work directly to traffic, rankings, and enquiries — not metrics designed to look good on paper.' },
              { num: '06', title: 'No Outsourcing. Ever.', desc: 'We are a small, focused team that handles a limited number of clients so we can deliver quality that larger agencies cannot match at scale. When you work with us, you work with us — not an offshore team you\'ve never spoken to.' },
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

      {/* ════════════════════════════════════════════════════
          SECTION 6 — PROCESS
      ════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">

          <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">HOW WE WORK</span>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white max-w-2xl leading-none">
              A Clear Process.<br />
              <span className="text-[#DD183B]">Built Around Your Success.</span>
            </h2>
            <p className="text-[#8E8E8E] text-base max-w-md leading-relaxed font-sans lg:mb-2">
              Every project begins with understanding your business and ends with measurable organic growth. Our five-phase process keeps every stage transparent, collaborative, and focused on results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="group bg-[#111111] border border-white/10 hover:border-[#DD183B]/30 p-6 rounded-2xl transition-all duration-300 relative"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-black font-display text-[#DD183B]">{step.num}</span>
                  <span className="text-[9px] font-mono text-[#8E8E8E]">PHASE_{step.num}</span>
                </div>
                <h3 className="text-sm font-black text-white mb-3 font-display uppercase tracking-tight leading-tight">{step.title}</h3>
                <p className="text-xs text-[#8E8E8E] leading-relaxed font-sans">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-10 flex items-center justify-center">
            <button
              onClick={onStartProject}
              className="group bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white px-8 py-4 font-black uppercase text-xs tracking-[0.25em] transition-all duration-300 rounded-xl cursor-pointer flex items-center gap-3"
            >
              <span>Start Your SEO Journey</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 8 — INDUSTRIES
      ════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">

          <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">INDUSTRIES WE SERVE</span>
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-12 max-w-3xl leading-none">
            SEO That Understands<br />
            <span className="text-[#DD183B]">Your Industry.</span>
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

      {/* ════════════════════════════════════════════════════
          SECTION 9 — PLATFORMS
      ════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">

          <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">PLATFORMS WE OPTIMISE</span>
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-12 max-w-3xl leading-none">
            WordPress. Shopify.<br />
            <span className="text-[#DD183B]">React & Next.js.</span>
          </motion.h2>

          {/* Platform tabs */}
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
                {PLATFORMS[activePlatform].name} SEO — What We Do
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

      {/* ════════════════════════════════════════════════════
          SECTION 10 — LOCATION
      ════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">

          <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">WHERE WE WORK</span>
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-12 max-w-3xl leading-none">
            SEO Company Chennai.<br />
            <span className="text-[#DD183B]">Serving the World.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { region: 'Local SEO — Chennai', flag: '🇮🇳', desc: 'We understand the Chennai business landscape — from Anna Nagar to T. Nagar, Velachery to OMR. We optimise your Google Business Profile, build local citations, and target Chennai-specific search queries to bring local customers to you.' },
              { region: 'National SEO — Across India', flag: '🇮🇳', desc: 'For businesses targeting customers across India, we build a national keyword architecture, create content that resonates across regions, and build the domain authority needed to compete in India\'s most competitive industries.' },
              { region: 'International SEO — Global', flag: '🌏', desc: 'We work with Indian businesses expanding internationally and international brands targeting Indian markets. Our international SEO includes hreflang implementation, country-specific keyword research, and regional content strategies.' },
            ].map((loc, i) => (
              <motion.div
                key={loc.region}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#111111] border border-white/10 hover:border-[#DD183B]/30 p-6 rounded-2xl transition-all duration-300 group"
              >
                <div className="text-3xl mb-4">{loc.flag}</div>
                <h3 className="text-sm font-black text-white mb-3 font-display uppercase tracking-tight group-hover:text-[#DD183B] transition-colors">{loc.region}</h3>
                <p className="text-sm text-[#8E8E8E] leading-relaxed font-sans">{loc.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-8 p-5 bg-[#DD183B]/5 border border-[#DD183B]/20 rounded-xl max-w-xl">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-[#DD183B]" />
              <span className="text-xs font-black uppercase tracking-widest text-[#DD183B]">Active Client Markets</span>
            </div>
            <p className="text-sm text-white/70 font-sans">India · Singapore · Saudi Arabia · USA</p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════
          SECTION 12 — FAQ
      ════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 md:px-12 py-20 md:py-24">

          <motion.div {...fadeUp} className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">FREQUENTLY ASKED QUESTIONS</span>
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-4 text-center leading-none">
            Answers That<br />
            <span className="text-[#DD183B]">Actually Help.</span>
          </motion.h2>
          <motion.p {...fadeUp} transition={{ duration: 0.65, delay: 0.15 }} className="text-[#8E8E8E] text-base text-center max-w-xl mx-auto mb-12 font-sans leading-relaxed">
            Real answers to real questions — no vague promises, no marketing fluff.
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
                    className="w-full p-5 sm:p-6 flex items-center justify-between text-left gap-4 cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-white font-sans tracking-tight leading-snug">{faq.q}</span>
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

      {/* ════════════════════════════════════════════════════
          SECTION 13 — FINAL CTA
      ════════════════════════════════════════════════════ */}
      <section className="relative z-10 border-t border-white/5 bg-[#0D0D0D] overflow-hidden">
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
            Ready to Own<br />
            <span className="text-[#DD183B]">Page One?</span>
          </motion.h2>

          <motion.p {...fadeUp} transition={{ duration: 0.65, delay: 0.2 }} className="text-[#8E8E8E] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-sans">
            Start with a free SEO audit. We will tell you exactly where your website stands, what is holding it back, and what it will take to move it to page one — with no obligation to continue.
          </motion.p>

          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.25 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={onStartProject}
              className="group bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white px-10 py-5 font-black uppercase text-xs tracking-[0.25em] transition-all duration-300 rounded-xl shadow-[0_0_45px_rgba(221,24,59,0.35)] cursor-pointer flex items-center gap-3"
            >
              <span>Get Your Free SEO Audit</span>
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
            {['Free audit, no commitment', '5+ years experience', 'Real results, real clients', 'Chennai & worldwide'].map((tag) => (
              <div key={tag} className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-[#DD183B]" />
                <span className="text-[11px] text-[#8E8E8E] font-sans">{tag}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  );
};
