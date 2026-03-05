"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, MessageCircle, Truck, RotateCcw, ShieldCheck, Headphones, SlidersHorizontal, LayoutGrid, List, ShoppingBag, Package, Loader2, Filter, X } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { useGetProductsQuery, useGetCategoriesQuery, useGetBrandsQuery } from "@/store/api/frontendApi";
import { useState, Suspense, useEffect } from "react";

function ShopContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Read from URL
    const activeCategory = searchParams.get("category") || "All";
    const searchQuery = searchParams.get("q") || "";
    const brandFilter = searchParams.get("brand") || "";
    const vendorFilter = searchParams.get("vendor") || "";
    const sortOption = searchParams.get("sort") || "latest";
    const currentPage = parseInt(searchParams.get("page") || "1", 10);

    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Fetch live data
    const { data: catRes, isLoading: catLoading } = useGetCategoriesQuery();
    const { data: brandsRes, isLoading: brandsLoading } = useGetBrandsQuery();
    const { data: prodRes, isLoading: prodLoading, isFetching } = useGetProductsQuery({
        category: activeCategory,
        q: searchQuery,
        brand: brandFilter,
        vendor: vendorFilter,
        sort: sortOption,
        page: currentPage.toString()
    });

    const categories = catRes?.data || [];
    const brands = brandsRes?.data || [];
    const products = prodRes?.data || [];
    const meta = prodRes?.meta;

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === "All") {
            params.delete("category");
        } else {
            params.set("category", category);
        }
        params.delete("page"); // Reset to page 1
        router.push(`/shop?${params.toString()}`);
    };

    const handleSortChange = (sort: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", sort);
        params.delete("page"); // Reset to page 1
        router.push(`/shop?${params.toString()}`);
    };

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`/shop?${params.toString()}`);
    };

    const totalProductsCount = meta?.total || 0;
    const totalCategoriesCount = categories.reduce((sum, cat) => sum + Number(cat.count || 0), 0);

    // --- Category Hierarchy Logic ---
    const findCategoryPath = (cats: any[], targetSlug: string, path: any[] = []): any[] | null => {
        for (const cat of cats) {
            if (cat.slug === targetSlug || cat.name === targetSlug) {
                return [...path, cat];
            }
            if (cat.children && cat.children.length > 0) {
                const found = findCategoryPath(cat.children, targetSlug, [...path, cat]);
                if (found) return found;
            }
        }
        return null;
    };

    const currentPath = activeCategory !== "All" ? findCategoryPath(categories, activeCategory) : null;
    let displayCategories = categories;
    let upCategory: any = null;
    let listTitle = "Collection Groups";
    let showAllOption = true;

    if (currentPath && currentPath.length > 0) {
        const activeNode = currentPath[currentPath.length - 1];
        if (activeNode.children && activeNode.children.length > 0) {
            displayCategories = activeNode.children;
            upCategory = currentPath.length > 1 ? currentPath[currentPath.length - 2] : "All";
            listTitle = activeNode.name;
            showAllOption = false;
        } else {
            const parentNode = currentPath.length > 1 ? currentPath[currentPath.length - 2] : null;
            displayCategories = parentNode ? parentNode.children : categories;
            upCategory = currentPath.length > 2 ? currentPath[currentPath.length - 3] : (parentNode ? "All" : null);
            listTitle = parentNode ? parentNode.name : "Collection Groups";
            showAllOption = !parentNode;
        }
    }

    const CategorySidebarContent = (
        <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-xl shadow-slate-200/50">
            <h3 className="font-black text-slate-800 mb-6 uppercase tracking-widest text-xs flex items-center gap-2 border-b border-gray-50 pb-4">
                <LayoutGrid className="w-4 h-4 text-red-400" /> {listTitle}
            </h3>
            <ul className="space-y-2">
                {catLoading ? (
                    <div className="flex justify-center p-4"><Loader2 className="w-5 h-5 animate-spin text-red-300" /></div>
                ) : (
                    <>
                        {!showAllOption && upCategory && (
                            <li
                                onClick={() => { handleCategoryChange(upCategory === "All" ? "All" : upCategory.slug); setIsFilterOpen(false); }}
                                className="flex items-center gap-2 px-4 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest cursor-pointer transition-all text-slate-500 hover:bg-red-50 hover:text-red-400 mb-2"
                            >
                                <ChevronLeft className="w-4 h-4" /> Go Back
                            </li>
                        )}
                        {showAllOption && (
                            <CategoryItem
                                label="All Products"
                                count={totalCategoriesCount}
                                isActive={activeCategory === "All"}
                                onClick={() => { handleCategoryChange("All"); setIsFilterOpen(false); }}
                            />
                        )}
                        {displayCategories.map((cat: any) => (
                            <CategoryItem
                                key={cat.id}
                                label={cat.name}
                                count={cat.count}
                                isActive={activeCategory === cat.slug || activeCategory === cat.name}
                                onClick={() => { handleCategoryChange(cat.slug); setIsFilterOpen(false); }}
                            />
                        ))}
                    </>
                )}
            </ul>
        </div>
    );

    const BrandSidebarContent = (
        <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-xl shadow-slate-200/50">
            <h3 className="font-black text-slate-800 mb-6 uppercase tracking-widest text-xs flex items-center gap-2 border-b border-gray-50 pb-4">
                <ShieldCheck className="w-4 h-4 text-red-400" /> Top Brands
            </h3>
            <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {brandsLoading ? (
                    <div className="flex justify-center p-4"><Loader2 className="w-5 h-5 animate-spin text-red-300" /></div>
                ) : (
                    <>
                        <div
                            onClick={() => {
                                const params = new URLSearchParams(searchParams.toString());
                                params.delete("brand");
                                params.delete("page");
                                router.push(`/shop?${params.toString()}`);
                                setIsFilterOpen(false);
                            }}
                            className={`flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-all border ${!brandFilter
                                ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-200"
                                : "text-slate-500 border-transparent hover:bg-gray-50"}`}
                        >
                            <span className="text-[10px] font-black uppercase tracking-widest">All Brands</span>
                            <ChevronRight className={`w-3 h-3 ${!brandFilter ? "text-white" : "text-gray-300"}`} />
                        </div>
                        {brands.map((brand: any) => (
                            <div
                                key={brand.id}
                                onClick={() => {
                                    const params = new URLSearchParams(searchParams.toString());
                                    params.set("brand", brand.slug || brand.id);
                                    params.delete("page");
                                    router.push(`/shop?${params.toString()}`);
                                    setIsFilterOpen(false);
                                }}
                                className={`flex items-center justify-between px-4 py-3 rounded-2xl cursor-pointer transition-all border ${brandFilter === (brand.slug || brand.id.toString())
                                    ? "bg-red-500 text-white border-red-500 shadow-lg shadow-red-200"
                                    : "text-slate-500 border-transparent hover:bg-gray-50"}`}
                            >
                                <span className="text-[10px] font-black uppercase tracking-widest">{brand.name}</span>
                                <ChevronRight className={`w-3 h-3 ${brandFilter === (brand.slug || brand.id.toString()) ? "text-white" : "text-gray-300"}`} />
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Shop Header Section */}
            <section className="bg-white border-b border-gray-100 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 flex flex-col items-center text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-red-50 text-red-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        <ShoppingBag className="w-3.5 h-3.5" /> Premium Catalog
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase mb-4">
                        {searchQuery ? (
                            <>Results for <span className="text-red-400">"{searchQuery}"</span></>
                        ) : (
                            <>Explore Our <span className="text-red-400">Inventory</span></>
                        )}
                    </h1>
                    <p className="text-gray-400 font-medium max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                        From cutting-edge gadgets to essential lifestyle accessories, find everything you need in one place.
                    </p>
                </div>
                <div className="absolute top-0 left-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -ml-32 -mt-32 opacity-50"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -mr-32 -mb-32 opacity-50"></div>
            </section>

            {/* Mobile Filter Drawer */}
            {isFilterOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />

                    {/* Drawer */}
                    <div className="fixed inset-y-0 right-0 w-[85vw] max-w-sm bg-gray-50 shadow-2xl flex flex-col pt-6 px-4 pb-6 overflow-y-auto animate-in slide-in-from-right-full duration-300">
                        <div className="flex justify-between items-center mb-6 px-2">
                            <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Filters</h2>
                            <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-white shadow-sm hover:bg-red-50 text-gray-400 hover:text-red-400 rounded-xl transition-all border border-gray-100">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-6">
                            {CategorySidebarContent}
                            {BrandSidebarContent}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12">
                    {/* Sidebar Filters */}
                    <aside className="space-y-8 hidden lg:block">
                        {CategorySidebarContent}
                        {BrandSidebarContent}

                        {/* Special Banner */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group hidden lg:block">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
                            <h4 className="text-xl font-black uppercase tracking-tighter mb-2 leading-none relative z-10">Bundle<br />and Save</h4>
                            <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-6 relative z-10">Check our combo packs</p>
                            <Link href="/landing" className="bg-white text-slate-900 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-400 hover:text-white transition-all inline-block relative z-10">
                                View Offers
                            </Link>
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <div className="lg:col-span-3 space-y-6 md:space-y-8">
                        {/* Toolbar */}
                        <div className="bg-white p-4 md:p-6 rounded-3xl border border-gray-100 shadow-xl shadow-slate-200/30 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="flex items-center justify-between w-full md:w-auto gap-4 md:gap-6">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">
                                    <span className="text-slate-900">{totalProductsCount}</span> Objects Found
                                </span>
                                <div className="h-4 w-px bg-gray-100 hidden md:block"></div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setIsFilterOpen(true)}
                                        className={`lg:hidden p-2 rounded-lg transition-all text-gray-500 hover:bg-gray-50 border border-gray-200 flex items-center gap-2 text-xs font-bold`}>
                                        <Filter className="w-4 h-4 text-red-400" /> Filter
                                    </button>
                                    <button
                                        onClick={() => setViewMode("grid")}
                                        className={`hidden md:block p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-red-400 text-white shadow-lg shadow-red-100" : "text-gray-400 hover:bg-gray-50"}`}>
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode("list")}
                                        className={`hidden md:block p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-red-400 text-white shadow-lg shadow-red-100" : "text-gray-400 hover:bg-gray-50"}`}>
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap hidden md:block">Sort Logic:</label>
                                <select
                                    value={sortOption}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    className="w-full md:w-auto text-xs font-bold border-2 border-gray-100 rounded-xl px-4 py-2 focus:outline-none focus:border-red-400 bg-gray-50/50 cursor-pointer transition-all">
                                    <option value="latest">New Arrivals</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        {/* Active Filters */}
                        {(searchQuery || brandFilter || vendorFilter) && (
                            <div className="flex flex-wrap gap-2 mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
                                {searchQuery && (
                                    <div className="flex items-center gap-2 bg-white border border-gray-100 px-3 py-1.5 rounded-full shadow-sm">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Search:</span>
                                        <span className="text-xs font-bold text-slate-800">{searchQuery}</span>
                                        <button
                                            onClick={() => {
                                                const p = new URLSearchParams(searchParams.toString());
                                                p.delete("q");
                                                router.push(`/shop?${p.toString()}`);
                                            }}
                                            className="text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                )}
                                {brandFilter && (
                                    <div className="flex items-center gap-2 bg-white border border-gray-100 px-3 py-1.5 rounded-full shadow-sm">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Brand:</span>
                                        <span className="text-xs font-bold text-slate-800">{brandFilter}</span>
                                        <button
                                            onClick={() => {
                                                const p = new URLSearchParams(searchParams.toString());
                                                p.delete("brand");
                                                router.push(`/shop?${p.toString()}`);
                                            }}
                                            className="text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                )}
                                {vendorFilter && (
                                    <div className="flex items-center gap-2 bg-white border border-gray-100 px-3 py-1.5 rounded-full shadow-sm">
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Vendor:</span>
                                        <span className="text-xs font-bold text-slate-800">{vendorFilter}</span>
                                        <button
                                            onClick={() => {
                                                const p = new URLSearchParams(searchParams.toString());
                                                p.delete("vendor");
                                                router.push(`/shop?${p.toString()}`);
                                            }}
                                            className="text-gray-300 hover:text-red-500 transition-colors"
                                        >
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                )}
                                <button
                                    onClick={() => {
                                        const p = new URLSearchParams(searchParams.toString());
                                        p.delete("q");
                                        p.delete("brand");
                                        p.delete("vendor");
                                        p.delete("category");
                                        router.push(`/shop?${p.toString()}`);
                                    }}
                                    className="text-[10px] font-black text-red-400 uppercase tracking-widest hover:text-red-600 transition-colors ml-2 underline underline-offset-4"
                                >
                                    Clear All
                                </button>
                            </div>
                        )}

                        {/* Results */}
                        {prodLoading || isFetching ? (
                            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-12 md:p-32 text-center shadow-inner flex flex-col items-center">
                                <Loader2 className="w-12 h-12 text-red-400 animate-spin mb-4" />
                                <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Applying filters...</p>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 md:p-20 text-center shadow-inner">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Package className="w-10 h-10 text-gray-200" />
                                </div>
                                <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">No matching items</p>
                                <button
                                    onClick={() => {
                                        const params = new URLSearchParams(searchParams.toString());
                                        params.delete("q");
                                        params.delete("category");
                                        params.delete("brand");
                                        params.delete("vendor");
                                        router.push(`/shop?${params.toString()}`);
                                    }}
                                    className="text-red-400 text-sm font-black hover:underline mt-4">Reset Filters</button>
                            </div>
                        ) : (
                            <div className={`grid gap-2 md:gap-4 ${viewMode === "grid" ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4 " : "grid-cols-1"}`}>
                                {products.map((product: any) => (
                                    <ProductCard key={product.id} {...product} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {meta && meta.last_page > 1 && (
                            <div className="flex justify-center mt-12 md:mt-16 py-8">
                                <nav className="flex items-center gap-2 md:gap-3">
                                    <button
                                        disabled={meta.current_page === 1}
                                        onClick={() => handlePageChange(meta.current_page - 1)}
                                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-slate-400 hover:text-red-400 hover:border-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    {/* Simplified Pagination Pages */}
                                    {Array.from({ length: meta.last_page }, (_, i) => i + 1).map(pageNum => {
                                        // Show max 3 numbers around current page for mobile
                                        if (
                                            pageNum === 1 ||
                                            pageNum === meta.last_page ||
                                            Math.abs(meta.current_page - pageNum) <= 1
                                        ) {
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => handlePageChange(pageNum)}
                                                    className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl font-black text-xs transition-all shadow-sm ${meta.current_page === pageNum ? "bg-red-400 text-white shadow-red-200/50 scale-110" : "bg-white border border-gray-100 text-slate-400 hover:text-red-400 hover:border-red-100 hidden sm:flex"}`}>
                                                    {pageNum}
                                                </button>
                                            )
                                        }
                                        return null;
                                    })}

                                    <button
                                        disabled={meta.current_page === meta.last_page}
                                        onClick={() => handlePageChange(meta.current_page + 1)}
                                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-2xl bg-white border border-gray-100 text-slate-400 hover:text-red-400 hover:border-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Services Bar */}
            <div className="bg-slate-900 py-12 md:py-16 mt-12 md:mt-20">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    <ServiceCard icon={Truck} title="FAST LOGISTICS" sub="Free delivery on orders above ৳ 500" />
                    <ServiceCard icon={RotateCcw} title="30-DAY EXCHANGE" sub="Hassle-free return policy" />
                    <ServiceCard icon={ShieldCheck} title="AUTHENTIC ONLY" sub="100% genuine product guarantee" />
                    <ServiceCard icon={Headphones} title="PRIORITY CARE" sub="Live support for all members" />
                </div>
            </div>
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

function ServiceCard({ icon: Icon, title, sub }: any) {
    return (
        <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
            <div className="bg-white/5 p-3 md:p-4 rounded-xl md:rounded-2xl border border-white/10 text-red-400">
                <Icon className="w-6 h-6 md:w-8 md:h-8 stroke-[1.5]" />
            </div>
            <div>
                <h3 className="text-[10px] md:text-sm font-black text-white uppercase tracking-widest mb-1">{title}</h3>
                <p className="text-[9px] md:text-[10px] text-white/40 font-medium max-w-[140px] md:max-w-[180px] uppercase leading-relaxed">{sub}</p>
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
