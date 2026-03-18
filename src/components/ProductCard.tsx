"use client";

import { ShoppingCart, Zap, Heart, ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

import { useAuth } from "@/context/AuthContext";
import { useToggleWishlistMutation, useGetWishlistQuery } from "@/store/api/frontendApi";
import { toast } from "react-hot-toast";

interface ProductCardProps {
    id: string;
    slug: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: string;
    image: string;
    category: string;
    type?: string;
    variations?: any[];
}

export default function ProductCard(props: ProductCardProps) {
    const { id, slug, name, price, originalPrice, discount, image } = props;
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [toggleWishlist, { isLoading: isToggling }] = useToggleWishlistMutation();
    const { data: wishlistData } = useGetWishlistQuery(undefined, { skip: !user });
    const router = useRouter();
    const productHref = `/product/${slug}`;

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (props.type === 'variable') {
            router.push(productHref);
            return;
        }
        // @ts-ignore
        addToCart(props);
        toast.success("Added to bag");
    };

    const handleOrderNow = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // @ts-ignore
        addToCart(props, 1, false);
        router.push("/checkout");
    };

    const isInWishlist = wishlistData?.data?.some((item: any) => item.product_id === id);

    const handleWishlist = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!user) {
            toast.error("Please login to manage wishlist");
            router.push("/login");
            return;
        }

        try {
            await toggleWishlist({ product_id: id }).unwrap();
            toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
        } catch (error) {
            toast.error("Failed to update wishlist");
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
            {/* Aspect Ratio 4/3 for shorter images */}
            <Link href={productHref} className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50 block">
                {discount && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-[13px] font-bold px-2 py-1 rounded-sm shadow-sm z-10">
                        {discount}
                    </span>
                )}
                <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>

                {/* Hover Actions - Vertical on the right */}
                <div className="absolute top-2 right-2 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <button
                        onClick={handleAddToCart}
                        aria-label="Add to Cart"
                        className="w-8 h-8 bg-white text-slate-900 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-lg border border-gray-100"
                        title="Add to Cart"
                    >
                        <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                    <button
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-lg border border-gray-100 ${isInWishlist ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-900 hover:bg-red-600 hover:text-white'}`}
                        title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                        aria-label="Wishlist Toggle"
                        disabled={isToggling}
                        onClick={handleWishlist}
                    >
                        <Heart className={`w-3.5 h-3.5 ${isInWishlist ? 'fill-current' : ''}`} />
                    </button>
                    <button
                        className="w-8 h-8 bg-white text-slate-900 rounded-full flex items-center justify-center hover:bg-red-600 hover:text-white transition-all shadow-lg border border-gray-100"
                        title="Compare"
                        aria-label="Compare"
                        onClick={(e) => { e.preventDefault(); toast.success("Added to compare"); }}
                    >
                        <ArrowLeftRight className="w-3.5 h-3.5" />
                    </button>
                </div>
            </Link>
            <div className="p-3 flex flex-col flex-1">
                <h3 className="text-sm font-normal text-gray-800 line-clamp-2 mb-2 leading-snug group-hover:text-red-600 transition-colors h-10 overflow-hidden">
                    <Link href={productHref}>{name}</Link>
                </h3>
                <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-red-600 font-semibold">৳ {price.toLocaleString()}</span>
                        {originalPrice && (
                            <span className="text-gray-800 text-xs line-through decoration-gray-400">
                                ৳ {originalPrice.toLocaleString()}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                        <button
                            onClick={handleOrderNow}
                            className="flex-1 bg-red-600 hover:bg-red-500 text-white text-[13px] font-bold py-2 px-2 rounded transition-all flex items-center justify-center gap-1 active:scale-95 uppercase tracking-tight"
                        >
                            <Zap className="w-3 h-3 hidden sm:block" /> Order Now
                        </button>
                        <button
                            onClick={handleAddToCart}
                            aria-label="Add to Cart"
                            className="hidden md:flex w-9 h-9  items-center justify-center border border-red-200 text-red-600 rounded hover:bg-red-50 transition-all active:scale-95"
                        >
                            <ShoppingCart className="w-4 h-4" />
                        </button>


                        <button
                            onClick={handleAddToCart}
                            className="md:hidden flex-1 bg-red-600 hover:bg-red-500 text-white text-[13px] font-bold py-2 px-2 rounded transition-all flex items-center justify-center gap-1 active:scale-95 uppercase tracking-tight"
                        >
                            <ShoppingCart className="w-4 h-4" /> Add To Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
