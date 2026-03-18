"use client";

import { ShoppingCart, ArrowUp, X, MessageCircle, Phone, MessageSquare, Gift } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect, useRef } from "react";
import { useGetHomeContentQuery } from "@/store/api/frontendApi";

export default function FloatingActionButtons() {
    const { data: homeContent } = useGetHomeContentQuery();
    const { openCart, cart } = useCart();
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isBannerMinimized, setIsBannerMinimized] = useState(false);

    // Persist banner state
    useEffect(() => {
        const savedMinimized = localStorage.getItem('alinggon_offer_minimized');
        if (savedMinimized === 'true') {
            setIsBannerMinimized(true);
        }
    }, []);

    const toggleBannerMinimize = (minimized: boolean) => {
        setIsBannerMinimized(minimized);
        localStorage.setItem('alinggon_offer_minimized', String(minimized));
    };
    const [isMounted, setIsMounted] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const showFreeDelivery = homeContent?.data?.free_delivery_status ?? true;
    const freeDeliveryText = homeContent?.data?.free_delivery_text || "৳500 কিনলে ফ্রি ডেলিভারি পাবেন!";

    const whatsappNumber = homeContent?.data?.chat_whatsapp_number || "8801726526155";
    const messengerLink = homeContent?.data?.chat_messenger_link || "https://m.me/";
    const contactPhone = homeContent?.data?.contact_phone || "01726526155";

    useEffect(() => {
        setIsMounted(true);
    }, []);

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

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsHelpOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            {/* Interactive Help Menu */}
            <div className="fixed bottom-32 left-6 lg:bottom-10 lg:left-10 z-[110] flex flex-col-reverse items-start gap-4" ref={menuRef}>
                {/* Main Toggle Button */}
                <button
                    onClick={() => setIsHelpOpen(!isHelpOpen)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 active:scale-95 group relative border-2 border-white/20 ${isHelpOpen ? 'bg-slate-900 border-red-500 scale-110' : 'bg-green-500 hover:bg-green-600 hover:-translate-y-2'}`}
                    aria-label="Contact Options"
                >
                    {isHelpOpen ? (
                        <X className="w-7 h-7 text-white animate-in fade-in zoom-in duration-300" />
                    ) : (
                        <MessageCircle className="w-7 h-7 text-white fill-current animate-in fade-in zoom-in duration-300" />
                    )}
                    
                    {!isHelpOpen && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                        </span>
                    )}
                </button>

                {/* Vertical Menu Items */}
                {isHelpOpen && (
                    <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-10 fade-in duration-500 ease-out">
                         {/* Call Option */}
                         <a
                            href={`tel:${contactPhone}`}
                            className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-red-100 group hover:bg-red-50 transition-all hover:translate-x-2"
                        >
                            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col min-w-[120px]">
                                <span className="text-[10px] font-black text-red-600 uppercase tracking-widest leading-none text-left">Direct Call</span>
                                <span className="text-xs font-black text-slate-800 uppercase tracking-tight text-left">{contactPhone}</span>
                            </div>
                        </a>

                        {/* WhatsApp Option */}
                        <a
                            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-green-100 group hover:bg-green-50 transition-all hover:translate-x-2"
                        >
                            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                                <MessageCircle className="w-5 h-5 fill-current" />
                            </div>
                            <div className="flex flex-col min-w-[120px]">
                                <span className="text-[10px] font-black text-green-600 uppercase tracking-widest leading-none text-left">WhatsApp</span>
                                <span className="text-xs font-black text-slate-800 uppercase tracking-tight text-left">Chat with us</span>
                            </div>
                        </a>

                        {/* Messenger Option */}
                        <a
                            href={messengerLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-blue-100 group hover:bg-blue-50 transition-all hover:translate-x-2"
                        >
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                                <MessageSquare className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col min-w-[120px]">
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none text-left">Messenger</span>
                                <span className="text-xs font-black text-slate-800 uppercase tracking-tight text-left">FB Messenger</span>
                            </div>
                        </a>
                    </div>
                )}
            </div>

            {/* Minimized Offer Toggle (Left Side) */}
            {isBannerMinimized && showFreeDelivery && (
                <div className="fixed bottom-48 left-6 lg:bottom-28 lg:left-10 z-[110] animate-in slide-in-from-left duration-500">
                    <button
                        onClick={() => toggleBannerMinimize(false)}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl border-2 border-red-100 hover:scale-110 transition-all group relative animate-bounce hover:animate-none"
                        aria-label="Show Offer"
                    >
                        <Gift className="w-6 h-6 text-red-600 group-hover:rotate-12 transition-transform" />
                   
                    </button>
                </div>
            )}

            {/* Free Delivery Promo Bubble (Left Side) - Always Visible until minimized */}
            {!isBannerMinimized && showFreeDelivery && (
                <div className="fixed bottom-48 left-6 lg:bottom-28 lg:left-10 z-[110] flex items-center gap-3 animate-in slide-in-from-left duration-500 pointer-events-auto">
                    <div className="bg-white px-4 py-3 rounded-2xl shadow-xl border border-red-700 flex items-center gap-3 relative group">
                        <button
                            onClick={() => toggleBannerMinimize(true)}
                            aria-label="Minimize promotion"
                            className="text-red-700 hover:text-red-600 transition-colors order-first"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-800 uppercase tracking-wide">
                                {freeDeliveryText.includes('৳500') ? (
                                    <>
                                        <span className="text-red-600">৳500</span> {freeDeliveryText.replace('৳500', '')}
                                    </>
                                ) : freeDeliveryText}
                            </span>
                        </div>

                        {/* Triangle Pointer (Left side) */}
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-white transform rotate-45 border-l border-b border-red-100 -z-10"></div>
                    </div>
                </div>
            )}

            <div className="fixed bottom-[100px] lg:bottom-[100px] right-6 z-[110] flex flex-col items-end gap-3 pointer-events-none mb-0">

                {/* Scroll To Top Button (Positioned Above) - Visible on Scroll */}
                {showScrollTop && (
                    <button
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                        className="w-10 h-10 bg-slate-900 hover:bg-black text-white rounded-full shadow-xl flex items-center justify-center transition-all hover:scale-110 pointer-events-auto active:scale-95 animate-in slide-in-from-bottom duration-300 mb-2"
                    >
                        <ArrowUp className="w-5 h-5" />
                    </button>
                )}

                {/* Empty container for potential future buttons */}
                <div className="flex mb-0 items-end gap-3 pointer-events-auto">
                </div>
            </div>
        </>
    );
}
