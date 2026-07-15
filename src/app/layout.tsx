import "@/index.css";
import React from "react";
import { fontSans, fontDisplay } from "@/config/fonts";
import { AppProviders } from "@/providers/AppProviders";

export const metadata = {
  title: "VClick Digitally | Marketing & Web Development Agency",
  description: "Enterprise growth agency specialized in SEO, Next.js development, and design.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fontSans.variable} ${fontDisplay.variable} scroll-smooth`}>
      <body className="bg-[#0B0B0B] text-white antialiased font-sans selection:bg-[#DD183B] selection:text-white">
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
