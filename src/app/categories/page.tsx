"use client";

import Link from "next/link";
import { ChevronRight, LayoutGrid, Loader2 } from "lucide-react";
import { useGetCategoriesQuery } from "@/store/api/frontendApi";

// Helper for generating consistent colors based on index or string length
const getOverlayColor = (index: number) => {
    const colors = [
        "from-blue-500/20", "from-orange-500/20", "from-slate-500/20",
        "from-amber-600/20", "from-rose-500/20", "from-emerald-500/20",
        "from-green-600/20", "from-indigo-500/20", "from-purple-500/20",
        "from-cyan-500/20"
    ];
    return `${colors[index % colors.length]} to-transparent`;
};

export default function CategoriesPage() {
    const { data: catData, isLoading } = useGetCategoriesQuery();
    const categories = catData?.data || [];

    // Derive aggregated stats
    const totalCategories = categories.length;
    const totalProducts = categories.reduce((sum, cat) => sum + (cat.count || 0), 0);

    return (
        <div className="min-h-screen bg-white pt-10 pb-24">
            <div className="max-w-[1600px] mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-gray-100 pb-10">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-red-400">
                            <LayoutGrid className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Master Hierarchy</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-slate-900 leading-none">
                            All <span className="text-red-400">Categories.</span>
                        </h1>
                    </div>
                    <p className="max-w-md text-slate-400 text-xs font-bold uppercase tracking-widest leading-loose">
                        Architecting your shopping experience through a verified taxonomy of premium objects.
                    </p>
                </div>

                {/* Loading Grid */}
                {isLoading && (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-6 lg:gap-8">
                        {[...Array(14)].map((_, i) => (
                            <div key={i} className="h-[200px] w-full rounded-2xl md:rounded-[3rem] bg-gray-100 animate-pulse"></div>
                        ))}
                    </div>
                )}

                {/* Categories Grid */}
                {!isLoading && (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-6 lg:gap-8">
                        {categories.map((category, index) => (
                            <Link
                                key={category.id}
                                href={`/shop?category=${category.slug}`}
                                className="group relative block h-[200px] overflow-hidden rounded-2xl md:rounded-[3rem] bg-slate-900 shadow-xl shadow-slate-200/50 flex items-center justify-center p-2"
                            >
                                {/* Background Image with Zoom */}
                                {category.image ? (
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                                        <span className="text-6xl font-black text-white/5">{category.name.charAt(0)}</span>
                                    </div>
                                )}

                                {/* Color Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${getOverlayColor(index)} z-10 opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/60 z-20"></div>

                                {/* Content */}
                                <div className="absolute inset-0 p-3 md:p-8 flex flex-col justify-end z-30">
                                    <span className="text-white/40 text-[7px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1 group-hover:text-red-400 transition-colors">
                                        {(category.count || 0)}+ Objects
                                    </span>
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-[10px] sm:text-base md:text-xl font-black text-white uppercase tracking-tighter leading-none group-hover:translate-x-1 transition-transform duration-500 line-clamp-1">
                                            {category.name}
                                        </h2>
                                        <div className="hidden md:flex w-8 h-8 flex-shrink-0 bg-white/10 rounded-full items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 backdrop-blur-md">
                                            <ChevronRight className="w-4 h-4 text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Border Highlight */}
                                <div className="absolute inset-0 border-[8px] md:border-[16px] border-white/0 group-hover:border-white/5 transition-all duration-700 pointer-events-none rounded-2xl md:rounded-[3rem] z-40"></div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Bottom Stats View */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-gray-50">
                    <StatBox label="Active Segments" value={totalCategories.toString().padStart(2, '0')} />
                    <StatBox label="Total Objects" value={totalProducts > 1000 ? (totalProducts / 1000).toFixed(1) + 'K' : totalProducts.toString()} />
                    <StatBox label="Daily Drops" value="New" />
                    <StatBox label="Verified Brands" value="100%" />
                </div>
            </div>
        </div>
    );
}

function StatBox({ label, value }: { label: string; value: string }) {
    return (
        <div className="text-center space-y-2">
            <p className="text-4xl font-black text-slate-900 tracking-tighter">{value}</p>
            <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.3em] leading-none">{label}</p>
        </div>
    );
}
