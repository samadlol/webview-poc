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
  const stepsLength = steps.length;

  return (
    <div className="relative mb-8">
      <div className="w-full h-2 bg-gray-200 rounded-xl overflow-hidden relative">
        <div
          className="h-2 bg-blue-500 transition-all duration-300"
          style={{
            width: `${((step) / (stepsLength - 1)) * 100}%`,
          }}
        />
      </div>
      <div className="flex justify-between absolute top-0 left-0 w-full h-2 pointer-events-none">
      </div>
      <p className="text-center text-sm text-gray-600 mt-2">
        Step {step + 1} of {steps.length}: {steps[step]}
      </p>
    </div>
  );
}

function WizardContent() {
  const { step } = useWizard();
//trigger deployment
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

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50" style={{
      // width: "90vw !important"
    }}>
      <WizardProvider>
        <div className="mx-auto pt-8 px-4">
          <WizardSteps />
          <WizardContent />
        </div>
      </WizardProvider>
    </main>
  );
}
