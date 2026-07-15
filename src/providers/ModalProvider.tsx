"use client";

import React, { createContext, useContext, useState } from "react";
import { ProjectCase } from "../types";

interface ModalContextProps {
  isProjectOpen: boolean;
  isShowreelOpen: boolean;
  selectedCase: ProjectCase | null;
  initialBudget: number;
  initialService: string;
  openProject: (budget?: number, service?: string) => void;
  closeProject: () => void;
  openShowreel: () => void;
  closeShowreel: () => void;
  openCase: (project: ProjectCase) => void;
  closeCase: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<ProjectCase | null>(null);
  const [initialBudget, setInitialBudget] = useState(15000);
  const [initialService, setInitialService] = useState("FULL");

  const openProject = (budget = 15000, service = "FULL") => {
    setInitialBudget(budget);
    setInitialService(service);
    setIsProjectOpen(true);
  };

  const closeProject = () => setIsProjectOpen(false);
  const openShowreel = () => setIsShowreelOpen(true);
  const closeShowreel = () => setIsShowreelOpen(false);
  const openCase = (project: ProjectCase) => setSelectedCase(project);
  const closeCase = () => setSelectedCase(null);

  return (
    <ModalContext.Provider
      value={{
        isProjectOpen,
        isShowreelOpen,
        selectedCase,
        initialBudget,
        initialService,
        openProject,
        closeProject,
        openShowreel,
        closeShowreel,
        openCase,
        closeCase,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModals() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModals must be used within a ModalProvider");
  }
  return context;
}
