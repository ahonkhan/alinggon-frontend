"use client";

import { Camera, Edit3, Lock, MapPin, ShoppingBag, User as UserIcon, Phone, Mail, ChevronRight, Package, CreditCard, LogOut } from "lucide-react";
import Link from "next/link";
import AccountSidebar from "@/components/AccountSidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
    const { user, logout } = useAuth();
    const router = useRouter();

    // Redirect to login if not logged in
    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user, router]);

    if (!user) return null;

    return (
        <main className="max-w-7xl mx-auto px-4 py-12 md:py-20 bg-gray-50/30">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                <AccountSidebar />

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-10">

                    {/* Header Card */}
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl shadow-slate-200/50 p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50/50 rounded-full blur-3xl -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-50/30 rounded-full blur-2xl -ml-16 -mb-16"></div>

                        <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left">
                            <div className="relative group">
                                <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-100 rounded-[2.5rem] flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
                                    <UserIcon className="w-16 h-16 text-gray-300" />
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-red-400 p-3 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform cursor-pointer">
                                    <Camera className="w-5 h-5" />
                                </div>
                            </div>

                            <div className="flex-1 space-y-8">
                                <div className="space-y-2">
                                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">{user.name}</h1>
                                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">{user.email}</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                            <Phone className="w-3 h-3 text-red-400" /> Phone Number
                                        </label>
                                        <p className="text-lg font-black text-slate-700 font-sans tracking-tight">{user.phone}</p>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                            <MapPin className="w-3 h-3 text-red-400" /> Shipping Address
                                        </label>
                                        <button className="text-sm font-black text-red-400 hover:text-red-500 flex items-center gap-1 group">
                                            Add Address <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-4 pt-4">
                                    <button className="bg-red-400 hover:bg-red-500 text-white font-black px-8 py-3.5 rounded-2xl text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-200/50 flex items-center gap-2 active:scale-95">
                                        <Edit3 className="w-4 h-4" /> Edit Profile
                                    </button>
                                    <button
                                        onClick={() => {
                                            logout();
                                            router.push("/");
                                        }}
                                        className="bg-slate-900 hover:bg-red-400 text-white font-black px-8 py-3.5 rounded-2xl text-xs uppercase tracking-widest transition-all shadow-xl flex items-center gap-2 active:scale-95"
                                    >
                                        <LogOut className="w-4 h-4" /> Sign Out
                                    </button>
                                </div>
                            </div>

                            {/* Metrics Mini Box */}
                            <div className="hidden md:block w-px h-48 bg-gray-100 self-center"></div>

                            <div className="w-full md:w-56 space-y-4">
                                <h3 className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-widest text-center">Platform Status</h3>
                                <MetricCard icon={Package} label="Total Orders" value="0" color="bg-blue-50 text-blue-500" />
                                <MetricCard icon={CreditCard} label="Spent Amount" value="৳ 0" color="bg-green-50 text-green-500" />
                            </div>
                        </div>
                    </div>

                    {/* Account Settings Mini-Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-xl shadow-slate-200/30">
                            <h3 className="text-xs font-black text-slate-800 mb-6 uppercase tracking-widest border-b border-gray-50 pb-4">Security Settings</h3>
                            <ul className="space-y-4">
                                <SecurityItem icon={Lock} label="Change Password" sub="Keep your account safe" />
                                <SecurityItem icon={MapPin} label="Manage Addresses" sub="Setup your delivery zones" />
                            </ul>
                        </div>
                        <div className="bg-white rounded-[2rem] border border-gray-100 p-8 shadow-xl shadow-slate-200/30">
                            <h3 className="text-xs font-black text-slate-800 mb-6 uppercase tracking-widest border-b border-gray-50 pb-4">Preferences</h3>
                            <ul className="space-y-4">
                                <SecurityItem icon={Mail} label="Email Notifications" sub="Get updates on your orders" />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function MetricCard({ icon: Icon, label, value, color }: any) {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between group hover:border-red-100 transition-colors">
            <div className={`p-2 rounded-xl scale-90 ${color}`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="text-right">
                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter leading-none mb-1">{label}</p>
                <p className="text-base font-black text-slate-700 tracking-tighter">{value}</p>
            </div>
        </div>
    );
}

function SecurityItem({ icon: Icon, label, sub }: any) {
    return (
        <li className="group cursor-pointer">
            <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-red-50 group-hover:text-red-400 transition-colors">
                    <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <p className="text-xs font-black text-slate-800 uppercase tracking-tight group-hover:text-red-500 transition-colors">{label}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{sub}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:translate-x-1 transition-transform group-hover:text-red-400" />
            </div>
        </li>
    );
}
