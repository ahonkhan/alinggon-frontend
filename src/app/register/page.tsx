"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Mail, Lock, Phone, User as UserIcon, CheckCircle, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { useSendOtpMutation, useVerifyOtpMutation, useRegisterMutation, useResendOtpMutation, useGetHomeContentQuery } from "@/store/api/frontendApi";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

export default function RegisterPage() {
    const [step, setStep] = useState(1);
    const [identifierType, setIdentifierType] = useState<'email' | 'phone'>('email');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        otp: "",
        password: "",
        password_confirmation: "",
    });

    const [sendOtp, { isLoading: isSendingOtp }] = useSendOtpMutation();
    const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
    const [resendOtp, { isLoading: isResendingOtp }] = useResendOtpMutation();
    const [registerApi, { isLoading: isRegistering }] = useRegisterMutation();
    const { data: homeContent } = useGetHomeContentQuery();
    const logoUrl = homeContent?.data?.logo || homeContent?.data?.header_logo;
    const { setAuth } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();
    const otpInputs = useRef<(HTMLInputElement | null)[]>([]);

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (isNaN(Number(value))) return;

        const newOtp = formData.otp.split("");
        newOtp[index] = value.slice(-1);
        const otpString = newOtp.join("");
        setFormData({ ...formData, otp: otpString });

        if (value && index < 5) {
            otpInputs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !formData.otp[index] && index > 0) {
            otpInputs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent) => {
        const pastedData = e.clipboardData.getData("text").slice(0, 6);
        if (/^\d{6}$/.test(pastedData)) {
            setFormData({ ...formData, otp: pastedData });
            otpInputs.current[5]?.focus();
        }
    };

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await sendOtp({
                name: formData.name,
                [identifierType]: identifierType === 'email' ? formData.email : formData.phone
            }).unwrap();

            if (result.success) {
                showToast(result.message, "success");
                setStep(2);
            }
        } catch (error: any) {
            showToast(error.data?.message || "Failed to send OTP", "error");
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const identifier = identifierType === 'email' ? formData.email : formData.phone;
            const result = await verifyOtp({
                identifier,
                type: identifierType,
                otp: formData.otp
            }).unwrap();

            if (result.success) {
                showToast("OTP Verified!", "success");
                setStep(3);
            }
        } catch (error: any) {
            showToast(error.data?.message || "Invalid OTP", "error");
        }
    };

    const handleResendOtp = async () => {
        try {
            const identifier = identifierType === 'email' ? formData.email : formData.phone;
            const result = await resendOtp({
                identifier,
                type: identifierType
            }).unwrap();
            if (result.success) {
                showToast("New OTP sent!", "success");
            }
        } catch (error: any) {
            showToast("Failed to resend OTP", "error");
        }
    };

    const handleFinalRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.password_confirmation) {
            showToast("Passwords do not match", "error");
            return;
        }

        try {
            const identifier = identifierType === 'email' ? formData.email : formData.phone;
            const result = await registerApi({
                name: formData.name,
                identifier,
                type: identifierType,
                password: formData.password,
                password_confirmation: formData.password_confirmation
            }).unwrap();

            if (result.success) {
                showToast("Account created successfully!", "success");
                setAuth(result.user, result.access_token);
                router.push("/");
            }
        } catch (error: any) {
            showToast(error.data?.message || "Registration failed", "error");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-20 font-inter">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 p-8 sm:p-10 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 opacity-50 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-100 rounded-full -ml-16 -mb-16 opacity-40 blur-3xl"></div>

                <div className="text-center mb-8 relative z-10">
                    <div className="h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 p-2">
                        {logoUrl ? (
                            <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                        ) : (
                            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
                                {step === 1 && <UserPlus className="w-8 h-8 text-red-500" />}
                                {step === 2 && <ShieldCheck className="w-8 h-8 text-red-500" />}
                                {step === 3 && <Lock className="w-8 h-8 text-red-500" />}
                            </div>
                        )}
                    </div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                        {step === 1 && <>Create <span className="text-red-500">Account</span></>}
                        {step === 2 && <>Verify <span className="text-red-500">OTP</span></>}
                        {step === 3 && <>Secure <span className="text-red-500">Account</span></>}
                    </h1>
                    <div className="flex items-center justify-center gap-2 mt-4">
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`h-1.5 rounded-full transition-all duration-300 ${s === step ? 'w-8 bg-red-500' : s < step ? 'w-4 bg-green-500' : 'w-4 bg-slate-200'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Step 1: General Info */}
                {step === 1 && (
                    <form onSubmit={handleSendOtp} className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-widest text-slate-800 ml-1">Full Name</label>
                            <div className="relative group">
                                <input
                                    type="text" required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full h-12 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 outline-none focus:border-red-500 focus:bg-white transition-all group-hover:border-slate-200"
                                    placeholder="e.g. Abdullah Al Mamun"
                                />
                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-800 group-focus-within:text-red-500 transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between px-1">
                                <label className="text-[11px] font-black uppercase tracking-widest text-slate-800">
                                    {identifierType === 'email' ? 'Email Address' : 'Phone Number'}
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setIdentifierType(identifierType === 'email' ? 'phone' : 'email')}
                                    className="text-[12px] font-black uppercase tracking-tighter text-red-500 hover:text-red-600"
                                >
                                    Use {identifierType === 'email' ? 'Phone' : 'Email'} Instead
                                </button>
                            </div>
                            <div className="relative group">
                                {identifierType === 'email' ? (
                                    <>
                                        <input
                                            type="email" required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full h-12 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 outline-none focus:border-red-500 focus:bg-white transition-all group-hover:border-slate-200"
                                            placeholder="hello@example.com"
                                        />
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-800 group-focus-within:text-red-500 transition-colors" />
                                    </>
                                ) : (
                                    <>
                                        <PhoneInput
                                            defaultCountry="bd"
                                            value={formData.phone}
                                            onChange={(phone) => setFormData({ ...formData, phone })}
                                            inputClassName="!w-full !h-12 !pl-3  !rounded-2xl !bg-slate-50 !border-none !text-xs !font-bold !text-slate-900 !outline-none focus:!bg-white !transition-all"
                                            className="!w-full !bg-slate-50 !border !border-slate-600 !rounded-2xl overflow-hidden focus-within:!border-red-500 focus-within:!bg-white !transition-all group-hover:!border-slate-200"
                                            countrySelectorStyleProps={{
                                                buttonClassName: "!h-12 !bg-transparent !border-none !pl-2 !pr-0",
                                            }}
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSendingOtp}
                            className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-500 shadow-xl shadow-slate-200 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 group"
                        >
                            {isSendingOtp ? "Sending OTP..." : (
                                <>
                                    Get OTP Code
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                )}

                {/* Step 2: OTP Verification */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOtp} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="text-center">
                            <p className="text-[13px] font-bold text-slate-600 mb-1">We sent an OTP to</p>
                            <p className="text-sm font-black text-slate-900 px-3 py-1 bg-slate-50 rounded-full inline-block border border-slate-100">
                                {identifierType === 'email' ? formData.email : formData.phone}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <label className="text-[11px] font-black uppercase tracking-widest text-slate-800 text-center block italic">Enter 6-Digit Verification Code</label>
                            <div className="flex justify-between gap-2" onPaste={handleOtpPaste}>
                                {[0, 1, 2, 3, 4, 5].map((index) => (
                                    <input
                                        key={index}
                                        ref={(el) => { otpInputs.current[index] = el; }}
                                        type="text"
                                        maxLength={1}
                                        value={formData.otp[index] || ""}
                                        onChange={(e) => handleOtpChange(e, index)}
                                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                        className="w-12 h-14 text-center text-2xl font-black rounded-xl bg-slate-50 border-2 border-slate-100 outline-none focus:border-red-500 focus:bg-white focus:shadow-lg focus:shadow-red-50 transition-all"
                                        autoFocus={index === 0}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                type="submit"
                                disabled={isVerifyingOtp}
                                className="w-full h-14 bg-red-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-600 shadow-xl shadow-red-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            >
                                {isVerifyingOtp ? "Verifying..." : (
                                    <>
                                        Verify & Continue
                                        <CheckCircle className="w-4 h-4" />
                                    </>
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={isResendingOtp}
                                className="text-[11px] font-black uppercase tracking-widest text-slate-800 hover:text-red-500 transition-colors py-2"
                            >
                                {isResendingOtp ? 'Sending...' : "Didn't receive code? Resend"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="flex items-center justify-center gap-1 text-[11px] font-black uppercase tracking-widest text-slate-800 hover:text-slate-600 mt-2"
                            >
                                <ArrowLeft className="w-3 h-3" /> Change Information
                            </button>
                        </div>
                    </form>
                )}

                {/* Step 3: Password */}
                {step === 3 && (
                    <form onSubmit={handleFinalRegister} className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-black uppercase tracking-widest text-slate-800 ml-1">New Password</label>
                            <div className="relative group">
                                <input
                                    type="password" required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full h-12 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 outline-none focus:border-red-500 focus:bg-white transition-all"
                                    placeholder="••••••••"
                                    autoFocus
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-800 group-focus-within:text-red-500 transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-1.5 pb-2">
                            <label className="text-[11px] font-black uppercase tracking-widest text-slate-800 ml-1">Confirm Password</label>
                            <div className="relative group">
                                <input
                                    type="password" required
                                    value={formData.password_confirmation}
                                    onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                                    className="w-full h-12 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 outline-none focus:border-red-500 focus:bg-white transition-all"
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-800 group-focus-within:text-red-500 transition-colors" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isRegistering}
                            className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-green-600 shadow-xl shadow-slate-200 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isRegistering ? "Creating Account..." : (
                                <>
                                    Complete Setup
                                    <CheckCircle className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                )}

                <div className="mt-8 text-center relative z-10 border-t border-slate-50 pt-8">
                    <p className="text-[11px] font-black uppercase tracking-widest text-slate-800">
                        Already have an account?{" "}
                        <Link href="/login" className="text-red-500 hover:text-red-600 ml-1">
                            Login Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
