'use client';
import { useState } from 'react';
import { useWizard } from '@/context/WizardContext';
import ReactOTPInput from 'react-otp-input';

export default function OtpVerification() {
    const { setStep } = useWizard();
    const [otp, setOtp] = useState('');

    const handleVerify = () => {
        // Mock verification - in real app, this would verify with backend
        if (otp.length === 6) {
            setStep(2);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Email</h2>
            <p className="text-center text-gray-600 mb-6">
                We have sent a verification code to your email address
            </p>

            <div className="mb-6">
                <ReactOTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={{
                        marginTop: "30px",
                        marginBottom: "30px",
                        width: '30px',
                        height: '30px',
                        margin: '0 2px',
                        fontSize: '20px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                    }}
                    containerStyle={{
                        display: 'flex',
                        justifyContent: 'center',
                        overflowX: 'auto',
                        gap: '0.1rem',
                        maxWidth: '100%',
                    }}
                />
            </div>

            <button
                onClick={handleVerify}
                disabled={otp.length !== 6}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
            >
                Verify
            </button>

            <p className="text-center mt-4 text-sm text-gray-600">
                Did not receive the code?
                <button className="text-blue-600 hover:underline">Resend</button>
            </p>
        </div>
    );
}
