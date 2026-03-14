"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useGetHomeContentQuery } from "@/store/api/frontendApi";

export default function PromoModal() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: homeContent } = useGetHomeContentQuery();
    
    // Only show if the popup is enabled in settings and we have an image
    const popupStatus = homeContent?.data?.popup_status;
    const popupImage = homeContent?.data?.popup_image;
    const overlayStatus = homeContent?.data?.popup_overlay_status;
    const overlayColor = homeContent?.data?.popup_overlay_color;
    
    useEffect(() => {
        if (popupStatus && popupImage) {
            // Show modal on load
            const showTimeout = setTimeout(() => {
                setIsOpen(true);
            }, 1000); // Small delay for better UX

            // Auto-close after 30 seconds
            const autoCloseTimeout = setTimeout(() => {
                setIsOpen(false);
            }, 30000); // 30s

            return () => {
                clearTimeout(showTimeout);
                clearTimeout(autoCloseTimeout);
            };
        }
    }, [popupStatus, popupImage]);

    if (!isOpen || !popupStatus || !popupImage) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/80  animate-in fade-in duration-300">
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
                        src={popupImage}
                        alt="Promotional Offer"
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay Color */}
                    {overlayStatus && (
                        <div 
                            className="absolute inset-0 z-[1]" 
                            style={{ backgroundColor: overlayColor || 'rgba(0,0,0,0.5)', opacity: 0.5 }}
                        ></div>
                    )}

                    {/* Content Overlay */}
                    <div className="absolute inset-0 z-[2] bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-12">
                        <div 
                            className="text-white text-xs font-black uppercase tracking-[0.4em] mb-2 [&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg [&_p]:m-0"
                            dangerouslySetInnerHTML={{ __html: homeContent?.data?.popup_title || "Flash Offer" }}
                        ></div>
                        <div className="text-white mb-4 [&_h1]:text-4xl md:[&_h1]:text-6xl [&_h1]:font-black [&_h1]:tracking-tighter [&_h1]:uppercase [&_h1]:leading-none [&_h2]:text-3xl md:[&_h2]:text-5xl [&_h2]:font-black [&_h2]:tracking-tighter [&_h2]:uppercase [&_h2]:leading-none [&_p]:m-0" 
                            dangerouslySetInnerHTML={{ __html: homeContent?.data?.popup_subtitle || 'Premium Savings<br />Up to <span class="text-red-600">50% Off</span>' }}>
                        </div>
                        {homeContent?.data?.popup_button_link ? (
                            <Link
                                href={homeContent.data.popup_button_link}
                                onClick={() => setIsOpen(false)}
                                className="w-fit bg-red-600 hover:bg-white hover:text-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95"
                            >
                                {homeContent?.data?.popup_button_text || "Claim Discount"}
                            </Link>
                        ) : (
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-fit bg-red-600 hover:bg-white hover:text-slate-900 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95"
                            >
                                {homeContent?.data?.popup_button_text || "Claim Discount"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
