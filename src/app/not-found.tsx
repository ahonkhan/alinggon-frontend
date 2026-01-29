"use client";

import { ShoppingBag, Home, Search, Heart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
    const pathname = usePathname();

    return (
        <main className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-700">
                <div className="relative">
                    <h1 className="text-[12rem] font-black text-slate-100 leading-none select-none">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-red-400 p-6 rounded-[2.5rem] shadow-2xl shadow-red-200 rotate-12 animate-bounce-slow">
                            <ShoppingBag className="w-16 h-16 text-white" />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Object Not Found</h2>
                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] max-w-xs mx-auto leading-relaxed">
                        The resource you are looking for has been moved or does not exist in our current dimension.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Link href="/" className="flex items-center justify-center gap-2 bg-slate-900 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-red-400 transition-all active:scale-95">
                        <Home className="w-4 h-4" /> Go Home
                    </Link>
                    <Link href="/shop" className="flex items-center justify-center gap-2 border-2 border-slate-100 text-slate-500 font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:border-red-400 hover:text-red-400 transition-all active:scale-95">
                        <Search className="w-4 h-4" /> Browse Shop
                    </Link>
                </div>

                <div className="pt-8 flex items-center justify-center gap-6 opacity-40">
                    <Heart className="w-5 h-5 text-gray-400" />
                    <User className="w-5 h-5 text-gray-400" />
                    <ShoppingBag className="w-5 h-5 text-gray-400" />
                </div>
            </div>
        </main>
    );
}
