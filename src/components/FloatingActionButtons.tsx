"use client";

import { ShoppingCart, ArrowUp, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";

export default function FloatingActionButtons() {
    const { openCart, cart } = useCart();
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isPromoDismissed, setIsPromoDismissed] = useState(false);

    // Toggle scroll top button visibility based on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-none">

            {/* Scroll To Top Button (Positioned Above) - Visible on Scroll */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="w-10 h-10 bg-slate-900 hover:bg-black text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 pointer-events-auto active:scale-95 animate-in slide-in-from-bottom duration-300 mb-2"
                >
                    <ArrowUp className="w-5 h-5" />
                </button>
            )}

            <div className="flex items-end gap-3 pointer-events-auto">
                {/* Free Delivery Promo Bubble - Always Visible until dismissed */}
                {!isPromoDismissed && (
                    <div className="bg-white px-4 py-3 rounded-2xl shadow-xl border border-red-100 flex items-center gap-3 animate-in slide-in-from-right duration-500 relative group">
                        <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                                <span className="text-red-500">৳500</span> কিনলে ফ্রি ডেলিভারি পাবেন!
                            </span>
                        </div>
                        <button
                            onClick={() => setIsPromoDismissed(true)}
                            className="text-gray-300 hover:text-red-400 transition-colors"
                        >
                            <X className="w-3 h-3" />
                        </button>

                        {/* Triangle Pointer */}
                        <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white transform rotate-45 border-r border-t border-red-100 -z-10"></div>
                    </div>
                )}

                {/* Floating Cart Button - Always Visible */}
                <button
                    onClick={openCart}
                    className="w-14 h-14 bg-red-400 hover:bg-red-500 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 relative active:scale-95 border-2 border-white/20"
                >
                    <ShoppingCart className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                        {cart.length}
                    </span>
                </button>
            </div>
        </div>
    );
}
