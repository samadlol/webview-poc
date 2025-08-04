import { useWizard } from '@/context/WizardContext';

export default function Header() {
  const { step, setStep } = useWizard();

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <header className="flex items-center h-16 px-4 border-b border-gray-200 mb-6">
      {step > 0 && (
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back
        </button>
      )}
    </header>
  );
}
