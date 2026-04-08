"use client";

import { useGetOffersQuery } from "@/store/api/frontendApi";
import { Home, ChevronRight, Gift, ShoppingBag, ArrowRight, Zap, Flame, Star, Percent } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Loader from "@/components/Loader";

export default function OffersPage() {
    const { data: offersResponse, isLoading, error } = useGetOffersQuery();
    const offers = offersResponse?.data || [];

    if (isLoading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-red-100 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full border-t-4 border-red-600 animate-spin"></div>
                </div>
                <p className="text-slate-900 font-black uppercase tracking-widest text-xs animate-pulse">Loading amazing deals...</p>
            </div>
        );
    }

    if (error || offers.length === 0) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
                <div className="bg-gray-50 p-12 rounded-[3.5rem] border-2 border-dashed border-gray-200 mb-8 max-w-lg w-full">
                    <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Gift className="w-10 h-10 text-gray-300" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">No Offers Found</h1>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                        Stay tuned! We're preparing some exclusive campaigns and amazing deals just for you.
                    </p>
                    <Link href="/" className="inline-flex items-center gap-3 bg-slate-900 hover:bg-red-600 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-xl shadow-slate-200 active:scale-95 uppercase tracking-widest text-xs group">
                        <Home className="w-4 h-4" /> Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f0f2f5] min-h-screen pb-20">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100 mb-6">
                <div className="max-w-[1600px] mx-auto px-4 py-4">
                    <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                        <Link href="/" className="hover:text-red-600 transition-colors flex items-center gap-1.5">
                            <Home className="w-3 h-3" /> Home
                        </Link>
                        <ChevronRight className="w-2.5 h-2.5 opacity-30" />
                        <span className="text-red-600">Exclusive Offers</span>
                    </div>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4">
                {offers.map((offer, index) => (
                    <section key={offer.id} className="mb-4 last:mb-0 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${index * 150}ms` }}>
                        {/* Offer Header - Styled after Daraz MEGA DEALS */}
                        <div className={`relative overflow-hidden rounded-lg md:rounded-xl p-2 md:p-4 mb-0 flex items-center justify-between shadow-lg ${
                            index % 3 === 0 ? 'bg-gradient-to-r from-[#ff9900] to-[#ff4d00]' : 
                            index % 3 === 1 ? 'bg-gradient-to-r from-[#00bfff] to-[#1e90ff]' : 
                            'bg-gradient-to-r from-[#8e44ad] to-[#9b59b6]'
                        }`}>
                            {/* Decorative background icons (simplified) */}
                            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                                <Zap className="w-32 h-32 rotate-12" />
                            </div>

                            <div className="flex items-center gap-4 relative z-10">
                                <div className="hidden md:flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
                                    {index % 3 === 0 ? <Flame className="w-6 h-6 text-white" /> : 
                                     index % 3 === 1 ? <Zap className="w-6 h-6 text-white" /> : 
                                     <Star className="w-6 h-6 text-white" />}
                                </div>
                                <div>
                                    <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter leading-none italic">
                                        {offer.title}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-8 h-[2px] bg-white/50"></div>
                                        <span className="text-[10px] md:text-xs font-black text-white/80 uppercase tracking-widest leading-none">
                                            Limited Time Offer
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Link 
                                href={`/offers/${offer.slug}`} 
                                className="relative z-10 flex items-center gap-2 bg-slate-900/40 hover:bg-slate-900 backdrop-blur-md text-white px-5 md:px-8 py-2 md:py-3 rounded-full border border-white/20 transition-all font-black uppercase text-[10px] md:text-xs tracking-[0.2em] group"
                            >
                                More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Product Grid */}
                        <div className="">
                            {offer.products.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-8">
                                    {offer.products.slice(0, 12).map((product) => (
                                        <div key={product.id} className="transition-all hover:scale-[1.02] duration-300">
                                            <ProductCard {...product} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-12 text-center text-gray-400">
                                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-10" />
                                    <p className="text-xs font-bold uppercase tracking-widest italic">Coming Soon...</p>
                                </div>
                            )}
                            
                            {offer.products.length > 12 && (
                                <div className="mt-12 flex justify-center">
                                    <Link 
                                        href={`/offers/${offer.slug}`}
                                        className="inline-flex items-center gap-3 text-slate-400 hover:text-red-600 font-black uppercase tracking-[0.3em] text-[10px] transition-all group"
                                    >
                                        View all {offer.products.length} products <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
