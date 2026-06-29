import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBudget?: number;
  initialService?: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  initialBudget = 15000,
  initialService = 'FULL',
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    budget: initialBudget,
    service: initialService,
    timeline: 'Immediate (Next 14 Days)',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#0B0B0B]/90 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 30, stiffness: 400 }}
          className="relative w-full max-w-2xl rounded-3xl bg-[#111111] border border-white/15 p-8 sm:p-12 shadow-[0_0_80px_rgba(221,24,59,0.25)] z-10 overflow-hidden my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <div>
              <div className="flex items-center gap-2 mb-3 text-[#DD183B] text-xs font-bold uppercase tracking-widest font-mono">
                <Sparkles className="w-4 h-4" />
                <span>CONFIDENTIAL CLIENT PROTOCOL // STEP {step} OF 2</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight font-display text-white mb-3">
                Initiate <span className="text-[#DD183B]">Asymmetric</span> Growth
              </h3>
              <p className="text-[#8E8E8E] text-sm mb-8 leading-relaxed">
                Directly route your project specifications to our Senior Executive Architects in London & NYC. No sales SDRs.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E] mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Marcus Vance"
                          className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#DD183B] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E] mb-2">
                          Executive Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="marcus@company.com"
                          className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#DD183B] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E] mb-2">
                          Company / Brand Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Aether Quantum"
                          className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#DD183B] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E] mb-2">
                          Current Website URL
                        </label>
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          placeholder="https://company.com"
                          className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#DD183B] transition-colors"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (formData.name && formData.email && formData.company) setStep(2);
                      }}
                      className="w-full mt-4 bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      <span>Continue To Protocol Budgeting</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-6">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E] mb-3">
                        Target Growth Service Engine
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {['FULL', 'SEO', 'PPC', 'DEV'].map((srv) => (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => setFormData({ ...formData, service: srv })}
                            className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                              formData.service === srv
                                ? 'bg-[#DD183B] text-white border border-[#DD183B]'
                                : 'bg-[#0B0B0B] text-[#8E8E8E] border border-white/10 hover:text-white'
                            }`}
                          >
                            {srv === 'FULL' ? 'Full-Stack' : srv === 'DEV' ? 'Web Flagship' : srv}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E]">
                          Monthly Marketing Allocation
                        </label>
                        <span className="text-base font-black font-display text-[#DD183B]">
                          ${formData.budget.toLocaleString()} / mo
                        </span>
                      </div>
                      <input
                        type="range"
                        min={5000}
                        max={100000}
                        step={5000}
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                        className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#DD183B]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8E8E8E] mb-2">
                        Desired Launch Timeline
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full bg-[#0B0B0B] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#DD183B]"
                      >
                        <option>Immediate (Next 14 Days)</option>
                        <option>Current Quarter (Next 30–60 Days)</option>
                        <option>Strategic Exploration (Q4 / Next Year)</option>
                      </select>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold uppercase text-white tracking-wider transition-colors cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(221,24,59,0.5)] cursor-pointer"
                      >
                        Lock In Onboarding Slot
                      </button>
                    </div>
                  </motion.div>
                )}
              </form>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <div className="w-16 h-16 bg-[#DD183B]/10 border border-[#DD183B] rounded-full flex items-center justify-center mx-auto mb-6 text-[#DD183B] shadow-[0_0_30px_rgba(221,24,59,0.5)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-3xl font-black uppercase font-display text-white mb-2">
                Protocol Registered.
              </h3>
              <p className="text-[#8E8E8E] text-base max-w-md mx-auto mb-8 leading-relaxed">
                Thank you, <span className="text-white font-bold">{formData.name}</span>. A Senior Managing Director has received your specifications for <span className="text-white font-bold">{formData.company}</span> and will reach out within 4 hours.
              </p>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-[#DD183B] mb-8 inline-flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>NDA & CLIENT ENCRYPTION ACTIVE</span>
              </div>

              <div>
                <button
                  onClick={onClose}
                  className="bg-white text-[#0B0B0B] hover:bg-[#DD183B] hover:text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  Return To Experience
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
