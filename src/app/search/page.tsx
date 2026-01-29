"use client";

import { useSearchParams } from "next/navigation";
import { products } from "@/data/dummyData";
import ProductCard from "@/components/ProductCard";
import { Search as SearchIcon, Filter, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("q")?.toLowerCase() || "";

    const filteredProducts = products.filter(
        (p) =>
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            (p.brand && p.brand.toLowerCase().includes(query))
    );

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Search Header */}
            <div className="bg-white border-b border-gray-100 py-10 shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <nav className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                                <Link href="/" className="hover:text-red-400 transition-colors">Home</Link>
                                <span>/</span>
                                <span className="text-gray-900">Search Results</span>
                            </nav>
                            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                                <SearchIcon className="w-8 h-8 text-red-400" strokeWidth={2.5} />
                                {query ? (
                                    <>
                                        Results for <span className="text-red-400">"{query}"</span>
                                    </>
                                ) : (
                                    "Explore All Products"
                                )}
                            </h1>
                            <p className="text-gray-400 mt-2 text-sm font-medium">
                                Found <span className="text-slate-900 font-bold">{filteredProducts.length}</span> items matching your search.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                            </button>
                            <select className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-100 transition-all cursor-pointer">
                                <option>Newest First</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Popularity</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Grid */}
            <main className="max-w-7xl mx-auto px-4 py-12">
                {filteredProducts.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-100 p-20 text-center shadow-sm">
                        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <SearchIcon className="w-12 h-12 text-red-200" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">No results found</h2>
                        <p className="text-gray-400 max-w-sm mx-auto mb-8">
                            We couldn't find any products matching your search. Try checking your spelling or using more general keywords.
                        </p>
                        <Link href="/shop" className="inline-flex items-center justify-center px-8 py-3 bg-red-400 hover:bg-red-500 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults />
        </Suspense>
    );
}
