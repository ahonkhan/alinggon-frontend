"use client";

import { Mail, Phone, Truck, Store } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
    
    return (
        <div className="bg-slate-900 text-white text-[10px] font-black py-2 hidden md:block uppercase tracking-widest border-b border-white/5">
            <div className="max-w-[1600px] mx-auto px-4 flex justify-between items-center">
                <div className="flex items-center space-x-6">
                    <span className="opacity-40">Welcome to Alinggon Prime</span>
                    <span className="flex items-center gap-2 hover:text-red-400 cursor-pointer transition-colors">
                        <Mail className="w-3 h-3 text-red-100" /> alinggonshop@gmail.com
                    </span>
                </div>
                <div className="flex items-center space-x-6">
                    <span className="flex items-center gap-2 hover:text-red-400 cursor-pointer transition-colors">
                        <Phone className="w-3 h-3 text-red-100" /> +97336781645
                    </span>
                    <Link
                        href="/tracking"
                        className="flex items-center gap-2 text-red-400 hover:text-white transition-colors"
                    >
                        <Truck className="w-3 h-3" /> Track Order
                    </Link>

                    <span className="opacity-20 hidden md:block">/</span>

                    <a
                        href="https://alinggon-admin.rangpurit.com/vendor/register"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-red-400 hover:text-white transition-colors"
                    >
                        <Store className="w-3 h-3" /> Become Vendor
                    </a>

                    <div className="h-3 w-[1px] bg-white/10 mx-2"></div>

                   
                </div>
            </div>
        </div>
    );
}
