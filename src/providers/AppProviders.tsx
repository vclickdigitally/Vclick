"use client";

import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./ToastProvider";
import { ModalProvider } from "./ModalProvider";
import { LazyMotion } from "framer-motion";

const loadFramerFeatures = () =>
  import("../lib/framer-features").then((res) => res.default);

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ModalProvider>
          <LazyMotion features={loadFramerFeatures} strict>
            {children}
          </LazyMotion>
        </ModalProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
