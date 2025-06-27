'use client';
import { postMessage } from '@/utils/eventDispatcher';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Any = Record<string, unknown>

interface WizardContextType {
  step: number;
  formData: Any;
  setStep: (step: number | ((step: number) => number)) => void;
  updateFormData: (data: Any) => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Any>({});

  useEffect(() => {
    window.addEventListener('message',handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage);
    }
  }, []);

  const handleMessage =useCallback( (message: { data: string }) => {
            const data = JSON.parse(message?.data);
      switch (data.type) {
        case 'back':
          if (step <= 0) {
            postMessage({
              type: 'back',
            });
            return
          }
          setStep((prev) => Math.max(prev - 1, 0));
          break;
      }
    }, [step]);

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
