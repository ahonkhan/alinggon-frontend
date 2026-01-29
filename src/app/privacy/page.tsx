"use client";

import { Shield, Lock, Eye, FileText, ArrowLeft, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-16 md:py-24 space-y-16 font-not-not-sans-serif">
            <div className="text-center space-y-6">
                <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-400 transition-all mb-8 bg-gray-50 px-6 py-2 rounded-full border border-gray-100">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Dimension
                </Link>
                <div className="w-20 h-20 bg-red-400 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl rotate-6 animate-pulse">
                    <Shield className="w-10 h-10" />
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Privacy <span className="text-red-400">Protocol</span></h1>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] max-w-md mx-auto leading-relaxed">
                    Architecting the protection of your digital presence and transactional intelligence within the Alinggon Ecosystem.
                </p>
            </div>

            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-16 space-y-12">
                <PolicySection
                    icon={Eye}
                    title="Data Acquisition"
                    content="We collect only the essential telemetry required for logistical fulfillment, including your authenticated identity, contact coordinates, and transaction history."
                />
                <PolicySection
                    icon={Lock}
                    title="Encryption Standard"
                    content="All data packets are processed through end-to-end encrypted tunnels. We do not store sensitive payment vectors on our primary servers."
                />
                <PolicySection
                    icon={RefreshCcw}
                    title="Data Governance"
                    content="You maintain absolute sovereignty over your profile data. You may request identity deletion or data modification at any point through our centralized support node."
                />
                <PolicySection
                    icon={FileText}
                    title="Third-Party Nodes"
                    content="Logistics data is shared only with verified delivery partners necessary for the physical manifestation of your ordered objects."
                />
            </div>

            <div className="text-center">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em]">Last Updated: Jan 2026 • Security Version 1.0.4</p>
            </div>
        </main>
    );
}

function PolicySection({ icon: Icon, title, content }: any) {
    return (
        <div className="flex gap-8 group">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-slate-400 border border-gray-100 group-hover:bg-red-400 group-hover:text-white transition-all flex-shrink-0">
                <Icon className="w-6 h-6" />
            </div>
            <div className="space-y-3">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter group-hover:text-red-400 transition-colors">{title}</h3>
                <p className="text-sm font-medium text-gray-500 leading-relaxed uppercase tracking-tight">{content}</p>
            </div>
        </div>
    );
}
