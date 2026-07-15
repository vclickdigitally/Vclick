"use client";

import React, { useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { logger } from "@/lib/logger";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error using our abstract logger
    logger.error("Route execution runtime crash caught by ErrorBoundary", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0B0B0B] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-[#121212] border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(239,68,68,0.1)] relative">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#DD183B]" />
        
        <AlertCircle className="w-12 h-12 text-[#DD183B] mx-auto mb-4" />
        
        <h1 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">
          An Unexpected Runtime Error Occurred
        </h1>
        
        <p className="text-xs text-[#8E8E8E] leading-relaxed mb-6">
          VClick CMS caught a crash on this page. Our logs have captured this event. Please click below to try recovering the session.
        </p>

        <button
          onClick={() => reset()}
          className="w-full flex items-center justify-center gap-2 bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white font-black uppercase text-xs tracking-[0.2em] py-3.5 rounded-xl transition-all duration-300 cursor-pointer min-h-[44px]"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset Route Session</span>
        </button>
      </div>
    </div>
  );
}
