"use client";

import React, { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { FAQ_LIST } from '../data/mockData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_LIST[0].id);

  return (
    <section id="faq" className="relative z-20 py-16 md:py-24 px-6 md:px-12 bg-[#0B0B0B] border-t border-white/5 max-w-5xl mx-auto">
      <div className="text-center mb-20">
        <div className="flex items-center justify-center gap-2 mb-4">
          <HelpCircle className="w-4 h-4 text-[#DD183B]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
            FREQUENTLY ASKED QUESTIONS
          </span>
        </div>
        <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase font-display text-white mb-6">
          Answers to <span className="text-[#DD183B]">Questions</span> That Matter.
        </h2>
        <p className="text-[#8E8E8E] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Have questions about working with VClick Digitally? Here are answers to some of the most common questions businesses ask before starting a project.
        </p>
      </div>

      {/* Accordion */}
      <div className="flex flex-col gap-4">
        {FAQ_LIST.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'bg-[#111111] border-[#DD183B]/60 shadow-[0_10px_30px_-15px_rgba(221,24,59,0.3)]'
                  : 'bg-white/[0.02] border-white/5 hover:border-white/15'
              }`}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left gap-6 cursor-pointer"
              >
                <span className="text-lg sm:text-xl font-bold font-sans text-white tracking-tight">
                  {faq.question}
                </span>
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
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-6 pb-8 sm:px-8 pt-0 text-[#8E8E8E] text-base leading-relaxed border-t border-white/5 mt-2 pt-6">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
