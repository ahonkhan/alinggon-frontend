"use client";

import { RefreshCcw, ArrowLeft, CheckCircle2, Package, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Returns() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-16 md:py-24 space-y-16 font-not-not-sans-serif">
            <div className="text-center space-y-6">
                <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-400 transition-all mb-8 bg-gray-50 px-6 py-2 rounded-full border border-gray-100">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Dimension
                </Link>
                <div className="w-20 h-20 bg-green-500 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl -rotate-6">
                    <RefreshCcw className="w-10 h-10" />
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Return <span className="text-green-500">Logic</span></h1>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] max-w-md mx-auto leading-relaxed">
                    Standard operating procedures for object reversal and credit restoration.
                </p>
            </div>

            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-16 space-y-12">
                <ReturnStep
                    step="01"
                    title="Initiate Request"
                    desc="You have 7 rotations (days) from the moment of object manifestation to initiate a reversal protocol."
                />
                <ReturnStep
                    step="02"
                    title="Object Condition"
                    desc="The item must remain in its original structural integrity, with all authenticated tags and packaging intact."
                />
                <ReturnStep
                    step="03"
                    title="Logistics Reversal"
                    desc="Pack the item securely. Our logistics partner will execute a retrieval from your authenticated destination."
                />
                <ReturnStep
                    step="04"
                    title="Credit Restoration"
                    desc="Once the object is verified at our hub, your credit will be restored within 3-5 business rotations."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TrustIcon icon={Package} label="Original Seal" />
                <TrustIcon icon={Truck} label="Free Retrieval" />
                <TrustIcon icon={ShieldCheck} label="Secured Credit" />
            </div>

            <div className="text-center pt-8">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em]">Policy Version 3.4.0 • Updated Jan 2026</p>
            </div>
        </main>
    );
}

function ReturnStep({ step, title, desc }: any) {
    return (
        <div className="flex gap-8 group">
            <div className="text-3xl font-black text-slate-100 group-hover:text-red-400 transition-colors select-none">{step}</div>
            <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{title}</h3>
                <p className="text-sm font-medium text-gray-400 uppercase tracking-tight leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function TrustIcon({ icon: Icon, label }: any) {
    return (
        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 text-center space-y-3">
            <Icon className="w-8 h-8 text-green-500 mx-auto" />
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</p>
        </div>
    );
}
