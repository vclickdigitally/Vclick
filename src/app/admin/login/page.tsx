"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Lock, Mail } from "lucide-react";
import { Logo } from "@/components/Navbar";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  const urlError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    urlError === "CredentialsSignin" ? "Invalid email or password" : ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (res?.error) {
        setErrorMessage("Invalid email or password");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-[#121212] border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_-10px_rgba(221,24,59,0.15)] relative overflow-hidden">
      {/* VClick Branding Accent Border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#DD183B]" />

      <div className="flex flex-col items-center mb-8">
        <Logo isCompact={false} />
        <p className="text-xs uppercase tracking-[0.2em] text-[#8E8E8E] mt-4 font-bold">
          Admin Portal
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-950/40 border border-red-500/30 rounded-xl flex items-start gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#DD183B] shrink-0 mt-1.5" />
          <p className="text-xs text-red-200 font-medium leading-relaxed">
            {errorMessage}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8E8E8E] mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E8E]" />
            <input
              type="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vclickdigitally.com"
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-white/20 focus:border-[#DD183B] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#8E8E8E]">
              Password
            </label>
            <a
              href="#"
              className="text-[10px] font-bold uppercase tracking-widest text-[#DD183B] hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                alert("Password recovery link will be sent using SMTP template in later phases.");
              }}
            >
              Forgot?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E8E]" />
            <input
              type="password"
              required
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-sm text-white placeholder-white/20 focus:border-[#DD183B] focus:outline-none transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#DD183B] hover:bg-white hover:text-[#0B0B0B] text-white font-black uppercase text-xs tracking-[0.2em] py-4.5 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_35px_rgba(221,24,59,0.3)] mt-2 min-h-[48px]"
        >
          {isLoading ? (
            <span>Authorizing Session...</span>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2.5 text-[10px] text-[#8E8E8E] font-bold uppercase tracking-widest">
        <ShieldCheck className="w-4 h-4 text-[#DD183B]" />
        <span>VClick CMS Cryptographic Authorization</span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#DD183B]/5 rounded-full filter blur-[120px] pointer-events-none" />
      
      <Suspense fallback={<div className="text-white text-xs uppercase tracking-widest">Loading Portal...</div>}>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}
