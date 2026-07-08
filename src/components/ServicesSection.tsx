import React from 'react';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem } from '../types';
import { Globe, TrendingUp, Target, Smartphone, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  
  // Icon Mapping Helper
  const getIcon = (id: string) => {
    switch (id) {
      case 'web-development':
        return <Globe className="w-5 h-5 text-[#DD183B]" />;
      case 'organic-growth':
        return <TrendingUp className="w-5 h-5 text-[#DD183B]" />;
      case 'performance-marketing':
        return <Target className="w-5 h-5 text-[#DD183B]" />;
      case 'social-presence':
        return <Smartphone className="w-5 h-5 text-[#DD183B]" />;
      default:
        return <Globe className="w-5 h-5 text-[#DD183B]" />;
    }
  };

  return (
    <section id="services" className="relative z-20 pt-10 pb-16 md:pt-14 md:pb-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      
      {/* ====================================================
          SECTION HEADER (WHAT WE DO)
         ==================================================== */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
        <div>
          {/* Section Tag */}
          <div className="flex items-center gap-3 mb-4">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B] font-sans">
              WHAT WE DO
            </span>
          </div>
          {/* Monumental Headline */}
          <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase font-display text-white max-w-2xl leading-none">
            Four Services.<br />
            One <span className="text-[#DD183B]">Obsession.</span>
          </h2>
        </div>
        {/* Paragraph Text */}
        <p className="text-[#8E8E8E] text-base sm:text-lg max-w-md leading-relaxed font-sans lg:mb-2">
          We do fewer things, obsessively well. Every service built to deliver measurable business outcomes — not vanity metrics.
        </p>
      </div>

      {/* ====================================================
          CORE SERVICES GRID (2x2 Layout)
         ==================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {SERVICES_DATA.map((service, index) => {
          const formattedNumber = `0${index + 1}`;
          
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
              data-interactive="true"
              className="group relative bg-[#111111]/80 backdrop-blur-xl border border-white/15 hover:border-[#DD183B]/40 p-8 rounded-2xl shadow-2xl transition-all duration-400 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[380px]"
            >
              {/* Full Card Cover Link for SEO and Routing */}
              <a
                href={
                  service.id === 'web-development' ? '/services/website-development' :
                  service.id === 'organic-growth' ? '/services/seo' :
                  service.id === 'performance-marketing' ? '/services/meta-ads' :
                  '/services/branding-social-media'
                }
                className="absolute inset-0 z-20"
                aria-label={`Explore ${service.title}`}
              />

              {/* Subtle Glowing Background Accent on Hover */}
              <div className="absolute inset-0 bg-[#DD183B]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Watermark Service Number */}
              <div className="absolute top-6 right-8 font-display font-black text-8xl text-white/[0.03] group-hover:text-[#DD183B]/5 transition-colors select-none pointer-events-none">
                {formattedNumber}
              </div>

              {/* Card Header: Icon Box */}
              <div className="mb-8">
                <div className="w-11 h-11 rounded-xl bg-[#DD183B]/10 border border-[#DD183B]/20 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(221,24,59,0.1)]">
                  {getIcon(service.id)}
                </div>

                {/* Service Title */}
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight font-display text-white mb-4 uppercase">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-[#8E8E8E] text-sm sm:text-base leading-relaxed mb-6 font-sans">
                  {service.description}
                </p>
              </div>

              {/* Card Footer: Tag Badges & Action */}
              <div>
                {/* Tech & Capabilities Pill Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.keyDeliverables.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 text-[10px] sm:text-[11px] font-medium tracking-wide text-white/80 bg-white/5 border border-white/10 rounded-full font-sans group-hover:border-white/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA Explore Service */}
                <div className="flex items-center gap-1.5 text-[#DD183B] font-bold text-xs uppercase tracking-widest font-sans border-t border-white/5 pt-4 mt-2">
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
};
