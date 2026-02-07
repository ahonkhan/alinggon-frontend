"use client";

import { Mail, Phone, Truck } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
    return (
        <div className="bg-slate-900 text-white text-[10px] font-black py-2 hidden md:block uppercase tracking-widest border-b border-white/5">
            <div className="max-w-[1600px] mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <span className="opacity-40">Welcome to Alinggon Prime</span>
                    <span className="flex items-center gap-2 hover:text-red-400 cursor-pointer transition-colors">
                        <Mail className="w-3 h-3 text-red-400" /> contact@alinggon.com
                    </span>
                </div>
                <div className="flex items-center space-x-6">
                    <span className="flex items-center gap-2 hover:text-red-400 cursor-pointer transition-colors">
                        <Phone className="w-3 h-3 text-red-400" /> +8801821772211
                    </span>
                    <Link
                        href="/track-order"
                        className="flex items-center gap-2 text-red-400 hover:text-white transition-colors"
                    >
                        <Truck className="w-3 h-3" /> Track Order
                    </Link>
                </div>
            </div>
        </div>
    );
}
