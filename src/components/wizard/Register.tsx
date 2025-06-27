'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useWizard } from '@/context/WizardContext';

export default function Register() {
  const { setStep, updateFormData } = useWizard();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: (values) => {
        setStep(1); // Move to OTP verification
        updateFormData({ email: values.email, password: values.password });
    },
  });

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
      <form onSubmit={formik.handleSubmit} className="">
        <div className='max-w-full mb-4'>
          <label htmlFor="email" className="block text-sm font-medium mb-4px">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps('email')}
            className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          )}
        </div>

        <div className='max-w-full mb-4'>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps('password')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          )}
        </div>

        <div className='max-w-full mb-4'>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...formik.getFieldProps('confirmPassword')}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
