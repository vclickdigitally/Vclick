import React from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Code2, TrendingUp, Layers } from 'lucide-react';

interface ExploreServicesProps {
  currentService: 'seo' | 'website-development' | 'performance-marketing' | 'branding-social-media';
}

const ALL_EXPLORE_SERVICES = [
  {
    id: 'seo',
    title: 'SEO Services',
    desc: 'Compounding organic search traffic that drives high-intent leads and builds sustainable search dominance.',
    href: '/services/seo',
    icon: <Search className="w-5 h-5" />,
  },
  {
    id: 'website-development',
    title: 'Website Development',
    desc: 'Sub-second edge rendered web flagships designed to build trust and rank on Google from day one.',
    href: '/services/website-development',
    icon: <Code2 className="w-5 h-5" />,
  },
  {
    id: 'performance-marketing',
    title: 'Performance Marketing',
    desc: 'Conversion-focused PPC ads (Meta, Google & LinkedIn) optimized to double qualified lead acquisition.',
    href: '/services/performance-marketing',
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    id: 'branding-social-media',
    title: 'Branding & Social Media',
    desc: 'Luxury brand identities, custom creative design, and strategic content pipelines to capture authority.',
    href: '/services/branding-social-media',
    icon: <Layers className="w-5 h-5" />,
  },
];

export const ExploreServices: React.FC<ExploreServicesProps> = ({ currentService }) => {
  const filtered = ALL_EXPLORE_SERVICES.filter(s => s.id !== currentService);

  return (
    <section className="relative z-10 border-t border-white/5 bg-[#0B0B0B] py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 mb-5">
          <span className="h-[1.5px] w-10 bg-[#DD183B]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">EXPLORE MORE</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase font-display text-white mb-12 max-w-2xl leading-none">
          Explore Other <span className="text-[#DD183B]">Services.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((svc) => (
            <Link
              key={svc.id}
              href={svc.href}
              className="group bg-[#111111] border border-white/10 hover:border-[#DD183B]/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 transition-all duration-300 hover:bg-[#111111]/90"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-[#DD183B]/10 flex items-center justify-center text-[#DD183B] group-hover:bg-[#DD183B]/20 transition-colors">
                  {svc.icon}
                </div>
                <h3 className="text-lg font-black text-white font-display uppercase tracking-tight leading-tight group-hover:text-[#DD183B] transition-colors">{svc.title}</h3>
                <p className="text-xs text-[#8E8E8E] leading-relaxed font-sans">{svc.desc}</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
