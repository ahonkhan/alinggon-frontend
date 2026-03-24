"use client";

import { RefreshCcw, CreditCard, ShieldAlert, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RefundPolicy() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-16 md:py-24 space-y-16 font-not-not-sans-serif">
            <div className="text-center space-y-6">
                <Link href="/" className="inline-flex items-center gap-2 text-[13px] font-black text-gray-800 uppercase tracking-widest hover:text-red-400 transition-all mb-8 bg-gray-50 px-6 py-2 rounded-full border border-gray-100">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Dimension
                </Link>
                <div className="w-20 h-20 bg-red-400 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl rotate-6 animate-pulse">
                    <RefreshCcw className="w-10 h-10" />
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Refund <span className="text-red-400">Policy</span></h1>
                <p className="text-gray-800 font-bold uppercase text-[13px] tracking-[0.3em] max-w-md mx-auto leading-relaxed">
                    Our financial return architecture and process for reclaiming transactional value.
                </p>
            </div>

            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-16 space-y-12">
                <PolicySection
                    icon={ShieldAlert}
                    title="Eligibility Window"
                    content="Refund logic can be initiated within 15 Earth cycles from payload delivery. Items must remain uncompromised."
                />
                <PolicySection
                    icon={RefreshCcw}
                    title="Processing Framework"
                    content="Once the returned payload clears our physical inspection, the refund packet is transmitted within 3-5 business phases."
                />
                <PolicySection
                    icon={CreditCard}
                    title="Value Destination"
                    content="Reimbursement is strictly routed back to the origin payment vector to maintain financial security."
                />
                <PolicySection
                    icon={FileText}
                    title="Restocking Fees"
                    content="Standard objects carry no penalty. Premium hardware may incur a 10% structural resetting fee based on usage."
                />
            </div>

            <div className="text-center">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em]">Last Updated: Jan 2026 • Financial Version 1.5.2</p>
            </div>
        </main>
    );
}

function PolicySection({ icon: Icon, title, content }: any) {
    return (
        <div className="flex gap-8 group">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-slate-800 border border-gray-100 group-hover:bg-red-400 group-hover:text-white transition-all flex-shrink-0">
                <Icon className="w-6 h-6" />
            </div>
            <div className="space-y-3">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter group-hover:text-red-400 transition-colors">{title}</h3>
                <p className="text-sm font-medium text-gray-500 leading-relaxed uppercase tracking-tight">{content}</p>
            </div>
        </div>
    );
}
