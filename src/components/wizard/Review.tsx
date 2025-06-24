'use client';
import { useWizard } from '@/context/WizardContext';
import { postMessage } from '@/utils/eventDispatcher';

export default function Review() {
  const { formData, setStep } = useWizard();

  const handleSubmit = () => {
    // In a real app, this would submit the data to a backend
    console.log('Submitting form data:', formData);
    postMessage({
      event: "registration",
      type: "loading"
    })
    setTimeout(()=>{
      alert('Registration submitted successfully, you will be redirected to the login page...');
      postMessage({
        event: "registration",
        type: "success"
      })
    },2000)
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Review Information</h2>

      <div className="space-y-6 mb-6">
        <div>
          <h3 className="font-semibold mb-2">Account Information</h3>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p>Email: {(formData as ({ email: string })).email}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Company Information</h3>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p>Phone: {(formData as ({ phoneNumber: string })).phoneNumber}</p>
            <p>Company Email: {(formData as ({ companyEmail: string })).companyEmail}</p>
            <p>CR Number: {(formData as ({ crNumber: string })).crNumber}</p>
            <p>National ID/Iqama: {(formData as ({ nationalId: string })).nationalId}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Selected Services</h3>
          <div className="bg-gray-50 p-3 rounded-lg">
            <ul className="list-disc list-inside">
              {(formData as ({selectedServices: string[]})).selectedServices?.map((service: string) => (
                <li key={service} className="capitalize">
                  {service}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Documents</h3>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p>✓ Trade License uploaded</p>
            <p>✓ EID Front uploaded</p>
            <p>✓ EID Back uploaded</p>
            <p>✓ Verification video recorded</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => setStep((prev: number) => prev - 1)}
          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
