'use client';

import { useState, useEffect } from 'react';
import { useCookieConsentMutation } from '@/store/api/frontendApi';

export default function CookieConsentBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [recordConsent] = useCookieConsentMutation();

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Delay showing for a smoother experience
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = async () => {
        localStorage.setItem('cookie_consent', 'accepted');
        setIsVisible(false);
        try {
            await recordConsent({ consent_type: 'all' }).unwrap();
        } catch (error) {
            console.error('Failed to record cookie consent:', error);
        }
    };

    const handleDecline = async () => {
        localStorage.setItem('cookie_consent', 'declined');
        setIsVisible(false);
        try {
            await recordConsent({ consent_type: 'essential' }).unwrap();
        } catch (error) {
            console.error('Failed to record cookie consent:', error);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed top-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[1000] animate-slide-down">
            <div className="bg-slate-900/95 backdrop-blur-md text-white p-6 rounded-2xl shadow-2xl border border-slate-800/50 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                    <div className="bg-orange-500/10 p-2 rounded-xl text-orange-500 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg text-slate-100">Cookie Notice</h3>
                        <p className="text-sm text-slate-300 mt-1 leading-relaxed">
                            We use cookies to improve your experience on our site. To find out more, read our privacy policy.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 mt-2">
                    <button 
                        onClick={handleAccept}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition duration-200 shadow-lg shadow-orange-600/20"
                    >
                        Accept All
                    </button>
                    <button 
                        onClick={handleDecline}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold py-2.5 px-4 rounded-xl transition duration-200 border border-slate-700"
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
}
