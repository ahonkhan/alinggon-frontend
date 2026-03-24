"use client";

import { Truck, Clock, MapPin, Globe, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ShippingGrid() {
    return (
        <main className="max-w-4xl mx-auto px-4 py-16 md:py-24 space-y-16 font-not-not-sans-serif">
            <div className="text-center space-y-6">
                <Link href="/" className="inline-flex items-center gap-2 text-[13px] font-black text-gray-800 uppercase tracking-widest hover:text-red-400 transition-all mb-8 bg-gray-50 px-6 py-2 rounded-full border border-gray-100">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Dimension
                </Link>
                <div className="w-20 h-20 bg-red-400 text-white rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl rotate-6 animate-pulse">
                    <Truck className="w-10 h-10" />
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Shipping <span className="text-red-400">Grid</span></h1>
                <p className="text-gray-800 font-bold uppercase text-[13px] tracking-[0.3em] max-w-md mx-auto leading-relaxed">
                    Detailed logistical matrix for object delivery and transport timelines across our coverage zones.
                </p>
            </div>

            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl p-8 md:p-16 space-y-12">
                <PolicySection
                    icon={Clock}
                    title="Standard Processing"
                    content="All verified orders are processed within 24-48 hours. Dispatch occurs upon final security and quality clearance."
                />
                <PolicySection
                    icon={Truck}
                    title="Domestic Transport"
                    content="Local fulfillment utilizes our rapid overland network, typically arriving within 2 to 5 standard Earth cycles."
                />
                <PolicySection
                    icon={MapPin}
                    title="Remote Coordinates"
                    content="Delivery to far-reaching zones may require specialized routing, extending fulfillment time by an additional 72 hours."
                />
                <PolicySection
                    icon={Globe}
                    title="International Dispatch"
                    content="Global transport routes are subject to customs clearance and international air grid constraints. Tracking is mandatory."
                />
            </div>

            <div className="text-center">
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.4em]">Last Updated: Jan 2026 • Logistics Version 2.1.0</p>
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
