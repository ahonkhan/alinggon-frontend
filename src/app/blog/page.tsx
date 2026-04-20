"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetBlogsQuery, useGetBlogCategoriesQuery } from "@/store/api/frontendApi";
import Loader from "@/components/Loader";
import { format } from "date-fns";

export default function BlogListing() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [page, setPage] = useState(1);

    const { data: blogsData, isLoading: blogsLoading } = useGetBlogsQuery({
        q: searchTerm,
        category: selectedCategory,
        page: page
    });

    const { data: categoriesData } = useGetBlogCategoriesQuery();

    const blogs = blogsData?.data || [];
    const categories = categoriesData?.data || [];
    const meta = blogsData?.meta;

    return (
        <div className="bg-gray-50/50 min-h-screen pb-20">
            {/* Header / Search Section */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-16 md:py-24 px-4 text-center">
                <div className="max-w-4xl mx-auto space-y-6">
                    <span className="text-red-500 font-bold uppercase tracking-[0.3em] text-xs">Alinggon Insights</span>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
                        Our Latest <span className="text-red-500">Stories</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Explore our latest news, tech insights, and lifestyle stories dedicated to your well-being.
                    </p>
                    
                    <div className="mt-10 relative max-w-xl mx-auto">
                        <input 
                            type="text" 
                            placeholder="Search articles..."
                            className="w-full bg-white/10 border border-white/20 rounded-full py-4 px-8 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all backdrop-blur-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-600 p-2 rounded-full text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 -mt-8 md:-mt-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Categories Sidebar */}
                    <aside className="lg:col-span-3 space-y-6">
                        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-gray-100">
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center">
                                <span className="w-2 h-8 bg-red-600 mr-3 rounded-full"></span>
                                Categories
                            </h3>
                            <div className="space-y-2">
                                <button 
                                    onClick={() => setSelectedCategory("")}
                                    className={`w-full text-left px-4 py-3 rounded-xl transition-all font-bold ${selectedCategory === "" ? "bg-red-600 text-white shadow-lg shadow-red-200" : "text-slate-600 hover:bg-slate-50"}`}
                                >
                                    All Stories
                                </button>
                                {categories.map((cat) => (
                                    <button 
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.slug)}
                                        className={`w-full text-left px-4 py-3 rounded-xl transition-all font-bold flex justify-between items-center ${selectedCategory === cat.slug ? "bg-red-600 text-white shadow-lg shadow-red-200" : "text-slate-600 hover:bg-slate-50"}`}
                                    >
                                        <span>{cat.name}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${selectedCategory === cat.slug ? "bg-white/20" : "bg-slate-100 text-slate-500"}`}>
                                            {cat.blogs_count}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-red-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-red-200">
                            <div className="relative z-10 space-y-4">
                                <h3 className="text-2xl font-black uppercase tracking-tighter">Stay Connected</h3>
                                <p className="text-red-100 text-sm">Join our newsletter to get latest updates and exclusive offers.</p>
                                <input type="email" placeholder="Your email" className="w-full bg-white/20 border border-white/20 rounded-xl py-3 px-4 placeholder:text-red-100 outline-none focus:bg-white/30 transition-all" />
                                <button className="w-full bg-white text-red-600 font-bold py-3 rounded-xl hover:bg-red-50 transition-colors">Subscribe</button>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                        </div>
                    </aside>

                    {/* Blog Grid */}
                    <main className="lg:col-span-9">
                        {blogsLoading ? (
                            <div className="flex justify-center items-center h-96">
                                <Loader variant="brand" size="lg" />
                            </div>
                        ) : (
                            <div className="space-y-12">
                                {blogs.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {blogs.map((blog) => (
                                            <Link href={`/blog/${blog.slug}`} key={blog.id} className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-100 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 border border-slate-100">
                                                <div className="relative aspect-[4/3] overflow-hidden">
                                                    {blog.featured_image ? (
                                                        <Image 
                                                            src={blog.featured_image} 
                                                            alt={blog.title} 
                                                            fill 
                                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                    <div className="absolute top-4 left-4">
                                                        <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                                                            {blog.category?.name}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-6 flex flex-col flex-grow">
                                                    <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 space-x-4">
                                                        <span className="flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            {format(new Date(blog.created_at), "MMM d, yyyy")}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                            {blog.view_count}
                                                        </span>
                                                    </div>
                                                    <h3 className="text-xl font-black text-slate-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-tight mb-4">
                                                        {blog.title}
                                                    </h3>
                                                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                                                        <div className="flex items-center space-x-2">
                                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                                {blog.author?.charAt(0) || "A"}
                                                            </div>
                                                            <span className="text-xs font-bold text-slate-600">{blog.author || "Admin"}</span>
                                                        </div>
                                                        <div className="text-red-600">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-3xl p-20 text-center space-y-4 shadow-xl shadow-slate-100 border border-slate-100">
                                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM14 4v4h4m-4 5h3m-3 4h3m-6-4h.01M9 17h.01" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">No Articles Found</h3>
                                        <p className="text-slate-500">Try adjusting your search or category filter.</p>
                                        <button 
                                            onClick={() => { setSearchTerm(""); setSelectedCategory(""); }}
                                            className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition-colors"
                                        >
                                            Reset Filters
                                        </button>
                                    </div>
                                )}

                                {/* Pagination */}
                                {meta && meta.last_page > 1 && (
                                    <div className="flex justify-center items-center space-x-2 pt-10">
                                        {Array.from({ length: meta.last_page }).map((_, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPage(i + 1)}
                                                className={`w-12 h-12 rounded-2xl font-bold transition-all ${page === i + 1 ? "bg-red-600 text-white shadow-lg shadow-red-200" : "bg-white text-slate-600 hover:bg-slate-50 shadow-md shadow-slate-100"}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
