import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#0B0B0B] z-50 flex flex-col items-center justify-center gap-4">
      {/* VClick Custom Brutalist Loader Bar */}
      <div className="w-12 h-1 bg-[#DD183B] animate-pulse" />
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8E8E8E]">
        Loading VClick OS...
      </span>
    </div>
  );
}
