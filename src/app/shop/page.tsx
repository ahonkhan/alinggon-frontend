"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, MessageCircle, Truck, RotateCcw, ShieldCheck, Headphones, SlidersHorizontal, LayoutGrid, List, ShoppingBag, Package } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/dummyData";
import { useState, useMemo, Suspense } from "react";

function ShopContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const activeCategory = searchParams.get("category") || "All";
    const searchQuery = searchParams.get("q") || "";
    const sortOption = searchParams.get("sort") || "latest";

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (activeCategory !== "All") {
            result = result.filter(p => p.category === activeCategory);
        }

        if (searchQuery) {
            result = result.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Sort
        if (sortOption === "price-low") result.sort((a, b) => a.price - b.price);
        if (sortOption === "price-high") result.sort((a, b) => b.price - a.price);

        return result;
    }, [activeCategory, searchQuery, sortOption]);

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === "All") {
            params.delete("category");
        } else {
            params.set("category", category);
        }
        router.push(`/shop?${params.toString()}`);
    };

    const handleSortChange = (sort: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", sort);
        router.push(`/shop?${params.toString()}`);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Shop Header Section */}
            <section className="bg-white border-b border-gray-100 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-red-50 text-red-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        <ShoppingBag className="w-3.5 h-3.5" /> Premium Catalog
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-4">
                        Explore Our <span className="text-red-400">Inventory</span>
                    </h1>
                    <p className="text-gray-400 font-medium max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                        From cutting-edge gadgets to essential lifestyle accessories, find everything you need in one place.
                    </p>
                </div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -ml-32 -mt-32 opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mb-32 opacity-50"></div>
            </section>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Sidebar Filters */}
                    <aside className="space-y-8 hidden lg:block">
                        {/* Categories */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-slate-200/50">
                            <h3 className="font-black text-slate-800 mb-6 uppercase tracking-widest text-xs flex items-center gap-2 border-b border-gray-50 pb-4">
                                <LayoutGrid className="w-4 h-4 text-red-400" /> Collection Groups
                            </h3>
                            <ul className="space-y-2">
                                <CategoryItem
                                    label="All Products"
                                    count={products.length}
                                    isActive={activeCategory === "All"}
                                    onClick={() => handleCategoryChange("All")}
                                />
                                {categories.map(cat => (
                                    <CategoryItem
                                        key={cat}
                                        label={cat}
                                        count={products.filter(p => p.category === cat).length}
                                        isActive={activeCategory === cat}
                                        onClick={() => handleCategoryChange(cat)}
                                    />
                                ))}
                            </ul>
                        </div>

                        {/* Special Banner */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
                            <h4 className="text-xl font-black uppercase tracking-tighter mb-2 leading-none relative z-10">Bundle<br />and Save</h4>
                            <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-6 relative z-10">Check our combo packs</p>
                            <Link href="/landing" className="bg-white text-slate-900 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-400 hover:text-white transition-all inline-block relative z-10">
                                View Offers
                            </Link>
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Toolbar */}
                        <div className="bg-white p-4 md:p-6 rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/30 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-6">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                    <span className="text-slate-900">{filteredProducts.length}</span> Objects Found
                                </span>
                                <div className="h-4 w-px bg-gray-100"></div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-red-400 text-white shadow-lg shadow-red-100" : "text-gray-400 hover:bg-gray-50"}`}>
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-red-400 text-white shadow-lg shadow-red-100" : "text-gray-400 hover:bg-gray-50"}`}>
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Sort Logic:</label>
                                <select
                                    value={sortOption}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    className="text-xs font-bold border-2 border-gray-100 rounded-xl px-4 py-2 focus:outline-none focus:border-red-400 bg-gray-50/50 cursor-pointer transition-all">
                                    <option value="latest">New Arrivals</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Results */}
                        {filteredProducts.length === 0 ? (
                            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-20 text-center shadow-inner">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Package className="w-10 h-10 text-gray-200" />
                                </div>
                                <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">No matching items in this category</p>
                                <button
                                    onClick={() => handleCategoryChange("All")}
                                    className="text-red-400 text-sm font-black hover:underline mt-4">Reset Filters</button>
                            </div>
                        ) : (
                            <div className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-3" : "grid-cols-1"}`}>
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} {...product} />
                                ))}
                            </div>
                        )}

                        {/* Pagination Placeholder */}
                        {filteredProducts.length > 0 && (
                            <div className="flex justify-center mt-16 py-8">
                                <nav className="flex items-center gap-3">
                                    <NavButton icon={ChevronLeft} />
                                    <NavButton label="1" active />
                                    <NavButton label="2" />
                                    <NavButton icon={ChevronRight} />
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Services Bar */}
            <div className="bg-slate-900 py-16 mt-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-12">
                    <ServiceCard icon={Truck} title="FAST LOGISTICS" sub="Free delivery on orders above ৳ 500" />
                    <ServiceCard icon={RotateCcw} title="30-DAY EXCHANGE" sub="Hassle-free return policy" />
                    <ServiceCard icon={ShieldCheck} title="AUTHENTIC ONLY" sub="100% genuine product guarantee" />
                    <ServiceCard icon={Headphones} title="PRIORITY CARE" sub="Live support for all members" />
                </div>
            </div>

            <Link href="https://wa.me/8801568324268" className="fixed bottom-10 left-10 bg-green-500 p-5 rounded-[2rem] text-white shadow-2xl hover:bg-green-600 transition-all z-[60] hover:-translate-y-2 group">
                <MessageCircle className="w-8 h-8 fill-current" />
            </Link>
        </div>
    );
}

function CategoryItem({ label, count, isActive, onClick }: any) {
    return (
        <li
            onClick={onClick}
            className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all ${isActive ? "bg-red-400 text-white shadow-xl shadow-red-100/50" : "text-slate-500 hover:bg-gray-50 hover:text-red-400"
                }`}>
            <span>{label}</span>
            <span className={`px-2 py-0.5 rounded-lg text-[8px] ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"}`}>{count}</span>
        </li>
    );
}

function NavButton({ label, icon: Icon, active }: any) {
    return (
        <button className={`w-12 h-12 flex items-center justify-center rounded-2xl font-black text-xs transition-all shadow-sm ${active ? "bg-red-400 text-white shadow-red-200/50 scale-110" : "bg-white border border-gray-100 text-slate-400 hover:text-red-400 hover:border-red-100"
            }`}>
            {Icon ? <Icon className="w-5 h-5" /> : label}
        </button>
    );
}

function ServiceCard({ icon: Icon, title, sub }: any) {
    return (
        <div className="flex flex-col items-center text-center space-y-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-red-400">
                <Icon className="w-8 h-8 stroke-[1.5]" />
            </div>
            <div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest mb-1">{title}</h3>
                <p className="text-[10px] text-white/40 font-medium max-w-[180px] uppercase leading-relaxed">{sub}</p>
            </div>
        </div>
    );
}

export default function Shop() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShopContent />
        </Suspense>
    );
}
