"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, CheckCircle2, ArrowRight, BarChart2, ShieldAlert } from 'lucide-react';
import { ProjectCase } from '../types';
import { useModals } from '@/providers/ModalProvider';

export const CaseStudyModal: React.FC = () => {
  const { selectedCase: project, closeCase: onClose, openProject } = useModals();
  const isOpen = project !== null;
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B0B0B]/90 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 30 }}
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          className="relative w-full max-w-4xl rounded-3xl bg-[#111111] border border-white/20 p-8 sm:p-12 shadow-[0_0_90px_rgba(221,24,59,0.25)] z-10 overflow-hidden my-8"
        >
          {/* Watermark */}
          <div className="absolute -right-12 -bottom-12 font-display font-black text-[220px] text-white/[0.02] select-none pointer-events-none">
            {project.logoText}
          </div>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Briefing */}
          <div className="mb-8 border-b border-white/10 pb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono font-bold text-[#DD183B] uppercase tracking-widest bg-[#DD183B]/10 px-3 py-1 rounded">
                AUDITED CASE BRIEFING // {project.industry}
              </span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight font-display text-white mb-4 leading-tight">
              {project.heroHeadline}
            </h3>
            <p className="text-[#8E8E8E] text-base sm:text-lg leading-relaxed max-w-3xl">
              {project.summary}
            </p>
          </div>

          {/* Big Verified Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="p-6 rounded-2xl bg-[#0B0B0B] border border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-[#8E8E8E] block mb-1">Audited Return</span>
              <span className="text-4xl sm:text-5xl font-black font-display text-white block">
                {project.roiStats.primaryNumber}
              </span>
              <span className="text-xs text-[#DD183B] font-bold uppercase mt-1 block">
                {project.roiStats.primaryLabel}
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B0B0B] border border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-[#8E8E8E] block mb-1">Generated Value</span>
              <span className="text-4xl sm:text-5xl font-black font-display text-white block">
                {project.roiStats.secondaryNumber}
              </span>
              <span className="text-xs text-white/80 font-bold uppercase mt-1 block">
                {project.roiStats.secondaryLabel}
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-[#DD183B]/10 border border-[#DD183B]/30 flex flex-col justify-center">
              <div className="flex items-center gap-2 text-[#DD183B] text-xs font-bold uppercase mb-2">
                <TrendingUp className="w-4 h-4" />
                <span>{project.beforeAfter.metricName}</span>
              </div>
              <div className="font-mono text-sm font-bold text-white">
                <span className="text-[#8E8E8E] line-through mr-2">{project.beforeAfter.beforeMetric}</span>
                <span className="text-[#DD183B] mr-2">→</span>
                <span>{project.beforeAfter.afterMetric}</span>
              </div>
            </div>
          </div>

          {/* Execution Breakdown & Quote */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-[#DD183B]" />
                <span>Strategic Protocol Deployed</span>
              </h4>
              <ul className="flex flex-col gap-3">
                {project.serviceTags.map((tag, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs text-white/90 bg-white/[0.03] p-3 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-[#DD183B] shrink-0" />
                    <span className="font-semibold uppercase tracking-wider">{tag} Deployment Sprint</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[#0B0B0B] border border-white/5 flex flex-col justify-between">
              <p className="text-sm italic text-white/90 leading-relaxed font-sans mb-4">
                "{project.clientQuote}"
              </p>
              <div className="text-xs font-bold text-[#DD183B] uppercase tracking-widest border-t border-white/5 pt-4">
                {project.clientExecutive} // <span className="text-white/60">{project.clientName}</span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8E8E8E]">
              <ShieldAlert className="w-4 h-4 text-[#DD183B]" />
              <span>FULL FORENSIC LEDGER AVAILABLE ONSITE UNDER NDA</span>
            </div>

            <button
              onClick={() => {
                onClose();
                openProject(20000, "FULL");
              }}
              className="w-full sm:w-auto bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white py-4 px-8 rounded-xl font-black uppercase text-xs tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(221,24,59,0.4)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Build Similar {project.industry} Monopoly</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
