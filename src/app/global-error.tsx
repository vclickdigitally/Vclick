"use client";

import React, { useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { logger } from "@/lib/logger";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    logger.error("Root layout level critical crash caught by GlobalError", error);
  }, [error]);

  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-[#0B0B0B] text-white flex flex-col items-center justify-center p-6 text-center antialiased">
        <div className="max-w-md w-full bg-[#121212] border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(239,68,68,0.1)] relative">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#DD183B]" />
          
          <AlertCircle className="w-12 h-12 text-[#DD183B] mx-auto mb-4" />
          
          <h1 className="text-lg font-bold text-white mb-2 uppercase tracking-wide">
            Critical System Failure
          </h1>
          
          <p className="text-xs text-[#8E8E8E] leading-relaxed mb-6">
            A critical server error prevented the application layout from rendering. Press reset to try booting the system again.
          </p>

          <button
            onClick={() => reset()}
            className="w-full bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white font-black uppercase text-xs tracking-[0.2em] py-3.5 rounded-xl transition-all duration-300 cursor-pointer min-h-[44px]"
          >
            Reset Application Layout
          </button>
        </div>
      </body>
    </html>
  );
}
