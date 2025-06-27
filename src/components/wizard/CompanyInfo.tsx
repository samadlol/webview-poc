'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useWizard } from '@/context/WizardContext';

export default function CompanyInfo() {
  const { formData,  setStep, updateFormData } = useWizard();

  const formik = useFormik({
    initialValues: {
      phoneNumber: (formData["phoneNumber"] as string) || '',
      companyEmail: (formData["companyEmail"] as string) || '',
      crNumber: (formData["crNumber"] as string) || '',
      nationalId: (formData["nationalId"] as string) || '',
    },
    validationSchema: Yup.object({
      phoneNumber: Yup.string().required('Required'),
      companyEmail: Yup.string().email('Invalid email').required('Required'),
      crNumber: Yup.string().required('Required'),
      nationalId: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      updateFormData(values);
      setStep(3);
    },
  });

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Company Information</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            {...formik.getFieldProps('phoneNumber')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</div>
          )}
        </div>

        <div>
          <label htmlFor="companyEmail" className="block text-sm font-medium mb-1">
            Company Email
          </label>
          <input
            id="companyEmail"
            type="email"
            {...formik.getFieldProps('companyEmail')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.companyEmail && formik.errors.companyEmail && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.companyEmail}</div>
          )}
        </div>

        <div>
          <label htmlFor="crNumber" className="block text-sm font-medium mb-1">
            CR Number
          </label>
          <input
            id="crNumber"
            type="text"
            {...formik.getFieldProps('crNumber')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.crNumber && formik.errors.crNumber && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.crNumber}</div>
          )}
        </div>

        <div>
          <label htmlFor="nationalId" className="block text-sm font-medium mb-8">
            National ID/Iqama
          </label>
          <input
            id="nationalId"
            type="text"
            {...formik.getFieldProps('nationalId')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.nationalId && formik.errors.nationalId && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.nationalId}</div>
          )}
        </div>

        <div className="flex gap-3 mt-[8px]">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
