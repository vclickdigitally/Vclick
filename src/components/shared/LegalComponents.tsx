"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/40 font-sans mb-8">
      <Link href="/" className="hover:text-[#DD183B] transition-colors">
        Home
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 text-white/20" />
          {item.href ? (
            <Link href={item.href} className="hover:text-[#DD183B] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-white/85">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

interface LegalHeroProps {
  title: string;
  tagline: string;
  lastUpdated: string;
  breadcrumbItems: { label: string }[];
}

export const LegalHero: React.FC<LegalHeroProps> = ({ title, tagline, lastUpdated, breadcrumbItems }) => {
  return (
    <div className="relative border-b border-white/5 pb-12 mb-16">
      {/* Spotlight Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#DD183B]/5 rounded-full filter blur-[120px] pointer-events-none" />
      
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-10">
        <div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-4 leading-none">
            {title}
          </h1>
          <p className="text-lg sm:text-xl font-bold font-sans text-white/70">
            {tagline}
          </p>
        </div>
        <div className="shrink-0">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-wider text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DD183B] animate-pulse" />
            Last Updated: {lastUpdated}
          </span>
        </div>
      </div>
    </div>
  );
};

interface PolicyCardProps {
  id: string;
  num: string;
  title: string;
  children: React.ReactNode;
}

export const PolicyCard: React.FC<PolicyCardProps> = ({ id, num, title, children }) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group relative bg-[#111111]/85 backdrop-blur-xl border border-white/10 hover:border-[#DD183B]/30 p-8 rounded-2xl shadow-xl transition-colors duration-300 flex flex-col gap-4 scroll-mt-24"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#DD183B]/[0.01] rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-center gap-4">
        <span className="text-sm font-black font-display text-[#DD183B] bg-[#DD183B]/5 border border-[#DD183B]/20 w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
          {num}
        </span>
        <h2 className="text-xl sm:text-2xl font-black uppercase font-display text-white group-hover:text-[#DD183B] transition-colors duration-300 tracking-wide">
          {title}
        </h2>
      </div>
      <div className="text-[#8E8E8E] text-sm sm:text-base leading-relaxed font-sans flex flex-col gap-4 pl-0 sm:pl-12">
        {children}
      </div>
    </motion.div>
  );
};

export const CompanyInfoCard: React.FC = () => {
  return (
    <div className="bg-[#111111]/90 border border-white/10 p-6 rounded-2xl shadow-2xl flex flex-col gap-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-20 h-20 bg-[#DD183B]/5 rounded-full blur-xl pointer-events-none" />
      <div>
        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-[#DD183B] mb-2 font-display">
          VCLICK DIGITALLY NODE
        </h3>
        <p className="text-xs text-white/50 leading-relaxed font-sans">
          All compliance inquiries and official communications should be directed to our operational desk.
        </p>
      </div>

      <div className="flex flex-col gap-3 text-xs font-semibold text-white/80 font-sans">
        <a href="tel:+919944841707" className="flex items-center gap-2.5 hover:text-[#DD183B] transition-colors">
          <Phone className="w-4 h-4 text-[#DD183B]" />
          <span>+91 99448 41707</span>
        </a>
        <a href="mailto:hello@vclickdigitally.com" className="flex items-center gap-2.5 hover:text-[#DD183B] transition-colors">
          <Mail className="w-4 h-4 text-[#DD183B]" />
          <span>hello@vclickdigitally.com</span>
        </a>
        <div className="flex items-center gap-2.5 text-white/60">
          <MapPin className="w-4 h-4 text-[#DD183B] shrink-0" />
          <span>Tamil Nadu, India</span>
        </div>
      </div>
    </div>
  );
};
