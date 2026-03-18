"use client";

import { useState } from "react";
import { Lock, Loader2, ShieldCheck, KeyRound } from "lucide-react";
import { useChangePasswordMutation } from "@/store/api/frontendApi";
import { toast } from "react-hot-toast";

export default function SecuritySettings() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== passwordConfirmation) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            await changePassword({ current_password: currentPassword, password, password_confirmation: passwordConfirmation }).unwrap();
            toast.success("Password changed successfully");
            setCurrentPassword("");
            setPassword("");
            setPasswordConfirmation("");
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to change password");
        }
    };

    return (
        <div className="bg-white rounded-[2rem] border border-gray-100 p-8 md:p-12 shadow-xl shadow-slate-200/30">
            <div className="flex items-center gap-4 mb-10">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-400">
                    <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Security Settings</h3>
                    <p className="text-[10px] font-black text-gray-800 uppercase tracking-widest mt-0.5">Protect your account</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md space-y-6">
                <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-800 uppercase tracking-widest ml-1">Current Password</label>
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800" />
                        <input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-sm font-black text-slate-700 transition-all outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-800 uppercase tracking-widest ml-1">New Password</label>
                    <div className="relative">
                        <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-sm font-black text-slate-700 transition-all outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-800 uppercase tracking-widest ml-1">Confirm New Password</label>
                    <div className="relative">
                        <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800" />
                        <input
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            className="w-full bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-sm font-black text-slate-700 transition-all outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-slate-900 hover:bg-red-400 text-white font-black px-10 py-4 rounded-2xl text-xs uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            "Update Password"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
