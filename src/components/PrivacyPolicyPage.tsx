"use client";

import React from 'react';
import { LegalHero, PolicyCard, CompanyInfoCard } from './shared/LegalComponents';
import { CtaSection } from './CtaSection';

export const PrivacyPolicyPage: React.FC = () => {
  const sections = [
    { id: 'intro', label: '1. Introduction' },
    { id: 'collection', label: '2. Information We Collect' },
    { id: 'analytics', label: '3. Website Analytics' },
    { id: 'cookies', label: '4. Cookies Policy' },
    { id: 'forms', label: '5. Contact Forms' },
    { id: 'whatsapp', label: '6. WhatsApp Comms' },
    { id: 'email', label: '7. Email Comms' },
    { id: 'thirdparty', label: '8. Third-party Services' },
    { id: 'protection', label: '9. Data Protection' },
    { id: 'rights', label: '10. User Rights' },
    { id: 'updates', label: '11. Policy Updates' },
    { id: 'contact', label: '12. Contact Details' }
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
      <div className="absolute top-[15%] left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-[#DD183B]/5 rounded-full filter blur-[150px] pointer-events-none" />

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-32 w-full relative z-10">
        
        {/* Reusable Legal Hero */}
        <LegalHero 
          title="Privacy Policy"
          tagline="Transparency, Data Security, and Compliance Protocols."
          lastUpdated="July 16, 2026"
          breadcrumbItems={[{ label: 'Privacy Policy' }]}
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
            
            {/* 1. Introduction */}
            <PolicyCard id="intro" num="01" title="Introduction">
              <p>
                Welcome to VClick Digitally ("VClick", "we", "our", "us"). We are committed to protecting your personal data and respecting your privacy. This Privacy Policy details how we collect, process, share, and protect your information when you interact with our website, request digital marketing services, or communicate with us.
              </p>
              <p>
                By using our website, services, or contacting us through form inputs, emails, or WhatsApp link redirection, you acknowledge and agree to the policies, terms, and practices described in this document.
              </p>
            </PolicyCard>

            {/* 2. Information We Collect */}
            <PolicyCard id="collection" num="02" title="Information We Collect">
              <h4 className="text-white font-bold uppercase tracking-wider text-xs font-display mt-2 mb-1">A. Personal Information</h4>
              <p>
                We collect personal information that you voluntarily provide to us when you request consultation drafts, submit contact sheets, or engage our services. This information includes:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Legal Identity: Full name, company name, job title.</li>
                <li>Contact Coordinates: Email address, telephone numbers.</li>
                <li>Service Details: Services required, project timelines, and description notes.</li>
              </ul>
              <h4 className="text-white font-bold uppercase tracking-wider text-xs font-display mt-4 mb-1">B. Automatically Collected Data</h4>
              <p>
                When you browse our website, we automatically collect basic device metadata, operating system characteristics, browser variants, referring paths, and timestamps to optimize rendering speeds.
              </p>
            </PolicyCard>

            {/* 3. Website Analytics */}
            <PolicyCard id="analytics" num="03" title="Website Analytics">
              <p>
                To measure user flows, layout interactions, and traffic sources, we implement active telemetry integrations. This helps us ensure that our Next.js edge-rendered platforms load efficiently.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="bg-[#1a1a1a]/85 border border-white/5 p-4 rounded-xl">
                  <h5 className="text-white font-bold uppercase tracking-wider text-xs font-display mb-2">Google Analytics</h5>
                  <p className="text-xs text-white/50 leading-relaxed">
                    We use Google Analytics (GA4) to evaluate page click events, regional traffic metrics, device parameters, and session durations. No personal identifiers are held or stored.
                  </p>
                </div>
                <div className="bg-[#1a1a1a]/85 border border-white/5 p-4 rounded-xl">
                  <h5 className="text-white font-bold uppercase tracking-wider text-xs font-display mb-2">Microsoft Clarity</h5>
                  <p className="text-xs text-white/50 leading-relaxed">
                    We utilize Microsoft Clarity to record anonymous user sessions, layout heatmaps, and scroll behavior. This helps us identify navigation bugs and refine readability.
                  </p>
                </div>
              </div>
            </PolicyCard>

            {/* 4. Cookies Policy */}
            <PolicyCard id="cookies" num="04" title="Cookies Policy">
              <p>
                Cookies are small text documents stored on your local device browser. VClick Digitally uses cookies to preserve navigation states, security logs, and analytics tracking sessions.
              </p>
              <p>
                You can configure your browser preferences to reject cookies or warn you before they are accepted. However, choosing to disable cookies may impact some page speeds or state controls.
              </p>
            </PolicyCard>

            {/* 5. Contact Forms */}
            <PolicyCard id="forms" num="05" title="Contact Forms">
              <p>
                When you submit inquiries through our online forms, the inputs (Name, Email, Phone, Company, Service, Message) are securely processed over SSL/TLS encrypted links.
              </p>
              <p>
                This information is used strictly to draft your marketing campaigns and coordinate project consultations. We never share, sell, or distribute your form data to third-party databases.
              </p>
            </PolicyCard>

            {/* 6. WhatsApp Communication */}
            <PolicyCard id="whatsapp" num="06" title="WhatsApp Communication">
              <p>
                Our floating chat component redirects you to `https://wa.me/919944841707` with a pre-filled service inquiry message.
              </p>
              <p>
                Conversations held via WhatsApp are subject to the native end-to-end encryption protocols of Meta Platforms Inc. We retain text logs only as needed to manage client service relationships.
              </p>
            </PolicyCard>

            {/* 7. Email Communication */}
            <PolicyCard id="email" num="07" title="Email Communication">
              <p>
                Emails sent to `hello@vclickdigitally.com` are received in our secure mailboxes. We use email correspondence to coordinate development milestones, ad copywriting reviews, and billing invoices.
              </p>
            </PolicyCard>

            {/* 8. Third-party Services */}
            <PolicyCard id="thirdparty" num="08" title="Third-party Services">
              <p>
                VClick Digitally may integrate services provided by third-party platforms (e.g. hosting servers, API connections, visual assets, and fonts). These third parties have separate, independent privacy policies. We hold no responsibility for their respective operations.
              </p>
            </PolicyCard>

            {/* 9. Data Protection */}
            <PolicyCard id="protection" num="09" title="Data Protection">
              <p>
                We employ robust administrative, technical, and physical security measures to safeguard your information from unauthorized access, modification, or exposure. All backend connections are token-gated and encrypted.
              </p>
            </PolicyCard>

            {/* 10. User Rights */}
            <PolicyCard id="rights" num="10" title="User Rights">
              <p>
                You have the right to access, edit, or request the deletion of any personal data we hold about you. You can also object to specific marketing communications or analytics tracking at any time.
              </p>
              <p>
                To exercise these rights, please email us at `hello@vclickdigitally.com`.
              </p>
            </PolicyCard>

            {/* 11. Policy Updates */}
            <PolicyCard id="updates" num="11" title="Policy Updates">
              <p>
                VClick Digitally reserves the right to modify this Privacy Policy at any time to reflect security revisions, service expansions, or regulatory adjustments. The "Last Updated" tag at the top indicates when the latest modifications occurred.
              </p>
            </PolicyCard>

            {/* 12. Contact Details */}
            <PolicyCard id="contact" num="12" title="Contact Details">
              <p>
                If you have questions, comments, or compliance concerns regarding this document, please contact us at:
              </p>
              <div className="bg-[#1a1a1a]/80 p-5 rounded-xl border border-white/5 mt-2 flex flex-col gap-2 font-sans text-xs sm:text-sm font-semibold text-white/90">
                <p><span className="text-[#DD183B] font-bold">Company:</span> VClick Digitally</p>
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
