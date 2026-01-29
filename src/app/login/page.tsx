"use client";

import { Mail, Lock, ArrowRight, ShoppingBag, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        login("01712345678", "Ahon Khan");
        router.push("/profile");
    };

    return (
        <main className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50/50">
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Side: Branding/Trust */}
                <div className="hidden lg:block space-y-12">
                    <div className="space-y-6">
                        <div className="bg-red-400 text-white p-3 rounded-2xl w-fit shadow-2xl rotate-3">
                            <ShoppingBag className="w-8 h-8" />
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                            Access Your <br /><span className="text-red-400">Vault.</span>
                        </h1>
                        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] leading-relaxed max-w-sm">
                            Log in to experience personalized shopping, track your orders in realtime, and access exclusive member rewards.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <TrustBadge icon={ShieldCheck} label="Secure Session" sub="End-to-end encrypted protocol" />
                        <TrustBadge icon={CheckCircle2} label="Verified Identity" sub="Two-factor authentication ready" />
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>

                    <div className="relative z-10 space-y-10">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Sign In</h2>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Connect to Your Account</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Identity (Email/Phone)</label>
                                <div className="relative">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                    <input
                                        type="text"
                                        placeholder="Your Authenticated Email"
                                        className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white text-sm font-black text-slate-800 transition-all outline-none shadow-inner"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between px-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Secret Key (Password)</label>
                                    <Link href="#" className="text-[9px] font-black text-red-400 uppercase hover:underline">Forgot Key?</Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white text-sm font-black text-slate-800 transition-all outline-none shadow-inner"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-red-400 hover:bg-slate-900 text-white font-black h-16 rounded-2xl shadow-xl shadow-red-100 transition-all uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-95 group"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authenticate Now"}
                                {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />}
                            </button>
                        </form>

                        <div className="text-center">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-loose">
                                No identity found? <Link href="/register" className="text-red-400 hover:text-slate-900 transition-colors border-b border-red-100">Establish Account</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function TrustBadge({ icon: Icon, label, sub }: any) {
    return (
        <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:translate-x-2 transition-all group">
            <div className="bg-red-50 p-4 rounded-2xl text-red-400 group-hover:bg-red-400 group-hover:text-white transition-colors">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest">{label}</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight mt-1">{sub}</p>
            </div>
        </div>
    );
}
