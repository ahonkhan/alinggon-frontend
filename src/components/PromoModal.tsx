"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function PromoModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show modal on load
        const showTimeout = setTimeout(() => {
            setIsOpen(true);
        }, 1000); // Small delay for better UX

        // Auto-close after 30 seconds
        const autoCloseTimeout = setTimeout(() => {
            setIsOpen(false);
        }, 310000000); // 30s + 1s delay

        return () => {
            clearTimeout(showTimeout);
            clearTimeout(autoCloseTimeout);
        };
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500">
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    aria-label="Close modal"
                    className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/20 active:scale-90"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Ads Image */}
                <div className="relative h-[200px] md:h-[300px] w-full">
                    <img
                        src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1200"
                        alt="Promotional Offer"
                        className="w-full h-full object-cover"
                    />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-12">
                        <span className="text-red-600 text-xs font-black uppercase tracking-[0.4em] mb-2">Flash Offer</span>
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none mb-4">
                            Premium Savings<br />Up to <span className="text-red-600">50% Off</span>
                        </h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-fit bg-red-600 hover:bg-white hover:text-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95"
                        >
                            Claim Discount
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
