"use client";

import { useState, useEffect } from "react";
import { X, User, Mail, Phone, Loader2 } from "lucide-react";
import { useUpdateProfileMutation } from "@/store/api/frontendApi";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

interface EditProfileModalProps {
    user: any;
    isOpen: boolean;
    onClose: () => void;
}

export default function EditProfileModal({ user, isOpen, onClose }: EditProfileModalProps) {
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();
    const { updateUser } = useAuth();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone || "");
        }
    }, [user]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await updateProfile({ name, email, phone }).unwrap();
            if (response.success) {
                updateUser(response.user);
            }
            toast.success("Profile updated successfully");
            onClose();
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update profile");
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Edit Profile</h2>
                        <p className="text-[10px] font-black text-gray-800 uppercase tracking-[0.2em] mt-1">Update your account info</p>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-white rounded-2xl transition-colors text-gray-800 hover:text-red-500 shadow-sm border border-transparent hover:border-red-100">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-800 uppercase tracking-widest ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800" />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-sm font-black text-slate-700 transition-all outline-none"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-800 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-sm font-black text-slate-700 transition-all outline-none"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-800 uppercase tracking-widest ml-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-800" />
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white rounded-2xl py-4 pl-12 pr-4 text-sm font-black text-slate-700 transition-all outline-none"
                                placeholder="Enter your phone"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-red-400 hover:bg-slate-900 text-white font-black py-5 rounded-[2rem] text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-red-200/50 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
