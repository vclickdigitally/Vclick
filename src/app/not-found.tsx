import React from "react";
import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-[#121212] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
        {/* VClick Branding Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#DD183B]" />
        
        <SearchX className="w-12 h-12 text-[#DD183B] mx-auto mb-4" />
        
        <h1 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">
          Page Not Found (404)
        </h1>
        
        <p className="text-xs text-[#8E8E8E] leading-relaxed mb-6">
          The requested page URL does not exist or has been moved. Use the link below to return safely to the home dashboard.
        </p>

        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-[#DD183B] text-white hover:text-white border border-white/5 hover:border-transparent font-black uppercase text-xs tracking-[0.2em] py-3.5 rounded-xl transition-all duration-300 cursor-pointer min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return To Homepage</span>
        </Link>
      </div>
    </div>
  );
}
