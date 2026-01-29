"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import ProductCard from "./ProductCard";
import { products } from "@/data/dummyData";

export default function FlashSell() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 2,
        minutes: 45,
        seconds: 30,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Filter products for flash sale (using first 4 for now)
    const flashProducts = products.slice(0, 4);

    return (
        <section className="max-w-7xl mx-auto px-4 py-8">
            <div className="bg-white border-2 border-red-500 rounded-2xl p-6 shadow-sm overflow-hidden relative">
                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 opacity-5">
                    <Zap className="w-64 h-64 text-red-500" />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-500 p-2 rounded-lg text-white">
                            <Zap className="w-6 h-6 fill-current" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 leading-none">Flash Sale</h2>
                            <p className="text-sm text-gray-500 mt-1">Limited time offers, don't miss out!</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Ends In:</span>
                        <div className="flex gap-2">
                            <TimeUnit value={timeLeft.hours} label="Hours" />
                            <span className="text-red-500 font-bold text-xl">:</span>
                            <TimeUnit value={timeLeft.minutes} label="Mins" />
                            <span className="text-red-500 font-bold text-xl">:</span>
                            <TimeUnit value={timeLeft.seconds} label="Secs" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                    {flashProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-red-500 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg shadow-sm">
                {value.toString().padStart(2, "0")}
            </div>
        </div>
    );
}
