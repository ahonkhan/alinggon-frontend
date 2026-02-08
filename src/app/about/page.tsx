"use client";

import React from "react";
import { Facebook, Mail, Phone, ExternalLink, ShieldCheck, Award, MessageCircle } from "lucide-react";

export default function AboutAdmin() {
    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center pt-24 pb-12 px-4 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-slate-900 via-slate-800 to-gray-50 -z-10" />
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-red-400/10 rounded-full blur-[120px] -mr-48" />
            <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-red-400/5 rounded-full blur-[120px] -ml-48" />

            {/* Profile Card Container */}
            <div className="max-w-4xl w-full bg-white rounded-[3rem] shadow-2xl shadow-slate-200/50 border border-gray-100 p-8 md:p-16 relative">
                {/* Header Profile Section */}
                <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
                    <div className="relative group">
                        <div className="w-48 h-48 rounded-[2.5rem] bg-slate-900 flex items-center justify-center overflow-hidden border-4 border-white shadow-2xl relative z-10">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=AlinggonAdmin"
                                alt="Admin Profile"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                        <div className="absolute -bottom-4 -right-4 bg-red-400 text-white p-3 rounded-2xl shadow-xl z-20 border-4 border-white">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-4">
                        <div className="inline-flex items-center gap-2 bg-red-50 text-red-500 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
                            Official Administrator
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                            Alinggon <span className="text-red-400">Admin</span>
                        </h1>
                        <p className="text-slate-500 font-bold text-sm tracking-tight leading-relaxed max-w-lg">
                            Architecting the future of premium digital commerce. Dedicated to providing an authenticated shopping sequence for the modern explorer.
                        </p>
                    </div>
                </div>

                {/* Stats / Badges Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {[
                        { icon: Award, label: "Verified", value: "ADMIN" },
                        { icon: MessageCircle, label: "Response", value: "FAST" },
                        { icon: ShieldCheck, label: "Trusted", value: "GLOBAL" },
                        { icon: ExternalLink, label: "Connect", value: "DIRECT" },
                    ].map((item, i) => (
                        <div key={i} className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center gap-2 group hover:bg-white hover:shadow-xl transition-all">
                            <item.icon className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform" />
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</div>
                            <div className="text-sm font-black text-slate-900">{item.value}</div>
                        </div>
                    ))}
                </div>

                {/* Social & Contact Section */}
                <div className="space-y-8">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter border-l-4 border-red-400 pl-4">Digital Pulse & Identity</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Facebook Link Card */}
                        <a
                            href="https://www.facebook.com/share/1N4Y5vx3Jf/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-slate-900 text-white p-8 rounded-[2rem] flex items-center justify-between group hover:bg-black transition-all shadow-xl shadow-slate-900/20"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center">
                                    <Facebook className="w-8 h-8" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Official Profile</div>
                                    <div className="text-lg font-black uppercase tracking-tighter">Facebook Link</div>
                                </div>
                            </div>
                            <ExternalLink className="w-6 h-6 text-white/20 group-hover:text-red-400 transition-colors" />
                        </a>

                        {/* Contact Details Card */}
                        <div className="bg-red-50 border border-red-100 p-8 rounded-[2rem] space-y-4">
                            <div className="flex items-center gap-4 text-slate-700">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-400 shadow-sm">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div className="font-black text-xs uppercase tracking-widest">+97336781645</div>
                            </div>
                            <div className="flex items-center gap-4 text-slate-700">
                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-400 shadow-sm">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="font-black text-xs uppercase tracking-widest">alinggonshop@gmail.com</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Quote */}
                <div className="mt-20 pt-12 border-t border-gray-100 text-center">
                    <p className="text-slate-300 font-bold text-xs uppercase tracking-[0.3em] inline-block px-8 py-3 bg-gray-50 rounded-full">
                        Curating Excellence Since 2026
                    </p>
                </div>
            </div>
        </main>
    );
}
