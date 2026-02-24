"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Mail, Lock, Phone, AlertCircle } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function LoginPage() {
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await login({ email_or_phone: emailOrPhone, password });

        if (result.success) {
            showToast("Logged in successfully!", "success");
            router.push("/");
        } else {
            showToast(result.message || "Invalid credentials", "error");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <LogIn className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
                        Welcome <span className="text-red-500">Back</span>
                    </h1>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-2">
                        Sign in to manage your orders
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email or Phone</label>
                        <div className="relative">
                            <input
                                type="text"
                                required
                                value={emailOrPhone}
                                onChange={(e) => setEmailOrPhone(e.target.value)}
                                className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 outline-none focus:border-red-500 focus:bg-white transition-all"
                                placeholder="Enter email or phone"
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">
                                {emailOrPhone.includes("@") ? <Mail className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full h-14 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 outline-none focus:border-red-500 focus:bg-white transition-all"
                                placeholder="••••••••"
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-red-500 shadow-xl active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-red-500 hover:underline">
                            Create Account
                        </Link>
                    </p>
                    <div className="mt-6 pt-6 border-t border-slate-50">
                        <Link href="/tracking" className="text-[10px] font-black uppercase tracking-widest text-slate-900 flex items-center justify-center gap-2 group">
                            <span className="group-hover:text-red-500 transition-colors">Track Guest Order</span>
                            <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
