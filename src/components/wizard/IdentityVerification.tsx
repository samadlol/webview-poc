'use client';
import { useWizard } from '@/context/WizardContext';
import { isWebViewEnv, postMessage } from '@/utils/eventDispatcher';
import { useState, useRef, useCallback, useEffect, RefObject } from 'react';
import Webcam from 'react-webcam';


export default function IdentityVerification() {
    const { setStep, updateFormData } = useWizard();
    const webcamRef = useRef<Webcam>(null);
    const hasSent: RefObject<boolean> = useRef(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingComplete, setRecordingComplete] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const start = useCallback(() => {
        setIsRecording(true);
        setCountdown(5);

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsRecording(false);
                    setRecordingComplete(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, [setCountdown, setIsRecording, setRecordingComplete, ]);
    const handleMessage = useCallback((message: { data: string }) => {
        try {
            const data = JSON.parse(message?.data);
            switch (data.type) {
                case "permission": {
                    console.log("IM HERE DATA", data)
                    if (data.payload.status === "granted") {
                        start()
                    }
                    break;
                }
            }
        } catch (error) {
            console.log(error)
        }
    }, [start]);
    useEffect(() => {
        window.addEventListener("message", handleMessage)

        return () => {
            window.removeEventListener("message", handleMessage)
        }
    }, [handleMessage]);

    useEffect(() => {
        if (countdown == 0 && !hasSent.current) {
            hasSent.current = true;
            updateFormData({
                verificationVideo: 'video-recorded',
            });
        }
    }, [countdown, updateFormData]);

    const startRecording = useCallback(() => {
        if (isWebViewEnv()) {
            return postMessage({
                event: "permission",
                type: "camera"
            })
        }
        start()
    }, [start]);

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Identity Verification</h2>

            <div className="mb-6">
                <div className="flex justify-center items-center">
                    <Webcam
                        ref={webcamRef}
                        audio={false}
                        className="max-w-auto"
                        style={{
                            height: "90vw",
                            width: "90vw",
                            overflow: "hidden",
                            display: "flex",
                            borderRadius: "50%",
                            objectFit: "cover",
                            backgroundColor: "gray",
                            flex: 1
                        }}
                    />
                    {isRecording && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
                            Recording... {countdown}s
                        </div>
                    )}
                </div>
            </div>

            <p className="text-center text-gray-600 mb-6">
                Please look at the camera and record a short 5-second video for identity verification.
            </p>

            <div className="flex gap-3">
                <button
                    onClick={() => setStep(4)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Back
                </button>
                {!recordingComplete ? (
                    <button
                        onClick={startRecording}
                        disabled={isRecording}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400"
                    >
                        {isRecording ? 'Recording...' : 'Start Recording'}
                    </button>
                ) : (
                    <button
                        onClick={() => setStep(6)}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Continue
                    </button>
                )}
            </div>
        </div>
    );
}
