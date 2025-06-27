'use client';
import { Any, useWizard } from '@/context/WizardContext';
import { useState } from 'react';
import Image from 'next/image';

export default function DocumentUpload() {
  const { formData, setStep, updateFormData } = useWizard();
  const [files, setFiles] = useState({
    tradeLicense: ((formData.documents as Any)?.tradeLicense as Blob | MediaSource | string) || null,
    eidFront: ((formData.documents as Any)?.eidFront as Blob | MediaSource | string) || null,
    eidBack: ((formData.documents as Any)?.eidBack as Blob | MediaSource | string)
  });

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: keyof typeof files
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleContinue = () => {
    if (Object.values(files).some(x => typeof x !== "string")&& files.tradeLicense && files.eidFront && files.eidBack) {
      // In a real app, you would upload these files to a server
      updateFormData({
        documents: {
          tradeLicense: URL.createObjectURL(files.tradeLicense as MediaSource),
          eidFront: URL.createObjectURL(files.eidFront as MediaSource),
          eidBack: URL.createObjectURL(files.eidBack as MediaSource),
        },
      });
    }
    setStep(5);

  };

  const renderFileInput = (
    type: keyof typeof files,
    label: string,
    accept = "image/*"
  ) => (
    <div className="mb-4">
      <p className="text-sm font-medium mb-2">{label}</p>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        {files[type] ? (
          <div className="relative h-40 w-40" style={{
            width: "100%",
            height: "100px"
          }}>
            <Image
              src={typeof files[type] == "string" ? files[type] : URL.createObjectURL(files[type]!)}
              alt={label}
              fill
              className="object-contain rounded"
            />
            <button
              onClick={() => setFiles((prev) => ({ ...prev, [type]: null }))}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
            >
              ×
            </button>
          </div>
        ) : (
          <label className="cursor-pointer flex flex-col items-center">
            <div className="bg-gray-50 rounded-lg p-4 w-full text-center">
              <p className="text-sm text-gray-600">Click to upload</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
            </div>
            <input
              type="file"
              accept={accept}
              onChange={(e) => handleFileChange(e, type)}
              className="hidden"
            />
          </label>
        )}
      </div>
    </div>
  );

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Upload Documents</h2>

      {renderFileInput("tradeLicense", "Trade License")}
      {renderFileInput("eidFront", "EID Front")}
      {renderFileInput("eidBack", "EID Back")}

      <div className="flex gap-3" style={{
        marginTop: "30px"
      }}>
        <button
          onClick={() => setStep(3)}
          className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Back
        </button>
        <button
          onClick={handleContinue}
          disabled={!files.tradeLicense || !files.eidFront || !files.eidBack}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
