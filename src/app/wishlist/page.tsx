"use client";

import AccountSidebar from "@/components/AccountSidebar";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/dummyData";
import { Heart, Search } from "lucide-react";
import Link from "next/link";

export default function Wishlist() {
    // Simulate wishlisted items (last 3 products)
    const wishlistItems = products.slice(-3);

    return (
        <main className="max-w-7xl mx-auto px-4 py-12 md:py-20 bg-gray-50/30">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                <AccountSidebar />

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
                        <div className="px-10 py-8 border-b border-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gray-50/30">
                            <div className="flex items-center gap-4">
                                <div className="bg-red-400 p-3 rounded-2xl text-white shadow-lg">
                                    <Heart className="w-6 h-6 fill-current" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">My Wishlist</h1>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Products you've saved for later</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-10">
                            {wishlistItems.length === 0 ? (
                                <div className="text-center py-20">
                                    <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                                    <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Your wishlist is empty</p>
                                    <Link href="/shop" className="text-red-400 text-sm font-bold hover:underline mt-4 inline-block">Explore Products</Link>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {wishlistItems.map((product) => (
                                        <ProductCard key={product.id} {...product} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-red-400/20 rounded-full blur-3xl -mr-40 -mt-40 group-hover:scale-110 transition-transform"></div>
                        <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10 text-center sm:text-left">
                            <div className="flex-1">
                                <h3 className="text-xl font-black uppercase tracking-tight mb-2">Want to save more?</h3>
                                <p className="text-white/60 text-xs font-medium max-w-sm leading-relaxed uppercase tracking-widest">Create an account to persist your wishlist across all your devices.</p>
                            </div>
                            <Link href="/register" className="bg-red-400 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-xl active:scale-95">
                                Sign Up Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
