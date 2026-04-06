"use client";

import { useGetOfferDetailsQuery } from "@/store/api/frontendApi";
import { Zap, Home, ChevronRight, Gift, Tag, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { useParams } from "next/navigation";

export default function OfferDetailsPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { data: offerResponse, isLoading, error } = useGetOfferDetailsQuery(slug);
    const offer = offerResponse?.data;

    if (isLoading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-red-100 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full border-t-4 border-red-600 animate-spin"></div>
                </div>
                <p className="text-slate-900 font-black uppercase tracking-widest text-xs animate-pulse">Loading Exclusive Offer...</p>
            </div>
        );
    }

    if (error || !offer) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
                <div className="bg-gray-50 p-12 rounded-[3.5rem] border-2 border-dashed border-gray-200 mb-8 max-w-lg w-full">
                    <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Gift className="w-10 h-10 text-gray-300" />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Offer Not Found</h1>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                        The offer you're looking for might have expired or been moved. Don't worry, we have plenty of other amazing deals waiting for you!
                    </p>
                    <Link href="/" className="inline-flex items-center gap-3 bg-slate-900 hover:bg-red-600 text-white font-black px-10 py-4 rounded-2xl transition-all shadow-xl shadow-slate-200 active:scale-95 uppercase tracking-widest text-xs group animate-shine">
                        <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" /> Return Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumb - Sleek & Minimal */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-[1600px] mx-auto px-4 py-4">
                    <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
                        <Link href="/" className="hover:text-red-600 transition-colors flex items-center gap-1.5">
                            <Home className="w-3 h-3" /> Home
                        </Link>
                        <ChevronRight className="w-2.5 h-2.5 opacity-30" />
                        <span className="text-red-600">Special Offer</span>
                        <ChevronRight className="w-2.5 h-2.5 opacity-30" />
                        <span className="text-slate-900 truncate max-w-[100px] sm:max-w-none">{offer.title}</span>
                    </div>
                </div>
            </div>

            {/* Hero Section - Centered Banner & Info */}
            <div className="border-b border-gray-100">
                <div className="max-w-[1600px] mx-auto px-4 py-8 lg:py-12">

                    {offer.banner && (
                        <div className="max-w-[1200px] mx-auto mb-10">
                            <img
                                src={offer.banner}
                                alt={offer.title}
                                className="w-full h-auto block rounded-xl sm:rounded-[2.5rem]"
                            />
                        </div>
                    )}
                    <div className="flex flex-col  items-center text-center">


                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2.5 bg-red-50 text-red-600 px-5 py-2 rounded-full mb-6 border border-red-100">
                                <Tag className="w-4 h-4 fill-current" />
                                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Exclusive Campaign</span>
                            </div>
                            <h1 className="text-4xl lg:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9] mb-6">
                                {offer.title}
                            </h1>
                            <p className="text-gray-500 text-sm lg:text-base uppercase tracking-widest font-bold mb-8 max-w-xl leading-relaxed">
                                Discover our curated collection of premium products at special prices. limited time offer for our valued customers.
                            </p>
                            
                            <div className="flex justify-center flex-wrap gap-4">
                                <div className="bg-gray-50 border border-gray-100 px-6 py-3 rounded-2xl flex items-center gap-3">
                                    <ShoppingBag className="w-5 h-5 text-red-600" />
                                    <span className="text-slate-900 font-black text-sm uppercase tracking-widest">{offer.products.length} Premium Items</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products Grid Section */}
            <div className="max-w-[1600px] mx-auto px-4 py-12 lg:py-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-[2px] w-8 bg-red-600"></div>
                            <span className="text-red-600 text-xs font-black uppercase tracking-[0.4em]">Curated Selection</span>
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
                            Offer Products
                        </h2>
                    </div>
                    <div className="flex items-center gap-4 bg-gray-50 px-6 py-3 rounded-2xl border border-gray-100">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing</span>
                        <span className="text-slate-900 font-black text-lg">{offer.products.length}</span>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Available Items</span>
                    </div>
                </div>

                {offer.products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 lg:gap-8">
                        {offer.products.map((product) => (
                            <div key={product.id} className="transform hover:-translate-y-2 transition-transform duration-500">
                                <ProductCard {...product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-[3rem] py-24 text-center border-2 border-dashed border-gray-100">
                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <ShoppingBag className="w-10 h-10 text-gray-200" />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-2">No Products Yet</h3>
                        <p className="text-gray-500 text-sm">Stay tuned! We're adding exciting products to this offer soon.</p>
                    </div>
                )}
            </div>

        </div>
    );
}
