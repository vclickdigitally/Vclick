import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { authService } from "@/services/auth";
import { Logo } from "@/components/Navbar";
import { adminSidebarLinks } from "@/config/navigation";
import { 
  LogOut, 
  Bell, 
  ChevronDown 
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await authService.getSession();

  // Route security defense
  if (!session) {
    redirect("/admin/login");
  }

  const menuItems = adminSidebarLinks;

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex">
      {/* 1. SIDEBAR (Width: 260px) */}
      <aside className="w-[260px] border-r border-white/10 flex flex-col justify-between shrink-0 bg-[#0E0E0E]">
        <div>
          {/* Logo Branding */}
          <div className="h-16 px-6 border-b border-white/10 flex items-center">
            <Logo isCompact={true} />
          </div>



          {/* Navigation Links */}
          <nav className="p-4 flex flex-col gap-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="relative group">
                  {item.disabled ? (
                    <div 
                      className="flex items-center gap-3 px-4 py-3 text-[#8E8E8E] opacity-50 cursor-not-allowed text-xs font-bold uppercase tracking-wider"
                      title="Available in later phases"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white hover:bg-white/5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      <Icon className="w-4 h-4 text-[#DD183B]" />
                      <span>{item.label}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* User Account Drawer */}
        <div className="p-4 border-t border-white/10 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#DD183B] flex items-center justify-center font-bold text-white text-sm uppercase">
              {session.user.name?.charAt(0) || "A"}
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-bold text-white leading-none mb-1">
                {session.user.name || "Administrator"}
              </span>
              <span className="text-[10px] text-[#8E8E8E] font-bold uppercase tracking-wider leading-none">
                {session.user.role || "SUPERADMIN"}
              </span>
            </div>
          </div>

          {/* Server Action Logout */}
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-[#DD183B]/10 hover:text-[#DD183B] border border-white/5 hover:border-[#DD183B]/20 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer min-h-[44px]"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </form>
        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div className="flex-1 flex flex-col">
        {/* Workspace Topbar Header */}
        <header className="h-16 border-b border-white/10 px-8 flex items-center justify-between bg-[#0E0E0E]">
          {/* Left: Breadcrumbs */}
          <div className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-widest text-[#8E8E8E]">
            <Link href="/admin" className="hover:text-white transition-colors">Admin</Link>
            <span>/</span>
            <span className="text-white">Workspace Overview</span>
          </div>

          {/* Right: Notifications Box (Placeholder) */}
          <div className="flex items-center gap-4">
            <div className="relative p-2 text-[#8E8E8E] hover:text-white transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DD183B]" />
            </div>
            <div className="h-8 w-[1px] bg-white/10" />
            <div className="text-[10px] font-bold uppercase tracking-widest text-[#8E8E8E]">
              VClick CMS v0.1.0
            </div>
          </div>
        </header>

        {/* Content Shell */}
        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
