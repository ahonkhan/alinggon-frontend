"use client";

import { User, Mail, Phone, Lock, ArrowRight, ShoppingBag, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export default function Register() {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        login("01712345678", "New User");
        showToast("Account Created Successfully", "success");
        router.push("/profile");
    };

    return (
        <main className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50/50">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Side: Branding */}
                <div className="hidden lg:block space-y-12">
                    <div className="space-y-6">
                        <div className="bg-slate-900 text-white p-3 rounded-2xl w-fit shadow-2xl -rotate-3">
                            <User className="w-8 h-8 text-red-400" />
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                            Join the <br /><span className="text-red-400">Elite.</span>
                        </h1>
                        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] max-w-sm leading-relaxed">
                            Establish your identity in our global ecosystem. Unlock premium status, priority logistics, and exclusive digital rewards.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <FeatureItem label="Unified Profile System" />
                        <FeatureItem label="Logistics Acceleration" />
                        <FeatureItem label="Advanced Security Vault" />
                    </div>
                </div>

                {/* Right Side: Register Form */}
                <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -ml-32 -mb-32 opacity-50"></div>

                    <div className="relative z-10 space-y-10">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Register</h2>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Establish New Identity</p>
                        </div>

                        <form onSubmit={handleRegister} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white text-sm font-black text-slate-800 transition-all outline-none shadow-inner"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        <input type="email" placeholder="mail@example.com" className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white text-sm font-black text-slate-800 transition-all outline-none" required />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Phone</label>
                                    <div className="relative">
                                        <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                        <input type="text" placeholder="01XXXXXXXXX" className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white text-sm font-black text-slate-800 transition-all outline-none font-sans" required />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                    <input type="password" placeholder="••••••••" className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white text-sm font-black text-slate-800 transition-all outline-none" required />
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-slate-900 hover:bg-red-400 text-white font-black h-16 rounded-2xl shadow-xl transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-95 group"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Establish Identity"}
                                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />}
                            </button>
                        </form>

                        <div className="text-center">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-loose">
                                Already have an identity? <Link href="/login" className="text-red-400 hover:text-slate-900 transition-colors border-b border-red-100">Sign In</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function FeatureItem({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-3 text-xs font-black text-slate-700 uppercase tracking-tighter">
            <div className="w-6 h-6 bg-red-400 rounded-lg flex items-center justify-center text-white">
                <CheckCircle2 className="w-4 h-4" />
            </div>
            {label}
        </div>
    );
}
