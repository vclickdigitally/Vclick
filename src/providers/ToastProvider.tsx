"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextProps {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* Toast Alert Portal overlay */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => {
          const isSuccess = toast.type === "success";
          const isError = toast.type === "error";
          return (
            <div
              key={toast.id}
              className="pointer-events-auto flex items-start justify-between gap-3 p-4 bg-[#121212] border border-white/10 rounded-xl shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-5 duration-300"
            >
              {/* Left accent color bar */}
              <div 
                className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                  isSuccess ? "bg-emerald-500" : isError ? "bg-[#DD183B]" : "bg-blue-500"
                }`} 
              />
              
              <div className="flex gap-3 pl-2.5">
                {isSuccess && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />}
                {isError && <AlertCircle className="w-5 h-5 text-[#DD183B] shrink-0" />}
                {toast.type === "info" && <Info className="w-5 h-5 text-blue-500 shrink-0" />}
                
                <p className="text-xs font-medium text-white leading-relaxed">
                  {toast.message}
                </p>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="text-[#8E8E8E] hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
