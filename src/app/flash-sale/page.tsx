"use client";

import { useGetActiveFlashSaleQuery } from "@/store/api/frontendApi";
import { Zap, Clock, Home, ChevronRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";

export default function FlashSalePage() {
    const { data: flashSaleResponse, isLoading } = useGetActiveFlashSaleQuery();
    const flashSale = flashSaleResponse?.data;
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        if (!flashSale) return;

        const timer = setInterval(() => {
            const end = new Date(flashSale.end_date).getTime();
            const now = new Date().getTime();
            const distance = end - now;

            if (distance < 0) {
                clearInterval(timer);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [flashSale]);

    if (isLoading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (!flashSale) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
                <div className="bg-gray-100 p-8 rounded-[3rem] border-2 border-dashed border-gray-200 mb-6">
                    <Zap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">No Active Flash Sale</h1>
                    <p className="text-gray-400 text-sm mt-2 max-w-md">There are currently no active flash sales. Please check back later for amazing deals and discounts!</p>
                </div>
                <Link href="/" className="bg-slate-900 hover:bg-red-600 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-xl shadow-slate-200 active:scale-95 uppercase tracking-widest text-xs flex items-center gap-2">
                    <Home className="w-4 h-4" /> Return Home
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="max-w-[1600px] mx-auto px-4 py-4">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-red-600">Flash Sale</span>
                    </div>
                </div>
            </div>

            {/* Banner Section */}
            <div className="bg-slate-900 overflow-hidden relative border-b-8 border-red-600">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent pointer-events-none" />
                <div className="max-w-[1600px] mx-auto px-4 py-5 relative">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full mb-6 animate-pulse">
                                <Zap className="w-5 h-5 fill-current" />
                                <span className="text-xs font-black uppercase tracking-widest">Hurry Up! Exclusive Offer</span>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
                                {flashSale.name}
                            </h1>
                            <p className="text-slate-400 text-lg uppercase tracking-widest font-black max-w-xl">
                                Unbeatable prices on your favorite items. Limited time and limited quantities available.
                            </p>
                        </div>

                        {/* Countdown Large */}
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[4rem] shadow-2xl">
                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> Flash Sale Ends In
                                </span>
                                <div className="flex gap-4 md:gap-8">
                                    {[
                                        { label: 'Days', value: timeLeft.days },
                                        { label: 'Hours', value: timeLeft.hours },
                                        { label: 'Min', value: timeLeft.minutes },
                                        { label: 'Sec', value: timeLeft.seconds }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex flex-col items-center group">
                                            <div className="bg-white/10 border-2 border-white/20 group-hover:border-red-500 w-16 h-16 md:w-24 md:h-24 flex items-center justify-center rounded-3xl transition-all duration-500">
                                                <span className="text-2xl md:text-5xl font-black text-white tracking-tighter">{item.value.toString().padStart(2, '0')}</span>
                                            </div>
                                            <span className="text-[10px] font-black uppercase text-slate-500 mt-4 tracking-widest group-hover:text-red-500 transition-colors">{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-[1600px] mx-auto px-4 py-20">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter flex items-center gap-4">
                        Sale Products <span className="text-red-600 bg-red-50 px-4 py-1 rounded-full text-sm">{flashSale.products.length} Items</span>
                    </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {flashSale.products.map((item) => (
                        <div key={item.id} className="relative group">
                            <ProductCard {...item.product_data} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
