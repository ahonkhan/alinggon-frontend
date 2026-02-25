"use client";

import { useGetActiveFlashSaleQuery } from "@/store/api/frontendApi";
import { Zap, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

export default function FlashSaleSection() {
    const { data: flashSaleResponse, isLoading } = useGetActiveFlashSaleQuery();
    const flashSale = flashSaleResponse?.data;
    const [timeLeft, setTimeLeft] = useState({
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
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [flashSale]);

    if (isLoading || !flashSale) return null;

    return (
        <section id="flash-sale" className="py-12 bg-gray-50/50">
            <div className="max-w-[1600px] mx-auto px-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div className="flex flex-col items-start gap-2">
                        <h2 className="text-3xl font-black tracking-tighter uppercase text-slate-900">
                            {flashSale.name}
                        </h2>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-slate-400">
                            <Clock className="w-5 h-5" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Ending In:</span>
                        </div>
                        <div className="flex gap-2">
                            {[
                                { label: 'Hrs', value: timeLeft.hours },
                                { label: 'Min', value: timeLeft.minutes },
                                { label: 'Sec', value: timeLeft.seconds }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <div className="bg-white border-2 border-slate-900 w-12 h-12 flex items-center justify-center rounded-lg shadow-sm">
                                        <span className="text-xl font-black text-slate-900">{item.value.toString().padStart(2, '0')}</span>
                                    </div>
                                    <span className="text-[8px] font-bold uppercase text-slate-400 mt-1">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {flashSale.products.map((item) => (
                        <div key={item.id} className="relative">
                            <ProductCard {...item.product_data} />

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
