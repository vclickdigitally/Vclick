"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, HelpCircle } from 'lucide-react';
import { useToast } from '@/providers/ToastProvider';
import { CtaSection } from './CtaSection';

export const ContactPage: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'SEO Services',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const servicesList = [
    'SEO Services',
    'Website Development',
    'Performance Marketing',
    'Branding & Social Media',
    'General Inquiry'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please fill in all required fields (Name, Email, Message).", "error");
      return;
    }

    setIsSubmitting(true);
    // Simulate premium submit speed
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    showToast("Thank you! Your growth request has been submitted successfully. We will reach out within 24 hours.", "success");
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'SEO Services',
      message: ''
    });
    setIsSubmitting(false);
  };

  return (
    <div className="relative w-full bg-[#0B0B0B] text-white font-sans overflow-hidden">
      
      {/* Background soft gradients */}
      <div className="absolute top-[10%] right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-[#DD183B]/5 rounded-full filter blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full filter blur-[150px] pointer-events-none" />

      {/* ====================================================
          1. HERO SECTION
         ==================================================== */}
      <section className="relative pt-32 pb-12 md:pt-40 md:pb-16 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="border-b border-white/5 pb-12">
          {/* Tag */}
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[1.5px] w-10 bg-[#DD183B]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#DD183B]">
              INITIATE COMMUNICATIONS
            </span>
          </div>
          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase font-display text-white leading-[0.95] max-w-4xl">
            Let's Start Your <span className="text-[#DD183B]">Next Growth Chapter.</span>
          </h1>
        </div>
      </section>

      {/* ====================================================
          2. TWO-COLUMN LAYOUT: CONTACT DETAILS vs FORM
         ==================================================== */}
      <section className="py-12 md:py-16 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: INFO CARDS */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight font-display text-white mb-2">
              CONTACT INFORMATION
            </h2>
            <p className="text-[#8E8E8E] text-sm sm:text-base leading-relaxed mb-4 max-w-md">
              Have questions, a project blueprint, or want to discuss SEO/Performance scaling? Get in touch with our team directly.
            </p>

            {/* Cards Grid */}
            <div className="flex flex-col gap-4">
              
              {/* Phone Card */}
              <a 
                href="tel:+919944841707"
                className="bg-[#111111]/85 border border-white/10 p-5 rounded-2xl flex items-start gap-4 hover:border-[#DD183B]/30 transition-all group"
              >
                <div className="p-3 rounded-xl bg-[#DD183B]/10 border border-[#DD183B]/20 text-[#DD183B] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#8E8E8E] block mb-1">Direct Call</span>
                  <span className="text-base font-bold text-white group-hover:text-[#DD183B] transition-colors">+91 99448 41707</span>
                </div>
              </a>

              {/* Email Card */}
              <a 
                href="mailto:hello@vclickdigitally.com"
                className="bg-[#111111]/85 border border-white/10 p-5 rounded-2xl flex items-start gap-4 hover:border-[#DD183B]/30 transition-all group"
              >
                <div className="p-3 rounded-xl bg-[#DD183B]/10 border border-[#DD183B]/20 text-[#DD183B] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#8E8E8E] block mb-1">Electronic Mail</span>
                  <span className="text-base font-bold text-white group-hover:text-[#DD183B] transition-colors">hello@vclickdigitally.com</span>
                </div>
              </a>

              {/* Location Card */}
              <div className="bg-[#111111]/85 border border-white/10 p-5 rounded-2xl flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#DD183B]/10 border border-[#DD183B]/20 text-[#DD183B] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#8E8E8E] block mb-1">Global HQ Coordinates</span>
                  <span className="text-base font-bold text-white">Tamil Nadu, India</span>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-[#111111]/85 border border-white/10 p-5 rounded-2xl flex items-start gap-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white/50 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#8E8E8E] block mb-1">Operational Hours</span>
                  <div className="text-xs font-semibold text-white leading-relaxed mt-1">
                    <p>Monday - Saturday: 9:00 AM - 6:00 PM IST</p>
                    <p className="text-white/40 font-normal">Sunday: Closed</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <div className="lg:col-span-7 bg-[#111111]/60 border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#DD183B]/5 rounded-full blur-3xl pointer-events-none" />
            
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight font-display text-white mb-6">
              GROWTH INQUIRY PROTOCOL
            </h3>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E8E] font-sans">
                    Name <span className="text-[#DD183B]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#DD183B] focus:ring-1 focus:ring-[#DD183B] rounded-xl px-4 py-3 text-sm text-white transition-all font-sans placeholder-white/20 outline-none"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E8E] font-sans">
                    Email <span className="text-[#DD183B]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@company.com"
                    className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#DD183B] focus:ring-1 focus:ring-[#DD183B] rounded-xl px-4 py-3 text-sm text-white transition-all font-sans placeholder-white/20 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E8E] font-sans">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 99448 41707"
                    className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#DD183B] focus:ring-1 focus:ring-[#DD183B] rounded-xl px-4 py-3 text-sm text-white transition-all font-sans placeholder-white/20 outline-none"
                  />
                </div>

                {/* Company */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="company" className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E8E] font-sans">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Enterprise Corp"
                    className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#DD183B] focus:ring-1 focus:ring-[#DD183B] rounded-xl px-4 py-3 text-sm text-white transition-all font-sans placeholder-white/20 outline-none"
                  />
                </div>
              </div>

              {/* Service Required Dropdown */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="service" className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E8E] font-sans">
                  Service Required
                </label>
                <div className="relative">
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#DD183B] focus:ring-1 focus:ring-[#DD183B] rounded-xl px-4 py-3 text-sm text-white transition-all font-sans outline-none appearance-none cursor-pointer"
                  >
                    {servicesList.map((svc) => (
                      <option key={svc} value={svc} className="bg-[#0B0B0B] text-white py-2">
                        {svc}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                    ▼
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E8E] font-sans">
                  Message <span className="text-[#DD183B]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Outline your project scope, targets, and current bottlenecks..."
                  className="w-full bg-[#0B0B0B] border border-white/15 focus:border-[#DD183B] focus:ring-1 focus:ring-[#DD183B] rounded-xl px-4 py-3 text-sm text-white transition-all font-sans placeholder-white/20 outline-none resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white py-4.5 text-center font-black uppercase text-xs tracking-[0.25em] shadow-[0_0_25px_rgba(221,24,59,0.3)] hover:scale-[1.01] transition-all rounded-xl min-h-[48px] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <span>SUBMITTING DOSSIER...</span>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  </>
                ) : (
                  <>
                    <span>TRANSMIT REQUEST</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      </section>

      {/* ====================================================
          3. STYLIZED MAP PLACEHOLDER
         ==================================================== */}
      <section className="py-12 md:py-16 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#8E8E8E] mb-6 flex items-center gap-2">
          <span>HQ LOCATION BLUEPRINT</span>
          <span className="h-[1px] flex-1 bg-white/10" />
        </h3>

        {/* stylized premium map container */}
        <div className="relative w-full h-[400px] rounded-3xl bg-[#111111]/85 border border-white/10 overflow-hidden flex flex-col items-center justify-center text-center p-8 group">
          {/* Blueprint map grid pattern background */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none transition-transform duration-[10s] group-hover:scale-105"
            style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />
          
          {/* Soft central green/red spotlights */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#DD183B]/10 rounded-full blur-[80px] pointer-events-none" />

          {/* Styled Radar Ring */}
          <div className="relative z-10 w-24 h-24 rounded-full border border-[#DD183B]/20 flex items-center justify-center animate-pulse mb-6">
            <div className="w-16 h-16 rounded-full border border-[#DD183B]/30 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-[#DD183B]/10 border border-[#DD183B] flex items-center justify-center relative">
                {/* Pulse dot */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#DD183B]" />
                <div className="absolute inset-0 w-full h-full rounded-full bg-[#DD183B] animate-ping opacity-60" />
              </div>
            </div>
          </div>

          <div className="relative z-10 max-w-md">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#DD183B] block mb-2">VCLICK DIGITAL NODE</span>
            <h4 className="text-xl sm:text-2xl font-black uppercase font-display text-white mb-2">TAMIL NADU, INDIA</h4>
            <p className="text-[#8E8E8E] text-xs sm:text-sm leading-relaxed mb-6 font-sans">
              Our core design and optimization desk operates out of South India, coordinating campaigns and deployment pipelines globally.
            </p>
            <a 
              href="https://maps.google.com/?q=Tamil+Nadu,+India"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-[#DD183B] text-xs font-black uppercase tracking-wider transition-all hover:scale-105 cursor-pointer text-white"
            >
              <span>View On Google Maps</span>
              <MapPin className="w-3.5 h-3.5 text-[#DD183B]" />
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================
          4. CTA SECTION
         ==================================================== */}
      <CtaSection />

    </div>
  );
};
