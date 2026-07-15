"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useModals } from '@/providers/ModalProvider';
import {
  ArrowLeft, ArrowRight, ChevronDown, CheckCircle2, ArrowUpRight,
  Zap, Globe, Search, BarChart2, Code2, ShoppingBag,
  MapPin, Cpu, FileSearch, Link2, RefreshCw, Layers, Settings,
  TrendingUp, Star, HelpCircle, TrendingDown, Activity, Award, ShieldCheck, Smartphone
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

interface WebsiteDevelopmentServicesPageProps {
  onNavigateHome?: () => void;
  onStartProject?: () => void;
}

// ── FAQ DATA ──────────────────────────────────────────────────────────────────
const FAQ_DATA = [
  { q: 'How long does website development take?', a: 'A standard business website typically takes 3 to 6 weeks from discovery to launch, while complex custom platforms or extensive e-commerce stores can take 6 to 10 weeks. The exact duration depends on the scope of page custom layouts, content readiness, and custom integrations.' },
  { q: 'Can you redesign my existing website without affecting my business?', a: 'Yes. We offer complete website redesign services that modernize your brand\'s digital presence, improve user experience, optimize speed, and preserve your existing search engine optimization rankings through meticulous page redirection and link structuring.' },
  { q: 'Will my website be mobile friendly?', a: 'Absolutely. Every website we design and build is 100% responsive. This means it adapts automatically to render beautifully on mobile phones, tablets, laptops, and wide-screen desktops, ensuring a premium experience on every device.' },
  { q: 'Will my website be SEO ready from day one?', a: 'Yes. Search engine optimization is integrated directly into our development cycle. We construct your website with semantic HTML markup, fast-loading scripts, structured JSON-LD schema, search console configuration, and proper tag layouts to rank from day one.' },
  { q: 'Do you build ecommerce websites?', a: 'Yes. We specialize in building secure, scalable e-commerce storefronts on platforms like Shopify and WooCommerce. We handle product database configurations, custom cart drawers, localized payment gateways, and checkout flow optimizations.' },
  { q: 'Can I update the website content myself?', a: 'Yes. We configure user-friendly Content Management Systems (CMS) like WordPress and Shopify, and customize the admin interface so you can easily edit copy, update images, post blog articles, or add products without needing a developer.' },
  { q: 'Do you provide ongoing website maintenance and support?', a: 'Yes. We provide ongoing support and maintenance packages. This includes daily backups, security monitoring, database tuning, core platform updates, and content adjustments to keep your digital asset secure and running at peak performance.' },
  { q: 'Which platform is best for my business?', a: 'The ideal platform depends on your business goals. WordPress is perfect for content-rich sites, Shopify is best for direct-to-consumer e-commerce, and custom coded websites are ideal for unique, highly interactive layouts. We help you choose during discovery.' }
];

// ── SERVICES DATA (24 items) ──────────────────────────────────────────────────
const WEB_SERVICES = [
  { icon: <Globe className="w-5 h-5" />, title: 'Business Websites', desc: 'Custom website layouts designed specifically to build trust, represent your values, and convert local enquiries.' },
  { icon: <Search className="w-5 h-5" />, title: 'Corporate Websites', desc: 'Enterprise-level web presences with scalable layouts, structured information hubs, and compliance setups.' },
  { icon: <ShoppingBag className="w-5 h-5" />, title: 'Ecommerce Websites', desc: 'Secure online storefronts built to scale catalog listings, handle payments, and streamline checkouts.' },
  { icon: <Globe className="w-5 h-5" />, title: 'WordPress Websites', desc: 'Tailored WordPress solutions utilizing lightweight building tools for fast load speeds and simple editing.' },
  { icon: <ShoppingBag className="w-5 h-5" />, title: 'WooCommerce Websites', desc: 'Integrate full e-commerce shopping features directly into your WordPress site for seamless product selling.' },
  { icon: <ShoppingBag className="w-5 h-5" />, title: 'Shopify Stores', desc: 'Turnkey Shopify setups configured with customized layouts, cart drawers, and local shipping options.' },
  { icon: <Layers className="w-5 h-5" />, title: 'Squarespace Websites', desc: 'Clean, elegant portfolios and informational layouts developed on the Squarespace builder.' },
  { icon: <Settings className="w-5 h-5" />, title: 'Wix Websites', desc: 'Highly customized Wix solutions optimized for speed, responsive grids, and logical information layout.' },
  { icon: <Layers className="w-5 h-5" />, title: 'Landing Pages', desc: 'Single-page campaign destinations focused entirely on conversion, speed, and clear calls-to-action.' },
  { icon: <Award className="w-5 h-5" />, title: 'Portfolio Websites', desc: 'Visual flagships designed for agencies, artists, and executives to showcase projects and credibility.' },
  { icon: <RefreshCw className="w-5 h-5" />, title: 'Website Redesign', desc: 'Rebuild outdated codebases to modernize visual layouts, optimize core speed, and retain search rankings.' },
  { icon: <Settings className="w-5 h-5" />, title: 'Website Maintenance', desc: 'Regular security audits, platform updates, database optimization, backups, and layout changes.' },
  { icon: <Smartphone className="w-5 h-5" />, title: 'Responsive Design', desc: 'Interface engineering that renders perfectly on every mobile, tablet, and desktop display format.' },
  { icon: <Code2 className="w-5 h-5" />, title: 'Custom Coded Websites', desc: 'Clean, standard-compliant HTML, CSS, JavaScript, and PHP scripts written without heavy templates.' },
  { icon: <FileSearch className="w-5 h-5" />, title: 'Web Auditing', desc: 'Analyzing existing codebases for layout errors, crawl blocks, script bloat, and usability flaws.' },
  { icon: <Layers className="w-5 h-5" />, title: 'B2B Portals', desc: 'Customized web areas designed to handle partner registrations, file shares, and client queries.' },
  { icon: <Settings className="w-5 h-5" />, title: 'CMS Configurations', desc: 'Customizing dashboard layouts on WordPress and Shopify so your team can edit content easily.' },
  { icon: <Cpu className="w-5 h-5" />, title: 'API Integrations', desc: 'Connecting your web platform with external tools, CRMs, social feeds, and payment gateways.' },
  { icon: <Zap className="w-5 h-5" />, title: 'Speed Optimization', desc: 'Image compression, script optimization, and server caching to decrease page load times.' },
  { icon: <ShieldCheck className="w-5 h-5" />, title: 'Security Setup', desc: 'Configuring secure server certificates, firewall rules, and security policies to block threats.' },
  { icon: <Layers className="w-5 h-5" />, title: 'Layout Architecture', desc: 'Structuring website menus and links logically so search engines and users can find pages easily.' },
  { icon: <TrendingUp className="w-5 h-5" />, title: 'Lead Generation Setup', desc: 'Integrating inquiry forms, newsletter signups, and clear buttons to convert traffic.' },
  { icon: <Globe className="w-5 h-5" />, title: 'Multilingual Websites', desc: 'Configuring international sites with hreflang structures and translation options for global search.' },
  { icon: <Layers className="w-5 h-5" />, title: 'Domain Migrations', desc: 'Meticulously mapping link redirections when moving to new domains to secure existing authority.' }
];

// ── PROCESS STEPS ─────────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  { num: '01', title: 'Discovery', desc: 'We start by understanding your business goals, target audience, competitor sites, and brand guidelines to set a clear direction.' },
  { num: '02', title: 'Planning', desc: 'We create a logical sitemap architecture, layout wireframes, and choose the most suitable platform for your project goals.' },
  { num: '03', title: 'UI/UX Design', desc: 'We design custom page prototypes focused on clean branding, visual balance, and intuitive paths for user conversion.' },
  { num: '04', title: 'Development', desc: 'Our team writes standard-compliant code or tailors the chosen CMS, ensuring layouts are lightweight and clean.' },
  { num: '05', title: 'Testing', desc: 'We verify layout responsiveness on all screen sizes, page load speeds, and link redirections before going live.' },
  { num: '06', title: 'Launch', desc: 'We connect your domain, configure search console tags, submit XML sitemaps, and launch the platform securely.' },
  { num: '07', title: 'Ongoing Support', desc: 'We deploy daily backups, monitor security logs, run database optimizations, and process requested layout updates.' }
];

// ── PLATFORMS DATA ────────────────────────────────────────────────────────────
const PLATFORMS = [
  {
    name: 'WordPress & Builders',
    points: [
      'Custom theme setups using lightweight code blocks',
      'Integrate page editors like Elementor for easy updates',
      'Configure WooCommerce store checkout integrations',
      'Optimize database queries and server cache rules',
      'Setup custom contact forms and lead databases'
    ]
  },
  {
    name: 'Shopify E-Commerce',
    points: [
      'Tailored Shopify setups matching corporate branding',
      'Configure product catalogs, tags, and variants',
      'Integrate local payment gateways and shipping calculators',
      'Setup customized cart drawers and collection filters',
      'Review store applications to maintain page speed'
    ]
  },
  {
    name: 'Custom Coded Websites',
    points: [
      'Develop lightweight sites using HTML, CSS, and JS',
      'Write backend functionalities with secure PHP scripts',
      'Build fully responsive grid systems without frameworks',
      'Construct semantic HTML tags for search indexing',
      'Ensure swift edge rendering and sub-second asset load'
    ]
  }
];

// ── INDUSTRIES DATA ───────────────────────────────────────────────────────────
const INDUSTRIES = [
  { title: 'Ecommerce', desc: 'Product page layouts, custom checkout funnels, review integrations, and conversion rate optimizations.' },
  { title: 'Healthcare', desc: 'Information portals, clinic service layouts, local maps integrations, and trust-focused content designs.' },
  { title: 'Education', desc: 'Course catalogs, student portals, school details pages, and lead forms for student inquiries.' },
  { title: 'SaaS & Technology', desc: 'Interactive visual panels, pricing tables, product detail grids, and modern layout layouts.' },
  { title: 'Manufacturing & B2B', desc: 'Product catalogs, specification sheets, quote forms, and multilingual setups for global markets.' },
  { title: 'Local Businesses', desc: 'Service pages, reviews sections, map integrations, and direct call-to-actions for local leads.' }
];

// ── PORTFOLIO DATA (Real clients from mockData) ──────────────────────────────
const PORTFOLIO_PROJECTS = [
  {
    id: 'girly-colours',
    client: 'GIRLY COLOURS',
    tagline: 'Premium Fashion E-Commerce Platform',
    desc: 'An online shopping experience built to showcase lifestyle apparel. Optimized with customized grids, product filters, and payment checkouts.',
    tags: {
      industry: 'Fashion & Lifestyle',
      projectType: 'E-Commerce Store',
      category: 'Retail & D2C',
      websiteType: 'Shopify Platform'
    },
    metrics: ['Custom Checkout', 'Shopify Store']
  },
  {
    id: 'murali-academy',
    client: 'MURALI ACADEMY',
    tagline: 'Professional Educational Portal',
    desc: 'A structured resource hub designed for training programs. Features catalog layouts, course sections, and enquiry forms.',
    tags: {
      industry: 'Education & Training',
      projectType: 'Portal Website',
      category: 'Educational Services',
      websiteType: 'WordPress Platform'
    },
    metrics: ['Easy CMS Updates', 'WordPress Builder']
  },
  {
    id: 'hitech-graphite',
    client: 'HITECH GRAPHITE',
    tagline: 'Industrial B2B Corporate Website',
    desc: 'A robust digital platform showcasing B2B manufacturing capabilities. Built with custom code for edge performance.',
    tags: {
      industry: 'Manufacturing',
      projectType: 'Corporate Website',
      category: 'Industrial B2B',
      websiteType: 'Custom Coded Website'
    },
    metrics: ['Fast Load Speed', 'Custom Coded']
  },
  {
    id: 'jh-rehab',
    client: 'JH REHABILITATION HOSPITAL',
    tagline: 'Healthcare Services Platform',
    desc: 'A user-focused informational platform developed to share clinical treatments, local directories, and direct booking forms.',
    tags: {
      industry: 'Healthcare',
      projectType: 'Information Portal',
      category: 'Medical Services',
      websiteType: 'WordPress Platform'
    },
    metrics: ['Mobile Optimized', 'WordPress CMS']
  }
];

// ── TESTIMONIALS DATA ─────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: 'Alexander Sterling',
    role: 'Managing Director',
    company: 'Vanguard Capital Partners',
    verifiedRevenue: '+$14.8M AUM Growth',
    quote: 'We vetted 8 high-end agencies in London and New York before selecting VClick Digitally. Their technical precision and aesthetic taste are on another planet. Our cost per acquisition dropped by 54% within two quarters.'
  },
  {
    name: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'Lumière BioTech',
    verifiedRevenue: '3.8x Valuation Lift',
    quote: 'When you are raising a Series B, your digital brand is everything. VClick built an interactive flagship that stunned our institutional investors. Furthermore, our organic search traffic for core biotech terms grew 620%.'
  },
  {
    name: 'Liam O’Connor',
    role: 'Head of Growth',
    company: 'Apex Cloud Systems',
    verifiedRevenue: '$840k Monthly Inbound ARR',
    quote: 'They treat our marketing budget like their own money. The PPC bidding scripts they deployed eliminated nearly $30k of monthly ad waste while doubling our qualified enterprise demo bookings.'
  }
];

// ── HERO SUB-COMPONENT ────────────────────────────────────────────────────
const WebHero: React.FC = () => {
  const { openProject } = useModals();
  const onStartProject = () => openProject(25000, "WEB");
  const onScrollDown = () => {
    document.getElementById('web-what-is')?.scrollIntoView({ behavior: 'smooth' });
  };
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

  const clients = useAnimatedCounter(17, 1600, inView);
  const years = useAnimatedCounter(5, 1400, inView);
  const countries = useAnimatedCounter(4, 1000, inView);

  // Floating badge positions
  const badges = [
    {
      id: 'performance',
      icon: <Zap className="w-4 h-4 text-emerald-400" />,
      label: 'Performance',
      value: `Optimized`,
      valueColor: 'text-emerald-400',
      trend: 'Minified assets & code',
      delay: '0s',
      className: 'top-[8%] right-[4%]',
      animY: [-6, 6, -6]
    },
    {
      id: 'seoready',
      icon: <Search className="w-4 h-4 text-blue-400" />,
      label: 'SEO-Ready',
      value: `Day 1`,
      valueColor: 'text-blue-400',
      trend: 'Clean semantic markup',
      delay: '0.8s',
      className: 'bottom-[28%] right-[2%]',
      animY: [6, -6, 6]
    },
    {
      id: 'responsive',
      icon: <Smartphone className="w-4 h-4 text-[#DD183B]" />,
      label: 'Responsive',
      value: `100%`,
      valueColor: 'text-[#DD183B]',
      trend: 'Mobile & desktop ready',
      delay: '1.6s',
      className: 'bottom-[8%] left-[4%] lg:left-auto lg:right-[24%]',
      animY: [-4, 4, -4]
    }
  ];

  return (
    <section
      ref={ref}
      aria-label="Web Development Services Hero — VClick Digitally"
      className="relative z-10 w-full overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[75vh]">

          {/* LEFT COLUMN — COPY */}
          <div className="lg:col-span-7 flex flex-col">
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
                Website Development Services — VClick Digitally
              </span>
            </motion.div>

            {/* H1 — word-by-word animated entry */}
            <h1
              className="font-black tracking-tighter uppercase font-display text-white leading-[0.92] mb-4"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
            >
              <span className="block overflow-hidden">
                {['WEBSITES', 'THAT'].map((word, i) => (
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
              <span className="block overflow-hidden">
                {["DON'T", 'JUST', 'LOOK'].map((word, i) => (
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
              <span className="block overflow-hidden text-[#DD183B]">
                {['GREAT.', 'THEY'].map((word, i) => (
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
              <span className="block overflow-hidden">
                {['GROW', 'BUSINESSES.'].map((word, i) => (
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

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#8E8E8E] text-base sm:text-lg leading-relaxed font-sans mb-2 max-w-xl"
            >
              We build fast, responsive, SEO-ready websites that strengthen your brand,
              improve user experience, and help{' '}
              <span className="text-white/80 font-semibold">convert visitors into customers.</span>
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#8E8E8E] text-base sm:text-lg leading-relaxed font-sans mb-10 max-w-xl"
            >
              Every layout is tailored — designed entirely in-house using{' '}
              <span className="text-white/80 font-semibold">clean standards, secure platforms,</span>{' '}
              and speed configurations built to satisfy search engine indexes from day one.
            </motion.p>

            {/* Trust Signal Row */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-5 mb-10"
              aria-label="Factual statistics"
            >
              {[
                { val: `${clients}+`, label: 'Happy Clients' },
                { val: `${years}+`,  label: 'Years Active' },
                { val: `${countries}`,   label: 'Countries' },
                { val: '100%', label: 'Responsive' },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2.5 pr-5 border-r border-white/10 last:border-0 last:pr-0"
                >
                  <span className="text-2xl font-black font-display text-[#DD183B]">{s.val}</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#8E8E8E] font-sans leading-tight max-w-[60px]">{s.label}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <button
                id="hero-primary-cta"
                onClick={onStartProject}
                aria-label="Start your web development project with VClick"
                className="group relative bg-[#DD183B] hover:bg-white text-white hover:text-[#0B0B0B] px-8 py-4 font-black uppercase text-xs tracking-[0.25em] transition-all duration-300 rounded-xl cursor-pointer flex items-center gap-3 overflow-hidden"
                style={{ boxShadow: '0 0 40px rgba(221,24,59,0.35), 0 0 80px rgba(221,24,59,0.1)' }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl border border-[#DD183B] animate-ping opacity-30"
                />
                <span>Start Your Project</span>
                <ArrowUpRight
                  className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  aria-hidden="true"
                />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={onScrollDown}
                aria-label="See our web development services"
                className="group flex items-center gap-2 text-[#8E8E8E] hover:text-white text-sm font-semibold font-sans transition-colors cursor-pointer"
              >
                <span>See All Services</span>
                <ArrowRight
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.35 }}
              className="mt-4 text-[11px] text-white/25 font-sans"
            >
              Factual metrics · Custom solutions · Strategy before execution
            </motion.p>
          </div>

          {/* RIGHT COLUMN — ANIMATED VISUAL PANEL */}
          <div
            className="lg:col-span-5 relative flex items-center justify-center h-[460px] lg:h-auto lg:min-h-[520px]"
            aria-hidden="true"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-72 h-72 bg-[#DD183B] rounded-full opacity-[0.08]"
                style={{ filter: 'blur(80px)' }}
              />
            </div>

            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />

            {/* MAIN CARD — BROWSER MOCKUP */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-[360px] mx-auto"
            >
              <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
                {/* Browser top bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#141414] border-b border-white/8">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28CA41]" />
                  </div>
                  <div className="flex-1 mx-3 bg-[#0D0D0D] rounded-md px-3 py-1 flex items-center gap-2">
                    <Globe className="w-2.5 h-2.5 text-[#8E8E8E] shrink-0" />
                    <span className="text-[10px] text-[#8E8E8E] font-sans truncate">vclickdigitally.com/services/web</span>
                  </div>
                </div>

                {/* Simulated Web Blocks & Semantic Codes */}
                <div className="p-4 space-y-3 font-mono text-[9px]">
                  {/* Mock Navbar Block */}
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between text-white/40">
                    <span>&lt;header&gt;</span>
                    <div className="flex gap-1">
                      <span className="w-4 h-1 bg-white/10 rounded-full" />
                      <span className="w-4 h-1 bg-white/10 rounded-full" />
                    </div>
                  </div>

                  {/* Mock Hero Block */}
                  <div className="p-3.5 rounded-lg bg-[#DD183B]/5 border border-[#DD183B]/20 text-[#DD183B]/70 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>&lt;section id="hero"&gt;</span>
                      <span className="text-[8px] bg-emerald-400/10 text-emerald-400 px-1 rounded">responsive</span>
                    </div>
                    <div className="space-y-1 pl-2">
                      <div className="h-1.5 w-16 bg-[#DD183B]/30 rounded" />
                      <div className="h-1.5 w-24 bg-white/10 rounded" />
                    </div>
                  </div>

                  {/* Mock Grid Block */}
                  <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 text-white/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span>&lt;main class="grid"&gt;</span>
                      <span className="text-[7px] text-[#8E8E8E]">flex-cols-12</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 pl-2">
                      <div className="h-6 bg-white/5 border border-white/8 rounded flex items-center justify-center text-[7px]">&lt;div&gt;</div>
                      <div className="h-6 bg-white/5 border border-white/8 rounded flex items-center justify-center text-[7px]">&lt;div&gt;</div>
                      <div className="h-6 bg-white/5 border border-white/8 rounded flex items-center justify-center text-[7px]">&lt;div&gt;</div>
                    </div>
                  </div>

                  {/* Mock Footer Block */}
                  <div className="p-2 rounded-lg bg-white/[0.01] border border-white/5 text-white/20">
                    <span>&lt;footer&gt; &copy; VClick &lt;/footer&gt;</span>
                  </div>

                  <div className="border-t border-white/5 pt-2 flex items-center gap-1.5 font-sans">
                    <Activity className="w-3 h-3 text-[#DD183B]" />
                    <span className="text-[9px] text-[#8E8E8E]">Semantic layout structure • Standard compliant</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FLOATING METRIC BADGES */}
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

            {/* SCROLL INDICATOR */}
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

        {/* "IS THIS YOU?" CALLOUT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 bg-[#111111] border border-white/8 rounded-2xl p-7 max-w-4xl"
          role="complementary"
          aria-label="Common website problems we solve"
        >
          <div className="flex items-center gap-2 mb-5">
            <span className="h-[1.5px] w-6 bg-[#DD183B]" aria-hidden="true" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#DD183B]">Sound familiar? You're not alone.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              "Your website looks outdated and doesn't match your brand's standards",
              'Slow loading times cause visitors to leave before interacting',
              'Not mobile friendly, causing you to lose potential mobile clients',
              'Difficult navigation makes it hard for users to find what they need',
              'Lack of a clear call to action results in low conversion rates',
              'Inconsistent branding across pages reduces user trust and credibility',
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
export const WebsiteDevelopmentServicesPage: React.FC<WebsiteDevelopmentServicesPageProps> = ({
  onNavigateHome,
  onStartProject
}) => {
  const { openProject } = useModals();
  const handleStartProject = onStartProject || (() => openProject(25000, "WEB"));
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activePlatform, setActivePlatform] = useState(0);
  const [activePortfolioTab, setActivePortfolioTab] = useState(0);

  const fadeUp = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  };

  return (
    <div className="relative bg-[#0B0B0B] text-white font-sans selection:bg-[#DD183B] selection:text-white">

      {/* AMBIENT BACKGROUND GLOW */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[15%] right-[10%] w-[500px] h-[500px] bg-[#DD183B] rounded-full filter blur-[160px] opacity-[0.05]" />
        <div className="absolute bottom-[30%] left-[5%] w-[400px] h-[400px] bg-[#DD183B] rounded-full filter blur-[180px] opacity-[0.04]" />
      </div>

      {/* BREADCRUMB + BACK NAV */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-4">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#8E8E8E] hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Homepage</span>
        </Link>
        <p className="text-[11px] text-white/30 font-sans tracking-wider">
          <Link href="/" className="hover:text-white transition-colors">Home</Link> &rsaquo; <Link href="/#services" className="hover:text-white transition-colors">Services</Link> &rsaquo; <span className="text-[#DD183B]">Website Development Services</span>
        </p>
      </div>

      {/* SECTION 1 — HERO */}
      <WebHero />

      {/* SECTION 3 — UNDERSTANDING WEB DEVELOPMENT */}
      <section id="web-what-is" className="relative z-10 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">

          <motion.div {...fadeUp} className="flex items-center gap-3 mb-6">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">UNDERSTANDING WEBSITE DEVELOPMENT</span>
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-6 max-w-3xl leading-none">
            What Is Website Development — And Why Does It Matter More Than Ever?
          </motion.h2>

          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.15 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[#8E8E8E] text-base sm:text-lg leading-relaxed mb-5 font-sans">
                Website Development is the practice of building a custom web platform that functions as the foundation of your digital brand. It is often the first point of contact for potential customers.
              </p>
              <p className="text-[#8E8E8E] text-base sm:text-lg leading-relaxed mb-5 font-sans">
                It is not about generic templates that load slowly. It is about crafting clean layouts, responsive code structures, and fast-rendering assets tailored specifically to your business audience.
              </p>
              <p className="text-white text-base sm:text-lg leading-relaxed font-sans font-semibold">
                A poor website causes visitors to exit before reading your offer. A professional website acts as an active conversion tool — loading fast, adapting to mobile, and providing clear call-to-actions that drive growth.
              </p>
            </div>

            {/* Three pillars visual */}
            <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">
              <p className="text-[10px] uppercase tracking-widest text-[#DD183B] font-black mb-5">The Three Pillars of Web Dev</p>
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Responsive Design', desc: 'Ensuring your website adapts beautifully to all screen sizes, from mobile devices to desktops', color: 'bg-white/30' },
                  { label: 'Performance & Speed', desc: 'Optimizing code and media to ensure fast loading times and a smooth user experience', color: 'bg-[#DD183B]' },
                  { label: 'SEO & Accessibility', desc: <span>Structuring clean markup and semantic layouts. For organic ranking dominance campaigns, explore our <Link href="/services/seo" className="text-[#DD183B] hover:underline font-semibold">SEO Services</Link>.</span>, color: 'bg-white/10' },
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

              <div className="mt-5 pt-5 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-widest text-[#DD183B] font-black mb-3">Modern Platforms</p>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#DD183B]/5 border border-[#DD183B]/15">
                  <Globe className="w-4 h-4 text-[#DD183B] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-black text-white mb-0.5">WordPress, Shopify, Squarespace, Wix</p>
                    <p className="text-xs text-[#8E8E8E] leading-relaxed">Built on clean layouts and user-friendly management dashboards</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.2 }} className="mt-14 overflow-x-auto">
            <p className="text-[10px] uppercase tracking-widest text-[#DD183B] font-black mb-4">Development Approach Comparison</p>
            <table className="w-full text-sm border-collapse min-w-[560px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold">Development Path</th>
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold">Load Speed</th>
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold">SEO Structure</th>
                  <th className="text-left py-3 pr-4 text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold">Brand Identity</th>
                  <th className="text-left py-3 text-[10px] uppercase tracking-widest text-[#8E8E8E] font-bold">Scalability</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { path: 'DIY Page Builders', speed: 'Restricted (Slow)', seo: 'Script Heavy (Low)', brand: 'Generic Layouts', scale: 'Locked Features' },
                  { path: 'Generic Templates', speed: 'Bloated (Slow)', seo: 'Plugin Heavy (Medium)', brand: 'Lookalike Layouts', scale: 'Restricted Features' },
                  { path: 'Custom Coded Websites', speed: 'Optimized (Fast)', seo: 'Semantic (High)', brand: '100% Unique', scale: 'Highly Scalable', highlight: true },
                ].map((r) => (
                  <tr key={r.path} className={`border-b border-white/5 transition-colors ${r.highlight ? 'bg-[#DD183B]/5' : ''}`}>
                    <td className={`py-3 pr-4 font-semibold ${r.highlight ? 'text-[#DD183B]' : 'text-white/80'}`}>{r.path}</td>
                    <td className="py-3 pr-4 text-white/50">{r.speed}</td>
                    <td className="py-3 pr-4 text-white/50">{r.seo}</td>
                    <td className="py-3 pr-4 text-white/50">{r.brand}</td>
                    <td className={`py-3 font-semibold ${r.highlight ? 'text-white' : 'text-white/50'}`}>{r.scale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Expert quote */}
          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.25 }} className="mt-12 border-l-2 border-[#DD183B] pl-6 max-w-2xl">
            <p className="text-white/80 text-base sm:text-lg leading-relaxed italic font-sans mb-3">
              "A website should not just look professional; it must perform as a conversion tool. If it does not build trust or represent your brand's standards, it is costing you business."
            </p>
            <p className="text-[11px] uppercase tracking-widest text-[#DD183B] font-black">— Dhiwaagar, Founder, VClick Digitally</p>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4 — ALL WEB SERVICES */}
      <section className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">

          <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">WHAT WE OFFER</span>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white max-w-2xl leading-none">
              Every Website Service You Need.<br />
              <span className="text-[#DD183B]">All In-House.</span>
            </h2>
            <p className="text-[#8E8E8E] text-base max-w-md leading-relaxed font-sans lg:mb-2">
              We do not outsource to freelancers. Every piece of work that goes out under our name is handled directly by our team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {WEB_SERVICES.map((svc, i) => (
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
              onClick={handleStartProject}
              className="group bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white px-8 py-4 font-black uppercase text-xs tracking-[0.25em] transition-all duration-300 rounded-xl cursor-pointer flex items-center gap-3"
            >
              <span>Start Your Web Project</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5 — PROCESS */}
      <section className="relative z-10 border-t border-white/5 bg-[#0D0D0D]">
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
              Every project begins with understanding your business and ends with a secure website. Our seven-step process keeps every stage transparent and collaborative.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
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
                    <span className="text-[8px] font-mono text-[#8E8E8E]">STEP_{step.num}</span>
                  </div>
                  <h3 className="text-xs font-black text-white mb-2 font-display uppercase tracking-tight leading-tight">{step.title}</h3>
                  <p className="text-[11px] text-[#8E8E8E] leading-relaxed font-sans">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="mt-10 flex items-center justify-center">
            <button
              onClick={handleStartProject}
              className="group bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white px-8 py-4 font-black uppercase text-xs tracking-[0.25em] transition-all duration-300 rounded-xl cursor-pointer flex items-center gap-3"
            >
              <span>Build Your Platform Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* SECTION 6 — TECHNOLOGIES */}
      <section className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">

          <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">PLATFORMS WE USE</span>
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-12 max-w-3xl leading-none">
            WordPress & Builders. Shopify.<br />
            <span className="text-[#DD183B]">Custom Coded.</span>
          </motion.h2>

          {/* Tab buttons */}
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
                {PLATFORMS[activePlatform].name} Capabilities
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

      {/* SECTION 7 — WHY CHOOSE VCLICK */}
      <section className="relative z-10 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">

          <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">WHY CHOOSE VCLICK</span>
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-14 max-w-3xl leading-none">
            Built on Trust.<br />
            <span className="text-[#DD183B]">Driven by Results.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: '01', title: '5+ Years of Hands-on Experience', desc: 'Dhiwaagar brings 5+ years of digital experience, personally managing layouts and strategies to ensure quality and accountability.' },
              { num: '02', title: 'Strategy Before Execution', desc: 'We reject standard templates and do not write a single line of code until we fully understand your business objectives and audience goals.' },
              { num: '03', title: 'SEO-Friendly Code Standards', desc: 'Every website layout is engineered with logical navigation hierarchies, semantic markup, and proper sitemap integrations from day one.' },
              { num: '04', title: 'Mobile First Design', desc: 'We design fluid responsive grids, checking layouts across phones, tablets, and wide displays to maximize conversions.' },
              { num: '05', title: 'No Outsourcing. Ever.', desc: 'Our in-house team handles all development and support directly. We work with a limited set of accounts to maintain high quality.' },
              { num: '06', title: 'Transparent Collaboration', desc: 'Complete visibility throughout design and development stages. Clear reporting on page performance and project milestones.' }
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

      {/* SECTION 8 — FEATURED PORTFOLIO CAROUSEL (From homepage style) */}
      <section className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">

          <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">PORTFOLIO</span>
          </motion.div>

          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
            <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white max-w-2xl leading-none">
              Featured Work.<br />
              <span className="text-[#DD183B]">Proven Outcomes.</span>
            </h2>
            <p className="text-[#8E8E8E] text-base max-w-md leading-relaxed font-sans lg:mb-2">
              We design and develop clean, fast platforms for clients across diverse industries. Here is a look at some of our live flagships.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {PORTFOLIO_PROJECTS.map((proj, i) => (
              <button
                key={proj.id}
                onClick={() => setActivePortfolioTab(i)}
                className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                  activePortfolioTab === i
                    ? 'bg-[#DD183B] text-white'
                    : 'bg-[#111111] text-[#8E8E8E] border border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {proj.client}
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePortfolioTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left info column */}
                <div className="lg:col-span-6 space-y-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#DD183B] bg-[#DD183B]/10 px-3.5 py-1 rounded-full border border-[#DD183B]/20">
                    {PORTFOLIO_PROJECTS[activePortfolioTab].tags.projectType}
                  </span>
                  
                  <h3 className="text-3xl font-black font-display uppercase tracking-tight text-white leading-none">
                    {PORTFOLIO_PROJECTS[activePortfolioTab].tagline}
                  </h3>
                  
                  <p className="text-sm text-[#8E8E8E] leading-relaxed font-sans">
                    {PORTFOLIO_PROJECTS[activePortfolioTab].desc}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/30 block mb-1">Industry</span>
                      <span className="text-xs text-white font-bold font-sans">{PORTFOLIO_PROJECTS[activePortfolioTab].tags.industry}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/30 block mb-1">Business Category</span>
                      <span className="text-xs text-white font-bold font-sans">{PORTFOLIO_PROJECTS[activePortfolioTab].tags.category}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/30 block mb-1">Website Type</span>
                      <span className="text-xs text-white font-bold font-sans">{PORTFOLIO_PROJECTS[activePortfolioTab].tags.websiteType}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/30 block mb-1">Outcome Highlights</span>
                      <span className="text-xs text-white font-bold font-sans">{PORTFOLIO_PROJECTS[activePortfolioTab].metrics[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Right mockup column */}
                <div className="lg:col-span-6 flex items-center justify-center">
                  <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl w-full max-w-[380px] font-mono text-[9px] text-[#8E8E8E]">
                    <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#141414] border-b border-white/5">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
                        <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
                        <div className="w-2 h-2 rounded-full bg-[#28CA41]" />
                      </div>
                      <div className="flex-1 mx-3 bg-[#0D0D0D] rounded px-2 py-0.5 text-center truncate text-[8px]">
                        vclickdigitally.com/portfolio/{PORTFOLIO_PROJECTS[activePortfolioTab].id}
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="p-3 bg-white/5 rounded border border-white/8 text-white font-bold font-sans text-center">
                        {PORTFOLIO_PROJECTS[activePortfolioTab].client}
                      </div>
                      <div className="space-y-1.5 pl-1">
                        <div className="h-1 bg-white/20 rounded w-1/3" />
                        <div className="h-1 bg-white/10 rounded w-2/3" />
                        <div className="h-1.5 bg-[#DD183B]/20 rounded w-full mt-2" />
                      </div>
                      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[8px] font-sans">
                        <span className="text-emerald-400">Status: Live Flagship</span>
                        <span>Responsive Active</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* SECTION 9 — INDUSTRIES SERVED */}
      <section className="relative z-10 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">

          <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">INDUSTRIES WE SERVE</span>
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-12 max-w-3xl leading-none">
            Websites That Understand<br />
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

      {/* SECTION 10 — LOCATIONS */}
      <section className="relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">

          <motion.div {...fadeUp} className="flex items-center gap-3 mb-5">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">WHERE WE WORK</span>
          </motion.div>

          <motion.h2 {...fadeUp} transition={{ duration: 0.65, delay: 0.1 }} className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-12 max-w-3xl leading-none">
            Web Development Chennai.<br />
            <span className="text-[#DD183B]">Serving the World.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { region: 'Local Web Development — Chennai', flag: '🇮🇳', desc: 'We design responsive business layouts for the Chennai ecosystem — understanding your regional audience, key locations, and service requirements to capture customers locally.' },
              { region: 'National Web Development — India', flag: '🇮🇳', desc: 'For corporate brands looking to represent credibility across Indian states. We deploy secure setups optimized for speed, compliant parameters, and high-volume inquiry loads.' },
              { region: 'International Web Development — Global', flag: '🌏', desc: 'We build sites optimized with multilingual parameters and regional domain redirections for Indian exporters and international enterprises targeting cross-border clients.' },
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

      {/* SECTION 11 — TESTIMONIALS */}
      <section className="relative z-10 border-t border-white/5 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[1.5px] w-10 bg-[#DD183B]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
                  Verified Executive Consensus
                </span>
              </div>
              <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase font-display text-white">
                What Institutional <span className="text-transparent text-stroke-white">Leaders</span> Say
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="p-8 sm:p-10 rounded-3xl bg-[#111111] border border-white/10 flex flex-col justify-between relative group hover:border-[#DD183B]/50 transition-all duration-400"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1 text-[#DD183B]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-black uppercase font-display tracking-wider text-[#DD183B] bg-[#DD183B]/10 px-3 py-1 rounded-full border border-[#DD183B]/20">
                      {item.verifiedRevenue}
                    </span>
                  </div>

                  <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8 font-sans">
                    "{item.quote}"
                  </p>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#DD183B] to-[#111111] flex items-center justify-center text-white font-black font-display text-xl shrink-0">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">{item.name}</h3>
                    <p className="text-xs text-[#8E8E8E] uppercase tracking-wider font-medium">
                      {item.role} // <span className="text-white/80">{item.company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 12 — FAQ */}
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

      {/* SECTION 13 — FINAL CTA */}
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
            Ready to Build a Website<br />
            <span className="text-[#DD183B]">That Drives Results?</span>
          </motion.h2>

          <motion.p {...fadeUp} transition={{ duration: 0.65, delay: 0.2 }} className="text-[#8E8E8E] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-sans">
            Let's create a website that builds trust, delivers a great user experience, and helps your business grow online. Get in touch for a free consultation.
          </motion.p>

          <motion.div {...fadeUp} transition={{ duration: 0.65, delay: 0.25 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={handleStartProject}
              className="group bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white px-10 py-5 font-black uppercase text-xs tracking-[0.25em] transition-all duration-300 rounded-xl shadow-[0_0_45px_rgba(221,24,59,0.35)] cursor-pointer flex items-center gap-3"
            >
              <span>Start Your Project</span>
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
            {['Free consultation', '5+ years experience', 'Real results, real clients', 'Chennai & worldwide'].map((tag) => (
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
