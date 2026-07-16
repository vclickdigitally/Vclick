"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Target, Eye, Users, Cpu, Activity, Award } from 'lucide-react';
import { CtaSection } from './CtaSection';

export const AboutPage: React.FC = () => {
  const coreValues = [
    {
      icon: <Target className="w-5 h-5 text-[#DD183B]" />,
      title: 'Strategy Before Execution',
      description: 'We do not execute blindly. Every design decision, line of code, and ad placement starts with analyzing your metrics and defining a clear path to growth.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#DD183B]" />,
      title: 'Transparent Partnerships',
      description: 'We believe in full visibility. You get direct access to our live dashboards, direct slack communications, and honest weekly growth reporting.'
    },
    {
      icon: <Users className="w-5 h-5 text-[#DD183B]" />,
      title: 'Built Around Your Business',
      description: 'No generic packages or templates. We construct custom digital engines specifically designed for your unique product, market position, and scaling requirements.'
    },
    {
      icon: <Award className="w-5 h-5 text-[#DD183B]" />,
      title: 'Obsession with ROI',
      description: 'We focus on transactional metrics. Our work is measured in pipeline volume, search conversion percentages, and compounding customer acquisitions.'
    }
  ];

  const processSteps = [
    {
      num: '01',
      title: 'Audit & Discovery',
      description: 'We audit your active search positions, ad histories, tracking tags, and competitor strategies to locate leaks.'
    },
    {
      num: '02',
      title: 'Strategy Mapping',
      description: 'We design custom keyword maps, custom ad audience segmentation, and structural interface blueprints.'
    },
    {
      num: '03',
      title: 'Precision Sprints',
      description: 'Our team builds high-converting, sub-second web flagships, sets up GA4 event maps, and launches campaigns.'
    },
    {
      num: '04',
      title: 'Scale & Optimize',
      description: 'We continuously A/B test ad copy, audit search queries, and scale budgets based on real pipeline value.'
    }
  ];

  const industries = [
    'E-Commerce & Retail',
    'B2B SaaS & Technology',
    'Professional Services',
    'Real Estate & Developers',
    'Healthcare & Wellness',
    'Education & Academies'
  ];

  return (
    <div className="relative w-full bg-[#0B0B0B] text-white font-sans overflow-hidden">
      
      {/* Mesh Background Spotlights */}
      <div className="absolute top-[10%] left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-[#DD183B]/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute top-[50%] right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full filter blur-[150px] pointer-events-none" />

      {/* ====================================================
          1. HERO SECTION
         ==================================================== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 border-b border-white/5 pb-16">
          <div className="max-w-3xl">
            {/* Section Tag */}
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1.5px] w-10 bg-[#DD183B]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
                ABOUT VCLICK DIGITALLY
              </span>
            </div>
            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase font-display text-white leading-[0.95] mb-8">
              We Engineer Compounding<br />
              Digital Growth for <span className="text-[#DD183B]">Modern Brands.</span>
            </h1>
          </div>
          <div className="max-w-md">
            <p className="text-[#8E8E8E] text-base sm:text-lg leading-relaxed mb-6 font-sans">
              VClick Digitally is a premium digital marketing and web development agency. We build performance-driven web products and manage paid campaigns designed exclusively to generate qualified intent pipeline.
            </p>
            <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-[#DD183B]">
              <span>STRATEGY</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#DD183B]" />
              <span>DESIGN</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#DD183B]" />
              <span>PERFORMANCE</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          2. OUR STORY
         ==================================================== */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase font-display text-white mb-6">
              OUR <span className="text-[#DD183B]">STORY.</span>
            </h2>
            <div className="flex flex-col gap-6 text-[#8E8E8E] text-sm sm:text-base leading-relaxed font-sans max-w-xl">
              <p className="text-white font-semibold text-base sm:text-lg">
                VClick Digitally was founded to eliminate standard agency inefficiencies. We rejected recycled templates, opaque retainers, and vanity metrics in favor of transparent, execution-focused collaboration.
              </p>
              <p>
                We recognize that modern growth requires a unified approach. Beautiful web interfaces are useless without search visibility, and search position increases fail to scale unless the design is built to convert.
              </p>
              <p>
                By blending high-speed technical frameworks with organic SEO positioning and high-ROAS paid campaign architecture, we construct single-system growth loops. We partner with ambitious brands to become an extension of their team—focused purely on generating pipeline.
              </p>
            </div>
          </div>

          {/* Stats Box Right */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 lg:pl-12 w-full">
            {[
              { label: 'AVERAGE TRAFFIC MULTIPLIER', val: '4.2x' },
              { label: 'SEARCH TRANSACTIONS RANKED', val: '500+' },
              { label: 'PAID ADS ROAS DEPLOYED', val: '5.4x+' },
              { label: 'PAGE SPEED SCORE MINIMUM', val: '99+' }
            ].map((stat) => (
              <div 
                key={stat.label} 
                className="bg-[#111111]/80 border border-white/10 p-6 rounded-2xl flex flex-col justify-center min-h-[140px]"
              >
                <span className="text-3xl sm:text-4xl font-black font-display text-[#DD183B] mb-2">{stat.val}</span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#8E8E8E] leading-snug">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          3. MISSION & VISION
         ==================================================== */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#111111]/45 border-t border-b border-white/5 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#111111]/90 border border-white/10 p-8 rounded-2xl flex flex-col gap-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#DD183B]/5 rounded-full blur-2xl pointer-events-none" />
            <div className="w-12 h-12 rounded-xl bg-[#DD183B]/10 border border-[#DD183B]/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-[#DD183B]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-display text-white mb-3">
                OUR MISSION
              </h3>
              <p className="text-[#8E8E8E] text-sm sm:text-base leading-relaxed font-sans">
                To transform organic search positioning and web application speeds into predictable growth funnels, empowering businesses to dominate their transactional markets with transparent, data-centric digital systems.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#111111]/90 border border-white/10 p-8 rounded-2xl flex flex-col gap-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Eye className="w-6 h-6 text-[#DD183B]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-display text-white mb-3">
                OUR VISION
              </h3>
              <p className="text-[#8E8E8E] text-sm sm:text-base leading-relaxed font-sans">
                To become the global gold standard for performance marketing and React development integrations, proving that design-centric agency frameworks can deliver compounding enterprise values without the fluff.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================
          4. CORE VALUES
         ==================================================== */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="h-[1.5px] w-6 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
              GUIDING PRINCIPLES
            </span>
            <span className="h-[1.5px] w-6 bg-[#DD183B]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase font-display text-white leading-none">
            OUR CORE <span className="text-[#DD183B]">VALUES.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {coreValues.map((value, idx) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#111111]/85 border border-white/10 p-6 rounded-2xl shadow-xl flex items-start gap-4 hover:border-[#DD183B]/30 transition-colors duration-300"
            >
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 shrink-0">
                {value.icon}
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-black uppercase font-display text-white mb-2 tracking-wide">
                  {value.title}
                </h3>
                <p className="text-[#8E8E8E] text-xs sm:text-sm leading-relaxed font-sans">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ====================================================
          5. OUR PROCESS
         ==================================================== */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#111111]/45 border-t border-b border-white/5 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-[1.5px] w-10 bg-[#DD183B]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
                  OPERATIONAL BLUEPRINT
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white max-w-xl leading-none">
                OUR SURGICAL <span className="text-[#DD183B]">PROCESS.</span>
              </h2>
            </div>
            <p className="text-[#8E8E8E] text-base sm:text-lg max-w-sm leading-relaxed font-sans">
              We execute in disciplined, milestone-driven sprints designed to deliver immediate visual value and technical progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative bg-[#111111]/85 border border-white/10 hover:border-[#DD183B]/30 p-6 rounded-2xl shadow-xl transition-all duration-400 min-h-[220px] flex flex-col justify-between"
              >
                <span className="text-3xl font-black font-display text-white/10 group-hover:text-[#DD183B] transition-colors duration-300 mb-6">{step.num}</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black uppercase font-display text-white mb-2 group-hover:text-[#DD183B] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-[#8E8E8E] text-xs sm:text-sm leading-relaxed font-sans">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          6. INDUSTRIES & APPROACH
         ==================================================== */}
      <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Industries We Serve */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1.5px] w-6 bg-[#DD183B]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
                VERTICAL SPECIALIZATION
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase font-display text-white leading-none mb-8">
              INDUSTRIES <br />WE SERVE.
            </h2>
            <div className="flex flex-wrap gap-2.5 max-w-md">
              {industries.map((ind) => (
                <div 
                  key={ind} 
                  className="px-4 py-2.5 rounded-full bg-white/[0.02] border border-white/5 text-xs sm:text-sm font-semibold text-white/80 font-sans tracking-wide hover:border-[#DD183B]/20 hover:bg-white/[0.04] transition-all"
                >
                  {ind}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Our Approach */}
          <div className="lg:col-span-7 lg:pl-12 flex flex-col justify-start">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1.5px] w-6 bg-[#DD183B]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
                THE VCLICK DIFFERENCE
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase font-display text-white leading-none mb-8">
              OUR APPROACH.
            </h2>
            
            <div className="flex flex-col gap-6 text-[#8E8E8E] text-sm sm:text-base leading-relaxed font-sans max-w-xl">
              <div className="flex gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#DD183B] shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-base uppercase tracking-tight font-display mb-1">Performance-Driven Codebases</h4>
                  <p className="text-xs sm:text-sm">We use headless Next.js frameworks coupled with edge rendering infrastructures. Sub-second performance ensures that visitors convert rather than bouncing.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#DD183B] shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-base uppercase tracking-tight font-display mb-1">Intention-Led SEO Mapping</h4>
                  <p className="text-xs sm:text-sm">We ignore bulk volumes in favor of transaction-ready search intent. We position your services in front of decision makers ready to buy.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <CheckCircle2 className="w-5 h-5 text-[#DD183B] shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-base uppercase tracking-tight font-display mb-1">Conversion-Engineered Creatives</h4>
                  <p className="text-xs sm:text-sm">Our creative designs match luxury digital design codes. We command presence on visual social feeds to translate brand visibility into active inquiries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================
          7. CTA SECTION
         ==================================================== */}
      <CtaSection />

    </div>
  );
};
