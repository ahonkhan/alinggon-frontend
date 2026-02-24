"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Mail, Lock, Phone, User as UserIcon } from "lucide-react";
import { useToast } from "@/context/ToastContext";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (formData.password !== formData.password_confirmation) {
            showToast("Passwords do not match", "error");
            setIsLoading(false);
            return;
        }

        const result = await register(formData);

        if (result.success) {
            showToast("Account created successfully!", "success");
            router.push("/");
        } else {
            showToast(result.message || "Registration failed", "error");
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-20">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-10">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <UserPlus className="w-8 h-8 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
                        Create <span className="text-red-500">Account</span>
                    </h1>
                    <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mt-2">
                        Join us for a premium shopping experience
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                        <div className="relative">
                            <input
                                type="text" required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full h-12 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 outline-none focus:border-red-500 focus:bg-white transition-all"
                                placeholder="Enter your name"
                            />
                            <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                        <div className="relative">
                            <input
                                type="email" required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full h-12 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 outline-none focus:border-red-500 focus:bg-white transition-all"
                                placeholder="name@example.com"
                            />
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                        <div className="relative">
                            <input
                                type="tel" required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full h-12 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 outline-none focus:border-red-500 focus:bg-white transition-all"
                                placeholder="01XXX-XXXXXX"
                            />
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
                        <div className="relative">
                            <input
                                type="password" required
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full h-12 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 outline-none focus:border-red-500 focus:bg-white transition-all"
                                placeholder="••••••••"
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                        </div>
                    </div>

                    <div className="space-y-2 pb-4">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type="password" required
                                value={formData.password_confirmation}
                                onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })}
                                className="w-full h-12 pl-12 pr-6 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-900 outline-none focus:border-red-500 focus:bg-white transition-all"
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
                        {isLoading ? "Creating Account..." : "Register Now"}
                    </button>
                </form>

                <div className="mt-10 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Already have an account?{" "}
                        <Link href="/login" className="text-red-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
