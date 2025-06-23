'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type Any = Record<string, unknown>

interface WizardContextType {
  step: number;
  formData: Any;
  setStep: (step: number) => void;
  updateFormData: (data: Any) => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('wizardFormData') || '{}');
    }
    return {};
  });
  
  useEffect(() => {
    localStorage.setItem('wizardStep', String(step));
  }, [step]);

  useEffect(() => {
    localStorage.setItem('wizardFormData', JSON.stringify(formData));
  }, [formData]);

  const updateFormData = (data: Any) => {
    setFormData((prev: Any) => ({ ...prev, ...data }));
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
