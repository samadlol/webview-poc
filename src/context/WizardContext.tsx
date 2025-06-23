'use client';
import React, { createContext, useContext, useState } from 'react';

interface WizardContextType {
  step: number;
  formData: any;
  setStep: (step: number) => void;
  updateFormData: (data: any) => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const updateFormData = (data: any) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <WizardContext.Provider value={{ step, setStep, formData, updateFormData }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
}
