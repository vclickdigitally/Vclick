"use client";

import React from 'react';
import { LegalHero, PolicyCard, CompanyInfoCard } from './shared/LegalComponents';
import { CtaSection } from './CtaSection';

export const TermsPage: React.FC = () => {
  const sections = [
    { id: 'acceptance', label: '1. Acceptance of Terms' },
    { id: 'services', label: '2. Scope of Services' },
    { id: 'responsibilities', label: '3. Client Responsibilities' },
    { id: 'timelines', label: '4. Project Timelines' },
    { id: 'payments', label: '5. Payments & Billing' },
    { id: 'revisions', label: '6. Revisions Policy' },
    { id: 'ownership', label: '7. IP Ownership' },
    { id: 'confidentiality', label: '8. Confidentiality' },
    { id: 'liability', label: '9. Limitation of Liability' },
    { id: 'cancellation', label: '10. Cancellation & Holds' },
    { id: 'refund', label: '11. Refund Policy' },
    { id: 'governing', label: '12. Governing Law' },
    { id: 'contact', label: '13. Contact Info' }
  ];

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full bg-[#0B0B0B] text-white font-sans overflow-hidden">
      
      {/* Background Soft Gradients */}
      <div className="absolute top-[15%] right-1/4 translate-x-1/2 w-[500px] h-[500px] bg-[#DD183B]/5 rounded-full filter blur-[150px] pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-32 w-full relative z-10">
        
        {/* Reusable Legal Hero */}
        <LegalHero 
          title="Terms & Conditions"
          tagline="Legal Framework, Operations Protocol, and Mutual Obligations."
          lastUpdated="July 16, 2026"
          breadcrumbItems={[{ label: 'Terms & Conditions' }]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: STICKY NAV & INFO CARD */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-8">
            <div className="bg-[#111111]/80 border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#DD183B] mb-2 font-display">
                DOCUMENT PROTOCOLS
              </h3>
              <nav className="flex flex-col gap-2.5 text-xs font-bold text-white/50 font-sans">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => handleScroll(sec.id)}
                    className="text-left hover:text-white hover:translate-x-1 transition-all cursor-pointer flex items-center gap-2 group py-1"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#DD183B] transition-colors" />
                    <span>{sec.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Reusable Company Card */}
            <CompanyInfoCard />
          </div>

          {/* RIGHT COLUMN: DETAILED CLAUSES */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* 1. Acceptance of Terms */}
            <PolicyCard id="acceptance" num="01" title="Acceptance of Terms">
              <p>
                By engaging VClick Digitally ("VClick", "we", "our", "us") for digital marketing campaigns, website architecture sprints, or optimization audits, you ("Client", "your") agree to comply with and be bound by these Terms & Conditions.
              </p>
              <p>
                These Terms govern any proposal sheets, statement of works (SOW), and verbal agreements entered into between the Client and VClick Digitally.
              </p>
            </PolicyCard>

            {/* 2. Scope of Services */}
            <PolicyCard id="services" num="02" title="Scope of Services">
              <p>
                VClick Digitally provides a specialized suite of enterprise growth and design services. The precise deliverables will be detailed in the project's Statement of Work:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="bg-[#1a1a1a]/85 border border-white/5 p-4 rounded-xl">
                  <h5 className="text-[#DD183B] font-bold uppercase tracking-wider text-[11px] font-display mb-1.5">Website Development</h5>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Building custom, sub-second edge-rendered Next.js flagships and headless applications optimized for conversion loops from day one.
                  </p>
                </div>
                <div className="bg-[#1a1a1a]/85 border border-white/5 p-4 rounded-xl">
                  <h5 className="text-[#DD183B] font-bold uppercase tracking-wider text-[11px] font-display mb-1.5">Organic Growth (SEO)</h5>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Constructing technical audits, intent-based keyword structures, and digital PR backlinking strategies to capture organic transaction monopolies.
                  </p>
                </div>
                <div className="bg-[#1a1a1a]/85 border border-white/5 p-4 rounded-xl">
                  <h5 className="text-[#DD183B] font-bold uppercase tracking-wider text-[11px] font-display mb-1.5">Performance Marketing</h5>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Structuring and managing conversion-optimized ad campaigns across Google Ads and Meta Ads Manager with Offline Conversion API integrations.
                  </p>
                </div>
                <div className="bg-[#1a1a1a]/85 border border-white/5 p-4 rounded-xl">
                  <h5 className="text-[#DD183B] font-bold uppercase tracking-wider text-[11px] font-display mb-1.5">Branding & Social Presence</h5>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Designing consistent, luxury visual poster assets, copywriting feeds, and digital identity parameters across corporate channels.
                  </p>
                </div>
              </div>
            </PolicyCard>

            {/* 3. Client Responsibilities */}
            <PolicyCard id="responsibilities" num="03" title="Client Responsibilities">
              <p>
                For VClick to achieve compounding optimization results, the Client agrees to:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Access Portals: Provide necessary logins, developer tokens, or tracking credentials (e.g. GTM, GA4, Meta Business Suite).</li>
                <li>Content assets: Supply official logos, high-res graphics, and necessary copy assets on schedule.</li>
                <li>Review Cycles: Provide prompt reviews and sign-offs for ad creatives, layouts, and copy iterations.</li>
              </ul>
            </PolicyCard>

            {/* 4. Project Timelines */}
            <PolicyCard id="timelines" num="04" title="Project Timelines">
              <p>
                VClick operates in disciplined, milestone-driven sprints. Estimated completion dates outlined in SOW documents are projections. Delays in receiving Client feedback or required assets will naturally push back delivery schedules. We hold no liability for delays caused by Client bottleneck responses.
              </p>
            </PolicyCard>

            {/* 5. Payments & Billing */}
            <PolicyCard id="payments" num="05" title="Payments & Billing">
              <p>
                All project fees are structured as described in individual contract terms. 
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Retainers: Performance marketing and SEO services are billed as monthly retainers due before the start of each billing period.</li>
                <li>Milestones: Development projects require a deposit (usually 50%) before kick-off, with subsequent balances tied to milestone deliveries.</li>
                <li>Late Payments: Payments delayed beyond 7 days of invoice dates may result in the temporary suspension of active ad spend campaigns.</li>
              </ul>
            </PolicyCard>

            {/* 6. Revisions Policy */}
            <PolicyCard id="revisions" num="06" title="Revisions Policy">
              <p>
                Our web development and graphic sprints include a set number of revision cycles (typically 2 rounds) as specified in the SOW. Requesting major changes that alter the agreed-upon scope of work will be subject to separate hourly billing rates.
              </p>
            </PolicyCard>

            {/* 7. IP Ownership */}
            <PolicyCard id="ownership" num="07" title="Intellectual Property Ownership">
              <p>
                Upon final payment settlement, all custom web design files, custom coding repositories, graphic assets, and ad campaigns built for the Client transfer to their exclusive ownership.
              </p>
              <p>
                VClick retains the right to display design screenshots, performance case studies, and anonymous metric summaries in our public work portfolios.
              </p>
            </PolicyCard>

            {/* 8. Confidentiality */}
            <PolicyCard id="confidentiality" num="08" title="Confidentiality">
              <p>
                Both parties agree to hold all proprietary materials, customer databases, ad budget margins, and developmental code repositories in strict confidence. No information will be shared with competitors or outside channels without explicit prior written authorization.
              </p>
            </PolicyCard>

            {/* 9. Limitation of Liability */}
            <PolicyCard id="liability" num="09" title="Limitation of Liability">
              <p>
                VClick Digitally manages campaigns and optimizes web applications to the highest standards. However, we do not control search engine core algorithm changes, ad bidding market shifts, or hosting server drops.
              </p>
              <p>
                In no event will VClick Digitally be liable for any loss of revenue, business opportunities, data corruptions, or system downtime resulting from website deployments. Our maximum liability is capped at the total amount paid by the Client for the specific service sprint in question.
              </p>
            </PolicyCard>

            {/* 10. Cancellation & Holds */}
            <PolicyCard id="cancellation" num="10" title="Cancellation & Holds">
              <p>
                Either party may terminate monthly campaigns (SEO, retainer ads) by providing a 30-day prior written notice. If a project is placed on hold by the Client for more than 30 consecutive days, VClick reserves the right to bill for milestones completed up to that point.
              </p>
            </PolicyCard>

            {/* 11. Refund Policy */}
            <PolicyCard id="refund" num="11" title="Refund Policy">
              <p>
                Because our services involve direct custom research, media buying setups, graphic design allocations, and developer hours, VClick Digitally maintains a strict **No Refund Policy** for completed work stages, ad campaign setup phases, and active retainer months.
              </p>
            </PolicyCard>

            {/* 12. Governing Law */}
            <PolicyCard id="governing" num="12" title="Governing Law">
              <p>
                These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes arising under these terms will be resolved in the competent courts of Tamil Nadu, India.
              </p>
            </PolicyCard>

            {/* 13. Contact Info */}
            <PolicyCard id="contact" num="13" title="Contact Information">
              <p>
                For questions, contract clarifications, or invoice requests, contact VClick Digitally:
              </p>
              <div className="bg-[#1a1a1a]/80 p-5 rounded-xl border border-white/5 mt-2 flex flex-col gap-2 font-sans text-xs sm:text-sm font-semibold text-white/90">
                <p><span className="text-[#DD183B] font-bold">Entity:</span> VClick Digitally</p>
                <p><span className="text-[#DD183B] font-bold">Email:</span> hello@vclickdigitally.com</p>
                <p><span className="text-[#DD183B] font-bold">Phone:</span> +91 99448 41707</p>
                <p><span className="text-[#DD183B] font-bold">HQ Location:</span> Tamil Nadu, India</p>
              </div>
            </PolicyCard>

          </div>

        </div>

      </main>

      {/* Reusable CTA */}
      <CtaSection />

    </div>
  );
};
