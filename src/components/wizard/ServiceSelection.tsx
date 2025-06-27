'use client';
import { useWizard } from '@/context/WizardContext';
import { useState } from 'react';

const services = [
  {
    id: 'ecommerce',
    name: 'E-Commerce',
    description: 'Accept payments on your website or mobile app',
    setupFee: '500 SAR',
    commission: '2.5%',
  },
  {
    id: 'softpos',
    name: 'SoftPOS',
    description: 'Turn your Android phone into a payment terminal',
    setupFee: '200 SAR',
    commission: '2.0%',
  },
  {
    id: 'pos',
    name: 'POS',
    description: 'Traditional POS terminal for your physical store',
    setupFee: '1000 SAR',
    commission: '1.8%',
  },
];

export default function ServiceSelection() {
  const { formData, setStep, updateFormData } = useWizard();
  const [selectedServices, setSelectedServices] = useState<string[]>(()=> (formData.selectedServices as []) || []);

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleContinue = () => {
    if (selectedServices.length > 0) {
      updateFormData({ selectedServices });
      setStep(4);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Select Services</h2>
      <div className="space-y-4 mb-6">
        {services.map((service) => (
          <div
            key={service.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedServices.includes(service.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}
            onClick={() => toggleService(service.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{service.name}</h3>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.id)}
                  onChange={() => toggleService(service.id)}
                  className="w-4 h-4 text-blue-600"
                />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{service.description}</p>
            <div className="text-sm">
              <span className="text-gray-600">Setup Fee: </span>
              <span className="font-medium">{service.setupFee}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Commission: </span>
              <span className="font-medium">{service.commission}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep(2)}
          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={selectedServices.length === 0}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
