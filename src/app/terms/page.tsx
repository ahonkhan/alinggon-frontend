"use client";

import { FileText, ArrowLeft, RefreshCcw, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-16 md:py-24 space-y-16 font-not-not-sans-serif">
            <div className="text-center space-y-6">
                <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-400 transition-all mb-8 bg-gray-50 px-6 py-2 rounded-full border border-gray-100">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Dimension
                </Link>
                <div className="w-20 h-20 bg-slate-900 text-red-400 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl rotate-3">
                    <FileText className="w-10 h-10" />
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Terms of <span className="text-red-400">Access</span></h1>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] max-w-md mx-auto leading-relaxed">
                    The fundamental directives governing your interaction with the Alinggon Commerce Sub-system.
                </p>
            </div>

            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-16 space-y-12">
                <TermItem
                    title="01 • Account Establishment"
                    content="Users must provide authenticated coordinates for order fulfillment. You are responsible for maintaining the sanctity of your secret keys (passwords)."
                />
                <TermItem
                    title="02 • Transaction Protocol"
                    content="All orders placed through our node are subject to availability. Prices may fluctuate based on global supply metrics and market volatility."
                />
                <TermItem
                    title="03 • Logistics Fulfillment"
                    content="Delivery timelines are estimated based on current transit intelligence. Alinggon is not liable for delays caused by atmospheric conditions or regional disruptions."
                />
                <TermItem
                    title="04 • Behavioral Directives"
                    content="Any attempt to compromise the integrity of our digital infrastructure or exploit system vulnerabilities will result in immediate identity termination."
                />
            </div>

            <div className="text-center">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em]">Codified: Jan 2026 • Access Protocol v2.1</p>
            </div>
        </main>
    );
}

function TermItem({ title, content }: any) {
    return (
        <div className="space-y-4">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter border-b border-gray-50 pb-2 flex items-center gap-3">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                {title}
            </h3>
            <p className="text-sm font-medium text-gray-500 leading-relaxed uppercase tracking-tight">
                {content}
            </p>
        </div>
    );
}
