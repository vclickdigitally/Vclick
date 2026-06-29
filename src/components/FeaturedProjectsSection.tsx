import React from 'react';
import { motion } from 'motion/react';
import { FEATURED_PROJECTS } from '../data/mockData';
import { ProjectCase } from '../types';
import { ArrowUpRight, TrendingUp, Quote } from 'lucide-react';

interface FeaturedProjectsSectionProps {
  onExploreCase: (project: ProjectCase) => void;
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({
  onExploreCase,
}) => {
  return (
    <section id="projects" className="relative z-20 py-32 px-6 md:px-12 bg-[#0B0B0B] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1.5px] w-10 bg-[#DD183B]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
                Selected Showcases
              </span>
            </div>
            <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase font-display max-w-2xl">
              Monopolies Built For <span className="text-transparent text-stroke-white">Industry</span> Kings
            </h2>
          </div>
          <p className="text-[#8E8E8E] text-base sm:text-lg max-w-md leading-relaxed">
            We do not publish vanity metrics. Explore verified case studies of enterprise brands scaling tens of millions in new pipeline through our architectural systems.
          </p>
        </div>

        {/* Projects Stack */}
        <div className="flex flex-col gap-24">
          {FEATURED_PROJECTS.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-12 gap-8 lg:gap-16 items-center p-8 sm:p-12 rounded-3xl bg-[#111111]/70 border border-white/10 glass-card-hover relative overflow-hidden"
              >
                {/* Background Watermark */}
                <div className="absolute -right-10 -bottom-10 font-display font-black text-[180px] text-white/[0.02] select-none pointer-events-none">
                  {project.logoText}
                </div>

                {/* Info Column */}
                <div className={`col-span-12 lg:col-span-6 flex flex-col justify-between ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                      <span className="text-xs font-black uppercase tracking-widest text-[#DD183B] px-3 py-1 rounded bg-[#DD183B]/10 border border-[#DD183B]/20">
                        {project.industry}
                      </span>
                      {project.serviceTags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[11px] font-bold text-[#8E8E8E] px-2.5 py-1 rounded bg-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-3xl sm:text-5xl font-black tracking-tight font-display mb-6 text-white leading-[1.05]">
                      {project.heroHeadline}
                    </h3>
                    <p className="text-[#8E8E8E] text-lg leading-relaxed mb-8">
                      {project.summary}
                    </p>
                  </div>

                  {/* Client Quote */}
                  <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/5 mb-8 relative">
                    <Quote className="w-8 h-8 text-[#DD183B]/20 absolute top-4 right-4 pointer-events-none" />
                    <p className="text-sm text-white/90 italic leading-relaxed mb-3 font-sans">
                      "{project.clientQuote}"
                    </p>
                    <p className="text-xs font-bold text-[#DD183B] uppercase tracking-wider">
                      — {project.clientExecutive}
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() => onExploreCase(project)}
                      className="group flex items-center gap-3 bg-white text-[#0B0B0B] hover:bg-[#DD183B] hover:text-white px-8 py-4 text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-xl cursor-pointer"
                    >
                      <span>Explore Verified Case Study</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Metrics Visual Showcase Column */}
                <div className={`col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  {/* Big Number Card 1 */}
                  <div className="p-8 rounded-2xl bg-[#0B0B0B] border border-white/10 flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#DD183B]/10 rounded-full blur-xl group-hover:bg-[#DD183B]/30 transition-colors" />
                    <span className="text-[11px] uppercase tracking-widest text-[#8E8E8E] mb-2 font-semibold">Verified Impact</span>
                    <span className="text-5xl sm:text-6xl font-black tracking-tighter font-display text-white mb-2">
                      {project.roiStats.primaryNumber}
                    </span>
                    <span className="text-xs font-bold text-[#DD183B] uppercase tracking-wider">
                      {project.roiStats.primaryLabel}
                    </span>
                  </div>

                  {/* Big Number Card 2 */}
                  <div className="p-8 rounded-2xl bg-[#0B0B0B] border border-white/10 flex flex-col justify-center relative overflow-hidden group">
                    <span className="text-[11px] uppercase tracking-widest text-[#8E8E8E] mb-2 font-semibold">New Pipeline</span>
                    <span className="text-5xl sm:text-6xl font-black tracking-tighter font-display text-white mb-2">
                      {project.roiStats.secondaryNumber}
                    </span>
                    <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                      {project.roiStats.secondaryLabel}
                    </span>
                  </div>

                  {/* Before / After Comparison Banner (Full width of the 2 cols) */}
                  <div className="sm:col-span-2 p-6 rounded-2xl bg-gradient-to-r from-[#DD183B]/15 via-[#111111] to-[#111111] border border-[#DD183B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-[#DD183B]" />
                      <span className="text-xs font-bold uppercase tracking-widest text-white">
                        {project.beforeAfter.metricName}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 bg-[#0B0B0B] px-4 py-2.5 rounded-lg border border-white/10 font-mono text-xs">
                      <span className="text-[#8E8E8E] line-through">{project.beforeAfter.beforeMetric}</span>
                      <span className="text-[#DD183B]">→</span>
                      <span className="text-white font-bold">{project.beforeAfter.afterMetric}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
