"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Briefcase, Building, ShieldCheck, ChevronRight, Search, Code, Target, BarChart2, Users, Mail, BookOpen, Scale, HelpCircle } from 'lucide-react';
import { Breadcrumb } from './shared/LegalComponents';
import { CtaSection } from './CtaSection';

interface SitemapLink {
  label: string;
  href: string;
  external?: boolean;
  subIcon?: React.ReactNode;
}

interface SitemapCategory {
  title: string;
  icon: React.ReactNode;
  desc: string;
  links: SitemapLink[];
}

export const SitemapPage: React.FC = () => {
  const categories: SitemapCategory[] = [
    {
      title: 'Home',
      icon: <Home className="w-5 h-5 text-[#DD183B]" />,
      desc: 'The centralized gateway to VClick Digitally services, selected works, and workflow details.',
      links: [
        { label: 'Homepage / Core Portal', href: '/' }
      ]
    },
    {
      title: 'Services & Sprints',
      icon: <Briefcase className="w-5 h-5 text-[#DD183B]" />,
      desc: 'Our specialized digital marketing capabilities built to drive transactional pipeline.',
      links: [
        { label: 'Search Engine Optimization (SEO)', href: '/services/seo', subIcon: <Search className="w-3.5 h-3.5" /> },
        { label: 'Website Design & Development Sprints', href: '/services/website-development', subIcon: <Code className="w-3.5 h-3.5" /> },
        { label: 'Performance Marketing (Paid Acquisition)', href: '/services/performance-marketing', subIcon: <BarChart2 className="w-3.5 h-3.5" /> },
        { label: 'Branding & Social Feed Presence', href: '/services/branding-social-media', subIcon: <Target className="w-3.5 h-3.5" /> }
      ]
    },
    {
      title: 'Company Directory',
      icon: <Building className="w-5 h-5 text-[#DD183B]" />,
      desc: 'Learn about our core strategic mission, operations nodes, and insights desk.',
      links: [
        { label: 'About Our Strategy & Team', href: '/about', subIcon: <Users className="w-3.5 h-3.5" /> },
        { label: 'Contact Service Desk & Inquiries', href: '/contact', subIcon: <Mail className="w-3.5 h-3.5" /> },
        { label: 'Insights & Strategy Blog', href: 'https://vclickdigitally.com/blog', subIcon: <BookOpen className="w-3.5 h-3.5" />, external: true }
      ]
    },
    {
      title: 'Legal & Compliance',
      icon: <ShieldCheck className="w-5 h-5 text-[#DD183B]" />,
      desc: 'Transparency protocols, operational frameworks, terms, and frequently answered inquiries.',
      links: [
        { label: 'Privacy Policy & Cookies', href: '/privacy-policy', subIcon: <ShieldCheck className="w-3.5 h-3.5" /> },
        { label: 'Terms & Conditions of Service', href: '/terms-and-conditions', subIcon: <Scale className="w-3.5 h-3.5" /> },
        { label: 'Frequently Asked Questions (FAQ)', href: '/#faq', subIcon: <HelpCircle className="w-3.5 h-3.5" /> }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative w-full bg-[#0B0B0B] text-white font-sans overflow-hidden">
      
      {/* Mesh Background Spotlights */}
      <div className="absolute top-[10%] left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-[#DD183B]/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full filter blur-[150px] pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-32 w-full relative z-10">
        
        {/* Breadcrumbs */}
        <Breadcrumb items={[{ label: 'Sitemap' }]} />

        {/* Header */}
        <div className="border-b border-white/5 pb-12 mb-16 relative">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-4 leading-none">
            Visual Sitemap
          </h1>
          <p className="text-lg sm:text-xl font-bold font-sans text-white/70 max-w-2xl">
            A comprehensive, visual directory of VClick Digitally's web assets, service routes, and compliance systems.
          </p>
        </div>

        {/* Sitemap Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-16"
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.title}
              variants={itemVariants}
              className="group relative bg-[#111111]/85 backdrop-blur-xl border border-white/10 hover:border-[#DD183B]/30 p-8 rounded-3xl shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Glow overlay */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#DD183B]/[0.01] rounded-full blur-2xl pointer-events-none" />

              <div>
                {/* Header Icon + Title */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-[#DD183B] shrink-0 group-hover:bg-[#DD183B]/10 transition-colors">
                    {cat.icon}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black uppercase font-display tracking-wide text-white group-hover:text-[#DD183B] transition-colors">
                    {cat.title}
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-[#8E8E8E] leading-relaxed mb-6 font-sans">
                  {cat.desc}
                </p>

                {/* Links list */}
                <div className="flex flex-col gap-3 font-sans">
                  {cat.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="group/item flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 text-white/90 hover:text-white transition-all hover:scale-[1.01]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[#DD183B] opacity-60 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all">
                          {link.subIcon || <ChevronRight className="w-4 h-4" />}
                        </span>
                        <span className="text-xs sm:text-sm font-bold tracking-wide uppercase">{link.label}</span>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-[#DD183B] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all" />
                    </Link>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>

      </main>

      {/* Reusable CTA */}
      <CtaSection />

    </div>
  );
};
