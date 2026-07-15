"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ShieldCheck, Globe, Star, ArrowUpRight } from 'lucide-react';
import { useModals } from '@/providers/ModalProvider';

interface ServiceDetailProps {
  path: string;
}

export const ServiceDetailPage: React.FC<ServiceDetailProps> = ({ path }) => {
  const { openProject } = useModals();
  const onStartProject = () => openProject(20000, "FULL");
  // Determine service details based on URL pathname
  let title = 'Web Development';
  let tagline = 'High-Performance Web Design & Dev Sprints';
  let desc = 'We build high-converting, sub-second web flagships custom-tailored to rank on Google from day one.';
  let deliverables = ['Custom Responsive Development', '99+ PageSpeed Optimization', 'SEO-Friendly Semantic Markup', 'Conversion-Focused Layouts'];
  let metricValue = '99+ PageSpeed';
  let metricLabel = 'Edge Rendering';
  let color = '#DD183B';

  if (path.includes('/seo')) {
    title = 'Organic Growth (SEO)';
    tagline = 'Compounding Search Dominance & Technical SEO';
    desc = 'Compounding organic search visibility that captures transactional monopolies and drives qualified intent traffic.';
    deliverables = ['Technical SEO Audit & Fixes', 'Semantic Content Strategy', 'High-DR Digital PR Backlinks', 'Local & National SEO Campaigns'];
    metricValue = '4.2x Traffic';
    metricLabel = 'Compounding Growth';
    color = '#DD183B';
  } else if (path.includes('/meta-ads')) {
    title = 'Performance Marketing';
    tagline = 'Meta & Google Ads Campaign Management';
    desc = 'Paid advertising campaigns structured around customer intent, audience targeting, and CPA reductions.';
    deliverables = ['Meta Ads Strategy', 'Google Search & Shopping Ads', 'Audience Segmentation', 'Conversion Value Offline API'];
    metricValue = '5.4x ROAS';
    metricLabel = 'Verified Average';
    color = '#1877f2';
  } else if (path.includes('/branding-social-media')) {
    title = 'Branding & Social Presence';
    tagline = 'End-to-End Visual Identity & On-Brand Management';
    desc = 'Consistent, luxury branding and visual posts across Instagram, Facebook, and LinkedIn to build long-term authority.';
    deliverables = ['Brand Identity Design', 'Social Media Poster Creatives', 'Feed Management & Posting', 'Tone of Voice Guidelines'];
    metricValue = '4.8x Eng.';
    metricLabel = 'Engagement Lift';
    color = '#a855f7';
  }

  return (
    <div className="relative min-h-screen bg-[#0B0B0B] text-white font-sans selection:bg-[#DD183B] selection:text-white flex flex-col justify-between pt-24">
      {/* Background ambient spotlight */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#DD183B] rounded-full filter blur-[150px] opacity-10 pointer-events-none" />

      <main className="flex-1 max-w-4xl mx-auto px-6 md:px-12 py-16 w-full relative z-10">
        
        {/* Back navigation button */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#8E8E8E] hover:text-white mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Homepage</span>
        </Link>

        {/* Tagline eyebrow */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[1.5px] w-8 bg-[#DD183B]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
            SERVICE PROTOCOL // DETAILED
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-6 leading-none">
          {title}
        </h1>

        {/* Tagline */}
        <p className="text-xl font-bold font-sans text-white/90 mb-8">
          {tagline}
        </p>

        {/* Narrative Description */}
        <p className="text-[#8E8E8E] text-base sm:text-lg leading-relaxed font-sans mb-12">
          {desc}
        </p>

        {/* Metrics Badge Box */}
        <div className="grid grid-cols-2 gap-4 max-w-md mb-12">
          <div className="bg-[#111111] border border-white/15 p-6 rounded-2xl flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-wider text-[#8E8E8E] mb-1">{metricLabel}</span>
            <span className="text-3xl font-black font-display text-white">{metricValue}</span>
          </div>
          <div className="bg-[#111111] border border-white/15 p-6 rounded-2xl flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-wider text-[#8E8E8E] mb-1">Standard Guarantee</span>
            <span className="text-3xl font-black font-display text-[#DD183B]">100% Verified</span>
          </div>
        </div>

        {/* What We Deliver Checklist */}
        <div className="border-t border-white/10 pt-10 mb-12">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/90 mb-6 flex items-center gap-2">
            <span>What We Deliver</span>
            <span className="h-[1px] flex-1 bg-white/10" />
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {deliverables.map((item) => (
              <div 
                key={item} 
                className="flex items-start gap-3.5 p-4 rounded-xl bg-[#111111]/80 border border-white/15 hover:border-[#DD183B]/30 transition-colors"
              >
                <CheckCircle2 className="w-5 h-5 text-[#DD183B] shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-white/90 leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button Wrapper */}
        <div className="flex flex-col sm:flex-row items-center gap-6 border-t border-white/10 pt-10">
          <button
            onClick={onStartProject}
            className="group w-full sm:w-auto bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white px-10 py-5 font-black uppercase text-xs tracking-[0.25em] transition-all duration-300 rounded-xl shadow-[0_0_35px_rgba(221,24,59,0.3)] cursor-pointer flex items-center justify-center gap-3"
          >
            <span>Let's Talk Growth</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-8 py-5 font-bold uppercase text-xs tracking-[0.2em] rounded-xl transition-all duration-300 border border-white/10 flex items-center justify-center cursor-pointer"
          >
            Return to Homepage
          </Link>
        </div>

      </main>
    </div>
  );
};
