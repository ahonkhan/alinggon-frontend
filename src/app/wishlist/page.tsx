"use client";

import { useGetWishlistQuery, useToggleWishlistMutation } from "@/store/api/frontendApi";
import { Heart, ShoppingBag, Trash2, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-hot-toast";

import AccountSidebar from "@/components/AccountSidebar";

export default function WishlistPage() {
    const { data: wishlistResponse, isLoading } = useGetWishlistQuery();
    const [toggleWishlist] = useToggleWishlistMutation();

    const wishlist = wishlistResponse?.data || [];

    const handleRemove = async (productId: string) => {
        try {
            await toggleWishlist({ product_id: productId }).unwrap();
            toast.success("Removed from wishlist");
        } catch (error) {
            toast.error("Failed to remove from wishlist");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-red-400 animate-spin" />
            </div>
        );
    }

    const getImageUrl = (image: string | undefined) => {
        if (!image) return '/images/placeholder.png';
        if (image.startsWith('http')) return image;
        const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace('/api', '');
        return `${baseUrl}/storage/${image}`;
    };

    return (
        <main className="max-w-7xl mx-auto px-4 py-12 md:py-20 bg-gray-50/30 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                <AccountSidebar />
                <div className="lg:col-span-3">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">My Wishlist</h1>
                            <p className="text-xs font-black text-gray-800 uppercase tracking-[0.2em] mt-2">Products you've saved for later</p>
                        </div>
                    </div>

                    {wishlist.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {wishlist.map((item: any) => (
                                <div key={item.id} className="group relative bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-red-200/30 transition-all">
                                    <Link href={`/product/${item.product.slug}`} className="block relative aspect-square overflow-hidden">
                                        <Image
                                            src={getImageUrl(item.product.featured_image)}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>

                                    <button
                                        onClick={() => handleRemove(item.product.id)}
                                        className="absolute top-4 right-4 z-10 p-3 bg-white/90 backdrop-blur-md rounded-2xl text-red-400 hover:bg-red-400 hover:text-white transition-all shadow-lg shadow-black/5 active:scale-95"
                                    >
                                        <Heart className="w-5 h-5 fill-current" />
                                    </button>

                                    <div className="p-6">
                                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight mb-2 line-clamp-1">
                                            {item.product.name}
                                        </h3>
                                        <div className="flex justify-between items-center">
                                            <div className="text-lg font-black text-red-400 tracking-tighter">
                                                ৳ {item.product.price}
                                            </div>
                                            <Link
                                                href={`/product/${item.product.slug}`}
                                                className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-red-400 transition-colors shadow-lg shadow-slate-900/10"
                                            >
                                                <ShoppingBag className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-white rounded-[4rem] border-2 border-dashed border-gray-100 shadow-sm">
                            <div className="w-24 h-24 bg-gray-50 rounded-[2.5rem] flex items-center justify-center text-gray-200 mx-auto mb-8">
                                <Heart className="w-12 h-12" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter mb-2">Wishlist is empty</h2>
                            <p className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-10">You haven't saved any products yet</p>
                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-3 bg-red-400 hover:bg-slate-900 text-white font-black px-10 py-5 rounded-[2rem] text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-red-200/50 active:scale-95"
                            >
                                <ShoppingBag className="w-5 h-5" /> Continue Shopping
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
