"use client";

import Link from "next/link";
import Image from "next/image";
import { useGetHomeContentQuery } from "@/store/api/frontendApi";

export default function AdsSection() {
    const { data: homeContent, isLoading } = useGetHomeContentQuery();
    const ads = homeContent?.data.special_offer_banners || [];

    if (isLoading) {
        return (
            <section className="max-w-[1600px] mx-auto px-4 py-8">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-[110px] rounded-lg bg-gray-100 animate-pulse"></div>
                    ))}
                </div>
            </section>
        );
    }

    if (ads.length === 0) return null;

    return (
        <section className="max-w-[1600px] mx-auto px-4 py-8">
            <div className="flex flex-col items-center mb-6 text-center space-y-2 lg:hidden">
                <span className="text-red-600 text-[13px] font-black uppercase tracking-[0.4em]">Special Offers</span>
                <h3 className="text-xl font-black tracking-tighter uppercase text-slate-900">Featured Deals</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {ads.map((ad) => (
                    <Link
                        key={ad.id}
                        href={ad.link}
                        className="group overflow-hidden rounded-lg relative h-[110px] shadow-lg hover:shadow-xl transition-shadow border border-gray-100 block"
                    >
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                        <Image
                            src={ad.image}
                            alt={ad.title}
                            fill
                            quality={60}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"
                            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <span className="bg-white/90 backdrop-blur text-slate-900 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                {ad.title}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
