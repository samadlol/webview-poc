'use client';
import { WizardProvider } from '@/context/WizardContext';
import { useWizard } from '@/context/WizardContext';
import dynamic from 'next/dynamic';

const Register = dynamic(() => import('@/components/wizard/Register'));
const OtpVerification = dynamic(() => import('@/components/wizard/OtpVerification'));
const CompanyInfo = dynamic(() => import('@/components/wizard/CompanyInfo'));
const ServiceSelection = dynamic(() => import('@/components/wizard/ServiceSelection'));
const DocumentUpload = dynamic(() => import('@/components/wizard/DocumentUpload'));
const IdentityVerification = dynamic(() => import('@/components/wizard/IdentityVerification'));
const Review = dynamic(() => import('@/components/wizard/Review'));

const steps = [
  'Register',
  'Verify Email',
  'Company Info',
  'Select Services',
  'Upload Documents',
  'Identity Verification',
  'Review',
];

function WizardSteps() {
  const { step } = useWizard();

  return (
    <div className="relative mb-8">
      <div className="flex justify-between items-center">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index <= step ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 -z-10" />
      <p className="text-center text-sm text-gray-600 mt-2">
        Step {step + 1} of {steps.length}: {steps[step]}
      </p>
    </div>
  );
}

function WizardContent() {
  const { step } = useWizard();

  switch (step) {
    case 0:
      return <Register />;
    case 1:
      return <OtpVerification />;
    case 2:
      return <CompanyInfo />;
    case 3:
      return <ServiceSelection />;
    case 4:
      return <DocumentUpload />;
    case 5:
      return <IdentityVerification />;
    case 6:
      return <Review />;
    default:
      return null;
  }
}

export default function OnboardingWizard() {
  return (
    <WizardProvider>
      <div className="max-w-md mx-auto pt-8 px-4">
        <WizardSteps />
        <WizardContent />
      </div>
    </WizardProvider>
  );
}
