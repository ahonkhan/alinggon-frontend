"use client";

import Link from "next/link";
import { ChevronRight, LayoutGrid } from "lucide-react";

const categoriesData = [
    {
        name: "Gadget",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800",
        count: "120+ Objects",
        href: "/shop?category=Gadget",
        color: "from-blue-500/20 to-transparent"
    },
    {
        name: "Food",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800",
        count: "85+ Objects",
        href: "/shop?category=Food",
        color: "from-orange-500/20 to-transparent"
    },
    {
        name: "Mobile",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
        count: "240+ Objects",
        href: "/shop?category=Mobile",
        color: "from-slate-500/20 to-transparent"
    },
    {
        name: "Man",
        image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=800",
        count: "150+ Objects",
        href: "/shop?category=Man",
        color: "from-amber-600/20 to-transparent"
    },
    {
        name: "Women",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
        count: "300+ Objects",
        href: "/shop?category=Women",
        color: "from-rose-500/20 to-transparent"
    },
    {
        name: "Tshirt",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
        count: "95+ Objects",
        href: "/shop?category=Tshirt",
        color: "from-emerald-500/20 to-transparent"
    },
    {
        name: "Organic",
        image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?auto=format&fit=crop&q=80&w=800",
        count: "60+ Objects",
        href: "/shop?category=Organic",
        color: "from-green-600/20 to-transparent"
    },
    {
        name: "Accessories",
        image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=800",
        count: "210+ Objects",
        href: "/shop?category=Accessories",
        color: "from-indigo-500/20 to-transparent"
    }
];

export default function CategoriesPage() {
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

                {/* Grid */}
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-6 lg:gap-8">
                    {categoriesData.map((category, index) => (
                        <Link
                            key={index}
                            href={category.href}
                            className="group relative block h-[200px] overflow-hidden rounded-2xl md:rounded-[3rem] bg-slate-900 shadow-xl shadow-slate-200/50"
                        >
                            {/* Background Image with Zoom */}
                            <img
                                src={category.image}
                                alt={category.name}
                                className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-[2000ms] ease-out group-hover:scale-110"
                            />

                            {/* Color Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t ${category.color} z-10 opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900/60 z-20"></div>

                            {/* Content */}
                            <div className="absolute inset-0 p-3 md:p-8 flex flex-col justify-end z-30">
                                <span className="text-white/40 text-[7px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1 group-hover:text-red-400 transition-colors">
                                    {category.count.split(' ')[0]}
                                </span>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-[10px] sm:text-lg md:text-2xl font-black text-white uppercase tracking-tighter leading-none group-hover:translate-x-1 transition-transform duration-500">
                                        {category.name}
                                    </h2>
                                    <div className="hidden md:flex w-8 h-8 bg-white/10 rounded-full items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 backdrop-blur-md">
                                        <ChevronRight className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Border Highlight */}
                            <div className="absolute inset-0 border-[8px] md:border-[16px] border-white/0 group-hover:border-white/5 transition-all duration-700 pointer-events-none rounded-2xl md:rounded-[3rem] z-40"></div>
                        </Link>
                    ))}
                </div>

                {/* Bottom Stats */}
                <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-t border-gray-50">
                    <StatBox label="Active Segments" value="08" />
                    <StatBox label="Total Objects" value="1.2K" />
                    <StatBox label="Daily Drops" value="15+" />
                    <StatBox label="Verified Brands" value="150+" />
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
