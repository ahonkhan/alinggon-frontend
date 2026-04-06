"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
    KeyRound, 
    Mail, 
    Lock, 
    Phone, 
    ArrowLeft, 
    CheckCircle2, 
    ShieldCheck, 
    RefreshCcw 
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { 
    useForgotPasswordSendOtpMutation, 
    useForgotPasswordVerifyOtpMutation, 
    useResetPasswordMutation,
    useGetHomeContentQuery
} from "@/store/api/frontendApi";

type Step = "identifier" | "otp" | "reset";

export default function ForgotPasswordPage() {
    const [step, setStep] = useState<Step>("identifier");
    const [identifier, setIdentifier] = useState("");
    const [type, setType] = useState<"email" | "phone">("email");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const { showToast } = useToast();
    const { data: homeContent } = useGetHomeContentQuery();
    const logoUrl = homeContent?.data?.logo || homeContent?.data?.header_logo;

    const [sendOtp] = useForgotPasswordSendOtpMutation();
    const [verifyOtp] = useForgotPasswordVerifyOtpMutation();
    const [resetPassword] = useResetPasswordMutation();

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await sendOtp({ email_or_phone: identifier }).unwrap();
            if (res.success) {
                setType(res.type);
                setStep("otp");
                showToast(res.message, "success");
            }
        } catch (err: any) {
            showToast(err.data?.message || "Failed to send OTP", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await verifyOtp({ identifier, type, otp }).unwrap();
            if (res.success) {
                setStep("reset");
                showToast(res.message, "success");
            }
        } catch (err: any) {
            showToast(err.data?.message || "Invalid OTP", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            showToast("Passwords do not match", "error");
            return;
        }

        setIsLoading(true);
        try {
            const res = await resetPassword({ 
                identifier, 
                type, 
                otp, 
                password, 
                password_confirmation: passwordConfirmation 
            }).unwrap();
            
            if (res.success) {
                showToast("Password reset successfully!", "success");
                router.push("/login");
            }
        } catch (err: any) {
            showToast(err.data?.message || "Failed to reset password", "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl border border-slate-300 p-10">
                <div className="text-center mb-10">
                    <div className="h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 p-2">
                        {logoUrl ? (
                            <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
                        ) : (
                            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center">
                                <KeyRound className="w-8 h-8 text-red-500" />
                            </div>
                        )}
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
                        Reset <span className="text-red-500">Password</span>
                    </h1>
                    <p className="text-[13px] uppercase font-black tracking-widest text-slate-800 mt-2">
                        {step === "identifier" && "Enter your email or phone to receive OTP"}
                        {step === "otp" && `Enter the 6-digit code sent to your ${type}`}
                        {step === "reset" && "Create a new strong password"}
                    </p>
                </div>

                {step === "identifier" && (
                    <form onSubmit={handleSendOtp} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[13px] font-black uppercase tracking-widest text-slate-700 ml-1">Email or Phone</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    required
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 outline-none focus:border-red-500 focus:bg-white transition-all"
                                    placeholder="Enter your email or phone"
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                                    {identifier.includes("@") ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-500 shadow-xl active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {isLoading ? "Sending OTP..." : "Send OTP"}
                        </button>

                        <Link href="/login" className="flex items-center justify-center gap-2 text-[13px] font-black uppercase tracking-widest text-slate-500 hover:text-red-500 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            Back to Login
                        </Link>
                    </form>
                )}

                {step === "otp" && (
                    <form onSubmit={handleVerifyOtp} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[13px] font-black uppercase tracking-widest text-slate-700 ml-1">OTP Code</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    required
                                    maxLength={6}
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                    className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 outline-none tracking-[0.5em] focus:border-red-500 focus:bg-white transition-all"
                                    placeholder="000000"
                                />
                                <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-500 shadow-xl active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {isLoading ? "Verifying..." : "Verify OTP"}
                        </button>

                        <div className="flex flex-col gap-4 text-center">
                             <button 
                                type="button"
                                onClick={() => setStep("identifier")}
                                className="text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-red-500 transition-colors flex items-center justify-center gap-2"
                            >
                                <RefreshCcw className="w-3 h-3" /> Change {type}
                            </button>
                        </div>
                    </form>
                )}

                {step === "reset" && (
                    <form onSubmit={handleResetPassword} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[13px] font-black uppercase tracking-widest text-slate-700 ml-1">New Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    minLength={8}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 outline-none focus:border-red-500 focus:bg-white transition-all"
                                    placeholder="••••••••"
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[13px] font-black uppercase tracking-widest text-slate-700 ml-1">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    required
                                    value={passwordConfirmation}
                                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                                    className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 outline-none focus:border-red-500 focus:bg-white transition-all"
                                    placeholder="••••••••"
                                />
                                <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-500 shadow-xl active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {isLoading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
