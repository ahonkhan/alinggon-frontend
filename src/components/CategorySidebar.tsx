"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useGetCategoriesQuery } from "@/store/api/frontendApi";

export default function CategorySidebar() {
    const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
    const { data, isLoading } = useGetCategoriesQuery();

    const categories = data?.data || [];

    if (isLoading) {
        return (
            <div className="relative h-full bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-slate-100/50 flex flex-col p-6 space-y-4 animate-pulse">
                <div className="h-6 w-1/2 bg-gray-100 rounded-lg"></div>
                <div className="space-y-3 mt-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-10 bg-gray-50 rounded-xl w-full"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-full bg-white rounded-[2rem] border border-gray-100 shadow-xl shadow-slate-100/50 flex flex-col">
            <div className="p-5 border-b border-gray-50 bg-gray-50/30 rounded-t-[2rem]">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none">Main Categories</h3>
            </div>

            <div className="overflow-y-auto flex-1 py-2 custom-scrollbar">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="group"
                        onMouseEnter={() => setHoveredCategory(category.id)}
                        onMouseLeave={() => setHoveredCategory(null)}
                    >
                        <Link
                            href={`/shop?category=${category.slug}`}
                            className="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors relative"
                        >
                            {/* Icon / Image Fallback */}
                            {category.image ? (
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    width={24}
                                    height={24}
                                    className="object-contain rounded-full bg-gray-50 p-0.5 border border-gray-100 shadow-sm"
                                />
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center border border-red-100">
                                    <span className="text-[10px] font-black text-red-400">{category.name.charAt(0)}</span>
                                </div>
                            )}

                            <span className="flex-1 text-xs font-bold text-slate-700 group-hover:text-red-500 uppercase tracking-wide truncate pr-2">{category.name}</span>

                            {category.children && category.children.length > 0 && (
                                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-red-400 flex-shrink-0" />
                            )}
                        </Link>

                        {/* Mega Menu */}
                        {category.children && category.children.length > 0 && hoveredCategory === category.id && (
                            <div className="absolute left-[calc(100%+8px)] top-0 w-[600px] min-h-full bg-white border border-gray-100 shadow-2xl rounded-[2rem] z-50 p-8 flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200">
                                <div className="flex flex-col h-full">
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-10 items-start align-top flex-1">
                                        {category.children.map((sub) => (
                                            <div key={sub.id} className="space-y-4">
                                                <Link href={`/shop?category=${sub.slug}`} className="group/title cursor-pointer p-2 -ml-2 rounded-xl hover:bg-gray-50 transition-all block border-b border-gray-100">
                                                    <h4 className="text-sm font-black text-slate-900 group-hover/title:text-red-600 uppercase tracking-wide transition-colors">{sub.name}</h4>
                                                </Link>

                                                {/* Sub-children items */}
                                                {sub.children && sub.children.length > 0 && (
                                                    <ul className="space-y-2 pl-4 border-l border-gray-50 ml-1">
                                                        {sub.children.map((item: any) => (
                                                            <li key={item.id}>
                                                                <Link href={`/shop?category=${item.slug}`} className="text-xs text-slate-500 hover:text-red-500 font-medium block py-0.5 transition-colors">
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Latest Products Section */}
                                    {category.latest_products && category.latest_products.length > 0 && (
                                        <div className="mt-8 pt-6 border-t border-gray-100">
                                            <div className="flex items-center justify-between mb-4 px-2">
                                                <h5 className="text-xs font-black text-slate-900 uppercase tracking-widest">Latest in {category.name}</h5>
                                                <Link href={`/shop?category=${category.slug}`} className="text-[10px] font-black text-red-500 hover:text-red-600 uppercase tracking-widest">View All</Link>
                                            </div>
                                            <div className="grid grid-cols-5 gap-3">
                                                {category.latest_products.map((prod) => (
                                                    <Link key={prod.id} href={`/product/${prod.slug}`} className="group/prod block p-2 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
                                                        <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-2 relative">
                                                            <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover/prod:scale-110 transition-transform duration-500" />
                                                        </div>
                                                        <h6 className="text-[10px] font-black text-slate-800 line-clamp-1 mb-1 group-hover/prod:text-red-600 transition-colors uppercase">{prod.name}</h6>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-black text-red-600 font-sans">৳{prod.price}</span>
                                                            {prod.originalPrice && (
                                                                <span className="text-[8px] font-medium text-gray-400 line-through font-sans">৳{prod.originalPrice}</span>
                                                            )}
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #f1f5f9;
                    border-radius: 20px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background-color: #e2e8f0;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background-color: #cbd5e1;
                }
            `}</style>
        </div>
    );
}
