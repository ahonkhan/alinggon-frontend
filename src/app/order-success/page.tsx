"use client";

import { CheckCircle, Package, ArrowRight, Home, ShoppingBag, Download } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("id") || "ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase();

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50/50">
            <div className="max-w-2xl w-full">
                <div className="bg-white rounded-[3rem] border border-gray-100 shadow-2xl shadow-slate-200/50 overflow-hidden relative p-8 md:p-16 text-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-50"></div>

                    <div className="relative z-10 space-y-8">
                        <div className="w-24 h-24 bg-green-100 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-xl shadow-green-100 relative group">
                            <CheckCircle className="w-12 h-12 text-green-500 animate-in zoom-in duration-500" />
                            <div className="absolute inset-0 bg-green-400 rounded-[2.5rem] scale-90 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        </div>

                        <div className="space-y-3">
                            <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                                Order <span className="text-green-500">Confirmed!</span>
                            </h1>
                            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                                Your transaction was successful
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-4">
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-gray-400">
                                <span>Order Reference</span>
                                <span className="text-slate-900">#{orderId}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-gray-400">
                                <span>Status</span>
                                <span className="text-green-500 bg-green-50 px-3 py-1 rounded-full text-[9px]">Verified</span>
                            </div>
                            <div className="h-px bg-gray-100 w-full my-4"></div>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed">
                                We have received your order and are now processing the logistics. An authenticated confirmation message will be sent to your device shortly.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Link href={`/orders/${orderId}`} className="flex items-center justify-center gap-3 bg-slate-900 text-white font-black py-5 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-red-400 transition-all active:scale-95 shadow-xl">
                                <Package className="w-4 h-4" /> View Order details
                            </Link>
                            <button className="flex items-center justify-center gap-3 border-2 border-slate-100 text-slate-500 font-black py-5 rounded-2xl text-[10px] uppercase tracking-widest hover:border-red-400 hover:text-red-400 transition-all active:scale-95">
                                <Download className="w-4 h-4" /> Download Invoice
                            </button>
                        </div>

                        <div className="pt-8">
                            <Link href="/shop" className="inline-flex items-center gap-2 text-[10px] font-black text-red-400 hover:text-red-500 uppercase tracking-[0.2em] group">
                                <ShoppingBag className="w-4 h-4" />
                                Continue Shopping
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex items-center justify-center gap-8 opacity-30">
                    <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div> Fast Logistics
                    </div>
                    <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div> Secure Checkout
                    </div>
                    <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest">
                        <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div> 24/7 Priority
                    </div>
                </div>
            </div>
        </main>
    );
}

export default function OrderSuccess() {
    return (
        <Suspense fallback={<div>Processing Receipt...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
