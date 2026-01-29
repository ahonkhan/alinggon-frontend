"use client";

import { Phone, Clock, Check, Package, ArrowLeft, ShieldCheck, MapPin, Search } from "lucide-react";
import Link from "next/link";

export default function TrackOrder() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 bg-red-50 text-red-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                    <Search className="w-3.5 h-3.5" /> Satellite Tracking Enabled
                </div>
                <h1 className="text-5xl font-extrabold text-slate-900 tracking-tighter uppercase leading-tight">
                    Track Your <span className="text-red-400">Payload</span>
                </h1>
                <p className="text-gray-400 font-medium max-w-lg mx-auto uppercase text-xs tracking-widest leading-relaxed">
                    Input your authenticated phone number to visualize your package status in realtime.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Tracking Card */}
                <div className="lg:col-span-5 bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-slate-200/50 sticky top-32">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Identity Verification</label>
                            <div className="relative group">
                                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-red-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="01XXXXXXXXX"
                                    className="w-full h-16 pl-14 pr-6 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-red-400 focus:bg-white text-lg font-black text-slate-900 transition-all font-sans outline-none shadow-inner"
                                />
                            </div>
                        </div>
                        <button className="w-full bg-slate-900 hover:bg-red-400 text-white font-black h-16 rounded-2xl transition-all shadow-xl hover:shadow-red-200 uppercase tracking-widest text-xs flex items-center justify-center gap-3 active:scale-95 group">
                            Begin Tracking <ArrowLeft className="w-4 h-4 rotate-180 group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div className="pt-4 grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-green-500" />
                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">Secure Link</span>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-3">
                                <Package className="w-5 h-5 text-blue-500" />
                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-tighter">Global Ops</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Simulation */}
                <div className="lg:col-span-7 space-y-10">
                    {/* Order Identity Card */}
                    <div className="bg-slate-900 p-8 rounded-[2rem] text-white flex justify-between items-center shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
                        <div className="space-y-1 relative z-10">
                            <span className="text-[10px] font-black text-red-400 uppercase tracking-widest leading-none">Order ID</span>
                            <h2 className="text-2xl font-black tracking-tighter uppercase px-1">#ORD-55214BD</h2>
                        </div>
                        <div className="text-right relative z-10">
                            <span className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none">Net Value</span>
                            <h2 className="text-2xl font-black text-red-400 font-sans tracking-tighter underline underline-offset-8 decoration-white/10 decoration-2">৳ 1,250.00</h2>
                        </div>
                    </div>

                    {/* Timeline Wrapper */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-slate-200/30 overflow-hidden relative">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="font-black text-slate-900 uppercase tracking-tighter flex items-center gap-3">
                                <Clock className="w-6 h-6 text-red-400" /> Transit Timeline
                            </h3>
                            <div className="px-3 py-1 bg-green-50 text-green-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-100">
                                Live Feed
                            </div>
                        </div>

                        <div className="relative space-y-12 pl-12 before:absolute before:left-[1.45rem] before:top-2 before:bottom-2 before:w-[3px] before:bg-gray-100 before:rounded-full">

                            <TimelineStep
                                label="Order Authenticated"
                                desc="Transaction validated on Jan 20, 2026 at 10:30 AM"
                                status="completed"
                            />
                            <TimelineStep
                                label="Logistics Processing"
                                desc="We are architecting the shipping route and packaging."
                                status="active"
                                tag="Current Status"
                            />
                            <TimelineStep
                                label="In Transit"
                                desc="Handed over to satellite-tracked delivery partner."
                                status="pending"
                            />
                            <TimelineStep
                                label="Final Delivery"
                                desc="Package reaches authenticated destination."
                                status="pending"
                            />
                        </div>
                    </div>

                    {/* Address Intelligence */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg shadow-slate-200/20 group">
                            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-red-400" /> Destination
                            </h4>
                            <p className="text-sm font-black text-slate-800 leading-relaxed uppercase group-hover:text-red-400 transition-colors">
                                Karim Ullah<br />
                                <span className="text-gray-400 font-bold block mt-3 leading-loose">
                                    House 24, Road 7, Block D<br />
                                    Mirpur 10, Dhaka
                                </span>
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-lg shadow-slate-200/20 flex flex-col justify-between">
                            <div>
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <Package className="w-4 h-4 text-red-400" /> Logistics Hub
                                </h4>
                                <p className="text-sm font-black text-slate-900 uppercase">Pathao Courier</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">ID: PT-10022354</p>
                            </div>
                            <button className="text-[10px] font-black text-red-400 hover:text-red-500 uppercase tracking-widest mt-6 bg-red-50 self-start px-4 py-2 rounded-xl transition-all">
                                Support Link
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function TimelineStep({ label, desc, status, tag }: any) {
    const isCompleted = status === "completed";
    const isActive = status === "active";

    return (
        <div className="relative group">
            <div className={`absolute -left-12 w-8 h-8 rounded-2xl flex items-center justify-center border-4 border-white shadow-xl z-20 transition-all duration-500 ${isCompleted ? "bg-green-500 text-white" :
                    isActive ? "bg-red-400 text-white ring-8 ring-red-50/50 animate-pulse" :
                        "bg-gray-100 text-gray-300"
                }`}>
                {isCompleted ? <Check className="w-4 h-4" strokeWidth={3} /> : <div className="w-2 h-2 bg-current rounded-full"></div>}
            </div>
            <div className={`space-y-1.5 transition-all duration-500 ${!isCompleted && !isActive ? "opacity-30 blur-[0.5px]" : ""}`}>
                <h4 className={`text-sm font-black uppercase tracking-tighter ${isActive ? "text-red-400" : "text-slate-800"}`}>
                    {label}
                </h4>
                <p className="text-xs font-bold text-gray-400 leading-snug">
                    {desc}
                </p>
                {tag && (
                    <span className="inline-block px-3 py-1 bg-red-50 text-red-400 text-[9px] font-black rounded-full uppercase tracking-widest mt-2 border border-red-100">
                        {tag}
                    </span>
                )}
            </div>
        </div>
    );
}
